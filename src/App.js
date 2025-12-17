import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PerformanceDashboard from './components/PerformanceDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
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
const TermsPage = lazy(() => import('./pages/TermsPage'));
const AdminPage = lazy(() => import('./pages/AdminPageWithFirebase.jsx'));
const UnifiedAdminPage = lazy(() => import('./pages/UnifiedAdminPage.jsx')); // Added
const DesignSystem = lazy(() => import('./components/design-system/DesignSystem'));

// v2 페이지 및 레이아웃
const LayoutV2 = lazy(() => import('./components/v2/LayoutV2'));
const HybridLayout = lazy(() => import('./components/v2/HybridLayout')); // Hybrid Layout (MegaMenu + No Sidebar)
const HomePageV2 = lazy(() => import('./pages/v2/HomePageV2'));
const HomePageClassic = lazy(() => import('./pages/v2/HomePageClassic')); // 전통적 스타일
const HomePageHybrid = lazy(() => import('./pages/v2/HomePageHybrid')); // 하이브리드 스타일 (홈페이지만 유지)
const AboutIntroClassic = lazy(() => import('./pages/v2/AboutIntroClassic')); // 클래식: 회사소개
const ClarusDetailClassic = lazy(() => import('./pages/v2/ClarusDetailClassic')); // 클래식: 클라루스 상세
const TLCDetailClassic = lazy(() => import('./pages/v2/TLCDetailClassic')); // 클래식: 정호티엘씨 상세
const IllutechDetailClassic = lazy(() => import('./pages/v2/IllutechDetailClassic')); // 클래식: 일루텍 상세
const TexcomDetailClassic = lazy(() => import('./pages/v2/TexcomDetailClassic')); // 클래식: 정호텍스컴 상세
const AboutPageClassic = lazy(() => import('./pages/v2/AboutPageClassic')); // 클래식: About 허브 페이지
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
const TexcomRssPage = lazy(() => import('./pages/v2/subsidiaries/TexcomRssPage')); // RSS 사업부
const TexcomTextilePage = lazy(() => import('./pages/v2/subsidiaries/TexcomTextilePage')); // 섬유기계 사업부
const ProjectsPageV2 = lazy(() => import('./pages/v2/ProjectsPage'));
const MediaSNSPage = lazy(() => import('./pages/v2/MediaSNSPage'));
const MediaPromotionPage = lazy(() => import('./pages/v2/MediaPromotionPage'));
const MediaTechnicalDocsPage = lazy(() => import('./pages/v2/MediaTechnicalDocsPage'));
const IntellectualPropertyPage = lazy(() => import('./pages/v2/IntellectualPropertyPage'));
const SupportPageV2 = lazy(() => import('./pages/v2/SupportPage'));
const AdminPageV2 = lazy(() => import('./pages/v2/AdminPageV2'));

