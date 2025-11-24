import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 정호텍스컴 상세 페이지 - 하이브리드 버전 (전통적 구조 + 현대적 디자인)
 */
const TexcomDetailHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  // 사이드바 메뉴
  // 사이드바는 TraditionalLayout에서 자동 생성 (category="subsidiaries")

  // 사업부별 제품/서비스
  const businessDivisions = [
    {
      division: currentLanguage === 'en' ? 'Textile Machinery Division' : '섬유기계사업부',
      icon: '🏭',
      gradient: 'from-green-500 to-teal-500',
      description: currentLanguage === 'en'
        ? 'Import and distribution of advanced textile machinery and testing equipment'
        : '섬유 기계장비 및 시험기기 수입 및 유통',
      products: [
        {
          name: currentLanguage === 'en' ? '1. Textile Machinery' : '1. 섬유 기계',
          description: currentLanguage === 'en'
            ? 'Import and distribution of advanced textile machinery from Europe'
            : '유럽산 첨단 섬유 기계 수입 및 유통',
          features: currentLanguage === 'en' 
            ? ['Weaving Machines', 'Processing Equipment', 'Technical Support', 'After-Sales Service']
            : ['직조 기계', '가공 설비', '기술 지원', '사후 서비스']
        },
        {
          name: currentLanguage === 'en' ? '2. Testing Equipment' : '2. 섬유 시험기',
          description: currentLanguage === 'en'
            ? 'Textile testing instruments for quality control and R&D'
            : '품질 관리 및 연구개발을 위한 섬유 시험 장비',
          features: currentLanguage === 'en'
            ? ['Strength Testing', 'Quality Analysis', 'Precision Measurement', 'Lab Equipment']
            : ['강도 시험', '품질 분석', '정밀 측정', '실험실 장비']
        }
      ]
    },
    {
      division: currentLanguage === 'en' ? 'RSS Solutions Division' : 'RSS 사업부',
      icon: '♻️',
      gradient: 'from-emerald-500 to-green-500',
      description: currentLanguage === 'en'
        ? 'Sustainable recycling solutions for textile industry'
        : '지속 가능한 섬유 산업을 위한 재활용 솔루션',
      products: [
        {
          name: currentLanguage === 'en' ? '3. RSS Solutions' : '3. RSS 솔루션',
          description: currentLanguage === 'en'
            ? 'Recycling solutions for sustainable textile industry'
            : '지속 가능한 섬유 산업을 위한 재활용 솔루션',
          features: currentLanguage === 'en'
            ? ['Recycling System', 'Waste Reduction', 'Eco-friendly', 'Cost Efficiency']
            : ['재활용 시스템', '폐기물 절감', '친환경', '비용 효율']
        }
      ]
    }
  ];

  // 연혁 및 성과 (최신순 정렬)
  const achievements = currentLanguage === 'en' ? [
    { year: '2017.11', content: 'Agency contract with Lindauer Dornier GmbH (Germany) - Tire cord weaving machine' },
    { year: '2007.01', content: 'Changed company name to Jungho TEXCOM Co., Ltd.' },
    { year: '2005.01', content: 'Agency contract with Lenzing Instruments (Austria) - Textile Testing instruments, Agency contract with Mesdan S.p.A (Italy) - Yarn jointing Splicer & Textile Testing Instruments' },
    { year: '2002.01', content: 'Agency contract with Benninger Zell GmbH (Germany) - Dip and Hot Stretch Unit for treating tyre & single cord' },
    { year: '2001.09', content: 'Agency contract with Texkimp Limited (UK) - Unwinding Creel for tire cord, composite, etc.' },
    { year: '2001.06', content: 'Agency contract with Temafa (Germany) - Recycling Machine' },
    { year: '2000.11', content: 'Agency contract with Novibra GmbH (Germany) - Spindle and top & bottom roller for spindle machines' },
    { year: '1998.03', content: 'Agency contract with Braecker (Switzerland) - Ring & Traveller in Spinning System' },
    { year: '1996.01', content: 'Agency contract with Steinemann (Switzerland) - Central Vacuum System' },
    { year: '1991.08', content: 'Agency contract with Luwa (Switzerland) - Air-conditioning & Waste removal system' },
    { year: '1990.09', content: 'Agency contract with Crosrol (UK) - Blow-room & Carding machine' },
    { year: '1988', content: 'Agency contract with Vouk (Italy) - Drawframe & Combing machine for cotton spinning, Agency contract with Textechno (Germany) - Textile Testing instrument' },
    { year: '1985.05', content: 'Agency contract with Kato (Japan) - Tester of Textile' },
    { year: '1984.07', content: 'Agency contract with Saurer-Allma (Germany) - Twisting machine' },
    { year: '1982', content: 'Established Jungho Trading Co.' }
  ] : [
    { year: '2017년 11월', content: '독일 Lindauer Dornier GmbH와 Agency 협약 - Tire cord weaving machine' },
    { year: '2007년 1월', content: '(주)정호텍스컴 상호 변경' },
    { year: '2005년 1월', content: '오스트리아 Lenzing Instruments와 Agency 협약 - Textile Testing instruments, 이탈리아 Mesdan S.p.A와 Agency 협약 - Yarn jointing Splicer & Textile Testing Instruments' },
    { year: '2002년 1월', content: '독일 Benninger Zell GmbH와 Agency 협약 - Dip and Hot Stretch Unit for treating tyre & single cord' },
    { year: '2001년 9월', content: '영국 Texkimp Limited와 Agency 협약 - Unwinding Creel for tire cord, composite, etc.' },
    { year: '2001년 6월', content: '독일 Temafa와 Agency 협약 - Recycling Machine' },
    { year: '2000년 11월', content: '독일 Novibra GmbH와 Agency 협약 - Spindle and top & bottom roller for spindle machines' },
    { year: '1998년 3월', content: '스위스 Braecker와 Agency 협약 - Ring & Traveller in Spinning System' },
    { year: '1996년 1월', content: '스위스 Steinemann와 Agency 협약 - Central Vacuum System' },
    { year: '1991년 8월', content: '스위스 Luwa와 Agency 협약 - Air-conditioning & Waste removal system' },
    { year: '1990년 9월', content: '영국 Crosrol와 Agency 협약 - Blow-room & Carding machine' },
    { year: '1988년', content: '이탈리아 Vouk와 Agency 협약 - Drawframe & Combing machine for cotton spinning, 독일 Textechno와 Agency 협약 - Textile Testing instrument' },
    { year: '1985년 5월', content: '일본 Kato와 Agency 협약 - Tester of Textile' },
    { year: '1984년 7월', content: '독일 Saurer-Allma와 Agency 협약 - Twisting machine' },
    { year: '1982년', content: '정호물산 설립' }
  ];

  // 파트너사 정보
  const partnerCompanies = [
    {
      name: 'SAURER.',
      nameColor: 'text-red-600',
      country: currentLanguage === 'en' ? 'Germany' : '독일',
      flag: '🇩🇪',
      website: 'https://www.saurer.com',
      logo: '/images/logos/partners/saurer-logo.png',
      description: currentLanguage === 'en' ? 'Industrial textile twisting machines for tire cords' : '타이어코드, 카페트, 방적사, 우리섬유, 산업용 섬유 연사기 제조업체'
    },
    {
      name: 'BENNINGER',
      nameColor: '#0066CC',
      country: currentLanguage === 'en' ? 'Germany' : '독일',
      flag: '🇩🇪',
      website: 'https://www.benningergroup.com',
      logo: '/images/logos/partners/benninger-logo.png',
      description: currentLanguage === 'en' ? 'Fabric heat treatment line' : '직물 열처리 Line 제조업체(타이어 코드用)'
    },
    {
      name: 'Luwa',
      nameColor: '#0099CC',
      country: currentLanguage === 'en' ? 'Switzerland' : '스위스',
      flag: '🇨🇭',
      website: 'https://www.luwa.com',
      logo: '/images/logos/partners/luwa-logo.png',
      description: currentLanguage === 'en' ? 'Air conditioning equipment for cotton & synthetic fiber spinning' : '면방, 합성용 공조 설비 제조업체'
    },
    {
      name: 'Bräcker',
      nameColor: '#CC0000',
      country: currentLanguage === 'en' ? 'Switzerland' : '스위스',
      flag: '🇨🇭',
      website: 'https://www.braecker.ch',
      logo: '/images/logos/partners/braecker-logo.png',
      description: currentLanguage === 'en' ? 'Rings and Travellers for spinning frames' : '정방기用 Ring, Traveller 제조 BERKOL Cots, Apron 및 유지보수 기계류 제조'
    },
    {
      name: 'CYGNET TEKKIMP',
      nameColor: 'text-gray-700',
      country: currentLanguage === 'en' ? 'UK' : '영국',
      flag: '🇬🇧',
      website: 'https://www.cygnet-tekkimp.com',
      logo: '/images/logos/partners/tekkimp-logo.png',
      description: currentLanguage === 'en' ? 'Loom creel' : '직기 Creel 제조업체(타이어코드, 유리섬유, Carbon fiber)'
    },
    {
      name: 'TEXTECHNO',
      nameColor: 'text-gray-700',
      country: currentLanguage === 'en' ? 'Germany' : '독일',
      flag: '🇩🇪',
      website: 'https://www.textechno.com',
      logo: '/images/logos/partners/textechno-logo.png',
      description: currentLanguage === 'en' ? 'Various textile testing equipment' : '섬유용 각종 시험장비'
    },
    {
      name: 'LENZING',
      nameColor: 'text-gray-700',
      country: currentLanguage === 'en' ? 'Austria' : '오스트리아',
      flag: '🇦🇹',
      website: 'https://www.lenzing-instruments.com',
      logo: '/images/logos/partners/lenzing-logo.png',
      description: currentLanguage === 'en' ? 'Various textile testing equipment' : '섬유용 각종 시험장비'
    },
    {
      name: 'KATO TECH',
      nameColor: 'text-gray-700',
      country: currentLanguage === 'en' ? 'Japan' : '일본',
      flag: '🇯🇵',
      website: 'https://www.keskato.co.jp',
      logo: '/images/logos/partners/katotech-logo.png',
      description: currentLanguage === 'en' ? 'Various testing instruments' : '각종 시험기기'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav version="hybrid" />

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

      <TraditionalLayout showSidebar={true} category="subsidiaries" version="hybrid">
        {/* 회사 소개 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Introduction' : '회사 소개'}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Since 1982, Jungho TEXCOM has been Korea\'s exclusive importer and distributor of world-class textile machinery and testing equipment, contributing to the development of the domestic textile industry.'
                : '㈜정호텍스컴은 1982년부터 현재까지 세계적인 섬유 기계장비 및 시험기기 해외 메이커들의 한국 독점수입판매社로서 국내 섬유업계 발전과정에 한 축을 기여해 온 기업입니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'With over 40 years of B2B experience in textile and apparel manufacturing, we have accumulated expertise and insights into the ever-changing consumer psychology in textile, apparel, and fashion trends.'
                : '㈜정호텍스컴은 섬유, 의류 제조 시장에서 B2B로 다져진 축적된 경험과 노하우를 축적하고 있으며, 지난 40년간 시시각각 변화되어온 섬유, 의류, 패션 트렌드의 \'소비심리 변화\'를 정확히 파악하고 있음으로 앞으로의 변화 흐름 역시 미리 예측하는 역량을 스스로 갖게 되었습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {currentLanguage === 'en'
                ? 'Since 2021, Jungho TEXCOM has expanded into B2C apparel and fashion business, aiming to become a central opinion leader in the fashion industry.'
                : '이에 ㈜정호텍스컴은 2021년~ 실소비자들을 직접 만나는 의류, 패션 B2C로도 사업을 새롭게 전개함으로써, 패션 흐름의 오피니언 리더를 이끄는 중심축이 되고자 합니다.'
              }
            </p>
          </div>
        </motion.section>

        {/* 사업부별 제품/서비스 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Products & Services' : '제품 및 서비스'}
            </h2>
          </div>

          <div className="space-y-8">
            {businessDivisions.map((division, divIndex) => (
              <motion.div 
                key={divIndex}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: divIndex * 0.15 }}
              >
                {/* 사업부 헤더 */}
                <div className={`bg-gradient-to-r ${division.gradient} p-6`}>
                  <div className="flex items-center gap-4 text-white">
                    <div className="text-5xl">{division.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{division.division}</h3>
                      <p className="text-green-50 text-lg">{division.description}</p>
                    </div>
                  </div>
                </div>

                {/* 제품 목록 */}
                <div className="p-6 space-y-6">
                  {division.products.map((product, prodIndex) => (
                    <motion.div 
                      key={prodIndex}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.01, x: 10 }}
                    >
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {product.name}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          {currentLanguage === 'en' ? '▪ Key Features:' : '▪ 주요 기능:'}
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <span className={`text-lg bg-gradient-to-r ${division.gradient} bg-clip-text text-transparent font-bold`}>✓</span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 주요 파트너사 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Partner Companies' : '주요 파트너사'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-2">
              {currentLanguage === 'en' 
                ? 'World-class textile machinery manufacturers we work with' 
                : '함께하고 있는 세계적인 섬유기계 제조업체들'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerCompanies.map((company, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-4">
                  {/* 국가명 + 로고 */}
                  <div className="flex items-center gap-3 mb-3" style={{ minHeight: '70px' }}>
                    <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap text-center" style={{ minWidth: '50px' }}>
                      {company.flag}<br/>{company.country}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <img 
                        src={company.logo}
                        alt={`${company.name} Logo`} 
                        className="max-h-14 max-w-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div style={{ display: 'none' }} className={`text-2xl font-bold ${company.nameColor.startsWith('#') ? '' : company.nameColor}`}>
                        <span style={company.nameColor.startsWith('#') ? { color: company.nameColor } : {}}>{company.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* 웹사이트 링크 */}
                  <div className="mb-2">
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm block"
                    >
                      {company.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>

                  {/* 사업분야 */}
                  <div>
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {currentLanguage === 'en' ? 'Business Area' : '사업부문'}
                    </h6>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {company.description}
                    </p>
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
          <div className="border-l-4 border-green-600 dark:border-green-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'History & Achievements' : '연혁 및 성과'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
            <ul className="space-y-4">
              {(showAllAchievements ? achievements : achievements.slice(0, 8)).map((item, index) => (
                <motion.li 
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 dark:hover:from-green-900/20 dark:hover:to-teal-900/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex-shrink-0 w-24 h-16 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300 px-2">
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
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
          <div className="bg-gradient-to-r from-green-600 via-green-700 to-teal-600 dark:from-green-700 dark:via-green-800 dark:to-teal-700 text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>📞</span>
              {currentLanguage === 'en' ? 'Contact Information' : '연락처'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-bold mb-3">{currentLanguage === 'en' ? 'Contact Us' : '문의하기'}</h4>
                <div className="space-y-2 text-green-100">
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Phone:' : '전화:'}</strong> 02-553-3631</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Email:' : '이메일:'}</strong> info@junghocorp.com</p>
                  <p><strong className="text-white">{currentLanguage === 'en' ? 'Website:' : '웹사이트:'}</strong> www.junghocorp.com</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3">{currentLanguage === 'en' ? 'Location' : '오시는 길'}</h4>
                <p className="text-green-100 mb-4">
                  {currentLanguage === 'en'
                    ? '435, Apgujeong-ro, Gangnam-gu, Seoul, Korea'
                    : '서울특별시 강남구 압구정로 435 (청담동)'
                  }
                </p>
                <button
                  onClick={() => navigate('/about/location')}
                  className="px-5 py-2 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries →' : '전체 계열사 보기 →'}
            </button>
          </div>
        </motion.section>
      </TraditionalLayout>
    </div>
  );
};

export default TexcomDetailHybrid;
