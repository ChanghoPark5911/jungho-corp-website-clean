import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { initScrollAnimations, initPageLoadAnimations } from './utils/scrollAnimation';
import { initPerformanceMonitoring } from './utils/performance';
import { initAnalytics } from './utils/analytics';
import { initI18n } from './utils/i18n';

// 페이지 컴포넌트들을 lazy loading으로 import
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
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
const DesignSystem = lazy(() => import('./components/design-system/DesignSystem'));

// 로딩 컴포넌트
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

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
    
    // 컴포넌트 언마운트 시 observer 정리
    return () => {
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, []);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/clarus" element={<ClarusDetailPage />} />
            <Route path="/tlc" element={<TlcDetailPage />} />
            <Route path="/illutech" element={<IllutechDetailPage />} />
            <Route path="/texcom" element={<TexcomDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/design-system" element={<DesignSystem />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;