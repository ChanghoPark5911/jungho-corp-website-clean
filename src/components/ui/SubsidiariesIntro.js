import React, { useState, useEffect, useRef } from 'react';

const SubsidiariesIntro = ({
  title = "4개 계열사가 만드는 완벽한 조명 생태계",
  subtitle = "기술개발부터 고객서비스까지, 각 분야 전문성의 시너지",
  subsidiaries = [],
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  // 기본 계열사 데이터 (subsidiaries가 전달되지 않았을 때 사용)
  const defaultSubsidiaries = [
    {
      title: "기술 혁신의 선도주자",
      description: "R&D + 제조 + 해외수출",
      feature: "E/F2-BUS 자체 개발 프로토콜",
      color: "#0066CC",
      path: "/clarus",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "완벽한 고객 접점 파트너",
      description: "국내영업 + 설계 + 시공 + 서비스",
      feature: "전국 네트워크 24/7 지원",
      color: "#28A745",
      path: "/tlc",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "스마트한 조명 라이프스타일",
      description: "B2C 온라인 사업",
      feature: "전문가 큐레이션 + 당일배송",
      color: "#FF8C00",
      path: "/illutech",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "전통과 트렌드의 조화",
      description: "섬유기계 + 패션브랜드",
      feature: "40년 전통 + 수직계열화",
      color: "#FF6B9D",
      path: "/texcom",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2V5z" />
        </svg>
      )
    }
  ];

  // subsidiaries가 없으면 기본값 사용
  const subsidiariesToRender = subsidiaries && subsidiaries.length > 0 ? subsidiaries : defaultSubsidiaries;

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

  // 카드 순차 애니메이션
  useEffect(() => {
    if (!isVisible) return;

    const animateCards = () => {
      subsidiariesToRender.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 200); // 0.2초 간격
      });
    };

    const timer = setTimeout(animateCards, 300);
    return () => clearTimeout(timer);
  }, [isVisible, subsidiariesToRender]);

  const handleCardClick = (subsidiary) => {
    if (subsidiary.path) {
      window.location.href = subsidiary.path;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-gray-50 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 섹션 */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h2>
          <p 
            className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            {subtitle}
          </p>
        </div>

        {/* 계열사 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {subsidiariesToRender.map((subsidiary, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 lg:p-10 cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${0.4 + index * 0.2}s`,
                background: `linear-gradient(135deg, ${(subsidiary.color || '#0066CC')}05 0%, ${(subsidiary.color || '#0066CC')}10 100%)`
              }}
              onClick={() => handleCardClick(subsidiary)}
            >
              {/* 호버 시 배경 오버레이 */}
              <div 
                className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 hover:opacity-100"
                style={{ 
                  background: `linear-gradient(135deg, ${(subsidiary.color || '#0066CC')}15 0%, ${(subsidiary.color || '#0066CC')}25 100%)`
                }}
              />
              
              {/* 카드 내용 */}
              <div className="relative z-10">
                {/* 아이콘 */}
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{ backgroundColor: `${(subsidiary.color || '#0066CC')}20` }}
                  >
                    <div 
                      className="w-12 h-12 text-white flex items-center justify-center"
                      style={{ color: subsidiary.color || '#0066CC' }}
                    >
                      {subsidiary.icon || (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="text-2xl lg:text-3xl font-bold text-primary text-center mb-4">
                  {subsidiary.name || subsidiary.title}
                </h3>

                {/* 부제목 */}
                {subsidiary.subtitle && (
                  <p className="text-lg text-blue-600 text-center mb-4 font-semibold">
                    {subsidiary.subtitle}
                  </p>
                )}

                {/* 설명 */}
                <p className="text-lg text-gray-600 text-center mb-6 leading-relaxed">
                  {subsidiary.description}
                </p>

                {/* 특징 (기본 데이터에만 존재) */}
                {subsidiary.feature && (
                  <div className="text-center">
                    <div 
                      className="inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500"
                                          style={{ 
                      backgroundColor: `${(subsidiary.color || '#0066CC')}20`,
                      color: subsidiary.color || '#0066CC'
                    }}
                    >
                      {subsidiary.feature}
                    </div>
                  </div>
                )}

                {/* 클릭 인디케이터 */}
                <div className="mt-6 text-center">
                  <div 
                    className="inline-flex items-center text-sm font-medium transition-all duration-300 group"
                    style={{ color: subsidiary.color || '#0066CC' }}
                  >
                    <span className="mr-2">자세히 보기</span>
                    <svg 
                      className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubsidiariesIntro; 