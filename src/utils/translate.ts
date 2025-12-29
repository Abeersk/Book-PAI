import { getTranslation, translateText, translateMultiple } from './translations';

// Define the language type
type Language = 'en' | 'ur' | string;

// Interface for translation options
interface TranslationOptions {
  fallbackToOriginal?: boolean;
  caseSensitive?: boolean;
}

// Main translation function that handles content translation
export const translateContent = (
  content: string | string[] | HTMLElement | null,
  targetLang: Language,
  options: TranslationOptions = {}
): any => {
  const { fallbackToOriginal = true, caseSensitive = false } = options;

  // If content is null or undefined, return as is
  if (content === null || content === undefined) {
    return content;
  }

  // Handle array of strings
  if (Array.isArray(content)) {
    return translateMultiple(content, targetLang);
  }

  // Handle single string
  if (typeof content === 'string') {
    return translateText(content, targetLang);
  }

  // Handle HTMLElement
  if (content instanceof HTMLElement) {
    // Clone the element to avoid modifying the original
    const clonedElement = content.cloneNode(true) as HTMLElement;

    // Find all text nodes and translate their content
    const walker = document.createTreeWalker(
      clonedElement,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes: Text[] = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    // Translate each text node
    textNodes.forEach(textNode => {
      if (textNode.textContent && textNode.textContent.trim() !== '') {
        const originalText = textNode.textContent;
        const translatedText = translateText(originalText, targetLang);
        textNode.textContent = translatedText;
      }
    });

    return clonedElement;
  }

  // For other types, return as is
  return content;
};

// Function to translate page content
export const translatePageContent = (targetLang: Language): void => {
  if (typeof document === 'undefined') {
    // Server-side rendering - return early
    return;
  }

  // Translate main content areas
  const contentSelectors = [
    'main h1', 'main h2', 'main h3', 'main h4', 'main h5', 'main h6',
    'main p', 'main span', 'main div', 'main li', 'main a'
  ];

  contentSelectors.forEach(selector => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach(element => {
      if (element.textContent && element.textContent.trim() !== '') {
        const translatedText = translateText(element.textContent, targetLang);
        element.textContent = translatedText;
      }
    });
  });

  // Translate navigation elements
  const navSelectors = [
    'nav a', 'nav span', 'nav button', '.navbar a', '.navbar span', '.navbar button'
  ];

  navSelectors.forEach(selector => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach(element => {
      if (element.textContent && element.textContent.trim() !== '') {
        const translatedText = translateText(element.textContent, targetLang);
        element.textContent = translatedText;
      }
    });
  });

  // Translate sidebar elements
  const sidebarSelectors = [
    '.sidebar a', '.sidebar span', '.sidebar li'
  ];

  sidebarSelectors.forEach(selector => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    elements.forEach(element => {
      if (element.textContent && element.textContent.trim() !== '') {
        const translatedText = translateText(element.textContent, targetLang);
        element.textContent = translatedText;
      }
    });
  });
};

// Function to detect language from content
export const detectLanguage = (text: string): Language => {
  // Simple heuristic to detect if text might be Urdu
  // Urdu uses Arabic script which includes characters in the Arabic Unicode block
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text) ? 'ur' : 'en';
};

// Function to get all available languages
export const getAvailableLanguages = (): Language[] => {
  // This would typically come from a more comprehensive source
  // For now, return the languages we have translations for
  return ['en', 'ur'];
};

// Function to check if a language is supported
export const isLanguageSupported = (lang: string): boolean => {
  return getAvailableLanguages().includes(lang as Language);
};

// Function to get language name in the target language
export const getLanguageDisplayName = (lang: Language): string => {
  switch (lang) {
    case 'en':
      return getTranslation('English', 'ur') || 'English';
    case 'ur':
      return getTranslation('Urdu', 'ur') || 'Urdu';
    default:
      return lang;
  }
};