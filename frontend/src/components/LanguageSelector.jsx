import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '@mui/icons-material';
import '../styles/glassmorphism.css';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  
  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'es', name: t('spanish'), flag: '🇪🇸' },
    { code: 'fr', name: t('french'), flag: '🇫🇷' },
    { code: 'de', name: t('german'), flag: '🇩🇪' },
    { code: 'zh', name: t('chinese'), flag: '🇨🇳' },
    { code: 'ar', name: t('arabic'), flag: '🇸🇦' },
    { code: 'hi', name: t('hindi'), flag: '🇮🇳' },
    { code: 'pt', name: t('portuguese'), flag: '🇵🇹' }
  ];
  
  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };
  
  return (
    <div className="relative group">
      <button className="glass-button flex items-center space-x-2 px-4 py-2">
        <Language className="text-white" />
        <span className="text-white">{t('selectLanguage')}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 glass-card hidden group-hover:block z-50">
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors ${
                i18n.language === lang.code ? 'bg-white/20' : ''
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              <span className="text-white">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;