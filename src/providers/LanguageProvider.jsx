/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useTranslation } from 'react-i18next';
import { LANGUAGE } from '../config/localStorage';

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(localStorage.getItem(LANGUAGE) ? localStorage.getItem(LANGUAGE) : 'Español');

  const onChangeLanguage = newLanguage => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    localStorage.setItem(LANGUAGE, language);
    switch (language) {
      case 'Español':
        i18n.changeLanguage('es');
        break;
      case 'English':
        i18n.changeLanguage('en');
        break;
      default:
    }
  }, [language, i18n]);

  const provider = {
    language,
    onChangeLanguage,
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
