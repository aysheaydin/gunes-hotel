import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Lazy loading backend - loads only the needed language
const lazyLoadBackend = {
  type: 'backend',
  init: () => {},
  read: async (language, namespace, callback) => {
    try {
      // Dynamic import - only loads the requested language file
      const translations = await import(`./${language}.json`)
      callback(null, translations.default)
    } catch (error) {
      console.error(`Failed to load language: ${language}`, error)
      callback(error, null)
    }
  }
}

i18n
  .use(lazyLoadBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en', 'it'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    },
    debug: false,
    react: {
      useSuspense: true // Enable suspense for async loading
    }
  })

export default i18n
