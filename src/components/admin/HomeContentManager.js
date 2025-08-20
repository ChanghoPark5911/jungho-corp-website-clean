import React, { useState } from 'react';

const HomeContentManager = ({ data, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSave = () => {
    onSave('homepage', formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">홈페이지 콘텐츠 관리</h2>
        <div className="space-x-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              편집 모드
            </button>
          )}
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                저장
              </button>
              <button
                onClick={() => {
                  setFormData(data);
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                취소
              </button>
            </>
          )}
        </div>
      </div>

      {/* 히어로 섹션 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">히어로 섹션</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메인 제목 (줄바꿈은 \n으로)
            </label>
            <textarea
              value={formData.hero.title}
              onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명
          </label>
          <textarea
            value={formData.hero.description}
            onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
            disabled={!isEditing}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* 성과 지표 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">성과 지표</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                지표 {index + 1}
              </label>
              <input
                type="text"
                value={achievement.number}
                onChange={(e) => handleArrayChange('achievements', index, 'number', e.target.value)}
                disabled={!isEditing}
                placeholder="숫자"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
              <input
                type="text"
                value={achievement.label}
                onChange={(e) => handleArrayChange('achievements', index, 'label', e.target.value)}
                disabled={!isEditing}
                placeholder="라벨"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 계열사 소개 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">계열사 소개</h3>
        <div className="space-y-4">
          {formData.subsidiaries.map((subsidiary, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">계열사 {index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    value={subsidiary.name}
                    onChange={(e) => handleArrayChange('subsidiaries', index, 'name', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    부제목
                  </label>
                  <input
                    type="text"
                    value={subsidiary.subtitle}
                    onChange={(e) => handleArrayChange('subsidiaries', index, 'subtitle', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    설명
                  </label>
                  <textarea
                    value={subsidiary.description}
                    onChange={(e) => handleArrayChange('subsidiaries', index, 'description', e.target.value)}
                    disabled={!isEditing}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 미리보기 */}
      {isEditing && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">변경사항 미리보기</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">히어로 섹션</h4>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formData.hero.title.split('\\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </p>
            <p className="text-lg text-gray-600 mb-1">{formData.hero.subtitle}</p>
            <p className="text-gray-500">{formData.hero.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeContentManager;



