import React, { useState, useEffect } from 'react';
import { FiEdit3, FiSave, FiX } from 'react-icons/fi';

const SimpleHomeContentManager = ({ data, onSave }) => {
  // 기본 데이터 구조
  const defaultData = {
    hero: {
      title: '정호그룹\n조명의 미래를\n만들어갑니다',
      subtitle: '40년 전통의 조명제어 전문기업',
      description: '혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다'
    },
    achievements: [
      { number: '40', label: '년 전통' },
      { number: '1000+', label: '프로젝트' },
      { number: '50+', label: '국가 진출' },
      { number: '99%', label: '고객 만족도' }
    ],
    group: {
      title: '정호그룹 소개',
      description: '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.'
    },
    subsidiaries: [
      {
        name: '클라루스',
        subtitle: '조명제어 시스템',
        description: '스마트 조명제어 솔루션 전문기업'
      },
      {
        name: '정호티엘씨',
        subtitle: 'LED 조명',
        description: '친환경 LED 조명 제품 전문기업'
      },
      {
        name: '일루텍',
        subtitle: '조명 디자인',
        description: '창의적인 조명 디자인 전문기업'
      },
      {
        name: '정호텍스컴',
        subtitle: '조명 기술',
        description: '최첨단 조명 기술 개발 전문기업'
      }
    ]
  };

  // 데이터가 없거나 불완전한 경우 기본값 사용
  const safeData = data && typeof data === 'object' ? { ...defaultData, ...data } : defaultData;
  
  const [formData, setFormData] = useState(safeData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalData, setOriginalData] = useState(safeData);

  // data prop이 변경될 때 formData 업데이트
  useEffect(() => {
    if (data && typeof data === 'object') {
      const updatedData = { ...defaultData, ...data };
      setFormData(updatedData);
      setOriginalData(updatedData);
    }
  }, [data]);

  // 편집모드 시작
  const startEditMode = () => {
    setOriginalData({ ...formData });
    setIsEditMode(true);
  };

  // 편집모드 취소
  const cancelEdit = () => {
    setFormData({ ...originalData });
    setIsEditMode(false);
  };

  // 통합저장
  const handleSave = async () => {
    try {
      console.log('저장할 데이터:', formData);
      console.log('Hero Section 데이터:', formData.hero);
      await onSave('homepage', formData);
      setIsEditMode(false);
      alert('✅ 모든 변경사항이 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('저장 오류:', error);
      alert('❌ 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 입력 필드 변경 처리
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // 디버깅을 위한 로그
    console.log('Hero Section 변경:', section, field, value);
    console.log('현재 formData.hero:', prev.hero);
  };

  // 배열 필드 변경 처리 (achievements, subsidiaries)
  const handleArrayFieldChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">홈페이지 콘텐츠 관리</h2>
        <div className="flex gap-2">
          {!isEditMode ? (
            <button
              onClick={startEditMode}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <FiEdit3 className="w-4 h-4" />
              편집모드 시작
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <FiSave className="w-4 h-4" />
                통합저장
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-4 h-4" />
                편집취소
              </button>
            </>
          )}
        </div>
      </div>

      {/* 편집 상태 표시 */}
      {isEditMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-medium">편집 모드</span>
          </div>
          <p className="text-blue-600 text-sm mt-1">
            원하는 항목만 수정하고 "통합저장" 버튼을 클릭하세요. 수정하지 않은 항목은 기본값이 유지됩니다.
          </p>
        </div>
      )}

      {/* 히어로 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">히어로 섹션</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메인 제목
            </label>
            <textarea
              value={formData.hero.title}
              onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
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
              value={formData.hero.subtitle}
              onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="부제목을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={formData.hero.description}
              onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              rows={2}
              placeholder="설명을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* 성과 지표 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">성과 지표</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {achievement.label}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={achievement.number}
                  onChange={(e) => handleArrayFieldChange('achievements', index, 'number', e.target.value)}
                  disabled={!isEditMode}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="숫자 입력"
                />
                <input
                  type="text"
                  value={achievement.label}
                  onChange={(e) => handleArrayFieldChange('achievements', index, 'label', e.target.value)}
                  disabled={!isEditMode}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  placeholder="라벨 입력"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 그룹 소개 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">그룹 소개</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={formData.group.title}
              onChange={(e) => handleInputChange('group', 'title', e.target.value)}
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="제목을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={formData.group.description}
              onChange={(e) => handleInputChange('group', 'description', e.target.value)}
              disabled={!isEditMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              rows={3}
              placeholder="설명을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* 계열사 섹션 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">계열사 소개</h3>
        <div className="space-y-6">
          {formData.subsidiaries.map((subsidiary, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium text-gray-900 mb-3">{subsidiary.name}</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    부제목
                  </label>
                  <input
                    type="text"
                    value={subsidiary.subtitle}
                    onChange={(e) => handleArrayFieldChange('subsidiaries', index, 'subtitle', e.target.value)}
                    disabled={!isEditMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="부제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    value={subsidiary.description}
                    onChange={(e) => handleArrayFieldChange('subsidiaries', index, 'description', e.target.value)}
                    disabled={!isEditMode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    rows={2}
                    placeholder="설명을 입력하세요"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 저장 버튼 (편집 모드일 때만) */}
      {isEditMode && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-6">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              <FiSave className="w-5 h-5" />
              통합저장
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors font-medium"
            >
              <FiX className="w-5 h-5" />
              편집취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleHomeContentManager;
