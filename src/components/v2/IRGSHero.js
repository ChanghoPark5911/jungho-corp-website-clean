import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * IRGS 핵심가치 Hero Section
 * 세련된 애니메이션으로 정호그룹의 4가지 핵심가치를 표현
 */
const IRGSHero = () => {
  const navigate = useNavigate();
  const { t, currentLanguage } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroData, setHeroData] = useState(null);

  // LocalStorage에서 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem('v2_homepage_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setHeroData(parsedData.hero);
      } catch (error) {
        console.error('Hero 데이터 로드 실패:', error);
      }
    }
  }, []);

  // 기본 IRGS 핵심가치 데이터 - currentLanguage가 변경될 때마다 재계산
  const defaultIrgsValues = useMemo(() => [
    {
      id: 'innovation',
      title: 'Innovation',
      subtitle: currentLanguage === 'en' ? 'Innovation' : '혁신',
      description: currentLanguage === 'en' 
        ? 'Creating better "experiences"\nwith new ideas and technology'
        : '새로운 생각과 기술로\n더 나은 "경험"을 만듭니다',
      icon: '💡',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-600/10',
      particles: ['💡', '⚡', '🔬', '🚀', '✨'],
    },
    {
      id: 'reliability',
      title: 'Reliability',
      subtitle: currentLanguage === 'en' ? 'Reliability' : '신뢰',
      description: currentLanguage === 'en'
        ? 'Keeping quality and promises,\nenhancing the "value of relationships"'
        : '품질과 약속을 지키는 것,\n"관계의 가치"를 높입니다',
      icon: '🤝',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-600/10',
      particles: ['🤝', '⭐', '🏆', '✅', '💎'],
    },
    {
      id: 'global',
      title: 'Global',
      subtitle: currentLanguage === 'en' ? 'Global' : '글로벌',
      description: currentLanguage === 'en'
        ? 'Expanding global "competitiveness"\nwith leading technology and services'
        : '국제 기준을 선도하는\n기술력과 서비스로 글로벌 "경쟁력"',
      icon: '🌏',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-600/10',
      particles: ['🌏', '🌍', '🌎', '✈️', '🗺️'],
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      subtitle: currentLanguage === 'en' ? 'Sustainability' : '지속가능성',
      description: currentLanguage === 'en'
        ? 'Designing a sustainable "tomorrow"\nwhere humans and nature coexist'
        : '인간과 자연이 함께 공존하는\n지속가능한 "내일"을 설계합니다',
      icon: '🌱',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-teal-600/10',
      particles: ['🌱', '🌿', '♻️', '🌳', '🌸'],
    },
  ], [currentLanguage]); // currentLanguage가 변경될 때마다 재계산

  // 관리자 데이터와 기본 데이터 병합
  const irgsValues = heroData?.irgsValues ? heroData.irgsValues.map((savedValue, index) => ({
    ...defaultIrgsValues[index],
    ...savedValue
  })) : defaultIrgsValues;

  // 영어일 때는 번역 우선, 한국어일 때는 관리자 데이터 우선
  const mainTitle = currentLanguage === 'en' 
    ? (t('home.hero.title') || heroData?.mainTitle || 'Illuminating People and Spaces\nwith Technology')
    : (heroData?.mainTitle || '사람과 공간을\n밝히는 기술');
  
  const companyName = currentLanguage === 'en'
    ? (t('header.title') || heroData?.companyName || 'Jungho Group')
    : (heroData?.companyName || '정호그룹');
  
  const description = currentLanguage === 'en'
    ? (t('home.hero.description') || heroData?.description || 'Lighting tomorrow with 40 years of innovation')
    : (heroData?.description || '40년의 혁신으로 내일의 빛을 밝힙니다');

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % irgsValues.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [irgsValues.length]);

  const currentValue = irgsValues[activeIndex];

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-900">
      {/* 배경 빌딩 이미지 - 선명하게 */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        {/* 청색 오버레이 - 배경 이미지와 조화 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/25 via-cyan-400/15 to-blue-500/25" />
      </div>

      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* 떠다니는 파티클 */}
      <div className="absolute inset-0 overflow-hidden">
        {currentValue.particles.map((particle, index) => (
          <div
            key={`${currentValue.id}-${index}`}
            className="absolute text-4xl opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.8}s`,
              animationDuration: `${8 + index * 2}s`,
            }}
          >
            {particle}
          </div>
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: IRGS 애니메이션 */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md flex flex-col items-center">
              {/* 중앙 큰 아이콘 */}
              <div className="relative">
                <div className={`absolute inset-0 rounded-full ${currentValue.bgColor} blur-3xl animate-pulse-slow`} />
                <div className="relative flex flex-col items-center justify-center">
                  {/* IRGS 텍스트 - 아이콘 바로 위 */}
                  <div className="mb-4 text-center">
                    <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${currentValue.color} bg-clip-text text-transparent animate-fade-in`}>
                      {currentValue.title}
                    </div>
                    <div className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-1 animate-fade-in-delay">
                      {currentLanguage === 'en' 
                        ? currentValue.title
                        : (currentValue.subtitle || defaultIrgsValues[activeIndex].subtitle)
                      }
                    </div>
                  </div>
                  
                  {/* 아이콘 */}
                  <div className="text-[200px] leading-none animate-bounce-slow transition-all duration-1000">
                    {currentValue.icon}
                  </div>
                </div>
              </div>

              {/* 원형 파티클 */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '140px' }}>
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 360) / 8;
                  const radius = 180;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={i}
                      className="absolute text-3xl opacity-60 animate-orbit"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      {currentValue.particles[i % currentValue.particles.length]}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 오른쪽: 텍스트 컨텐츠 */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white animate-slide-up leading-tight whitespace-pre-line">
                {mainTitle}
              </h1>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-600 dark:text-primary-400 animate-fade-in-delay">
                {companyName}
              </div>
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-delay whitespace-pre-line">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4 animate-fade-in-delay-2">
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {currentLanguage === 'en' ? 'Learn More About Us' : '그룹 소개 보기'}
              </button>
              <button
                onClick={() => navigate('/subsidiaries')}
                className="px-8 py-4 bg-white hover:bg-gray-100 text-primary-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-primary-600"
              >
                {currentLanguage === 'en' ? 'View Business Areas' : '사업분야 보기'}
              </button>
            </div>

            {/* 진행 표시기 */}
            <div className="flex gap-2 justify-center lg:justify-start pt-8">
              {irgsValues.map((value, index) => (
                <button
                  key={value.id}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${index === activeIndex ? 'w-12 bg-primary-600' : 'w-2 bg-gray-300 hover:bg-primary-400'}
                  `}
                  aria-label={value.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-slow">
        <div className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400">
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

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.4;
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(180px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(180px) rotate(-360deg);
          }
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 20s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s both;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default IRGSHero;

