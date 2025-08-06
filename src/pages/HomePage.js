import React from 'react';
import { HomePageSEO } from '../components/SEO';
import Hero from '../components/ui/Hero';
import GroupIntro from '../components/ui/GroupIntro';
import SubsidiariesIntro from '../components/ui/SubsidiariesIntro';
import CoreTechnologies from '../components/ui/CoreTechnologies';
import ProjectGallery from '../components/ui/ProjectGallery';
import GlobalPresence from '../components/ui/GlobalPresence';
import CustomerSupport from '../components/ui/CustomerSupport';
import LatestNews from '../components/ui/LatestNews';

// 최적화된 이미지 데이터
const optimizedImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    webpSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&f=webp",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
  },
  groupIntro: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    webpSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&f=webp",
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
  },
  projects: {
    samsung: {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      webpSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&f=webp",
      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
    }
  }
};

const HomePage = () => {
  // 히어로 섹션 데이터
  const heroData = {
    backgroundImage: optimizedImages.hero.src,
    webpBackgroundImage: optimizedImages.hero.webpSrc,
    mainCopy: "40년 축적된 기술력으로\n조명의 미래를 혁신합니다",
    subCopy: "정호그룹은 조명제어 전문 기업으로서 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다",
    stats: [
      {
        value: "40",
        suffix: "년+",
        label: "조명제어 전문 경험"
      },
      {
        value: "1000",
        suffix: "+",
        label: "프로젝트 완료"
      },
      {
        value: "50",
        suffix: "+",
        label: "해외 진출국"
      },
      {
        value: "24",
        suffix: "/7",
        label: "전문 기술 지원"
      }
    ],
    primaryAction: {
      label: "사업영역 보기",
      path: "/business"
    },
    secondaryAction: {
      label: "문의하기",
      path: "/support"
    }
  };

  // 그룹 소개 섹션 데이터
  const groupIntroData = {
    title: "40년 전통의 조명제어 전문기업",
    content: [
      "1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.",
      "B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.",
      "혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다."
    ],
    image: optimizedImages.groupIntro.src,
    webpImage: optimizedImages.groupIntro.webpSrc,
    stats: [
      {
        value: "40",
        suffix: "년",
        label: "전문 경험"
      },
      {
        value: "1000",
        suffix: "+",
        label: "프로젝트"
      },
      {
        value: "50",
        suffix: "+",
        label: "해외 진출국"
      },
      {
        value: "24",
        suffix: "/7",
        label: "기술 지원"
      }
    ]
  };

  return (
    <>
      <HomePageSEO />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} />
      </section>

      {/* 그룹 소개 섹션 */}
      <section className="section">
        <div className="container">
          <GroupIntro {...groupIntroData} />
        </div>
      </section>

      {/* 계열사 소개 섹션 */}
      <section className="section bg-gradient-green">
        <div className="container">
          <SubsidiariesIntro />
        </div>
      </section>

      {/* 핵심 기술 섹션 */}
      <section className="section">
        <div className="container">
          <CoreTechnologies />
        </div>
      </section>

      {/* 프로젝트 갤러리 섹션 */}
      <section className="section bg-neutral-50">
        <div className="container">
          <ProjectGallery />
        </div>
      </section>

      {/* 글로벌 진출 섹션 */}
      <section className="section">
        <div className="container">
          <GlobalPresence />
        </div>
      </section>

      {/* 고객 지원 섹션 */}
      <section className="section bg-gradient-green-blue">
        <div className="container">
          <CustomerSupport />
        </div>
      </section>

      {/* 최신 뉴스 섹션 */}
      <section className="section">
        <div className="container">
          <LatestNews />
        </div>
      </section>
    </>
  );
};

export default HomePage; 