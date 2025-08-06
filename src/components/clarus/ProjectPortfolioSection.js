import React, { useState } from 'react';

const ProjectPortfolioSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: '전체' },
    { key: 'semiconductor', label: '반도체' },
    { key: 'automotive', label: '자동차' },
    { key: 'office', label: '오피스' },
    { key: 'factory', label: '공장' },
    { key: 'hospital', label: '의료' }
  ];

  const projects = [
    {
      id: 1,
      name: '삼성전자 화성캠퍼스',
      category: 'semiconductor',
      client: '삼성전자',
      year: '2023',
      description: '대규모 반도체 공장 조명제어 시스템 구축으로 에너지 효율 30% 향상',
      image: 'bg-gradient-to-br from-blue-500 to-blue-700',
      testimonial: '클라루스의 기술력으로 안정적인 조명제어 시스템을 구축할 수 있었습니다.',
      scale: '대규모'
    },
    {
      id: 2,
      name: 'LG전자 평택공장',
      category: 'factory',
      client: 'LG전자',
      year: '2023',
      description: '스마트팩토리 조명제어 솔루션으로 생산성 향상 및 에너지 절약',
      image: 'bg-gradient-to-br from-green-500 to-green-700',
      testimonial: '생산라인 최적화에 큰 도움이 되었습니다.',
      scale: '대규모'
    },
    {
      id: 3,
      name: 'SK하이닉스 청주공장',
      category: 'semiconductor',
      client: 'SK하이닉스',
      year: '2022',
      description: '클린룸 환경에 최적화된 조명제어 시스템',
      image: 'bg-gradient-to-br from-purple-500 to-purple-700',
      testimonial: '정밀한 제어가 필요한 환경에서 완벽한 성능을 보여줍니다.',
      scale: '대규모'
    },
    {
      id: 4,
      name: '현대자동차 울산공장',
      category: 'automotive',
      client: '현대자동차',
      year: '2022',
      description: '자동차 생산라인 조명제어 최적화',
      image: 'bg-gradient-to-br from-red-500 to-red-700',
      testimonial: '생산성 향상과 에너지 절약을 동시에 달성했습니다.',
      scale: '대규모'
    },
    {
      id: 5,
      name: '네이버 그린팩토리',
      category: 'office',
      client: '네이버',
      year: '2023',
      description: '친환경 오피스 조명제어 시스템',
      image: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
      testimonial: '직원들의 업무 환경이 크게 개선되었습니다.',
      scale: '중규모'
    },
    {
      id: 6,
      name: '서울대병원',
      category: 'hospital',
      client: '서울대학교병원',
      year: '2022',
      description: '의료 환경에 특화된 조명제어 시스템',
      image: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
      testimonial: '환자와 의료진 모두에게 최적의 환경을 제공합니다.',
      scale: '대규모'
    }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            프로젝트 실적
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            다양한 분야에서 클라루스의 조명제어 기술이 검증되었습니다.
          </p>
        </div>

        {/* 필터 버튼 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedFilter === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 프로젝트 갤러리 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              {/* 프로젝트 이미지 */}
              <div className={`h-48 ${project.image} flex items-center justify-center relative`}>
                <div className="text-white text-center">
                  <div className="text-xl font-bold mb-2">{project.name}</div>
                  <div className="text-sm opacity-90">{project.client}</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-medium">{project.year}</span>
                </div>
              </div>

              {/* 프로젝트 정보 */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-blue-600 font-medium">{project.client}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {project.scale}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {project.description}
                </p>

                {/* 고객 평가 */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">고객 평가</div>
                      <p className="text-sm text-gray-600 italic">"{project.testimonial}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 프로젝트 통계 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            프로젝트 성과
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">완료 프로젝트</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">고객 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">30%</div>
              <div className="text-gray-600">평균 에너지 절약</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">운영 지원</div>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            프로젝트 사례 더 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectPortfolioSection; 