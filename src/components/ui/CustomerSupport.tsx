import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Button from './Button';

// 타입 정의
interface Channel {
  title: string;
  description: string;
  contact?: string;
  hours?: string;
  action?: {
    label: string;
    onClick?: () => void;
    path?: string;
  };
  icon: React.ReactNode;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface CtaButton {
  label?: string;
  onClick?: () => void;
  path?: string;
}

interface CustomerSupportProps {
  title?: string;
  channels?: Channel[];
  features?: Feature[];
  ctaButton?: CtaButton;
  className?: string;
  [key: string]: any;
}

const CustomerSupport = React.memo(({
  title = "언제나 함께하는 든든한 파트너",
  channels = [],
  features = [],
  ctaButton = {},
  className = '',
  ...props
}: CustomerSupportProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // 기본 채널 데이터 (channels가 전달되지 않았을 때 사용)
  const defaultChannels: Channel[] = useMemo(() => [
    {
      title: "전화 상담",
      description: "전문 엔지니어가 직접 답변드립니다",
      contact: "1588-1234",
      hours: "평일 09:00-18:00",
      action: {
        label: "전화하기",
        onClick: () => window.location.href = "tel:1588-1234"
      },
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: "이메일 문의",
      description: "상세한 기술 문의사항을 보내주세요",
      contact: "support@jungho.com",
      hours: "24시간 접수 가능",
      action: {
        label: "이메일 보내기",
        onClick: () => window.location.href = "mailto:support@jungho.com"
      },
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "카카오톡",
      description: "실시간 채팅으로 빠른 답변을 받으세요",
      contact: "@정호그룹",
      hours: "평일 09:00-18:00",
      action: {
        label: "채팅 시작",
        path: "https://open.kakao.com/정호그룹"
      },
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    }
  ], []);

  // 기본 특징 데이터 (features가 전달되지 않았을 때 사용)
  const defaultFeatures: Feature[] = useMemo(() => [
    {
      title: "24/7 지원",
      description: "언제든지 전문가의 도움을 받으실 수 있습니다",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "전국 네트워크",
      description: "50개 지점에서 현장 지원을 제공합니다",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "전문 엔지니어",
      description: "200명의 전문 엔지니어가 상담해드립니다",
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ], []);

  // channels와 features가 없으면 기본값 사용
  const channelsToRender: Channel[] = useMemo(() => 
    channels && channels.length > 0 ? channels : defaultChannels, 
    [channels, defaultChannels]
  );
  
  const featuresToRender: Feature[] = useMemo(() => 
    features && features.length > 0 ? features : defaultFeatures, 
    [features, defaultFeatures]
  );

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCtaClick = useCallback((): void => {
    if (ctaButton && 'onClick' in ctaButton && ctaButton.onClick) {
      ctaButton.onClick();
    } else if (ctaButton && 'path' in ctaButton && ctaButton.path) {
      window.location.href = ctaButton.path;
    }
  }, [ctaButton]);

  const handleChannelAction = useCallback((channel: Channel): void => {
    if (channel.action?.onClick) {
      channel.action.onClick();
    } else if (channel.action?.path) {
      window.location.href = channel.action.path;
    }
  }, []);

  // 애니메이션 클래스 계산
  const animationClasses = useMemo(() => ({
    visible: 'opacity-100 translate-y-0',
    hidden: 'opacity-0 translate-y-8'
  }), []);

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-gradient-to-br from-primary to-primary-dark text-white ${className}`}
      aria-labelledby="customer-support-title"
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 
            id="customer-support-title"
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-1000 ${
              isVisible ? animationClasses.visible : animationClasses.hidden
            }`}
          >
            {title}
          </h2>
        </div>

        {/* 지원 채널 */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          role="list"
          aria-label="고객 지원 채널"
        >
          {channelsToRender.map((channel, index) => (
            <div
              key={`${channel.title}-${index}`}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center transition-all duration-1000 ${
                isVisible ? animationClasses.visible : animationClasses.hidden
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.2}s` }}
              role="listitem"
            >
              {/* 아이콘 */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center" aria-hidden="true">
                  <div className="w-10 h-10 text-white">
                    {channel.icon}
                  </div>
                </div>
              </div>

              {/* 제목 */}
              <h3 className="text-xl font-bold mb-4">{channel.title}</h3>

              {/* 설명 */}
              <p className="text-gray-200 mb-4">{channel.description}</p>

              {/* 연락처 정보 */}
              <div className="space-y-2">
                {channel.contact && (
                  <div className="text-lg font-semibold" aria-label={`연락처: ${channel.contact}`}>
                    {channel.contact}
                  </div>
                )}
                {channel.hours && (
                  <div className="text-sm text-gray-300" aria-label={`운영시간: ${channel.hours}`}>
                    {channel.hours}
                  </div>
                )}
              </div>

              {/* 액션 버튼 */}
              {channel.action && (
                <div className="mt-6">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => handleChannelAction(channel)}
                    className="w-full"
                    aria-label={`${channel.title} ${channel.action.label}`}
                  >
                    {channel.action.label}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 주요 특징 */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
            isVisible ? animationClasses.visible : animationClasses.hidden
          }`}
          style={{ transitionDelay: '0.8s' }}
          role="list"
          aria-label="주요 특징"
        >
          {featuresToRender.map((feature, index) => (
            <div key={`${feature.title}-${index}`} className="text-center" role="listitem">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <div className="w-8 h-8 text-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? animationClasses.visible : animationClasses.hidden
          }`}
          style={{ transitionDelay: '1s' }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">지금 바로 문의하세요</h3>
            <p className="text-gray-200 mb-6">
              전문 엔지니어가 24시간 내에 답변드립니다. 
              프로젝트 규모와 상관없이 최적의 솔루션을 제안해드립니다.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCtaClick}
              className="text-lg px-8 py-4"
              aria-label="고객 지원 문의하기"
            >
              {ctaButton?.label || "지금 문의하기"}
            </Button>
          </div>
        </div>

        {/* 추가 정보 */}
        <div 
          className={`mt-12 text-center transition-all duration-1000 ${
            isVisible ? animationClasses.visible : animationClasses.hidden
          }`}
          style={{ transitionDelay: '1.2s' }}
          role="complementary"
          aria-label="추가 정보"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2" aria-hidden="true"></div>
              <span>전국 50개 지점</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2" aria-hidden="true"></div>
              <span>전문 엔지니어 200명+</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2" aria-hidden="true"></div>
              <span>평균 응답시간 2시간</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CustomerSupport.displayName = 'CustomerSupport';

export default CustomerSupport; 