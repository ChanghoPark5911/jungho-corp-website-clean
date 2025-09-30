import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const LanguageSelector = ({ className = '' }) => {
  const { currentLanguage, changeLanguage, supportedLanguages, getLanguageName, isLoading } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  const currentLanguageName = getLanguageName(currentLanguage);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
      >
        <span className="text-lg">
          {currentLanguage === 'ko' && '🇰🇷'}
          {currentLanguage === 'en' && '🇺🇸'}
          {currentLanguage === 'zh' && '🇨🇳'}
          {currentLanguage === 'ja' && '🇯🇵'}
        </span>
        <span>{currentLanguageName}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 드롭다운 메뉴 */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
            {supportedLanguages.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                  currentLanguage === language 
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">
                  {language === 'ko' && '🇰🇷'}
                  {language === 'en' && '🇺🇸'}
                  {language === 'zh' && '🇨🇳'}
                  {language === 'ja' && '🇯🇵'}
                </span>
                <span>{getLanguageName(language)}</span>
                {currentLanguage === language && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;

