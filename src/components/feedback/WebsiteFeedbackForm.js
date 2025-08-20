import React, { useState } from 'react';
import { Button } from '../ui/Button';

const WebsiteFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    reviewerName: '',
    department: '',
    role: '',
    reviewDate: new Date().toISOString().split('T')[0],
    overallRating: 5,
    navigationFeedback: '',
    designFeedback: '',
    contentFeedback: '',
    functionalityFeedback: '',
    accessibilityFeedback: '',
    mobileResponsiveness: '',
    loadingSpeed: '',
    seoFeedback: '',
    suggestions: '',
    priority: 'medium',
    status: 'pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 피드백 제출 로직 추가
    console.log('피드백 제출:', feedback);
    alert('피드백이 성공적으로 제출되었습니다.');
  };

  const departments = [
    '경영진',
    '마케팅팀',
    '기술개발팀',
    '영업팀',
    '고객지원팀',
    '인사팀',
    '재무팀',
    '기타'
  ];

  const roles = [
    '팀장',
    '팀원',
    '인턴',
    '기타'
  ];

  const priorities = [
    { value: 'low', label: '낮음' },
    { value: 'medium', label: '보통' },
    { value: 'high', label: '높음' },
    { value: 'urgent', label: '긴급' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">웹사이트 전체 구조 피드백</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              검토자 이름 *
            </label>
            <input
              type="text"
              name="reviewerName"
              value={feedback.reviewerName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              소속 부서 *
            </label>
            <select
              name="department"
              value={feedback.department}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택하세요</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              직급 *
            </label>
            <select
              name="role"
              value={feedback.role}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">선택하세요</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 전체 평가 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            전체적인 웹사이트 평가 (1-10점)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              name="overallRating"
              min="1"
              max="10"
              value={feedback.overallRating}
              onChange={handleInputChange}
              className="flex-1"
            />
            <span className="text-lg font-semibold text-blue-600 min-w-[3rem]">
              {feedback.overallRating}/10
            </span>
          </div>
        </div>

        {/* 네비게이션 피드백 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            네비게이션 및 사용성 피드백
          </label>
          <textarea
            name="navigationFeedback"
            value={feedback.navigationFeedback}
            onChange={handleInputChange}
            rows="3"
            placeholder="메뉴 구조, 페이지 이동, 사용자 경험 등에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 디자인 피드백 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            디자인 및 시각적 요소 피드백
          </label>
          <textarea
            name="designFeedback"
            value={feedback.designFeedback}
            onChange={handleInputChange}
            rows="3"
            placeholder="색상, 폰트, 레이아웃, 이미지 등 디자인 요소에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 콘텐츠 피드백 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            콘텐츠 및 정보 피드백
          </label>
          <textarea
            name="contentFeedback"
            value={feedback.contentFeedback}
            onChange={handleInputChange}
            rows="3"
            placeholder="텍스트 내용, 정보의 정확성, 업데이트 필요성 등에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 기능성 피드백 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기능 및 기술적 요소 피드백
          </label>
          <textarea
            name="functionalityFeedback"
            value={feedback.functionalityFeedback}
            onChange={handleInputChange}
            rows="3"
            placeholder="폼 작동, 링크 연결, 반응형 디자인 등 기능적 요소에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 접근성 피드백 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            접근성 및 사용성 피드백
          </label>
          <textarea
            name="accessibilityFeedback"
            value={feedback.accessibilityFeedback}
            onChange={handleInputChange}
            rows="3"
            placeholder="장애인 접근성, 모바일 사용성, 키보드 네비게이션 등에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 모바일 반응형 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            모바일 및 태블릿 반응형 디자인 피드백
          </label>
          <textarea
            name="mobileResponsiveness"
            value={feedback.mobileResponsiveness}
            onChange={handleInputChange}
            rows="3"
            placeholder="모바일에서의 사용성, 화면 크기별 레이아웃 등에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 로딩 속도 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            로딩 속도 및 성능 피드백
          </label>
          <textarea
            name="loadingSpeed"
            value={feedback.loadingSpeed}
            onChange={handleInputChange}
            rows="3"
            placeholder="페이지 로딩 속도, 이미지 최적화, 전반적인 성능 등에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* SEO 피드백 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SEO 및 검색 최적화 피드백
          </label>
          <textarea
            name="seoFeedback"
            value={feedback.seoFeedback}
            onChange={handleInputChange}
            rows="3"
            placeholder="검색 엔진 최적화, 메타 태그, 키워드 등에 대한 의견을 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 개선 제안 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            구체적인 개선 제안사항
          </label>
          <textarea
            name="suggestions"
            value={feedback.suggestions}
            onChange={handleInputChange}
            rows="4"
            placeholder="웹사이트 개선을 위한 구체적인 제안사항이나 아이디어를 작성해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 우선순위 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            개선 우선순위
          </label>
          <select
            name="priority"
            value={feedback.priority}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFeedback({
              reviewerName: '',
              department: '',
              role: '',
              reviewDate: new Date().toISOString().split('T')[0],
              overallRating: 5,
              navigationFeedback: '',
              designFeedback: '',
              contentFeedback: '',
              functionalityFeedback: '',
              accessibilityFeedback: '',
              mobileResponsiveness: '',
              loadingSpeed: '',
              seoFeedback: '',
              suggestions: '',
              priority: 'medium',
              status: 'pending'
            })}
          >
            초기화
          </Button>
          <Button type="submit" variant="primary">
            피드백 제출
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WebsiteFeedbackForm;
