import React, { useState } from 'react';

const ASCenterSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    issueType: '',
    description: '',
    urgency: 'normal'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // A/S 신청 처리 로직
    alert('A/S 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      address: '',
      issueType: '',
      description: '',
      urgency: 'normal'
    });
  };

  const asServices = [
    {
      title: '24시간 콜센터',
      description: '언제든지 전화로 A/S를 신청할 수 있습니다',
      phone: '1588-9999',
      hours: '24시간 운영',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      features: ['전국 통화 무료', '전문 상담원 배치', '즉시 접수 처리', '상담 이력 관리']
    },
    {
      title: '긴급 출동 서비스',
      description: '2시간 이내 현장 출동으로 신속한 문제 해결',
      response: '2시간 이내',
      coverage: '전국 모든 지역',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ['긴급 상황 우선 처리', '전문 엔지니어 출동', '부품 즉시 공급', '완료 후 품질 확인']
    },
    {
      title: '정기 점검 프로그램',
      description: '시스템 안정성을 위한 정기적인 예방 점검',
      frequency: '분기별',
      duration: '2-3시간',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ['시스템 성능 점검', '부품 마모도 확인', '예방 정비 수행', '점검 보고서 제공']
    },
    {
      title: 'A/S 이력 관리',
      description: '모든 A/S 이력을 체계적으로 관리하여 효율적인 서비스 제공',
      system: '실시간 모니터링',
      tracking: '고객별 이력 관리',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ['A/S 이력 추적', '부품 교체 이력', '고장 패턴 분석', '예방 정비 스케줄']
    }
  ];

  const asStats = [
    { label: '평균 응답 시간', value: '15분', unit: '이내' },
    { label: '긴급 출동 시간', value: '2시간', unit: '이내' },
    { label: '고객 만족도', value: '98%', unit: '' },
    { label: '1차 해결률', value: '95%', unit: '' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            A/S 센터
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            24시간 A/S 센터를 통해 신속하고 정확한 사후관리 서비스를 제공합니다
          </p>
        </div>

        {/* A/S 서비스 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {asServices.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="text-green-600 mr-4">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              <div className="mb-6">
                {service.phone && (
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-green-600">{service.phone}</span>
                    <span className="text-gray-500 ml-2">({service.hours})</span>
                  </div>
                )}
                {service.response && (
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-semibold text-green-600">응답 시간: {service.response}</span>
                  </div>
                )}
                {service.frequency && (
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-semibold text-green-600">점검 주기: {service.frequency}</span>
                  </div>
                )}
              </div>

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

        {/* A/S 성과 통계 */}
        <div className="bg-green-50 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">A/S 성과 통계</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {asStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stat.value}{stat.unit}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* A/S 신청 폼 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">A/S 신청하기</h3>
            <p className="text-gray-600 mb-8">
              온라인으로 A/S를 신청하시면 빠른 시일 내에 연락드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주소
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문제 유형 *
                  </label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="lighting">조명 시스템 고장</option>
                    <option value="control">제어 시스템 오류</option>
                    <option value="sensor">센서 불량</option>
                    <option value="maintenance">정기 점검 요청</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    긴급도
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="normal">일반</option>
                    <option value="urgent">긴급</option>
                    <option value="emergency">비상</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문제 상세 설명 *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="문제 상황을 자세히 설명해주세요..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
              >
                A/S 신청하기
              </button>
            </form>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">A/S 신청 안내</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">신청 방법</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    전화: 1588-9999 (24시간)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    온라인: 위 폼 작성 후 제출
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    이메일: as@junghotlc.com
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">처리 과정</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <span className="text-sm text-gray-600">신청 접수 및 확인</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <span className="text-sm text-gray-600">전문 엔지니어 배정</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <span className="text-sm text-gray-600">현장 출동 및 점검</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                    <span className="text-sm text-gray-600">문제 해결 및 완료</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-green-800 mb-2">긴급 상황</h4>
                <p className="text-sm text-green-700">
                  긴급한 상황이거나 비상 고장의 경우, 전화로 즉시 신청하시면 2시간 이내 출동해드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ASCenterSection; 