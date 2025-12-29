import React from 'react';
import LanguageSwitcherComponent from '../components/LanguageSwitcher';

// Custom Navbar Item component for Language Switcher
// This component is used by Docusaurus when type: 'custom-LanguageSwitcher' is specified
const LanguageSwitcher = (props) => {
  return <LanguageSwitcherComponent />;
};

export default LanguageSwitcher;