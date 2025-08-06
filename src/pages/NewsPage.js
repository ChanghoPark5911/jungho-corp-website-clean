import React, { useState } from 'react';
import { NewsPageSEO } from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 히어로 섹션 데이터
  const heroData = {
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mainCopy: "정호그룹 소식",
    subCopy: "정호그룹의 최신 기술 동향과 프로젝트 소식을 확인하세요",
    primaryAction: {
      label: "구독하기",
      path: "#subscribe"
    }
  };

  // 뉴스 데이터
  const newsData = [
    {
      id: 1,
      title: "정호그룹, AI 조명제어 기술로 CES 2024 혁신상 수상",
      summary: "정호그룹이 개발한 AI 기반 스마트 조명제어 시스템이 CES 2024에서 혁신상을 수상했습니다. 이 기술은 에너지 효율성을 30% 향상시키며 사용자 경험을 개선하는 혁신적인 솔루션입니다.",
      date: "2024.01.15",
      category: "수상",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["AI", "CES", "수상"],
      link: "#",
      featured: true
    },
    {
      id: 2,
      title: "글로벌 시장 진출 확대, 유럽 5개국에 현지법인 설립",
      summary: "정호그룹이 독일, 프랑스, 영국, 네덜란드, 스위스에 현지법인을 설립하여 유럽 시장 진출을 본격화했습니다. 이를 통해 현지 고객에게 더욱 신속하고 전문적인 서비스를 제공할 예정입니다.",
      date: "2024.01.10",
      category: "사업확장",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["글로벌", "유럽", "법인설립"],
      link: "#"
    },
    {
      id: 3,
      title: "삼성전자와 전략적 파트너십 체결, 반도체 공장 조명제어 시스템 공급",
      summary: "정호그룹이 삼성전자와 전략적 파트너십을 체결하고, 반도체 제조 공장의 조명제어 시스템을 공급하게 되었습니다. 이번 계약은 정호그룹의 기술력을 인정받은 결과입니다.",
      date: "2024.01.05",
      category: "파트너십",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["삼성전자", "파트너십", "반도체"],
      link: "#"
    },
    {
      id: 4,
      title: "서울시 스마트시티 프로젝트 참여, 도시 조명 인프라 구축",
      summary: "정호그룹이 서울시 스마트시티 프로젝트에 참여하여 도시 전체의 조명 인프라를 구축하게 되었습니다. IoT 기술을 활용한 스마트 조명제어 시스템으로 도시의 안전성과 에너지 효율성을 개선합니다.",
      date: "2023.12.20",
      category: "프로젝트",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["스마트시티", "서울시", "IoT"],
      link: "#"
    },
    {
      id: 5,
      title: "신기술 개발 완료, E/F3-BUS 프로토콜 공개",
      summary: "정호그룹이 기존 E/F2-BUS 프로토콜을 개선한 E/F3-BUS 프로토콜을 개발 완료했습니다. 새로운 프로토콜은 더욱 빠른 속도와 안정성을 제공하며, 조명제어 기술의 새로운 표준이 될 것으로 기대됩니다.",
      date: "2023.12.15",
      category: "기술개발",
      thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["기술개발", "프로토콜", "E/F3-BUS"],
      link: "#"
    },
    {
      id: 6,
      title: "2023년 매출 500억원 달성, 전년 대비 25% 성장",
      summary: "정호그룹이 2023년 매출 500억원을 달성했습니다. 전년 대비 25% 성장한 이번 실적은 글로벌 시장 진출과 신기술 개발에 따른 결과입니다.",
      date: "2023.12.10",
      category: "실적",
      thumbnail: "https://images.unsplash.com/photo-1436491865332-9a4e7380ffa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["매출", "성장", "실적"],
      link: "#"
    },
    {
      id: 7,
      title: "일루텍, 산업용 조명시스템 특허 등록",
      summary: "계열사 일루텍이 산업용 조명시스템 관련 특허를 등록했습니다. 이 특허는 공장 환경에서의 안전성과 효율성을 동시에 만족시키는 혁신적인 기술입니다.",
      date: "2023.12.05",
      category: "특허",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["일루텍", "특허", "산업용조명"],
      link: "#"
    },
    {
      id: 8,
      title: "정호텍스컴, 문화시설 조명예술 전시회 개최",
      summary: "계열사 정호텍스컴이 문화시설 조명예술 전시회를 개최합니다. 박물관과 갤러리를 위한 예술적 조명 솔루션을 선보일 예정입니다.",
      date: "2023.11.30",
      category: "전시회",
      thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["정호텍스컴", "전시회", "조명예술"],
      link: "#"
    }
  ];

  // 카테고리 필터
  const categories = [
    { id: 'all', name: '전체' },
    { id: '수상', name: '수상' },
    { id: '사업확장', name: '사업확장' },
    { id: '파트너십', name: '파트너십' },
    { id: '프로젝트', name: '프로젝트' },
    { id: '기술개발', name: '기술개발' },
    { id: '실적', name: '실적' },
    { id: '특허', name: '특허' },
    { id: '전시회', name: '전시회' }
  ];

  // 필터링된 뉴스
  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => news.category === selectedCategory);

  return (
    <>
      <NewsPageSEO />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} />
      </section>

      {/* 카테고리 필터 */}
      <Section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="px-6 py-2"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {/* 뉴스 목록 */}
      <Section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.thumbnail} 
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {news.category}
                  </div>
                  {news.featured && (
                    <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm">
                      주요뉴스
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{news.date}</span>
                    {news.featured && (
                      <span className="text-xs bg-accent-100 text-accent-600 px-2 py-1 rounded">
                        주요뉴스
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {news.summary}
                  </p>
                  
                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(news.link, '_blank')}
                  >
                    자세히 보기
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 구독 섹션 */}
      <Section id="subscribe" className="py-20 bg-gradient-green">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              최신 소식을 받아보세요
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              정호그룹의 최신 기술 동향과 프로젝트 소식을 이메일로 받아보실 수 있습니다.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 주소 *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="이메일 주소를 입력하세요"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    관심 분야
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">기술 동향</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">프로젝트 소식</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">회사 소식</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">채용 정보</span>
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="text-lg px-8 py-4"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('구독이 완료되었습니다. 정호그룹의 최신 소식을 받아보세요!');
                    }}
                  >
                    구독하기
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Section>

      {/* 연락처 정보 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              언론 문의
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              언론 관련 문의사항이 있으시면 언제든지 연락해주세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-primary mb-2">이메일</h3>
              <p className="text-gray-600">press@jungho.com</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-primary mb-2">전화</h3>
              <p className="text-gray-600">02-553-3631</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-primary mb-2">주소</h3>
              <p className="text-gray-600">서울특별시 강남구 논현로 116길 17</p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};

export default NewsPage; 