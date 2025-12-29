// src/components/chatbot/ChatMessage.tsx

import React from 'react';
import { ChatMessage as ChatMessageType } from './types';
import './chatbot.css';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { sender, content, status } = message;

  // Determine if this is an error message
  const isError = status === 'error';

  if (isError) {
    return (
      <div className="error-message">
        {content}
      </div>
    );
  }

  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      {content}
    </div>
  );
};

export default ChatMessage;