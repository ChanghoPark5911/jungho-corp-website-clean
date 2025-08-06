import React, { useState, useEffect, useRef } from 'react';

const CoreTechnologies = ({
  title = "차별화된 기술력",
  technologies = [],
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  // 기본 기술 데이터 (technologies가 전달되지 않았을 때 사용)
  const defaultTechnologies = [
    {
      title: "E/F2-BUS 프로토콜",
      description: "국내 최초로 자체 개발한 조명제어 통신 프로토콜로, 안정성과 확장성을 모두 갖춘 차세대 조명제어 표준입니다.",
      features: [
        "40년간 검증된 안정성",
        "확장 가능한 네트워크 구조",
        "실시간 제어 및 모니터링"
      ],
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "IoT 스마트 조명",
      description: "센서와 AI 기술을 결합한 스마트 조명 시스템으로, 사용자 패턴을 학습하여 최적의 조명 환경을 자동으로 제공합니다.",
      features: [
        "AI 기반 사용자 패턴 학습",
        "다양한 센서 통합",
        "클라우드 기반 중앙 제어"
      ],
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "AI 조명 최적화",
      description: "머신러닝 알고리즘을 활용하여 에너지 효율성을 극대화하고, 사용자 경험을 향상시키는 지능형 조명 제어 시스템입니다.",
      features: [
        "머신러닝 기반 최적화",
        "에너지 효율성 30% 향상",
        "개인화된 조명 환경"
      ],
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // technologies가 없으면 기본값 사용
  const technologiesToRender = technologies && technologies.length > 0 ? technologies : defaultTechnologies;

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

  // 자동 슬라이드
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologiesToRender.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, technologiesToRender.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % technologiesToRender.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + technologiesToRender.length) % technologiesToRender.length);
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-white ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h2>
        </div>

        {/* 슬라이더 컨테이너 */}
        <div className="relative">
          {/* 슬라이드 */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {technologiesToRender.map((tech, index) => (
                <div 
                  key={index}
                  className={`w-full flex-shrink-0 px-4 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${0.3 + index * 0.2}s` }}
                >
                  <div className="max-w-4xl mx-auto text-center">
                    {/* 아이콘 */}
                    <div className="flex justify-center mb-8">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-2xl">
                        <div className="w-16 h-16 text-white">
                          {tech.icon}
                        </div>
                      </div>
                    </div>

                    {/* 제목 */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                      {tech.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {tech.description}
                    </p>

                    {/* 특징 리스트 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tech.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="bg-gray-50 rounded-lg p-6 transition-all duration-500 hover:bg-primary hover:text-white"
                        >
                          <div className="text-sm font-semibold">{feature}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 인디케이터 */}
          <div className="flex justify-center mt-8 space-x-2">
            {technologiesToRender.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnologies; 