
import React, { useState, useEffect, useMemo } from 'react';
import { HomePageSEO } from '../components/SEO';
import Hero from '../components/ui/Hero';
import GroupIntro from '../components/ui/GroupIntro';
import SubsidiariesIntro from '../components/ui/SubsidiariesIntro';
import ProjectGallery from '../components/ui/ProjectGallery';
import CustomerSupport from '../components/ui/CustomerSupport';
import LatestNews from '../components/ui/LatestNews';
import fileContentService from '../services/fileContentService';

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
    subtitle: "정호그룹은 조명제어 전문 기업으로서,\n혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다",
    description: "150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다."
  },
  achievements: [
    { number: '40', suffix: '년', label: '조명제어 전문 경험' },
    { number: '800', suffix: '+', label: '프로젝트 완료' },
    { number: '7', suffix: '+', label: '해외진출국' },
    { number: '99', suffix: '%', label: '고객만족도' }
  ],
  groupOverview: {
    title: '40년 전통의 조명제어 전문기업',
    description: '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
    vision: 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
    additionalVision: '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
  },
  subsidiaries: [
    {
      id: 'clarus',
      title: '클라루스',
      subtitle: 'AI 기반 스마트 조명/전력제어',
      description: '스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문 업체',
      feature: 'AI 기반 자동 제어 시스템',
      color: '#0066CC',
      path: '/clarus',
      icon: '💡'
    },
    {
      id: 'tlc',
      title: '정호티엘씨',
      subtitle: '조명/전력제어의 설계/시공/사후관리',
      description: '공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축(시공)하고, 사후관리를 담당하는 전문업체',
      feature: 'IoT 센서 네트워크',
      color: '#28A745',
      path: '/tlc',
      icon: '📡'
    },
    {
      id: 'illutech',
      title: '일루텍',
      subtitle: '유.무선 스마트조명제품 쇼핑몰 공급',
      description: '유.무선 조명제어 제품을 국내외 유명 쇼핑몰에 전시, 판매, 시공기술지원 업체',
      feature: '스마트 물류 자동화',
      color: '#FF8C00',
      path: '/illutech',
      icon: '🚚'
    },
    {
      id: 'texcom',
      title: '정호텍스컴',
      subtitle: '섬유기계의 전통과 첨단패션을 주도하는 온라인 사업',
      description: '40년간 축적된 섬유기계 전문성과 패션브랜드 론칭을 통해 새로운 가치를 창출하는 전문업체',
      feature: '텍스타일 제어 시스템',
      color: '#FF6B9D',
      path: '/texcom',
      icon: '🧵'
    }
  ],
  subsidiariesIntro: {
    title: '4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계',
    description: '기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출'
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

  // 서버에서 콘텐츠 로드 (로컬 스토리지 우선)
  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log('HomePage 컴포넌트가 렌더링되었습니다!');
        console.log('현재 URL:', window.location.href);

        // 1. 파일 기반 콘텐츠 로드 시도
        console.log('파일 기반 콘텐츠 로드 시도...');
        const fileResult = await fileContentService.loadContent();
        
        if (fileResult.success && fileResult.data) {
          console.log('파일 기반 콘텐츠 로드 성공:', fileResult.data);
          console.log('Subsidiaries Intro 데이터:', fileResult.data.subsidiariesIntro);
          
          // subsidiariesIntro 데이터가 없으면 기본값으로 병합
          const mergedData = {
            ...defaultData,
            ...fileResult.data,
            subsidiariesIntro: fileResult.data.subsidiariesIntro || defaultData.subsidiariesIntro
          };
          
          console.log('병합된 데이터:', mergedData);
          setHomeData(mergedData);
          setDebugInfo(`파일에서 로드됨 - ${new Date().toLocaleString()}`);
          return;
        }
        
        // 2. 로컬 스토리지 실패 시 기본값 사용
        console.log('로컬 스토리지 실패, 기본값 사용');
        
        // 기존 서버 로드 시도
        try {
        const response = await fetch('http://localhost:8000/api/get-content');
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            console.log('서버에서 콘텐츠 로드 성공:', result.data);
            setHomeData(result.data);
            setDebugInfo(`서버에서 로드됨 (${result.source}) - ${result.lastUpdated}`);
            
            // LocalStorage에도 백업 저장
            localStorage.setItem('homeData', JSON.stringify(result.data));
            console.log('서버 데이터를 LocalStorage에 백업 저장 완료');
            return;
          }
          }
        } catch (serverError) {
          console.log('서버 로드 실패:', serverError);
        }
        
        // 3. URL 파라미터 확인
        const urlParams = new URLSearchParams(window.location.search);
        const approvedData = urlParams.get('approved');

        if (approvedData) {
          console.log('approved 파라미터 발견:', approvedData);
          try {
            const parsedData = JSON.parse(decodeURIComponent(approvedData));
            console.log('파싱된 데이터:', parsedData);
            setHomeData(parsedData);
            setDebugInfo('URL 파라미터에서 데이터 로드됨');
            
            // URL 파라미터로 받은 데이터를 localStorage에 저장
            localStorage.setItem('homeData', JSON.stringify(parsedData));
            console.log('URL 파라미터 데이터를 localStorage에 저장 완료');
            
            // URL 파라미터 제거
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            console.log('URL 파라미터 제거 완료');
            return;
          } catch (error) {
            console.error('URL 파라미터 파싱 오류:', error);
            setDebugInfo('URL 파라미터 파싱 오류');
          }
        }
        
        // 4. LocalStorage에서 데이터 로드 시도
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
          // 5. 기본 데이터 사용
          console.log('기본 데이터 사용');
          setDebugInfo('기본 데이터 사용');
          
          // 기본 데이터를 localStorage에 저장
          localStorage.setItem('homeData', JSON.stringify(defaultData));
          console.log('기본 데이터를 localStorage에 저장 완료');
        }
        
      } catch (error) {
        console.error('콘텐츠 로드 중 오류:', error);
        setDebugInfo('콘텐츠 로드 오류');
        
        // 에러 시 LocalStorage에서 로드 시도
        const storedData = localStorage.getItem('homeData');
        if (storedData) {
          try {
            const parsedStoredData = JSON.parse(storedData);
            setHomeData(parsedStoredData);
            setDebugInfo('오류 후 LocalStorage에서 복구');
          } catch (localError) {
            console.error('LocalStorage 복구 실패:', localError);
            setDebugInfo('복구 실패 - 기본 데이터 사용');
          }
        }
      }
    };
    
    loadContent();
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

  // 히어로 섹션 데이터 (Firebase 데이터 우선 사용)
  const heroData = useMemo(() => {
    console.log('Hero 데이터 생성 중, homeData:', homeData);
    
    // Firebase에서 로드된 데이터 우선 사용
    const safeHero = homeData?.hero || defaultData.hero;
    const safeAchievements = homeData?.achievements || defaultData.achievements;
    
    // 이미지 관리에서 업로드된 Hero 배경 이미지 우선 사용
    const heroImages = imageData.hero || {};
    const heroImageKeys = Object.keys(heroImages);
    const heroBackgroundImage = heroImageKeys.length > 0 
      ? heroImages[heroImageKeys[0]].url 
      : optimizedImages.hero.src;
    
    console.log('Hero 배경 이미지 설정:', heroBackgroundImage);
    console.log('Firebase Hero 데이터:', safeHero);
    console.log('Firebase Achievements 데이터:', safeAchievements);
    
    return {
      backgroundImage: heroBackgroundImage,
      webpBackgroundImage: heroBackgroundImage,
      mainCopy: safeHero.title || '정호그룹\n조명의 미래를\n만들어갑니다',
      subCopy: safeHero.subtitle || '40년 전통의 조명제어 전문기업',
      description: safeHero.description || '혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다',
      stats: [
        {
          value: safeAchievements[0]?.number || '40',
          suffix: safeAchievements[0]?.suffix || '년',
          label: safeAchievements[0]?.label || '조명제어 전문 경험'
        },
        {
          value: safeAchievements[1]?.number || '1000+',
          suffix: safeAchievements[1]?.suffix || '',
          label: safeAchievements[1]?.label || '프로젝트 완료'
        },
        {
          value: safeAchievements[2]?.number || '50+',
          suffix: safeAchievements[2]?.suffix || '',
          label: safeAchievements[2]?.label || '해외 진출국'
        },
        {
          value: safeAchievements[3]?.number || '99%',
          suffix: safeAchievements[3]?.suffix || '',
          label: safeAchievements[3]?.label || '고객 만족도'
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
  }, [homeData, imageData.hero]);

  // 그룹 소개 섹션 데이터 (메모리 최적화 + 안전한 데이터 접근)
  const groupIntroData = useMemo(() => {
    // 안전한 데이터 접근을 위한 기본값 설정
    const safeGroupOverview = homeData?.groupOverview || defaultData.groupOverview;
    
    return {
      title: safeGroupOverview.title || '40년 전통의 조명제어 전문기업',
      content: [
        safeGroupOverview.description || '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
        safeGroupOverview.vision || 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
        safeGroupOverview.additionalVision || '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
      ],
      image: optimizedImages.groupIntro.src,
      webpImage: optimizedImages.groupIntro.webpSrc,
      stats: [
        {
          value: "40",
          suffix: "년",
          label: "조명제어 전문 경험"
        },
        {
          value: "800",
          suffix: "+",
          label: "프로젝트 완료"
        },
        {
          value: "7",
          suffix: "+",
          label: "해외 진출국"
        },
        {
          value: "99",
          suffix: "%",
          label: "고객 만족도"
        }
      ]
    };
  }, [homeData?.groupOverview?.title, homeData?.groupOverview?.description, homeData?.groupOverview?.vision, homeData?.groupOverview?.additionalVision]);

  // 계열사 소개 섹션 데이터 (메모리 최적화)
  const subsidiariesData = useMemo(() => ({
    subsidiaries: homeData.subsidiaries || [
      { id: 'clarus', title: '클라루스', subtitle: 'AI 기반 스마트 조명제어', description: '최신 AI 기술을 활용한 지능형 조명제어 시스템을 개발하고 제공합니다.', feature: 'AI 기반 자동 제어 시스템', color: 'clarus', icon: '💡', path: '/clarus' },
      { id: 'tlc', title: '정호티엘씨', subtitle: 'IoT 센서 및 제어 장치', description: 'IoT 센서 네트워크와 제어 장치를 통해 실시간 모니터링을 제공합니다.', feature: 'IoT 센서 네트워크', color: 'tlc', icon: '📡', path: '/tlc' },
      { id: 'illutech', title: '일루텍', subtitle: '스마트 물류 솔루션', description: '물류 분야의 자동화와 효율성을 극대화하는 스마트 솔루션을 제공합니다.', feature: '스마트 물류 자동화', color: 'illutech', icon: '🚚', path: '/illutech' },
      { id: 'texcom', title: '정호텍스컴', subtitle: '텍스타일 제어 시스템', description: '텍스타일 산업의 생산성을 향상시키는 전문 제어 시스템을 개발합니다.', feature: '텍스타일 제어 시스템', color: 'texcom', icon: '🧵', path: '/texcom' }
    ],
    subsidiariesIntro: homeData.subsidiariesIntro || {
      title: '4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계',
      description: '기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출'
    }
  }), [homeData.subsidiaries, homeData.subsidiariesIntro]);

  return (
    <>
      <HomePageSEO />
      
      {/* 디버그 정보 표시 (개발용) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
          <div className="font-bold mb-1">🔥 Firebase 디버그 정보</div>
          <div>상태: {debugInfo}</div>
          <div>Hero 제목: {homeData?.hero?.title?.substring(0, 20)}...</div>
          <div>Hero 부제목: {homeData?.hero?.subtitle?.substring(0, 20)}...</div>
          <div>데이터 소스: {homeData ? 'Firebase/LocalStorage' : '기본값'}</div>
          <div>Hero Props: {heroData.mainCopy?.substring(0, 15)}...</div>
        </div>
      )}
      
      {/* 원래 구조 그대로 유지 */}
      <div>
        {/* 히어로 섹션 */}
        <section className="hero-section">
          <Hero {...heroData} useLocalStorage={false} />
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

        {/* 프로젝트 갤러리 섹션 */}
        <section className="section bg-neutral-50">
          <div className="container">
            <ProjectGallery 
              galleryImages={imageData.gallery || {}}
            />
          </div>
        </section>


        {/* 언제나 함께하는 든든한 파트너 섹션 */}
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