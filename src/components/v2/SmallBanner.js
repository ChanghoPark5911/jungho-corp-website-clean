import React, { useState, useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';

/**
 * 기업용 Hero 배너 컴포넌트
 * - 고화질 배경 이미지 + 패럴랙스 효과
 * - 폰트 두께 대비를 통한 세련된 슬로건
 * - Glassmorphism 스타일 콘텐츠 박스
 */
const SmallBanner = ({ 
  title, 
  subtitle, 
  description,
  ctaText,
  ctaLink,
  onCtaClick,  // 클릭 핸들러 (해시 라우터 호환)
  backgroundImage = '/images/banners/main-banner.jpg',
  height = '500px',
  // 새로운 슬로건 옵션
  sloganLight,  // 얇은 폰트 부분
  sloganBold,   // 굵은 폰트 부분
}) => {
  const { currentLanguage } = useI18n();
  const [scrollY, setScrollY] = useState(0);

  // 패럴랙스 효과를 위한 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 한글 경로 URL 인코딩 처리
  const encodedBackgroundImage = backgroundImage 
    ? encodeURI(backgroundImage).replace(/\(/g, '%28').replace(/\)/g, '%29')
    : '';

  // 기본 슬로건 텍스트
  const defaultSloganLight = currentLanguage === 'en' ? '40 Years of Trust' : '40년의 신뢰';
  const defaultSloganBold = currentLanguage === 'en' ? 'Technology Lighting the Future' : '미래를 밝히는 기술';

  return (
    <div 
      className="relative bg-gray-900 overflow-hidden"
      style={{ height }}
    >
      {/* 배경 이미지 - 패럴랙스 효과 적용 */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-100"
          style={{
            backgroundImage: `url("${encodedBackgroundImage}")`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          }}
        />
      )}
      
      {/* 다층 오버레이 - 깊이감 있는 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-emerald-900/20" />
      
      {/* 빛 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* 콘텐츠 영역 */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-8 text-center">
          {/* Glassmorphism 콘텐츠 박스 */}
          <div 
            className="bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl px-10 py-14 md:px-16 md:py-16 shadow-2xl border border-white/20"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {/* 서브타이틀 - Since 1982 */}
            {subtitle && (
              <div className="mb-6">
                <span className="inline-block px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm md:text-base uppercase tracking-widest font-medium border border-white/30">
                  {subtitle}
                </span>
              </div>
            )}

            {/* 메인 슬로건 - 폰트 두께 대비 */}
            <h1 className="mb-8 leading-tight">
              {/* 얇은 폰트 - '40년의 신뢰' */}
              <span 
                className="block text-white/90 text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-3"
                style={{ 
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                  fontWeight: 300,
                }}
              >
                {sloganLight || defaultSloganLight}
              </span>
              {/* 굵은 폰트 - '미래를 밝히는 기술' */}
              <span 
                className="block text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.4)',
                  fontWeight: 800,
                }}
              >
                {sloganBold || defaultSloganBold}
              </span>
            </h1>

            {/* 커스텀 타이틀 (기존 호환성 유지) */}
            {title && !sloganLight && !sloganBold && (
              <h1 
                className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight" 
                style={{ 
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.6)' 
                }}
              >
                {title}
              </h1>
            )}

            {/* 설명 */}
            {description && (
              <p 
                className="text-white/85 text-base md:text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-light" 
                style={{ 
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' 
                }}
              >
                {description}
              </p>
            )}

            {/* CTA 버튼 - 클릭 핸들러 또는 링크 지원 */}
            {ctaText && (onCtaClick || ctaLink) && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (onCtaClick) {
                    onCtaClick();
                  } else if (ctaLink && ctaLink.startsWith('#')) {
                    // 해시 링크인 경우 스크롤
                    const targetId = ctaLink.replace('#', '');
                    const element = document.getElementById(targetId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else if (ctaLink) {
                    window.location.href = ctaLink;
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/95 text-gray-900 font-semibold rounded-xl hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group cursor-pointer"
              >
                {ctaText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>

      {/* 하단 그라데이션 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />
    </div>
  );
};

export default SmallBanner;

