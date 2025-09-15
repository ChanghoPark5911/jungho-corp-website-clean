import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [fileData, setFileData] = useState({
    technicalDocs: null,
    productCatalog: null
  });

  // 클라이언트 저장소에서 파일 데이터 로드
  useEffect(() => {
    const loadFileData = () => {
      try {
        // 클라이언트 저장소에서 로드
        const saved = localStorage.getItem('clarus_files_server');
        if (saved) {
          const parsedData = JSON.parse(saved);
          setFileData(parsedData);
        }
      } catch (error) {
        console.error('클라이언트 저장소 파일 데이터 로드 실패:', error);
      }
    };
    
    loadFileData();
    
    // 실시간 업데이트 리스너 (서버 데이터 새로고침)
    const handleFileUpdate = () => {
      loadFileData();
    };
    
    window.addEventListener('clarusFilesUpdated', handleFileUpdate);
    
    return () => {
      window.removeEventListener('clarusFilesUpdated', handleFileUpdate);
    };
  }, []);

  const stats = [
    { label: '15년+', value: 'R&D 투자' },
    { label: '50+', value: '특허 보유' },
    { label: '30+', value: '해외 진출국' }
  ];

  // 기술 자료 다운로드
  const handleTechnicalDocsDownload = () => {
    if (fileData.technicalDocs) {
      // 파일 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = fileData.technicalDocs.url;
      link.download = fileData.technicalDocs.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('기술 자료 파일이 아직 업로드되지 않았습니다.');
    }
  };

  // 제품 카탈로그 보기
  const handleProductCatalogView = () => {
    if (fileData.productCatalog) {
      // 새 창에서 카탈로그 열기
      window.open(fileData.productCatalog.url, '_blank');
    } else {
      alert('제품 카탈로그 파일이 아직 업로드되지 않았습니다.');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700"></div>
      
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            기술로 미래를
            <span className="block text-blue-300">밝히다</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            E/F2-BUS 자체 개발 프로토콜로 조명제어의 새로운 표준을 제시합니다
          </p>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2">
                {stat.label}
              </div>
              <div className="text-blue-100 text-lg">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleTechnicalDocsDownload}
            className={`font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              fileData.technicalDocs 
                ? 'bg-white text-blue-900 hover:bg-blue-50' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!fileData.technicalDocs}
          >
            {fileData.technicalDocs ? '기술 자료 다운로드' : '기술 자료 준비 중'}
          </button>
          <button 
            onClick={handleProductCatalogView}
            className={`font-semibold py-4 px-8 rounded-lg transition-all duration-300 ${
              fileData.productCatalog 
                ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900' 
                : 'bg-gray-400 text-gray-600 border-2 border-gray-400 cursor-not-allowed'
            }`}
            disabled={!fileData.productCatalog}
          >
            {fileData.productCatalog ? '제품 카탈로그 보기' : '카탈로그 준비 중'}
          </button>
        </div>

        {/* 파일 상태 표시 */}
        {(!fileData.technicalDocs || !fileData.productCatalog) && (
          <div className="mt-6 text-blue-200 text-sm">
            <p>관리자 페이지에서 관련 파일을 업로드해주세요.</p>
          </div>
        )}
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 