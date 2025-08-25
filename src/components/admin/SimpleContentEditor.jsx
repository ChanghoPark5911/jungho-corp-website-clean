import React, { useState } from 'react';

const SimpleContentEditor = ({ homeData, onSave, onApprove }) => {
  const [editingData, setEditingData] = useState(homeData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (section, field, value) => {
    setEditingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(editingData);
    setIsEditing(false);
  };

  const handleApprove = () => {
    onApprove(editingData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingData(homeData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">📝 간단한 콘텐츠 수정</h3>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              ✏️ 수정 시작
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium"
              >
                💾 저장
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 font-medium"
              >
                ❌ 취소
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          {/* 히어로 섹션 */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-blue-600">🎯 히어로 섹션</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">메인 타이틀</label>
                <textarea
                  value={editingData.hero.title}
                  onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="메인 타이틀을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">부제목</label>
                <input
                  type="text"
                  value={editingData.hero.subtitle}
                  onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="부제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <textarea
                  value={editingData.hero.description}
                  onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={2}
                  placeholder="설명을 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* 그룹 소개 섹션 */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-green-600">🏢 그룹 소개</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">그룹 설명</label>
                <textarea
                  value={editingData.group.description}
                  onChange={(e) => handleInputChange('group', 'description', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  placeholder="그룹에 대한 설명을 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* 성과 지표 */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-purple-600">📊 성과 지표</h4>
            <div className="grid grid-cols-2 gap-4">
              {editingData.achievements.map((achievement, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {achievement.label}
                  </label>
                  <input
                    type="text"
                    value={achievement.number}
                    onChange={(e) => {
                      const newAchievements = [...editingData.achievements];
                      newAchievements[index] = {
                        ...newAchievements[index],
                        number: e.target.value
                      };
                      setEditingData(prev => ({
                        ...prev,
                        achievements: newAchievements
                      }));
                    }}
                    className="w-full p-2 border rounded-md"
                    placeholder="숫자 입력"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 승인 버튼 */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleApprove}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 font-bold text-lg"
            >
              ✅ 승인 및 웹페이지 반영
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p className="mb-4">수정할 콘텐츠를 선택하고 "수정 시작" 버튼을 클릭하세요.</p>
          <div className="bg-gray-100 rounded-lg p-4 text-left">
            <h5 className="font-semibold mb-2">현재 설정된 콘텐츠:</h5>
            <p><strong>타이틀:</strong> {homeData.hero.title}</p>
            <p><strong>부제목:</strong> {homeData.hero.subtitle}</p>
            <p><strong>그룹 설명:</strong> {homeData.group.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleContentEditor;


