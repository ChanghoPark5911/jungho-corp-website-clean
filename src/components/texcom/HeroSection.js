import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        background: 'linear-gradient(120deg, #1B365D 60%, #FF6B9D 100%)',
        color: 'white'
      }}
    >
      {/* 배경 오버레이로 텍스트 가독성 향상 */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="z-10 relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          섬유의 전통, 패션의 미래
        </h1>
        <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto text-white font-medium leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
          40년간 축적된 섬유기계 전문성과 트렌드를 선도하는 패션 브랜드가 만나 새로운 가치를 창조합니다
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-white text-[#1B365D] font-semibold py-3 px-8 rounded-lg hover:bg-[#FF6B9D] hover:text-white transition-colors duration-200"
            onClick={() => window.location.href = '#b2b'}
          >
            섬유기계 사업부
          </button>
          <button
            className="bg-[#FF6B9D] text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-[#FF6B9D] transition-colors duration-200"
            onClick={() => window.location.href = '#b2c'}
          >
            패션 브랜드 사업부
          </button>
        </div>
      </div>
      {/* 배경 이미지 오버레이 등 추가 가능 */}
    </section>
  );
};

export default HeroSection; 