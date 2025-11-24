import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 그룹비전 (IRGS) 페이지 - Hybrid 버전
 */
const AboutVisionHybrid = () => {
  const { currentLanguage } = useI18n();

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
        staggerChildren: 0.15
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 전통적 네비게이션 */}
      <TraditionalNav version="hybrid" />

      {/* 작은 배너 */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'Group Vision (IRGS)' : '그룹비전 (IRGS)'}
        description={currentLanguage === 'en'
          ? 'Technology with precision, Experience with beauty'
          : '기술은 정확하게, 경험은 아름답게'
        }
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
        height="400px"
      />

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 인트로 텍스트 */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {currentLanguage === 'en' ? (
              <>Jungho Group prepares for the next leap toward a sustainable world based on <strong>IRGS</strong> (Innovation · Reliability · Global · Sustainability).</>
            ) : (
              <>정호그룹은 <strong>IRGS</strong>(Innovation · Reliability · Global · Sustainability)를 기반으로 지속가능한 세상을 위한 다음 도약을 준비합니다.</>
            )}
          </p>
        </motion.div>

        {/* IRGS 카드 */}
        <motion.section 
          className="space-y-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {irgsValues.map((value, index) => (
            <motion.div
              key={value.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className={`
                relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl
                ${value.bgColor} dark:bg-gray-800
                transition-all duration-300
              `}
            >
              <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
                {/* 왼쪽: 아이콘 */}
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-12">
                  <div className="w-32 h-32 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
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
              ? 'Innovation for a Sustainable Future'
              : '지속가능한 미래를 위한 혁신'}
          </h2>
          <p className="text-xl mb-8 text-green-100">
            {currentLanguage === 'en'
              ? 'Create a better tomorrow together with Jungho Group'
              : '정호그룹과 함께 더 나은 내일을 만들어가세요'}
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutVisionHybrid;

