import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';
import { useTheme } from '../../../contexts/ThemeContext';

const TlcDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  const { isDarkMode } = useTheme();
  const [technicalDocuments, setTechnicalDocuments] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showAllAchievements, setShowAllAchievements] = React.useState(false);

  // 현재 경로가 Hybrid인지 확인하여 뒤로가기 경로 설정
  const isHybrid = location.pathname.startsWith('/hybrid');
  const backPath = isHybrid ? '/hybrid' : '/';

  // JSON 파일에서 PDF 자료 로드 (우선), localStorage는 백업 (정호티엘씨 관련만)
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
            // 정호티엘씨 관련 자료만 필터링
            const tlcDocs = jsonData.documents.filter(
              doc => doc.subsidiary === 'tlc'
            );
            setTechnicalDocuments(tlcDocs);
            console.log('✅ JSON 파일에서 정호티엘씨 자료 로드:', tlcDocs.length, '개');
            return;
          }
        }
        
        // 2. JSON 파일 실패 시 localStorage에서 로드 (백업)
        const savedMediaData = localStorage.getItem('v2_media_data');
        if (savedMediaData) {
          const parsedData = JSON.parse(savedMediaData);
          if (parsedData.technicalDocuments) {
            const tlcDocs = parsedData.technicalDocuments.filter(
              doc => doc.subsidiary === 'tlc'
            );
            setTechnicalDocuments(tlcDocs);
            console.log('✅ localStorage에서 정호티엘씨 자료 로드:', tlcDocs.length, '개');
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

  // 주요 제품/서비스 (Classic 버전 콘텐츠 적용)
  const products = [
    {
      name: currentLanguage === 'en' ? 'Integrated SI System Supply' : '통합 SI 시스템 공급',
      description: currentLanguage === 'en'
        ? 'IT system that maximizes building efficiency and safety by integrating multiple subsystems'
        : '다수하위시스템을 통합하여 건물의 효율성, 안전성을 극대화하는 IT 시스템',
      features: currentLanguage === 'en' 
        ? ['Central Management (System Integration)', 'Energy Optimization', 'Fault Detection', 'Remote Monitoring']
        : ['중앙관리(시스템통합)', '에너지 최적화', '고장감지', '원격모니터링'],
      imagePath: '/images/tlc/integrated-si-system.png'
    },
    {
      name: currentLanguage === 'en' ? 'Lighting Control System Solution' : '조명제어시스템 솔루션 구축',
      description: currentLanguage === 'en'
        ? 'Design, construction, and operation management support for lighting control systems in commercial buildings, office buildings, and data/logistics centers'
        : '상가 및 오피스 빌딩, 데이터/물류센터의 조명제어시스템 설계, 시공, 운영관리 지원',
      features: currentLanguage === 'en'
        ? ['System Design', 'Construction', 'Operation Management', 'Technical Support']
        : ['시스템 설계', '시공', '운영관리', '기술지원'],
      imagePath: '/images/tlc/lighting-control-solution.png'
    },
    {
      name: currentLanguage === 'en' ? 'Power Monitoring System Solution' : '전력 모니터링시스템 솔루션 구축',
      description: currentLanguage === 'en'
        ? 'Design, construction, and operation management support for optimal power monitoring systems in commercial buildings, public facilities, and data/logistics centers'
        : '상가빌딩, 공공시설, 데이터/물류센터의 최적 전력감시시스템 설계, 시공, 운영관리 지원',
      features: currentLanguage === 'en'
        ? ['System Design', 'Construction', 'Operation Management', 'Technical Support']
        : ['시스템 설계', '시공', '운영관리', '기술지원'],
      imagePath: '/images/tlc/power-monitoring-solution.png'
    }
  ];

  // 핵심 강점
  const strengths = [
      {
        title: currentLanguage === 'en' ? '40 Years of Expertise' : '40년 노하우',
        description: currentLanguage === 'en'
          ? 'Lighting control technology and experience accumulated since 1982'
          : '1982년부터 축적된 조명 제어 기술과 경험',
        icon: '🏆'
      },
      {
        title: currentLanguage === 'en' ? 'Technical Capabilities' : '기술력',
        description: currentLanguage === 'en'
          ? 'Domestic and international certifications and patents'
          : '국내외 인증 획득 및 특허 보유',
        icon: '🔬'
      },
      {
        title: currentLanguage === 'en' ? 'Energy Savings' : '에너지 절감',
        description: currentLanguage === 'en'
          ? 'Solutions enabling up to 40% energy savings'
          : '최대 40% 에너지 절감 가능한 솔루션',
        icon: '🌱'
      },
      {
        title: currentLanguage === 'en' ? 'Customization' : '고객 맞춤',
        description: currentLanguage === 'en'
          ? 'Optimized solutions for each project'
          : '프로젝트별 최적화된 솔루션 제공',
        icon: '🎯'
      }
  ];

  // 연혁 및 성과 (2011-2018)
  const achievements = currentLanguage === 'en' ? [
    '2018: Received Excellence Award at Seoul LED & OLED EXPO, Supplied to Icheon Gyeongdeok Parc.1',
    '2017: Received Excellence Award at Seoul LED & OLED EXPO, Group CEO received Legal Education Completion Award',
    '2016: Received Excellence Award at Seoul LED & OLED EXPO, Participated in Egypt LFI Exhibition, Received International Exhibition Convention Award at Seoul LED/OLED Meeting, Selected as Excellent Company Representative by Gyeonggi Intellectual Property Center',
    '2015: Participated in Dubai Lighting Fair (LFI), Participated in LED/OLED International Exhibition/International Exhibition Convention Company Award, Excellent Company Representative/Commissioner of Korean Intellectual Property Office Award by Gyeonggi Intellectual Property Center',
    '2014: Developed SI/FMS products, Supplied high-rise buildings and luxury hotel projects (5-star hotels/hospitals, hotel surveillance systems), Received Construction New Technology Award',
    '2013: Received CLARUS Brand Creation Company Award (Small and Medium Business Administration)',
    '2012: Exported building control system overseas (Singapore, Indonesia)',
    '2011: Received Excellent Product Selection Award (Small and Medium Business Administration)'
  ] : [
    '2018년: 서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 이천경덕 Parc.1 공급',
    '2017년: 서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 그룹 CEO 법률교육 이수상 수상',
    '2016년: 서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 이집트 LFI 전시회 참가, 서울 LED/OLED회 국제전시컨벤션상 수상, 경기지식재산센터 우수기업 대표',
    '2015년: 두바이 라이팅페어 참가 (LFI), LED/OLED 국제 전시회 참가/국제전시컨벤션기업상, 경기지식재산센터 우수기업 대표/특허청장상',
    '2014년: SI/FMS 제품 개발, 초고층빌딩 및 고급호텔 프로젝트 납품 (5성급 호텔/병원, 호텔 감시시스템), 건설신기술대상 수상',
    '2013년: CLARUS 브랜드 창조 기업상 수상 (중소기업청)',
    '2012년: 빌딩관제시스템 해외수출 (싱가포르, 인도네시아)',
    '2011년: 우수상품 선정상 수상 (중소기업청)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-primary-50 via-green-50 to-primary-50 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900 overflow-hidden"
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
                src="/images/logos/junghotlc.png" 
                alt="정호티엘씨 로고" 
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
                  {currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨'}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {currentLanguage === 'en' ? '정호티엘씨' : 'Jungho TLC Co., Ltd.'}
                </p>
              </div>
            </motion.div>

            <motion.p 
              className="text-lg sm:text-2xl lg:text-3xl text-primary-600 dark:text-primary-400 font-semibold max-w-3xl mx-auto pt-8 sm:pt-12 px-4"
              variants={fadeInUp}
            >
              {currentLanguage === 'en'
                ? 'Partner for Stable Building Automation'
                : '안정적인 빌딩 자동화의 파트너'}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-10"
              variants={fadeInUp}
            >
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Established' : '설립'}
                </span>
                <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {currentLanguage === 'en' ? '1982' : '1982년'}
                </div>
              </div>
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field' : '사업분야'}
                </span>
                <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {currentLanguage === 'en' ? 'Integrated Lighting & Power Control' : '조명·전력 통합 제어'}
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
                    <span className="font-semibold text-primary-600 dark:text-primary-400">Jungho TLC</span> supports stable operation of large-scale sites based on extensive domestic delivery experience in integrated lighting and power monitoring/control (SI/FMS) and smart parking lot lighting.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We are leading the market based on over <span className="font-semibold">40 years of accumulated technology</span> in building automation control fields such as power control, lighting control, and SI/FMS.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We simultaneously realize <span className="font-semibold text-primary-600 dark:text-primary-400">energy savings and user convenience</span> through providing customized solutions for our customers.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold text-primary-600 dark:text-primary-400">정호티엘씨</span>는 
                    조명·전력 통합 감시·제어(SI/FMS)와 스마트 주차장 조명등의 풍부한 국내 납품 실적을 바탕으로 대규모 현장의 안정적인 운영을 지원합니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    전력제어, 조명제어, SI/FMS 등 빌딩 자동 제어 분야에서 <span className="font-semibold">40년 이상 축적된 기술력</span>을 바탕으로 시장을 선도하고 있습니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    고객 맞춤형 솔루션 제공을 통해 <span className="font-semibold text-primary-600 dark:text-primary-400">에너지 절감과 사용자 편의성</span>을 동시에 실현하고 있습니다.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 주요 제품/서비스 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Main Products & Services' : '주요 제품 및 서비스'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? 'Providing various building automation solutions'
                : '다양한 빌딩 자동화 솔루션을 제공합니다'}
            </p>
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-white text-purple-600 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white m-0 p-0" style={{ lineHeight: '1' }}>
                    {product.name}
                  </h3>
                </div>

                {/* 본문: 좌측 텍스트 + 우측 이미지 */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 좌측: 설명 및 주요 기능 (2/3) */}
                    <div className="lg:col-span-2">
                      <p className="text-gray-700 dark:text-gray-200 text-base mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* 주요 기능 */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          {currentLanguage === 'en' ? '▪ Key Features:' : '▪ 주요 기능:'}
                        </h4>
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                              <span className="text-purple-600 dark:text-purple-400 font-bold mt-0.5">✓</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 우측: 다이어그램/이미지 공간 (1/3) */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 h-full min-h-[200px] flex flex-col items-center justify-center">
                        {product.imagePath ? (
                          <div 
                            className="w-full h-full flex items-center justify-center cursor-pointer group relative"
                            onClick={() => setSelectedImage({ src: product.imagePath, alt: product.name })}
                          >
                            <img 
                              src={product.imagePath} 
                              alt={`${product.name} diagram`}
                              className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = '<div class="text-center"><div class="text-4xl mb-2">📊</div><p class="text-sm text-gray-500 dark:text-gray-400 font-semibold">' + 
                                  (currentLanguage === 'en' ? 'Diagram<br/>Coming Soon' : '다이어그램<br/>준비중') + '</p></div>';
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <div className="bg-black bg-opacity-50 rounded-full p-3">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-2">📊</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                              {currentLanguage === 'en' ? 'Diagram' : '다이어그램'}<br />
                              {currentLanguage === 'en' ? 'Coming Soon' : '준비중'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

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
                ? "Jungho TLC's differentiated capabilities"
                : '정호티엘씨만의 차별화된 역량'}
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
                className="bg-gradient-to-br from-primary-50 to-green-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-primary-200 dark:border-gray-700"
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
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-bold">{index + 1}</span>
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-green-100 dark:from-primary-900 dark:to-green-900 mb-4">
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
                    className="block w-full py-3 bg-gradient-to-r from-primary-500 to-green-500 hover:from-primary-600 hover:to-green-600 text-white rounded-lg font-semibold text-center transition-all duration-300"
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
        className="py-20 bg-gradient-to-br from-primary-50 to-green-50 dark:from-gray-900 dark:to-gray-800"
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
                <a href="tel:02-515-5018" className="text-primary-600 dark:text-primary-400 hover:underline">
                  02-515-5018
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:tlc@junghocorp.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                  tlc@junghocorp.com
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

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TlcDetailPage;
