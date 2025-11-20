import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 경영방침 페이지 - Hybrid 버전
 */
const AboutManagementHybrid = () => {
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

  // 경영방침 8개 데이터
  const managementPolicies = [
    {
      id: 1,
      title: 'Customer Value First',
      subtitle: currentLanguage === 'en' ? 'Customer Value First' : '고객가치 우선',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Product & Quality',
      subtitle: currentLanguage === 'en' ? 'Product & Quality' : '제품 · 품질',
      icon: '⭐',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      title: 'Manufacturing & Supply Chain',
      subtitle: currentLanguage === 'en' ? 'Manufacturing & Supply Chain' : '제조 · 공급망',
      icon: '🏭',
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 4,
      title: 'Engineering & Service',
      subtitle: currentLanguage === 'en' ? 'Engineering & Service' : '엔지니어링 · 서비스',
      icon: '🔧',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 5,
      title: 'Global Compliance',
      subtitle: currentLanguage === 'en' ? 'Global Compliance' : '글로벌 규범 준수',
      icon: '🌏',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 6,
      title: 'Sustainability Management',
      subtitle: currentLanguage === 'en' ? 'Sustainability Management' : '지속가능경영',
      icon: '🌱',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 7,
      title: 'Ethics & Compliance',
      subtitle: currentLanguage === 'en' ? 'Ethics & Compliance' : '윤리 · 컴플라이언스',
      icon: '✅',
      color: 'from-red-500 to-rose-500',
    },
    {
      id: 8,
      title: 'People & Culture',
      subtitle: currentLanguage === 'en' ? 'People & Culture' : '사람과 문화',
      icon: '👥',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav />

      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'Management Policy' : '경영방침'}
        description={currentLanguage === 'en'
          ? 'Creating Future Value'
          : '미래의 가치 창출'}
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
        height="400px"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 인트로 */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {currentLanguage === 'en' 
              ? 'Jungho Group implements the following principles to create future value.'
              : '정호그룹은 미래 가치 창출을 위해 다음 원칙을 실행합니다.'}
          </p>
        </motion.div>

        {/* 경영방침 그리드 */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {managementPolicies.map((policy) => (
            <motion.div
              key={policy.id}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 flex flex-col h-full">
                {/* 번호 */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${policy.color} bg-clip-text text-transparent`}>
                    {String(policy.id).padStart(2, '0')}
                  </span>
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {policy.icon}
                  </div>
                </div>

                {/* 제목 (영문) */}
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  {policy.title}
                </h3>

                {/* 제목 (한글) */}
                <p className={`text-xl font-bold mb-4 bg-gradient-to-r ${policy.color} bg-clip-text text-transparent`}>
                  {policy.subtitle}
                </p>

                {/* 구분선 */}
                <div className="mt-auto pt-4 border-t-2 border-gray-200 dark:border-gray-700" />
              </div>

              {/* 하단 accent 라인 */}
              <div className={`h-1 bg-gradient-to-r ${policy.color} group-hover:h-2 transition-all duration-300`} />
            </motion.div>
          ))}
        </motion.section>

        {/* 하단 CTA */}
        <motion.section 
          className="mt-20 bg-gradient-to-br from-green-600 to-cyan-600 text-white rounded-2xl p-12 text-center shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {currentLanguage === 'en' 
              ? 'Jungho Group Practices Principles and Values'
              : '원칙과 가치를 실천하는 정호그룹'}
          </h2>
          <p className="text-xl text-green-100">
            {currentLanguage === 'en'
              ? 'Providing sustainable value to customers and society'
              : '고객과 사회에 지속가능한 가치를 제공합니다'}
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutManagementHybrid;

