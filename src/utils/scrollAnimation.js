import { useState, useEffect } from 'react';

// 스크롤 기반 애니메이션을 위한 Intersection Observer 유틸리티

export const initScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // 스크롤 애니메이션 클래스를 가진 요소들을 관찰
  const animatedElements = document.querySelectorAll(
    '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in'
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
};

// 페이지 로드 시 애니메이션을 위한 유틸리티
export const initPageLoadAnimations = () => {
  const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-in');
  
  elements.forEach((element, index) => {
    // Staggered 애니메이션 적용
    element.style.animationDelay = `${index * 0.1}s`;
  });
};

// 컴포넌트에서 사용할 수 있는 커스텀 훅
export const useScrollAnimation = (ref, animationClass = 'scroll-fade-in') => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current; // ref.current를 변수에 저장하여 ESLint 경고 해결
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return {
    className: `${animationClass} ${isVisible ? 'visible' : ''}`,
    isVisible
  };
};

// 애니메이션 클래스 유틸리티
export const getAnimationClass = (type = 'fade-in', delay = 0) => {
  const baseClasses = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'scale-in': 'animate-scale-in',
    'scroll-fade-in': 'scroll-fade-in',
    'scroll-slide-left': 'scroll-slide-left',
    'scroll-slide-right': 'scroll-slide-right',
    'scroll-scale-in': 'scroll-scale-in'
  };

  const staggerClasses = {
    0: '',
    1: 'animate-stagger-1',
    2: 'animate-stagger-2',
    3: 'animate-stagger-3',
    4: 'animate-stagger-4',
    5: 'animate-stagger-5'
  };

  return `${baseClasses[type] || baseClasses['fade-in']} ${staggerClasses[delay] || ''}`.trim();
}; 