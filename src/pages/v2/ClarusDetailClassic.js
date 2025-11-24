import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 클라루스 상세 페이지 - 클래식 버전 (전통적 스타일)
 * - 기존 정호그룹 웹사이트 스타일 모방
 * - 탭 대신 섹션 형식
 */
const ClarusDetailClassic = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 사이드바는 TraditionalLayout에서 자동 생성 (category="subsidiaries")

  // 회사 정보 (삭제됨 - Hybrid 버전과 동기화)

  // 주요 제품/서비스
  const products = [
    {
      name: currentLanguage === 'en' ? 'Lighting Control System' : '조명제어시스템',
      description: currentLanguage === 'en'
        ? 'IoT-based integrated lighting control for buildings and facilities'
        : 'IoT 기반 건물 및 시설물 통합 조명 제어',
      features: currentLanguage === 'en' 
        ? ['Remote Control', 'Energy Saving', 'Schedule Management', 'Real-time Monitoring']
        : ['원격 제어', '에너지 절감', '스케줄 관리', '실시간 모니터링'],
      imagePath: '/images/clarus/lighting-control-diagram.png'
    },
    {
      name: currentLanguage === 'en' ? 'Power Monitoring System' : '전력감시시스템',
      description: currentLanguage === 'en'
        ? 'Real-time power consumption monitoring and analysis'
        : '실시간 전력 사용량 감시 및 분석',
      features: currentLanguage === 'en'
        ? ['Power Measurement', 'Data Analysis', 'Report Generation', 'Alert System']
        : ['전력 계측', '데이터 분석', '리포트 생성', '알람 시스템'],
      imagePath: '/images/clarus/power-monitoring-diagram.png'
    },
    {
      name: currentLanguage === 'en' ? 'Export Business' : '해외사업(수출)',
      description: currentLanguage === 'en'
        ? 'Building global export infrastructure for Clarus lighting control products'
        : 'Clarus 조명제어 제품의 해외수출 인프라 구축',
      features: currentLanguage === 'en'
        ? ['North America/Europe advanced markets, China/Taiwan', 'Southeast Asian emerging markets including Vietnam/Philippines']
        : ['북미/유럽 선진시장, 중국/대만', '베트남/필리핀 등 동남아 신흥시장'],
      imagePath: '/images/clarus/export-business-map.png'
    }
  ];

  // 연혁 및 성과 (최신순 정렬)
  const allAchievements = currentLanguage === 'en' ? [
    { year: '2025', content: 'Launched Energy Manager 5 (EM5) lighting/power software, Released 6 new D-Type Program Switch models, Launched Google Android/Apple iOS EF2 Setting App' },
    { year: '2024', content: 'Upgraded Single Pole Relay UL/cUL 20A 30A approval performance, Developed and launched Double Pole Relay driving Kit' },
    { year: '2023', content: 'Established Magic CLARUS online e-commerce platform and started sales (Naver, Coupang), Launched upgraded IPC optimized for Zero Energy Buildings' },
    { year: '2022', content: 'Launched Energy Harvesting wireless Stand Alone (Kinetic) switch products, Obtained KC electrical appliance safety certification for electronic switch wireless relay module' },
    { year: '2020', content: 'Developed Ladder-Less remote control system platform, Launched remote setting products for motion sensors/light sensors' },
    { year: '2018', content: 'Launched web-based distributed control devices (IPC, SPC)' },
    { year: '2014', content: 'Obtained K-Mark performance certification and Q-Mark quality certification (Building Automation Control System)' },
    { year: '2013', content: 'Obtained GS (Good Software) certification (13-0033), FCC (Part 15 Class A, B) certification for all lighting control system products' },
    { year: '2012', content: 'Developed Energy Manager 4 (EM4) (Windows7 64bit Version)' },
    { year: '2010-2011', content: 'Developed power control system software, parking control solution, access control solution ACS' },
    { year: '2009', content: 'Changed company name to CLARUS Korea Co., Ltd., Established corporate research institute, Obtained UL/CUL certification for 20A HID RELAY' },
    { year: '2008', content: 'Developed 20A Relay and relay control Terminal Unit' },
    { year: '2007', content: 'Developed CLARUS DALI EASYCON lighting control system (DLU, DSU, DBU) using DALI ballast' },
    { year: '2006', content: 'Developed Lighting Manager II ARS system software dedicated to lighting control' },
    { year: '2005', content: 'Developed Lighting Manager II software (lighting control via Intranet, Ethernet)' },
    { year: '2004', content: 'Developed Lighting Manager software (Windows 2000, XP Version)' },
    { year: '2003', content: 'Developed E/F2-BUS lighting control system, devices, and programs, New SNU/SIU and E/F2-BUS configuration program' },
    { year: '2002', content: 'Established Jungho Light Tech Co., Ltd.' }
  ] : [
    { year: '2025년', content: 'Energy Manager 5 (EM5) 조명/전력 소프트웨어 신제품 출시, D-Type Program Switch 6종 신제품 출시, Google Android/Apple iOS EF2 Setting App 출시' },
    { year: '2024년', content: 'Single Pole Relay UL/cUL 20A 30A 승인 성능 업그레이드, Double Pole Relay 구동 Kit 개발 및 출시' },
    { year: '2023년', content: 'Magic CLARUS 온라인 E커머스 플랫폼 구축 및 판매개시 (Naver, Coupang), Zero Energy Building 최적화 IPC 업그레이드 출시' },
    { year: '2022년', content: 'Energy Harvesting 무배선 Stand Alone (Kinetic) 스위치 제품 출시, 전자식 스위치 무선수신 릴레이 모듈 KC전기용품안전인증 획득' },
    { year: '2020년', content: 'Ladder-Less 원격제어 시스템 플랫폼 개발, 인체감지센서/조도센서 원격 설정 제품 출시' },
    { year: '2018년', content: '웹 기반 분산 제어장치 (IPC, SPC) 출시' },
    { year: '2014년', content: '성능인증 K마크/품질인증 Q마크 인증 획득 (건물자동제어시스템)' },
    { year: '2013년', content: 'GS(Good Software) 인증 획득 (13-0033), 조명제어 시스템 전 품목 FCC(Part 15 Class A, B) 인증 획득' },
    { year: '2012년', content: 'Energy Manager 4 (EM4) 개발 (Windows7 64bit Version)' },
    { year: '2010년~2011년', content: '전력제어시스템 Software, 주차관제솔루션, 출입관제솔루션 ACS 개발' },
    { year: '2009년', content: '㈜클라루스코리아로 상호 변경, 기업부설 연구소 설립, 20A HID RELAY UL/CUL 인증 획득' },
    { year: '2008년', content: '20A Relay 개발, Relay 제어용 Terminal Unit 개발' },
    { year: '2007년', content: 'DALI 안정기를 이용한 CLARUS DALI EASYCON 조명제어 시스템 (DLU, DSU, DBU) 개발' },
    { year: '2006년', content: '조명제어 전용 Software Lighting Manager II ARS 시스템 소프트웨어 개발' },
    { year: '2005년', content: 'Lighting Manager II 소프트웨어 개발 (Intranet, Ethernet을 통한 조명제어)' },
    { year: '2004년', content: 'Lighting Manager 소프트웨어 개발 (Windows 2000, XP Version)' },
    { year: '2003년', content: 'E/F2-BUS 조명제어 시스템 및 디바이스, 프로그램 개발, 신형 SNU/SIU와 E/F2-BUS 설정용 프로그램 개발' },
    { year: '2002년', content: '㈜정호라이트테크 설립' }
  ];

  const displayedAchievements = showAllAchievements ? allAchievements : allAchievements.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 전통적 네비게이션 */}
      <TraditionalNav version="classic" />

      {/* 작은 배너 */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group Subsidiary' : '정호그룹 계열사'}
        title={currentLanguage === 'en' 
          ? 'CLARUS'
          : '클라루스'
        }
        description={currentLanguage === 'en'
          ? 'IoT-based Smart Lighting Control Specialist'
          : 'IoT 기반 스마트 조명 제어 전문 기업'
        }
        backgroundImage="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1920&q=80"
        height="400px"
      />

      {/* 메인 콘텐츠 - 전통적 레이아웃 */}
      <TraditionalLayout showSidebar={true} category="subsidiaries" version="classic">
        {/* 회사 소개 */}
        <section id="intro" className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base">
              {currentLanguage === 'en'
                ? 'Established in 2009, CLARUS is a specialized company in IoT-based smart lighting control. We provide optimized solutions for energy management and building automation by combining cutting-edge IoT technology with lighting control systems.'
                : '2009년 설립된 클라루스는 IoT 기반 스마트 조명 제어 전문 기업입니다. 최첨단 IoT 기술과 조명 제어 시스템을 결합하여 에너지 관리 및 빌딩 자동화에 최적화된 솔루션을 제공합니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {currentLanguage === 'en'
                ? 'We have successfully delivered projects to major buildings nationwide and are growing as a leader in smart building solutions.'
                : '전국의 주요 건물에 성공적인 프로젝트를 납품하였으며, 스마트 빌딩 솔루션의 선도 기업으로 성장하고 있습니다.'
              }
            </p>
          </div>
          {/* 회사 개요 섹션 삭제됨 - Hybrid 버전과 동기화 */}
        </section>

        {/* 제품/서비스 */}
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
                          {currentLanguage === 'en' ? '▪ Key Features:' : index === 2 ? '▪ 대상:' : '▪ 주요 기능:'}
                        </h4>
                        <div className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                              <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                                {index === 2 ? '-' : '✓'}
                              </span>
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
                            className="w-full h-full flex items-center justify-center cursor-pointer group relative"
                            onClick={() => setSelectedImage({ src: product.imagePath, alt: product.name })}
                          >
                            <img 
                              src={product.imagePath} 
                              alt={`${product.name} diagram`}
                              className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* 연혁 및 성과 */}
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

        {/* 연락처 */}
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
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong> info@clarus.co.kr</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Website:' : '웹사이트:'}</strong> www.clarus.co.kr</p>
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

        {/* 다른 계열사 보기 */}
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

export default ClarusDetailClassic;

