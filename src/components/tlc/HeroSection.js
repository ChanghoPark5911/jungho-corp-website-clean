import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 text-white overflow-hidden">
      {/* 배경 그라데이션 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #28A745 0%, #20C997 50%, #17A2B8 100%)'
        }}
      ></div>
      
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* 텍스트 가독성을 위한 추가 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            {/* 메인 카피 */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              언제나 함께합니다
            </h1>
          
          {/* 서브 카피 */}
          <p className="text-xl lg:text-2xl mb-12 text-white max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
            영업부터 A/S까지, 고객 성공을 위한 완벽한 파트너십을 제공합니다
          </p>

          {/* 키 메트릭스 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30 shadow-lg">
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-white drop-shadow-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>전국 50+</div>
              <div className="text-white font-medium drop-shadow-md" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>대리점</div>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30 shadow-lg">
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-white drop-shadow-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>24시간</div>
              <div className="text-white font-medium drop-shadow-md" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>A/S</div>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30 shadow-lg">
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-white drop-shadow-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>95%</div>
              <div className="text-white font-medium drop-shadow-md" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>고객 만족도</div>
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-green-600 font-semibold py-4 px-8 rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              빠른 상담 신청
            </a>
            <a
              href="#network"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              가까운 대리점 찾기
            </a>
          </div>
        </div>
      </div>

      {/* 하단 장식 요소 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection; 