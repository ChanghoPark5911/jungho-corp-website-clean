import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 그룹비전 (IRGS) 페이지 - Classic/Hybrid 공용
 */
const AboutVisionPage = () => {
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

  // IRGS 데이터
  const irgsValues = [
    {
      id: 'innovation',
      title: 'INNOVATION',
      subtitle: currentLanguage === 'en' ? 'Innovation' : '혁신',
      description: currentLanguage === 'en' 
        ? 'Creating better "experiences" with new ideas and technology.'
        : '새로운 생각과 기술로 더 나은 "경험"을 만듭니다.',
      icon: '💡',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'reliability',
      title: 'RELIABILITY',
      subtitle: currentLanguage === 'en' ? 'Reliability' : '신뢰',
      description: currentLanguage === 'en'
        ? 'Keeping quality and promises, enhancing the "value of relationships".'
        : '품질과 약속을 지키는 것, "관계의 가치"를 높입니다.',
      icon: '🤝',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      id: 'global',
      title: 'GLOBAL',
      subtitle: currentLanguage === 'en' ? 'Global' : '글로벌',
      description: currentLanguage === 'en'
        ? 'Expanding global "competitiveness" with leading technology and services.'
        : '국제 기준을 선도하는 기술력과 서비스로 글로벌 "경쟁력"을 확장합니다.',
      icon: '🌏',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'sustainability',
      title: 'SUSTAINABILITY',
      subtitle: currentLanguage === 'en' ? 'Sustainability' : '지속가능성',
      description: currentLanguage === 'en'
        ? 'Designing a sustainable "tomorrow" where humans and nature coexist.'
        : '인간과 자연이 함께 공존할 수 있도록 지속가능한 "내일"을 설계합니다.',
      icon: '🌱',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TraditionalNav version={version} />
      
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'Vision & Mission (IRGS)' : '그룹비전 (IRGS)'}
        description={currentLanguage === 'en' 
          ? 'Innovation, Reliability, Green, Service - Our core values'
          : '혁신, 신뢰, 친환경, 서비스 - 정호그룹의 핵심 가치'
        }
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
        height="400px"
      />
      
      <TraditionalLayout showSidebar={true} category="about" version={version}>
        <div>
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'en' ? 'Group Vision' : '그룹비전'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-cyan-500 mx-auto rounded-full mb-8" />
            
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-8">
              {currentLanguage === 'en' ? 'Technology with precision, Experience with beauty' : '기술은 정확하게, 경험은 아름답게'}
            </h2>

            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {currentLanguage === 'en' ? (
                <>Jungho Group prepares for the next leap toward a sustainable world based on <strong>IRGS</strong> (Innovation · Reliability · Global · Sustainability).</>
              ) : (
                <>정호그룹은 <strong>IRGS</strong>(Innovation · Reliability · Global · Sustainability)를 기반으로 지속가능한 세상을 위한 다음 도약을 준비합니다.</>
              )}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* IRGS 카드 */}
      <motion.section 
        className="py-12 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {irgsValues.map((value, index) => (
              <motion.div
                key={value.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className={`
                  relative overflow-hidden rounded-2xl shadow-xl
                  ${value.bgColor} dark:bg-gray-800
                  transition-all duration-300
                `}
              >
                <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
                  {/* 왼쪽: 아이콘 */}
                  <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-12">
                    <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center">
                      <span className="text-6xl">{value.icon}</span>
                    </div>
                  </div>

                  {/* 오른쪽: 텍스트 */}
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
                      <h3 className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                        {value.title}
                      </h3>
                      <span className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-400">
                        ㅣ {value.subtitle}
                      </span>
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>

                {/* 하단 accent 라인 */}
                <div className={`h-2 bg-gradient-to-r ${value.color}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 하단 CTA */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-primary-600 to-cyan-600 text-white"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {currentLanguage === 'en' 
              ? 'Innovation for a Sustainable Future'
              : '지속가능한 미래를 위한 혁신'}
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            {currentLanguage === 'en'
              ? 'Create a better tomorrow together with Jungho Group'
              : '정호그룹과 함께 더 나은 내일을 만들어가세요'}
          </p>
        </div>
      </motion.section>
        </div>
      </TraditionalLayout>
    </div>
  );
};

export default AboutVisionPage;

