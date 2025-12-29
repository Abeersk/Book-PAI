// // src/components/chatbot/api.ts

// import { ChatAPIResponse } from './types';

// const API_BASE_URL = 'http://127.0.0.1:8000'; // BACKEND BASE URL

// export interface ChatRequest {
//   message: string;
// }

// export const sendChatMessage = async (message: string): Promise<ChatAPIResponse> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/agent/chat`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data: ChatAPIResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error sending chat message:', error);
//     let errorMessage = 'Sorry, I encountered an error. Please try again.';
//     let errorDetail = error instanceof Error ? error.message : 'Unknown error occurred';

//     if (errorDetail.includes('429') || errorDetail.includes('quota') || errorDetail.includes('RESOURCE_EXHAUSTED')) {
//       errorMessage = 'API quota limit exceeded. Please try again later or check API configuration.';
//     } else if (errorDetail.includes('401') || errorDetail.includes('unauthorized')) {
//       errorMessage = 'Authentication error. Please check API key configuration.';
//     } else if (errorDetail.includes('404')) {
//       errorMessage = 'API endpoint not found. Please check backend configuration.';
//     } else if (errorDetail.includes('500')) {
//       errorMessage = 'Internal server error. Please check backend logs.';
//     } else if (errorDetail.includes('Failed to fetch') || errorDetail.includes('NetworkError')) {
//       errorMessage = 'Cannot connect to the server. Please ensure the backend is running.';
//     }

//     return {
//       response: errorMessage,
//       status: 'error',
//       error: errorDetail,
//     };
//   }
// };
// src/components/chatbot/api.ts
// src/components/chatbot/api.ts

import { ChatAPIResponse } from "./types";
import CHATBOT_CONFIG from "./config";

console.log("📡 Calling API:", CHATBOT_CONFIG.API_URL);

export const sendChatMessage = async (
  message: string,
): Promise<ChatAPIResponse> => {
  try {
    const response = await fetch(CHATBOT_CONFIG.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.log("❌ RESPONSE NOT OK:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✔️ API DATA:", data);
    return data;
  } catch (error: any) {
    console.log("🔥 FRONTEND FETCH ERROR:", error.message);

    // Provide fallback responses based on message content when backend is not available
    let fallbackResponse =
      "I'm currently unable to connect to the backend server. ";

    if (
      message.toLowerCase().includes("ros2") ||
      message.toLowerCase().includes("what is ros2")
    ) {
      fallbackResponse +=
        "ROS 2 (Robot Operating System 2) is a flexible framework for writing robot software. It provides a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robot platforms. It's designed for research, education, and industry applications.";
    } else if (
      message.toLowerCase().includes("humanoid") ||
      message.toLowerCase().includes("robot")
    ) {
      fallbackResponse +=
        "A humanoid robot is a robot with a human-like body structure, typically featuring a head, torso, two arms, and two legs. These robots are designed to mimic human appearance and behavior, making them suitable for human-centered environments.";
    } else if (
      message.toLowerCase().includes("chat") ||
      message.toLowerCase().includes("help")
    ) {
      fallbackResponse +=
        "I'm your Humanoid Assistant! I can help answer questions about robotics, AI, and the textbook content. The backend server is currently not available, but I can provide basic information about robotics topics.";
    } else {
      fallbackResponse +=
        "This is a Docusaurus-based documentation site for Physical AI & Humanoid Robotics. For specific questions about robotics, AI, or the textbook content, please check the documentation or contact the site administrator to ensure the backend is running.";
    }

    return {
      response: fallbackResponse,
      status: "error",
      error: error.message,
    };
  }
};
