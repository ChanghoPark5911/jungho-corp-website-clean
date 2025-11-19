import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 정호텍스컴 상세 페이지 - 클래식 버전
 */
const TexcomDetailClassic = () => {
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
      value: currentLanguage === 'en' ? 'Jungho TEXCOM Co., Ltd.' : '(주)정호텍스컴'
    },
    { 
      label: currentLanguage === 'en' ? 'Established' : '설립일',
      value: currentLanguage === 'en' ? 'March 1982 (Separated 2007)' : '1982년 3월 (2007년 분사)'
    },
    { 
      label: currentLanguage === 'en' ? 'CEO' : '대표이사',
      value: currentLanguage === 'en' ? 'Kim Jung-ho' : '김정호'
    },
    { 
      label: currentLanguage === 'en' ? 'Business' : '주요 사업',
      value: currentLanguage === 'en'
        ? 'Textile Machinery, Testing Equipment, RSS'
        : '섬유기계·시험기, RSS'
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
      name: currentLanguage === 'en' ? 'Textile Machinery' : '섬유 기계',
      description: currentLanguage === 'en'
        ? 'Import and distribution of advanced textile machinery from Europe'
        : '유럽산 첨단 섬유 기계 수입 및 유통',
      features: currentLanguage === 'en' 
        ? ['Weaving Machines', 'Processing Equipment', 'Technical Support', 'After-Sales Service']
        : ['직조 기계', '가공 설비', '기술 지원', '사후 서비스']
    },
    {
      name: currentLanguage === 'en' ? 'Testing Equipment' : '섬유 시험기',
      description: currentLanguage === 'en'
        ? 'Textile testing instruments for quality control and R&D'
        : '품질 관리 및 연구개발을 위한 섬유 시험 장비',
      features: currentLanguage === 'en'
        ? ['Strength Testing', 'Quality Analysis', 'Precision Measurement', 'Lab Equipment']
        : ['강도 시험', '품질 분석', '정밀 측정', '실험실 장비']
    },
    {
      name: currentLanguage === 'en' ? 'RSS Solutions' : 'RSS 솔루션',
      description: currentLanguage === 'en'
        ? 'Recycling solutions for sustainable textile industry'
        : '지속 가능한 섬유 산업을 위한 재활용 솔루션',
      features: currentLanguage === 'en'
        ? ['Recycling System', 'Waste Reduction', 'Eco-friendly', 'Cost Efficiency']
        : ['재활용 시스템', '폐기물 절감', '친환경', '비용 효율']
    }
  ];

  const achievements = currentLanguage === 'en' ? [
    { year: '2017.11', content: 'Agency contract with Lindauer Dornier GmbH (Germany) - Tire cord weaving machine' },
    { year: '2007.01', content: 'Jungho TEXCOM separated from Jungho Group' },
    { year: '2005.01', content: 'Agency contract with Lenzing Instruments (Austria) - Textile Testing instruments' },
    { year: '2002.01', content: 'Agency contract with Benninger Zell GmbH (Germany) - Dip and Hot Stretch Unit' },
    { year: '2001.09', content: 'Agency contract with Texkimp Limited (UK) - Unwinding Creel for tire cord' },
    { year: '2001.06', content: 'Agency contract with Temafa (Germany) - Recycling Machine' }
  ] : [
    { year: '2017년 11월', content: '독일 Lindauer Dornier GmbH와 Agency 계약 - Tire cord weaving machine' },
    { year: '2007년 1월', content: '주식회사 정호텍스컴 정호그룹 분사' },
    { year: '2005년 1월', content: '오스트리아 Lenzing Instruments와 Agency 계약 - Textile Testing instruments' },
    { year: '2002년 1월', content: '독일 Benninger Zell GmbH와 Agency 계약 - Dip and Hot Stretch Unit' },
    { year: '2001년 9월', content: '영국 Texkimp Limited와 Agency 계약 - Unwinding Creel for tire cord' },
    { year: '2001년 6월', content: '독일 Temafa와 Agency 계약 - Recycling Machine' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TraditionalNav />

      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group Subsidiary' : '정호그룹 계열사'}
        title={currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴'}
        description={currentLanguage === 'en'
          ? 'Bridge connecting textile industry and fashion'
          : '섬유 산업과 패션을 잇는 가교'
        }
        backgroundImage="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&q=80"
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
                ? 'Since 1982, Jungho TEXCOM has been a bridge between the textile industry and fashion. We import and distribute advanced textile machinery and testing equipment from European manufacturers, contributing to the development of Korea\'s textile industry.'
                : '1982년부터 정호텍스컴은 섬유 산업과 패션을 잇는 가교 역할을 해왔습니다. 유럽의 선진 섬유 기계 및 시험 장비를 수입·유통하며 한국 섬유 산업 발전에 기여하고 있습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {currentLanguage === 'en'
                ? 'We maintain agency contracts with leading global manufacturers and provide comprehensive technical support and after-sales service.'
                : '세계적인 제조사들과의 대리점 계약을 유지하며, 종합적인 기술 지원 및 사후 서비스를 제공합니다.'
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

export default TexcomDetailClassic;

