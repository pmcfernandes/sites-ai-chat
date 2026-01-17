<?php

if (config('app.env') === 'production') {
    $allow_origins = ['https://www.hbr.pt', 'https://hr.hbr.pt', 'https://intranet.hbr.pt'];
} else {
    $allow_origins = ['http://localhost:5173'];
}

return [
    'paths' => ['api/ai/message'],
    'allowed_methods' => ['POST',],
    'allowed_origins' => $allow_origins,
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Content-Type', 'Authorization', 'Accept'],
    'exposed_headers' => [],
    'max_age' => 3600,
    'supports_credentials' => false
];
