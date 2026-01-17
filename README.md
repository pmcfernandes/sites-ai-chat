# Chat for WebSites

This project is a web-based chat application that allows users to communicate in real-time. It is built using modern web technologies and provides a user-friendly interface for seamless interaction.

## Features
    - Real-time messaging with Anthropic's Claude model
    - Send contact form when conversation ends
    - Responsive design for mobile and desktop

## Installation
1. Clone the repository:
   ```bash
    git clone https://github.com/pmcfernandes/hbr-chat.git
    cd hbr-chat
    composer install
    ```
   
2. Install dependencies:
   ```bash
   cd resources/frontend
   npm install
   ```
   
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
    API_BEARER_TOKEN="your_api_bearer_token_here"

    ANTHROPIC_API_KEY="your_anthropic_api_key_here"
    ANTHROPIC_API_VERSION="2023-06-01"
    ANTHROPIC_BETA="files-api-2025-04-14"
   ```   
   
4. Start the development server:
   ```bash
   composer run-script dev
   ```
   
5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage
- Type your message in the input field and press Enter to send.
- The chat will respond using Anthropic's Claude model.
- To end the conversation, simply close the chat window or navigate away.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.
      

   
    
