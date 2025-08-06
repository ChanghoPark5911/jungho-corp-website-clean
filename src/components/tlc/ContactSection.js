import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    inquiryType: '',
    message: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('개인정보 처리방침에 동의해주세요.');
      return;
    }
    // 상담 신청 처리 로직
    alert('상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      inquiryType: '',
      message: '',
      agreeToTerms: false
    });
  };

  const contactInfo = [
    {
      title: '본사',
      phone: '02-553-3631',
      hours: '평일 09:00 - 18:00',
      address: '서울특별시 강남구 논현로 116길 17 6층',
      email: 'service@junghotlc.com',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'A/S 센터',
      phone: '1588-9999',
      hours: '24시간 운영',
      address: '서울특별시 강남구 논현로 116길 17 6층',
      email: 'as@junghotlc.com',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      )
    }
  ];

  const quickLinks = [
    { label: '견적 문의', href: 'tel:02-553-3631' },
    { label: '기술 상담', href: 'mailto:tech@junghotlc.com' },
    { label: 'A/S 신청', href: 'tel:1588-9999' },
    { label: '카카오톡', href: 'https://open.kakao.com/정호티엘씨' }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            연락처
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            언제든지 편리한 방법으로 문의해주세요. 빠른 시일 내에 답변드리겠습니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">연락처 정보</h3>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="text-green-600 mr-4">
                      {info.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{info.title}</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">{info.phone}</div>
                        <div className="text-sm text-gray-600">{info.hours}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="text-gray-700">{info.address}</div>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div className="text-gray-700">{info.email}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 빠른 링크 */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4">빠른 링크</h4>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 font-semibold"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* 카카오톡 정보 */}
            <div className="mt-8 bg-yellow-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">💬</div>
                <h4 className="text-lg font-bold text-gray-900">카카오톡 상담</h4>
              </div>
              <p className="text-gray-600 mb-4">
                실시간 채팅으로 편리하게 상담받으실 수 있습니다
              </p>
              <a
                href="https://open.kakao.com/정호티엘씨"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-200"
              >
                <span className="mr-2">💬</span>
                카카오톡 채널 방문
              </a>
            </div>
          </div>

          {/* 빠른 상담 신청 폼 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">빠른 상담 신청</h3>
            <p className="text-gray-600 mb-8">
              아래 폼을 작성해주시면 빠른 시일 내에 연락드리겠습니다
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
                  문의 유형 *
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">선택해주세요</option>
                  <option value="quotation">견적 문의</option>
                  <option value="technical">기술 상담</option>
                  <option value="as">A/S 문의</option>
                  <option value="partnership">파트너십</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="문의하실 내용을 자세히 작성해주세요..."
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  <button 
                    type="button" 
                    className="text-green-600 hover:text-green-500 underline"
                    onClick={() => alert('개인정보 처리방침을 확인하세요')}
                  >
                    개인정보 처리방침
                  </button>에 동의합니다 *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
              >
                상담 신청하기
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                * 표시된 항목은 필수 입력사항입니다
              </p>
            </div>
          </div>
        </div>

        {/* 지도 및 주소 정보 */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">오시는 길</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-gray-600">지도가 여기에 표시됩니다</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">본사 주소</h4>
              <p className="text-gray-600 mb-6">
                서울특별시 강남구 논현로 116길 17 정호빌딩 6층
              </p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">지하철</h5>
                  <p className="text-gray-600">2호선 강남역 3번 출구에서 도보 5분</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">버스</h5>
                  <p className="text-gray-600">강남역 정류장 하차 (간선버스 146, 360, 740)</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">주차</h5>
                  <p className="text-gray-600">정호빌딩 지하주차장 이용 가능 (2시간 무료)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 