import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * 전통적 스타일의 레이아웃 컴포넌트
 * - 좌측 사이드바 + 메인 콘텐츠 구조
 * - 기존 정호그룹 웹사이트 스타일 모방
 * 
 * @param {string} category - 페이지 카테고리 (home, about, subsidiaries, media, support)
 * @param {string} version - 버전 (classic, hybrid)
 * @param {array} sidebarItems - 커스텀 사이드바 메뉴 (옵션)
 * @param {boolean} showSidebar - 사이드바 표시 여부
 */
const TraditionalLayout = ({ 
  children, 
  showSidebar = true, 
  sidebarItems, 
  category = 'about',
  version = 'classic'
}) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();

  /**
   * 카테고리에 따라 자동으로 사이드바 메뉴를 생성하는 함수
   */
  const getSidebarItemsByCategory = (cat, ver) => {
    const prefix = ver === 'hybrid' ? '/hybrid' : '/classic';
    
    switch(cat) {
      case 'home':
        // 홈페이지: Gateway 스타일 (주요 4개 카테고리)
        return [
          { 
            id: 'intro', 
            label: currentLanguage === 'en' ? 'Group Intro' : '그룹소개', 
            path: `${prefix}/about/intro`,
            icon: '🏢'
          },
          { 
            id: 'subsidiaries', 
            label: currentLanguage === 'en' ? 'Subsidiaries' : '계열사', 
            path: `${prefix}/subsidiaries`,
            icon: '🏭'
          },
          { 
            id: 'media', 
            label: currentLanguage === 'en' ? 'Media/PR' : '미디어/PR', 
            path: '/media/promotion',
            icon: '📺'
          },
          { 
            id: 'support', 
            label: currentLanguage === 'en' ? 'Support' : '고객지원', 
            path: '/support',
            icon: '🆘'
          }
        ];
      
      case 'about':
        // 회사소개 카테고리
        return [
          { 
            id: 'intro', 
            label: currentLanguage === 'en' ? 'Company Intro' : '회사 소개', 
            path: `${prefix}/about/intro`
          },
          { 
            id: 'vision', 
            label: currentLanguage === 'en' ? 'Vision & Mission' : '비전/미션', 
            path: `${prefix}/about/vision`
          },
          { 
            id: 'management', 
            label: currentLanguage === 'en' ? 'Management' : '경영방침', 
            path: `${prefix}/about/management`
          },
          { 
            id: 'history', 
            label: currentLanguage === 'en' ? 'History' : '연혁', 
            path: `${prefix}/about/history`
          },
          { 
            id: 'cibi', 
            label: currentLanguage === 'en' ? 'CI/BI' : 'CI/BI', 
            path: `${prefix}/about/cibi`
          },
          { 
            id: 'location', 
            label: currentLanguage === 'en' ? 'Location' : '찾아오시는 길', 
            path: `${prefix}/about/location`
          }
        ];
      
      case 'subsidiaries':
        // 계열사 카테고리
        return [
          { 
            id: 'overview', 
            label: currentLanguage === 'en' ? 'Overview' : '계열사 소개', 
            path: `${prefix}/subsidiaries`
          },
          { 
            id: 'clarus', 
            label: currentLanguage === 'en' ? 'CLARUS' : '클라루스', 
            path: `${prefix}/subsidiaries/clarus`
          },
          { 
            id: 'tlc', 
            label: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨', 
            path: `${prefix}/subsidiaries/jungho-tlc`
          },
          { 
            id: 'illutech', 
            label: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍', 
            path: `${prefix}/subsidiaries/illutech`
          },
          { 
            id: 'texcom', 
            label: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴', 
            path: `${prefix}/subsidiaries/jungho-texcom`
          }
        ];
      
      case 'media':
        // 미디어/PR 카테고리
        return [
          { 
            id: 'promotion', 
            label: currentLanguage === 'en' ? 'Promotion Videos' : '홍보영상', 
            path: '/media/promotion'
          },
          { 
            id: 'technical', 
            label: currentLanguage === 'en' ? 'Technical Docs' : '기술자료실', 
            path: '/media/technical-docs'
          },
          { 
            id: 'sns', 
            label: 'SNS', 
            path: '/media/sns'
          }
        ];
      
      case 'support':
        // 고객지원 카테고리 (사이드바 없음)
        return [];
      
      default:
        // 기본값: 회사소개 메뉴
        return [
          { id: 'intro', label: currentLanguage === 'en' ? 'Company Intro' : '회사 소개', path: `${prefix}/about/intro` },
          { id: 'vision', label: currentLanguage === 'en' ? 'Vision & Mission' : '비전/미션', path: `${prefix}/about/vision` },
          { id: 'history', label: currentLanguage === 'en' ? 'History' : '연혁', path: `${prefix}/about/history` },
          { id: 'cibi', label: currentLanguage === 'en' ? 'CI/BI' : 'CI/BI', path: `${prefix}/about/cibi` },
          { id: 'location', label: currentLanguage === 'en' ? 'Location' : '찾아오시는 길', path: `${prefix}/about/location` }
        ];
    }
  };

  // 사이드바 메뉴 결정 (커스텀 > 카테고리 기반 > 기본값)
  const menuItems = sidebarItems || getSidebarItemsByCategory(category, version);
  
  // 카테고리별 제목
  const getCategoryTitle = () => {
    switch(category) {
      case 'home':
        return currentLanguage === 'en' ? 'Quick Menu' : '빠른 메뉴';
      case 'about':
        return currentLanguage === 'en' ? 'Company' : '회사소개';
      case 'subsidiaries':
        return currentLanguage === 'en' ? 'Subsidiaries' : '계열사';
      case 'media':
        return currentLanguage === 'en' ? 'Media/PR' : '미디어/PR';
      case 'support':
        return currentLanguage === 'en' ? 'Support' : '고객지원';
      default:
        return currentLanguage === 'en' ? 'Quick Menu' : '빠른 메뉴';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* 메인 컨테이너 - 최대 너비 1200px */}
      <div className="max-w-[1200px] mx-auto bg-white dark:bg-gray-900">
        <div className="flex">
          {/* 좌측 사이드바 */}
          {showSidebar && menuItems.length > 0 && (
            <aside className="w-[200px] border-r border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 min-h-screen">
              <div className="py-6">
                <h3 className="px-4 mb-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  {getCategoryTitle()}
                </h3>
                <nav>
                  <ul className="space-y-1">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => navigate(item.path)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 hover:border-l-4 hover:border-green-600 transition-all duration-200"
                        >
                          {item.icon ? `${item.icon} ` : '• '}{item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* 추가 정보 박스 */}
                <div className="mt-8 mx-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                  <h4 className="text-sm font-bold text-green-900 dark:text-green-300 mb-2">
                    {currentLanguage === 'en' ? '📞 Contact' : '📞 문의하기'}
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                    <strong>{currentLanguage === 'en' ? 'Tel:' : '전화:'}</strong>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mb-2">02-553-3631</p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                    <strong>{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong>
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 break-all">info@junghocorp.com</p>
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
                ? 'Address: 17, Nonhyeon-ro 116-gil, Gangnam-gu, Seoul, Jungho Building'
                : '주소: 서울시 강남구 논현로116길 17 정호빌딩'
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

