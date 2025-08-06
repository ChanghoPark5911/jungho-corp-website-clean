import React from 'react';

const CoreTechnologySection = () => {
  const features = [
    {
      title: '안정성',
      description: '99.9% 이상의 안정적인 통신으로 24시간 무중단 운영 보장',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: '확장성',
      description: '최대 10,000개 노드까지 확장 가능한 유연한 아키텍처',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: '호환성',
      description: '기존 DALI, KNX 등 다양한 프로토콜과 완벽 호환',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            핵심 기술: E/F2-BUS 프로토콜
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            클라루스가 자체 개발한 E/F2-BUS 프로토콜은 조명제어 분야의 새로운 표준을 제시합니다.
            안정성, 확장성, 호환성을 모두 갖춘 차세대 통신 프로토콜입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 기술 설명 */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              기술적 우위
            </h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                기술 자료 다운로드
              </button>
            </div>
          </div>

          {/* 기술 구조도 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
              E/F2-BUS 아키텍처
            </h4>
            <div className="space-y-4">
              {/* 시스템 레이어 */}
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="text-sm font-semibold text-blue-900">시스템 레이어</div>
                <div className="text-xs text-blue-700 mt-1">중앙 제어 시스템</div>
              </div>
              
              {/* 네트워크 레이어 */}
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <div className="text-sm font-semibold text-green-900">네트워크 레이어</div>
                <div className="text-xs text-green-700 mt-1">E/F2-BUS 프로토콜</div>
              </div>
              
              {/* 디바이스 레이어 */}
              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="text-sm font-semibold text-purple-900">디바이스 레이어</div>
                <div className="text-xs text-purple-700 mt-1">조명 제어기, 센서</div>
              </div>
              
              {/* 물리 레이어 */}
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="text-sm font-semibold text-orange-900">물리 레이어</div>
                <div className="text-xs text-orange-700 mt-1">전력선 통신</div>
              </div>
            </div>
          </div>
        </div>

        {/* 기술 스펙 */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            기술 스펙
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">최대 노드 수</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">통신 안정성</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50ms</div>
              <div className="text-gray-600">응답 시간</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnologySection; 