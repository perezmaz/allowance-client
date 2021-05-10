/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import SpainFlag from '../../../assets/img/spain.svg';
import USFlag from '../../../assets/img/united-states.svg';
import useLanguage from '../../../hooks/useLanguage';
import { logout } from '../../../api/auth';

const Header = () => {
  const { language } = useLanguage();

  const languageTitle = (
    <>
      <img
        src={language === 'Español' ? SpainFlag : USFlag}
        alt="Idioma"
        width="20px"
        className="mr-2"
      />
      {language}
    </>
  );

  const logoutUser = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header>
      <DesktopMenu
        languageTitle={languageTitle}
        logoutUser={logoutUser}
      />

      <MobileMenu
        languageTitle={languageTitle}
        logoutUser={logoutUser}
      />
    </header>
  );
};

export default Header;
