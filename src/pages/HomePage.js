import React, { useState, useEffect } from 'react';
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
  // 동적 데이터 상태
  const [homeData, setHomeData] = useState(null);

  // LocalStorage에서 데이터 불러오기
  useEffect(() => {
    const loadHomeData = () => {
      // 1. URL 파라미터에서 데이터 확인 (관리자 페이지에서 리다이렉트된 경우)
      const urlParams = new URLSearchParams(window.location.search);
      const approvedData = urlParams.get('approved');
      
      if (approvedData) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(approvedData));
          setHomeData(parsedData);
          // URL 파라미터 제거
          window.history.replaceState({}, document.title, window.location.pathname);
          return;
        } catch (error) {
          console.error('URL 파라미터 데이터 파싱 오류:', error);
        }
      }
      
      // 2. LocalStorage에서 데이터 불러오기
      const savedData = localStorage.getItem('homeData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setHomeData(parsedData);
        } catch (error) {
          console.error('LocalStorage 데이터 파싱 오류:', error);
        }
      }
    };

    loadHomeData();

    // LocalStorage 변경 감지
    const handleStorageChange = (e) => {
      if (e.key === 'homeData') {
        loadHomeData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 페이지 포커스 시 데이터 새로고침
    const handleFocus = () => {
      loadHomeData();
    };
    
    window.addEventListener('focus', handleFocus);

    // 전역 이벤트 리스너 (관리자 페이지에서 발생)
    const handleGlobalDataChange = () => {
      if (window.globalHomeData) {
        setHomeData(window.globalHomeData);
      }
    };
    
    window.addEventListener('globalHomeDataChanged', handleGlobalDataChange);
    
    // 메시지 이벤트 리스너 (다른 탭에서 관리자 페이지가 데이터를 업데이트할 경우)
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'homeDataUpdated') {
        setHomeData(event.data.data);
      }
    };
    
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('globalHomeDataChanged', handleGlobalDataChange);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // 기본 데이터 (LocalStorage에 데이터가 없을 때 사용)
  const defaultData = {
    hero: {
      title: '정호그룹\n조명의 미래를\n만들어갑니다',
      subtitle: '40년 전통의 조명제어 전문기업',
      description: '혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다'
    },
    achievements: [
      { number: '40', label: '년 전통' },
      { number: '1000+', label: '프로젝트' },
      { number: '50+', label: '국가 진출' },
      { number: '99%', label: '고객 만족도' }
    ],
    group: {
      title: '40년 전통의 조명제어 전문기업',
      description: '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.\n\nB2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.\n\n혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
    },
    subsidiaries: [
      {
        name: '클라루스',
        subtitle: '조명제어 시스템',
        description: '스마트 조명제어 솔루션 전문기업'
      },
      {
        name: '정호티엘씨',
        subtitle: 'LED 조명',
        description: '친환경 LED 조명 제품 전문기업'
      },
      {
        name: '일루텍',
        subtitle: '조명 디자인',
        description: '창의적인 조명 디자인 전문기업'
      },
      {
        name: '정호텍스컴',
        subtitle: '조명 기술',
        description: '최첨단 조명 기술 개발 전문기업'
      }
    ]
  };

  // 현재 사용할 데이터 (LocalStorage 데이터 또는 기본 데이터)
  const currentData = homeData || defaultData;

  // 히어로 섹션 데이터
  const heroData = {
    backgroundImage: optimizedImages.hero.src,
    webpBackgroundImage: optimizedImages.hero.webpSrc,
    mainCopy: currentData.hero.title,
    subCopy: currentData.hero.subtitle,
    stats: currentData.achievements.map(achievement => ({
      value: achievement.number,
      suffix: '',
      label: achievement.label
    })),
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
    title: currentData.group.title,
    content: currentData.group.description.split('\n\n'),
    image: optimizedImages.groupIntro.src,
    webpImage: optimizedImages.groupIntro.webpSrc,
    stats: currentData.achievements.map(achievement => ({
      value: achievement.number,
      suffix: '',
      label: achievement.label
    })),
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
          <SubsidiariesIntro subsidiaries={currentData.subsidiaries} />
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