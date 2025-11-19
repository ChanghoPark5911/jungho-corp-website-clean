import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * 전통적 스타일의 레이아웃 컴포넌트
 * - 좌측 사이드바 + 메인 콘텐츠 구조
 * - 기존 정호그룹 웹사이트 스타일 모방
 */
const TraditionalLayout = ({ children, showSidebar = true, sidebarItems }) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();

  // 기본 사이드바 메뉴 (제공되지 않은 경우)
  const defaultSidebarItems = [
    { id: 'intro', label: currentLanguage === 'en' ? 'Company Intro' : '회사 소개', path: '/about/intro' },
    { id: 'vision', label: currentLanguage === 'en' ? 'Vision & Mission' : '비전/미션', path: '/about/vision' },
    { id: 'history', label: currentLanguage === 'en' ? 'History' : '연혁', path: '/about/history' },
    { id: 'cibi', label: currentLanguage === 'en' ? 'CI/BI' : 'CI/BI', path: '/about/cibi' },
    { id: 'location', label: currentLanguage === 'en' ? 'Location' : '찾아오시는 길', path: '/about/location' }
  ];

  const menuItems = sidebarItems || defaultSidebarItems;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 메인 컨테이너 - 최대 너비 1200px */}
      <div className="max-w-[1200px] mx-auto bg-white dark:bg-gray-900">
        <div className="flex">
          {/* 좌측 사이드바 */}
          {showSidebar && (
            <aside className="w-[200px] border-r border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 min-h-screen">
              <div className="py-6">
                <h3 className="px-4 mb-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Quick Menu' : '빠른 메뉴'}
                </h3>
                <nav>
                  <ul className="space-y-1">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => navigate(item.path)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-l-4 hover:border-blue-600 transition-all duration-200"
                        >
                          • {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* 추가 정보 박스 */}
                <div className="mt-8 mx-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                  <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">
                    {currentLanguage === 'en' ? '📞 Contact' : '📞 문의하기'}
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                    <strong>{currentLanguage === 'en' ? 'Tel:' : '전화:'}</strong>
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">02-553-3631</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                    <strong>{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong>
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 break-all">info@junghocorp.com</p>
                </div>
              </div>
            </aside>
          )}

          {/* 메인 콘텐츠 영역 */}
          <main className={`flex-1 ${showSidebar ? 'pl-0' : ''}`}>
            <div className="py-6 px-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* 하단 푸터 (전통적 스타일) */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 mt-12">
        <div className="max-w-[1200px] mx-auto py-6 px-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              <strong className="text-gray-800 dark:text-gray-200">
                {currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
              </strong>
            </p>
            <p className="mb-1">
              {currentLanguage === 'en' 
                ? 'Address: 3F, Jungho Building, 17, Nonhyeon-ro 116-gil, Gangnam-gu, Seoul'
                : '주소: 서울시 강남구 논현로116길 17 정호빌딩 3층'
              }
            </p>
            <p className="mb-1">
              {currentLanguage === 'en' ? 'Tel:' : '전화:'} 02-553-3631 | 
              {currentLanguage === 'en' ? ' Fax:' : ' 팩스:'} 02-553-2526
            </p>
            <p className="mb-4">
              {currentLanguage === 'en' ? 'Email:' : '이메일:'} info@junghocorp.com
            </p>
            <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Copyright ⓒ 2025 JUNGHO Corp. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TraditionalLayout;

