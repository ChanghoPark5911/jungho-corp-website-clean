import React, { useState } from 'react';

const CustomerSupportSection = () => {
  const [activeTab, setActiveTab] = useState('general');

  const supportChannels = [
    {
      title: '전화 상담',
      description: '가장 빠르고 직접적인 상담 방법',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      contact: '02-553-3631',
      hours: '평일 09:00 - 18:00',
      features: ['즉시 응답', '전문 상담원', '상담 이력 관리', '후속 조치 추적']
    },
    {
      title: '이메일 문의',
      description: '상세한 내용을 정리해서 보내실 수 있습니다',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      contact: 'service@junghotlc.com',
      hours: '24시간 접수',
      features: ['상세 내용 전송', '첨부파일 가능', '이메일 추적', '자동 응답']
    },
    {
      title: '카카오톡',
      description: '실시간 채팅으로 편리한 상담',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      contact: '@정호티엘씨',
      hours: '실시간 상담',
      features: ['실시간 채팅', '사진 전송', '상담원 배정', '채팅 기록 저장']
    },
    {
      title: '방문 상담',
      description: '현장에서 직접 상담하고 싶으시다면',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      contact: '서울본사 방문',
      hours: '평일 09:00 - 18:00',
      features: ['직접 상담', '제품 시연', '기술 설명', '계약 체결']
    }
  ];

  const contactByPurpose = {
    quotation: {
      title: '견적 문의',
      description: '프로젝트 견적 및 제안서 요청',
      contacts: [
        { method: '전화', info: '02-553-3631', hours: '평일 09:00-18:00' },
        { method: '이메일', info: 'quotation@junghotlc.com', hours: '24시간 접수' },
        { method: '카카오톡', info: '@정호티엘씨', hours: '실시간 상담' }
      ],
      process: ['요구사항 접수', '현장 방문', '견적 산출', '제안서 작성', '견적 전달']
    },
    technical: {
      title: '기술 문의',
      description: '기술적 사양 및 솔루션 상담',
      contacts: [
        { method: '전화', info: '02-1234-5679', hours: '평일 09:00-18:00' },
        { method: '이메일', info: 'tech@junghotlc.com', hours: '24시간 접수' },
        { method: '카카오톡', info: '@정호티엘씨', hours: '실시간 상담' }
      ],
      process: ['기술 요구사항 분석', '솔루션 제안', '기술 검토', '최종 안내']
    },
    as: {
      title: 'A/S 문의',
      description: '사후관리 및 수리 요청',
      contacts: [
        { method: '전화', info: '1588-9999', hours: '24시간 운영' },
        { method: '이메일', info: 'as@junghotlc.com', hours: '24시간 접수' },
        { method: '긴급출동', info: '02-1234-9999', hours: '비상시 2시간 이내' }
      ],
      process: ['고장 접수', '원인 분석', '수리 계획', '현장 출동', '완료 확인']
    },
    general: {
      title: '일반 문의',
      description: '기타 문의사항 및 정보 요청',
      contacts: [
        { method: '전화', info: '02-553-3631', hours: '평일 09:00-18:00' },
        { method: '이메일', info: 'info@junghotlc.com', hours: '24시간 접수' },
        { method: '카카오톡', info: '@정호티엘씨', hours: '실시간 상담' }
      ],
      process: ['문의 접수', '내용 확인', '담당자 배정', '답변 작성', '답변 전달']
    }
  };

  const emergencySystem = {
    title: '긴급 대응 시스템',
    description: '24시간 긴급 상황 대응',
    features: [
      '24시간 긴급 전화: 1588-9999',
      '비상 출동: 2시간 이내 현장 도착',
      '긴급 부품 공급: 당일 배송',
      '실시간 상황 모니터링',
      '고객사 담당자 즉시 통보'
    ]
  };

  const faqs = [
    {
      question: '견적은 얼마나 걸리나요?',
      answer: '일반적으로 1-2일 내에 견적을 제공해드립니다. 복잡한 프로젝트의 경우 3-5일이 소요될 수 있습니다.'
    },
    {
      question: 'A/S는 얼마나 빨리 가능한가요?',
      answer: '일반 A/S는 24시간 내, 긴급 A/S는 2시간 이내에 현장 출동이 가능합니다.'
    },
    {
      question: '정기 점검은 언제 하나요?',
      answer: '분기별로 정기 점검을 실시하며, 고객 요청에 따라 추가 점검도 가능합니다.'
    },
    {
      question: '원격 지원이 가능한가요?',
      answer: '네, 원격 진단 및 지원이 가능합니다. 복잡한 문제의 경우 현장 출동을 통해 해결해드립니다.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            고객 지원
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            다양한 상담 채널을 통해 언제든지 편리하게 문의하실 수 있습니다
          </p>
        </div>

        {/* 상담 채널 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-green-600 mb-4 flex justify-center">
                {channel.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
              <p className="text-gray-600 mb-4">{channel.description}</p>
              
              <div className="mb-4">
                <div className="text-lg font-semibold text-green-600">{channel.contact}</div>
                <div className="text-sm text-gray-500">{channel.hours}</div>
              </div>

              <div className="space-y-2">
                {channel.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 목적별 연락처 */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">목적별 연락처</h3>
          
          {/* 탭 네비게이션 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.keys(contactByPurpose).map((purpose) => (
              <button
                key={purpose}
                onClick={() => setActiveTab(purpose)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  activeTab === purpose
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
              >
                {contactByPurpose[purpose].title}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {contactByPurpose[activeTab].title}
              </h4>
              <p className="text-gray-600 mb-6">
                {contactByPurpose[activeTab].description}
              </p>
              
              <div className="space-y-4">
                {contactByPurpose[activeTab].contacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{contact.method}</div>
                      <div className="text-sm text-gray-600">{contact.hours}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{contact.info}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">처리 과정</h4>
              <div className="space-y-3">
                {contactByPurpose[activeTab].process.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 긴급 대응 시스템 */}
        <div className="bg-red-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4">{emergencySystem.title}</h3>
            <p className="text-red-700">{emergencySystem.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {emergencySystem.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center">
                <div className="text-red-600 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ 섹션 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">자주 묻는 질문</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => alert('FAQ 섹션으로 이동합니다')}
              className="inline-flex items-center bg-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ 섹션 더보기
            </button>
          </div>
        </div>

        {/* 연락처 요약 */}
        <div className="mt-16 bg-green-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">연락처 요약</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">02-553-3631</div>
              <div className="text-gray-600">본사 전화</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1588-9999</div>
              <div className="text-gray-600">A/S 전용</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">@정호티엘씨</div>
              <div className="text-gray-600">카카오톡</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSupportSection; 