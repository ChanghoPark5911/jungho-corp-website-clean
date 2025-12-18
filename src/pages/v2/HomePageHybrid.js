import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useI18n } from '../../hooks/useI18n';
import HybridLayout from '../../components/v2/HybridLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 홈페이지 - 하이브리드 버전 (V2 네비게이션 + Hybrid 디자인)
 * - V2의 MegaMenu 사용 (일관된 네비게이션)
 * - 풀 너비 레이아웃 (사이드바 제거)
 * - Hybrid 고유의 디자인 스타일 유지
 * - 최근 수정사항: 주요 사업 분야, 계열사 소개 반영
 */
const HomePageHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  // 관리자에서 저장한 Hero 데이터 불러오기 (localStorage 또는 JSON 파일)
  const [heroData, setHeroData] = useState(null);
  
  useEffect(() => {
    const loadHeroData = async () => {
      // 1. 먼저 localStorage에서 확인 (관리자가 임시 저장한 데이터)
      const savedData = localStorage.getItem('v2_homepage_data');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setHeroData(parsedData.hero);
          return;
        } catch (error) {
          console.error('localStorage Hero 데이터 파싱 실패:', error);
        }
      }
      
      // 2. localStorage에 없으면 JSON 파일에서 로드 (영구 저장된 데이터)
      try {
        const response = await fetch('/data/homepage-content.json');
        if (response.ok) {
          const jsonData = await response.json();
          setHeroData(jsonData.hero);
        }
      } catch (error) {
        console.log('JSON 파일 로드 실패 (기본값 사용):', error);
      }
    };
    
    loadHeroData();
  }, []);

  // Hero 섹션 텍스트 (관리자 데이터 우선, 없으면 기본값)
  const heroTitle = heroData?.mainTitle || (currentLanguage === 'en' 
    ? 'Creating a Better Future with Innovative Technology'
    : '혁신적인 기술로 더 나은 미래를 만듭니다');
  
  const heroDescription = heroData?.description || (currentLanguage === 'en'
    ? 'JUNGHO Group is a global company providing innovative solutions in AI, IoT, logistics, and textile industries'
    : '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다');

  // 정호텍스컴 배경 이미지 슬라이드쇼
  const [texcomImageIndex, setTexcomImageIndex] = useState(0);
  const texcomImages = React.useMemo(() => [
    '/images/textile-mach-img1.png',
    '/images/textile-mach-img2.png',
    '/images/textile-mach-img3.png'
  ], []);

  // 이미지 preload
  useEffect(() => {
    texcomImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [texcomImages]);

  // 3초마다 이미지 자동 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setTexcomImageIndex((prevIndex) => 
        (prevIndex + 1) % texcomImages.length
      );
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [texcomImages]);

  // 계열사 섹션으로 스크롤
  const scrollToSubsidiaries = () => {
    const element = document.getElementById('subsidiaries-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

  // 계열사 목록 (이미지 추가)
  const subsidiaries = [
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      nameEn: 'CLARUS Korea',
      icon: '💡',
      description: currentLanguage === 'en'
        ? 'IoT-based smart lighting/power control solution development, production and export'
        : 'IoT기반 스마트 조명/전력제어솔루션 개발, 생산 및 해외수출',
      established: '2009',
      business: currentLanguage === 'en'
        ? 'Lighting Control, Power Monitoring'
        : '조명제어, 전력감시제어',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/hybrid/subsidiaries/clarus',
      image: '/images/light_control.png'
    },
    {
      id: 'tlc',
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      nameEn: 'Jungho TLC Co., Ltd.',
      icon: '🏢',
      description: currentLanguage === 'en'
        ? 'Installation, sales and maintenance of lighting/power control solutions in public and private sectors'
        : '공공, 민간분야 조명/전력제어솔루션 시공 판매 및 유지보수',
      established: '1982',
      business: currentLanguage === 'en'
        ? 'Integrated Lighting & Power Control'
        : '조명·전력 통합 제어',
      gradient: 'from-purple-500 to-pink-500',
      path: '/hybrid/subsidiaries/jungho-tlc',
      image: '/images/city_night_view.png'
    },
    {
      id: 'illutech',
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      nameEn: 'ILLUTECH Co., Ltd.',
      icon: '⚡',
      description: currentLanguage === 'en'
        ? 'Specialist in industrial & special LED lighting'
        : '산업·특수 LED 조명의 전문가',
      established: '2010',
      business: currentLanguage === 'en'
        ? 'Industrial & Special LED Lighting'
        : '산업·특수 LED 조명',
      gradient: 'from-orange-500 to-red-500',
      path: '/hybrid/subsidiaries/illutech',
      image: '/images/warehouse_control.png'
    },
    {
      id: 'texcom',
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      nameEn: 'Jungho TEXCOM Co., Ltd.',
      icon: '🧵',
      description: currentLanguage === 'en'
        ? 'Bridge connecting textile industry and fashion'
        : '섬유 산업과 패션을 잇는 가교',
      established: '1982',
      business: currentLanguage === 'en'
        ? 'Textile Machinery & Testers / RSS'
        : '섬유기계·시험기 / RSS',
      gradient: 'from-green-500 to-teal-500',
      path: '/hybrid/subsidiaries/jungho-texcom',
      image: '/images/warm_home.png'
    }
  ];

  // 주요 사업 분야
  const businessAreas = [
    {
      icon: '💡',
      title: currentLanguage === 'en' ? 'Lighting/Power Control Solution Development' : '조명/전력제어 솔루션 개발',
      description: currentLanguage === 'en'
        ? 'Development of lighting and power control solutions using AI and IoT technology'
        : 'AI, IoT기술을 활용한 조명, 전력 제어 솔루션 개발',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🏢',
      title: currentLanguage === 'en' ? 'Lighting/Power Control Solution Sales' : '조명/전력제어 솔루션 국내외 판매',
      description: currentLanguage === 'en'
        ? 'Domestic and international sales and installation of lighting/power control solutions'
        : '국내외 조명/전력제어 솔루션 판매, 시공',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '👔',
      title: currentLanguage === 'en' ? 'Textile & Fashion' : '텍스타일 & 패션',
      description: currentLanguage === 'en'
        ? 'Textile machinery and fashion industry solutions'
        : '섬유 기계 및 패션 산업 솔루션',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚡',
      title: currentLanguage === 'en' ? 'Industrial LED Lighting' : '산업용 LED 조명',
      description: currentLanguage === 'en'
        ? 'Special LED lighting for nuclear plants and public infrastructure'
        : '원전 및 공공 인프라를 위한 특수 LED 조명',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <HybridLayout>
      {/* 배경 이미지 컨트롤 - 우측 하단 고정 */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* 자동재생/일시정지 버튼 */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
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
          onClick={() => setShowImageSelector(!showImageSelector)}
          className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          title={currentLanguage === 'en' ? 'Change Background Image' : '배경 이미지 변경'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* 현재 이미지 인디케이터 */}
        <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg text-center">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            {currentImageIndex + 1} / {backgroundImages.length}
          </span>
        </div>
      </div>

      {/* 배경 이미지 선택 패널 */}
      {showImageSelector && (
        <div className="fixed bottom-24 right-8 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-96 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {currentLanguage === 'en' ? 'Select Background' : '배경 이미지 선택'}
            </h3>
            <button
              onClick={() => setShowImageSelector(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {backgroundImages.map((image) => (
              <div
                key={image.id}
                onClick={() => {
                  const index = backgroundImages.findIndex(img => img.id === image.id);
                  setCurrentImageIndex(index);
                  setSelectedBackground(image.url);
                  setIsAutoPlay(false); // 수동 선택 시 자동재생 일시정지
                  setShowImageSelector(false);
                }}
                className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                  selectedBackground === image.url
                    ? 'border-primary-600 shadow-lg scale-105'
                    : 'border-transparent hover:border-primary-300'
                }`}
              >
                <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url('${image.url}')` }} />
                <div className="p-3 bg-gray-50 dark:bg-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{image.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 배너 - Hero 섹션 (관리자에서 수정 가능) */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'Since 1982' : '1982년 설립'}
        title={heroTitle}
        description={heroDescription}
        backgroundImage={selectedBackground}
        height="700px"
      />

      {/* Gateway 빠른 접근 섹션 */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Jungho Group GATEWAY' : '정호그룹 GATEWAY'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Delivering various news from Jungho Group' : '정호그룹의 다양한 소식을 전합니다'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gateway 1: 그룹 소개 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => navigate('/hybrid/about/intro')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-6xl">👋</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {currentLanguage === 'en' ? 'Group Introduction' : '그룹 소개'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {currentLanguage === 'en' ? 'Check out Jungho Group\'s vision and history' : '정호그룹의 비전과 역사를 확인하세요'}
                </p>
                <div className="text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {currentLanguage === 'en' ? 'Learn More' : '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 2: 계열사 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={scrollToSubsidiaries}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-6xl">🏢</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {currentLanguage === 'en' ? 'Subsidiaries' : '계열사'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {currentLanguage === 'en' ? '4 professional subsidiaries together' : '4개 전문 계열사가 함께합니다'}
                </p>
                <div className="text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {currentLanguage === 'en' ? 'Learn More' : '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 3: 미디어/PR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => navigate('/hybrid/media/promotion')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-6xl">🎬</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {currentLanguage === 'en' ? 'Media/PR' : '미디어/PR'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {currentLanguage === 'en' ? 'Experience our latest news and videos' : '생생한 소식과 영상을 만나보세요'}
                </p>
                <div className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {currentLanguage === 'en' ? 'Learn More' : '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 4: 고객지원 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              onClick={() => navigate('/hybrid/support')}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-6xl">📧</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {currentLanguage === 'en' ? 'Customer Support' : '고객지원'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {currentLanguage === 'en' ? 'Feel free to contact us with any questions' : '궁금한 점을 언제든 연락하세요'}
                </p>
                <div className="text-orange-600 dark:text-orange-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {currentLanguage === 'en' ? 'Learn More' : '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 메인 콘텐츠 - 풀 너비 레이아웃 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 회사 소개 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Group Introduction' : '그룹소개'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'About JUNGHO Group' : '정호그룹에 대하여'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Founded in 1982, JUNGHO Group has been leading innovation in AI, IoT, logistics, and textile industries for over 40 years. We provide optimized solutions for each industry based on our accumulated technology and experience.'
                : '1982년 설립 이래, 정호그룹은 40년 이상 AI, IoT, 물류, 텍스타일 분야에서 혁신을 선도해왔습니다. 축적된 기술력과 경험을 바탕으로 각 산업 분야에 최적화된 솔루션을 제공하고 있습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Our four subsidiaries - CLARUS, Jungho TLC, ILLUTECH, and Jungho TEXCOM - specialize in their respective fields and work together to create synergy.'
                : '클라루스, 정호티엘씨, 일루텍, 정호텍스컴 등 4개의 계열사는 각 분야에서 전문성을 발휘하며 시너지를 창출하고 있습니다.'
              }
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate('/hybrid/about/intro')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {currentLanguage === 'en' ? 'Learn More' : '자세히 보기'}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* 주요 성과 지표 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Key Achievements' : '주요 성과'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'JUNGHO Group by Numbers' : '숫자로 보는 정호그룹'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: 40, suffix: '+', label: currentLanguage === 'en' ? 'Years of History' : '년 역사', gradient: 'from-blue-500 to-cyan-500' },
              { number: 4, suffix: '', label: currentLanguage === 'en' ? 'Subsidiaries' : '개 계열사', gradient: 'from-purple-500 to-pink-500' },
              { number: 200, suffix: '+', label: currentLanguage === 'en' ? 'Projects' : '개 프로젝트', gradient: 'from-orange-500 to-red-500' },
              { number: 50, suffix: '+', label: currentLanguage === 'en' ? 'Billion KRW Sales' : '억원 매출', gradient: 'from-green-500 to-teal-500' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${stat.gradient} p-6 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold mb-2">
                  <CountUp 
                    end={stat.number} 
                    duration={2.5}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-sm font-medium opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 주요 사업 분야 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Business Areas' : '주요 사업 분야'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'What We Do' : '정호그룹의 사업 영역'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessAreas.map((area, index) => (
              <motion.div 
                key={index}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-transparent shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative flex items-start gap-4">
                  <div className="text-5xl">{area.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {area.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 계열사 소개 */}
        <motion.section 
          id="subsidiaries-section"
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Our Subsidiaries' : '계열사 소개'}
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Four Specialized Companies' : '4개의 전문 기업'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subsidiaries.map((company, index) => (
              <motion.div 
                key={company.id}
                className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-transparent rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(company.path)}
                whileHover={{ scale: 1.02, y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* 이미지 헤더 */}
                <div className="relative h-48 overflow-hidden">
                  {company.id === 'texcom' ? (
                    // 정호텍스컴 슬라이드쇼
                    <>
                      {texcomImages.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt={`${company.name} ${idx + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ${
                            idx === texcomImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                          onError={(e) => {
                            console.error(`❌ 이미지 로드 실패: ${image}`);
                          }}
                          onLoad={() => {
                            console.log(`✅ 이미지 로드 성공: ${image}`);
                          }}
                        />
                      ))}
                      <div className={`absolute inset-0 bg-gradient-to-br ${company.gradient} opacity-40`}></div>
                    </>
                  ) : (
                    // 다른 계열사 기본 이미지
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${company.gradient} opacity-60`}></div>
                      <img 
                        src={company.image} 
                        alt={company.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </>
                  )}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-full shadow-lg">
                      {currentLanguage === 'en' ? 'Est.' : '설립'} {company.established}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                    <div className="text-4xl drop-shadow-lg">{company.icon}</div>
                  </div>
                </div>

                {/* 카드 본문 */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {company.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {company.nameEn}
                    </p>
                  </div>

                  <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong className="text-gray-900 dark:text-white">
                        {currentLanguage === 'en' ? 'Business:' : '사업분야:'}
                      </strong>{' '}
                      {company.business}
                    </p>
                    <button
                      className={`group/btn w-full px-4 py-3 bg-gradient-to-r ${company.gradient} text-white font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      {currentLanguage === 'en' ? 'Details' : '상세보기'}
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 주요 연혁 타임라인 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Major Milestones' : '주요 연혁'}
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Our Growth Journey' : '정호그룹의 성장 여정'}
            </p>
          </div>

          <div className="relative">
            {/* 수직 타임라인 바 */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 via-blue-600 to-purple-600 dark:from-green-500 dark:via-blue-500 dark:to-purple-500"></div>

            <div className="space-y-8">
              {/* 2018 - Clarus */}
              <motion.div 
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex-shrink-0 w-16 flex justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white dark:border-gray-900">
                    💡
                  </div>
                </div>
                <motion.div 
                  className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full mb-3">
                    2018
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentLanguage === 'en' ? 'Clarus Foundation' : '클라루스 설립'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentLanguage === 'en' 
                      ? 'Launch of AI-powered smart office technology, marking our entry into next-generation automation'
                      : 'AI 기반 스마트 오피스 기술 출시, 차세대 자동화 시장 진출'}
                  </p>
                </motion.div>
              </motion.div>

              {/* 2010 - ILLUTECH */}
              <motion.div 
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex-shrink-0 w-16 flex justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white dark:border-gray-900">
                    ⚡
                  </div>
                </div>
                <motion.div 
                  className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full mb-3">
                    2010
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentLanguage === 'en' ? 'ILLUTECH Foundation' : '일루텍 설립'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentLanguage === 'en' 
                      ? 'Entry into industrial & special LED lighting market with innovative solutions'
                      : '혁신적인 솔루션으로 산업·특수 LED 조명 시장 진출'}
                  </p>
                </motion.div>
              </motion.div>

              {/* 2000 - Business Expansion */}
              <motion.div 
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex-shrink-0 w-16 flex justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white dark:border-gray-900">
                    🏢
                  </div>
                </div>
                <motion.div 
                  className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full mb-3">
                    2000
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentLanguage === 'en' ? 'Business Expansion' : '사업 확장'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {currentLanguage === 'en' 
                      ? 'Significant expansion into building automation systems and power control'
                      : '빌딩 자동화 시스템 및 전력 제어 사업 본격 확대'}
                  </p>
                </motion.div>
              </motion.div>

              {/* 1982 - Foundation */}
              <motion.div 
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex-shrink-0 w-16 flex justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-4 border-white dark:border-gray-900">
                    🌟
                  </div>
                </div>
                <motion.div 
                  className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-400 dark:border-green-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded-full mb-3">
                    1982
                  </span>
                  <h4 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                    {currentLanguage === 'en' ? '🎉 Company Foundation' : '🎉 정호그룹 설립'}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed font-medium">
                    {currentLanguage === 'en' 
                      ? 'The beginning of our journey in lighting control business'
                      : '조명 제어 사업의 시작, 40년 역사의 첫 걸음'}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 고객지원 및 연락처 안내 */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 text-white rounded-2xl p-8 shadow-2xl overflow-hidden relative">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative">
              <motion.h3 
                className="text-3xl font-bold mb-2 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-4xl">📞</span>
                {currentLanguage === 'en' ? 'Contact Us' : '고객지원 및 문의'}
              </motion.h3>
              <motion.p 
                className="mb-8 text-blue-100 text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentLanguage === 'en'
                  ? 'We are always here to help you. Contact us anytime!'
                  : '언제든지 문의해 주세요. 최선을 다해 도와드리겠습니다.'}
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">☎️</span>
                    <span className="font-bold text-lg">{currentLanguage === 'en' ? 'Phone' : '전화'}</span>
                  </div>
                  <p className="text-white font-semibold">02-553-3631</p>
                  <p className="text-blue-100 text-sm mt-1">{currentLanguage === 'en' ? 'Mon-Fri 8:30AM-5:30PM' : '평일 오전 8시30분 - 오후 5시30분'}</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📠</span>
                    <span className="font-bold text-lg">{currentLanguage === 'en' ? 'Fax' : '팩스'}</span>
                  </div>
                  <p className="text-white font-semibold">02-553-2526</p>
                  <p className="text-blue-100 text-sm mt-1">{currentLanguage === 'en' ? '24/7 Available' : '24시간 이용 가능'}</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">✉️</span>
                    <span className="font-bold text-lg">{currentLanguage === 'en' ? 'Email' : '이메일'}</span>
                  </div>
                  <p className="text-white font-semibold">info@junghocorp.com</p>
                  <p className="text-blue-100 text-sm mt-1">{currentLanguage === 'en' ? 'Response within 24 hours' : '24시간 이내 답변'}</p>
                </motion.div>

                <motion.div 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📍</span>
                    <span className="font-bold text-lg">{currentLanguage === 'en' ? 'Address' : '주소'}</span>
                  </div>
                  <p className="text-white font-semibold">{currentLanguage === 'en' ? 'Seoul, Korea' : '서울특별시'}</p>
                  <p className="text-blue-100 text-sm mt-1">{currentLanguage === 'en' ? 'Gangnam-gu, Nonhyeon-ro 116-gil 17' : '강남구 논현로 116길 17 정호빌딩'}</p>
                </motion.div>
              </div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  onClick={() => navigate('/hybrid/support')}
                  className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage === 'en' ? 'Support Center' : '고객지원센터'}
                  <span>→</span>
                </motion.button>
                
                <motion.button
                  onClick={() => navigate('/hybrid/support/contact')}
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage === 'en' ? 'Contact Form' : '문의하기'}
                  <span>✉️</span>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </HybridLayout>
  );
};

export default HomePageHybrid;

