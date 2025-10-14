import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../../hooks/useI18n';

const LatestNews = ({
  title = "",
  news = [],
  moreLink = {},
  className = '',
  ...props
}) => {
  const { t, currentLanguage } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [latestNewsData, setLatestNewsData] = useState({});
  const sectionRef = useRef(null);

  // i18n 데이터 로드
  useEffect(() => {
    const loadContent = () => {
      const data = {
        title: t('home.latestNews.title') || "정호그룹 소식",
        moreLabel: t('home.latestNews.moreLabel') || "더 많은 소식 보기",
        featured: t('home.latestNews.featured') || "주요"
      };
      setLatestNewsData(data);
    };

    loadContent();
  }, [currentLanguage, t]);

  // localStorage에서 뉴스 데이터 로드 및 실시간 업데이트
  useEffect(() => {
    const loadNewsData = () => {
      // 관리자에서 저장한 뉴스 데이터 우선 확인
      const saved = localStorage.getItem('news_data');
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setNewsData(parsedData);
          console.log('✅ 관리자 뉴스 데이터 로드됨:', parsedData);
          return;
        } catch (error) {
          console.error('❌ 뉴스 데이터 파싱 오류:', error);
        }
      }
      
      // 기본 뉴스 데이터 사용
      const defaultNews = [
        {
          id: '1',
          title: '정호그룹, 새로운 LED 조명 솔루션 출시',
          content: '40년간의 기술력으로 개발한 혁신적인 LED 조명 제어 시스템을 출시했습니다.',
          date: '2024-01-15',
          category: '보도자료',
          featured: true,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: '2',
          title: '글로벌 파트너십 확장',
          content: '해외 시장 진출을 위한 새로운 파트너십을 체결했습니다.',
          date: '2024-01-10',
          category: '일반',
          featured: false,
          image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: '3',
          title: '기술 혁신 상 수상',
          content: '조명제어 분야의 기술 혁신을 인정받아 상을 수상했습니다.',
          date: '2024-01-05',
          category: '공지사항',
          featured: false,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ];
      setNewsData(defaultNews);
      console.log('⚠️ 기본 뉴스 데이터 사용');
    };
    
    // 초기 로드
    loadNewsData();
    
    // 실시간 업데이트 리스너
    const handleNewsUpdate = () => {
      loadNewsData();
    };
    
    window.addEventListener('newsDataUpdated', handleNewsUpdate);
    
    return () => {
      window.removeEventListener('newsDataUpdated', handleNewsUpdate);
    };
  }, []);

  // 기본 뉴스 데이터 (news가 전달되지 않았을 때 사용)
  const defaultNews = [
    {
      title: "정호그룹, AI 조명제어 기술로 CES 2024 혁신상 수상",
      summary: "정호그룹이 개발한 AI 기반 스마트 조명제어 시스템이 CES 2024에서 혁신상을 수상했습니다. 이 기술은 에너지 효율성을 30% 향상시키며 사용자 경험을 개선하는 혁신적인 솔루션입니다.",
      date: "2024.01.15",
      category: "수상",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["AI", "CES", "수상"],
      link: "#"
    },
    {
      title: "글로벌 시장 진출 확대, 유럽 5개국에 현지법인 설립",
      summary: "정호그룹이 독일, 프랑스, 영국, 네덜란드, 스위스에 현지법인을 설립하여 유럽 시장 진출을 본격화했습니다. 이를 통해 현지 고객에게 더욱 신속하고 전문적인 서비스를 제공할 예정입니다.",
      date: "2024.01.10",
      category: "사업확장",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["글로벌", "유럽", "법인설립"],
      link: "#"
    },
    {
      title: "삼성전자와 전략적 파트너십 체결, 반도체 공장 조명제어 시스템 공급",
      summary: "정호그룹이 삼성전자와 전략적 파트너십을 체결하고, 반도체 제조 공장의 조명제어 시스템을 공급하게 되었습니다. 이번 계약은 정호그룹의 기술력을 인정받은 결과입니다.",
      date: "2024.01.05",
      category: "파트너십",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["삼성전자", "파트너십", "반도체"],
      link: "#"
    }
  ];

  // localStorage 데이터가 있으면 사용, 없으면 기본값 사용
  const newsToRender = newsData.length > 0 ? newsData : (news && news.length > 0 ? news : defaultNews);
  
  console.log('🔍 뉴스 렌더링 데이터:', newsToRender);

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

  const handleNewsClick = (newsItem) => {
    if (newsItem.link) {
      window.open(newsItem.link, '_blank');
    }
  };

  const handleMoreClick = () => {
    if (moreLink && moreLink.onClick) {
      moreLink.onClick();
    } else if (moreLink && moreLink.path) {
      window.location.href = moreLink.path;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 lg:py-32 bg-gray-50 ${className}`}
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
            {latestNewsData.title || title || "정호그룹 소식"}
          </h2>
        </div>

        {/* 뉴스 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsToRender.map((newsItem, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-1000 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.2}s` }}
              onClick={() => handleNewsClick(newsItem)}
            >
              {/* 썸네일 이미지 */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={newsItem.image || newsItem.thumbnail || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                
                {/* 카테고리 배지 */}
                {newsItem.category && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {newsItem.category}
                  </div>
                )}
                
                {/* 주요 뉴스 배지 */}
                {newsItem.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {latestNewsData.featured || "주요"}
                  </div>
                )}
                
                {/* 날짜 */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                  {newsItem.date}
                </div>
              </div>

              {/* 뉴스 내용 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {newsItem.content || newsItem.summary}
                </p>
                
                {/* 태그 */}
                {newsItem.tags && newsItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {newsItem.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1s' }}
        >
          <button
            onClick={handleMoreClick}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            <span>{moreLink?.label || latestNewsData.moreLabel || "더 많은 소식 보기"}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestNews; 