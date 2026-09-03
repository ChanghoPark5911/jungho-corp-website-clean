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
      name: currentLanguage === 'en' ? 'Lighting Control Business | Lighting Control System' : '조명제어 사업 | Lighting Control System',
      description: currentLanguage === 'en'
        ? 'Expanding domestic and international business based on self-developed lighting control system'
        : '자체 개발한 조명제어시스템을 기반으로 국내외 사업 전개',
      features: currentLanguage === 'en' 
        ? [
            'Simple and intuitive UI (User Interface)',
            'Real-time on/off/level control and monitoring through GUI-based monitoring screen',
            'Daily, weekly, monthly, holiday, and specific date schedule control',
            'Power consumption data per individual circuit',
            'Scenario function',
            'Auto-save operation log, print, view, report, and alarm functions',
            'System expansion function',
            'Security function'
          ]
        : [
            '간편하고 직관적인 UI (User Interface)',
            'GUI 편집을 통해 완성된 모니터링 화면으로 실시간 점·소등·레벨 제어 및 감시',
            '일간, 주간, 월간, 휴일, 특정일별 스케줄 설정 제어 기능',
            '개별회로 별 전력사용량 제공',
            '시나리오 기능',
            '운행 일지 자동 저장, 인쇄 및 열람, 보고서, 알람 기능',
            '시스템 확장 기능',
            '보안 기능'
          ],
      imagePath: '/images/clarus/lighting-control-system-diagram.png'
    },
    {
      name: currentLanguage === 'en' ? 'Power Monitoring Business | Power Monitoring System' : '전력감시 사업 | Power Monitoring System',
      description: currentLanguage === 'en'
        ? 'Development and supply of power monitoring solutions for efficient energy management'
        : '효율적인 에너지 관리를 위한 전력감시 솔루션 개발 및 공급',
      features: currentLanguage === 'en'
        ? [
            'Maximum Demand Power Control (Demand Control)',
            'Power On/Off Sequence Control',
            'Power Monitoring and Alarm Display',
            'Report Function',
            'Communication Driver and External System Data Provision'
          ]
        : [
            '최대 수요 전력 제어 (Demand Control)',
            '정·복전 제어',
            '전력감시 및 경보표시',
            '보고서 기능',
            '통신 드라이버 및 외부 시스템 데이터 제공'
          ],
      imagePath: '/images/clarus/power-monitoring-system-diagram.png'
    },
    {
      name: currentLanguage === 'en' ? 'Software Business | Energy Manager System' : 'Software 사업 | Energy Manager System',
      description: currentLanguage === 'en'
        ? 'Energy management optimization with lighting/power facility monitoring, Demand Control, power restoration sequence control functions'
        : '조명/전력설비 감시, Demand Control, 정·복전 시퀀스제어 기능 등 에너지 관리 최적화 시현',
      features: currentLanguage === 'en'
        ? [
            '1991: Sirius31 - First generation control software',
            '1998: Light View - Lighting monitoring system',
            '2003: Light Manager - Integrated lighting control',
            '2005: Light Manager II - Advanced GUI-based system',
            '2013: Energy Manager 4 - Power & lighting integrated management',
            '2018: IPC Web Browser - Integrated management solution via internet',
            '2025: Energy Manager 5 - Latest smart building solution'
          ]
        : [
            '1991년: Sirius31 - 1세대 제어 소프트웨어',
            '1998년: Light View - 조명 모니터링 시스템',
            '2003년: Light Manager - 통합 조명 제어',
            '2005년: Light Manager II - 고급 GUI 기반 시스템',
            '2013년: Energy Manager 4 - 전력·조명 통합 관리',
            '2018년: IPC Web Browser - 인터넷을 통한 통합관리 솔루션',
            '2025년: Energy Manager 5 - 최신 스마트빌딩 솔루션'
          ],
      futureDirections: currentLanguage === 'en'
        ? [
            'Continuous software upgrade and technical support',
            'Customized solutions for customer requirements'
          ]
        : [
            '지속적인 소프트웨어 업그레이드 및 기술지원',
            '고객 요구사항에 맞춘 커스터마이징 솔루션'
          ],
      imagePath: '/images/clarus/energy-manager-system-timeline.png'
    }
  ];

  // 주요 실적 (연도별) - 일루텍 형식
  const achievements = [
    {
      year: '2025',
      items: currentLanguage === 'en'
        ? [
            'Launched Energy Manager 5 (EM5) lighting/power software',
            'Launched 6 new D-Type Program Switch models',
            'Released Google Android/Apple iOS EF2 Setting App'
          ]
        : [
            'Energy Manager 5 (EM5) 조명/전력 소프트웨어 신제품 출시',
            'D-Type Program Switch 6종 신제품 출시',
            'Google Android/Apple iOS EF2 Setting App 출시'
          ]
    },
    {
      year: '2024',
      items: currentLanguage === 'en'
        ? [
            'Upgraded Single Pole Relay UL/cUL 20A 30A approval performance',
            'Developed and launched Double Pole Relay driving Kit'
          ]
        : [
            'Single Pole Relay UL/cUL 20A 30A 승인 성능 업그레이드',
            'Double Pole Relay 구동 Kit 개발 및 출시'
          ]
    },
    {
      year: '2023',
      items: currentLanguage === 'en'
        ? [
            'Established Magic CLARUS online e-commerce platform and started sales (Naver, Coupang)',
            'Launched upgraded IPC optimized for Zero Energy Buildings'
          ]
        : [
            'Magic CLARUS 온라인 E커머스 플랫폼 구축 및 판매개시 (Naver, Coupang)',
            'Zero Energy Building 최적화 IPC 업그레이드 출시'
          ]
    },
    {
      year: '2022',
      items: currentLanguage === 'en'
        ? [
            'Launched Energy Harvesting wireless Stand Alone (Kinetic) switch products',
            'Obtained KC electrical appliance safety certification for electronic switch wireless relay module'
          ]
        : [
            'Energy Harvesting 무배선 Stand Alone (Kinetic) 스위치 제품 출시',
            '전자식 스위치 무선수신 릴레이 모듈 KC전기용품안전인증 획득'
          ]
    },
    {
      year: '2020',
      items: currentLanguage === 'en'
        ? [
            'Developed Ladder-Less remote control system platform',
            'Launched remote setting products for motion sensors/light sensors'
          ]
        : [
            'Ladder-Less 원격제어 시스템 플랫폼 개발',
            '인체감지센서/조도센서 원격 설정 제품 출시'
          ]
    },
    {
      year: '2018',
      items: currentLanguage === 'en'
        ? ['Launched web-based distributed control devices (IPC, SPC)']
        : ['웹 기반 분산 제어장치 (IPC, SPC) 출시']
    },
    {
      year: '2014',
      items: currentLanguage === 'en'
        ? ['Obtained K-Mark performance certification and Q-Mark quality certification (Building Automation Control System)']
        : ['성능인증 K마크/품질인증 Q마크 인증 획득 (건물자동제어시스템)']
    },
    {
      year: '2013',
      items: currentLanguage === 'en'
        ? [
            'Obtained GS (Good Software) certification (13-0033)',
            'FCC (Part 15 Class A, B) certification for all lighting control system products'
          ]
        : [
            'GS(Good Software) 인증 획득 (13-0033)',
            '조명제어 시스템 전 품목 FCC(Part 15 Class A, B) 인증 획득'
          ]
    },
    {
      year: '2012',
      items: currentLanguage === 'en'
        ? ['Developed Energy Manager 4 (EM4) (Windows7 64bit Version)']
        : ['Energy Manager 4 (EM4) 개발 (Windows7 64bit Version)']
    },
    {
      year: '2010-2011',
      items: currentLanguage === 'en'
        ? [
            'Developed power control system software',
            'Developed parking control solution',
            'Developed access control solution ACS'
          ]
        : [
            '전력제어시스템 Software 개발',
            '주차관제솔루션 개발',
            '출입관제솔루션 ACS 개발'
          ]
    },
    {
      year: '2009',
      items: currentLanguage === 'en'
        ? [
            'Changed company name to CLARUS Korea Co., Ltd.',
            'Established corporate research institute',
            'Obtained UL/CUL certification for 20A HID RELAY'
          ]
        : [
            '㈜클라루스코리아로 상호 변경',
            '기업부설 연구소 설립',
            '20A HID RELAY UL/CUL 인증 획득'
          ]
    },
    {
      year: '2008',
      items: currentLanguage === 'en'
        ? [
            'Developed 20A Relay',
            'Developed relay control Terminal Unit'
          ]
        : [
            '20A Relay 개발',
            'Relay 제어용 Terminal Unit 개발'
          ]
    },
    {
      year: '2007',
      items: currentLanguage === 'en'
        ? ['Developed CLARUS DALI EASYCON lighting control system (DLU, DSU, DBU) using DALI ballast']
        : ['DALI 안정기를 이용한 CLARUS DALI EASYCON 조명제어 시스템 (DLU, DSU, DBU) 개발']
    },
    {
      year: '2006',
      items: currentLanguage === 'en'
        ? ['Developed Lighting Manager II ARS system software dedicated to lighting control']
        : ['조명제어 전용 Software Lighting Manager II ARS 시스템 소프트웨어 개발']
    },
    {
      year: '2005',
      items: currentLanguage === 'en'
        ? ['Developed Lighting Manager II software (lighting control via Intranet, Ethernet)']
        : ['Lighting Manager II 소프트웨어 개발 (Intranet, Ethernet을 통한 조명제어)']
    },
    {
      year: '2004',
      items: currentLanguage === 'en'
        ? ['Developed Lighting Manager software (Windows 2000, XP Version)']
        : ['Lighting Manager 소프트웨어 개발 (Windows 2000, XP Version)']
    },
    {
      year: '2003',
      items: currentLanguage === 'en'
        ? [
            'Developed E/F2-BUS lighting control system, devices, and programs',
            'Developed new SNU/SIU and E/F2-BUS configuration program'
          ]
        : [
            'E/F2-BUS 조명제어 시스템 및 디바이스, 프로그램 개발',
            '신형 SNU/SIU와 E/F2-BUS 설정용 프로그램 개발'
          ]
    },
    {
      year: '2002',
      items: currentLanguage === 'en'
        ? ['Established Jungho Light Tech Co., Ltd.']
        : ['㈜정호라이트테크 설립']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-red-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-red-950/20 dark:to-gray-900 overflow-hidden"
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
                src="/assets/logos/logo-clarus.png" 
                alt="클라루스 로고" 
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
              />
              <div className="flex flex-col items-center -space-y-1 sm:-space-y-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                  {currentLanguage === 'en' ? 'CLARUS' : '클라루스'}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {currentLanguage === 'en' ? '클라루스' : 'CLARUS INC.'}
                </p>
              </div>
            </motion.div>

            <motion.p 
              className="text-lg sm:text-2xl lg:text-3xl text-[#71000b] font-semibold max-w-3xl mx-auto pt-8 sm:pt-12 px-4"
              variants={fadeInUp}
            >
              {currentLanguage === 'en'
                ? 'Leading Technology Innovation and Global Business'
                : '기술혁신과 글로벌 비즈니스를 선도합니다.'}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-10"
              variants={fadeInUp}
            >
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Established' : '설립'}
                </span>
                <div className="text-xl font-bold text-[#71000b]">
                  {currentLanguage === 'en' ? '2002' : '2002년'}
                </div>
              </div>
              <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field' : '사업분야'}
                </span>
                <div className="text-lg font-bold text-[#71000b]">
                  BEMS / IoT
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
                    <span className="font-semibold text-[#71000b]">CLARUS</span> provides 
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
                    CLARUS will continue to <span className="font-semibold text-[#71000b]">create customer value and future together with innovative technology and quality.</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>
                    <span className="font-semibold text-[#71000b]">클라루스</span>는 
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
                    앞으로도 클라루스는 <span className="font-semibold text-[#71000b]">혁신기술에 의한 고객가치 Creator로서 함께 성장해 가겠습니다.</span>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 클라루스의 4대 핵심 역량 */}
      <section 
        className="py-20 bg-gradient-to-br from-white via-red-50 to-rose-50 dark:from-gray-900 dark:via-red-950/30 dark:to-gray-900 relative overflow-hidden"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              End-to-End Supply Chain
            </h2>
          </div>

          {/* 4대 역량 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {competencies.map((comp, index) => {
              const borderColorMap = {
                cyan: 'border-red-200 dark:border-red-800',
                blue: 'border-red-200 dark:border-red-800',
                emerald: 'border-red-200 dark:border-red-800',
                red: 'border-red-200 dark:border-red-800'
              };

              const bgGradientMap = {
                cyan: 'from-red-50 dark:from-red-950/20',
                blue: 'from-red-50 dark:from-red-950/20',
                emerald: 'from-red-50 dark:from-red-950/20',
                red: 'from-red-50 dark:from-red-950/20'
              };

              const iconGradientMap = {
                cyan: 'from-[#71000b] to-[#8a0010]',
                blue: 'from-[#71000b] to-[#8a0010]',
                emerald: 'from-[#71000b] to-[#8a0010]',
                red: 'from-[#71000b] to-[#8a0010]'
              };

              const textColorMap = {
                cyan: 'text-[#71000b]',
                blue: 'text-[#71000b]',
                emerald: 'text-[#71000b]',
                red: 'text-[#71000b]'
              };

              return (
                <div
                  key={comp.id}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 border-2 ${borderColorMap[comp.borderColor]} relative overflow-hidden`}
                >
                  {/* 배경 그라데이션 효과 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgGradientMap[comp.borderColor]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* 상단: 제목 */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {currentLanguage === 'en' ? comp.titleEn : comp.titleKo}
                      </h3>
                      <p className={`${textColorMap[comp.borderColor]} font-semibold text-sm`}>
                        {currentLanguage === 'en' ? comp.subtitleEn : comp.subtitleKo}
                      </p>
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
                              {feature.link ? (
                                <a 
                                  href={feature.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className={`${textColorMap[comp.borderColor]} hover:underline font-medium transition-colors`}
                                >
                                  {currentLanguage === 'en' ? feature.en : feature.ko}
                                </a>
                              ) : (
                                <span>{currentLanguage === 'en' ? feature.en : feature.ko}</span>
                              )}
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

        </div>
      </section>

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
              {currentLanguage === 'en' ? 'Main Business & Services' : '주요 사업 및 서비스'}
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
                    
                    {/* 주요 기능 또는 타임라인 */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        {currentLanguage === 'en' ? '▪ Key Features' : index === 2 ? '▪ 소프트웨어 발전 역사' : '▪ 주요 기능'}
                      </h4>
                      
                      {/* 세 번째 항목(Software 사업)은 타임라인 형태로 표시 */}
                      {index === 2 ? (
                        <div className="relative">
                          {/* 타임라인 */}
                          <div className="space-y-3">
                            {product.features.map((feature, idx) => {
                              const year = feature.match(/^(\d{4})/)?.[1] || '';
                              const content = feature.replace(/^\d{4}년?:?\s*/, '');
                              const isLast = idx === product.features.length - 1;
                              return (
                                <div key={idx} className="flex items-start gap-4 relative pl-8">
                                  {/* 타임라인 세로선 (마지막 항목 제외) */}
                                  {!isLast && (
                                    <div className="absolute left-[11px] top-6 h-full w-0.5 bg-blue-300 dark:bg-blue-600"></div>
                                  )}
                                  {/* 타임라인 포인트 */}
                                  <div className="absolute left-0 w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center shadow-md z-10">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                  
                                  {/* 년도 배지 */}
                                  <div className="flex-shrink-0 px-2 py-1 bg-blue-100 dark:bg-blue-900/50 rounded text-blue-700 dark:text-blue-300 font-bold text-xs min-w-[50px] text-center">
                                    {year}
                                  </div>
                                  
                                  {/* 내용 */}
                                  <span className="text-gray-700 dark:text-gray-200 text-sm flex-1">{content}</span>
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* 향후 추진방향 */}
                          {product.futureDirections && product.futureDirections.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                              <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                {currentLanguage === 'en' ? '▪ Future Directions' : '▪ 향후 추진방향'}
                              </h5>
                              <div className="space-y-2">
                                {product.futureDirections.map((direction, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">✓</span>
                                    <span>{direction}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">✓</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
            {(showAllAchievements ? achievements : achievements.slice(0, 5)).map((yearData, index) => (
              <div
                key={yearData.year}
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
              </div>
            ))}
          </div>

          {/* 더보기/접기 버튼 */}
          {achievements.length > 5 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllAchievements(!showAllAchievements)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#71000b] to-[#8a0010] hover:from-[#8a0010] hover:to-[#71000b] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
            </div>
          )}
        </div>
      </motion.section>

      {/* 연락처 */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-900 dark:to-gray-800"
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
                <a href="tel:02-515-5018" className="text-[#71000b] hover:underline">
                  02-515-5018
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:clarus@junghocorp.com" className="text-[#71000b] hover:underline">
                  clarus@junghocorp.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">🌐</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {currentLanguage === 'en' ? 'Website:' : '웹사이트:'}
                </span>
                <a href="https://www.magicclarus.com" target="_blank" rel="noopener noreferrer" className="text-[#71000b] hover:underline">
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

