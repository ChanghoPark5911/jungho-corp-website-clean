import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';
import { useTheme } from '../../../contexts/ThemeContext';

const ClarusDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  const { isDarkMode } = useTheme();
  const [technicalDocuments, setTechnicalDocuments] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [showAllAchievements, setShowAllAchievements] = React.useState(false);
  const [competencies, setCompetencies] = React.useState([]);

  // 현재 경로가 Hybrid인지 확인하여 뒤로가기 경로 설정
  const isHybrid = location.pathname.startsWith('/hybrid');
  const backPath = isHybrid ? '/hybrid' : '/';

  // 핵심 역량 데이터 로드
  React.useEffect(() => {
    const loadCompetencies = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`/data/clarus-competencies.json?v=${timestamp}`, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.competencies && Array.isArray(jsonData.competencies)) {
            setCompetencies(jsonData.competencies);
            console.log('✅ 핵심 역량 데이터 로드:', jsonData.competencies.length, '개');
          }
        }
      } catch (error) {
        console.error('핵심 역량 데이터 로드 실패:', error);
      }
    };

    loadCompetencies();
  }, []);

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

  // 애니메이션 variants (속도 최적화)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
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
      name: currentLanguage === 'en' ? 'Lighting Control System' : '조명제어시스템',
      description: currentLanguage === 'en'
        ? 'IoT-based integrated lighting control for buildings and facilities'
        : 'IoT 기반 건물 및 시설물 통합 조명 제어',
      features: currentLanguage === 'en' 
        ? ['Remote Control', 'Energy Saving', 'Schedule Management', 'Real-time Monitoring']
        : ['원격 제어', '에너지 절감', '스케줄 관리', '실시간 모니터링'],
      imagePath: '/images/clarus/lighting-control-diagram.png'
    },
    {
      name: currentLanguage === 'en' ? 'Power Monitoring System' : '전력감시시스템',
      description: currentLanguage === 'en'
        ? 'Real-time power consumption monitoring and analysis'
        : '실시간 전력 사용량 감시 및 분석',
      features: currentLanguage === 'en'
        ? ['Power Measurement', 'Data Analysis', 'Report Generation', 'Alert System']
        : ['전력 계측', '데이터 분석', '리포트 생성', '알람 시스템'],
      imagePath: '/images/clarus/power-monitoring-diagram.png'
    },
    {
      name: currentLanguage === 'en' ? 'Export Business' : '해외사업(수출)',
      description: currentLanguage === 'en'
        ? 'Building global export infrastructure for Clarus lighting control products'
        : 'Clarus 조명제어 제품의 해외수출 인프라 구축',
      features: currentLanguage === 'en'
        ? ['North America/Europe advanced markets, China/Taiwan', 'Southeast Asian emerging markets including Vietnam/Philippines']
        : ['북미/유럽 선진시장, 중국/대만', '베트남/필리핀 등 동남아 신흥시장'],
      imagePath: '/images/clarus/export-business-map.png'
    }
  ];

  // 핵심 기술
  const technologies = [
    {
      title: currentLanguage === 'en' ? 'IoT-based Smart Lighting Control' : 'IoT기반 스마트 조명제어',
      description: currentLanguage === 'en'
        ? 'Smart lighting management solution for efficient energy savings'
        : '효율적 에너지 절감을 위한 스마트 조명 관리 솔루션',
      icon: '🌐'
    },
    {
      title: currentLanguage === 'en' ? 'Power Monitoring and Control Solution' : '전력감시 및 제어 솔루션',
      description: currentLanguage === 'en'
        ? 'Stable monitoring and operation of distribution panels through power monitoring'
        : '전력 모니터링을 통한 안정적인 수배전반 감시운영',
      icon: '⚡'
    },
    {
      title: currentLanguage === 'en' ? 'Integrated Building Resource Management Solution' : '빌딩 자원관리 종합 솔루션',
      description: currentLanguage === 'en'
        ? 'Integrated building management platform providing comfortable and safe operating environment'
        : '쾌적하고 안전한 운영 환경을 제공하는 통합 빌딩 관리 플랫폼',
      icon: '🏆'
    },
    {
      title: currentLanguage === 'en' ? 'Electrical Safety Management Solution' : '전기안전관리 솔루션',
      description: currentLanguage === 'en'
        ? 'Safety IoT device technology that detects electrical hazards such as fire and electric shock in advance'
        : '화재·감전 등 전기 재해를 사전에 감지하는 안전IoT장치 기술',
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
                src="/images/logos/clarus-logo.png" 
                alt="클라루스 로고" 
                className="h-8 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  // 이미지 로드 실패 시 대체 아이콘 표시
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'inline-block';
                }}
              />
              <span className="text-4xl sm:text-6xl hidden">🔆</span>
              <div className="flex flex-col items-center -space-y-1 sm:-space-y-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                  {currentLanguage === 'en' ? 'CLARUS' : '클라루스'}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {currentLanguage === 'en' ? '클라루스' : 'CLARUS Co., Ltd.'}
                </p>
              </div>
            </motion.div>

            <motion.p 
              className="text-lg sm:text-2xl lg:text-3xl text-cyan-600 dark:text-cyan-400 font-semibold max-w-3xl mx-auto pt-8 sm:pt-12 px-4"
              variants={fadeInUp}
            >
              {currentLanguage === 'en'
                ? 'Creating customer value and future together with innovative technology and quality'
                : '혁신기술에 의한 고객가치 Creator'}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-10"
              variants={fadeInUp}
            >
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Established' : '설립'}
                </span>
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  {currentLanguage === 'en' ? '2009' : '2009년'}
                </div>
              </div>
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field 1' : '사업분야 1'}
                </span>
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  {currentLanguage === 'en' ? 'Lighting Control · IoT' : '조명제어 · IoT'}
                </div>
              </div>
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field 2' : '사업분야 2'}
                </span>
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
                  {currentLanguage === 'en' ? 'Power Control, Electrical Safety' : '전력제어, 전기안전'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 클라루스의 4대 핵심 역량 */}
      <section 
        className="py-20 bg-gradient-to-br from-white via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-gray-900 relative overflow-hidden"
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                {currentLanguage === 'en' ? '⭐ Core Competencies' : '⭐ 핵심 역량'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' 
                ? "CLARUS's 4 Core Competencies"
                : '클라루스의 4대 핵심 역량'}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLanguage === 'en'
                ? 'The only R&D center in the group, leading production, export, and online sales'
                : '그룹 내 유일한 R&D 센터 보유, 생산·수출·온라인 영업 주도'}
            </p>
          </div>

          {/* 4대 역량 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competencies.map((comp, index) => {
              const borderColorMap = {
                cyan: 'border-cyan-200 dark:border-cyan-800',
                blue: 'border-blue-200 dark:border-blue-800',
                emerald: 'border-emerald-200 dark:border-emerald-800',
                red: 'border-red-200 dark:border-red-800'
              };

              const bgGradientMap = {
                cyan: 'from-cyan-50 dark:from-cyan-950/20',
                blue: 'from-blue-50 dark:from-blue-950/20',
                emerald: 'from-emerald-50 dark:from-emerald-950/20',
                red: 'from-red-50 dark:from-red-950/20'
              };

              const iconGradientMap = {
                cyan: 'from-cyan-500 to-blue-500',
                blue: 'from-blue-500 to-indigo-500',
                emerald: 'from-emerald-500 to-teal-500',
                red: 'from-red-500 to-pink-500'
              };

              const textColorMap = {
                cyan: 'text-cyan-600 dark:text-cyan-400',
                blue: 'text-blue-600 dark:text-blue-400',
                emerald: 'text-emerald-600 dark:text-emerald-400',
                red: 'text-red-600 dark:text-red-400'
              };

              return (
                <div
                  key={comp.id}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 border-2 ${borderColorMap[comp.borderColor]} relative overflow-hidden`}
                >
                  {/* 배경 그라데이션 효과 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgGradientMap[comp.borderColor]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* 상단: 아이콘 + 제목 */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${iconGradientMap[comp.borderColor]} rounded-xl flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                        {comp.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {currentLanguage === 'en' ? comp.titleEn : comp.titleKo}
                        </h3>
                        <p className={`${textColorMap[comp.borderColor]} font-semibold text-sm`}>
                          {currentLanguage === 'en' ? comp.subtitleEn : comp.subtitleKo}
                        </p>
                      </div>
                    </div>

                    {/* 본문: 왼쪽 텍스트 + 오른쪽 이미지 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* 왼쪽: 설명 및 특징 (2/3) */}
                      <div className="lg:col-span-2">
                        <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-3">
                          {currentLanguage === 'en' ? comp.descriptionEn : comp.descriptionKo}
                        </p>
                        
                        {/* 주요 특징 */}
                        <div className="space-y-2">
                          {comp.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className={`font-semibold ${textColorMap[comp.borderColor]}`}>✓</span>
                              <span>{currentLanguage === 'en' ? feature.en : feature.ko}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 오른쪽: 이미지 공간 (1/3) */}
                      <div className="lg:col-span-1">
                        <div 
                          className="bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden h-32 lg:h-full min-h-[180px] flex items-center justify-center cursor-pointer group/img relative border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                          onClick={() => {
                            if (comp.imagePath) {
                              setSelectedImage({ src: comp.imagePath, alt: comp.titleKo });
                            }
                          }}
                        >
                          {comp.imagePath ? (
                            <>
                              <img 
                                src={comp.imagePath}
                                alt={currentLanguage === 'en' ? comp.titleEn : comp.titleKo}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                              {/* 이미지 로드 실패 시 대체 아이콘 */}
                              <div className="hidden flex-col items-center justify-center text-center p-4">
                                <span className="text-4xl mb-2">{comp.icon}</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                                  {currentLanguage === 'en' ? 'Image' : '이미지'}<br />
                                  {currentLanguage === 'en' ? 'Coming Soon' : '준비중'}
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center p-4">
                              <span className="text-4xl mb-2">{comp.icon}</span>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                                {currentLanguage === 'en' ? 'Image' : '이미지'}<br />
                                {currentLanguage === 'en' ? 'Coming Soon' : '준비중'}
                              </p>
                            </div>
                          )}
                          
                          {/* Hover 효과: 확대 아이콘 */}
                          {comp.imagePath && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 pointer-events-none">
                              <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 하단 강조 문구 */}
          <div className="mt-16 text-center">
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl shadow-xl">
              <p className="text-white text-lg sm:text-xl font-bold">
                {currentLanguage === 'en'
                  ? '🏆 Leading the Group\'s Technology Innovation and Global Business'
                  : '🏆 그룹의 기술혁신과 글로벌 비즈니스를 선도합니다'}
              </p>
            </div>
          </div>
        </div>
      </section>

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
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">CLARUS</span> provides 
                    lighting and power control solutions optimized for field environments based on a wide product lineup.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We have continuously developed core technologies for smart building management and energy savings, including 
                    <span className="font-semibold"> E/F2-BUS-based integrated control technology</span>, IoT and wired/wireless communication technologies, 
                    energy management software, and electrical safety IoT devices.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    We have maximized scalability and maintainability by developing our own system software, and supply products that meet rapidly changing global standards.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    CLARUS will continue to <span className="font-semibold text-cyan-600 dark:text-cyan-400">create customer value and future together with innovative technology and quality.</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">클라루스</span>는 
                    폭넓은 제품 라인업을 바탕으로 현장 환경에 최적화된 조명·전력 제어 솔루션을 제공합니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold">E/F2-BUS 기반의 통합제어 기술</span>과 IoT 및 유·무선 통신 기술, 
                    에너지 관리 소프트웨어, 전기안전 IoT 장치 등 스마트 빌딩 관리와 에너지 절감을 위한 핵심 기술을 지속적으로 발전시켜 왔습니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    자체 시스템 소프트웨어를 개발하여 확장성과 유지관리성을 극대화하였으며, 급변하는 글로벌 기준에 부합하는 제품을 공급하고 있습니다.
                  </p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    앞으로도 클라루스는 <span className="font-semibold text-cyan-600 dark:text-cyan-400">혁신기술에 의한 고객가치 Creator로서 함께 성장해 가겠습니다.</span>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* MAGIC CLARUS 브랜드 소개 */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 브랜드 헤더 */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <div className="inline-block mb-6 px-6 py-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <span className="text-sm font-bold text-red-600 dark:text-red-400">
                {currentLanguage === 'en' ? '🛍️ Brand Product' : '🛍️ 브랜드 제품'}
              </span>
            </div>
            
            {/* MAGIC CLARUS 로고 */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/images/logos/magic-clarus-logo.png" 
                alt="MAGIC CLARUS 로고" 
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                {currentLanguage === 'en' ? 'MAGIC CLARUS' : '브랜드 MAGIC CLARUS'}
              </h2>
            </div>

            <p className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
              {currentLanguage === 'en' 
                ? 'Easy Install & Easy Control'
                : '쉽게 설치하고, 앱으로 직관적으로 제어하세요'}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLanguage === 'en'
                ? 'Experience a more convenient and efficient smart lighting solution'
                : '가정의 조명·전력을 더 똑똑하고 편하게 바꿉니다'}
            </p>
          </motion.div>

          {/* 특징 카드 */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800"
            >
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? 'Easy Installation' : '간편설치'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Quick setup without complicated wiring or configuration'
                  : '복잡한 배선/설정 없이 빠르게 셋업'}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800"
            >
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? 'Easy Control' : '쉬운 제어'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Intuitive with one switch, convenient with app'
                  : '스위치 하나로 직관적, 앱으로 편리하게'}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800"
            >
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? 'Expandability' : '확장성'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Gradual upgrade from one room to entire home'
                  : '방 하나부터 집 전체까지 단계적으로 업그레이드'}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-200 dark:border-red-800"
            >
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? 'Reliable Quality' : '안심 품질'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? '40 years of CLARUS tradition for everyday use'
                  : '일상에서 매일 쓰는 제품이니까, 40년 전통의 클라루스로'}
              </p>
            </motion.div>
          </motion.div>

          {/* 타겟 고객 */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-12"
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'en' ? '🎯 Perfect For' : '🎯 이런 분들께 추천합니다'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl mb-3">🌟</div>
                <p className="text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en'
                    ? 'Starting your first smart home'
                    : '첫 스마트홈을 시작하려는 분'}
                </p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-3">🎁</div>
                <p className="text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en'
                    ? 'Want to gift convenient lighting/power control to parents'
                    : '부모님 댁에 편한 조명/전원 제어를 선물하고 싶은 분'}
                </p>
              </div>
              <div className="p-4">
                <div className="text-3xl mb-3">💰</div>
                <p className="text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en'
                    ? 'Want to save on electricity bills and time'
                    : '집안 전기요금과 시간을 아끼고 싶은 분'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA 버튼 */}
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <motion.a
              href="https://www.magicclarus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🛒</span>
              <span>
                {currentLanguage === 'en' 
                  ? 'Visit MAGIC CLARUS Online Store'
                  : 'MAGIC CLARUS 온라인 쇼핑몰 방문하기'}
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en'
                ? 'Check product details, purchase, and technical support'
                : '제품 상세정보, 구매 및 기술지원 안내'}
            </p>
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
            className="space-y-6"
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white m-0 p-0" style={{ lineHeight: '1' }}>
                    {product.name}
                  </h3>
                </div>

                {/* 본문: 좌측 텍스트 + 우측 이미지 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* 좌측: 설명 및 주요 기능 (2/3) */}
                  <div className="lg:col-span-2 p-8">
                    <p className="text-gray-700 dark:text-gray-200 text-base mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* 주요 기능 */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        {currentLanguage === 'en' ? '▪ Key Features:' : index === 2 ? '▪ 대상:' : '▪ 주요 기능:'}
                      </h4>
                      <div className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                            <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                              {index === 2 ? '-' : '✓'}
                            </span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 우측: 다이어그램/이미지 공간 (1/3) */}
                  <div className="lg:col-span-1 bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center min-h-[250px]">
                    {product.imagePath ? (
                      <div 
                        className="w-full h-full flex items-center justify-center cursor-pointer group relative"
                        onClick={() => setSelectedImage({ src: product.imagePath, alt: product.name })}
                      >
                        <img 
                          src={product.imagePath} 
                          alt={`${product.name} diagram`}
                          className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
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
                <p className="text-gray-700 dark:text-white text-lg tech-description">
                  {tech.description}
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
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-white text-lg flex-1 tech-description">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Phone:' : '전화:'}
                </span>
                <a href="tel:02-515-5018" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  02-515-5018
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:clarus@junghocorp.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  clarus@junghocorp.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">🌐</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Website:' : '웹사이트:'}
                </span>
                <a href="https://www.magicclarus.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  www.magicclarus.com
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

export default ClarusDetailPage;

