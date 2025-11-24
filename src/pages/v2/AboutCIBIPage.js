import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * V2 CI/BI 페이지
 * 정호그룹의 CI(Corporate Identity)와 BI(Brand Identity) 소개
 */
const AboutCIBIPage = () => {
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  const [selectedTab, setSelectedTab] = useState('ci');
  
  // 현재 경로가 classic 또는 hybrid인지 확인
  const isClassic = location.pathname.startsWith('/classic');
  const isHybrid = location.pathname.startsWith('/hybrid');
  const isTraditional = isClassic || isHybrid;
  const version = isHybrid ? 'hybrid' : isClassic ? 'classic' : 'v2';

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
        staggerChildren: 0,
        delayChildren: 0
      }
    }
  };

  // CI 데이터
  const ciLogos = [
    {
      id: 'symbol',
      name: currentLanguage === 'en' ? 'Symbol Only' : '심볼',
      file: 'jungho-logo.png',
      description: currentLanguage === 'en' 
        ? 'Jungho Group symbol mark' 
        : '정호그룹 심볼 마크'
    },
    {
      id: 'full',
      name: currentLanguage === 'en' ? 'Symbol + Logotype' : '심볼 + 로고타입',
      file: 'jungho.png',
      description: currentLanguage === 'en'
        ? 'Jungho Group full logo'
        : '정호그룹 전체 로고'
    }
  ];

  // BI 데이터 (브랜드들)
  const biLogos = [
    {
      id: 'gubbe',
      name: 'GUBBE',
      file: 'gubbe.png',
      description: currentLanguage === 'en'
        ? 'GUBBE brand identity'
        : 'GUBBE 브랜드 아이덴티티'
    },
    {
      id: 'hief',
      name: 'HIEF',
      file: 'hief2.png',
      description: currentLanguage === 'en'
        ? 'HIEF brand identity'
        : 'HIEF 브랜드 아이덴티티'
    },
    {
      id: 'rss',
      name: 'RSS',
      file: 'RSS.png',
      description: currentLanguage === 'en'
        ? 'RSS brand identity'
        : 'RSS 브랜드 아이덴티티'
    },
    {
      id: 'magicclarus',
      name: 'Magic CLARUS',
      file: 'magicclarus.png',
      description: currentLanguage === 'en'
        ? 'Magic CLARUS brand identity'
        : 'Magic CLARUS 브랜드 아이덴티티'
    },
    {
      id: 'redssocksoo',
      name: 'RED SSOCKSOO',
      file: 'redssocksoo.png',
      description: currentLanguage === 'en'
        ? 'RED SSOCKSOO brand identity'
        : 'RED SSOCKSOO 브랜드 아이덴티티'
    }
  ];

  // 계열회사 로고 데이터
  const subsidiaryLogos = [
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      file: 'clarus.png',
      description: currentLanguage === 'en'
        ? 'CLARUS subsidiary logo'
        : '클라루스 계열사 로고'
    },
    {
      id: 'tlc',
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      file: 'junghotlc.png',
      description: currentLanguage === 'en'
        ? 'Jungho TLC subsidiary logo'
        : '정호티엘씨 계열사 로고'
    },
    {
      id: 'illutech',
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      file: 'junghoillutech.png',
      description: currentLanguage === 'en'
        ? 'ILLUTECH subsidiary logo'
        : '일루텍 계열사 로고'
    },
    {
      id: 'texcom',
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      file: 'junghotexcom.png',
      description: currentLanguage === 'en'
        ? 'Jungho TEXCOM subsidiary logo'
        : '정호텍스컴 계열사 로고'
    }
  ];

  // 다운로드 함수
  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `/images/logos/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Traditional 버전용 콘텐츠
  const pageContent = (
    <div className={isTraditional ? '' : 'min-h-screen bg-gray-50 dark:bg-gray-900 pt-20'}>
      {/* Hero Section - V2 버전에서만 표시 */}
      {!isTraditional && (
        <motion.section
          className="py-20 bg-gradient-to-br from-blue-600 to-primary-700 text-white"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeInUp}>
              <div className="text-6xl mb-6">🎨</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {currentLanguage === 'en' ? 'CI / BI' : 'CI / BI'}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {currentLanguage === 'en'
                  ? 'Jungho Group Corporate Identity & Brand Identity'
                  : '정호그룹 기업 아이덴티티 및 브랜드 아이덴티티'}
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* 탭 네비게이션 */}
      <section className="bg-white dark:bg-gray-800 shadow-sm sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 py-4">
            <button
              onClick={() => setSelectedTab('ci')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === 'ci'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {currentLanguage === 'en' ? 'CI (Corporate Identity)' : 'CI (기업 아이덴티티)'}
            </button>
            <button
              onClick={() => setSelectedTab('bi')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === 'bi'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {currentLanguage === 'en' ? 'BI (Brand Identity)' : 'BI (브랜드 아이덴티티)'}
            </button>
            <button
              onClick={() => setSelectedTab('subsidiary')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === 'subsidiary'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {currentLanguage === 'en' ? 'Subsidiaries' : '계열회사'}
            </button>
          </div>
        </div>
      </section>

      {/* CI 섹션 */}
      {selectedTab === 'ci' && (
        <motion.section
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'Corporate Identity' : '기업 아이덴티티'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Jungho Group CI represents our corporate values and vision'
                  : '정호그룹의 CI는 우리의 기업 가치와 비전을 나타냅니다'}
              </p>
            </motion.div>

            {/* CI 가이드라인 */}
            <motion.div 
              variants={fadeInUp}
              className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'CI Guidelines' : 'CI 가이드라인'}
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en'
                    ? 'Please use the basic signature or modify it according to the situation.'
                    : '기본 시그니처를 사용하거나 상황에 맞게 변형하여 사용합니다.'}
                </p>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                  {currentLanguage === 'en' ? 'Color System' : '컬러 시스템'}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en'
                    ? 'The signature color uses White as ideal, and Grey or Black backgrounds are also available.'
                    : '시그니처 컬러 적용은 White 배경이 이상적이나, Grey 및 Black이상의 컬러 배경도 가능합니다.'}
                </p>
              </div>
            </motion.div>

            {/* CI 로고 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ciLogos.map((logo, index) => (
                <motion.div
                  key={logo.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[300px]">
                    <img
                      src={`/images/logos/${logo.file}`}
                      alt={logo.name}
                      className="max-h-48 w-auto object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {logo.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {logo.description}
                    </p>
                    <button
                      onClick={() => handleDownload(logo.file)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      📥 {currentLanguage === 'en' ? 'Download' : '다운로드'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* BI 섹션 */}
      {selectedTab === 'bi' && (
        <motion.section
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'Brand Identity' : '브랜드 아이덴티티'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Jungho Group brand identities representing various business areas'
                  : '정호그룹의 다양한 사업 영역을 대표하는 브랜드 아이덴티티'}
              </p>
            </motion.div>

            {/* BI 로고 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {biLogos.map((logo, index) => (
                <motion.div
                  key={logo.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[250px]">
                    <img
                      src={`/images/logos/${logo.file}`}
                      alt={logo.name}
                      className="max-h-40 w-auto object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {logo.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {logo.description}
                    </p>
                    <button
                      onClick={() => handleDownload(logo.file)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      📥 {currentLanguage === 'en' ? 'Download' : '다운로드'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 계열회사 섹션 */}
      {selectedTab === 'subsidiary' && (
        <motion.section
          className="py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'Subsidiary Logos' : '계열회사 로고'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Logos of Jungho Group subsidiaries'
                  : '정호그룹 계열회사 로고'}
              </p>
            </motion.div>

            {/* 계열회사 로고 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subsidiaryLogos.map((logo, index) => (
                <motion.div
                  key={logo.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[200px]">
                    <img
                      src={`/images/logos/${logo.file}`}
                      alt={logo.name}
                      className="max-h-32 w-auto object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {logo.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {logo.description}
                    </p>
                    <button
                      onClick={() => handleDownload(logo.file)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      📥 {currentLanguage === 'en' ? 'Download' : '다운로드'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 하단 안내 */}
      <section className="py-16 bg-blue-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {currentLanguage === 'en' ? 'Logo Usage Guidelines' : '로고 사용 가이드라인'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {currentLanguage === 'en'
              ? 'Please maintain accurate proportions and colors when using the logo. Do not modify or transform without permission.'
              : '로고 사용 시 정확한 비율과 색상을 유지해 주시기 바랍니다. 임의로 변형하거나 수정하지 마십시오.'}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:info@jungho.com"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              📧 {currentLanguage === 'en' ? 'Contact Us' : '문의하기'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );

  // Traditional 버전일 때는 TraditionalNav와 TraditionalLayout으로 감싸기
  if (isTraditional) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <TraditionalNav version={version} />
        
        <SmallBanner
          subtitle={currentLanguage === 'en' ? 'About JUNGHO' : '정호그룹 소개'}
          title="CI / BI"
          description={currentLanguage === 'en'
            ? 'Corporate Identity & Brand Identity'
            : '기업 아이덴티티 및 브랜드 아이덴티티'}
          backgroundImage="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80"
          height="400px"
        />

        <TraditionalLayout showSidebar={true} category="about" version={version}>
          {pageContent}
        </TraditionalLayout>
      </div>
    );
  }

  // V2 버전은 기존 그대로
  return pageContent;
};

export default AboutCIBIPage;

