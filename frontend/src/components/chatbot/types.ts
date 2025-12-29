// src/components/chatbot/types.ts

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'sending' | 'error';
}

export interface ChatHistory {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatAPIResponse {
  response: string;
  status: 'success' | 'error';
  error?: string;
}

export interface ChatState {
  isOpen: boolean;
  isLoading: boolean;
  messages: ChatMessage[];
  inputValue: string;
  error: string | null;
}