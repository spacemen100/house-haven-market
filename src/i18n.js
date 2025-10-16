import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: translationFR
      },
      en: {
        translation: translationEN
      }
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      // Fallback personnalisé pour la détection
      convertDetectedLanguage: (lng) => {
        // Si la langue détectée n'est pas supportée, retourner 'fr'
        return ['fr', 'en'].includes(lng) ? lng : 'fr';
      }
    },
    lng: 'fr', // Langue par défaut explicite - Français
    supportedLngs: ['fr', 'en'], // Langues supportées
    fallbackLng: {
      'en': ['fr'], // Si traduction anglaise manque, utiliser français
      'default': ['fr'] // Fallback ultime
    },
    load: 'languageOnly', // Ne pas charger les variantes régionales
    interpolation: {
      escapeValue: false
    },
    debug: process.env.NODE_ENV === 'development'
  });

export default i18n;