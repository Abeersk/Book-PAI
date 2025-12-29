# Chatbot Component

## Overview
The Chatbot component provides an interactive chat interface that appears as a floating button on the bottom-right corner of every page. When clicked, it opens a chat panel where users can interact with the Humanoid Assistant.

## Features
- Floating chat button that appears on all pages
- Responsive design for desktop and mobile
- Chat history persistence using LocalStorage
- Typing indicators during API calls
- Error handling and display
- Clear history functionality
- Keyboard support (Enter to send)

## Components

### ChatBot
Main component that combines the button and panel with context provider.

### ChatBotButton
Floating button that toggles the chat panel visibility.

### ChatBotPanel
Main chat interface with header, message area, and input.

### ChatMessage
Component for displaying individual messages.

### ChatContext
State management using React Context API with LocalStorage persistence.

## API Integration
The component connects to the backend API at `/api/chat` endpoint. You can configure the API URL using the environment variable `REACT_APP_CHAT_API_URL`.

## Styling
All styles are contained in `chatbot.css` using CSS Modules approach.

## Usage
The component is integrated into the Docusaurus theme via the Root component and automatically appears on all pages.

## Environment Variables
- `REACT_APP_CHAT_API_URL` - API endpoint for chat messages (defaults to `/api/chat`)

## Data Models
- `ChatMessage`: Represents a single message with content, sender, timestamp, and status
- `ChatState`: Current state of the chat interface
- `ChatAPIResponse`: Structure for API responses