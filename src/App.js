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
const AboutPage = lazy(() => import('./pages/v2/AboutPage'));
const AboutIntroPage = lazy(() => import('./pages/v2/AboutIntroPage'));
const AboutVisionPage = lazy(() => import('./pages/v2/AboutVisionPage'));
const AboutManagementPage = lazy(() => import('./pages/v2/AboutManagementPage'));
const AboutHistoryPage = lazy(() => import('./pages/v2/AboutHistoryPage'));
const AboutLocationPage = lazy(() => import('./pages/v2/AboutLocationPage'));
const SubsidiariesPage = lazy(() => import('./pages/v2/SubsidiariesPage'));
const ClarusDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/ClarusDetailPage'));
const TlcDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/TlcDetailPage'));
const IllutechDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/IllutechDetailPage'));
const TexcomDetailPageV2 = lazy(() => import('./pages/v2/subsidiaries/TexcomDetailPage'));
const ProjectsPageV2 = lazy(() => import('./pages/v2/ProjectsPage'));
const MediaSNSPage = lazy(() => import('./pages/v2/MediaSNSPage'));
const MediaPromotionPage = lazy(() => import('./pages/v2/MediaPromotionPage'));
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
                  <Route path="/about/ci" element={<div className="p-20 text-center">CI/BI (준비 중)</div>} />
                  <Route path="/about/location" element={<AboutLocationPage />} />
                  <Route path="/subsidiaries" element={<SubsidiariesPage />} />
                  <Route path="/subsidiaries/clarus" element={<ClarusDetailPageV2 />} />
                  <Route path="/subsidiaries/tlc" element={<TlcDetailPageV2 />} />
                  <Route path="/subsidiaries/illutech" element={<IllutechDetailPageV2 />} />
                  <Route path="/subsidiaries/texcom" element={<TexcomDetailPageV2 />} />
                  <Route path="/projects" element={<ProjectsPageV2 />} />
                  <Route path="/media/sns" element={<MediaSNSPage />} />
                  <Route path="/media/promotion" element={<MediaPromotionPage />} />
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