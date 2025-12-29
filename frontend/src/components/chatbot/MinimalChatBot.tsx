// src/components/chatbot/MinimalChatBot.tsx
// Minimal chatbot without complex context to test integration

import React, { useState } from 'react';
import './chatbot.css'; // Import the CSS

const MinimalChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      <button
        className="chatbot-button"
        onClick={toggleChat}
        aria-label="Open chatbot"
      >
        💬
      </button>

      {/* Chat Panel - only show when open */}
      {isOpen && (
        <div className={`chatbot-panel ${isOpen ? 'open' : ''}`}>
          <div className="chatbot-header">
            <h3>Humanoid Assistant</h3>
            <div className="chatbot-header-buttons">
              <button
                className="chatbot-header-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ❌
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            <div className="message bot-message">
              Hello! How can I help you today?
            </div>
          </div>

          <div className="chatbot-input-area">
            <textarea
              className="chatbot-input"
              placeholder="Type your message..."
              rows={1}
            />
            <button className="chatbot-send-button" disabled>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalChatBot;