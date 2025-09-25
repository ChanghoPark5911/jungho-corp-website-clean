import React, { useState, useEffect } from 'react';
import Button from './Button';

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
  mainCopy = "정호그룹의 사업영역",
  subCopy = "조명제어 전문기업으로서 40년간 축적된 기술력으로,\n다양한 분야에서 혁신적인 솔루션을 제공합니다",
  description = "혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다",
  stats = [],
  primaryAction,
  secondaryAction,
  className = '',
  enhancedSubtitle = false,
  enhancedOverlay = false,
  useLocalStorage = true, // localStorage 사용 여부 제어
  ...props
}) => {
  const [heroData, setHeroData] = useState({
    mainTitle: "",
    subtitle: "",
    description: ""
  });

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
      // props로 전달된 데이터가 있으면 우선 사용 (Firebase 데이터)
      if (mainCopy && mainCopy !== "정호그룹\n조명의 미래를\n만들어갑니다") {
        console.log('Props에서 Hero 데이터 사용:', { mainCopy, subCopy, description });
        setHeroData({
          mainTitle: mainCopy,
          subtitle: subCopy,
          description: description || ""
        });
        return;
      }
      
      // useLocalStorage가 false이면 props의 mainCopy와 subCopy 사용
      if (!useLocalStorage) {
        console.log('useLocalStorage=false, props 사용:', { mainCopy, subCopy });
        setHeroData({
          mainTitle: mainCopy,
          subtitle: subCopy,
          description: ""
        });
        return;
      }
      
      // 기존 localStorage 로직 (백업용)
      const saved = localStorage.getItem('hero_content');
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setHeroData(parsedData);
          console.log('히어로 데이터 로드됨:', parsedData);
        } catch (error) {
          console.error('히어로 데이터 파싱 오류:', error);
        }
      } else {
        // 저장된 데이터가 없을 때만 기본값 설정
        setHeroData({
          mainTitle: "40년 축적된 기술력으로\n조명의 미래를 혁신합니다",
          subtitle: "조명제어 전문기업으로서 40년간 축적된 기술력으로,\n다양한 분야에서 혁신적인 솔루션을 제공합니다",
          description: "수많은 프로젝트의 성공적인 시공 및 운영경험을 바탕으로 최고의 고객가치를 창출합니다"
        });
        console.log('기본 히어로 데이터 설정됨');
      }
    };
    
    // 초기 로드
    loadHeroContent();
    
    // 페이지 가시성 변경 감지 (탭 전환, 브라우저 최소화 등)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('페이지 가시성 변경 감지, 데이터 재로드');
        loadHeroContent();
      }
    };
    
    // 실시간 업데이트 리스너
    const handleContentUpdate = () => {
      console.log('히어로 콘텐츠 업데이트 이벤트 수신');
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
  }, [mainCopy, subCopy, useLocalStorage]); // mainCopy, subCopy 의존성 추가

  // 성과지표 데이터 로드 및 실시간 업데이트
  useEffect(() => {
    const loadStatsContent = () => {
      const saved = localStorage.getItem('stats_content');
      if (saved) {
        try {
          const parsedContent = JSON.parse(saved);
          setStatsData(parsedContent);
          console.log('성과지표 데이터 로드됨:', parsedContent);
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
            {heroData.mainTitle ? heroData.mainTitle.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            )) : mainCopy.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p 
            className="hero-subtitle"
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
            {heroData.subtitle || subCopy}
          </p>
          
          {/* 설명 텍스트 추가 */}
          <p 
            className="hero-description"
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
            {formatTextWithLineBreaks(heroData.description || '수많은 프로젝트의 성공적인 시공 및 운영경험을 바탕으로 최고의 고객가치를 창출합니다')}
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
                {primaryAction.label}
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
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 성과지표 - flexbox를 사용하여 하단에 안전하게 배치 */}
      <div className="w-full pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                {statsData.years}<span className="text-3xl md:text-4xl">년</span>
              </div>
              <div className="text-lg md:text-xl text-white font-medium drop-shadow-md">
                {statsData.yearsLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                {statsData.projects}<span className="text-3xl md:text-4xl">+</span>
              </div>
              <div className="text-lg md:text-xl text-white font-medium drop-shadow-md">
                {statsData.projectsLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                {statsData.countries}<span className="text-3xl md:text-4xl">+</span>
              </div>
              <div className="text-lg md:text-xl text-white font-medium drop-shadow-md">
                {statsData.countriesLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                {statsData.support}<span className="text-3xl md:text-4xl">%</span>
              </div>
              <div className="text-lg md:text-xl text-white font-medium drop-shadow-md">
                {statsData.supportLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;