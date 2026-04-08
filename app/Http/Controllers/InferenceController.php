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
     * Evaluate the selected facts and return the inferred rule.
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
        
        $triggeredRule = null;

        // Forward Chaining algorithm
        foreach ($rules as $rule) {
            if ($rule->isSatisfiedBy($submittedFactIds)) {
                $triggeredRule = $rule;
                break; // Trigger the FIRST rule that matches
            }
        }

        // Fetch the selected facts to display to the user
        $selectedFacts = Fact::whereIn('id', $submittedFactIds)->get();

        return Inertia::render('Inference/Result', [
            'rule' => $triggeredRule,
            'matchedFacts' => $selectedFacts,
        ]);
    }
}
