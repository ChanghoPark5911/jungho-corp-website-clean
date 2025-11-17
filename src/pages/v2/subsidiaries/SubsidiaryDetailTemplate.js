import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../hooks/useI18n';
import { useTheme } from '../../../contexts/ThemeContext';

const SubsidiaryDetailTemplate = ({ data }) => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();
  const { isDarkMode } = useTheme();
  const [technicalDocuments, setTechnicalDocuments] = React.useState([]);

  // JSON 파일에서 PDF 자료 로드 (우선), localStorage는 백업 (해당 계열사 관련만)
  React.useEffect(() => {
    const loadDocuments = async () => {
      try {
        // 1. JSON 파일에서 로드 시도 (우선) - 캐시 방지
        const timestamp = new Date().getTime();
        const response = await fetch(`/data/technical-docs.json?v=${timestamp}`, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.documents && Array.isArray(jsonData.documents) && data.subsidiaryId) {
            // 해당 계열사 관련 자료만 필터링
            const docs = jsonData.documents.filter(
              doc => doc.subsidiary === data.subsidiaryId
            );
            setTechnicalDocuments(docs);
            console.log(`✅ JSON 파일에서 ${data.subsidiaryId} 자료 로드:`, docs.length, '개');
            return;
          }
        }
        
        // 2. JSON 파일 실패 시 localStorage에서 로드 (백업)
        const savedMediaData = localStorage.getItem('v2_media_data');
        if (savedMediaData) {
          const parsedData = JSON.parse(savedMediaData);
          if (parsedData.technicalDocuments && data.subsidiaryId) {
            const docs = parsedData.technicalDocuments.filter(
              doc => doc.subsidiary === data.subsidiaryId
            );
            setTechnicalDocuments(docs);
            console.log(`✅ localStorage에서 ${data.subsidiaryId} 자료 로드:`, docs.length, '개');
          }
        }
      } catch (error) {
        console.error('PDF 자료 로드 실패:', error);
      }
    };

    loadDocuments();

    // 데이터 업데이트 이벤트 리스너
    const handleUpdate = () => loadDocuments();
    window.addEventListener('v2MediaDataUpdated', handleUpdate);
    return () => window.removeEventListener('v2MediaDataUpdated', handleUpdate);
  }, [data.subsidiaryId]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className={`relative py-20 bg-gradient-to-br ${data.colorFrom} ${data.colorTo} dark:from-gray-900 dark:via-${data.darkColor} dark:to-gray-900 overflow-hidden`}
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
            {/* 로고와 회사명을 나란히 배치 (로고가 있는 경우) */}
            {data.logoUrl ? (
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <img 
                  src={data.logoUrl} 
                  alt={`${data.name} 로고`} 
                  className="h-8 sm:h-10 w-auto object-contain"
                  onError={(e) => {
                    // 이미지 로드 실패 시 대체 아이콘 표시
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'inline-block';
                  }}
                />
                <span className="text-4xl sm:text-6xl hidden">{data.icon}</span>
                <div className="flex flex-col items-center -space-y-1 sm:-space-y-2">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                    {currentLanguage === 'en' ? data.nameEn : data.name}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {currentLanguage === 'en' ? data.name : data.nameEn}
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div variants={fadeInUp}>
                  <span className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 inline-block">{data.icon}</span>
                </motion.div>

                <motion.h1 
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white whitespace-nowrap"
                  variants={fadeInUp}
                >
                  {currentLanguage === 'en' ? data.nameEn : data.name}
                </motion.h1>

                <motion.p 
                  className="text-sm sm:text-base lg:text-xl text-gray-600 dark:text-gray-400 whitespace-nowrap"
                  variants={fadeInUp}
                >
                  {currentLanguage === 'en' ? data.name : data.nameEn}
                </motion.p>
              </>
            )}

            <motion.p 
              className={`text-lg sm:text-2xl lg:text-3xl ${data.textColor} dark:${data.darkTextColor} font-semibold max-w-3xl mx-auto pt-8 sm:pt-12 px-4`}
              variants={fadeInUp}
            >
              {data.slogan}
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-10"
              variants={fadeInUp}
            >
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Established' : '설립'}
                </span>
                <div className={`text-xl font-bold ${data.textColor} dark:${data.darkTextColor}`}>
                  {data.established}{currentLanguage === 'en' ? '' : '년'}
                </div>
              </div>
              <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentLanguage === 'en' ? 'Business Field' : '사업 분야'}
                </span>
                <div className={`text-xl font-bold ${data.textColor} dark:${data.darkTextColor}`}>
                  {data.business}
                </div>
              </div>
              {data.website && (
                <motion.a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 ${data.buttonBg} ${data.buttonHover} text-white rounded-lg shadow-md transition-all duration-300 flex items-center gap-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🌐 {currentLanguage === 'en' ? 'Visit Website' : '웹사이트 방문'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
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
              {data.description.map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-50" style={isDarkMode ? { fontWeight: '500', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' } : {}}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 주요 제품/서비스 */}
      {data.products && data.products.length > 0 && (
        <motion.section 
          className="py-20 bg-gray-50 dark:bg-gray-800"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'Main Products & Services' : '주요 제품 및 서비스'}
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {data.products.map((product, index) => (
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
                  <p className="text-gray-600 dark:text-gray-100 product-description">
                    {product.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* 핵심 기술/강점 */}
      {data.strengths && data.strengths.length > 0 && (
        <motion.section 
          className="py-20 bg-white dark:bg-gray-900"
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
              {data.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  className={`bg-gradient-to-br ${data.cardFrom} ${data.cardTo} dark:from-gray-800 dark:to-gray-850 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border ${data.borderColor} dark:border-gray-700`}
                >
                  <div className="text-5xl mb-4">{strength.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {strength.title}
                  </h3>
                  <p className="text-gray-700 dark:text-white text-lg tech-description">
                    {strength.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* PDF 자료 다운로드 섹션 */}
      {technicalDocuments.length > 0 && (
        <motion.section
          className="py-20 bg-white dark:bg-gray-900"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? '📥 Technical Documents' : '📥 기술자료 다운로드'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en' 
                  ? 'Download technical specifications and product catalogs'
                  : '제품 사양서 및 기술 카탈로그를 다운로드하세요'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalDocuments.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700"
                >
                  {/* 썸네일 */}
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${data.cardFrom} ${data.cardTo} dark:from-gray-700 dark:to-gray-800 mb-4`}>
                    <span className="text-4xl">{doc.thumbnail}</span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {doc.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {doc.description}
                  </p>

                  {/* 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>📄 {doc.fileSize}</span>
                    <span>{doc.language === 'ko' ? '🇰🇷' : doc.language === 'en' ? '🇺🇸' : '🌐'}</span>
                  </div>

                  {/* 다운로드 버튼 */}
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 ${data.buttonBg} ${data.buttonHover} text-white rounded-lg font-semibold text-center transition-all duration-300`}
                    onClick={(e) => {
                      // 파일이 없는 경우 경고
                      if (!doc.fileUrl) {
                        e.preventDefault();
                        alert(currentLanguage === 'en' ? 'File URL is not set' : '파일 URL이 설정되지 않았습니다');
                        return;
                      }
                      
                      // 한글/공백이 있는 경우 인코딩된 URL로 열기
                      if (/[\u3131-\uD79D\s]/.test(doc.fileUrl)) {
                        e.preventDefault();
                        const encodedUrl = doc.fileUrl.split('/').map(part => encodeURIComponent(part)).join('/');
                        window.open(encodedUrl, '_blank');
                      }
                    }}
                  >
                    📥 {currentLanguage === 'en' ? 'View / Download' : '보기 / 다운로드'}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* 연락처 */}
      <motion.section 
        className={`py-20 bg-gradient-to-br ${data.colorFrom} ${data.colorTo} dark:from-gray-900 dark:to-gray-800`}
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
              {data.contact.phone && (
                <div className="flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">📞</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'en' ? 'Phone:' : '전화:'}
                  </span>
                  <a href={`tel:${data.contact.phone}`} className={`${data.textColor} dark:${data.darkTextColor} hover:underline`}>
                    {data.contact.phone}
                  </a>
                </div>
              )}
              {data.contact.email && (
                <div className="flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">📧</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'en' ? 'Email:' : '이메일:'}
                  </span>
                  <a href={`mailto:${data.contact.email}`} className={`${data.textColor} dark:${data.darkTextColor} hover:underline`}>
                    {data.contact.email}
                  </a>
                </div>
              )}
              {data.website && (
                <div className="flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">🌐</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'en' ? 'Website:' : '웹사이트:'}
                  </span>
                  <a href={data.website} target="_blank" rel="noopener noreferrer" className={`${data.textColor} dark:${data.darkTextColor} hover:underline`}>
                    {data.website.replace('https://', '')}
                  </a>
                </div>
              )}
              {data.contact.address && (
                <div className="flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">📍</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {currentLanguage === 'en' ? 'Headquarters:' : '본사:'}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {data.contact.address}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default SubsidiaryDetailTemplate;

