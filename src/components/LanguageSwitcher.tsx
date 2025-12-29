import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getAvailableLanguages } from '../utils/translations';
import styles from './LanguageSwitcher.module.css';

// Define the languages supported
type Language = string;

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, availableLanguages, changeLanguage, isLoading } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle language selection
  const handleLanguageSelect = (lang: Language) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  // Get language display name
  const getLanguageDisplayName = (lang: Language): string => {
    switch (lang) {
      case 'en':
        return 'English';
      case 'ur':
        return 'اردو';
      default:
        return lang;
    }
  };

  return (
    <div className={styles['language-switcher']} ref={dropdownRef}>
      <button
        className={`${styles['language-switcher-button']} ${isOpen ? styles['open'] : ''} ${isLoading ? styles['loading'] : ''}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change language"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className={styles['loading-text']}>Translating...</span>
        ) : (
          <>
            <span className={styles['language-name']}>{getLanguageDisplayName(currentLanguage as Language)}</span>
            <span className={`${styles['dropdown-arrow']} ${isOpen ? styles['rotated'] : ''}`} aria-hidden="true">▼</span>
          </>
        )}
      </button>

      {isOpen && !isLoading && (
        <ul className={styles['language-switcher-dropdown']} role="menu">
          {availableLanguages.map((lang) => (
            <li key={lang} role="none">
              <button
                className={`${styles['language-option']} ${currentLanguage === lang ? styles['selected'] : ''}`}
                onClick={() => handleLanguageSelect(lang as Language)}
                role="menuitem"
                aria-checked={currentLanguage === lang}
                disabled={isLoading}
              >
                <span className={styles['language-text']}>{getLanguageDisplayName(lang as Language)}</span>
                {currentLanguage === lang && <span className={styles['checkmark']} aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;