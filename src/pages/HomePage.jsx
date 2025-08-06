
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomePageSEO } from '../components/SEO';
import AnimatedProductCards from '../components/ui/AnimatedProductCards';

// 기본 데이터 (관리자 데이터가 없을 때 사용)
const defaultData = {
  hero: {
    title: '40년 축적된 기술력으로\n조명의 미래를 혁신합니다',
    subtitle: '정호그룹은 조명제어 전문 기업으로서 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다.',
    description: '150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다.'
  },
  achievements: [
    { number: '40', suffix: '년', label: '기술 축적' },
    { number: '150+', suffix: '', label: '프로젝트' },
    { number: '85,000+', suffix: '', label: '제어 포인트' },
    { number: '4', suffix: '개', label: '계열사' }
  ],
  groupOverview: {
    title: '40년 전통의 조명제어 전문기업',
    description: '1983년 창립 이래 40년간 조명제어 분야 전문성을 축적해온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어의 새로운 표준을 제시했습니다.',
    vision: '조명제어 기술의 혁신을 통해 에너지 효율성을 극대화하고, 고객의 성공과 지속가능한 미래를 함께 만들어갑니다.'
  },
  subsidiaries: [
    {
      id: 'clarus',
      title: '클라루스',
      subtitle: 'AI 기반 스마트 조명제어',
      description: '최신 AI 기술을 활용한 지능형 조명제어 시스템을 개발하고 제공합니다.',
      feature: 'AI 기반 자동 제어 시스템',
      color: 'clarus',
      icon: '💡'
    },
    {
      id: 'tlc',
      title: '정호티엘씨',
      subtitle: 'IoT 센서 및 제어 장치',
      description: 'IoT 센서 네트워크와 제어 장치를 통해 실시간 모니터링을 제공합니다.',
      feature: 'IoT 센서 네트워크',
      color: 'tlc',
      icon: '📡'
    },
    {
      id: 'illutech',
      title: '일루텍',
      subtitle: '스마트 물류 솔루션',
      description: '물류 분야의 자동화와 효율성을 극대화하는 스마트 솔루션을 제공합니다.',
      feature: '스마트 물류 자동화',
      color: 'illutech',
      icon: '🚚'
    },
    {
      id: 'texcom',
      title: '정호텍스컴',
      subtitle: '텍스타일 제어 시스템',
      description: '텍스타일 산업의 생산성을 향상시키는 전문 제어 시스템을 개발합니다.',
      feature: '텍스타일 제어 시스템',
      color: 'texcom',
      icon: '🧵'
    }
  ]
};

