import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * 정호그룹 소개 페이지
 */
const AboutIntroPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, currentLanguage } = useI18n();
  const [pagesData, setPagesData] = React.useState(null);

  // 현재 경로가 Hybrid인지 확인
  const isHybrid = location.pathname.startsWith('/hybrid');
  const pathPrefix = isHybrid ? '/hybrid' : '';

  // JSON 파일 및 LocalStorage에서 데이터 로드
  React.useEffect(() => {
    const loadData = async () => {
      try {
        // 1순위: JSON 파일에서 로드 (영구 저장된 데이터)
        const response = await fetch('/data/pages-data.json');
        if (response.ok) {
          const jsonData = await response.json();
          setPagesData(jsonData);
          console.log('✅ JSON 파일에서 페이지 데이터 로드됨:', jsonData);
          return;
        }
      } catch (error) {
        console.log('📄 JSON 파일 로드 실패, localStorage 확인 중...', error);
      }

      // 2순위: localStorage에서 로드 (관리자 페이지에서 임시 저장한 데이터)
      const savedData = localStorage.getItem('v2_pages_data');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setPagesData(parsedData);
          console.log('✅ localStorage에서 페이지 데이터 로드됨:', parsedData);
        } catch (error) {
          console.error('페이지 데이터 로드 실패:', error);
        }
      }
    };

    // 초기 로드
    loadData();

    // 관리자 페이지에서 저장 시 실시간 업데이트
    const handleUpdate = () => {
      console.log('📡 페이지 데이터 업데이트 이벤트 수신');
      loadData();
    };

    window.addEventListener('v2PagesDataUpdated', handleUpdate);

    return () => {
      window.removeEventListener('v2PagesDataUpdated', handleUpdate);
    };
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
        staggerChildren: 0
      }
    }
  };

  // 기본 계열사 데이터 (경로는 현재 버전에 맞게 동적 설정)
  const defaultSubsidiaries = [
    {
      id: 'tlc',
      name: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨',
      role: currentLanguage === 'en' ? 'Building Automation & Power Control Solutions' : '빌딩 자동화 및 전력 제어 솔루션',
      description: currentLanguage === 'en' ? 'Smart Building Automation Systems Specialist' : '스마트 빌딩 자동화 시스템 전문 기업',
      icon: '⚡',
      color: 'from-green-500 to-emerald-500',
      path: `${pathPrefix}/subsidiaries/jungho-tlc`
    },
    {
      id: 'clarus',
      name: currentLanguage === 'en' ? 'CLARUS' : '클라루스',
      role: currentLanguage === 'en' ? 'Lighting Control Systems & Smart Solutions' : '조명 제어 시스템 및 스마트 솔루션',
      description: currentLanguage === 'en' ? 'Leading Company in Advanced Lighting Control Technology' : '첨단 조명 제어 기술 선도 기업',
      icon: '💡',
      color: 'from-cyan-500 to-blue-500',
      path: `${pathPrefix}/subsidiaries/clarus`
    },
    {
      id: 'illutech',
      name: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍',
      role: currentLanguage === 'en' ? 'Industrial LED Lighting Development & Manufacturing' : '산업용 LED 조명 개발 및 제조',
      description: currentLanguage === 'en' ? 'High-Efficiency LED Lighting Manufacturer' : '고효율 LED 조명 전문 제조사',
      icon: '🔆',
      color: 'from-orange-500 to-amber-500',
      path: `${pathPrefix}/subsidiaries/illutech`
    },
    {
      id: 'texcom',
      name: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴',
      role: currentLanguage === 'en' ? 'Textile Machinery & Fashion Business' : '섬유기계 및 패션 사업',
      description: currentLanguage === 'en' ? '40 Years of Textile Machinery Expertise' : '40년 전통의 섬유기계 전문 기업',
      icon: '🧵',
      color: 'from-purple-500 to-pink-500',
      path: `${pathPrefix}/subsidiaries/jungho-texcom`
    }
  ];

  // 언어별 계열사 데이터 처리: 영어는 항상 기본값 사용, 한국어는 관리자 수정 데이터 우선
  const subsidiaries = currentLanguage === 'ko' && pagesData?.subsidiaries 
    ? pagesData.subsidiaries.map((savedSub, index) => ({
        ...defaultSubsidiaries[index],
        ...savedSub
      }))
    : defaultSubsidiaries;

  // 언어별 데이터 처리: 영어는 항상 i18n 사용, 한국어는 관리자 수정 데이터 우선
  const aboutIntro = currentLanguage === 'ko' && pagesData?.aboutIntro 
    ? pagesData.aboutIntro 
    : {
        paragraph1: t('aboutIntro.paragraph1'),
        paragraph2: t('aboutIntro.paragraph2'),
        paragraph3: t('aboutIntro.paragraph3'),
        paragraph4: t('aboutIntro.paragraph4')
      };

  // 강조할 키워드 정의 (언어별)
  const highlightKeywords = {
    ko: [
      '정호그룹',
      '4차 산업의 핵심인 IoT와 융합된 제품',
      '조명제어, 전력제어 산업의 Total Solution Leader',
      '최고의 품질과 최고의 서비스'
    ],
    en: [
      'Jungho Group',
      'products integrated with IoT',
      'Total Solution Leader',
      'highest quality and best service'
    ]
  };

  // 텍스트에서 키워드를 찾아 강조하는 함수
  const highlightText = (text) => {
    if (!text) return null;
    
    const keywords = highlightKeywords[currentLanguage] || highlightKeywords.ko;
    let parts = [text];
    
    // 각 키워드를 순차적으로 처리
    keywords.forEach((keyword) => {
      const newParts = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(keyword);
          for (let i = 0; i < splitParts.length; i++) {
            newParts.push(splitParts[i]);
            if (i < splitParts.length - 1) {
              newParts.push(
                <span key={`${keyword}-${i}`} className="text-green-700 dark:text-green-500 font-bold">
                  {keyword}
                </span>
              );
            }
          }
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });
    
    return parts;
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

        {/* 이정표 - 오른쪽 상단 */}
        <motion.div 
          className="absolute top-24 right-8 text-right z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {currentLanguage === 'en' ? 'CURRENT PAGE' : '현재 페이지'}
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {currentLanguage === 'en' ? 'COMPANY INTRODUCTION' : '정호그룹 소개'}
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('aboutIntro.pageTitle')}
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
                {highlightText(aboutIntro.paragraph1)}
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {highlightText(aboutIntro.paragraph2)}
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {highlightText(aboutIntro.paragraph3)}
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {highlightText(aboutIntro.paragraph4)}
              </p>

              <p className="text-right text-gray-600 dark:text-gray-400 font-medium">
                {t('aboutIntro.closing')}
                <br />
                <span className="text-primary-600 dark:text-primary-400 font-bold">
                  {t('aboutIntro.signature')}
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

