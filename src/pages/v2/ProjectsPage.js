import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedProject, setSelectedProject] = useState(null);

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // URL 쿼리 파라미터에서 카테고리 읽기
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  // 카테고리 정의
  const categories = [
    { id: '전체', name: '전체', count: 58, total: 2152 },
    { id: '업무시설', name: '업무시설', count: 8, total: 517 },
    { id: '공공시설', name: '공공시설', count: 10, total: 364 },
    { id: '주거시설', name: '주거시설', count: 10, total: 349 },
    { id: '상업시설', name: '상업시설', count: 9, total: 298 },
    { id: '문화·의료·교육', name: '문화·의료·교육', count: 10, total: 416 },
    { id: '생산·물류·데이터센터', name: '생산·물류·데이터센터', count: 10, total: 198 }
  ];

  // 프로젝트 데이터 (50개) - 실제 파일명과 일치
  const projects = [
    // 업무시설 (8개)
    { id: 1, name: '쿠쿠 강동 사옥', category: '업무시설', image: '/images/projects/1.업무시설/쿠쿠 강동 사옥.JPG', year: 2024 },
    { id: 2, name: '남양 현대 자동차 연구소', category: '업무시설', image: '/images/projects/1.업무시설/남양 현대 자동차 연구소.JPG', year: 2023 },
    { id: 3, name: '중구 초동 업무시설 (타워 107)', category: '업무시설', image: '/images/projects/1.업무시설/중구 초동 업무시설(타워 107).JPG', year: 2023 },
    { id: 4, name: '역삼동 LUCA 831-11 빌딩', category: '업무시설', image: '/images/projects/1.업무시설/역삼동 LUCA 831-11 빌딩.JPG', year: 2022 },
    { id: 5, name: '상암 SBS 미디어센터', category: '업무시설', image: '/images/projects/1.업무시설/상암 SBS 미디어센터.JPG', year: 2022 },
    { id: 6, name: '과천 펜타원 스퀘어', category: '업무시설', image: '/images/projects/1.업무시설/과천 펜타원 스퀘어.JPG', year: 2021 },
    { id: 7, name: '여의도 파크원', category: '업무시설', image: '/images/projects/1.업무시설/여의도 파크원.JPG', year: 2021 },
    { id: 8, name: '송파 KT 타워', category: '업무시설', image: '/images/projects/1.업무시설/송파 KT 타워.jpg', year: 2020 },
    
    // 공공시설 (10개)
    { id: 10, name: '경기도 신청사', category: '공공시설', image: '/images/projects/2.공공시설/경기도 신청사.JPG', year: 2024 },
    { id: 11, name: '경의선 홍대입구역 복합역사', category: '공공시설', image: '/images/projects/2.공공시설/경의선 홍대입구역 복합역사.JPG', year: 2024 },
    { id: 12, name: '국립 아시아 문화전당', category: '공공시설', image: '/images/projects/2.공공시설/국립 아시아 문화전당.JPG', year: 2023 },
    { id: 13, name: '김포 도시철도 4공구', category: '공공시설', image: '/images/projects/2.공공시설/김포 도시철도 4공구 103&104 정거장.JPG', year: 2023 },
    { id: 14, name: '대구 교정시설', category: '공공시설', image: '/images/projects/2.공공시설/대구 교정시설.JPG', year: 2022 },
    { id: 15, name: '대전 국제컨벤션 센터', category: '공공시설', image: '/images/projects/2.공공시설/대전 국제컨벤션 센터.JPG', year: 2022 },
    { id: 16, name: '무주 태권도 공원', category: '공공시설', image: '/images/projects/2.공공시설/무주 태권도 공원.JPG', year: 2021 },
    { id: 17, name: '부산 북항 마리나', category: '공공시설', image: '/images/projects/2.공공시설/부산 북항 마리나.JPG', year: 2021 },
    { id: 18, name: '부산 영화의 전당', category: '공공시설', image: '/images/projects/2.공공시설/부산 영화의 전당.JPG', year: 2020 },
    { id: 19, name: '의정부 역사', category: '공공시설', image: '/images/projects/2.공공시설/의정부 역사.JPG', year: 2020 },
    
    // 주거시설 (10개)
    { id: 20, name: '개포 프레지던스 자이 APT', category: '주거시설', image: '/images/projects/3.주거시설/개포 프레지던스 자이 APT.JPG', year: 2024 },
    { id: 21, name: '부산 송도 힐스테이트 이진베이시티', category: '주거시설', image: '/images/projects/3.주거시설/부산 송도 힐스테이트 이진베이시티.JPG', year: 2024 },
    { id: 22, name: '송도 더샵 센터니얼 APT', category: '주거시설', image: '/images/projects/3.주거시설/송도 더샵 센터니얼 APT.JPG', year: 2023 },
    { id: 23, name: '판교 SK 테라스', category: '주거시설', image: '/images/projects/3.주거시설/판교 SK 테라스.JPG', year: 2023 },
    { id: 24, name: '송파 헬리오 시티', category: '주거시설', image: '/images/projects/3.주거시설/송파 헬리오 시티.JPG', year: 2022 },
    { id: 25, name: '신설동역 자이르네', category: '주거시설', image: '/images/projects/3.주거시설/신설동역 자이르네.JPG', year: 2022 },
    { id: 26, name: '춘천 소양 더샵 스타리버', category: '주거시설', image: '/images/projects/3.주거시설/춘천 소양 더샵 스타리버.JPG', year: 2021 },
    { id: 27, name: '이천 안흥동 주상복합', category: '주거시설', image: '/images/projects/3.주거시설/이천 안흥동 주상복합.JPG', year: 2021 },
    { id: 28, name: '수색 (DMC) SK 아이파크 포레', category: '주거시설', image: '/images/projects/3.주거시설/수색 (DMC) SK 아이파크 포레.JPG', year: 2020 },
    { id: 29, name: '더샵 센텀 하이브', category: '주거시설', image: '/images/projects/3.주거시설/더샵 센텀 하이브.JPG', year: 2020 },
    
    // 상업시설 (9개)
    { id: 30, name: 'SC제일은행 리모델링 (신세계 더 헤리티지)', category: '상업시설', image: '/images/projects/4.상업시설/SC제일은행 리모델링(신세계 더 헤리티지).JPG', year: 2024 },
    { id: 31, name: '수원 스타필드 쇼핑몰', category: '상업시설', image: '/images/projects/4.상업시설/수원 스타필드 쇼핑몰.JPG', year: 2024 },
    { id: 32, name: '고양 스타필드', category: '상업시설', image: '/images/projects/4.상업시설/고양 스타필드.JPG', year: 2023 },
    { id: 33, name: '굿모닝시티', category: '상업시설', image: '/images/projects/4.상업시설/굿모닝시티.JPG', year: 2023 },
    { id: 34, name: '구월 트레이더스', category: '상업시설', image: '/images/projects/4.상업시설/구월 트레이더스.JPG', year: 2022 },
    { id: 35, name: '동탄 워터프런트', category: '상업시설', image: '/images/projects/4.상업시설/동탄 워터프런트.JPG', year: 2022 },
    { id: 36, name: '파주 프리미엄 아울렛', category: '상업시설', image: '/images/projects/4.상업시설/파주 프리미엄 아울렛.JPG', year: 2021 },
    { id: 37, name: '신세계 백화점 강남점 개보수', category: '상업시설', image: '/images/projects/4.상업시설/신세계 백화점 강남점 개보수.JPG', year: 2021 },
    { id: 38, name: '송악 농협 하나로 마트', category: '상업시설', image: '/images/projects/4.상업시설/송악 농협 하나로 마트.JPG', year: 2020 },
    
    // 문화·의료·교육시설 (10개)
    { id: 39, name: '가톨릭 은평 성모병원', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/가톨릭 은평 성모병원.JPG', year: 2024 },
    { id: 40, name: '춘천 기계 공고', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/춘천 기계 공고.JPG', year: 2024 },
    { id: 41, name: '카톨릭대 성의교정 옴니버스파크', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/카톨릭대 성의교정 옴니버스파크.JPG', year: 2023 },
    { id: 42, name: '순천향대 부속 새병원', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/순천향대 부속 새병원.JPG', year: 2023 },
    { id: 43, name: '마산 로봇랜드', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/마산 로봇랜드.JPG', year: 2022 },
    { id: 44, name: '제주 KBS', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/제주 KBS.JPG', year: 2022 },
    { id: 45, name: '사법역사문화교육관', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/사법역사문화교육관.JPG', year: 2021 },
    { id: 46, name: '분당서울대병원 혁신파크 임상연구센터', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/분당서울대병원 혁신파크 임상연구센터.JPG', year: 2021 },
    { id: 47, name: '대전 월드컵 경기장', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/대전 월드컵 경기장.JPG', year: 2020 },
    { id: 48, name: '금왕체육관', category: '문화·의료·교육', image: '/images/projects/5.문화,의료,교육시설/금왕체육관.JPG', year: 2020 },
    
    // 생산·물류·데이터센터 (10개)
    { id: 49, name: 'BGF 리테일 진천 물류센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/BGF 리테일 진천 물류센터.JPG', year: 2024 },
    { id: 50, name: '고양 캐피탈 랜드', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/고양 캐피탈 랜드.JPG', year: 2024 },
    { id: 51, name: '광주 쿠팡 제2 물류센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/광주 쿠팡 제2 물류센터.JPG', year: 2023 },
    { id: 52, name: '평택 R&R 물류센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/평택 R&R 물류센터.JPG', year: 2023 },
    { id: 53, name: '부평 데이터센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/부평 데이터센터.JPG', year: 2022 },
    { id: 54, name: 'PUS05 마이크로소프트 데이터센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/PUS05 마이크로소프트 데이터센터.JPG', year: 2022 },
    { id: 55, name: '영종도 아레나스 물류센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/영종도 아레나스 물류센터.JPG', year: 2021 },
    { id: 56, name: '에포크 데이터센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/에포크 데이터센터.JPG', year: 2021 },
    { id: 57, name: '카카오데이터센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/카카오데이터센터.JPG', year: 2020 },
    { id: 58, name: '퍼시픽 써니 데이터센터', category: '생산·물류·데이터센터', image: '/images/projects/6.생산,물류,데이터센터/퍼시픽 써니 데이터센터.JPG', year: 2020 }
  ];

  // 필터링된 프로젝트
  const filteredProjects = selectedCategory === '전체' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 배경 패턴 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* 이정표 - 오른쪽 상단 */}
        <motion.div 
          className="absolute top-8 right-8 text-right z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Current Page
          </div>
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            PROJECTS
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
                🏆 2,152+ 프로젝트
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              프로젝트 포트폴리오
            </motion.h1>

            <motion.p 
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              정호그룹의 대표 프로젝트를 소개합니다<br />
              <span className="text-primary-600 dark:text-primary-400 font-semibold">40년의 경험과 기술력</span>
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 pt-6"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">2,152</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">총 프로젝트</div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">58</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">대표 프로젝트</div>
              </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">6</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">카테고리</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 카테고리 필터 */}
      <motion.section 
        className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-20 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{cat.name}</span>
                <span className="ml-2 text-sm opacity-75">({cat.count})</span>
              </motion.button>
            ))}
          </div>
          
          {/* 선택된 카테고리 통계 */}
          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              {selectedCategory === '전체' ? (
                <span>전체 <span className="font-bold text-primary-600 dark:text-primary-400">2,152건</span> 중 대표 <span className="font-bold">50건</span> 표시</span>
              ) : (
                <span>{selectedCategory} 전체 <span className="font-bold text-primary-600 dark:text-primary-400">{categories.find(c => c.id === selectedCategory)?.total}건</span> 중 <span className="font-bold">{filteredProjects.length}건</span> 표시</span>
              )}
            </p>
          </div>
        </div>
      </motion.section>

      {/* 프로젝트 그리드 */}
      <motion.section 
        className="py-20 bg-white dark:bg-gray-900"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                    {/* 이미지 */}
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop';
                        }}
                      />
                      {/* 오버레이 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="text-white font-semibold text-sm mb-1">자세히 보기</div>
                          <div className="flex items-center text-white/80 text-xs">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            클릭하여 확대
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 정보 */}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold">
                          {project.category}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 결과 없음 */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-gray-500 dark:text-gray-400">
                해당 카테고리의 프로젝트가 없습니다.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* 이미지 모달 (라이트박스) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 이미지 */}
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-auto rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop';
                }}
              />

              {/* 정보 */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedProject.name}
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-semibold">
                    {selectedProject.category}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    완료: {selectedProject.year}년
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;

