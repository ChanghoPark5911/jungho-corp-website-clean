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
  const [showAllAchievements, setShowAllAchievements] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  // 현재 경로가 Hybrid인지 확인하여 뒤로가기 경로 설정
  const isHybrid = location.pathname.startsWith('/hybrid');
  const backPath = isHybrid ? '/hybrid' : '/';

  // 제품 데이터 로드
  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`/data/illutech-products.json?v=${timestamp}`, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.products && Array.isArray(jsonData.products)) {
            setProducts(jsonData.products);
            console.log('✅ 일루텍 제품 데이터 로드:', jsonData.products.length, '개');
          }
        }
      } catch (error) {
        console.error('일루텍 제품 데이터 로드 실패:', error);
      }
    };

    loadProducts();
  }, []);

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
      transition: { duration: 0.6, ease: 'easeOut' }
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


  // 핵심 강점
  const strengths = [
      {
        title: currentLanguage === 'en' ? 'High-Efficiency LED' : '고효율 LED',
        description: currentLanguage === 'en'
          ? 'LED technology with excellent energy efficiency'
          : '에너지 효율이 뛰어난 LED 기술',
        icon: '⚡'
      },
      {
        title: currentLanguage === 'en' ? 'Eco-Friendly' : '친환경',
        description: currentLanguage === 'en'
          ? 'Eco-friendly materials and manufacturing processes'
          : '친환경 소재 및 제조 공정',
        icon: '🌿'
      },
      {
        title: currentLanguage === 'en' ? 'Quality Control' : '품질 관리',
        description: currentLanguage === 'en'
          ? 'Rigorous quality management system'
          : '엄격한 품질 관리 시스템',
        icon: '✅'
      },
      {
        title: currentLanguage === 'en' ? 'Diverse Product Line' : '다양한 제품군',
        description: currentLanguage === 'en'
          ? 'Customized LED lighting for each application'
          : '용도별 맞춤형 LED 조명',
        icon: '🎨'
      }
  ];

  // 연혁 및 성과 (2010-2015)
  const achievements = currentLanguage === 'en' ? [
    '2015: Participated in LED/OLED International Exhibition/International Exhibition Convention Company Award, Passed new LED product evaluation, Added high-efficiency factory lighting brand authorization',
    '2014: Received Startup Company Award (Small and Medium Business Administration), Completed integrated product development for Korea Expressway Corporation and metropolitan area projects',
    '2013: Received Startup Company Award (Small and Medium Business Administration)',
    '2012: Obtained Electrical Appliance Safety Certification for LED safety lights (8 types), Registered products with Korea Electric Power Corporation and Korea East-West Power',
    '2011: Obtained Electrical Appliance Safety Certification for LED street light "LuBlo", Registered products with Korea Electric Power Corporation, Developed LED security lights and achieved overseas exports, Registered as Korea Electric Power Corporation designated construction company',
    '2010: Obtained KS certification for LED security lights, Passed new LED security light product evaluation, Supplied products to hospitals, hotels, and industrial sites, Supplied special lighting products'
  ] : [
    '2015년: LED/OLED 국제 전시회 참가/국제전시컨벤션기업상, 신제품 LED 평가품 합격, 고효율 공장등 브랜드 등록자 권한 추가',
    '2014년: 창업기업상 수상 (중소기업청), 한국도로공사 및 수도권 프로젝트 통합 제품개발 완료',
    '2013년: 창업기업상 수상 (중소기업청)',
    '2012년: LED 안전등(8종) 전기용품안전인증 획득, 한국전력 제품 등록, 동부발전 제품 등록',
    '2011년: LED 가로등 \'LuBlo\' 전기용품안전인증 획득, 한국전력 제품 등록, LED 보안등 개발 및 해외수출 달성, 한국전력 지정공사 업체 등록',
    '2010년: LED 보안등 KS인증 획득, LED 보안등 신제품 합격, 병원·호텔·산업용 제품 공급, 특수조명 제품 공급'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-gray-900 overflow-hidden"
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
          transition={{ duration: 0.6 }}
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
            {/* 로고와 회사명을 나란히 배치 */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <img 
                src="/images/logos/junghoillutech.png" 
                alt="일루텍 로고" 
                className="h-8 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  // 이미지 로드 실패 시 대체 아이콘 표시
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'inline-block';
                }}
              />
              <span className="text-4xl sm:text-6xl hidden">💡</span>
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
              className="text-lg sm:text-2xl lg:text-3xl text-orange-600 dark:text-orange-400 font-semibold max-w-3xl mx-auto pt-8 sm:pt-12 px-4"
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
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {currentLanguage === 'en' ? '2010' : '2010년'}
                </div>
              </div>
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field' : '사업분야'}
                </span>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
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
                    <span className="font-semibold text-orange-600 dark:text-orange-400">ILLUTECH</span> is a specialized company that develops and manufactures industrial and special LED lighting for nuclear power plants and public infrastructure.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We have extensive manufacturing experience and certifications including <span className="font-semibold">LED development for nuclear power plants</span>, explosion-proof, high-efficiency, and KS standards.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We provide <span className="font-semibold text-orange-600 dark:text-orange-400">LED lighting solutions optimized for industrial sites</span> requiring demanding environments and high safety standards.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">일루텍</span>은 
                    원전, 공공 인프라에 적용되는 산업·특수 LED 조명을 개발 및 제조하는 전문 기업입니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold">원전용 LED 개발</span>, 공급, 방폭, 고효율, KS 등 다양한 제조 경험과 인증을 보유하고 있습니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    까다로운 환경과 높은 안전 기준이 요구되는 <span className="font-semibold text-orange-600 dark:text-orange-400">산업 현장에 최적화된 LED 조명 솔루션</span>을 제공합니다.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 주요 제품/서비스 */}
      <section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Main Products & Services' : '주요 제품 및 서비스'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? 'Providing various industrial LED lighting solutions'
                : '다양한 산업용 LED 조명 솔루션을 제공합니다'}
            </p>
          </motion.div>

          <div className="space-y-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:scale-[1.02]"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                  {/* 왼쪽: 텍스트 내용 (60%) */}
                  <div className="md:col-span-3 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-5xl">{product.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentLanguage === 'en' ? product.nameEn : product.nameKo}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
                      {currentLanguage === 'en' ? product.descriptionEn : product.descriptionKo}
                    </p>
                  </div>
                  
                  {/* 오른쪽: 이미지 (40%) */}
                  <div className="md:col-span-2 relative h-64 md:h-auto min-h-[240px] bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-850 flex items-center justify-center p-6">
                    {product.imagePath ? (
                      <>
                        <img
                          src={product.imagePath}
                          alt={currentLanguage === 'en' ? product.nameEn : product.nameKo}
                          className="w-2/3 h-2/3 object-contain"
                          onError={(e) => {
                            // 이미지 로드 실패 시 대체 아이콘 표시
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        {/* 이미지 로드 실패 시 대체 UI */}
                        <div className="hidden flex-col items-center justify-center text-center p-8">
                          <div className="text-6xl mb-4">{product.icon}</div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                            {currentLanguage === 'en' ? 'Image Coming Soon' : '이미지 준비중'}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-8">
                        <div className="text-6xl mb-4">{product.icon}</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                          {currentLanguage === 'en' ? 'Image Coming Soon' : '이미지 준비중'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 강점 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Core Strengths' : '핵심 강점'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en'
                ? "ILLUTECH's differentiated capabilities"
                : '일루텍만의 차별화된 역량'}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{strength.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {strength.title}
                </h3>
                <p className="text-gray-700 dark:text-white text-lg">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 연혁 및 성과 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
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

          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
          >
            {(showAllAchievements ? achievements : achievements.slice(0, 5)).map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-white text-lg flex-1">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* 더보기/접기 버튼 */}
          {achievements.length > 5 && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setShowAllAchievements(!showAllAchievements)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {showAllAchievements ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    {currentLanguage === 'en' ? 'Show Less' : '접기'}
                  </>
                ) : (
                  <>
                    {currentLanguage === 'en' ? `View All ${achievements.length} Achievements` : `전체 ${achievements.length}개 연혁 보기`}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </motion.div>
          )}
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
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 mb-4">
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
                    className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-semibold text-center transition-all duration-300"
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
        className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800"
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
                <a href="tel:02-515-5018" className="text-orange-600 dark:text-orange-400 hover:underline">
                  02-515-5018
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:illutech@junghocorp.com" className="text-orange-600 dark:text-orange-400 hover:underline">
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
