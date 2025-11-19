import React from 'react';
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

  // 사이드바 메뉴 (클라루스 관련)
  const sidebarItems = [
    { id: 'intro', label: currentLanguage === 'en' ? 'Company Info' : '회사 소개', path: '#intro', active: true },
    { id: 'products', label: currentLanguage === 'en' ? 'Products' : '제품/서비스', path: '#products' },
    { id: 'achievements', label: currentLanguage === 'en' ? 'Achievements' : '실적 및 성과', path: '#achievements' },
    { id: 'contact', label: currentLanguage === 'en' ? 'Contact' : '연락처', path: '#contact' }
  ];

  // 회사 정보
  const companyInfo = [
    { 
      label: currentLanguage === 'en' ? 'Company Name' : '회사명',
      value: currentLanguage === 'en' ? 'CLARUS Korea Co., Ltd.' : '(주)클라루스코리아'
    },
    { 
      label: currentLanguage === 'en' ? 'Established' : '설립일',
      value: currentLanguage === 'en' ? 'February 2009' : '2009년 2월'
    },
    { 
      label: currentLanguage === 'en' ? 'CEO' : '대표이사',
      value: currentLanguage === 'en' ? 'Kim Jung-ho' : '김정호'
    },
    { 
      label: currentLanguage === 'en' ? 'Business' : '주요 사업',
      value: currentLanguage === 'en'
        ? 'IoT-based Smart Lighting Control, Power Monitoring'
        : 'IoT 기반 스마트 조명 제어, 전력 감시 제어'
    },
    { 
      label: currentLanguage === 'en' ? 'Address' : '주소',
      value: currentLanguage === 'en'
        ? '435, Apgujeong-ro, Gangnam-gu, Seoul'
        : '서울특별시 강남구 압구정로 435 (청담동)'
    },
    { 
      label: currentLanguage === 'en' ? 'Phone' : '전화',
      value: '02-553-3631'
    },
    { 
      label: currentLanguage === 'en' ? 'Email' : '이메일',
      value: 'info@clarus.co.kr'
    },
    { 
      label: currentLanguage === 'en' ? 'Website' : '웹사이트',
      value: 'www.clarus.co.kr'
    }
  ];

  // 주요 제품/서비스
  const products = [
    {
      name: currentLanguage === 'en' ? 'Lighting Control System' : '조명 제어 시스템',
      description: currentLanguage === 'en'
        ? 'IoT-based integrated lighting control for buildings and facilities'
        : 'IoT 기반 건물 및 시설물 통합 조명 제어',
      features: currentLanguage === 'en' 
        ? ['Remote Control', 'Energy Saving', 'Schedule Management', 'Real-time Monitoring']
        : ['원격 제어', '에너지 절감', '스케줄 관리', '실시간 모니터링']
    },
    {
      name: currentLanguage === 'en' ? 'Power Monitoring System' : '전력 감시 시스템',
      description: currentLanguage === 'en'
        ? 'Real-time power consumption monitoring and analysis'
        : '실시간 전력 사용량 감시 및 분석',
      features: currentLanguage === 'en'
        ? ['Power Measurement', 'Data Analysis', 'Report Generation', 'Alert System']
        : ['전력 계측', '데이터 분석', '리포트 생성', '알람 시스템']
    },
    {
      name: currentLanguage === 'en' ? 'Building Automation Solution' : '빌딩 자동화 솔루션',
      description: currentLanguage === 'en'
        ? 'Integrated management solution for smart buildings'
        : '스마트 빌딩을 위한 통합 관리 솔루션',
      features: currentLanguage === 'en'
        ? ['Central Management', 'System Integration', 'Mobile App', 'Cloud Service']
        : ['중앙 관리', '시스템 통합', '모바일 앱', '클라우드 서비스']
    }
  ];

  // 주요 실적 (연혁 및 성과)
  const achievements = currentLanguage === 'en' ? [
    { year: '2023', content: 'Awarded "Excellent LED Company", Supplied smart lighting to Seoul Metropolitan Office' },
    { year: '2022', content: 'Supplied to Gyeonggi Provincial Government New Building, Developed AI-based energy management system' },
    { year: '2021', content: 'Received "Innovation Award" at International LED/OLED Conference' },
    { year: '2020', content: 'Expanded IoT platform business, Supplied to data centers nationwide' },
    { year: '2019', content: 'Awarded "Excellent Company" at Seoul LED & OLED EXPO' },
    { year: '2018', content: 'Supplied Parc.1 in Icheon Gyeongdeok, Awarded "Best Company Award"' },
    { year: '2017', content: 'Group CEO received Legal Education Award, Participated in Dubai LFI' },
    { year: '2016', content: 'Participated in Egypt LFI Exhibition, Represented Gyeonggi IP Center as excellent company' },
    { year: '2015', content: 'Patent Office Director Award, International Exhibition Company Award' },
    { year: '2014', content: 'Developed SI/FMS products, Supplied to luxury hotels and hospitals' },
    { year: '2013', content: 'Awarded "CLARUS Brand Creation Company" (Small Business Administration)' },
    { year: '2012', content: 'Exported building control systems (Singapore, Indonesia)' },
    { year: '2011', content: 'Awarded "Excellent Product Selection" (Small Business Administration)' },
    { year: '2009', content: 'Established CLARUS Korea' }
  ] : [
    { year: '2023년', content: 'LED 우수기업 선정, 서울시청 스마트 조명 공급' },
    { year: '2022년', content: '경기도청 신청사 납품, AI 기반 에너지 관리 시스템 개발' },
    { year: '2021년', content: 'LED/OLED 국제 컨퍼런스 혁신상 수상' },
    { year: '2020년', content: 'IoT 플랫폼 사업 확대, 전국 데이터센터 납품' },
    { year: '2019년', content: '서울 LED & OLED EXPO 우수기업상 수상' },
    { year: '2018년', content: '이천 경덕 Parc.1 공급, 우수기업상 수상' },
    { year: '2017년', content: '그룹 CEO 법률교육 이수상, 두바이 LFI 참가' },
    { year: '2016년', content: '이집트 LFI 전시회 참가, 경기지식재산센터 우수기업 대표' },
    { year: '2015년', content: '특허청장상, 국제전시컨벤션기업상 수상' },
    { year: '2014년', content: 'SI/FMS 제품 개발, 고급호텔·병원 납품' },
    { year: '2013년', content: 'CLARUS 브랜드 창조 기업상 수상 (중소기업청)' },
    { year: '2012년', content: '빌딩관제시스템 해외수출 (싱가포르, 인도네시아)' },
    { year: '2011년', content: '우수상품 선정상 수상 (중소기업청)' },
    { year: '2009년', content: '클라루스코리아 설립' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 전통적 네비게이션 */}
      <TraditionalNav />

      {/* 작은 배너 */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group Subsidiary' : '정호그룹 계열사'}
        title={currentLanguage === 'en' 
          ? 'CLARUS Korea'
          : '클라루스코리아'
        }
        description={currentLanguage === 'en'
          ? 'IoT-based Smart Lighting Control Specialist'
          : 'IoT 기반 스마트 조명 제어 전문 기업'
        }
        backgroundImage="https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1920&q=80"
        height="400px"
      />

      {/* 메인 콘텐츠 - 전통적 레이아웃 */}
      <TraditionalLayout showSidebar={true} sidebarItems={sidebarItems}>
        {/* 회사 소개 */}
        <section id="intro" className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-md">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-base">
              {currentLanguage === 'en'
                ? 'Established in 2009, CLARUS Korea is a specialized company in IoT-based smart lighting control. We provide optimized solutions for energy management and building automation by combining cutting-edge IoT technology with lighting control systems.'
                : '2009년 설립된 클라루스코리아는 IoT 기반 스마트 조명 제어 전문 기업입니다. 최첨단 IoT 기술과 조명 제어 시스템을 결합하여 에너지 관리 및 빌딩 자동화에 최적화된 솔루션을 제공합니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {currentLanguage === 'en'
                ? 'We have successfully delivered projects to major buildings nationwide and are growing as a leader in smart building solutions.'
                : '전국의 주요 건물에 성공적인 프로젝트를 납품하였으며, 스마트 빌딩 솔루션의 선도 기업으로 성장하고 있습니다.'
              }
            </p>
          </div>

          {/* 회사 정보 표 */}
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
            <table className="w-full">
              <tbody>
                {companyInfo.map((item, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700/50 w-1/3">
                      {item.label}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              <div key={index} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-base mb-3">
                      {product.description}
                    </p>
                  </div>
                </div>
                
                {/* 주요 기능 */}
                <div className="pl-16">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {currentLanguage === 'en' ? '▪ Key Features:' : '▪ 주요 기능:'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                        <span className="text-blue-600 dark:text-blue-400">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
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
                {achievements.map((item, index) => (
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
    </div>
  );
};

export default ClarusDetailClassic;

