
import React, { useState, useEffect, useMemo } from 'react';
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
      src: "https://images.unsplash.com/photo-1581091226825-a4e2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      webpSrc: "https://images.unsplash.com/photo-1581091226825-a4e2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&f=webp",
      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
    }
  }
};

// 기본 데이터 구조 (관리자에서 수정 가능)
const defaultData = {
  hero: {
    title: "40년 축적된 기술력으로\n조명의 미래를 혁신합니다",
    subtitle: "정호그룹은 조명제어 전문 기업으로서 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다",
    description: "150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다."
  },
  achievements: [
    { number: '40', suffix: '년+', label: '조명제어 전문 경험' },
    { number: '1000', suffix: '+', label: '프로젝트 완료' },
    { number: '50', suffix: '+', label: '해외 진출국' },
    { number: '24', suffix: '/7', label: '전문 기술 지원' }
  ],
  groupOverview: {
    title: '40년 전통의 조명제어 전문기업',
    description: '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
    vision: 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.'
  }
};

const HomePage = () => {
  const [homeData, setHomeData] = useState(defaultData);
  const [debugInfo, setDebugInfo] = useState('초기화됨');
  
  // 이미지 데이터 상태 추가 - 메모리 최적화
  const [imageData, setImageData] = useState(() => {
    try {
      const savedImages = localStorage.getItem('imageData');
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        // 필요한 데이터만 추출하여 메모리 절약
        const optimizedData = {
          hero: parsed.hero || {},
          logo: parsed.logo || {},
          gallery: parsed.gallery || {}
        };
        console.log('최적화된 이미지 데이터 로드:', optimizedData);
        return optimizedData;
      }
    } catch (error) {
      console.error('이미지 데이터 파싱 오류:', error);
    }
    
    // 기본 이미지 데이터 (Unsplash 더미 이미지) - 메모리 절약
    const defaultImages = {
      hero: {
        'hero-bg.jpg': {
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60',
          name: 'hero-bg.jpg',
          size: 0,
          type: 'image/jpeg',
          uploadedAt: new Date().toISOString()
        }
      },
      logo: {},
      gallery: {
        'project-1.jpg': {
          url: 'https://images.unsplash.com/photo-1581091226825-a4e2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
          name: 'project-1.jpg',
          size: 0,
          type: 'image/jpeg',
          uploadedAt: new Date().toISOString()
        }
      }
    };
    
    console.log('최적화된 기본 이미지 데이터 생성:', defaultImages);
    
    // 기본 데이터를 localStorage에 저장
    localStorage.setItem('imageData', JSON.stringify(defaultImages));
    
    return defaultImages;
  });

  useEffect(() => {
    console.log('HomePage 컴포넌트가 렌더링되었습니다!');
    console.log('현재 URL:', window.location.href);
    console.log('현재 URL 파라미터:', window.location.search);

    // URL 파라미터에서 데이터 로드
    const urlParams = new URLSearchParams(window.location.search);
    const approvedData = urlParams.get('approved');

    if (approvedData) {
      console.log('approved 파라미터 발견:', approvedData);
      try {
        const parsedData = JSON.parse(decodeURIComponent(approvedData));
        console.log('파싱된 데이터:', parsedData);
        setHomeData(parsedData);
        setDebugInfo('URL 파라미터에서 데이터 로드됨');
        
        // URL 파라미터로 받은 데이터를 localStorage에 저장 (지속성 보장)
        localStorage.setItem('homeData', JSON.stringify(parsedData));
        console.log('URL 파라미터 데이터를 localStorage에 저장 완료');
        
        // URL 파라미터 제거 (브라우저 히스토리 정리)
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        console.log('URL 파라미터 제거 완료');
      } catch (error) {
        console.error('파싱 오류:', error);
        setDebugInfo('파싱 오류 발생');
      }
    } else {
      console.log('approved 파라미터가 없습니다');
      // localStorage에서 데이터 로드 시도
      const storedData = localStorage.getItem('homeData');
      if (storedData) {
        try {
          const parsedStoredData = JSON.parse(storedData);
          console.log('LocalStorage에서 데이터 로드:', parsedStoredData);
          setHomeData(parsedStoredData);
          setDebugInfo('LocalStorage에서 데이터 로드됨');
        } catch (error) {
          console.error('LocalStorage 파싱 오류:', error);
          setDebugInfo('LocalStorage 파싱 오류');
        }
      } else {
        console.log('기본 데이터 사용');
        setDebugInfo('기본 데이터 사용');
        
        // 기본 데이터를 localStorage에 저장하여 다음 방문 시 사용
        localStorage.setItem('homeData', JSON.stringify(defaultData));
        console.log('기본 데이터를 localStorage에 저장 완료');
      }
    }
  }, []);

  // 이미지 데이터 변경 감지 및 홈페이지 업데이트
  useEffect(() => {
    console.log('이미지 데이터 변경 감지:', imageData);
    
    // 이미지 데이터가 변경되면 홈페이지를 강제로 리렌더링
    if (Object.keys(imageData).length > 0) {
      setDebugInfo('이미지 데이터 업데이트됨');
      
      // Hero 배경 이미지가 변경되었는지 확인
      const heroImages = imageData.hero || {};
      if (Object.keys(heroImages).length > 0) {
        console.log('Hero 배경 이미지 업데이트됨:', heroImages);
      }
    }
  }, [imageData]);

  // 히어로 섹션 데이터 (메모리 최적화)
  const heroData = useMemo(() => {
    // 이미지 관리에서 업로드된 Hero 배경 이미지 우선 사용
    const heroImages = imageData.hero || {};
    const heroImageKeys = Object.keys(heroImages);
    const heroBackgroundImage = heroImageKeys.length > 0 
      ? heroImages[heroImageKeys[0]].url 
      : optimizedImages.hero.src;
    
    console.log('Hero 배경 이미지 설정:', heroBackgroundImage);
    
    return {
      backgroundImage: heroBackgroundImage,
      webpBackgroundImage: heroBackgroundImage, // WebP 지원을 위해 동일한 이미지 사용
      mainCopy: homeData.hero.title,
      subCopy: homeData.hero.subtitle,
      stats: [
        {
          value: homeData.achievements[0].number,
          suffix: homeData.achievements[0].suffix,
          label: homeData.achievements[0].label
        },
        {
          value: homeData.achievements[1].number,
          suffix: homeData.achievements[1].suffix,
          label: homeData.achievements[1].label
        },
        {
          value: homeData.achievements[2].number,
          suffix: homeData.achievements[2].suffix,
          label: homeData.achievements[2].label
        },
        {
          value: homeData.achievements[3].number,
          suffix: homeData.achievements[3].suffix,
          label: homeData.achievements[3].label
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
  }, [homeData.hero.title, homeData.hero.subtitle, homeData.achievements, imageData.hero]);

  // 그룹 소개 섹션 데이터 (메모리 최적화)
  const groupIntroData = useMemo(() => ({
    title: homeData.groupOverview.title,
    content: [
      homeData.groupOverview.description,
      homeData.groupOverview.vision,
      homeData.groupOverview.additionalVision || "혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다."
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
  }), [homeData.groupOverview.title, homeData.groupOverview.description, homeData.groupOverview.vision, homeData.groupOverview.additionalVision]);

  // 계열사 소개 섹션 데이터 (메모리 최적화)
  const subsidiariesData = useMemo(() => ({
    subsidiaries: homeData.subsidiaries || [
      { id: 'clarus', title: '클라루스', subtitle: 'AI 기반 스마트 조명제어', description: '최신 AI 기술을 활용한 지능형 조명제어 시스템을 개발하고 제공합니다.', feature: 'AI 기반 자동 제어 시스템', color: 'clarus', icon: '💡' },
      { id: 'tlc', title: '정호티엘씨', subtitle: 'IoT 센서 및 제어 장치', description: 'IoT 센서 네트워크와 제어 장치를 통해 실시간 모니터링을 제공합니다.', feature: 'IoT 센서 네트워크', color: 'tlc', icon: '📡' },
      { id: 'illutech', title: '일루텍', subtitle: '스마트 물류 솔루션', description: '물류 분야의 자동화와 효율성을 극대화하는 스마트 솔루션을 제공합니다.', feature: '스마트 물류 자동화', color: 'illutech', icon: '🚚' },
      { id: 'texcom', title: '정호텍스컴', subtitle: '텍스타일 제어 시스템', description: '텍스타일 산업의 생산성을 향상시키는 전문 제어 시스템을 개발합니다.', feature: '텍스타일 제어 시스템', color: 'texcom', icon: '🧵' }
    ]
  }), [homeData.subsidiaries]);

  return (
    <>
      <HomePageSEO />
      
      {/* 원래 구조 그대로 유지 */}
      <div>
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
            <SubsidiariesIntro {...subsidiariesData} />
          </div>
        </section>

        {/* 핵심 기술 섹션 */}
        <section className="section">
          <div className="container">
            <CoreTechnologies />
          </div>
        </section>

        {/* 이미지 표시 위치 안내 섹션 */}
        {Object.keys(imageData).length > 0 && (
          <section className="section bg-blue-50 py-8">
            <div className="container">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">📸 이미지 표시 위치 안내</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {imageData.hero && Object.keys(imageData.hero).length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-green-600 font-semibold mb-2">✅ Hero 배경 이미지</div>
                      <div className="text-gray-600">홈페이지 상단 메인 배경으로 표시됩니다</div>
                    </div>
                  )}
                  {imageData.logo && Object.keys(imageData.logo).length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-green-600 font-semibold mb-2">✅ 로고 이미지</div>
                      <div className="text-gray-600">페이지 상단 헤더에 표시됩니다</div>
                    </div>
                  )}
                  {imageData.gallery && Object.keys(imageData.gallery).length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-green-600 font-semibold mb-2">✅ 갤러리 이미지</div>
                      <div className="text-gray-600">프로젝트 카드에 표시됩니다</div>
                      <div className="text-blue-600 text-xs mt-2">
                        💡 여러 장 업로드 시: 첫 번째 이미지부터 순서대로 프로젝트 카드에 적용됩니다
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 프로젝트 갤러리 섹션 */}
        <section className="section bg-neutral-50">
          <div className="container">
            <ProjectGallery 
              galleryImages={imageData.gallery || {}}
            />
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
      </div>
    </>
  );
};

export default HomePage; 