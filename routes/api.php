<?php

use App\Http\Controllers\ApiController\AIController;
use App\Http\Controllers\ApiController\ConfigController;
use App\Http\Controllers\ApiController\ContactController;
use App\Http\Controllers\ApiController\MeetingController;
use App\Http\Middleware\BearerTokenMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/config', [ConfigController::class, 'getConfig'])->name('config');

Route::middleware([
    BearerTokenMiddleware::class
])->group(function () {
    Route::post('/ai/message', [AIController::class, 'message'])->name('ai.message');
    Route::post('/contact/submit', [ContactController::class, 'submit'])->name('contact.submit');
    Route::post('/meetings/create', [MeetingController::class, 'create'])->name('meetings.create');
});
