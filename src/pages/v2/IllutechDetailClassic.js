import React, { useState } from 'react';
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
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  // 사이드바는 TraditionalLayout에서 자동 생성 (category="subsidiaries")

  // 회사 정보 (삭제됨 - Hybrid 버전과 동기화)

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

  // 연혁 및 성과 (최신순 정렬)
  const allAchievements = currentLanguage === 'en' ? [
    { year: '2009', content: 'Registered as qualified supplier for nuclear power plants, Selected as 7th Korea Green Energy Excellent Company, Established corporate research institute, Supplied to Gori, Yeonggwang, Shin-Gori, and Ulchin nuclear power plants' },
    { year: '2008', content: 'Selected as excellent nuclear power cooperation company, Developed LED lighting for nuclear power plants (first in Korea) and exclusive supply, Received 12th Energy Winner Award, Developed industrial LED lighting, Established corporate research institute' },
    { year: '2007', content: 'Patented solar-powered bus stop lighting system, Completed Korea Hydro & Nuclear Power research project' },
    { year: '2006', content: 'Designated as LED specialized venture company, Developed LED power bulb' },
    { year: '2005', content: 'Patented solar LED street light and SMPS temperature compensation furnace, Completed SMPS reliability improvement project' },
    { year: '2004', content: 'Participated in Chonnam National University Regional Cooperation Center (RRC) semiconductor consortium' },
    { year: '2003', content: 'Established ILLUTECH Co., Ltd., Established LED specialized research institute and production plant, Developed LED traffic lights' }
  ] : [
    { year: '2009년', content: '원자력발전소 유자격 공급자 등록, 제7회 대한민국 녹색 에너지우수 기업대상 선정, 기업 부설 연구소 설립, 고리, 영광, 신고리, 울진 원자력발전소 등 납품' },
    { year: '2008년', content: '상생협력 우수원자력 기업인 선정, 원자력 발전소용 LED 조명등 국내 최초 개발 및 독점 공급, 제12회 에너지위너상 수상, 산업용 LED 등기구 개발, 기업 부설 연구소 설립' },
    { year: '2007년', content: '태양광을 이용한 버스 승강장 조명장치 특허 등록, 한국수력원자력 연구 과제 수행 완료' },
    { year: '2006년', content: 'LED 전문 벤처기업 지정, LED 파워 전구 개발' },
    { year: '2005년', content: '태양광 LED 가로등, SMPS 온도보상화로 특허 등록, SMPS 신뢰성 개선사업 수행 완료' },
    { year: '2004년', content: '전남대 지역협력센터(RRC) 반도체 컨소시엄 참여' },
    { year: '2003년', content: '(주)일루텍 설립, LED 전문 연구소 및 생산 공장 설립, LED 교통신호등 개발' }
  ];

  const displayedAchievements = showAllAchievements ? allAchievements : allAchievements.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TraditionalNav version="classic" />

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
                ? 'Established in 2003, ILLUTECH specializes in industrial and special LED lighting. We develop and supply high-quality lighting solutions for nuclear plants, hospitals, factories, and public facilities.'
                : '2003년 설립된 일루텍은 산업용 및 특수 LED 조명 전문 기업입니다. 원전, 병원, 공장, 공공시설 등을 위한 고품질 조명 솔루션을 개발 및 공급합니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
              {currentLanguage === 'en'
                ? 'With specialized technology and strict quality standards, we provide safe and reliable lighting products for special environments.'
                : '특화된 기술력과 엄격한 품질 기준으로 특수 환경에 적합한 안전하고 신뢰할 수 있는 조명 제품을 제공합니다.'
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

