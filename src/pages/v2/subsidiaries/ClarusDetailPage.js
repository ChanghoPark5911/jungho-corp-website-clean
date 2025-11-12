import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';

const ClarusDetailPage = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();
  const [technicalDocuments, setTechnicalDocuments] = React.useState([]);

  // JSON 파일에서 PDF 자료 로드 (우선), localStorage는 백업 (클라루스 관련만)
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
            // 클라루스 관련 자료만 필터링
            const clarusDocs = jsonData.documents.filter(
              doc => doc.subsidiary === 'clarus'
            );
            setTechnicalDocuments(clarusDocs);
            console.log('✅ JSON 파일에서 클라루스 자료 로드:', clarusDocs.length, '개');
            return;
          }
        }
        
        // 2. JSON 파일 실패 시 localStorage에서 로드 (백업)
        const savedMediaData = localStorage.getItem('v2_media_data');
        if (savedMediaData) {
          const parsedData = JSON.parse(savedMediaData);
          if (parsedData.technicalDocuments) {
            const clarusDocs = parsedData.technicalDocuments.filter(
              doc => doc.subsidiary === 'clarus'
            );
            setTechnicalDocuments(clarusDocs);
            console.log('✅ localStorage에서 클라루스 자료 로드:', clarusDocs.length, '개');
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // 주요 제품/서비스
  const products = [
    {
      name: 'Programmable Controller',
      description: currentLanguage === 'en' 
        ? 'IoT-based intelligent lighting control controller'
        : 'IoT 기반 지능형 조명 제어 컨트롤러',
      icon: '🎛️'
    },
    {
      name: 'Energy Monitoring Unit',
      description: currentLanguage === 'en'
        ? 'Real-time energy monitoring and management system'
        : '실시간 에너지 모니터링 및 관리 시스템',
      icon: '📊'
    },
    {
      name: 'Program Switch',
      description: currentLanguage === 'en'
        ? 'User-customizable programmable switch'
        : '사용자 맞춤형 프로그램 가능 스위치',
      icon: '🔘'
    },
    {
      name: 'Wireless Control System',
      description: currentLanguage === 'en'
        ? 'Wireless-based lighting control solution'
        : '무선 기반 조명 제어 솔루션',
      icon: '📡'
    },
    {
      name: 'MAGIC CLARUS Software',
      description: currentLanguage === 'en'
        ? 'Integrated lighting management software'
        : '통합 조명 관리 소프트웨어',
      icon: '💻'
    },
    {
      name: 'Sensor & Wireless Unit',
      description: currentLanguage === 'en'
        ? 'Smart sensors and wireless communication modules'
        : '스마트 센서 및 무선 통신 모듈',
      icon: '📶'
    }
  ];

  // 핵심 기술
  const technologies = [
    {
      title: currentLanguage === 'en' ? 'IoT-based Smart Lighting' : 'IoT 기반 스마트 조명',
      description: currentLanguage === 'en'
        ? 'Intelligent lighting control system utilizing Internet of Things technology'
        : '사물인터넷 기술을 활용한 지능형 조명 제어 시스템',
      icon: '🌐'
    },
    {
      title: currentLanguage === 'en' ? 'Energy Saving Solution' : '에너지 절감 솔루션',
      description: currentLanguage === 'en'
        ? 'Optimization algorithm enabling up to 40% energy savings'
        : '최대 40% 에너지 절감 가능한 최적화 알고리즘',
      icon: '⚡'
    },
    {
      title: currentLanguage === 'en' ? '40 Years of Expertise' : '40년 노하우',
      description: currentLanguage === 'en'
        ? 'Lighting control technology and experience accumulated since 1982'
        : '1982년부터 축적된 조명 제어 기술과 경험',
      icon: '🏆'
    },
    {
      title: currentLanguage === 'en' ? 'Integrated Management System' : '통합 관리 시스템',
      description: currentLanguage === 'en'
        ? 'Cloud-based remote monitoring and control'
        : '클라우드 기반 원격 모니터링 및 제어',
      icon: '☁️'
    }
  ];

  // 주요 실적 (연도별)
  const achievements = currentLanguage === 'en' ? [
    '2025: Launched Energy Manager 5 (EM5) lighting/power software, 6 new D-Type Program Switch models, Google Android/Apple iOS EF2 Setting App',
    '2024: Upgraded Single Pole Relay UL/cUL 20A 30A approval performance, developed and launched Double Pole Relay driving Kit',
    '2023: Established Magic CLARUS online e-commerce platform and started sales (Naver, Coupang), launched upgraded IPC optimized for Zero Energy Buildings',
    '2022: Launched Energy Harvesting wireless Stand Alone (Kinetic) switch products, obtained KC electrical appliance safety certification for electronic switch wireless relay module',
    '2020: Developed Ladder-Less remote control system platform, launched remote setting products for motion sensors/light sensors',
    '2018: Launched web-based distributed control devices (IPC, SPC)',
    '2014: Obtained K-Mark performance certification and Q-Mark quality certification (Building Automation Control System)',
    '2013: Obtained GS (Good Software) certification (13-0033), FCC (Part 15 Class A, B) certification for all lighting control system products',
    '2012: Developed Energy Manager 4 (EM4) (Windows7 64bit Version)',
    '2010-2011: Developed power control system software, parking control solution, access control solution ACS',
    '2009: Changed company name to CLARUS Korea Co., Ltd., established corporate research institute, obtained UL/CUL certification for 20A HID RELAY',
    '2008: Developed 20A Relay and relay control Terminal Unit',
    '2007: Developed CLARUS DALI EASYCON lighting control system (DLU, DSU, DBU) using DALI ballast',
    '2006: Developed Lighting Manager II ARS system software dedicated to lighting control',
    '2005: Developed Lighting Manager II software (lighting control via Intranet, Ethernet)',
    '2004: Developed Lighting Manager software (Windows 2000, XP Version)',
    '2003: Developed E/F2-BUS lighting control system, devices, and programs, new SNU/SIU and E/F2-BUS configuration program',
    '2002: Established Jungho Light Tech Co., Ltd.'
  ] : [
    '2025년: Energy Manager 5 (EM5) 조명/전력 소프트웨어 신제품 출시, D-Type Program Switch 6종 신제품 출시, Google Android/Apple iOS EF2 Setting App 출시',
    '2024년: Single Pole Relay UL/cUL 20A 30A 승인 성능 업그레이드, Double Pole Relay 구동 Kit 개발 및 출시',
    '2023년: Magic CLARUS 온라인 E커머스 플랫폼 구축 및 판매개시 (Naver, Coupang), Zero Energy Building 최적화 IPC 업그레이드 출시',
    '2022년: Energy Harvesting 무배선 Stand Alone (Kinetic) 스위치 제품 출시, 전자식 스위치 무선수신 릴레이 모듈 KC전기용품안전인증 획득',
    '2020년: Ladder-Less 원격제어 시스템 플랫폼 개발, 인체감지센서/조도센서 원격 설정 제품 출시',
    '2018년: 웹 기반 분산 제어장치 (IPC, SPC) 출시',
    '2014년: 성능인증 K마크/품질인증 Q마크 인증 획득 (건물자동제어시스템)',
    '2013년: GS(Good Software) 인증 획득 (13-0033), 조명제어 시스템 전 품목 FCC(Part 15 Class A, B) 인증 획득',
    '2012년: Energy Manager 4 (EM4) 개발 (Windows7 64bit Version)',
    '2010년~2011년: 전력제어시스템 Software, 주차관제솔루션, 출입관제솔루션 ACS 개발',
    '2009년: ㈜클라루스코리아로 상호 변경, 기업부설 연구소 설립, 20A HID RELAY UL/CUL 인증 획득',
    '2008년: 20A Relay 개발, Relay 제어용 Terminal Unit 개발',
    '2007년: DALI 안정기를 이용한 CLARUS DALI EASYCON 조명제어 시스템 (DLU, DSU, DBU) 개발',
    '2006년: 조명제어 전용 Software Lighting Manager II ARS 시스템 소프트웨어 개발',
    '2005년: Lighting Manager II 소프트웨어 개발 (Intranet, Ethernet을 통한 조명제어)',
    '2004년: Lighting Manager 소프트웨어 개발 (Windows 2000, XP Version)',
    '2003년: E/F2-BUS 조명제어 시스템 및 디바이스, 프로그램 개발, 신형 SNU/SIU와 E/F2-BUS 설정용 프로그램 개발',
    '2002년: ㈜정호라이트테크 설립'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 overflow-hidden"
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
          onClick={() => navigate('/subsidiaries')}
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
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
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
              <img 
                src="/images/logos/clarus-logo.png" 
                alt="클라루스 로고" 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  // 이미지 로드 실패 시 대체 아이콘 표시
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'inline-block';
                }}
              />
              <span className="text-6xl hidden">🔆</span>
              <div className="flex flex-col items-center -space-y-2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                  {currentLanguage === 'en' ? 'CLARUS' : '클라루스'}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? '클라루스' : 'CLARUS Co., Ltd.'}
                </p>
              </div>
            </motion.div>

            <motion.p 
              className="text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-400 font-semibold max-w-3xl mx-auto pt-12"
              variants={fadeInUp}
            >
              {currentLanguage === 'en'
                ? 'Creating customer value and future together with innovative technology and quality'
                : '혁신적인 기술과 품질로 고객의 가치와 미래를 함께 만들어갑니다'}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 pt-10"
              variants={fadeInUp}
            >
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Established' : '설립'}
                </span>
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  {currentLanguage === 'en' ? '2009' : '2009년'}
                </div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field' : '사업 분야'}
                </span>
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  {currentLanguage === 'en' ? 'Lighting Control · IoT' : '조명 제어 · IoT'}
                </div>
              </div>
              <motion.a
                href="https://www.magicclarus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌐 {currentLanguage === 'en' ? 'Visit Website' : '웹사이트 방문'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
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
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentLanguage === 'en' ? (
                <>
                  <p>
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">CLARUS</span> provides 
                    lighting and power control solutions optimized for field environments based on a wide product lineup.
                  </p>
                  <p>
                    We have continuously developed core technologies for smart building management and energy savings, including 
                    <span className="font-semibold"> E/F2-BUS-based integrated control technology</span>, IoT and wired/wireless communication technologies, 
                    energy management software, and electrical safety IoT devices.
                  </p>
                  <p>
                    We have maximized scalability and maintainability by developing our own system software, and supply products that meet rapidly changing global standards.
                  </p>
                  <p>
                    CLARUS will continue to <span className="font-semibold text-cyan-600 dark:text-cyan-400">create customer value and future together with innovative technology and quality.</span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">클라루스</span>는 
                    폭넓은 제품 라인업을 바탕으로 현장 환경에 최적화된 조명·전력 제어 솔루션을 제공합니다.
                  </p>
                  <p>
                    <span className="font-semibold">E/F2-BUS 기반의 통합제어 기술</span>과 IoT 및 유·무선 통신 기술, 
                    에너지 관리 소프트웨어, 전기안전 IoT 장치 등 스마트 빌딩 관리와 에너지 절감을 위한 핵심 기술을 지속적으로 발전시켜 왔습니다.
                  </p>
                  <p>
                    자체 시스템 소프트웨어를 개발하여 확장성과 유지관리성을 극대화하였으며, 급변하는 글로벌 기준에 부합하는 제품을 공급하고 있습니다.
                  </p>
                  <p>
                    앞으로도 클라루스는 <span className="font-semibold text-cyan-600 dark:text-cyan-400">혁신적인 기술과 품질로 고객의 가치와 미래를 함께 만들어 가겠습니다.</span>
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
                ? 'Providing various lighting control solutions'
                : '다양한 조명 제어 솔루션을 제공합니다'}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 핵심 기술 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Core Technologies' : '핵심 기술'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en'
                ? "CLARUS's differentiated technological capabilities"
                : '클라루스만의 차별화된 기술력'}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-cyan-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 주요 실적 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Major Achievements' : '주요 실적'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Continuous innovation and growth' : '지속적인 혁신과 성장'}
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg flex-1">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 mb-4">
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
                    className="block w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold text-center transition-all duration-300"
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
        className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
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
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Phone:' : '전화:'}
                </span>
                <a href="tel:02-515-5018" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  02-515-5018
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:clarus@junghocorp.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  clarus@junghocorp.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">🌐</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Website:' : '웹사이트:'}
                </span>
                <a href="https://www.magicclarus.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  www.magicclarus.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📍</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Headquarters:' : '본사:'}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
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

export default ClarusDetailPage;

