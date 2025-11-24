import React from 'react';
import { useI18n } from '../../hooks/useI18n';

/**
 * 전통적 스타일의 작은 배너 컴포넌트
 * - 높이 500-600px
 * - 단순한 텍스트와 이미지
 * - 최소한의 애니메이션
 */
const SmallBanner = ({ 
  title, 
  subtitle, 
  description,
  ctaText,
  ctaLink,
  backgroundImage = '/images/banners/main-banner.jpg',
  height = '500px'
}) => {
  const { currentLanguage } = useI18n();

  // 한글 경로 URL 인코딩 처리
  const encodedBackgroundImage = backgroundImage 
    ? encodeURI(backgroundImage).replace(/\(/g, '%28').replace(/\)/g, '%29')
    : '';

  return (
    <div 
      className="relative bg-gray-100 dark:bg-gray-800 overflow-hidden border-b-4 border-blue-600 dark:border-blue-500"
      style={{ height }}
    >
      {/* 배경 이미지 (메인) - 매우 선명하게! ⭐ 부드러운 전환 효과 추가 */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90 dark:opacity-85 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url("${encodedBackgroundImage}")`,
          }}
        />
      )}
      
      {/* 단색 오버레이 - 매우 연하게 (텍스트 가독성용) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-800/25 dark:from-blue-950/40 dark:to-blue-900/35" />

      {/* 콘텐츠 - 배경 박스로 가독성 확보 ⭐ */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 text-center">
          {/* 텍스트 배경 박스 (어떤 배경에서도 읽기 쉽게) */}
          <div className="bg-gradient-to-b from-black/60 via-black/50 to-black/60 dark:from-black/70 dark:via-black/60 dark:to-black/70 backdrop-blur-sm rounded-2xl px-8 py-10 md:px-12 md:py-12 shadow-2xl border border-white/10">
            {/* 서브타이틀 */}
            {subtitle && (
              <p className="text-blue-200 dark:text-blue-300 text-sm md:text-base mb-4 uppercase tracking-wider font-medium">
                {subtitle}
              </p>
            )}

            {/* 메인 타이틀 */}
            <h1 
              className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight" 
              style={{ 
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.6)' 
              }}
            >
              {title || (currentLanguage === 'en' 
                ? 'JUNGHO Group - Creating the Future with Innovative Technology'
                : '정호그룹 - 혁신적인 기술로 더 나은 미래를 만듭니다'
              )}
            </h1>

            {/* 설명 */}
            {description && (
              <p 
                className="text-gray-100 dark:text-gray-200 text-base md:text-lg lg:text-xl mb-6 max-w-3xl mx-auto leading-relaxed" 
                style={{ 
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.7)' 
                }}
              >
                {description}
              </p>
            )}

            {/* CTA 버튼 (옵션) */}
            {ctaText && ctaLink && (
              <a
                href={ctaLink}
                className="inline-block px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {ctaText} →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 하단 장식 (옵션) */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 dark:from-blue-500 dark:via-blue-600 dark:to-blue-700" />
    </div>
  );
};

export default SmallBanner;

