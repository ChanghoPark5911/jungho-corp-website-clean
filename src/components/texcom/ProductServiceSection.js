import React, { useState, useEffect, useRef } from 'react';

const ProductServiceSection = () => {
  const [activeTab, setActiveTab] = useState('b2b');
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

  const b2bProducts = [
    {
      category: "방직기계",
      products: [
        { name: "자동 방직기", description: "고속 자동화 방직 시스템", features: ["AI 품질 관리", "원격 모니터링", "에너지 효율성"] },
        { name: "염색설비", description: "친환경 염색 공정 설비", features: ["물 절약 기술", "폐수 처리 시스템", "색상 정확도"] },
        { name: "후처리장비", description: "완성도 향상 후처리 시스템", features: ["소프트 터치 처리", "항균 기능", "내구성 강화"] }
      ]
    },
    {
      category: "자동화 시스템",
      products: [
        { name: "IoT 모니터링", description: "실시간 생산 현황 모니터링", features: ["데이터 분석", "예측 유지보수", "품질 추적"] },
        { name: "스마트 팩토리", description: "4차 산업혁명 기반 제조 시스템", features: ["자동화 라인", "품질 검사", "물류 최적화"] }
      ]
    }
  ];

  const b2cProducts = [
    {
      category: "의류 라인",
      products: [
        { name: "클래식 컬렉션", description: "타임리스한 클래식 의류", features: ["프리미엄 소재", "핏 최적화", "내구성"] },
        { name: "캐주얼 라인", description: "편안하고 스타일리시한 일상복", features: ["편안한 착용감", "트렌디한 디자인", "다양한 사이즈"] },
        { name: "트렌드 컬렉션", description: "최신 패션 트렌드를 반영한 제품", features: ["시즌별 출시", "셀럽 콜라보", "한정판"] }
      ]
    },
    {
      category: "액세서리",
      products: [
        { name: "가방 & 신발", description: "패션을 완성하는 액세서리", features: ["고급 소재", "실용적 디자인", "브랜드 아이덴티티"] },
        { name: "스타일링 서비스", description: "개인 맞춤 스타일링 컨설팅", features: ["1:1 상담", "스타일 분석", "코디네이션"] }
      ]
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            제품 & 서비스
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            섬유기계의 정밀함과 패션의 창의성이 만나 
            고객에게 최고의 가치를 제공합니다
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('b2b')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeTab === 'b2b'
                  ? 'bg-[#1B365D] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              섬유기계 (B2B)
            </button>
            <button
              onClick={() => setActiveTab('b2c')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                activeTab === 'b2c'
                  ? 'bg-[#FF6B9D] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              패션 브랜드 (B2C)
            </button>
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        <div className={`transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {activeTab === 'b2b' && (
            <div className="space-y-12">
              {b2bProducts.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-[#1B365D] mb-6">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product, productIndex) => (
                      <div key={productIndex} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {product.description}
                        </p>
                        <ul className="space-y-1">
                          {product.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                              <span className="w-1 h-1 bg-[#1B365D] rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button
                  className="bg-[#1B365D] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#FF6B9D] transition-colors duration-200"
                  onClick={() => window.location.href = 'mailto:tech@junghotexcom.com'}
                >
                  섬유기계 상담 신청
                </button>
              </div>
            </div>
          )}

          {activeTab === 'b2c' && (
            <div className="space-y-12">
              {b2cProducts.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-[#FF6B9D] mb-6">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product, productIndex) => (
                      <div key={productIndex} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {product.description}
                        </p>
                        <ul className="space-y-1">
                          {product.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                              <span className="w-1 h-1 bg-[#FF6B9D] rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button
                  className="bg-[#FF6B9D] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#1B365D] transition-colors duration-200"
                  onClick={() => window.open('https://fashion.junghotexcom.com', '_blank')}
                >
                  패션 브랜드 쇼핑하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductServiceSection; 