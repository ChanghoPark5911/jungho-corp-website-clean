import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * V2 홍보영상 페이지
 * 기업 홍보영상 및 계열사 소개 영상 제공
 */
const MediaPromotionPage = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 현재 경로에 따라 버전 prefix 결정
  const getPrefix = () => {
    if (location.pathname.startsWith('/hybrid')) return '/hybrid';
    if (location.pathname.startsWith('/classic')) return '/classic';
    return '/v2';
  };
  const prefix = getPrefix();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0
      }
    }
  };

  // 카테고리 (지적재산권은 별도 페이지로 분리됨)
  const categories = [
    { id: 'all', label: t('media.promotion.categories.all'), icon: '📺' },
    { id: 'company', label: t('media.promotion.categories.company'), icon: '🏢' },
    { id: 'subsidiaries', label: t('media.promotion.categories.subsidiaries'), icon: '🏭' },
    { id: 'technology', label: t('media.promotion.categories.technology'), icon: '💡' }
  ];


  // 홍보영상 데이터는 JSON 파일 또는 관리자 페이지에서 관리
  // 관리자 페이지: /admin-new/media → "📺 홍보영상" 탭
  // 데이터 파일: public/data/admin-media.json
  const defaultPromotionVideos = [];

  // localStorage에서 홍보영상 데이터 로드 (관리자 페이지에서 관리)
  // 기본 데이터 + 새로 추가한 데이터를 병합
  const [promotionVideos, setPromotionVideos] = useState(defaultPromotionVideos);

  useEffect(() => {
    const loadPromotionVideos = async () => {
      try {
        // 기본 데이터의 제목 목록 (중복 체크용)
        const defaultTitles = defaultPromotionVideos.map(v => v.title);
        let additionalVideos = [];
        
        // 1순위: JSON 파일에서 로드 (배포된 데이터)
        try {
          const response = await fetch('/data/admin-media.json');
          if (response.ok) {
            const jsonData = await response.json();
            if (jsonData.promotionVideos && jsonData.promotionVideos.length > 0) {
              // JSON 파일의 영상을 추가 (썸네일 필드명 통일)
              const jsonVideos = jsonData.promotionVideos.map(v => ({
                ...v,
                thumbnail: v.thumbnail || v.thumbnailUrl || '🎬'
              }));
              additionalVideos = [...jsonVideos];
              console.log('✅ JSON 파일에서 홍보영상 로드:', jsonVideos.length, '개');
            }
          }
        } catch (jsonError) {
          console.log('📄 JSON 파일 없음, localStorage 확인');
        }
        
        // 2순위: localStorage에서 추가 데이터 확인
        const projectsData = localStorage.getItem('projects-data');
        if (projectsData) {
          const parsedProjects = JSON.parse(projectsData);
          if (parsedProjects.promotionVideos && parsedProjects.promotionVideos.length > 0) {
            // 이미 추가된 영상과 중복 방지 (제목으로 비교)
            const existingTitles = additionalVideos.map(v => v.title);
            const newFromLocal = parsedProjects.promotionVideos.filter(
              video => !existingTitles.includes(video.title)
            );
            additionalVideos = [...additionalVideos, ...newFromLocal];
            if (newFromLocal.length > 0) {
              console.log('✅ localStorage에서 추가 홍보영상 로드:', newFromLocal.length, '개');
            }
          }
        }
        
        if (additionalVideos.length > 0) {
          // 기본 데이터에 없는 새로운 영상만 필터링 (제목으로 비교)
          const newVideos = additionalVideos.filter(
            video => !defaultTitles.includes(video.title)
          );
          // 기본 데이터 + 새로 추가된 데이터 병합
          setPromotionVideos([...defaultPromotionVideos, ...newVideos]);
          console.log('✅ 홍보영상 총:', defaultPromotionVideos.length, '개(기본) +', newVideos.length, '개(추가)');
        } else {
          // 저장된 데이터가 없으면 기본값 사용
          setPromotionVideos(defaultPromotionVideos);
        }
      } catch (error) {
        console.error('홍보영상 데이터 로드 실패:', error);
        setPromotionVideos(defaultPromotionVideos);
      }
    };

    loadPromotionVideos();

    // localStorage 변경 감지 (관리자 페이지에서 수정시 실시간 반영)
    const handleStorageChange = () => {
      loadPromotionVideos();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('v2MediaDataUpdated', handleStorageChange);
    window.addEventListener('projectsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('v2MediaDataUpdated', handleStorageChange);
      window.removeEventListener('projectsUpdated', handleStorageChange);
    };
  }, []);


  // 필터링된 영상
  const filteredVideos = selectedCategory === 'all' 
    ? promotionVideos 
    : promotionVideos.filter(v => v.category === selectedCategory);

  // 영상 재생 핸들러
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
            variants={fadeInUp}
          >
            <span className="text-5xl">🎥</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeInUp}
          >
            {t('media.promotion.pageTitle')}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {t('media.promotion.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-white dark:bg-gray-800 sticky top-20 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  {category.id === 'all' 
                    ? promotionVideos.length 
                    : promotionVideos.filter(v => v.category === category.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 영상 그리드 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVideos.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="text-6xl mb-4">📹</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                준비 중입니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                해당 카테고리의 영상이 곧 업데이트 될 예정입니다
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  {/* 썸네일 */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {/* 이미지 URL 또는 Base64인 경우 img 태그로 표시 */}
                    {video.thumbnail && (video.thumbnail.startsWith('http') || video.thumbnail.startsWith('data:image') || video.thumbnail.startsWith('/')) ? (
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    {/* 이모지 또는 대체 표시 */}
                    <div 
                      className="text-8xl"
                      style={{ display: video.thumbnail && (video.thumbnail.startsWith('http') || video.thumbnail.startsWith('data:image') || video.thumbnail.startsWith('/')) ? 'none' : 'flex' }}
                    >
                      {video.thumbnail || '🎬'}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    {/* 재생시간 */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
                      {video.duration}
                    </div>
                  </div>

                  {/* 내용 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase">
                        {categories.find(c => c.id === video.category)?.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(video.date).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{video.views}</span>
                      </div>
                      <button 
                        className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoClick(video);
                        }}
                      >
                        시청하기 →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 안내 배너 */}
      <section className="py-16 bg-primary-600 text-white">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="text-5xl mb-6">📢</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('media.promotion.bannerTitle')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('media.promotion.bannerSubtitle')}
          </p>
          <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
            {t('media.promotion.subscribeButton')}
          </button>
        </motion.div>
      </section>

      {/* 영상 재생 모달 */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
        >
          <motion.div 
            className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 영상 정보 */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
              <p className="text-white/90">{selectedVideo.description}</p>
            </div>

            {/* 영상 플레이어 */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {(!selectedVideo.videoType || selectedVideo.videoType === 'youtube') ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="absolute top-0 left-0 w-full h-full"
                  controls
                  autoPlay
                  src={selectedVideo.videoUrl}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  브라우저가 비디오 재생을 지원하지 않습니다.
                </video>
              )}
            </div>

            {/* 하단 정보 */}
            <div className="bg-gray-800 p-6 flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{selectedVideo.views} 조회</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(selectedVideo.date).toLocaleDateString('ko-KR')}</span>
                </div>
              </div>
              {selectedVideo.youtubeUrl && (
                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube에서 보기</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MediaPromotionPage;

