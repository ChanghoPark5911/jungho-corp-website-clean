import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { IRGSHero } from '../../components/v2';
import { useI18n } from '../../hooks/useI18n';

/**
 * v2 메인 홈페이지
 * 설계안에 따른 새로운 구조 + 고급 애니메이션 효과
 */
const HomePageV2 = () => {
  const navigate = useNavigate();
  const { t } = useI18n();


  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
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
        staggerChildren: 0.2
      }
    }
  };

  const scaleOnHover = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* IRGS Hero Section - 핵심가치 애니메이션 (청색 배경) */}
      <IRGSHero />

      {/* Gateway 빠른 접근 섹션 (SK 스타일) */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              정호그룹 GATEWAY
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              정호그룹의 다양한 소식을 전합니다
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {/* Gateway 1: 그룹 소개 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/about')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-6xl">👋</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  그룹 소개
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  정호그룹의 비전과<br />역사를 확인하세요
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  바로가기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 2: 계열사 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/subsidiaries')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-6xl">🏢</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  계열사
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  5개 전문 계열사가<br />함께합니다
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  바로가기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 3: 미디어 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/media')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-6xl">🎬</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  미디어/PR
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  생생한 소식과<br />영상을 만나보세요
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  바로가기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 4: 문의 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/support/contact')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-6xl">📧</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  문의하기
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  궁금한 점을<br />언제든 연락하세요
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  바로가기
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 경영철학 섹션 - Fade In 애니메이션 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeInUp}
            >
              경영철학
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              variants={fadeInUp}
            >
              정호그룹이 쉼 없이 지속적으로 추구하는 경영의 방향
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* 고객만족 */}
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                고객만족
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                고객의 니즈를 정확히 파악하고 최상의 품질로 응답합니다
              </p>
            </motion.div>

            {/* 기술혁신 */}
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                기술혁신
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                끊임없는 연구개발로 업계를 선도하는 기술력을 확보합니다
              </p>
            </motion.div>

            {/* 지속성장 */}
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                지속성장
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                장기적 관점에서 기업과 사회가 함께 성장하는 미래를 만듭니다
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 실적 카운트업 섹션 */}
      <motion.section 
        className="py-20 bg-primary-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              숫자로 보는 정호그룹
            </h2>
            <p className="text-xl text-primary-100">
              40년간 쌓아온 경험과 성과
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {/* 설립연도 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={1985} 
                  duration={2.5} 
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <div className="text-xl text-primary-100 font-semibold">설립연도</div>
              <div className="text-sm text-primary-200 mt-2">Since 1985</div>
            </motion.div>

            {/* 계열사 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={5} 
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span>+</span>
              </div>
              <div className="text-xl text-primary-100 font-semibold">계열사</div>
              <div className="text-sm text-primary-200 mt-2">Subsidiaries</div>
            </motion.div>

            {/* 누적 프로젝트 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={1000} 
                  duration={2.5} 
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span>+</span>
              </div>
              <div className="text-xl text-primary-100 font-semibold">누적 프로젝트</div>
              <div className="text-sm text-primary-200 mt-2">Projects</div>
            </motion.div>

            {/* 고객사 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={500} 
                  duration={2.5} 
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span>+</span>
              </div>
              <div className="text-xl text-primary-100 font-semibold">고객사</div>
              <div className="text-sm text-primary-200 mt-2">Clients</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* IRGS 섹션 - Fade In */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              IRGS - 정호그룹의 핵심 가치
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              기술은 정확하게, 경험은 아름답게
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {/* Innovation */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Innovation
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                혁신
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                새로운 생각과 기술로 더 나은 "경험"을 만듭니다
              </p>
            </motion.div>

            {/* Reliability */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Reliability
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                신뢰
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                품질과 약속을 지키는 것, "관계의 가치"를 높입니다
              </p>
            </motion.div>

            {/* Global */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🌏</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Global
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                글로벌
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                국제 기준을 선도하는 기술력과 서비스로 글로벌 "경쟁력"을 확장합니다
              </p>
            </motion.div>

            {/* Sustainability */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Sustainability
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                지속가능성
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                인간과 자연이 함께 공존할 수 있도록 지속가능한 "내일"을 설계합니다
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 그룹사 소개 - 호버 효과 강화 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              정호그룹 계열사
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Innovation through specialized expertise
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* 정호티엘씨 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/tlc')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(46, 125, 50, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-tlc-500 to-primary-700 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    ⚡
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  정호티엘씨
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  빌딩 자동화 / 전력 제어
                </p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  자세히 보기 →
                </button>
              </div>
            </motion.div>

            {/* 클라루스 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/clarus')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(0, 137, 123, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-clarus-500 to-primary-700 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    💡
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-clarus-500 transition-colors">
                  클라루스
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  조명 제어 솔루션
                </p>
                <button className="text-clarus-500 dark:text-clarus-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  자세히 보기 →
                </button>
              </div>
            </motion.div>

            {/* 일루텍 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/illutech')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(255, 167, 38, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-illutech-500 to-yellow-600 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🔆
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-illutech-500 transition-colors">
                  일루텍
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  산업용 LED 조명
                </p>
                <button className="text-illutech-500 dark:text-illutech-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  자세히 보기 →
                </button>
              </div>
            </motion.div>

            {/* 정호텍스컴 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/texcom')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(126, 87, 194, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-texcom-500 to-purple-700 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🧵
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-texcom-500 transition-colors">
                  정호텍스컴
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  섬유기계 / 패션
                </p>
                <button className="text-texcom-500 dark:text-texcom-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  자세히 보기 →
                </button>
              </div>
            </motion.div>

            {/* RSS 사업부 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/rss')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(102, 187, 106, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-rss-500 to-primary-700 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🔧
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rss-500 transition-colors">
                  RSS 사업부
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  설명기계
                </p>
                <button className="text-rss-500 dark:text-rss-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  자세히 보기 →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA 섹션 */}
      <motion.section 
        className="py-20 bg-primary-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            variants={fadeInUp}
          >
            정호그룹과 함께하세요
          </motion.h2>
          <motion.p 
            className="text-xl text-primary-100 mb-8"
            variants={fadeInUp}
          >
            혁신적인 기술과 40년의 경험으로 밝은 미래를 만들어갑니다
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            variants={fadeInUp}
          >
            <motion.button
              onClick={() => navigate('/v2/about')}
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.95 }}
            >
              회사 소개
            </motion.button>
            <motion.button
              onClick={() => navigate('/v2/support/contact')}
              className="px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 border-2 border-white"
              whileHover={{ scale: 1.05, backgroundColor: '#1B5E20' }}
              whileTap={{ scale: 0.95 }}
            >
              문의하기
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePageV2;
