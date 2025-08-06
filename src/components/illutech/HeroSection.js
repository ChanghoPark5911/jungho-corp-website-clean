import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const stats = [
      { value: 1000, suffix: '+', label: '프리미엄 제품' },
      { value: 100, suffix: '%', label: '당일배송' },
      { value: 30, suffix: '일', label: '무료 교환' }
    ];

    const animateCounters = () => {
      const duration = 2000;
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

    const timer = setTimeout(animateCounters, 1500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`
        }}
      />
      
      {/* 오렌지 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-600/80 via-orange-500/70 to-orange-600/80" />
      
      {/* 내용 컨테이너 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* 메인 카피 */}
        <h1 
          className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          당신의 공간을 빛냅니다
        </h1>
        
        {/* 서브 카피 */}
        <p 
          className={`text-lg sm:text-xl lg:text-2xl text-orange-100 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.6s' }}
        >
          40년 조명 전문성이 선별한 프리미엄 조명을 온라인에서 만나보세요
        </p>
        
        {/* 핵심 수치 */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {counters[0] || 0}+
            </div>
            <div className="text-sm sm:text-base text-orange-100">
              프리미엄 제품
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {counters[1] || 0}%
            </div>
            <div className="text-sm sm:text-base text-orange-100">
              당일배송
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
              {counters[2] || 0}일
            </div>
            <div className="text-sm sm:text-base text-orange-100">
              무료 교환
            </div>
          </div>
        </div>
        
        {/* CTA 버튼들 */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1.2s' }}
        >
          <button
            onClick={() => window.open('https://www.illutech.co.kr', '_blank')}
            className="bg-white text-orange-600 font-semibold py-4 px-8 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-lg shadow-lg"
          >
            온라인몰 바로가기
          </button>
          
          <button
            onClick={() => window.location.href = '#consultation'}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
          >
            무료 상담 신청
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 