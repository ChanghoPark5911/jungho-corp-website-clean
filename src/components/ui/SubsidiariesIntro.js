import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

const SubsidiariesIntro = ({
  title = "4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계",
  subtitle = "기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출",
  subsidiaries = [],
  subsidiariesIntro = null, // 관리자에서 수정한 제목/설명 데이터
  className = '',
  ...props
}) => {
  const { t, currentLanguage } = useI18n(); // 다국어 지원
  const [isVisible, setIsVisible] = useState(false);
  const [companyLogos, setCompanyLogos] = useState({});
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // i18n에서 계열사 데이터 가져오기
  const defaultSubsidiaries = React.useMemo(() => [
    {
      id: 'clarus',
      title: t('home.subsidiaries.clarus.title', { fallback: '클라루스' }),
      subtitle: t('home.subsidiaries.clarus.subtitle', { fallback: 'AI 기반 스마트 조명/전력제어' }),
      description: t('home.subsidiaries.clarus.description', { fallback: '스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문 업체' }),
      color: 'bg-gray-100',
      iconColor: 'bg-gray-200',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-700',
      path: '/clarus'
    },
    {
      id: 'tlc',
      title: t('home.subsidiaries.tlc.title', { fallback: '정호티엘씨' }),
      subtitle: t('home.subsidiaries.tlc.subtitle', { fallback: '조명/전력제어의 설계/시공/사후관리' }),
      description: t('home.subsidiaries.tlc.description', { fallback: '공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축하고, 사후관리를 담당하는 전문업체' }),
      color: 'bg-gray-100',
      iconColor: 'bg-gray-200',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-700',
      path: '/tlc'
    },
    {
      id: 'illutech',
      title: t('home.subsidiaries.illutech.title', { fallback: '일루텍' }),
      subtitle: t('home.subsidiaries.illutech.subtitle', { fallback: '유.무선 스마트조명제품 쇼핑몰 공급' }),
      description: t('home.subsidiaries.illutech.description', { fallback: '유.무선 조명제어 제품을 국내의 유명 쇼핑몰에 전문 판매, 편리한 시공기술지원 업체' }),
      color: 'bg-gray-100',
      iconColor: 'bg-gray-200',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-700',
      path: '/illutech'
    },
    {
      id: 'texcom',
      title: t('home.subsidiaries.texcom.title', { fallback: '정호텍스컴' }),
      subtitle: t('home.subsidiaries.texcom.subtitle', { fallback: '섬유기계 도염, 운영을 통해 국내 섬유산업 지원과 자체 패션브랜드 운영' }),
      description: t('home.subsidiaries.texcom.description', { fallback: '40년간 축적된 섬유기계 전문성과 패션브랜드 운영을 통해 새로운 가치를 창출하는 전문업체' }),
      color: 'bg-gray-100',
      iconColor: 'bg-gray-200',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-700',
      path: '/texcom'
    }
  ], [t]);

  // 계열사 이름을 경로로 매핑하는 함수
  const getPathFromName = (name) => {
    const nameMapping = {
      '클라루스': '/clarus',
      '정호티엘씨': '/tlc',
      '일루텍': '/illutech',
      '정호텍스컴': '/texcom'
    };
    return nameMapping[name] || `/${name}`;
  };

  // 한국어일 때만 props 우선, 다른 언어는 i18n 사용
  const safeSubsidiaries = React.useMemo(() => {
    // 한국어가 아니거나, props subsidiaries가 없으면 i18n 사용
    if (currentLanguage !== 'ko' || !subsidiaries || subsidiaries.length === 0) {
      return defaultSubsidiaries;
    }
    
    // 한국어이고 props subsidiaries가 있으면 사용
    if (currentLanguage === 'ko' && subsidiaries && Array.isArray(subsidiaries) && subsidiaries.length > 0) {
      return subsidiaries.map(item => ({
        id: item.id || item.name || 'unknown',
        title: item.title || item.name || '제목 없음',
        subtitle: item.subtitle || '부제목 없음',
        description: item.description || '설명 없음',
        color: item.color || 'bg-gray-100',
        iconColor: item.iconColor || 'bg-gray-200',
        textColor: item.textColor || 'text-green-800',
        buttonColor: item.buttonColor || 'bg-green-700',
        path: item.path || getPathFromName(item.name || item.title)
      }));
    }
    
    return defaultSubsidiaries;
  }, [currentLanguage, subsidiaries, defaultSubsidiaries]);

  // 회사 로고 데이터 로드
  useEffect(() => {
    const loadCompanyLogos = () => {
      const savedData = localStorage.getItem('company_logos');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setCompanyLogos(data);
        } catch (error) {
          console.error('회사 로고 데이터 로드 오류:', error);
        }
      }
    };
    
    loadCompanyLogos();
    
    // 실시간 업데이트 리스너
    const handleCompanyLogosUpdate = () => {
      loadCompanyLogos();
    };
    
    window.addEventListener('companyLogosUpdated', handleCompanyLogosUpdate);
    
    return () => {
      window.removeEventListener('companyLogosUpdated', handleCompanyLogosUpdate);
    };
  }, []);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 카드 클릭 핸들러
  const handleCardClick = (path, companyName) => {
    console.log(`🔵 클릭된 회사: ${companyName}, 경로: ${path}`);
    console.log('🔵 현재 경로:', window.location.pathname);
    
    if (path && path !== '/' && path !== 'undefined' && path.startsWith('/')) {
      console.log(`🚀 네비게이션 시작: ${path}`);
      window.location.href = path;
    } else {
      console.error('❌ 유효하지 않은 경로:', path);
      console.log('사용 가능한 경로들:', defaultSubsidiaries.map(s => s.path));
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`subsidiaries-intro-section bg-white dark:bg-gray-800 py-16 ${className}`}
      {...props}
    >
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-6 leading-tight">
            {(() => {
              // 한국어일 때만 props 우선, 다른 언어는 i18n
              let sectionTitle;
              if (currentLanguage === 'ko' && subsidiariesIntro?.title) {
                sectionTitle = subsidiariesIntro.title;
              } else {
                sectionTitle = t('home.subsidiaries.title') || title;
              }
              // \n을 실제 줄바꿈으로 변환
              const processedTitle = sectionTitle.replace(/\\n/g, '\n');
              return processedTitle.split('\n').map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ));
            })()}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {(() => {
              // 한국어일 때만 props 우선, 다른 언어는 i18n
              let sectionDescription;
              if (currentLanguage === 'ko' && subsidiariesIntro?.description) {
                sectionDescription = subsidiariesIntro.description;
              } else {
                sectionDescription = t('home.subsidiaries.description') || subtitle;
              }
              // \n을 실제 줄바꿈으로 변환
              const processedDescription = sectionDescription.replace(/\\n/g, '\n');
              return processedDescription.split('\n').map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ));
            })()}
          </p>
        </div>

        {/* 계열사 카드 그리드 - 2x2 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {safeSubsidiaries.map((subsidiary, index) => (
            <div
              key={subsidiary.id}
              className={`subsidiary-card transform transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`${subsidiary.color} dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full p-6`}
                onClick={() => handleCardClick(subsidiary.path, subsidiary.title)}
              >
                {/* 상단 원형 아이콘 */}
                <div className={`${subsidiary.iconColor} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  {companyLogos[subsidiary.id] ? (
                    <img 
                      src={companyLogos[subsidiary.id].url} 
                      alt={`${subsidiary.title} 로고`}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <div className="text-white text-2xl">
                      {subsidiary.id === 'clarus' && '💡'}
                      {subsidiary.id === 'tlc' && '📡'}
                      {subsidiary.id === 'illutech' && '📱'}
                      {subsidiary.id === 'texcom' && '🧵'}
                    </div>
                  )}
                </div>

                {/* 제목과 부제목 */}
                <h3 className={`text-2xl font-bold mb-2 ${subsidiary.textColor} dark:text-green-400`}>
                  {(() => {
                    const processedTitle = subsidiary.title.replace(/\\n/g, '\n');
                    return processedTitle.split('\n').map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ));
                  })()}
                </h3>
                <p className={`text-lg font-semibold mb-3 ${subsidiary.textColor} dark:text-green-300`}>
                  {(() => {
                    const processedSubtitle = subsidiary.subtitle.replace(/\\n/g, '\n');
                    return processedSubtitle.split('\n').map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ));
                  })()}
                </p>

                {/* 설명 */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                  {subsidiary.description}
                </p>

                {/* 자세히 보기 버튼 */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(subsidiary.path, subsidiary.title);
                  }}
                  className={`inline-block px-6 py-3 rounded-lg text-sm font-medium text-white ${subsidiary.buttonColor} hover:opacity-80 transition-opacity`}
                >
                  상세보기 &gt;
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default SubsidiariesIntro; 