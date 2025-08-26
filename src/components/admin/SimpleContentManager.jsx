import React, { useState, useEffect } from 'react';

const SimpleContentManager = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState({
    mainTitle: '40년 축적된 기술력으로\n조명의 미래를 혁신합니다',
    subtitle: '정호그룹은 조명제어 전문 기업으로서...',
    description: '150개 이상의 프로젝트와...'
  });

  // 컴포넌트 마운트 시 LocalStorage에서 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('homepage_content');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        if (parsedData.hero) {
          setContent({
            mainTitle: parsedData.hero.title || content.mainTitle,
            subtitle: parsedData.hero.subtitle || content.subtitle,
            description: parsedData.hero.description || content.description
          });
        }
      } catch (error) {
        console.error('저장된 데이터 파싱 오류:', error);
      }
    }
  }, []);

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // 저장 기능
  const saveContent = () => {
    try {
      // LocalStorage에 저장
      localStorage.setItem('homepage_content', JSON.stringify({
        hero: {
          title: content.mainTitle,
          subtitle: content.subtitle,
          description: content.description
        }
      }));
      
      alert('저장되었습니다!');
      setIsEditMode(false);
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  // 줄바꿈을 <br> 태그로 변환하는 함수
  const formatText = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">홈페이지 콘텐츠 관리</h1>
          <div className="flex space-x-2">
            {!isEditMode ? (
              <button
                onClick={toggleEditMode}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                편집 모드
              </button>
            ) : (
              <>
                <button
                  onClick={saveContent}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  저장
                </button>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  취소
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 편집 영역 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                메인 제목 (줄바꿈: \n)
              </label>
              <textarea
                value={content.mainTitle}
                onChange={(e) => setContent(prev => ({ ...prev, mainTitle: e.target.value }))}
                disabled={!isEditMode}
                className={`w-full p-3 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                rows={3}
                placeholder="메인 제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                부제목
              </label>
              <input
                type="text"
                value={content.subtitle}
                onChange={(e) => setContent(prev => ({ ...prev, subtitle: e.target.value }))}
                disabled={!isEditMode}
                className={`w-full p-3 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="부제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                value={content.description}
                onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
                disabled={!isEditMode}
                className={`w-full p-3 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                rows={3}
                placeholder="설명을 입력하세요"
              />
            </div>
          </div>

          {/* 실시간 미리보기 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">실시간 미리보기</h3>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {formatText(content.mainTitle)}
              </h1>
              <p className="text-lg text-gray-700">
                {content.subtitle}
              </p>
              <p className="text-gray-600">
                {content.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleContentManager;

