import React, { useState, useEffect, useRef } from 'react';

const ProductCategorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
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

  const categories = [
    {
      id: 'home-living',
      title: '홈&리빙',
      subtitle: '거실, 침실, 주방 조명',
      description: '일상의 공간을 아름답게 밝히는 프리미엄 조명',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: ['거실 조명', '침실 조명', '주방 조명', '욕실 조명']
    },
    {
      id: 'commercial',
      title: '상업공간',
      subtitle: '사무실, 카페, 매장 조명',
      description: '비즈니스 공간을 전문적으로 연출하는 조명 솔루션',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: ['사무실 조명', '카페 조명', '매장 조명', '호텔 조명']
    },
    {
      id: 'smart',
      title: '스마트조명',
      subtitle: 'IoT 연동, 음성제어 조명',
      description: '최신 기술로 편리하고 스마트한 조명 경험',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      features: ['IoT 연동', '음성제어', '스마트폰 제어', '자동 조절']
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            제품 카테고리
          </h2>
          <p 
            className={`text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            다양한 공간과 용도에 맞는 전문적인 조명 솔루션을 제공합니다
          </p>
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                hoveredCategory === category.id ? 'shadow-2xl scale-105' : 'hover:shadow-xl'
              }`}
              style={{ transitionDelay: `${0.3 + index * 0.2}s` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* 이미지 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* 내용 */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-orange-600 font-semibold mb-3">
                  {category.subtitle}
                </p>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>

                {/* 특징 리스트 */}
                <div className="space-y-2 mb-6">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA 버튼 */}
                <button
                  onClick={() => window.open(`https://www.illutech.co.kr/category/${category.id}`, '_blank')}
                  className="w-full bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  {category.title} 보기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 전체 온라인몰 버튼 */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <button
            onClick={() => window.open('https://www.illutech.co.kr', '_blank')}
            className="inline-flex items-center bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-orange-700 transition-colors duration-200 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            온라인몰 바로가기
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategorySection; 