const HomePage = () => {
  // 관리자 데이터 로드
  const [homeData, setHomeData] = useState(defaultData);

  useEffect(() => {
    const savedData = localStorage.getItem('homePageData');
    if (savedData) {
      setHomeData(JSON.parse(savedData));
    }
  }, []);

  return (
    <>
      <HomePageSEO />
      <div className="min-h-screen">
        {/* 1. 히어로 섹션 */}
        <section className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden" style={{backgroundColor: '#059669'}}>
          <div className="container-custom text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{color: '#059669'}}>
              {homeData.hero.title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line.includes('조명의 미래') ? (
                    <>
                      {line.split('조명의 미래').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < line.split('조명의 미래').length - 1 && (
                            <span style={{color: '#059669'}}>조명의 미래</span>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    line
                  )}
                  {index < homeData.hero.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {homeData.hero.subtitle}
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {homeData.hero.description}
            </p>
            
            {/* 성과 지표 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {homeData.achievements.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {item.number}<span className="text-lg">{item.suffix}</span>
                  </div>
                  <div className="text-sm md:text-base text-white/90">{item.label}</div>
                </div>
              ))}
            </div>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/business" className="bg-white text-primary-700 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-50">
                사업영역 보기
              </Link>
              <Link to="/group" className="bg-white text-primary-700 border-2 border-white hover:bg-gray-50 hover:border-gray-200 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                그룹 소개
              </Link>
            </div>
          </div>
          
          {/* 스크롤 인디케이터 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* 2. 그룹 개요 섹션 */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#059669', fontSize: '2.5rem'}}>
                  {homeData.groupOverview.title}
                </h2>
                <div className="space-y-6 leading-relaxed">
                  <p className="text-lg" style={{color: '#000000'}}>
                    {homeData.groupOverview.description}
                  </p>
                </div>
                
                {/* 핵심 역량 */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="font-medium" style={{color: '#000000'}}>자체 개발 E/F2-BUS 통신 프로토콜</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="font-medium" style={{color: '#000000'}}>4개 계열사 통합 생태계</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="font-medium" style={{color: '#000000'}}>B2B-B2C 완전한 솔루션</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/group" className="btn-primary">
                    그룹 소개 자세히 보기
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gradient-green rounded-xl shadow-lg p-8 text-white">
                  <div className="h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">정호그룹의 비전</h3>
                    <p className="text-lg leading-relaxed">
                      "{homeData.groupOverview.vision}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 계열사 소개 섹션 */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-section-title mb-6" style={{color: '#059669', fontSize: '2.5rem'}}>
                4개 계열사가 만드는 완벽한 조명 생태계
              </h2>
              <p className="text-body max-w-3xl mx-auto" style={{color: '#000000'}}>
                기술개발부터 고객서비스까지, 각 분야 전문성의 시너지로 최고의 솔루션을 제공합니다
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeData.subsidiaries.map((sub) => (
                <Link 
                  to={`/${sub.id}`} 
                  key={sub.id} 
                  className={`card card-${sub.color} group cursor-pointer transform transition-all duration-300 hover:scale-105`}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-6">{sub.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>{sub.title}</h3>
                    <h4 className="text-sm font-medium mb-3" style={{color: '#059669'}}>{sub.subtitle}</h4>
                    <p className="mb-4 text-sm leading-relaxed" style={{color: '#000000'}}>{sub.description}</p>
                    <div className="bg-primary-50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-primary-700 font-medium">{sub.feature}</p>
                    </div>
                    <div className="flex items-center justify-center text-primary-600 group-hover:text-primary-700 transition-colors">
                      <span className="text-sm font-medium mr-2">자세히 보기</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. 핵심 기술 섹션 */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-section-title mb-6" style={{color: '#059669', fontSize: '2.5rem'}}>
                차별화된 기술력
              </h2>
              <p className="text-body max-w-3xl mx-auto" style={{color: '#000000'}}>
                40년간 축적된 기술력과 최신 기술을 결합하여 혁신적인 솔루션을 제공합니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-card-title mb-3" style={{color: '#000000'}}>AI 제어 시스템</h3>
                <p className="text-body" style={{color: '#000000'}}>
                  머신러닝과 딥러닝을 활용한 지능형 조명제어 시스템
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-card-title mb-3" style={{color: '#000000'}}>IoT 센서 네트워크</h3>
                <p className="text-body" style={{color: '#000000'}}>
                  실시간 데이터 수집 및 분석을 통한 최적화된 제어
                </p>
              </div>
              
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-card-title mb-3" style={{color: '#000000'}}>보안 시스템</h3>
                <p className="text-body" style={{color: '#000000'}}>
                  최고 수준의 보안을 제공하는 안전한 제어 시스템
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 움직이는 제품 카드 섹션 */}
        <AnimatedProductCards />

        {/* 6. 프로젝트 갤러리 섹션 */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-section-title mb-6" style={{color: '#059669', fontSize: '2.5rem'}}>
                검증된 성과와 신뢰
              </h2>
              <p className="text-body max-w-3xl mx-auto" style={{color: '#000000'}}>
                150개 이상의 성공적인 프로젝트를 통해 검증된 솔루션을 제공합니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-card-title mb-2" style={{color: '#000000'}}>스마트 빌딩</h3>
                  <p className="text-body mb-4" style={{color: '#000000'}}>
                    서울시 주요 빌딩의 스마트 조명제어 시스템 구축
                  </p>
                  <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
              
              <div className="card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-card-title mb-2" style={{color: '#000000'}}>물류 센터</h3>
                  <p className="text-body mb-4" style={{color: '#000000'}}>
                    대형 물류센터의 IoT 기반 자동화 시스템
                  </p>
                  <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
              
              <div className="card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-card-title mb-2" style={{color: '#000000'}}>보안 시스템</h3>
                  <p className="text-body mb-4" style={{color: '#000000'}}>
                    정부기관 보안시설의 통합 제어 시스템
                  </p>
                  <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 고객 지원 섹션 */}
        <section className="section bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-section-title mb-6" style={{color: '#059669', fontSize: '2.5rem'}}>
                언제나 함께하는 든든한 파트너
              </h2>
              <p className="text-body max-w-3xl mx-auto" style={{color: '#000000'}}>
                24시간 전문 기술지원과 맞춤형 서비스로 고객의 성공을 지원합니다.
              </p>
            </div>
            
            {/* 문의 방법 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: '#059669'}}>전화 상담</h3>
                <p className="mb-2" style={{color: '#000000'}}>전문 엔지니어가 직접 답변드립니다</p>
                <p className="text-sm mb-4" style={{color: '#000000'}}>운영 08:00-18:00</p>
                <p className="font-bold text-lg mb-4" style={{color: '#000000'}}>0800-1000</p>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  전화하기
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: '#059669'}}>이메일 문의</h3>
                <p className="mb-2" style={{color: '#000000'}}>상세한 기술 지원사항을 보내주세요</p>
                <p className="text-sm mb-4" style={{color: '#000000'}}>24시간 접수 가능</p>
                <p className="font-bold text-lg mb-4" style={{color: '#000000'}}>support@jungho.com</p>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  이메일 보내기
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: '#059669'}}>카카오톡</h3>
                <p className="mb-2" style={{color: '#000000'}}>실시간 채팅으로 빠른 답변을 받으세요</p>
                <p className="text-sm mb-4" style={{color: '#000000'}}>운영 08:00-18:00</p>
                <p className="font-bold text-lg mb-4" style={{color: '#000000'}}>@정호그룹</p>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  채팅 시작
                </button>
              </div>
            </div>
            
            {/* 지원 특징 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>24/7 지원</h3>
                <p style={{color: '#000000'}}>언제든 전문 엔지니어의 도움을 받으실 수 있습니다</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>전국 네트워크</h3>
                <p style={{color: '#000000'}}>50개 지점에서 현장 지원을 제공합니다</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: '#000000'}}>전문 엔지니어</h3>
                <p style={{color: '#000000'}}>200명의 전문 엔지니어가 상담해드립니다</p>
              </div>
            </div>
            
            {/* 문의 유도 */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4" style={{color: '#000000'}}>지금 바로 문의하세요</h3>
              <p className="mb-6 max-w-2xl mx-auto" style={{color: '#000000'}}>
                전문 엔지니어가 24시간 이내 답변드립니다. 궁금증과 불편함은 최적의 솔루션으로 해결해드립니다.
              </p>
              <button className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                지금 문의하기
              </button>
            </div>
            
            {/* 하단 정보 */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap justify-center gap-8 text-sm" style={{color: '#000000'}}>
                <span>전국 50개 지점</span>
                <span>서울 • 부산 • 대구</span>
                <span>총 200명</span>
                <span>평균 응답 시간 2시간</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. 최신 뉴스 섹션 */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-section-title mb-6" style={{color: '#059669', fontSize: '2.5rem'}}>
                최신 뉴스
              </h2>
              <p className="text-body max-w-3xl mx-auto" style={{color: '#000000'}}>
                정호그룹의 최신 소식과 업계 동향을 확인하세요.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card">
                <div className="p-6">
                  <div className="text-sm text-neutral-500 mb-2">2024.01.15</div>
                  <h3 className="text-card-title mb-3" style={{color: '#000000'}}>
                    AI 기반 스마트 조명제어 시스템 출시
                  </h3>
                  <p className="text-body mb-4" style={{color: '#000000'}}>
                    최신 AI 기술을 적용한 혁신적인 조명제어 시스템을 출시했습니다.
                  </p>
                  <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
              
              <div className="card">
                <div className="p-6">
                  <div className="text-sm text-neutral-500 mb-2">2024.01.10</div>
                  <h3 className="text-card-title mb-3" style={{color: '#000000'}}>
                    해외 시장 진출 확대
                  </h3>
                  <p className="text-body mb-4" style={{color: '#000000'}}>
                    동남아시아 시장 진출을 통해 글로벌 사업 영역을 확대했습니다.
                  </p>
                  <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
              
              <div className="card">
                <div className="p-6">
                  <div className="text-sm text-neutral-500 mb-2">2024.01.05</div>
                  <h3 className="text-card-title mb-3" style={{color: '#000000'}}>
                    기술 인증 획득
                  </h3>
                  <p className="text-body mb-4" style={{color: '#000000'}}>
                    국제 표준 인증을 통해 기술력과 품질을 공식 인정받았습니다.
                  </p>
                  <Link to="/news" className="text-primary-600 hover:text-primary-700 font-medium">
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage; 