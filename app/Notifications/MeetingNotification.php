<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;

class MeetingNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        private readonly string $markdown = 'mail.meeting-notification',
        private readonly array $meetingData = []
    )
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $date = $this->meetingData['date'];
        $time = $this->meetingData['time'];
        $name = $this->meetingData['name'];
        $email = $this->meetingData['email'];
        $message = $this->meetingData['message'];

        $beginDate = Carbon::parse($date)->setTimeFromTimeString($time);
        $endDate = $beginDate->copy()->addMinute(30);
        $alertDate = $beginDate->copy()->subMinutes(15);

        // Here you would typically build the iCalendar data and attach it
        $calendar = Calendar::create()
            ->event(Event::create('Reunião agendada através do Site')
                ->uniqueIdentifier(Str::uuid()->toString())
                ->startsAt($beginDate)
                ->endsAt($endDate)
                ->alertAt($alertDate)
                ->description("Reunião com $name\nEmail: $email\nMensagem: $message")
            );

        return (new MailMessage)->markdown($this->markdown, [
            'date' => $beginDate->toDateString(),
            'time' => $time,
            'participants' => [$name],
            'description' => $message,
        ])->subject('Nova solicitação de reunião')
          ->attachData( $calendar->get(), 'invite.ics', [
                'mime' => 'text/calendar;charset=UTF-8;method=REQUEST',
          ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
