import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const GroupIntro = ({
  title,
  content,
  image,
  webpImage,
  stats,
  actionButton,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const sectionRef = useRef(null);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
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

    const timer = setTimeout(animateCounters, 500); // 텍스트 애니메이션 후 시작
    return () => clearTimeout(timer);
  }, [isVisible, stats]);

  const handleActionClick = () => {
    if (actionButton && actionButton.onClick) {
      actionButton.onClick();
    } else if (actionButton && actionButton.path) {
      window.location.href = actionButton.path;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-white ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* 좌측: 텍스트 콘텐츠 */}
          <div className="space-y-8">
            {/* 제목 */}
            <h2 
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              {title}
            </h2>
            
            {/* 내용 */}
            <div 
              className={`space-y-6 text-lg text-gray-700 leading-relaxed transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {/* 액션 버튼 */}
            {actionButton && (
              <div 
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleActionClick}
                  className="text-lg px-8 py-4"
                >
                  {actionButton.label}
                </Button>
              </div>
            )}
          </div>
          
          {/* 우측: 이미지 및 통계 */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* 메인 이미지 */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={image} 
                alt="정호그룹 회사 건물" 
                className="w-full h-80 lg:h-96 object-cover"
              />
              
              {/* 통계 오버레이 */}
              {stats && stats.length > 0 && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="grid grid-cols-2 gap-4 lg:gap-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                            {counters[index] || 0}
                            {stat.suffix}
                          </div>
                          <div className="text-sm lg:text-base text-gray-200">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 추가 장식 요소 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupIntro; 