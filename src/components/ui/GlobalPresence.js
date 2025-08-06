import React, { useState, useEffect, useRef } from 'react';

const GlobalPresence = ({
  title = "세계로 뻗어나가는 정호그룹",
  regions = [],
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const sectionRef = useRef(null);

  // 기본 데이터
  const defaultRegions = [
    {
      name: "아시아",
      countries: [
        { name: "중국", projects: 150, coordinates: { x: 400, y: 200 }, color: "#0066CC" },
        { name: "일본", projects: 120, coordinates: { x: 450, y: 180 }, color: "#0066CC" },
        { name: "싱가포르", projects: 80, coordinates: { x: 380, y: 250 }, color: "#0066CC" },
        { name: "태국", projects: 60, coordinates: { x: 390, y: 220 }, color: "#0066CC" }
      ],
      achievements: "아시아 최대 조명제어 시스템 공급업체"
    },
    {
      name: "유럽",
      countries: [
        { name: "독일", projects: 200, coordinates: { x: 300, y: 150 }, color: "#28A745" },
        { name: "프랑스", projects: 150, coordinates: { x: 280, y: 160 }, color: "#28A745" },
        { name: "영국", projects: 120, coordinates: { x: 270, y: 150 }, color: "#28A745" },
        { name: "네덜란드", projects: 90, coordinates: { x: 290, y: 140 }, color: "#28A745" }
      ],
      achievements: "유럽 시장 점유율 1위 달성"
    },
    {
      name: "북미",
      countries: [
        { name: "미국", projects: 300, coordinates: { x: 150, y: 180 }, color: "#FF8C00" },
        { name: "캐나다", projects: 100, coordinates: { x: 180, y: 120 }, color: "#FF8C00" },
        { name: "멕시코", projects: 80, coordinates: { x: 120, y: 220 }, color: "#FF8C00" }
      ],
      achievements: "북미 시장 진출 10주년 달성"
    }
  ];
  const regionsToRender = regions && regions.length > 0 ? regions : defaultRegions;

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

  // 국가별 순차 애니메이션
  useEffect(() => {
    if (!isVisible) return;

    const allCountries = regionsToRender.flatMap(region => region.countries);
    
    allCountries.forEach((country, index) => {
      setTimeout(() => {
        setVisibleCountries(prev => [...prev, country.name]);
      }, index * 200);
    });
  }, [isVisible, regionsToRender]);

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-white ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 세계지도 */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative bg-gray-100 rounded-2xl p-8 shadow-lg">
              {/* 간단한 세계지도 SVG */}
              <svg 
                viewBox="0 0 800 400" 
                className="w-full h-auto"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
              >
                {/* 대륙 윤곽선 (간단한 형태) */}
                <path 
                  d="M100 150 Q150 120 200 150 Q250 180 300 160 Q350 140 400 150 Q450 160 500 150 Q550 140 600 150 Q650 160 700 150 L700 200 Q650 210 600 200 Q550 190 500 200 Q450 210 400 200 Q350 190 300 200 Q250 210 200 200 Q150 190 100 200 Z" 
                  fill="#e5e7eb" 
                  stroke="#d1d5db" 
                  strokeWidth="2"
                />
                {/* 국가별 포인트 */}
                {regionsToRender.flatMap(region => region.countries).map((country, index) => (
                  <g key={country.name}>
                    <circle 
                      cx={country.coordinates.x} 
                      cy={country.coordinates.y} 
                      r="6"
                      className={`transition-all duration-500 ${
                        visibleCountries.includes(country.name) 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-75'
                      }`}
                      fill={country.color}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* 지역별 정보 */}
          <div className="space-y-8">
            {regionsToRender.map((region, regionIndex) => (
              <div key={region.name} className="bg-gray-50 rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">{region.name}</h3>
                <div className="flex flex-wrap gap-4 mb-2">
                  {region.countries.map((country) => (
                    <span
                      key={country.name}
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-500`}
                      style={{ backgroundColor: `${country.color}20`, color: country.color }}
                    >
                      {country.name} ({country.projects}건)
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600">{region.achievements}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence; 