<?php

namespace App\Http\Controllers;

use App\Models\Rule;
use App\Models\Fact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class RuleController extends Controller
{
    public function index(): Response
    {
        $rules = Rule::with('ruleConditions.fact')->get();
        return Inertia::render('Admin/Rules/Index', ['rules' => $rules]);
    }

    public function create(): Response
    {
        $factsGrouped = Fact::all()->groupBy('category');
        return Inertia::render('Admin/Rules/Create', [
            'factsGrouped' => $factsGrouped
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:rules,code'],
            'goal_name' => ['required', 'string', 'max:255'],
            'output_description' => ['required', 'string'],
            'fact_ids' => ['array'],
            'fact_ids.*' => ['integer', 'exists:facts,id'],
        ]);

        $rule = Rule::create([
            'code' => $validated['code'],
            'goal_name' => $validated['goal_name'],
            'output_description' => $validated['output_description'],
        ]);

        // Sync rule conditions
        $conditions = collect($validated['fact_ids'] ?? [])->map(function ($factId) {
            return ['fact_id' => $factId];
        });

        if ($conditions->isNotEmpty()) {
            $rule->ruleConditions()->createMany($conditions);
        }

        return redirect()->route('rules.index');
    }

    public function edit(Rule $rule): Response
    {
        // Load the attached condition fact_ids
        $rule->load('ruleConditions');
        
        // Pass the already attached IDs specifically for the frontend to populate checkboxes
        $rule->attached_fact_ids = $rule->ruleConditions->pluck('fact_id')->toArray();
        
        $factsGrouped = Fact::all()->groupBy('category');

        return Inertia::render('Admin/Rules/Edit', [
            'rule' => $rule,
            'factsGrouped' => $factsGrouped
        ]);
    }

    public function update(Request $request, Rule $rule): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:rules,code,' . $rule->id],
            'goal_name' => ['required', 'string', 'max:255'],
            'output_description' => ['required', 'string'],
            'fact_ids' => ['array'],
            'fact_ids.*' => ['integer', 'exists:facts,id'],
        ]);

        $rule->update([
            'code' => $validated['code'],
            'goal_name' => $validated['goal_name'],
            'output_description' => $validated['output_description'],
        ]);

        // Sync rule conditions manually: Delete previous and re-create current payload
        $rule->ruleConditions()->delete();
        
        $conditions = collect($validated['fact_ids'] ?? [])->map(function ($factId) {
            return ['fact_id' => $factId];
        });

        if ($conditions->isNotEmpty()) {
            $rule->ruleConditions()->createMany($conditions);
        }

        return redirect()->route('rules.index');
    }

    public function destroy(Rule $rule): RedirectResponse
    {
        $rule->delete();

        return redirect()->route('rules.index');
    }
}
