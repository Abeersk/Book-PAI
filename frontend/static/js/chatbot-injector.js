// frontend/static/js/chatbot-injector.js
// Script to inject the chatbot into the page after it loads

(function() {
  'use strict';

  // Wait for the page to be fully loaded
  function initializeChatBot() {
    // Create the chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'docusaurus-chatbot-root';
    document.body.appendChild(chatbotContainer);

    // Create the chatbot elements manually with vanilla JavaScript
    // This avoids React context conflicts

    // Create the chat button
    const chatButton = document.createElement('button');
    chatButton.className = 'chatbot-button';
    chatButton.innerHTML = '💬';
    chatButton.setAttribute('aria-label', 'Open chatbot');
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '20px';
    chatButton.style.right = '20px';
    chatButton.style.width = '60px';
    chatButton.style.height = '60px';
    chatButton.style.borderRadius = '50%';
    chatButton.style.backgroundColor = '#4f46e5';
    chatButton.style.color = 'white';
    chatButton.style.border = 'none';
    chatButton.style.cursor = 'pointer';
    chatButton.style.zIndex = '1000';
    chatButton.style.fontSize = '24px';
    chatButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)';
    chatButton.style.display = 'flex';
    chatButton.style.justifyContent = 'center';
    chatButton.style.alignItems = 'center';
    chatButton.style.transition = 'all 0.3s ease';

    // Add hover effects with JavaScript
    chatButton.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)';
      this.style.backgroundColor = '#4338ca';
    });

    chatButton.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)';
      this.style.backgroundColor = '#4f46e5';
    });

    // Add click handler
    let isOpen = false;
    chatButton.addEventListener('click', function() {
      isOpen = !isOpen;
      if (isOpen) {
        // Show the chat panel
        showChatPanel();
        this.innerHTML = '❌'; // Change to close icon
      } else {
        // Hide the chat panel
        hideChatPanel();
        this.innerHTML = '💬'; // Change back to chat icon
      }
    });

    chatbotContainer.appendChild(chatButton);

    // Create the chat panel (initially hidden)
    const chatPanel = document.createElement('div');
    chatPanel.className = 'chatbot-panel';
    chatPanel.style.position = 'fixed';
    chatPanel.style.bottom = '90px';
    chatPanel.style.right = '20px';
    chatPanel.style.width = '380px';
    chatPanel.style.height = '500px';
    chatPanel.style.backgroundColor = 'white';
    chatPanel.style.borderRadius = '12px';
    chatPanel.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    chatPanel.style.display = 'flex';
    chatPanel.style.flexDirection = 'column';
    chatPanel.style.zIndex = '1000';
    chatPanel.style.overflow = 'hidden';
    chatPanel.style.transform = 'translateY(20px)';
    chatPanel.style.opacity = '0';
    chatPanel.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    chatPanel.style.display = 'none'; // Initially hidden

    // Create header
    const header = document.createElement('div');
    header.className = 'chatbot-header';
    header.style.backgroundColor = '#4f46e5';
    header.style.color = 'white';
    header.style.padding = '16px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const title = document.createElement('h3');
    title.textContent = 'Humanoid Assistant';
    title.style.margin = '0';
    title.style.fontSize = '16px';
    title.style.fontWeight = '600';

    header.appendChild(title);

    // Add close button to header
    const closeHeaderBtn = document.createElement('button');
    closeHeaderBtn.innerHTML = '❌';
    closeHeaderBtn.className = 'chatbot-header-button';
    closeHeaderBtn.style.background = 'none';
    closeHeaderBtn.style.border = 'none';
    closeHeaderBtn.style.color = 'white';
    closeHeaderBtn.style.cursor = 'pointer';
    closeHeaderBtn.style.fontSize = '18px';
    closeHeaderBtn.style.padding = '4px';
    closeHeaderBtn.style.borderRadius = '4px';
    closeHeaderBtn.style.transition = 'background-color 0.2s';

    closeHeaderBtn.addEventListener('click', function() {
      isOpen = false;
      hideChatPanel();
      chatButton.innerHTML = '💬'; // Change back to chat icon
    });

    header.appendChild(closeHeaderBtn);
    chatPanel.appendChild(header);

    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'chatbot-messages';
    messagesContainer.style.flex = '1';
    messagesContainer.style.padding = '16px';
    messagesContainer.style.overflowY = 'auto';
    messagesContainer.style.display = 'flex';
    messagesContainer.style.flexDirection = 'column';
    messagesContainer.style.gap = '12px';
    messagesContainer.style.backgroundColor = '#f9fafb';

    // Add a welcome message
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'message bot-message';
    welcomeMsg.style.maxWidth = '80%';
    welcomeMsg.style.padding = '10px 14px';
    welcomeMsg.style.borderRadius = '18px';
    welcomeMsg.style.fontSize = '14px';
    welcomeMsg.style.lineHeight = '1.4';
    welcomeMsg.style.alignSelf = 'flex-start';
    welcomeMsg.style.backgroundColor = '#f3f4f6';
    welcomeMsg.style.borderBottomLeftRadius = '4px';
    welcomeMsg.textContent = 'Hello! How can I help you today?';

    messagesContainer.appendChild(welcomeMsg);
    chatPanel.appendChild(messagesContainer);

    // Create input area
    const inputArea = document.createElement('div');
    inputArea.className = 'chatbot-input-area';
    inputArea.style.padding = '12px';
    inputArea.style.backgroundColor = 'white';
    inputArea.style.borderTop = '1px solid #e5e7eb';
    inputArea.style.display = 'flex';
    inputArea.style.gap = '8px';

    const input = document.createElement('textarea');
    input.className = 'chatbot-input';
    input.placeholder = 'Type your message...';
    input.style.flex = '1';
    input.style.padding = '10px 12px';
    input.style.border = '1px solid #d1d5db';
    input.style.borderRadius = '8px';
    input.style.fontSize = '14px';
    input.style.resize = 'none';
    input.style.maxHeight = '100px';
    input.style.outline = 'none';

    // Add Enter key support
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    const sendButton = document.createElement('button');
    sendButton.className = 'chatbot-send-button';
    sendButton.textContent = 'Send';
    sendButton.style.backgroundColor = '#4f46e5';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '8px';
    sendButton.style.padding = '10px 16px';
    sendButton.style.cursor = 'pointer';
    sendButton.style.fontSize = '14px';
    sendButton.style.fontWeight = '500';
    sendButton.style.transition = 'background-color 0.2s';

    sendButton.addEventListener('click', sendMessage);

    inputArea.appendChild(input);
    inputArea.appendChild(sendButton);
    chatPanel.appendChild(inputArea);

    chatbotContainer.appendChild(chatPanel);

    // Function to show chat panel
    function showChatPanel() {
      chatPanel.style.display = 'flex';
      // Trigger reflow and then apply the animation
      void chatPanel.offsetWidth;
      chatPanel.style.transform = 'translateY(0)';
      chatPanel.style.opacity = '1';
    }

    // Function to hide chat panel
    function hideChatPanel() {
      chatPanel.style.transform = 'translateY(20px)';
      chatPanel.style.opacity = '0';
      setTimeout(() => {
        chatPanel.style.display = 'none';
      }, 300); // Match the transition duration
    }

    // Function to send message
    function sendMessage() {
      const messageText = input.value.trim();
      if (!messageText) return;

      // Add user message to chat
      const userMsg = document.createElement('div');
      userMsg.className = 'message user-message';
      userMsg.style.maxWidth = '80%';
      userMsg.style.padding = '10px 14px';
      userMsg.style.borderRadius = '18px';
      userMsg.style.fontSize = '14px';
      userMsg.style.lineHeight = '1.4';
      userMsg.style.alignSelf = 'flex-end';
      userMsg.style.backgroundColor = '#e0e7ff';
      userMsg.style.borderBottomRightRadius = '4px';
      userMsg.textContent = messageText;

      messagesContainer.appendChild(userMsg);
      input.value = '';

      // Auto-scroll to bottom
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'typing-indicator';
      typingIndicator.style.alignSelf = 'flex-start';
      typingIndicator.style.backgroundColor = '#f3f4f6';
      typingIndicator.style.padding = '10px 14px';
      typingIndicator.style.borderRadius = '18px';
      typingIndicator.style.borderBottomLeftRadius = '4px';
      typingIndicator.style.display = 'flex';
      typingIndicator.style.alignItems = 'center';
      typingIndicator.style.gap = '4px';

      const dots = [];
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.backgroundColor = '#6b7280';
        dot.style.borderRadius = '50%';
        dot.style.animation = 'typing 1.4s infinite ease-in-out';
        if (i === 1) dot.style.animationDelay = '0.2s';
        if (i === 2) dot.style.animationDelay = '0.4s';
        dots.push(dot);
        typingIndicator.appendChild(dot);
      }

      // Add CSS for typing animation
      if (!document.getElementById('typing-animation-style')) {
        const style = document.createElement('style');
        style.id = 'typing-animation-style';
        style.textContent = `
          @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
        `;
        document.head.appendChild(style);
      }

      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Make real API call to backend - using the correct endpoint
      fetch('http://localhost:8000/agent/chat', {  // NOTE: This should match the React implementation
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText })
      })
      .then(response => {
        // Check if the response is ok before parsing JSON
        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 404) {
            throw new Error(`status: 404`);
          } else if (response.status === 500) {
            throw new Error(`status: 500`);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then(data => {
        // Remove typing indicator
        typingIndicator.remove();

        // Add bot response
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.style.maxWidth = '80%';
        botMsg.style.padding = '10px 14px';
        botMsg.style.borderRadius = '18px';
        botMsg.style.fontSize = '14px';
        botMsg.style.lineHeight = '1.4';
        botMsg.style.alignSelf = 'flex-start';
        botMsg.style.backgroundColor = '#f3f4f6';
        botMsg.style.borderBottomLeftRadius = '4px';

        if (data.status === 'success') {
          botMsg.textContent = data.response || "I received your message. This is a response from the backend.";
        } else {
          botMsg.textContent = data.response || "Sorry, I encountered an error processing your request.";
          botMsg.style.backgroundColor = '#fee2e2'; // Red background for error
          botMsg.style.color = '#ef4444';
        }

        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      })
      .catch(error => {
        // Remove typing indicator
        typingIndicator.remove();

        // Add error message
        const errorBotMsg = document.createElement('div');
        errorBotMsg.className = 'message bot-message';
        errorBotMsg.style.maxWidth = '80%';
        errorBotMsg.style.padding = '10px 14px';
        errorBotMsg.style.borderRadius = '18px';
        errorBotMsg.style.fontSize = '14px';
        errorBotMsg.style.lineHeight = '1.4';
        errorBotMsg.style.alignSelf = 'flex-start';
        errorBotMsg.style.backgroundColor = '#fee2e2'; // Red background
        errorBotMsg.style.color = '#ef4444';

        // Provide more specific error information
        if (error.message.includes('fetch')) {
          errorBotMsg.textContent = "Cannot connect to the chatbot API. Please ensure the backend server is running.";
        } else if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
          errorBotMsg.textContent = "API quota limit exceeded. Please try again later or check API configuration.";
        } else if (error.message.includes('401') || error.message.includes('unauthorized')) {
          errorBotMsg.textContent = "Authentication error. Please check API key configuration.";
        } else if (error.message.includes('status: 404')) {
          // If the backend is not available, provide helpful fallback information
          if (messageText.toLowerCase().includes('ros2') || messageText.toLowerCase().includes('what is ros2')) {
            errorBotMsg.textContent = "ROS 2 (Robot Operating System 2) is a flexible framework for writing robot software. It provides a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robot platforms. It's designed for research, education, and industry applications.";
          } else if (messageText.toLowerCase().includes('humanoid') || messageText.toLowerCase().includes('robot')) {
            errorBotMsg.textContent = "A humanoid robot is a robot with a human-like body structure, typically featuring a head, torso, two arms, and two legs. These robots are designed to mimic human appearance and behavior, making them suitable for human-centered environments.";
          } else if (messageText.toLowerCase().includes('chat') || messageText.toLowerCase().includes('help')) {
            errorBotMsg.textContent = "I'm your Humanoid Assistant! I can help answer questions about robotics, AI, and the textbook content. The backend server is currently not available, but I can provide basic information about robotics topics.";
          } else {
            errorBotMsg.textContent = "I'm currently unable to connect to the backend server. Here's some general information: This is a Docusaurus-based documentation site for Physical AI & Humanoid Robotics. For specific questions about robotics, AI, AI, or the textbook content, please check the documentation or contact the site administrator to ensure the backend is running.";
          }
        } else if (error.message.includes('status: 500')) {
          errorBotMsg.textContent = "Internal server error. Please check backend logs.";
        } else if (error.message.includes('status: 405')) {
          errorBotMsg.textContent = "API method not allowed. Please check backend configuration.";
        } else {
          errorBotMsg.textContent = "Sorry, I'm having trouble connecting to the server. Please try again.";
        }

        messagesContainer.appendChild(errorBotMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        console.error('Chat API error:', error);
      });
    }
  }

  // Initialize when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatBot);
  } else {
    // Check if Docusaurus has finished rendering
    if (window.Docusaurus) {
      // Wait for Docusaurus to be ready
      window.Docusaurus.onReady(initializeChatBot);
    } else {
      // If not using Docusaurus' onReady, just wait a bit
      setTimeout(initializeChatBot, 100);
    }
  }
})();