import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../../components/v2';
import { useI18n } from '../../hooks/useI18n';

const AboutHistoryPage = () => {
  const { t, currentLanguage } = useI18n();
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const timelineItemVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  // 연혁 데이터 (2025 → 1982)
  const historyData = [
    {
      year: '2025',
      events: [
        'Energy Manager 5 (EM5) 조명/전력 소프트웨어 신제품 출시',
        'D-Type Program Switch 6종 신제품 출시',
        'Google Android, Apple iOS EF2 Setting App 출시',
        '버튼 모듈 교체형 프로그램 스위치 특허출원'
      ]
    },
    {
      year: '2024',
      events: [
        'Single Pole Relay UL/cUL 20A → 30A 승인 성능 업그레이드',
        'Double Pole Relay 구동 Kit 개발 및 출시',
        '프로그래머블 콘트롤러 및 이를 이용한 발명 관리 시스템 특허출원',
        '프로그래머블 콘트롤러를 이용한 발명 관리 시스템 특허출원',
        '프로그래머블 콘트롤러를 이용한 발명 관리 시스템 및 그의 제어방법 특허출원'
      ]
    },
    {
      year: '2023',
      events: [
        'Magic CLARUS 온라인 E커머스 플랫폼 구축 및 판매개시-Naver, Coupang',
        'Zero Energy Building 최적화 Intelligent Programmable Controller IPC 업그레이드 출시'
      ]
    },
    {
      year: '2022',
      events: [
        '자가 진단형 누전자단기 특허 등록',
        'ICT융합 자가진단 소형 누전자단기 개발 과제 수행완료',
        'Energy Harvesting 무 배선 Stand Alone (Kinetic)스위치 제품 출시',
        '전자식 스위치 무선수신 릴레이 모듈 KC전기용품안전인증 취득'
      ]
    },
    {
      year: '2021',
      events: [
        '국제광용융엑스포 신기술 개발 우수업체 선정'
      ]
    },
    {
      year: '2020',
      events: [
        'Ladder-Less 원격제어 시스템 플랫폼 개발, 인체감지센서, 조도센서 원격 설정 제품 출시'
      ]
    },
    {
      year: '2019',
      events: [
        '㈜클라루스 상호변경',
        '산업통상자원부장관 \'산업융합 선도기업 선정\'',
        '전기안전IoT장치 공공사업 참여',
        '서울별무장 병역지정업체 선정'
      ]
    },
    {
      year: '2018',
      events: [
        'Lighting Fair International, Chicago USA 참가 - LED/OLED 조명 전시회 참가',
        'LED시스템조명2.0 세부 1 주광가림 상위기관 평가 "우수" 달성',
        '복미 LED조명 수출 건소시업 제어부분 참여',
        '중국 은주 안과병원 병원용 LED무선제어 설치',
        '웹 기반 분산 제어장치 (IPC,SPC) 출시',
        '커버의 영상분석을 통한 조명등 자동 점등제어방법 특허등록'
      ]
    },
    {
      year: '2017',
      events: [
        'Lighting Fair International, Philadelphia USA 참가',
        'LED/OLED 조명 전시회 참가',
        '한국전기안전공사 \'자가진단기능 내장형 누전차단기\' 개발·과제 수행',
        '복미 LED조명 수출 건소시업 제어부분 참여',
        '원격 제어용 검정장치 특허등록',
        '분류기 모듈 교체형 레천 릴레이 특허등록',
        '출입전류 및 시간 발생을 억제하는 지그비 원격 제어장치 특허등록',
        '원격 제어용 검정 장치 특허등록'
      ]
    },
    {
      year: '2016',
      events: [
        'Lighting Fair International, San Diego USA 참가',
        '국제LED/OLED회 참가국무총리상 수상',
        '조명전기설비학회 조명신기술 발표',
        '국무총리상 수상/무선 Touch LCD Switch기술',
        '창 및 서울조명 전시회 참가',
        '벽면 부착형 터치 스위치(Touch LCD Switch) 특허등록 및 국급 특허출원',
        'E/F2-BUS 절전형 통신제어장치 특허등록',
        '정보전달을 위한 조명제제 통합 시스템 특허등록',
        '건물의 절비, 전력 및 조명 통합 제어 시스템 특허등록',
        '에너지 절감형 레저 형식의 모터 제어반 특허등록'
      ]
    },
    {
      year: '2015',
      events: [
        'Lighting Fair International, New York 참가',
        'LED/OLED 조명 전시회 참가 / 발명에디지털칼솔루션 전시',
        '산업자원부 장관상 수상 / 10A Hybrid Terminal Unit',
        '산업융합선도기업 및 융합효목 지정 / 건물자동제어시스템',
        '아시아를 빛낼 100대 제품 선정 / 조명자동제어시스템',
        '중국 동지대학과 병원용 LED조명제어 시스템 개발 / 무선제어',
        'Touch LCD 스위치 출시',
        '산업융합자원부 지원 - LED시스템조명2.0 과제 (3개년) 수행 주관기관 선정',
        '달리 어드레스 매핑형 전원 중점 통신 방식의 제어시스템 특허등록',
        '이중화 스케줄 방식의 건물 설비 자동제어 시스템 및 방법 특허등록',
        '전류검출장치 특허등록'
      ]
    },
    {
      year: '2014',
      events: [
        '성능인증 KDI국 인증 획득/건물자동제어시스템',
        '품질인증 QDI국 인증 획득/건물자동제어시스템'
      ]
    },
    {
      year: '2013',
      events: [
        'GS(Good Software) 인증 획득(인증번호:13-0033)',
        '조명제어 시스템 전 품목 FCC(Part 15 Class A, B) 인증획득',
        '직접생산확인증명(자동제어반, 자동검블기, 계정(계측)제어장치',
        'CLARUS 에너지 절감 솔루션 기술세미나(삼정호텔)',
        '미국 Nexlight, 캐나다 Douglass, Gentec, 베트남 대리점 계약',
        '갤러던 어패나 EVM 건배선센터 자동제어 통합시스템 납품'
      ]
    },
    {
      year: '2012',
      events: [
        '전력량 산출 가능한 조명제어시스템 특허등록',
        'Energy Manager 4 (EM4) 개발 (Windows7 64bit Version)'
      ]
    },
    {
      year: '2011~2010',
      events: [
        '전력제어시스템 Software / 주차관제솔루션 / 출입관제솔루션 ACS 개발',
        '전 제품 품질인증 취득: UL/cUL, KC/FCC 인증'
      ]
    },
    {
      year: '2009',
      events: [
        '㈜클라루스코리아 상호변경, 기업부설 연구소 설립',
        '20A HID RELAY UL/CUL인증 취득(복미지역) / 반복횟수 120,000회 20A 부하 동작 시험 성적서 취득 (한국산업기술시험원)',
        'CLARUS DALI EASYCON SYSTEM EMC(9종) CLASS(B) 인증 취득',
        'CLARUS EASYCON DALI 시스템 유니트 / CLARUS EASYCON DALI 소형 점포형 조명제어반 개발',
        'CLARUS 통로 유도등 CLARUS 스탭 라이트 / CLARUS EASYCON 극장용 Dimming System / ARS 시스템 개발'
      ]
    },
    {
      year: '2008',
      events: [
        '경북 칠곡 앱관지사 및 공장설립',
        '20A Relay 개발 / Relay 제어용 Terminal Unit 개발'
      ]
    },
    {
      year: '2007',
      events: [
        'DALI 암정기를 이용한 CLARUS DALI EASYCON 조명제어 시스템(DLU,DSU,DBU) 개발'
      ]
    },
    {
      year: '2006',
      events: [
        '조명제어 전용 Software Lighting manager Ⅱ ARS 시스템 소프트웨어 개발',
        '극장용 Dimming System 개발(CLARUS Dimming Unit, Dimming control unit, Dimming I/F Unit)',
        '극장용 스탭라이트 개발 (LED형, 광 Fiber형) / 극장용 통로 유도등 공동 개발 (LED형)'
      ]
    },
    {
      year: '2005',
      events: [
        '조명제어 전용 Software Lighting manager Ⅱ 소프트웨어 개발 (Intranet, Ethernet을 통한 조명제어)'
      ]
    },
    {
      year: '2004',
      events: [
        '조명제어 전용 Software Lighting manager 소프트웨어 개발 (Windows 2000, XP Version)'
      ]
    },
    {
      year: '2003',
      events: [
        'E/F2-BUS 조명제어 시스템 및 디바이스, 프로그램 개발',
        '조명제어 하드웨어 신형 SNU/SIU와 E/F2-BUS 설정용 프로그램 개발'
      ]
    },
    {
      year: '2002',
      events: [
        '㈜정호라이트테크 설립'
      ]
    },
    {
      year: '1998~1982',
      events: [
        '1998 조명제어 전용 Light View 소프트웨어 개발 (Window98)',
        '1992 조명제어 전용 Sirius31 소프트웨어 개발 (Window 3.1)',
        '1992 정호물산 전기사업부 산하 연구소 개설',
        '1984 정호물산 전기사업부 신설',
        '1982 정호물산 창립'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
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

        {/* 이정표 - 오른쪽 상단 */}
        <motion.div 
          className="absolute top-8 right-8 text-right z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Current Page
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            HISTORY
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
                📅 1982 - 2025
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              정호그룹의 발자취
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              1982년부터 현재까지<br />
              <span className="text-primary-600 dark:text-primary-400 font-semibold">43년의 혁신과 성장의 여정</span>
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 pt-6 text-center"
              variants={fadeInUp}
            >
              <div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">43년+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">역사</div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">마일스톤</div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">5개</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">계열사</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 타임라인 */}
          <div className="relative">
            {/* 수직 라인 */}
            <div className="absolute left-[60px] md:left-[100px] top-0 bottom-0 w-1 bg-gradient-to-b from-primary-600 via-primary-400 to-primary-200 dark:from-primary-400 dark:via-primary-600 dark:to-primary-800" />

            {/* 타임라인 아이템 */}
            <div className="space-y-12">
              {historyData.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="relative flex items-start gap-6 md:gap-12"
                  variants={timelineItemVariant}
                >
                  {/* 연도 */}
                  <div className="flex-shrink-0 w-[50px] md:w-[90px] text-right">
                    <div className="inline-block px-3 py-2 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white rounded-lg shadow-lg font-bold text-lg md:text-xl">
                      {item.year}
                    </div>
                  </div>

                  {/* 타임라인 노드 */}
                  <div className="absolute left-[55px] md:left-[95px] top-3 w-3 h-3 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10" />

                  {/* 이벤트 카드 */}
                  <motion.div
                    className="flex-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <ul className="space-y-3">
                      {item.events.map((event, eventIndex) => (
                        <li 
                          key={eventIndex}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full mt-2" />
                          <span className="text-sm md:text-base leading-relaxed">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 창립 마크 - 최종 */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 rounded-full shadow-xl">
              <span className="text-3xl">🏢</span>
              <div className="text-left">
                <div className="text-white font-bold text-xl">1982년 정호물산 창립</div>
                <div className="text-primary-100 text-sm">정호그룹의 시작</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              함께 만들어갈 미래
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              43년의 경험과 혁신을 바탕으로<br />
              정호그룹은 더 밝은 내일을 향해 나아갑니다
            </p>
            <motion.button
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              정호그룹과 함께하기
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutHistoryPage;

