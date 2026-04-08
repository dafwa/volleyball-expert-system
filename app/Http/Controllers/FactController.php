<?php

namespace App\Http\Controllers;

use App\Models\Fact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class FactController extends Controller
{
    public function index(): Response
    {
        $facts = Fact::all();
        return Inertia::render('Admin/Facts/Index', ['facts' => $facts]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Facts/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:facts,code'],
            'description' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
        ]);

        Fact::create($validated);

        return redirect()->route('facts.index');
    }

    public function edit(Fact $fact): Response
    {
        return Inertia::render('Admin/Facts/Edit', ['fact' => $fact]);
    }

    public function update(Request $request, Fact $fact): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', 'unique:facts,code,' . $fact->id],
            'description' => ['required', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
        ]);

        $fact->update($validated);

        return redirect()->route('facts.index');
    }

    public function destroy(Fact $fact): RedirectResponse
    {
        $fact->delete();

        return redirect()->route('facts.index');
    }
}
