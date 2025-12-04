import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * 지적재산권 페이지
 * 정호그룹의 특허, 디자인, 소프트웨어 등록 현황
 */
const IntellectualPropertyPage = () => {
  const { t, currentLanguage } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 현재 경로에 따라 버전 prefix 결정
  const getPrefix = () => {
    if (location.pathname.startsWith('/hybrid')) return '/hybrid';
    if (location.pathname.startsWith('/classic')) return '/classic';
    return '/v2';
  };
  const prefix = getPrefix();

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
        staggerChildren: 0.1
      }
    }
  };

  // 지적재산권 통계
  const intellectualPropertyStats = {
    total: 140,
    patents: 85,
    designs: 35,
    software: 20
  };

  // 주요 지적재산권 인증서
  const intellectualPropertyCertificates = [
    {
      id: 'ip1',
      title: '굿디자인_TLS 4\' (CRC3303 - CRC3305)',
      category: currentLanguage === 'en' ? 'Design' : '디자인',
      description: '제 30-0882500, 녹색 부착형 터치 스위치 디자인등록증',
      thumbnail: '🎨',
      date: '2015-04-20'
    },
    {
      id: 'ip2',
      title: '산업융합 선도기업 선정서',
      category: currentLanguage === 'en' ? 'Certification' : '인증',
      description: '스마트 조명 선도기업 선정 (산업통상자원부)',
      thumbnail: '🏅',
      date: '2017-12-22'
    },
    {
      id: 'ip3',
      title: '에너지 에이터널 1.0',
      category: currentLanguage === 'en' ? 'Software' : '소프트웨어',
      description: '터엣에스 에이터널 1.0 (에너지 매니저 V4.1)',
      thumbnail: '💻',
      date: '2017-11-15'
    },
    {
      id: 'ip4',
      title: '유무선 통합 Energy Manager 4.1',
      category: currentLanguage === 'en' ? 'Software' : '소프트웨어',
      description: '에너지 관리 소프트웨어 등록증',
      thumbnail: '📱',
      date: '2017-10-25'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
            variants={fadeInUp}
          >
            <span className="text-5xl">🏆</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeInUp}
          >
            {currentLanguage === 'en' ? 'Intellectual Property' : '지적재산권'}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {currentLanguage === 'en' 
              ? 'Over 140 intellectual properties proving Jungho Group\'s technology'
              : '정호그룹의 기술력을 입증하는 140여 개의 지적재산권'}
          </motion.p>
        </motion.div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 제목 */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Jungho Group IP Status' : '정호그룹 지적재산권 현황'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? 'Over 140 intellectual properties proving our technology'
                : '정호그룹의 기술력을 입증하는 140여 개의 지적재산권'}
            </p>
          </motion.div>

          {/* 통계 카드 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-2xl p-8 text-center shadow-lg"
            >
              <div className="text-5xl mb-3">📊</div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {intellectualPropertyStats.total}+
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200">
                {currentLanguage === 'en' ? 'Total IP' : '총 지적재산권'}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-8 text-center shadow-lg"
            >
              <div className="text-5xl mb-3">🔬</div>
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {intellectualPropertyStats.patents}
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200">
                {currentLanguage === 'en' ? 'Patents' : '특허'}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-2xl p-8 text-center shadow-lg"
            >
              <div className="text-5xl mb-3">🎨</div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {intellectualPropertyStats.designs}
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200">
                {currentLanguage === 'en' ? 'Designs' : '디자인'}
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl p-8 text-center shadow-lg"
            >
              <div className="text-5xl mb-3">💻</div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {intellectualPropertyStats.software}
              </div>
              <div className="text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200">
                {currentLanguage === 'en' ? 'Software' : '소프트웨어'}
              </div>
            </motion.div>
          </motion.div>

          {/* 주요 인증서 갤러리 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {currentLanguage === 'en' ? 'Major Certifications & Registrations' : '주요 인증 및 등록'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {intellectualPropertyCertificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-5xl mb-4 text-center">{cert.thumbnail}</div>
                  <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold mb-3">
                    {cert.category}
                  </div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {cert.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(cert.date).toLocaleDateString('ko-KR')}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 안내 메시지 */}
          <motion.div
            className="mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-4xl mb-4">📄</div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Complete IP List' : '전체 지적재산권 목록'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {currentLanguage === 'en' ? (
                <>
                  The complete list of 140+ intellectual properties owned by Jungho Group<br />
                  can be confirmed through separate inquiry.
                </>
              ) : (
                <>
                  정호그룹이 보유한 140여 개의 지적재산권 전체 목록은<br />
                  별도 문의를 통해 확인하실 수 있습니다.
                </>
              )}
            </p>
            <button 
              onClick={() => navigate(`${prefix}/support/contact`)}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              <span>{currentLanguage === 'en' ? 'Contact Us' : '문의하기'}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IntellectualPropertyPage;

