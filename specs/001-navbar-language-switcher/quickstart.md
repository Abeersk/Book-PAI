# Quickstart: Navbar Language Switcher

## Overview
This guide explains how to implement a language switcher in the Docusaurus navbar that allows users to switch content between English and Urdu.

## Prerequisites
- Node.js 16+ installed
- Docusaurus 2.x project set up
- Basic knowledge of React and TypeScript

## Implementation Steps

### 1. Set up Language Context
Create a React Context to manage language preferences across the application:

```bash
mkdir -p src/context
touch src/context/LanguageContext.tsx
```

### 2. Create Translation Utility
Implement a translation utility that handles English to Urdu conversions:

```bash
mkdir -p src/utils
touch src/utils/translate.ts
```

### 3. Build Language Switcher Component
Create the UI component for the language switcher:

```bash
mkdir -p src/components
touch src/components/LanguageSwitcher.tsx
```

### 4. Update Docusaurus Configuration
Modify `docusaurus.config.js` to add the language switcher to the navbar.

### 5. Implement Content Translation
Create a system to translate page content on the fly without changing the underlying markdown.

## Running the Implementation
1. Run `npm install` to ensure dependencies are installed
2. Run `npm run start` to start the development server
3. The language switcher should appear in the navbar, allowing switching between English and Urdu