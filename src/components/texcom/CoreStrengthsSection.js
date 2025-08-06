import React, { useState, useEffect, useRef } from 'react';

const CoreStrengthsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
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

  const strengths = [
    {
      icon: "🏭",
      title: "40년 섬유기계 전문성",
      description: "1970년대부터 축적된 방직, 염색, 후처리 기술의 전문성",
      details: ["500+ 글로벌 파트너사", "특허 기술 50+건", "ISO 9001 인증"]
    },
    {
      icon: "🎨",
      title: "트렌드 선도 패션 브랜드",
      description: "젊은 감각과 클래식의 조화를 통한 브랜드 가치 창조",
      details: ["시즌별 컬렉션 출시", "셀럽 콜라보레이션", "스타일링 서비스"]
    },
    {
      icon: "🔬",
      title: "혁신 기술 개발",
      description: "IoT, AI 기술을 접목한 스마트 제조 솔루션",
      details: ["스마트 팩토리 구축", "AI 품질 관리", "원격 모니터링"]
    },
    {
      icon: "🌍",
      title: "글로벌 네트워크",
      description: "전 세계 주요 시장에 구축된 영업 및 서비스 네트워크",
      details: ["30개국 진출", "24/7 기술 지원", "현지화 서비스"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            핵심 경쟁력
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            40년간 축적된 전문성과 혁신 기술로 
            섬유산업과 패션의 미래를 선도합니다
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div className="text-4xl mb-4">{strength.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {strength.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {strength.description}
              </p>
              <ul className="space-y-1">
                {strength.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-sm text-gray-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#FF6B9D] rounded-full mr-2"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              통합 가치 창조
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              섬유기계의 정밀함과 패션의 창의성이 만나 
              고객에게 최고의 가치를 제공합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-[#1B365D] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#FF6B9D] transition-colors duration-200"
                onClick={() => window.location.href = '#b2b'}
              >
                섬유기계 기술 보기
              </button>
              <button
                className="bg-[#FF6B9D] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#1B365D] transition-colors duration-200"
                onClick={() => window.location.href = '#b2c'}
              >
                패션 브랜드 둘러보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreStrengthsSection; 