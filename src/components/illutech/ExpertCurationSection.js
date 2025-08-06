import React, { useState, useEffect, useRef } from 'react';

const ExpertCurationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(0);
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

  const featuredProducts = [
    {
      id: 1,
      name: '모던 펜던트 조명',
      category: '거실 조명',
      price: '₩89,000',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.8,
      reviews: 127
    },
    {
      id: 2,
      name: '스마트 LED 스트립',
      category: '스마트 조명',
      price: '₩45,000',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: '클래식 테이블 램프',
      category: '침실 조명',
      price: '₩67,000',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      rating: 4.7,
      reviews: 156
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 좌측: 전문가 소개 */}
          <div className="space-y-8">
            <h2 
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              전문가 큐레이션
            </h2>
            
            <div 
              className={`space-y-6 text-lg text-gray-700 leading-relaxed transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <p>
                40년 조명 전문가가 직접 선별한 프리미엄 조명만을 엄선하여 제공합니다.
              </p>
              <p>
                품질, 디자인, 가성비를 모두 고려한 최고의 제품들로 구성되어 있습니다.
              </p>
            </div>

            {/* 전문가 정보 */}
            <div 
              className={`bg-orange-50 rounded-2xl p-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">김</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">김조명 전문가</h3>
                  <p className="text-orange-600">40년 조명 업계 경력</p>
                </div>
              </div>
              <p className="text-gray-600">
                "고객의 공간에 가장 적합한 조명을 찾아드리는 것이 제 역할입니다."
              </p>
            </div>
          </div>

          {/* 우측: 추천 제품 */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">이달의 추천 제품</h3>
            
            <div className="space-y-4">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`bg-white border-2 rounded-xl p-4 transition-all duration-300 ${
                    currentProduct === index ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setCurrentProduct(index)}
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{product.name}</h4>
                      <p className="text-sm text-orange-600">{product.category}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => window.open('https://www.illutech.co.kr/curation', '_blank')}
                className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                더 많은 추천 제품 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertCurationSection; 