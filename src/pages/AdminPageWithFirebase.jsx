// Firebase 연동된 관리자 페이지 컴포넌트
import React, { useState, useEffect } from 'react';
import HomepageContentManager from '../components/admin/HomepageContentManager';
import StaticPageContentManager from '../components/admin/StaticPageContentManager';
import FirebaseTest from '../components/FirebaseTest';
import NewsManager from '../components/admin/NewsManager';
import ProjectManager from '../components/admin/ProjectManager';
import PerformanceDashboard from '../components/PerformanceDashboard';

const AdminPageWithFirebase = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('homepage');
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로딩 완료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

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
    setActiveTab('homepage');
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
                  onClick={() => setActiveTab('homepage')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'homepage'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  홈페이지 관리
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'news'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  뉴스 관리
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'projects'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  프로젝트 관리
                </button>
                <button
                  onClick={() => setActiveTab('static-pages')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'static-pages'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  정적 페이지 관리
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
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'performance'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  성능 모니터링
                </button>
              </nav>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          {activeTab === 'homepage' && (
            <div className="p-6">
              <HomepageContentManager />
            </div>
          )}
          
          {activeTab === 'news' && (
            <div className="p-6">
              <NewsManager />
            </div>
          )}
          
          {activeTab === 'projects' && (
            <div className="p-6">
              <ProjectManager />
            </div>
          )}
          
          {activeTab === 'static-pages' && (
            <div className="p-6">
              <StaticPageContentManager />
            </div>
          )}
          
          {activeTab === 'firebase' && (
            <div className="p-6">
              <FirebaseTest />
            </div>
          )}
          
          {activeTab === 'performance' && (
            <div className="p-6">
              <PerformanceDashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPageWithFirebase;






