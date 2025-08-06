import React from 'react';
import { BusinessPageSEO } from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const BusinessPage = () => {
  // 히어로 섹션 데이터
  const heroData = {
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mainCopy: "정호그룹의 사업영역",
    subCopy: "조명제어 전문기업으로서 40년간 축적된 기술력으로 다양한 분야에서 혁신적인 솔루션을 제공합니다",
    primaryAction: {
      label: "문의하기",
      path: "/support"
    }
  };

  // 사업영역 데이터
  const businessAreas = [
    {
      title: "스마트 빌딩 조명제어",
      description: "IoT 기술을 활용한 지능형 빌딩 조명제어 시스템으로 에너지 효율성을 극대화합니다.",
      icon: "🏢",
      features: ["자동 밝기 조절", "모션 센서 연동", "스케줄링 기능", "원격 제어"]
    },
    {
      title: "도시 조명 인프라",
      description: "도시 전체의 조명을 통합 관리하는 스마트시티 조명제어 솔루션을 제공합니다.",
      icon: "🌃",
      features: ["중앙 집중식 제어", "실시간 모니터링", "에너지 절약", "안전성 향상"]
    },
    {
      title: "산업용 조명시스템",
      description: "제조업체의 생산성 향상을 위한 전문적인 산업용 조명제어 시스템을 구축합니다.",
      icon: "🏭",
      features: ["고정밀 조명", "내구성 설계", "안전 표준 준수", "유지보수 편의성"]
    },
    {
      title: "문화시설 조명예술",
      description: "박물관, 갤러리, 공연장 등 문화시설의 조명을 예술적으로 제어하는 시스템을 제공합니다.",
      icon: "🎭",
      features: ["색온도 조절", "다이나믹 효과", "프로그래밍", "예술적 표현"]
    }
  ];

  // 계열사별 전문분야
  const subsidiaries = [
    {
      name: "클라루스",
      description: "스마트 빌딩 조명제어 전문",
      color: "clarus",
      expertise: ["IoT 조명제어", "빌딩 자동화", "에너지 관리"]
    },
    {
      name: "정호티엘씨",
      description: "도시 인프라 조명제어 전문",
      color: "tlc",
      expertise: ["스마트시티", "도로조명", "공원조명"]
    },
    {
      name: "일루텍",
      description: "산업용 조명시스템 전문",
      color: "illutech",
      expertise: ["공장조명", "창고조명", "안전조명"]
    },
    {
      name: "정호텍스컴",
      description: "문화시설 조명예술 전문",
      color: "texcom",
      expertise: ["예술조명", "무대조명", "전시조명"]
    }
  ];

  return (
    <>
      <BusinessPageSEO />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} />
      </section>

      {/* 사업영역 소개 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              핵심 사업영역
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              40년간 축적된 조명제어 기술력을 바탕으로 다양한 분야에서 혁신적인 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessAreas.map((area, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-6">{area.description}</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {area.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 계열사별 전문분야 */}
      <Section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              계열사별 전문분야
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              4개 계열사가 각각의 전문분야에서 최고의 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subsidiaries.map((subsidiary, index) => (
              <Card key={index} className={`card-${subsidiary.color} p-8`}>
                <h3 className="text-2xl font-bold text-primary mb-4">{subsidiary.name}</h3>
                <p className="text-gray-600 mb-6">{subsidiary.description}</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">전문분야:</h4>
                  <div className="flex flex-wrap gap-2">
                    {subsidiary.expertise.map((exp, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    onClick={() => window.location.href = `/${subsidiary.name.toLowerCase()}`}
                  >
                    자세히 보기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 기술력 소개 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              차별화된 기술력
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              국내 최초 E/F2-BUS 프로토콜 개발부터 최신 IoT 기술까지
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-primary mb-4">자체 개발 프로토콜</h3>
              <p className="text-gray-600">
                국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 독자적인 기술력을 확보했습니다.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-primary mb-4">IoT 통합 솔루션</h3>
              <p className="text-gray-600">
                최신 IoT 기술을 활용하여 스마트한 조명제어 시스템을 구축합니다.
              </p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-primary mb-4">에너지 효율성</h3>
              <p className="text-gray-600">
                에너지 절약과 사용자 편의성을 동시에 만족시키는 솔루션을 제공합니다.
              </p>
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
              onClick={() => window.location.href = "/projects"}
              className="text-lg px-8 py-4"
            >
              프로젝트 보기
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default BusinessPage; 