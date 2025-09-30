import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/ui/Hero';
import GroupIntro from '../components/ui/GroupIntro';
import SubsidiariesIntro from '../components/ui/SubsidiariesIntro';
import CoreTechnologies from '../components/ui/CoreTechnologies';
import ProjectGallery from '../components/ui/ProjectGallery';
import GlobalPresence from '../components/ui/GlobalPresence';
import CustomerSupport from '../components/ui/CustomerSupport';
import LatestNews from '../components/ui/LatestNews';
import ScrollAnimation from '../components/ui/ScrollAnimation';
import ResponsiveContainer from '../components/ui/ResponsiveContainer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import SkipLink from '../components/ui/SkipLink';
import ScrollProgress from '../components/ui/ScrollProgress';
import contentLoader from '../utils/contentLoader';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0); // 강제 업데이트를 위한 상태

  // 데이터 무결성 검증 함수
  const validateHomeData = (data) => {
    if (!data || typeof data !== 'object') return false;
    
    // 필수 필드 검증
    const requiredFields = ['hero', 'achievements', 'group', 'subsidiaries'];
    for (const field of requiredFields) {
      if (!data[field]) return false;
    }
    
    // hero 섹션 검증
    if (!data.hero.title || !data.hero.subtitle) return false;
    
    // achievements 배열 검증
    if (!Array.isArray(data.achievements) || data.achievements.length === 0) return false;
    for (const achievement of data.achievements) {
      if (!achievement.number || !achievement.label) return false;
    }
    
    // group 섹션 검증
    if (!data.group.title || !data.group.description) return false;
    
    // subsidiaries 배열 검증
    if (!Array.isArray(data.subsidiaries) || data.subsidiaries.length === 0) return false;
    for (const subsidiary of data.subsidiaries) {
      if (!subsidiary.name || !subsidiary.subtitle) return false;
    }
    
    return true;
  };

  // 데이터 복구 시도 함수
  const attemptDataRecovery = () => {
    try {
      // 백업 목록 가져오기
      const backupKeys = Object.keys(localStorage).filter(key => key.startsWith('homeData_backup_'));
      
      if (backupKeys.length === 0) {
        console.log('사용 가능한 백업이 없습니다. 기본 데이터를 사용합니다.');
        return;
      }
      
      // 가장 최근 백업에서 복구 시도
      const latestBackup = backupKeys.sort().pop();
      const backupData = localStorage.getItem(latestBackup);
      
      if (backupData) {
        const parsedData = JSON.parse(backupData);
        if (validateHomeData(parsedData)) {
          setHomeData(parsedData);
          localStorage.setItem('homeData', backupData);
          console.log('백업에서 데이터가 성공적으로 복구되었습니다!');
        } else {
          console.log('백업 데이터에도 문제가 있습니다. 기본 데이터를 사용합니다.');
        }
      }
    } catch (error) {
      console.error('데이터 복구 오류:', error);
    }
  };

  // 데이터 로딩
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 캐시 무효화
        contentLoader.invalidateCache('homepage');
        
        // 직접 JSON 파일 로드
        const response = await fetch('/public/content/homepage.json');
        if (response.ok) {
          const data = await response.json();
          if (validateHomeData(data)) {
            setHomeData(data);
            contentLoader.saveBackup('homepage', data);
            return;
          }
        }
        
        // 폴백 데이터 사용
        const fallbackData = {
          hero: {
            title: "정호그룹의 사업영역",
            subtitle: "조명제어 전문기업으로서 40년간 축적된 기술력으로,\n다양한 분야에서 혁신적인 솔루션을 제공합니다",
            description: "수많은 프로젝트의 성공적인 시공 및 운영경험을 바탕으로 최고의 고객가치를 창출합니다"
          },
          achievements: [
            { number: "40", label: "년 전통" },
            { number: "800+", label: "프로젝트" },
            { number: "7+", label: "국가 진출" },
            { number: "99%", label: "고객 만족도" }
          ],
          group: {
            title: "정호그룹 소개",
            description: "1983년 창립 이래 40년간 조명제어 분야 전문성을 축적해온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어의 새로운 표준을 제시하였습니다."
          },
          subsidiaries: [
            {
              name: "클라루스",
              subtitle: "AI 기반 스마트 조명/전력제어",
              description: "스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문업체"
            },
            {
              name: "정호티엘씨",
              subtitle: "조명/전력제어의 설계/시공/사후관리",
              description: "공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축(시공)하고, 사후관리를 담당하는 전문업체"
            },
            {
              name: "일루텍",
              subtitle: "유.무선 스마트조명제품 쇼핑몰 공급",
              description: "유.무선 조명제어 제품을 국내외 유명 쇼핑몰에 전시, 판매, 시공기술지원 업체"
            },
            {
              name: "정호텍스컴",
              subtitle: "섬유의 전통, 패션의 미래를 열어갑니다",
              description: "40년간 축적된 섬유기계 전문성과 패션브랜드 론칭을 통해 새로운 가치를 창출하는 전문업체"
            }
          ]
        };
        
        setHomeData(fallbackData);
        contentLoader.saveBackup('homepage', fallbackData);
        setForceUpdate(prev => prev + 1); // 강제 업데이트 트리거
        
      } catch (err) {
        console.error('홈페이지 데이터 로딩 실패:', err);
        setError(err.message);
        attemptDataRecovery();
      } finally {
        setLoading(false);
      }
    };
    
    loadHomeData();
  }, []);

  // 로딩 상태 표시
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="홈페이지를 불러오는 중..." />
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              데이터 로딩 실패
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 현재 사용할 데이터
  const currentData = homeData || {
    hero: {
      title: "정호그룹의 사업영역",
      subtitle: "조명제어 전문기업으로서 40년간 축적된 기술력으로,\n다양한 분야에서 혁신적인 솔루션을 제공합니다",
      description: "수많은 프로젝트의 성공적인 시공 및 운영경험을 바탕으로 최고의 고객가치를 창출합니다"
    },
    achievements: [
      { number: "40", label: "년 전통" },
      { number: "800+", label: "프로젝트" },
      { number: "7+", label: "국가 진출" },
      { number: "99%", label: "고객 만족도" }
    ],
    group: {
      title: "정호그룹 소개",
      description: "1983년 창립 이래 40년간 조명제어 분야 전문성을 축적해온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어의 새로운 표준을 제시하였습니다."
    },
    subsidiaries: [
      {
        name: "클라루스",
        subtitle: "AI 기반 스마트 조명/전력제어",
        description: "스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문업체"
      },
      {
        name: "정호티엘씨",
        subtitle: "조명/전력제어의 설계/시공/사후관리",
        description: "공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축(시공)하고, 사후관리를 담당하는 전문업체"
      },
      {
        name: "일루텍",
        subtitle: "유.무선 스마트조명제품 쇼핑몰 공급",
        description: "유.무선 조명제어 제품을 국내외 유명 쇼핑몰에 전시, 판매, 시공기술지원 업체"
      },
      {
        name: "정호텍스컴",
        subtitle: "섬유의 전통, 패션의 미래를 열어갑니다",
        description: "40년간 축적된 섬유기계 전문성과 패션브랜드 론칭을 통해 새로운 가치를 창출하는 전문업체"
      }
    ]
  };

  // 히어로 섹션 데이터
  const heroData = {
    backgroundImage: optimizedImages.hero.src,
    webpBackgroundImage: optimizedImages.hero.webpSrc,
    mainCopy: currentData.hero.title,
    subCopy: currentData.hero.subtitle,
    stats: currentData.achievements.map(achievement => ({
      value: achievement.number,
      label: achievement.label
    })),
    primaryAction: {
      label: "비즈니스 보기",
      path: "/business"
    },
    secondaryAction: {
      label: "문의하기",
      path: "/support"
    },
    useLocalStorage: false // localStorage 사용 비활성화
  };

  // 그룹 소개 섹션 데이터
  const groupIntroData = {
    title: currentData.group.title,
    content: currentData.group.description.split('\n\n'),
    image: optimizedImages.groupIntro.src,
    webpImage: optimizedImages.groupIntro.webpSrc,
    stats: currentData.achievements.map(achievement => ({
      value: achievement.number,
      label: achievement.label
    }))
  };

  return (
    <ErrorBoundary>
      <SkipLink />
      <ScrollProgress />
      <SEO 
        title="정호그룹 - 조명제어 전문기업"
        description="40년 전통의 조명제어 전문기업으로, 클라러스, TLC, 일루테크, 텍스컴 등 계열사를 통해 혁신적인 솔루션을 제공합니다."
        keywords="정호그룹, 조명제어, 클라러스, TLC, 일루테크, 텍스컴, LED조명, 스마트조명"
      />
      
      {/* 히어로 섹션 */}
      <ScrollAnimation animation="fadeIn" key={forceUpdate}>
        <section id="main-content" className="hero-section">
          <Hero {...heroData} />
        </section>
      </ScrollAnimation>

      {/* 그룹 소개 섹션 */}
      <ScrollAnimation animation="slideInLeft" delay={200}>
        <section className="section">
          <ResponsiveContainer>
            <GroupIntro {...groupIntroData} />
          </ResponsiveContainer>
        </section>
      </ScrollAnimation>

      {/* 계열사 소개 섹션 */}
      <ScrollAnimation animation="slideInRight" delay={400}>
        <section className="section bg-gradient-green">
          <ResponsiveContainer>
            <SubsidiariesIntro subsidiaries={currentData.subsidiaries} />
          </ResponsiveContainer>
        </section>
      </ScrollAnimation>

      {/* 핵심 기술 섹션 */}
      <ScrollAnimation animation="scaleIn" delay={600}>
        <section className="section">
          <ResponsiveContainer>
            <CoreTechnologies />
          </ResponsiveContainer>
        </section>
      </ScrollAnimation>

      {/* 프로젝트 갤러리 섹션 */}
      <ScrollAnimation animation="fadeIn" delay={800}>
        <section className="section bg-neutral-50">
          <ResponsiveContainer>
            <ProjectGallery />
          </ResponsiveContainer>
        </section>
      </ScrollAnimation>

      {/* 글로벌 진출 섹션 */}
      <ScrollAnimation animation="slideInLeft" delay={1000}>
        <section className="section">
          <ResponsiveContainer>
            <GlobalPresence />
          </ResponsiveContainer>
        </section>
      </ScrollAnimation>

      {/* 고객 지원 섹션 */}
      <ScrollAnimation animation="slideInRight" delay={1200}>
        <section className="section bg-gradient-green-blue">
          <ResponsiveContainer>
            <CustomerSupport />
          </ResponsiveContainer>
        </section>
      </ScrollAnimation>

      {/* 최신 뉴스 섹션 */}
      <ScrollAnimation animation="bounceIn" delay={1400}>
        <section className="section">
          <ResponsiveContainer>
            <LatestNews />
          </ResponsiveContainer>
        </section>
      </ScrollAnimation>
    </ErrorBoundary>
  );
};

export default HomePage; 