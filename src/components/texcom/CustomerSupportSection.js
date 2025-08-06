import React, { useState, useEffect, useRef } from 'react';

const CustomerSupportSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSupport, setActiveSupport] = useState('b2b');
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

  const b2bSupport = [
    {
      icon: "🔧",
      title: "기술 지원",
      description: "24/7 전문 기술 지원 서비스",
      features: ["원격 기술 지원", "현장 방문 서비스", "기술 교육 프로그램", "긴급 대응 시스템"]
    },
    {
      icon: "📞",
      title: "고객 상담",
      description: "전문 상담팀의 맞춤형 솔루션",
      features: ["1:1 맞춤 상담", "사전 기술 검토", "비용 최적화 제안", "장기 파트너십 구축"]
    },
    {
      icon: "🛠️",
      title: "A/S 서비스",
      description: "신속하고 정확한 유지보수 서비스",
      features: ["예방 정기점검", "긴급 수리 서비스", "부품 공급 관리", "설비 수명 연장"]
    },
    {
      icon: "📚",
      title: "교육 프로그램",
      description: "고객사 직원 기술 교육",
      features: ["운영 교육", "정비 교육", "안전 교육", "인증 프로그램"]
    }
  ];

  const b2cSupport = [
    {
      icon: "🛍️",
      title: "온라인 쇼핑몰",
      description: "편리한 온라인 쇼핑 경험",
      features: ["24시간 주문 가능", "다양한 결제 수단", "실시간 재고 확인", "빠른 배송 서비스"]
    },
    {
      icon: "👗",
      title: "스타일링 서비스",
      description: "개인 맞춤 스타일링 컨설팅",
      features: ["1:1 스타일 상담", "체형 분석", "코디네이션 제안", "시즌별 스타일 가이드"]
    },
    {
      icon: "📱",
      title: "모바일 앱",
      description: "스마트폰으로 언제든 쇼핑",
      features: ["간편한 주문", "푸시 알림 서비스", "위시리스트 관리", "리뷰 및 평점"]
    },
    {
      icon: "🎁",
      title: "멤버십 혜택",
      description: "VIP 고객을 위한 특별 혜택",
      features: ["포인트 적립", "할인 혜택", "우선 배송", "전용 고객 서비스"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            고객 지원
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            B2B와 B2C 고객 모두를 위한 
            전문적이고 친근한 고객 지원 서비스를 제공합니다
          </p>
        </div>

        {/* 지원 유형 선택 */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveSupport('b2b')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeSupport === 'b2b'
                  ? 'bg-[#1B365D] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              B2B 고객 지원
            </button>
            <button
              onClick={() => setActiveSupport('b2c')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeSupport === 'b2c'
                  ? 'bg-[#FF6B9D] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              B2C 고객 지원
            </button>
          </div>
        </div>

        <div className={`transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {activeSupport === 'b2b' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {b2bSupport.map((service, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                          <span className="w-1 h-1 bg-[#1B365D] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#1B365D] rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">24/7 긴급 지원</h3>
                <p className="text-lg mb-6">
                  언제든지 전문 기술팀이 대기하고 있습니다
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="bg-white text-[#1B365D] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => window.location.href = 'tel:1588-1234'}
                  >
                    1588-1234
                  </button>
                  <button
                    className="bg-white text-[#1B365D] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => window.location.href = 'mailto:tech@junghotexcom.com'}
                  >
                    tech@junghotexcom.com
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSupport === 'b2c' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {b2cSupport.map((service, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                          <span className="w-1 h-1 bg-[#FF6B9D] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#FF6B9D] rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">고객 만족 서비스</h3>
                <p className="text-lg mb-6">
                  언제든지 친근한 고객 서비스팀이 도와드립니다
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    className="bg-white text-[#FF6B9D] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => window.location.href = 'tel:1588-5678'}
                  >
                    1588-5678
                  </button>
                  <button
                    className="bg-white text-[#FF6B9D] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => window.open('https://fashion.junghotexcom.com', '_blank')}
                  >
                    온라인 쇼핑몰
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerSupportSection; 