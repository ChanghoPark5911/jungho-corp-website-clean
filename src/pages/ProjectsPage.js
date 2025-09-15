import React from 'react';
import { ProjectsPageSEO } from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProjectsPage = () => {
  // 히어로 섹션 데이터
  const heroData = {
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mainCopy: "정호그룹 프로젝트",
    subCopy: "40년간 축적된 기술력으로 완성한 다양한 프로젝트들을 소개합니다",
    primaryAction: {
      label: "문의하기",
      path: "/support"
    }
  };

  // 주요 프로젝트 데이터
  const projects = [
    {
      title: "삼성전자 반도체 공장",
      category: "산업용 조명",
      description: "삼성전자 반도체 제조 공장의 조명제어 시스템을 구축하여 생산성 향상과 에너지 절약을 동시에 달성했습니다.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: {
        area: "50,000㎡",
        duration: "6개월",
        savings: "30% 에너지 절약"
      },
      features: ["고정밀 조명제어", "안전성 향상", "원격 모니터링", "자동화 시스템"]
    },
    {
      title: "서울시 스마트시티 조명",
      category: "도시 인프라",
      description: "서울시 전체 도로조명을 스마트 조명제어 시스템으로 업그레이드하여 도시의 안전성과 에너지 효율성을 개선했습니다.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: {
        area: "전 서울시",
        duration: "2년",
        savings: "40% 에너지 절약"
      },
      features: ["중앙 집중식 제어", "실시간 모니터링", "자동 점등/소등", "안전성 향상"]
    },
    {
      title: "롯데월드타워",
      category: "스마트 빌딩",
      description: "롯데월드타워의 조명제어 시스템을 구축하여 건물의 아름다움과 기능성을 동시에 만족시키는 솔루션을 제공했습니다.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: {
        area: "123층",
        duration: "1년",
        savings: "25% 에너지 절약"
      },
      features: ["IoT 조명제어", "스케줄링", "원격 제어", "에너지 관리"]
    },
    {
      title: "국립중앙박물관",
      category: "문화시설",
      description: "국립중앙박물관의 전시 조명을 예술적으로 제어하여 관람객들에게 최적의 관람 환경을 제공합니다.",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: {
        area: "전시관 전체",
        duration: "8개월",
        savings: "문화적 가치 증대"
      },
      features: ["예술적 조명", "색온도 조절", "프로그래밍", "보존 조명"]
    },
    {
      title: "인천국제공항",
      category: "공공시설",
      description: "인천국제공항의 조명제어 시스템을 구축하여 안전성과 효율성을 동시에 만족시키는 솔루션을 제공했습니다.",
      image: "https://images.unsplash.com/photo-1436491865332-9a4e7380ffa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: {
        area: "공항 전체",
        duration: "1.5년",
        savings: "35% 에너지 절약"
      },
      features: ["24시간 운영", "안전 조명", "자동 점검", "원격 관리"]
    },
    {
      title: "부산 해운대 마린시티",
      category: "관광시설",
      description: "부산 해운대 마린시티의 야간 조명을 아름답게 제어하여 관광지의 매력을 극대화했습니다.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      stats: {
        area: "해운대 일대",
        duration: "10개월",
        savings: "관광객 증가"
      },
      features: ["관광 조명", "다이나믹 효과", "절전 모드", "스케줄링"]
    }
  ];

  // 프로젝트 통계
  const projectStats = [
    { number: "1000+", label: "완료 프로젝트" },
    { number: "50+", label: "해외 진출국" },
    { number: "40", label: "년간 경험" },
    { number: "24/7", label: "기술 지원" }
  ];

  return (
    <>
      <ProjectsPageSEO />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} useLocalStorage={false} />
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  {/* 프로젝트 통계 */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-primary">{project.stats.area}</div>
                      <div className="text-gray-500">면적</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-primary">{project.stats.duration}</div>
                      <div className="text-gray-500">기간</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-primary">{project.stats.savings}</div>
                      <div className="text-gray-500">효과</div>
                    </div>
                  </div>
                  
                  {/* 주요 특징 */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">주요 특징:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-primary mb-2">스마트 빌딩</h3>
              <div className="text-3xl font-bold text-primary mb-2">350+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🌃</div>
              <h3 className="text-xl font-bold text-primary mb-2">도시 인프라</h3>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-bold text-primary mb-2">산업용 조명</h3>
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-primary mb-2">문화시설</h3>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <p className="text-gray-600">완료 프로젝트</p>
            </Card>
          </div>
        </div>
      </Section>

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