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

// 성능 최적화 유틸리티

// 이미지 지연 로딩
export const lazyLoadImage = (imgElement, src) => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    imageObserver.observe(imgElement);
  } else {
    // 폴백: 즉시 로드
    imgElement.src = src;
  }
};

// 디바운스 함수
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// 스로틀 함수
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 메모이제이션
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

// 성능 측정
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} 실행 시간: ${end - start}ms`);
  return result;
};

// 리소스 프리로딩
export const preloadResource = (href, as = 'fetch') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// 스크롤 성능 최적화
export const optimizeScroll = (callback) => {
  let ticking = false;
  
  return (event) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(event);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// 메모리 누수 방지
export const cleanupEventListeners = (element, eventType, handler) => {
  if (element && element.removeEventListener) {
    element.removeEventListener(eventType, handler);
  }
};

// 이미지 최적화
export const optimizeImage = (src, width, quality = 80) => {
  // WebP 지원 확인
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
  
  if (supportsWebP) {
    return `${src}?w=${width}&q=${quality}&f=webp`;
  }
  
  return `${src}?w=${width}&q=${quality}`;
}; 