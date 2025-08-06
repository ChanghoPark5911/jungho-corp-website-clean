import React, { useState, useRef, useEffect } from 'react';
import { Section, Typography, Button } from '../ui';

const ContactShoppingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const contactMethods = [
    {
      title: "카카오톡 상담",
      description: "실시간 채팅으로 빠른 답변",
      contact: "@일루테크",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      action: {
        label: "채팅 시작",
        onClick: () => window.open("https://open.kakao.com/일루테크", "_blank")
      }
    },
    {
      title: "전화 상담",
      description: "전문 상담사가 직접 답변",
      contact: "1588-1234",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      action: {
        label: "전화하기",
        onClick: () => window.location.href = "tel:1588-1234"
      }
    },
    {
      title: "이메일 문의",
      description: "상세한 문의사항을 보내주세요",
      contact: "support@illutech.com",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: {
        label: "이메일 보내기",
        onClick: () => window.location.href = "mailto:support@illutech.com"
      }
    }
  ];

  const shoppingFeatures = [
    {
      title: "전문가 큐레이션",
      description: "조명 전문가가 엄선한 제품들",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "당일배송",
      description: "오후 3시까지 주문 시 당일배송",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "무료 설치",
      description: "전문 설치팀의 무료 설치 서비스",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "A/S 보장",
      description: "3년 무상 A/S 및 24시간 지원",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <Section 
      ref={sectionRef}
      className="bg-gradient-to-br from-orange-50 to-yellow-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12 md:mb-16">
          <Typography
            variant="h2"
            className={`mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            언제든지 문의하세요
          </Typography>
          <Typography
            variant="body-large"
            className={`text-gray-600 max-w-3xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            조명 전문가가 언제든지 도움을 드립니다. 
            궁금한 점이나 상담이 필요하시면 편하게 연락해주세요.
          </Typography>
        </div>

        {/* 연락 방법 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={method.title}
              className={`bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                  {method.icon}
                </div>
                <Typography variant="h4" className="mb-2">
                  {method.title}
                </Typography>
                <Typography variant="body" className="text-gray-600 mb-3">
                  {method.description}
                </Typography>
                <Typography variant="h5" className="text-orange-600 font-semibold mb-4">
                  {method.contact}
                </Typography>
                <Button
                  variant="primary"
                  size="md"
                  onClick={method.action.onClick}
                  className="w-full"
                >
                  {method.action.label}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 쇼핑 특징 */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8 md:mb-12">
            <Typography
              variant="h3"
              className={`mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.6s' }}
            >
              일루테크만의 특별한 쇼핑 경험
            </Typography>
            <Typography
              variant="body-large"
              className="text-gray-600 max-w-2xl mx-auto"
            >
              전문가의 큐레이션부터 설치까지, 모든 과정을 책임집니다
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {shoppingFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`text-center transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <Typography variant="h5" className="mb-2">
                  {feature.title}
                </Typography>
                <Typography variant="body-small" className="text-gray-600">
                  {feature.description}
                </Typography>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="text-center mt-8 md:mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open("https://illutech.com", "_blank")}
              className="px-8 py-4 text-lg"
            >
              일루테크 쇼핑몰 방문하기
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactShoppingSection; 