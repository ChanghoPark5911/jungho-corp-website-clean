import React from 'react';
import Button from './Button';

const Hero = ({
  backgroundImage,
  mainCopy = "4개 계열사가 만드는\n완벽한 조명 생태계",
  subCopy = "4개 계열사를 활용하여 완벽한 조명 생태계를 달성합니다",
  stats = [],
  primaryAction,
  secondaryAction,
  className = '',
  enhancedSubtitle = false,
  enhancedOverlay = false,
  ...props
}) => {
  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center text-center text-white ${className}`}
      style={{
        background: backgroundImage 
          ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
          : 'linear-gradient(135deg, #166534 0%, #047857 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      {...props}
    >
             {/* 추가 배경 오버레이로 텍스트 가독성 향상 */}
       <div className={`absolute inset-0 ${enhancedOverlay ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-70'}`}></div>
       
       {/* 추가 텍스트 가독성을 위한 이중 오버레이 */}
       {enhancedOverlay && (
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
       )}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 메인 콘텐츠 */}
          <div className="mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
            {mainCopy.split('\n').map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p 
            className="hero-subtitle"
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
              lineHeight: '1.5',
              marginBottom: '2.5rem',
              maxWidth: '64rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
              color: '#ffffff !important',
              textShadow: '2px 2px 8px black',
              fontWeight: '600',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none'
            }}
          >
            {subCopy}
          </p>
          
          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryAction && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  if (primaryAction.onClick) {
                    primaryAction.onClick();
                  } else if (primaryAction.path) {
                    window.location.href = primaryAction.path;
                  }
                }}
                className="text-xl px-10 py-5 font-semibold"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  if (secondaryAction.onClick) {
                    secondaryAction.onClick();
                  } else if (secondaryAction.path) {
                    window.location.href = secondaryAction.path;
                  }
                }}
                className="text-xl px-10 py-5 font-semibold"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>

        {/* 통계 */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
                  {stat.value}
                  <span className="text-3xl md:text-4xl">{stat.suffix}</span>
                </div>
                <div className="text-lg md:text-xl text-white font-medium drop-shadow-md">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero; 