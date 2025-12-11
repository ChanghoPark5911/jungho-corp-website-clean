import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';

/**
 * 정호텍스컴 - RSS 사업부 페이지
 * 패션 브랜드: REDSSOCKSOO, GUBBE
 */
const TexcomRssPage = () => {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // 브랜드 데이터
  const brands = [
    {
      id: 'redssocksoo',
      name: 'RSS REDSSOCKSOO',
      logo: '/images/logos/redssocksoo.png',
      logoText: 'RSS REDSSOCKSOO\nlogo'
    },
    {
      id: 'gubbe',
      name: 'RSS GUBBE',
      logo: '/images/logos/gubbe.png',
      logoText: 'RSS GUBBE\nlogo'
    }
  ];

  // STOCKISTS 데이터
  const stockists = [
    { name: 'RSS 공식 홈페이지', link: 'https://redssocksoo.com', highlight: true, description: 'RED SSOCKSOO | 레드쏙수 온라인 공식 홈페이지' },
    { name: '감도 깊은 취향 셀렉트샵 29cm', link: 'https://29cm.co.kr', highlight: false },
    { name: '무신사 스토어 MUSINSA', link: 'https://musinsa.com', highlight: false },
    { name: 'Better Life for All, 컬리', link: 'https://kurly.com', highlight: false },
    { name: 'W컨셉(W CONCEPT)', link: 'https://wconcept.co.kr', highlight: false },
    { name: '신세계까사 온라인 공식몰, 굿닷컴', link: 'https://ssgood.com', highlight: false },
    { name: '올리브영 공식 온라인몰', link: 'https://oliveyoung.co.kr', highlight: false },
    { name: '감성채널 감성에너지, 텐바이텐 10X10', link: 'https://10x10.co.kr', highlight: false },
    { name: '아트박스가 만든 디자인 쇼핑몰, POOM', link: 'https://poom.co.kr', highlight: false }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="relative pt-28 pb-12 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
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

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* 왼쪽: RSS 사업부 카드 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/logos/RSS.png" 
                  alt="RSS" 
                  className="h-10 w-auto object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    RSS {currentLanguage === 'en' ? 'Division' : '사업부'}
                  </h1>
                  <p className="text-sm text-blue-600 dark:text-blue-400">RSS Division</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {currentLanguage === 'en'
                  ? 'Expanding from B2B textile machinery to B2C fashion business. RSS Division operates specialized fashion websites.'
                  : 'B2B 섬유기계 사업의 경험을 바탕으로 B2C 패션 사업까지 확장하고 있습니다. RSS 사업부는 패션 전문 웹사이트를 운영합니다.'}
              </p>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded">패션</span>
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded">B2C 사업</span>
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded">이커머스</span>
              </div>
            </motion.div>

            {/* 오른쪽: 슬로건 */}
            <motion.div 
              className="lg:col-span-2 text-center lg:text-left"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-amber-700 dark:text-amber-400 leading-tight">
                {currentLanguage === 'en' 
                  ? "'Fashion Lifestyle' Leap to Brand"
                  : "'패션 라이프스타일' 브랜드로의 도약"}
              </h2>
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
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <div className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white leading-none">
                {currentLanguage === 'en' ? 'Division Introduction' : '사업부 소개'}
              </h2>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-center">
            <p>
              {currentLanguage === 'en'
                ? 'Jungho TEXCOM has been a Korean exclusive importer and distributor of world-class textile machinery and testing equipment from overseas makers since 1982, contributing to the development of the domestic textile industry.'
                : '(주)정호텍스컴은 1982년부터 현재까지 세계적인 섬유기계장비 및 시험 기기 해외 메이커들의 한국 독점 수입 판매처로서 국내 섬유업계 발전과정에 한 축을 기여해 온 기업입니다.'}
            </p>
            <p>
              {currentLanguage === 'en'
                ? 'Jungho TEXCOM has accumulated experience and know-how in the B2B textile and clothing manufacturing market. Over the past 40 years, we have developed the capability to accurately understand and predict changes in consumer psychology regarding textiles, clothing, and fashion trends.'
                : '(주)정호텍스컴은 섬유, 의류 제조 시장에서 B2B로 다져진 축적된 경험과 노하우를 축적하고 있으며, 지난 40년간 시시각각 변화되어온 섬유, 의류, 패션 트렌드의 \'소비심리 변화\'를 정확히 파악하고 앞으로의 변화 흐름 역시 미리 예측하는 역량을 스스로 갖게 되었습니다.'}
            </p>
            <p className="text-amber-700 dark:text-amber-400 font-medium">
              {currentLanguage === 'en'
                ? 'Therefore, from 2021, Jungho TEXCOM has fully launched B2C clothing and fashion business to directly meet consumers, aiming to become a central axis leading fashion trend opinion leaders.'
                : '이에 (주)정호텍스컴은 2021년부터 실소비자들을 직접 만나는 의류, 패션 B2C로 본격 사업을 전개함으로서, 패션 흐름의 오피니언 리더를 이끄는 중심축이 되고자 합니다.'}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 브랜드 소개 */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 leading-none">
                {currentLanguage === 'en' ? 'Brand Introduction' : '브랜드 소개'}
              </h2>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 브랜드 로고들 */}
            <div className="space-y-4">
              {brands.map((brand) => (
                <motion.div 
                  key={brand.id}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 text-center shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <img 
                    src={brand.logo}
                    alt={brand.name}
                    className="h-16 w-auto mx-auto object-contain mb-2"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <p className="hidden text-gray-600 dark:text-gray-400 whitespace-pre-line text-sm">
                    {brand.logoText}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 제품 이미지 영역 */}
            <div className="md:col-span-2">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl h-full min-h-[300px] flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-600">
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-medium mb-1">{currentLanguage === 'en' ? 'Product Image' : '제품 이미지 삽입'}</p>
                  <p className="text-xs">{currentLanguage === 'en' ? 'Recommended: 600×400px (3:2)' : '권장 크기: 600×400px (3:2)'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FACTORY 섹션 */}
      <motion.section 
        className="py-16 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <div className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/30 border border-slate-200 dark:border-slate-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 leading-none">FACTORY</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* 텍스트 */}
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  {currentLanguage === 'en'
                    ? 'We present various items through differentiated material research that enables unique production of graphics, cotton silket, etc. - the only one in Korea.'
                    : '그래픽, 면실켓 등 특화된 국내 유일 제작 가능한 차별화 된 소재연구를 통해 다양한 아이템을 선보입니다.'}
                </p>
                <p>
                  {currentLanguage === 'en'
                    ? 'We develop and produce diverse and sustainable items to satisfy customer needs who enjoy life with creative design and clear identity.'
                    : '독창적인 디자인과 아이덴티티가 확실한 라이프를 즐기는 고객 니즈를 충족시키기 위해 다양하고 지속적인 아이템을 개발하여 제작하고 있습니다.'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                  {currentLanguage === 'en'
                    ? '(Textile Factory: 122 Jungji 3-gil, Seokjeok-eup, Chilgok-gun, Gyeongsangbuk-do, Jungho Textile)'
                    : '(섬유공장 : 경상북도 칠곡군 석적읍 중지3길 122 정호섬유)'}
                </p>
              </div>

              {/* 이미지 영역 */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-800 rounded-xl h-64 flex items-center justify-center shadow-inner border border-slate-200 dark:border-slate-600">
                <div className="text-center text-gray-400 dark:text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="font-medium mb-1">{currentLanguage === 'en' ? 'Factory Image' : '공장 이미지 삽입'}</p>
                  <p className="text-xs">{currentLanguage === 'en' ? 'Recommended: 500×350px (4:3)' : '권장 크기: 500×350px (4:3)'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* STOCKISTS 섹션 */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <div className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-gray-50 to-slate-100 dark:from-gray-800 dark:to-slate-700 border border-gray-200 dark:border-gray-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 leading-none">STOCKISTS</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mb-8">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {currentLanguage === 'en' 
                ? 'Meet RSS brands through various channels.'
                : '다양한 채널에서 RSS브랜드를 만나보세요.'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {currentLanguage === 'en'
                ? '(Click the link below to go to the page.)'
                : '(아래 링크를 통해 해당페이지로 이동됩니다.)'}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="space-y-3">
              {stockists.map((store, index) => (
                <motion.a
                  key={index}
                  href={store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 rounded-xl border transition-all duration-300 ${
                    store.highlight 
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700 shadow-sm hover:shadow-md'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md'
                  }`}
                  whileHover={{ x: 5, scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${store.highlight ? 'text-amber-500' : 'text-gray-400'} dark:text-gray-400`}>·</span>
                    <span className={`flex-1 ${store.highlight ? 'text-amber-700 dark:text-amber-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                      {store.name}
                      {store.description && (
                        <span className="text-blue-600 dark:text-blue-400 ml-1 text-sm">
                          ({store.description})
                        </span>
                      )}
                    </span>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 기업구매/제휴마케팅 문의 */}
      <motion.section 
        className="py-16 bg-amber-50 dark:bg-amber-900/20"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <div className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-300 dark:border-amber-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 leading-none">
                {currentLanguage === 'en' ? 'Corporate Purchase / Partnership Inquiry' : '기업구매/제휴마케팅 문의'}
              </h2>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp} 
            className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/10 rounded-2xl p-8 shadow-xl border border-amber-100 dark:border-amber-800"
            whileHover={{ y: -3 }}
          >
            <div className="text-center space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-amber-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  {currentLanguage === 'en' ? 'Customer Center Hours' : '고객센터 운영시간'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' 
                    ? 'Weekdays 10:30 - 17:00 (Excluding holidays)'
                    : '평일 10:30 - 17:00 (공휴일 제외)'}
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  {currentLanguage === 'en' 
                    ? 'Lunch 11:00 - 13:00'
                    : '점심시간 11:00 - 13:00'}
                </p>
              </div>

              <div className="pt-4">
                <p className="text-gray-800 dark:text-gray-200 mb-3 font-semibold">
                  RSS{currentLanguage === 'en' ? ' Division Customer Center (HQ)' : '사업부 고객센터(본사)'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {currentLanguage === 'en' 
                    ? '2F, 17 Nonhyeon-ro 116-gil, Gangnam-gu, Seoul'
                    : '서울시 강남구 논현로116길 17 2층'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="tel:070-4688-5280" className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-lg font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all shadow-sm hover:shadow-md">
                    <span>📞</span> T. 070.4688.5280
                  </a>
                  <a href="mailto:redssocksoo2021@naver.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-lg font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all shadow-sm hover:shadow-md">
                    <span>✉️</span> redssocksoo2021@naver.com
                  </a>
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

export default TexcomRssPage;
