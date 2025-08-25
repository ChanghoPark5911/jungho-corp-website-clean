import React, { useState, useEffect } from 'react';
import { API_CONFIG, apiCall } from '../../config/api';

const AIContentAssistant = ({ currentUser, onContentSuggestion }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('hero');
  const [targetSection, setTargetSection] = useState('homepage');

  // AI 제안 목록 로드
  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = () => {
    const savedSuggestions = localStorage.getItem('aiSuggestions');
    if (savedSuggestions) {
      setSuggestions(JSON.parse(savedSuggestions));
    }
  };

  // AI 제안 생성
  const generateAISuggestion = async () => {
    if (!prompt.trim()) {
      alert('프롬프트를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // OpenAI API 호출
      const aiResponse = await callOpenAI(prompt, contentType, targetSection);
      
      const newSuggestion = {
        id: Date.now(),
        prompt,
        contentType,
        targetSection,
        suggestion: aiResponse,
        status: 'pending',
        createdAt: new Date().toISOString(),
        author: currentUser.username,
        rating: null,
        feedback: ''
      };

      setSuggestions(prev => [newSuggestion, ...prev]);
      
      // localStorage에 저장
      localStorage.setItem('aiSuggestions', JSON.stringify([newSuggestion, ...suggestions]));
      
      setPrompt('');
      alert('AI 제안이 생성되었습니다!');
    } catch (error) {
      console.error('AI 제안 생성 실패:', error);
      alert('AI 제안 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // OpenAI API 호출
  const callOpenAI = async (prompt, contentType, targetSection) => {
    try {
      const result = await apiCall(API_CONFIG.OPENAI_API, {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          contentType,
          targetSection
        })
      });
      
      if (!result.success) {
        throw new Error(result.error || 'AI 응답 생성에 실패했습니다.');
      }

      return result.data;
    } catch (error) {
      console.error('OpenAI API 호출 실패:', error);
      throw error;
    }
  };

  // 제안 상태 변경
  const updateSuggestionStatus = (id, status) => {
    const updatedSuggestions = suggestions.map(suggestion => 
      suggestion.id === id ? { ...suggestion, status } : suggestion
    );
    setSuggestions(updatedSuggestions);
    localStorage.setItem('aiSuggestions', JSON.stringify(updatedSuggestions));
  };

  // 제안 채택
  const adoptSuggestion = (suggestion) => {
    if (onContentSuggestion) {
      onContentSuggestion(suggestion);
    }
    updateSuggestionStatus(suggestion.id, 'adopted');
    alert('제안이 채택되었습니다!');
  };

  // 제안 거부
  const rejectSuggestion = (id) => {
    updateSuggestionStatus(id, 'rejected');
    alert('제안이 거부되었습니다.');
  };

  // 제안 평가
  const rateSuggestion = (id, rating) => {
    const updatedSuggestions = suggestions.map(suggestion => 
      suggestion.id === id ? { ...suggestion, rating } : suggestion
    );
    setSuggestions(updatedSuggestions);
    localStorage.setItem('aiSuggestions', JSON.stringify(updatedSuggestions));
  };

  // 제안 피드백 추가
  const addFeedback = (id, feedback) => {
    const updatedSuggestions = suggestions.map(suggestion => 
      suggestion.id === id ? { ...suggestion, feedback } : suggestion
    );
    setSuggestions(updatedSuggestions);
    localStorage.setItem('aiSuggestions', JSON.stringify(updatedSuggestions));
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      adopted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: '검토 중',
      adopted: '채택됨',
      rejected: '거부됨'
    };
    return labels[status] || status;
  };

  const renderSuggestionDetails = (suggestion) => {
    if (!suggestion) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">AI 제안 상세 보기</h3>
            <button
              onClick={() => setSelectedSuggestion(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">기본 정보</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">프롬프트:</span> {suggestion.prompt}</p>
                <p><span className="font-medium">콘텐츠 타입:</span> {suggestion.contentType}</p>
                <p><span className="font-medium">대상 섹션:</span> {suggestion.targetSection}</p>
                <p><span className="font-medium">작성자:</span> {suggestion.author}</p>
                <p><span className="font-medium">작성일:</span> {new Date(suggestion.createdAt).toLocaleDateString('ko-KR')}</p>
                <p><span className="font-medium">상태:</span> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusBadge(suggestion.status)}`}>
                    {getStatusLabel(suggestion.status)}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">AI 제안 내용</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(suggestion.suggestion, null, 2)}</pre>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* 평가 */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">제안 평가</h4>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => rateSuggestion(suggestion.id, rating)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      suggestion.rating === rating
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">1: 매우 나쁨, 5: 매우 좋음</p>
            </div>

            {/* 피드백 */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">피드백</h4>
              <textarea
                value={suggestion.feedback}
                onChange={(e) => addFeedback(suggestion.id, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="이 제안에 대한 피드백을 입력하세요"
              />
            </div>

            {/* 액션 버튼 */}
            {suggestion.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => adoptSuggestion(suggestion)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  제안 채택
                </button>
                <button
                  onClick={() => rejectSuggestion(suggestion.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                >
                  제안 거부
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSuggestionsList = () => {
    return suggestions.map(suggestion => (
      <div key={suggestion.id} className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{suggestion.prompt}</h4>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{suggestion.author}</span>
              <span>{new Date(suggestion.createdAt).toLocaleDateString('ko-KR')}</span>
              <span>{suggestion.contentType}</span>
              <span>{suggestion.targetSection}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(suggestion.status)}`}>
                {getStatusLabel(suggestion.status)}
              </span>
              {suggestion.rating && (
                <span className="text-yellow-600">★ {suggestion.rating}/5</span>
              )}
            </div>
            {suggestion.feedback && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">피드백:</span> {suggestion.feedback}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSuggestion(suggestion)}
              className="text-primary-600 hover:text-primary-800 text-sm"
            >
              상세보기
            </button>
            {suggestion.status === 'pending' && (
              <div className="flex gap-1">
                <button
                  onClick={() => adoptSuggestion(suggestion)}
                  className="text-green-600 hover:text-green-800 text-sm px-2 py-1 rounded border border-green-200 hover:bg-green-50"
                >
                  채택
                </button>
                <button
                  onClick={() => rejectSuggestion(suggestion.id)}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                >
                  거부
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">AI 콘텐츠 어시스턴트</h2>
        <div className="text-sm text-gray-500">
          OpenAI GPT-4o 기반 콘텐츠 제안 시스템
        </div>
      </div>

      {/* AI 제안 생성 폼 */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">새로운 AI 제안 생성</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">프롬프트</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="예: 홈페이지 히어로 섹션을 더 매력적으로 만들어주세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">콘텐츠 타입</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="hero">히어로 섹션</option>
              <option value="content">일반 콘텐츠</option>
              <option value="seo">SEO 최적화</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">대상 섹션</label>
            <select
              value={targetSection}
              onChange={(e) => setTargetSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="homepage">홈페이지</option>
              <option value="clarus">클라루스</option>
              <option value="tlc">정호티엘씨</option>
              <option value="illutech">일루텍</option>
              <option value="texcom">정호텍스컴</option>
            </select>
          </div>
        </div>
        <button
          onClick={generateAISuggestion}
          disabled={isLoading || !prompt.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'AI 제안 생성 중...' : 'AI 제안 생성'}
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">총 제안</h3>
          <p className="text-2xl font-bold text-blue-600">{suggestions.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800">검토 중</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {suggestions.filter(s => s.status === 'pending').length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">채택됨</h3>
          <p className="text-2xl font-bold text-green-600">
            {suggestions.filter(s => s.status === 'adopted').length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">거부됨</h3>
          <p className="text-2xl font-bold text-red-600">
            {suggestions.filter(s => s.status === 'rejected').length}
          </p>
        </div>
      </div>

      {/* 제안 목록 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI 제안 목록</h3>
        {suggestions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">아직 AI 제안이 없습니다. 위에서 새로운 제안을 생성해보세요!</p>
        ) : (
          <div className="space-y-4">
            {renderSuggestionsList()}
          </div>
        )}
      </div>

      {/* 제안 상세 모달 */}
      {renderSuggestionDetails(selectedSuggestion)}
    </div>
  );
};

export default AIContentAssistant;
