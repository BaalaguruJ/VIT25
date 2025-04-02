import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="language-switcher">
      <button 
        onClick={() => i18n.changeLanguage('en')}
        className={i18n.language === 'en' ? 'active' : ''}
      >
        {i18n.t('buttons.english')}
      </button>
      <button 
        onClick={() => i18n.changeLanguage('ta')}
        className={i18n.language === 'ta' ? 'active' : ''}
      >
        {i18n.t('buttons.tamil')}
      </button>
    </div>
  );
}

export default LanguageSwitcher;