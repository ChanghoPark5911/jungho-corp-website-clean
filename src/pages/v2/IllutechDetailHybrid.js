import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 일루텍 상세 페이지 - 하이브리드 버전 (전통적 구조 + 현대적 디자인)
 */
const IllutechDetailHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  // 사이드바 메뉴
  // 사이드바는 TraditionalLayout에서 자동 생성 (category="subsidiaries")

  // 주요 제품/서비스
  const products = [
    {
      name: currentLanguage === 'en' ? 'Industrial LED Lighting' : '산업용 LED 조명',
      description: currentLanguage === 'en'
        ? 'High-efficiency LED lighting for factories and industrial facilities'
        : '공장 및 산업 시설을 위한 고효율 LED 조명',
      features: currentLanguage === 'en' 
        ? ['High Luminosity', 'Long Lifespan', 'Energy Efficiency', 'Dust/Water Resistance']
        : ['고휘도', '장수명', '에너지 효율', '방진·방수'],
      icon: '🏭',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: currentLanguage === 'en' ? 'Special LED Lighting' : '특수 LED 조명',
      description: currentLanguage === 'en'
        ? 'LED lighting solutions for nuclear plants, hospitals, and special environments'
        : '원전, 병원 등 특수 환경을 위한 LED 조명 솔루션',
      features: currentLanguage === 'en'
        ? ['Nuclear Grade', 'Medical Grade', 'Emergency Lighting', 'Explosion Proof']
        : ['원전용 규격', '의료용 규격', '비상 조명', '방폭형'],
      icon: '⚡',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      name: currentLanguage === 'en' ? 'Street & Security Lighting' : '가로등·보안등',
      description: currentLanguage === 'en'
        ? 'Smart LED street and security lighting for public facilities'
        : '공공시설을 위한 스마트 LED 가로등 및 보안등',
      features: currentLanguage === 'en'
        ? ['Smart Control', 'Weather Resistance', 'Low Maintenance', 'Long Lifespan']
        : ['스마트 제어', '내후성', '저유지보수', '장수명'],
      icon: '🌃',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  // 연혁 및 성과 (최신순 정렬)
  const achievements = currentLanguage === 'en' ? [
    { year: '2015', content: 'LED/OLED International Exhibition Convention Company Award, Passed new LED product evaluation' },
    { year: '2014', content: 'Startup Company Award (Small Business Administration), Completed integrated product development' },
    { year: '2013', content: 'Startup Company Award (Small Business Administration)' },
    { year: '2012', content: 'LED safety light (8 types) Electrical Appliance Safety Certification, Registered with Korea Electric Power' },
    { year: '2011', content: 'LED street light "LuBlo" Electrical Appliance Safety Certification, LED security light development and overseas export' },
    { year: '2010', content: 'LED security light KS certification, Supplied products to hospitals, hotels, and industrial sites' },
    { year: '2009', content: 'Registered as qualified supplier for nuclear power plants, Selected as 7th Korea Green Energy Excellent Company Award, Established corporate research institute, Supplied to Gori, Yeonggwang, Shin-Gori, and Uljin nuclear power plants' },
    { year: '2008', content: 'Selected as Outstanding Nuclear Power Company for Win-Win Cooperation, First domestic development and exclusive supply of LED lighting for nuclear power plants, 12th Energy Winner Award, Developed industrial LED lighting fixtures, Established corporate research institute' },
    { year: '2007', content: 'Patent registration for solar-powered bus shelter lighting system, Completed research project for Korea Hydro & Nuclear Power' },
    { year: '2006', content: 'Designated as LED specialized venture company, Developed LED power bulb' },
    { year: '2005', content: 'Patent registration for solar LED street light and SMPS temperature compensation circuit, Completed SMPS reliability improvement project' },
    { year: '2004', content: 'Participated in Chonnam National University Regional Cooperation Center (RRC) semiconductor consortium' },
    { year: '2003', content: 'Established ILLUTECH Co., Ltd., Established LED specialized research institute and production factory, Developed LED traffic signal lights' }
  ] : [
    { year: '2015년', content: 'LED/OLED 국제 전시회 참가/국제전시컨벤션기업상, 신제품 LED 평가품 합격' },
    { year: '2014년', content: '창업기업상 수상 (중소기업청), 통합 제품개발 완료' },
    { year: '2013년', content: '창업기업상 수상 (중소기업청)' },
    { year: '2012년', content: 'LED 안전등(8종) 전기용품안전인증 획득, 한국전력 제품 등록' },
    { year: '2011년', content: 'LED 가로등 \'LuBlo\' 전기용품안전인증 획득, LED 보안등 개발 및 해외수출 달성' },
    { year: '2010년', content: 'LED 보안등 KS인증 획득, 병원·호텔·산업용 제품 공급' },
    { year: '2009년', content: '원자력발전소 유자격 공급자 등록, 제7회 대한민국 녹색 에너지우수 기업대상 선정, 기업 부설 연구소 설립, 고리·영광·신고리·울진 원자력발전소 등 납품' },
    { year: '2008년', content: '상생협력 우수원자력 기업인 선정, 원자력 발전소용 LED 조명등 국내 최초 개발 및 독점 공급, 제12회 에너지위너상 수상, 산업용 LED 등기구 개발, 기업 부설 연구소 설립' },
    { year: '2007년', content: '태양광을 이용한 버스 승강장 조명장치 특허 등록, 한국수력원자력 연구 과제 수행 완료' },
    { year: '2006년', content: 'LED 전문 벤처기업 지정, LED 파워 전구 개발' },
    { year: '2005년', content: '태양광 LED 가로등, SMPS 온도보상화로 특허 등록, SMPS 신뢰성 개선사업 수행 완료' },
    { year: '2004년', content: '전남대 지역협력센터(RRC) 반도체 컨소시엄 참여' },
    { year: '2003년', content: '(주)일루텍 설립, LED 전문 연구소 및 생산 공장 설립, LED 교통신호등 개발' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav version="hybrid" />

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

      <TraditionalLayout showSidebar={true} category="subsidiaries" version="hybrid">
        {/* 회사 소개 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-l-4 border-orange-600 dark:border-orange-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Established in 2003, ILLUTECH specializes in industrial and special LED lighting. We develop and supply high-quality lighting solutions for nuclear plants, hospitals, factories, and public facilities.'
                : '2003년 설립된 일루텍은 산업용 및 특수 LED 조명 전문 기업입니다. 원전, 병원, 공장, 공공시설 등을 위한 고품질 조명 솔루션을 개발 및 공급합니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {currentLanguage === 'en'
                ? 'With specialized technology and strict quality standards, we provide safe and reliable lighting products for special environments.'
                : '특화된 기술력과 엄격한 품질 기준으로 특수 환경에 적합한 안전하고 신뢰할 수 있는 조명 제품을 제공합니다.'
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
          <div className="border-l-4 border-orange-600 dark:border-orange-500 pl-4 mb-6">
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
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{product.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      {currentLanguage === 'en' ? '▪ Key Features:' : '▪ 주요 기능:'}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <span className={`text-lg bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}>✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
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
          <div className="border-l-4 border-orange-600 dark:border-orange-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'History & Achievements' : '연혁 및 성과'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
            <ul className="space-y-4">
              {(showAllAchievements ? achievements : achievements.slice(0, 8)).map((item, index) => (
                <motion.li 
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
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
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
          <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 dark:from-orange-700 dark:via-orange-800 dark:to-red-700 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>📞</span>
              {currentLanguage === 'en' ? 'Contact Information' : '연락처'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-bold mb-3">{currentLanguage === 'en' ? 'Contact Us' : '문의하기'}</h4>
                <div className="space-y-2 text-orange-100">
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Phone:' : '전화:'}</strong> 02-553-3631</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong> info@illutech.co.kr</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Website:' : '웹사이트:'}</strong> www.illutech.co.kr</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3">{currentLanguage === 'en' ? 'Location' : '오시는 길'}</h4>
                <p className="text-orange-100 mb-4">
                  {currentLanguage === 'en'
                    ? '435, Apgujeong-ro, Gangnam-gu, Seoul, Korea'
                    : '서울특별시 강남구 압구정로 435 (청담동)'
                  }
                </p>
                <button
                  onClick={() => navigate('/about/location')}
                  className="px-5 py-2 bg-white text-orange-700 font-semibold rounded-lg hover:bg-orange-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries →' : '전체 계열사 보기 →'}
            </button>
          </div>
        </motion.section>
      </TraditionalLayout>
    </div>
  );
};

export default IllutechDetailHybrid;
