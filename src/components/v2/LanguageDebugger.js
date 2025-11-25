import React, { useState, useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';

/**
 * 언어 전환 디버깅 컴포넌트
 * - 현재 언어 상태 확인
 * - localStorage 상태 확인
 * - 수동 언어 전환 테스트
 */
const LanguageDebugger = () => {
  const { currentLanguage, changeLanguage, supportedLanguages, t } = useI18n();
  const [localStorageValue, setLocalStorageValue] = useState('');
  const [sessionStorageValue, setSessionStorageValue] = useState('');
  const [memoryValue, setMemoryValue] = useState('');
  const [i18nCurrentLang, setI18nCurrentLang] = useState('');
  const [translationStatus, setTranslationStatus] = useState('');
  const [testTranslation, setTestTranslation] = useState('');

  useEffect(() => {
    // 상태 확인
    const checkStatus = () => {
      // localStorage
      try {
        const stored = localStorage.getItem('preferredLanguage');
        setLocalStorageValue(stored || '(없음)');
      } catch (e) {
        setLocalStorageValue('❌ 오류');
      }

      // sessionStorage
      try {
        const stored = sessionStorage.getItem('preferredLanguage');
        setSessionStorageValue(stored || '(없음)');
      } catch (e) {
        setSessionStorageValue('❌ 오류');
      }

      // 메모리
      if (window.i18nAdvanced && window.i18nAdvanced.memoryLanguage) {
        setMemoryValue(window.i18nAdvanced.memoryLanguage);
      } else {
        setMemoryValue('(없음)');
      }
      
      if (window.i18nAdvanced) {
        setI18nCurrentLang(window.i18nAdvanced.getCurrentLanguage());
      }

      // 번역 데이터 확인
      try {
        const translations = JSON.parse(localStorage.getItem('i18nTranslations'));
        if (translations) {
          const hasKo = translations.ko ? '✅' : '❌';
          const hasEn = translations.en ? '✅' : '❌';
          setTranslationStatus(`KO:${hasKo} EN:${hasEn}`);
        } else {
          setTranslationStatus('❌ 데이터 없음');
        }
      } catch (e) {
        setTranslationStatus('❌ 파싱 오류');
      }

      // 실제 번역 테스트
      const testKey = 'nav.support.main';
      const translated = t(testKey);
      setTestTranslation(translated || '번역 없음');
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, [t]);

  const handleManualChange = (lang) => {
    console.log('🔧 [LanguageDebugger] 수동 언어 변경:', lang);
    
    // localStorage 시도
    try {
      localStorage.setItem('preferredLanguage', lang);
      const check = localStorage.getItem('preferredLanguage');
      console.log('✅ [LanguageDebugger] localStorage 설정:', check === lang ? '성공' : '실패');
    } catch (e) {
      console.warn('⚠️ [LanguageDebugger] localStorage 실패:', e.message);
    }
    
    // sessionStorage에도 저장
    try {
      sessionStorage.setItem('preferredLanguage', lang);
      console.log('✅ [LanguageDebugger] sessionStorage 설정 성공');
    } catch (e) {
      console.warn('⚠️ [LanguageDebugger] sessionStorage 실패:', e.message);
    }
    
    // 메모리에도 저장
    if (window.i18nAdvanced) {
      window.i18nAdvanced.memoryLanguage = lang;
      console.log('✅ [LanguageDebugger] 메모리 설정 성공');
    }
    
    setTimeout(() => {
      console.log('🔄 [LanguageDebugger] 페이지 새로고침');
      window.location.reload();
    }, 100);
  };

  const handleClearStorage = () => {
    console.log('🗑️ [LanguageDebugger] 모든 저장소 완전 초기화');
    try {
      localStorage.removeItem('preferredLanguage');
      localStorage.removeItem('i18nTranslations');
      sessionStorage.removeItem('preferredLanguage');
      sessionStorage.removeItem('i18nTranslations');
      if (window.i18nAdvanced) {
        window.i18nAdvanced.memoryLanguage = null;
      }
      console.log('✅ [LanguageDebugger] 삭제 완료 - 새로고침 중...');
    } catch (e) {
      console.error('❌ [LanguageDebugger] 저장소 초기화 오류:', e);
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleResetTranslations = () => {
    console.log('🔄 [LanguageDebugger] 번역 데이터만 초기화');
    try {
      localStorage.removeItem('i18nTranslations');
      sessionStorage.removeItem('i18nTranslations');
      console.log('✅ [LanguageDebugger] i18nTranslations 삭제 완료 - 새로고침 중...');
    } catch (e) {
      console.error('❌ [LanguageDebugger] 번역 데이터 초기화 오류:', e);
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border-2 border-red-500 rounded-lg p-4 shadow-2xl max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-red-600 dark:text-red-400">🔧 언어 디버거</h3>
        <button
          onClick={() => document.getElementById('lang-debugger').style.display = 'none'}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <div className="font-semibold text-gray-700 dark:text-gray-300">현재 상태:</div>
          <div className="text-gray-600 dark:text-gray-400 mt-1 space-y-1 text-xs">
            <div>• useI18n: <span className="font-mono font-bold">{currentLanguage}</span></div>
            <div>• i18nAdvanced: <span className="font-mono font-bold">{i18nCurrentLang}</span></div>
            <div className="border-t border-gray-300 dark:border-gray-600 pt-1 mt-1">
              <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">저장소:</div>
              <div>└ localStorage: <span className="font-mono font-bold">{localStorageValue}</span></div>
              <div>└ sessionStorage: <span className="font-mono font-bold">{sessionStorageValue}</span></div>
              <div>└ memory: <span className="font-mono font-bold">{memoryValue}</span></div>
            </div>
            <div>• 번역 데이터: <span className="font-mono font-bold">{translationStatus}</span></div>
            <div className="pt-1 border-t border-gray-300 dark:border-gray-600 mt-2">
              <div className="text-xs text-gray-500 dark:text-gray-500">테스트 번역:</div>
              <div className="font-mono">"고객센터" = <span className="font-bold text-blue-600 dark:text-blue-400">"{testTranslation}"</span></div>
            </div>
          </div>
        </div>

        <div className="p-2 bg-blue-50 dark:bg-blue-900 rounded">
          <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">수동 변경:</div>
          <div className="flex gap-2">
            {supportedLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => handleManualChange(lang)}
                className={`flex-1 px-3 py-2 rounded font-semibold text-xs ${
                  currentLanguage === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                {lang === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-2 bg-yellow-50 dark:bg-yellow-900 rounded">
          <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">useI18n 변경:</div>
          <div className="flex gap-2">
            {supportedLanguages.map(lang => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className="flex-1 px-3 py-2 rounded font-semibold text-xs bg-yellow-600 text-white hover:bg-yellow-700"
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleResetTranslations}
            className="w-full px-3 py-2 bg-orange-600 text-white rounded font-semibold text-xs hover:bg-orange-700"
          >
            🔄 번역 데이터 초기화
          </button>
          <button
            onClick={handleClearStorage}
            className="w-full px-3 py-2 bg-red-600 text-white rounded font-semibold text-xs hover:bg-red-700"
          >
            🗑️ 전체 캐시 초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageDebugger;

