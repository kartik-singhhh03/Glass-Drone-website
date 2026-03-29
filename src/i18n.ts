import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import et from './locales/et.json';

const resources = {
  en: { translation: en },
  et: { translation: et }
};

const savedLang = localStorage.getItem('lang') || 'et';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'et',
    returnEmptyString: false,
    interpolation: {
      escapeValue: false 
    }
  });

i18n.on('missingKey', (_lng, _ns, key) => {
  console.warn("Missing translation:", key);
});

// Update the html lang attribute immediately and on change
document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (lng: string) => {
  document.documentElement.lang = lng;
});

export default i18n;
