// src/components/chatbot/api.ts

import { ChatAPIResponse } from './types';

const API_BASE_URL = process.env.REACT_APP_CHAT_API_URL || '/api/chat';

export interface ChatRequest {
  message: string;
}

export const sendChatMessage = async (message: string): Promise<ChatAPIResponse> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatAPIResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return {
      response: 'Sorry, I encountered an error. Please try again.',
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};