import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import LanguageSelector from '../LanguageSelector';

/**
 * v2 MegaMenu 컴포넌트
 * 롯데그룹 스타일의 메가메뉴 네비게이션
 * + 부드러운 CSS 드롭다운 애니메이션
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
      label: 'ABOUT',
      path: '/v2/about',
      submenu: [
        { label: '정호소개', path: '/v2/about/intro', icon: '👋' },
        { label: '그룹비전 (IRGS)', path: '/v2/about/vision', icon: '🎯' },
        { label: '경영방침', path: '/v2/about/management', icon: '📋' },
        { label: 'CI/BI', path: '/v2/about/ci', icon: '🎨' },
        { label: 'HISTORY', path: '/v2/about/history', icon: '📅' },
        { label: '찾아오시는길', path: '/v2/about/location', icon: '📍' },
      ],
    },
    {
      id: 'subsidiaries',
      label: '그룹사',
      path: '/v2/subsidiaries',
      submenu: [
        { label: '정호티엘씨', path: '/v2/subsidiaries/tlc', icon: '⚡', color: 'tlc' },
        { label: '클라루스', path: '/v2/subsidiaries/clarus', icon: '💡', color: 'clarus' },
        { label: '일루텍', path: '/v2/subsidiaries/illutech', icon: '🔆', color: 'illutech' },
        { label: '정호텍스컴', path: '/v2/subsidiaries/texcom', icon: '🧵', color: 'texcom' },
        { label: 'RSS 사업부', path: '/v2/subsidiaries/rss', icon: '🔧', color: 'rss' },
      ],
    },
    {
      id: 'media',
      label: '미디어/PR',
      path: '/v2/projects', // 프로젝트 영상으로 바로 연결
      submenu: [
        { label: '프로젝트 영상', path: '/v2/projects', icon: '🏢' },
        { label: '홍보영상', path: '/v2/media/promotion', icon: '📺' },
        { label: 'SNS', path: '/v2/media/sns', icon: '📱' },
      ],
    },
    {
      id: 'support',
      label: '고객센터',
      path: '/v2/support',
      submenu: [
        { label: '지원 제보', path: '/v2/support/report', icon: '📝' },
        { label: '문의하기', path: '/v2/support/contact', icon: '📧' },
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

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setActiveMenu(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link to="/v2" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">JH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                정호그룹
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Jungho Group
              </span>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="flex items-center space-x-1">
            {menuStructure.map((menu) => (
              <div
                key={menu.id}
                className="relative dropdown-container"
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
                        : 'text-gray-900 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {menu.label}
                </button>

                {/* 서브메뉴 드롭다운 - CSS 애니메이션 (간격 제거) */}
                {menu.submenu && (
                  <div
                    className={`
                      absolute left-0 top-full w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
                      border border-gray-200 dark:border-gray-700 py-2 overflow-hidden
                      dropdown-menu
                      ${activeMenu === menu.id ? 'dropdown-menu-show' : ''}
                    `}
                  >
                    {menu.submenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        className="
                          w-full flex items-center space-x-3 px-4 py-2
                          text-left text-sm
                          transition-all duration-200
                          text-gray-700 dark:text-gray-300
                          hover:text-primary-600 dark:hover:text-primary-300
                          hover:bg-primary-50 dark:hover:bg-primary-900/20
                          hover:translate-x-1
                        "
                        style={{ animationDelay: `${index * 50}ms` }}
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
              className="relative dropdown-container"
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
                      : 'text-gray-900 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50'
                  }
                `}
              >
                패밀리 사이트
              </button>

              <div
                className={`
                  absolute left-0 top-full w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
                  border border-gray-200 dark:border-gray-700 py-2 overflow-hidden
                  dropdown-menu
                  ${activeMenu === 'family' ? 'dropdown-menu-show' : ''}
                `}
              >
                {familySites.map((site, index) => (
                  <button
                    key={index}
                    onClick={() => handleExternalLink(site.url)}
                    className="
                      w-full flex items-center justify-between px-4 py-2
                      text-left text-sm
                      transition-all duration-200
                      text-gray-700 dark:text-gray-300
                      hover:text-primary-600 dark:hover:text-primary-300
                      hover:bg-primary-50 dark:hover:bg-primary-900/20
                      hover:translate-x-1
                    "
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{site.icon}</span>
                      <span className="font-medium">{site.label}</span>
                    </div>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* 언어 선택 */}
            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <LanguageSelector />
            </div>
          </div>

          {/* 모바일 메뉴 버튼 (향후 구현) */}
          {/* <button className="lg:hidden">...</button> */}
        </div>
      </nav>

      {/* 메가메뉴 오버레이 (데스크톱) */}
      {activeMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-40 hidden lg:block fade-in"
          onMouseEnter={handleMenuLeave}
        />
      )}

      {/* CSS 애니메이션 스타일 */}
      <style jsx>{`
        .dropdown-menu {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px) scale(0.96);
          transition: all 0.3s cubic-bezier(0.04, 0.62, 0.23, 0.98);
          pointer-events: none;
          margin-top: 4px;
        }

        .dropdown-menu-show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .dropdown-container:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* 드롭다운과 버튼 사이 간격 메우기 */
        .dropdown-container::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 4px;
          background: transparent;
        }

        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
};

export default MegaMenu;
