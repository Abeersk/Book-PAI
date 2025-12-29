# Data Model: Navbar Language Switcher

## Entities

### LanguagePreference
- **id**: string (unique identifier for the preference)
- **selectedLanguage**: string (the currently selected language code, e.g., "en", "ur")
- **timestamp**: datetime (when the preference was last updated)
- **persisted**: boolean (whether the preference is stored in localStorage)

**Validation Rules**:
- selectedLanguage must be one of the supported languages ("en", "ur", etc.)
- timestamp must be a valid date/time

**State Transitions**:
- Default state: selectedLanguage = "en"
- On language selection: selectedLanguage updates to selected value
- On reset: selectedLanguage returns to default ("en")

### TranslationContent
- **id**: string (unique identifier for the content being translated)
- **originalText**: string (the original English text)
- **translatedText**: string (the translated text in the target language)
- **contentType**: string (type of content: "heading", "paragraph", "list-item", etc.)

**Validation Rules**:
- originalText and translatedText must not be empty
- contentType must be a valid content type

### LanguageSwitcherComponent
- **id**: string (component instance identifier)
- **availableLanguages**: array of strings (list of supported languages)
- **currentLanguage**: string (currently selected language)
- **isVisible**: boolean (whether the dropdown is visible)

**Validation Rules**:
- availableLanguages must contain at least 2 languages
- currentLanguage must be in availableLanguages