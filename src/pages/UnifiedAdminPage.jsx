import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import useUnifiedContent from '../hooks/useUnifiedContent';
import unifiedContentService from '../services/unifiedContentService';

const UnifiedAdminPage = () => {
  const { t, currentLanguage } = useI18n();
  const { content: currentHomeData, loading, error } = useUnifiedContent();
  const [activeTab, setActiveTab] = useState('homepage');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  
  // 🔐 비밀번호 보호
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  // 관리할 데이터 상태
  const [homepageData, setHomepageData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [staticPageData, setStaticPageData] = useState({});
  const [i18nData, setI18nData] = useState({});

  // 🔐 세션에서 인증 상태 확인
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // 현재 홈화면 데이터를 관리자 페이지에 로드 (인증 후에만)
  useEffect(() => {
    if (!isAuthenticated) return; // 인증 안되면 실행 안함
    
    console.log('🔍 관리자 페이지 데이터 로드 시작');
    
    // 뉴스 데이터 로드
    const savedNews = localStorage.getItem('news_data');
    if (savedNews) {
      try {
        const parsedNews = JSON.parse(savedNews);
        console.log('✅ 뉴스 데이터 로드:', parsedNews);
        setNewsData(parsedNews);
      } catch (error) {
        console.error('❌ 뉴스 데이터 파싱 오류:', error);
      }
    }
    
    // 프로젝트 데이터 로드
    const savedProjects = localStorage.getItem('projects_data');
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        console.log('✅ 프로젝트 데이터 로드:', parsedProjects);
        setProjectData(parsedProjects);
      } catch (error) {
        console.error('❌ 프로젝트 데이터 파싱 오류:', error);
      }
    }
    
    // 다국어 데이터 로드
    const savedI18n = localStorage.getItem('i18n_data');
    if (savedI18n) {
      try {
        const parsedI18n = JSON.parse(savedI18n);
        setI18nData(parsedI18n);
      } catch (error) {
        console.error('❌ 다국어 데이터 파싱 오류:', error);
      }
    }
    
    // localStorage에서 홈페이지 데이터 로드
    const localContent = localStorage.getItem('homepage_content_ko');
    if (localContent) {
      try {
        const parsedContent = JSON.parse(localContent);
        setHomepageData(parsedContent);
      } catch (error) {
        console.error('❌ localStorage 데이터 파싱 오류:', error);
      }
    } else if (currentHomeData) {
      setHomepageData(currentHomeData);
    }
  }, [isAuthenticated, currentHomeData]);

  // 🔐 비밀번호 확인
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  // 🔐 로그아웃
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  // 🔐 인증되지 않은 경우 로그인 화면 표시
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">관리자 페이지</h2>
            <p className="text-gray-600">정호그룹 홈페이지 관리</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="비밀번호를 입력하세요"
                autoFocus
              />
              {authError && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>관리자 전용 페이지입니다</p>
          </div>
        </div>
      </div>
    );
  }


  // 데이터 저장 함수
  const saveData = async (section, data) => {
    setIsLoading(true);
    setSaveStatus('');
    
    try {
      if (section === 'homepage') {
        console.log('💾 관리자 페이지에서 저장할 데이터:', data);
        
        // Firebase에 저장
        const result = await unifiedContentService.saveContentByLanguage('ko', data);
        console.log('🔥 Firebase 저장 결과:', result);
      
      if (result.success) {
          // localStorage에도 저장 (즉시 반영을 위해)
          localStorage.setItem('homepage_content_ko', JSON.stringify(data));
          console.log('💾 localStorage 저장 완료:', data);
          
          // 🔧 커스텀 이벤트 발생 - 홈페이지에 즉시 반영
          window.dispatchEvent(new Event('homepageContentUpdated'));
          console.log('📡 homepageContentUpdated 이벤트 발생!');
          
          // 홈화면에 저장된 데이터를 반영하기 위해 forceDefault를 false로 변경
          localStorage.setItem('forceDefault', 'false');
          
          // 저장된 데이터 확인
          const savedData = localStorage.getItem('homepage_content_ko');
          console.log('🔍 저장 후 확인:', savedData ? JSON.parse(savedData) : '저장 실패');
          
          setSaveStatus('홈페이지 데이터가 저장되었습니다. 3초 후 홈화면으로 이동합니다.');
          
          // 3초 후 홈화면으로 자동 이동
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          setSaveStatus('저장 실패: ' + result.message);
        }
      } else if (section === 'news') {
        // 뉴스 데이터 저장
        console.log('💾 뉴스 데이터 저장:', data);
        localStorage.setItem('news_data', JSON.stringify(data));
        setNewsData(data);
        
        // 뉴스 업데이트 이벤트 발생
        window.dispatchEvent(new CustomEvent('newsDataUpdated'));
        
        setSaveStatus('뉴스가 저장되었습니다.');
        setTimeout(() => setSaveStatus(''), 3000);
      } else if (section === 'projects') {
        // 프로젝트 데이터 저장
        console.log('💾 프로젝트 데이터 저장:', data);
        localStorage.setItem('projects_data', JSON.stringify(data));
        setProjectData(data);
        
        // 프로젝트 업데이트 이벤트 발생
        window.dispatchEvent(new CustomEvent('projectsDataUpdated'));
        
        setSaveStatus('프로젝트가 저장되었습니다.');
        setTimeout(() => setSaveStatus(''), 3000);
      } else if (section === 'staticPages') {
        // 정적 페이지 데이터 저장
        console.log('💾 정적 페이지 데이터 저장:', data);
        localStorage.setItem('static_pages_data', JSON.stringify(data));
        setStaticPageData(data);
        
        // 정적 페이지 업데이트 이벤트 발생
        window.dispatchEvent(new CustomEvent('staticPagesDataUpdated'));
        
        setSaveStatus('정적 페이지가 저장되었습니다.');
        setTimeout(() => setSaveStatus(''), 3000);
      } else if (section === 'i18n') {
        // 다국어 데이터 저장
        console.log('💾 다국어 데이터 저장 시작');
        console.log('📦 저장할 데이터:', data);
        console.log('📦 데이터 구조:', Object.keys(data));
        
        // flat key를 nested 구조로 변환
        const convertFlatToNested = (flatData) => {
          const nested = {};
          
          Object.keys(flatData).forEach(lang => {
            nested[lang] = {};
            const langData = flatData[lang];
            
            Object.keys(langData).forEach(key => {
              const value = langData[key];
              const keys = key.split('.');
              let target = nested[lang];
              
              // 중첩 객체 생성
              for (let i = 0; i < keys.length - 1; i++) {
                if (!target[keys[i]]) {
                  target[keys[i]] = {};
                }
                target = target[keys[i]];
              }
              
              // 마지막 키에 값 설정
              target[keys[keys.length - 1]] = value;
            });
          });
          
          return nested;
        };
        
        const nestedData = convertFlatToNested(data);
        console.log('🔄 flat -> nested 변환 완료:', nestedData);
        
        localStorage.setItem('i18n_data', JSON.stringify(data));
        console.log('✅ i18n_data 저장 완료 (flat)');
        
        // 중요: i18nTranslations에는 nested 구조로 저장
        localStorage.setItem('i18nTranslations', JSON.stringify(nestedData));
        console.log('✅ i18nTranslations 저장 완료 (nested)');
        
        // 저장된 데이터 확인
        const saved = localStorage.getItem('i18nTranslations');
        console.log('🔍 저장 확인:', saved ? '성공' : '실패');
        
        setI18nData(data);
        
        // 다국어 업데이트 이벤트 발생
        console.log('📡 i18nDataUpdated 이벤트 발생');
        window.dispatchEvent(new CustomEvent('i18nDataUpdated'));
        
        // 강제 리렌더링을 위해 languageChanged 이벤트도 발생
        console.log('📡 languageChanged 이벤트 발생 (강제 리렌더링)');
        const currentLang = localStorage.getItem('preferredLanguage') || 'ko';
        window.dispatchEvent(new CustomEvent('languageChanged', { 
          detail: { language: currentLang }
        }));
        
        setSaveStatus('✅ 다국어 번역이 저장되었습니다!');
        setTimeout(() => setSaveStatus(''), 3000);
        
        alert('✅ 다국어 번역이 저장되었습니다!\n\n홈페이지를 새로고침하면 변경사항이 반영됩니다.');
      }
      // 다른 섹션들도 여기에 추가...
    } catch (error) {
      console.error('데이터 저장 오류:', error);
      setSaveStatus('저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 탭 메뉴 구성
  const tabs = [
    { id: 'homepage', label: '🏠 홈페이지 관리', icon: '🏠' },
    { id: 'news', label: '📰 뉴스 관리', icon: '📰' },
    { id: 'projects', label: '🎯 프로젝트 관리', icon: '🎯' },
    { id: 'static', label: '📄 정적 페이지 관리', icon: '📄' },
    { id: 'i18n', label: '🌐 다국어 관리', icon: '🌐' },
    { id: 'performance', label: '📊 성능 모니터링', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">통합 관리자 페이지</h1>
              <p className="text-sm text-gray-600">홈페이지 콘텐츠 및 다국어 관리</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                현재 언어: {currentLanguage}
              </div>
              <button
                onClick={() => {
                  // i18n 데이터 초기화 (이중 확인)
                  if (window.confirm('⚠️ 경고: 모든 번역 데이터가 삭제됩니다!\n\n정말 초기화하시겠습니까?')) {
                    if (window.confirm('⚠️ 최종 확인: 이 작업은 되돌릴 수 없습니다.\n\n계속하시겠습니까?')) {
                      localStorage.removeItem('i18nTranslations');
                      localStorage.removeItem('i18n_data');
                      localStorage.removeItem('preferredLanguage');
                      console.log('✅ i18n 데이터 초기화 완료');
                      alert('✅ 초기화 완료! 페이지를 새로고침합니다.');
                      window.location.reload();
                    }
                  }
                }}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                title="모든 번역 데이터를 삭제하고 기본값으로 복원합니다"
              >
                🔄 i18n 초기화
              </button>
              <button
                onClick={() => {
                  // 오래된 홈페이지 데이터 삭제
                  if (window.confirm('⚠️ 홈페이지 관리 탭의 오래된 데이터를 삭제하고\ni18n 탭의 번역만 사용하도록 전환합니다.\n\n계속하시겠습니까?')) {
                    localStorage.removeItem('homepage_content_ko');
                    localStorage.removeItem('homepage_preview');
                    console.log('✅ 오래된 홈페이지 데이터 삭제 완료');
                    alert('✅ 완료! 페이지를 새로고침합니다.');
                    window.location.reload();
                  }
                }}
                className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                title="홈페이지 관리의 오래된 텍스트 데이터를 삭제하고 i18n만 사용"
              >
                🗑️ 오래된 데이터 삭제
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm flex items-center space-x-2"
                title="로그아웃"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>로그아웃</span>
              </button>
              <button
                onClick={() => {
                  // 현재 작업 중인 데이터로 미리보기
                  const previewData = homepageData || {
                    hero: { title: '', subtitle: '', description: '' },
                    achievements: [],
                    groupOverview: { title: '', description: '' },
                    subsidiaries: []
                  };
                  localStorage.setItem('homepage_preview', JSON.stringify(previewData));
                  const previewWindow = window.open('/', '_blank');
                  if (previewWindow) {
                    previewWindow.focus();
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                미리보기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* 좌측 탭 메뉴 */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* 우측 콘텐츠 영역 */}
          <div className="flex-1">
            {/* 상태 메시지 */}
            {saveStatus && (
              <div className={`mb-4 p-4 rounded-lg ${
                saveStatus.includes('실패') || saveStatus.includes('오류')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {saveStatus}
              </div>
            )}

            {/* 로딩 상태 */}
            {isLoading && (
              <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
                저장 중...
              </div>
            )}

            {/* 탭별 콘텐츠 */}
            {activeTab === 'homepage' && (
              <HomepageManagement 
                data={homepageData}
                onSave={(data) => saveData('homepage', data)}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'news' && (
              <NewsManagement 
                data={newsData}
                onSave={(data) => saveData('news', data)}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectManagement 
                data={projectData}
                onSave={(data) => saveData('projects', data)}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'static' && (
              <StaticPageManagement 
                data={staticPageData}
                onSave={(data) => saveData('static', data)}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'i18n' && (
              <I18nManagement 
                data={i18nData}
                onSave={(data) => saveData('i18n', data)}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'performance' && (
              <PerformanceMonitoring />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 홈페이지 관리 컴포넌트
const HomepageManagement = ({ data, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: ''
    },
    achievements: [
      { number: '', suffix: '', label: '' },
      { number: '', suffix: '', label: '' },
      { number: '', suffix: '', label: '' },
      { number: '', suffix: '', label: '' }
    ],
    groupOverview: {
      title: '',
      description: '',
      vision: '',
      additionalVision: ''
    },
    subsidiaries: [
      { name: '', subtitle: '', description: '' },
      { name: '', subtitle: '', description: '' },
      { name: '', subtitle: '', description: '' },
      { name: '', subtitle: '', description: '' }
    ],
    subsidiariesIntro: {
      title: '',
      description: ''
    }
  });

  // 현재 홈화면 데이터를 폼에 로드
  useEffect(() => {
    if (data) {
      console.log('홈화면 데이터를 폼에 로드:', data);
      
      // groupOverview 안전하게 로드
      const safeGroupOverview = data.groupOverview || {
        title: '',
        description: '',
        vision: '',
        additionalVision: ''
      };
      
      setFormData({
        hero: data.hero || {
          title: '',
          subtitle: '',
          description: ''
        },
        achievements: data.achievements || [],
        groupOverview: safeGroupOverview,
        subsidiaries: data.subsidiaries || [],
        subsidiariesIntro: data.subsidiariesIntro || {
          title: '',
          description: ''
        }
      });
    }
  }, [data]);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">홈페이지 콘텐츠 관리</h2>
      
      {/* 현재 데이터 표시 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">현재 홈화면에 표시되는 데이터:</h3>
        <div className="text-sm text-gray-600">
          {data ? (
            <div>
              <p><strong>히어로 제목:</strong> {data.hero?.title || '없음'}</p>
              <p><strong>그룹 소개:</strong> {data.groupOverview?.title || '없음'}</p>
              <p><strong>계열사 수:</strong> {data.subsidiaries?.length || 0}개</p>
            </div>
          ) : (
            <p>데이터를 불러오는 중...</p>
          )}
        </div>
      </div>

      {/* 히어로 섹션 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">히어로 섹션</h3>
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>줄바꿈 사용법:</strong> 텍스트에서 줄바꿈을 원하는 곳에 <code className="bg-blue-100 px-1 rounded">\n</code>을 입력하세요.
            <br />예: "첫 번째 줄\n두 번째 줄"
          </p>
        </div>
        <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          메인 제목
        </label>
        <textarea
              value={formData.hero.title}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                hero: { ...prev.hero, title: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
              placeholder="40년 축적된 기술력으로\n조명의 미래를 혁신합니다"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          부제목
        </label>
        <textarea
              value={formData.hero.subtitle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                hero: { ...prev.hero, subtitle: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
          rows={2}
              placeholder="정호그룹은 조명제어 전문 기업으로서..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          설명
        </label>
        <textarea
              value={formData.hero.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                hero: { ...prev.hero, description: e.target.value }
              }))}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="150개 이상의 프로젝트와 85,000개 이상의 제어 포인트..."
        />
      </div>
    </div>
      </div>

      {/* 성과 지표 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">성과 지표</h3>
        <div className="grid grid-cols-2 gap-4">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={achievement.number}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[index].number = e.target.value;
                    setFormData(prev => ({ ...prev, achievements: newAchievements }));
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded"
                  placeholder="숫자"
                />
                <input
                  type="text"
                  value={achievement.suffix}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[index].suffix = e.target.value;
                    setFormData(prev => ({ ...prev, achievements: newAchievements }));
                  }}
                  className="w-16 p-2 border border-gray-300 rounded"
                  placeholder="단위"
                />
              </div>
                <input
                  type="text"
                value={achievement.label}
                onChange={(e) => {
                  const newAchievements = [...formData.achievements];
                  newAchievements[index].label = e.target.value;
                  setFormData(prev => ({ ...prev, achievements: newAchievements }));
                }}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="라벨"
              />
          </div>
        ))}
      </div>
    </div>

      {/* 그룹 소개 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">그룹 소개</h3>
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            💡 <strong>줄바꿈 사용법:</strong> 제목에서 줄바꿈을 원하는 곳에 <code className="bg-green-100 px-1 rounded">\n</code>을 입력하세요.
            <br />예: "40년 전통의\n조명제어 전문기업"
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={formData.groupOverview.title}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                groupOverview: { ...prev.groupOverview, title: e.target.value }
              }))}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              placeholder="40년 전통의 조명제어 전문기업"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 (단락 1)
            </label>
            <textarea
              value={formData.groupOverview.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                groupOverview: { ...prev.groupOverview, description: e.target.value }
              }))}
              className="w-full p-4 border border-gray-300 rounded-lg text-base"
              rows={3}
              placeholder="1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 (단락 2)
            </label>
            <textarea
              value={formData.groupOverview.vision}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                groupOverview: { ...prev.groupOverview, vision: e.target.value }
              }))}
              className="w-full p-4 border border-gray-300 rounded-lg text-base"
              rows={3}
              placeholder="B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 (단락 3)
            </label>
            <textarea
              value={formData.groupOverview.additionalVision}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                groupOverview: { ...prev.groupOverview, additionalVision: e.target.value }
              }))}
              className="w-full p-4 border border-gray-300 rounded-lg text-base"
              rows={3}
              placeholder="혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다."
            />
          </div>
        </div>
      </div>

      {/* 계열사 소개 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">계열사 소개</h3>
        
        {/* 계열사 섹션 제목과 설명 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-md font-medium mb-4">계열사 섹션 제목 및 설명</h4>
          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-700">
              💡 <strong>줄바꿈 사용법:</strong> 제목과 설명에서 줄바꿈을 원하는 곳에 <code className="bg-purple-100 px-1 rounded">\n</code>을 입력하세요.
              <br />예: "4개 계열사가 만드는\n완벽한 생태계"
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                섹션 제목
              </label>
              <textarea
                value={formData.subsidiariesIntro?.title || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  subsidiariesIntro: {
                    ...prev.subsidiariesIntro,
                    title: e.target.value
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                섹션 설명
              </label>
              <textarea
                value={formData.subsidiariesIntro?.description || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  subsidiariesIntro: {
                    ...prev.subsidiariesIntro,
                    description: e.target.value
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={2}
                placeholder="기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-700">
            💡 <strong>계열사 정보 줄바꿈:</strong> 회사명, 부제목, 설명에서 줄바꿈을 원하는 곳에 <code className="bg-orange-100 px-1 rounded">\n</code>을 입력하세요.
            <br />예: "AI 기반\n스마트 조명제어"
          </p>
        </div>
        <div className="space-y-4">
          {formData.subsidiaries.map((subsidiary, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    계열사명
                  </label>
                  <input
                    type="text"
                    value={subsidiary.name}
                    onChange={(e) => {
                      const newSubsidiaries = [...formData.subsidiaries];
                      newSubsidiaries[index].name = e.target.value;
                      setFormData(prev => ({ ...prev, subsidiaries: newSubsidiaries }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="클라루스"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    부제목
                  </label>
                  <input
                    type="text"
                    value={subsidiary.subtitle || ''}
                    onChange={(e) => {
                      const newSubsidiaries = [...formData.subsidiaries];
                      newSubsidiaries[index].subtitle = e.target.value;
                      setFormData(prev => ({ ...prev, subsidiaries: newSubsidiaries }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="AI 기반 스마트 조명/전력제어"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    설명
                  </label>
                  <textarea
                    value={subsidiary.description}
                    onChange={(e) => {
                      const newSubsidiaries = [...formData.subsidiaries];
                      newSubsidiaries[index].description = e.target.value;
                      setFormData(prev => ({ ...prev, subsidiaries: newSubsidiaries }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={2}
                    placeholder="스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문 업체"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  );
};

// 다른 관리 컴포넌트들 (간단한 구조)
const NewsManagement = ({ data, onSave, isLoading }) => {
  const [newsData, setNewsData] = useState(data || []);
  const [editingNews, setEditingNews] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('ko'); // 다국어 탭

  // 뉴스 데이터 초기화
  useEffect(() => {
    if (data) {
      setNewsData(data);
    }
  }, [data]);

  // 새 뉴스 추가
  const handleAddNews = () => {
    const newNews = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      category: '일반',
      featured: false,
      image: '',
      translations: {
        ko: { title: '', content: '' },
        en: { title: '', content: '' },
        zh: { title: '', content: '' },
        ja: { title: '', content: '' }
      }
    };
    setEditingNews(newNews);
    setShowAddForm(true);
  };

  // 뉴스 편집
  const handleEditNews = (news) => {
    setEditingNews({ ...news });
    setShowAddForm(true);
  };

  // 뉴스 삭제
  const handleDeleteNews = (id) => {
    if (window.confirm('이 뉴스를 삭제하시겠습니까?')) {
      const updatedNews = newsData.filter(news => news.id !== id);
      setNewsData(updatedNews);
      onSave(updatedNews);
    }
  };

  // 뉴스 저장
  const handleSaveNews = () => {
    // 한국어 필수 체크
    if (!editingNews.translations?.ko?.title?.trim() || !editingNews.translations?.ko?.content?.trim()) {
      alert('한국어 제목과 내용을 입력해주세요.');
      return;
    }

    let updatedNews;
    if (editingNews.id && newsData.find(news => news.id === editingNews.id)) {
      // 기존 뉴스 수정
      updatedNews = newsData.map(news => 
        news.id === editingNews.id ? editingNews : news
      );
    } else {
      // 새 뉴스 추가
      const newNews = { ...editingNews, id: Date.now().toString() };
      updatedNews = [...newsData, newNews];
    }

    setNewsData(updatedNews);
    onSave(updatedNews);
    setShowAddForm(false);
    setEditingNews(null);
  };

  // 폼 닫기
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingNews(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">뉴스 관리</h2>
        <button
          onClick={handleAddNews}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 새 뉴스 추가
        </button>
      </div>

      {/* 뉴스 목록 */}
      <div className="space-y-4">
        {newsData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 뉴스가 없습니다.
          </div>
        ) : (
          newsData.map((news) => (
            <div key={news.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">
                      {news.translations?.ko?.title || news.title || '제목 없음'}
                    </h3>
                    {news.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                        주요
                      </span>
                    )}
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {news.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{news.date}</p>
                  <p className="text-gray-700 line-clamp-2">
                    {news.translations?.ko?.content || news.content || '내용 없음'}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEditNews(news)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteNews(news.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 뉴스 편집/추가 폼 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingNews?.id && newsData.find(news => news.id === editingNews.id) ? '뉴스 수정' : '새 뉴스 추가'}
            </h3>
            
            {/* 언어 탭 */}
            <div className="flex space-x-2 mb-6 border-b">
              {[
                { code: 'ko', name: '한국어' },
                { code: 'en', name: 'English' },
                { code: 'zh', name: '中文' },
                { code: 'ja', name: '日本語' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLanguage(lang.code)}
                  className={`px-4 py-2 font-medium ${
                    activeLanguage === lang.code
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {lang.name}
                  {lang.code === 'ko' && ' *'}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              {/* 언어별 제목/내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 {activeLanguage === 'ko' && '*'}
                </label>
                <input
                  type="text"
                  value={editingNews?.translations?.[activeLanguage]?.title || ''}
                  onChange={(e) => setEditingNews(prev => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      [activeLanguage]: {
                        ...prev.translations?.[activeLanguage],
                        title: e.target.value
                      }
                    }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder={`뉴스 제목을 ${activeLanguage === 'ko' ? '입력' : '번역'}하세요`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  내용 {activeLanguage === 'ko' && '*'}
                </label>
                <textarea
                  value={editingNews?.translations?.[activeLanguage]?.content || ''}
                  onChange={(e) => setEditingNews(prev => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      [activeLanguage]: {
                        ...prev.translations?.[activeLanguage],
                        content: e.target.value
                      }
                    }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={6}
                  placeholder={`뉴스 내용을 ${activeLanguage === 'ko' ? '입력' : '번역'}하세요`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    날짜
                  </label>
                  <input
                    type="date"
                    value={editingNews?.date || ''}
                    onChange={(e) => setEditingNews(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={editingNews?.category || '일반'}
                    onChange={(e) => setEditingNews(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="일반">일반</option>
                    <option value="공지사항">공지사항</option>
                    <option value="보도자료">보도자료</option>
                    <option value="이벤트">이벤트</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이미지 URL
                </label>
                <input
                  type="url"
                  value={editingNews?.image || ''}
                  onChange={(e) => setEditingNews(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="이미지 URL을 입력하세요"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingNews?.featured || false}
                  onChange={(e) => setEditingNews(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  주요 뉴스로 설정
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleSaveNews}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectManagement = ({ data, onSave, isLoading }) => {
  const [projectData, setProjectData] = useState(data || []);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('ko'); // 다국어 탭

  // 프로젝트 데이터 초기화
  useEffect(() => {
    if (data) {
      setProjectData(data);
    }
  }, [data]);

  // 새 프로젝트 추가
  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      client: '',
      year: new Date().getFullYear().toString(),
      duration: '', // 구축(시공)기간 추가
      category: '조명제어',
      status: '완료',
      image: '',
      link: '',
      translations: {
        ko: { title: '', description: '', technologies: [], features: [] },
        en: { title: '', description: '', technologies: [], features: [] },
        zh: { title: '', description: '', technologies: [], features: [] },
        ja: { title: '', description: '', technologies: [], features: [] }
      }
    };
    setEditingProject(newProject);
    setShowAddForm(true);
  };

  // 프로젝트 편집
  const handleEditProject = (project) => {
    setEditingProject({ ...project });
    setShowAddForm(true);
  };

  // 프로젝트 삭제
  const handleDeleteProject = (id) => {
    if (window.confirm('이 프로젝트를 삭제하시겠습니까?')) {
      const updatedProjects = projectData.filter(project => project.id !== id);
      setProjectData(updatedProjects);
      onSave(updatedProjects);
    }
  };

  // 프로젝트 저장
  const handleSaveProject = () => {
    // 한국어 필수 체크
    if (!editingProject.translations?.ko?.title?.trim() || !editingProject.translations?.ko?.description?.trim()) {
      alert('한국어 제목과 설명을 입력해주세요.');
      return;
    }

    let updatedProjects;
    if (editingProject.id && projectData.find(project => project.id === editingProject.id)) {
      // 기존 프로젝트 수정
      updatedProjects = projectData.map(project => 
        project.id === editingProject.id ? editingProject : project
      );
    } else {
      // 새 프로젝트 추가
      const newProject = { ...editingProject, id: Date.now().toString() };
      updatedProjects = [...projectData, newProject];
    }

    setProjectData(updatedProjects);
    onSave(updatedProjects);
    setShowAddForm(false);
    setEditingProject(null);
  };

  // 폼 닫기
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProject(null);
  };

  // 기술 스택 추가/제거 (다국어 지원)
  const handleAddTechnology = () => {
    const tech = prompt('기술명을 입력하세요:');
    if (tech && tech.trim()) {
      setEditingProject(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [activeLanguage]: {
            ...prev.translations?.[activeLanguage],
            technologies: [...(prev.translations?.[activeLanguage]?.technologies || []), tech.trim()]
          }
        }
      }));
    }
  };

  const handleRemoveTechnology = (index) => {
    setEditingProject(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [activeLanguage]: {
          ...prev.translations?.[activeLanguage],
          technologies: prev.translations?.[activeLanguage]?.technologies?.filter((_, i) => i !== index) || []
        }
      }
    }));
  };

  // 특징 추가/제거 (다국어 지원)
  const handleAddFeature = () => {
    const feature = prompt('특징을 입력하세요:');
    if (feature && feature.trim()) {
      setEditingProject(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [activeLanguage]: {
            ...prev.translations?.[activeLanguage],
            features: [...(prev.translations?.[activeLanguage]?.features || []), feature.trim()]
          }
        }
      }));
    }
  };

  const handleRemoveFeature = (index) => {
    setEditingProject(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [activeLanguage]: {
          ...prev.translations?.[activeLanguage],
          features: prev.translations?.[activeLanguage]?.features?.filter((_, i) => i !== index) || []
        }
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">프로젝트 관리</h2>
        <button
          onClick={handleAddProject}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 새 프로젝트 추가
        </button>
      </div>

      {/* 프로젝트 목록 */}
      <div className="space-y-4">
        {projectData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 프로젝트가 없습니다.
          </div>
        ) : (
          projectData.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">
                      {project.translations?.ko?.title || project.title || '제목 없음'}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {project.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      project.status === '완료' ? 'bg-green-100 text-green-800' :
                      project.status === '진행중' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {project.client} • {project.year}
                    {project.duration && ` • ${project.duration}`}
                  </p>
                  <p className="text-gray-700 line-clamp-2">
                    {project.translations?.ko?.description || project.description || '설명 없음'}
                  </p>
                  {project.translations?.ko?.technologies && project.translations.ko.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.translations.ko.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 프로젝트 편집/추가 폼 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingProject?.id && projectData.find(project => project.id === editingProject.id) ? '프로젝트 수정' : '새 프로젝트 추가'}
            </h3>
            
            {/* 언어 탭 */}
            <div className="flex space-x-2 mb-6 border-b">
              {[
                { code: 'ko', name: '한국어' },
                { code: 'en', name: 'English' },
                { code: 'zh', name: '中文' },
                { code: 'ja', name: '日本語' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLanguage(lang.code)}
                  className={`px-4 py-2 font-medium ${
                    activeLanguage === lang.code
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {lang.name}
                  {lang.code === 'ko' && ' *'}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              {/* 언어별 제목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로젝트명 {activeLanguage === 'ko' && '*'}
                </label>
                <input
                  type="text"
                  value={editingProject?.translations?.[activeLanguage]?.title || ''}
                  onChange={(e) => setEditingProject(prev => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      [activeLanguage]: {
                        ...prev.translations?.[activeLanguage],
                        title: e.target.value
                      }
                    }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder={`프로젝트명을 ${activeLanguage === 'ko' ? '입력' : '번역'}하세요`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    클라이언트
                  </label>
                  <input
                    type="text"
                    value={editingProject?.client || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, client: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="클라이언트명을 입력하세요"
                  />
                </div>
              </div>

              {/* 언어별 설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로젝트 설명 {activeLanguage === 'ko' && '*'}
                </label>
                <textarea
                  value={editingProject?.translations?.[activeLanguage]?.description || ''}
                  onChange={(e) => setEditingProject(prev => ({
                    ...prev,
                    translations: {
                      ...prev.translations,
                      [activeLanguage]: {
                        ...prev.translations?.[activeLanguage],
                        description: e.target.value
                      }
                    }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder={`프로젝트 설명을 ${activeLanguage === 'ko' ? '입력' : '번역'}하세요`}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={editingProject?.category || '조명제어'}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="조명제어">조명제어</option>
                    <option value="전력제어">전력제어</option>
                    <option value="섬유기계">섬유기계</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상태
                  </label>
                  <select
                    value={editingProject?.status || '완료'}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="완료">완료</option>
                    <option value="진행중">진행중</option>
                    <option value="계획중">계획중</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연도
                  </label>
                  <input
                    type="number"
                    value={editingProject?.year || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="2024"
                  />
                </div>
              </div>

              {/* 구축(시공)기간 및 클라이언트 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    구축(시공)기간
                  </label>
                  <input
                    type="text"
                    value={editingProject?.duration || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="예: 4개월, 6개월, 2022.01-2022.06"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    프로젝트 구축 또는 시공에 소요된 기간을 입력하세요
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이미지 URL
                  </label>
                  <input
                    type="url"
                    value={editingProject?.image || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="프로젝트 대표 이미지 URL"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    프로젝트 목록과 상세 페이지에 표시될 대표 이미지
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로젝트 링크 (선택사항)
                </label>
                <input
                  type="url"
                  value={editingProject?.link || ''}
                  onChange={(e) => setEditingProject(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="외부 케이스 스터디나 상세 페이지 URL"
                />
                <p className="mt-1 text-xs text-gray-500">
                  프로젝트 상세 정보 페이지, 고객사 웹사이트, 보도자료 등의 링크 (선택사항)
                </p>
              </div>

              {/* 언어별 기술 스택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사용 기술 ({activeLanguage === 'ko' ? '한국어' : activeLanguage === 'en' ? 'English' : activeLanguage === 'zh' ? '中文' : '日本語'})
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingProject?.translations?.[activeLanguage]?.technologies?.map((tech, index) => (
                    <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100"
                >
                  + 기술 추가
                </button>
              </div>

              {/* 언어별 프로젝트 특징 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로젝트 특징 ({activeLanguage === 'ko' ? '한국어' : activeLanguage === 'en' ? 'English' : activeLanguage === 'zh' ? '中文' : '日本語'})
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingProject?.translations?.[activeLanguage]?.features?.map((feature, index) => (
                    <span key={index} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100"
                >
                  + 특징 추가
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleSaveProject}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StaticPageManagement = ({ data, onSave, isLoading }) => {
  const [staticPageData, setStaticPageData] = useState(data || {});
  const [editingPage, setEditingPage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // 정적 페이지 데이터 초기화
  useEffect(() => {
    if (data) {
      setStaticPageData(data);
    }
  }, [data]);

  // 새 페이지 추가
  const handleAddPage = () => {
    const newPage = {
      id: Date.now().toString(),
      title: '',
      content: '',
      slug: '',
      category: '회사소개',
      status: '활성',
      metaDescription: '',
      keywords: [],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setEditingPage(newPage);
    setShowAddForm(true);
  };

  // 페이지 편집
  const handleEditPage = (page) => {
    setEditingPage({ ...page });
    setShowAddForm(true);
  };

  // 페이지 삭제
  const handleDeletePage = (id) => {
    if (window.confirm('이 페이지를 삭제하시겠습니까?')) {
      const updatedPages = { ...staticPageData };
      delete updatedPages[id];
      setStaticPageData(updatedPages);
      onSave(updatedPages);
    }
  };

  // 페이지 저장
  const handleSavePage = () => {
    if (!editingPage.title.trim() || !editingPage.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const updatedPages = {
      ...staticPageData,
      [editingPage.id]: {
        ...editingPage,
        lastModified: new Date().toISOString().split('T')[0]
      }
    };

    setStaticPageData(updatedPages);
    onSave(updatedPages);
    setShowAddForm(false);
    setEditingPage(null);
  };

  // 폼 닫기
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingPage(null);
  };

  // 키워드 추가/제거
  const handleAddKeyword = () => {
    const keyword = prompt('키워드를 입력하세요:');
    if (keyword && keyword.trim()) {
      setEditingPage(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keyword.trim()]
      }));
    }
  };

  const handleRemoveKeyword = (index) => {
    setEditingPage(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  // 슬러그 자동 생성
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title) => {
    setEditingPage(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const pages = Object.values(staticPageData);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">정적 페이지 관리</h2>
        <button
          onClick={handleAddPage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 새 페이지 추가
        </button>
      </div>

      {/* 페이지 목록 */}
      <div className="space-y-4">
        {pages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            등록된 페이지가 없습니다.
          </div>
        ) : (
          pages.map((page) => (
            <div key={page.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-lg">{page.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {page.category}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      page.status === '활성' ? 'bg-green-100 text-green-800' :
                      page.status === '비활성' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">/{page.slug} • 수정일: {page.lastModified}</p>
                  <p className="text-gray-700 line-clamp-2">{page.content}</p>
                  {page.keywords && page.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {page.keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEditPage(page)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지 편집/추가 폼 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingPage?.id && staticPageData[editingPage.id] ? '페이지 수정' : '새 페이지 추가'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    페이지 제목 *
                  </label>
                  <input
                    type="text"
                    value={editingPage?.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="페이지 제목을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL 슬러그
                  </label>
                  <input
                    type="text"
                    value={editingPage?.slug || ''}
                    onChange={(e) => setEditingPage(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="url-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  페이지 내용 *
                </label>
                <textarea
                  value={editingPage?.content || ''}
                  onChange={(e) => setEditingPage(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={8}
                  placeholder="페이지 내용을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={editingPage?.category || '회사소개'}
                    onChange={(e) => setEditingPage(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="회사소개">회사소개</option>
                    <option value="연혁">연혁</option>
                    <option value="오시는길">오시는길</option>
                    <option value="개인정보처리방침">개인정보처리방침</option>
                    <option value="이용약관">이용약관</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상태
                  </label>
                  <select
                    value={editingPage?.status || '활성'}
                    onChange={(e) => setEditingPage(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="활성">활성</option>
                    <option value="비활성">비활성</option>
                    <option value="개발중">개발중</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  메타 설명
                </label>
                <textarea
                  value={editingPage?.metaDescription || ''}
                  onChange={(e) => setEditingPage(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={2}
                  placeholder="SEO를 위한 페이지 설명을 입력하세요"
                />
              </div>

              {/* 키워드 관리 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO 키워드
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingPage?.keywords?.map((keyword, index) => (
                    <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100"
                >
                  + 키워드 추가
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleSavePage}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const I18nManagement = ({ data, onSave, isLoading }) => {
  const [i18nData, setI18nData] = useState(data || {});
  const [activeLanguage, setActiveLanguage] = useState('ko');
  const [editingKey, setEditingKey] = useState('');
  const [editingValue, setEditingValue] = useState('');
  const [koreanReferenceData, setKoreanReferenceData] = useState({});

  // 한국어 참고 데이터 로드 (homepage_content_ko에서 직접 읽기)
  useEffect(() => {
    const loadKoreanReference = () => {
      try {
        const homepageContent = localStorage.getItem('homepage_content_ko');
        if (homepageContent) {
          const parsed = JSON.parse(homepageContent);
          // homepage_content_ko 구조를 i18n 평평한 키 구조로 변환
          const reference = {
            'home.hero.title': parsed.hero?.title || '',
            'home.hero.subtitle': parsed.hero?.subtitle || '',
            'home.hero.description': parsed.hero?.description || '',
            'home.hero.primaryAction': '사업영역 보기',
            'home.hero.secondaryAction': '문의하기',
            'home.group.title': parsed.groupOverview?.title || '',
            'home.group.para1': parsed.groupOverview?.description || '',
            'home.group.para2': parsed.groupOverview?.vision || '',
            'home.group.para3': parsed.groupOverview?.additionalVision || '',
            'home.subsidiaries.title': parsed.subsidiariesIntro?.title || '',
            'home.subsidiaries.description': parsed.subsidiariesIntro?.description || '',
            // 헤더 네비게이션
            'header.navigation.home': 'HOME',
            'header.navigation.business': '사업영역',
            'header.navigation.projects': '프로젝트',
            'header.navigation.news': '뉴스',
            'header.navigation.support': '고객지원'
          };
          setKoreanReferenceData(reference);
          console.log('✅ 한국어 참고 데이터 로드:', reference);
        }
      } catch (error) {
        console.error('❌ 한국어 참고 데이터 로드 실패:', error);
      }
    };

    loadKoreanReference();
    
    // 홈페이지 관리에서 저장할 때마다 다시 로드
    const handleHomepageUpdate = () => {
      loadKoreanReference();
    };
    
    window.addEventListener('storage', handleHomepageUpdate);
    
    return () => {
      window.removeEventListener('storage', handleHomepageUpdate);
    };
  }, []);

  // 다국어 데이터 초기화
  useEffect(() => {
    if (data) {
      setI18nData(data);
    } else {
      // 기본 다국어 데이터 구조
      const defaultI18nData = {
        ko: {
          'header.navigation.home': 'HOME',
          'header.navigation.business': '사업영역',
          'header.navigation.projects': '프로젝트',
          'header.navigation.news': '뉴스',
          'header.navigation.support': '고객지원',
          'home.hero.title': '40년 축적된 기술력으로\n조명의 미래를 혁신합니다',
          'home.hero.subtitle': '정호그룹은 조명제어 전문 기업으로서, 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다',
          'home.hero.description': '150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다.',
          'home.hero.primaryAction': '사업영역 보기',
          'home.hero.secondaryAction': '문의하기',
          'home.group.title': '40년 전통의\n조명제어 전문기업',
          'home.group.para1': '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
          'home.group.para2': 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
          'home.group.para3': '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.',
          'home.subsidiaries.title': '4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계',
          'home.subsidiaries.description': '기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출',
          'home.subsidiaries.clarus.title': '클라루스',
          'home.subsidiaries.clarus.subtitle': 'AI 기반 스마트 조명/전력제어',
          'home.subsidiaries.clarus.description': '스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문 업체',
          'home.subsidiaries.tlc.title': '정호티엘씨',
          'home.subsidiaries.tlc.subtitle': '조명/전력제어의 설계/시공/사후관리',
          'home.subsidiaries.tlc.description': '공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축하고, 사후관리를 담당하는 전문업체',
          'home.subsidiaries.illutech.title': '일루텍',
          'home.subsidiaries.illutech.subtitle': '유.무선 스마트조명제품 쇼핑몰 공급',
          'home.subsidiaries.illutech.description': '유.무선 조명제어 제품을 국내의 유명 쇼핑몰에 전문 판매, 편리한 시공기술지원 업체',
          'home.subsidiaries.texcom.title': '정호텍스컴',
          'home.subsidiaries.texcom.subtitle': '섬유기계 도염, 운영을 통해 국내 섬유산업 지원과 자체 패션브랜드 운영',
          'home.subsidiaries.texcom.description': '40년간 축적된 섬유기계 전문성과 패션브랜드 운영을 통해 새로운 가치를 창출하는 전문업체'
        },
        en: {
          'header.navigation.home': 'HOME',
          'header.navigation.business': 'BUSINESS',
          'header.navigation.projects': 'PROJECTS',
          'header.navigation.news': 'NEWS',
          'header.navigation.support': 'SUPPORT',
          'home.hero.title': 'Innovating the Future of Lighting\nwith 40 Years of Accumulated Technology',
          'home.hero.subtitle': 'Jungho Group is a professional lighting control company that supports customer success with innovative technology and perfect service',
          'home.hero.description': 'We provide the best solutions based on experience in operating more than 150 projects and over 85,000 control points.',
          'home.hero.primaryAction': 'View Business Areas',
          'home.hero.secondaryAction': 'Contact Us',
          'home.group.title': 'Professional Lighting Control Company\nwith 40 Years of Tradition',
          'home.group.para1': 'Since its establishment in 1983, Jungho Group has built expertise in the lighting control field for 40 years and presented a new paradigm of lighting control technology by developing Korea\'s first E/F2-BUS protocol in-house.',
          'home.group.para2': 'We build a complete ecosystem from B2B to B2C to meet all customer requirements, and provide Total Solution through synergy among 4 subsidiaries.',
          'home.group.para3': 'Based on innovative technology and 40 years of accumulated know-how, we support customer success and are growing into a global leader in the lighting control field.',
          'home.subsidiaries.title': 'Perfect Ecosystem of Lighting/Power Control\nand Textile Machinery by 4 Subsidiaries',
          'home.subsidiaries.description': 'Creating synergy through expertise in each field, from technology development to customer service',
          'home.subsidiaries.clarus.title': 'Clarus',
          'home.subsidiaries.clarus.subtitle': 'AI-based Smart Lighting/Power Control',
          'home.subsidiaries.clarus.description': 'Develops smart lighting/power control systems, produces core devices, and supplies them domestically and internationally',
          'home.subsidiaries.tlc.title': 'Jungho TLC',
          'home.subsidiaries.tlc.subtitle': 'Design/Construction/After-sales of Lighting/Power Control',
          'home.subsidiaries.tlc.description': 'Designs and builds optimal smart lighting environments for public institutions, office buildings, logistics and data centers, and provides after-sales service',
          'home.subsidiaries.illutech.title': 'Illutech',
          'home.subsidiaries.illutech.subtitle': 'Wired/Wireless Smart Lighting Products Shopping Mall Supply',
          'home.subsidiaries.illutech.description': 'Professionally sells wired/wireless lighting control products to famous domestic shopping malls and provides convenient construction technical support',
          'home.subsidiaries.texcom.title': 'Jungho Texcom',
          'home.subsidiaries.texcom.subtitle': 'Supporting Domestic Textile Industry and Operating Fashion Brands',
          'home.subsidiaries.texcom.description': 'Creates new value through 40 years of accumulated textile machinery expertise and fashion brand operation'
        },
        zh: {
          'header.navigation.home': 'HOME',
          'header.navigation.business': '业务领域',
          'header.navigation.projects': '项目',
          'header.navigation.news': '新闻',
          'header.navigation.support': '客户支持',
          'home.hero.title': '以40年积累的技术力\n创新照明未来',
          'home.hero.subtitle': '正浩集团是专业的照明控制企业，以创新技术和完美服务支持客户成功',
          'home.hero.description': '基于150多个项目和85,000多个控制点的运营经验，提供最佳解决方案。',
          'home.hero.primaryAction': '查看业务领域',
          'home.hero.secondaryAction': '联系我们',
          'home.group.title': '具有40年传统的\n照明控制专业企业',
          'home.group.para1': '自1983年创立以来，正浩集团在照明控制领域积累了40年的专业知识，并通过自主开发韩国首个E/F2-BUS协议，提出了照明控制技术的新范式。',
          'home.group.para2': '从B2B到B2C构建完整的生态系统，满足客户的所有需求，并通过4家子公司之间的协同效应提供整体解决方案。',
          'home.group.para3': '基于创新技术和40年积累的专业知识，我们支持客户的成功，并正在成长为照明控制领域的全球领导者。',
          'home.subsidiaries.title': '4个子公司打造的完美照明/电力控制及纺织机械生态系统',
          'home.subsidiaries.description': '从技术开发到客户服务，通过各领域专业性创造协同效应'
        },
        ja: {
          'header.navigation.home': 'HOME',
          'header.navigation.business': '事業領域',
          'header.navigation.projects': 'プロジェクト',
          'header.navigation.news': 'ニュース',
          'header.navigation.support': 'カスタマーサポート',
          'home.hero.title': '40年蓄積された技術力で\n照明の未来を革新',
          'home.hero.subtitle': '正浩グループは照明制御専門企業として、革新的な技術と完璧なサービスで顧客の成功を支援します',
          'home.hero.description': '150以上のプロジェクトと85,000以上の制御ポイント運営経験を基に最高のソリューションを提供します。',
          'home.hero.primaryAction': '事業領域を見る',
          'home.hero.secondaryAction': 'お問い合わせ',
          'home.group.title': '40年の伝統を持つ\n照明制御専門企業',
          'home.group.para1': '1983年の創立以来、40年間照明制御分野で専門性を積み重ねてきた正浩グループは、韓国初のE/F2-BUSプロトコルを自主開発し、照明制御技術の新しいパラダイムを提示しました。',
          'home.group.para2': 'B2BからB2Cまで完全なエコシステムを構築してお客様のすべての要求事項を満たし、4つの系列会社間のシナジーを通じてトータルソリューションを提供します。',
          'home.group.para3': '革新的な技術と40年間蓄積されたノウハウを基にお客様の成功を支援し、照明制御分野のグローバルリーダーとして成長しています。',
          'home.subsidiaries.title': '4つの系列会社が作る完璧な照明/電力制御及び繊維機械エコシステム',
          'home.subsidiaries.description': '技術開発から顧客サービスまで、各分野専門性によるシナジー創出'
        }
      };
      setI18nData(defaultI18nData);
    }
  }, [data]);

  // 언어별 탭 데이터
  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  // 번역 키 목록
  const translationKeys = [
    { key: 'home.hero.title', label: '히어로 제목', category: '홈페이지' },
    { key: 'home.hero.subtitle', label: '히어로 부제목', category: '홈페이지' },
    { key: 'home.hero.description', label: '히어로 설명', category: '홈페이지' },
    { key: 'home.hero.primaryAction', label: '주요 버튼', category: '홈페이지' },
    { key: 'home.hero.secondaryAction', label: '보조 버튼', category: '홈페이지' },
    { key: 'home.group.title', label: '그룹소개 제목', category: '홈페이지' },
    { key: 'home.group.para1', label: '그룹소개 단락 1', category: '홈페이지' },
    { key: 'home.group.para2', label: '그룹소개 단락 2', category: '홈페이지' },
    { key: 'home.group.para3', label: '그룹소개 단락 3', category: '홈페이지' },
    { key: 'home.subsidiaries.title', label: '계열사 섹션 제목', category: '홈페이지' },
    { key: 'home.subsidiaries.description', label: '계열사 섹션 설명', category: '홈페이지' },
    { key: 'home.subsidiaries.clarus.title', label: '클라루스 - 제목', category: '계열사' },
    { key: 'home.subsidiaries.clarus.subtitle', label: '클라루스 - 부제목', category: '계열사' },
    { key: 'home.subsidiaries.clarus.description', label: '클라루스 - 설명', category: '계열사' },
    { key: 'home.subsidiaries.tlc.title', label: '정호티엘씨 - 제목', category: '계열사' },
    { key: 'home.subsidiaries.tlc.subtitle', label: '정호티엘씨 - 부제목', category: '계열사' },
    { key: 'home.subsidiaries.tlc.description', label: '정호티엘씨 - 설명', category: '계열사' },
    { key: 'home.subsidiaries.illutech.title', label: '일루텍 - 제목', category: '계열사' },
    { key: 'home.subsidiaries.illutech.subtitle', label: '일루텍 - 부제목', category: '계열사' },
    { key: 'home.subsidiaries.illutech.description', label: '일루텍 - 설명', category: '계열사' },
    { key: 'home.subsidiaries.texcom.title', label: '정호텍스컴 - 제목', category: '계열사' },
    { key: 'home.subsidiaries.texcom.subtitle', label: '정호텍스컴 - 부제목', category: '계열사' },
    { key: 'home.subsidiaries.texcom.description', label: '정호텍스컴 - 설명', category: '계열사' }
  ];

  // 번역 편집 시작
  const handleEditTranslation = (key) => {
    setEditingKey(key);
    setEditingValue(i18nData[activeLanguage]?.[key] || '');
  };

  // 번역 저장
  const handleSaveTranslation = () => {
    if (!editingKey || !editingValue.trim()) return;

    const updatedData = {
      ...i18nData,
      [activeLanguage]: {
        ...i18nData[activeLanguage],
        [editingKey]: editingValue
      }
    };

    setI18nData(updatedData);
    setEditingKey('');
    setEditingValue('');
  };

  // 번역 취소
  const handleCancelEdit = () => {
    setEditingKey('');
    setEditingValue('');
  };

  // 모든 언어 데이터 저장 (한국어 제외)
  const handleSaveAll = () => {
    // 한국어는 홈페이지 관리에서만 수정하므로 저장에서 제외
    const dataToSave = { ...i18nData };
    // 한국어 데이터는 참고용이므로 저장하지 않음
    // (홈페이지 관리가 Single Source of Truth)
    
    console.log('💾 i18n 저장 (한국어 제외):', dataToSave);
    onSave(dataToSave);
  };

  // 번역 완성도 계산
  const getTranslationProgress = (language) => {
    const totalKeys = translationKeys.length;
    const translatedKeys = Object.keys(i18nData[language] || {}).length;
    return Math.round((translatedKeys / totalKeys) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">다국어 관리</h2>
        <button
          onClick={handleSaveAll}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? '저장 중...' : '모든 번역 저장'}
        </button>
      </div>

      {/* 언어별 탭 */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setActiveLanguage(lang.code)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeLanguage === lang.code
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>

      {/* 한국어 안내 메시지 */}
      {activeLanguage === 'ko' && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-base font-semibold text-blue-900 mb-2">
                📖 한국어는 읽기 전용 (참고 자료)
              </h3>
              <div className="text-sm text-blue-800 space-y-2">
                <div className="flex items-start">
                  <span className="font-bold mr-2">✏️</span>
                  <p><strong>수정:</strong> "홈페이지 관리" 탭에서만 가능합니다</p>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">👁️</span>
                  <p><strong>용도:</strong> 영어/일본어/중국어 번역 시 참고할 원문 제공</p>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">🔄</span>
                  <p><strong>동기화:</strong> 홈페이지 관리에서 수정하면 자동으로 여기에 표시됩니다</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-700">
                💡 <strong>팁:</strong> 영어/일본어/중국어 탭으로 이동해서 번역을 입력하세요!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 번역 목록 */}
      <div className="space-y-4">
        {translationKeys.map((item) => (
          <div key={item.key} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{item.label}</h3>
                <p className="text-sm text-gray-600">{item.key}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mt-1">
                  {item.category}
                </span>
              </div>
              {activeLanguage !== 'ko' && (
                <button
                  onClick={() => handleEditTranslation(item.key)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  편집
                </button>
              )}
              {activeLanguage === 'ko' && (
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-sm cursor-not-allowed">
                  읽기 전용
                </span>
              )}
            </div>
            
            {/* 현재 번역 표시 */}
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-700 whitespace-pre-line">
                {activeLanguage === 'ko' 
                  ? (koreanReferenceData[item.key] || i18nData[activeLanguage]?.[item.key] || '데이터 없음')
                  : (i18nData[activeLanguage]?.[item.key] || '번역되지 않음')
                }
              </p>
            </div>
            
            {/* 한국어일 때 참고 안내 */}
            {activeLanguage === 'ko' && koreanReferenceData[item.key] && (
              <div className="mt-2 text-xs text-blue-600">
                📌 홈페이지 관리 탭에서 가져온 원문입니다
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 번역 편집 모달 */}
      {editingKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {translationKeys.find(t => t.key === editingKey)?.label} 번역 편집
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {languages.find(l => l.code === activeLanguage)?.name} 번역
                </label>
                <textarea
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="번역을 입력하세요"
                />
              </div>
              
              <div className="text-sm text-gray-600">
                <p><strong>참고:</strong> 줄바꿈은 <code>\n</code>을 사용하세요</p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleSaveTranslation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PerformanceMonitoring = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-bold mb-6">성능 모니터링</h2>
    <p className="text-gray-600">성능 모니터링 기능이 곧 추가됩니다.</p>
    </div>
  );

export default UnifiedAdminPage;