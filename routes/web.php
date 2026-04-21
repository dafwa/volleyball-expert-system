<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\InferenceController;
use App\Http\Controllers\FactController;
use App\Http\Controllers\RuleController;
use App\Models\Fact;
use App\Models\Rule;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Expert System Routes
Route::get('/inference', [InferenceController::class, 'index'])->name('inference.index');
Route::post('/inference/result', [InferenceController::class, 'evaluate'])->name('inference.evaluate');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return inertia('dashboard', [
            'factCount' => Fact::count(),
            'ruleCount' => Rule::count(),
        ]);
    })->name('dashboard');
    
    // Admin Knowledge Base Routes
    Route::resource('admin/facts', FactController::class);
    Route::resource('admin/rules', RuleController::class);
});

require __DIR__.'/settings.php';
