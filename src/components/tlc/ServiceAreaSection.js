import React from 'react';

const ServiceAreaSection = () => {
  const services = [
    {
      title: '영업 컨설팅',
      description: '고객의 요구사항을 정확히 파악하여 최적의 조명제어 솔루션을 제안합니다',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      process: ['요구사항 분석', '솔루션 제안', '견적 산출', '계약 체결'],
      team: '영업 전문가 15명',
      features: ['무료 현장 방문', '맞춤형 솔루션', '경쟁력 있는 가격', '신속한 응답']
    },
    {
      title: '디자인 서비스',
      description: '조명 설계부터 시공도면까지 전문적인 디자인 서비스를 제공합니다',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      process: ['조명 설계', '도면 작성', '3D 시뮬레이션', '최종 검토'],
      team: '조명 디자이너 8명',
      features: ['3D 렌더링', '조도 계산', '에너지 효율 분석', '맞춤형 설계']
    },
    {
      title: '시공 관리',
      description: '전문 시공팀이 체계적인 프로젝트 관리로 완벽한 시공을 보장합니다',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      process: ['시공 계획', '자재 준비', '현장 시공', '품질 검수'],
      team: '시공 전문가 25명',
      features: ['체계적 일정 관리', '품질 보증', '안전 관리', '진행 상황 보고']
    },
    {
      title: 'A/S 서비스',
      description: '24시간 A/S 센터를 통해 신속하고 정확한 사후관리 서비스를 제공합니다',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      ),
      process: ['고장 접수', '원인 분석', '수리 작업', '완료 확인'],
      team: 'A/S 엔지니어 12명',
      features: ['24시간 대응', '긴급 출동', '정기 점검', '부품 보급']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            서비스 영역
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            영업부터 A/S까지, 고객의 성공을 위한 완벽한 파트너십을 제공합니다
          </p>
        </div>

        {/* 서비스 카드들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              {/* 서비스 헤더 */}
              <div className="flex items-center mb-6">
                <div className="text-green-600 mr-4">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              {/* 프로세스 플로우차트 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">프로세스</h4>
                <div className="flex items-center space-x-2">
                  {service.process.map((step, stepIndex) => (
                    <React.Fragment key={stepIndex}>
                      <div className="flex-1 bg-green-100 text-green-800 text-sm font-medium py-2 px-3 rounded-lg text-center">
                        {step}
                      </div>
                      {stepIndex < service.process.length - 1 && (
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 전문팀 소개 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">전문팀</h4>
                <p className="text-green-600 font-medium">{service.team}</p>
              </div>

              {/* 주요 특징 */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 특징</h4>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="text-center">
          <button
            onClick={() => alert('서비스 가이드북을 다운로드합니다')}
            className="inline-flex items-center bg-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            서비스 가이드북 다운로드
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection; 