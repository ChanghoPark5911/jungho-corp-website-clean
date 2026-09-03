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

  // Hero 섹션 텍스트 (관리자 CMS 우선, 없으면 공통가이드 기본값)
  const heroTitle = heroData?.mainTitle || (currentLanguage === 'en'
    ? 'Precise Technology, Beautiful Experience'
    : '기술은 정확하게, 경험은 아름답게');

  const defaultHeroLines = currentLanguage === 'en'
    ? [
        'Evidence of expertise and trust accumulated since 1982',
        'No.1 market share in the domestic lighting control sector',
        'Successful project track record in public and private sectors',
      ]
    : [
        '1982년부터 현재까지 축적된 전문성과 신뢰의 증거',
        '조명제어 분야 국내 시장 점유율 1위 달성',
        '공공·민간 분야 성공적인 프로젝트 수행 실적',
      ];

  const heroDescription = heroData?.description || null;

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
      {/* 히어로 섹션 - 공통가이드 PDF 기준 */}
      <section className="relative min-h-screen bg-[#0e1841] flex flex-col items-center justify-center px-4">
        {/* 중앙 콘텐츠 */}
        <div className="text-center mb-24 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-sm md:text-base tracking-widest mb-6"
          >
            정호그룹
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-3xl md:text-5xl lg:text-6xl font-light leading-tight"
          >
            {heroTitle}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 space-y-2 text-sm md:text-base lg:text-lg leading-relaxed"
            style={{ color: '#ffffff' }}
          >
            {heroDescription ? (
              <p className="!text-white" style={{ color: '#ffffff' }}>{heroDescription}</p>
            ) : (
              defaultHeroLines.map((line) => (
                <p key={line} className="!text-white" style={{ color: '#ffffff' }}>{line}</p>
              ))
            )}
          </motion.div>
        </div>

        {/* 하단 퀵 링크 버튼 (공통가이드 기준) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-12 left-0 right-0 px-4"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            <button
              onClick={() => navigate('/hybrid/about/intro')}
              className="border border-white/50 text-white py-4 px-4 text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'About Jungho' : '정호소개'}
            </button>
            <button
              onClick={() => navigate('/hybrid/subsidiaries')}
              className="border border-white/50 text-white py-4 px-4 text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'Subsidiaries' : '계열사'}
            </button>
            <button
              onClick={() => navigate('/hybrid/about/ci')}
              className="border border-white/50 text-white py-4 px-4 text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300"
            >
              CI / BI
            </button>
            <button
              onClick={() => navigate('/hybrid/about/history')}
              className="border border-white/50 text-white py-4 px-4 text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'History' : '연혁 및 성과'}
            </button>
            <button
              onClick={() => navigate('/hybrid/support/careers')}
              className="border border-white/50 text-white py-4 px-4 text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300 col-span-2 md:col-span-1"
            >
              {currentLanguage === 'en' ? 'Careers' : '채용정보'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Gateway 빠른 접근 섹션 */}
      <motion.section 
        className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
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

      {/* 메인 콘텐츠 - 기업용 여유로운 레이아웃 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-16 lg:py-24">
        {/* 회사 소개 */}
        <motion.section 
          className="mb-20 lg:mb-28"
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

        {/* 정호그룹의 기록 - 핵심 지표 대형 숫자 */}
        <motion.section 
          className="mb-20 lg:mb-28 -mx-6 sm:-mx-10 lg:-mx-16 xl:-mx-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-28 relative overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 relative">
              {/* 섹션 타이틀 */}
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {currentLanguage === 'en' ? 'JUNGHO GROUP RECORDS' : '정호그룹의 기록'}
                </h2>
                <p className="text-gray-400 text-lg">
                  {currentLanguage === 'en'
                    ? 'Evidence of expertise and trust accumulated since 1982'
                    : '1982년부터 현재까지 축적된 전문성과 신뢰의 증거'}
                </p>
              </motion.div>

              {/* 핵심 지표 3개 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {/* 국내 점유율 NO.1 */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="relative inline-block mb-6">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400 mr-2">NO.</span>
                    <span 
                      className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400 group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-500"
                      style={{ fontWeight: 900, lineHeight: 1 }}
                    >
                      <CountUp 
                        end={1} 
                        duration={1.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {currentLanguage === 'en' ? 'Market Share' : '국내 점유율'}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                    {currentLanguage === 'en' 
                      ? 'No.1 market share in lighting control'
                      : '조명제어 분야 국내 시장 점유율 1위 달성'}
                  </p>
                </motion.div>

                {/* 1,000+ 프로젝트 */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative inline-block mb-6">
                    <span 
                      className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-400 group-hover:from-green-300 group-hover:to-emerald-300 transition-all duration-500"
                      style={{ fontWeight: 900, lineHeight: 1 }}
                    >
                      <CountUp 
                        end={1000} 
                        duration={2.5}
                        separator=","
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </span>
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-400 ml-1">+</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {currentLanguage === 'en' ? 'Projects Completed' : '완료된 프로젝트'}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                    {currentLanguage === 'en' 
                      ? 'Successful projects in public and private sectors'
                      : '공공·민간 분야 성공적인 프로젝트 수행 실적'}
                  </p>
                </motion.div>

                {/* 40년 업력 */}
                <motion.div 
                  className="text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative inline-block mb-6">
                    <span 
                      className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-400 group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-500"
                      style={{ fontWeight: 900, lineHeight: 1 }}
                    >
                      <CountUp 
                        end={40} 
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                    </span>
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 ml-1">+</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {currentLanguage === 'en' ? 'Years of Experience' : '업력'}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                    {currentLanguage === 'en' 
                      ? '1982 to Present - Accumulated expertise and trust'
                      : '1982년부터 현재까지 축적된 전문성과 신뢰의 증거'}
                  </p>
                </motion.div>
              </div>

              {/* 하단 보조 지표 */}
              <motion.div 
                className="mt-16 pt-12 border-t border-gray-700/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {[
                    { number: 50, suffix: '+', label: currentLanguage === 'en' ? 'Patents / Certifications' : '특허/인증' },
                    { number: 12, suffix: '+', label: currentLanguage === 'en' ? 'Industry-Academia Collabs' : '산·학·연 협업' },
                    { number: 30, suffix: '+', label: currentLanguage === 'en' ? 'Export Countries' : '수출국' },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                        <CountUp 
                          end={item.number} 
                          duration={2}
                          suffix={item.suffix || ''}
                          enableScrollSpy
                          scrollSpyOnce
                        />
                      </div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 주요 사업 분야 */}
        <motion.section 
          className="mb-20 lg:mb-28"
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

        {/* 계열사 소개 - 정돈된 Grid 레이아웃 */}
        <motion.section 
          id="subsidiaries-section"
          className="mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Our Subsidiaries' : '계열사 소개'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Four Specialized Companies' : '4개의 전문 기업'}
            </p>
          </div>

          {/* 반응형 Grid: 모바일 1열, 태블릿 2열, 데스크톱 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
            {subsidiaries.map((company, index) => (
              <motion.div 
                key={company.id}
                className="group relative bg-white dark:bg-gray-800 overflow-hidden cursor-pointer"
                onClick={() => navigate(company.path)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ borderRadius: '12px' }}
              >
                {/* 카드 컨테이너 - Hover 시 위로 올라가고 그림자 깊어짐 */}
                <div 
                  className="h-full border border-gray-200 dark:border-gray-700 
                    shadow-md hover:shadow-2xl 
                    transform hover:-translate-y-2 
                    transition-all duration-400 ease-out
                    overflow-hidden"
                  style={{ borderRadius: '12px' }}
                >
                  {/* 이미지 헤더 - 비율 고정 */}
                  <div className="relative h-52 overflow-hidden">
                    {company.id === 'texcom' ? (
                      // 정호텍스컴 슬라이드쇼
                      <>
                        {texcomImages.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`${company.name} ${idx + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover 
                              group-hover:scale-105 transition-transform duration-700 ease-out
                              ${idx === texcomImageIndex ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transition: 'opacity 0.8s ease-in-out, transform 0.7s ease-out' }}
                          />
                        ))}
                        <div className={`absolute inset-0 bg-gradient-to-br ${company.gradient} opacity-30 group-hover:opacity-20 transition-opacity duration-300`} />
                      </>
                    ) : (
                      // 다른 계열사 이미지
                      <>
                        <img 
                          src={company.image} 
                          alt={company.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${company.gradient} opacity-50 group-hover:opacity-30 transition-opacity duration-300`} />
                      </>
                    )}
                    
                    {/* 설립년도 배지 */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold shadow-lg"
                        style={{ borderRadius: '8px' }}>
                        {currentLanguage === 'en' ? 'Est.' : '설립'} {company.established}
                      </span>
                    </div>
                    
                    {/* 아이콘 - 하단 좌측 */}
                    <div className="absolute bottom-4 left-5 z-10">
                      <div 
                        className="w-14 h-14 bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                        style={{ borderRadius: '12px' }}
                      >
                        <span className="text-3xl">{company.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* 카드 본문 - 정돈된 간격 */}
                  <div className="p-6">
                    {/* 회사명 영역 - 아이콘과의 간격 확보 */}
                    <div className="mb-5">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1.5 
                        group-hover:text-primary-600 dark:group-hover:text-primary-400 
                        transition-colors duration-300">
                        {company.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-500 tracking-wide">
                        {company.nameEn}
                      </p>
                    </div>

                    {/* 설명 - 적절한 줄 간격 */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 min-h-[48px]">
                      {company.description}
                    </p>

                    {/* 사업분야 & 버튼 */}
                    <div className="pt-5 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-start gap-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                          {currentLanguage === 'en' ? 'Business:' : '사업분야:'}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">{company.business}</span>
                      </p>
                      
                      <button
                        className={`w-full px-5 py-3.5 bg-gradient-to-r ${company.gradient} 
                          text-white font-semibold text-sm
                          shadow-md group-hover:shadow-lg 
                          transform group-hover:-translate-y-0.5 
                          transition-all duration-300 
                          flex items-center justify-center gap-2`}
                        style={{ borderRadius: '10px' }}
                      >
                        {currentLanguage === 'en' ? 'View Details' : '상세보기'}
                        <svg 
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 주요 연혁 타임라인 - 40년 역사 */}
        <motion.section 
          className="mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? '40 Years of History' : '40년의 발자취'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentLanguage === 'en' ? '1982 - Present | Our Growth Journey' : '1982년 ~ 현재 | 정호그룹의 성장 여정'}
            </p>
          </div>

          <div className="relative">
            {/* 수직 타임라인 바 - 그라데이션 강화 */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-green-500 via-purple-500 to-emerald-600" />

            <div className="space-y-6">
              {/* 연혁 데이터 배열 */}
              {[
                {
                  year: '2024',
                  title: currentLanguage === 'en' ? 'New Corporate Website Launch' : '그룹 홈페이지 리뉴얼',
                  description: currentLanguage === 'en' 
                    ? 'Launch of modernized corporate website with enhanced UX'
                    : '현대적 디자인과 향상된 사용자 경험의 새로운 홈페이지 오픈',
                  icon: '🌐',
                  gradient: 'from-blue-500 to-indigo-500',
                  isHighlight: false
                },
                {
                  year: '2020',
                  title: currentLanguage === 'en' ? 'Smart Factory Solutions' : '스마트 팩토리 솔루션 개발',
                  description: currentLanguage === 'en' 
                    ? 'Development of IoT-based smart factory lighting control system'
                    : 'IoT 기반 스마트 팩토리 조명제어 시스템 개발 및 상용화',
                  icon: '🏭',
                  gradient: 'from-cyan-500 to-blue-500',
                  isHighlight: false
                },
                {
                  year: '2018',
                  title: currentLanguage === 'en' ? 'CLARUS Establishment' : '클라루스 설립',
                  description: currentLanguage === 'en' 
                    ? 'AI-powered smart office technology, next-generation automation'
                    : 'AI 기반 스마트 오피스 기술 출시, 차세대 자동화 시장 진출',
                  icon: '💡',
                  gradient: 'from-blue-500 to-cyan-500',
                  isHighlight: false
                },
                {
                  year: '2015',
                  title: currentLanguage === 'en' ? 'LED Lighting Export Expansion' : 'LED 조명 해외수출 확대',
                  description: currentLanguage === 'en' 
                    ? 'Export expansion to Southeast Asia, Middle East, and Europe'
                    : '동남아, 중동, 유럽 등 해외 시장 수출 본격화',
                  icon: '🌏',
                  gradient: 'from-teal-500 to-green-500',
                  isHighlight: false
                },
                {
                  year: '2010',
                  title: currentLanguage === 'en' ? 'ILLUTECH Establishment' : '일루텍 설립',
                  description: currentLanguage === 'en' 
                    ? 'Entry into industrial & special LED lighting market'
                    : '산업·특수 LED 조명 시장 진출, 원전용 특수조명 개발',
                  icon: '⚡',
                  gradient: 'from-orange-500 to-red-500',
                  isHighlight: false
                },
                {
                  year: '2005',
                  title: currentLanguage === 'en' ? 'Power Monitoring System' : '전력감시시스템 개발',
                  description: currentLanguage === 'en' 
                    ? 'Development of integrated power monitoring and control system'
                    : '통합 전력감시제어 시스템 개발, 에너지 절감 솔루션 출시',
                  icon: '📊',
                  gradient: 'from-yellow-500 to-orange-500',
                  isHighlight: false
                },
                {
                  year: '2000',
                  title: currentLanguage === 'en' ? 'Building Automation Expansion' : '빌딩 자동화 사업 확대',
                  description: currentLanguage === 'en' 
                    ? 'Major expansion into building automation and power control systems'
                    : '빌딩 자동화 시스템 및 전력 제어 사업 본격 확대',
                  icon: '🏢',
                  gradient: 'from-purple-500 to-pink-500',
                  isHighlight: false
                },
                {
                  year: '1995',
                  title: currentLanguage === 'en' ? 'Dimming Control Technology' : '조광제어 기술 혁신',
                  description: currentLanguage === 'en' 
                    ? 'Development of advanced dimming control technology for public facilities'
                    : '공공시설용 조광제어 기술 개발, 국내 최초 디지털 조광기 출시',
                  icon: '🔆',
                  gradient: 'from-amber-500 to-yellow-500',
                  isHighlight: false
                },
                {
                  year: '1990',
                  title: currentLanguage === 'en' ? 'Textile Machinery Division' : '섬유기계 사업 진출',
                  description: currentLanguage === 'en' 
                    ? 'Establishment of TEXCOM, entry into textile machinery business'
                    : '정호텍스컴 설립, 섬유기계 및 시험기 사업 시작',
                  icon: '🧵',
                  gradient: 'from-rose-500 to-pink-500',
                  isHighlight: false
                },
                {
                  year: '1982',
                  title: currentLanguage === 'en' ? '🎉 JUNGHO Group Foundation' : '🎉 정호그룹 설립',
                  description: currentLanguage === 'en' 
                    ? 'The beginning of our 40-year journey in lighting control business'
                    : '조명 제어 사업의 시작, 40년 역사의 첫 걸음을 내딛다',
                  icon: '🌟',
                  gradient: 'from-green-500 to-emerald-500',
                  isHighlight: true
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.year}
                  className="relative flex gap-4 md:gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {/* 타임라인 노드 */}
                  <div className="flex-shrink-0 w-12 md:w-16 flex justify-center relative z-10">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900 transition-transform duration-300 hover:scale-110`}>
                      <span className="text-lg md:text-xl">{item.icon}</span>
                    </div>
                  </div>
                  
                  {/* 카드 */}
                  <motion.div 
                    className={`flex-1 rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-default
                      ${item.isHighlight 
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 border-2 border-green-400 dark:border-green-600' 
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    whileHover={{ x: 8, scale: 1.01 }}
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`inline-block px-3 py-1.5 bg-gradient-to-r ${item.gradient} text-white text-xs font-bold rounded-full shadow-sm`}>
                        {item.year}
                      </span>
                      <h4 className={`text-lg md:text-xl font-bold ${item.isHighlight ? 'text-green-800 dark:text-green-200' : 'text-gray-900 dark:text-white'}`}>
                        {item.title}
                      </h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${item.isHighlight ? 'text-green-700 dark:text-green-300 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 인증 및 제품 로고 섹션 - Grayscale to Color Effect */}
        <motion.section 
          className="mb-20 lg:mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Global Certifications & Brands' : '글로벌 인증 및 브랜드'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Our Achievements & Recognition' : '40년간 축적된 기술력의 증거'}
            </p>
          </div>

          {/* 인증/브랜드 로고 그리드 + 중앙 제품 이미지 */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700">
            {/* 중앙 제품 이미지 */}
            <div className="mb-10 flex justify-center">
              <img
                src="/images/clarus/lighting-control-system-diagram.png"
                alt={currentLanguage === 'en' ? 'Lighting Control System' : '조명제어 시스템'}
                className="max-h-48 md:max-h-64 w-auto object-contain rounded-xl"
                onError={(e) => {
                  e.target.src = '/images/light_control.png';
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { name: 'CLARUS', desc: currentLanguage === 'en' ? 'Brand' : '브랜드', logo: '/assets/logos/logo-clarus.png' },
                { name: 'Magic CLARUS', desc: currentLanguage === 'en' ? 'Brand' : '브랜드', logo: '/assets/logos/logo-magicclarus.png' },
                { name: 'HiEF', desc: currentLanguage === 'en' ? 'Brand' : '브랜드', logo: '/assets/logos/logo-hief2.png' },
                { name: 'UL LISTED', desc: currentLanguage === 'en' ? 'Safety Certification' : '안전인증', icon: 'UL' },
                { name: 'KC', desc: currentLanguage === 'en' ? 'Korea Certification' : '국가통합인증', icon: 'KC' },
                { name: 'FC', desc: currentLanguage === 'en' ? 'FCC Certification' : 'FCC 인증', icon: 'FC' },
                { name: 'K-Mark', desc: currentLanguage === 'en' ? 'Performance Mark' : '성능인증', icon: 'K' },
                { name: 'Q-Mark', desc: currentLanguage === 'en' ? 'Quality Mark' : '품질인증', icon: 'Q' },
              ].map((cert, index) => (
                <motion.div
                  key={cert.name}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div 
                    className="flex flex-col items-center justify-center p-4 md:p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 group-hover:-translate-y-1 min-h-[120px]"
                    style={{ borderRadius: '12px' }}
                  >
                    {cert.logo ? (
                      <img
                        src={cert.logo}
                        alt={cert.name}
                        className="h-10 md:h-12 w-auto object-contain mb-3 transition-all duration-500 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="h-10 md:h-12 mb-3 flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100">
                        <span className="text-xl md:text-2xl font-black text-gray-700 dark:text-gray-200 tracking-tight">
                          {cert.icon}
                        </span>
                      </div>
                    )}
                    <h4 className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 text-center">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {cert.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 하단 통계 */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {[
                  { number: '50+', label: currentLanguage === 'en' ? 'Patents / Certifications' : '특허/인증' },
                  { number: '12+', label: currentLanguage === 'en' ? 'Industry-Academia Collabs' : '산·학·연 협업' },
                  { number: '30+', label: currentLanguage === 'en' ? 'Export Countries' : '수출국' },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 고객지원 및 연락처 안내 */}
        <motion.section 
          className="mb-16 lg:mb-20"
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

