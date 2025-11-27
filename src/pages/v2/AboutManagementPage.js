import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 경영방침 페이지 - Classic/Hybrid 공용
 */
const AboutManagementPage = () => {
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  
  // 현재 경로가 classic 또는 hybrid인지 확인
  const isClassic = location.pathname.startsWith('/classic');
  const isHybrid = location.pathname.startsWith('/hybrid');
  const version = isHybrid ? 'hybrid' : isClassic ? 'classic' : 'v2';
  // 애니메이션 variants
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
        staggerChildren: 0
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

  // 순수 콘텐츠 (레이아웃 제외)
  const content = (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="relative pt-32 pb-16 bg-gradient-to-br from-primary-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
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
            {currentLanguage === 'en' ? 'MANAGEMENT POLICY' : '경영방침'}
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'en' ? 'Management Policy' : '경영방침'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-cyan-500 mx-auto rounded-full mb-8" />
            
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-8">
              {currentLanguage === 'en' ? 'Creating Future Value' : '미래의 가치 창출'}
            </h2>

            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
              {currentLanguage === 'en' 
                ? 'Jungho Group implements the following principles to create future value.'
                : '정호그룹은 미래 가치 창출을 위해 다음 원칙을 실행합니다.'}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 경영방침 그리드 */}
      <motion.section 
        className="pt-16 pb-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {managementPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
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
                  <div className={`mt-auto pt-4 border-t-2 border-gradient-to-r ${policy.color} opacity-20`} />
                </div>

                {/* 하단 accent 라인 */}
                <div className={`h-1 bg-gradient-to-r ${policy.color} group-hover:h-2 transition-all duration-300`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 하단 CTA */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {currentLanguage === 'en' 
              ? 'Jungho Group Practices Principles and Values'
              : '원칙과 가치를 실천하는 정호그룹'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {currentLanguage === 'en'
              ? 'Providing sustainable value to customers and society'
              : '고객과 사회에 지속가능한 가치를 제공합니다'}
          </p>
        </div>
      </motion.section>
    </div>
  );

  // Hybrid 버전: 레이아웃 없이 콘텐츠만 반환 (HybridLayout이 App.js에서 적용됨)
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
        title={currentLanguage === 'en' ? 'Management Policy' : '경영방침'}
        description={currentLanguage === 'en' 
          ? 'Our core management principles guiding sustainable growth'
          : '지속가능한 성장을 이끄는 핵심 경영 원칙'
        }
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
        height="400px"
      />
      
      <TraditionalLayout showSidebar={true} category="about" version={version}>
        {content}
      </TraditionalLayout>
    </div>
  );
};

export default AboutManagementPage;

