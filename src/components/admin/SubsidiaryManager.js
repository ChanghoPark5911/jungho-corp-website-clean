import React, { useState } from 'react';

const SubsidiaryManager = ({ data, onSave, currentUser }) => {
  const [subsidiaryData, setSubsidiaryData] = useState(data);
  const [editingSubsidiary, setEditingSubsidiary] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 사용자 권한에 따른 접근 가능한 계열사
  const getAccessibleSubsidiaries = () => {
    if (currentUser?.role === 'super_admin') {
      return Object.keys(subsidiaryData);
    }
    
    const userDepartment = currentUser?.department?.toLowerCase();
    if (userDepartment === '클라루스') return ['clarus'];
    if (userDepartment === '정호텍스컴') return ['texcom'];
    if (userDepartment === '정호티엘씨') return ['tlc'];
    if (userDepartment === '일루텍') return ['illutech'];
    
    return [];
  };

  const accessibleSubsidiaries = getAccessibleSubsidiaries();

  const subsidiaryNames = {
    clarus: '클라루스',
    texcom: '정호텍스컴',
    tlc: '정호티엘씨',
    illutech: '일루텍'
  };

  const handleInputChange = (subsidiary, section, field, value) => {
    setSubsidiaryData(prev => ({
      ...prev,
      [subsidiary]: {
        ...prev[subsidiary],
        [section]: {
          ...prev[subsidiary][section],
          [field]: value
        }
      }
    }));
  };

  const handleSave = (subsidiary) => {
    onSave(`subsidiary_${subsidiary}`, subsidiaryData[subsidiary]);
    setEditingSubsidiary(null);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingSubsidiary(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">계열사 콘텐츠 관리</h2>
        <div className="text-sm text-gray-600">
          담당: {currentUser?.department || '전체'}
        </div>
      </div>

      {/* 계열사별 관리 섹션 */}
      {accessibleSubsidiaries.map(subsidiaryKey => (
        <div key={subsidiaryKey} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {subsidiaryNames[subsidiaryKey]}
              </h3>
              {!isEditing && (
                <button
                  onClick={() => {
                    setEditingSubsidiary(subsidiaryKey);
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  편집
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {editingSubsidiary === subsidiaryKey && isEditing ? (
              <div className="space-y-6">
                {/* 히어로 섹션 */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">히어로 섹션</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        제목
                      </label>
                      <input
                        type="text"
                        value={subsidiaryData[subsidiaryKey].hero.title}
                        onChange={(e) => handleInputChange(subsidiaryKey, 'hero', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        부제목
                      </label>
                      <input
                        type="text"
                        value={subsidiaryData[subsidiaryKey].hero.subtitle}
                        onChange={(e) => handleInputChange(subsidiaryKey, 'hero', 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설명
                    </label>
                    <textarea
                      value={subsidiaryData[subsidiaryKey].hero.description}
                      onChange={(e) => handleInputChange(subsidiaryKey, 'hero', 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 연락처 정보 */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">연락처 정보</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        주소
                      </label>
                      <input
                        type="text"
                        value={subsidiaryData[subsidiaryKey].contact.address}
                        onChange={(e) => handleInputChange(subsidiaryKey, 'contact', 'address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        전화번호
                      </label>
                      <input
                        type="text"
                        value={subsidiaryData[subsidiaryKey].contact.phone}
                        onChange={(e) => handleInputChange(subsidiaryKey, 'contact', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        value={subsidiaryData[subsidiaryKey].contact.email}
                        onChange={(e) => handleInputChange(subsidiaryKey, 'contact', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleSave(subsidiaryKey)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 히어로 섹션 미리보기 */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">히어로 섹션</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="text-xl font-bold text-gray-900 mb-1">
                      {subsidiaryData[subsidiaryKey].hero.title}
                    </h5>
                    <p className="text-lg text-gray-600 mb-1">
                      {subsidiaryData[subsidiaryKey].hero.subtitle}
                    </p>
                    <p className="text-gray-500">
                      {subsidiaryData[subsidiaryKey].hero.description}
                    </p>
                  </div>
                </div>

                {/* 연락처 정보 미리보기 */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">연락처 정보</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">주소:</span>
                        <p className="text-gray-600">{subsidiaryData[subsidiaryKey].contact.address}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">전화:</span>
                        <p className="text-gray-600">{subsidiaryData[subsidiaryKey].contact.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">이메일:</span>
                        <p className="text-gray-600">{subsidiaryData[subsidiaryKey].contact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 접근 권한이 없는 경우 */}
      {accessibleSubsidiaries.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            현재 계열사 콘텐츠에 대한 접근 권한이 없습니다.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            관리자에게 권한을 요청하세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubsidiaryManager;



