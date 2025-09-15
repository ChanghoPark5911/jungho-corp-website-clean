import React, { useState, useEffect, useRef } from 'react';

const ProjectGallery = ({
  title = "검증된 성과와 신뢰",
  projects = [],
  galleryImages = {},
  className = '',
  ...props
}) => {
  const [projectGalleryImages, setProjectGalleryImages] = useState({});

  // 프로젝트 갤러리 이미지 로드
  useEffect(() => {
    const loadProjectGalleryImages = () => {
      const savedData = localStorage.getItem('project_gallery_images');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setProjectGalleryImages(data);
        } catch (error) {
          console.error('프로젝트 갤러리 이미지 로드 오류:', error);
        }
      }
    };
    
    loadProjectGalleryImages();
    
    // 실시간 업데이트 리스너
    const handleProjectGalleryImagesUpdate = () => {
      loadProjectGalleryImages();
    };
    
    window.addEventListener('projectGalleryImagesUpdated', handleProjectGalleryImagesUpdate);
    
    return () => {
      window.removeEventListener('projectGalleryImagesUpdated', handleProjectGalleryImagesUpdate);
    };
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 기본 프로젝트 데이터 (projects가 전달되지 않았을 때 사용)
  const defaultProjects = [
    {
      title: "삼성전자 반도체 공장",
      description: "대규모 반도체 제조 시설의 조명제어 시스템 구축",
      details: ["면적: 50,000㎡", "조명기기: 5,000개", "에너지 절약: 40%"],
      year: "2023",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
    },
    {
      title: "LG디스플레이 OLED 공장",
      description: "정밀 제조 환경을 위한 특수 조명제어 시스템",
      details: ["면적: 30,000㎡", "조명기기: 3,000개", "정밀도: 99.9%"],
      year: "2022",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/LG_logo_%282015%29.svg"
    },
    {
      title: "현대자동차 울산 공장",
      description: "자동차 제조 라인의 스마트 조명 시스템",
      details: ["면적: 100,000㎡", "조명기기: 10,000개", "자동화율: 95%"],
      year: "2021",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Hyundai-logo.png"
    },
    {
      title: "롯데월드타워",
      description: "초고층 빌딩의 통합 조명제어 시스템",
      details: ["높이: 555m", "조명기기: 2,000개", "관리 효율성: 60% 향상"],
      year: "2020",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Lotte_logo.svg"
    }
  ];

  // projects가 없으면 기본값 사용
  const projectsToRender = projects && projects.length > 0 ? projects : defaultProjects;
  
  // 프로젝트 갤러리 이미지가 있으면 프로젝트 이미지에 적용
  const projectsWithGalleryImages = projectsToRender.map((project, index) => {
    const projectKey = `project${index + 1}`;
    const galleryImage = projectGalleryImages[projectKey];
    
    if (galleryImage) {
      return {
        ...project,
        image: galleryImage.url,
        title: galleryImage.title,
        isGalleryImage: true
      };
    }
    return {
      ...project,
      isGalleryImage: false
    };
  });
  
  // 갤러리 이미지 개수 표시
  const galleryImageCount = Object.keys(projectGalleryImages).filter(key => projectGalleryImages[key]).length;

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-gray-50 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h2>
          
          {/* 갤러리 이미지 정보 */}
          {galleryImageCount > 0 && (
            <div className={`text-sm text-gray-600 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '0.3s' }}>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                📸 갤러리 이미지 {galleryImageCount}장 적용됨
              </span>
            </div>
          )}
        </div>

        {/* 프로젝트 갤러리 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {projectsWithGalleryImages.map((project, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* 프로젝트 이미지 */}
              <div className="relative h-64 lg:h-80">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* 갤러리 이미지 표시 표시 */}
                {project.isGalleryImage && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    갤러리 이미지 ✓
                  </div>
                )}
                
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 프로젝트 정보 */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-200 mb-3">{project.description}</p>
                  
                  {/* 프로젝트 세부사항 */}
                  <div className="space-y-2">
                    {project.details && project.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* 완료 연도 */}
                  <div className="mt-4 pt-3 border-t border-white/20">
                    <span className="text-sm font-medium">완료: {project.year}</span>
                  </div>
                </div>
              </div>

              {/* 로고 배지 */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <img 
                  src={project.logo} 
                  alt={`${project.title} 로고`}
                  className="h-6 w-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <p className="text-lg text-gray-600 mb-6">
            국내외 주요 기업들과 함께한 1,000개 이상의 성공적인 프로젝트
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
              <span>40년간 축적된 노하우</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
              <span>전국 네트워크</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
              <span>글로벌 파트너십</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery; 