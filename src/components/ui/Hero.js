import React, { useState, useEffect } from 'react';
import Button from './Button';
import { useI18n } from '../../hooks/useI18n';

// 줄바꿈 변환 함수
const formatTextWithLineBreaks = (text) => {
  if (!text) return '';
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

const Hero = ({
  backgroundImage,
  mainCopy,
  subCopy,
  description,
  stats = [],
  primaryAction,
  secondaryAction,
  className = '',
  enhancedSubtitle = false,
  enhancedOverlay = false,
  useLocalStorage = true, // localStorage 사용 여부 제어
  ...props
}) => {
  const { t, currentLanguage } = useI18n(); // 다국어 지원
  
  const [heroData, setHeroData] = useState({
    mainTitle: "",
    subtitle: "",
    description: ""
  });
  
  // 언어 변경 감지
  useEffect(() => {
    const handleLanguageChange = () => {
      // 언어가 변경되면 컴포넌트 강제 리렌더링
      setHeroData(prev => ({ ...prev }));
    };
    
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // 성과지표 데이터 상태 추가
  const [statsData, setStatsData] = useState({
    years: '40',
    projects: '800',
    countries: '7',
    support: '99',
    yearsLabel: '조명제어 전문 경험',
    projectsLabel: '프로젝트 완료',
    countriesLabel: '해외진출국',
    supportLabel: '고객만족도'
  });

  // localStorage에서 히어로 데이터 로드 및 실시간 업데이트
  useEffect(() => {
    const loadHeroContent = () => {
      // preferredLanguage 직접 확인
      const storedLang = localStorage.getItem('preferredLanguage');
      
      // 강제로 영어 사용 (테스트)
      if (storedLang === 'en') {
        setHeroData({
          mainTitle: "Innovating the Future of Lighting\nwith 40 Years of Accumulated Technology",
          subtitle: "Jungho Group is a professional lighting control company that supports customer success with innovative technology and perfect service",
          description: "We provide the best solutions based on experience in operating more than 150 projects and over 85,000 control points."
        });
        return;
      }
      
      // 한국어 기본값
      const i18nTitle = t('home.hero.title');
      const i18nSubtitle = t('home.hero.subtitle');
      const i18nDescription = t('home.hero.description');
      
      setHeroData({
        mainTitle: i18nTitle.replace(/\\n/g, '\n'),
        subtitle: i18nSubtitle.replace(/\\n/g, '\n'),
        description: i18nDescription.replace(/\\n/g, '\n')
      });
    };
    
    // 초기 로드
    loadHeroContent();
    
    // 페이지 가시성 변경 감지 (탭 전환, 브라우저 최소화 등)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadHeroContent();
      }
    };
    
    // 실시간 업데이트 리스너
    const handleContentUpdate = () => {
      loadHeroContent();
    };
    
    // 커스텀 이벤트 리스너 추가
    window.addEventListener('heroContentUpdated', handleContentUpdate);
    
    // 페이지 가시성 변경 리스너 추가
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('heroContentUpdated', handleContentUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mainCopy, subCopy, useLocalStorage, currentLanguage, t]); // currentLanguage 추가로 언어 변경 시 다시 로드

  // 성과지표 데이터 로드 및 실시간 업데이트
  useEffect(() => {
    const loadStatsContent = () => {
      const saved = localStorage.getItem('stats_content');
      if (saved) {
        try {
          const parsedContent = JSON.parse(saved);
          setStatsData(parsedContent);
        } catch (error) {
          console.error('성과지표 데이터 로드 실패:', error);
        }
      }
    };
    
    loadStatsContent();
    
    // 실시간 업데이트 리스너 추가
    const handleStatsUpdate = () => {
      loadStatsContent();
    };
    
    window.addEventListener('statsContentUpdated', handleStatsUpdate);
    
    return () => {
      window.removeEventListener('statsContentUpdated', handleStatsUpdate);
    };
  }, []);

  return (
    <section 
      className={`relative min-h-screen flex flex-col items-center justify-center text-center text-white ${className}`}
      style={{
        background: backgroundImage 
          ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`
          : 'linear-gradient(135deg, #166534 0%, #047857 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      {...props}
    >
             {/* 배경 오버레이로 텍스트 가독성 향상 */}
       <div className={`absolute inset-0 ${enhancedOverlay ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-40'}`}></div>
       
       {/* 추가 텍스트 가독성을 위한 이중 오버레이 */}
       {enhancedOverlay && (
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
       )}
       
       {/* 메인 콘텐츠 컨테이너 */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center flex-1">
          {/* 메인 콘텐츠 */}
          <div className="mb-16">
                 <h1 
                   className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl"
                   data-i18n-key="home.hero.title"
                 >
                   {(() => {
                    // heroData state 우선 사용!
                    const title = heroData.mainTitle || mainCopy || t('home.hero.title', { fallback: "40년 축적된 기술력으로\n조명의 미래를 혁신합니다" });
                    // \n을 실제 줄바꿈으로 변환
                    const processedTitle = title.replace(/\\n/g, '\n');
                    return processedTitle.split('\n').map((line, index) => (
                      <span key={index} className="block">
                        {line}
                      </span>
                    ));
                  })()}
                 </h1>
                 <p
                   className="hero-subtitle"
                   data-i18n-key="home.hero.subtitle"
                   style={{
                     fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
                     lineHeight: '1.4',
                     marginBottom: '2.5rem',
                     maxWidth: '64rem',
                     marginLeft: 'auto',
                     marginRight: 'auto',
                     textAlign: 'center',
                     color: '#ffffff !important',
                     textShadow: '2px 2px 8px black',
                     fontWeight: '600',
                     backgroundColor: 'transparent',
                     border: 'none',
                     outline: 'none',
                     whiteSpace: 'pre-line',
                     wordWrap: 'break-word',
                     overflowWrap: 'break-word',
                     display: 'flex',
                     flexDirection: 'column',
                     gap: '0.25rem'
                   }}
                 >
                   {(() => {
                    const subtitle = heroData.subtitle || subCopy || t('home.hero.subtitle', { fallback: "정호그룹은 조명제어 전문 기업으로서, 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다" });
                    // \n을 실제 줄바꿈으로 변환
                    const processedSubtitle = subtitle.replace(/\\n/g, '\n');
                    return formatTextWithLineBreaks(processedSubtitle);
                  })()}
                 </p>
          
          {/* 설명 텍스트 추가 */}
                 <p
                   className="hero-description"
                   data-i18n-key="home.hero.description"
                   style={{
                     fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                     lineHeight: '1.6',
                     marginBottom: '2rem',
                     maxWidth: '56rem',
                     marginLeft: 'auto',
                     marginRight: 'auto',
                     textAlign: 'center',
                     color: '#ffffff !important',
                     textShadow: '1px 1px 4px black',
                     fontWeight: '400',
                     opacity: '0.9',
                     whiteSpace: 'pre-line'
                   }}
                 >
                   {(() => {
                    const desc = heroData.description || description || t('home.hero.description', { fallback: '150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다.' });
                    // \n을 실제 줄바꿈으로 변환
                    const processedDesc = desc.replace(/\\n/g, '\n');
                    return formatTextWithLineBreaks(processedDesc);
                   })()}
                 </p>
          
          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryAction && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  if (primaryAction.onClick) {
                    primaryAction.onClick();
                  } else if (primaryAction.path) {
                    window.location.href = primaryAction.path;
                  }
                }}
                className="text-xl px-10 py-5 font-semibold"
              >
                {t(primaryAction.label, { fallback: primaryAction.label })}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  if (secondaryAction.onClick) {
                    secondaryAction.onClick();
                  } else if (secondaryAction.path) {
                    window.location.href = secondaryAction.path;
                  }
                }}
                className="text-xl px-10 py-5 font-semibold"
              >
                {t(secondaryAction.label, { fallback: secondaryAction.label })}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 성과지표 - props의 stats 사용 (다국어 지원) */}
      {stats && stats.length > 0 && (
        <div className="w-full pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                    {stat.value}<span className="text-3xl md:text-4xl">{stat.suffix}</span>
                  </div>
                  <div className="text-lg md:text-xl text-white font-medium drop-shadow-md">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;