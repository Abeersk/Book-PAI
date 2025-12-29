// src/components/chatbot/ChatBotButton.tsx

import React from 'react';
import { useChat } from './ChatContext';
import './chatbot.css';

const ChatBotButton: React.FC = () => {
  const { state, dispatch } = useChat();

  const handleClick = () => {
    dispatch({ type: 'TOGGLE_PANEL' });
  };

  return (
    <button
      className="chatbot-button"
      onClick={handleClick}
      aria-label="Open chatbot"
      aria-expanded={state.isOpen}
      role="button"
    >
      💬
    </button>
  );
};

export default ChatBotButton;