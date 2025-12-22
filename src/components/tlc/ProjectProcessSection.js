import React, { useState } from 'react';

const ProjectProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      step: 1,
      title: '상담',
      subtitle: 'Consultation',
      duration: '1-2일',
      description: '고객의 요구사항을 정확히 파악하고 최적의 솔루션을 제안합니다',
      details: [
        '현장 방문 및 요구사항 분석',
        '기존 시스템 현황 파악',
        '예산 및 일정 협의',
        '초기 솔루션 제안'
      ],
      customerCheckpoints: ['요구사항 명확화', '예산 범위 설정', '일정 협의'],
      imagePath: '/images/tlc/process/step1-consultation.png',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      step: 2,
      title: '설계',
      subtitle: 'Design',
      duration: '3-5일',
      description: '전문 디자이너가 조명 설계부터 시공도면까지 완벽하게 설계합니다',
      details: [
        '조명 시스템 설계',
        '3D 시뮬레이션 및 렌더링',
        '조도 계산 및 에너지 효율 분석',
        '시공도면 및 상세도 작성'
      ],
      customerCheckpoints: ['설계안 검토', '조도 및 분위기 확인', '최종 설계 승인'],
      imagePath: '/images/tlc/process/step2-design.png',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      step: 3,
      title: '견적',
      subtitle: 'Quotation',
      duration: '1-2일',
      description: '정확한 견적 산출과 투명한 가격 제시로 고객의 신뢰를 얻습니다',
      details: [
        '자재 및 장비 견적 산출',
        '시공 인건비 계산',
        '유지보수 비용 포함',
        '경쟁력 있는 최종 견적 제시'
      ],
      customerCheckpoints: ['견적서 검토', '가격 협의', '계약 조건 확인'],
      imagePath: '/images/tlc/process/step3-quotation.png',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      step: 4,
      title: '계약',
      subtitle: 'Contract',
      duration: '1일',
      description: '명확한 계약 조건과 보증 사항으로 고객의 안심을 보장합니다',
      details: [
        '계약서 작성 및 검토',
        '보증 조건 및 A/S 조건 명시',
        '일정 및 납기 협의',
        '계약 체결 및 착공 준비'
      ],
      customerCheckpoints: ['계약서 검토', '보증 조건 확인', '최종 계약 체결'],
      imagePath: '/images/tlc/process/step4-contract.png',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      step: 5,
      title: '시공',
      subtitle: 'Construction',
      duration: '7-14일',
      description: '전문 시공팀이 체계적인 프로젝트 관리로 완벽한 시공을 보장합니다',
      details: [
        '현장 안전 점검 및 준비',
        '자재 및 장비 설치',
        '시스템 연동 및 테스트',
        '품질 검수 및 조정'
      ],
      customerCheckpoints: ['시공 진행 상황 확인', '중간 점검', '최종 시공 완료 확인'],
      imagePath: '/images/tlc/process/step5-construction.png',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      step: 6,
      title: '완료',
      subtitle: 'Completion',
      duration: '1일',
      description: '시스템 인수인계와 사용자 교육을 통해 완벽한 프로젝트 완료를 보장합니다',
      details: [
        '최종 시스템 점검 및 테스트',
        '사용자 매뉴얼 및 교육',
        '인수인계 및 보증서 발급',
        'A/S 계약 및 정기 점검 일정 협의'
      ],
      customerCheckpoints: ['시스템 동작 확인', '사용법 교육 완료', '인수인계 완료'],
      imagePath: '/images/tlc/process/step6-completion.png',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            프로젝트 프로세스
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            6단계 체계적인 프로세스로 고객의 만족을 보장합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeStep === index ? 'transform scale-105' : ''
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`flex items-center p-4 rounded-lg border-2 transition-all duration-300 ${
                    activeStep === index
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                  }`}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      activeStep === index ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${
                          activeStep === index ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {step.title}
                        </h3>
                        <span className="text-sm text-gray-500">{step.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-8 h-full">
              {activeStep !== null && (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mr-4">
                        {processSteps[activeStep].icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {processSteps[activeStep].title}
                        </h3>
                        <p className="text-green-600 font-medium">
                          {processSteps[activeStep].subtitle} • {processSteps[activeStep].duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600">
                      {processSteps[activeStep].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">상세 작업 내용</h4>
                      <ul className="space-y-2">
                        {processSteps[activeStep].details.map((detail, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">고객 체크포인트</h4>
                      <ul className="space-y-2">
                        {processSteps[activeStep].customerCheckpoints.map((checkpoint, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {checkpoint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 단계별 대표 이미지 영역 */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="w-full h-[200px] bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">
                      {processSteps[activeStep].imagePath ? (
                        <img 
                          src={processSteps[activeStep].imagePath}
                          alt={`${processSteps[activeStep].title} 단계 이미지`}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`flex-col items-center justify-center text-center ${processSteps[activeStep].imagePath ? 'hidden' : 'flex'}`}
                        style={{ display: processSteps[activeStep].imagePath ? 'none' : 'flex' }}
                      >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                          <span className="text-3xl">{
                            activeStep === 0 ? '💬' :
                            activeStep === 1 ? '📐' :
                            activeStep === 2 ? '📋' :
                            activeStep === 3 ? '📝' :
                            activeStep === 4 ? '🏗️' :
                            '✅'
                          }</span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                          {processSteps[activeStep].title} 단계
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          이미지 준비중
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">전체 프로세스 요약</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">총 6단계</div>
                <div className="text-gray-600">체계적 프로세스</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">평균 15일</div>
                <div className="text-gray-600">완료 기간</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">품질 보증</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24시간</div>
                <div className="text-gray-600">A/S 지원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectProcessSection; 