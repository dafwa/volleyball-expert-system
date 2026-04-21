<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fact;
use App\Models\Rule;
use Inertia\Inertia;
use Inertia\Response;

class InferenceController extends Controller
{
    /**
     * Display a listing of facts grouped by category.
     */
    public function index(): Response
    {
        $facts = Fact::all()->groupBy('category');

        return Inertia::render('Inference/Index', [
            'facts' => $facts
        ]);
    }

    /**
     * Evaluate the selected facts and return the inferred rules (Multi-Match).
     */
    public function evaluate(Request $request): Response
    {
        $request->validate([
            'fact_ids' => ['array'],
            'fact_ids.*' => ['integer', 'exists:facts,id'],
        ]);

        $submittedFactIds = $request->input('fact_ids', []);
        
        // Eager load rules with their conditions
        $rules = Rule::with('ruleConditions.fact')->get();
        $selectedFacts = Fact::whereIn('id', $submittedFactIds)->get();
        
        $triggeredRules = [];

        // Forward Chaining algorithm (Multi-Match)
        foreach ($rules as $rule) {
            if ($rule->isSatisfiedBy($submittedFactIds)) {
                $requiredFactIds = $rule->ruleConditions->pluck('fact_id');
                // Attach specific triggering facts dynamically
                $rule->triggering_facts = $selectedFacts->whereIn('id', $requiredFactIds)->values();
                $triggeredRules[] = $rule;
            }
        }

        return Inertia::render('Inference/Result', [
            'triggered_rules' => $triggeredRules,
            'selected_facts' => $selectedFacts,
        ]);
    }
}
