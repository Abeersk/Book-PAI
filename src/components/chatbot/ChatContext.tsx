// src/components/chatbot/ChatContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatMessage, ChatState } from './types';

interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Define action types
type ChatAction =
  | { type: 'TOGGLE_PANEL' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE_STATUS'; payload: { id: string; status: 'sent' | 'sending' | 'error' } }
  | { type: 'SET_INPUT_VALUE'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'SET_MESSAGES'; payload: ChatMessage[] };

// Initial state
const initialState: ChatState = {
  isOpen: false,
  isLoading: false,
  messages: [],
  inputValue: '',
  error: null,
};

// Reducer function
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'TOGGLE_PANEL':
      return { ...state, isOpen: !state.isOpen, error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        inputValue: '',
      };
    case 'UPDATE_MESSAGE_STATUS':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id ? { ...msg, status: action.payload.status } : msg
        ),
      };
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};

// Provider component
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load messages from localStorage on initial load
  React.useEffect(() => {
    // Check if we're in the browser (not server-side)
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          dispatch({ type: 'SET_MESSAGES', payload: messagesWithDates });
        } catch (e) {
          console.error('Failed to load chat history from localStorage', e);
        }
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  React.useEffect(() => {
    // Check if we're in the browser (not server-side)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    }
  }, [state.messages]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};