<?php


/**
 * --------------------------------------------------------------------------
 * Chat Configuration File
 * --------------------------------------------------------------------------
 * This file is for storing the configuration settings for the chat feature
 * of the application. You can set the title, welcome message, and toggle
 * the visibility of contact and meeting forms.
 *
 * Available Settings:
 * - title: The title of the chat interface.
 * - welcome: The welcome message displayed to users.
 * - show_contact_form: Boolean to show or hide the contact form.
 * - show_meeting_form: Boolean to show or hide the meeting form.
 * - meeting_to_email: Email address for meeting form submissions.
 */

return [
    /**
     * ----------------------------------------------------------------------
     * Title of the chat interface
     * ----------------------------------------------------------------------
     * This setting defines the title that will be displayed at the top of the chat
     * interface. You can customize it by setting the CHAT_TITLE environment variable.
     */
    'title' => env('CHAT_TITLE', 'Chat Assistant'),

    /**
     * ----------------------------------------------------------------------
     * Welcome message for users
     * ----------------------------------------------------------------------
     * This setting defines the welcome message that users will see when they
     * initiate a chat session. You can customize it by setting the
     * CHAT_WELCOME_MESSAGE environment variable.
     */
    'welcome' => env('CHAT_WELCOME_MESSAGE', 'Welcome to the chat! How can I assist you today?'),

    /**
     * ----------------------------------------------------------------------
     * Toggle visibility of contact and meeting forms
     * ----------------------------------------------------------------------
     * These settings allow you to control whether the contact form and meeting
     * form are displayed in the chat interface. You can enable or disable them
     * by setting the CHAT_SHOW_CONTACT_FORM and CHAT_SHOW_MEETING_FORM
     * environment variables.
     */
    'show_contact_form' => env('CHAT_SHOW_CONTACT_FORM', false),

    /**
     * ----------------------------------------------------------------------
     * Toggle visibility of meeting form
     * ----------------------------------------------------------------------
     * This setting allows you to control whether the meeting form is displayed
     * in the chat interface. You can enable or disable it by setting the
     * CHAT_SHOW_MEETING_FORM environment variable.
     */
    'show_meeting_form' => env('CHAT_SHOW_MEETING_FORM', false),

    /**
     * ----------------------------------------------------------------------
     * Email address for contact form submissions
     * ----------------------------------------------------------------------
     * This setting defines the email address where contact form submissions
     * will be sent. You can customize it by setting the CONTACT_MAIL_TO_ADDRESS
     * environment variable.
     */
    'meeting_to_email' => env('MEETIING_MAIL_TO_ADDRESS', ''),
];
