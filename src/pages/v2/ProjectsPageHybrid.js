import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 프로젝트 페이지 - Hybrid 버전
 */
const ProjectsPageHybrid = () => {
  const { currentLanguage } = useI18n();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const projects = [
    {
      title: currentLanguage === 'en' ? 'Smart City Lighting' : '스마트시티 조명',
      location: currentLanguage === 'en' ? 'Seoul Metropolitan Area' : '서울 수도권',
      year: '2024',
      description: currentLanguage === 'en'
        ? 'Integrated lighting control system for smart city infrastructure'
        : '스마트시티 인프라를 위한 통합 조명 제어 시스템',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: currentLanguage === 'en' ? 'Industrial Complex' : '산업단지 조명',
      location: currentLanguage === 'en' ? 'Nationwide' : '전국',
      year: '2023-2024',
      description: currentLanguage === 'en'
        ? 'LED lighting solutions for industrial complexes'
        : '산업단지를 위한 LED 조명 솔루션',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f151b3?w=800&q=80',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: currentLanguage === 'en' ? 'Data Center' : '데이터센터',
      location: currentLanguage === 'en' ? 'Major Cities' : '주요 도시',
      year: '2023',
      description: currentLanguage === 'en'
        ? 'Energy-efficient lighting and power management'
        : '에너지 효율적인 조명 및 전력 관리',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: currentLanguage === 'en' ? 'Cultural Facilities' : '문화시설',
      location: currentLanguage === 'en' ? 'Seoul' : '서울',
      year: '2022-2023',
      description: currentLanguage === 'en'
        ? 'Artistic lighting for museums and galleries'
        : '박물관 및 갤러리를 위한 예술 조명',
      image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <TraditionalNav />

      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'}
        title={currentLanguage === 'en' ? 'Projects' : '프로젝트'}
        description={currentLanguage === 'en'
          ? 'Innovative solutions delivered nationwide'
          : '전국에 제공된 혁신적인 솔루션'}
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
        height="400px"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {currentLanguage === 'en' ? 'Featured Projects' : '주요 프로젝트'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {currentLanguage === 'en'
              ? 'Delivering innovation across various industries'
              : '다양한 산업 분야에 혁신을 제공합니다'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-full text-sm font-bold`}>
                  {project.year}
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {project.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {currentLanguage === 'en'
              ? 'More projects coming soon...'
              : '더 많은 프로젝트가 곧 공개됩니다...'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPageHybrid;

