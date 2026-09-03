import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';

/**
 * 정호텍스컴 메인 페이지
 * 회사 소개 + 사업부 선택 (섬유기계 / RSS)
 */
const TexcomDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage } = useI18n();
  const [showAllAchievements, setShowAllAchievements] = React.useState(false);

  // 현재 경로가 Hybrid인지 확인
  const isHybrid = location.pathname.startsWith('/hybrid');
  const basePath = isHybrid ? '/hybrid/subsidiaries/jungho-texcom' : '/subsidiaries/jungho-texcom';
  const backPath = isHybrid ? '/hybrid' : '/';

  // 애니메이션 (클라루스와 동일하게 속도 최적화)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } }
  };

  // 연혁 및 성과 데이터 (최신순 정렬) - 일루텍 형식
  const achievements = [
    {
      year: '2024',
      items: currentLanguage === 'en'
        ? ['RSS Division entered Market Kurly']
        : ['RSS 사업부 마켓컬리 입점']
    },
    {
      year: '2023',
      items: currentLanguage === 'en'
        ? ['RSS Division entered 29cm, Musinsa, W Concept']
        : ['RSS 사업부 29cm, 무신사, W컨셉 입점']
    },
    {
      year: '2022',
      items: currentLanguage === 'en'
        ? ['THE AUTOFINDER trademark registration']
        : ['THE AUTOFINDER (디 오토파인더) 상표권 등록']
    },
    {
      year: '2021',
      items: currentLanguage === 'en'
        ? ['Established RSS Division and launched REDSSOCKSOO']
        : ['RSS 사업부 설립 및 레드싹수 런칭']
    },
    {
      year: '2020',
      items: currentLanguage === 'en'
        ? ['Launched automatic transfer device THE AUTOFINDER']
        : ['자동 전사장치 THE AUTOFINDER (디 오토파인더) 출시']
    },
    {
      year: '2017',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Lindauer Dornier GmbH, Germany']
        : ['독일 Lindauer Dornier GmbH 사와 Agency 협약']
    },
    {
      year: '2007',
      items: currentLanguage === 'en'
        ? ['Company name changed to Jungho TEXCOM Co., Ltd.']
        : ['㈜정호텍스컴으로 상호 변경']
    },
    {
      year: '2005',
      items: currentLanguage === 'en'
        ? [
            'Agency agreement with Mesdan S.p.A, Italy',
            'Agency agreement with Lenzing Instruments, Austria'
          ]
        : [
            '이탈리아 Mesdan S.p.A 사와 Agency 협약',
            '오스트리아 Lenzing Instruments 사와 Agency 협약'
          ]
    },
    {
      year: '2002',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Benninger Zell GmbH, Germany']
        : ['독일 Benninger Zell GmbH 사와 Agency 협약']
    },
    {
      year: '2001',
      items: currentLanguage === 'en'
        ? [
            'Agency agreement with Texkimp Limited, UK',
            'Agency agreement with Temafa, Germany'
          ]
        : [
            '영국 Texkimp Limited 사와 Agency 협약',
            '독일 Temafa 사와 Agency 협약'
          ]
    },
    {
      year: '2000',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Novibra GmbH, Germany']
        : ['독일 Novibra GmbH 사와 Agency 협약']
    },
    {
      year: '1998',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Braecker, Switzerland']
        : ['스위스 Braecker 사와 Agency 협약']
    },
    {
      year: '1996',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Steinemann, Switzerland']
        : ['스위스 Steinemann 사와 Agency 협약']
    },
    {
      year: '1991',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Luwa, Switzerland']
        : ['스위스 Luwa 사와 Agency 협약']
    },
    {
      year: '1990',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Crosrol, UK']
        : ['영국 Crosrol 사와 Agency 협약']
    },
    {
      year: '1988',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Textechno, Germany']
        : ['독일 Textechno 사와 Agency 협약']
    },
    {
      year: '1985',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Kato, Japan']
        : ['일본 Kato 사와 Agency 협약']
    },
    {
      year: '1984',
      items: currentLanguage === 'en'
        ? ['Agency agreement with Saurer-Allma, Germany']
        : ['독일 Saurer-Allma 사와 Agency 협약']
    },
    {
      year: '1982',
      items: currentLanguage === 'en'
        ? ['Founded Jungho Trading Co.']
        : ['정호물산 설립']
    }
  ];

  // 사업부 데이터
  const divisions = [
    {
      id: 'textile',
      name: currentLanguage === 'en' ? 'Textile Machinery Division' : '섬유기계 사업부',
      description: currentLanguage === 'en'
        ? 'Partnerships with Germany, Switzerland, Austria, Japan (Saurer, Benninger, Luwa, Texkimp, The Auto Finder, etc.)'
        : '독일, 스위스, 오스트리아, 일본 파트너십 (Saurer, Benninger, Luwa, Texkimp, The Auto Finder 등)',
      icon: '🏭',
      bgColor: '#0e1841',
      path: `${basePath}/textile`
    },
    {
      id: 'rss',
      name: currentLanguage === 'en' ? 'RSS Division' : 'RSS 사업부',
      description: currentLanguage === 'en'
        ? 'REDSSOCKSOO, GUBBE brands and curated select shop listings'
        : '레드싹수(REDSSOCKSOO), 굽베(GUBBE) 브랜드 및 감도 깊은 취향 셀렉트샵 입점',
      icon: '👔',
      bgColor: '#000000',
      path: `${basePath}/rss`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section - 일루텍과 동일한 스타일 */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 배경 패턴 - 일루텍과 동일 */}
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
                src="/assets/logos/logo-junghotexcom.png" 
                alt="정호텍스컴 로고" 
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
              <div className="flex flex-col items-center -space-y-1 sm:-space-y-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                  {currentLanguage === 'en' ? 'JUNGHO TEXCOM' : '정호텍스컴'}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {currentLanguage === 'en' ? '정호텍스컴' : 'JUNGHO TEXCOM Co., Ltd.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 슬로건 & 회사 소개 */}
      <motion.section 
        className="py-16 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-400 mb-8"
          >
            {currentLanguage === 'en' 
              ? 'Bridging Textile Industry and Fashion'
              : '섬유 산업과 패션을 잇다'}
          </motion.h2>

          <motion.div variants={fadeInUp} className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              {currentLanguage === 'en'
                ? 'Since 1982, Jungho TEXCOM has been contributing to the development of the textile industry by exclusively supplying world-class textile machinery and testing equipment in Korea.'
                : '1982년 설립 이후, 세계적인 섬유기계 및 시험기를 국내에 독점 공급하며 섬유 산업의 발전에 기여해온 ㈜정호텍스컴.'}
            </p>
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              {currentLanguage === 'en'
                ? 'Now, based on our B2B experience, we are expanding into the fashion B2C sector, creating the future of textiles and fashion together.'
                : '이제 B2B 경험을 바탕으로 패션 B2C 분야까지 확장하며, 섬유와 패션의 미래를 함께 만들어갑니다.'}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 사업부 소개 카드 - 클라루스 스타일 */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Our Divisions' : '사업부 소개'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? 'Two specialized divisions leading the textile and fashion industry'
                : '섬유와 패션 산업을 이끄는 2개의 전문 사업부'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {divisions.map((division) => (
              <motion.div
                key={division.id}
                variants={fadeInUp}
                onClick={() => navigate(division.path)}
                className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* 헤더 */}
                <div className="px-6 py-8 text-center" style={{ backgroundColor: division.bgColor }}>
                  <span className="text-6xl mb-4 block">{division.icon}</span>
                  <h3 className="text-2xl font-bold text-white">
                    {division.name}
                  </h3>
                </div>
                
                {/* 본문 */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed">
                    {division.description}
                  </p>
                  <button
                    className="w-full py-3 text-white font-semibold rounded-lg group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ backgroundColor: division.bgColor }}
                  >
                    {currentLanguage === 'en' ? 'View Details' : '자세히 보기'}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 핵심 강점 섹션 - 연분홍/연보라 배경 */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            {currentLanguage === 'en' ? 'Core Strengths' : '핵심 강점'}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 글로벌 파트너십 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? 'Global Partnership' : '글로벌 파트너십'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Saurer, Benninger, Luwa, Texkimp, The Auto Finder and more'
                  : 'Saurer, Benninger, Luwa, Texkimp, The Auto Finder 등'}
              </p>
            </motion.div>

            {/* 40년 경험 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? '40+ Years Experience' : '40년 경험'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Professional expertise accumulated since 1982'
                  : '1982년부터 축적된 섬유 산업 전문성과 기술력'}
              </p>
            </motion.div>

            {/* 원스톱 서비스 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? 'One-Stop Service' : '원스톱 서비스'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Consultation, import, installation, training, maintenance'
                  : '상담, 수입, 납품, 설치, 교육, 유지보수까지 통합 지원'}
              </p>
            </motion.div>

            {/* B2B에서 B2C로 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? 'B2B to B2C' : 'B2B에서 B2C로'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Expanding into fashion based on textile expertise'
                  : '섬유 기계 전문성을 바탕으로 패션까지 확장'}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 연혁 및 성과 섹션 - 일루텍과 동일한 형식 */}
      <motion.section 
        className="py-16 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'History & Achievements' : '연혁 및 성과'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? '40+ years of building global partnerships'
                : '40년 이상의 글로벌 파트너십 구축 역사'}
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
                    {currentLanguage === 'en' ? `View All ${achievements.length} History` : `전체 ${achievements.length}개 연혁 보기`}
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

      {/* 제품 문의 및 기술지원 안내 섹션 - 수평 압축 레이아웃 */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-900 dark:to-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
          >
            {currentLanguage === 'en' ? 'Product Inquiry & Technical Support' : '제품 문의 및 기술지원 안내'}
          </motion.h2>

          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* 연락처 정보 - 2x3 그리드 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-b border-gray-100 dark:border-gray-700">
              {/* 전화 */}
              <div className="p-5 border-r border-b md:border-b-0 border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Phone' : '전화'}</p>
                  <a href="tel:02-538-3652" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">02-538-3652</a>
                </div>
              </div>

              {/* 팩스 */}
              <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📠</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Fax' : '팩스'}</p>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">02-553-4161</span>
                </div>
              </div>

              {/* 이메일 */}
              <div className="p-5 border-r md:border-r-0 border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Email' : '이메일'}</p>
                  <a href="mailto:sales@junghocorp.com" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">sales@junghocorp.com</a>
                </div>
              </div>

              {/* 웹사이트 */}
              <div className="p-5 border-r border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Website' : '웹사이트'}</p>
                  <a href="https://www.junghocorp.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">www.junghocorp.com</a>
                </div>
              </div>

              {/* 본사 */}
              <div className="p-5 border-r border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Headquarters' : '본사'}</p>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Jungho Bldg, Gangnam-gu, Seoul' : '서울 강남구 논현로116길 17 정호빌딩 3층'}
                  </span>
                </div>
              </div>

              {/* 영업시간 */}
              <div className="p-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🕐</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Hours' : '영업시간'}</p>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Mon-Fri 8:30AM-5:30PM' : '평일 08:30 - 17:30'}
                  </span>
                </div>
              </div>
            </div>

            {/* 기술지원 안내 - 수평 레이아웃 */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🛠️</span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentLanguage === 'en' ? 'Technical Support' : '기술지원 안내'}
                </h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? 'Installation & Training' : '장비 설치 및 교육'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? 'Regular Maintenance' : '정기 유지보수'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? 'Genuine Parts Supply' : '정품 부품 공급'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? '24/7 Emergency Support' : '24시간 긴급지원'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 하단 여백 */}
      <div className="h-12 bg-white dark:bg-gray-900"></div>
    </div>
  );
};

export default TexcomDetailPage;
