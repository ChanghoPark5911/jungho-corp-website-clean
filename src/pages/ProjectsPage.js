import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProjectGalleryAdvanced from '../components/ProjectGalleryAdvanced';
import projectService from '../services/projectService';
import projectGalleryService from '../services/projectGalleryService';
import { useI18n } from '../hooks/useI18n';
import { 
  PROJECT_CATEGORIES, 
  PROJECT_CATEGORY_LABELS 
} from '../services/projectService';

const ProjectsPage = () => {
  const { t, currentLanguage } = useI18n(); // 다국어 지원
  // 동적 프로젝트 상태
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [galleryProjects, setGalleryProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDynamicGallery, setShowDynamicGallery] = useState(false);
  
  // 프로젝트 상세 모달 상태
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 🌐 다국어 텍스트 가져오기 헬퍼 함수
  const getTranslatedText = (project, field) => {
    if (!project) return '';
    
    // translations 구조에서 현재 언어의 텍스트 가져오기
    const translated = project.translations?.[currentLanguage]?.[field];
    if (translated) return translated;
    
    // 한국어 폴백
    const korean = project.translations?.ko?.[field];
    if (korean) return korean;
    
    // 기존 필드 폴백
    return project[field] || '';
  };

  // 🌐 배열 필드 가져오기 (기술 스택, 특징 등)
  const getTranslatedArray = (project, field) => {
    if (!project) return [];
    
    // translations 구조에서 현재 언어의 배열 가져오기
    const translated = project.translations?.[currentLanguage]?.[field];
    if (translated && Array.isArray(translated)) return translated;
    
    // 한국어 폴백
    const korean = project.translations?.ko?.[field];
    if (korean && Array.isArray(korean)) return korean;
    
    // 기존 필드 폴백
    return Array.isArray(project[field]) ? project[field] : [];
  };

  // 🔧 히어로 섹션 데이터 (다국어 지원)
  const heroData = {
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mainCopy: t('projects.hero.title', { fallback: "정호그룹 프로젝트" }),
    subCopy: t('projects.hero.subtitle', { fallback: "40년간 축적된 기술력으로 완성한 다양한 프로젝트들을 소개합니다" }),
    description: t('projects.hero.description', { fallback: "" }),
    primaryAction: {
      label: t('buttons.contact', { fallback: "문의하기" }),
      path: "/support"
    }
  };

  // 동적 프로젝트 로드 (언어 변경 시에도 다시 로드)
  useEffect(() => {
    loadDynamicProjects();
    loadFeaturedProjects();
    loadGalleryProjects();
  }, [selectedCategory, searchTerm, currentLanguage]);

  const loadGalleryProjects = () => {
    try {
      const galleryProjects = projectGalleryService.getAllProjects();
      setGalleryProjects(galleryProjects);
    } catch (error) {
      console.error('갤러리 프로젝트 로드 오류:', error);
    }
  };

  const loadDynamicProjects = async () => {
    setLoading(true);
    try {
      // 모든 프로젝트를 가져온 후 클라이언트에서 필터링
      const allProjects = await projectService.getProjectList(PROJECT_CATEGORIES.ALL);
      
      let filteredProjects = allProjects;
      
      // 카테고리 필터링
      if (selectedCategory !== PROJECT_CATEGORIES.ALL) {
        filteredProjects = filteredProjects.filter(project => project.category === selectedCategory);
      }
      
      // 검색어 필터링
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project => 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.client?.toLowerCase().includes(searchLower) ||
          PROJECT_CATEGORY_LABELS[project.category]?.toLowerCase().includes(searchLower)
        );
      }
      
      setDynamicProjects(filteredProjects);
    } catch (err) {
      console.error('동적 프로젝트 로드 실패:', err);
      // 오프라인 모드: 기본 데이터 사용
      const defaultProjects = projectService.getDefaultProjects();
      let filteredProjects = defaultProjects;
      
      // 카테고리 필터링
      if (selectedCategory !== PROJECT_CATEGORIES.ALL) {
        filteredProjects = filteredProjects.filter(project => project.category === selectedCategory);
      }
      
      // 검색어 필터링
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project => 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.client?.toLowerCase().includes(searchLower) ||
          PROJECT_CATEGORY_LABELS[project.category]?.toLowerCase().includes(searchLower)
        );
      }
      
      setDynamicProjects(filteredProjects);
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedProjects = async () => {
    try {
      console.log('주요 프로젝트 로드 시작');
      const featured = await projectService.getFeaturedProjects();
      console.log('주요 프로젝트 로드 성공:', featured.length, '개');
      console.log('주요 프로젝트 데이터:', featured);
      setFeaturedProjects(featured);
    } catch (err) {
      console.error('주요 프로젝트 로드 실패:', err);
      console.error('오류 상세:', err.message);
      setFeaturedProjects([]);
    }
  };

  // 프로젝트 상세 모달 열기
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  // 프로젝트 상세 모달 닫기
  const closeProjectDetail = () => {
    setSelectedProject(null);
    setIsDetailModalOpen(false);
  };


  // 프로젝트 통계 (홈페이지와 동일한 숫자)
  const projectStats = [
    { number: "800+", label: "프로젝트 완료" },
    { number: "7+", label: "해외 진출국" },
    { number: "40년", label: "조명제어 전문 경험" },
    { number: "99%", label: "고객 만족도" }
  ];

  return (
    <>
      <SEO 
        title={t('seo.projects.title', { fallback: '프로젝트 - 정호그룹' })}
        description={t('seo.projects.description', { fallback: '정호그룹의 주요 프로젝트와 성과를 확인하세요. 40년 전통의 조명제어 전문기업의 다양한 프로젝트 사례를 소개합니다.' })}
        keywords="정호그룹, 프로젝트, 조명제어, LED조명, 스마트조명, 프로젝트 사례"
      />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} useLocalStorage={false} />
      </section>

      {/* 프로젝트 갤러리 */}
      <Section className="py-16">
        <div className="container">
          <ProjectGalleryAdvanced 
            projects={galleryProjects}
            onProjectSelect={(project) => {
              setSelectedProject(project);
              setIsDetailModalOpen(true);
            }}
          />
        </div>
      </Section>

      {/* 프로젝트 통계 */}
      <Section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 주요 프로젝트 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              주요 프로젝트
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              40년간 축적된 기술력으로 완성한 다양한 프로젝트들을 소개합니다
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600">프로젝트를 불러오는 중...</p>
            </div>
          ) : featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <Card key={project.id || index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                    {project.featuredImageUrl ? (
                  <img 
                        src={project.featuredImageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    )}
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {PROJECT_CATEGORY_LABELS[project.category]}
                    </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {getTranslatedText(project, 'title')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {getTranslatedText(project, 'description')}
                  </p>
                  
                  {/* 프로젝트 통계 */}
                    {project.projectOverview && (
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center">
                          <div className="font-semibold text-primary">{project.projectOverview.area || '-'}</div>
                      <div className="text-gray-500">면적</div>
                    </div>
                    <div className="text-center">
                          <div className="font-semibold text-primary">{project.projectOverview.period || project.duration || '-'}</div>
                      <div className="text-gray-500">기간</div>
                    </div>
                    <div className="text-center">
                          <div className="font-semibold text-primary">{project.projectOverview.effects || '-'}</div>
                      <div className="text-gray-500">효과</div>
                    </div>
                  </div>
                    )}
                  
                  {/* 주요 특징 */}
                    {project.projectOverview?.features && project.projectOverview.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">주요 특징:</h4>
                    <div className="flex flex-wrap gap-2">
                          {project.projectOverview.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                    )}
                  
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => window.location.href = "/support"}
                  >
                    자세히 보기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              주요 프로젝트가 등록되지 않았습니다.
            </div>
          )}
        </div>
      </Section>

      {/* 프로젝트 분야별 통계 */}
      <Section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              프로젝트 분야별 통계
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              다양한 분야에서 축적된 프로젝트 경험을 보유하고 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-primary mb-2">스마트빌딩</h3>
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-primary mb-2">공공시설</h3>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-bold text-primary mb-2">산업용시설</h3>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-primary mb-2">물류 및 데이터센터</h3>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-primary mb-2">문화시설</h3>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-bold text-primary mb-2">관광시설</h3>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* 동적 프로젝트 갤러리 */}
      <Section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              프로젝트 갤러리
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              관리자가 등록한 최신 프로젝트들을 확인해보세요
            </p>
            
            {/* 필터링 및 검색 */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="프로젝트 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(PROJECT_CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">프로젝트를 불러오는 중...</span>
            </div>
          ) : dynamicProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 프로젝트가 없습니다</h3>
              <p className="text-gray-600">관리자가 프로젝트를 등록하면 여기에 표시됩니다.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* 테이블 헤더 */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                  <div className="col-span-4">프로젝트명</div>
                  <div className="col-span-2">카테고리</div>
                  <div className="col-span-2">고객사</div>
                  <div className="col-span-2">기간</div>
                  <div className="col-span-1">조회수</div>
                  <div className="col-span-1">상세</div>
                </div>
              </div>
              
              {/* 프로젝트 목록 */}
              <div className="divide-y divide-gray-200">
                {dynamicProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openProjectDetail(project)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            {project.featuredImageUrl ? (
                              <img
                                src={project.featuredImageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div 
                              className={`w-full h-full bg-gray-200 rounded-lg flex items-center justify-center ${project.featuredImageUrl ? 'hidden' : 'flex'}`}
                            >
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {getTranslatedText(project, 'title')}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">
                              {getTranslatedText(project, 'description')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {PROJECT_CATEGORY_LABELS[project.category] || project.category}
                        </span>
                      </div>
                      <div className="col-span-2 text-sm text-gray-900">
                        {project.client || '-'}
                      </div>
                      <div className="col-span-2 text-sm text-gray-900">
                        {project.duration || project.projectOverview?.period || '-'}
                      </div>
                      <div className="col-span-1 text-sm text-gray-500">
                        {project.viewCount || 0}
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectDetail(project);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          보기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* 프로젝트 상세 모달 */}
      {isDetailModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {getTranslatedText(selectedProject, 'title')}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {PROJECT_CATEGORY_LABELS[selectedProject.category] || selectedProject.category}
                    </span>
                    {selectedProject.isFeatured && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        주요 프로젝트
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeProjectDetail}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 프로젝트 이미지 */}
              {selectedProject.featuredImageUrl && (
                <div className="mb-6">
                  <img
                    src={selectedProject.featuredImageUrl}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* 프로젝트 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">기본 정보</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">고객사:</span>
                      <span className="font-medium">{selectedProject.client || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">투입 인원:</span>
                      <span className="font-medium">{selectedProject.teamSize || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">프로젝트 기간:</span>
                      <span className="font-medium">{selectedProject.duration || selectedProject.projectOverview?.period || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">조회수:</span>
                      <span className="font-medium">{selectedProject.viewCount || 0}</span>
                    </div>
                  </div>
                </div>

                {selectedProject.projectOverview && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">프로젝트 개요</h4>
                    <div className="space-y-2">
                      {selectedProject.projectOverview.area && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">면적:</span>
                          <span className="font-medium">{selectedProject.projectOverview.area}</span>
                        </div>
                      )}
                      {selectedProject.projectOverview.effects && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">효과:</span>
                          <span className="font-medium">{selectedProject.projectOverview.effects}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 프로젝트 설명 */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">프로젝트 설명</h4>
                <p className="text-gray-700 leading-relaxed">
                  {getTranslatedText(selectedProject, 'description')}
                </p>
              </div>

              {/* 주요 특징 (다국어 지원) */}
              {(() => {
                const features = getTranslatedArray(selectedProject, 'features');
                // 구조: translations.{lang}.features 또는 projectOverview.features 폴백
                const legacyFeatures = selectedProject.projectOverview?.features;
                const displayFeatures = features.length > 0 ? features : legacyFeatures;
                
                return displayFeatures && displayFeatures.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 특징</h4>
                    <div className="flex flex-wrap gap-2">
                      {displayFeatures.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* 하단 버튼 */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={closeProjectDetail}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  닫기
                </button>
                <button
                  onClick={() => window.location.href = "/support"}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  문의하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA 섹션 */}
      <Section className="py-20 bg-gradient-green">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            프로젝트 문의하기
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            정호그룹의 전문가들이 귀사의 프로젝트에 최적화된 솔루션을 제안해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => window.location.href = "/support"}
              className="text-lg px-8 py-4"
            >
              문의하기
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = "/business"}
              className="text-lg px-8 py-4"
            >
              사업영역 보기
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default ProjectsPage; 