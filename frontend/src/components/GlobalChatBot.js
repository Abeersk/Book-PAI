// frontend/src/components/GlobalChatBot.js
// Global chatbot component that can be loaded separately

import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatBot from './chatbot/ChatBot';

// Create the chatbot container and render it when DOM is ready
function initializeGlobalChatBot() {
  // Create a container div for the chatbot
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'global-chatbot-container';
  document.body.appendChild(chatbotContainer);

  // Render the ChatBot component to this container
  const root = createRoot(chatbotContainer);
  root.render(<ChatBot />);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGlobalChatBot);
} else {
  initializeGlobalChatBot();
}

export default initializeGlobalChatBot;