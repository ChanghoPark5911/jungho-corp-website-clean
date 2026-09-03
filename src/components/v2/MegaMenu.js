import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import LanguageSelector from '../LanguageSelector';

/** 계열사/페이지별 헤더 배경색 (공통가이드) */
const HEADER_BG = {
  main: '#0e1841',
  tlc: '#2e91fe',
  clarus: '#71000b',
  illutech: '#2e91fe',
  texcom: '#0e1841',
  rss: '#000000',
};

const getHeaderBgByPath = (pathname) => {
  if (pathname.includes('/subsidiaries/clarus')) return HEADER_BG.clarus;
  if (pathname.includes('/subsidiaries/jungho-tlc') || pathname.includes('/subsidiaries/tlc')) return HEADER_BG.tlc;
  if (pathname.includes('/subsidiaries/illutech')) return HEADER_BG.illutech;
  if (pathname.includes('/jungho-texcom/rss') || pathname.includes('/texcom/rss') || pathname.includes('/subsidiaries/rss')) {
    return HEADER_BG.rss;
  }
  if (pathname.includes('/subsidiaries/jungho-texcom') || pathname.includes('/subsidiaries/texcom')) {
    return HEADER_BG.texcom;
  }
  return HEADER_BG.main;
};

/**
 * v2 MegaMenu 컴포넌트
 * 롯데그룹 스타일의 메가메뉴 네비게이션
 * + 부드러운 CSS 드롭다운 애니메이션
 * 
 * @param {string} version - 버전 ('v2' 또는 'hybrid'), 기본값은 'v2'
 */
