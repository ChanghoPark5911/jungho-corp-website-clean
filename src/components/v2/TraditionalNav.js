import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import { useTheme } from '../../contexts/ThemeContext';
import LanguageSelector from '../LanguageSelector';

/**
 * 전통적 스타일의 네비게이션 컴포넌트
 * - 단순한 드롭다운 메뉴
 * - 기존 정호그룹 웹사이트 스타일
 * 
 * @param {string} version - 'classic' 또는 'hybrid'
 */
const TraditionalNav = ({ version = 'classic' }) => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 버전별 경로 prefix
  const prefix = version === 'hybrid' ? '/hybrid' : '/classic';

  // 메뉴 구조 (버전별 경로 자동 생성)
  const menuItems = [
    {
      id: 'home',
      label: currentLanguage === 'en' ? 'HOME' : '홈',
      path: prefix,
      dropdownItems: null
    },
    {
      id: 'about',
      label: currentLanguage === 'en' ? 'COMPANY' : '회사소개',
      path: `${prefix}/about`,
      dropdownItems: [
        { label: currentLanguage === 'en' ? 'Company Intro' : '정호소개', path: `${prefix}/about/intro` },
        { label: currentLanguage === 'en' ? 'Vision & Mission' : '비전/미션', path: `${prefix}/about/vision` },
        { label: currentLanguage === 'en' ? 'Management' : '경영방침', path: `${prefix}/about/management` },
        { label: currentLanguage === 'en' ? 'History' : '연혁', path: `${prefix}/about/history` },
        { label: currentLanguage === 'en' ? 'CI/BI' : 'CI/BI', path: `${prefix}/about/cibi` },
        { label: currentLanguage === 'en' ? 'Location' : '찾아오시는 길', path: `${prefix}/about/location` }
      ]
    },
    {
      id: 'subsidiaries',
      label: currentLanguage === 'en' ? 'SUBSIDIARIES' : '계열사',
      path: `${prefix}/subsidiaries`,
      dropdownItems: [
        { label: currentLanguage === 'en' ? 'Overview' : '계열사 개요', path: `${prefix}/subsidiaries` },
        { label: currentLanguage === 'en' ? 'CLARUS' : '클라루스', path: `${prefix}/subsidiaries/clarus` },
        { label: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨', path: `${prefix}/subsidiaries/jungho-tlc` },
        { label: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍', path: `${prefix}/subsidiaries/illutech` },
        { label: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴', path: `${prefix}/subsidiaries/jungho-texcom` }
      ]
    },
    {
      id: 'media',
      label: currentLanguage === 'en' ? 'MEDIA' : '미디어/PR',
      path: '/media',
      dropdownItems: [
        { label: currentLanguage === 'en' ? 'Promotion Videos' : '홍보영상', path: '/media/promotion' },
        { label: currentLanguage === 'en' ? 'Technical Docs' : '기술자료실', path: '/media/technical-docs' },
        { label: currentLanguage === 'en' ? 'SNS' : 'SNS', path: '/media/sns' }
      ]
    },
    {
      id: 'support',
      label: currentLanguage === 'en' ? 'SUPPORT' : '고객지원',
      path: '/support',
      dropdownItems: null
    }
  ];

  const handleMouseEnter = (menuId) => {
    setActiveDropdown(menuId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b-2 border-blue-600 dark:border-blue-500 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* 로고 */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate(prefix)}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                JH
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentLanguage === 'en' ? 'JUNGHO' : '정호그룹'}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Since 1982' : '1982년 설립'}
                </div>
              </div>
            </div>
          </div>

          {/* 메뉴 아이템 */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.dropdownItems && handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeDropdown === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                  {item.dropdownItems && <span className="ml-1">▼</span>}
                </button>

                {/* 드롭다운 메뉴 */}
                {item.dropdownItems && activeDropdown === item.id && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigation(dropdownItem.path)}
                        className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      >
                        {dropdownItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 우측 유틸리티 */}
          <div className="flex items-center gap-3">
            {/* 언어 선택 */}
            <div className="scale-90">
              <LanguageSelector />
            </div>

            {/* 다크모드 토글 */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* 버전 전환 버튼 */}
            <button
              onClick={() => navigate(version === 'hybrid' ? '/classic' : '/hybrid')}
              className="px-3 py-1.5 text-xs font-medium text-green-600 dark:text-green-400 border border-green-600 dark:border-green-400 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
            >
              {version === 'hybrid' 
                ? (currentLanguage === 'en' ? 'Classic' : '클래식')
                : (currentLanguage === 'en' ? 'Hybrid' : '하이브리드')
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TraditionalNav;

