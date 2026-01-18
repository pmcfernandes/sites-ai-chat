<?php

/**
 * Laravel CORS Options
 *
 * The allowed_methods and allowed_headers options are case-insensitive.
 *
 * You don't need to provide both allowed_origins and allowed_origins_patterns.
 * If one of the strings passed matches, it is considered a valid origin.
 *
 * If ['*'] is provided to allowed_methods or allowed_headers, all methods / headers
 * are allowed.
 */

if (config('app.env') === 'production') {
    $allow_origins = ['https://www.hbr.pt', 'https://hr.hbr.pt', 'https://intranet.hbr.pt'];
} else {
    $allow_origins = ['http://localhost:5173'];
}

return [
    /**
     * --------------------------------------------------------------------------
     * Paths that should be CORS accessible
     * --------------------------------------------------------------------------
     * Here you can specify the paths that should be accessible via CORS. You can
     * enable CORS for all paths by using ['*'], or specify individual paths
     */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    /**
     * --------------------------------------------------------------------------
     * Allowed Methods, Origins, Headers
     * --------------------------------------------------------------------------
     * Here you can specify the allowed HTTP methods, origins, and headers for
     * CORS requests. You can use ['*'] to allow all methods or headers.
     */
    'allowed_methods' => ['POST', 'GET'],

    /**
     * --------------------------------------------------------------------------
     * Allowed Origins
     * --------------------------------------------------------------------------
     * Here you can specify the allowed origins for CORS requests. You can use
     * ['*'] to allow all origins, or specify individual origins.
     */
    'allowed_origins' => $allow_origins,

    /**
     * --------------------------------------------------------------------------
     * Allowed Origins Patterns
     * --------------------------------------------------------------------------
     * Here you can specify patterns to match allowed origins for CORS requests.
     * This is useful if you want to allow subdomains or dynamic origins.
     */
    'allowed_origins_patterns' => [],

    /**
    * --------------------------------------------------------------------------
    * Allowed Headers
    * --------------------------------------------------------------------------
    * Here you can specify the allowed headers for CORS requests. You can use
    * ['*'] to allow all headers, or specify individual headers.
    */
    'allowed_headers' => ['Content-Type', 'Authorization', 'Accept'],

    /**
     * --------------------------------------------------------------------------
     * Exposed Headers
     * --------------------------------------------------------------------------
     * Here you can specify the headers that should be exposed to the browser.
     * These are the headers that the browser is allowed to access from the
     * response.
     */
    'exposed_headers' => [],

    /**
     * --------------------------------------------------------------------------
     * Max Age
     * --------------------------------------------------------------------------
     * Here you can specify the maximum age (in seconds) for CORS preflight
     * requests. This determines how long the results of a preflight request
     * can be cached by the browser.
     */
    'max_age' => 3600,

    /**
     * --------------------------------------------------------------------------
     * Supports Credentials
     * --------------------------------------------------------------------------
     * Here you can specify whether CORS requests should include credentials
     * such as cookies, authorization headers, or TLS client certificates.
     */
    'supports_credentials' => false
];
