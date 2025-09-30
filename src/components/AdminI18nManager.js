import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import i18nAdvanced from '../utils/i18nAdvanced';

const AdminI18nManager = () => {
  const { t, currentLanguage, supportedLanguages } = useI18n();
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const [selectedKey, setSelectedKey] = useState('');
  const [translationValue, setTranslationValue] = useState('');
  const [translations, setTranslations] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  // 번역 데이터 로드
  useEffect(() => {
    loadTranslations();
  }, [selectedLanguage]);

  // 번역 데이터 로드
  const loadTranslations = () => {
    try {
      const storedTranslations = localStorage.getItem('i18nTranslations');
      if (storedTranslations) {
        const data = JSON.parse(storedTranslations);
        setTranslations(data);
        updateFilteredKeys(data[selectedLanguage] || {});
      } else {
        // 기본 번역 데이터 로드
        const defaultTranslations = i18nAdvanced.getDefaultTranslations();
        setTranslations(defaultTranslations);
        updateFilteredKeys(defaultTranslations[selectedLanguage] || {});
      }
    } catch (error) {
      console.error('번역 데이터 로드 오류:', error);
    }
  };

  // 현재 웹사이트에 표시된 번역 내용 가져오기
  const getCurrentDisplayedTranslations = () => {
    const currentTranslations = {};
    
    // 현재 페이지의 모든 텍스트 요소 수집
    const textElements = document.querySelectorAll('[data-i18n-key]');
    textElements.forEach(element => {
      const key = element.getAttribute('data-i18n-key');
      const currentText = element.textContent || element.value;
      if (key && currentText) {
        currentTranslations[key] = currentText;
      }
    });

    return currentTranslations;
  };

  // 필터링된 키 업데이트
  const updateFilteredKeys = (langTranslations) => {
    const keys = getAllKeys(langTranslations);
    const filtered = searchTerm 
      ? keys.filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()))
      : keys;
    setFilteredKeys(filtered);
  };

  // 중첩 객체에서 모든 키 추출
  const getAllKeys = (obj, prefix = '') => {
    let keys = [];
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(getAllKeys(obj[key], prefix ? `${prefix}.${key}` : key));
      } else {
        keys.push(prefix ? `${prefix}.${key}` : key);
      }
    }
    return keys;
  };

  // 키 선택 핸들러
  const handleKeySelect = (key) => {
    setSelectedKey(key);
    const value = getNestedValue(translations[selectedLanguage] || {}, key);
    setTranslationValue(value || '');
    setIsEditing(false);
  };

  // 중첩 객체에서 값 가져오기
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  // 중첩 객체에 값 설정
  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  };

  // 번역 저장
  const saveTranslation = () => {
    if (!selectedKey || !translationValue.trim()) {
      alert('키와 번역 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const newTranslations = { ...translations };
      if (!newTranslations[selectedLanguage]) {
        newTranslations[selectedLanguage] = {};
      }
      
      setNestedValue(newTranslations[selectedLanguage], selectedKey, translationValue);
      
      localStorage.setItem('i18nTranslations', JSON.stringify(newTranslations));
      setTranslations(newTranslations);
      updateFilteredKeys(newTranslations[selectedLanguage]);
      
      alert('번역이 저장되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('번역 저장 오류:', error);
      alert('번역 저장 중 오류가 발생했습니다.');
    }
  };

  // 번역 삭제
  const deleteTranslation = () => {
    if (!selectedKey) {
      alert('삭제할 키를 선택해주세요.');
      return;
    }

    if (confirm('정말로 이 번역을 삭제하시겠습니까?')) {
      try {
        const newTranslations = { ...translations };
        const keys = selectedKey.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => current?.[key], newTranslations[selectedLanguage]);
        
        if (target && target[lastKey]) {
          delete target[lastKey];
          localStorage.setItem('i18nTranslations', JSON.stringify(newTranslations));
          setTranslations(newTranslations);
          updateFilteredKeys(newTranslations[selectedLanguage]);
          
          setSelectedKey('');
          setTranslationValue('');
          alert('번역이 삭제되었습니다.');
        }
      } catch (error) {
        console.error('번역 삭제 오류:', error);
        alert('번역 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  // 새 번역 추가
  const addNewTranslation = () => {
    const newKey = prompt('새 번역 키를 입력하세요 (예: home.hero.title):');
    if (newKey && newKey.trim()) {
      setSelectedKey(newKey.trim());
      setTranslationValue('');
      setIsEditing(true);
    }
  };

  // 번역 편집 시작
  const startEditing = () => {
    setIsEditing(true);
    setEditingKey(selectedKey);
  };

  // 번역 편집 취소
  const cancelEditing = () => {
    setIsEditing(false);
    setEditingKey('');
    const value = getNestedValue(translations[selectedLanguage] || {}, selectedKey);
    setTranslationValue(value || '');
  };

  // 번역 내보내기
  const exportTranslations = () => {
    try {
      const dataStr = JSON.stringify(translations, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `translations_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('번역 내보내기 오류:', error);
      alert('번역 내보내기 중 오류가 발생했습니다.');
    }
  };

  // 번역 가져오기
  const importTranslations = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        const newTranslations = { ...translations, ...imported };
        localStorage.setItem('i18nTranslations', JSON.stringify(newTranslations));
        setTranslations(newTranslations);
        updateFilteredKeys(newTranslations[selectedLanguage] || {});
        alert('번역이 성공적으로 가져와졌습니다.');
      } catch (error) {
        console.error('번역 가져오기 오류:', error);
        alert('번역 파일 형식이 올바르지 않습니다.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-i18n-manager p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          다국어 관리
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          웹사이트의 다국어 번역을 관리하고 편집할 수 있습니다.
        </p>
      </div>

      {/* 현재 표시된 번역 가져오기 */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">현재 웹사이트 번역 가져오기</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          현재 웹사이트에 표시된 번역 내용을 관리자 편집창에 로드합니다.
        </p>
        <button
          onClick={() => {
            const currentTranslations = getCurrentDisplayedTranslations();
            if (Object.keys(currentTranslations).length > 0) {
              // 현재 번역을 편집창에 로드
              const firstKey = Object.keys(currentTranslations)[0];
              setSelectedKey(firstKey);
              setTranslationValue(currentTranslations[firstKey]);
              setIsEditing(true);
              alert(`${Object.keys(currentTranslations).length}개의 현재 번역을 발견했습니다.`);
            } else {
              alert('현재 페이지에서 번역 가능한 텍스트를 찾을 수 없습니다.');
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          현재 표시된 번역 가져오기
        </button>
      </div>

      {/* 언어 선택 및 검색 */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            언어 선택
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {supportedLanguages.map(lang => (
              <option key={lang} value={lang}>
                {lang === 'ko' && '🇰🇷 한국어'}
                {lang === 'en' && '🇺🇸 English'}
                {lang === 'zh' && '🇨🇳 中文'}
                {lang === 'ja' && '🇯🇵 日本語'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            번역 검색
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              updateFilteredKeys(translations[selectedLanguage] || {});
            }}
            placeholder="번역 키 검색..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={addNewTranslation}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          새 번역 추가
        </button>
        <button
          onClick={exportTranslations}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          번역 내보내기
        </button>
        <label className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
          번역 가져오기
          <input
            type="file"
            accept=".json"
            onChange={importTranslations}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 번역 키 목록 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            번역 키 목록
          </h3>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg max-h-96 overflow-y-auto">
            {filteredKeys.length > 0 ? (
              filteredKeys.map(key => (
                <button
                  key={key}
                  onClick={() => handleKeySelect(key)}
                  className={`w-full text-left px-4 py-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedKey === key ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {key}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {searchTerm ? '검색 결과가 없습니다.' : '번역 키가 없습니다.'}
              </div>
            )}
          </div>
        </div>

        {/* 번역 편집 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            번역 편집
          </h3>
          {selectedKey ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  번역 키
                </label>
                <input
                  type="text"
                  value={selectedKey}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  번역 내용
                </label>
                <textarea
                  value={translationValue}
                  onChange={(e) => setTranslationValue(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="번역 내용을 입력하세요..."
                />
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={saveTranslation}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      저장
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={startEditing}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      편집
                    </button>
                    <button
                      onClick={deleteTranslation}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              번역 키를 선택하거나 새 번역을 추가하세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminI18nManager;
