import React, { useState } from 'react';

const NationalNetworkSection = () => {
  const [selectedRegion, setSelectedRegion] = useState('seoul');

  const businessOffices = [
    {
      id: 'seoul',
      name: '서울본사',
      address: '서울특별시 강남구 논현로 116길 17 6층',
      phone: '02-553-3631',
      manager: '김영업',
      email: 'seoul@junghotlc.com',
      agencies: 15
    },
    {
      id: 'busan',
      name: '부산사업소',
      address: '부산광역시 해운대구 센텀중앙로 456 정호센텀타워 3층',
      phone: '051-123-4567',
      manager: '박부산',
      email: 'busan@junghotlc.com',
      agencies: 12
    },
    {
      id: 'daegu',
      name: '대구사업소',
      address: '대구광역시 수성구 동대구로 789 정호빌딩 4층',
      phone: '053-123-4567',
      manager: '이대구',
      email: 'daegu@junghotlc.com',
      agencies: 8
    },
    {
      id: 'gwangju',
      name: '광주사업소',
      address: '광주광역시 서구 상무대로 321 정호빌딩 2층',
      phone: '062-123-4567',
      manager: '최광주',
      email: 'gwangju@junghotlc.com',
      agencies: 6
    },
    {
      id: 'daejeon',
      name: '대전사업소',
      address: '대전광역시 유성구 대학로 654 정호빌딩 3층',
      phone: '042-123-4567',
      manager: '정대전',
      email: 'daejeon@junghotlc.com',
      agencies: 9
    }
  ];

  const selectedOffice = businessOffices.find(office => office.id === selectedRegion);

  return (
    <section id="network" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            전국 네트워크
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            전국 5개 직영 사업소와 50개 대리점으로 고객과 가장 가까운 곳에서 서비스를 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 지도 시각화 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">전국 사업소 분포</h3>
            
            {/* 간단한 한국 지도 */}
            <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🇰🇷</div>
                  <p className="text-gray-600">대한민국 전역</p>
                </div>
              </div>
              
              {/* 지역별 마커 */}
              <div className="absolute top-1/4 left-1/3">
                <button
                  onClick={() => setSelectedRegion('seoul')}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedRegion === 'seoul' 
                      ? 'bg-green-500 border-green-600 scale-125' 
                      : 'bg-white border-green-400 hover:bg-green-100'
                  }`}
                  title="서울본사"
                ></button>
              </div>
              <div className="absolute bottom-1/4 right-1/4">
                <button
                  onClick={() => setSelectedRegion('busan')}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedRegion === 'busan' 
                      ? 'bg-green-500 border-green-600 scale-125' 
                      : 'bg-white border-green-400 hover:bg-green-100'
                  }`}
                  title="부산사업소"
                ></button>
              </div>
              <div className="absolute top-1/2 left-1/2">
                <button
                  onClick={() => setSelectedRegion('daegu')}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedRegion === 'daegu' 
                      ? 'bg-green-500 border-green-600 scale-125' 
                      : 'bg-white border-green-400 hover:bg-green-100'
                  }`}
                  title="대구사업소"
                ></button>
              </div>
              <div className="absolute bottom-1/3 left-1/4">
                <button
                  onClick={() => setSelectedRegion('gwangju')}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedRegion === 'gwangju' 
                      ? 'bg-green-500 border-green-600 scale-125' 
                      : 'bg-white border-green-400 hover:bg-green-100'
                  }`}
                  title="광주사업소"
                ></button>
              </div>
              <div className="absolute top-1/3 right-1/3">
                <button
                  onClick={() => setSelectedRegion('daejeon')}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedRegion === 'daejeon' 
                      ? 'bg-green-500 border-green-600 scale-125' 
                      : 'bg-white border-green-400 hover:bg-green-100'
                  }`}
                  title="대전사업소"
                ></button>
              </div>
            </div>

            {/* 네트워크 통계 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">5개</div>
                <div className="text-sm text-gray-600">직영 사업소</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">50개</div>
                <div className="text-sm text-gray-600">대리점</div>
              </div>
            </div>
          </div>

          {/* 선택된 사업소 정보 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">사업소 정보</h3>
            
            {selectedOffice && (
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-green-600 mb-2">
                    {selectedOffice.name}
                  </h4>
                  <p className="text-gray-600 mb-4">{selectedOffice.address}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">{selectedOffice.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700">담당자: {selectedOffice.manager}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{selectedOffice.email}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">관할 대리점: {selectedOffice.agencies}개</span>
                    </div>
                  </div>
                </div>

                {/* 연락처 버튼들 */}
                <div className="space-y-3">
                  <a
                    href={`tel:${selectedOffice.phone}`}
                    className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 text-center block"
                  >
                    전화 상담
                  </a>
                  <a
                    href={`mailto:${selectedOffice.email}`}
                    className="w-full bg-transparent border-2 border-green-600 text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-green-50 transition-colors duration-200 text-center block"
                  >
                    이메일 문의
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 대리점 찾기 기능 */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              가까운 대리점 찾기
            </h3>
            <p className="text-gray-600">
              지역을 선택하시면 가까운 대리점 정보를 확인할 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {businessOffices.map((office) => (
              <button
                key={office.id}
                onClick={() => setSelectedRegion(office.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedRegion === office.id
                    ? 'border-green-500 bg-green-50 text-green-600'
                    : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="font-semibold mb-1">{office.name}</div>
                <div className="text-sm text-gray-600">{office.agencies}개 대리점</div>
              </button>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="text-center mt-8">
            <a
              href="#contact"
              className="inline-flex items-center bg-green-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              해외 진출 현황 보고서 다운로드
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NationalNetworkSection; 