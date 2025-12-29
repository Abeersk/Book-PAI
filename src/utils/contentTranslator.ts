import { translateText, getTranslation } from './translations';

// Define the language type
type Language = 'en' | 'ur' | string;

// Cache for translations to avoid repeated processing
const translationCache = new Map<string, Map<string, string>>();

// Function to get cached translation or compute and cache it
const getCachedTranslation = (text: string, targetLang: Language): string => {
  if (!translationCache.has(targetLang)) {
    translationCache.set(targetLang, new Map<string, string>());
  }

  const langCache = translationCache.get(targetLang)!;
  if (langCache.has(text)) {
    return langCache.get(text)!;
  }

  const translated = getTranslation(text, targetLang);
  langCache.set(text, translated);
  return translated;
};

// Function to translate content elements on the page with error handling and performance optimization
export const translatePageContent = (targetLang: Language): void => {
  if (typeof document === 'undefined') {
    // Server-side rendering - return early
    return;
  }

  try {
    // Define selectors for content that should be translated
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'div', 'li', 'a',
      '.markdown', '.doc-content', '.container', '.content'
    ];

    // Process each selector with optimized approach
    for (const selector of selectors) {
      try {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        const elementsToProcess: HTMLElement[] = [];

        // First, collect elements that need translation (filter in memory)
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];

          // Skip if element is a link with an href (to avoid breaking navigation)
          if (element.tagName === 'A' && element.getAttribute('href')) {
            continue;
          }

          // Skip if element contains form inputs or other interactive elements
          if (element.querySelector?.('input, textarea, select, button, img')) {
            continue;
          }

          // Only process elements with content
          if (element.textContent && element.textContent.trim() !== '') {
            elementsToProcess.push(element);
          }
        }

        // Process the filtered elements
        for (const element of elementsToProcess) {
          try {
            // Translate text content
            const originalText = element.textContent!;
            const translatedText = getCachedTranslation(originalText, targetLang);

            // Only update if translation is different
            if (translatedText !== originalText) {
              element.textContent = translatedText;
            }

            // Also check for title attributes
            if (element.hasAttribute('title')) {
              const originalTitle = element.getAttribute('title') || '';
              const translatedTitle = getCachedTranslation(originalTitle, targetLang);
              if (translatedTitle !== originalTitle) {
                element.setAttribute('title', translatedTitle);
              }
            }

            // Also check for placeholder attributes on input-like elements
            if (element.hasAttribute('placeholder')) {
              const originalPlaceholder = element.getAttribute('placeholder') || '';
              const translatedPlaceholder = getCachedTranslation(originalPlaceholder, targetLang);
              if (translatedPlaceholder !== originalPlaceholder) {
                element.setAttribute('placeholder', translatedPlaceholder);
              }
            }
          } catch (elementError) {
            console.warn(`Error processing element:`, element, elementError);
            // Continue with other elements even if one fails
          }
        }
      } catch (selectorError) {
        console.warn(`Error processing selector ${selector}:`, selectorError);
        // Continue with other selectors even if one fails
      }
    }

    // Special handling for navigation elements
    const navSelectors = [
      '.navbar a', '.navbar span', '.navbar button',
      'nav a', 'nav span', 'nav button'
    ];

    for (const selector of navSelectors) {
      try {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        const elementsToProcess: HTMLElement[] = [];

        // Filter navigation elements that need processing
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element.textContent && element.textContent.trim() !== '' &&
              !element.querySelector?.('input, textarea, select, img')) {
            elementsToProcess.push(element);
          }
        }

        // Process navigation elements
        for (const element of elementsToProcess) {
          try {
            const originalText = element.textContent!;
            const translatedText = getCachedTranslation(originalText, targetLang);

            if (translatedText !== originalText) {
              element.textContent = translatedText;
            }
          } catch (elementError) {
            console.warn(`Error processing navigation element:`, element, elementError);
            // Continue with other elements even if one fails
          }
        }
      } catch (navSelectorError) {
        console.warn(`Error processing navigation selector ${selector}:`, navSelectorError);
        // Continue with other selectors even if one fails
      }
    }
  } catch (error) {
    console.error('Critical error during page translation:', error);
  }
};

// Function to translate specific content with fallback
export const translateSpecificContent = (content: string, targetLang: Language): string => {
  if (targetLang === 'en') {
    return content; // Return original if target is English
  }

  try {
    return translateText(content, targetLang);
  } catch (error) {
    console.error(`Error translating specific content: "${content}"`, error);
    // Fallback to original content if translation fails
    return content;
  }
};

// Function to translate by element ID with error handling
export const translateElementById = (id: string, targetLang: Language): void => {
  if (typeof document === 'undefined') {
    return;
  }

  try {
    const element = document.getElementById(id);
    if (element && element.textContent && element.textContent.trim() !== '') {
      const originalText = element.textContent;
      const translatedText = translateText(originalText, targetLang);

      if (translatedText !== originalText) {
        element.textContent = translatedText;
      }
    }
  } catch (error) {
    console.error(`Error translating element by ID: "${id}"`, error);
  }
};

// Function to translate all elements with a specific class with error handling
export const translateElementsByClass = (className: string, targetLang: Language): void => {
  if (typeof document === 'undefined') {
    return;
  }

  try {
    const elements = document.querySelectorAll<HTMLElement>(`.${className}`);
    elements.forEach(element => {
      try {
        if (element.textContent && element.textContent.trim() !== '') {
          const originalText = element.textContent;
          const translatedText = translateText(originalText, targetLang);

          if (translatedText !== originalText) {
            element.textContent = translatedText;
          }
        }
      } catch (elementError) {
        console.warn(`Error translating element with class: "${className}"`, element, elementError);
      }
    });
  } catch (error) {
    console.error(`Error translating elements by class: "${className}"`, error);
  }
};

// Function to revert content back to English with error handling
export const revertToEnglish = (): void => {
  // This would typically involve keeping track of original text
  // For now, we'll just reload the page to get the original content
  try {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  } catch (error) {
    console.error('Error reverting to English:', error);
  }
};