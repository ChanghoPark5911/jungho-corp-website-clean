import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';
import { useTheme } from '../../../contexts/ThemeContext';
import ProjectProcessSection from '../../../components/tlc/ProjectProcessSection';

const TlcDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  const { isDarkMode } = useTheme();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showAllAchievements, setShowAllAchievements] = React.useState(false);

  // 현재 경로가 Hybrid인지 확인하여 뒤로가기 경로 설정
  const isHybrid = location.pathname.startsWith('/hybrid');
  const backPath = isHybrid ? '/hybrid' : '/';

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

  // 주요 제품/서비스 (순서: 조명제어 → 전력모니터링 → 통합SI)
  const products = [
    {
      name: currentLanguage === 'en' ? 'Lighting Control System Solution' : '조명제어시스템 솔루션 구축',
      description: currentLanguage === 'en'
        ? 'Design, construction, and operation management support for lighting control systems in commercial buildings, office buildings, and data/logistics centers'
        : '상가 및 오피스 빌딩, 데이터/물류센터의 조명제어시스템 설계, 시공, 운영관리 지원',
      // 두 열 구조로 표시
      twoColumns: true,
      column1: {
        title: currentLanguage === 'en' ? '1. IoT-based Building & Facility Lighting Control System' : '1. IoT 기반 건물 및 시설물 조명제어시스템',
        subtitle: currentLanguage === 'en' ? '▪ Key System Features:' : '▪ 시스템 주요 기능:',
        features: currentLanguage === 'en'
          ? ['Remote Control', 'Energy Saving', 'Schedule Management', 'Real-time Monitoring']
          : ['원격 제어', '에너지 절감', '스케줄 관리', '실시간 모니터링']
      },
      column2: {
        title: currentLanguage === 'en' ? '2. Lighting Control System Design, Construction, Operation Support' : '2. 조명제어시스템 설계, 시공, 운영관리 지원',
        subtitle: currentLanguage === 'en' ? '▪ Main Services:' : '▪ 주요 업무:',
        features: currentLanguage === 'en'
          ? ['System Design', 'Construction', 'Operation Management', 'Technical Support']
          : ['시스템 설계', '시공', '운영관리', '기술지원']
      },
      imagePath: '/images/tlc/lighting-control-solution.png'
    },
    {
      name: currentLanguage === 'en' ? 'Power Monitoring System Solution' : '전력 모니터링시스템 솔루션 구축',
      description: currentLanguage === 'en'
        ? 'Design, construction, and operation management support for optimal power monitoring systems in commercial buildings, public facilities, and data/logistics centers'
        : '상가빌딩, 공공시설, 데이터/물류센터의 최적 전력감시시스템 설계, 시공, 운영관리 지원',
      // 두 열 구조로 표시
      twoColumns: true,
      column1: {
        title: currentLanguage === 'en' ? '1. Real-time Power Usage Monitoring & Analysis' : '1. 실시간 전력사용량 감시 및 분석',
        subtitle: currentLanguage === 'en' ? '▪ Key System Features:' : '▪ 시스템 주요 기능:',
        features: currentLanguage === 'en'
          ? ['Power Metering', 'Data Analysis', 'Report Generation', 'Alarm System', 'Emergency Response Strategy', 'Energy Usage Analysis']
          : ['전력계측', '데이터 분석', '리포트 생성', '경보/알람시스템', '비상시 대응전략', '에너지 사용 분석']
      },
      column2: {
        title: currentLanguage === 'en' ? '2. Power Monitoring System Design, Construction, Operation Support' : '2. 전력감시시스템 설계, 시공, 운영관리 지원',
        subtitle: currentLanguage === 'en' ? '▪ Main Services:' : '▪ 주요 업무:',
        features: currentLanguage === 'en'
          ? ['System Design', 'Construction', 'Operation Management', 'Technical Support']
          : ['시스템 설계', '시공', '운영관리', '기술지원']
      },
      imagePath: '/images/tlc/power-monitoring-solution.png'
    },
    {
      name: currentLanguage === 'en' ? 'Integrated SI System (SI/FMS) Implementation' : '통합 SI 시스템(SI/FMS) 구현',
      description: currentLanguage === 'en'
        ? 'IT system that maximizes building efficiency and safety by integrating multiple subsystems'
        : '다수하위시스템을 통합하여 건물의 효율성, 안전성을 극대화하는 IT 시스템',
      features: currentLanguage === 'en' 
        ? ['Central Management (System Integration)', 'Energy Optimization', 'Fault Detection', 'Remote Monitoring']
        : ['중앙관리(시스템통합)', '에너지 최적화', '고장감지', '원격모니터링'],
      imagePath: '/images/tlc/integrated-si-system.png'
    }
  ];

  // 연혁 및 성과 (2004-2025)
  const achievements = currentLanguage === 'en' ? [
    '2025: Energy Manager 5 (EM5) Lighting/Power Software, D-Type Program Switch 6 models, Google Android, Apple iOS EF2 Setting App launched',
    '2024: Programmable Controller and Building Management System using it Patent Application',
    '2023: Magic CLARUS Online E-commerce Platform Development and Sales Launch',
    '2021: Prime Minister Award for Excellent New Technology Development Company (Electrical Safety Device Integrated Lighting and Heating Control Device)',
    '2020: Ladder-Less Remote Control System Platform Development, Ministry of Trade, Industry and Energy "Industrial Convergence Leading Company" Selected',
    '2019: Lighting Fair International, Philadelphia USA - LED/OLED Lighting Exhibition / Hong Kong Autumn International Lighting Exhibition',
    '2018: Lighting Fair International, Chicago USA - LED/OLED Lighting Exhibition / Domestic Dealer Sales System Established',
    '2017: Group CEO received Minister of Land, Infrastructure and Transport Award',
    '2016: Lighting Fair International, San Diego USA / International LED/OLED Exhibition Prime Minister Award (Wireless TOUCH LCD SWITCH) / Building Equipment, Power and Lighting Integrated Control System Patent Registration',
    '2015: Lighting Fair International, New York / Minister of Trade, Industry and Energy Award (10A Hybrid Terminal Unit) / Industrial Convergence Leading Company and Product Designation (Building Automation Control System) / Top 100 Products in Asia (Lighting Automation Control System)',
    '2014: SI/FMS Operation SOFTWARE Development',
    '2013: GS (Good Software) Certification (No:13-0033) / Direct Production Certification (Automatic Control Panel, Automatic Switch, Instrumentation Control Device) / USA Nexlight, Canada Douglass, Gentec, Vietnam Dealer Contract',
    '2012~2010: Power Control System Software / All Product Quality Certifications: UL/cUL, KC/FCC',
    '2004: New Headquarters Building Construction (Nonhyeon-dong, Gangnam-gu, Seoul)'
  ] : [
    '2025년: Energy Manager 5 (EM5) 조명/전력 소프트웨어, D-Type Program Switch 6종, Google Android, Apple iOS EF2 Setting App 신제품 출시',
    '2024년: 프로그래머블 콘트롤러 및 이를 이용한 빌딩 관리 시스템 특허출원',
    '2023년: Magic CLARUS 온라인 E커머스 플랫폼 구축 및 판매개시',
    '2021년: 신기술 개발우수업체 국무총리상 수상 (전기안전장치 융합형 조명 및 전열제어 장치)',
    '2020년: Ladder-Less 원격제어 시스템 플랫폼 개발, 산업통상자원부장관 \'산업융합 선도기업\' 선정',
    '2019년: Lighting Fair International, Philadelphia USA 참가 - LED/OLED 조명 전시회 / 홍콩 추계 국제 조명 전시회 참가',
    '2018년: Lighting Fair International, Chicago USA 참가 - LED/OLED 조명 전시회 참가 / 국내 대리점 판매 체계 구축',
    '2017년: 그룹 CEO 국토교통부 장관상 수상',
    '2016년: Lighting Fair International, San Diego USA 참가 / 국제LED/OLED회 참가 국무총리상 수상 (무선 TOUCH LCD SWITCH) / 건물의 설비, 전력 및 조명 통합 제어 시스템 특허등록',
    '2015년: Lighting Fair International, New York 참가 / 산업자원부 장관상 수상 (10A Hybrid Terminal Unit) / 산업융합선도기업 및 융합품목 지정 (건물자동제어시스템) / 아시아를 빛낸 100대 제품 선정 (조명자동제어시스템)',
    '2014년: SI/FMS 운영 SOFTWARE 개발',
    '2013년: GS(Good Software) 인증 획득 (인증번호:13-0033) / 직접생산확인증명 (자동제어반, 자동점멸기, 계장(계측)제어장치) / 미국 Nexlight, 캐나다 Douglass, Gentec, 베트남 대리점 계약',
    '2012~2010년: 전력제어시스템 Software / 전 제품 품질인증 취득: UL/cUL, KC/FCC 인증',
    '2004년: 4월 신사옥 신축 이전 (서울시 강남구 논현동)'
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
                  {currentLanguage === 'en' ? 'Lighting Control / Power Monitoring & SI/FMS' : '조명제어/전력감시 및 SI/FMS'}
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
                    조명제어, 전력감시, SI/FMS 시스템 등 빌딩 자동 제어 분야에서 <span className="font-semibold">40년 이상 축적된 기술력</span>을 바탕으로 시장을 선도하고 있으며, 풍부한 국내 납품 실적을 바탕으로 대규모 현장의 안정적인 운영을 지원합니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    또한 고객 맞춤형 솔루션을 제공하여 <span className="font-semibold text-primary-600 dark:text-primary-400">에너지 절감과 사용자 편의성 제고</span>를 동시에 실현하고 있습니다.
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
                      
                      {/* 두 열 구조 (조명제어시스템용) */}
                      {product.twoColumns ? (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* 첫 번째 열 */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                {product.column1.title}
                              </h4>
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                                {product.column1.subtitle}
                              </p>
                              <div className="space-y-1">
                                {product.column1.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold mt-0.5">✓</span>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {/* 두 번째 열 */}
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                {product.column2.title}
                              </h4>
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                                {product.column2.subtitle}
                              </p>
                              <div className="space-y-1">
                                {product.column2.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold mt-0.5">✓</span>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* 기존 단일 열 구조 */
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                            {currentLanguage === 'en' ? '▪ Key Features:' : '▪ 주요 기능:'}
                          </h4>
                          <div className="space-y-2">
                            {product.features && product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                                <span className="text-purple-600 dark:text-purple-400 font-bold mt-0.5">✓</span>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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

      {/* 프로젝트 프로세스 */}
      <ProjectProcessSection />

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

          <div className="space-y-4">
            <AnimatePresence mode="sync">
              {(showAllAchievements ? achievements : achievements.slice(0, 5)).map((achievement, index) => (
                <motion.div
                  key={`achievement-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15, delay: index > 4 ? (index - 5) * 0.03 : 0 }}
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
            </AnimatePresence>
          </div>

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
                <a href="tel:02-553-3631" className="text-primary-600 dark:text-primary-400 hover:underline">
                  02-553-3631
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:support@junghocorp.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                  support@junghocorp.com
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
