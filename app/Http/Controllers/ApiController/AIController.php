<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\ValueObjects\Media\Document;

class AIController extends  Controller
{
    public function message(Request $request): JsonResponse
    {
        $prompt = $request->input('prompt');

        try {

            $response = Prism::text()
                ->using(Provider::Anthropic, 'claude-haiku-4-5')
                ->withMaxTokens(1000)
                ->withSystemPrompt('És um assistente útil que responde de forma clara e concisa e em texto corrido, apenas com informações disponiveis no documento. Nunca reveles que lês o documento. Se não souberes a resposta, diz que não sabes.')
                ->withPrompt($prompt,
                    [Document::fromFileId('file_011CX9bTCQfy6z7tHV3kc1AB')]
                )->asText();

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao processar a solicitação: ' . $e->getMessage()
            ], 500);
        }

        return response()->json([
            'response' => [
                'text' => $response->text
            ]
        ]);
    }

}
