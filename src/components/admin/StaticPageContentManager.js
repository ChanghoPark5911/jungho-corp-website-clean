import React, { useState, useEffect } from 'react';
import staticPageContentService from '../../services/staticPageContentService';
import { initializeAllFirebaseData } from '../../utils/initializeFirebaseData';
import { db } from '../../config/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const StaticPageContentManager = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activePage, setActivePage] = useState('business'); // 현재 활성화된 페이지
  const [activeSection, setActiveSection] = useState('hero'); // 현재 활성화된 섹션
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadStaticPageContent();
  }, [activePage]);

  const loadStaticPageContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await staticPageContentService.getStaticPageContent(activePage);
      if (data) {
        setContent(data);
        setSuccess(`${activePage} 페이지 콘텐츠를 성공적으로 불러왔습니다.`);
      } else {
        setContent({});
        setSuccess(`${activePage} 페이지 콘텐츠가 없어 기본값을 로드했습니다.`);
      }
    } catch (err) {
      console.error('정적 페이지 콘텐츠 로드 실패:', err);
      setError('정적 페이지 콘텐츠 로드 실패: ' + err.message);
      setContent({});
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleSaveContent = async (sectionKey, sectionData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const updatedContent = { ...content, [sectionKey]: sectionData };
      await staticPageContentService.saveStaticPageContent(activePage, updatedContent);
      setContent(updatedContent);
      setSuccess(`${sectionKey} 섹션 콘텐츠가 성공적으로 저장되었습니다.`);
    } catch (err) {
      console.error(`${sectionKey} 섹션 콘텐츠 저장 실패:`, err);
      setError(`${sectionKey} 섹션 콘텐츠 저장 실패: ` + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm(`정말로 ${activePage} 페이지 콘텐츠를 기본값으로 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await staticPageContentService.initializeStaticPageContent(activePage);
      const defaultContent = activePage === 'business' 
        ? staticPageContentService.getDefaultBusinessContent()
        : staticPageContentService.getDefaultSupportContent();
      setContent(defaultContent);
      setSuccess(`${activePage} 페이지 콘텐츠가 기본값으로 초기화되었습니다.`);
    } catch (err) {
      console.error('정적 페이지 콘텐츠 초기화 실패:', err);
      setError('정적 페이지 콘텐츠 초기화 실패: ' + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleInitializeAllData = async () => {
    if (!window.confirm('모든 정적 페이지의 초기 데이터를 Firebase에 설정하시겠습니까? 기존 데이터는 덮어씌워집니다.')) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await initializeAllFirebaseData();
      if (result.success) {
        setSuccess('모든 정적 페이지 초기 데이터 설정이 완료되었습니다.');
        // 현재 페이지 다시 로드
        loadStaticPageContent();
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('초기 데이터 설정 실패:', err);
      setError('초기 데이터 설정 실패: ' + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 5000);
    }
  };

  const handleFullSave = async () => {
    if (!window.confirm(`현재 편집 중인 모든 ${activePage} 페이지 콘텐츠를 Firebase에 저장하시겠습니까?`)) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await staticPageContentService.saveStaticPageContent(activePage, content);
      setSuccess(`모든 ${activePage} 페이지 콘텐츠가 성공적으로 저장되었습니다.`);
    } catch (err) {
      console.error('전체 정적 페이지 콘텐츠 저장 실패:', err);
      setError('전체 정적 페이지 콘텐츠 저장 실패: ' + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleTestFirebase = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await staticPageContentService.testFirebaseConnection();
      if (result.success) {
        setSuccess(`Firebase 연결 성공: ${result.message} (문서 수: ${result.documentCount})`);
      } else {
        setError(`Firebase 연결 실패: ${result.message}`);
      }
    } catch (err) {
      console.error('Firebase 테스트 실패:', err);
      setError('Firebase 테스트 실패: ' + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handlePageChange = (pageType) => {
    setActivePage(pageType);
    setActiveSection('hero'); // 페이지 변경 시 첫 번째 섹션으로 이동
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleInputChange = (section, field, value, index = null) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      
      if (index !== null) {
        // 배열 내 항목 수정
        if (!newContent[section]) newContent[section] = [];
        newContent[section] = [...newContent[section]];
        newContent[section][index] = { ...newContent[section][index], [field]: value };
      } else {
        // 일반 필드 수정
        if (!newContent[section]) newContent[section] = {};
        newContent[section] = { ...newContent[section], [field]: value };
      }
      
      return newContent;
    });
  };

  const handleAddArrayItem = (section, newItem) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      if (!newContent[section]) newContent[section] = [];
      newContent[section] = [...newContent[section], newItem];
      return newContent;
    });
  };

  const handleRemoveArrayItem = (section, index) => {
    setContent(prevContent => {
      const newContent = { ...prevContent };
      if (newContent[section] && Array.isArray(newContent[section])) {
        newContent[section] = newContent[section].filter((_, i) => i !== index);
      }
      return newContent;
    });
  };

  const getSectionsForPage = (pageType) => {
    switch (pageType) {
      case 'business':
        return [
          { key: 'hero', label: '히어로 섹션' },
          { key: 'businessAreas', label: '사업영역' },
          { key: 'subsidiaries', label: '계열사' },
          { key: 'technology', label: '기술력' },
          { key: 'cta', label: 'CTA 섹션' }
        ];
      case 'support':
        return [
          { key: 'hero', label: '히어로 섹션' },
          { key: 'supportChannels', label: '지원 채널' },
          { key: 'supportServices', label: '지원 서비스' },
          { key: 'faqs', label: 'FAQ' },
          { key: 'contactForm', label: '문의 폼' }
        ];
      default:
        return [];
    }
  };

  const renderHeroSection = () => {
    const heroData = content.hero || {};
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">히어로 섹션</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              배경 이미지 URL
            </label>
            <input
              type="url"
              value={heroData.backgroundImage || ''}
              onChange={(e) => handleInputChange('hero', 'backgroundImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메인 카피
            </label>
            <input
              type="text"
              value={heroData.mainCopy || ''}
              onChange={(e) => handleInputChange('hero', 'mainCopy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="메인 제목"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            서브 카피
          </label>
          <textarea
            value={heroData.subCopy || ''}
            onChange={(e) => handleInputChange('hero', 'subCopy', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="서브 설명"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              버튼 라벨
            </label>
            <input
              type="text"
              value={heroData.primaryAction?.label || ''}
              onChange={(e) => handleInputChange('hero', 'primaryAction', { ...heroData.primaryAction, label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="버튼 텍스트"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              버튼 경로
            </label>
            <input
              type="text"
              value={heroData.primaryAction?.path || ''}
              onChange={(e) => handleInputChange('hero', 'primaryAction', { ...heroData.primaryAction, path: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="/support"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('hero', heroData)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            히어로 섹션 저장
          </button>
        </div>
      </div>
    );
  };

  const renderBusinessAreasSection = () => {
    const businessAreas = content.businessAreas || [];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">사업영역</h3>
          <button
            onClick={() => handleAddArrayItem('businessAreas', {
              title: '',
              description: '',
              icon: '',
              features: []
            })}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            사업영역 추가
          </button>
        </div>
        
        {businessAreas.map((area, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-700">사업영역 {index + 1}</h4>
              <button
                onClick={() => handleRemoveArrayItem('businessAreas', index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={area.title || ''}
                  onChange={(e) => handleInputChange('businessAreas', 'title', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="사업영역 제목"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  아이콘
                </label>
                <input
                  type="text"
                  value={area.icon || ''}
                  onChange={(e) => handleInputChange('businessAreas', 'icon', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="🏢"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                value={area.description || ''}
                onChange={(e) => handleInputChange('businessAreas', 'description', e.target.value, index)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="사업영역 설명"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                특징 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={Array.isArray(area.features) ? area.features.join(', ') : ''}
                onChange={(e) => handleInputChange('businessAreas', 'features', e.target.value.split(',').map(f => f.trim()).filter(f => f), index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="특징1, 특징2, 특징3"
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('businessAreas', businessAreas)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            사업영역 저장
          </button>
        </div>
      </div>
    );
  };

  const renderSupportChannelsSection = () => {
    const supportChannels = content.supportChannels || [];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">지원 채널</h3>
          <button
            onClick={() => handleAddArrayItem('supportChannels', {
              title: '',
              description: '',
              contact: '',
              hours: '',
              icon: '',
              action: { label: '', onClick: '' }
            })}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            지원 채널 추가
          </button>
        </div>
        
        {supportChannels.map((channel, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-700">지원 채널 {index + 1}</h4>
              <button
                onClick={() => handleRemoveArrayItem('supportChannels', index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={channel.title || ''}
                  onChange={(e) => handleInputChange('supportChannels', 'title', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="지원 채널 제목"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  아이콘
                </label>
                <input
                  type="text"
                  value={channel.icon || ''}
                  onChange={(e) => handleInputChange('supportChannels', 'icon', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="📞"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                value={channel.description || ''}
                onChange={(e) => handleInputChange('supportChannels', 'description', e.target.value, index)}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="지원 채널 설명"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처
                </label>
                <input
                  type="text"
                  value={channel.contact || ''}
                  onChange={(e) => handleInputChange('supportChannels', 'contact', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="1588-1234"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  운영시간
                </label>
                <input
                  type="text"
                  value={channel.hours || ''}
                  onChange={(e) => handleInputChange('supportChannels', 'hours', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="평일 09:00-18:00"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  버튼 라벨
                </label>
                <input
                  type="text"
                  value={channel.action?.label || ''}
                  onChange={(e) => handleInputChange('supportChannels', 'action', { ...channel.action, label: e.target.value }, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="전화하기"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  버튼 액션
                </label>
                <input
                  type="text"
                  value={channel.action?.onClick || channel.action?.path || ''}
                  onChange={(e) => {
                    const action = { ...channel.action };
                    if (e.target.value.startsWith('tel:') || e.target.value.startsWith('mailto:')) {
                      action.onClick = e.target.value;
                      delete action.path;
                    } else {
                      action.path = e.target.value;
                      delete action.onClick;
                    }
                    handleInputChange('supportChannels', 'action', action, index);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tel:1588-1234 또는 /support"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('supportChannels', supportChannels)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            지원 채널 저장
          </button>
        </div>
      </div>
    );
  };

  const renderSubsidiariesSection = () => {
    const subsidiaries = content.subsidiaries || [];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">계열사</h3>
          <button
            onClick={() => handleAddArrayItem('subsidiaries', {
              name: '',
              description: '',
              color: '',
              expertise: []
            })}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            계열사 추가
          </button>
        </div>
        
        {subsidiaries.map((subsidiary, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-700">계열사 {index + 1}</h4>
              <button
                onClick={() => handleRemoveArrayItem('subsidiaries', index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회사명
                </label>
                <input
                  type="text"
                  value={subsidiary.name || ''}
                  onChange={(e) => handleInputChange('subsidiaries', 'name', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="회사명"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  색상 클래스
                </label>
                <input
                  type="text"
                  value={subsidiary.color || ''}
                  onChange={(e) => handleInputChange('subsidiaries', 'color', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="clarus, tlc, illutech, texcom"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                value={subsidiary.description || ''}
                onChange={(e) => handleInputChange('subsidiaries', 'description', e.target.value, index)}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="계열사 설명"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                전문분야 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={Array.isArray(subsidiary.expertise) ? subsidiary.expertise.join(', ') : ''}
                onChange={(e) => handleInputChange('subsidiaries', 'expertise', e.target.value.split(',').map(f => f.trim()).filter(f => f), index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="전문분야1, 전문분야2, 전문분야3"
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('subsidiaries', subsidiaries)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            계열사 저장
          </button>
        </div>
      </div>
    );
  };

  const renderTechnologySection = () => {
    const technology = content.technology || {};
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">기술력 섹션</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={technology.title || ''}
              onChange={(e) => handleInputChange('technology', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="차별화된 기술력"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <input
              type="text"
              value={technology.description || ''}
              onChange={(e) => handleInputChange('technology', 'description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="국내 최초 E/F2-BUS 프로토콜 개발부터 최신 IoT 기술까지"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            기술 특징 (JSON 형태로 입력)
          </label>
          <textarea
            value={JSON.stringify(technology.features || [], null, 2)}
            onChange={(e) => {
              try {
                const features = JSON.parse(e.target.value);
                handleInputChange('technology', 'features', features);
              } catch (err) {
                // JSON 파싱 오류 무시
              }
            }}
            rows="8"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            placeholder='[{"title": "자체 개발 프로토콜", "description": "국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 독자적인 기술력을 확보했습니다.", "icon": "🔧"}]'
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('technology', technology)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            기술력 섹션 저장
          </button>
        </div>
      </div>
    );
  };

  const renderCTASection = () => {
    const cta = content.cta || {};
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">CTA 섹션</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={cta.title || ''}
              onChange={(e) => handleInputChange('cta', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="프로젝트 문의하기"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <input
              type="text"
              value={cta.description || ''}
              onChange={(e) => handleInputChange('cta', 'description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="정호그룹의 전문가들이 귀사의 프로젝트에 최적화된 솔루션을 제안해드립니다."
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            버튼 설정 (JSON 형태로 입력)
          </label>
          <textarea
            value={JSON.stringify(cta.buttons || [], null, 2)}
            onChange={(e) => {
              try {
                const buttons = JSON.parse(e.target.value);
                handleInputChange('cta', 'buttons', buttons);
              } catch (err) {
                // JSON 파싱 오류 무시
              }
            }}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            placeholder='[{"label": "문의하기", "path": "/support", "variant": "secondary"}, {"label": "프로젝트 보기", "path": "/projects", "variant": "primary"}]'
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('cta', cta)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            CTA 섹션 저장
          </button>
        </div>
      </div>
    );
  };

  const renderSupportServicesSection = () => {
    const supportServices = content.supportServices || [];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">지원 서비스</h3>
          <button
            onClick={() => handleAddArrayItem('supportServices', {
              title: '',
              description: '',
              icon: '',
              features: []
            })}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            지원 서비스 추가
          </button>
        </div>
        
        {supportServices.map((service, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-700">지원 서비스 {index + 1}</h4>
              <button
                onClick={() => handleRemoveArrayItem('supportServices', index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => handleInputChange('supportServices', 'title', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="지원 서비스 제목"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  아이콘
                </label>
                <input
                  type="text"
                  value={service.icon || ''}
                  onChange={(e) => handleInputChange('supportServices', 'icon', e.target.value, index)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="🔧"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명
              </label>
              <textarea
                value={service.description || ''}
                onChange={(e) => handleInputChange('supportServices', 'description', e.target.value, index)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="지원 서비스 설명"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                특징 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={Array.isArray(service.features) ? service.features.join(', ') : ''}
                onChange={(e) => handleInputChange('supportServices', 'features', e.target.value.split(',').map(f => f.trim()).filter(f => f), index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="특징1, 특징2, 특징3"
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('supportServices', supportServices)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            지원 서비스 저장
          </button>
        </div>
      </div>
    );
  };

  const renderFAQSection = () => {
    const faqs = content.faqs || [];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">FAQ</h3>
          <button
            onClick={() => handleAddArrayItem('faqs', {
              question: '',
              answer: ''
            })}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            FAQ 추가
          </button>
        </div>
        
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-700">FAQ {index + 1}</h4>
              <button
                onClick={() => handleRemoveArrayItem('faqs', index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                질문
              </label>
              <input
                type="text"
                value={faq.question || ''}
                onChange={(e) => handleInputChange('faqs', 'question', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="자주 묻는 질문"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                답변
              </label>
              <textarea
                value={faq.answer || ''}
                onChange={(e) => handleInputChange('faqs', 'answer', e.target.value, index)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="질문에 대한 답변"
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('faqs', faqs)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            FAQ 저장
          </button>
        </div>
      </div>
    );
  };

  const renderContactFormSection = () => {
    const contactForm = content.contactForm || {};
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">문의 폼</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              value={contactForm.title || ''}
              onChange={(e) => handleInputChange('contactForm', 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="문의하기"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <input
              type="text"
              value={contactForm.description || ''}
              onChange={(e) => handleInputChange('contactForm', 'description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="프로젝트에 대한 상세한 문의사항을 남겨주시면..."
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            폼 필드 설정 (JSON 형태로 입력)
          </label>
          <textarea
            value={JSON.stringify(contactForm.fields || {}, null, 2)}
            onChange={(e) => {
              try {
                const fields = JSON.parse(e.target.value);
                handleInputChange('contactForm', 'fields', fields);
              } catch (err) {
                // JSON 파싱 오류 무시
              }
            }}
            rows="12"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            placeholder='{"name": {"label": "이름", "required": true, "type": "text"}, "email": {"label": "이메일", "required": true, "type": "email"}}'
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => handleSaveContent('contactForm', contactForm)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            문의 폼 저장
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'hero':
        return renderHeroSection();
      case 'businessAreas':
        return renderBusinessAreasSection();
      case 'subsidiaries':
        return renderSubsidiariesSection();
      case 'technology':
        return renderTechnologySection();
      case 'cta':
        return renderCTASection();
      case 'supportChannels':
        return renderSupportChannelsSection();
      case 'supportServices':
        return renderSupportServicesSection();
      case 'faqs':
        return renderFAQSection();
      case 'contactForm':
        return renderContactFormSection();
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">해당 섹션의 편집 기능이 준비 중입니다.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">정적 페이지 콘텐츠를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">정적 페이지 콘텐츠 관리</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleTestFirebase}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Firebase 테스트
            </button>
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
            >
              초기화
            </button>
            <button
              onClick={handleFullSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              전체 콘텐츠 저장
            </button>
            <button
              onClick={handleInitializeAllData}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              🚀 모든 페이지 초기 데이터 설정
            </button>
          </div>
        </div>
        
        <p className="text-gray-600">
          정적 페이지의 콘텐츠를 관리할 수 있습니다. 각 섹션별로 편집하고 저장할 수 있습니다.
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* 성공 메시지 */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* 페이지 선택 탭 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'business', label: '사업영역 페이지' },
            { key: 'support', label: '고객지원 페이지' }
          ].map((page) => (
            <button
              key={page.key}
              onClick={() => handlePageChange(page.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activePage === page.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 섹션 선택 탭 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {getSectionsForPage(activePage).map((section) => (
            <button
              key={section.key}
              onClick={() => handleSectionChange(section.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === section.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 현재 섹션 편집 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default StaticPageContentManager;
