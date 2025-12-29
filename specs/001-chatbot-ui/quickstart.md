# Quickstart Guide: Docusaurus Chatbot UI Integration

## Overview
This guide provides instructions for setting up and using the chatbot UI component in your Docusaurus documentation site.

## Prerequisites
- Node.js 16+ installed
- Docusaurus 2.x project set up
- Access to the backend API endpoint at `/api/chat`

## Installation Steps

### 1. Add Chatbot Components
Create the following directory structure in your Docusaurus project:
```
src/
└── components/
    └── chatbot/
        ├── ChatBotButton.tsx
        ├── ChatBotPanel.tsx
        ├── ChatMessage.tsx
        ├── ChatContext.tsx
        └── chatbot.css
```

### 2. Configure Docusaurus
Add the chatbot component to your Docusaurus layout by importing it in your main layout component or as a global component.

### 3. Backend Integration
Ensure your backend provides the POST `/api/chat` endpoint that accepts a JSON payload:
```json
{
  "message": "Hello"
}
```

And returns:
```json
{
  "response": "Hello, how can I help?",
  "status": "success"
}
```

## Usage
The chatbot icon will appear on the bottom-right corner of every page. Clicking it will open the chat panel where users can:
- Send messages to the bot
- View conversation history
- Clear chat history
- See typing indicators during API calls

## Environment Configuration
Set the API endpoint URL in your environment variables:
```
REACT_APP_CHAT_API_URL=http://localhost:8000/api/chat
```

## Development
To run the chatbot component in development mode:
1. Start your Docusaurus development server: `npm run start`
2. The chatbot will be available on all pages
3. Use browser developer tools to inspect LocalStorage for chat history persistence

## Testing
Component tests are located in the `__tests__` directory alongside each component file.
Run tests with: `npm test`