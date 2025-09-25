// 성능 모니터링 유틸리티
export const performanceMonitor = {
// 페이지 로드 시간 측정
  measurePageLoad: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = window.performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      };
    }
    return null;
  },

  // 리소스 로딩 시간 측정
  measureResourceLoad: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const resources = window.performance.getEntriesByType('resource');
      return resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
        type: resource.initiatorType
      }));
    }
    return [];
  },

  // Core Web Vitals 측정
  measureWebVitals: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Web Vital:', entry.name, entry.value);
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  },

  // 메모리 사용량 측정
  measureMemory: () => {
    if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
      return {
        used: window.performance.memory.usedJSHeapSize,
        total: window.performance.memory.totalJSHeapSize,
        limit: window.performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }
};

// 성능 데이터를 Firebase에 저장
export const savePerformanceData = async (data) => {
  try {
    const { db } = await import('../config/firebase');
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    
    await addDoc(collection(db, 'performance'), {
      ...data,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  } catch (error) {
    console.error('성능 데이터 저장 실패:', error);
  }
};

// 초기 성능 측정
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined') {
    // 페이지 로드 완료 후 측정
    window.addEventListener('load', () => {
      setTimeout(() => {
        const pageLoadData = performanceMonitor.measurePageLoad();
        const resourceData = performanceMonitor.measureResourceLoad();
        const memoryData = performanceMonitor.measureMemory();
        
        if (pageLoadData) {
          savePerformanceData({
            type: 'page_load',
            data: pageLoadData,
            resources: resourceData,
            memory: memoryData
          });
        }
      }, 1000);
    });

    // Web Vitals 측정 시작
    performanceMonitor.measureWebVitals();
  }
}; 