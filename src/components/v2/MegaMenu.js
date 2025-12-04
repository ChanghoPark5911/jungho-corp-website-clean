import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import LanguageSelector from '../LanguageSelector';

/**
 * v2 MegaMenu 컴포넌트
 * 롯데그룹 스타일의 메가메뉴 네비게이션
 * + 부드러운 CSS 드롭다운 애니메이션
 * 
 * @param {string} version - 버전 ('v2' 또는 'hybrid'), 기본값은 'v2'
 */
const MegaMenu = ({ version = 'v2' }) => {
  const { t, currentLanguage } = useI18n();
  const navigate = useNavigate();
  const pathPrefix = version === 'hybrid' ? '/hybrid' : '';
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 메뉴 구조 정의 (버전별 경로 prefix 적용)
  const menuStructure = [
    {
      id: 'about',
      label: currentLanguage === 'en' ? 'ABOUT' : 'ABOUT',
      path: `${pathPrefix}/about`,
      submenu: [
        { label: t('nav.about.intro') || '정호소개', path: `${pathPrefix}/about/intro`, icon: '👋' },
        { label: t('nav.about.vision') || '그룹비전 (IRGS)', path: `${pathPrefix}/about/vision`, icon: '🎯' },
        { label: t('nav.about.management') || '경영방침', path: `${pathPrefix}/about/management`, icon: '📋' },
        { label: 'CI/BI', path: `${pathPrefix}/about/ci`, icon: '🎨' },
        { label: 'HISTORY', path: `${pathPrefix}/about/history`, icon: '📅' },
        { label: t('nav.about.location') || '찾아오시는길', path: `${pathPrefix}/about/location`, icon: '📍' },
      ],
    },
    {
      id: 'subsidiaries',
      label: t('nav.subsidiaries.main') || '그룹사',
      path: `${pathPrefix}/subsidiaries`,
      submenu: [
        { label: t('nav.subsidiaries.tlc') || '정호티엘씨', path: `${pathPrefix}/subsidiaries/jungho-tlc`, icon: '⚡', color: 'tlc' },
        { label: t('nav.subsidiaries.clarus') || '클라루스', path: `${pathPrefix}/subsidiaries/clarus`, icon: '💡', color: 'clarus' },
        { label: t('nav.subsidiaries.illutech') || '일루텍', path: `${pathPrefix}/subsidiaries/illutech`, icon: '🔆', color: 'illutech' },
        { label: t('nav.subsidiaries.texcom') || '정호텍스컴', path: `${pathPrefix}/subsidiaries/jungho-texcom`, icon: '🧵', color: 'texcom' },
      ],
    },
    {
      id: 'media',
      label: t('nav.media.main') || '미디어/PR',
      path: `${pathPrefix}/projects`,
      submenu: [
        { label: t('nav.media.projects') || '프로젝트 영상', path: `${pathPrefix}/projects`, icon: '🏢' },
        { label: t('nav.media.promotion') || '홍보영상', path: `${pathPrefix}/media/promotion`, icon: '📺' },
        { label: t('nav.media.technicalDocs') || '기술자료실', path: `${pathPrefix}/media/technical-docs`, icon: '📄' },
        { label: currentLanguage === 'en' ? 'Intellectual Property' : '지적재산권', path: `${pathPrefix}/media/intellectual-property`, icon: '🏆' },
        { label: 'SNS', path: `${pathPrefix}/media/sns`, icon: '📱' },
      ],
    },
    {
      id: 'support',
      label: t('nav.support.main') || '고객센터',
      path: `${pathPrefix}/support`,
      submenu: [
        { label: t('nav.support.report') || '지원 제보', path: `${pathPrefix}/support/report`, icon: '📝' },
        { label: t('nav.support.contact') || '문의하기', path: `${pathPrefix}/support/contact`, icon: '📧' },
      ],
    },
  ];

  // 패밀리 사이트
  const familySites = [
    { label: 'Magic CLARUS', url: 'https://www.magicclarus.com/', icon: '🛒' },
    { label: 'REDSSOCKSOO', url: 'https://www.redssocksoo.com/', icon: '👕' },
  ];

  const handleMenuHover = useCallback((menuId) => {
    setActiveMenu(menuId);
  }, []);

  const handleMenuLeave = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [navigate]);

  const handleExternalLink = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setActiveMenu(null);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white dark:bg-gray-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* 로고 */}
          <Link to={version === 'hybrid' ? '/hybrid' : '/v2'} className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <img 
              src="/images/logos/jungho-logo.png" 
              alt="정호그룹 로고" 
              className="h-7 sm:h-9 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // 이미지 로드 실패 시 대체 로고 표시
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-7 h-7 sm:w-9 sm:h-9 lg:w-12 lg:h-12 bg-primary-600 rounded-lg items-center justify-center hidden">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">JH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 dark:text-white">
                {t('header.title') || '정호그룹'}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                Jungho Group
              </span>
            </div>
          </Link>

          {/* 우측 영역: 메뉴 + 언어 선택 + 햄버거 */}
          <div className="flex items-center space-x-2">
            {/* 데스크톱 메뉴 */}
            {isDesktop && (
              <div className="flex items-center space-x-1">
              {menuStructure.map((menu) => (
                <div
                  key={menu.id}
                  className="relative dropdown-container"
                  onMouseEnter={() => handleMenuHover(menu.id)}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    onClick={() => {
                      // "그룹사" 메뉴는 클릭해도 이동하지 않음 (서브메뉴만 사용)
                      if (menu.id !== 'subsidiaries') {
                        handleNavigation(menu.path);
                      }
                    }}
                    className={`
                      px-4 py-2 text-sm font-semibold rounded-lg
                      transition-colors duration-150
                      ${
                        activeMenu === menu.id
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-900 dark:text-gray-200 hover:text-primary-600 hover:bg-gray-50'
                      }
                      ${menu.id === 'subsidiaries' ? 'cursor-default' : 'cursor-pointer'}
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
                            transition-all duration-150
                            text-gray-700 dark:text-gray-200
                            hover:text-primary-600 dark:hover:text-primary-300
                            hover:bg-primary-50 dark:hover:bg-primary-900/20
                            hover:translate-x-1
                          "
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
                    transition-colors duration-150
                    ${
                      activeMenu === 'family'
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-900 dark:text-gray-200 hover:text-primary-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {t('nav.family') || '패밀리 사이트'}
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
                        transition-all duration-150
                        text-gray-700 dark:text-gray-200
                        hover:text-primary-600 dark:hover:text-primary-300
                        hover:bg-primary-50 dark:hover:bg-primary-900/20
                        hover:translate-x-1
                      "
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
              </div>
            )}

            {/* 햄버거 버튼 (모바일/태블릿) - 언어 선택기보다 먼저 */}
            {!isDesktop && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm border border-gray-200 dark:border-gray-700"
                aria-label="메뉴 열기"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            )}

            {/* 언어 선택 (항상 표시) */}
            <div className="ml-2 lg:ml-4 lg:pl-4 lg:border-l lg:border-gray-200 lg:dark:border-gray-700">
              <div className="scale-90 lg:scale-100">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && !isDesktop && (
        <div className="fixed inset-0 top-16 sm:top-20 bg-white dark:bg-gray-900 z-50 overflow-y-auto animate-slide-down shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {menuStructure.map((menu) => (
              <div key={menu.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <button
                  onClick={() => {
                    // "그룹사" 메뉴는 클릭해도 이동하지 않음 (서브메뉴만 사용)
                    if (menu.id !== 'subsidiaries') {
                      handleNavigation(menu.path);
                    }
                  }}
                  className={`w-full text-left text-lg font-semibold text-gray-900 dark:text-white mb-2 ${menu.id === 'subsidiaries' ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {menu.label}
                </button>
                <div className="pl-4 space-y-2">
                  {menu.submenu.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full flex items-center space-x-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* 패밀리 사이트 */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('nav.family') || '패밀리 사이트'}
              </div>
              <div className="pl-4 space-y-2">
                {familySites.map((site, index) => (
                  <button
                    key={index}
                    onClick={() => handleExternalLink(site.url)}
                    className="w-full flex items-center space-x-3 py-2 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <span className="text-xl">{site.icon}</span>
                    <span>{site.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 메가메뉴 오버레이 제거 - 깜박임 방지 */}

      {/* CSS 애니메이션 스타일 - 최적화 버전 */}
      <style>{`
        .dropdown-menu {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: opacity 0.15s ease-out, visibility 0.15s ease-out, transform 0.15s ease-out;
          pointer-events: none;
          margin-top: 4px;
          will-change: opacity, transform;
        }

        .dropdown-menu-show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .dropdown-container:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
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
          animation: fadeIn 0.2s ease-out;
        }

        /* 모바일 메뉴 슬라이드 애니메이션 */
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default MegaMenu;
