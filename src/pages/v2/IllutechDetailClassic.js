import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 일루텍 상세 페이지 - 클래식 버전
 */
const IllutechDetailClassic = () => {
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
      value: currentLanguage === 'en' ? 'ILLUTECH Co., Ltd.' : '(주)일루텍'
    },
    { 
      label: currentLanguage === 'en' ? 'Established' : '설립일',
      value: currentLanguage === 'en' ? 'March 2010' : '2010년 3월'
    },
    { 
      label: currentLanguage === 'en' ? 'CEO' : '대표이사',
      value: currentLanguage === 'en' ? 'Kim Jung-ho' : '김정호'
    },
    { 
      label: currentLanguage === 'en' ? 'Business' : '주요 사업',
      value: currentLanguage === 'en'
        ? 'Industrial & Special LED Lighting'
        : '산업·특수 LED 조명'
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
      value: 'info@illutech.co.kr'
    },
    { 
      label: currentLanguage === 'en' ? 'Website' : '웹사이트',
      value: 'www.illutech.co.kr'
    }
  ];

  const products = [
    {
      name: currentLanguage === 'en' ? 'Industrial LED Lighting' : '산업용 LED 조명',
      description: currentLanguage === 'en'
        ? 'High-efficiency LED lighting for factories and industrial facilities'
        : '공장 및 산업 시설을 위한 고효율 LED 조명',
      features: currentLanguage === 'en' 
        ? ['High Luminosity', 'Long Lifespan', 'Energy Efficiency', 'Dust/Water Resistance']
        : ['고휘도', '장수명', '에너지 효율', '방진·방수']
    },
    {
      name: currentLanguage === 'en' ? 'Special LED Lighting' : '특수 LED 조명',
      description: currentLanguage === 'en'
        ? 'LED lighting solutions for nuclear plants, hospitals, and special environments'
        : '원전, 병원 등 특수 환경을 위한 LED 조명 솔루션',
      features: currentLanguage === 'en'
        ? ['Nuclear Grade', 'Medical Grade', 'Emergency Lighting', 'Explosion Proof']
        : ['원전용 규격', '의료용 규격', '비상 조명', '방폭형']
    },
    {
      name: currentLanguage === 'en' ? 'Street & Security Lighting' : '가로등·보안등',
      description: currentLanguage === 'en'
        ? 'Smart LED street and security lighting for public facilities'
        : '공공시설을 위한 스마트 LED 가로등 및 보안등',
      features: currentLanguage === 'en'
        ? ['Smart Control', 'Weather Resistance', 'Low Maintenance', 'Long Lifespan']
        : ['스마트 제어', '내후성', '저유지보수', '장수명']
    }
  ];

  const achievements = currentLanguage === 'en' ? [
    { year: '2015', content: 'LED/OLED International Exhibition Convention Company Award, Passed new LED product evaluation' },
    { year: '2014', content: 'Startup Company Award (Small Business Administration), Completed integrated product development' },
    { year: '2013', content: 'Startup Company Award (Small Business Administration)' },
    { year: '2012', content: 'LED safety light (8 types) Electrical Appliance Safety Certification, Registered with Korea Electric Power' },
    { year: '2011', content: 'LED street light "LuBlo" Electrical Appliance Safety Certification, LED security light development and overseas export' },
    { year: '2010', content: 'LED security light KS certification, Supplied products to hospitals, hotels, and industrial sites' }
  ] : [
    { year: '2015년', content: 'LED/OLED 국제 전시회 참가/국제전시컨벤션기업상, 신제품 LED 평가품 합격' },
    { year: '2014년', content: '창업기업상 수상 (중소기업청), 통합 제품개발 완료' },
    { year: '2013년', content: '창업기업상 수상 (중소기업청)' },
    { year: '2012년', content: 'LED 안전등(8종) 전기용품안전인증 획득, 한국전력 제품 등록' },
    { year: '2011년', content: 'LED 가로등 \'LuBlo\' 전기용품안전인증 획득, LED 보안등 개발 및 해외수출 달성' },
    { year: '2010년', content: 'LED 보안등 KS인증 획득, 병원·호텔·산업용 제품 공급' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TraditionalNav />

      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group Subsidiary' : '정호그룹 계열사'}
        title={currentLanguage === 'en' ? 'ILLUTECH' : '일루텍'}
        description={currentLanguage === 'en'
          ? 'Specialist in Industrial & Special LED Lighting'
          : '산업·특수 LED 조명의 전문가'
        }
        backgroundImage="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1920&q=80"
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
                ? 'Established in 2010, ILLUTECH specializes in industrial and special LED lighting. We develop and supply high-quality lighting solutions for nuclear plants, hospitals, factories, and public facilities.'
                : '2010년 설립된 일루텍은 산업용 및 특수 LED 조명 전문 기업입니다. 원전, 병원, 공장, 공공시설 등을 위한 고품질 조명 솔루션을 개발 및 공급합니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {currentLanguage === 'en'
                ? 'With specialized technology and strict quality standards, we provide safe and reliable lighting products for special environments.'
                : '특화된 기술력과 엄격한 품질 기준으로 특수 환경에 적합한 안전하고 신뢰할 수 있는 조명 제품을 제공합니다.'
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
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong> info@illutech.co.kr</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Website:' : '웹사이트:'}</strong> www.illutech.co.kr</p>
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

export default IllutechDetailClassic;

