import React, { useState, useEffect } from 'react';


const LivePreview = ({ content, contentType, targetSection }) => {
  const [previewMode, setPreviewMode] = useState('desktop');

  const renderHeroPreview = () => {
    return (
      <div className="relative min-h-[500px] bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden">
        {/* 배경 이미지 시뮬레이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-[500px] px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {content.title?.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              {content.subtitle}
            </p>
            <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
              {content.description}
            </p>
            <div className="mt-8">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-8 py-3 rounded-lg text-lg transition-colors">
                자세히 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGroupPreview = () => {
    return (
      <div className="bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {content.title}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderAchievementsPreview = () => {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg text-gray-700">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContentPreview = () => {
    switch (contentType) {
      case 'hero':
        return renderHeroPreview();
      case 'group':
        return renderGroupPreview();
      case 'achievements':
        return renderAchievementsPreview();
      default:
        return (
          <div className="bg-white p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {content.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {content.body || content.description}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 미리보기 모드 선택 */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">실시간 미리보기</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                previewMode === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              📱 모바일
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                previewMode === 'tablet'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              📱 태블릿
            </button>
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                previewMode === 'desktop'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              💻 데스크톱
            </button>
          </div>
        </div>
      </div>

      {/* 미리보기 영역 */}
      <div className="p-6">
        <div
          className={`mx-auto transition-all duration-300 ${
            previewMode === 'mobile'
              ? 'max-w-sm'
              : previewMode === 'tablet'
              ? 'max-w-2xl'
              : 'max-w-full'
          }`}
        >
          {renderContentPreview()}
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
