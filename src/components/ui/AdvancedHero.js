import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { Typography } from './index';

const AdvancedHero = ({
  backgroundImage,
  mainCopy,
  subCopy,
  stats,
  primaryAction,
  secondaryAction,
  showScrollIndicator = true,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 카운터 애니메이션
  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      const duration = 2000; // 2초
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        const targetValue = parseInt(stat.value);
        let currentValue = 0;
        const increment = targetValue / steps;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }

          setCounters(prev => ({
            ...prev,
            [index]: Math.floor(currentValue)
          }));
        }, stepDuration);
      });
    };

    const timer = setTimeout(animateCounters, 1500); // 텍스트 애니메이션 후 시작
    return () => clearTimeout(timer);
  }, [isVisible, stats]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleActionClick = (action) => {
    if (action && action.onClick) {
      action.onClick();
    } else if (action && action.path) {
      window.location.href = action.path;
    }
  };

  return (
    <section 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      {...props}
    >
      {/* 배경 이미지 */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            transform: `scale(${1 + scrollY * 0.0001})` // 패럴랙스 줌 효과
          }}
        />
      )}
      
      {/* 다크 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      {/* 내용 컨테이너 */}
      <div className="relative z-10 max-w-6xl mx-auto px-container-mobile md:px-container-tablet lg:px-container-desktop text-center text-white">
        {/* 메인 카피 */}
        {mainCopy && (
          <Typography
            variant="h1"
            as="h1"
            className={`mb-4 md:mb-6 leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {mainCopy}
          </Typography>
        )}
        
        {/* 서브 카피 */}
        {subCopy && (
          <Typography
            variant="body-large"
            className={`text-gray-200 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            {subCopy}
          </Typography>
        )}
        
        {/* 핵심 수치 */}
        {stats && stats.length > 0 && (
          <div 
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.9s' }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-1 md:mb-2">
                  {counters[index] || 0}
                  {stat.suffix}
                </div>
                <div className="text-xs md:text-sm lg:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA 버튼들 */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          {primaryAction && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleActionClick(primaryAction)}
              className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              {primaryAction.label}
            </Button>
          )}
          
          {secondaryAction && (
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleActionClick(secondaryAction)}
              className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-white text-white hover:bg-white hover:text-primary"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
      
      {/* 스크롤 다운 인디케이터 */}
      {showScrollIndicator && (
        <div 
          className={`absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1.5s' }}
        >
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center text-white hover:text-secondary transition-colors duration-300"
            aria-label="스크롤 다운"
          >
            <span className="text-xs md:text-sm mb-1 md:mb-2">스크롤</span>
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default AdvancedHero; 