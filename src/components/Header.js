import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { COMPANY_INFO, SUBSIDIARIES } from '../utils/constants';
import { getLanguage, setLanguage, languageOptions } from '../utils/i18n';
import LanguageSelector from './LanguageSelector';
import { useI18n } from '../hooks/useI18n';

const Header = ({ imageData = {} }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(getLanguage()); // 저장된 언어 설정 사용
  const { t } = useI18n(); // 다국어 지원
  const location = useLocation();
  const navigate = useNavigate();
  
  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 현재 페이지 감지
  const currentPage = (() => {
    const path = location.pathname;
    if (path === '/') return 'home';
    else if (path === '/business') return 'business';
    else if (path === '/projects') return 'projects';
    else if (path === '/support') return 'support';
    else if (path === '/news') return 'news';
    else if (path.startsWith('/clarus')) return 'clarus';
    else if (path.startsWith('/tlc')) return 'tlc';
    else if (path.startsWith('/illutech')) return 'illutech';
    else if (path.startsWith('/texcom')) return 'texcom';
    return 'home';
  })();

  // 키보드 네비게이션 처리 및 외부 클릭 감지
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // 메인 네비게이션 메뉴
  const mainNavItems = [
    { key: 'home', label: 'HOME', path: '/', ariaLabel: '홈페이지로 이동' },
    { key: 'business', label: 'BUSINESS', path: '/business', ariaLabel: '사업 영역 보기' },
    { key: 'projects', label: 'PROJECTS', path: '/projects', ariaLabel: '프로젝트 포트폴리오 보기' },
    { key: 'support', label: 'SUPPORT', path: '/support', ariaLabel: '고객 지원 서비스' },
    { key: 'news', label: 'NEWS', path: '/news', ariaLabel: '뉴스 및 소식' },
  ];

  // GROUP 드롭다운 메뉴
  const groupDropdownItems = [
    { key: 'clarus', label: '클라루스', path: '/clarus', color: SUBSIDIARIES.clarus.color, ariaLabel: '클라루스 회사 소개' },
    { key: 'tlc', label: '정호티엘씨', path: '/tlc', color: SUBSIDIARIES.tlc.color, ariaLabel: '정호티엘씨 회사 소개' },
    { key: 'illutech', label: '일루텍', path: '/illutech', color: SUBSIDIARIES.illutech.color, ariaLabel: '일루텍 회사 소개' },
    { key: 'texcom', label: '정호텍스컴', path: '/texcom', color: SUBSIDIARIES.texcom.color, ariaLabel: '정호텍스컴 회사 소개' },
  ];

  // 드롭다운 토글
  const toggleDropdown = (key) => {
    console.log('toggleDropdown 호출:', key, '현재 activeDropdown:', activeDropdown);
    const newValue = activeDropdown === key ? null : key;
    console.log('새로운 activeDropdown 값:', newValue);
    setActiveDropdown(newValue);
  };

  // GROUP 메뉴 아이템 클릭 핸들러
  const handleGroupItemClick = (path) => {
    console.log('GROUP 메뉴 클릭:', path);
    setActiveDropdown(null);
    
    // 현재 페이지와 같은 페이지인지 확인
    if (location.pathname === path) {
      console.log('같은 페이지입니다. 스크롤만 상단으로 이동');
      window.scrollTo(0, 0);
      return;
    }
    
    try {
      // 즉시 네비게이션 실행
      navigate(path, { replace: false });
      
      // 페이지 전환 후 스크롤 상단으로 이동
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      // 네비게이션 성공 확인
      console.log('네비게이션 성공:', path);
    } catch (error) {
      console.error('네비게이션 오류:', error);
      // 폴백: window.location 사용
      window.location.href = path;
    }
  };

  // 키보드 이벤트 핸들러
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // 언어 변경 핸들러
  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    setLanguage(languageCode); // i18n 유틸리티에 언어 설정
    setActiveDropdown(null);
    // 페이지 새로고침으로 언어 변경 적용
    window.location.reload();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-lg' 
          : 'bg-white dark:bg-gray-900'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <button 
            className="flex items-center space-x-3"
            aria-label="정호그룹 홈페이지로 이동"
            onClick={() => {
              // React Router를 사용하여 홈페이지로 이동
              navigate('/');
              // 페이지 상단으로 스크롤
              window.scrollTo(0, 0);
            }}
          >
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center overflow-hidden relative">
              {/* 로고 이미지가 있으면 이미지 표시, 없으면 텍스트 표시 */}
              {imageData.logo && Object.keys(imageData.logo).length > 0 ? (
                <>
                  <img 
                    src={Object.values(imageData.logo)[0].url} 
                    alt="정호그룹 로고"
                    className="w-full h-full object-cover"
                  />
                  {/* 로고 이미지 표시 표시 */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </>
                              ) : (
                  <span className="text-white font-bold text-xl relative z-10">정</span>
                )}
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">
              {COMPANY_INFO.name}
            </span>
          </button>

          {/* 네비게이션 - 모바일에서는 작은 간격, 데스크톱에서는 큰 간격 */}
          <div className="flex-1 overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8" role="navigation">
            {/* HOME */}
            <button
              className={`px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 font-medium transition-colors duration-200 whitespace-nowrap ${
                currentPage === 'home' 
                  ? 'text-primary-600 bg-primary-50 rounded-lg' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg'
              }`}
              aria-label="홈페이지로 이동"
              onClick={() => {
                // React Router를 사용하여 홈페이지로 이동
                navigate('/');
                // 페이지 상단으로 스크롤
                window.scrollTo(0, 0);
              }}
            >
              HOME
            </button>
            
            {/* GROUP 드롭다운 */}
            <div className="relative dropdown-container" style={{ position: 'static' }}>
              <button
                className={`px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 font-medium transition-colors duration-200 flex items-center space-x-1 whitespace-nowrap ${
                  currentPage === 'clarus' || currentPage === 'tlc' || currentPage === 'illutech' || currentPage === 'texcom'
                    ? 'text-primary-600 bg-primary-50 rounded-lg' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg'
                }`}
                onClick={() => toggleDropdown('group')}
                onKeyPress={(e) => handleKeyPress(e, () => toggleDropdown('group'))}
                aria-haspopup="true"
                aria-expanded={activeDropdown === 'group'}
                aria-label="그룹 계열사 메뉴"
              >
                <span>GROUP</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'group' ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'group' && (
                <div 
                  className="fixed mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-[9999]"
                  role="menu"
                  style={{ top: '64px', left: 'auto' }}
                >
                  {groupDropdownItems.map((item) => (
                    <button
                      key={item.key}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      role="menuitem"
                      aria-label={item.ariaLabel}
                      onClick={() => handleGroupItemClick(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
                        {/* 나머지 메뉴 아이템들 */}
            {mainNavItems.slice(1).map((item) => (
              <button
                key={item.key}
                className={`px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 font-medium transition-colors duration-200 whitespace-nowrap ${
                  currentPage === item.key 
                    ? 'text-primary-600 bg-primary-50 rounded-lg' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg'
                }`}
                aria-label={item.ariaLabel}
                onClick={() => {
                  // 현재 페이지와 같은 페이지인지 확인
                  if (location.pathname === item.path) {
                    console.log('같은 페이지입니다. 스크롤만 상단으로 이동');
                    window.scrollTo(0, 0);
                    return;
                  }
                  
                  // React Router를 사용하여 페이지 이동
                  navigate(item.path, { replace: false });
                  
                  // 페이지 전환 후 스크롤 상단으로 이동
                  setTimeout(() => {
                    window.scrollTo(0, 0);
                  }, 100);
                }}
              >
                {t(`header.navigation.${item.key}`, { fallback: item.label })}
              </button>
            ))}
            </nav>
          </div>

          {/* 우측 버튼 그룹 */}
          <div className="flex items-center space-x-3">
            {/* 언어 선택기 */}
            <LanguageSelector />

              {/* 통합 관리자 버튼 */}
              <button
                className="px-3 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-1 sm:space-x-2"
                onClick={() => {
                  // 통합 관리자 페이지로 이동
                  window.open('/admin-unified', '_blank');
                }}
                onKeyPress={(e) => handleKeyPress(e, () => {
                  window.open('/admin-unified', '_blank');
                })}
                aria-label="통합 관리자 메뉴"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden xs:inline">관리자</span>
              </button>

            {/* 모바일 메뉴 버튼은 숨김 처리 */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 