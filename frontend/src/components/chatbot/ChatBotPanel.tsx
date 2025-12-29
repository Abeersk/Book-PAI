// src/components/chatbot/ChatBotPanel.tsx

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from './ChatContext';
import { sendChatMessage } from './api';
import ChatMessage from './ChatMessage';
import './chatbot.css';

const ChatBotPanel: React.FC = () => {
  const { state, dispatch } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!state.inputValue.trim()) return;

    const userMessage = {
      id: uuidv4(),
      content: state.inputValue,
      sender: 'user' as const,
      timestamp: new Date(),
      status: 'sending' as const,
    };

    // Add user message to the chat
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Send message to API
      const response = await sendChatMessage(state.inputValue);

      if (response.status === 'success') {
        // Add bot response to the chat
        const botMessage = {
          id: uuidv4(),
          content: response.response,
          sender: 'bot' as const,
          timestamp: new Date(),
        };

        dispatch({ type: 'ADD_MESSAGE', payload: botMessage });
        dispatch({ type: 'SET_ERROR', payload: null });
      } else {
        // Add error message to the chat
        const errorMessage = {
          id: uuidv4(),
          content: response.error || 'Sorry, an error occurred while processing your request.',
          sender: 'bot' as const,
          timestamp: new Date(),
          status: 'error' as const,
        };

        dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
      }
    } catch (error) {
      // Handle unexpected errors
      const errorMessage = {
        id: uuidv4(),
        content: 'Sorry, an unexpected error occurred.',
        sender: 'bot' as const,
        timestamp: new Date(),
        status: 'error' as const,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    dispatch({ type: 'TOGGLE_PANEL' });
  };

  const handleClearHistory = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  return (
    <div className={`chatbot-panel ${state.isOpen ? 'open' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Chat Header */}
      <div className={`chatbot-header ${isDarkMode ? 'dark-mode' : ''}`}>
        <h3>Humanoid Assistant</h3>
        <div className="chatbot-header-buttons">
          <button
            className="chatbot-header-button"
            onClick={handleClearHistory}
            aria-label="Clear chat history"
          >
            🗑️
          </button>
          <button
            className="chatbot-header-button"
            onClick={handleClose}
            aria-label="Close chat"
          >
            ❌
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`chatbot-messages ${isDarkMode ? 'dark-mode' : ''}`}>
        {state.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {state.isLoading && (
          <div className={`typing-indicator ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`chatbot-input-area ${isDarkMode ? 'dark-mode' : ''}`}>
        <textarea
          className={`chatbot-input ${isDarkMode ? 'dark-mode' : ''}`}
          value={state.inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          aria-label="Type your message"
        />
        <button
          className="chatbot-send-button"
          onClick={handleSendMessage}
          disabled={state.isLoading || !state.inputValue.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotPanel;