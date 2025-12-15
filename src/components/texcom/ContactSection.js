import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    businessType: 'b2b'
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
    console.log('Form submitted:', formData);
    alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      businessType: 'b2b'
    });
  };

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            문의하기
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            섬유기계 사업부와 패션 브랜드 사업부에 대한 
            모든 문의사항을 언제든지 연락주세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 연락처 정보 */}
          <div className="space-y-8">
            {/* B2B 연락처 */}
            <div className="bg-[#1B365D] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">섬유기계 사업부 (B2B)</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <div className="font-semibold">고객 상담</div>
                    <div className="text-gray-200">1588-1234</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📧</span>
                  <div>
                    <div className="font-semibold">이메일</div>
                    <div className="text-gray-200">tech@junghotexcom.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🏢</span>
                  <div>
                    <div className="font-semibold">본사</div>
                    <div className="text-gray-200">서울특별시 강남구 논현로 116길 17</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🕒</span>
                  <div>
                    <div className="font-semibold">영업시간</div>
                    <div className="text-gray-200">평일 08:30~17:30</div>
                  </div>
                </div>
              </div>
            </div>

            {/* B2C 연락처 */}
            <div className="bg-[#FF6B9D] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">패션 브랜드 사업부 (B2C)</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🛍️</span>
                  <div>
                    <div className="font-semibold">온라인 쇼핑몰</div>
                    <div className="text-gray-200">fashion.junghotexcom.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📞</span>
                  <div>
                    <div className="font-semibold">고객 서비스</div>
                    <div className="text-gray-200">1588-5678</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📱</span>
                  <div>
                    <div className="font-semibold">카카오톡</div>
                    <div className="text-gray-200">@정호텍스컴패션</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">🕒</span>
                  <div>
                    <div className="font-semibold">고객센터</div>
                    <div className="text-gray-200">평일 08:30~17:30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">문의 폼</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  사업 유형
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                >
                  <option value="b2b">섬유기계 사업부 (B2B)</option>
                  <option value="b2c">패션 브랜드 사업부 (B2C)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="회사명을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="연락처를 입력하세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                  placeholder="문의하실 내용을 자세히 입력해 주세요"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1B365D] to-[#FF6B9D] text-white font-semibold py-4 px-8 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                문의하기
              </button>
            </form>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              글로벌 네트워크
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              30개국에 진출한 글로벌 네트워크로 
              전 세계 고객에게 최고의 서비스를 제공합니다
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>🇰🇷 한국 (본사)</span>
              <span>🇨🇳 중국</span>
              <span>🇯🇵 일본</span>
              <span>🇻🇳 베트남</span>
              <span>🇮🇩 인도네시아</span>
              <span>🇹🇭 태국</span>
              <span>🇮🇳 인도</span>
              <span>🇧🇩 방글라데시</span>
              <span>🇵🇰 파키스탄</span>
              <span>🇹🇷 터키</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 