import React, { useState, useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// Swiper 스타일
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

/**
 * v2 Hero Section 컴포넌트
 * 롯데그룹 스타일의 풀스크린 히어로 섹션
 * 
 * @param {string} backgroundImage - 배경 이미지 URL (단일)
 * @param {Array} backgroundImages - 배경 이미지 URL 배열 (슬라이더)
 * @param {string} backgroundVideo - 배경 비디오 URL (선택)
 * @param {string} title - 메인 타이틀
 * @param {string} subtitle - 서브 타이틀
 * @param {string} description - 설명 텍스트
 * @param {Array} actions - CTA 버튼들
 * @param {boolean} showScrollIndicator - 스크롤 인디케이터 표시 여부
 * @param {string} overlay - 오버레이 스타일 ('dark', 'light', 'green', 'none')
 * @param {string} height - 높이 ('full', 'large', 'medium', 'small')
 * @param {number} autoplayDelay - 슬라이더 자동재생 딜레이 (ms, 기본 5000)
 */
const HeroSection = ({
  backgroundImage,
  backgroundImages = [],
  backgroundVideo,
  title,
  subtitle,
  description,
  actions = [],
  showScrollIndicator = true,
  overlay = 'dark',
  height = 'full',
  textAlign = 'center',
  autoplayDelay = 5000,
  className = '',
}) => {
  const { t } = useI18n();
  
  // 슬라이더 사용 여부 결정
  const useSlider = backgroundImages.length > 1;
  const images = useSlider ? backgroundImages : (backgroundImage ? [backgroundImage] : []);

  // 높이 클래스
  const heightClasses = {
    full: 'h-screen min-h-[600px]',
    large: 'h-[80vh] min-h-[500px]',
    medium: 'h-[60vh] min-h-[400px]',
    small: 'h-[40vh] min-h-[300px]',
  };

  // 오버레이 클래스
  const overlayClasses = {
    dark: 'bg-black/40',
    light: 'bg-white/60',
    green: 'bg-primary-900/50',
    blue: 'bg-blue-900/50', // 옅은 청색 오버레이
    lightBlue: 'bg-blue-600/40', // 더 밝은 청색
    gradient: 'bg-gradient-to-b from-black/50 via-black/30 to-black/50',
    blueGradient: 'bg-gradient-to-b from-blue-900/60 via-blue-800/40 to-blue-900/60', // 청색 그라데이션
    none: '',
  };

  // 텍스트 정렬 클래스
  const textAlignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <section
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden ${className}`}
      style={{ marginTop: '0' }}
    >
      {/* 배경 비디오 (있는 경우) */}
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* 배경 이미지 슬라이더 (비디오가 없는 경우) */}
      {!backgroundVideo && images.length > 0 && (
        <>
          {useSlider ? (
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              autoplay={{
                delay: autoplayDelay,
                disableOnInteraction: false,
              }}
              loop={true}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-white !opacity-50',
                bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100',
              }}
              className="absolute inset-0 w-full h-full"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${images[0]})` }}
            />
          )}
        </>
      )}

      {/* 오버레이 */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      )}

      {/* 컨텐츠 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${textAlignClasses[textAlign]} space-y-6 animate-fade-in`}>
          {/* 서브타이틀 */}
          {subtitle && (
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-primary-300 tracking-wide">
              {subtitle}
            </p>
          )}

          {/* 메인 타이틀 */}
          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          )}

          {/* 설명 */}
          {description && (
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              {description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < description.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          )}

          {/* CTA 버튼들 */}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-4">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`
                    px-8 py-4 rounded-lg font-semibold text-lg
                    transition-all duration-300 transform hover:scale-105
                    ${
                      action.variant === 'primary'
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                        : action.variant === 'secondary'
                        ? 'bg-white hover:bg-gray-100 text-primary-600 shadow-lg hover:shadow-xl'
                        : 'border-2 border-white hover:bg-white hover:text-primary-600 text-white'
                    }
                  `}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-slow">
          <div className="flex flex-col items-center space-y-2 text-white">
            <span className="text-sm font-medium tracking-wider">SCROLL</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

