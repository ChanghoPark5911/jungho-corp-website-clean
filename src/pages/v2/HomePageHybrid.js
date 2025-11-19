import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 홈페이지 - 하이브리드 버전 (전통적 구조 + 현대적 디자인)
 * - 클래식 버전의 레이아웃 유지
 * - 현대적 디자인 요소 추가 (카드, 애니메이션, 그라데이션)
 */
const HomePageHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  // 배경 이미지 (6번 - 상업용 조명)
  const backgroundImages = [
    {
      id: 6,
      name: currentLanguage === 'en' ? 'Commercial Lighting' : '상업용 조명',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
      description: currentLanguage === 'en' ? 'Office lighting system' : '사무실 조명 시스템'
    }
  ];

  const [selectedBackground] = useState(backgroundImages[0].url);
  const [showImageSelector] = useState(false);

  // 사이드바 메뉴
  const sidebarItems = [
    { id: 'intro', label: currentLanguage === 'en' ? 'Group Intro' : '그룹소개', path: '/hybrid/about/intro' },
    { id: 'subsidiaries', label: currentLanguage === 'en' ? 'Subsidiaries' : '계열사', path: '/hybrid/subsidiaries' },
    { id: 'media', label: currentLanguage === 'en' ? 'Media/PR' : '미디어/PR', path: '/media/promotion' },
    { id: 'support', label: currentLanguage === 'en' ? 'Support' : '고객지원', path: '/support' }
  ];

  // 계열사 목록
  const subsidiaries = [
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      nameEn: 'CLARUS Korea',
      icon: '💡',
      description: currentLanguage === 'en'
        ? 'IoT-based smart lighting control specialist'
        : 'IoT 기반 스마트 조명 제어 전문 기업',
      established: '2009',
      business: currentLanguage === 'en'
        ? 'Lighting Control, Power Monitoring'
        : '조명제어, 전력감시제어',
      gradient: 'from-blue-500 to-cyan-500',
      path: '/hybrid/subsidiaries/clarus'
    },
    {
      id: 'tlc',
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      nameEn: 'Jungho TLC Co., Ltd.',
      icon: '🏢',
      description: currentLanguage === 'en'
        ? 'Partner for stable building automation'
        : '안정적인 빌딩 자동화의 파트너',
      established: '1982',
      business: currentLanguage === 'en'
        ? 'Integrated Lighting & Power Control'
        : '조명·전력 통합 제어',
      gradient: 'from-purple-500 to-pink-500',
      path: '/hybrid/subsidiaries/jungho-tlc'
    },
    {
      id: 'illutech',
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      nameEn: 'ILLUTECH Co., Ltd.',
      icon: '⚡',
      description: currentLanguage === 'en'
        ? 'Specialist in industrial & special LED lighting'
        : '산업·특수 LED 조명의 전문가',
      established: '2010',
      business: currentLanguage === 'en'
        ? 'Industrial & Special LED Lighting'
        : '산업·특수 LED 조명',
      gradient: 'from-orange-500 to-red-500',
      path: '/hybrid/subsidiaries/illutech'
    },
    {
      id: 'texcom',
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      nameEn: 'Jungho TEXCOM Co., Ltd.',
      icon: '🧵',
      description: currentLanguage === 'en'
        ? 'Bridge connecting textile industry and fashion'
        : '섬유 산업과 패션을 잇는 가교',
      established: '1982',
      business: currentLanguage === 'en'
        ? 'Textile Machinery & Testers / RSS'
        : '섬유기계·시험기 / RSS',
      gradient: 'from-green-500 to-teal-500',
      path: '/hybrid/subsidiaries/jungho-texcom'
    }
  ];

  // 주요 사업 분야
  const businessAreas = [
    {
      icon: '💡',
      title: currentLanguage === 'en' ? 'AI & IoT Solutions' : 'AI 및 IoT 솔루션',
      description: currentLanguage === 'en'
        ? 'Smart lighting and power control using AI and IoT technology'
        : 'AI와 IoT 기술을 활용한 스마트 조명 및 전력 제어',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🚚',
      title: currentLanguage === 'en' ? 'Eco-Friendly Logistics' : '친환경 물류',
      description: currentLanguage === 'en'
        ? 'Integrated logistics solutions for sustainable future'
        : '지속 가능한 미래를 위한 통합 물류 솔루션',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '👔',
      title: currentLanguage === 'en' ? 'Textile & Fashion' : '텍스타일 & 패션',
      description: currentLanguage === 'en'
        ? 'Textile machinery and fashion industry solutions'
        : '섬유 기계 및 패션 산업 솔루션',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚡',
      title: currentLanguage === 'en' ? 'Industrial LED Lighting' : '산업용 LED 조명',
      description: currentLanguage === 'en'
        ? 'Special LED lighting for nuclear plants and public infrastructure'
        : '원전 및 공공 인프라를 위한 특수 LED 조명',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 전통적 네비게이션 */}
      <TraditionalNav />

      {/* 배너 - 6번 이미지 */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'Since 1982' : '1982년 설립'}
        title={currentLanguage === 'en' 
          ? 'Creating a Better Future with Innovative Technology'
          : '혁신적인 기술로 더 나은 미래를 만듭니다'
        }
        description={currentLanguage === 'en'
          ? 'JUNGHO Group is a global company providing innovative solutions in AI, IoT, logistics, and textile industries'
          : '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다'
        }
        backgroundImage={selectedBackground}
        height="700px"
      />

      {/* 메인 콘텐츠 - 전통적 레이아웃 */}
      <TraditionalLayout showSidebar={true} sidebarItems={sidebarItems}>
        {/* 회사 소개 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Group Introduction' : '그룹소개'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'About JUNGHO Group' : '정호그룹에 대하여'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Founded in 1982, JUNGHO Group has been leading innovation in AI, IoT, logistics, and textile industries for over 40 years. We provide optimized solutions for each industry based on our accumulated technology and experience.'
                : '1982년 설립 이래, 정호그룹은 40년 이상 AI, IoT, 물류, 텍스타일 분야에서 혁신을 선도해왔습니다. 축적된 기술력과 경험을 바탕으로 각 산업 분야에 최적화된 솔루션을 제공하고 있습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Our four subsidiaries - CLARUS, Jungho TLC, ILLUTECH, and Jungho TEXCOM - specialize in their respective fields and work together to create synergy.'
                : '클라루스, 정호티엘씨, 일루텍, 정호텍스컴 등 4개의 계열사는 각 분야에서 전문성을 발휘하며 시너지를 창출하고 있습니다.'
              }
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate('/hybrid/about/intro')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {currentLanguage === 'en' ? 'Learn More' : '자세히 보기'}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* 주요 성과 지표 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Key Achievements' : '주요 성과'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'JUNGHO Group by Numbers' : '숫자로 보는 정호그룹'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '40+', label: currentLanguage === 'en' ? 'Years of History' : '년 역사', gradient: 'from-blue-500 to-cyan-500' },
              { number: '4', label: currentLanguage === 'en' ? 'Subsidiaries' : '개 계열사', gradient: 'from-purple-500 to-pink-500' },
              { number: '200+', label: currentLanguage === 'en' ? 'Projects' : '개 프로젝트', gradient: 'from-orange-500 to-red-500' },
              { number: '50+', label: currentLanguage === 'en' ? 'Billion KRW Sales' : '억원 매출', gradient: 'from-green-500 to-teal-500' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${stat.gradient} p-6 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 주요 사업 분야 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Business Areas' : '주요 사업 분야'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'What We Do' : '정호그룹의 사업 영역'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessAreas.map((area, index) => (
              <motion.div 
                key={index}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-transparent shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative flex items-start gap-4">
                  <div className="text-5xl">{area.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {area.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 계열사 소개 */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Our Subsidiaries' : '계열사 소개'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Four Specialized Companies' : '4개의 전문 기업'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subsidiaries.map((company, index) => (
              <motion.div 
                key={company.id}
                className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-transparent rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(company.path)}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`h-2 bg-gradient-to-r ${company.gradient}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{company.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {company.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {company.nameEn}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 bg-gradient-to-r ${company.gradient} text-white text-xs font-bold rounded-full shadow-md`}>
                      {currentLanguage === 'en' ? 'Est.' : '설립'} {company.established}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong className="text-gray-900 dark:text-white">
                        {currentLanguage === 'en' ? 'Business:' : '사업분야:'}
                      </strong>{' '}
                      {company.business}
                    </p>
                    <button
                      className={`group/btn w-full px-4 py-3 bg-gradient-to-r ${company.gradient} text-white font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2`}
                    >
                      {currentLanguage === 'en' ? 'Details' : '상세보기'}
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/hybrid/subsidiaries')}
              className="group px-8 py-4 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries' : '계열사 전체보기'}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </motion.section>

        {/* 고객지원 안내 */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-700 dark:via-blue-800 dark:to-purple-700 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>📞</span>
              {currentLanguage === 'en' ? 'Customer Support' : '고객지원'}
            </h3>
            <p className="mb-6 text-blue-100 text-lg">
              {currentLanguage === 'en'
                ? 'For product inquiries and technical support, please contact us.'
                : '제품 문의 및 기술 지원이 필요하시면 연락 주세요.'}
            </p>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-3 text-lg">
                <span className="font-bold">{currentLanguage === 'en' ? 'Tel:' : '전화:'}</span>
                <span className="text-blue-100">02-553-3631</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <span className="font-bold">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</span>
                <span className="text-blue-100">info@junghocorp.com</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/support')}
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'Go to Support Center →' : '고객지원센터 바로가기 →'}
            </button>
          </div>
        </motion.section>
      </TraditionalLayout>
    </div>
  );
};

export default HomePageHybrid;

