import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PerformanceDashboard from './components/PerformanceDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { initScrollAnimations, initPageLoadAnimations } from './utils/scrollAnimation';
import { initPerformanceMonitoring } from './utils/performance';
import { initAnalytics } from './utils/analytics';
import { initI18n } from './utils/i18n';
import performanceMonitor from './utils/performanceMonitor';

// 페이지 컴포넌트들을 lazy loading으로 import
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const UnifiedHomePage = lazy(() => import('./pages/UnifiedHomePage.jsx')); // Added
const BusinessPage = lazy(() => import('./pages/BusinessPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const NewsPage = lazy(() => import('./pages/NewsPage.jsx'));
const ClarusDetailPage = lazy(() => import('./pages/ClarusDetailPage'));
const TlcDetailPage = lazy(() => import('./pages/TlcDetailPage'));
const IllutechDetailPage = lazy(() => import('./pages/IllutechDetailPage'));
const TexcomDetailPage = lazy(() => import('./pages/TexcomDetailPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const AdminPage = lazy(() => import('./pages/AdminPageWithFirebase.jsx'));
const UnifiedAdminPage = lazy(() => import('./pages/UnifiedAdminPage.jsx')); // Added
const DesignSystem = lazy(() => import('./components/design-system/DesignSystem'));

// v2 페이지 및 레이아웃
const LayoutV2 = lazy(() => import('./components/v2/LayoutV2'));
const HomePageV2 = lazy(() => import('./pages/v2/HomePageV2'));
const HomePageClassic = lazy(() => import('./pages/v2/HomePageClassic')); // 전통적 스타일
const HomePageHybrid = lazy(() => import('./pages/v2/HomePageHybrid')); // 하이브리드 스타일
const AboutIntroHybrid = lazy(() => import('./pages/v2/AboutIntroHybrid')); // 하이브리드: 회사소개
const SubsidiariesListHybrid = lazy(() => import('./pages/v2/SubsidiariesListHybrid')); // 하이브리드: 계열사 목록
const ClarusDetailHybrid = lazy(() => import('./pages/v2/ClarusDetailHybrid')); // 하이브리드: 클라루스 상세
const TLCDetailHybrid = lazy(() => import('./pages/v2/TLCDetailHybrid')); // 하이브리드: 정호티엘씨 상세
const IllutechDetailHybrid = lazy(() => import('./pages/v2/IllutechDetailHybrid')); // 하이브리드: 일루텍 상세
const TexcomDetailHybrid = lazy(() => import('./pages/v2/TexcomDetailHybrid')); // 하이브리드: 정호텍스컴 상세
const AboutIntroClassic = lazy(() => import('./pages/v2/AboutIntroClassic')); // 클래식: 회사소개
const SubsidiariesListClassic = lazy(() => import('./pages/v2/SubsidiariesListClassic')); // 클래식: 계열사 목록
const ClarusDetailClassic = lazy(() => import('./pages/v2/ClarusDetailClassic')); // 클래식: 클라루스 상세
const TLCDetailClassic = lazy(() => import('./pages/v2/TLCDetailClassic')); // 클래식: 정호티엘씨 상세
const IllutechDetailClassic = lazy(() => import('./pages/v2/IllutechDetailClassic')); // 클래식: 일루텍 상세
const TexcomDetailClassic = lazy(() => import('./pages/v2/TexcomDetailClassic')); // 클래식: 정호텍스컴 상세
const AboutPageHybrid = lazy(() => import('./pages/v2/AboutPageHybrid')); // 하이브리드: About 허브 페이지
const AboutPageClassic = lazy(() => import('./pages/v2/AboutPageClassic')); // 클래식: About 허브 페이지
const AboutVisionHybrid = lazy(() => import('./pages/v2/AboutVisionHybrid')); // 하이브리드: 그룹비전
const AboutManagementHybrid = lazy(() => import('./pages/v2/AboutManagementHybrid')); // 하이브리드: 경영방침
const BusinessPageHybrid = lazy(() => import('./pages/v2/BusinessPageHybrid')); // 하이브리드: 사업분야
const MediaPageHybrid = lazy(() => import('./pages/v2/MediaPageHybrid')); // 하이브리드: 미디어센터
const ProjectsPageHybrid = lazy(() => import('./pages/v2/ProjectsPageHybrid')); // 하이브리드: 프로젝트
const AboutPage = lazy(() => import('./pages/v2/AboutPage'));
const AboutIntroPage = lazy(() => import('./pages/v2/AboutIntroPage'));
const AboutVisionPage = lazy(() => import('./pages/v2/AboutVisionPage'));
const AboutManagementPage = lazy(() => import('./pages/v2/AboutManagementPage'));
const AboutHistoryPage = lazy(() => import('./pages/v2/AboutHistoryPage'));
const AboutCIBIPage = lazy(() => import('./pages/v2/AboutCIBIPage'));
const AboutLocationPage = lazy(() => import('./pages/v2/AboutLocationPage'));
const SubsidiariesPage = lazy(() => import('./pages/v2/SubsidiariesPage'));
const ClarusDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/ClarusDetailPage'));
const TlcDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/TlcDetailPage'));
const IllutechDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/IllutechDetailPage'));
const TexcomDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/TexcomDetailPage'));
const ProjectsPageV2 = lazy(() => import('./pages/v2/ProjectsPage'));
const MediaSNSPage = lazy(() => import('./pages/v2/MediaSNSPage'));
const MediaPromotionPage = lazy(() => import('./pages/v2/MediaPromotionPage'));
const MediaTechnicalDocsPage = lazy(() => import('./pages/v2/MediaTechnicalDocsPage'));
const SupportPageV2 = lazy(() => import('./pages/v2/SupportPage'));
const AdminPageV2 = lazy(() => import('./pages/v2/AdminPageV2'));

// 로딩 컴포넌트
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// 페이지 전환 시 스크롤을 맨 위로 이동
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  // 애니메이션 및 성능 모니터링 초기화
  useEffect(() => {
    // i18n 초기화
    initI18n();
    
    // 페이지 로드 애니메이션 초기화
    initPageLoadAnimations();
    
    // 스크롤 애니메이션 초기화
    const scrollObserver = initScrollAnimations();
    
    // 성능 모니터링 초기화
    initPerformanceMonitoring();
    
    // Analytics 초기화
    initAnalytics();
    
    // 성능 모니터링 시작
    performanceMonitor.trackPageView('App', { 
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language
    });
    
    // 컴포넌트 언마운트 시 observer 정리
    return () => {
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* v2 관리자 페이지 (레이아웃 없음) - 최우선 */}
            <Route path="/admin" element={<AdminPageV2 />} />
            <Route path="/v2/admin" element={<AdminPageV2 />} />
            
            {/* 클래식 버전 (전통적 스타일) - 레이아웃 없음 ⭐ */}
            <Route path="/classic" element={<HomePageClassic />} />
            
            {/* 하이브리드 버전 (전통 구조 + 현대 디자인) 🎨 */}
            <Route path="/hybrid" element={<HomePageHybrid />} />
            <Route path="/hybrid/about" element={<AboutPageHybrid />} />
            <Route path="/hybrid/about/intro" element={<AboutIntroHybrid />} />
            <Route path="/hybrid/about/vision" element={<AboutVisionHybrid />} />
            <Route path="/hybrid/about/management" element={<AboutManagementHybrid />} />
            <Route path="/hybrid/about/history" element={<AboutHistoryPage />} />
            <Route path="/hybrid/about/cibi" element={<AboutCIBIPage />} />
            <Route path="/hybrid/about/location" element={<AboutLocationPage />} />
            <Route path="/hybrid/business" element={<BusinessPageHybrid />} />
            <Route path="/hybrid/media" element={<MediaPageHybrid />} />
            <Route path="/hybrid/media/news" element={<NewsPage />} />
            <Route path="/hybrid/projects" element={<ProjectsPageHybrid />} />
            <Route path="/hybrid/subsidiaries" element={<SubsidiariesListHybrid />} />
            <Route path="/hybrid/subsidiaries/clarus" element={<ClarusDetailHybrid />} />
            <Route path="/hybrid/subsidiaries/jungho-tlc" element={<TLCDetailHybrid />} />
            <Route path="/hybrid/subsidiaries/illutech" element={<IllutechDetailHybrid />} />
            <Route path="/hybrid/subsidiaries/jungho-texcom" element={<TexcomDetailHybrid />} />
            
            <Route path="/classic/about" element={<AboutPageClassic />} />
            <Route path="/classic/about/intro" element={<AboutIntroClassic />} />
            <Route path="/classic/about/vision" element={<AboutVisionPage />} />
            <Route path="/classic/about/management" element={<AboutManagementPage />} />
            <Route path="/classic/about/history" element={<AboutHistoryPage />} />
            <Route path="/classic/about/cibi" element={<AboutCIBIPage />} />
            <Route path="/classic/about/location" element={<AboutLocationPage />} />
            <Route path="/classic/business" element={<BusinessPage />} />
            <Route path="/classic/media" element={<MediaPageHybrid />} />
            <Route path="/classic/projects" element={<ProjectsPage />} />
            <Route path="/classic/subsidiaries" element={<SubsidiariesListClassic />} />
            <Route path="/classic/subsidiaries/clarus" element={<ClarusDetailClassic />} />
            <Route path="/classic/subsidiaries/jungho-tlc" element={<TLCDetailClassic />} />
            <Route path="/classic/subsidiaries/illutech" element={<IllutechDetailClassic />} />
            <Route path="/classic/subsidiaries/jungho-texcom" element={<TexcomDetailClassic />} />
            
            {/* v1 라우트 (이전 버전) */}
            <Route path="/v1/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<UnifiedHomePage />} />
                  <Route path="/business" element={<BusinessPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/clarus" element={<ClarusDetailPage />} />
                  <Route path="/tlc" element={<TlcDetailPage />} />
                  <Route path="/illutech" element={<IllutechDetailPage />} />
                  <Route path="/texcom" element={<TexcomDetailPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/admin" element={<UnifiedAdminPage />} />
                  <Route path="/admin-old" element={<AdminPage />} />
                  <Route path="/design-system" element={<DesignSystem />} />
                </Routes>
                <PWAInstallPrompt />
              </Layout>
            } />

            {/* v2 라우트 (메인) - 이제 기본 경로 */}
            <Route path="/*" element={
              <LayoutV2>
                <Routes>
                  <Route path="/" element={<HomePageV2 />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/about/intro" element={<AboutIntroPage />} />
                  <Route path="/about/vision" element={<AboutVisionPage />} />
                  <Route path="/about/management" element={<AboutManagementPage />} />
                  <Route path="/about/history" element={<AboutHistoryPage />} />
                  <Route path="/about/ci" element={<AboutCIBIPage />} />
                  <Route path="/about/location" element={<AboutLocationPage />} />
                  <Route path="/subsidiaries" element={<SubsidiariesPage />} />
                  <Route path="/subsidiaries/clarus" element={<ClarusDetailPageV2 />} />
                  <Route path="/subsidiaries/tlc" element={<TlcDetailPageV2 />} />
                  <Route path="/subsidiaries/illutech" element={<IllutechDetailPageV2 />} />
                  <Route path="/subsidiaries/texcom" element={<TexcomDetailPageV2 />} />
                  <Route path="/projects" element={<ProjectsPageV2 />} />
                  <Route path="/media/sns" element={<MediaSNSPage />} />
                  <Route path="/media/promotion" element={<MediaPromotionPage />} />
                  <Route path="/media/technical-docs" element={<MediaTechnicalDocsPage />} />
                  <Route path="/support" element={<SupportPageV2 />} />
                  <Route path="/support/report" element={<SupportPageV2 />} />
                  <Route path="/support/contact" element={<SupportPageV2 />} />
                </Routes>
              </LayoutV2>
            } />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;