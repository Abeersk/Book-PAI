import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translatePageContent } from '../utils/contentTranslator';
import { textTranslationCache, translationCache } from '../utils/translations';

// Define the languages supported
type Language = 'en' | 'ur' | string;

// Define the context type
interface LanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  changeLanguage: (lang: Language) => void;
  loadLanguagePreference: () => void;
  isLoading: boolean;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props for the provider component
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const availableLanguages: Language[] = ['en', 'ur']; // English and Urdu

  // Function to change the language
  const changeLanguage = (lang: Language) => {
    if (availableLanguages.includes(lang)) {
      // Set loading state to true when starting language change
      setIsLoading(true);

      setCurrentLanguage(lang);
      // Save to localStorage
      localStorage.setItem('preferred-language', lang);

      // Clear translation caches to avoid stale translations
      if (textTranslationCache) {
        textTranslationCache.clear();
      }
      if (translationCache) {
        translationCache.clear();
      }

      // Perform the actual translation
      try {
        translatePageContent(lang);
      } catch (error) {
        console.error('Translation error:', error);
        // Still stop loading even if translation fails
      } finally {
        // Stop loading after translation is complete or fails
        setIsLoading(false);
      }
    }
  };

  // Function to load language preference from localStorage
  const loadLanguagePreference = () => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && availableLanguages.includes(savedLanguage as Language)) {
      setCurrentLanguage(savedLanguage as Language);
    }
  };

  // Load saved preference on initial render
  useEffect(() => {
    loadLanguagePreference();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages,
        changeLanguage,
        loadLanguagePreference,
        isLoading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;