// 새 관리자 시스템 (Phase 1)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminTest = lazy(() => import('./pages/admin/AdminTest'));
const MediaManager = lazy(() => import('./pages/admin/MediaManager'));
const SupportManager = lazy(() => import('./pages/admin/SupportManager'));
const I18nManager = lazy(() => import('./pages/admin/I18nManager'));

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
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* 루트 경로는 Hybrid 버전으로 리다이렉트 */}
              <Route path="/" element={<Navigate to="/hybrid" replace />} />
            
            {/* 
              ===================================
              통합 관리자 시스템
              ===================================
              /admin: 통합 관리자 대시보드
              - 홈페이지 관리, 미디어/PR, 고객센터, 다국어, 사용자 관리 통합
              - 역할별 접근 권한 자동 필터링
              ===================================
            */}
            <Route path="/admin" element={<AdminPageV2 />} />
            <Route path="/v2/admin" element={<AdminPageV2 />} />
            
            {/* 기존 admin-new 경로들은 /admin으로 리다이렉트 (하위 호환성) */}
            <Route path="/admin-new/test" element={<Suspense fallback={<PageLoader />}><AdminTest /></Suspense>} />
            <Route path="/admin-new/login" element={<Navigate to="/admin" replace />} />
            <Route path="/admin-new/dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="/admin-new/media" element={<Navigate to="/admin" replace />} />
            <Route path="/admin-new/support" element={<Navigate to="/admin" replace />} />
            <Route path="/admin-new/i18n" element={<Navigate to="/admin" replace />} />
            <Route path="/admin-new" element={<Navigate to="/admin" replace />} />
            
            {/* V2 버전 (모던 MegaMenu 스타일) 🚀 */}
            <Route path="/v2" element={<Suspense fallback={<PageLoader />}><LayoutV2><HomePageV2 /></LayoutV2></Suspense>} />
            <Route path="/v2/projects" element={<Suspense fallback={<PageLoader />}><LayoutV2><ProjectsPageV2 /></LayoutV2></Suspense>} />
            <Route path="/v2/about" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutPage /></LayoutV2></Suspense>} />
            <Route path="/v2/about/intro" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutIntroPage /></LayoutV2></Suspense>} />
            <Route path="/v2/about/vision" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutVisionPage /></LayoutV2></Suspense>} />
            <Route path="/v2/about/management" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutManagementPage /></LayoutV2></Suspense>} />
            <Route path="/v2/about/history" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutHistoryPage /></LayoutV2></Suspense>} />
            <Route path="/v2/about/ci" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutCIBIPage /></LayoutV2></Suspense>} />
            <Route path="/v2/about/cibi" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutCIBIPage /></LayoutV2></Suspense>} />
            <Route path="/v2/about/location" element={<Suspense fallback={<PageLoader />}><LayoutV2><AboutLocationPage /></LayoutV2></Suspense>} />
            <Route path="/v2/subsidiaries" element={<Suspense fallback={<PageLoader />}><LayoutV2><SubsidiariesPage /></LayoutV2></Suspense>} />
            <Route path="/v2/subsidiaries/clarus" element={<Suspense fallback={<PageLoader />}><LayoutV2><ClarusDetailPageV2 /></LayoutV2></Suspense>} />
            <Route path="/v2/subsidiaries/jungho-tlc" element={<Suspense fallback={<PageLoader />}><LayoutV2><TlcDetailPageV2 /></LayoutV2></Suspense>} />
            <Route path="/v2/subsidiaries/illutech" element={<Suspense fallback={<PageLoader />}><LayoutV2><IllutechDetailPageV2 /></LayoutV2></Suspense>} />
            <Route path="/v2/subsidiaries/jungho-texcom" element={<Suspense fallback={<PageLoader />}><LayoutV2><TexcomDetailPageV2 /></LayoutV2></Suspense>} />
            <Route path="/v2/subsidiaries/jungho-texcom/rss" element={<Suspense fallback={<PageLoader />}><LayoutV2><TexcomRssPage /></LayoutV2></Suspense>} />
            <Route path="/v2/subsidiaries/jungho-texcom/textile" element={<Suspense fallback={<PageLoader />}><LayoutV2><TexcomTextilePage /></LayoutV2></Suspense>} />
            <Route path="/v2/media" element={<Suspense fallback={<PageLoader />}><LayoutV2><MediaPageHybrid /></LayoutV2></Suspense>} />
            <Route path="/v2/media/promotion" element={<Suspense fallback={<PageLoader />}><LayoutV2><MediaPromotionPage /></LayoutV2></Suspense>} />
            <Route path="/v2/media/sns" element={<Suspense fallback={<PageLoader />}><LayoutV2><MediaSNSPage /></LayoutV2></Suspense>} />
            <Route path="/v2/media/technical-docs" element={<Suspense fallback={<PageLoader />}><LayoutV2><MediaTechnicalDocsPage /></LayoutV2></Suspense>} />
            <Route path="/v2/media/intellectual-property" element={<Suspense fallback={<PageLoader />}><LayoutV2><IntellectualPropertyPage /></LayoutV2></Suspense>} />
            <Route path="/v2/support" element={<Suspense fallback={<PageLoader />}><LayoutV2><SupportPageV2 /></LayoutV2></Suspense>} />
            <Route path="/v2/support/contact" element={<Suspense fallback={<PageLoader />}><LayoutV2><SupportPageV2 /></LayoutV2></Suspense>} />
            
            {/* 클래식 버전 (전통적 스타일) - 레이아웃 없음 ⭐ */}
            <Route path="/classic" element={<HomePageClassic />} />
            
            {/* 하이브리드 버전 (전통 구조 + 현대 디자인) 🎨 */}
            {/* Hybrid 버전: V2 페이지를 HybridLayout으로 감싸서 재활용 */}
            <Route path="/hybrid" element={<HomePageHybrid />} />
            <Route path="/hybrid/about" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/about/intro" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutIntroPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/about/vision" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutVisionPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/about/management" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutManagementPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/about/history" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutHistoryPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/about/ci" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutCIBIPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/about/cibi" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutCIBIPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/about/location" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><AboutLocationPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/business" element={<BusinessPageHybrid />} />
            <Route path="/hybrid/media" element={<MediaPageHybrid />} />
            <Route path="/hybrid/media/news" element={<NewsPage />} />
            <Route path="/hybrid/projects" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><ProjectsPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/media/promotion" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><MediaPromotionPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/media/technical-docs" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><MediaTechnicalDocsPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/media/sns" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><MediaSNSPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/media/intellectual-property" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><IntellectualPropertyPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/support" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><SupportPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/support/report" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><SupportPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/support/contact" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><SupportPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/subsidiaries" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><SubsidiariesPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/subsidiaries/clarus" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><ClarusDetailPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/subsidiaries/jungho-tlc" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><TlcDetailPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/subsidiaries/illutech" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><IllutechDetailPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/subsidiaries/jungho-texcom" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><TexcomDetailPageV2 /></HybridLayout></Suspense>} />
            <Route path="/hybrid/subsidiaries/jungho-texcom/rss" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><TexcomRssPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/subsidiaries/jungho-texcom/textile" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><TexcomTextilePage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/privacy" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><PrivacyPage /></HybridLayout></Suspense>} />
            <Route path="/hybrid/terms" element={<Suspense fallback={<PageLoader />}><HybridLayout version="hybrid"><TermsPage /></HybridLayout></Suspense>} />
            
            <Route path="/classic/about" element={<AboutPageClassic />} />
            <Route path="/classic/about/intro" element={<AboutIntroClassic />} />
            <Route path="/classic/about/vision" element={<AboutVisionPage />} />
            <Route path="/classic/about/management" element={<AboutManagementPage />} />
            <Route path="/classic/about/history" element={<AboutHistoryPage />} />
            <Route path="/classic/about/cibi" element={<AboutCIBIPage />} />
            <Route path="/classic/about/location" element={<AboutLocationPage />} />
            <Route path="/classic/business" element={<BusinessPage />} />
            <Route path="/classic/media" element={<MediaPageHybrid />} />
            <Route path="/classic/media/promotion" element={<Suspense fallback={<PageLoader />}><MediaPromotionPage /></Suspense>} />
            <Route path="/classic/media/technical-docs" element={<Suspense fallback={<PageLoader />}><MediaTechnicalDocsPage /></Suspense>} />
            <Route path="/classic/media/sns" element={<Suspense fallback={<PageLoader />}><MediaSNSPage /></Suspense>} />
            <Route path="/classic/projects" element={<ProjectsPage />} />
            <Route path="/classic/subsidiaries" element={<SubsidiariesPage />} />
            <Route path="/classic/subsidiaries/clarus" element={<ClarusDetailClassic />} />
            <Route path="/classic/subsidiaries/jungho-tlc" element={<TLCDetailClassic />} />
            <Route path="/classic/subsidiaries/illutech" element={<IllutechDetailClassic />} />
            <Route path="/classic/subsidiaries/jungho-texcom" element={<TexcomDetailClassic />} />
            <Route path="/classic/support" element={<SupportPageV2 />} />
            
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
                  <Route path="/subsidiaries/jungho-tlc" element={<TlcDetailPageV2 />} />
                  <Route path="/subsidiaries/illutech" element={<IllutechDetailPageV2 />} />
                  <Route path="/subsidiaries/jungho-texcom" element={<TexcomDetailPageV2 />} />
                  <Route path="/subsidiaries/jungho-texcom/rss" element={<TexcomRssPage />} />
                  <Route path="/subsidiaries/jungho-texcom/textile" element={<TexcomTextilePage />} />
                  <Route path="/projects" element={<ProjectsPageV2 />} />
                  <Route path="/media" element={<MediaPageHybrid />} />
                  <Route path="/media/sns" element={<MediaSNSPage />} />
                  <Route path="/media/promotion" element={<MediaPromotionPage />} />
                  <Route path="/media/technical-docs" element={<MediaTechnicalDocsPage />} />
                  <Route path="/support" element={<SupportPageV2 />} />
                  <Route path="/support/report" element={<SupportPageV2 />} />
                  <Route path="/support/contact" element={<SupportPageV2 />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                </Routes>
              </LayoutV2>
            } />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;