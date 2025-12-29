import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';

// Wrapper for the entire Docusaurus application
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
};

export default ThemeProvider;