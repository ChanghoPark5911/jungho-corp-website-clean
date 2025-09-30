import React, { useState, useEffect } from 'react';

const ProjectGalleryAdvanced = ({ projects = [], onProjectSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, masonry

  // 카테고리 추출
  const categories = ['all', ...new Set(projects.map(project => project.category).filter(Boolean))];

  // 프로젝트 필터링
  useEffect(() => {
    const filtered = selectedCategory === 'all' 
      ? projects 
      : projects.filter(project => project.category === selectedCategory);
    setFilteredProjects(filtered);
  }, [selectedCategory, projects]);

  // 프로젝트 선택
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedProject(null);
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <div className="project-gallery-advanced">
      {/* 헤더 */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          프로젝트 갤러리
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          정호그룹의 주요 프로젝트와 성과를 확인하세요
        </p>

        {/* 필터 및 뷰 모드 */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? '전체' : category}
              </button>
            ))}
          </div>

          {/* 뷰 모드 토글 */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 프로젝트 그리드 */}
      <div className={`project-grid ${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }`}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${
              viewMode === 'list' 
                ? 'flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow'
                : 'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group'
            }`}
            onClick={() => handleProjectClick(project)}
          >
              {viewMode === 'grid' ? (
                <>
                  {/* 이미지 */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || '/api/placeholder/400/300'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* 콘텐츠 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-500 bg-primary-50 dark:bg-primary-900 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* 리스트 뷰 */}
                  <div className="flex-shrink-0">
                    <img
                      src={project.image || '/api/placeholder/100/100'}
                      alt={project.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <div className="flex gap-1">
                        {project.technologies?.slice(0, 2).map(tech => (
                          <span
                            key={tech}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="p-6">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 px-3 py-1 rounded-full">
                        {selectedProject.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedProject.year}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedProject.duration}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* 이미지 */}
                {selectedProject.image && (
                  <div className="mb-6">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* 상세 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      프로젝트 개요
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {selectedProject.description}
                    </p>
                    
                    {selectedProject.details && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">주요 성과</h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {selectedProject.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      기술 스택
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.technologies?.map(tech => (
                        <span
                          key={tech}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {selectedProject.client && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">클라이언트</h4>
                        <p className="text-gray-600 dark:text-gray-300">{selectedProject.client}</p>
                      </div>
                    )}

                    {selectedProject.team && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">팀 구성</h4>
                        <p className="text-gray-600 dark:text-gray-300">{selectedProject.team}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      데모 보기
                    </a>
                  )}
                  {selectedProject.caseStudyUrl && (
                    <a
                      href={selectedProject.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
                    >
                      케이스 스터디
                    </a>
                  )}
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGalleryAdvanced;
