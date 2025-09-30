// 성능 모니터링 유틸리티
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.isEnabled = true; // 개발 환경에서도 활성화
    this.init();
  }

  init() {
    if (!this.isEnabled) return;

    console.log('🚀 성능 모니터링 초기화 시작');
    
    // 페이지 로딩 시간 측정
    this.measurePageLoad();
    
    // 사용자 상호작용 추적
    this.trackUserInteractions();
    
    // 오류 추적
    this.trackErrors();
    
    // 메모리 사용량 모니터링
    this.monitorMemoryUsage();
    
    console.log('✅ 성능 모니터링 초기화 완료');
  }

  // 페이지 로딩 시간 측정
  measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      this.metrics.pageLoad = {
        loadTime,
        domContentLoaded,
        timestamp: Date.now(),
        url: window.location.href
      };

      this.sendMetric('pageLoad', this.metrics.pageLoad);
    });
  }

  // 사용자 상호작용 추적
  trackUserInteractions() {
    // 클릭 이벤트 추적
    document.addEventListener('click', (event) => {
      const target = event.target;
      const interaction = {
        type: 'click',
        element: target.tagName,
        className: target.className,
        id: target.id,
        text: target.textContent?.substring(0, 50),
        timestamp: Date.now(),
        url: window.location.href
      };

      console.log('🖱️ 클릭 이벤트 감지:', interaction);
      this.sendMetric('interaction', interaction);
    });

    // 스크롤 이벤트 추적 (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollData = {
          type: 'scroll',
          scrollY: window.scrollY,
          scrollPercent: (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100,
          timestamp: Date.now(),
          url: window.location.href
        };

        console.log('📜 스크롤 이벤트 감지:', scrollData);
        this.sendMetric('scroll', scrollData);
      }, 1000);
    });
  }

  // 오류 추적
  trackErrors() {
    window.addEventListener('error', (event) => {
      const errorData = {
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: Date.now(),
        url: window.location.href
      };

      this.sendMetric('error', errorData);
    });

    window.addEventListener('unhandledrejection', (event) => {
      const errorData = {
        type: 'promise_rejection',
        reason: event.reason?.toString(),
        stack: event.reason?.stack,
        timestamp: Date.now(),
        url: window.location.href
      };

      this.sendMetric('error', errorData);
    });
  }

  // 메모리 사용량 모니터링
  monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const memoryData = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          timestamp: Date.now(),
          url: window.location.href
        };

        this.sendMetric('memory', memoryData);
      }, 30000); // 30초마다 체크
    }
  }

  // 메트릭 전송
  sendMetric(type, data) {
    if (!this.isEnabled) return;

    try {
      console.log(`📊 메트릭 전송: ${type}`, data);
      
      // Firebase Analytics로 전송 (향후 구현)
      if (window.gtag) {
        window.gtag('event', type, {
          custom_parameter: JSON.stringify(data)
        });
      }

      // 로컬 스토리지에 저장 (개발용)
      const stored = JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
      const newMetric = { type, data, timestamp: Date.now() };
      stored.push(newMetric);
      
      // 최대 100개 항목만 유지
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      
      localStorage.setItem('performanceMetrics', JSON.stringify(stored));
      
      console.log(`✅ 메트릭 저장 완료: ${type} (총 ${stored.length}개)`);
    } catch (error) {
      console.error('❌ Performance metric send error:', error);
    }
  }

  // 사용자 정의 이벤트 추적
  trackCustomEvent(eventName, properties = {}) {
    const eventData = {
      type: 'custom_event',
      eventName,
      properties,
      timestamp: Date.now(),
      url: window.location.href
    };

    this.sendMetric('custom', eventData);
  }

  // 페이지 뷰 추적
  trackPageView(pageName, properties = {}) {
    const pageData = {
      type: 'page_view',
      pageName,
      properties,
      timestamp: Date.now(),
      url: window.location.href
    };

    this.sendMetric('pageView', pageData);
  }

  // 성능 메트릭 가져오기
  getMetrics() {
    return this.metrics;
  }

  // 저장된 메트릭 가져오기
  getStoredMetrics() {
    try {
      return JSON.parse(localStorage.getItem('performanceMetrics') || '[]');
    } catch (error) {
      console.error('Error parsing stored metrics:', error);
      return [];
    }
  }

  // 메트릭 초기화
  clearMetrics() {
    localStorage.removeItem('performanceMetrics');
    this.metrics = {};
  }
}

// 싱글톤 인스턴스 생성
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
