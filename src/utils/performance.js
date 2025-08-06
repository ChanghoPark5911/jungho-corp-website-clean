// 성능 모니터링 유틸리티

// 페이지 로드 시간 측정
export const measurePageLoad = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      console.log(`페이지 로드 시간: ${loadTime}ms`);
      
      // Google Analytics나 다른 분석 도구로 전송
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'load',
          value: Math.round(loadTime)
        });
      }
    });
  }
};

// 컴포넌트 렌더링 시간 측정
export const measureComponentRender = (componentName) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`${componentName} 렌더링 시간: ${renderTime.toFixed(2)}ms`);
    
    // 느린 렌더링 경고
    if (renderTime > 16) { // 60fps 기준
      console.warn(`${componentName} 렌더링이 느립니다: ${renderTime.toFixed(2)}ms`);
    }
  };
};

// 메모리 사용량 모니터링
export const monitorMemoryUsage = () => {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = performance.memory;
    console.log('메모리 사용량:', {
      used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`
    });
  }
};

// 네트워크 요청 모니터링
export const monitorNetworkRequests = () => {
  if (typeof window !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
          console.log(`네트워크 요청: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }
};

// 스크롤 성능 모니터링
export const monitorScrollPerformance = () => {
  if (typeof window !== 'undefined') {
    let scrollCount = 0;
    let lastScrollTime = Date.now();
    
    const handleScroll = () => {
      scrollCount++;
      const now = Date.now();
      
      if (now - lastScrollTime > 1000) { // 1초마다 체크
        const scrollsPerSecond = scrollCount;
        console.log(`스크롤 성능: ${scrollsPerSecond} 스크롤/초`);
        
        if (scrollsPerSecond > 10) {
          console.warn('스크롤 성능이 저하되고 있습니다');
        }
        
        scrollCount = 0;
        lastScrollTime = now;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
};

// 초기화 함수
export const initPerformanceMonitoring = () => {
  measurePageLoad();
  monitorMemoryUsage();
  monitorNetworkRequests();
  monitorScrollPerformance();
}; 