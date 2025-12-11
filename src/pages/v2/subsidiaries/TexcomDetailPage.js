import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';

/**
 * 정호텍스컴 메인 페이지
 * 회사 소개 + 사업부 선택 (섬유기계 / RSS)
 */
const TexcomDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage } = useI18n();

  // 현재 경로가 Hybrid인지 확인
  const isHybrid = location.pathname.startsWith('/hybrid');
  const basePath = isHybrid ? '/hybrid/subsidiaries/jungho-texcom' : '/subsidiaries/jungho-texcom';
  const backPath = isHybrid ? '/hybrid' : '/';

  // 애니메이션 (클라루스와 동일하게 속도 최적화)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } }
  };

  // 사업부 데이터
  const divisions = [
    {
      id: 'textile',
      name: currentLanguage === 'en' ? 'Textile Machinery Division' : '섬유기계 사업부',
      description: currentLanguage === 'en'
        ? 'Exclusive supply of world-class textile machinery and testing equipment from Germany, Switzerland, Austria, Japan, UK, etc.'
        : '독일, 스위스, 오스트리아, 일본, 영국 등 세계적인 섬유기계 및 시험기 독점 공급',
      icon: '🏭',
      gradient: 'from-blue-500 to-indigo-600',
      path: `${basePath}/textile`
    },
    {
      id: 'rss',
      name: currentLanguage === 'en' ? 'RSS Division' : 'RSS 사업부',
      description: currentLanguage === 'en'
        ? 'Premium fashion brand business with REDSSOCKSOO and GUBBE'
        : 'REDSSOCKSOO, GUBBE 프리미엄 패션 브랜드 사업',
      icon: '👔',
      gradient: 'from-amber-500 to-orange-600',
      path: `${basePath}/rss`
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - 클라루스와 동일한 스타일 */}
      <motion.section 
        className="relative pt-32 pb-20 bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 뒤로가기 버튼 */}
        <motion.button
          className="absolute top-24 left-8 z-10 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 border border-gray-200 dark:border-gray-700"
          onClick={() => navigate(backPath)}
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {currentLanguage === 'en' ? 'Back' : '돌아가기'}
          </span>
        </motion.button>

        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* 로고와 회사명 */}
          <motion.div
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-4">
              <img 
                src="/images/logos/junghotexcom.png" 
                alt="JUNGHOTEXCOM" 
                className="h-14 sm:h-18 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                {currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴'}
              </h1>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-lg text-gray-500 dark:text-gray-400">
              Jungho TEXCOM Co., Ltd.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* 슬로건 & 회사 소개 */}
      <motion.section 
        className="py-16 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-400 mb-8"
          >
            {currentLanguage === 'en' 
              ? 'Bridging Textile Industry and Fashion'
              : '섬유 산업과 패션을 잇는 ㈜정호텍스컴'}
          </motion.h2>

          <motion.div variants={fadeInUp} className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              {currentLanguage === 'en'
                ? 'Since 1982, Jungho TEXCOM has been contributing to the development of the textile industry by exclusively supplying world-class textile machinery and testing equipment in Korea.'
                : '1982년 설립 이후, 세계적인 섬유기계 및 시험기를 국내에 독점 공급하며 섬유 산업의 발전에 기여해온 ㈜정호텍스컴.'}
            </p>
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              {currentLanguage === 'en'
                ? 'Now, based on our B2B experience, we are expanding into the fashion B2C sector, creating the future of textiles and fashion together.'
                : '이제 B2B 경험을 바탕으로 패션 B2C 분야까지 확장하며, 섬유와 패션의 미래를 함께 만들어갑니다.'}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 사업부 소개 카드 - 클라루스 스타일 */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Our Divisions' : '사업부 소개'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? 'Two specialized divisions leading the textile and fashion industry'
                : '섬유와 패션 산업을 이끄는 2개의 전문 사업부'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {divisions.map((division) => (
              <motion.div
                key={division.id}
                variants={fadeInUp}
                onClick={() => navigate(division.path)}
                className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* 헤더 */}
                <div className={`bg-gradient-to-r ${division.gradient} px-6 py-8 text-center`}>
                  <span className="text-6xl mb-4 block">{division.icon}</span>
                  <h3 className="text-2xl font-bold text-white">
                    {division.name}
                  </h3>
                </div>
                
                {/* 본문 */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed">
                    {division.description}
                  </p>
                  <button className={`w-full py-3 bg-gradient-to-r ${division.gradient} text-white font-semibold rounded-lg group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}>
                    {currentLanguage === 'en' ? 'View Details' : '자세히 보기'}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 핵심 강점 섹션 - 연분홍/연보라 배경 */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            {currentLanguage === 'en' ? 'Core Strengths' : '핵심 강점'}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 글로벌 파트너십 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? 'Global Partnership' : '글로벌 파트너십'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Exclusive supply from Germany, Switzerland, Austria, Japan, UK'
                  : '독일, 스위스, 오스트리아, 일본, 영국 등 세계 유수 브랜드 독점 공급'}
              </p>
            </motion.div>

            {/* 40년 경험 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? '40+ Years Experience' : '40년 경험'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Professional expertise accumulated since 1982'
                  : '1982년부터 축적된 섬유 산업 전문성과 기술력'}
              </p>
            </motion.div>

            {/* 원스톱 서비스 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? 'One-Stop Service' : '원스톱 서비스'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Consultation, import, installation, training, maintenance'
                  : '상담, 수입, 납품, 설치, 교육, 유지보수까지 통합 지원'}
              </p>
            </motion.div>

            {/* B2B에서 B2C로 */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {currentLanguage === 'en' ? 'B2B to B2C' : 'B2B에서 B2C로'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Expanding into fashion based on textile expertise'
                  : '섬유 기계 전문성을 바탕으로 패션까지 확장'}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 제품 문의 및 기술지원 안내 섹션 - 수평 압축 레이아웃 */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-white to-pink-50 dark:from-gray-900 dark:to-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
          >
            {currentLanguage === 'en' ? 'Product Inquiry & Technical Support' : '제품 문의 및 기술지원 안내'}
          </motion.h2>

          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* 연락처 정보 - 2x3 그리드 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-b border-gray-100 dark:border-gray-700">
              {/* 전화 */}
              <div className="p-5 border-r border-b md:border-b-0 border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Phone' : '전화'}</p>
                  <a href="tel:02-538-3652" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">02-538-3652</a>
                </div>
              </div>

              {/* 팩스 */}
              <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📠</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Fax' : '팩스'}</p>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">02-553-4161</span>
                </div>
              </div>

              {/* 이메일 */}
              <div className="p-5 border-r md:border-r-0 border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Email' : '이메일'}</p>
                  <a href="mailto:sales@junghocorp.com" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">sales@junghocorp.com</a>
                </div>
              </div>

              {/* 웹사이트 */}
              <div className="p-5 border-r border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Website' : '웹사이트'}</p>
                  <a href="http://www.theautofinder.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">www.theautofinder.com</a>
                </div>
              </div>

              {/* 본사 */}
              <div className="p-5 border-r border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Headquarters' : '본사'}</p>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Jungho Bldg, Gangnam-gu, Seoul' : '서울 강남구 논현로116길 17 정호빌딩 3층'}
                  </span>
                </div>
              </div>

              {/* 영업시간 */}
              <div className="p-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🕐</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Hours' : '영업시간'}</p>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Mon-Fri 9AM-6PM' : '평일 09:00 - 18:00'}
                  </span>
                </div>
              </div>
            </div>

            {/* 기술지원 안내 - 수평 레이아웃 */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🛠️</span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentLanguage === 'en' ? 'Technical Support' : '기술지원 안내'}
                </h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? 'Installation & Training' : '장비 설치 및 교육'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? 'Regular Maintenance' : '정기 유지보수'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? 'Genuine Parts Supply' : '정품 부품 공급'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400">✓</span>
                  {currentLanguage === 'en' ? '24/7 Emergency Support' : '24시간 긴급지원'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 하단 여백 */}
      <div className="h-12 bg-white dark:bg-gray-900"></div>
    </div>
  );
};

export default TexcomDetailPage;
