# Chatbot Implementation

This directory contains the chatbot implementation for the Humanoid AI project. There are two main implementations:

## React Implementation
Located in `src/components/chatbot/`, this is a modern React-based chatbot with:
- Context API for state management
- TypeScript type safety
- Responsive design
- Dark mode support
- Local storage for message persistence

## Vanilla JavaScript Implementation
Located in `static/js/chatbot-injector.js`, this is a vanilla JavaScript implementation that:
- Injects the chatbot into Docusaurus pages
- Works without React context conflicts
- Provides fallback functionality

## Configuration

The API endpoint is configured in `src/components/chatbot/config.ts` and should be consistent across both implementations.

Current endpoint: `http://localhost:8000/agent/chat`

## API Integration

Both implementations connect to the backend service at the configured endpoint. When the backend is unavailable, both implementations provide helpful fallback responses for common robotics/AI queries.

## Development

To run the chatbot:
1. Start the backend server on port 8000 (or update the config to match your backend port)
2. Run the frontend with `npm run start`
3. The chatbot will appear as a floating button on all pages

## Troubleshooting

- If the chatbot doesn't connect, verify the backend server is running on the configured port
- Check browser console for API errors
- Both implementations include console logging for debugging