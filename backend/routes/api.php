<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SumController;

Route::post('/sums', [SumController::class, 'store']);
