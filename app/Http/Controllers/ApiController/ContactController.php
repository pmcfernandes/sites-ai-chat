<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class ContactController extends Controller
{

    public function submit(Request $request) : JsonResponse
    {
        // Put here your contact form handling logic, e.g., sending an email or saving to the database.
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'nullable|string|max:1000',
        ]);

        $response = Http::post('https://hr.hbr.pt/contact', $validatedData);

        if ($response->failed()) {
            return response()->json([
                'error' => 'Erro ao processar a solicitação: ' . $response->body()
            ], 500);
        }

        return response()->json([
            'status' => 'ok'
        ], 200);
    }

}
