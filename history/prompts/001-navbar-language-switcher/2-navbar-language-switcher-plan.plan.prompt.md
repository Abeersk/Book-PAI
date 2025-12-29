---
id: 2-navbar-language-switcher-plan
title: "Create Implementation Plan for Navbar Language Switcher"
stage: plan
date: 2025-12-28
surface: agent
model: Claude Sonnet 4.5
feature: navbar-language-switcher
branch: 001-navbar-language-switcher
user: default
command: "/sp.plan"
labels:
  - planning
  - docusaurus
  - language-switcher
  - i18n
  - react
links:
  spec: specs/001-navbar-language-switcher/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-navbar-language-switcher/plan.md
  - specs/001-navbar-language-switcher/research.md
  - specs/001-navbar-language-switcher/data-model.md
  - specs/001-navbar-language-switcher/quickstart.md
tests: []
---

# Create Implementation Plan for Navbar Language Switcher

## Prompt Text

/sp.plan

# Navbar Language Switcher Plan (English ↔ Urdu)

## Goal
Add a **Language** button in the right side of navbar to switch book content **English ⇆ Urdu**.

---

## Steps

### 1️⃣ Navbar Setup
- Add "Language" dropdown in `docusaurus.config.js`
- Options: English, Urdu

### 2️⃣ Components
- Create `src/components/LanguageSwitcher.tsx`
- Toggle dropdown + apply selected language

### 3️⃣ Translation Utility
- Create `src/utils/translate.ts`
- Handle English→Urdu, Urdu→English (runtime)
- No content rewrite, only translation layer

### 4️⃣ Global State
- Add `LanguageContext` for selected language
- Save preference in `localStorage`
- Wrap in `src/theme/Root.tsx`

### 5️⃣ Apply to Pages
- On language change → re-render translated content
- Ensure sidebar + routes unaffected

### 6️⃣ Test
- Check navbar, page navigation, persistence
- Confirm no console errors

---

## Expected Result
A working **English ⇆ Urdu** switcher in navbar, content translates instantly, persists across pages.

This plan ensures a functional multilingual switcher in Docusaurus without breaking current setup.

## Response Text

Successfully created the implementation plan for the Navbar Language Switcher feature. The plan includes:

1. A comprehensive implementation plan document (plan.md) outlining the technical approach, project structure, and constitution check
2. Research document (research.md) explaining the chosen translation approach and architecture decisions
3. Data model document (data-model.md) defining the entities and their relationships
4. Quickstart guide (quickstart.md) with implementation steps

The implementation plan follows a client-side translation approach using React Context for state management and localStorage for persistence. It maintains compatibility with Docusaurus routing while enabling real-time content translation between English and Urdu.

## Outcome

Successfully completed Phase 0 and Phase 1 of the planning workflow for the Navbar Language Switcher feature. All required documentation artifacts have been created, including the implementation plan, research findings, data model, and quickstart guide. The plan aligns with the project constitution and is ready for the task generation phase.

## Evaluation

The implementation plan meets all requirements for clarity, completeness, and technical feasibility. All mandatory sections were completed, and the plan is ready for the next phase of task generation.