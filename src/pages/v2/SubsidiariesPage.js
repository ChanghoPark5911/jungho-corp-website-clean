import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

const SubsidiariesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  
  // 현재 경로에 따라 버전 prefix 결정
  const getPrefix = () => {
    if (location.pathname.startsWith('/hybrid')) return '/hybrid';
    if (location.pathname.startsWith('/classic')) return '/classic';
    return '/v2';
  };
  const prefix = getPrefix();

  // 정호텍스컴 배경 이미지 슬라이드쇼
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const texcomImages = React.useMemo(() => [
    '/images/textile-mach-img1.png',
    '/images/textile-mach-img2.png',
    '/images/textile-mach-img3.png'
  ], []);

  // 이미지 preload
  React.useEffect(() => {
    texcomImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [texcomImages]);

  // 3초마다 이미지 자동 전환
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % texcomImages.length
      );
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [texcomImages]);

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
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

  // 계열사 데이터
  const subsidiaries = [
    {
      id: 'jungho-tlc',
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      nameEn: 'Jungho TLC',
      nameKo: '정호티엘씨',
      slogan: currentLanguage === 'en' 
        ? 'Partner for Stable Building Automation'
        : '안정적인 빌딩 자동화의 파트너',
      description: currentLanguage === 'en'
        ? 'Based on abundant domestic supply records of integrated lighting/power monitoring and control (SI/FMS) and smart parking lot lighting, we support stable operation of large-scale sites.'
        : '조명·전력 통합 감시·제어(SI/FMS)와 스마트 주차장 조명등의 풍부한 국내 납품 실적을 바탕으로 대규모 현장의 안정적인 운영을 지원합니다.',
      business: currentLanguage === 'en'
        ? 'Integrated Lighting/Power Control System'
        : '조명·전력 통합 제어 시스템',
      color: 'from-green-600 to-emerald-600',
      icon: '💡',
      established: '1982',
      bgImage: '/images/tlc/integrated-si-system.png'
    },
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      nameEn: 'CLARUS',
      nameKo: '클라루스',
      slogan: currentLanguage === 'en'
        ? 'Leading Technology Innovation and Global Business'
        : '기술혁신과 글로벌 비즈니스를 선도합니다.',
      description: currentLanguage === 'en'
        ? 'We have continuously developed core technologies for smart building management and energy saving, including E/F2-BUS-based integrated control technology, IoT and wired/wireless communication technology, and energy management software.'
        : 'E/F2-BUS 기반 통합제어 기술과 IoT 및 유·무선 통신 기술, 에너지 관리 소프트웨어 등 스마트 빌딩 관리와 에너지 절감을 위한 핵심 기술을 지속적으로 발전시켜 왔습니다.',
      business: currentLanguage === 'en'
        ? 'Lighting/Power Control Solution, IoT'
        : '조명·전력 제어 솔루션, IoT',
      color: 'from-cyan-600 to-blue-600',
      icon: '🔆',
      established: '2009',
      website: 'https://www.magicclarus.com',
      bgImage: '/images/clarus/competencies/rnd-center.jpg'
    },
    {
      id: 'illutech',
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      nameEn: 'ILLUTECH',
      nameKo: '일루텍',
      slogan: currentLanguage === 'en'
        ? 'Expert in Industrial & Special LED Lighting'
        : '산업·특수 LED 조명의 전문가',
      description: currentLanguage === 'en'
        ? 'We develop and manufacture industrial and special LED lighting applied to nuclear power plants and public infrastructure. We have various manufacturing experiences and certifications such as nuclear power LED development and supply, explosion-proof, high efficiency, and KS.'
        : '원전, 공공 인프라에 적용되는 산업·특수 LED 조명을 개발 및 제조합니다. 원전용 LED 개발, 공급, 방폭, 고효율, KS 등 다양한 제조 경험과 인증을 보유하고 있습니다.',
      business: currentLanguage === 'en'
        ? 'Industrial & Special LED Lighting'
        : '산업·특수 LED 조명',
      color: 'from-orange-600 to-amber-600',
      icon: '💡',
      established: '2010',
      bgImage: '/images/illutech/products/factory-led.jpg'
    },
    {
      id: 'jungho-texcom',
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      nameEn: 'Jungho TEXCOM',
      nameKo: '정호텍스컴',
      slogan: currentLanguage === 'en'
        ? 'Bridge connecting Textile Industry and Fashion'
        : '섬유 산업과 패션을 잇는 가교',
      description: currentLanguage === 'en'
        ? 'Since its establishment in 1982, we have contributed to the development of the textile industry by exclusively supplying world-class textile machinery and testing equipment from Germany, Switzerland, Austria, and Japan to Korea. Composed of Textile Machinery Division and RSS Division, we expand from B2B to fashion B2C based on experience, creating the future of textiles and fashion together.'
        : '1982년 설립 이후, 독일, 스위스, 오스트리아, 일본 등 세계적인 섬유기계 및 시험기를 국내에 독점 공급하며 섬유 산업의 발전에 기여해왔습니다. 섬유기계사업부와 RSS 사업부로 구성되어 B2B 경험을 바탕으로 패션 B2C 분야까지 확장하며, 섬유와 패션의 미래를 함께 만들어갑니다.',
      business: currentLanguage === 'en'
        ? 'Textile Machinery & Testing Equipment Div., RSS Div.'
        : '섬유기계·시험기 사업부, RSS 사업부',
      color: 'from-purple-600 to-pink-600',
      icon: '👔',
      established: '1982',
      website: 'http://www.theautofinder.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
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

        {/* 이정표 - 오른쪽 상단 */}
        <motion.div 
          className="hidden md:block absolute top-24 right-8 text-right z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {currentLanguage === 'en' ? 'CURRENT PAGE' : '현재 페이지'}
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {currentLanguage === 'en' ? 'SUBSIDIARIES' : '계열사'}
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
                {t('home.subsidiariesPage.badge') || (currentLanguage === 'en' ? '🏢 4 Professional Subsidiaries' : '🏢 4개 전문 계열사')}
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              {t('home.subsidiariesPage.title') || (currentLanguage === 'en' ? 'Jungho Group Subsidiaries' : '정호그룹 계열사')}
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {currentLanguage === 'en' ? (
                <>
                  {t('home.subsidiariesPage.subtitle') || 'Based on expertise in each field'}<br />
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {t('home.subsidiariesPage.subtitleHighlight') || 'Jungho Group subsidiaries growing together'}
                  </span>
                </>
              ) : (
                <>
                  각 분야의 전문성을 바탕으로<br />
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">함께 성장하는 정호그룹 계열사</span>
                </>
              )}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 pt-6"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">{currentLanguage === 'en' ? '4' : '4개'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('home.subsidiariesPage.stats.subsidiaries') || (currentLanguage === 'en' ? 'Subsidiaries' : '계열사')}
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">40{currentLanguage === 'en' ? '' : '년'}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('home.subsidiariesPage.stats.history') || (currentLanguage === 'en' ? 'History' : '역사')}
                </div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('home.subsidiariesPage.stats.employees') || (currentLanguage === 'en' ? 'Employees' : '임직원')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 계열사 카드 섹션 */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subsidiaries.map((company, index) => (
              <div
                key={company.id}
                className="group cursor-pointer"
                onClick={() => navigate(`${prefix}/subsidiaries/${company.id}`)}
              >
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* 헤더 - 배경 이미지 */}
                  <div className="h-32 relative overflow-hidden">
                    {company.id === 'jungho-texcom' ? (
                      /* 정호텍스컴: 슬라이드쇼 배경 */
                      texcomImages.map((image, idx) => (
                        <div
                          key={idx}
                          className={`absolute inset-0 transition-opacity duration-1000 ${
                            idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${company.color}/70`} />
                        </div>
                      ))
                    ) : company.bgImage ? (
                      /* 다른 계열사: 단일 배경 이미지 */
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${company.bgImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${company.color}/70`} />
                      </div>
                    ) : (
                      /* 배경 이미지 없는 경우: 그라데이션 배경 */
                      <div className={`absolute inset-0 bg-gradient-to-br ${company.color}`}>
                        <div className="absolute inset-0 bg-black/10" />
                      </div>
                    )}
                    {/* 아이콘 */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-6xl">{company.icon}</span>
                    </div>
                    {/* 설립 연도 배지 (정호텍스컴만) */}
                    {company.id === 'jungho-texcom' && (
                      <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-200">
                        {currentLanguage === 'en' ? 'Est.' : '설립'} {company.established}
                      </div>
                    )}
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-6 space-y-4">
                    {/* 회사명 */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {company.nameEn}
                      </p>
                    </div>

                    {/* 슬로건 */}
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">
                      {company.slogan}
                    </p>

                    {/* 설립연도 */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">
                        {t('home.subsidiariesPage.card.established') || (currentLanguage === 'en' ? 'Established' : '설립')}:
                      </span>
                      <span>
                        {company.established}{currentLanguage === 'en' ? '' : '년'}
                      </span>
                    </div>

                    {/* 사업분야 */}
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">
                        {t('home.subsidiariesPage.card.businessField') || (currentLanguage === 'en' ? 'Business Field' : '사업 분야')}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {company.business}
                      </p>
                    </div>

                    {/* 웹사이트 */}
                    {company.website && (
                      <div className="pt-2">
                        <a 
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('home.subsidiariesPage.card.visitWebsite') || (currentLanguage === 'en' ? '🌐 Visit Website' : '🌐 웹사이트 방문')}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}

                    {/* 자세히 보기 버튼 */}
                    <div className="pt-4">
                      <div className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
                        {t('home.subsidiariesPage.card.learnMore') || t('common.learnMore') || (currentLanguage === 'en' ? 'Learn More' : '자세히 보기')}
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('home.subsidiariesPage.cta.title') || (currentLanguage === 'en' ? 'Growing Together - Jungho Group' : '함께 성장하는 정호그룹')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {currentLanguage === 'en' ? (
                t('home.subsidiariesPage.cta.description') || '4 professional subsidiaries provide the best technology and service in each field.\nTogether with Jungho Group, we create a brighter future.'
              ).split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}{i < 1 && <br />}
                </React.Fragment>
              )) : (
                <>
                  4개 전문 계열사가 각 분야에서 최고의 기술과 서비스를 제공합니다.<br />
                  정호그룹과 함께 더 밝은 미래를 만들어갑니다.
                </>
              )}
            </p>
            <motion.button
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`${prefix}/support/contact`)}
            >
              {t('home.subsidiariesPage.cta.contactButton') || t('common.contact') || (currentLanguage === 'en' ? 'Contact Us' : '문의하기')}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default SubsidiariesPage;

