import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * 정호그룹 소개 페이지
 */
const AboutIntroPage = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();
  const [pagesData, setPagesData] = React.useState(null);

  // LocalStorage에서 데이터 로드
  React.useEffect(() => {
    const savedData = localStorage.getItem('v2_pages_data');
    if (savedData) {
      try {
        setPagesData(JSON.parse(savedData));
      } catch (error) {
        console.error('페이지 데이터 로드 실패:', error);
      }
    }
  }, []);

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // 기본 계열사 데이터
  const defaultSubsidiaries = [
    {
      id: 'tlc',
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      role: currentLanguage === 'en' ? 'Building Automation & Power Control Solutions' : '빌딩 자동화 및 전력 제어 솔루션',
      description: currentLanguage === 'en' ? 'Smart Building Automation Systems Specialist' : '스마트 빌딩 자동화 시스템 전문 기업',
      icon: '⚡',
      color: 'from-green-500 to-emerald-500',
      path: '/subsidiaries/tlc'
    },
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      role: currentLanguage === 'en' ? 'Lighting Control Systems & Smart Solutions' : '조명 제어 시스템 및 스마트 솔루션',
      description: currentLanguage === 'en' ? 'Leading Company in Advanced Lighting Control Technology' : '첨단 조명 제어 기술 선도 기업',
      icon: '💡',
      color: 'from-cyan-500 to-blue-500',
      path: '/subsidiaries/clarus'
    },
    {
      id: 'illutech',
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      role: currentLanguage === 'en' ? 'Industrial LED Lighting Development & Manufacturing' : '산업용 LED 조명 개발 및 제조',
      description: currentLanguage === 'en' ? 'High-Efficiency LED Lighting Manufacturer' : '고효율 LED 조명 전문 제조사',
      icon: '🔆',
      color: 'from-orange-500 to-amber-500',
      path: '/subsidiaries/illutech'
    },
    {
      id: 'texcom',
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      role: currentLanguage === 'en' ? 'Textile Machinery & Fashion Business' : '섬유기계 및 패션 사업',
      description: currentLanguage === 'en' ? '40 Years of Textile Machinery Expertise' : '40년 전통의 섬유기계 전문 기업',
      icon: '🧵',
      color: 'from-purple-500 to-pink-500',
      path: '/subsidiaries/texcom'
    },
    {
      id: 'rss',
      name: 'RSS',
      role: currentLanguage === 'en' ? 'Equipment Machinery & Industrial Solutions' : '설비기계 및 산업 솔루션',
      description: currentLanguage === 'en' ? 'Industrial Equipment Specialist Division' : '산업용 설비 전문 사업부',
      icon: '🔧',
      color: 'from-gray-600 to-gray-800'
    },
  ];

  // 관리자 데이터와 기본 데이터 병합 (RSS 제외 - 4개 계열사만)
  const subsidiaries = pagesData?.subsidiaries ? pagesData.subsidiaries.slice(0, 4).map((savedSub, index) => ({
    ...defaultSubsidiaries[index],
    ...savedSub
  })) : defaultSubsidiaries.slice(0, 4);

  const aboutIntro = pagesData?.aboutIntro || {
    paragraph1: '정호그룹은 1982년 설립된 이래 조명제어, LED, 산업설비의 개발 · 제조 · 엔지니어링을 중심으로 사람과 공간, 에너지를 효율적으로 연결하는 종합기술 그룹으로 성장하여 왔으며, 국내는 물론 북미, 유럽, 아시아 시장에서도 그 기술력을 인정받고 있습니다.',
    paragraph2: '빠르게 변화하는 미래 사회에 적극 대응하고자, 정호그룹은 스마트 빌딩, IoT, 에너지 관리 분야에서 혁신적인 솔루션을 제공하며, 지속 가능한 발전을 위해 끊임없이 노력하고 있습니다.',
    paragraph3: '정호그룹의 계열사들은 각자의 전문 분야에서 탁월한 기술력과 경험을 바탕으로 시너지를 창출하며, 고객에게 최상의 가치를 제공하고 있습니다.'
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {currentLanguage === 'en' ? 'Company Introduction' : '정호그룹 소개'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          {/* 소개 문구 */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12"
            variants={fadeInUp}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {currentLanguage === 'en' 
                  ? 'Since its establishment in 1982, Jungho Group has grown into a comprehensive technology group that efficiently connects people, spaces, and energy, focusing on the development, manufacturing, and engineering of lighting control, LED, and industrial equipment, and its technological prowess is recognized not only in Korea but also in North America, Europe, and Asian markets.'
                  : aboutIntro.paragraph1}
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {currentLanguage === 'en' ? (
                  <>
                    Furthermore, beyond being just a technology company, we are focusing on developing future-oriented technologies such as Zero Energy Building, IoT-based lighting control, and Energy Harvesting to lead <strong className="text-primary-600 dark:text-primary-400">sustainable energy management and smart building ecosystem construction</strong>, and we are striving to realize smart spaces where people and the environment coexist through providing various solutions.
                  </>
                ) : (
                  <>
                    또한, 저희는 단순한 기술기업을 넘어, <strong className="text-primary-600 dark:text-primary-400">지속 가능한 에너지 관리와 스마트 빌딩 생태계 구축</strong>을 선도하기 위해 Zero Energy Building, IoT 기반 조명제어, Energy Harvesting 등 미래형 기술 개발에 집중하고 있으며, 다양한 솔루션 제공을 통해 사람과 환경이 공존하는 스마트한 공간을 실현하고자 노력하고 있습니다.
                  </>
                )}
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {currentLanguage === 'en' ? (
                  <>
                    Jungho Group will continue to repay the trust of our customers with innovative technology and sincere service, and leap forward to the global market as a <strong className="text-primary-600 dark:text-primary-400">leading comprehensive solution specialist group representing Korea</strong>.
                  </>
                ) : (
                  <>
                    앞으로도 정호그룹은 혁신적인 기술력과 진정성 있는 서비스로 고객의 신뢰에 보답하며, <strong className="text-primary-600 dark:text-primary-400">대한민국을 대표하는 종합 솔루션 전문 그룹</strong>으로서 세계 시장을 향해 도약하겠습니다.
                  </>
                )}
              </p>

              <p className="text-right text-gray-600 dark:text-gray-400 font-medium">
                {currentLanguage === 'en' ? 'Thank you.' : '감사합니다.'}
                <br />
                <span className="text-primary-600 dark:text-primary-400 font-bold">
                  {currentLanguage === 'en' ? 'All employees of Jungho Group' : '정호그룹 임직원 일동'}
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 계열사 소개 */}
      <motion.section 
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {currentLanguage === 'en' ? 'Jungho Group Subsidiaries' : '정호그룹 계열사'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? 'Providing various solutions with specialized technology'
                : '전문화된 기술력으로 다양한 솔루션을 제공합니다'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsidiaries.map((company, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => company.path && navigate(company.path)}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="p-6">
                  {/* 아이콘 */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">{company.icon}</span>
                  </div>

                  {/* 회사명 */}
                  <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${company.color} bg-clip-text text-transparent`}>
                    {company.name}
                  </h3>

                  {/* 역할 */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                    {company.role}
                  </p>

                  {/* 상세 설명 */}
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                    {company.description}
                  </p>
                </div>

                {/* 하단 accent 라인 */}
                <div className={`h-1 bg-gradient-to-r ${company.color}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 주요 수치 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                1982
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {currentLanguage === 'en' ? 'Established' : '설립년도'}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {currentLanguage === 'en' ? '4+' : '4+'}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {currentLanguage === 'en' ? 'Subsidiaries' : '계열사'}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                40+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {currentLanguage === 'en' ? 'Years of Experience' : '년 경험'}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {currentLanguage === 'en' ? 'Global' : '글로벌'}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {currentLanguage === 'en' ? 'Market Presence' : '시장 진출'}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutIntroPage;

