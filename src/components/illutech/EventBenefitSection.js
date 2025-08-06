import React, { useState, useEffect, useRef } from 'react';

const EventBenefitSection = () => {
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

  const events = [
    {
      id: 'new-member',
      title: '신규 회원 특가',
      description: '신규 회원 가입 시 10% 할인 쿠폰 + 무료 배송',
      discount: '10%',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      endDate: '2024.12.31',
      highlight: true
    },
    {
      id: 'bulk-purchase',
      title: '대량 구매 할인',
      description: '10개 이상 구매 시 추가 15% 할인',
      discount: '15%',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      endDate: '2024.12.31',
      highlight: false
    },
    {
      id: 'season-sale',
      title: '시즌 특가',
      description: '겨울 시즌 조명 최대 30% 할인',
      discount: '30%',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      endDate: '2024.02.29',
      highlight: true
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
            이벤트 & 혜택
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            지금 진행 중인 특별한 할인 이벤트와 혜택을 확인해보세요
          </p>
        </div>

        {/* 이벤트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                event.highlight ? 'ring-2 ring-orange-500' : ''
              }`}
              style={{ transitionDelay: `${0.3 + index * 0.2}s` }}
            >
              {/* 할인 배지 */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-orange-600 text-white font-bold px-3 py-1 rounded-full text-sm">
                  {event.discount} OFF
                </div>
              </div>

              {/* 이미지 */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* 내용 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    ~ {event.endDate}
                  </span>
                  {event.highlight && (
                    <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      인기
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 혜택 정보 */}
        <div 
          className={`bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <h3 className="text-2xl font-bold mb-4">추가 혜택</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold mb-2">무료</div>
              <p className="text-orange-100">배송</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">무료</div>
              <p className="text-orange-100">설치</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">30일</div>
              <p className="text-orange-100">교환/환불</p>
            </div>
          </div>
          <button
            onClick={() => window.open('https://www.illutech.co.kr/events', '_blank')}
            className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-orange-50 transition-colors duration-200"
          >
            이벤트 자세히 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventBenefitSection; 