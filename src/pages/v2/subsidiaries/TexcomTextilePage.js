import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';

/**
 * 정호텍스컴 - 섬유기계 사업부 페이지
 * Textile Machinery Division
 */
const TexcomTextilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage } = useI18n();

  const isHybrid = location.pathname.startsWith('/hybrid');
  const backPath = isHybrid ? '/hybrid/subsidiaries/jungho-texcom' : '/subsidiaries/jungho-texcom';

  // 애니메이션
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // 섬유기계 파트너사 데이터
  const textileMachinery = [
    {
      country: '🇩🇪',
      countryName: currentLanguage === 'en' ? 'Germany' : '독일',
      name: 'SAURER.',
      nameColor: 'text-red-600',
      url: 'https://saurer.com',
      description: currentLanguage === 'en' 
        ? 'Industrial textile twisting machines for tire cords, carpet, spun yarn, polyester fiber'
        : '타이어코드, 카페트, 방적사, 우리섬유, 산업용 섬유 연사기 제조업체'
    },
    {
      country: '🇩🇪',
      countryName: currentLanguage === 'en' ? 'Germany' : '독일',
      name: 'BENNINGER',
      nameColor: 'text-blue-700',
      url: 'http://www.benningergroup.com/',
      description: currentLanguage === 'en'
        ? 'Fabric heat treatment line manufacturer (for tire cord)'
        : '직물 열처리 Line 제조업체(타이어 코드用)'
    },
    {
      country: '🇨🇭',
      countryName: currentLanguage === 'en' ? 'Switzerland' : '스위스',
      name: 'Luwa',
      nameColor: 'text-cyan-600',
      url: 'http://www.luwa.com',
      description: currentLanguage === 'en'
        ? 'Air conditioning equipment for cotton & synthetic fiber spinning'
        : '면방, 합성용 공조 설비 제조업체'
    },
    {
      country: '🇨🇭',
      countryName: currentLanguage === 'en' ? 'Switzerland' : '스위스',
      name: 'Bräcker',
      nameColor: 'text-red-700',
      url: 'http://www.bracker.ch',
      description: currentLanguage === 'en'
        ? 'Rings and Travellers for spinning frames, BERKOL Cots, Apron'
        : '정방기用 Ring, Traveller 제조 BERKOL Cots, Apron 및 유지보수 기계류 제조'
    },
    {
      country: '🇬🇧',
      countryName: currentLanguage === 'en' ? 'UK' : '영국',
      name: 'CYGNET TEKKIMP',
      nameColor: 'text-gray-700 dark:text-gray-300',
      url: 'http://www.cygnet-tekkimp.com',
      description: currentLanguage === 'en'
        ? 'Loom creel manufacturer (tire cord, glass fiber, carbon fiber)'
        : '직기 Creel 제조업체(타이어코드, 유리섬유, Carbon fiber)'
    }
  ];

  // 시험기 파트너사 데이터
  const testingEquipment = [
    {
      country: '🇩🇪',
      countryName: currentLanguage === 'en' ? 'Germany' : '독일',
      name: 'TEXTECHNO',
      nameColor: 'text-gray-800 dark:text-gray-200',
      url: 'www.textechno.com',
      description: currentLanguage === 'en' ? 'Various textile testing equipment' : '섬유용 각종 시험장비'
    },
    {
      country: '🇦🇹',
      countryName: currentLanguage === 'en' ? 'Austria' : '오스트리아',
      name: 'LENZING',
      nameColor: 'text-gray-800 dark:text-gray-200',
      url: 'www.lenzing-instruments.com',
      description: currentLanguage === 'en' ? 'Various textile testing equipment' : '섬유용 각종 시험장비'
    },
    {
      country: '🇯🇵',
      countryName: currentLanguage === 'en' ? 'Japan' : '일본',
      name: 'KATO TECH',
      nameColor: 'text-gray-800 dark:text-gray-200',
      url: 'www.keskato.co.jp',
      description: currentLanguage === 'en' ? 'Various testing instruments' : '각종 시험기기'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="relative pt-28 pb-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 뒤로가기 */}
        <motion.button
          className="absolute top-24 left-8 z-10 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200 dark:border-gray-700"
          onClick={() => navigate(backPath)}
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {currentLanguage === 'en' ? 'Back' : '정호텍스컴'}
          </span>
        </motion.button>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 사업부 정보 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🏭</span>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    {currentLanguage === 'en' ? 'Textile Machinery Division' : '섬유기계 사업부'}
                  </h1>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    Textile Machinery Division
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentLanguage === 'en'
                  ? 'Importing and supplying world-class textile machinery and testing equipment from Germany, Switzerland, Austria, Japan, etc. to domestic textile industry customers.'
                  : '독일, 스위스, 오스트리아, 일본 등 세계적인 섬유기계 및 시험기를 수입하여 국내 섬유 산업 고객에게 공급하고 있습니다.'}
              </p>
              
              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  currentLanguage === 'en' ? 'Textile Machinery' : '섬유기계',
                  currentLanguage === 'en' ? 'Testing Equipment' : '시험기',
                  currentLanguage === 'en' ? 'Parts & Service' : '부품 및 서비스'
                ].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 오른쪽: 슬로건 & 연혁 */}
            <motion.div 
              className="text-center lg:text-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-400 mb-6">
                {currentLanguage === 'en' ? 'Bridging Textile Industry and Fashion' : '섬유 산업과 패션을 잇는 가교'}
              </h2>
              
              <div className="flex justify-center lg:justify-end gap-6">
                <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Established' : '설립'}</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1982{currentLanguage === 'en' ? '' : '년'}</p>
                </div>
                <div className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentLanguage === 'en' ? 'Business' : '사업 분야'}</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {currentLanguage === 'en' ? 'Machinery · Testers / RSS' : '섬유기계 · 시험기 / RSS'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 사업부 소개 */}
      <motion.section 
        className="py-16 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <div className="inline-block px-8 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentLanguage === 'en' ? 'Division Introduction' : '사업부 소개'}
              </h2>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {currentLanguage === 'en' ? 'Connecting Global Technology to Korea' : '글로벌 기술, 국내에 연결하다'}
            </h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                {currentLanguage === 'en'
                  ? 'Jungho TEXCOM is a specialized textile equipment distribution division under Jungho Group, importing and supplying excellent textile-related equipment, testing instruments, and parts from around the world to domestic textile industry customers.'
                  : '정호텍스컴은 정호그룹 산하의 섬유기기 전문 유통 사업부로, 세계 각국의 우수한 섬유 관련 기기, 시험기기 및 부품을 수입하여 국내 섬유 산업 고객에게 공급하고 있습니다.'}
              </p>
              <p>
                {currentLanguage === 'en'
                  ? 'Beyond simple distribution, we provide one-stop service covering technical consultation, installation, operation training, and maintenance, contributing to improving customer productivity and quality.'
                  : '단순한 유통을 넘어, 기술 상담부터 설치, 작동법 교육, 유지보수까지 아우르는 원스톱 서비스를 제공하며, 고객의 생산성과 품질 향상에 기여합니다.'}
              </p>
            </div>
          </motion.div>

          {/* 사업부 역할 */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="inline-block px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full mb-6">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {currentLanguage === 'en' ? 'Division Role' : '사업부 역할'}
              </span>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center justify-center gap-2">
                <span className="text-blue-500">-</span>
                {currentLanguage === 'en' ? 'Distribution of high-quality imported equipment' : '전문성 높은 수입기기 유통'}
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-blue-500">-</span>
                {currentLanguage === 'en' ? 'Total service including technical support' : '기술지원까지 포함된 토탈 서비스'}
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className="text-blue-500">-</span>
                {currentLanguage === 'en' ? 'Partnership with global manufacturers' : '글로벌 제조사와의 파트너십'}
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* 제품 소개 */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {currentLanguage === 'en' ? 'Product Introduction' : '제품 소개'}
          </motion.h2>

          {/* 섬유기계 */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🏭</span>
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
                {currentLanguage === 'en' ? 'Textile Machinery' : '섬유기계'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {textileMachinery.map((partner, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {partner.country} {partner.countryName}
                    </span>
                    <span className={`text-xl font-bold ${partner.nameColor}`}>{partner.name}</span>
                  </div>
                  <a href={`https://${partner.url.replace('https://', '').replace('http://', '')}`} 
                     target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 dark:text-blue-400 hover:underline text-sm block mb-3">
                    {partner.url}
                  </a>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{partner.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 시험기 */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔬</span>
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {currentLanguage === 'en' ? 'Testing Equipment' : '시험기'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testingEquipment.map((partner, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {partner.country} {partner.countryName}
                    </span>
                    <span className={`text-xl font-bold ${partner.nameColor}`}>{partner.name}</span>
                  </div>
                  <a href={`https://${partner.url}`} target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 dark:text-blue-400 hover:underline text-sm block mb-3">
                    {partner.url}
                  </a>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{partner.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 자체 개발 제품 - TAF */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔍</span>
              <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                {currentLanguage === 'en' ? 'Self-Developed Products' : '자체 개발 제품'}
              </h3>
            </div>
            
            <div className="max-w-xl mx-auto">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-amber-200 dark:border-amber-800"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">TAF (The Auto Finder)</h4>
                <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full text-sm mb-4">
                  {currentLanguage === 'en' ? 'Developed by Jungho TEXCOM' : '한국 정호텍스컴 개발'}
                </span>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {currentLanguage === 'en' ? 'High-performance automatic microscope finder' : '고성능 현미경 자동 탐색기기'}
                </p>
                <a href="https://www.theautofinder.com" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all">
                  <span className="text-lg">🌐</span>
                  www.theautofinder.com
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 하단 여백 */}
      <div className="h-12 bg-white dark:bg-gray-900"></div>
    </div>
  );
};

export default TexcomTextilePage;

