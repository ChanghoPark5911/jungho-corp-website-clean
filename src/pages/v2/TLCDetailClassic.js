import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 정호티엘씨 상세 페이지 - 클래식 버전
 */
const TLCDetailClassic = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 사이드바는 TraditionalLayout에서 자동 생성 (category="subsidiaries")

  // 회사 정보 (삭제됨 - Hybrid 버전과 동기화)

  const products = [
    {
      name: currentLanguage === 'en' ? 'Integrated SI System Supply' : '통합 SI 시스템 공급',
      description: currentLanguage === 'en'
        ? 'IT system that maximizes building efficiency and safety by integrating multiple subsystems'
        : '다수하위시스템을 통합하여 건물의 효율성, 안전성을 극대화하는 IT 시스템',
      features: currentLanguage === 'en' 
        ? ['Central Management (System Integration)', 'Energy Optimization', 'Fault Detection', 'Remote Monitoring']
        : ['중앙관리(시스템통합)', '에너지 최적화', '고장감지', '원격모니터링'],
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
      imagePath: '/images/tlc/power-monitoring-solution.png'
    }
  ];

  // 연혁 및 성과 (최신순 정렬)
  const allAchievements = currentLanguage === 'en' ? [
    { year: '2018', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Supplied Parc.1 in Icheon Gyeongdeok' },
    { year: '2017', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Group CEO received Legal Education Award' },
    { year: '2016', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Participated in LFI Exhibition in Egypt' },
    { year: '2015', content: 'Participated in Dubai Lighting Fair (LFI), LED/OLED International Exhibition Convention Company Award' },
    { year: '2014', content: 'Developed SI/FMS products, Supplied to super high-rise buildings and luxury hotels' },
    { year: '2013', content: 'Awarded "CLARUS Brand Creation Company" (Small Business Administration)' },
    { year: '2012', content: 'Overseas export of building control systems (Singapore, Indonesia)' },
    { year: '2011', content: 'Awarded "Excellent Product Selection" (Small Business Administration)' },
    { year: '2009', content: 'CLARUS Korea established' },
    { year: '2007', content: 'General business company established, CLARUS subsidiary separated' },
    { year: '2005', content: 'Developed LIGHT MANAGER II, Selected as excellent product by Small Business Administration' },
    { year: '2004', content: 'Excellent Product Selection Award (Korea SMEs & Startups Agency), Developed CLARUS automatic lighting control system' },
    { year: '2003', content: 'Converted to Jungho TLC Co., Ltd., Exported fire control products to US NEX LIGHT' },
    { year: '2001', content: 'Selected as excellent SME industrial product, Awarded excellent company in Korea Electric Power informatization' },
    { year: '1982', content: 'Established Jungho TLC' }
  ] : [
    { year: '2018년', content: '서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 이천경덕 Parc.1 공급' },
    { year: '2017년', content: '서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 그룹 CEO 법률교육 이수상 수상' },
    { year: '2016년', content: '서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 이집트 LFI 전시회 참가' },
    { year: '2015년', content: '두바이 라이팅페어 참가 (LFI), LED/OLED 국제 전시회 참가/국제전시컨벤션기업상' },
    { year: '2014년', content: 'SI/FMS 제품 개발, 초고층빌딩 및 고급호텔 프로젝트 납품' },
    { year: '2013년', content: 'CLARUS 브랜드 창조 기업상 수상 (중소기업청)' },
    { year: '2012년', content: '빌딩관제시스템 해외수출 (싱가포르, 인도네시아)' },
    { year: '2011년', content: '우수상품 선정상 수상 (중소기업청)' },
    { year: '2009년', content: '클라루스코리아 설립' },
    { year: '2007년', content: '종합사업회사 설립, 클라루스 계열사 분리' },
    { year: '2005년', content: '조명제어 전용 소프트웨어 LIGHT MANAGER II 개발, 중소기업청 우수제품 선정' },
    { year: '2004년', content: '우수상품 선정상 (중소기업진흥공단), 클라루스 자동 조명제어 시스템 개발' },
    { year: '2003년', content: '정호 티엘씨 주식회사 법인 전환, 미국 NEX LIGHT社 화재제어상품 수출' },
    { year: '2001년', content: '중소기업 우수공업제품 선정, 한국전력정보화 우수기업 수상' },
    { year: '1982년', content: '정호티엘씨 설립' }
  ];

  const displayedAchievements = showAllAchievements ? allAchievements : allAchievements.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TraditionalNav version="classic" />

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

      <TraditionalLayout showSidebar={true} category="subsidiaries" version="classic">
        <section id="intro" className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base">
              {currentLanguage === 'en'
                ? 'Since 1982, Jungho TLC has been a pioneer in building automation. We provide stable and efficient integrated control systems for large buildings and facilities, specializing in lighting, power, and facility management.'
                : '1982년부터 빌딩 자동화 분야의 선구자로서 정호티엘씨는 대형 건물 및 시설물에 안정적이고 효율적인 통합 제어 시스템을 제공합니다. 조명, 전력, 설비 관리에 특화되어 있습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {currentLanguage === 'en'
                ? 'With over 40 years of experience, we have successfully completed numerous projects for major buildings nationwide and continue to grow as a trusted partner in building automation.'
                : '40년 이상의 경험을 바탕으로 전국의 주요 건물에 성공적인 프로젝트를 완수했으며, 빌딩 자동화 분야의 신뢰받는 파트너로 계속 성장하고 있습니다.'
              }
            </p>
          </div>
          {/* 회사 개요 섹션 삭제됨 - Hybrid 버전과 동기화 */}
        </section>

        <section id="products" className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Products & Services' : '제품 및 서비스'}
            </h2>
          </div>

          <div className="space-y-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
                {/* 헤더 */}
                <div className="bg-blue-600 dark:bg-blue-700 px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-white text-blue-600 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white m-0 p-0" style={{ lineHeight: '1' }}>
                    {product.name}
                  </h3>
                </div>

                {/* 본문: 좌측 텍스트 + 우측 이미지 */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 좌측: 설명 및 주요 기능 (2/3) */}
                    <div className="lg:col-span-2">
                      <p className="text-gray-700 dark:text-gray-300 text-base mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* 주요 기능 */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          {currentLanguage === 'en' ? '▪ Key Features:' : '▪ 주요 기능:'}
                        </h4>
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">✓</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 우측: 다이어그램/이미지 공간 (1/3) */}
                    <div className="lg:col-span-1">
                      <div className="bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 h-full min-h-[200px] flex flex-col items-center justify-center">
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
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
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
              </div>
            ))}
          </div>
        </section>

        <section id="achievements" className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'History & Achievements' : '연혁 및 성과'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 dark:bg-blue-700">
                  <th className="px-6 py-4 text-left text-white font-bold w-1/6">
                    {currentLanguage === 'en' ? 'Year' : '연도'}
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold">
                    {currentLanguage === 'en' ? 'Details' : '내용'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedAchievements.map((item, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                      {item.year}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {item.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 전체보기 버튼 */}
          {allAchievements.length > 8 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllAchievements(!showAllAchievements)}
                className="px-8 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-bold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                {showAllAchievements
                  ? (currentLanguage === 'en' ? 'View Less ▲' : '접기 ▲')
                  : (currentLanguage === 'en' ? `View All (${allAchievements.length}) ▼` : `전체보기 (${allAchievements.length}) ▼`)
                }
              </button>
            </div>
          )}
        </section>

        <section id="contact" className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Contact Information' : '연락처'}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-lg p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-4">{currentLanguage === 'en' ? '📞 Contact Us' : '📞 연락처'}</h3>
                <div className="space-y-2 text-blue-100">
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Phone:' : '전화:'}</strong> 02-553-3631</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong> info@junghocorp.com</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Website:' : '웹사이트:'}</strong> www.junghocorp.com</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">{currentLanguage === 'en' ? '📍 Location' : '📍 오시는 길'}</h3>
                <p className="text-blue-100">
                  {currentLanguage === 'en'
                    ? '435, Apgujeong-ro, Gangnam-gu, Seoul, Korea'
                    : '서울특별시 강남구 압구정로 435 (청담동)'
                  }
                </p>
                <button
                  onClick={() => navigate('/classic/about/location')}
                  className="mt-4 px-5 py-2 bg-white text-blue-700 font-semibold rounded hover:bg-blue-50 transition-colors duration-200"
                >
                  {currentLanguage === 'en' ? 'View Map →' : '지도 보기 →'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {currentLanguage === 'en'
                ? 'Want to learn about other subsidiaries of JUNGHO Group?'
                : '정호그룹의 다른 계열사도 알아보세요'
              }
            </p>
            <button
              onClick={() => navigate('/classic/subsidiaries')}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries →' : '전체 계열사 보기 →'}
            </button>
          </div>
        </section>
      </TraditionalLayout>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
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
            <img
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
        </div>
      )}
    </div>
  );
};

export default TLCDetailClassic;

