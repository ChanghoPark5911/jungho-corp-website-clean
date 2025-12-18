import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';

/**
 * ABOUT 메인 페이지
 * 6개의 아름다운 카드 그리드로 구성
 */
const AboutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  
  // 현재 경로에 따라 버전 prefix 결정
  const getPrefix = () => {
    if (location.pathname.startsWith('/hybrid')) return '/hybrid';
    if (location.pathname.startsWith('/classic')) return '/classic';
    return '/v2';
  };
  const prefix = getPrefix();

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
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
        staggerChildren: 0
      }
    }
  };

  // 6개 카드 데이터 - 다국어 지원
  const aboutSections = [
    {
      id: 'intro',
      title: currentLanguage === 'en' ? 'Company Introduction' : '정호그룹 소개',
      description: currentLanguage === 'en' 
        ? '40 years of lighting control expertise\nIntroducing Jungho Group'
        : '40년 전통의 조명 제어 전문 기업\n정호그룹을 소개합니다',
      icon: '👋',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      path: '/about/intro',
    },
    {
      id: 'vision',
      title: currentLanguage === 'en' ? 'Group Vision (IRGS)' : '그룹비전 (IRGS)',
      description: currentLanguage === 'en'
        ? 'Innovation, Reliability, Global,\nSustainability - Core values of Jungho Group'
        : 'Innovation, Reliability, Global,\nSustainability 정호그룹의 핵심가치',
      icon: '🎯',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      path: '/about/vision',
    },
    {
      id: 'management',
      title: currentLanguage === 'en' ? 'Management Policy' : '경영방침',
      description: currentLanguage === 'en'
        ? 'Customer satisfaction, technology innovation,\nand sustainable growth philosophy'
        : '고객만족, 기술혁신, 지속성장을 위한\n정호그룹의 경영철학',
      icon: '📋',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      path: '/about/management',
    },
    {
      id: 'ci',
      title: 'CI/BI',
      description: currentLanguage === 'en'
        ? 'Discover Jungho Group\'s brand identity\nand corporate image'
        : '정호그룹의 브랜드 아이덴티티와\n기업 이미지를 확인하세요',
      icon: '🎨',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      path: '/about/ci',
    },
    {
      id: 'history',
      title: 'HISTORY',
      description: currentLanguage === 'en'
        ? 'From 1985 to present\nJungho Group\'s growth journey'
        : '1985년부터 현재까지\n정호그룹의 성장 여정',
      icon: '📅',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      iconBg: 'bg-indigo-100',
      path: '/about/history',
    },
    {
      id: 'location',
      title: currentLanguage === 'en' ? 'Location' : '찾아오시는길',
      description: currentLanguage === 'en'
        ? 'Jungho Group headquarters location\nand contact information'
        : '정호그룹 본사 위치 및\n연락처 정보',
      icon: '📍',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      iconBg: 'bg-teal-100',
      path: '/about/location',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* ABOUT 이정표 - 오른쪽 상단 */}
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
            {currentLanguage === 'en' ? 'ABOUT' : '회사소개'}
          </div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-600 dark:text-primary-400 mb-6">
              {currentLanguage === 'en' ? 'Jungho Group' : '정호그룹'}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {currentLanguage === 'en' ? (
                <>
                  40 years of innovative lighting technology,
                  <br />
                  Creating a brighter future
                </>
              ) : (
                <>
                  혁신적인 조명 기술로 40년,
                  <br />
                  더 밝은 미래를 만들어가는 정호그룹입니다
                </>
              )}
            </p>
          </motion.div>

          {/* 구분선 */}
          <motion.div 
            className="mt-12 w-24 h-1 bg-gradient-to-r from-primary-600 to-cyan-500 mx-auto rounded-full"
            variants={fadeInUp}
          />
        </div>
      </motion.section>

      {/* 6개 카드 그리드 */}
      <motion.section 
        className="py-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutSections.map((section) => (
              <motion.div
                key={section.id}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onClick={() => navigate(section.path)}
                className={`
                  relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl
                  transition-all duration-300 cursor-pointer group
                  ${section.bgColor} dark:bg-gray-800
                `}
              >
                {/* 카드 내용 */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* 아이콘 */}
                  <div className={`
                    w-20 h-20 rounded-2xl ${section.iconBg} dark:bg-gray-700
                    flex items-center justify-center mb-6
                    transform group-hover:rotate-12 group-hover:scale-110
                    transition-all duration-300
                  `}>
                    <span className="text-4xl">{section.icon}</span>
                  </div>

                  {/* 제목 */}
                  <h3 className={`
                    text-2xl font-bold mb-4
                    bg-gradient-to-r ${section.color} bg-clip-text text-transparent
                  `}>
                    {section.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-gray-600 dark:text-gray-200 leading-relaxed whitespace-pre-line flex-grow">
                    {section.description}
                  </p>

                  {/* 화살표 */}
                  <div className="mt-6 flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>{currentLanguage === 'en' ? 'Learn More' : '자세히 보기'}</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* 호버 시 그라데이션 효과 */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-10
                  bg-gradient-to-br ${section.color}
                  transition-opacity duration-300
                `} />

                {/* 카드 테두리 효과 */}
                <div className={`
                  absolute inset-0 rounded-2xl
                  ring-2 ring-transparent group-hover:ring-current
                  bg-gradient-to-r ${section.color}
                  opacity-0 group-hover:opacity-50
                  transition-opacity duration-300
                `} style={{ WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '2px' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 하단 CTA */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {currentLanguage === 'en' 
              ? 'Need more information?' 
              : '더 자세한 정보가 필요하신가요?'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 mb-8">
            {currentLanguage === 'en'
              ? 'Please contact us if you have any questions about Jungho Group'
              : '정호그룹에 대해 궁금하신 점이 있으시면 언제든 문의해주세요'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              onClick={() => navigate(`${prefix}/support/contact`)}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage === 'en' ? 'Contact Us' : '문의하기'}
            </motion.button>
            <motion.button
              onClick={() => navigate(`${prefix}/subsidiaries`)}
              className="px-8 py-4 bg-white hover:bg-gray-100 text-primary-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage === 'en' ? 'View Subsidiaries' : '계열사 보기'}
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;

