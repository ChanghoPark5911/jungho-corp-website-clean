import React, { useMemo, useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/ui/Hero';
import GroupIntro from '../components/ui/GroupIntro';
import SubsidiariesIntro from '../components/ui/SubsidiariesIntro';
import ProjectGallery from '../components/ui/ProjectGallery';
import CustomerSupport from '../components/ui/CustomerSupport';
import LatestNews from '../components/ui/LatestNews';
import { useI18n } from '../hooks/useI18n';
import useUnifiedContent from '../hooks/useUnifiedContent';

// 최적화된 이미지 데이터
const optimizedImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    webpSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&fm=webp"
  },
  groupIntro: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    webpSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80&fm=webp"
  },
  logo: "/logo.png",
  gallery: {
    image1: { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "프로젝트 이미지 1" },
    image2: { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "프로젝트 이미지 2" },
    image3: { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "프로젝트 이미지 3" },
    image4: { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "프로젝트 이미지 4" },
    image5: { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "프로젝트 이미지 5" },
    image6: { src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", alt: "프로젝트 이미지 6" }
  }
};

const UnifiedHomePage = () => {
  const { t, currentLanguage } = useI18n();
  
  // 통합 콘텐츠 로드
  const { content: unifiedContent, loading: contentLoading, error: contentError } = useUnifiedContent();
  
  // 🔧 실시간 업데이트 감지
  const [refreshKey, setRefreshKey] = React.useState(0);
  
  useEffect(() => {
    // 관리자 페이지에서 저장 시 발생하는 커스텀 이벤트 감지
    const handleContentUpdate = () => {
      console.log('🔔 홈페이지 업데이트 이벤트 감지!');
      setRefreshKey(prev => prev + 1); // 강제 리렌더링
    };
    
    window.addEventListener('homepageContentUpdated', handleContentUpdate);
    
    return () => {
      window.removeEventListener('homepageContentUpdated', handleContentUpdate);
    };
  }, []);
  
  // 이벤트 기반 새로고침 제거 - 무한 루프 방지

  // 🔧 homeData를 useMemo로 변경하여 refreshKey 변경 시 다시 계산
  const homeData = useMemo(() => {
    console.log('🔄 홈페이지 데이터 로드/새로고침 (refreshKey:', refreshKey, ')');
    
    // localStorage에서 직접 확인
    const localData = localStorage.getItem('homepage_content_ko');
    
    // 강제로 localStorage 무시하고 기본값 사용 (개발용)
    const forceDefault = localStorage.getItem('forceDefault') !== 'false'; // localStorage에서 설정 확인
    
    // 기본값 복원 확인 (URL 파라미터로 확인)
    const urlParams = new URLSearchParams(window.location.search);
    const restoreDefault = urlParams.get('restore') === 'true';
    
    if (restoreDefault) {
      localStorage.removeItem('homepage_content_ko');
      localStorage.removeItem('homepage_preview');
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.reload();
      return null;
    }

    // 데이터 로드 우선순위: localStorage → Firebase → 기본값
    let data;
    
    // 강제 기본값 사용 또는 기본값 복원 모드
    if (forceDefault || restoreDefault) {
      data = null; // 강제로 기본값 사용
    } else {
      // 1. localStorage에서 관리자가 저장한 데이터 확인
      const freshLocalData = localStorage.getItem('homepage_content_ko');
      if (freshLocalData) {
        try {
          data = JSON.parse(freshLocalData);
          console.log('✅ localStorage에서 데이터 로드:', data);
        } catch (error) {
          console.error('❌ localStorage 데이터 파싱 오류:', error);
          data = unifiedContent;
        }
      } else {
        // 2. Firebase에서 데이터 로드
        data = unifiedContent;
      }
    }

    // 폴백: 기본값 사용 (data가 없거나 빈 객체인 경우)
    if (!data || Object.keys(data).length === 0) {
      data = {
        hero: {
          title: t('home.hero.title') || "40년 축적된 기술력으로\n조명의 미래를 혁신합니다",
          subtitle: t('home.hero.subtitle') || "정호그룹은 조명제어 전문 기업으로서,\n혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다",
          description: t('home.hero.description') || "150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다."
        },
        achievements: [
          { 
            number: '40', 
            suffix: t('home.stats.years.suffix') || '년', 
            label: t('home.stats.years.label') || '조명제어 전문 경험' 
          },
          { 
            number: '800', 
            suffix: '+', 
            label: t('home.stats.projects.label') || '프로젝트 완료' 
          },
          { 
            number: '7', 
            suffix: '+', 
            label: t('home.stats.countries.label') || '해외진출국' 
          },
          { 
            number: '99', 
            suffix: '%', 
            label: t('home.stats.satisfaction.label') || '고객만족도' 
          }
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
    }
    
    return data;
  }, [refreshKey, unifiedContent, t]);

  // 🔧 줄바꿈 처리 함수
  const processLineBreaks = (text) => {
    if (!text) return '';
    return text.replace(/\\n/g, '\n');
  };

  // Hero 컴포넌트에 전달할 데이터
  const heroData = useMemo(() => {
    // 🔢 등록된 프로젝트 수 계산 (localStorage에서)
    let registeredProjectsCount = 0;
    try {
      const localProjects = localStorage.getItem('projects_data');
      if (localProjects) {
        const projects = JSON.parse(localProjects);
        registeredProjectsCount = Array.isArray(projects) ? projects.length : 0;
      }
    } catch (error) {
      console.error('프로젝트 개수 계산 오류:', error);
    }
    
    // 성과지표 다국어 변환 및 데이터 구조 매핑
    const translatedStats = homeData.achievements?.map((stat, index) => {
      // 각 성과지표의 label을 다국어로 변환
      let translatedLabel = stat.label;
      let sublabel = '';
      
      if (index === 0) {
        translatedLabel = t('home.stats.years.label') || stat.label;
      } else if (index === 1) {
        translatedLabel = t('home.stats.projects.label') || stat.label;
        sublabel = t('home.stats.projects.sublabel') || '(누적, 1983년~)';  // 800+ 에 대한 설명
      } else if (index === 2) {
        translatedLabel = t('home.stats.countries.label') || stat.label;
      } else if (index === 3) {
        translatedLabel = t('home.stats.satisfaction.label') || stat.label;
      }
      
      return {
        value: stat.number,  // 'number'를 'value'로 매핑
        suffix: stat.suffix || '',  // suffix 추가
        label: translatedLabel,
        sublabel: sublabel
      };
    }) || [];
    
    // 등록된 프로젝트 통계 추가 (800+ 다음에 삽입)
    if (registeredProjectsCount > 0 && translatedStats.length >= 2) {
      translatedStats.splice(2, 0, {
        value: registeredProjectsCount.toString(),
        suffix: '+',
        label: t('home.stats.registered.label') || '등록된 프로젝트',
        sublabel: t('home.stats.registered.sublabel') || '(온라인 등록)'
      });
    }
    
    const data = {
      backgroundImage: optimizedImages.hero.src,
      mainCopy: processLineBreaks(homeData.hero?.title),
      subCopy: processLineBreaks(homeData.hero?.subtitle),
      description: processLineBreaks(homeData.hero?.description),
      stats: translatedStats,
      primaryAction: { 
        label: t('home.hero.primaryAction') || '사업영역 보기', 
        onClick: () => {} 
      },
      secondaryAction: { 
        label: t('home.hero.secondaryAction') || '문의하기', 
        onClick: () => {} 
      }
    };
    return data;
  }, [homeData.hero, homeData.achievements, t, currentLanguage, refreshKey]);

  // 그룹 소개 섹션 데이터 - 홈페이지 관리 데이터 우선
  const groupIntroData = useMemo(() => {
    const safeGroupOverview = homeData.groupOverview || {};
    
    // 3개 필드(description, vision, additionalVision)를 배열로 만들기
    let contentArray = undefined;
    if (safeGroupOverview.description || safeGroupOverview.vision || safeGroupOverview.additionalVision) {
      contentArray = [
        processLineBreaks(safeGroupOverview.description),
        processLineBreaks(safeGroupOverview.vision),
        processLineBreaks(safeGroupOverview.additionalVision)
      ].filter(para => para && para.trim().length > 0);  // 빈 단락 제거
    }
    
    return {
      title: processLineBreaks(safeGroupOverview.title),
      content: contentArray,
      image: optimizedImages.groupIntro.src,
      webpImage: optimizedImages.groupIntro.webpSrc
      // stats 제거: 히어로 섹션과 중복되어 혼란스러움
    };
  }, [homeData?.groupOverview?.title, homeData?.groupOverview?.description, homeData?.groupOverview?.vision, homeData?.groupOverview?.additionalVision]);

  // 계열사 소개 섹션 - 홈페이지 관리 데이터 우선
  const subsidiariesData = useMemo(() => {
    const subsidiariesIntro = homeData.subsidiariesIntro || {
      title: '4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계',
      description: '기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출'
    };
    
    return {
      subsidiaries: homeData.subsidiaries || [],
      subsidiariesIntro: {
        title: processLineBreaks(subsidiariesIntro.title),
        description: processLineBreaks(subsidiariesIntro.description)
      }
    };
  }, [homeData.subsidiaries, homeData.subsidiariesIntro]);

  // 로딩 상태
  if (contentLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">콘텐츠를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 오류 상태
  if (contentError) {
    console.error('통합 콘텐츠 로드 오류:', contentError);
  }

  // 미리보기 모드 확인
  const isPreviewMode = localStorage.getItem('homepage_preview') !== null;

  return (
    <>
      {/* 미리보기 모드 배너 */}
      {isPreviewMode && (
        <div className="bg-yellow-500 text-white text-center py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
            <span className="font-semibold">👁️ 미리보기 모드</span>
            <span className="text-sm">- 작업 중인 내용을 미리 확인하고 있습니다</span>
            <button
              onClick={() => {
                localStorage.removeItem('homepage_preview');
                // 관리자 페이지로 돌아가기
                window.location.href = '/admin-unified';
              }}
              className="ml-4 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
            >
              미리보기 종료
            </button>
          </div>
        </div>
      )}
      
      <SEO
        title={t('seo.home.title', { fallback: '정호그룹 - 조명제어 전문기업' })}
        description={t('seo.home.description', { fallback: '40년 전통의 조명제어 전문기업으로, 클라러스, TLC, 일루테크, 텍스컴 등 계열사를 통해 혁신적인 솔루션을 제공합니다.' })}
        keywords={t('seo.home.keywords', { fallback: '정호그룹, 조명제어, 클라러스, TLC, 일루테크, 텍스컴, LED조명, 스마트조명' })}
      />
      
      <div>
        {/* 히어로 섹션 */}
        <section className="hero-section">
          <Hero 
            {...heroData} 
            useLocalStorage={false}
            useMultilingual={false}
          />
        </section>

        {/* 프로젝트 통계 설명 */}
        <section className="py-4 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-gray-600">
              * 완료 프로젝트는 1983년 창립 이래 누적 수치이며, 주요 프로젝트를 선별하여 순차적으로 등록하고 있습니다.
            </p>
          </div>
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
            <SubsidiariesIntro 
              subsidiaries={subsidiariesData.subsidiaries}
              subsidiariesIntro={subsidiariesData.subsidiariesIntro}
            />
          </div>
        </section>

        {/* 프로젝트 갤러리 섹션 */}
        <section className="section bg-neutral-50">
          <div className="container">
            <ProjectGallery
              galleryImages={optimizedImages.gallery || {}}
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

export default UnifiedHomePage;
