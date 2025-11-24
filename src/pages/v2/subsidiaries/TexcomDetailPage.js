import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';
import { useTheme } from '../../../contexts/ThemeContext';

const TexcomDetailPage = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();
  const { isDarkMode } = useTheme();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 overflow-hidden"
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
          onClick={() => navigate('/subsidiaries')}
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {currentLanguage === 'en' ? 'Subsidiaries' : '계열사 목록'}
          </span>
        </motion.button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* 로고와 회사명을 나란히 배치 */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <img 
                src="/images/logos/junghotexcom.png" 
                alt="정호텍스컴 로고" 
                className="h-8 sm:h-10 w-auto object-contain"
                onError={(e) => {
                  // 이미지 로드 실패 시 대체 아이콘 표시
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'inline-block';
                }}
              />
              <span className="text-4xl sm:text-6xl hidden">👔</span>
              <div className="flex flex-col items-center -space-y-1 sm:-space-y-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                  {currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴'}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {currentLanguage === 'en' ? '정호텍스컴' : 'Jungho TEXCOM'}
                </p>
              </div>
            </motion.div>

            <motion.p 
              className="text-lg sm:text-2xl lg:text-3xl text-purple-600 dark:text-purple-400 font-semibold max-w-3xl mx-auto pt-8 sm:pt-12 px-4"
              variants={fadeInUp}
            >
              {currentLanguage === 'en'
                ? 'Bridge connecting textile industry and fashion'
                : '섬유 산업과 패션을 잇는 가교'}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-10"
              variants={fadeInUp}
            >
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Established' : '설립'}
                </span>
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {currentLanguage === 'en' ? '1982' : '1982년'}
                </div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field' : '사업 분야'}
                </span>
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {currentLanguage === 'en' ? 'Textile Machinery & Testers / RSS' : '섬유기계·시험기 / RSS'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 회사 소개 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-left">
              {currentLanguage === 'en' ? (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>Since its establishment in 1982, Jungho TEXCOM has been contributing to the development of the textile industry by exclusively supplying world-class textile machinery and testing equipment in Korea.</p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>Now, based on our B2B experience, we are expanding into the fashion B2C sector, creating the future of textiles and fashion together.</p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>Jungho TEXCOM consists of the <strong>Textile Machinery Division</strong> and <strong>RSS Division</strong> under Jungho Group, contributing to improving customer productivity and quality through global technology and domestic networks.</p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>1982년 설립 이후, 세계적인 섬유기계 및 시험기를 국내에 독점 공급하며 섬유 산업의 발전에 기여해온 ㈜정호텍스컴입니다.</p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>이제 B2B 경험을 바탕으로 패션 B2C 분야까지 확장하며, 섬유와 패션의 미래를 함께 만들어갑니다.</p>
                  <p className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>정호텍스컴은 정호그룹 산하의 <strong>섬유기계 사업부</strong>와 <strong>RSS 사업부</strong>로 구성되며, 글로벌 기술력과 국내 연결망을 통해 고객의 생산성과 품질 향상에 기여합니다.</p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 섬유기계 사업부 */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-5xl">🏭</span>
              <div className="text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {currentLanguage === 'en' ? 'Textile Machinery Division' : '섬유기계 사업부'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">Textile Machinery Division</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {currentLanguage === 'en' 
                  ? 'Connecting Global Technology to Korea'
                  : '글로벌 기술, 국내에 연결하다'}
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-white leading-relaxed">
                {currentLanguage === 'en' ? (
                  <>
                    <p>Jungho TEXCOM is a specialized textile equipment distribution division under Jungho Group, importing and supplying excellent textile-related equipment, testing instruments, and parts from around the world to domestic textile industry customers.</p>
                    <p>Beyond simple distribution, we provide <strong>one-stop service</strong> covering technical consultation, installation, operation training, and maintenance, contributing to improving customer productivity and quality.</p>
                  </>
                ) : (
                  <>
                    <p>정호텍스컴은 정호그룹 산하의 섬유기기 전문 유통 사업부로, 세계 각국의 우수한 섬유 관련 기기, 시험기기 및 부품을 수입하여 국내 섬유 산업 고객에게 공급하고 있습니다.</p>
                    <p>단순한 유통을 넘어, 기술 상담부터 설치, 작동법 교육, 유지보수까지 아우르는 <strong>원스톱 서비스</strong>를 제공하며, 고객의 생산성과 품질 향상에 기여합니다.</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* 제품 소개 */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {currentLanguage === 'en' ? 'Product Introduction' : '제품 소개'}
            </h3>
          </motion.div>

          {/* 섬유기계 */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 mb-6">
              <h4 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                <span>🏭</span> {currentLanguage === 'en' ? 'Textile Machinery' : '섬유기계'}
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* SAURER */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  {/* 국가명 + 로고 */}
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇩🇪 {currentLanguage === 'en' ? 'Germany' : '독일'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src="/images/logos/partners/saurer-logo.png" 
                        alt="SAURER Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-2xl font-bold text-red-600">SAURER.</span>
                      </div>
                    </div>
                  </div>

                  {/* 웹사이트 URL */}
                  <div className="mb-2">
                    <a href="https://www.saurer.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      https://saurer.com
                    </a>
                  </div>

                  {/* 사업부문 */}
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' 
                        ? 'Industrial textile twisting machines for tire cords'
                        : '타이어코드, 카페트, 방적사, 우리섬유, 산업용 섬유 연사기 제조업체'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* BENNINGER */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇩🇪 {currentLanguage === 'en' ? 'Germany' : '독일'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/logos/partners/benninger-logo.png" alt="BENNINGER Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-2xl font-bold" style={{ color: '#0066CC' }}>BENNINGER</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a href="https://www.benningergroup.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      http://www.benningergroup.com/
                    </a>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' ? 'Fabric heat treatment line' : '직물 열처리 Line 제조업체(타이어 코드用)'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* LUWA */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇨🇭 {currentLanguage === 'en' ? 'Switzerland' : '스위스'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/logos/partners/luwa-logo.png" alt="LUWA Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-2xl font-bold" style={{ color: '#0099CC' }}>Luwa</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a href="https://www.luwa.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      http://www.luwa.com
                    </a>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' ? 'Air conditioning equipment for cotton & synthetic fiber spinning' : '면방, 합성용 공조 설비 제조업체'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* BRÄCKER */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇨🇭 {currentLanguage === 'en' ? 'Switzerland' : '스위스'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/logos/partners/braecker-logo.png" alt="Bräcker Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-2xl font-bold" style={{ color: '#CC0000' }}>Bräcker</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a href="https://www.braecker.ch" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      http://www.bracker.ch
                    </a>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' ? 'Rings and Travellers for spinning frames' : '정방기用 Ring, Traveller 제조 BERKOL Cots, Apron 및 유지보수 기계류 제조'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CYGNET TEKKIMP */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇬🇧 {currentLanguage === 'en' ? 'UK' : '영국'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/logos/partners/tekkimp-logo.png" alt="CYGNET TEKKIMP Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-xl font-bold text-gray-700">CYGNET TEKKIMP</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a href="https://www.cygnet-tekkimp.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      http://www.cygnet-tekkimp.com
                    </a>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' ? 'Loom creel' : '직기 Creel 제조업체(타이어코드, 유리섬유, Carbon fiber)'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 시험기 */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 mb-6">
              <h4 className="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-4 flex items-center gap-2">
                <span>🔬</span> {currentLanguage === 'en' ? 'Testing Equipment' : '시험기'}
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TEXTECHNO */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇩🇪 {currentLanguage === 'en' ? 'Germany' : '독일'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/logos/partners/textechno-logo.png" alt="TEXTECHNO Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">TEXTECHNO</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a href="https://www.textechno.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      www.textechno.com
                    </a>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' ? 'Various textile testing equipment' : '섬유용 각종 시험장비'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* LENZING */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇦🇹 {currentLanguage === 'en' ? 'Austria' : '오스트리아'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/logos/partners/lenzing-logo.png" alt="LENZING Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">LENZING</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a href="https://www.lenzing-instruments.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      www.lenzing-instruments.com
                    </a>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' ? 'Various textile testing equipment' : '섬유용 각종 시험장비'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* KATO TECH */}
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      🇯🇵 {currentLanguage === 'en' ? 'Japan' : '일본'}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/logos/partners/katotech-logo.png" alt="KATO TECH Logo" 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                      />
                      <div className="hidden items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">KATO TECH</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <a href="https://www.keskato.co.jp" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      www.keskato.co.jp
                    </a>
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {currentLanguage === 'en' ? 'Various testing instruments' : '각종 시험기기'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* TAF 자체 개발 제품 */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-6 mb-6">
              <h4 className="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-4 flex items-center gap-2">
                <span>🔍</span> {currentLanguage === 'en' ? 'Self-Developed Products' : '자체 개발 제품'}
              </h4>
            </div>
            <div className="max-w-2xl mx-auto">
              <motion.div 
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-900"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">TAF (The Auto Finder)</h5>
                    <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                      {currentLanguage === 'en' ? 'Developed by Jungho TEXCOM, Korea' : '한국 정호텍스컴 개발'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
                  {currentLanguage === 'en' 
                    ? 'High-performance automatic microscope finder'
                    : '고성능 현미경 자동 탐색기기'}
                </p>
                <a href="https://www.theautofinder.com" target="_blank" rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-md transition-all duration-300">
                  🌐 www.theautofinder.com
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* 제품 문의 및 기술 지원 안내 */}
          <motion.div variants={fadeInUp}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
              <h4 className="text-2xl font-bold mb-6 text-center">
                {currentLanguage === 'en' ? 'Product Inquiry & Technical Support' : '제품 문의 및 기술 지원 안내'}
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong>{currentLanguage === 'en' ? 'Products:' : '취급 품목:'}</strong> 
                    {currentLanguage === 'en' 
                      ? ' Textile machinery, testing equipment, related parts & consumables'
                      : ' 섬유 기계, 섬유 시험기기, 관련 부품 및 소모품'
                    }
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🛠️</span>
                  <div>
                    <strong>{currentLanguage === 'en' ? 'Services:' : '서비스 범위:'}</strong> 
                    {currentLanguage === 'en'
                      ? ' Product consultation & customized proposals, import & delivery, technical support (installation, operation training, maintenance)'
                      : ' 제품 상담 및 맞춤 제안, 수입 및 납품, 기술 지원 (설치, 작동법 교육, 유지보수)'
                    }
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    {currentLanguage === 'en'
                      ? 'For inquiries or technical support requests, please contact us below.'
                      : '공급하신 사항이나 기술 지원 요청은 아래로 연락 주세요.'
                    }
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <a href="mailto:sales@junghocorp.com" className="flex items-center gap-3 text-lg hover:text-yellow-200 transition-colors">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="text-sm opacity-80">{currentLanguage === 'en' ? 'Email' : '이메일'}</div>
                    <div className="font-bold">sales@junghocorp.com</div>
                  </div>
                </a>
                <a href="tel:02-538-3652" className="flex items-center gap-3 text-lg hover:text-yellow-200 transition-colors">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="text-sm opacity-80">{currentLanguage === 'en' ? 'Phone' : '전화'}</div>
                    <div className="font-bold">02-538-3652</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* RSS 사업부 */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-5xl">🧦</span>
              <div className="text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {currentLanguage === 'en' ? 'RSS Division' : 'RSS 사업부'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">RSS Division</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-2xl">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {currentLanguage === 'en' ? (
                  <>
                    The RSS Division operates a separate dedicated website.<br />
                    Please visit the RSS official website for more information.
                  </>
                ) : (
                  <>
                    RSS 사업부는 별도의 전문 홈페이지를 운영하고 있습니다.<br />
                    자세한 정보는 RSS 공식 웹사이트를 방문해주세요.
                  </>
                )}
              </p>
              <motion.a
                href="https://redssocksoo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">🌐</span>
                {currentLanguage === 'en' ? 'Visit RSS Official Website' : 'RSS 공식 홈페이지 방문'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                redssocksoo.com
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 연혁 및 성과 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'History & Achievements' : '연혁 및 성과'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' ? 'Global partnership history' : '글로벌 파트너십의 역사'}
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
          >
            {(currentLanguage === 'en' ? [
              '2017.11: Agency contract with Lindauer Dornier GmbH (Germany) - Tire cord weaving machine',
              '2007.01: Jungho TEXCOM separated from Jungho Group',
              '2005.01: Agency contract with Lenzing Instruments (Austria) - Textile Testing instruments, Agency contract with Mesdan S.p.A (Italy) - Yarn jointing Splicer & Textile Testing Instruments',
              '2002.01: Agency contract with Benninger Zell GmbH (Germany) - Dip and Hot Stretch Unit',
              '2001.09: Agency contract with Texkimp Limited (UK) - Unwinding Creel for tire cord',
              '2001.06: Agency contract with Temafa (Germany) - Recycling Machine'
            ] : [
              '2017년 11월: 독일 Lindauer Dornier GmbH와 Agency 계약 - Tire cord weaving machine',
              '2007년 1월: 주식회사 정호텍스컴 정호그룹 분사',
              '2005년 1월: 오스트리아 Lenzing Instruments와 Agency 계약 - Textile Testing instruments, 이탈리아 Mesdan S.p.A와 Agency 계약 - Yarn jointing Splicer & Textile Testing Instruments',
              '2002년 1월: 독일 Benninger Zell GmbH와 Agency 계약 - Dip and Hot Stretch Unit',
              '2001년 9월: 영국 Texkimp Limited와 Agency 계약 - Unwinding Creel for tire cord',
              '2001년 6월: 독일 Temafa와 Agency 계약 - Recycling Machine'
            ]).map((achievement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-white text-lg flex-1">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 핵심 강점 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Core Strengths' : '핵심 강점'}
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? 'Global Partnership' : '글로벌 파트너십'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {currentLanguage === 'en'
                  ? 'Exclusive supply of world-class brands from Germany, Switzerland, Austria, Japan, UK, etc.'
                  : '독일, 스위스, 오스트리아, 일본, 영국 등 세계 유수 브랜드 독점 공급'}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? '40 Years of Experience' : '40년 경험'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {currentLanguage === 'en'
                  ? 'Textile industry expertise and technology accumulated since 1982'
                  : '1982년부터 축적된 섬유 산업 전문성과 기술력'}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? 'One-Stop Service' : '원스톱 서비스'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {currentLanguage === 'en'
                  ? 'Integrated support from consultation, import, delivery, installation, training to maintenance'
                  : '상담, 수입, 납품, 설치, 교육, 유지보수까지 통합 지원'}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {currentLanguage === 'en' ? 'From B2B to B2C' : 'B2B에서 B2C로'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {currentLanguage === 'en'
                  ? 'Expanding to fashion based on textile machinery expertise'
                  : '섬유 기계 전문성을 바탕으로 패션까지 확장'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 문의하기 */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {currentLanguage === 'en' ? 'Contact Us' : '문의하기'}
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg space-y-4">
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📞</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Phone:' : '전화:'}
                </span>
                <a href="tel:02-538-3652" className="text-purple-600 dark:text-purple-400 hover:underline font-bold">
                  02-538-3652
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                </span>
                <a href="mailto:sales@junghocorp.com" className="text-purple-600 dark:text-purple-400 hover:underline font-bold">
                  sales@junghocorp.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">🌐</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Website:' : '웹사이트:'}
                </span>
                <a href="http://www.theautofinder.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline font-bold">
                  www.theautofinder.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-2xl">📍</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en' ? 'Headquarters:' : '본사:'}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {currentLanguage === 'en'
                    ? '3F, Jungho Building, 17, Nonhyeon-ro 116-gil, Gangnam-gu, Seoul'
                    : '서울시 강남구 논현로116길 17 정호빌딩 3층'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TexcomDetailPage;
