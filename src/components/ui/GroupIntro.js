import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { useI18n } from '../../hooks/useI18n';

const GroupIntro = ({
  title,
  content = [],
  image,
  webpImage,
  stats = [],
  actionButton,
  className = '',
  ...props
}) => {
  const { t } = useI18n(); // 다국어 지원
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({});
  const [statsData, setStatsData] = useState({
    years: '40',
    projects: '800',
    countries: '7',
    support: '99',
    yearsLabel: '조명제어 전문 경험',
    projectsLabel: '프로젝트 완료',
    countriesLabel: '해외진출국',
    supportLabel: '고객만족도'
  });
  const sectionRef = useRef(null);

  // props에서 전달받은 데이터를 우선 사용
  const displayTitle = title || '40년 전통의 조명제어 전문기업';
  const displayContent = content && Array.isArray(content) && content.length > 0 ? content : [
    '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
    'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
    '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
  ];
  const displayStats = stats && Array.isArray(stats) && stats.length > 0 ? stats : [
    { value: '40', suffix: '년', label: '조명제어 전문 경험' },
    { value: '800', suffix: '+', label: '프로젝트 완료' },
    { value: '7', suffix: '+', label: '해외 진출국' },
    { value: '99', suffix: '%', label: '고객 만족도' }
  ];

  // localStorage에서 성과지표 데이터 로드 (기존 호환성 유지)
  useEffect(() => {
    const loadStatsData = () => {
      // 통합 데이터 구조에서 먼저 로드 시도
      const homePageData = localStorage.getItem('homePageData');
      if (homePageData) {
        try {
          const parsedData = JSON.parse(homePageData);
          if (parsedData.stats) {
            setStatsData(parsedData.stats);
            console.log('통합 데이터에서 성과지표 데이터 로드됨:', parsedData.stats);
            return;
          }
        } catch (error) {
          console.error('통합 데이터 파싱 오류:', error);
        }
      }
      
      // 기존 개별 키에서 로드 (호환성 유지)
      const saved = localStorage.getItem('stats_content');
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setStatsData(parsedData);
          console.log('개별 키에서 성과지표 데이터 로드됨:', parsedData);
        } catch (error) {
          console.error('성과지표 데이터 파싱 오류:', error);
        }
      }
    };
    
    // 초기 로드
    loadStatsData();
    
    // 실시간 업데이트 리스너
    const handleStatsUpdate = () => {
      loadStatsData();
    };
    
    window.addEventListener('statsContentUpdated', handleStatsUpdate);
    window.addEventListener('homePageDataUpdated', handleStatsUpdate);
    
    return () => {
      window.removeEventListener('statsContentUpdated', handleStatsUpdate);
      window.removeEventListener('homePageDataUpdated', handleStatsUpdate);
    };
  }, []);

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
              {t('home.group.title', { fallback: displayTitle })}
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
          
          {/* 우측: 이미지 및 통계 */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* 메인 이미지 */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={image} 
                alt="정호그룹 회사 건물" 
                className="w-full h-80 lg:h-96 object-cover"
              />
              
              {/* 통계 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {displayStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                          {stat.value}{stat.suffix}
                        </div>
                        <div className="text-sm lg:text-base text-gray-200">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupIntro; 