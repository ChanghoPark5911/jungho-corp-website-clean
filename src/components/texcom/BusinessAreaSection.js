import React from 'react';

const BusinessAreaSection = () => {
  return (
    <section className="py-20 bg-white" id="business">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            사업 영역
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            40년간 축적된 섬유기계 전문성과 트렌디한 패션 브랜드의 만남으로 
            새로운 가치를 창조합니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* B2B - 섬유기계 사업부 */}
          <div className="rounded-2xl p-8 bg-[#1B365D] text-white flex flex-col justify-between" id="b2b">
            <div>
              <h3 className="text-2xl font-bold mb-4">섬유기계 사업부</h3>
              <ul className="mb-4 space-y-2 text-gray-200">
                <li>• 방직기계, 염색설비, 후처리장비</li>
                <li>• 자동화 시스템 및 IoT 솔루션</li>
                <li>• 40년 전문 경험, 500+ 파트너사</li>
                <li>• 글로벌 기술 지원 및 A/S</li>
              </ul>
            </div>
            <button
              className="mt-6 bg-white text-[#1B365D] font-semibold py-3 px-6 rounded-lg hover:bg-[#FF6B9D] hover:text-white transition-colors duration-200"
              onClick={() => window.location.href = 'mailto:tech@junghotexcom.com'}
            >
              섬유기계 상담받기
            </button>
          </div>
          
          {/* B2C - 패션 브랜드 사업부 */}
          <div className="rounded-2xl p-8 bg-[#FF6B9D] text-white flex flex-col justify-between" id="b2c">
            <div>
              <h3 className="text-2xl font-bold mb-4">패션 브랜드 사업부</h3>
              <ul className="mb-4 space-y-2 text-gray-200">
                <li>• 클래식, 캐주얼, 트렌드 라인</li>
                <li>• 액세서리 및 스페셜 컬렉션</li>
                <li>• 온라인/오프라인 통합 판매</li>
                <li>• 개인 맞춤 스타일링 서비스</li>
              </ul>
            </div>
            <button
              className="mt-6 bg-white text-[#FF6B9D] font-semibold py-3 px-6 rounded-lg hover:bg-[#1B365D] hover:text-white transition-colors duration-200"
              onClick={() => window.open('https://fashion.junghotexcom.com', '_blank')}
            >
              패션 브랜드 쇼핑하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessAreaSection; 