<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;

class ConfigController extends Controller
{

    public function getConfig()
    {
        $config = [
            'api_key' => config('bearer.token', ''),
            'title' => config('chat.title', 'Chat Assistant'),
            'welcome_message' => config('chat.welcome', 'Welcome to the chat! How can I assist you today?'),
            'show_contact_form' => config('chat.show_contact_form', false),
            'show_meeting_form' => config('chat.show_meeting_form', false),
            'contact_email' => config('chat.meeting_to_email', ''),
        ];

        return response()->json($config);
    }

}
