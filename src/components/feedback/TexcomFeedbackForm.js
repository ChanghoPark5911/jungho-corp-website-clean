import React, { useState } from 'react';
import Button from '../ui/Button';

const TexcomFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    reviewerName: '',
    department: '',
    role: '',
    reviewDate: new Date().toISOString().split('T')[0],
    overallRating: 5,
    
    // Texcom 전용 섹션별 피드백
    heroSection: '',
    businessArea: '',
    coreStrengths: '',
    innovationTechnology: '',
    productService: '',
    keyAchievements: '',
    customerSupport: '',
    contactSection: '',
    
    // 섬유기계 관련 피드백
    textileMachinery: '',
    technicalSpecs: '',
    industryStandards: '',
    
    // 패션 브랜드 관련 피드백
    fashionBrand: '',
    brandPositioning: '',
    targetMarket: '',
    
    // 기술 혁신 관련 피드백
    technologyInnovation: '',
    rndFocus: '',
    futureVision: '',
    
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
    console.log('Texcom 피드백 제출:', feedback);
    alert('Texcom 피드백이 성공적으로 제출되었습니다.');
  };

  const departments = [
    'Texcom 마케팅팀',
    'Texcom 기술팀',
    'Texcom 영업팀',
    'Texcom 고객지원팀',
    '정호그룹 마케팅팀',
    '정호그룹 기술팀',
    '섬유기계 전문가',
    '패션 브랜드 전문가',
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Texcom 전용 피드백 폼</h2>
        <p className="text-gray-600">Texcom 계열사 웹페이지에 대한 상세한 피드백을 제공해주세요.</p>
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
            Texcom 페이지 전체 평가 (1-10점)
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
              placeholder="'섬유의 전통, 패션의 미래' 메시지, 소개 문구, 배경 이미지 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사업 영역 섹션
            </label>
            <textarea
              name="businessArea"
              value={feedback.businessArea}
              onChange={handleInputChange}
              rows="3"
              placeholder="섬유기계 사업, 패션 브랜드 사업 등 사업 영역 설명에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              핵심 강점 섹션
            </label>
            <textarea
              name="coreStrengths"
              value={feedback.coreStrengths}
              onChange={handleInputChange}
              rows="3"
              placeholder="40년 전통, 전문성, 경쟁력 등 핵심 강점 표현에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              혁신 기술 섹션
            </label>
            <textarea
              name="innovationTechnology"
              value={feedback.innovationTechnology}
              onChange={handleInputChange}
              rows="3"
              placeholder="혁신 기술 소개, 미래 기술 방향성, R&D 성과 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 및 서비스 섹션
            </label>
            <textarea
              name="productService"
              value={feedback.productService}
              onChange={handleInputChange}
              rows="3"
              placeholder="섬유기계 제품, 패션 제품, 서비스 범위 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주요 성과 섹션
            </label>
            <textarea
              name="keyAchievements"
              value={feedback.keyAchievements}
              onChange={handleInputChange}
              rows="3"
              placeholder="주요 프로젝트, 고객 사례, 업계 인정 등 성과 표현에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고객 지원 섹션
            </label>
            <textarea
              name="customerSupport"
              value={feedback.customerSupport}
              onChange={handleInputChange}
              rows="3"
              placeholder="고객 지원 서비스, 기술 지원, 연락처 등에 대한 의견을 작성해주세요."
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
        </div>

        {/* 섬유기계 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">섬유기계 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              섬유기계 제품 정보
            </label>
            <textarea
              name="textileMachinery"
              value={feedback.textileMachinery}
              onChange={handleInputChange}
              rows="3"
              placeholder="섬유기계 제품 라인업, 기술 사양, 제품 이미지 등에 대한 의견을 작성해주세요."
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              업계 표준 및 인증
            </label>
            <textarea
              name="industryStandards"
              value={feedback.industryStandards}
              onChange={handleInputChange}
              rows="3"
              placeholder="업계 표준 준수, 인증 정보, 품질 보증 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 패션 브랜드 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">패션 브랜드 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              패션 브랜드 포지셔닝
            </label>
            <textarea
              name="fashionBrand"
              value={feedback.fashionBrand}
              onChange={handleInputChange}
              rows="3"
              placeholder="패션 브랜드의 포지셔닝, 차별화 요소, 브랜드 가치 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              브랜드 메시지 및 스토리
            </label>
            <textarea
              name="brandPositioning"
              value={feedback.brandPositioning}
              onChange={handleInputChange}
              rows="3"
              placeholder="브랜드 스토리, 메시지의 명확성, 감정적 연결 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              타겟 시장 및 고객층
            </label>
            <textarea
              name="targetMarket"
              value={feedback.targetMarket}
              onChange={handleInputChange}
              rows="3"
              placeholder="타겟 시장 정의, 고객층 분석, 시장 진입 전략 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 기술 혁신 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">기술 혁신 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기술 혁신 콘텐츠
            </label>
            <textarea
              name="technologyInnovation"
              value={feedback.technologyInnovation}
              onChange={handleInputChange}
              rows="3"
              placeholder="기술 혁신 내용, 혁신성 표현, 미래 기술 방향성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              R&D 집중 분야
            </label>
            <textarea
              name="rndFocus"
              value={feedback.rndFocus}
              onChange={handleInputChange}
              rows="3"
              placeholder="R&D 집중 분야, 연구 방향, 협력 연구 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              미래 비전 및 계획
            </label>
            <textarea
              name="futureVision"
              value={feedback.futureVision}
              onChange={handleInputChange}
              rows="3"
              placeholder="미래 비전, 장기 계획, 지속가능성 등에 대한 의견을 작성해주세요."
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
            placeholder="Texcom 페이지 개선을 위한 구체적인 제안사항이나 아이디어를 작성해주세요."
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
              businessArea: '',
              coreStrengths: '',
              innovationTechnology: '',
              productService: '',
              keyAchievements: '',
              customerSupport: '',
              contactSection: '',
              textileMachinery: '',
              technicalSpecs: '',
              industryStandards: '',
              fashionBrand: '',
              brandPositioning: '',
              targetMarket: '',
              technologyInnovation: '',
              rndFocus: '',
              futureVision: '',
              suggestions: '',
              priority: 'medium',
              status: 'pending'
            })}
          >
            초기화
          </Button>
          <Button type="submit" variant="primary">
            Texcom 피드백 제출
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TexcomFeedbackForm;
