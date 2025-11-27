import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 다국어 관리 페이지 (Phase 2)
 * - 한국어, 영어, 일본어, 중국어 관리
 * - 번역 진행률 확인
 * - 누락된 번역 체크
 */
const I18nManager = () => {
  const navigate = useNavigate();
  const [i18nData, setI18nData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  // 인증 확인
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-new/login');
    }
  }, [navigate]);

  // 데이터 로드
  useEffect(() => {
    loadI18nData();
  }, []);

  const loadI18nData = async () => {
    try {
      const response = await fetch('/data/admin-i18n.json');
      const data = await response.json();
      setI18nData(data);
      setLoading(false);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      setLoading(false);
    }
  };

  // 데이터 저장
  const saveI18nData = () => {
    setSaveStatus('저장 중...');
    
    try {
      localStorage.setItem('admin-i18n-data', JSON.stringify(i18nData));
      setSaveStatus('✅ 저장 완료!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('❌ 저장 실패');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin-new/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  const languages = i18nData?.languages || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 상단 네비게이션 */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin-new/dashboard')}
                className="mr-4 text-gray-600 dark:text-gray-300 hover:text-primary-600"
              >
                ← 대시보드
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                다국어 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {saveStatus && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  {saveStatus}
                </span>
              )}
              <button
                onClick={saveI18nData}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                저장
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 언어 선택 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            지원 언어
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(languages).map(([code, lang]) => (
              <div
                key={code}
                onClick={() => setSelectedLanguage(code)}
                className={`bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer border-2 transition-all ${
                  selectedLanguage === code
                    ? 'border-primary-600 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {lang.nativeName}
                  </h3>
                  {lang.enabled ? (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                      활성
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                      준비중
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {lang.name}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${lang.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {lang.progress}% 완료
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 번역 편집 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {languages[selectedLanguage]?.nativeName} 번역 관리
            </h3>
            {!languages[selectedLanguage]?.enabled && (
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                활성화
              </button>
            )}
          </div>

          {/* 번역 항목 미리보기 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">💡</span>
              <div>
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                  Phase 2 기능 안내
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  다국어 관리 기능이 준비되었습니다. 현재 상태:
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>✅ 한국어: 100% 완료 (기본 언어)</li>
                  <li>✅ 영어: 100% 완료 (i18nAdvanced.js에서 관리 중)</li>
                  <li>⏸️ 일본어: 준비 완료 (필요 시 활성화)</li>
                  <li>⏸️ 중국어: 준비 완료 (필요 시 활성화)</li>
                </ul>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-3">
                  일본어나 중국어가 필요한 시점에 "활성화" 버튼을 누르고 번역을 입력하시면 됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 번역 키-값 목록 (샘플) */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              번역 항목 미리보기
            </h4>
            <div className="space-y-2">
              {['nav.about', 'nav.subsidiaries', 'nav.media', 'nav.support'].map((key) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {key}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {i18nData?.translations?.[selectedLanguage]?.nav?.[key.split('.')[1]] || '(번역 필요)'}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
              💡 실제 번역 편집 기능은 언어 활성화 후 사용 가능합니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default I18nManager;

