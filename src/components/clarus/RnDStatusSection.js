import React from 'react';

const RnDStatusSection = () => {
  const researchAreas = [
    {
      title: 'AI 기술',
      description: '머신러닝을 활용한 지능형 조명제어 알고리즘 개발',
      progress: 85,
      color: 'bg-blue-500'
    },
    {
      title: 'IoT 기술',
      description: '센서 네트워크 및 실시간 데이터 처리 시스템',
      progress: 90,
      color: 'bg-green-500'
    },
    {
      title: '차세대 프로토콜',
      description: 'E/F2-BUS 2.0 개발 및 표준화 추진',
      progress: 70,
      color: 'bg-purple-500'
    }
  ];

  const roadmap = [
    {
      year: '2024',
      title: 'E/F2-BUS 2.0 베타 출시',
      description: '향상된 성능과 보안 기능을 갖춘 차세대 프로토콜'
    },
    {
      year: '2025',
      title: 'AI 기반 자동화 시스템',
      description: '머신러닝을 활용한 지능형 조명제어 솔루션'
    },
    {
      year: '2026',
      title: '글로벌 표준 인증',
      description: '국제 표준 기관으로부터 프로토콜 인증 획득'
    },
    {
      year: '2027',
      title: '차세대 IoT 플랫폼',
      description: '5G/6G 네트워크 기반 초고속 조명제어 시스템'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            R&D 현황
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            지속적인 연구개발 투자로 조명제어 기술의 미래를 선도합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 연구개발 투자 현황 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              연구개발 투자 현황
            </h3>
            
            {/* 투자 금액 그래프 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">연간 R&D 투자 (억원)</span>
                <span className="text-2xl font-bold text-blue-600">150억원</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>2020: 80억원</span>
                <span>2024: 150억원</span>
              </div>
            </div>

            {/* 연구 분야별 진행률 */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">주요 연구 분야</h4>
              {researchAreas.map((area, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">{area.title}</span>
                    <span className="text-sm text-gray-500">{area.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${area.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${area.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 연구소 소개 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              클라루스 연구소
            </h3>
            
            <div className="mb-6">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-blue-600 font-semibold mb-2">연구진 구성</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900">박사급 연구원</div>
                    <div className="text-gray-600">25명</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">석사급 연구원</div>
                    <div className="text-gray-600">45명</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">특허 출원</div>
                    <div className="text-gray-600">50+ 건</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">논문 발표</div>
                    <div className="text-gray-600">30+ 편</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">최첨단 실험실</h4>
                  <p className="text-sm text-gray-600">조명제어 기술 연구를 위한 전용 실험실 운영</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">대학 협력</h4>
                  <p className="text-sm text-gray-600">국내외 유수 대학과 공동 연구 프로젝트 진행</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 로드맵 타임라인 */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            향후 로드맵
          </h3>
          
          <div className="relative">
            {/* 타임라인 라인 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full"></div>
            
            <div className="space-y-8">
              {roadmap.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* 콘텐츠 */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-lg font-bold text-blue-600 mb-1">{item.year}</div>
                      <div className="font-semibold text-gray-900 mb-2">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                  
                  {/* 타임라인 포인트 */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  {/* 빈 공간 */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RnDStatusSection; 