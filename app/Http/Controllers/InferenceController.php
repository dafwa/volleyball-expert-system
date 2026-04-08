<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fact;
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
}
