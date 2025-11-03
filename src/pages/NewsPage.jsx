import React, { useState, useEffect } from 'react';
import newsService, { NEWS_CATEGORIES, NEWS_CATEGORY_LABELS } from '../services/newsService';
import { useI18n } from '../hooks/useI18n';

const NewsPage = () => {
  const { t } = useI18n(); // 다국어 지원
  const [selectedCategory, setSelectedCategory] = useState(NEWS_CATEGORIES.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 뉴스 데이터 로드
  useEffect(() => {
    loadNews();
  }, [selectedCategory, searchTerm]);

  const loadNews = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await newsService.getNewsList({
        category: selectedCategory,
        searchTerm: searchTerm,
        limitCount: 50
      });
      
      if (result.success) {
        setNewsList(result.data);
      } else {
        setError(result.error || '뉴스를 불러오는데 실패했습니다.');
        // Firebase에서 데이터를 가져올 수 없는 경우 기본 데이터 사용
        setNewsList(getDefaultNews());
      }
    } catch (err) {
      console.error('뉴스 로드 오류:', err);
      setError('뉴스를 불러오는 중 오류가 발생했습니다.');
      // 오류 발생 시 기본 데이터 사용
      setNewsList(getDefaultNews());
    } finally {
      setLoading(false);
    }
  };

  // 기본 뉴스 데이터 (Firebase 연결 실패 시 사용)
  const getDefaultNews = () => [
    {
      id: 'default-1',
      title: '정호그룹, 새로운 AI 기반 조명제어 시스템 출시',
      category: 'technology',
      publishedAt: new Date('2024-01-15'),
      summary: '40년 전통의 조명제어 전문기업 정호그룹이 AI 기술을 접목한 혁신적인 조명제어 시스템을 출시하여 업계의 주목을 받고 있습니다.',
      content: '정호그룹은 최근 40년간 축적된 기술력을 바탕으로 AI 기술을 접목한 혁신적인 조명제어 시스템을 출시했습니다. 이번 시스템은 기존 대비 40% 이상의 에너지 효율성을 향상시키며, 머신러닝 알고리즘을 통해 사용 패턴을 학습하여 최적의 조명 환경을 자동으로 제공합니다.',
      author: '정호그룹 마케팅팀',
      readTime: '3분',
      viewCount: 156
    },
    {
      id: 'default-2',
      title: '정호그룹, 동남아시아 시장 진출 확대',
      category: 'business',
      publishedAt: new Date('2024-01-10'),
      summary: '정호그룹이 동남아시아 시장 진출을 확대하여 싱가포르, 말레이시아, 태국 등 주요 국가에 현지 법인을 설립했습니다.',
      content: '정호그룹은 동남아시아 시장 진출을 확대하여 싱가포르, 말레이시아, 태국 등 주요 국가에 현지 법인을 설립했습니다. 이번 진출은 정호그룹의 글로벌 확장 전략의 일환으로, 현지 시장에 특화된 조명제어 솔루션을 제공할 예정입니다.',
      author: '정호그룹 해외사업팀',
      readTime: '2분',
      viewCount: 89
    }
  ];

  // 카테고리 통계 계산
  const getCategoryStats = () => {
    const stats = {};
    Object.values(NEWS_CATEGORIES).forEach(category => {
      if (category !== NEWS_CATEGORIES.ALL) {
        stats[category] = newsList.filter(n => n.category === category).length;
      }
    });
    stats[NEWS_CATEGORIES.ALL] = newsList.length;
    return stats;
  };

  const categoryStats = getCategoryStats();
  
  // 카테고리 레이블을 다국어로 처리
  const getCategoryLabel = (category) => {
    const categoryMap = {
      [NEWS_CATEGORIES.ALL]: 'news.categories.all',
      [NEWS_CATEGORIES.TECHNOLOGY]: 'news.categories.technology',
      [NEWS_CATEGORIES.BUSINESS]: 'news.categories.business',
      [NEWS_CATEGORIES.ESG]: 'news.categories.esg',
      [NEWS_CATEGORIES.AWARDS]: 'news.categories.awards',
      [NEWS_CATEGORIES.ANNOUNCEMENT]: 'news.categories.announcement',
    };
    return t(categoryMap[category] || category);
  };
  
  const categories = Object.values(NEWS_CATEGORIES).map(category => ({
    id: category,
    label: getCategoryLabel(category),
    count: categoryStats[category] || 0
  }));

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // 뉴스 클릭 핸들러 (조회수 증가)
  const handleNewsClick = async (news) => {
    setSelectedNews(news);
    setIsModalOpen(true);
    
    // Firebase에서 뉴스인 경우 조회수 증가
    if (news.id && !news.id.startsWith('default-')) {
      try {
        await newsService.incrementViewCount(news.id);
      } catch (error) {
        console.error('조회수 증가 실패:', error);
      }
    }
  };

  // 뉴스레터 구독 처리
  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(t('news.newsletter.subscribeSuccess'));
      setEmail('');
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* 1. 히어로 섹션 */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('news.hero.title')}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white">
              {t('news.hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">{t('news.hero.badges.realtime')}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">{t('news.hero.badges.professional')}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">{t('news.hero.badges.exclusive')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 필터 및 검색 섹션 */}
      <section className="bg-white py-8 border-b sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* 검색 */}
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('news.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. 뉴스 목록 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 에러 메시지 */}
          {error && (
            <div className="mb-8 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
              <p className="text-sm">
                <strong>{t('news.error.title')}</strong> {error} {t('news.error.message')}
              </p>
            </div>
          )}

          {/* 결과 카운트 */}
          <div className="mb-8">
            <p className="text-gray-600">
              {t('news.results.total')} <span className="font-semibold text-primary-600">{newsList.length}</span>{t('news.results.found')}
              {searchTerm && ` (${t('news.results.searchTerm')} "${searchTerm}")`}
            </p>
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('news.loading')}</p>
            </div>
          )}

          {/* 뉴스 그리드 */}
          {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsList.map(news => (
              <div
                key={news.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => handleNewsClick(news)}
              >
                {/* 이미지 영역 */}
                  <div className="h-48 relative overflow-hidden">
                    {news.featuredImageUrl ? (
                      // 실제 이미지가 있는 경우
                      <>
                        <img
                          src={news.featuredImageUrl}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            // 이미지 로드 실패 시 기본 이미지로 대체
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center" style={{display: 'none'}}>
                          <div className="text-white text-center">
                            <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">이미지 로드 실패</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      // 기본 이미지가 없는 경우
                      <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <div className="text-white text-center">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">뉴스 이미지</span>
                  </div>
                      </div>
                    )}
                    
                    {/* 카테고리 배지 */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        {getCategoryLabel(news.category)}
                    </span>
                  </div>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                      <span>{formatDate(news.publishedAt)}</span>
                      <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {news.readTime}
                    </span>
                        {news.viewCount && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {news.viewCount}
                          </span>
                        )}
                      </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {news.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{news.author}</span>
                    <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      {t('news.card.readMore')} →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          
          {/* 검색 결과 없음 */}
          {!loading && newsList.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
              <p className="text-gray-500 text-lg mb-2">{t('news.results.noResults')}</p>
              <p className="text-gray-400">{t('news.results.tryOther')}</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. 뉴스레터 구독 섹션 */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('news.newsletter.title')}</h2>
          <p className="text-xl mb-8 opacity-90 text-white">
            {t('news.newsletter.subtitle')}
          </p>
          
          <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('news.newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('news.newsletter.subscribe')}
            </button>
          </form>
          
          <p className="text-sm opacity-75 mt-4 text-white">
            {t('news.newsletter.privacy')}
          </p>
        </div>
      </section>

      {/* 5. 언론 문의 및 보도자료 섹션 */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 언론 문의 */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('news.press.title')}</h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('news.press.description')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">press@jungho.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">02-553-3631</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">서울특별시 강남구 논현로 116길 17</span>
                </div>
              </div>
              
              <button className="mt-8 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                {t('news.press.contact')}
              </button>
            </div>
            
            {/* 보도자료 다운로드 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{t('news.press.materials')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('news.press.downloads.companyIntro')}</h4>
                    <p className="text-sm text-gray-600">PDF • 2.3MB</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('news.press.downloads.techPaper')}</h4>
                    <p className="text-sm text-gray-600">PDF • 1.8MB</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('news.press.downloads.logoAssets')}</h4>
                    <p className="text-sm text-gray-600">ZIP • 15.2MB</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 뉴스 상세 모달 */}
      {isModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 이미지 영역 */}
              {selectedNews.featuredImageUrl && (
                <div className="mb-6">
                  <img
                    src={selectedNews.featuredImageUrl}
                    alt={selectedNews.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* 헤더 */}
              <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {getCategoryLabel(selectedNews.category)}
                    </span>
                    <span className="text-gray-500 text-sm">{formatDate(selectedNews.publishedAt)}</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{selectedNews.readTime}</span>
                    {selectedNews.viewCount && (
                      <>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-500 text-sm">{t('news.modal.views')} {selectedNews.viewCount}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {selectedNews.title}
                  </h2>
                  <p className="text-gray-600 text-lg">{selectedNews.summary}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 이미지 */}
              <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center mb-6">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <span>뉴스 이미지</span>
                </div>
              </div>

              {/* 콘텐츠 */}
              <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed">
                  {selectedNews.content}
                </div>
              </div>

              {/* 푸터 */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">{t('news.modal.author')} {selectedNews.author}</span>
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {t('news.modal.close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default NewsPage; 