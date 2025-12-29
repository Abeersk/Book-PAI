// src/components/ChatBotLayout.tsx
// Layout wrapper that includes the chatbot

import React, { ReactNode } from 'react';
import ChatBot from './chatbot/ChatBot';

interface ChatBotLayoutProps {
  children: ReactNode;
}

const ChatBotLayout: React.FC<ChatBotLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
};

export default ChatBotLayout;