<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Notifications\MeetingNotification;
use App\Notifications\UserMeetingNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class MeetingController extends Controller
{

    public function create(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'date' => 'required|string|max:255',
            'time' => 'required|string|max:10',
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email',
            'message' => 'required|string|max:1000',
        ]);

        try {
            Notification::route('mail', config('chat.meeting_to_email', ''))
                ->notify(new MeetingNotification('mail.meeting-notification', $validatedData));

            Notification::route('mail', $validatedData['email'])
                ->notify(new MeetingNotification('mail.user-meeting-notification', $validatedData));

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'status' => 'ok'
        ], 200);
    }

}
