import React, { useState, useEffect } from 'react';
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

  // 배경 이미지 옵션 (정호그룹 사업 관련 이미지)
  const backgroundImages = [
    {
      id: 1,
      name: currentLanguage === 'en' ? 'City Night View' : '도시 야경',
      url: '/images/city_night_view.png',
      description: currentLanguage === 'en' ? 'Beautiful city lights at night' : '화려한 도시 조명'
    },
    {
      id: 2,
      name: currentLanguage === 'en' ? 'Smart Building Control' : '스마트 빌딩 제어',
      url: '/images/light_control.png',
      description: currentLanguage === 'en' ? 'Building automation system' : '빌딩 자동화 시스템'
    },
    {
      id: 3,
      name: currentLanguage === 'en' ? 'Warehouse Control' : '창고 조명 제어',
      url: '/images/warehouse_control.png',
      description: currentLanguage === 'en' ? 'Smart warehouse lighting' : '스마트 창고 조명'
    },
    {
      id: 4,
      name: currentLanguage === 'en' ? 'Smart Home' : '스마트 홈',
      url: '/images/warm_home.png',
      description: currentLanguage === 'en' ? 'Warm home lighting control' : '따뜻한 가정 조명 제어'
    }
  ];

  // 배경 이미지 상태 - 기본적으로 첫 번째 이미지 선택
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedBackground, setSelectedBackground] = useState(backgroundImages[0].url);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 자동 슬라이드쇼 - 5초마다 이미지 전환
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % backgroundImages.length;
        setSelectedBackground(backgroundImages[nextIndex].url);
        return nextIndex;
      });
    }, 5000); // 5초마다 전환

    return () => clearInterval(interval);
  }, [isAutoPlay, backgroundImages]);

  // 사이드바는 TraditionalLayout에서 자동 생성 (category="home")

  // 계열사 목록
  const subsidiaries = [
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      nameEn: 'CLARUS Korea',
      description: currentLanguage === 'en'
        ? 'IoT-based smart lighting/power control solution development, production and export'
        : 'IoT기반 스마트 조명/전력제어솔루션 개발, 생산 및 해외수출',
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
        ? 'Installation, sales and maintenance of lighting/power control solutions in public and private sectors'
        : '공공, 민간분야 조명/전력제어솔루션 시공 판매 및 유지보수',
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
      title: currentLanguage === 'en' ? 'Lighting/Power Control Solution Development' : '조명/전력제어 솔루션 개발',
      description: currentLanguage === 'en'
        ? 'Development of lighting and power control solutions using AI and IoT technology'
        : 'AI, IoT기술을 활용한 조명, 전력 제어 솔루션 개발'
    },
    {
      icon: '🏢',
      title: currentLanguage === 'en' ? 'Lighting/Power Control Solution Sales' : '조명/전력제어 솔루션 국내외 판매',
      description: currentLanguage === 'en'
        ? 'Domestic and international sales and installation of lighting/power control solutions'
        : '국내외 조명/전력제어 솔루션 판매, 시공'
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
      <TraditionalNav version="classic" />

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
                  onClick={() => {
                    const index = backgroundImages.findIndex(img => img.id === image.id);
                    setCurrentImageIndex(index);
                    setSelectedBackground(image.url);
                    setIsAutoPlay(false); // 수동 선택 시 자동재생 일시정지
                  }}
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

      {/* 배경 이미지 컨트롤 - 우측 하단 고정 */}
      {!showImageSelector && (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
          {/* 자동재생/일시정지 버튼 */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            title={isAutoPlay 
              ? (currentLanguage === 'en' ? 'Pause Slideshow' : '슬라이드쇼 일시정지')
              : (currentLanguage === 'en' ? 'Play Slideshow' : '슬라이드쇼 재생')
            }
          >
            {isAutoPlay ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>

          {/* 이미지 선택 버튼 */}
          <button
            onClick={() => setShowImageSelector(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
            title={currentLanguage === 'en' ? 'Change Background Image' : '배경 이미지 변경'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          {/* 현재 이미지 인디케이터 */}
          <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg text-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {currentImageIndex + 1} / {backgroundImages.length}
            </span>
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 - 전통적 레이아웃 */}
      <TraditionalLayout showSidebar={true} category="home" version="classic">
        {/* 회사 소개 */}
        <section className="mb-12">
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
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
                onClick={() => navigate('/classic/about/intro')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
              >
                {currentLanguage === 'en' ? 'Learn More →' : '자세히 보기 →'}
              </button>
            </div>
          </div>
        </section>

        {/* 주요 성과 지표 */}
        <section className="mb-12">
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
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
              <div key={index} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
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
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Business Areas' : '주요 사업 분야'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'What We Do' : '정호그룹의 사업 영역'}
            </p>
          </div>

          <div className="space-y-3">
            {businessAreas.map((area, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-5 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{area.icon}</div>
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

        {/* 주요 연혁 타임라인 */}
        <section className="mb-12">
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Major Milestones' : '주요 연혁'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Our Growth Journey' : '정호그룹의 성장 여정'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6">
            <div className="space-y-4">
              {/* 2018 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-bold rounded">
                    2018
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {currentLanguage === 'en' ? 'Clarus Foundation' : '클라루스 설립'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentLanguage === 'en' 
                      ? 'Launch of AI-powered smart office technology'
                      : 'AI 기반 스마트 오피스 기술 출시'}
                  </p>
                </div>
              </div>

              {/* 2010 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-bold rounded">
                    2010
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {currentLanguage === 'en' ? 'ILLUTECH Foundation' : '일루텍 설립'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentLanguage === 'en' 
                      ? 'Entry into industrial & special LED lighting market'
                      : '산업·특수 LED 조명 시장 진출'}
                  </p>
                </div>
              </div>

              {/* 2000 */}
              <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-bold rounded">
                    2000
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {currentLanguage === 'en' ? 'Business Expansion' : '사업 확장'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentLanguage === 'en' 
                      ? 'Expansion into building automation systems'
                      : '빌딩 자동화 시스템 사업 확대'}
                  </p>
                </div>
              </div>

              {/* 1982 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="inline-block px-3 py-1 bg-green-600 dark:bg-green-700 text-white text-sm font-bold rounded">
                    1982
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {currentLanguage === 'en' ? 'Company Foundation' : '정호그룹 설립'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentLanguage === 'en' 
                      ? 'Start of lighting control business'
                      : '조명 제어 사업 시작'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 계열사 소개 - 테이블 형식 (Traditional Style) */}
        <section id="subsidiaries-section" className="mb-12">
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Our Subsidiaries' : '계열사 소개'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Four Specialized Companies' : '4개의 전문 기업'}
            </p>
          </div>

          {/* 테이블 형식 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-green-600 dark:bg-green-700 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold w-1/5">
                    {currentLanguage === 'en' ? 'Company' : '회사명'}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-1/6">
                    {currentLanguage === 'en' ? 'Established' : '설립연도'}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-1/4">
                    {currentLanguage === 'en' ? 'Business' : '사업분야'}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold w-1/3">
                    {currentLanguage === 'en' ? 'Description' : '설명'}
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold w-1/12">
                    {currentLanguage === 'en' ? 'Details' : '상세'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {subsidiaries.map((company, index) => (
                  <tr 
                    key={company.id}
                    className={`border-t border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {company.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {company.nameEn}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {company.established}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {company.business}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {company.description}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => navigate(company.path)}
                        className="px-3 py-1.5 bg-green-600 dark:bg-green-700 text-white text-xs font-medium rounded hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200"
                      >
                        {currentLanguage === 'en' ? 'View' : '보기'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 고객지원 안내 */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white rounded p-6">
            <h3 className="text-xl font-bold mb-3">
              {currentLanguage === 'en' ? '📞 Customer Support' : '📞 고객지원'}
            </h3>
            <p className="mb-4 text-green-100">
              {currentLanguage === 'en'
                ? 'For product inquiries and technical support, please contact us.'
                : '제품 문의 및 기술 지원이 필요하시면 연락 주세요.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentLanguage === 'en' ? 'Tel:' : '전화:'}</span>
                <span>02-553-3631</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentLanguage === 'en' ? 'Fax:' : '팩스:'}</span>
                <span>02-553-3632</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</span>
                <span>info@junghocorp.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentLanguage === 'en' ? 'Address:' : '주소:'}</span>
                <span>{currentLanguage === 'en' ? 'Seoul, Korea' : '서울특별시'}</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate('/classic/support')}
                className="px-5 py-2 bg-white text-green-600 font-medium rounded hover:bg-green-50 transition-colors duration-200"
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

