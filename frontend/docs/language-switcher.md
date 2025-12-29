---
sidebar_position: 2
---

# Language Switcher Feature

## Overview

The Language Switcher is a feature that allows users to switch the language of the documentation between English and Urdu. This feature provides a better user experience for speakers of different languages by making the content accessible in their preferred language.

## How to Use

1. **Locate the Language Switcher**: Look for the language switcher button in the top navigation bar. It typically shows the current language (e.g., "English" or "Urdu").

2. **Open the Dropdown**: Click on the language switcher button to open the dropdown menu.

3. **Select a Language**: From the dropdown menu, select your preferred language (either "English" or "Urdu").

4. **View Translated Content**: The page content will automatically translate to your selected language.

## Features

- **Real-time Translation**: Content translates immediately when a language is selected
- **Persistent Preference**: Your language preference is saved and remembered across browser sessions
- **Comprehensive Coverage**: Translates most text content on the page including headings, paragraphs, navigation elements, and more
- **Fallback Support**: If a translation is not available, the original English text is displayed
- **Loading States**: Shows a "Translating..." indicator during the translation process
- **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation

## Technical Implementation

### Components

- `LanguageSwitcher.tsx`: The UI component that renders the language selection dropdown
- `LanguageContext.tsx`: Manages the global language state and provides translation functionality
- `translations.ts`: Contains the English-Urdu translation dictionary
- `contentTranslator.ts`: Handles the actual translation of page content

### How It Works

1. The `LanguageProvider` wraps the entire application and provides language context
2. When a user selects a language, the `changeLanguage` function is called
3. The selected language is saved to localStorage for persistence
4. The `translatePageContent` function is called to translate visible content
5. Translation happens by matching text elements and replacing them with translated equivalents

### Supported Languages

Currently supports:
- English (en)
- Urdu (ur)

Additional languages can be added by extending the translation dictionary in `translations.ts`.

## For Developers

### Adding New Translations

To add new translations, extend the `translations` object in `src/utils/translations.ts`:

```javascript
export const translations: { [key: string]: { [lang: string]: string } } = {
  // ... existing translations
  'New Term': {
    'ur': 'نیا اصطلاح'  // Add translation here
  }
};
```

### Integration

The language switcher is integrated into the Docusaurus navbar through the `docusaurus.config.js` file and is available throughout the site via the React Context API.

## Troubleshooting

- **Translations not appearing**: Make sure JavaScript is enabled in your browser
- **Language preference not saving**: Check if your browser is blocking localStorage
- **Mixed languages**: Some technical terms may not have translations and will remain in English