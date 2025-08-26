import React, { useState, useEffect } from 'react';
import { FiEdit3, FiEye, FiSave, FiX, FiPlus, FiTrash2, FiMove } from 'react-icons/fi';

const EnhancedHomeContentManager = ({ data, onSave, onPreview }) => {
  // 기본 데이터 구조 정의
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
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    // 데이터가 변경될 때마다 안전하게 처리
    if (data && typeof data === 'object') {
      // LocalStorage에서 최신 데이터 확인
      const savedData = localStorage.getItem('homeData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData({ ...defaultData, ...parsedData });
        } catch (error) {
          console.error('LocalStorage 데이터 파싱 오류:', error);
          setFormData({ ...defaultData, ...data });
        }
      } else {
        setFormData({ ...defaultData, ...data });
      }
    } else {
      setFormData(defaultData);
    }
  }, [data]);

  // 안전한 데이터 접근을 위한 헬퍼 함수
  const getSafeData = (section, field) => {
    if (!formData || !formData[section]) return '';
    if (field) {
      return formData[section][field] || '';
    }
    return formData[section] || [];
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => {
      // 기존 데이터가 없으면 기본값으로 초기화
      const currentSection = prev[section] || {};
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: value
        }
      };
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => {
      // 기존 배열이 없으면 빈 배열로 초기화
      const currentArray = prev[section] || [];
      return {
        ...prev,
        [section]: currentArray.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      };
    });
  };

  const handleAddItem = (section) => {
    const newItem = section === 'achievements' 
      ? { number: '', label: '' }
      : { name: '', subtitle: '', description: '' };
    
    setFormData(prev => {
      // 기존 배열이 없으면 빈 배열로 초기화
      const currentArray = prev[section] || [];
      return {
        ...prev,
        [section]: [...currentArray, newItem]
      };
    });
  };

  const handleRemoveItem = (section, index) => {
    setFormData(prev => {
      // 기존 배열이 없으면 빈 배열로 초기화
      const currentArray = prev[section] || [];
      return {
        ...prev,
        [section]: currentArray.filter((_, i) => i !== index)
      };
    });
  };

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) return;

    setFormData(prev => {
      // 기존 배열이 없으면 빈 배열로 초기화
      const currentArray = prev[activeSection] || [];
      const newArray = [...currentArray];
      const draggedItem = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(dropIndex, 0, draggedItem);
      
      return {
        ...prev,
        [activeSection]: newArray
      };
    });
    setDragIndex(null);
  };

  const handleSave = () => {
    // LocalStorage에 저장
    localStorage.setItem('homeData', JSON.stringify(formData));
    
    // 부모 컴포넌트에 저장 알림
    onSave('homepage', formData);
    
    setIsEditing(false);
    
    // 성공 메시지 표시
    alert('홈페이지 콘텐츠가 성공적으로 저장되었습니다! 홈페이지에서 변경사항을 확인하세요.');
    
    // postMessage로 다른 탭에 데이터 업데이트 알림
    window.postMessage({ type: 'homeDataUpdated', data: formData }, '*');
    
    // 다른 탭이 열려있을 경우에도 알림
    if (window.opener) {
      window.opener.postMessage({ type: 'homeDataUpdated', data: formData }, '*');
    }
    
    // 강제로 storage 이벤트 발생 (같은 탭에서도 감지)
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'homeData',
      newValue: JSON.stringify(formData),
      oldValue: null,
      storageArea: localStorage
    }));
    
    // 전역 이벤트도 발생
    window.dispatchEvent(new Event('globalHomeDataChanged'));
  };

  const handlePreview = () => {
    onPreview(formData);
  };

  const sections = [
    { id: 'hero', label: '히어로 섹션', icon: '🏠' },
    { id: 'achievements', label: '성과 지표', icon: '📊' },
    { id: 'group', label: '그룹 소개', icon: '🏢' },
    { id: 'subsidiaries', label: '계열사 소개', icon: '🏭' }
  ];

  const renderHeroSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            메인 제목 <span className="text-gray-500">(줄바꿈은 \n으로)</span>
          </label>
          <textarea
            value={getSafeData('hero', 'title')}
            onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
            placeholder="정호그룹\n조명의 미래를\n만들어갑니다"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            부제목
          </label>
          <input
            type="text"
            value={getSafeData('hero', 'subtitle')}
            onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="40년 전통의 조명제어 전문기업"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          설명
        </label>
        <textarea
          value={getSafeData('hero', 'description')}
          onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
          disabled={!isEditing}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
          placeholder="혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다"
        />
      </div>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium text-gray-900">성과 지표</h4>
        {isEditing && (
          <button
            onClick={() => handleAddItem('achievements')}
            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiPlus className="mr-1" />
            추가
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getSafeData('achievements').map((achievement, index) => (
          <div 
            key={index} 
            className={`relative border-2 border-dashed rounded-lg p-4 ${
              dragIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            draggable={isEditing}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {isEditing && (
              <div className="absolute -top-2 -right-2 flex space-x-1">
                <button
                  onClick={() => handleRemoveItem('achievements', index)}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                >
                  <FiTrash2 size={12} />
                </button>
                <div className="p-1 bg-gray-500 text-white rounded-full cursor-move text-xs">
                  <FiMove size={12} />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                지표 {index + 1}
              </label>
              <input
                type="text"
                value={achievement.number}
                onChange={(e) => handleArrayChange('achievements', index, 'number', e.target.value)}
                disabled={!isEditing}
                placeholder="숫자"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-center text-lg font-bold"
              />
              <input
                type="text"
                value={achievement.label}
                onChange={(e) => handleArrayChange('achievements', index, 'label', e.target.value)}
                disabled={!isEditing}
                placeholder="라벨"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-center"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGroupSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          그룹 소개 제목
        </label>
        <input
          type="text"
          value={getSafeData('group', 'title')}
          onChange={(e) => handleInputChange('group', 'title', e.target.value)}
          disabled={!isEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="정호그룹 소개"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          그룹 소개 설명
        </label>
        <textarea
          value={getSafeData('group', 'description')}
          onChange={(e) => handleInputChange('group', 'description', e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
          placeholder="정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다."
        />
      </div>
    </div>
  );

  const renderSubsidiariesSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium text-gray-900">계열사 정보</h4>
        {isEditing && (
          <button
            onClick={() => handleAddItem('subsidiaries')}
            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiPlus className="mr-1" />
            계열사 추가
          </button>
        )}
      </div>
      <div className="space-y-4">
        {getSafeData('subsidiaries').map((subsidiary, index) => (
          <div 
            key={index} 
            className={`relative border-2 border-dashed rounded-lg p-4 ${
              dragIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            draggable={isEditing}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {isEditing && (
              <div className="absolute -top-2 -right-2 flex space-x-1">
                <button
                  onClick={() => handleRemoveItem('subsidiaries', index)}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-xs"
                >
                  <FiTrash2 size={12} />
                </button>
                <div className="p-1 bg-gray-500 text-white rounded-full cursor-move text-xs">
                  <FiMove size={12} />
                </div>
              </div>
            )}
            <h5 className="font-medium text-gray-900 mb-3">계열사 {index + 1}</h5>
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
                  placeholder="회사명"
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
                  placeholder="주요 사업"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
                  placeholder="회사 설명"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'hero':
        return renderHeroSection();
      case 'achievements':
        return renderAchievementsSection();
      case 'group':
        return renderGroupSection();
      case 'subsidiaries':
        return renderSubsidiariesSection();
      default:
        return renderHeroSection();
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">홈페이지 콘텐츠 관리</h2>
        <div className="flex space-x-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiEdit3 className="mr-2" />
                편집 모드
              </button>
              <button
                onClick={handlePreview}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FiEye className="mr-2" />
                미리보기
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FiSave className="mr-2" />
                저장
              </button>
                             <button
                 onClick={() => {
                   // LocalStorage에서 최신 데이터 불러오기
                   const savedData = localStorage.getItem('homeData');
                   if (savedData) {
                     try {
                       const parsedData = JSON.parse(savedData);
                       setFormData(parsedData);
                     } catch (error) {
                       console.error('저장된 데이터 파싱 오류:', error);
                       setFormData(data);
                     }
                   } else {
                     setFormData(data);
                   }
                   setIsEditing(false);
                 }}
                 className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
               >
                 <FiX className="mr-2" />
                 취소
               </button>
            </>
          )}
        </div>
      </div>

      {/* 섹션 네비게이션 */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSection === section.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 섹션 콘텐츠 */}
      <div className="bg-white rounded-lg shadow p-6">
        {renderSectionContent()}
      </div>

      {/* 실시간 미리보기 */}
      {isEditing && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">실시간 미리보기</h3>
          <div className="bg-gray-50 p-6 rounded-lg">
                         {activeSection === 'hero' && (
               <div className="text-center">
                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
                   {getSafeData('hero', 'title').split('\\n').map((line, i) => (
                     <span key={i} className="block">{line}</span>
                   ))}
                 </h1>
                 <p className="text-xl text-gray-600 mb-2">{getSafeData('hero', 'subtitle')}</p>
                 <p className="text-gray-500">{getSafeData('hero', 'description')}</p>
               </div>
             )}
            
                         {activeSection === 'achievements' && (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {getSafeData('achievements').map((achievement, index) => (
                   <div key={index} className="text-center">
                     <div className="text-3xl font-bold text-blue-600">{achievement.number}</div>
                     <div className="text-sm text-gray-600">{achievement.label}</div>
                   </div>
                 ))}
               </div>
             )}

             {activeSection === 'group' && (
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-gray-900 mb-3">{getSafeData('group', 'title')}</h3>
                 <p className="text-gray-600">{getSafeData('group', 'description')}</p>
               </div>
             )}

             {activeSection === 'subsidiaries' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {getSafeData('subsidiaries').map((subsidiary, index) => (
                   <div key={index} className="border border-gray-200 rounded-lg p-4">
                     <h4 className="font-bold text-gray-900 mb-2">{subsidiary.name}</h4>
                     <p className="text-sm text-blue-600 mb-2">{subsidiary.subtitle}</p>
                     <div className="text-sm text-gray-600">{subsidiary.description}</div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedHomeContentManager;
