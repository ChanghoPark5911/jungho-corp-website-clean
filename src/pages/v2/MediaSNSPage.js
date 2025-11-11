import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';

/**
 * V2 SNS 허브 페이지
 * 롯데/SK 스타일의 소셜미디어 통합 페이지
 */
const MediaSNSPage = () => {
  const { t } = useI18n();
  const [snsLinks, setSnsLinks] = React.useState(null);

  // LocalStorage에서 SNS 링크 로드
  React.useEffect(() => {
    const savedData = localStorage.getItem('v2_media_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setSnsLinks(parsedData.snsLinks);
      } catch (error) {
        console.error('SNS 링크 로드 실패:', error);
      }
    }
  }, []);

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
        staggerChildren: 0.15
      }
    }
  };

  // 기본 SNS 채널 정보
  const defaultSnsChannels = [
    {
      id: 'youtube',
      name: 'YouTube',
      description: '정호그룹의 다양한 프로젝트와 기술 혁신을 영상으로 만나보세요',
      icon: '🎥',
      color: 'from-red-500 to-red-600',
      url: 'https://www.youtube.com/@JunghoGroup',
      stats: { followers: '1.2K', posts: '45' },
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: '일상 속 정호그룹의 모습과 직원들의 이야기를 공유합니다',
      icon: '📸',
      color: 'from-pink-500 via-purple-500 to-orange-500',
      url: 'https://www.instagram.com/jungho_group/',
      stats: { followers: '856', posts: '128' },
      bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50',
      textColor: 'text-pink-600',
      buttonColor: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
    },
    {
      id: 'naverBlog',
      name: '네이버 블로그',
      description: '정호그룹의 기술 인사이트와 산업 트렌드를 심층 분석합니다',
      icon: '📝',
      color: 'from-green-500 to-green-600',
      url: 'https://blog.naver.com/jungho_group',
      stats: { followers: '2.5K', posts: '234' },
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: '정호그룹의 소식과 업계 뉴스를 가장 먼저 확인하세요',
      icon: '👍',
      color: 'from-blue-500 to-blue-600',
      url: 'https://www.facebook.com/JunghoGroup',
      stats: { followers: '3.8K', posts: '567' },
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  // 관리자가 설정한 URL 적용
  const snsChannels = defaultSnsChannels.map(channel => ({
    ...channel,
    url: snsLinks?.[channel.id] || channel.url
  }));

  // 최근 SNS 활동 (샘플 데이터)
  const recentActivities = [
    {
      platform: 'YouTube',
      title: '2024 정호그룹 기업 소개 영상',
      date: '2024-11-08',
      thumbnail: '🎬',
      type: 'video'
    },
    {
      platform: 'Instagram',
      title: '일루텍 신제품 조명 시스템 공개',
      date: '2024-11-05',
      thumbnail: '💡',
      type: 'photo'
    },
    {
      platform: '네이버 블로그',
      title: 'AI 기반 물류 시스템의 미래',
      date: '2024-11-01',
      thumbnail: '🤖',
      type: 'article'
    },
    {
      platform: 'Facebook',
      title: '정호그룹 40주년 기념 이벤트',
      date: '2024-10-28',
      thumbnail: '🎉',
      type: 'event'
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
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
            <span className="text-5xl">📱</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeInUp}
          >
            정호그룹 SNS
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            다양한 소셜미디어를 통해 정호그룹과 소통하세요
          </motion.p>
        </motion.div>
      </section>

      {/* SNS 채널 카드 섹션 */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {snsChannels.map((channel) => (
              <motion.div
                key={channel.id}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* 헤더 */}
                <div className={`bg-gradient-to-r ${channel.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-20">
                    <div className="text-9xl">{channel.icon}</div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-4xl">{channel.icon}</span>
                      <h3 className="text-2xl font-bold">{channel.name}</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      {channel.description}
                    </p>
                  </div>
                </div>

                {/* 통계 */}
                <div className="flex items-center justify-around py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${channel.textColor}`}>
                      {channel.stats.followers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      팔로워
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${channel.textColor}`}>
                      {channel.stats.posts}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      게시물
                    </div>
                  </div>
                </div>

                {/* 버튼 */}
                <div className="p-6">
                  <button
                    onClick={() => handleSocialClick(channel.url)}
                    className={`w-full ${channel.buttonColor} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <span>방문하기</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 최근 활동 섹션 */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                최근 SNS 활동
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                정호그룹의 최신 소식을 확인하세요
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-6xl mb-4 text-center">{activity.thumbnail}</div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-2">
                    {activity.platform}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {activity.title}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            정호그룹과 함께하세요
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            다양한 채널에서 정호그룹의 소식을 가장 먼저 만나보세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {snsChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => handleSocialClick(channel.url)}
                className={`bg-gradient-to-r ${channel.color} text-white px-6 py-3 rounded-full font-semibold hover:scale-110 transition-transform duration-300 flex items-center space-x-2`}
              >
                <span>{channel.icon}</span>
                <span>{channel.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MediaSNSPage;

