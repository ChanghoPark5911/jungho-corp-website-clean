import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ClarusDetailPage = () => {
  const navigate = useNavigate();

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // 주요 제품/서비스
  const products = [
    {
      name: 'Programmable Controller',
      description: 'IoT 기반 지능형 조명 제어 컨트롤러',
      icon: '🎛️'
    },
    {
      name: 'Energy Monitoring Unit',
      description: '실시간 에너지 모니터링 및 관리 시스템',
      icon: '📊'
    },
    {
      name: 'Program Switch',
      description: '사용자 맞춤형 프로그램 가능 스위치',
      icon: '🔘'
    },
    {
      name: 'Wireless Control System',
      description: '무선 기반 조명 제어 솔루션',
      icon: '📡'
    },
    {
      name: 'MAGIC CLARUS Software',
      description: '통합 조명 관리 소프트웨어',
      icon: '💻'
    },
    {
      name: 'Sensor & Wireless Unit',
      description: '스마트 센서 및 무선 통신 모듈',
      icon: '📶'
    }
  ];

  // 핵심 기술
  const technologies = [
    {
      title: 'IoT 기반 스마트 조명',
      description: '사물인터넷 기술을 활용한 지능형 조명 제어 시스템',
      icon: '🌐'
    },
    {
      title: '에너지 절감 솔루션',
      description: '최대 40% 에너지 절감 가능한 최적화 알고리즘',
      icon: '⚡'
    },
    {
      title: '40년 노하우',
      description: '1982년부터 축적된 조명 제어 기술과 경험',
      icon: '🏆'
    },
    {
      title: '통합 관리 시스템',
      description: '클라우드 기반 원격 모니터링 및 제어',
      icon: '☁️'
    }
  ];

  // 주요 실적
  const achievements = [
    '2023년 온라인 E커머스 플랫폼 구축 (Naver, Coupang)',
    '2022년 Energy Harvesting 무배선 스위치 출시',
    '2020년 Ladder-Less 원격제어 시스템 개발',
    '국제 조명 전시회 지속 참가 (미국, 일본, 중국)',
    'GS 인증, FCC 인증, ISO 인증 등 다수 획득'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* 뒤로가기 버튼 */}
        <motion.button
          className="absolute top-8 left-8 z-10 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          onClick={() => navigate('/v2/subsidiaries')}
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold text-gray-700 dark:text-gray-300">계열사 목록</span>
        </motion.button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="text-6xl mb-6 inline-block">🔆</span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              클라루스
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400"
              variants={fadeInUp}
            >
              CLARUS Co., Ltd.
            </motion.p>

            <motion.p 
              className="text-2xl sm:text-3xl text-cyan-600 dark:text-cyan-400 font-semibold max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              혁신적인 기술과 품질로 고객의 가치와 미래를 함께 만들어갑니다
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 pt-6"
              variants={fadeInUp}
            >
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">설립</span>
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">2009년</div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">사업 분야</span>
                <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">조명 제어 · IoT</div>
              </div>
              <motion.a
                href="https://www.magicclarus.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌐 웹사이트 방문
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 회사 소개 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              회사 소개
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">클라루스</span>는 
                폭넓은 제품 라인업을 바탕으로 현장 환경에 최적화된 조명·전력 제어 솔루션을 제공합니다.
              </p>
              <p>
                <span className="font-semibold">E/F2-BUS 기반의 통합제어 기술</span>과 IoT 및 유·무선 통신 기술, 
                에너지 관리 소프트웨어, 전기안전 IoT 장치 등 스마트 빌딩 관리와 에너지 절감을 위한 핵심 기술을 지속적으로 발전시켜 왔습니다.
              </p>
              <p>
                자체 시스템 소프트웨어를 개발하여 확장성과 유지관리성을 극대화하였으며, 급변하는 글로벌 기준에 부합하는 제품을 공급하고 있습니다.
              </p>
              <p>
                앞으로도 클라루스는 <span className="font-semibold text-cyan-600 dark:text-cyan-400">혁신적인 기술과 품질로 고객의 가치와 미래를 함께 만들어 가겠습니다.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 주요 제품/서비스 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              주요 제품 및 서비스
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              다양한 조명 제어 솔루션을 제공합니다
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl mb-4">{product.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 핵심 기술 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              핵심 기술
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              클라루스만의 차별화된 기술력
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-cyan-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 주요 실적 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              주요 실적
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              지속적인 혁신과 성장
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-lg flex-1">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 연락처 */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              문의하기
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg space-y-4">
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📞</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">전화:</span>
                <a href="tel:02-515-5018" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  02-515-5018
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">이메일:</span>
                <a href="mailto:clarus@junghocorp.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  clarus@junghocorp.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">🌐</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">웹사이트:</span>
                <a href="https://www.magicclarus.com" target="_blank" rel="noopener noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline">
                  www.magicclarus.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📍</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">본사:</span>
                <span className="text-gray-700 dark:text-gray-300">
                  서울시 강남구 논현로116길 17 정호빌딩 3층
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ClarusDetailPage;

