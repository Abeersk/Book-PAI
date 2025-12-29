import React from 'react';
import BaseNavbarItem from '@theme/NavbarItem';
import LanguageSwitcher from '@site/src/components/LanguageSwitcher';

// Custom Navbar Item for Language Switcher
const LanguageSwitcherNavbarItem = (props) => {
  return (
    <BaseNavbarItem {...props}>
      <LanguageSwitcher />
    </BaseNavbarItem>
  );
};

export default LanguageSwitcherNavbarItem;