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
            {/* v2 라우트 (새 디자인) */}
            <Route path="/v2/*" element={
              <LayoutV2>
                <Routes>
                  <Route path="/" element={<HomePageV2 />} />
                  <Route path="/about" element={<div className="p-20 text-center">ABOUT 페이지 (준비 중)</div>} />
                  <Route path="/subsidiaries/*" element={<div className="p-20 text-center">계열사 페이지 (준비 중)</div>} />
                </Routes>
              </LayoutV2>
            } />

            {/* v1 라우트 (기존) */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<UnifiedHomePage />} />
                  <Route path="/old" element={<div>기존 홈페이지 임시 비활성화</div>} />
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
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;