import React, { useState } from 'react';
import Button from '../ui/Button';

const ClarusFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    reviewerName: '',
    department: '',
    role: '',
    reviewDate: new Date().toISOString().split('T')[0],
    overallRating: 5,
    
    // Clarus 전용 섹션별 피드백
    heroSection: '',
    coreTechnology: '',
    productLineup: '',
    projectPortfolio: '',
    rndStatus: '',
    technicalSupport: '',
    contactSection: '',
    globalPresence: '',
    
    // 제품 관련 피드백
    productImages: '',
    productDescriptions: '',
    technicalSpecs: '',
    
    // 브랜드 관련 피드백
    brandMessage: '',
    visualIdentity: '',
    targetAudience: '',
    
    // 기술 관련 피드백
    technologyAccuracy: '',
    innovationContent: '',
    rndHighlights: '',
    
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
    console.log('Clarus 피드백 제출:', feedback);
    alert('Clarus 피드백이 성공적으로 제출되었습니다.');
  };

  const departments = [
    'Clarus 마케팅팀',
    'Clarus 기술팀',
    'Clarus 영업팀',
    'Clarus 고객지원팀',
    '정호그룹 마케팅팀',
    '정호그룹 기술팀',
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Clarus 전용 피드백 폼</h2>
        <p className="text-gray-600">Clarus 계열사 웹페이지에 대한 상세한 피드백을 제공해주세요.</p>
      </div>
      
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
            <input
              type="text"
              name="role"
              value={feedback.role}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 전체 평가 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clarus 페이지 전체 평가 (1-10점)
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

        {/* 섹션별 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">섹션별 상세 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              히어로 섹션 (메인 타이틀 및 소개)
            </label>
            <textarea
              name="heroSection"
              value={feedback.heroSection}
              onChange={handleInputChange}
              rows="3"
              placeholder="메인 타이틀, 소개 문구, 배경 이미지 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              핵심 기술 섹션
            </label>
            <textarea
              name="coreTechnology"
              value={feedback.coreTechnology}
              onChange={handleInputChange}
              rows="3"
              placeholder="핵심 기술 설명, 기술적 정확성, 표현 방식 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 라인업 섹션
            </label>
            <textarea
              name="productLineup"
              value={feedback.productLineup}
              onChange={handleInputChange}
              rows="3"
              placeholder="제품 카테고리, 제품 정보, 이미지 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 포트폴리오 섹션
            </label>
            <textarea
              name="projectPortfolio"
              value={feedback.projectPortfolio}
              onChange={handleInputChange}
              rows="3"
              placeholder="프로젝트 사례, 성과, 고객 정보 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              R&D 현황 섹션
            </label>
            <textarea
              name="rndStatus"
              value={feedback.rndStatus}
              onChange={handleInputChange}
              rows="3"
              placeholder="연구개발 현황, 혁신 기술, 미래 계획 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기술 지원 섹션
            </label>
            <textarea
              name="technicalSupport"
              value={feedback.technicalSupport}
              onChange={handleInputChange}
              rows="3"
              placeholder="기술 지원 서비스, 연락처, 지원 범위 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연락처 섹션
            </label>
            <textarea
              name="contactSection"
              value={feedback.contactSection}
              onChange={handleInputChange}
              rows="3"
              placeholder="연락처 정보, 주소, 지도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              글로벌 프레즌스 섹션
            </label>
            <textarea
              name="globalPresence"
              value={feedback.globalPresence}
              onChange={handleInputChange}
              rows="3"
              placeholder="해외 진출 현황, 글로벌 네트워크, 국제 협력 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 제품 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">제품 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 이미지 및 시각 자료
            </label>
            <textarea
              name="productImages"
              value={feedback.productImages}
              onChange={handleInputChange}
              rows="3"
              placeholder="제품 이미지 품질, 다양성, 업데이트 필요성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 설명 및 특징
            </label>
            <textarea
              name="productDescriptions"
              value={feedback.productDescriptions}
              onChange={handleInputChange}
              rows="3"
              placeholder="제품 설명의 정확성, 이해하기 쉬운 정도, 마케팅 효과 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기술 사양 및 데이터
            </label>
            <textarea
              name="technicalSpecs"
              value={feedback.technicalSpecs}
              onChange={handleInputChange}
              rows="3"
              placeholder="기술 사양의 정확성, 업데이트 필요성, 고객이 원하는 정보 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 브랜드 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">브랜드 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              브랜드 메시지 및 포지셔닝
            </label>
            <textarea
              name="brandMessage"
              value={feedback.brandMessage}
              onChange={handleInputChange}
              rows="3"
              placeholder="브랜드 메시지의 명확성, 타겟 고객과의 일치도, 경쟁사 대비 차별화 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시각적 아이덴티티
            </label>
            <textarea
              name="visualIdentity"
              value={feedback.visualIdentity}
              onChange={handleInputChange}
              rows="3"
              placeholder="로고, 색상, 폰트, 전체적인 디자인 일관성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              타겟 오디언스 및 고객층
            </label>
            <textarea
              name="targetAudience"
              value={feedback.targetAudience}
              onChange={handleInputChange}
              rows="3"
              placeholder="타겟 고객층의 명확성, 고객 니즈 반영도, 고객 경험 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 기술 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">기술 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기술 정보의 정확성
            </label>
            <textarea
              name="technologyAccuracy"
              value={feedback.technologyAccuracy}
              onChange={handleInputChange}
              rows="3"
              placeholder="기술 정보의 정확성, 최신성, 전문성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              혁신 기술 콘텐츠
            </label>
            <textarea
              name="innovationContent"
              value={feedback.innovationContent}
              onChange={handleInputChange}
              rows="3"
              placeholder="혁신 기술 소개, 미래 기술 방향성, 경쟁력 있는 기술 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              R&D 하이라이트 및 성과
            </label>
            <textarea
              name="rndHighlights"
              value={feedback.rndHighlights}
              onChange={handleInputChange}
              rows="3"
              placeholder="R&D 성과, 특허, 연구 논문, 협력 연구 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            placeholder="Clarus 페이지 개선을 위한 구체적인 제안사항이나 아이디어를 작성해주세요."
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
              heroSection: '',
              coreTechnology: '',
              productLineup: '',
              projectPortfolio: '',
              rndStatus: '',
              technicalSupport: '',
              contactSection: '',
              globalPresence: '',
              productImages: '',
              productDescriptions: '',
              technicalSpecs: '',
              brandMessage: '',
              visualIdentity: '',
              targetAudience: '',
              technologyAccuracy: '',
              innovationContent: '',
              rndHighlights: '',
              suggestions: '',
              priority: 'medium',
              status: 'pending'
            })}
          >
            초기화
          </Button>
          <Button type="submit" variant="primary">
            Clarus 피드백 제출
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClarusFeedbackForm;
