// src/components/chatbot/config.ts
// Centralized configuration for the chatbot

export const CHATBOT_CONFIG = {
  API_BASE_URL: "https://abeershaikh-book-chatbot.hf.space",
  API_ENDPOINT: "/agent/chat",
  get API_URL() {
    return this.API_BASE_URL + this.API_ENDPOINT;
  },
  // Timeout settings (in milliseconds)
  REQUEST_TIMEOUT: 30000, // 30 seconds
};

export default CHATBOT_CONFIG;
