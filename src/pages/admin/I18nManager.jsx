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

  // 번역 데이터 내보내기 (JSON 파일 다운로드)
  const exportI18nData = () => {
    try {
      const i18nDataToExport = localStorage.getItem('admin-i18n-data');
      const data = i18nDataToExport ? JSON.parse(i18nDataToExport) : i18nData;
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `i18n-translations-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSaveStatus('✅ 번역 데이터 내보내기 완료!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('내보내기 실패:', error);
      setSaveStatus('❌ 내보내기 실패');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // 언어 활성화/비활성화
  const toggleLanguage = (langCode) => {
    const updatedLanguages = {
      ...i18nData.languages,
      [langCode]: {
        ...i18nData.languages[langCode],
        enabled: !i18nData.languages[langCode].enabled
      }
    };
    setI18nData({ ...i18nData, languages: updatedLanguages });
  };

  // 번역 값 업데이트
  const updateTranslation = (langCode, category, key, value) => {
    const updatedTranslations = {
      ...i18nData.translations,
      [langCode]: {
        ...i18nData.translations[langCode],
        [category]: {
          ...(i18nData.translations[langCode]?.[category] || {}),
          [key]: value
        }
      }
    };
    setI18nData({ ...i18nData, translations: updatedTranslations });
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
                onClick={exportI18nData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                title="번역 데이터를 JSON 파일로 다운로드합니다"
              >
                <span className="mr-2">📥</span>
                번역 내보내기
              </button>
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

        {/* 영구 저장 안내 */}
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">💾</span>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
                📌 다국어 관리 안내
              </h3>
              <ul className="text-xs text-purple-800 dark:text-purple-200 space-y-1 list-disc list-inside">
                <li>한국어와 영어는 이미 <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">i18nAdvanced.js</code>에 구현되어 있습니다</li>
                <li>일본어나 중국어가 필요할 때 해당 언어를 활성화하고 번역을 입력하세요</li>
                <li>번역 작업 후 <strong>"📥 번역 내보내기"</strong> 버튼으로 JSON 파일을 다운로드하세요</li>
                <li>개발자에게 전달하여 <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">i18nAdvanced.js</code>에 통합할 수 있습니다</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 번역 편집 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {languages[selectedLanguage]?.nativeName} 번역 관리
            </h3>
            {selectedLanguage === 'ja' || selectedLanguage === 'zh' ? (
              <button
                onClick={() => toggleLanguage(selectedLanguage)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  languages[selectedLanguage]?.enabled
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {languages[selectedLanguage]?.enabled ? '비활성화' : '활성화'}
              </button>
            ) : (
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded">
                ✅ 활성 언어
              </span>
            )}
          </div>

          {/* 현재 상태 안내 */}
          <div className="mb-6">
            {selectedLanguage === 'ko' || selectedLanguage === 'en' ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✅ <strong>{languages[selectedLanguage]?.nativeName}</strong>은(는) 이미 완전히 번역되어 있습니다.
                  <br />번역은 <code className="bg-green-100 dark:bg-green-800 px-1 rounded text-xs">src/utils/i18nAdvanced.js</code> 파일에서 관리됩니다.
                </p>
              </div>
            ) : languages[selectedLanguage]?.enabled ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>{languages[selectedLanguage]?.nativeName}</strong> 번역을 시작하세요!
                  <br />아래 양식에 번역을 입력하고 "저장" → "번역 내보내기"로 JSON을 다운로드하세요.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⏸️ <strong>{languages[selectedLanguage]?.nativeName}</strong>은(는) 비활성 상태입니다.
                  <br />"활성화" 버튼을 눌러 번역 작업을 시작하세요.
                </p>
              </div>
            )}
          </div>

          {/* 번역 편집 폼 */}
          {(selectedLanguage === 'ja' || selectedLanguage === 'zh') && languages[selectedLanguage]?.enabled && (
            <TranslationEditor
              langCode={selectedLanguage}
              translations={i18nData?.translations?.[selectedLanguage] || {}}
              onUpdate={updateTranslation}
            />
          )}

          {/* 번역 미리보기 (읽기 전용) */}
          {(selectedLanguage === 'ko' || selectedLanguage === 'en' || !languages[selectedLanguage]?.enabled) && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                번역 미리보기 (샘플)
              </h4>
              <div className="space-y-2">
                {Object.entries(i18nData?.translations?.[selectedLanguage] || {}).slice(0, 10).map(([category, values]) => (
                  Object.entries(values).slice(0, 3).map(([key, value]) => (
                    <div key={`${category}.${key}`} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {category}.{key}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {value || '(번역 없음)'}
                      </span>
                    </div>
                  ))
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// 번역 편집기 컴포넌트
const TranslationEditor = ({ langCode, translations, onUpdate }) => {
  const [expandedCategories, setExpandedCategories] = useState(['nav', 'common']);
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  const sampleStructure = {
    nav: {
      about: '',
      subsidiaries: '',
      business: '',
      media: '',
      support: ''
    },
    common: {
      readMore: '',
      contactUs: '',
      viewAll: '',
      loading: '',
      error: ''
    },
    about: {
      intro: '',
      vision: '',
      history: '',
      management: '',
      cibi: '',
      location: ''
    },
    subsidiaries: {
      clarus: '',
      illutech: '',
      tlc: '',
      texcom: ''
    }
  };

  const toggleCategory = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const startEdit = (category, key, currentValue) => {
    setEditingKey(`${category}.${key}`);
    setEditValue(currentValue || '');
  };

  const saveEdit = (category, key) => {
    onUpdate(langCode, category, key, editValue);
    setEditingKey(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditValue('');
  };

  // 번역 구조 병합 (샘플 + 실제 데이터)
  const mergedStructure = { ...sampleStructure };
  Object.keys(translations).forEach(category => {
    if (!mergedStructure[category]) {
      mergedStructure[category] = {};
    }
    mergedStructure[category] = { ...mergedStructure[category], ...translations[category] };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          번역 키-값 편집
        </h4>
        <button
          onClick={() => setExpandedCategories(Object.keys(mergedStructure))}
          className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
        >
          모두 펼치기
        </button>
      </div>

      {Object.entries(mergedStructure).map(([category, keys]) => (
        <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {/* 카테고리 헤더 */}
          <button
            onClick={() => toggleCategory(category)}
            className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-semibold text-gray-900 dark:text-white">
              📁 {category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {expandedCategories.includes(category) ? '▼' : '▶'} {Object.keys(keys).length}개 항목
            </span>
          </button>

          {/* 카테고리 내용 */}
          {expandedCategories.includes(category) && (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(keys).map(([key, value]) => {
                const fullKey = `${category}.${key}`;
                const isEditing = editingKey === fullKey;

                return (
                  <div key={key} className="p-3 bg-white dark:bg-gray-800">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                        {key}
                      </span>
                      {!isEditing && (
                        <button
                          onClick={() => startEdit(category, key, value)}
                          className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          편집
                        </button>
                      )}
                    </div>
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                          placeholder="번역 입력..."
                          autoFocus
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveEdit(category, key)}
                            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs"
                          >
                            저장
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 px-3 py-1 rounded text-xs"
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-900 dark:text-white">
                        {value || <span className="text-gray-400 italic">(번역 필요)</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 <strong>작업 순서:</strong> 각 항목의 "편집" 버튼을 눌러 번역을 입력하세요 → 상단의 "저장" 버튼 클릭 → "번역 내보내기"로 JSON 다운로드
        </p>
      </div>
    </div>
  );
};

export default I18nManager;