const MegaMenu = ({ version = 'v2' }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const pathPrefix = version === 'hybrid' ? '/hybrid' : '';
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null); // 모바일 아코디언 메뉴
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerBg = useMemo(
    () => getHeaderBgByPath(location.pathname),
    [location.pathname]
  );

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 스크롤 감지 - Glassmorphism 효과 전환
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 메뉴 구조 정의 (공통가이드 PDF 기준)
  const menuStructure = [
    {
      id: 'jungho',
      label: 'JUNGHO',
      path: `${pathPrefix}/about`,
      submenu: [
        { label: '정호소개', path: `${pathPrefix}/about/intro`, icon: '👋' },
        { label: '그룹비전 (IRGS)', path: `${pathPrefix}/about/vision`, icon: '🎯' },
        { label: '경영방침', path: `${pathPrefix}/about/management`, icon: '📋' },
        { label: 'CI/BI', path: `${pathPrefix}/about/ci`, icon: '🎨' },
        { label: 'HISTORY', path: `${pathPrefix}/about/history`, icon: '📅' },
        { label: '찾아오시는길', path: `${pathPrefix}/about/location`, icon: '📍' },
      ],
    },
    {
      id: 'subsidiaries',
      label: 'SUBSIDIARIES',
      path: `${pathPrefix}/subsidiaries`,
      submenu: [
        { label: '정호티엘씨', path: `${pathPrefix}/subsidiaries/jungho-tlc`, icon: '⚡', color: 'tlc' },
        { label: '클라루스', path: `${pathPrefix}/subsidiaries/clarus`, icon: '💡', color: 'clarus' },
        { label: '일루텍', path: `${pathPrefix}/subsidiaries/illutech`, icon: '🔆', color: 'illutech' },
        { label: '정호텍스컴', path: `${pathPrefix}/subsidiaries/jungho-texcom`, icon: '🧵', color: 'texcom' },
      ],
    },
    {
      id: 'business',
      label: 'BUSINESS',
      path: `${pathPrefix}/projects`,
      submenu: [
        { label: '프로젝트 영상', path: `${pathPrefix}/projects`, icon: '🏢' },
        { label: '홍보영상', path: `${pathPrefix}/media/promotion`, icon: '📺' },
        { label: '기술자료실', path: `${pathPrefix}/media/technical-docs`, icon: '📄' },
        { label: '지적재산권', path: `${pathPrefix}/media/intellectual-property`, icon: '🏆' },
        { label: 'SNS', path: `${pathPrefix}/media/sns`, icon: '📱' },
      ],
    },
    {
      id: 'news',
      label: 'NEWS',
      path: `${pathPrefix}/news`,
      submenu: [
        { label: '보도자료', path: `${pathPrefix}/news`, icon: '📰' },
        { label: '공지사항', path: `${pathPrefix}/news/notice`, icon: '📢' },
      ],
    },
    {
      id: 'customer',
      label: 'CUSTOMER',
      path: `${pathPrefix}/support`,
      submenu: [
        { label: '지원 제보', path: `${pathPrefix}/support/report`, icon: '📝' },
        { label: '문의하기', path: `${pathPrefix}/support/contact`, icon: '📧' },
      ],
    },
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
    setOpenMobileSubmenu(null); // 하위메뉴 상태 초기화
  }, [navigate]);

  return (
    <>
    <header 
      className={`
        fixed top-0 left-0 right-0 z-[100] 
        transition-all duration-500 ease-out
        ${isScrolled ? 'shadow-lg' : 'shadow-sm'}
      `}
      style={{ backgroundColor: headerBg }}
    >
      <nav className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-18 sm:h-22 lg:h-28">
          {/* 좌측: 정호 심볼 로고 → 메인 홈 */}
          <Link to={version === 'hybrid' ? '/hybrid' : '/v2'} className="flex items-center space-x-3 sm:space-x-4 group flex-shrink-0">
            <img 
              src="/assets/logos/logo-jungho_ci.png" 
              alt="정호그룹 로고" 
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-lg items-center justify-center hidden">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0e1841]">JH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight">
                {t('header.title') || '정호그룹'}
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-white/70 tracking-wide">
                Jungho Group
              </span>
            </div>
          </Link>

          {/* 우측 영역: 메뉴 + 언어 선택 + 햄버거 */}
          <div className="flex items-center space-x-2">
            {/* 데스크톱 메뉴 */}
            {isDesktop && (
              <div className="flex items-center space-x-2">
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
                      relative px-5 py-3 text-sm font-semibold
                      transition-all duration-300 ease-out
                      ${
                        activeMenu === menu.id
                          ? 'text-[#2e91fe]'
                          : 'text-white hover:text-[#2e91fe]'
                      }
                      ${menu.id === 'subsidiaries' ? 'cursor-default' : 'cursor-pointer'}
                      group
                    `}
                  >
                    {menu.label}
                    {/* Hover 언더라인 애니메이션 */}
                    <span 
                      className={`
                        absolute bottom-1 left-1/2 -translate-x-1/2 
                        h-0.5 bg-gradient-to-r from-[#2e91fe] to-[#5ba8fe]
                        transition-all duration-300 ease-out
                        ${activeMenu === menu.id ? 'w-4/5' : 'w-0 group-hover:w-4/5'}
                      `}
                    />
                  </button>

                  {/* 서브메뉴 드롭다운 - Glassmorphism 스타일 */}
                  {menu.submenu && (
                    <div
                      className={`
                        absolute left-0 top-full w-60 
                        bg-white/95 dark:bg-gray-800/95 
                        backdrop-blur-xl rounded-xl shadow-2xl 
                        border border-gray-200/60 dark:border-gray-700/60 
                        py-3 overflow-hidden
                        dropdown-menu
                        ${activeMenu === menu.id ? 'dropdown-menu-show' : ''}
                      `}
                      style={{
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      }}
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

              </div>
            )}

            {/* 햄버거 버튼 (모바일/태블릿) - 언어 선택기보다 먼저 */}
            {!isDesktop && (
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  if (mobileMenuOpen) setOpenMobileSubmenu(null); // 닫을 때 하위메뉴 초기화
                }}
                className="p-2.5 rounded-lg text-white bg-[#1a2a5e] hover:bg-[#2e91fe] transition-all shadow-sm border border-[#2e91fe]/30"
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
            <div className="ml-2 lg:ml-4 lg:pl-4 lg:border-l lg:border-[#1a2a5e]">
              <div className="scale-90 lg:scale-100">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </nav>

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

    {/* 모바일 메뉴 - 아코디언 방식 (주메뉴만 표시, 클릭 시 하위메뉴 펼침) */}
    {mobileMenuOpen && !isDesktop && (
      <div 
        className="fixed left-0 right-0 bottom-0 z-[99] overflow-y-auto animate-slide-down shadow-2xl border-t border-white/10"
        style={{ top: '72px', backgroundColor: headerBg }}
      >
        <div className="px-6 py-6 space-y-2">
          {menuStructure.map((menu) => (
            <div key={menu.id} className="border-b border-[#1a2a5e]">
              {/* 주메뉴 버튼 */}
              <button
                onClick={() => {
                  // 아코디언 토글
                  setOpenMobileSubmenu(openMobileSubmenu === menu.id ? null : menu.id);
                }}
                className="w-full flex items-center justify-between py-4 text-lg font-bold text-white hover:text-[#2e91fe] transition-colors"
              >
                <span>{menu.label}</span>
                {/* 화살표 아이콘 */}
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openMobileSubmenu === menu.id ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* 하위메뉴 (아코디언) */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openMobileSubmenu === menu.id ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 space-y-1">
                  {menu.submenu.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full flex items-center space-x-3 py-3 px-3 text-gray-300 hover:text-[#2e91fe] hover:bg-[#1a2a5e] rounded-lg transition-all"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-base">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    )}
    </>
  );
};

export default MegaMenu;
