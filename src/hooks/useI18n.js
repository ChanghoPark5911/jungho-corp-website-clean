import { useState, useEffect } from 'react';
import i18nAdvanced from '../utils/i18nAdvanced';

// 다국어 지원 훅
export const useI18n = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18nAdvanced.getCurrentLanguage());
  const [isLoading, setIsLoading] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // 강제 리렌더링용

  useEffect(() => {
    // 언어 변경 이벤트 리스너
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail.language);
      setUpdateTrigger(prev => prev + 1); // 리렌더링 트리거
    };

    // i18n 데이터 업데이트 이벤트 리스너 (중요!)
    const handleI18nDataUpdate = () => {
      console.log('🔄 useI18n: i18n 데이터 업데이트 감지 - 컴포넌트 리렌더링');
      setUpdateTrigger(prev => prev + 1); // 리렌더링 트리거
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('i18nDataUpdated', handleI18nDataUpdate);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('i18nDataUpdated', handleI18nDataUpdate);
    };
  }, []);

  // 번역 함수 (updateTrigger 의존성 추가로 데이터 업데이트 시 재계산)
  const t = (key, params = {}) => {
    return i18nAdvanced.t(key, params);
  };
  
  // updateTrigger가 변경될 때마다 t() 함수가 최신 번역을 반환하도록 보장
  // (실제로는 i18nAdvanced.t()가 항상 최신 데이터를 참조하므로 문제없음)

  // 언어 변경
  const changeLanguage = (language) => {
    console.log('🔄 [useI18n.changeLanguage] 언어 변경 요청:', language);
    console.log('📦 [useI18n.changeLanguage] 현재 언어:', currentLanguage);
    
    setIsLoading(true);
    
    // i18nAdvanced에 언어 설정
    i18nAdvanced.setLanguage(language);
    
    // 로컬 state 업데이트
    setCurrentLanguage(language);
    
    // 언어 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }));
    
    console.log('⏳ [useI18n.changeLanguage] 100ms 후 페이지 새로고침...');
    
    // 페이지 새로고침으로 번역 적용
    setTimeout(() => {
      console.log('🔄 [useI18n.changeLanguage] 페이지 새로고침 실행');
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
