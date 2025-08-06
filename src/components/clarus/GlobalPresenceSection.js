import React from 'react';

const GlobalPresenceSection = () => {
  const regions = [
    {
      name: '아시아 태평양',
      countries: ['한국', '일본', '중국', '대만', '싱가포르', '태국', '베트남', '인도'],
      projects: 45,
      partners: 12,
      color: 'bg-blue-500'
    },
    {
      name: '유럽',
      countries: ['독일', '프랑스', '영국', '이탈리아', '스페인', '네덜란드', '스위스', '스웨덴'],
      projects: 38,
      partners: 15,
      color: 'bg-green-500'
    },
    {
      name: '북미',
      countries: ['미국', '캐나다', '멕시코'],
      projects: 52,
      partners: 8,
      color: 'bg-purple-500'
    },
    {
      name: '중동',
      countries: ['UAE', '사우디아라비아', '카타르', '쿠웨이트'],
      projects: 18,
      partners: 6,
      color: 'bg-orange-500'
    }
  ];

  const overseasProjects = [
    {
      name: '삼성전자 말레이시아 공장',
      location: '말레이시아',
      year: '2023',
      description: '대규모 반도체 공장 조명제어 시스템 구축'
    },
    {
      name: 'BMW 독일 본사',
      location: '독일',
      year: '2023',
      description: '스마트 오피스 조명제어 솔루션 적용'
    },
    {
      name: '애플 미국 신규 캠퍼스',
      location: '미국',
      year: '2022',
      description: '친환경 건물 인증을 위한 조명제어 시스템'
    },
    {
      name: '도요타 일본 공장',
      location: '일본',
      year: '2022',
      description: '자동차 생산라인 조명제어 최적화'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            글로벌 진출
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            전 세계 30개국 이상에서 클라루스의 조명제어 기술이 인정받고 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* 글로벌 지도 */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              진출국 현황
            </h3>
            
            {/* 간단한 세계지도 표현 */}
            <div className="relative w-full h-64 bg-blue-50 rounded-lg border-2 border-blue-200">
              {/* 대륙별 영역 */}
              <div className="absolute top-4 left-1/4 w-16 h-12 bg-blue-300 rounded opacity-60"></div>
              <div className="absolute top-8 left-1/2 w-20 h-16 bg-green-300 rounded opacity-60"></div>
              <div className="absolute top-16 left-1/6 w-14 h-10 bg-purple-300 rounded opacity-60"></div>
              <div className="absolute top-20 left-3/4 w-12 h-8 bg-orange-300 rounded opacity-60"></div>
              
              {/* 진출국 표시 */}
              <div className="absolute top-6 left-1/3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-10 left-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-14 left-1/5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-18 left-2/3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-12 left-3/4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-sm text-gray-600">30+ 국가 진출</div>
              </div>
            </div>
          </div>

          {/* 지역별 통계 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              지역별 파트너십 현황
            </h3>
            
            {regions.map((region, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{region.name}</h4>
                  <div className={`w-4 h-4 ${region.color} rounded-full`}></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{region.projects}</div>
                    <div className="text-sm text-gray-600">프로젝트</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{region.partners}</div>
                    <div className="text-sm text-gray-600">파트너사</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  {region.countries.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 해외 프로젝트 실적 */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            주요 해외 프로젝트
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overseasProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                  <span className="text-sm text-blue-600 font-medium">{project.year}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">{project.location}</span>
                </div>
                
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 글로벌 성과 요약 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
            <div className="text-gray-600">진출국</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
            <div className="text-gray-600">해외 프로젝트</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">40+</div>
            <div className="text-gray-600">글로벌 파트너</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">고객 만족도</div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            해외 진출 현황 보고서 다운로드
          </button>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection; 