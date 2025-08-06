import React from 'react';

const TechnicalSupportSection = () => {
  const supportServices = [
    {
      title: '24/7 기술 지원',
      description: '연중무휴 기술 지원으로 언제든지 도움을 받으실 수 있습니다.',
      features: [
        '전화 지원: 1588-1234',
        '이메일 지원: tech@clarus.co.kr',
        '실시간 채팅 지원',
        '긴급 상황 대응'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: '원격 진단 서비스',
      description: '인터넷을 통한 원격 진단으로 빠른 문제 해결이 가능합니다.',
      features: [
        '실시간 시스템 모니터링',
        '원격 제어 및 설정',
        '예방 정비 알림',
        '성능 최적화 권장'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-green-500'
    },
    {
      title: '전문 엔지니어 교육',
      description: '시스템 운영에 필요한 전문 지식을 체계적으로 교육합니다.',
      features: [
        '초급/중급/고급 과정',
        '실습 중심 교육',
        '인증 프로그램',
        '정기 리프레셔 과정'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      title: '기술 문서 라이브러리',
      description: '체계적으로 정리된 기술 문서와 매뉴얼을 제공합니다.',
      features: [
        '설치 및 운영 매뉴얼',
        '문제 해결 가이드',
        'API 문서',
        '베스트 프랙티스'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-orange-500'
    }
  ];

  const supportStats = [
    { label: '평균 응답 시간', value: '5분', color: 'text-blue-600' },
    { label: '문제 해결률', value: '99.5%', color: 'text-green-600' },
    { label: '고객 만족도', value: '98%', color: 'text-purple-600' },
    { label: '지원 언어', value: '5개국', color: 'text-orange-600' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            기술 지원
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            클라루스는 고객의 성공적인 시스템 운영을 위한 포괄적인 기술 지원 서비스를 제공합니다.
          </p>
        </div>

        {/* 지원 서비스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {supportServices.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 지원 통계 */}
        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            지원 성과
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {supportStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 지원 프로세스 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            기술 지원 프로세스
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">문의 접수</h4>
              <p className="text-sm text-gray-600">전화, 이메일, 채팅을 통한 문의 접수</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">문제 진단</h4>
              <p className="text-sm text-gray-600">전문 엔지니어의 정확한 문제 진단</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">해결 방안</h4>
              <p className="text-sm text-gray-600">최적의 해결 방안 제시 및 실행</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">후속 관리</h4>
              <p className="text-sm text-gray-600">해결 후 안정성 확인 및 예방 조치</p>
            </div>
          </div>
        </div>

        {/* 긴급 지원 정보 */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-2">
                긴급 기술 지원
              </h3>
              <p className="text-red-700 mb-4">
                시스템 장애나 긴급 상황 발생 시 즉시 연락하세요.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-red-900 font-semibold">1588-1234</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-red-900">emergency@clarus.co.kr</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-red-700">긴급 지원</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSupportSection; 