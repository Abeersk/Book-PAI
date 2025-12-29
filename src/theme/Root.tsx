import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Root component that wraps the entire application
// This allows the LanguageContext to be available throughout the app
const Root = ({ children }) => {
  useEffect(() => {
    // Find the language switcher container in the navbar after initial render
    const timer = setTimeout(() => {
      const container = document.getElementById('language-switcher-container');
      if (container) {
        // Create a React root and render the LanguageSwitcher component
        // The LanguageSwitcher will have access to the context provided by this same LanguageProvider
        const root = createRoot(container);
        root.render(<LanguageSwitcher />);

        // Clean up function
        return () => {
          root.unmount();
        };
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
};

export default Root;