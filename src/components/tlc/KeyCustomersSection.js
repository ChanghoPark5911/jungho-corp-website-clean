import React, { useState } from 'react';

const KeyCustomersSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const projects = [
    {
      id: 1,
      client: '삼성전자',
      project: '삼성전자 수원캠퍼스 조명제어 시스템',
      scale: 'large',
      industry: 'manufacturing',
      description: '수원캠퍼스 전체 건물의 스마트 조명제어 시스템 구축',
      completion: '2023년 12월',
      value: '15억원',
      image: '🏢',
      testimonial: '정호티엘씨의 전문성과 신뢰할 수 있는 서비스로 만족스러운 결과를 얻었습니다.'
    },
    {
      id: 2,
      client: 'LG화학',
      project: 'LG화학 여수공장 LED 조명 시스템',
      scale: 'large',
      industry: 'manufacturing',
      description: '여수공장 생산라인 LED 조명 시스템 및 제어 솔루션',
      completion: '2023년 8월',
      value: '12억원',
      image: '🏭',
      testimonial: '에너지 효율성과 안정성을 모두 만족시키는 시스템을 구축해주셨습니다.'
    },
    {
      id: 3,
      client: '현대자동차',
      project: '현대자동차 울산공장 조명제어',
      scale: 'large',
      industry: 'manufacturing',
      description: '울산공장 5개 생산라인 조명제어 시스템 구축',
      completion: '2023년 6월',
      value: '18억원',
      image: '🚗',
      testimonial: '대규모 공장 환경에서도 안정적으로 작동하는 시스템을 제공해주셨습니다.'
    },
    {
      id: 4,
      client: 'SK하이닉스',
      project: 'SK하이닉스 청주공장 스마트조명',
      scale: 'large',
      industry: 'manufacturing',
      description: '반도체 공장의 정밀한 조명제어 시스템 구축',
      completion: '2023년 3월',
      value: '20억원',
      image: '💾',
      testimonial: '정밀한 제어가 필요한 반도체 공정에 최적화된 솔루션을 제공해주셨습니다.'
    },
    {
      id: 5,
      client: '롯데월드타워',
      project: '롯데월드타워 조명시스템',
      scale: 'large',
      industry: 'commercial',
      description: '123층 초고층 빌딩의 조명제어 및 에너지 관리 시스템',
      completion: '2022년 12월',
      value: '25억원',
      image: '🏙️',
      testimonial: '초고층 빌딩의 복잡한 조명제어 요구사항을 완벽하게 해결해주셨습니다.'
    },
    {
      id: 6,
      client: '코엑스몰',
      project: '코엑스몰 상업시설 조명제어',
      scale: 'medium',
      industry: 'commercial',
      description: '대형 쇼핑몰의 분위기별 조명제어 시스템',
      completion: '2023년 9월',
      value: '8억원',
      image: '🛍️',
      testimonial: '상업시설에 특화된 조명제어로 고객 만족도를 크게 향상시켰습니다.'
    },
    {
      id: 7,
      client: '서울시청',
      project: '서울시청 공공시설 조명시스템',
      scale: 'medium',
      industry: 'public',
      description: '서울시청 건물의 에너지 효율 조명시스템 구축',
      completion: '2023년 5월',
      value: '6억원',
      image: '🏛️',
      testimonial: '공공기관의 예산 효율성과 에너지 절약 목표를 달성할 수 있었습니다.'
    },
    {
      id: 8,
      client: '인천국제공항',
      project: '인천공항 터미널 조명제어',
      scale: 'large',
      industry: 'public',
      description: '인천공항 제2터미널 조명제어 및 에너지 관리 시스템',
      completion: '2022년 8월',
      value: '30억원',
      image: '✈️',
      testimonial: '24시간 운영되는 공항 환경에서 안정적인 시스템을 제공해주셨습니다.'
    }
  ];

  const testimonials = [
    {
      name: '김영업',
      position: '시설관리팀장',
      company: '삼성전자',
      content: '정호티엘씨의 전문성과 신뢰할 수 있는 서비스로 만족스러운 결과를 얻었습니다. 특히 24시간 A/S 지원이 큰 도움이 되었습니다.',
      rating: 5
    },
    {
      name: '박기술',
      position: '설비관리팀장',
      company: 'LG화학',
      content: '에너지 효율성과 안정성을 모두 만족시키는 시스템을 구축해주셨습니다. 정기 점검 서비스도 매우 만족스럽습니다.',
      rating: 5
    },
    {
      name: '이시설',
      position: '시설운영팀장',
      company: '현대자동차',
      content: '대규모 공장 환경에서도 안정적으로 작동하는 시스템을 제공해주셨습니다. 기술력과 서비스 모두 우수합니다.',
      rating: 5
    },
    {
      name: '최관리',
      position: '시설관리팀장',
      company: 'SK하이닉스',
      content: '정밀한 제어가 필요한 반도체 공정에 최적화된 솔루션을 제공해주셨습니다. 전문성이 돋보이는 회사입니다.',
      rating: 5
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.scale === activeFilter || project.industry === activeFilter);

  const industryStats = {
    manufacturing: projects.filter(p => p.industry === 'manufacturing').length,
    commercial: projects.filter(p => p.industry === 'commercial').length,
    public: projects.filter(p => p.industry === 'public').length
  };

  const scaleStats = {
    large: projects.filter(p => p.scale === 'large').length,
    medium: projects.filter(p => p.scale === 'medium').length,
    small: projects.filter(p => p.scale === 'small').length
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            주요 고객사
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            국내 주요 기업들과 함께한 성공적인 프로젝트들을 소개합니다
          </p>
        </div>

        {/* 프로젝트 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{projects.length}</div>
            <div className="text-gray-600">총 프로젝트</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{scaleStats.large}</div>
            <div className="text-gray-600">대형 프로젝트</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">{industryStats.manufacturing}</div>
            <div className="text-gray-600">제조업</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-600">고객 만족도</div>
          </div>
        </div>

        {/* 필터 버튼들 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeFilter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveFilter('large')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeFilter === 'large'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            대형 프로젝트
          </button>
          <button
            onClick={() => setActiveFilter('medium')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeFilter === 'medium'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            중형 프로젝트
          </button>
          <button
            onClick={() => setActiveFilter('manufacturing')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeFilter === 'manufacturing'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            제조업
          </button>
          <button
            onClick={() => setActiveFilter('commercial')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeFilter === 'commercial'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            상업시설
          </button>
          <button
            onClick={() => setActiveFilter('public')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
              activeFilter === 'public'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            공공시설
          </button>
        </div>

        {/* 프로젝트 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{project.image}</div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{project.completion}</div>
                    <div className="text-lg font-bold text-green-600">{project.value}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.client}</h3>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">{project.project}</h4>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.scale === 'large' ? 'bg-red-100 text-red-800' :
                      project.scale === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {project.scale === 'large' ? '대형' : project.scale === 'medium' ? '중형' : '소형'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.industry === 'manufacturing' ? 'bg-blue-100 text-blue-800' :
                      project.industry === 'commercial' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.industry === 'manufacturing' ? '제조업' : 
                       project.industry === 'commercial' ? '상업시설' : '공공시설'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 고객 후기 캐러셀 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">고객 후기</h3>
          
          <div className="relative">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-lg text-gray-600 italic">
                "{testimonials[activeTestimonial].content}"
              </p>
            </div>
            
            <div className="text-center mb-6">
              <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</div>
              <div className="text-sm text-gray-600">
                {testimonials[activeTestimonial].position}, {testimonials[activeTestimonial].company}
              </div>
              <div className="flex justify-center mt-2">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* 캐러셀 네비게이션 */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    activeTestimonial === index ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* 프로젝트 성과 요약 */}
        <div className="mt-16 bg-green-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">프로젝트 성과 요약</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">136억원</div>
              <div className="text-gray-600">총 프로젝트 규모</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">8개</div>
              <div className="text-gray-600">주요 고객사</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">프로젝트 완료율</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyCustomersSection; 