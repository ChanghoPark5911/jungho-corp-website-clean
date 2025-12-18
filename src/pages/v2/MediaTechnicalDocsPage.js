import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

/**
 * V2 기술자료실 페이지
 * PDF 기술자료 다운로드 제공
 */
const MediaTechnicalDocsPage = () => {
  const { t, currentLanguage } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 현재 경로에 따라 버전 prefix 결정
  const getPrefix = () => {
    if (location.pathname.startsWith('/hybrid')) return '/hybrid';
    if (location.pathname.startsWith('/classic')) return '/classic';
    return '/v2';
  };
  const prefix = getPrefix();
  
  const [technicalDocuments, setTechnicalDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // JSON 파일에서 PDF 자료 로드 (우선), localStorage는 백업
  useEffect(() => {
    const loadDocuments = async () => {
      const startTime = performance.now();
      console.log('🔄 [START] 기술자료 로딩 시작...');
      setIsLoading(true);
      
      try {
        // 1. JSON 파일에서 로드 시도 (우선) - 캐시 방지
        console.log('⏰ [1] Fetch 시작...');
        const timestamp = new Date().getTime();
        const fetchStart = performance.now();
        
        const response = await fetch(`/data/technical-docs.json?v=${timestamp}`, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        const fetchEnd = performance.now();
        console.log(`⏰ [2] Fetch 완료: ${(fetchEnd - fetchStart).toFixed(0)}ms`);
        console.log('📡 JSON 파일 요청:', response.status, response.ok ? 'OK' : 'FAIL');
        
        if (response.ok) {
          console.log('⏰ [3] JSON 파싱 시작...');
          const parseStart = performance.now();
          const jsonData = await response.json();
          const parseEnd = performance.now();
          console.log(`⏰ [4] JSON 파싱 완료: ${(parseEnd - parseStart).toFixed(0)}ms`);
          console.log('📊 JSON 파일 내용:', jsonData);
          console.log('✅ JSON 파일 로드 성공:', jsonData.documents?.length || 0, '개');
          
          if (jsonData.documents && Array.isArray(jsonData.documents) && jsonData.documents.length > 0) {
            console.log('⏰ [5] 데이터 설정 시작...');
            const setStart = performance.now();
            setTechnicalDocuments(jsonData.documents);
            const setEnd = performance.now();
            console.log(`⏰ [6] 데이터 설정 완료: ${(setEnd - setStart).toFixed(0)}ms`);
            
            console.log('⏰ [7] 로딩 종료...');
            setIsLoading(false);
            
            const totalTime = performance.now() - startTime;
            console.log(`✅ [COMPLETE] 총 소요 시간: ${(totalTime).toFixed(0)}ms (${(totalTime/1000).toFixed(2)}초)`);
            return;
          } else {
            console.warn('⚠️ JSON 파일에 문서가 없음');
          }
        } else {
          console.warn('⚠️ JSON 파일 로드 실패:', response.status);
        }
        
        // 2. JSON 파일 실패 시 localStorage에서 로드 (백업)
        console.log('⚠️ JSON 파일 없음, localStorage 확인...');
        const savedMediaData = localStorage.getItem('v2_media_data');
        
        if (savedMediaData) {
          const parsedData = JSON.parse(savedMediaData);
          console.log('📊 localStorage 데이터:', parsedData);
          
          if (parsedData.technicalDocuments && Array.isArray(parsedData.technicalDocuments)) {
            console.log('✅ localStorage에서 로드:', parsedData.technicalDocuments.length, '개');
            setTechnicalDocuments(parsedData.technicalDocuments);
          } else {
            console.warn('⚠️ localStorage에 technicalDocuments 없음');
            setTechnicalDocuments([]);
          }
        } else {
          console.warn('⚠️ localStorage에 v2_media_data 없음');
          setTechnicalDocuments([]);
        }
      } catch (error) {
        console.error('❌ PDF 자료 로드 실패:', error);
        setTechnicalDocuments([]);
      } finally {
        setIsLoading(false);
      }
    };

    // 즉시 로드
    loadDocuments();

    // 데이터 업데이트 이벤트 리스너 (관리자 페이지에서 수정 시)
    const handleUpdate = () => {
      console.log('🔄 데이터 업데이트 이벤트 감지');
      loadDocuments();
    };
    
    window.addEventListener('v2MediaDataUpdated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    
    return () => {
      window.removeEventListener('v2MediaDataUpdated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
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

  // 카테고리 목록
  const categories = [
    { id: 'all', label: currentLanguage === 'en' ? 'All' : '전체', icon: '📚' },
    { id: 'technical', label: currentLanguage === 'en' ? 'Technical Docs' : '기술서', icon: '📄' },
    { id: 'product', label: currentLanguage === 'en' ? 'Product Catalog' : '제품 카탈로그', icon: '📘' },
    { id: 'case-study', label: currentLanguage === 'en' ? 'Case Studies' : '시공 사례', icon: '🏗️' },
    { id: 'manual', label: currentLanguage === 'en' ? 'Manuals' : '매뉴얼', icon: '📖' },
    { id: 'solution', label: currentLanguage === 'en' ? 'Solution Guides' : '솔루션 가이드', icon: '💡' }
  ];

  // 계열사 목록
  const subsidiaries = [
    { id: 'all', label: currentLanguage === 'en' ? 'All Companies' : '전체 계열사', icon: '🏢' },
    { id: 'group', label: currentLanguage === 'en' ? 'Jungho Group' : '정호그룹', icon: '🏢' },
    { id: 'clarus', label: currentLanguage === 'en' ? 'CLARUS' : '클라루스', icon: '💡' },
    { id: 'tlc', label: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨', icon: '⚡' },
    { id: 'illutech', label: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍', icon: '🔆' },
    { id: 'texcom', label: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴', icon: '🧵' }
  ];

  // 필터링된 문서
  const filteredDocuments = technicalDocuments.filter(doc => {
    const categoryMatch = selectedCategory === 'all' || doc.category === selectedCategory;
    const subsidiaryMatch = selectedSubsidiary === 'all' || doc.subsidiary === selectedSubsidiary;
    return categoryMatch && subsidiaryMatch;
  });

  // 통계
  const stats = {
    total: technicalDocuments.length,
    technical: technicalDocuments.filter(d => d.category === 'technical').length,
    product: technicalDocuments.filter(d => d.category === 'product').length,
    caseStudy: technicalDocuments.filter(d => d.category === 'case-study').length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUp}>
            <div className="text-6xl mb-6">📚</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {currentLanguage === 'en' ? 'Technical Documents Library' : '기술자료실'}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {currentLanguage === 'en'
                ? 'Download technical specifications, product catalogs, and solution guides'
                : '기술 사양서, 제품 카탈로그, 솔루션 가이드를 다운로드하세요'}
            </p>
          </motion.div>

          {/* 통계 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold mb-2">{stats.total}</div>
              <div className="text-blue-100 text-sm">{currentLanguage === 'en' ? 'Total Documents' : '전체 자료'}</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold mb-2">{stats.technical}</div>
              <div className="text-blue-100 text-sm">{currentLanguage === 'en' ? 'Technical Docs' : '기술서'}</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold mb-2">{stats.product}</div>
              <div className="text-blue-100 text-sm">{currentLanguage === 'en' ? 'Catalogs' : '카탈로그'}</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="text-3xl font-bold mb-2">{stats.caseStudy}</div>
              <div className="text-blue-100 text-sm">{currentLanguage === 'en' ? 'Case Studies' : '사례'}</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 필터 섹션 */}
      <section className="py-8 bg-white dark:bg-gray-800 shadow-sm sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 카테고리 필터 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              {currentLanguage === 'en' ? 'Category' : '카테고리'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 계열사 필터 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              {currentLanguage === 'en' ? 'Subsidiary' : '계열사'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {subsidiaries.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubsidiary(sub.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedSubsidiary === sub.id
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{sub.icon}</span>
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 문서 그리드 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <motion.div 
              className="text-center py-20"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'Loading...' : '로딩 중...'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en'
                  ? 'Please wait while we load the documents'
                  : '기술자료를 불러오고 있습니다'}
              </p>
            </motion.div>
          ) : filteredDocuments.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="text-8xl mb-6">📭</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'No documents found' : '등록된 자료가 없습니다'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {currentLanguage === 'en'
                  ? 'Try changing the filter or check back later'
                  : '필터를 변경하거나 나중에 다시 확인해주세요'}
              </p>
              <button
                onClick={() => {
                  console.log('🔍 디버그 정보:');
                  console.log('localStorage 데이터:', localStorage.getItem('v2_media_data'));
                  console.log('현재 문서 목록:', technicalDocuments);
                  alert('콘솔을 확인하세요 (F12)');
                }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
              >
                🔍 디버그 정보 확인
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  {/* 카드 헤더 */}
                  <div className="p-6">
                    {/* 썸네일 & 카테고리 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900">
                        <span className="text-4xl">{doc.thumbnail}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                        {categories.find(c => c.id === doc.category)?.label || doc.category}
                      </span>
                    </div>

                    {/* 계열사 */}
                    <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
                      {subsidiaries.find(s => s.id === doc.subsidiary)?.label || doc.subsidiary}
                    </div>

                    {/* 제목 */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {doc.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {doc.description}
                    </p>

                    {/* 메타 정보 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <span>📄 {doc.fileSize}</span>
                      <span>📅 {new Date(doc.date).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'ko-KR')}</span>
                    </div>

                    {/* 언어 */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {doc.language === 'ko' ? '🇰🇷 한국어' : doc.language === 'en' ? '🇺🇸 English' : '🌐 ' + doc.language}
                      </span>
                    </div>

                    {/* 다운로드 버튼 */}
                    <button
                      onClick={(e) => {
                        console.log('🔍 PDF 클릭:', {
                          title: doc.title,
                          fileUrl: doc.fileUrl,
                          hasKorean: /[\u3131-\uD79D]/.test(doc.fileUrl),
                          hasSpace: /\s/.test(doc.fileUrl),
                          hasParentheses: /[()]/.test(doc.fileUrl)
                        });
                        
                        // 파일이 없는 경우 경고
                        if (!doc.fileUrl) {
                          alert('⚠️ 파일 URL이 설정되지 않았습니다.\n\n관리자 페이지에서 PDF 파일 URL을 입력하세요.');
                          return;
                        }
                        
                        // 한글/공백/괄호가 있는 경우 인코딩된 URL로 열기
                        if (/[\u3131-\uD79D\s()]/.test(doc.fileUrl)) {
                          console.log('⚠️ 특수문자 감지, URL 인코딩 적용');
                          const encodedUrl = doc.fileUrl.split('/').map(part => encodeURIComponent(part)).join('/');
                          console.log('📤 인코딩된 URL:', encodedUrl);
                          
                          // 파일 존재 확인
                          fetch(doc.fileUrl, { method: 'HEAD' })
                            .then(response => {
                              if (response.ok) {
                                window.open(encodedUrl, '_blank');
                              } else {
                                alert(`⚠️ 파일을 찾을 수 없습니다 (${response.status})\n\n경로: ${doc.fileUrl}\n\n파일이 public/documents 폴더에 있는지 확인하세요.`);
                              }
                            })
                            .catch(() => {
                              // CORS 오류 무시하고 일단 열기 시도
                              window.open(encodedUrl, '_blank');
                            });
                        } else {
                          console.log('✅ 정상 URL, 직접 열기');
                          // 파일 존재 확인
                          fetch(doc.fileUrl, { method: 'HEAD' })
                            .then(response => {
                              if (response.ok) {
                                window.open(doc.fileUrl, '_blank');
                              } else {
                                alert(`⚠️ 파일을 찾을 수 없습니다 (${response.status})\n\n경로: ${doc.fileUrl}\n\n파일이 public/documents 폴더에 있는지 확인하세요.`);
                              }
                            })
                            .catch(() => {
                              // CORS 오류 무시하고 일단 열기 시도
                              window.open(doc.fileUrl, '_blank');
                            });
                        }
                      }}
                      className="block w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-semibold text-center transition-all duration-300 cursor-pointer"
                    >
                      📥 {currentLanguage === 'en' ? 'View / Download' : '보기 / 다운로드'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <motion.div 
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="text-5xl mb-6">💬</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {currentLanguage === 'en' ? 'Need more information?' : '추가 정보가 필요하신가요?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {currentLanguage === 'en'
              ? 'Contact our experts for personalized solutions'
              : '전문가와 상담하여 맞춤형 솔루션을 받아보세요'}
          </p>
          <button
            onClick={() => navigate(`${prefix}/support`)}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {currentLanguage === 'en' ? 'Contact Us' : '문의하기'}
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default MediaTechnicalDocsPage;

