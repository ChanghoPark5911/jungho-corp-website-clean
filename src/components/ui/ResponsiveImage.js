import React, { useState, useEffect, useRef } from 'react';

const ResponsiveImage = ({ 
  src,
  alt,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  aspectRatio = 'auto',
  objectFit = 'cover',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YWFhYSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==',
  webpSrc,
  srcSet,
  webpSrcSet,
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imageRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer 설정
  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // 50px 전에 미리 로드
        threshold: 0.1
      }
    );

    observerRef.current = observer;

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // 이미지 로드 상태 초기화
  useEffect(() => {
    if (shouldLoad) {
      setIsLoaded(false);
      setHasError(false);
    }
  }, [shouldLoad, src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const aspectRatioClasses = {
    'auto': '',
    'square': 'aspect-square',
    'video': 'aspect-video',
    'portrait': 'aspect-[3/4]',
    'landscape': 'aspect-[4/3]',
    'wide': 'aspect-[16/9]',
    'ultrawide': 'aspect-[21/9]',
  };

  const objectFitClasses = {
    'cover': 'object-cover',
    'contain': 'object-contain',
    'fill': 'object-fill',
    'none': 'object-none',
    'scale-down': 'object-scale-down',
  };

  // 반응형 이미지 소스셋 생성
  const generateSrcSet = (baseSrc, format = '') => {
    if (srcSet) return srcSet;
    
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${baseSrc}?w=${size}${format ? `&f=${format}` : ''} ${size}w`)
      .join(', ');
  };

  // WebP 소스셋 생성
  const webpSrcSetValue = webpSrcSet || generateSrcSet(webpSrc || src, 'webp');
  const jpegSrcSetValue = srcSet || generateSrcSet(src);

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}
    >
      {/* 스켈레톤 로딩 */}
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
        </div>
      )}
      
      {/* 플레이스홀더 */}
      {!shouldLoad && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full ${objectFitClasses[objectFit]} transition-opacity duration-300`}
          style={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}
      
      {/* WebP 이미지 (지원하는 브라우저용) */}
      {shouldLoad && webpSrc && (
        <picture>
          <source
            type="image/webp"
            srcSet={webpSrcSetValue}
            sizes={sizes}
          />
          <img
            src={src}
            alt={alt}
            loading={loading}
            srcSet={jpegSrcSetValue}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className={`
              w-full h-full
              ${objectFitClasses[objectFit]}
              transition-opacity duration-300
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            {...props}
          />
        </picture>
      )}
      
      {/* 일반 이미지 (WebP 미지원 브라우저용) */}
      {shouldLoad && !webpSrc && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          srcSet={jpegSrcSetValue}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full
            ${objectFitClasses[objectFit]}
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          {...props}
        />
      )}
      
      {/* 에러 상태 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs md:text-sm">이미지를 불러올 수 없습니다</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage; 