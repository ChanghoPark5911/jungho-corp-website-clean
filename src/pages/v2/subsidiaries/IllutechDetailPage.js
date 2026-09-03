import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';
import { useTheme } from '../../../contexts/ThemeContext';

const IllutechDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  const { isDarkMode } = useTheme();
  const [technicalDocuments, setTechnicalDocuments] = React.useState([]);

  // 현재 경로가 Hybrid인지 확인하여 뒤로가기 경로 설정
  const isHybrid = location.pathname.startsWith('/hybrid');
  const backPath = isHybrid ? '/hybrid' : '/';

  // JSON 파일에서 PDF 자료 로드 (우선), localStorage는 백업 (일루텍 관련만)
  React.useEffect(() => {
    const loadDocuments = async () => {
      try {
        // 1. JSON 파일에서 로드 시도 (우선) - 캐시 방지
        const timestamp = new Date().getTime();
        const response = await fetch(`/data/technical-docs.json?v=${timestamp}`, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.documents && Array.isArray(jsonData.documents)) {
            // 일루텍 관련 자료만 필터링
            const illutechDocs = jsonData.documents.filter(
              doc => doc.subsidiary === 'illutech'
            );
            setTechnicalDocuments(illutechDocs);
            console.log('✅ JSON 파일에서 일루텍 자료 로드:', illutechDocs.length, '개');
            return;
          }
        }
        
        // 2. JSON 파일 실패 시 localStorage에서 로드 (백업)
        const savedMediaData = localStorage.getItem('v2_media_data');
        if (savedMediaData) {
          const parsedData = JSON.parse(savedMediaData);
          if (parsedData.technicalDocuments) {
            const illutechDocs = parsedData.technicalDocuments.filter(
              doc => doc.subsidiary === 'illutech'
            );
            setTechnicalDocuments(illutechDocs);
            console.log('✅ localStorage에서 일루텍 자료 로드:', illutechDocs.length, '개');
          }
        }
      } catch (error) {
        console.error('PDF 자료 로드 실패:', error);
      }
    };

    loadDocuments();

    // 데이터 업데이트 이벤트 리스너
    const handleUpdate = () => loadDocuments();
    window.addEventListener('v2MediaDataUpdated', handleUpdate);
    return () => window.removeEventListener('v2MediaDataUpdated', handleUpdate);
  }, []);

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 0
      }
    }
  };

  // 연혁 및 성과 (2010-2015) - 새로운 형식
  const achievements = [
    {
      year: '2015',
      items: currentLanguage === 'en' 
        ? [
            'Participated in LED/OLED Lighting Exhibition / Building Energy Saving Solution',
            'Obtained high-efficiency certification for tube-type LED',
            'Won President\'s Award at Korea Expressway Corporation Street Light Design Contest'
          ]
        : [
            'LED/OLED 조명 전시회 참가 / 빌딩에너지절감솔루션',
            '직관형 LED 고효율 취득',
            '도로공사 가로등 디자인 공모전 사장상 수상'
          ]
    },
    {
      year: '2014',
      items: currentLanguage === 'en'
        ? [
            'Held Customer Seminar (Samjung Hotel)',
            'National project for light pollution prevention security lights, park lights, and agricultural damage prevention shields'
          ]
        : [
            '고객세미나 개최(삼정호텔)',
            '빛공해 방지용 보안등, 공원등, 농사피해방지 차광판 국책과제 수행'
          ]
    },
    {
      year: '2013',
      items: currentLanguage === 'en'
        ? ['Held Customer Seminar (Samjung Hotel)']
        : ['고객세미나 개최(삼정호텔)']
    },
    {
      year: '2012',
      items: currentLanguage === 'en'
        ? [
            'Obtained high-efficiency equipment certification for LED lighting (8 types)',
            'Supplied and installed lighting for district courts',
            'Supplied and installed parking lot lighting'
          ]
        : [
            'LED조명등(8종) 고효율기자재 인증 획득',
            '지방법원 조명등 납품 및 설치',
            '주차장 조명등 납품 및 설치'
          ]
    },
    {
      year: '2011',
      items: currentLanguage === 'en'
        ? [
            'Obtained high-efficiency equipment certification for LED multi-purpose light "LuBlo"',
            'Supplied and installed lighting for district courts',
            'Developed LED explosion-proof lights and obtained explosion-proof certification',
            'Registered as KEPCO qualified supplier'
          ]
        : [
            'LED다목적등, \'LuBlo\' 고효율기자재인증 획득',
            '지방법원 조명등 납품 및 설치',
            'LED방폭등 개발 및 방폭인증 획득',
            '한국전력 유자격 공급자 등록'
          ]
    },
    {
      year: '2010',
      items: currentLanguage === 'en'
        ? [
            'Obtained KS certification for LED industrial lighting',
            'Launched new LED lighting products',
            'Supplied to Kori, Yeonggwang, Shinwolseong nuclear power plants',
            'Supplied to ports and industrial complexes'
          ]
        : [
            'LED산업용 조명등 KS인증 획득',
            'LED조명등 신제품 출시',
            '고리, 영광, 신월성, 원자력발전소 등 납품',
            '항구 및 공단지역 등 납품'
          ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50 dark:from-gray-900 dark:via-sky-900/20 dark:to-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* 뒤로가기 버튼 */}
        <motion.button
          className="absolute top-8 left-8 z-10 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          onClick={() => navigate(backPath)}
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {currentLanguage === 'en' ? 'Subsidiaries' : '계열사 목록'}
          </span>
        </motion.button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* 로고와 회사명 */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <img 
                src="/assets/logos/logo-junghoillutech.png" 
                alt="일루텍 로고" 
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
              <div className="flex flex-col items-center -space-y-1 sm:-space-y-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                  {currentLanguage === 'en' ? 'ILLUTECH' : '일루텍'}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {currentLanguage === 'en' ? '일루텍' : 'ILLUTECH Co., Ltd.'}
                </p>
              </div>
            </motion.div>

            <motion.p 
              className="text-lg sm:text-2xl lg:text-3xl text-[#2e91fe] font-semibold max-w-3xl mx-auto pt-8 sm:pt-12 px-4"
              variants={fadeInUp}
            >
              {currentLanguage === 'en'
                ? 'Specialist in Industrial & Special LED Lighting'
                : '산업·특수 LED 조명의 전문가'}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-10"
              variants={fadeInUp}
            >
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Established' : '설립'}
                </span>
                <div className="text-xl font-bold text-[#2e91fe]">
                  {currentLanguage === 'en' ? '2010' : '2010년'}
                </div>
              </div>
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field' : '사업분야'}
                </span>
                <div className="text-xl font-bold text-[#2e91fe]">
                  {currentLanguage === 'en' ? 'Industrial & Special LED Lighting' : '산업·특수 LED 조명'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 회사 소개 */}
      <motion.section 
        className="py-12 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              {currentLanguage === 'en' ? (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold text-[#2e91fe]">ILLUTECH</span> is a specialized company that develops and manufactures industrial and special LED lighting for nuclear power plants and public infrastructure.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We have extensive manufacturing experience and certifications including <span className="font-semibold">LED development for nuclear power plants</span>, explosion-proof, high-efficiency, and KS standards.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We provide <span className="font-semibold text-[#2e91fe]">LED lighting solutions optimized for industrial sites</span> requiring demanding environments and high safety standards.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold text-[#2e91fe]">일루텍</span>은 
                    원전, 공공 인프라에 적용되는 산업·특수 LED 조명을 개발 및 제조하는 전문 기업입니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold">원전용 LED 개발</span>, 공급, 방폭, 고효율, KS 등 다양한 제조 경험과 인증을 보유하고 있습니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    까다로운 환경과 높은 안전 기준이 요구되는 <span className="font-semibold text-[#2e91fe]">산업 현장에 최적화된 LED 조명 솔루션</span>을 제공합니다.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 주요 사업 분야 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Business Areas' : '주요 사업 분야'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? 'Specialized LED lighting solutions for various industries'
                : '다양한 산업 분야를 위한 전문 LED 조명 솔루션'}
            </p>
          </motion.div>

          {/* 사업분야 1: 경관조명 사업 */}
          <div className="mb-16">
            {/* 사업분야 헤더 */}
            <div className="bg-gradient-to-r from-[#2e91fe] to-[#2580e5] text-white rounded-t-xl px-6 py-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span>●</span>
                {currentLanguage === 'en' 
                  ? 'Architectural Lighting System' 
                  : '경관조명 사업 | Architectural Lighting System'}
              </h3>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-b-xl shadow-lg border border-gray-200 dark:border-gray-700 border-t-0 overflow-hidden">
              {/* 사업 소개 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="space-y-2 text-gray-700 dark:text-gray-200">
                  <p className="flex items-start gap-2">
                    <span className="text-[#2e91fe] mt-1">✓</span>
                    <span>
                      {currentLanguage === 'en'
                        ? 'Design and construction of eco-friendly architectural lighting pursuing Identity, Beauty, and Safety of buildings through various light presentations'
                        : '빛의 다양한 연출로 건축물의 Identity, Beauty, Safety를 추구하는 친환경적인 경관조명의 설계 및 시공'}
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#2e91fe] mt-1">✓</span>
                    <span>
                      {currentLanguage === 'en'
                        ? 'Building differentiated landscape systems including energy savings through LED lighting, lighting control + IT + architectural lighting'
                        : 'LED조명기구를 활용으로 에너지 절감은 물론 조명제어 + IT + 경관조명 등 차별화된 경관시스템 구축'}
                    </span>
                  </p>
                </div>
              </div>

              {/* 경관조명의 역할 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-[#2e91fe] pl-3">
                  {currentLanguage === 'en' ? 'Role of Architectural Lighting' : '경관조명의 역할'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-200">
                  <p className="flex items-start gap-2">
                    <span className="text-[#2e91fe]">✓</span>
                    <span>{currentLanguage === 'en' ? 'Providing stability and comfort through architectural lighting' : '경관조명으로 인한 안정감 및 편안함 제공'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#2e91fe]">✓</span>
                    <span>{currentLanguage === 'en' ? 'Implementing the overall city layout' : '도시의 전체적인 Lay-out 구현'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#2e91fe]">✓</span>
                    <span>{currentLanguage === 'en' ? 'City disaster prevention and crime prevention' : '도시의 방재 및 방범 가능'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#2e91fe]">✓</span>
                    <span>{currentLanguage === 'en' ? 'Creating beautiful cities and promoting urban development' : '아름다운 도시의 조성 및 도시발전의 진흥 수단'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#2e91fe]">✓</span>
                    <span>{currentLanguage === 'en' ? 'Providing leisure to users through pleasant street creation' : '쾌적한 거리조성으로 인한 이용자들에게 여가 제공'}</span>
                  </p>
                </div>
              </div>

              {/* 적용 분야 카드 */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 복합 쇼핑몰 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h5 className="font-bold text-gray-900 dark:text-white text-center">
                        {currentLanguage === 'en' ? 'Shopping Complex' : '복합 쇼핑몰'}
                      </h5>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-[#2e91fe] mt-0.5">✓</span>
                          <span>{currentLanguage === 'en' ? 'Multimedia lighting presentation using LED fixtures' : 'LED조명기구를 이용한 멀티미디어 조명 연출'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#2e91fe] mt-0.5">✓</span>
                          <span>{currentLanguage === 'en' ? 'Efficient management linked with automatic lighting control system' : '자동조명제어시스템과 연계된 효율적인 관리'}</span>
                        </li>
                      </ul>
                      {/* 이미지 공간 */}
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <img 
                          src="/images/illutech/architectural/shopping-complex.jpg" 
                          alt="Shopping Complex"
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                          <span className="text-2xl mb-1">🏬</span>
                          <span className="text-xs">{currentLanguage === 'en' ? 'Image' : '이미지'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 업무시설 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h5 className="font-bold text-gray-900 dark:text-white text-center">
                        {currentLanguage === 'en' ? 'Office Buildings' : '업무시설'}
                      </h5>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-[#2e91fe] mt-0.5">✓</span>
                          <span>{currentLanguage === 'en' ? 'Emphasizing building\'s sense of place through upper floor lighting' : '상층부 조명연출로 건축물의 장소성을 강조'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#2e91fe] mt-0.5">✓</span>
                          <span>{currentLanguage === 'en' ? 'Mid-floor lighting for volume emphasis, plaza lighting for night users' : '중층부 조명으로 볼륨감 강조, 광장조명으로 야간 편의 제공'}</span>
                        </li>
                      </ul>
                      {/* 이미지 공간 */}
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <img 
                          src="/images/illutech/architectural/office-building.jpg" 
                          alt="Office Building"
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                          <span className="text-2xl mb-1">🏢</span>
                          <span className="text-xs">{currentLanguage === 'en' ? 'Image' : '이미지'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 주거시설 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <h5 className="font-bold text-gray-900 dark:text-white text-center">
                        {currentLanguage === 'en' ? 'Residential Facilities' : '주거시설'}
                      </h5>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <li className="flex items-start gap-2">
                          <span className="text-[#2e91fe] mt-0.5">✓</span>
                          <span>{currentLanguage === 'en' ? 'Consistent lighting on upper floors to attract attention from distance' : '아파트 상부의 일관성 있는 조명 연출로 원거리에서도 시선 유도'}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#2e91fe] mt-0.5">✓</span>
                          <span>{currentLanguage === 'en' ? 'Emphasizing apartment brand with LED Sign' : 'LED Sign으로 아파트 브랜드 강조'}</span>
                        </li>
                      </ul>
                      {/* 이미지 공간 */}
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <img 
                          src="/images/illutech/architectural/residential.jpg" 
                          alt="Residential"
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                          <span className="text-2xl mb-1">🏠</span>
                          <span className="text-xs">{currentLanguage === 'en' ? 'Image' : '이미지'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사업분야 2: LED 조명 사업 */}
          <div>
            {/* 사업분야 헤더 */}
            <div className="bg-gradient-to-r from-[#2e91fe] to-[#5ba8fe] text-white rounded-t-xl px-6 py-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <span>●</span>
                {currentLanguage === 'en' 
                  ? 'LED Lighting Business | LED Lighting System' 
                  : 'LED조명 사업 | LED Lighting System'}
              </h3>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-b-xl shadow-lg border border-gray-200 dark:border-gray-700 border-t-0 overflow-hidden">
              {/* 사업 소개 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <p className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                  <span className="text-amber-500 mt-1">✓</span>
                  <span>
                    {currentLanguage === 'en'
                      ? 'Development, manufacturing and supply of industrial Plant lights, street lights (commercial, solar), security lights, special lights, indoor lights, LED signs, and Media poles for replacing existing low-efficiency fixtures and eco-friendly Energy Saving'
                      : '기존 저효율 등기구의 대체, 친환경 Energy Saving을 위한 산업용 Plant등, 가로등(상용, 태양광), 보안등, 특수등, 실내등, LED사인, Media pole의 개발, 제조 및 공급'}
                  </span>
                </p>
              </div>

              {/* 최고의 품질 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-amber-500 pl-3">
                  {currentLanguage === 'en' ? 'Premium Quality' : '최고의 품질'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-200">
                  <p className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{currentLanguage === 'en' ? 'World\'s first development and supply of LED lighting for nuclear power plants' : '세계 최초 원자력발전소용 LED 조명등 개발 및 납품'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{currentLanguage === 'en' ? 'Obtained Nuclear Grade A and explosion-proof certification' : '원자력 A 등급 및 방폭인증 획득'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{currentLanguage === 'en' ? 'Registered as nuclear power plant auxiliary equipment supplier' : '원자력발전소 보조기기 공급업체 등록'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{currentLanguage === 'en' ? 'Advanced research facilities' : '첨단연구시설 보유'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{currentLanguage === 'en' ? 'Multiple patents owned' : '다수의 특허 보유'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{currentLanguage === 'en' ? 'Energy Winner Award recipient' : '에너지 위너상 수상'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-amber-500">✓</span>
                    <span>{currentLanguage === 'en' ? 'KS certification and high-efficiency energy equipment certification' : 'KS인증 및 고효율에너지 기자재 인증 취득'}</span>
                  </p>
                </div>
              </div>

              {/* LED 조명등 제품 */}
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-[#2e91fe]">
                  {currentLanguage === 'en' ? 'LED Lighting Products' : 'LED 조명등'}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {/* 발전소용 조명등 */}
                  <div className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 mb-2">
                      <img 
                        src="/images/illutech/led/power-plant.jpg" 
                        alt="Power Plant Lighting"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.parentNode.innerHTML = '<div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-6"><span class="text-2xl">💡</span></div>';
                        }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'en' ? 'Power Plant Lighting' : '발전소용 조명등'}
                    </p>
                  </div>

                  {/* 공장용 조명등, 보안등 */}
                  <div className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 mb-2">
                      <img 
                        src="/images/illutech/led/factory-security.jpg" 
                        alt="Factory & Security Lighting"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.parentNode.innerHTML = '<div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-6"><span class="text-2xl">🏭</span></div>';
                        }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'en' ? 'Factory & Security' : '공장용 조명등, 보안등'}
                    </p>
                  </div>

                  {/* 횡단보도 안경등 */}
                  <div className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 mb-2">
                      <img 
                        src="/images/illutech/led/crosswalk.jpg" 
                        alt="Crosswalk Safety Lighting"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.parentNode.innerHTML = '<div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-6"><span class="text-2xl">🚦</span></div>';
                        }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'en' ? 'Crosswalk Safety' : '횡단보도 안경등'}
                    </p>
                  </div>

                  {/* 방폭등 */}
                  <div className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 mb-2">
                      <img 
                        src="/images/illutech/led/explosion-proof.jpg" 
                        alt="Explosion-Proof Lighting"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.parentNode.innerHTML = '<div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-6"><span class="text-2xl">⚡</span></div>';
                        }}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {currentLanguage === 'en' ? 'Explosion-Proof' : '방폭등'}
                    </p>
                  </div>
                </div>

                {/* LED 산업등 Type / LuBlo style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {/* LED 산업등 Type */}
                  <div>
                    <h5 className="text-sm font-bold text-red-600 dark:text-red-400 mb-3">
                      {currentLanguage === 'en' ? 'LED Industrial Type' : 'LED 산업등 Type'}
                    </h5>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <img 
                        src="/images/illutech/led/industrial-type.jpg" 
                        alt="LED Industrial Type"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.parentNode.innerHTML = '<div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-8"><span class="text-3xl mb-1">🔦</span><span class="text-xs">' + (currentLanguage === 'en' ? 'Image' : '이미지') + '</span></div>';
                        }}
                      />
                    </div>
                  </div>

                  {/* LuBlo Style */}
                  <div>
                    <h5 className="text-sm font-bold text-red-600 dark:text-red-400 mb-3">
                      LuBlo Style
                    </h5>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <img 
                        src="/images/illutech/led/lublo-style.jpg" 
                        alt="LuBlo Style"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                          e.target.parentNode.innerHTML = '<div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 py-8"><span class="text-3xl mb-1">💡</span><span class="text-xs">' + (currentLanguage === 'en' ? 'Image' : '이미지') + '</span></div>';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 연혁 및 성과 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'History & Achievements' : '연혁 및 성과'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Continuous innovation and growth' : '지속적인 혁신과 성장'}
            </p>
          </motion.div>

          <div className="space-y-0">
            {achievements.map((yearData, index) => (
              <motion.div
                key={yearData.year}
                variants={fadeInUp}
                className="flex border-b border-gray-200 dark:border-gray-700 py-8 first:pt-0 last:border-b-0"
              >
                {/* 년도 - 큰 글씨 */}
                <div className="flex-shrink-0 w-24 sm:w-32">
                  <span className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                    {yearData.year}
                  </span>
                </div>
                
                {/* 내용 리스트 */}
                <div className="flex-1 pl-6 sm:pl-8">
                  <ul className="space-y-2">
                    {yearData.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-gray-400 dark:text-gray-500 mt-0.5">-</span>
                        <span className="text-base sm:text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PDF 자료 다운로드 섹션 */}
      {technicalDocuments.length > 0 && (
        <motion.section
          className="py-20 bg-white dark:bg-gray-900"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? '📥 Technical Documents' : '📥 기술자료 다운로드'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en' 
                  ? 'Download technical specifications and product catalogs'
                  : '제품 사양서 및 기술 카탈로그를 다운로드하세요'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700"
                >
                  {/* 썸네일 */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 dark:from-sky-900 dark:to-blue-900 mb-4">
                    <span className="text-4xl">{doc.thumbnail}</span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {doc.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {doc.description}
                  </p>

                  {/* 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>📄 {doc.fileSize}</span>
                    <span>{doc.language === 'ko' ? '🇰🇷' : doc.language === 'en' ? '🇺🇸' : '🌐'}</span>
                  </div>

                  {/* 다운로드 버튼 */}
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gradient-to-r from-[#2e91fe] to-[#2580e5] hover:from-[#2580e5] hover:to-[#1c6fcc] text-white rounded-lg font-semibold text-center transition-all duration-300"
                    onClick={(e) => {
                      // 파일이 없는 경우 경고
                      if (!doc.fileUrl) {
                        e.preventDefault();
                        alert(currentLanguage === 'en' ? 'File URL is not set' : '파일 URL이 설정되지 않았습니다');
                        return;
                      }
                      
                      // 한글/공백이 있는 경우 인코딩된 URL로 열기
                      if (/[\u3131-\uD79D\s]/.test(doc.fileUrl)) {
                        e.preventDefault();
                        const encodedUrl = doc.fileUrl.split('/').map(part => encodeURIComponent(part)).join('/');
                        window.open(encodedUrl, '_blank');
                      }
                    }}
                  >
                    📥 {currentLanguage === 'en' ? 'View / Download' : '보기 / 다운로드'}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 연락처 */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-gray-900 dark:to-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {currentLanguage === 'en' ? 'Contact Us' : '문의하기'}
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg space-y-4">
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📞</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Phone:' : '전화:'}
                </span>
                <a href="tel:02-515-5018" className="text-[#2e91fe] hover:underline">
                  02-515-5018
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:illutech@junghocorp.com" className="text-[#2e91fe] hover:underline">
                  illutech@junghocorp.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📍</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Headquarters:' : '본사:'}
                </span>
                <span className="text-gray-700 dark:text-white">
                  {currentLanguage === 'en'
                    ? '3F, Jungho Building, 17, Nonhyeon-ro 116-gil, Gangnam-gu, Seoul'
                    : '서울시 강남구 논현로116길 17 정호빌딩 3층'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default IllutechDetailPage;
