import React, { useState } from 'react';
import { Button } from '../ui/Button';

const IllutechFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    reviewerName: '',
    department: '',
    role: '',
    reviewDate: new Date().toISOString().split('T')[0],
    overallRating: 5,
    
    // Illutech 전용 섹션별 피드백
    heroSection: '',
    productCategory: '',
    expertCuration: '',
    customizedService: '',
    customerConvenience: '',
    eventBenefit: '',
    customerReview: '',
    contactShopping: '',
    
    // 제품 관련 피드백
    productPresentation: '',
    productImages: '',
    productDescriptions: '',
    
    // 고객 서비스 관련 피드백
    customerService: '',
    personalization: '',
    convenience: '',
    
    // 이벤트 및 혜택 관련 피드백
    eventPromotions: '',
    customerBenefits: '',
    loyaltyProgram: '',
    
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
    console.log('Illutech 피드백 제출:', feedback);
    alert('Illutech 피드백이 성공적으로 제출되었습니다.');
  };

  const departments = [
    'Illutech 마케팅팀',
    'Illutech 기술팀',
    'Illutech 영업팀',
    'Illutech 고객지원팀',
    '정호그룹 마케팅팀',
    '정호그룹 기술팀',
    '전자제품 전문가',
    '고객 서비스 전문가',
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Illutech 전용 피드백 폼</h2>
        <p className="text-gray-600">Illutech 계열사 웹페이지에 대한 상세한 피드백을 제공해주세요.</p>
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
            Illutech 페이지 전체 평가 (1-10점)
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
              제품 카테고리 섹션
            </label>
            <textarea
              name="productCategory"
              value={feedback.productCategory}
              onChange={handleInputChange}
              rows="3"
              placeholder="제품 카테고리 분류, 제품 그룹핑, 탐색 편의성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              전문가 큐레이션 섹션
            </label>
            <textarea
              name="expertCuration"
              value={feedback.expertCuration}
              onChange={handleInputChange}
              rows="3"
              placeholder="전문가 추천, 큐레이션 품질, 신뢰성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              맞춤형 서비스 섹션
            </label>
            <textarea
              name="customizedService"
              value={feedback.customizedService}
              onChange={handleInputChange}
              rows="3"
              placeholder="맞춤형 서비스, 개인화, 고객 니즈 반영 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고객 편의성 섹션
            </label>
            <textarea
              name="customerConvenience"
              value={feedback.customerConvenience}
              onChange={handleInputChange}
              rows="3"
              placeholder="고객 편의성, 사용자 경험, 접근성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이벤트 및 혜택 섹션
            </label>
            <textarea
              name="eventBenefit"
              value={feedback.eventBenefit}
              onChange={handleInputChange}
              rows="3"
              placeholder="이벤트 정보, 혜택 제공, 프로모션 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고객 리뷰 섹션
            </label>
            <textarea
              name="customerReview"
              value={feedback.customerReview}
              onChange={handleInputChange}
              rows="3"
              placeholder="고객 리뷰, 평가 시스템, 신뢰성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              연락처 및 쇼핑 섹션
            </label>
            <textarea
              name="contactShopping"
              value={feedback.contactShopping}
              onChange={handleInputChange}
              rows="3"
              placeholder="연락처 정보, 쇼핑 안내, 구매 프로세스 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 제품 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">제품 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제품 프레젠테이션
            </label>
            <textarea
              name="productPresentation"
              value={feedback.productPresentation}
              onChange={handleInputChange}
              rows="3"
              placeholder="제품 소개 방식, 제품 정보 구조, 시각적 표현 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
        </div>

        {/* 고객 서비스 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">고객 서비스 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고객 서비스 품질
            </label>
            <textarea
              name="customerService"
              value={feedback.customerService}
              onChange={handleInputChange}
              rows="3"
              placeholder="고객 서비스 품질, 전문성, 고객 만족도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              개인화 및 맞춤형 서비스
            </label>
            <textarea
              name="personalization"
              value={feedback.personalization}
              onChange={handleInputChange}
              rows="3"
              placeholder="개인화 서비스, 맞춤형 추천, 고객 니즈 반영 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              편의성 및 사용성
            </label>
            <textarea
              name="convenience"
              value={feedback.convenience}
              onChange={handleInputChange}
              rows="3"
              placeholder="사용 편의성, 접근성, 사용자 경험 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 이벤트 및 혜택 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">이벤트 및 혜택 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이벤트 및 프로모션
            </label>
            <textarea
              name="eventPromotions"
              value={feedback.eventPromotions}
              onChange={handleInputChange}
              rows="3"
              placeholder="이벤트 정보, 프로모션 효과, 고객 참여도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고객 혜택 및 보상
            </label>
            <textarea
              name="customerBenefits"
              value={feedback.customerBenefits}
              onChange={handleInputChange}
              rows="3"
              placeholder="고객 혜택, 보상 프로그램, 고객 만족도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              로열티 프로그램
            </label>
            <textarea
              name="loyaltyProgram"
              value={feedback.loyaltyProgram}
              onChange={handleInputChange}
              rows="3"
              placeholder="로열티 프로그램, 고객 유지, 장기 관계 등에 대한 의견을 작성해주세요."
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
            placeholder="Illutech 페이지 개선을 위한 구체적인 제안사항이나 아이디어를 작성해주세요."
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
              productCategory: '',
              expertCuration: '',
              customizedService: '',
              customerConvenience: '',
              eventBenefit: '',
              customerReview: '',
              contactShopping: '',
              productPresentation: '',
              productImages: '',
              productDescriptions: '',
              customerService: '',
              personalization: '',
              convenience: '',
              eventPromotions: '',
              customerBenefits: '',
              loyaltyProgram: '',
              suggestions: '',
              priority: 'medium',
              status: 'pending'
            })}
          >
            초기화
          </Button>
          <Button type="submit" variant="primary">
            Illutech 피드백 제출
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IllutechFeedbackForm;
