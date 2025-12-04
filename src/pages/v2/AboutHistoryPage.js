import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

const AboutHistoryPage = () => {
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  const [showAllHistory, setShowAllHistory] = useState(false);
  
  // 현재 경로가 classic 또는 hybrid인지 확인
  const isClassic = location.pathname.startsWith('/classic');
  const isHybrid = location.pathname.startsWith('/hybrid');
  const version = isHybrid ? 'hybrid' : isClassic ? 'classic' : 'v2';
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

  const timelineItemVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  // 연혁 데이터 (2025 → 1982) - 한국어/영어
  const historyData = [
    {
      year: '2025',
      eventsKo: [
        'Energy Manager 5 (EM5) 조명/전력 소프트웨어 신제품 출시',
        'D-Type Program Switch 6종 신제품 출시',
        '버튼 모듈 교체형 프로그램 스위치 특허출원'
      ],
      eventsEn: [
        'Launch of Energy Manager 5 (EM5) Lighting/Power Software',
        'Launch of 6 types of D-Type Program Switch',
        'Patent application for button module replaceable program switch'
      ]
    },
    {
      year: '2024',
      eventsKo: [
        'Single Pole Relay UL/cUL 20A → 30A 승인 성능 업그레이드',
        'Double Pole Relay 구동 Kit 개발 및 출시',
        '프로그래머블 콘트롤러 및 이를 이용한 발명 관리 시스템 특허출원',
        '프로그래머블 콘트롤러를 이용한 발명 관리 시스템 특허출원',
        '프로그래머블 콘트롤러를 이용한 발명 관리 시스템 및 그의 제어방법 특허출원'
      ],
      eventsEn: [
        'Single Pole Relay UL/cUL 20A → 30A approval performance upgrade',
        'Development and launch of Double Pole Relay Drive Kit',
        'Patent application for programmable controller and invention management system',
        'Patent application for invention management system using programmable controller',
        'Patent application for invention management system and control method using programmable controller'
      ]
    },
    {
      year: '2023',
      eventsKo: [
        'Magic CLARUS 온라인 E커머스 플랫폼 구축 및 판매개시-Naver, Coupang',
        'Zero Energy Building 최적화 Intelligent Programmable Controller IPC 업그레이드 출시'
      ],
      eventsEn: [
        'Launch of Magic CLARUS online e-commerce platform on Naver, Coupang',
        'Launch of Zero Energy Building optimized Intelligent Programmable Controller IPC upgrade'
      ]
    },
    {
      year: '2022',
      eventsKo: [
        '자가 진단형 누전자단기 특허 등록',
        'Energy Harvesting 무 배선 Stand Alone (Kinetic)스위치 제품 출시',
        '전자식 스위치 무선수신 릴레이 모듈 KC전기용품안전인증 취득'
      ],
      eventsEn: [
        'Patent registration for self-diagnostic earth leakage circuit breaker',
        'Launch of Energy Harvesting wireless Stand Alone (Kinetic) switch',
        'KC electrical safety certification for electronic switch wireless receiver relay module'
      ]
    },
    {
      year: '2021',
      eventsKo: [
        '국제광용융엑스포 신기술 개발 우수업체 선정'
      ],
      eventsEn: [
        'Selected as excellent company for new technology development at International Photonics Expo'
      ]
    },
    {
      year: '2020',
      eventsKo: [
        'Ladder-Less 원격제어 시스템 플랫폼 개발, 인체감지센서, 조도센서 원격 설정 제품 출시'
      ],
      eventsEn: [
        'Development of Ladder-Less remote control system platform, launch of motion sensor and illumination sensor remote setting products'
      ]
    },
    {
      year: '2019',
      eventsKo: [
        '㈜클라루스 상호변경',
        '산업통상자원부장관 \'산업융합 선도기업 선정\''
      ],
      eventsEn: [
        'Company name changed to CLARUS Co., Ltd.',
        'Selected as "Industrial Convergence Leading Company" by Minister of Trade, Industry and Energy'
      ]
    },
    {
      year: '2018',
      eventsKo: [
        '웹 기반 분산 제어장치 (IPC,SPC) 출시',
        '커버의 영상분석을 통한 조명등 자동 점등제어방법 특허등록'
      ],
      eventsEn: [
        'Launch of web-based distributed control device (IPC, SPC)',
        'Patent registration for automatic lighting control method through cover image analysis'
      ]
    },
    {
      year: '2017',
      eventsKo: [
        'Lighting Fair International, Philadelphia USA 참가',
        '원격 제어용 검정장치 특허등록',
        '분류기 모듈 교체형 레천 릴레이 특허등록',
        '출입전류 및 시간 발생을 억제하는 지그비 원격 제어장치 특허등록',
        '원격 제어용 검정 장치 특허등록'
      ],
      eventsEn: [
        'Participated in Lighting Fair International, Philadelphia USA',
        'Patent registration for remote control verification device',
        'Patent registration for classifier module replaceable latching relay',
        'Patent registration for ZigBee remote control device suppressing inrush current and time',
        'Patent registration for remote control verification device'
      ]
    },
    {
      year: '2016',
      eventsKo: [
        '벽면 부착형 터치 스위치(Touch LCD Switch) 특허등록 및 국급 특허출원',
        'E/F2-BUS 절전형 통신제어장치 특허등록',
        '정보전달을 위한 조명제제 통합 시스템 특허등록',
        '건물의 절비, 전력 및 조명 통합 제어 시스템 특허등록',
        '에너지 절감형 레저 형식의 모터 제어반 특허등록'
      ],
      eventsEn: [
        'Patent registration and international patent application for wall-mounted Touch LCD Switch',
        'Patent registration for E/F2-BUS energy-saving communication control device',
        'Patent registration for integrated lighting system for information transmission',
        'Patent registration for integrated control system for building facilities, power and lighting',
        'Patent registration for energy-saving leisure type motor control panel'
      ]
    },
    {
      year: '2015',
      eventsKo: [
        'Lighting Fair International, New York 참가',
        'LED/OLED 조명 전시회 참가 / 발명에디지털칼솔루션 전시',
        '산업자원부 장관상 수상 / 10A Hybrid Terminal Unit',
        '달리 어드레스 매핑형 전원 중점 통신 방식의 제어시스템 특허등록',
        '이중화 스케줄 방식의 건물 설비 자동제어 시스템 및 방법 특허등록',
        '전류검출장치 특허등록'
      ],
      eventsEn: [
        'Participated in Lighting Fair International, New York',
        'Participated in LED/OLED Lighting Exhibition / Digital Solution Exhibition',
        'Minister of Industry Award / 10A Hybrid Terminal Unit',
        'Patent registration for DALI address mapping power-focused communication control system',
        'Patent registration for redundant schedule building facility automatic control system and method',
        'Patent registration for current detection device'
      ]
    },
    {
      year: '2014',
      eventsKo: [
        '성능인증 KDI국 인증 획득/건물자동제어시스템',
        '품질인증 QDI국 인증 획득/건물자동제어시스템'
      ],
      eventsEn: [
        'Obtained KDI performance certification / Building automation control system',
        'Obtained QDI quality certification / Building automation control system'
      ]
    },
    {
      year: '2013',
      eventsKo: [
        'GS(Good Software) 인증 획득(인증번호:13-0033)',
        '조명제어 시스템 전 품목 FCC(Part 15 Class A, B) 인증획득'
      ],
      eventsEn: [
        'Obtained GS (Good Software) certification (Certificate No: 13-0033)',
        'Obtained FCC (Part 15 Class A, B) certification for all lighting control system products'
      ]
    },
    {
      year: '2012',
      eventsKo: [
        '전력량 산출 가능한 조명제어시스템 특허등록',
        'Energy Manager 4 (EM4) 개발 (Windows7 64bit Version)'
      ],
      eventsEn: [
        'Patent registration for lighting control system capable of power calculation',
        'Development of Energy Manager 4 (EM4) (Windows7 64bit Version)'
      ]
    },
    {
      year: '2011~2010',
      eventsKo: [
        '전 제품 품질인증 취득: UL/cUL, KC/FCC 인증'
      ],
      eventsEn: [
        'Obtained quality certification for all products: UL/cUL, KC/FCC certification'
      ]
    },
    {
      year: '2009',
      eventsKo: [
        '㈜클라루스코리아 상호변경, 기업부설 연구소 설립',
        '20A HID RELAY UL/CUL인증 취득(복미지역) / 반복횟수 120,000회 20A 부하 동작 시험 성적서 취득 (한국산업기술시험원)'
      ],
      eventsEn: [
        'Company name changed to CLARUS Korea Co., Ltd., Established corporate R&D center',
        '20A HID RELAY UL/CUL certification (North America) / 120,000 cycles 20A load test certificate (Korea Testing Laboratory)'
      ]
    },
    {
      year: '2008',
      eventsKo: [
        '경북 칠곡 앱관지사 및 공장설립',
        '20A Relay 개발 / Relay 제어용 Terminal Unit 개발'
      ],
      eventsEn: [
        'Established Chilgok branch office and factory in Gyeongbuk',
        'Development of 20A Relay / Relay control Terminal Unit'
      ]
    },
    {
      year: '2007',
      eventsKo: [
        'DALI 암정기를 이용한 CLARUS DALI EASYCON 조명제어 시스템(DLU,DSU,DBU) 개발'
      ],
      eventsEn: [
        'Development of CLARUS DALI EASYCON lighting control system (DLU, DSU, DBU) using DALI ballast'
      ]
    },
    {
      year: '2006',
      eventsKo: [
        '조명제어 전용 Software Lighting manager Ⅱ ARS 시스템 소프트웨어 개발'
      ],
      eventsEn: [
        'Development of dedicated lighting control software Lighting Manager II ARS system'
      ]
    },
    {
      year: '2005',
      eventsKo: [
        '조명제어 전용 Software Lighting manager Ⅱ 소프트웨어 개발 (Intranet, Ethernet을 통한 조명제어)'
      ],
      eventsEn: [
        'Development of Lighting Manager II software (Lighting control via Intranet, Ethernet)'
      ]
    },
    {
      year: '2004',
      eventsKo: [
        '조명제어 전용 Software Lighting manager 소프트웨어 개발 (Windows 2000, XP Version)'
      ],
      eventsEn: [
        'Development of Lighting Manager software (Windows 2000, XP Version)'
      ]
    },
    {
      year: '2003',
      eventsKo: [
        'E/F2-BUS 조명제어 시스템 및 디바이스, 프로그램 개발'
      ],
      eventsEn: [
        'Development of E/F2-BUS lighting control system, devices and programs'
      ]
    },
    {
      year: '2002',
      eventsKo: [
        '㈜정호라이트테크 설립'
      ],
      eventsEn: [
        'Establishment of Jungho Light Tech Co., Ltd.'
      ]
    },
    {
      year: '1998~1982',
      eventsKo: [
        '1992 정호물산 전기사업부 산하 연구소 개설',
        '1984 정호물산 전기사업부 신설',
        '1982 정호물산 창립'
      ],
      eventsEn: [
        '1992 Established R&D center under Jungho Trading Electric Division',
        '1984 Established Jungho Trading Electric Division',
        '1982 Founded Jungho Trading'
      ]
    }
  ];

  // 현재 언어에 따른 이벤트 데이터 선택
  const getEvents = (item) => currentLanguage === 'en' ? item.eventsEn : item.eventsKo;

  // 순수 콘텐츠 (레이아웃 제외)
  const content = (
    <div>
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
          className="hidden md:block absolute top-40 right-8 text-right z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {currentLanguage === 'en' ? 'CURRENT PAGE' : '현재 페이지'}
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {currentLanguage === 'en' ? 'HISTORY' : '연혁'}
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
                {t('history.yearRange')}
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              {t('history.mainTitle')}
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {t('history.subtitle')}<br />
              <span className="text-primary-600 dark:text-primary-400 font-semibold">{t('history.subtitleHighlight')}</span>
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 pt-6 text-center"
              variants={fadeInUp}
            >
              <div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {currentLanguage === 'ko' ? '43년+' : '43+'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('history.statYears')}</div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('history.statMilestones')}</div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {currentLanguage === 'ko' ? '4개' : '4'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('history.statSubsidiaries')}</div>
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

            {/* 타임라인 아이템 - 최근 5개년 */}
            <div className="space-y-12">
              {historyData.slice(0, 5).map((item, index) => (
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
                      {getEvents(item).map((event, eventIndex) => (
                        <li 
                          key={eventIndex}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
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

            {/* 더보기/접기 버튼 */}
            {historyData.length > 5 && (
              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold rounded-full shadow-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  {showAllHistory ? (
                    <>
                      <span>{currentLanguage === 'en' ? 'Show Less' : '접기'}</span>
                      <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>{currentLanguage === 'en' ? `View Full History (${historyData.length - 5} more years)` : `전체 연혁 보기 (${historyData.length - 5}개년 더보기)`}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* 나머지 연혁 (더보기 클릭 시 표시) */}
            <AnimatePresence>
              {showAllHistory && (
                <motion.div 
                  className="space-y-12 mt-12"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {historyData.slice(5).map((item, index) => (
                    <motion.div
                      key={item.year}
                      className="relative flex items-start gap-6 md:gap-12"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
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
                          {getEvents(item).map((event, eventIndex) => (
                            <li 
                              key={eventIndex}
                              className="flex items-start gap-3 text-gray-700 dark:text-gray-200"
                            >
                              <span className="flex-shrink-0 w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full mt-2" />
                              <span className="text-sm md:text-base leading-relaxed">{event}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
                <div className="text-white font-bold text-xl">1982년 {t('history.foundingMark')}</div>
                <div className="text-primary-100 text-sm">{t('history.foundingSubtitle')}</div>
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
              {t('history.ctaTitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 whitespace-pre-line">
              {t('history.ctaDescription')}
            </p>
            <motion.button
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('history.ctaButton')}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );

  // V2 또는 Hybrid: 콘텐츠만 반환 (레이아웃은 App.js에서 제공)
  if (!isClassic) {
    return content;
  }

  // Classic 버전만: 자체 레이아웃 포함
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TraditionalNav version={version} />
      
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'History' : '연혁'}
        description={currentLanguage === 'en' 
          ? '40+ years of innovation and growth since 1982'
          : '1982년부터 이어온 40년의 혁신과 성장'
        }
        backgroundImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80"
        height="400px"
      />
      
      <TraditionalLayout showSidebar={true} category="about" version={version}>
        {content}
      </TraditionalLayout>
    </div>
  );
};

export default AboutHistoryPage;

