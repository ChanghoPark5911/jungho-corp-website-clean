import React, { useState, useEffect, useRef } from 'react';

const CustomerConvenienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const conveniences = [
    {
      id: 'same-day-delivery',
      title: '당일배송',
      description: '서울/경기 오후 2시 이전 주문 시 당일 배송',
      icon: '🚚',
      highlight: true
    },
    {
      id: 'next-day-delivery',
      title: '전국 익일배송',
      description: '전국 어디서나 익일 배송 서비스',
      icon: '📦',
      highlight: false
    },
    {
      id: 'installation',
      title: '전문 설치 서비스',
      description: '조명 전문가의 정확한 설치 서비스',
      icon: '🔧',
      highlight: false
    },
    {
      id: 'exchange',
      title: '30일 무조건 교환/환불',
      description: '30일 이내 무조건 교환 및 환불 보장',
      icon: '🔄',
      highlight: true
    },
    {
      id: 'membership',
      title: '멤버십 혜택',
      description: '등급별 할인 및 특별 혜택 제공',
      icon: '👑',
      highlight: false
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            고객 편의 서비스
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            최고의 쇼핑 경험을 위한 다양한 편의 서비스를 제공합니다
          </p>
        </div>

        {/* 편의 서비스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {conveniences.map((convenience, index) => (
            <div
              key={convenience.id}
              className={`bg-white border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                convenience.highlight ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{convenience.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {convenience.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {convenience.description}
                </p>
                {convenience.highlight && (
                  <div className="mt-3">
                    <span className="inline-block bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                      인기
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div 
          className={`bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <h3 className="text-2xl font-bold mb-4">더 많은 혜택을 확인하세요</h3>
          <p className="text-orange-100 mb-6">
            신규 회원 가입 시 10% 할인 쿠폰과 무료 배송 혜택을 드립니다
          </p>
          <button
            onClick={() => window.open('https://www.illutech.co.kr/membership', '_blank')}
            className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-orange-50 transition-colors duration-200"
          >
            멤버십 가입하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerConvenienceSection; 