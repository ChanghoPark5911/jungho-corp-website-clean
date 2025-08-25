import React, { useState } from 'react';
import Button from '../ui/Button';

const TlcFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    reviewerName: '',
    department: '',
    role: '',
    reviewDate: new Date().toISOString().split('T')[0],
    overallRating: 5,
    
    // TLC 전용 섹션별 피드백
    heroSection: '',
    serviceArea: '',
    projectProcess: '',
    nationalNetwork: '',
    asCenter: '',
    keyCustomers: '',
    customerSupport: '',
    contactSection: '',
    
    // 서비스 관련 피드백
    serviceQuality: '',
    serviceRange: '',
    customerExperience: '',
    
    // 네트워크 관련 피드백
    networkCoverage: '',
    localPresence: '',
    regionalExpertise: '',
    
    // 고객 지원 관련 피드백
    supportQuality: '',
    responseTime: '',
    technicalExpertise: '',
    
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
    console.log('TLC 피드백 제출:', feedback);
    alert('TLC 피드백이 성공적으로 제출되었습니다.');
  };

  const departments = [
    'TLC 마케팅팀',
    'TLC 기술팀',
    'TLC 영업팀',
    'TLC 고객지원팀',
    '정호그룹 마케팅팀',
    '정호그룹 기술팀',
    '서비스 전문가',
    '네트워크 전문가',
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">TLC 전용 피드백 폼</h2>
        <p className="text-gray-600">TLC 계열사 웹페이지에 대한 상세한 피드백을 제공해주세요.</p>
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
            TLC 페이지 전체 평가 (1-10점)
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
              서비스 영역 섹션
            </label>
            <textarea
              name="serviceArea"
              value={feedback.serviceArea}
              onChange={handleInputChange}
              rows="3"
              placeholder="서비스 범위, 서비스 특징, 고객 가치 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프로젝트 프로세스 섹션
            </label>
            <textarea
              name="projectProcess"
              value={feedback.projectProcess}
              onChange={handleInputChange}
              rows="3"
              placeholder="프로젝트 진행 과정, 단계별 설명, 고객 참여도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              전국 네트워크 섹션
            </label>
            <textarea
              name="nationalNetwork"
              value={feedback.nationalNetwork}
              onChange={handleInputChange}
              rows="3"
              placeholder="전국 네트워크 현황, 지역별 서비스, 현지 전문성 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AS 센터 섹션
            </label>
            <textarea
              name="asCenter"
              value={feedback.asCenter}
              onChange={handleInputChange}
              rows="3"
              placeholder="AS 센터 정보, 서비스 품질, 응답 속도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주요 고객사 섹션
            </label>
            <textarea
              name="keyCustomers"
              value={feedback.keyCustomers}
              onChange={handleInputChange}
              rows="3"
              placeholder="주요 고객사 소개, 고객 사례, 성과 등에 대한 의견을 작성해주세요."
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
              placeholder="고객 지원 서비스, 연락처, 지원 범위 등에 대한 의견을 작성해주세요."
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

        {/* 서비스 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">서비스 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              서비스 품질 및 수준
            </label>
            <textarea
              name="serviceQuality"
              value={feedback.serviceQuality}
              onChange={handleInputChange}
              rows="3"
              placeholder="서비스 품질, 전문성, 고객 만족도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              서비스 범위 및 다양성
            </label>
            <textarea
              name="serviceRange"
              value={feedback.serviceRange}
              onChange={handleInputChange}
              rows="3"
              placeholder="서비스 범위, 서비스 다양성, 고객 니즈 충족도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              고객 경험 및 만족도
            </label>
            <textarea
              name="customerExperience"
              value={feedback.customerExperience}
              onChange={handleInputChange}
              rows="3"
              placeholder="고객 경험, 서비스 프로세스, 고객 만족도 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 네트워크 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">네트워크 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              네트워크 커버리지 및 확장성
            </label>
            <textarea
              name="networkCoverage"
              value={feedback.networkCoverage}
              onChange={handleInputChange}
              rows="3"
              placeholder="전국 네트워크 커버리지, 확장성, 지역별 서비스 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지역별 현지 프레즌스
            </label>
            <textarea
              name="localPresence"
              value={feedback.localPresence}
              onChange={handleInputChange}
              rows="3"
              placeholder="지역별 현지 프레즌스, 현지 전문성, 지역 고객 서비스 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지역별 전문성 및 노하우
            </label>
            <textarea
              name="regionalExpertise"
              value={feedback.regionalExpertise}
              onChange={handleInputChange}
              rows="3"
              placeholder="지역별 전문성, 지역 노하우, 지역 특성 반영 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 고객 지원 관련 피드백 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">고객 지원 관련 피드백</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              지원 품질 및 전문성
            </label>
            <textarea
              name="supportQuality"
              value={feedback.supportQuality}
              onChange={handleInputChange}
              rows="3"
              placeholder="고객 지원 품질, 전문성, 문제 해결 능력 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              응답 속도 및 대응성
            </label>
            <textarea
              name="responseTime"
              value={feedback.responseTime}
              onChange={handleInputChange}
              rows="3"
              placeholder="응답 속도, 대응성, 고객 요청 처리 등에 대한 의견을 작성해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              기술적 전문성 및 해결 능력
            </label>
            <textarea
              name="technicalExpertise"
              value={feedback.technicalExpertise}
              onChange={handleInputChange}
              rows="3"
              placeholder="기술적 전문성, 문제 해결 능력, 기술 지원 등에 대한 의견을 작성해주세요."
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
            placeholder="TLC 페이지 개선을 위한 구체적인 제안사항이나 아이디어를 작성해주세요."
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
              serviceArea: '',
              projectProcess: '',
              nationalNetwork: '',
              asCenter: '',
              keyCustomers: '',
              customerSupport: '',
              contactSection: '',
              serviceQuality: '',
              serviceRange: '',
              customerExperience: '',
              networkCoverage: '',
              localPresence: '',
              regionalExpertise: '',
              supportQuality: '',
              responseTime: '',
              technicalExpertise: '',
              suggestions: '',
              priority: 'medium',
              status: 'pending'
            })}
          >
            초기화
          </Button>
          <Button type="submit" variant="primary">
            TLC 피드백 제출
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TlcFeedbackForm;
