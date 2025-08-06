import React, { useState } from 'react';

const ProductLineupSection = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: '중앙제어시스템',
      englishName: 'Central Control System',
      description: '대규모 건물의 조명을 통합 관리하는 중앙 제어 시스템',
      features: [
        '실시간 모니터링',
        '스케줄링 기능',
        '에너지 효율 최적화',
        '원격 제어 지원'
      ],
      specs: {
        '최대 노드': '10,000개',
        '응답시간': '50ms 이하',
        '통신방식': 'E/F2-BUS',
        '운영체제': 'Windows/Linux'
      },
      image: 'bg-gradient-to-br from-blue-500 to-blue-700'
    },
    {
      id: 2,
      name: '산업용 조명제어',
      englishName: 'Industrial Lighting Control',
      description: '공장 및 산업시설에 최적화된 조명 제어 솔루션',
      features: [
        '고온/고습 환경 대응',
        '방폭 인증',
        '24시간 연속 운영',
        '유지보수 최적화'
      ],
      specs: {
        '작동온도': '-40°C ~ +85°C',
        '방폭등급': 'Ex d IIC T6',
        'IP등급': 'IP67',
        'MTBF': '50,000시간'
      },
      image: 'bg-gradient-to-br from-green-500 to-green-700'
    },
    {
      id: 3,
      name: '무선 조명제어',
      englishName: 'Wireless Lighting Control',
      description: '설치가 간편한 무선 조명 제어 시스템',
      features: [
        '간편한 설치',
        '배터리 수명 5년',
        'Mesh 네트워크',
        '스마트폰 연동'
      ],
      specs: {
        '통신거리': '최대 100m',
        '배터리수명': '5년',
        '네트워크': 'Mesh',
        '보안': 'AES-128'
      },
      image: 'bg-gradient-to-br from-purple-500 to-purple-700'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            제품 라인업
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            다양한 환경과 요구사항에 맞는 최적화된 조명제어 솔루션을 제공합니다.
          </p>
        </div>

        {/* 제품 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* 제품 이미지 */}
              <div className={`h-48 ${product.image} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">{product.name}</div>
                  <div className="text-sm opacity-90">{product.englishName}</div>
                </div>
              </div>

              {/* 제품 정보 */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>

                {/* 주요 기능 */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">주요 기능</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 상세 사양 (호버 시 표시) */}
                {hoveredProduct === product.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">상세 사양</h4>
                    <div className="space-y-1">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="text-center">
          <button className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            제품 카탈로그 다운로드
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductLineupSection; 