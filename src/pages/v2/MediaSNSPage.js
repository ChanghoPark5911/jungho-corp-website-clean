import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';

/**
 * V2 SNS 허브 페이지
 * 롯데/SK 스타일의 소셜미디어 통합 페이지
 */
const MediaSNSPage = () => {
  const { t, currentLanguage } = useI18n();
  const [snsLinks, setSnsLinks] = React.useState(null);

  // SNS 링크 로드 (localStorage 우선, JSON 백업)
  React.useEffect(() => {
    const loadSnsLinks = async () => {
      // 1순위: projects-data (관리자 페이지에서 저장한 데이터)
      const projectsData = localStorage.getItem('projects-data');
      if (projectsData) {
        try {
          const parsedData = JSON.parse(projectsData);
          if (parsedData.snsLinks) {
            setSnsLinks(parsedData.snsLinks);
            console.log('✅ SNS 링크 localStorage에서 로드:', parsedData.snsLinks);
            return;
          }
        } catch (e) {}
      }

      // 2순위: v2_media_data (기존 관리자 페이지)
      const savedData = localStorage.getItem('v2_media_data');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData.snsLinks) {
            setSnsLinks(parsedData.snsLinks);
            console.log('✅ SNS 링크 v2_media_data에서 로드');
            return;
          }
        } catch (error) {
          console.error('SNS 링크 로드 실패:', error);
        }
      }

      // 3순위: admin-media.json (배포된 기본값)
      try {
        const response = await fetch('/data/admin-media.json');
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.snsLinks) {
            setSnsLinks(jsonData.snsLinks);
            console.log('✅ SNS 링크 JSON에서 로드:', jsonData.snsLinks);
          }
        }
      } catch (e) {
        console.log('JSON 로드 실패');
      }
    };

    loadSnsLinks();
  }, []);

  // 애니메이션 variants (최적화)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0
      }
    }
  };

  // 기본 SNS 채널 정보 (은은한 파스텔 톤)
  const defaultSnsChannels = [
    {
      id: 'youtube',
      name: t('media.sns.channels.youtube.name'),
      description: t('media.sns.channels.youtube.description'),
      icon: '🎥',
      color: 'from-red-400 to-red-500',
      url: 'https://www.youtube.com/@JunghoGroup',
      stats: { followers: '1.2K', posts: '45' },
      bgColor: 'bg-red-50',
      textColor: 'text-red-500',
      buttonColor: 'bg-red-400 hover:bg-red-500'
    },
    {
      id: 'instagram',
      name: t('media.sns.channels.instagram.name'),
      description: t('media.sns.channels.instagram.description'),
      icon: '📸',
      color: 'from-pink-400 via-purple-400 to-orange-300',
      url: 'https://www.instagram.com/jungho_group/',
      stats: { followers: '856', posts: '128' },
      bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50',
      textColor: 'text-pink-500',
      buttonColor: 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500'
    },
    {
      id: 'naverBlog',
      name: t('media.sns.channels.naverBlog.name'),
      description: t('media.sns.channels.naverBlog.description'),
      icon: '📝',
      color: 'from-green-400 to-green-500',
      url: 'https://blog.naver.com/jungho_group',
      stats: { followers: '2.5K', posts: '234' },
      bgColor: 'bg-green-50',
      textColor: 'text-green-500',
      buttonColor: 'bg-green-400 hover:bg-green-500'
    },
    {
      id: 'facebook',
      name: t('media.sns.channels.facebook.name'),
      description: t('media.sns.channels.facebook.description'),
      icon: '👍',
      color: 'from-blue-400 to-blue-500',
      url: 'https://www.facebook.com/JunghoGroup',
      stats: { followers: '3.8K', posts: '567' },
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-500',
      buttonColor: 'bg-blue-400 hover:bg-blue-500'
    }
  ];

  // 관리자가 설정한 URL 적용 (빈 URL은 필터링)
  const snsChannels = defaultSnsChannels
    .map(channel => {
      // snsLinks가 존재하고 해당 키가 있으면 그 값 사용 (빈 문자열 포함)
      // snsLinks가 없으면 기본 URL 사용
      const adminUrl = snsLinks && channel.id in snsLinks 
        ? snsLinks[channel.id] 
        : channel.url;
      return {
        ...channel,
        url: adminUrl
      };
    })
    .filter(channel => channel.url && channel.url.trim() !== '');

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
            {t('media.sns.pageTitle')}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {t('media.sns.subtitle')}
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
                      {t('media.sns.stats.followers')}
                    </div>
                  </div>
                  <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${channel.textColor}`}>
                      {channel.stats.posts}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('media.sns.stats.posts')}
                    </div>
                  </div>
                </div>

                {/* 버튼 */}
                <div className="p-6">
                  <button
                    onClick={() => handleSocialClick(channel.url)}
                    className={`w-full ${channel.buttonColor} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2`}
                  >
                    <span>{t('media.sns.visitButton')}</span>
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
                {t('media.sns.recentActivity.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('media.sns.recentActivity.subtitle')}
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
            {t('media.sns.cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('media.sns.cta.subtitle')}
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

