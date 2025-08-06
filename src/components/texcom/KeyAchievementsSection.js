import React, { useState, useEffect, useRef } from 'react';

const KeyAchievementsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
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

  const achievements = [
    {
      year: "2023",
      title: "글로벌 섬유기계 시장 점유율 1위",
      description: "아시아 태평양 지역에서 최고의 섬유기계 공급업체로 선정",
      icon: "🏆"
    },
    {
      year: "2022",
      title: "스마트 팩토리 혁신상 수상",
      description: "4차 산업혁명 기술 적용 우수 사례로 정부 표창",
      icon: "🏭"
    },
    {
      year: "2021",
      title: "친환경 기술 특허 50건 달성",
      description: "에너지 절약 및 폐수 처리 기술 분야 특허 확보",
      icon: "🌱"
    },
    {
      year: "2020",
      title: "패션 브랜드 매출 1000억 달성",
      description: "온라인/오프라인 통합 판매로 매출 성장 달성",
      icon: "👗"
    }
  ];

  const stats = [
    { number: "40", label: "년간 전문성", suffix: "년" },
    { number: "500", label: "글로벌 파트너사", suffix: "+" },
    { number: "30", label: "진출 국가", suffix: "개국" },
    { number: "50", label: "특허 기술", suffix: "+건" },
    { number: "1000", label: "연간 매출", suffix: "억원" },
    { number: "24", label: "시간 기술 지원", suffix: "/7" }
  ];

  const awards = [
    {
      year: "2023",
      title: "대한민국 산업대상",
      category: "섬유기계 부문"
    },
    {
      year: "2022",
      title: "스마트 팩토리 혁신상",
      category: "정부 표창"
    },
    {
      year: "2021",
      title: "친환경 기술상",
      category: "환경부 장관상"
    },
    {
      year: "2020",
      title: "디지털 혁신상",
      category: "정보통신산업진흥원"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            주요 성과
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            40년간 축적된 전문성과 혁신 기술로 
            섬유산업과 패션의 새로운 가치를 창조합니다
          </p>
        </div>

        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* 주요 성과 타임라인 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              주요 성과 타임라인
            </h3>
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className="flex-1">
                    <div className={`bg-white rounded-2xl p-6 shadow-lg ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}>
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4">{achievement.icon}</span>
                        <div>
                          <div className="text-sm font-semibold text-[#FF6B9D]">
                            {achievement.year}
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {achievement.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[#1B365D] rounded-full flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* 수상 실적 */}
          <div className="bg-gradient-to-br from-[#1B365D] to-[#FF6B9D] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-8 text-center">
              수상 실적
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold">
                      {award.title}
                    </h4>
                    <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200">
                    {award.category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 미래 비전 */}
          <div className="text-center mt-16">
            <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                미래 비전
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                2030년까지 글로벌 섬유기계 시장의 선도자이자 
                패션 브랜드로서도 세계적인 명성을 확보하겠습니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-[#1B365D] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#FF6B9D] transition-colors duration-200"
                  onClick={() => window.location.href = 'mailto:info@junghotexcom.com'}
                >
                  파트너십 문의
                </button>
                <button
                  className="bg-[#FF6B9D] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#1B365D] transition-colors duration-200"
                  onClick={() => window.open('https://fashion.junghotexcom.com', '_blank')}
                >
                  패션 브랜드 둘러보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyAchievementsSection; 