import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 회사소개 페이지 - 하이브리드 버전
 */
const AboutIntroHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  const sidebarItems = [
    { id: 'intro', label: currentLanguage === 'en' ? 'Group Intro' : '그룹소개', path: '/hybrid/about/intro', active: true },
    { id: 'subsidiaries', label: currentLanguage === 'en' ? 'Subsidiaries' : '계열사', path: '/hybrid/subsidiaries' },
    { id: 'media', label: currentLanguage === 'en' ? 'Media/PR' : '미디어/PR', path: '/media/promotion' },
    { id: 'support', label: currentLanguage === 'en' ? 'Support' : '고객지원', path: '/support' }
  ];

  const companyInfo = [
    { label: currentLanguage === 'en' ? 'Company Name' : '회사명', value: currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹' },
    { label: currentLanguage === 'en' ? 'Established' : '설립일', value: currentLanguage === 'en' ? 'March 1982' : '1982년 3월' },
    { label: currentLanguage === 'en' ? 'CEO' : '대표이사', value: currentLanguage === 'en' ? 'Kim Jung-ho' : '김정호' },
    { label: currentLanguage === 'en' ? 'Headquarters' : '본사 소재지', value: currentLanguage === 'en' ? '435, Apgujeong-ro, Gangnam-gu, Seoul' : '서울시 강남구 압구정로 435' },
    { label: currentLanguage === 'en' ? 'Phone' : '대표전화', value: '02-553-3631' },
    { label: currentLanguage === 'en' ? 'Email' : '이메일', value: 'info@junghocorp.com' },
    { label: currentLanguage === 'en' ? 'Business Areas' : '사업 분야', value: currentLanguage === 'en' ? 'AI/IoT, Smart Lighting, Logistics, Textiles' : 'AI/IoT, 스마트 조명, 물류, 섬유' }
  ];

  const milestones = currentLanguage === 'en' ? [
    '2020 - AI/IoT solutions expansion',
    '2018 - CLARUS Korea smart lighting reinforcement',
    '2010 - ILLUTECH established (LED lighting)',
    '2007 - TEXCOM separated as subsidiary',
    '1982 - JUNGHO Group founded'
  ] : [
    '2020년 - AI/IoT 솔루션 사업 확장',
    '2018년 - 클라루스코리아 스마트 조명 사업 강화',
    '2010년 - 일루텍 설립 (LED 조명)',
    '2007년 - 정호텍스컴 계열사 분사',
    '1982년 - 정호그룹 창립'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav />
      
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'About JUNGHO' : '정호그룹 소개'}
        title={currentLanguage === 'en' ? 'Group Introduction' : '그룹소개'}
        description={currentLanguage === 'en' ? 'Leading innovation since 1982' : '1982년부터 혁신을 선도합니다'}
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        height="400px"
      />

      <TraditionalLayout showSidebar={true} sidebarItems={sidebarItems}>
        {/* 정호그룹 소개 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'JUNGHO Group Introduction' : '정호그룹 소개'}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              저희 <span className="font-bold text-blue-600 dark:text-blue-400">정호그룹</span>은 1982년 창립하여 유럽의 섬유기계 장비를 수입, 판매를 시작으로 1986년 조명제어 시스템 사업에 진출하여, 국내 최초로 One-Shot System, Full 2-Way System을 국내 시장에 도입하였습니다.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              또한 국내 최고의 연구 인력 확보와 지속적인 투자를 통해 산제품 개발 및 독자적인 Software 제계를 구축하는 등 국내 조명제어 산업을 선도해 왔습니다. 2003년 조명 제어의 미국 수출을 시작으로 캐나다, 중국, 대만, 동남아시아 시장 등 글로벌 매출을 확대해 왔으며, 5년간의 개발기간을 거쳐 완성된 독립적인 컨트롤러부터 LCD Touch Screen까지 Full Line Up을 구축하여 글로벌 경쟁력을 확보하였습니다.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              저희 <span className="font-bold text-blue-600 dark:text-blue-400">정호그룹</span>은 각 산업분야에서 오랜 외길로 전문성을 쌓아왔으며, <span className="font-bold text-green-600 dark:text-green-400">4차 산업의 핵심인 IoT와 융합된 제품으로 조명제어, 전력제어 산업의 Total Solution Leader</span>로서의 역할을 다 해 나갈 것입니다.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
              저희 정호는 배품이 주신 고객 여러분의 신뢰를 바탕으로 환경을 생각하고, 에너지의 가치를 존중하는 기업으로서 변화와 혁신을 추구하여 <span className="font-bold text-blue-600 dark:text-blue-400">최고의 품질과 최고의 서비스</span>로 인제나 고객 여러분과 함께할 것을 약속드립니다. 감사합니다. <span className="font-bold text-blue-600 dark:text-blue-400">정호그룹</span> 임직원 일동
            </p>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-right">
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                감사합니다.
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-bold text-2xl">
                정호그룹 임직원 일동
              </p>
            </div>
          </div>
        </motion.section>

        {/* 회사 개요 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Overview' : '회사 개요'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full">
              <tbody>
                {companyInfo.map((item, index) => (
                  <motion.tr 
                    key={index}
                    className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-5 font-semibold text-gray-900 dark:text-white bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700/50 dark:to-gray-800/50 w-1/3">
                      {item.label}
                    </td>
                    <td className="px-6 py-5 text-gray-700 dark:text-gray-300 text-lg">
                      {item.value}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* 주요 연혁 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Key Milestones' : '주요 연혁'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
            <ul className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.li 
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <span className="flex-1 text-gray-700 dark:text-gray-300 text-lg pt-1">{milestone}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-right">
              <button
                onClick={() => navigate('/about/history')}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
              >
                {currentLanguage === 'en' ? 'View Full History' : '전체 연혁 보기'}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* 주요 계열사 */}
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Our Subsidiaries' : '주요 계열사'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'CLARUS', nameKo: '클라루스', desc: 'IoT 조명 제어', gradient: 'from-blue-500 to-cyan-500', icon: '💡' },
              { name: 'Jungho TLC', nameKo: '정호티엘씨', desc: '빌딩 자동화', gradient: 'from-purple-500 to-pink-500', icon: '🏢' },
              { name: 'ILLUTECH', nameKo: '일루텍', desc: 'LED 조명', gradient: 'from-orange-500 to-red-500', icon: '⚡' },
              { name: 'Jungho TEXCOM', nameKo: '정호텍스컴', desc: '섬유 기계', gradient: 'from-green-500 to-teal-500', icon: '🧵' }
            ].map((sub, index) => (
              <motion.div 
                key={index}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-transparent rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden relative"
                onClick={() => navigate('/hybrid/subsidiaries')}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sub.gradient}`}></div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-4xl">{sub.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {currentLanguage === 'en' ? sub.name : sub.nameKo}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{sub.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/hybrid/subsidiaries')}
              className="group px-8 py-4 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries' : '계열사 전체보기'}
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </motion.section>
      </TraditionalLayout>
    </div>
  );
};

export default AboutIntroHybrid;

