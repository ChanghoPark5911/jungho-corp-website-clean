import { useState, useEffect } from 'react';
import i18nAdvanced from '../utils/i18nAdvanced';

// 다국어 지원 훅
export const useI18n = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18nAdvanced.getCurrentLanguage());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 언어 변경 이벤트 리스너
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  // 번역 함수
  const t = (key, params = {}) => {
    return i18nAdvanced.t(key, params);
  };

  // 언어 변경
  const changeLanguage = (language) => {
    setIsLoading(true);
    i18nAdvanced.setLanguage(language);
    setCurrentLanguage(language);
    
    // 언어 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }));
    
    // 페이지 새로고침으로 번역 적용
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // 지원 언어 목록
  const supportedLanguages = i18nAdvanced.getSupportedLanguages();
  
  // 언어 이름 가져오기
  const getLanguageName = (code) => {
    return i18nAdvanced.getLanguageName(code);
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    supportedLanguages,
    getLanguageName,
    isLoading
  };
};

export default useI18n;
