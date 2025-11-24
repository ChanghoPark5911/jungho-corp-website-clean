import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * ABOUT 메인 페이지 - Classic 버전
 * 전통적인 레이아웃 스타일
 */
const AboutPageClassic = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  // 6개 섹션 데이터
  const aboutSections = [
    {
      id: 'intro',
      title: currentLanguage === 'en' ? 'Company Introduction' : '정호그룹 소개',
      description: currentLanguage === 'en' 
        ? '40 years of lighting control expertise, Introducing Jungho Group'
        : '40년 전통의 조명 제어 전문 기업, 정호그룹을 소개합니다',
      icon: '👋',
      path: '/classic/about/intro',
    },
    {
      id: 'vision',
      title: currentLanguage === 'en' ? 'Group Vision (IRGS)' : '그룹비전 (IRGS)',
      description: currentLanguage === 'en'
        ? 'Innovation, Reliability, Global, Sustainability - Core values of Jungho Group'
        : 'Innovation, Reliability, Global, Sustainability 정호그룹의 핵심가치',
      icon: '🎯',
      path: '/classic/about/vision',
    },
    {
      id: 'management',
      title: currentLanguage === 'en' ? 'Management Policy' : '경영방침',
      description: currentLanguage === 'en'
        ? 'Customer satisfaction, technology innovation, and sustainable growth philosophy'
        : '고객만족, 기술혁신, 지속성장을 위한 정호그룹의 경영철학',
      icon: '📋',
      path: '/classic/about/management',
    },
    {
      id: 'ci',
      title: 'CI/BI',
      description: currentLanguage === 'en'
        ? 'Discover Jungho Group\'s brand identity and corporate image'
        : '정호그룹의 브랜드 아이덴티티와 기업 이미지를 확인하세요',
      icon: '🎨',
      path: '/classic/about/ci',
    },
    {
      id: 'history',
      title: 'HISTORY',
      description: currentLanguage === 'en'
        ? 'From 1982 to present, Jungho Group\'s growth journey'
        : '1982년부터 현재까지 정호그룹의 성장 여정',
      icon: '📅',
      path: '/classic/about/history',
    },
    {
      id: 'location',
      title: currentLanguage === 'en' ? 'Location' : '찾아오시는길',
      description: currentLanguage === 'en'
        ? 'Jungho Group headquarters location and contact information'
        : '정호그룹 본사 위치 및 연락처 정보',
      icon: '📍',
      path: '/classic/about/location',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 전통적 네비게이션 */}
      <TraditionalNav version="classic" />

      {/* 작은 배너 */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'ABOUT' : '회사소개'}
        description={currentLanguage === 'en'
          ? '40 years of innovative lighting technology, Creating a brighter future'
          : '혁신적인 조명 기술로 40년, 더 밝은 미래를 만들어가는 정호그룹입니다'
        }
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        height="400px"
      />

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 인트로 텍스트 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {currentLanguage === 'en' ? 'Jungho Group Introduction' : '정호그룹 소개'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {currentLanguage === 'en'
              ? 'Explore Jungho Group\'s vision, management philosophy, history, and more through the sections below.'
              : '아래 섹션을 통해 정호그룹의 비전, 경영 철학, 역사 등을 자세히 알아보세요.'}
          </p>
        </div>

        {/* 섹션 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutSections.map((section) => (
            <div
              key={section.id}
              onClick={() => navigate(section.path)}
              className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer group"
            >
              {/* 아이콘 */}
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{section.icon}</span>
              </div>

              {/* 제목 */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {section.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {section.description}
              </p>

              {/* 화살표 */}
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                <span>{currentLanguage === 'en' ? 'Learn More' : '자세히 보기'}</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-lg p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">
            {currentLanguage === 'en' 
              ? 'Need more information?' 
              : '더 자세한 정보가 필요하신가요?'}
          </h3>
          <p className="text-lg mb-6 text-blue-100">
            {currentLanguage === 'en'
              ? 'Please contact us if you have any questions about Jungho Group'
              : '정호그룹에 대해 궁금하신 점이 있으시면 언제든 문의해주세요'}
          </p>
          <button
            onClick={() => navigate('/classic/subsidiaries')}
            className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
          >
            {currentLanguage === 'en' ? 'View Subsidiaries' : '계열사 보기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPageClassic;

