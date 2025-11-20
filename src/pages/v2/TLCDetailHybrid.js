import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 정호티엘씨 상세 페이지 - 하이브리드 버전 (전통적 구조 + 현대적 디자인)
 */
const TLCDetailHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 사이드바 메뉴
  const sidebarItems = [
    { id: 'intro', label: currentLanguage === 'en' ? 'Group Intro' : '그룹소개', path: '/hybrid/about/intro' },
    { id: 'subsidiaries', label: currentLanguage === 'en' ? 'Subsidiaries' : '계열사', path: '/hybrid/subsidiaries' },
    { id: 'media', label: currentLanguage === 'en' ? 'Media/PR' : '미디어/PR', path: '/media/promotion' },
    { id: 'support', label: currentLanguage === 'en' ? 'Support' : '고객지원', path: '/support' }
  ];

  // 주요 제품/서비스
  const products = [
    {
      name: currentLanguage === 'en' ? 'Integrated SI System Supply' : '통합 SI 시스템 공급',
      description: currentLanguage === 'en'
        ? 'IT system that maximizes building efficiency and safety by integrating multiple subsystems'
        : '다수하위시스템을 통합하여 건물의 효율성, 안전성을 극대화하는 IT 시스템',
      features: currentLanguage === 'en' 
        ? ['Central Management (System Integration)', 'Energy Optimization', 'Fault Detection', 'Remote Monitoring']
        : ['중앙관리(시스템통합)', '에너지 최적화', '고장감지', '원격모니터링'],
      icon: '🏢',
      gradient: 'from-purple-500 to-pink-500',
      imagePath: '/images/tlc/integrated-si-system.png'
    },
    {
      name: currentLanguage === 'en' ? 'Lighting Control System Solution' : '조명제어시스템 솔루션 구축',
      description: currentLanguage === 'en'
        ? 'Design, construction, and operation management support for lighting control systems in commercial buildings, office buildings, and data/logistics centers'
        : '상가 및 오피스 빌딩, 데이터/물류센터의 조명제어시스템 설계, 시공, 운영관리 지원',
      features: currentLanguage === 'en'
        ? ['System Design', 'Construction', 'Operation Management', 'Technical Support']
        : ['시스템 설계', '시공', '운영관리', '기술지원'],
      icon: '💡',
      gradient: 'from-blue-500 to-cyan-500',
      imagePath: '/images/tlc/lighting-control-solution.png'
    },
    {
      name: currentLanguage === 'en' ? 'Power Monitoring System Solution' : '전력 모니터링시스템 솔루션 구축',
      description: currentLanguage === 'en'
        ? 'Design, construction, and operation management support for optimal power monitoring systems in commercial buildings, public facilities, and data/logistics centers'
        : '상가빌딩, 공공시설, 데이터/물류센터의 최적 전력감시시스템 설계, 시공, 운영관리 지원',
      features: currentLanguage === 'en'
        ? ['System Design', 'Construction', 'Operation Management', 'Technical Support']
        : ['시스템 설계', '시공', '운영관리', '기술지원'],
      icon: '⚡',
      gradient: 'from-yellow-500 to-orange-500',
      imagePath: '/images/tlc/power-monitoring-solution.png'
    }
  ];

  // 연혁 및 성과 (최신순 정렬)
  const achievements = currentLanguage === 'en' ? [
    { year: '2018', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Supplied Parc.1 in Icheon Gyeongdeok' },
    { year: '2017', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Group CEO received Legal Education Award' },
    { year: '2016', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Participated in LFI Exhibition in Egypt, Represented Gyeonggi IP Center as excellent company' },
    { year: '2015', content: 'Participated in Dubai Lighting Fair (LFI), LED/OLED International Exhibition Convention Company Award, Represented Gyeonggi IP Center as excellent company' },
    { year: '2014', content: 'Completed SI/FMS product development, Supplied to super high-rise buildings and luxury hotels (5-star hotels/office buildings, apartment complexes, parking control systems), Received Startup Company Award' },
    { year: '2013', content: 'Awarded "CLARUS Brand Creation Company" (Small Business Administration)' },
    { year: '2012', content: 'Overseas export of building control systems (Singapore, Indonesia)' },
    { year: '2011', content: 'Awarded "Excellent Product Selection" (Small Business Administration)' },
    { year: '2010', content: 'Selected as "14th Korea Energy Saving Grand Prize Winner"' },
    { year: '2009', content: 'Established CLARUS Korea' },
    { year: '2007', content: 'Established as comprehensive business company, Separated CLARUS as subsidiary' },
    { year: '2005', content: 'Developed lighting control software LIGHT MANAGER II, Selected as excellent product by Small Business Administration' },
    { year: '2004', content: 'Awarded "Excellent Product Selection" (Small Business Corporation), Developed CLARUS automatic lighting control system' },
    { year: '2003', content: 'Converted Jungho TLC to corporation, Exported fire control products to USA NEX LIGHT' },
    { year: '2001', content: 'Awarded "Excellent Product" (Small Business Corporation), Won Korea Power Information Outstanding Company Award' },
    { year: '1982', content: 'Established Jungho TLC' }
  ] : [
    { year: '2018년', content: '서울 LED & OLED EXPO 대한민국 우수전시업체상 수상, 이천경덕 Parc.1 공급' },
    { year: '2017년', content: '서울 LED & OLED EXPO 대한민국 우수전시업체상 수상, 그룹 CEO 법률교육 이수상 수상' },
    { year: '2016년', content: '서울 LED & OLED EXPO 대한민국 우수전시업체상 수상, 이집트 LFI 전시회 참가, 경기지식재산센터 우수기업 대표' },
    { year: '2015년', content: '두바이 라이팅페어 참가 (LFI), LED/OLED 국제 전시회 참가/국제전시컨벤션기업상, 경기지식재산센터 우수기업 대표/네트워크' },
    { year: '2014년', content: 'SI/FMS 제품 개발 완료, 초고층빌딩 및 고급호텔 프로젝트 납품 (5성급 호텔/업무빌딩, 주거단지, 주차관제시스템), 창업기업상 수상' },
    { year: '2013년', content: 'CLARUS 브랜드 창조 기업상 수상 (중소기업청)' },
    { year: '2012년', content: '빌딩관제시스템 해외수출 (싱가포르, 인도네시아)' },
    { year: '2011년', content: '우수상품 선정상 수상 (중소기업청)' },
    { year: '2010년', content: '제14회 대한민국 에너지절약 대전시민대상 선정' },
    { year: '2009년', content: '클라루스코리아 설립' },
    { year: '2007년', content: '종합사업회사 설립, 클라루스 계열사 분리' },
    { year: '2005년', content: '조명제어 전용 소프트웨어 LIGHT MANAGER II 개발, 중소기업청 우수제품 선정' },
    { year: '2004년', content: '우수상품 선정상 (중소기업진흥공단), 클라루스 자동 조명제어 시스템 개발' },
    { year: '2003년', content: '정호 티엘씨 주식회사 법인 전환, 미국 NEX LIGHT社 화재제어상품 수출' },
    { year: '2001년', content: '중소기업 우수공업제품 선정, 한국전력정보화 우수기업 수상' },
    { year: '1982년', content: '정호티엘씨 설립' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav />

      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group Subsidiary' : '정호그룹 계열사'}
        title={currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨'}
        description={currentLanguage === 'en'
          ? 'Partner for stable building automation since 1982'
          : '1982년부터 안정적인 빌딩 자동화의 파트너'
        }
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        height="400px"
      />

      <TraditionalLayout showSidebar={true} sidebarItems={sidebarItems}>
        {/* 회사 소개 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-l-4 border-purple-600 dark:border-purple-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Since 1982, Jungho TLC has been a pioneer in building automation. We provide stable and efficient integrated control systems for large buildings and facilities, specializing in lighting, power, and facility management.'
                : '1982년부터 빌딩 자동화 분야의 선구자로서 정호티엘씨는 대형 건물 및 시설물에 안정적이고 효율적인 통합 제어 시스템을 제공합니다. 조명, 전력, 설비 관리에 특화되어 있습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {currentLanguage === 'en'
                ? 'With over 40 years of experience, we have successfully completed numerous projects for major buildings nationwide and continue to grow as a trusted partner in building automation.'
                : '40년 이상의 경험을 바탕으로 전국의 주요 건물에 성공적인 프로젝트를 완수했으며, 빌딩 자동화 분야의 신뢰받는 파트너로 계속 성장하고 있습니다.'
              }
            </p>
          </div>
        </motion.section>

        {/* 주요 제품/서비스 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="border-l-4 border-purple-600 dark:border-purple-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Products & Services' : '제품 및 서비스'}
            </h2>
          </div>

          <div className="space-y-6">
            {products.map((product, index) => (
              <motion.div 
                key={index}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-transparent rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`h-2 bg-gradient-to-r ${product.gradient}`}></div>
                <div className="p-6">
                  {/* 상단: 아이콘과 제목 */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{product.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* 메인 콘텐츠: 좌측 텍스트 + 우측 이미지 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 좌측: 설명 및 주요 기능 (2/3) */}
                    <div className="lg:col-span-2">
                      <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* 주요 기능 */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          {currentLanguage === 'en' ? '▪ Key Features:' : '▪ 주요 기능:'}
                        </h4>
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <span className={`text-lg bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent mt-0.5`}>✓</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 우측: 다이어그램/이미지 공간 (1/3) */}
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 h-full min-h-[200px] flex flex-col items-center justify-center">
                        {product.imagePath ? (
                          <div 
                            className="relative w-full h-full flex items-center justify-center cursor-pointer group"
                            onClick={() => setSelectedImage({ src: product.imagePath, alt: product.name })}
                          >
                            <img 
                              src={product.imagePath} 
                              alt={`${product.name} diagram`}
                              className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <div className="bg-black bg-opacity-50 rounded-full p-3">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-2">📊</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {currentLanguage === 'en' ? 'Diagram' : '다이어그램'}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                              {currentLanguage === 'en' ? 'Image will be displayed here' : '이미지가 여기에 표시됩니다'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 연혁 및 성과 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-l-4 border-purple-600 dark:border-purple-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'History & Achievements' : '연혁 및 성과'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
            <ul className="space-y-4">
              {(showAllAchievements ? achievements : achievements.slice(0, 8)).map((item, index) => (
                <motion.li 
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.year}
                  </div>
                  <span className="flex-1 text-gray-700 dark:text-gray-300 text-lg pt-3 leading-relaxed">{item.content}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* 더보기/접기 버튼 */}
            {achievements.length > 8 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAllAchievements(!showAllAchievements)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  {showAllAchievements 
                    ? (currentLanguage === 'en' ? 'Show Less ▲' : '접기 ▲')
                    : (currentLanguage === 'en' ? `View All (${achievements.length}) ▼` : `전체보기 (${achievements.length}개) ▼`)
                  }
                </button>
              </div>
            )}
          </div>
        </motion.section>

        {/* 연락처 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 dark:from-purple-700 dark:via-purple-800 dark:to-pink-700 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>📞</span>
              {currentLanguage === 'en' ? 'Contact Information' : '연락처'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-bold mb-3">{currentLanguage === 'en' ? 'Contact Us' : '문의하기'}</h4>
                <div className="space-y-2 text-purple-100">
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Phone:' : '전화:'}</strong> 02-553-3631</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong> info@junghocorp.com</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Website:' : '웹사이트:'}</strong> www.junghocorp.com</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3">{currentLanguage === 'en' ? 'Location' : '오시는 길'}</h4>
                <p className="text-purple-100 mb-4">
                  {currentLanguage === 'en'
                    ? '435, Apgujeong-ro, Gangnam-gu, Seoul, Korea'
                    : '서울특별시 강남구 압구정로 435 (청담동)'
                  }
                </p>
                <button
                  onClick={() => navigate('/about/location')}
                  className="px-5 py-2 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  {currentLanguage === 'en' ? 'View Map →' : '지도 보기 →'}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 다른 계열사 보기 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              {currentLanguage === 'en'
                ? 'Want to learn about other subsidiaries of JUNGHO Group?'
                : '정호그룹의 다른 계열사도 알아보세요'
              }
            </p>
            <button
              onClick={() => navigate('/hybrid/subsidiaries')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries →' : '전체 계열사 보기 →'}
            </button>
          </div>
        </motion.section>
      </TraditionalLayout>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* 닫기 버튼 */}
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-3 transition-all duration-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 확대된 이미지 */}
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* 이미지 제목 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-6 py-3 rounded-full">
              <p className="text-lg font-semibold">{selectedImage.alt}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TLCDetailHybrid;
