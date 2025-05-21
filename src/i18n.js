import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import translationKA from './locales/ka/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ka: {
        translation: translationKA
      },
      en: {
        translation: translationEN
      },
      ru: {
        translation: translationRU
      }
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      // Fallback personnalisé pour la détection
      convertDetectedLanguage: (lng) => {
        // Si la langue détectée n'est pas supportée, retourner 'ka'
        return ['ka', 'en', 'ru'].includes(lng) ? lng : 'ka';
      }
    },
    lng: 'ka', // Langue par défaut explicite
    supportedLngs: ['ka', 'en', 'ru'], // Langues supportées (ordre important)
    fallbackLng: {
      'en': ['ka'], // Si traduction anglaise manque, utiliser géorgien
      'ru': ['ka'], // Si traduction russe manque, utiliser géorgien
      'default': ['en'] // Fallback ultime (ne devrait jamais arriver)
    },
    load: 'languageOnly', // Ne pas charger les variantes régionales (ex: fr-CA)
    interpolation: {
      escapeValue: false
    },
    debug: process.env.NODE_ENV === 'development' // Mode debug seulement en dev
  });

export default i18n;
