import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 미디어 센터 허브 페이지 - V2 & Hybrid 공용
 */
const MediaPageHybrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage } = useI18n();

  // 현재 경로에 따라 버전 결정 (catch-all LayoutV2는 prefix 없음)
  const isHybrid = location.pathname.startsWith('/hybrid');
  const isClassic = location.pathname.startsWith('/classic');
  const isStandaloneNav = isHybrid || isClassic;
  const basePath = isHybrid
    ? '/hybrid'
    : isClassic
      ? '/classic'
      : location.pathname.startsWith('/v2')
        ? '/v2'
        : '';

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

  // 미디어 섹션 (경로는 현재 버전에 맞게 동적 설정)
  // 뉴스는 MegaMenu와 동일하게 /news 경로 사용
  const mediaSections = [
    {
      id: 'news',
      title: currentLanguage === 'en' ? 'News' : '뉴스',
      description: currentLanguage === 'en'
        ? 'Latest news and updates from Jungho Group'
        : '정호그룹의 최신 소식과 업데이트',
      icon: '📰',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      path: `${basePath}/news`,
    },
    {
      id: 'promotion',
      title: currentLanguage === 'en' ? 'Promotion Materials' : '홍보자료',
      description: currentLanguage === 'en'
        ? 'Company brochures, catalogs, and promotional materials'
        : '회사 브로셔, 카탈로그 및 홍보 자료',
      icon: '📑',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      path: `${basePath}/media/promotion`,
    },
    {
      id: 'sns',
      title: 'SNS',
      description: currentLanguage === 'en'
        ? 'Connect with us on social media'
        : 'SNS에서 정호그룹과 소통하세요',
      icon: '📱',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      path: `${basePath}/media/sns`,
    },
    {
      id: 'technical',
      title: currentLanguage === 'en' ? 'Technical Documents' : '기술자료',
      description: currentLanguage === 'en'
        ? 'Technical specifications and documentation'
        : '기술 사양 및 문서',
      icon: '📋',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      path: `${basePath}/media/technical-docs`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* LayoutV2/HybridLayout 안에 이미 네비가 있으므로 standalone 경로에서만 표시 */}
      {isStandaloneNav && (
        <TraditionalNav version={isHybrid ? 'hybrid' : 'classic'} />
      )}

      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'Media Center' : '미디어 센터'}
        description={currentLanguage === 'en'
          ? 'News, promotional materials, and more'
          : '뉴스, 홍보자료 등 다양한 미디어 콘텐츠'}
        backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
        height="400px"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {mediaSections.map((section) => (
            <motion.div
              key={section.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => navigate(section.path)}
              className={`${section.bgColor} dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{section.icon}</div>
              <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                {section.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {section.description}
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
                <span>{currentLanguage === 'en' ? 'View' : '보기'}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MediaPageHybrid;
