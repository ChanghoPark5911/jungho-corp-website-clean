// Vercel Analytics 설정
export const analytics = {
  // 페이지 뷰 추적
  trackPageView: (url) => {
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', 'pageview', { url });
    }
  },

  // 이벤트 추적
  trackEvent: (eventName, properties = {}) => {
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', eventName, properties);
    }
  },

  // 사용자 행동 추적
  trackUserAction: (action, element) => {
    analytics.trackEvent('user_action', {
      action,
      element: element?.tagName || 'unknown',
      timestamp: Date.now()
    });
  },

  // 성능 메트릭 추적
  trackPerformance: (metricName, value, unit = 'ms') => {
    analytics.trackEvent('performance_metric', {
      metric: metricName,
      value,
      unit,
      timestamp: Date.now()
    });
  },

  // 에러 추적
  trackError: (error, context = {}) => {
    analytics.trackEvent('error', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now()
    });
  }
};

// 자동 이벤트 리스너 설정
export const setupAnalytics = () => {
  if (typeof window !== 'undefined') {
    // 클릭 이벤트 추적
    document.addEventListener('click', (event) => {
      const element = event.target;
      if (element.tagName === 'A' || element.tagName === 'BUTTON') {
        analytics.trackUserAction('click', element);
      }
    });

    // 폼 제출 추적
    document.addEventListener('submit', (event) => {
      analytics.trackUserAction('form_submit', event.target);
    });

    // 스크롤 추적 (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        analytics.trackEvent('scroll', {
          scrollY: window.scrollY,
          documentHeight: document.documentElement.scrollHeight
        });
      }, 1000);
    });

    // 에러 추적
    window.addEventListener('error', (event) => {
      analytics.trackError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Promise rejection 추적
    window.addEventListener('unhandledrejection', (event) => {
      analytics.trackError(new Error(event.reason), {
        type: 'unhandled_promise_rejection'
      });
    });
  }
};

// 초기화
export const initAnalytics = () => {
  setupAnalytics();
  
  // 페이지 로드 시 초기 추적
  analytics.trackPageView(window.location.pathname);
};
