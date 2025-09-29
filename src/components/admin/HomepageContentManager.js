import React, { useState, useEffect } from 'react';
import homepageContentService, { CONTENT_TYPES } from '../../services/homepageContentService';

const HomepageContentManager = () => {
  const [homepageContent, setHomepageContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // 섹션별 폼 데이터 초기화
  const initializeFormData = (sectionType, data) => {
    switch (sectionType) {
      case 'hero':
        return {
          title: data?.title || '',
          subtitle: data?.subtitle || '',
          description: data?.description || ''
        };
      case 'achievements':
        return {
          achievements: data?.achievements || [
            { number: '', suffix: '', label: '' },
            { number: '', suffix: '', label: '' },
            { number: '', suffix: '', label: '' },
            { number: '', suffix: '', label: '' }
          ]
        };
      case 'groupOverview':
        return {
          title: data?.title || '',
          description: data?.description || '',
          vision: data?.vision || '',
          additionalVision: data?.additionalVision || ''
        };
      case 'subsidiaries':
        return {
          subsidiaries: data?.subsidiaries || [
            { id: '', title: '', subtitle: '', description: '', feature: '', color: '', path: '', icon: '' },
            { id: '', title: '', subtitle: '', description: '', feature: '', color: '', path: '', icon: '' },
            { id: '', title: '', subtitle: '', description: '', feature: '', color: '', path: '', icon: '' },
            { id: '', title: '', subtitle: '', description: '', feature: '', color: '', path: '', icon: '' }
          ]
        };
      case 'subsidiariesIntro':
        return {
          title: data?.title || '',
          description: data?.description || ''
        };
      default:
        return {};
    }
  };

  // 홈페이지 콘텐츠 로드
  const loadHomepageContent = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('홈페이지 콘텐츠 로드 시작');
      
      const content = await homepageContentService.getHomepageContent();
      console.log('홈페이지 콘텐츠 로드 성공:', content);
      
      setHomepageContent(content);
      
      // 현재 활성 섹션의 폼 데이터 초기화
      const sectionData = content[activeSection];
      setFormData(initializeFormData(activeSection, sectionData));
      
    } catch (err) {
      console.error('홈페이지 콘텐츠 로드 실패:', err);
      setError('홈페이지 콘텐츠를 불러오는데 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 섹션 변경
  const handleSectionChange = (sectionType) => {
    setActiveSection(sectionType);
    setIsEditing(false);
    
    if (homepageContent) {
      const sectionData = homepageContent[sectionType];
      setFormData(initializeFormData(sectionType, sectionData));
    }
  };

  // 폼 데이터 변경
  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      // 배열 필드 (achievements, subsidiaries)
      const newArray = [...formData[field]];
      newArray[index] = { ...newArray[index], ...value };
      setFormData({
        ...formData,
        [field]: newArray
      });
    } else {
      // 일반 필드
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  // 섹션 콘텐츠 저장
  const handleSaveSection = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      console.log('섹션 콘텐츠 저장 시작:', activeSection, formData);
      
      await homepageContentService.saveSectionContent(activeSection, formData);
      
      setSuccess(`${activeSection} 섹션이 성공적으로 저장되었습니다!`);
      setIsEditing(false);
      
      // 콘텐츠 다시 로드
      await loadHomepageContent();
      
    } catch (err) {
      console.error('섹션 콘텐츠 저장 실패:', err);
      setError('섹션 콘텐츠 저장에 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 전체 홈페이지 콘텐츠 저장
  const handleSaveAll = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      console.log('전체 홈페이지 콘텐츠 저장 시작:', homepageContent);
      
      await homepageContentService.saveHomepageContent(homepageContent);
      
      setSuccess('전체 홈페이지 콘텐츠가 성공적으로 저장되었습니다!');
      
    } catch (err) {
      console.error('전체 홈페이지 콘텐츠 저장 실패:', err);
      setError('전체 홈페이지 콘텐츠 저장에 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 홈페이지 콘텐츠 초기화
  const handleInitialize = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      console.log('홈페이지 콘텐츠 초기화 시작');
      
      await homepageContentService.initializeHomepageContent();
      
      setSuccess('홈페이지 콘텐츠가 기본값으로 초기화되었습니다!');
      
      // 콘텐츠 다시 로드
      await loadHomepageContent();
      
    } catch (err) {
      console.error('홈페이지 콘텐츠 초기화 실패:', err);
      setError('홈페이지 콘텐츠 초기화에 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Firebase 연결 테스트
  const testFirebaseConnection = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      console.log('Firebase 연결 테스트 시작');
      
      const result = await homepageContentService.testFirebaseConnection();
      
      if (result.success) {
        setSuccess(`Firebase 연결 성공! (${result.documentCount}개 문서)`);
      } else {
        setError(`Firebase 연결 실패: ${result.message}`);
      }
      
    } catch (err) {
      console.error('Firebase 연결 테스트 실패:', err);
      setError('Firebase 연결 테스트에 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 콘텐츠 로드
  useEffect(() => {
    loadHomepageContent();
  }, []);

  // 섹션별 폼 렌더링
  const renderSectionForm = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메인 타이틀</label>
              <textarea
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="메인 타이틀을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">서브 타이틀</label>
              <textarea
                value={formData.subtitle || ''}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="서브 타이틀을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="설명을 입력하세요"
              />
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-4">
            {formData.achievements?.map((achievement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">성과지표 {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">숫자</label>
                    <input
                      type="text"
                      value={achievement.number || ''}
                      onChange={(e) => handleChange('achievements', { number: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="숫자"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">접미사</label>
                    <input
                      type="text"
                      value={achievement.suffix || ''}
                      onChange={(e) => handleChange('achievements', { suffix: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="년, +, % 등"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">라벨</label>
                    <input
                      type="text"
                      value={achievement.label || ''}
                      onChange={(e) => handleChange('achievements', { label: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="라벨"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'groupOverview':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="설명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비전</label>
              <textarea
                value={formData.vision || ''}
                onChange={(e) => handleChange('vision', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="비전을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">추가 비전</label>
              <textarea
                value={formData.additionalVision || ''}
                onChange={(e) => handleChange('additionalVision', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="추가 비전을 입력하세요"
              />
            </div>
          </div>
        );

      case 'subsidiaries':
        return (
          <div className="space-y-4">
            {formData.subsidiaries?.map((subsidiary, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-3">계열사 {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                    <input
                      type="text"
                      value={subsidiary.id || ''}
                      onChange={(e) => handleChange('subsidiaries', { id: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="clarus, tlc, illutech, texcom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                    <input
                      type="text"
                      value={subsidiary.title || ''}
                      onChange={(e) => handleChange('subsidiaries', { title: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="회사명"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">서브타이틀</label>
                    <input
                      type="text"
                      value={subsidiary.subtitle || ''}
                      onChange={(e) => handleChange('subsidiaries', { subtitle: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="서브타이틀"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">색상</label>
                    <input
                      type="color"
                      value={subsidiary.color || '#0066CC'}
                      onChange={(e) => handleChange('subsidiaries', { color: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">경로</label>
                    <input
                      type="text"
                      value={subsidiary.path || ''}
                      onChange={(e) => handleChange('subsidiaries', { path: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="/clarus"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">아이콘</label>
                    <input
                      type="text"
                      value={subsidiary.icon || ''}
                      onChange={(e) => handleChange('subsidiaries', { icon: e.target.value }, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="💡"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                  <textarea
                    value={subsidiary.description || ''}
                    onChange={(e) => handleChange('subsidiaries', { description: e.target.value }, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                    placeholder="설명을 입력하세요"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">특징</label>
                  <input
                    type="text"
                    value={subsidiary.feature || ''}
                    onChange={(e) => handleChange('subsidiaries', { feature: e.target.value }, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="특징을 입력하세요"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'subsidiariesIntro':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <textarea
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="설명을 입력하세요"
              />
            </div>
          </div>
        );

      default:
        return <div>선택된 섹션이 없습니다.</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">홈페이지 콘텐츠 관리</h2>
        <div className="flex gap-2">
          <button
            onClick={testFirebaseConnection}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            🔧 Firebase 테스트
          </button>
          <button
            onClick={handleInitialize}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            disabled={loading}
          >
            🔄 초기화
          </button>
        </div>
      </div>

      {/* 상태 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* 섹션 선택 탭 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'hero', label: '히어로 섹션' },
            { key: 'achievements', label: '성과지표' },
            { key: 'groupOverview', label: '그룹소개' },
            { key: 'subsidiariesIntro', label: '계열사 소개' },
            { key: 'subsidiaries', label: '계열사' }
          ].map((section) => (
            <button
              key={section.key}
              onClick={() => handleSectionChange(section.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === section.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 섹션 폼 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {activeSection === 'hero' && '히어로 섹션'}
            {activeSection === 'achievements' && '성과지표'}
            {activeSection === 'groupOverview' && '그룹소개'}
            {activeSection === 'subsidiaries' && '계열사'}
            {activeSection === 'subsidiariesIntro' && '계열사 소개'}
          </h3>
          <div className="flex gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ✏️ 수정
              </button>
            )}
            {isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveSection}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? '저장 중...' : '💾 저장'}
                </button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          renderSectionForm()
        ) : (
          <div className="text-gray-500 italic">
            수정 버튼을 클릭하여 콘텐츠를 편집하세요.
          </div>
        )}
      </div>

      {/* 전체 저장 버튼 */}
      <div className="flex justify-center">
        <button
          onClick={handleSaveAll}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          disabled={loading}
        >
          {loading ? '저장 중...' : '💾 전체 콘텐츠 저장'}
        </button>
      </div>
    </div>
  );
};

export default HomepageContentManager;
