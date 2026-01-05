import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Unimind",
      tagline: "Your AI-powered mental health companion for university students",
      startChat: "Start Chat",
      emergencyHelp: "Emergency Help",
      resources: "Resources",
      settings: "Settings",
      typeMessage: "Type your message...",
      speakNow: "Speak now...",
      listening: "Listening...",
      selectLanguage: "Select Language",
      send: "Send",
      recording: "Recording",
      stopRecording: "Stop Recording",
      login: "Login",
      register: "Register",
      logout: "Logout",
      // Chat messages
      greeting: "Hello! I'm Unimind, your mental health assistant. How can I help you today?",
      emergencyMessage: "If you're in immediate crisis, please contact emergency services or your university counseling center.",
      resourcesMessage: "Check out our resources section for helpful articles and contacts.",
      // Languages
      english: "English",
      spanish: "Spanish",
      french: "French",
      german: "German",
      chinese: "Chinese",
      arabic: "Arabic",
      hindi: "Hindi",
      portuguese: "Portuguese"
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido a Unimind",
      tagline: "Tu compañero de salud mental con IA para estudiantes universitarios",
      startChat: "Iniciar Chat",
      emergencyHelp: "Ayuda de Emergencia",
      resources: "Recursos",
      typeMessage: "Escribe tu mensaje...",
      speakNow: "Habla ahora...",
      listening: "Escuchando...",
      selectLanguage: "Seleccionar Idioma",
      send: "Enviar",
      recording: "Grabando",
      stopRecording: "Detener Grabación"
    }
  },
  // Add other languages similarly...
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;