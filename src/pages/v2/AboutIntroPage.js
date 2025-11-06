import React from 'react';
import { motion } from 'framer-motion';

/**
 * 정호그룹 소개 페이지
 */
const AboutIntroPage = () => {
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
        staggerChildren: 0.2
      }
    }
  };

  // 계열사 데이터
  const subsidiaries = [
    {
      name: '정호티엘씨',
      role: '빌딩 자동화 및 전력 제어 솔루션',
      icon: '⚡',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: '클라루스',
      role: '조명 제어 시스템 및 스마트 솔루션',
      icon: '💡',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: '일루텍',
      role: '산업용 LED 조명 개발 및 제조',
      icon: '🔆',
      color: 'from-orange-500 to-amber-500'
    },
    {
      name: '정호텍스컴',
      role: '섬유기계 및 패션 사업',
      icon: '🧵',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'RSS 사업부',
      role: '설비기계 및 산업 솔루션',
      icon: '🔧',
      color: 'from-gray-600 to-gray-800'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              정호그룹 소개
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          {/* 소개 문구 */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12"
            variants={fadeInUp}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                정호그룹은 <strong className="text-primary-600 dark:text-primary-400">1982년 설립</strong>된 이래 조명제어, LED, 산업설비의 개발 · 제조 · 엔지니어링을 중심으로 사람과 공간, 에너지를 효율적으로 연결하는 종합기술 그룹으로 성장하여 왔으며, 국내는 물론 북미, 유럽, 아시아 시장에서도 그 기술력을 인정받고 있습니다.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                또한, 저희는 단순한 기술기업을 넘어, <strong className="text-primary-600 dark:text-primary-400">지속 가능한 에너지 관리와 스마트 빌딩 생태계 구축</strong>을 선도하기 위해 Zero Energy Building, IoT 기반 조명제어, Energy Harvesting 등 미래형 기술 개발에 집중하고 있으며, 다양한 솔루션 제공을 통해 사람과 환경이 공존하는 스마트한 공간을 실현하고자 노력하고 있습니다.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                앞으로도 정호그룹은 혁신적인 기술력과 진정성 있는 서비스로 고객의 신뢰에 보답하며, <strong className="text-primary-600 dark:text-primary-400">대한민국을 대표하는 종합 솔루션 전문 그룹</strong>으로서 세계 시장을 향해 도약하겠습니다.
              </p>

              <p className="text-right text-gray-600 dark:text-gray-400 font-medium">
                감사합니다.
                <br />
                <span className="text-primary-600 dark:text-primary-400 font-bold">정호그룹 임직원 일동</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 계열사 소개 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              정호그룹 계열사
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              전문화된 기술력으로 다양한 솔루션을 제공합니다
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsidiaries.map((company, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  {/* 아이콘 */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">{company.icon}</span>
                  </div>

                  {/* 회사명 */}
                  <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${company.color} bg-clip-text text-transparent`}>
                    {company.name}
                  </h3>

                  {/* 역할 */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {company.role}
                  </p>
                </div>

                {/* 하단 accent 라인 */}
                <div className={`h-1 bg-gradient-to-r ${company.color}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 주요 수치 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                1982
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                설립년도
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                5+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                계열사
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                40+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                년 경험
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                글로벌
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                시장 진출
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutIntroPage;

