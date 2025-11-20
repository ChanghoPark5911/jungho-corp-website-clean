import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 홈페이지 - 클래식 버전 (전통적 스타일)
 * - 기존 정호그룹 웹사이트 (www.junghocorp.com) 스타일 모방
 * - 내부 기술은 React + 최신 기술 사용
 */
const HomePageClassic = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  // 배경 이미지 옵션 (조명 관련)
  const backgroundImages = [
    {
      id: 1,
      name: currentLanguage === 'en' ? 'Modern LED Lighting' : '현대적 LED 조명',
      url: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Warm LED light bulbs' : '따뜻한 LED 전구'
    },
    {
      id: 2,
      name: currentLanguage === 'en' ? 'Industrial Lighting' : '산업용 조명',
      url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Industrial lighting system' : '산업용 조명 시스템'
    },
    {
      id: 3,
      name: currentLanguage === 'en' ? 'Smart City Lighting' : '스마트 시티 조명',
      url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80',
      description: currentLanguage === 'en' ? 'City lights at night' : '야간 도시 조명'
    },
    {
      id: 4,
      name: currentLanguage === 'en' ? 'Architectural Lighting' : '건축 조명',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Modern building with lighting' : '조명이 있는 현대 건물'
    },
    {
      id: 5,
      name: currentLanguage === 'en' ? 'LED Technology' : 'LED 기술',
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Close-up LED lights' : 'LED 조명 클로즈업'
    },
    {
      id: 6,
      name: currentLanguage === 'en' ? 'Commercial Lighting' : '상업용 조명',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Office lighting system' : '사무실 조명 시스템'
    },
    {
      id: 7,
      name: currentLanguage === 'en' ? 'Street Lighting' : '가로등 조명',
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Street lights at dusk' : '황혼의 가로등'
    },
    {
      id: 8,
      name: currentLanguage === 'en' ? 'IoT Lighting Control' : 'IoT 조명 제어',
      url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Smart home control' : '스마트 홈 제어'
    },
    {
      id: 9,
      name: currentLanguage === 'en' ? 'Lighting Design' : '조명 디자인',
      url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Creative lighting design' : '창의적 조명 디자인'
    },
    {
      id: 10,
      name: currentLanguage === 'en' ? 'Energy Efficient Lighting' : '에너지 효율 조명',
      url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Sustainable lighting solution' : '지속 가능한 조명 솔루션'
    }
  ];

  // 배경 이미지 상태 - 6번(상업용 조명)으로 고정 ⭐
  const [selectedBackground, setSelectedBackground] = useState(backgroundImages[5].url); // 6번 = index 5
  const [showImageSelector, setShowImageSelector] = useState(false); // 숨김 (필요시 우측 하단 버튼으로 표시)

  // 사이드바 메뉴
  const sidebarItems = [
    { id: 'intro', label: currentLanguage === 'en' ? 'Company Intro' : '회사 소개', path: '/about/intro' },
    { id: 'vision', label: currentLanguage === 'en' ? 'Vision' : '비전/미션', path: '/about/vision' },
    { id: 'subsidiaries', label: currentLanguage === 'en' ? 'Subsidiaries' : '계열사', path: '/subsidiaries' },
    { id: 'media', label: currentLanguage === 'en' ? 'Media/PR' : '미디어/PR', path: '/media/promotion' },
    { id: 'support', label: currentLanguage === 'en' ? 'Support' : '고객지원', path: '/support' }
  ];

  // 계열사 목록
  const subsidiaries = [
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      nameEn: 'CLARUS Korea',
      description: currentLanguage === 'en'
        ? 'IoT-based smart lighting control specialist'
        : 'IoT 기반 스마트 조명 제어 전문 기업',
      established: '2009',
      business: currentLanguage === 'en'
        ? 'Lighting Control, Power Monitoring'
        : '조명제어, 전력감시제어',
      path: '/classic/subsidiaries/clarus'
    },
    {
      id: 'tlc',
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      nameEn: 'Jungho TLC Co., Ltd.',
      description: currentLanguage === 'en'
        ? 'Partner for stable building automation'
        : '안정적인 빌딩 자동화의 파트너',
      established: '1982',
      business: currentLanguage === 'en'
        ? 'Integrated Lighting & Power Control'
        : '조명·전력 통합 제어',
      path: '/classic/subsidiaries/jungho-tlc'
    },
    {
      id: 'illutech',
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      nameEn: 'ILLUTECH Co., Ltd.',
      description: currentLanguage === 'en'
        ? 'Specialist in industrial & special LED lighting'
        : '산업·특수 LED 조명의 전문가',
      established: '2010',
      business: currentLanguage === 'en'
        ? 'Industrial & Special LED Lighting'
        : '산업·특수 LED 조명',
      path: '/classic/subsidiaries/illutech'
    },
    {
      id: 'texcom',
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      nameEn: 'Jungho TEXCOM Co., Ltd.',
      description: currentLanguage === 'en'
        ? 'Bridge connecting textile industry and fashion'
        : '섬유 산업과 패션을 잇는 가교',
      established: '1982',
      business: currentLanguage === 'en'
        ? 'Textile Machinery & Testers / RSS'
        : '섬유기계·시험기 / RSS',
      path: '/classic/subsidiaries/jungho-texcom'
    }
  ];

  // 주요 사업 분야
  const businessAreas = [
    {
      icon: '💡',
      title: currentLanguage === 'en' ? 'AI & IoT Solutions' : 'AI 및 IoT 솔루션',
      description: currentLanguage === 'en'
        ? 'Smart lighting and power control using AI and IoT technology'
        : 'AI와 IoT 기술을 활용한 스마트 조명 및 전력 제어'
    },
    {
      icon: '🚚',
      title: currentLanguage === 'en' ? 'Eco-Friendly Logistics' : '친환경 물류',
      description: currentLanguage === 'en'
        ? 'Integrated logistics solutions for sustainable future'
        : '지속 가능한 미래를 위한 통합 물류 솔루션'
    },
    {
      icon: '👔',
      title: currentLanguage === 'en' ? 'Textile & Fashion' : '텍스타일 & 패션',
      description: currentLanguage === 'en'
        ? 'Textile machinery and fashion industry solutions'
        : '섬유 기계 및 패션 산업 솔루션'
    },
    {
      icon: '⚡',
      title: currentLanguage === 'en' ? 'Industrial LED Lighting' : '산업용 LED 조명',
      description: currentLanguage === 'en'
        ? 'Special LED lighting for nuclear plants and public infrastructure'
        : '원전 및 공공 인프라를 위한 특수 LED 조명'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 전통적 네비게이션 */}
      <TraditionalNav />

      {/* 배너 - 6번 이미지(상업용 조명) 적용 ⭐ */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'Since 1982' : '1982년 설립'}
        title={currentLanguage === 'en' 
          ? 'Creating a Better Future with Innovative Technology'
          : '혁신적인 기술로 더 나은 미래를 만듭니다'
        }
        description={currentLanguage === 'en'
          ? 'JUNGHO Group is a global company providing innovative solutions in AI, IoT, logistics, and textile industries'
          : '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다'
        }
        backgroundImage={selectedBackground}
        height="700px"
      />

      {/* 배경 이미지 선택 UI (임시 - 테스트용) */}
      {showImageSelector && (
        <div className="sticky top-20 z-40 bg-white dark:bg-gray-800 border-b-2 border-blue-500 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  💡 {currentLanguage === 'en' ? 'Choose Background Image' : '배경 이미지 선택'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Select lighting-themed background for the banner' : '조명 관련 배경 이미지를 선택하세요'}
                </p>
              </div>
              <button
                onClick={() => setShowImageSelector(false)}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 text-sm font-medium"
              >
                {currentLanguage === 'en' ? 'Hide' : '숨기기'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {backgroundImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedBackground(image.url)}
                  className={`group relative overflow-hidden rounded-lg border-4 transition-all duration-200 ${
                    selectedBackground === image.url
                      ? 'border-blue-600 dark:border-blue-500 ring-4 ring-blue-400 dark:ring-blue-600 shadow-xl'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg'
                  }`}
                >
                  {/* 이미지 미리보기 - 크기 증가 */}
                  <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* 선택 표시 */}
                  {selectedBackground === image.url && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {/* 이미지 번호 */}
                  <div className="absolute top-3 left-3 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {image.id}
                  </div>
                  
                  {/* 이미지 정보 - 크기 증가 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                    <p className="text-white text-sm font-bold truncate mb-1">
                      {image.name}
                    </p>
                    <p className="text-gray-200 text-xs truncate">
                      {image.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 이미지 선택기 다시 표시 버튼 (개발/테스트용) */}
      {!showImageSelector && (
        <button
          onClick={() => setShowImageSelector(true)}
          className="fixed bottom-8 right-8 z-50 px-5 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-full shadow-xl hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-110 transition-all duration-200 flex items-center gap-2 group"
          title={currentLanguage === 'en' ? 'Show image selector (Dev tool)' : '이미지 선택기 표시 (개발 도구)'}
        >
          <span className="text-xl">💡</span>
          <span className="font-semibold text-sm">{currentLanguage === 'en' ? 'Dev: Change BG' : '개발: 배경변경'}</span>
        </button>
      )}

      {/* 메인 콘텐츠 - 전통적 레이아웃 */}
      <TraditionalLayout showSidebar={true} sidebarItems={sidebarItems}>
        {/* 회사 소개 */}
        <section className="mb-12">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'About JUNGHO Group' : '정호그룹에 대하여'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6 shadow-sm">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {currentLanguage === 'en'
                ? 'Founded in 1982, JUNGHO Group has been leading innovation in AI, IoT, logistics, and textile industries for over 40 years. We provide optimized solutions for each industry based on our accumulated technology and experience.'
                : '1982년 설립 이래, 정호그룹은 40년 이상 AI, IoT, 물류, 텍스타일 분야에서 혁신을 선도해왔습니다. 축적된 기술력과 경험을 바탕으로 각 산업 분야에 최적화된 솔루션을 제공하고 있습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {currentLanguage === 'en'
                ? 'Our four subsidiaries - CLARUS, Jungho TLC, ILLUTECH, and Jungho TEXCOM - specialize in their respective fields and work together to create synergy. We are growing into a global company with technologies recognized worldwide.'
                : '클라루스, 정호티엘씨, 일루텍, 정호텍스컴 등 4개의 계열사는 각 분야에서 전문성을 발휘하며 시너지를 창출하고 있습니다. 세계적으로 인정받는 기술력으로 글로벌 기업으로 성장하고 있습니다.'
              }
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate('/about/intro')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
              >
                {currentLanguage === 'en' ? 'Learn More →' : '자세히 보기 →'}
              </button>
            </div>
          </div>
        </section>

        {/* 주요 성과 지표 */}
        <section className="mb-12">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Key Achievements' : '주요 성과'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'JUNGHO Group by Numbers' : '숫자로 보는 정호그룹'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '40+', label: currentLanguage === 'en' ? 'Years of History' : '년 역사' },
              { number: '4', label: currentLanguage === 'en' ? 'Subsidiaries' : '개 계열사' },
              { number: '200+', label: currentLanguage === 'en' ? 'Projects' : '개 프로젝트' },
              { number: '50+', label: currentLanguage === 'en' ? 'Billion KRW Sales' : '억원 매출' }
            ].map((stat, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 주요 사업 분야 */}
        <section className="mb-12">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Business Areas' : '주요 사업 분야'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'What We Do' : '정호그룹의 사업 영역'}
            </p>
          </div>

          <div className="space-y-3">
            {businessAreas.map((area, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-5 hover:border-blue-400 dark:hover:border-blue-600 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{area.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {area.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 계열사 소개 */}
        <section className="mb-12">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Our Subsidiaries' : '계열사 소개'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Four Specialized Companies' : '4개의 전문 기업'}
            </p>
          </div>

          <div className="space-y-4">
            {subsidiaries.map((company, index) => (
              <div 
                key={company.id}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {company.nameEn}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                      {currentLanguage === 'en' ? 'Est.' : '설립'} {company.established}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">
                        {currentLanguage === 'en' ? 'Business:' : '사업분야:'}
                      </strong>{' '}
                      {company.business}
                    </div>
                    <button
                      onClick={() => navigate(company.path)}
                      className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                    >
                      {currentLanguage === 'en' ? 'Details →' : '상세보기 →'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/subsidiaries')}
              className="px-6 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white transition-all duration-200"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries →' : '계열사 전체보기 →'}
            </button>
          </div>
        </section>

        {/* 고객지원 안내 */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded p-6">
            <h3 className="text-xl font-bold mb-3">
              {currentLanguage === 'en' ? '📞 Customer Support' : '📞 고객지원'}
            </h3>
            <p className="mb-4 text-blue-100">
              {currentLanguage === 'en'
                ? 'For product inquiries and technical support, please contact us.'
                : '제품 문의 및 기술 지원이 필요하시면 연락 주세요.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentLanguage === 'en' ? 'Tel:' : '전화:'}</span>
                <span>02-553-3631</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</span>
                <span>info@junghocorp.com</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate('/support')}
                className="px-5 py-2 bg-white text-blue-600 font-medium rounded hover:bg-blue-50 transition-colors duration-200"
              >
                {currentLanguage === 'en' ? 'Go to Support Center →' : '고객지원센터 바로가기 →'}
              </button>
            </div>
          </div>
        </section>
      </TraditionalLayout>
    </div>
  );
};

export default HomePageClassic;

