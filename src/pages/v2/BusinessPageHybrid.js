import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 사업분야 페이지 - Hybrid 버전
 */
const BusinessPageHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
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
        staggerChildren: 0.1
      }
    }
  };

  // 주요 사업 분야
  const businessAreas = [
    {
      icon: '💡',
      title: currentLanguage === 'en' ? 'Smart Building Control' : '스마트 빌딩 제어',
      description: currentLanguage === 'en'
        ? 'IoT-based intelligent building lighting control system for maximum energy efficiency'
        : 'IoT 기반 지능형 빌딩 조명제어 시스템으로 에너지 효율성을 극대화합니다',
      features: currentLanguage === 'en' 
        ? ['Automatic brightness control', 'Motion sensor integration', 'Scheduling', 'Remote control']
        : ['자동 밝기 조절', '모션 센서 연동', '스케줄링 기능', '원격 제어'],
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: '🌃',
      title: currentLanguage === 'en' ? 'Urban Lighting Infrastructure' : '도시 조명 인프라',
      description: currentLanguage === 'en'
        ? 'Smart city lighting control solution for integrated management of citywide lighting'
        : '도시 전체의 조명을 통합 관리하는 스마트시티 조명제어 솔루션을 제공합니다',
      features: currentLanguage === 'en'
        ? ['Centralized control', 'Real-time monitoring', 'Energy saving', 'Safety enhancement']
        : ['중앙 집중식 제어', '실시간 모니터링', '에너지 절약', '안전성 향상'],
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: '🏭',
      title: currentLanguage === 'en' ? 'Industrial Lighting System' : '산업용 조명시스템',
      description: currentLanguage === 'en'
        ? 'Industrial lighting control solutions for logistics, data centers, and manufacturing'
        : '물류, 데이터센터 포함, 각종 제조업의 생산성 향상을 위한 산업용 조명제어 솔루션',
      features: currentLanguage === 'en'
        ? ['High-precision lighting', 'Durable design', 'Safety standards', 'Easy maintenance']
        : ['고정밀 조명', '내구성 설계', '안전 표준 준수', '유지보수 편의성'],
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    },
    {
      icon: '🎭',
      title: currentLanguage === 'en' ? 'Cultural Facility Lighting' : '문화시설 조명예술',
      description: currentLanguage === 'en'
        ? 'Artistic lighting control systems for museums, galleries, and performance venues'
        : '박물관, 갤러리, 공연장 등 문화시설의 조명을 예술적으로 제어하는 시스템',
      features: currentLanguage === 'en'
        ? ['Color temperature control', 'Dynamic effects', 'Programming', 'Artistic expression']
        : ['색온도 조절', '다이나믹 효과', '프로그래밍', '예술적 표현'],
      gradient: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    }
  ];

  // 계열사 정보
  const subsidiaries = [
    {
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      business: currentLanguage === 'en' ? 'IoT Smart Lighting Control' : 'IoT 스마트 조명 제어',
      icon: '💡',
      description: currentLanguage === 'en'
        ? 'IoT-based smart lighting control specialist'
        : 'IoT 기반 스마트 조명 제어 전문',
      path: '/hybrid/subsidiaries/clarus',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      business: currentLanguage === 'en' ? 'Integrated Lighting & Power Control' : '조명·전력 통합 제어',
      icon: '⚡',
      description: currentLanguage === 'en'
        ? 'Partner for stable building automation since 1982'
        : '1982년부터 안정적인 빌딩 자동화의 파트너',
      path: '/hybrid/subsidiaries/jungho-tlc',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      business: currentLanguage === 'en' ? 'Industrial & Special LED Lighting' : '산업·특수 LED 조명',
      icon: '🔆',
      description: currentLanguage === 'en'
        ? 'Specialist in industrial & special LED lighting'
        : '산업·특수 LED 조명의 전문가',
      path: '/hybrid/subsidiaries/illutech',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      business: currentLanguage === 'en' ? 'Textile Machinery & Testers' : '섬유기계·시험기',
      icon: '🧵',
      description: currentLanguage === 'en'
        ? 'Bridge connecting textile industry and fashion'
        : '섬유 산업과 패션을 잇는 가교',
      path: '/hybrid/subsidiaries/jungho-texcom',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav version="hybrid" />

      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'Business Areas' : '사업분야'}
        description={currentLanguage === 'en'
          ? '40 years of lighting control expertise, Creating innovative solutions'
          : '40년간 축적된 조명제어 기술력으로 다양한 분야에서 혁신적인 솔루션을 제공합니다'}
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        height="400px"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 핵심 사업영역 */}
        <motion.section
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Core Business Areas' : '핵심 사업영역'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {currentLanguage === 'en'
                ? 'Providing innovative solutions in various fields'
                : '다양한 분야에서 혁신적인 솔루션을 제공합니다'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${area.bgColor} dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                <div className="text-6xl mb-6">{area.icon}</div>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${area.gradient} bg-clip-text text-transparent`}>
                  {area.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {area.description}
                </p>
                <ul className="space-y-2">
                  {area.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 계열사별 전문분야 */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Subsidiaries by Specialty' : '계열사별 전문분야'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {currentLanguage === 'en'
                ? '4 subsidiaries providing best solutions in each field'
                : '4개 계열사가 각각의 전문분야에서 최고의 솔루션을 제공합니다'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subsidiaries.map((sub, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => navigate(sub.path)}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{sub.icon}</div>
                <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${sub.gradient} bg-clip-text text-transparent`}>
                  {sub.name}
                </h3>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                  {sub.business}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed">
                  {sub.description}
                </p>
                <div className="mt-4 flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
                  <span className="text-sm">{currentLanguage === 'en' ? 'Learn More' : '자세히 보기'}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="mt-20 bg-gradient-to-br from-green-600 to-cyan-600 text-white rounded-2xl p-12 text-center shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {currentLanguage === 'en'
              ? 'Growing Together with Innovation'
              : '혁신과 함께 성장하는 정호그룹'}
          </h2>
          <p className="text-xl mb-8 text-green-100">
            {currentLanguage === 'en'
              ? 'Contact us for innovative business solutions'
              : '혁신적인 사업 솔루션이 필요하시면 문의해주세요'}
          </p>
          <button
            onClick={() => navigate('/hybrid/subsidiaries')}
            className="px-8 py-4 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300 shadow-lg"
          >
            {currentLanguage === 'en' ? 'View Subsidiaries' : '계열사 보기'}
          </button>
        </motion.section>
      </div>
    </div>
  );
};

export default BusinessPageHybrid;

