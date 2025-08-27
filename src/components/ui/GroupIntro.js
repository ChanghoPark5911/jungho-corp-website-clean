import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

const GroupIntro = ({
  title,
  content,
  image,
  webpImage,
  stats,
  actionButton,
  className = '',
  ...props
}) => {
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
  const [groupData, setGroupData] = useState({
    title: '40년 전통의 조명제어 전문기업',
    paragraph1: '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
    paragraph2: 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
    paragraph3: '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
  });
  const sectionRef = useRef(null);

  // localStorage에서 성과지표 데이터 로드
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

  // localStorage에서 그룹소개 데이터 로드
  useEffect(() => {
    const loadGroupData = () => {
      // 통합 데이터 구조에서 먼저 로드 시도
      const homePageData = localStorage.getItem('homePageData');
      if (homePageData) {
        try {
          const parsedData = JSON.parse(homePageData);
          if (parsedData.group) {
            setGroupData(parsedData.group);
            console.log('통합 데이터에서 그룹소개 데이터 로드됨:', parsedData.group);
            return;
          }
        } catch (error) {
          console.error('통합 데이터 파싱 오류:', error);
        }
      }
      
      // 기존 개별 키에서 로드 (호환성 유지)
      const saved = localStorage.getItem('group_content');
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setGroupData(parsedData);
          console.log('개별 키에서 그룹소개 데이터 로드됨:', parsedData);
        } catch (error) {
          console.error('그룹소개 데이터 파싱 오류:', error);
        }
      }
    };
    
    // 초기 로드
    loadGroupData();
    
    // 실시간 업데이트 리스너
    const handleGroupUpdate = () => {
      loadGroupData();
    };
    
    window.addEventListener('groupContentUpdated', handleGroupUpdate);
    window.addEventListener('homePageDataUpdated', handleGroupUpdate);
    
    return () => {
      window.removeEventListener('groupContentUpdated', handleGroupUpdate);
      window.removeEventListener('homePageDataUpdated', handleGroupUpdate);
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

  // 카운터 애니메이션
  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      const duration = 2000; // 2초
      const steps = 60;
      const stepDuration = duration / steps;

      stats.forEach((stat, index) => {
        const targetValue = parseInt(stat.value);
        let currentValue = 0;
        const increment = targetValue / steps;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
          }

          setCounters(prev => ({
            ...prev,
            [index]: Math.floor(currentValue)
          }));
        }, stepDuration);
      });
    };

    const timer = setTimeout(animateCounters, 500); // 텍스트 애니메이션 후 시작
    return () => clearTimeout(timer);
  }, [isVisible, stats]);

  const handleActionClick = () => {
    if (actionButton && actionButton.onClick) {
      actionButton.onClick();
    } else if (actionButton && actionButton.path) {
      window.location.href = actionButton.path;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-white ${className}`}
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
              {groupData.title}
            </h2>
            
            {/* 내용 */}
            <div 
              className={`space-y-6 text-lg text-gray-700 leading-relaxed transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              <p>{groupData.paragraph1}</p>
              <p>{groupData.paragraph2}</p>
              <p>{groupData.paragraph3}</p>
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
                    {/* 경험 년수 */}
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {statsData.years}
                      </div>
                      <div className="text-sm lg:text-base text-gray-200">
                        {statsData.yearsLabel}
                      </div>
                    </div>
                    
                    {/* 프로젝트 수 */}
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {statsData.projects}
                      </div>
                      <div className="text-sm lg:text-base text-gray-200">
                        {statsData.projectsLabel}
                      </div>
                    </div>
                    
                    {/* 해외 진출국 */}
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {statsData.countries}
                      </div>
                      <div className="text-sm lg:text-base text-gray-200">
                        {statsData.countriesLabel}
                      </div>
                    </div>
                    
                    {/* 고객 만족도 */}
                    <div className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {statsData.support}
                      </div>
                      <div className="text-sm lg:text-base text-gray-200">
                        {statsData.supportLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 추가 장식 요소 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupIntro; 