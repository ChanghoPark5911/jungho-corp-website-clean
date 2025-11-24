import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

const SubsidiariesListHybrid = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  // 사이드바는 TraditionalLayout에서 자동 생성 (category="subsidiaries")

  const subsidiaries = [
    {
      id: 'clarus', name: 'CLARUS Korea Co., Ltd.', nameKo: '(주)클라루스코리아', icon: '💡', established: '2009',
      business: currentLanguage === 'en' ? 'IoT-based Smart Lighting Control' : 'IoT 기반 스마트 조명 제어',
      description: currentLanguage === 'en' ? 'Specialized in smart lighting control systems using IoT technology.' : 'IoT 기술을 활용한 스마트 조명 제어 시스템 전문 기업.',
      gradient: 'from-blue-500 to-cyan-500', path: '/hybrid/subsidiaries/clarus'
    },
    {
      id: 'tlc', name: 'Jungho TLC Co., Ltd.', nameKo: '(주)정호티엘씨', icon: '🏢', established: '1982',
      business: currentLanguage === 'en' ? 'Building Automation' : '빌딩 자동화',
      description: currentLanguage === 'en' ? 'Pioneer in building automation since 1982.' : '1982년부터 빌딩 자동화 분야의 선구자.',
      gradient: 'from-purple-500 to-pink-500', path: '/hybrid/subsidiaries/jungho-tlc'
    },
    {
      id: 'illutech', name: 'ILLUTECH Co., Ltd.', nameKo: '(주)일루텍', icon: '⚡', established: '2010',
      business: currentLanguage === 'en' ? 'Industrial LED Lighting' : '산업·특수 LED 조명',
      description: currentLanguage === 'en' ? 'Specialist in industrial and special LED lighting.' : '산업용 및 특수 LED 조명 전문 기업.',
      gradient: 'from-orange-500 to-red-500', path: '/hybrid/subsidiaries/illutech'
    },
    {
      id: 'texcom', name: 'Jungho TEXCOM Co., Ltd.', nameKo: '(주)정호텍스컴', icon: '🧵', established: '1982',
      business: currentLanguage === 'en' ? 'Textile Machinery' : '섬유기계·시험기',
      description: currentLanguage === 'en' ? 'Bridge between textile industry and fashion.' : '섬유 산업과 패션을 잇는 가교 역할.',
      gradient: 'from-green-500 to-teal-500', path: '/hybrid/subsidiaries/jungho-texcom'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav version="hybrid" />
      
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'Our Companies' : '우리의 계열사'}
        title={currentLanguage === 'en' ? 'Subsidiaries Overview' : '계열사 개요'}
        description={currentLanguage === 'en' ? 'Four specialized companies creating synergy' : '4개의 전문 기업이 만들어내는 시너지'}
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        height="400px"
      />

      <TraditionalLayout showSidebar={true} category="subsidiaries" version="hybrid">
        <motion.section 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-600 dark:border-blue-500 p-6 rounded-r-2xl shadow-lg">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
              {currentLanguage === 'en' ? 'JUNGHO Group consists of four specialized subsidiaries.' : '정호그룹은 4개의 전문 계열사로 구성되어 있습니다.'}
            </p>
          </div>
        </motion.section>

        {subsidiaries.map((company, index) => (
          <motion.section 
            key={company.id} 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div 
              onClick={() => navigate(company.path)}
              className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-transparent rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-pointer"
            >
              <div className={`h-2 bg-gradient-to-r ${company.gradient}`}></div>
              
              <div className={`bg-gradient-to-r ${company.gradient} px-6 py-5 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">{company.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {currentLanguage === 'en' ? company.name : company.nameKo}
                    </h2>
                    <p className="text-white/90 text-sm">
                      {currentLanguage === 'en' ? 'Est.' : '설립'} {company.established}
                    </p>
                  </div>
                </div>
                <div className="text-white text-4xl opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  →
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                  {company.description}
                </p>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{currentLanguage === 'en' ? 'Business:' : '사업 분야:'}</span>
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{company.business}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        <motion.section 
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 dark:from-blue-700 dark:via-blue-800 dark:to-purple-700 text-white rounded-2xl p-8 shadow-2xl text-center">
            <p className="text-lg mb-6 text-blue-100">
              {currentLanguage === 'en' ? 'Click on each card above to view detailed information about the subsidiary.' : '각 계열사 카드를 클릭하시면 상세 정보를 확인하실 수 있습니다.'}
            </p>
            <button
              onClick={() => navigate('/support')}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {currentLanguage === 'en' ? 'Contact Us →' : '문의하기 →'}
            </button>
          </div>
        </motion.section>
      </TraditionalLayout>
    </div>
  );
};

export default SubsidiariesListHybrid;

