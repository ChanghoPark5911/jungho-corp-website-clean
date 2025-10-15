import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { useI18n } from '../../hooks/useI18n';

const GroupIntro = ({
  title,
  content = [],
  image,
  webpImage,
  actionButton,
  className = '',
  ...props
}) => {
  const { t, currentLanguage } = useI18n(); // 다국어 지원
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 제목: 한국어일 때만 props 우선, 다른 언어는 i18n 사용
  const displayTitle = React.useMemo(() => {
    if (currentLanguage === 'ko' && title) {
      return title;
    }
    return t('home.group.title') || title || '40년 전통의 조명제어 전문기업';
  }, [currentLanguage, title, t]);
  
  // 내용: 한국어일 때만 props 우선, 다른 언어는 i18n 사용
  const displayContent = React.useMemo(() => {
    // 한국어가 아니거나, props content가 없으면 i18n 사용
    if (currentLanguage !== 'ko' || !content || content.length === 0) {
      const para1 = t('home.group.para1');
      const para2 = t('home.group.para2');
      const para3 = t('home.group.para3');
      
      // i18n에서 가져온 데이터가 있으면 사용
      if (para1 || para2 || para3) {
        return [para1, para2, para3].filter(Boolean);
      }
    }
    
    // 한국어이고 props content가 있으면 사용
    if (currentLanguage === 'ko' && content && content.length > 0) {
      return content;
    }
    
    // 폴백: 기본 한국어 텍스트
    return [
      '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
      'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
      '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
    ];
  }, [currentLanguage, content, t]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 액션 버튼 클릭 핸들러
  const handleActionClick = () => {
    if (actionButton && actionButton.onClick) {
      actionButton.onClick();
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`group-intro-section py-16 lg:py-24 bg-white dark:bg-gray-900 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* 좌측: 텍스트 콘텐츠 */}
          <div className="space-y-8">
            {/* 제목 */}
            <h2 
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              {(() => {
                const title = t('home.group.title', { fallback: displayTitle });
                // \n을 실제 줄바꿈으로 변환
                const processedTitle = title.replace(/\\n/g, '\n');
                return processedTitle.split('\n').map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ));
              })()}
            </h2>
            
            {/* 내용 */}
            <div 
              className={`space-y-6 text-lg text-gray-700 dark:text-gray-100 leading-relaxed transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              {displayContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {/* 액션 버튼 */}
            {actionButton && (
              <div 
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: '0.4s' }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleActionClick}
                  className="text-lg px-8 py-4"
                >
                  {actionButton.label}
                </Button>
              </div>
            )}
          </div>
          
          {/* 우측: 이미지 */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* 메인 이미지 */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} 
                alt="정호그룹 회사 건물" 
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupIntro;
