import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import LanguageSelector from '../LanguageSelector';

/**
 * v2 MegaMenu 컴포넌트
 * 롯데그룹 스타일의 메가메뉴 네비게이션
 */
const MegaMenu = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 메뉴 구조 정의
  const menuStructure = [
    {
      id: 'about',
      label: 'ABOUT 정호그룹',
      path: '/about',
      submenu: [
        { label: '정호소개', path: '/about/intro', icon: '👋' },
        { label: '그룹비전 (IRGS)', path: '/about/vision', icon: '🎯' },
        { label: '경영방침', path: '/about/management', icon: '📋' },
        { label: 'CI/BI', path: '/about/ci', icon: '🎨' },
        { label: 'HISTORY', path: '/about/history', icon: '📅' },
        { label: '찾아오시는길', path: '/about/location', icon: '📍' },
      ],
    },
    {
      id: 'subsidiaries',
      label: '그룹사',
      path: '/subsidiaries',
      submenu: [
        { label: '정호티엘씨', path: '/subsidiaries/tlc', icon: '⚡', color: 'tlc' },
        { label: '클라루스', path: '/subsidiaries/clarus', icon: '💡', color: 'clarus' },
        { label: '일루텍', path: '/subsidiaries/illutech', icon: '🔆', color: 'illutech' },
        { label: '정호텍스컴', path: '/subsidiaries/texcom', icon: '🧵', color: 'texcom' },
        { label: 'RSS 사업부', path: '/subsidiaries/rss', icon: '🔧', color: 'rss' },
      ],
    },
    {
      id: 'media',
      label: '미디어/PR',
      path: '/media',
      submenu: [
        { label: '미디어 영상', path: '/media/videos', icon: '🎬' },
        { label: '홍보영상', path: '/media/promotion', icon: '📺' },
        { label: 'SNS', path: '/media/sns', icon: '📱' },
      ],
    },
    {
      id: 'support',
      label: '고객센터',
      path: '/support',
      submenu: [
        { label: '지원 제보', path: '/support/report', icon: '📝' },
        { label: '문의하기', path: '/support/contact', icon: '📧' },
      ],
    },
  ];

  // 패밀리 사이트
  const familySites = [
    { label: 'Magic CLARUS', url: 'https://www.magicclarus.com/', icon: '🛒' },
    { label: 'REDSSOCKSOO', url: 'https://www.redssocksoo.com/', icon: '👕' },
  ];

  const handleMenuHover = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setActiveMenu(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">JH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                정호그룹
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Jungho Group
              </span>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuStructure.map((menu) => (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => handleMenuHover(menu.id)}
                onMouseLeave={handleMenuLeave}
              >
                <button
                  onClick={() => handleNavigation(menu.path)}
                  className={`
                    px-4 py-2 text-sm font-semibold rounded-lg
                    transition-colors duration-200
                    ${
                      activeMenu === menu.id
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {menu.label}
                </button>

                {/* 서브메뉴 드롭다운 */}
                {activeMenu === menu.id && menu.submenu && (
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                    {menu.submenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        className={`
                          w-full flex items-center space-x-3 px-4 py-3
                          text-left text-sm
                          transition-colors duration-150
                          hover:bg-primary-50 dark:hover:bg-primary-900
                          text-gray-700 dark:text-gray-300
                          hover:text-primary-600 dark:hover:text-primary-300
                        `}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 패밀리 사이트 드롭다운 */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuHover('family')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`
                  px-4 py-2 text-sm font-semibold rounded-lg
                  transition-colors duration-200
                  ${
                    activeMenu === 'family'
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
              >
                패밀리 사이트
              </button>

              {activeMenu === 'family' && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                  {familySites.map((site, index) => (
                    <a
                      key={index}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-300"
                    >
                      <span className="text-xl">{site.icon}</span>
                      <span className="font-medium">{site.label}</span>
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽 액션 버튼들 */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              관리자
            </button>
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            {menuStructure.map((menu) => (
              <div key={menu.id} className="mb-4">
                <button
                  onClick={() => handleNavigation(menu.path)}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600"
                >
                  {menu.label}
                </button>
                {menu.submenu && (
                  <div className="ml-4 mt-2 space-y-2">
                    {menu.submenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 모바일 패밀리 사이트 */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">
                패밀리 사이트
              </p>
              <div className="space-y-2 mt-2">
                {familySites.map((site, index) => (
                  <a
                    key={index}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
                  >
                    <span>{site.icon}</span>
                    <span>{site.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 모바일 액션 버튼 */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 px-4">
              <LanguageSelector className="mb-3" />
              <button
                onClick={() => handleNavigation('/admin')}
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700"
              >
                관리자
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 메가메뉴 오버레이 (데스크톱) */}
      {activeMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-40 hidden lg:block"
          onMouseEnter={handleMenuLeave}
        />
      )}
    </header>
  );
};

export default MegaMenu;

