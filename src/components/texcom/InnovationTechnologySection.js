import React, { useState, useEffect, useRef } from 'react';

const InnovationTechnologySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTechnology, setActiveTechnology] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechnology((prev) => (prev + 1) % technologies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const technologies = [
    {
      icon: "🤖",
      title: "AI 품질 관리",
      description: "인공지능 기반 실시간 품질 검사 시스템",
      features: [
        "컴퓨터 비전 기반 결함 검출",
        "머신러닝 알고리즘으로 정확도 향상",
        "실시간 품질 데이터 분석",
        "예측 유지보수 시스템"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: "📡",
      title: "IoT 모니터링",
      description: "실시간 생산 현황 및 장비 상태 모니터링",
      features: [
        "센서 네트워크 구축",
        "실시간 데이터 수집 및 분석",
        "원격 제어 및 모니터링",
        "에너지 효율성 최적화"
      ],
      color: "from-green-500 to-blue-600"
    },
    {
      icon: "🏭",
      title: "스마트 팩토리",
      description: "4차 산업혁명 기반 자동화 제조 시스템",
      features: [
        "완전 자동화 생산 라인",
        "디지털 트윈 기술 적용",
        "실시간 생산 계획 최적화",
        "통합 물류 관리 시스템"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: "🌱",
      title: "친환경 기술",
      description: "지속가능한 제조를 위한 친환경 솔루션",
      features: [
        "에너지 절약 기술",
        "폐수 처리 및 재활용",
        "친환경 소재 개발",
        "탄소 배출량 최소화"
      ],
      color: "from-green-400 to-teal-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            혁신 기술
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            IoT, AI, 스마트 팩토리 기술을 접목하여 
            섬유산업의 미래를 선도합니다
          </p>
        </div>

        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* 기술 카드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                  activeTechnology === index ? 'ring-2 ring-[#FF6B9D]' : ''
                }`}
                onClick={() => setActiveTechnology(index)}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{tech.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {tech.title}
                    </h3>
                    <p className="text-gray-600">
                      {tech.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#1B365D] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 상세 정보 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {technologies[activeTechnology].title}
              </h3>
              <p className="text-lg text-gray-600">
                {technologies[activeTechnology].description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#1B365D] mb-4">
                  기술 특징
                </h4>
                <ul className="space-y-2">
                  {technologies[activeTechnology].features.map((feature, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-[#FF6B9D] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-[#1B365D] to-[#FF6B9D] rounded-xl p-6 text-white">
                <h4 className="text-lg font-semibold mb-4">
                  적용 사례
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    <span>글로벌 섬유 공장 50+곳 적용</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    <span>생산성 30% 향상 달성</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    <span>에너지 효율성 25% 개선</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                    <span>품질 불량률 60% 감소</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button
              className="bg-gradient-to-r from-[#1B365D] to-[#FF6B9D] text-white font-semibold py-4 px-8 rounded-lg hover:shadow-lg transition-all duration-200"
              onClick={() => window.location.href = 'mailto:tech@junghotexcom.com'}
            >
              혁신 기술 상담 신청
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationTechnologySection; 