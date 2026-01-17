<?php

use App\Http\Controllers\ApiController\AIController;
use Illuminate\Support\Facades\Route;

Route::post('/ai/message', [AIController::class, 'message'])->name('ai.message');
