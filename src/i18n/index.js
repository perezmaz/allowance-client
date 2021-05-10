/* eslint-disable import/no-unresolved */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en.json';
import esTranslation from './es.json';
import { LANGUAGE } from '../config/localStorage';

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
};

const language = localStorage.getItem(LANGUAGE);
let lng = '';
switch (language) {
  case 'Español':
    lng = 'es';
    break;
  case 'English':
    lng = 'en';
    break;
  default:
}

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLocale: 'es',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
