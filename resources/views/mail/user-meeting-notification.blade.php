<x-mail::message>
# Olá

A reunião foi agendada para o dia {{ $date }} ás {{ $time }} com assunto **{{ $subject }}**.

**Detalhes da reunião:**

{{ $description }}

<x-mail::button url="https://zoom.us/j/123456789">
    Entrar na reunião
</x-mail::button>

Obrigado,<br>
{{ config('app.name') }}
</x-mail::message>
