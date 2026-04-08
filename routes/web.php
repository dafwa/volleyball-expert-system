<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\InferenceController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Expert System Routes
Route::get('/inference', [InferenceController::class, 'index'])->name('inference.index');
Route::post('/inference/result', [InferenceController::class, 'evaluate'])->name('inference.evaluate');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
