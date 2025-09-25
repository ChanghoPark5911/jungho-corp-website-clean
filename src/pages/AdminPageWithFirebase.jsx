// Firebase 연동된 관리자 페이지 컴포넌트
import React, { useState, useEffect } from 'react';
import SimpleHomeContentManager from '../components/admin/SimpleHomeContentManager';
import FirebaseTest from '../components/FirebaseTest';
import contentService from '../services/contentService';
import fileContentService from '../services/fileContentService';

const AdminPageWithFirebase = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태를 true로 설정
  const [saveStatus, setSaveStatus] = useState('');

  // 기본 데이터
  const defaultHomeData = {
    hero: {
      title: '정호그룹\n조명의 미래를\n만들어갑니다',
      subtitle: '40년 전통의 조명제어 전문기업',
      description: '혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다'
    },
    achievements: [
      { number: '40', label: '년 전통' },
      { number: '1000+', label: '프로젝트' },
      { number: '50+', label: '국가 진출' },
      { number: '99%', label: '고객 만족도' }
    ],
    group: {
      title: '정호그룹 소개',
      description: '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.'
    },
    subsidiaries: [
      {
        name: '클라루스',
        subtitle: '조명제어 시스템',
        description: '스마트 조명제어 솔루션 전문기업'
      },
      {
        name: '정호티엘씨',
        subtitle: 'LED 조명',
        description: '친환경 LED 조명 제품 전문기업'
      },
      {
        name: '일루텍',
        subtitle: '조명 디자인',
        description: '창의적인 조명 디자인 전문기업'
      },
      {
        name: '정호텍스컴',
        subtitle: '조명 기술',
        description: '최첨단 조명 기술 개발 전문기업'
      }
    ]
  };

  const [homeData, setHomeData] = useState(defaultHomeData);

  // 초기 로딩 완료
  useEffect(() => {
    // 초기 로딩 완료
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Firebase에서 콘텐츠 로드
  useEffect(() => {
    if (isAuthenticated) {
      loadContentFromFirebase();
    }
  }, [isAuthenticated]);

  const loadContentFromFirebase = async () => {
    setIsLoading(true);
    try {
      // 1. 로컬 스토리지에서 콘텐츠 로드 시도
      console.log('로컬 스토리지에서 콘텐츠 로드 시도...');
      const localData = localStorage.getItem('jungho-corp-content');
      
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          console.log('로컬 스토리지에서 콘텐츠 로드 성공:', parsedData);
          setHomeData(parsedData);
          return;
        } catch (error) {
          console.error('로컬 스토리지 데이터 파싱 오류:', error);
        }
      }
      
      // 2. 로컬 스토리지 실패 시 Firebase 시도
      console.log('로컬 스토리지 실패, Firebase 시도...');
      const result = await contentService.loadHomepageContent();
      if (result.success && result.data) {
        setHomeData(result.data);
        console.log('Firebase에서 콘텐츠 로드 성공:', result.data);
      } else {
        console.log('Firebase에 저장된 콘텐츠가 없습니다. 기본 데이터 사용');
      }
    } catch (error) {
      console.error('콘텐츠 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Firebase 연결 테스트
  const testFirebaseConnection = async () => {
    try {
      console.log('Firebase 연결 테스트 시작...');
      console.log('환경 변수 확인:', {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? '설정됨' : '미설정',
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '기본값 사용',
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '기본값 사용'
      });
      
      const result = await contentService.testConnection();
      if (result.success) {
        console.log('Firebase 연결 성공:', result.message);
        return true;
      } else {
        console.error('Firebase 연결 실패:', result.error);
        setSaveStatus('❌ Firebase 연결 실패: ' + result.error);
        return false;
      }
    } catch (error) {
      console.error('Firebase 연결 테스트 중 오류:', error);
      setSaveStatus('❌ Firebase 연결 테스트 실패: ' + error.message);
      return false;
    }
  };

  // 콘텐츠 저장 함수 (파일 기반 저장)
  const saveContent = async (section, data) => {
    setIsLoading(true);
    setSaveStatus('저장 중...');
    
    try {
      if (section === 'homepage') {
        console.log('파일 저장 시도:', data);
        
        // 파일 기반 저장 (Firebase 완전 제외)
        const result = await fileContentService.saveContent(data);
        
        if (result.success) {
          console.log('파일 저장 성공');
          setSaveStatus('✅ 파일에 저장 완료!');
          
          // UI 업데이트
          setHomeData(data);
          
          // 저장 후 최신 데이터 다시 로드
          setTimeout(async () => {
            await loadContentFromFirebase();
          }, 500);
          
          // 3초 후 상태 메시지 초기화
          setTimeout(() => {
            setSaveStatus('');
          }, 3000);
          
          return true;
        } else {
          setSaveStatus('❌ 파일 저장 실패: ' + result.error);
          return false;
        }
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      setSaveStatus('❌ 저장 중 오류가 발생했습니다: ' + error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setActiveTab('home');
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">관리자 로그인</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              로그인
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>기본 비밀번호: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            <div className="flex items-center space-x-4">
              {saveStatus && (
                <div className="text-sm font-medium text-blue-600">
                  {saveStatus}
                </div>
              )}
              {isLoading && (
                <div className="text-sm text-gray-500">로딩 중...</div>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">콘텐츠 관리</h2>
            
            {/* 탭 네비게이션 */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'home'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  홈페이지 콘텐츠
                </button>
                <button
                  onClick={() => setActiveTab('firebase')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'firebase'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Firebase 테스트
                </button>
              </nav>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          {activeTab === 'home' && (
            <SimpleHomeContentManager 
              data={homeData} 
              onSave={saveContent}
            />
          )}
          
          {activeTab === 'firebase' && (
            <div className="p-6">
              <FirebaseTest />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPageWithFirebase;






