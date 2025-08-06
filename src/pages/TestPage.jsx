import React from 'react';

const TestPage = () => {
  console.log('🔍 TestPage 컴포넌트가 렌더링되었습니다!');
  console.log('현재 URL:', window.location.pathname);
  
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          🔥 테스트 페이지가 로드되었습니다! 🔥
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          URL: {window.location.pathname}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          시간: {new Date().toLocaleTimeString()}
        </p>
        <p className="text-lg text-gray-700">
          이 페이지가 보인다면 라우팅이 정상 작동합니다!
        </p>
      </div>
    </div>
  );
};

export default TestPage; 