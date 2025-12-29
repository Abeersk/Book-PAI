// src/components/chatbot/ChatBot.tsx

import React from 'react';
import { ChatProvider } from './ChatContext';
import ChatBotButton from './ChatBotButton';
import ChatBotPanel from './ChatBotPanel';
import './chatbot.css';

const ChatBot: React.FC = () => {
  return (
    <ChatProvider>
      <div className="chatbot-container">
        <ChatBotButton />
        <ChatBotPanel />
      </div>
    </ChatProvider>
  );
};

export default ChatBot;