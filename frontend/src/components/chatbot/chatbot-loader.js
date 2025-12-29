// frontend/src/components/chatbot/chatbot-loader.js
// Standalone script to load the chatbot after page loads

(function() {
  'use strict';

  // Function to load the React chatbot
  function loadChatBot() {
    // Check if React and ReactDOM are available
    if (typeof window !== 'undefined' && window.React && window.ReactDOM) {
      // Create a container for the chatbot
      const chatbotContainer = document.createElement('div');
      chatbotContainer.id = 'docusaurus-chatbot-container';
      document.body.appendChild(chatbotContainer);

      // Import the ChatBot component dynamically and render it
      import('../../components/chatbot/ChatBot')
        .then(module => {
          const ChatBot = module.default;
          if (ChatBot && window.React && window.ReactDOM) {
            const root = window.ReactDOM.createRoot(chatbotContainer);
            root.render(window.React.createElement(ChatBot));
          }
        })
        .catch(err => {
          console.error('Failed to load ChatBot component:', err);
        });
    } else {
      // If React isn't available yet, try again after a delay
      setTimeout(loadChatBot, 500);
    }
  }

  // Wait for the DOM to be ready before loading the chatbot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadChatBot);
  } else {
    // Check if the page is fully loaded
    if (window.DUCAUSUS_READY || document.querySelector('#__docusaurus')) {
      loadChatBot();
    } else {
      // If not ready, wait a bit and try again
      setTimeout(loadChatBot, 1000);
    }
  }
})();