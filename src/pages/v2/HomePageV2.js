import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { IRGSHero } from '../../components/v2';
import { useI18n } from '../../hooks/useI18n';

/**
 * v2 메인 홈페이지
 * 설계안에 따른 새로운 구조 + 고급 애니메이션 효과
 */
const HomePageV2 = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();
  const [gatewayData, setGatewayData] = React.useState(null);

  // 배경 이미지 옵션 (정호그룹 사업 관련 이미지)
  const backgroundImages = [
    {
      id: 1,
      name: currentLanguage === 'en' ? 'City Night View' : '도시 야경',
      url: '/images/city_night_view.png',
      description: currentLanguage === 'en' ? 'Beautiful city lights at night' : '화려한 도시 조명'
    },
    {
      id: 2,
      name: currentLanguage === 'en' ? 'Smart Building Control' : '스마트 빌딩 제어',
      url: '/images/light_control.png',
      description: currentLanguage === 'en' ? 'Building automation system' : '빌딩 자동화 시스템'
    },
    {
      id: 3,
      name: currentLanguage === 'en' ? 'Warehouse Control' : '창고 조명 제어',
      url: '/images/warehouse_control.png',
      description: currentLanguage === 'en' ? 'Smart warehouse lighting' : '스마트 창고 조명'
    },
    {
      id: 4,
      name: currentLanguage === 'en' ? 'Smart Home' : '스마트 홈',
      url: '/images/warm_home.png',
      description: currentLanguage === 'en' ? 'Warm home lighting control' : '따뜻한 가정 조명 제어'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [selectedBackground, setSelectedBackground] = React.useState(backgroundImages[0].url);
  const [showImageSelector, setShowImageSelector] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(true);

  // 자동 슬라이드쇼 - 5초마다 이미지 전환
  React.useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % backgroundImages.length;
        setSelectedBackground(backgroundImages[nextIndex].url);
        return nextIndex;
      });
    }, 5000); // 5초마다 전환

    return () => clearInterval(interval);
  }, [isAutoPlay, backgroundImages]);

  // LocalStorage에서 Gateway 데이터 로드
  React.useEffect(() => {
    const savedData = localStorage.getItem('v2_homepage_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setGatewayData(parsedData.gateway);
      } catch (error) {
        console.error('Gateway 데이터 로드 실패:', error);
      }
    }
  }, []);


  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
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
        staggerChildren: 0
      }
    }
  };

  const scaleOnHover = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* 배경 이미지 컨트롤 - 우측 하단 고정 */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* 자동재생/일시정지 버튼 */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-primary-600 dark:text-primary-400 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          title={isAutoPlay 
            ? (currentLanguage === 'en' ? 'Pause Slideshow' : '슬라이드쇼 일시정지')
            : (currentLanguage === 'en' ? 'Play Slideshow' : '슬라이드쇼 재생')
          }
        >
          {isAutoPlay ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        {/* 이미지 선택 버튼 */}
        <button
          onClick={() => setShowImageSelector(!showImageSelector)}
          className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          title={currentLanguage === 'en' ? 'Change Background Image' : '배경 이미지 변경'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* 현재 이미지 인디케이터 */}
        <div className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg text-center">
          <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
            {currentImageIndex + 1} / {backgroundImages.length}
          </span>
        </div>
      </div>

      {/* 배경 이미지 선택 패널 */}
      {showImageSelector && (
        <div className="fixed bottom-24 right-8 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-96 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {currentLanguage === 'en' ? 'Select Background' : '배경 이미지 선택'}
            </h3>
            <button
              onClick={() => setShowImageSelector(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {backgroundImages.map((image) => (
              <div
                key={image.id}
                onClick={() => {
                  const index = backgroundImages.findIndex(img => img.id === image.id);
                  setCurrentImageIndex(index);
                  setSelectedBackground(image.url);
                  setIsAutoPlay(false); // 수동 선택 시 자동재생 일시정지
                  setShowImageSelector(false);
                }}
                className={`cursor-pointer rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                  selectedBackground === image.url
                    ? 'border-primary-600 shadow-lg scale-105'
                    : 'border-transparent hover:border-primary-300'
                }`}
              >
                <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url('${image.url}')` }} />
                <div className="p-3 bg-gray-50 dark:bg-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{image.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IRGS Hero Section - 핵심가치 애니메이션 (선택된 배경) */}
      <IRGSHero backgroundImage={selectedBackground} />

      {/* Gateway 빠른 접근 섹션 (SK 스타일) */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {gatewayData?.title || t('home.gateway.title') || (currentLanguage === 'en' ? 'Jungho Group GATEWAY' : '정호그룹 GATEWAY')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {gatewayData?.subtitle || t('home.gateway.subtitle') || (currentLanguage === 'en' ? 'Delivering various news from Jungho Group' : '정호그룹의 다양한 소식을 전합니다')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {/* Gateway 1: 그룹 소개 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/about')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-6xl">👋</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {t('home.gateway.group.title') || (currentLanguage === 'en' ? 'Group Introduction' : '그룹 소개')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {t('home.gateway.group.description') || (currentLanguage === 'en' ? 'Check out Jungho Group\'s vision and history' : '정호그룹의 비전과 역사를 확인하세요')}
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {t('common.learnMore') || '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 2: 계열사 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/subsidiaries')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-6xl">🏢</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {t('home.gateway.subsidiaries.title') || t('footer.subsidiaries') || (currentLanguage === 'en' ? 'Subsidiaries' : '계열사')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {t('home.gateway.subsidiaries.description') || (currentLanguage === 'en' ? '4 professional subsidiaries together' : '4개 전문 계열사가 함께합니다')}
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {t('common.learnMore') || '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 3: 미디어 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/media/promotion')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-6xl">🎬</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {t('home.gateway.media.title') || (currentLanguage === 'en' ? 'Media/PR' : '미디어/PR')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {t('home.gateway.media.description') || (currentLanguage === 'en' ? 'Experience our latest news and videos' : '생생한 소식과 영상을 만나보세요')}
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {t('common.learnMore') || '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Gateway 4: 문의 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => navigate('/v2/support/contact')}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-6xl">📧</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {t('home.gateway.contact.title') || t('common.contact') || (currentLanguage === 'en' ? 'Contact Us' : '문의하기')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {t('home.gateway.contact.description') || (currentLanguage === 'en' ? 'Feel free to contact us with any questions' : '궁금한 점을 언제든 연락하세요')}
                </p>
                <div className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
                  {t('common.learnMore') || '바로가기'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 경영철학 섹션 - Fade In 애니메이션 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeInUp}
            >
              {t('home.philosophy.title') || (currentLanguage === 'en' ? 'Management Philosophy' : '경영철학')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              variants={fadeInUp}
            >
              {t('home.philosophy.subtitle') || (currentLanguage === 'en' ? 'The direction of management that Jungho Group continuously pursues' : '정호그룹이 쉼 없이 지속적으로 추구하는 경영의 방향')}
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* 고객만족 */}
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('home.philosophy.customerSatisfaction.title') || (currentLanguage === 'en' ? 'Customer Satisfaction' : '고객만족')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('home.philosophy.customerSatisfaction.description') || (currentLanguage === 'en' ? 'We accurately identify customer needs and respond with the best quality' : '고객의 니즈를 정확히 파악하고 최상의 품질로 응답합니다')}
              </p>
            </motion.div>

            {/* 기술혁신 */}
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('home.philosophy.innovation.title') || (currentLanguage === 'en' ? 'Technology Innovation' : '기술혁신')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('home.philosophy.innovation.description') || (currentLanguage === 'en' ? 'We secure industry-leading technology through continuous R&D' : '끊임없는 연구개발로 업계를 선도하는 기술력을 확보합니다')}
              </p>
            </motion.div>

            {/* 지속성장 */}
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('home.philosophy.growth.title') || (currentLanguage === 'en' ? 'Sustainable Growth' : '지속성장')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('home.philosophy.growth.description') || (currentLanguage === 'en' ? 'We create a future where companies and society grow together from a long-term perspective' : '장기적 관점에서 기업과 사회가 함께 성장하는 미래를 만듭니다')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 실적 카운트업 섹션 */}
      <motion.section 
        className="py-20 bg-primary-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('home.numbers.title') || (currentLanguage === 'en' ? 'Jungho Group by Numbers' : '숫자로 보는 정호그룹')}
            </h2>
            <p className="text-xl text-primary-100">
              {t('home.numbers.subtitle') || (currentLanguage === 'en' ? 'Experience and achievements built over 40 years' : '40년간 쌓아온 경험과 성과')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {/* 설립연도 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={1985} 
                  duration={2.5} 
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <div className="text-xl text-primary-100 font-semibold">
                {t('home.numbers.established') || (currentLanguage === 'en' ? 'Established' : '설립연도')}
              </div>
              <div className="text-sm text-primary-200 mt-2">Since 1985</div>
            </motion.div>

            {/* 계열사 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={4} 
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span></span>
              </div>
              <div className="text-xl text-primary-100 font-semibold">
                {t('home.numbers.subsidiaries') || (currentLanguage === 'en' ? 'Subsidiaries' : '계열사')}
              </div>
              <div className="text-sm text-primary-200 mt-2">Subsidiaries</div>
            </motion.div>

            {/* 누적 프로젝트 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={1000} 
                  duration={2.5} 
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span>+</span>
              </div>
              <div className="text-xl text-primary-100 font-semibold">
                {t('home.numbers.projects') || (currentLanguage === 'en' ? 'Projects' : '누적 프로젝트')}
              </div>
              <div className="text-sm text-primary-200 mt-2">Projects</div>
            </motion.div>

            {/* 고객사 */}
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="text-5xl font-bold text-white mb-2">
                <CountUp 
                  end={500} 
                  duration={2.5} 
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span>+</span>
              </div>
              <div className="text-xl text-primary-100 font-semibold">
                {t('home.numbers.clients') || (currentLanguage === 'en' ? 'Clients' : '고객사')}
              </div>
              <div className="text-sm text-primary-200 mt-2">Clients</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* IRGS 섹션 - Fade In */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.irgs.title') || (currentLanguage === 'en' ? 'IRGS - Core Values of Jungho Group' : 'IRGS - 정호그룹의 핵심 가치')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('home.irgs.subtitle') || (currentLanguage === 'en' ? 'Technology with precision, Experience with beauty' : '기술은 정확하게, 경험은 아름답게')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {/* Innovation */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Innovation
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                {t('home.irgs.innovation.subtitle') || (currentLanguage === 'en' ? 'Innovation' : '혁신')}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.irgs.innovation.description') || (currentLanguage === 'en' ? 'Creating better "experiences" with new ideas and technology' : '새로운 생각과 기술로 더 나은 "경험"을 만듭니다')}
              </p>
            </motion.div>

            {/* Reliability */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Reliability
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                {t('home.irgs.reliability.subtitle') || (currentLanguage === 'en' ? 'Reliability' : '신뢰')}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.irgs.reliability.description') || (currentLanguage === 'en' ? 'Keeping quality and promises, enhancing the "value of relationships"' : '품질과 약속을 지키는 것, "관계의 가치"를 높입니다')}
              </p>
            </motion.div>

            {/* Global */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🌏</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Global
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                {t('home.irgs.global.subtitle') || (currentLanguage === 'en' ? 'Global' : '글로벌')}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.irgs.global.description') || (currentLanguage === 'en' ? 'Expanding global "competitiveness" with leading technology and services' : '국제 기준을 선도하는 기술력과 서비스로 글로벌 "경쟁력"을 확장합니다')}
              </p>
            </motion.div>

            {/* Sustainability */}
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Sustainability
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                {t('home.irgs.sustainability.subtitle') || (currentLanguage === 'en' ? 'Sustainability' : '지속가능성')}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.irgs.sustainability.description') || (currentLanguage === 'en' ? 'Designing a sustainable "tomorrow" where humans and nature coexist' : '인간과 자연이 함께 공존할 수 있도록 지속가능한 "내일"을 설계합니다')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 그룹사 소개 - 호버 효과 강화 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.subsidiaries.title') || '정호그룹 계열사'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('home.subsidiaries.description') || 'Innovation through specialized expertise'}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* 정호티엘씨 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/jungho-tlc')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(46, 125, 50, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-tlc-500 to-primary-700 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    ⚡
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {t('home.subsidiaries.tlc.title') || '정호티엘씨'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('home.subsidiaries.tlc.subtitle') || '빌딩관리 종합정보 및 조명·전력제어 솔루션'}
                </p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  {t('common.learnMore') || '자세히 보기'} →
                </button>
              </div>
            </motion.div>

            {/* 클라루스 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/clarus')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(0, 137, 123, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-clarus-500 to-primary-700 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    💡
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-clarus-500 transition-colors">
                  {t('home.subsidiaries.clarus.title') || '클라루스'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('home.subsidiaries.clarus.subtitle') || '스마트 조명·전력관리 솔루션 개발'}
                </p>
                <button className="text-clarus-500 dark:text-clarus-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  {t('common.learnMore') || '자세히 보기'} →
                </button>
              </div>
            </motion.div>

            {/* 일루텍 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/illutech')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(255, 167, 38, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-illutech-500 to-yellow-600 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🔆
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-illutech-500 transition-colors">
                  {t('home.subsidiaries.illutech.title') || '일루텍'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('home.subsidiaries.illutech.subtitle') || '산업용 LED 조명'}
                </p>
                <button className="text-illutech-500 dark:text-illutech-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  {t('common.learnMore') || '자세히 보기'} →
                </button>
              </div>
            </motion.div>

            {/* 정호텍스컴 */}
            <motion.div 
              onClick={() => navigate('/v2/subsidiaries/jungho-texcom')}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 60px rgba(126, 87, 194, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-texcom-500 to-purple-700 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <motion.span 
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    🧵
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-texcom-500 transition-colors">
                  {t('home.subsidiaries.texcom.title') || '정호텍스컴'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('home.subsidiaries.texcom.subtitle') || '섬유기계 / 패션'}
                </p>
                <button className="text-texcom-500 dark:text-texcom-400 font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  {t('common.learnMore') || '자세히 보기'} →
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA 섹션 */}
      <motion.section 
        className="py-20 bg-primary-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            variants={fadeInUp}
          >
            {t('home.cta.title') || (currentLanguage === 'en' ? 'Join Jungho Group' : '정호그룹과 함께하세요')}
          </motion.h2>
          <motion.p 
            className="text-xl text-primary-100 mb-8"
            variants={fadeInUp}
          >
            {t('home.cta.subtitle') || (currentLanguage === 'en' ? 'Creating a bright future with innovative technology and 40 years of experience' : '혁신적인 기술과 40년의 경험으로 밝은 미래를 만들어갑니다')}
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            variants={fadeInUp}
          >
            <motion.button
              onClick={() => navigate('/v2/about')}
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('home.cta.aboutButton') || (currentLanguage === 'en' ? 'About Company' : '회사 소개')}
            </motion.button>
            <motion.button
              onClick={() => navigate('/v2/support/contact')}
              className="px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 border-2 border-white"
              whileHover={{ scale: 1.05, backgroundColor: '#1B5E20' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('home.cta.contactButton') || t('common.contact') || (currentLanguage === 'en' ? 'Contact Us' : '문의하기')}
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePageV2;
