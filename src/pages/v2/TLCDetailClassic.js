import React from 'react';
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

  const sidebarItems = [
    { id: 'intro', label: currentLanguage === 'en' ? 'Company Info' : '회사 소개', path: '#intro', active: true },
    { id: 'products', label: currentLanguage === 'en' ? 'Products' : '제품/서비스', path: '#products' },
    { id: 'achievements', label: currentLanguage === 'en' ? 'Achievements' : '실적 및 성과', path: '#achievements' },
    { id: 'contact', label: currentLanguage === 'en' ? 'Contact' : '연락처', path: '#contact' }
  ];

  const companyInfo = [
    { 
      label: currentLanguage === 'en' ? 'Company Name' : '회사명',
      value: currentLanguage === 'en' ? 'Jungho TLC Co., Ltd.' : '(주)정호티엘씨'
    },
    { 
      label: currentLanguage === 'en' ? 'Established' : '설립일',
      value: currentLanguage === 'en' ? 'March 1982' : '1982년 3월'
    },
    { 
      label: currentLanguage === 'en' ? 'CEO' : '대표이사',
      value: currentLanguage === 'en' ? 'Kim Jung-ho' : '김정호'
    },
    { 
      label: currentLanguage === 'en' ? 'Business' : '주요 사업',
      value: currentLanguage === 'en'
        ? 'Integrated Lighting & Power Control, Building Automation'
        : '조명·전력 통합 제어, 빌딩 자동화'
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
      value: 'info@junghocorp.com'
    },
    { 
      label: currentLanguage === 'en' ? 'Website' : '웹사이트',
      value: 'www.junghocorp.com'
    }
  ];

  const products = [
    {
      name: currentLanguage === 'en' ? 'Building Automation System' : '빌딩 자동화 시스템',
      description: currentLanguage === 'en'
        ? 'Integrated control system for lighting, power, and facility management'
        : '조명, 전력, 설비 관리를 위한 통합 제어 시스템',
      features: currentLanguage === 'en' 
        ? ['Central Management', 'Energy Optimization', 'Fault Detection', 'Remote Monitoring']
        : ['중앙 관리', '에너지 최적화', '고장 감지', '원격 모니터링']
    },
    {
      name: currentLanguage === 'en' ? 'Lighting Control Solution' : '조명 제어 솔루션',
      description: currentLanguage === 'en'
        ? 'Advanced lighting control for commercial and industrial facilities'
        : '상업 및 산업 시설을 위한 고급 조명 제어',
      features: currentLanguage === 'en'
        ? ['Dimming Control', 'Scene Management', 'Energy Saving', 'Schedule Control']
        : ['디밍 제어', '장면 관리', '에너지 절감', '스케줄 제어']
    },
    {
      name: currentLanguage === 'en' ? 'Power Management System' : '전력 관리 시스템',
      description: currentLanguage === 'en'
        ? 'Real-time power monitoring and management solution'
        : '실시간 전력 모니터링 및 관리 솔루션',
      features: currentLanguage === 'en'
        ? ['Power Measurement', 'Load Management', 'Peak Control', 'Data Analysis']
        : ['전력 계측', '부하 관리', '피크 제어', '데이터 분석']
    }
  ];

  const achievements = currentLanguage === 'en' ? [
    { year: '2018', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Supplied Parc.1 in Icheon Gyeongdeok' },
    { year: '2017', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Group CEO received Legal Education Award' },
    { year: '2016', content: 'Awarded "Excellent Exhibition Company" at Seoul LED & OLED EXPO, Participated in LFI Exhibition in Egypt' },
    { year: '2015', content: 'Participated in Dubai Lighting Fair (LFI), LED/OLED International Exhibition Convention Company Award' },
    { year: '2014', content: 'Developed SI/FMS products, Supplied to super high-rise buildings and luxury hotels' },
    { year: '2013', content: 'Awarded "CLARUS Brand Creation Company" (Small Business Administration)' },
    { year: '2012', content: 'Overseas export of building control systems (Singapore, Indonesia)' },
    { year: '2011', content: 'Awarded "Excellent Product Selection" (Small Business Administration)' },
    { year: '1982', content: 'Established Jungho TLC Co., Ltd.' }
  ] : [
    { year: '2018년', content: '서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 이천경덕 Parc.1 공급' },
    { year: '2017년', content: '서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 그룹 CEO 법률교육 이수상 수상' },
    { year: '2016년', content: '서울 LED & OLED EXPO 대한민국우수전시업체상 수상, 이집트 LFI 전시회 참가' },
    { year: '2015년', content: '두바이 라이팅페어 참가 (LFI), LED/OLED 국제 전시회 참가/국제전시컨벤션기업상' },
    { year: '2014년', content: 'SI/FMS 제품 개발, 초고층빌딩 및 고급호텔 프로젝트 납품' },
    { year: '2013년', content: 'CLARUS 브랜드 창조 기업상 수상 (중소기업청)' },
    { year: '2012년', content: '빌딩관제시스템 해외수출 (싱가포르, 인도네시아)' },
    { year: '2011년', content: '우수상품 선정상 수상 (중소기업청)' },
    { year: '1982년', content: '정호티엘씨 설립' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
        <section id="intro" className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 shadow-md">
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
    </div>
  );
};

export default TLCDetailClassic;

