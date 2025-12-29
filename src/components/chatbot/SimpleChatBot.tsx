// src/components/chatbot/SimpleChatBot.tsx
// Minimal version for testing

import React from 'react';
import './chatbot.css';

const SimpleChatBot: React.FC = () => {
  // Minimal implementation to test if components are causing issues
  return (
    <div className="chatbot-container">
      <button
        className="chatbot-button"
        style={{ position: 'fixed', bottom: '20px', right: '20px', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer', zIndex: 1000 }}
      >
        💬
      </button>
    </div>
  );
};

export default SimpleChatBot;