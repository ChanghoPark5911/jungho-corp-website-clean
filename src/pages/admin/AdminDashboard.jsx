import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ projects: 0, videos: 0, faqs: 0 });

  // 인증 확인
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-new/login');
    }
  }, [navigate]);

  // 통계 로드
  useEffect(() => {
    const loadStats = async () => {
      try {
        const projectsRes = await fetch('/data/projects.json');
        const projectsData = await projectsRes.json();
        
        const faqsRes = await fetch('/data/admin-faqs.json');
        const faqsData = await faqsRes.json();
        
        setStats({
          projects: projectsData.projects?.length || 0,
          videos: 0, // 홍보영상은 나중에
          faqs: faqsData.faqs?.length || 0
        });
      } catch (error) {
        console.error('통계 로드 실패:', error);
      }
    };
    
    loadStats();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminLoginTime');
    navigate('/admin-new/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 상단 네비게이션 */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/images/logos/jungho-logo.png" 
                alt="정호그룹" 
                className="h-10 mr-3"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-10 h-10 bg-primary-600 rounded-lg items-center justify-center mr-3">
                <span className="text-xl text-white font-bold">정</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  정호그룹 관리자
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Content Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 text-sm"
              >
                홈페이지
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            관리자 대시보드
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            콘텐츠를 관리하고 업데이트하세요
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 미디어 관리 */}
          <div 
            onClick={() => navigate('/admin-new/media')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="text-xl font-bold mb-1">미디어/PR 관리</h3>
              <p className="text-sm opacity-90">프로젝트 영상, 홍보 콘텐츠 관리</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  프로젝트 {stats.projects}개
                </span>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  관리하기 →
                </span>
              </div>
            </div>
          </div>

          {/* 고객센터 관리 */}
          <div 
            onClick={() => navigate('/admin-new/support')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-bold mb-1">고객센터 관리</h3>
              <p className="text-sm opacity-90">FAQ, 문의사항 관리</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  FAQ {stats.faqs}개
                </span>
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                  관리하기 →
                </span>
              </div>
            </div>
          </div>

          {/* 다국어 관리 */}
          <div 
            onClick={() => navigate('/admin-new/i18n')}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-xl font-bold mb-1">다국어 관리</h3>
              <p className="text-sm opacity-90">한/영/일/중 번역 관리</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  한/영 활성, 일/중 준비됨
                </span>
                <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                  관리하기 →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 시스템 정보 */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📊 시스템 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                버전
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Phase 1
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                데이터 저장
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                JSON 파일
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                로그인 상태
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                활성
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
