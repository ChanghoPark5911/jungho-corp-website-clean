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
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [dragIndex, setDragIndex] = useState(null);
  
  // 각 섹션별 독립적인 상태 관리
  const [heroContent, setHeroContent] = useState(safeData.hero || {});
  const [statsContent, setStatsContent] = useState({
    years: '40',
    projects: '1000+',
    countries: '50+', 
    support: '99%',
    yearsLabel: '조명제어 전문 경험',
    projectsLabel: '프로젝트 완료',
    countriesLabel: '해외 진출국',
    supportLabel: '고객 만족도'
  });
  const [groupContent, setGroupContent] = useState({
    title: '40년 전통의 조명제어 전문기업',
    paragraph1: '1983년 창립 이래 40년간 조명제어 분야에서 혁신적인 솔루션을 제공하고 있습니다.',
    paragraph2: 'B2B부터 B2C까지 다양한 고객층을 위한 맞춤형 서비스를 제공합니다.',
    paragraph3: '혁신적인 기술과 40년간의 경험을 바탕으로 조명의 미래를 만들어갑니다.'
  });
  const [subsidiariesContent, setSubsidiariesContent] = useState({
    sectionTitle: '4개 계열사가 만드는 완벽한 조명 생태계',
    sectionSubtitle: '기술개발부터 고객서비스까지, 각 분야 전문성의 시너지',
    clarus: {
      name: '클라루스',
      subtitle: 'AI 기반 스마트 조명제어',
      description: '최신 AI 기술을 활용한 스마트 조명제어 시스템을 개발합니다.',
      feature: 'AI 기반 자동 제어 시스템'
    },
    tlc: {
      name: '정호티엘씨', 
      subtitle: 'IoT 센서 및 제어 장치',
      description: 'IoT 센서 네트워크와 제어 장치를 통해 스마트한 환경을 구축합니다.',
      feature: 'IoT 센서 네트워크'
    },
    illutech: {
      name: '일루텍',
      subtitle: '스마트 물류 솔루션', 
      description: '물류 분야의 자동화와 효율성을 극대화하는 솔루션을 제공합니다.',
      feature: '스마트 물류 자동화'
    },
    texcom: {
      name: '정호텍스컴',
      subtitle: '텍스타일 제어 시스템',
      description: '텍스타일 산업의 생산성을 향상시키는 제어 시스템을 개발합니다.',
      feature: '텍스타일 제어 시스템'
    }
  });

  // 컴포넌트 마운트 시 LocalStorage에서 데이터 로드
  useEffect(() => {
    // 각 섹션별 데이터 로드
    loadTabContent('hero');
    loadTabContent('stats');
    loadTabContent('group');
    loadTabContent('subsidiaries');
    
    // 히어로 섹션 기본 데이터가 없으면 저장
    const heroSaved = localStorage.getItem('hero_content');
    if (!heroSaved) {
      const defaultHeroData = {
        title: '40년 축적된 기술력으로\n조명의 미래를 혁신합니다',
        subtitle: '정호그룹은 조명제어 전문 기업으로서 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다',
        description: '150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다.'
      };
      localStorage.setItem('hero_content', JSON.stringify(defaultHeroData));
      setHeroContent(defaultHeroData);
      console.log('히어로 섹션 기본 데이터 저장됨');
    }
    
    // 성과지표 기본 데이터가 없으면 저장
    const statsSaved = localStorage.getItem('stats_content');
    if (!statsSaved) {
      const defaultStatsData = {
        years: '40',
        projects: '800',
        countries: '7',
        support: '99',
        yearsLabel: '조명제어 전문 경험',
        projectsLabel: '프로젝트 완료',
        countriesLabel: '해외진출국',
        supportLabel: '고객만족도'
      };
      localStorage.setItem('stats_content', JSON.stringify(defaultStatsData));
      setStatsContent(defaultStatsData);
      console.log('성과지표 기본 데이터 저장됨');
    }
  }, []);

  // 각 탭별 저장된 데이터 로드
  const loadTabContent = (tabName) => {
    const storageKey = `${tabName}_content`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const content = JSON.parse(saved);
        switch(tabName) {
          case 'hero':
            setHeroContent(content);
            break;
          case 'stats':
            setStatsContent(content);
            break;
          case 'group':
            setGroupContent(content);
            break;
          case 'subsidiaries':
            setSubsidiariesContent(content);
            break;
        }
      } catch (error) {
        console.error(`${tabName} 데이터 파싱 오류:`, error);
      }
    }
  };

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // 각 탭별 데이터 저장
  const saveTabContent = (tabName, content) => {
    try {
      const storageKey = `${tabName}_content`;
      localStorage.setItem(storageKey, JSON.stringify(content));
      
      // 통합 데이터 구조로도 저장 (데이터 무결성 보장)
      const existingHomePageData = localStorage.getItem('homePageData');
      let homePageData = existingHomePageData ? JSON.parse(existingHomePageData) : {};
      
      // 해당 섹션 데이터 업데이트
      homePageData[tabName] = content;
      
      // 통합 데이터 저장
      localStorage.setItem('homePageData', JSON.stringify(homePageData));
      
      // 히어로 섹션 저장 시 홈페이지에 실시간 반영
      if (tabName === 'hero') {
        window.dispatchEvent(new Event('heroContentUpdated'));
        console.log('히어로 섹션 업데이트 이벤트 발생');
      }
      
      // 성과지표 저장 시 히어로 섹션에도 알림
      if (tabName === 'stats') {
        window.dispatchEvent(new Event('statsContentUpdated'));
        console.log('성과지표 업데이트 이벤트 발생');
      }
      
      // 그룹소개 저장 시 홈페이지에 실시간 반영
      if (tabName === 'group') {
        window.dispatchEvent(new Event('groupContentUpdated'));
        console.log('그룹소개 업데이트 이벤트 발생');
      }
      
      // 계열사소개 저장 시 홈페이지에 실시간 반영
      if (tabName === 'subsidiaries') {
        window.dispatchEvent(new Event('subsidiariesContentUpdated'));
        console.log('계열사소개 업데이트 이벤트 발생');
      }
      
      // 통합 데이터 업데이트 이벤트 발생
      window.dispatchEvent(new Event('homePageDataUpdated'));
      console.log('통합 홈페이지 데이터 업데이트 이벤트 발생');
      
      alert(`${tabName} 섹션이 저장되었습니다!`);
    } catch (error) {
      console.error(`${tabName} 저장 오류:`, error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  // 전체 저장
  const saveContent = () => {
    try {
      // 현재 활성 탭의 데이터 저장
      switch(activeSection) {
        case 'hero':
          saveTabContent('hero', heroContent);
          break;
        case 'stats':
          saveTabContent('stats', statsContent);
          break;
        case 'group':
          saveTabContent('group', groupContent);
          break;
        case 'subsidiaries':
          saveTabContent('subsidiaries', subsidiariesContent);
          break;
      }
      
      // 편집 모드 비활성화
      setIsEditMode(false);
    } catch (error) {
      console.error('데이터 저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  // 편집 취소
  const cancelEdit = () => {
    // 현재 활성 탭의 원래 데이터 복원
    loadTabContent(activeSection);
    setIsEditMode(false);
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
  };

  // 배열 데이터 변경 처리
  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // 배열에 항목 추가
  const handleAddItem = (section) => {
    if (section === 'achievements') {
      setFormData(prev => ({
        ...prev,
        [section]: [...prev[section], { number: '', label: '' }]
      }));
    } else if (section === 'subsidiaries') {
      setFormData(prev => ({
        ...prev,
        [section]: [...prev[section], { name: '', subtitle: '', description: '' }]
      }));
    }
  };

  // 배열에서 항목 제거
  const handleRemoveItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // 드래그 앤 드롭 기능
  const handleDragStart = (e, index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) return;

    setFormData(prev => {
      const newArray = [...prev[activeSection]];
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

  // 안전한 데이터 접근을 위한 헬퍼 함수
  const getSafeData = (section, field) => {
    if (!formData[section]) return '';
    return formData[section][field] || '';
  };

  // 줄바꿈을 <br> 태그로 변환하는 함수
  const formatText = (text) => {
    if (!text) return '';
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // 히어로 섹션 렌더링
  const renderHeroSection = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">히어로 섹션</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            메인 제목 (줄바꿈: \n)
          </label>
          <textarea
            value={heroContent.title || ''}
            onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
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
            value={heroContent.subtitle || ''}
            onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="부제목을 입력하세요"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명
          </label>
          <textarea
            value={heroContent.description || ''}
            onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            rows={3}
            placeholder="설명을 입력하세요"
          />
        </div>
        
        {/* 저장 버튼 - 편집 모드일 때만 표시 */}
        {isEditMode && (
          <div className="pt-4">
            <button
              onClick={() => saveTabContent('hero', heroContent)}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              히어로 섹션 저장
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // 성과 지표 섹션 렌더링
  const renderStatsSection = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">성과 지표</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 경험 년수 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            경험 년수
          </label>
          <input
            type="text"
            value={statsContent.years}
            onChange={(e) => setStatsContent({...statsContent, years: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="40"
          />
          <input
            type="text"
            value={statsContent.yearsLabel}
            onChange={(e) => setStatsContent({...statsContent, yearsLabel: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="조명제어 전문 경험"
          />
        </div>

        {/* 프로젝트 수 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            프로젝트 수
          </label>
          <input
            type="text"
            value={statsContent.projects}
            onChange={(e) => setStatsContent({...statsContent, projects: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="1000+"
          />
          <input
            type="text"
            value={statsContent.projectsLabel}
            onChange={(e) => setStatsContent({...statsContent, projectsLabel: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="프로젝트 완료"
          />
        </div>

        {/* 해외 진출국 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            해외 진출국
          </label>
          <input
            type="text"
            value={statsContent.countries}
            onChange={(e) => setStatsContent({...statsContent, countries: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="50+"
          />
          <input
            type="text"
            value={statsContent.countriesLabel}
            onChange={(e) => setStatsContent({...statsContent, countriesLabel: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="해외 진출국"
          />
        </div>

        {/* 고객 만족도 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            고객 만족도
          </label>
          <input
            type="text"
            value={statsContent.support}
            onChange={(e) => setStatsContent({...statsContent, support: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="99%"
          />
          <input
            type="text"
            value={statsContent.supportLabel}
            onChange={(e) => setStatsContent({...statsContent, supportLabel: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="고객 만족도"
          />
        </div>
        
        {/* 저장 버튼 - 편집 모드일 때만 표시 */}
        {isEditMode && (
          <div className="pt-6">
            <button
              onClick={() => saveTabContent('stats', statsContent)}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              성과지표 저장
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // 그룹 소개 섹션 렌더링
  const renderGroupSection = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">그룹 소개</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            섹션 제목
          </label>
          <input
            type="text"
            value={groupContent.title}
            onChange={(e) => setGroupContent({...groupContent, title: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="40년 전통의 조명제어 전문기업"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            첫 번째 문단
          </label>
          <textarea
            value={groupContent.paragraph1}
            onChange={(e) => setGroupContent({...groupContent, paragraph1: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            rows={3}
            placeholder="1983년 창립 이래 40년간 조명제어 분야에서 혁신적인 솔루션을 제공하고 있습니다."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            두 번째 문단
          </label>
          <textarea
            value={groupContent.paragraph2}
            onChange={(e) => setGroupContent({...groupContent, paragraph2: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            rows={3}
            placeholder="B2B부터 B2C까지 다양한 고객층을 위한 맞춤형 서비스를 제공합니다."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            세 번째 문단
          </label>
          <textarea
            value={groupContent.paragraph3}
            onChange={(e) => setGroupContent({...groupContent, paragraph3: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            rows={3}
            placeholder="혁신적인 기술과 40년간의 경험을 바탕으로 조명의 미래를 만들어갑니다."
          />
        </div>
      </div>
    </div>
  );

  // 계열사 소개 섹션 렌더링
  const renderSubsidiariesSection = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">계열사 소개</h3>
      
      {/* 섹션 제목 및 부제목 */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            섹션 제목
          </label>
          <input
            type="text"
            value={subsidiariesContent.sectionTitle}
            onChange={(e) => setSubsidiariesContent({...subsidiariesContent, sectionTitle: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="4개 계열사가 만드는 완벽한 조명 생태계"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            섹션 부제목
          </label>
          <input
            type="text"
            value={subsidiariesContent.sectionSubtitle}
            onChange={(e) => setSubsidiariesContent({...subsidiariesContent, sectionSubtitle: e.target.value})}
            disabled={!isEditMode}
            className={`w-full p-3 border rounded-md ${
              isEditMode 
                ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                : 'border-gray-300 bg-gray-50'
            }`}
            placeholder="기술개발부터 고객서비스까지, 각 분야 전문성의 시너지"
          />
        </div>
      </div>

      {/* 각 계열사별 정보 */}
      <div className="space-y-6">
        {/* 클라루스 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">클라루스</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
              <input
                type="text"
                value={subsidiariesContent.clarus.name}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  clarus: {...subsidiariesContent.clarus, name: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="클라루스"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부제목</label>
              <input
                type="text"
                value={subsidiariesContent.clarus.subtitle}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  clarus: {...subsidiariesContent.clarus, subtitle: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="AI 기반 스마트 조명제어"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={subsidiariesContent.clarus.description}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  clarus: {...subsidiariesContent.clarus, description: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                rows={2}
                placeholder="최신 AI 기술을 활용한 스마트 조명제어 시스템을 개발합니다."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">주요 특징</label>
              <input
                type="text"
                value={subsidiariesContent.clarus.feature}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  clarus: {...subsidiariesContent.clarus, feature: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="AI 기반 자동 제어 시스템"
              />
            </div>
          </div>
        </div>

        {/* 정호티엘씨 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">정호티엘씨</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
              <input
                type="text"
                value={subsidiariesContent.tlc.name}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  tlc: {...subsidiariesContent.tlc, name: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="정호티엘씨"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부제목</label>
              <input
                type="text"
                value={subsidiariesContent.tlc.subtitle}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  tlc: {...subsidiariesContent.tlc, subtitle: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="IoT 센서 및 제어 장치"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={subsidiariesContent.tlc.description}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  tlc: {...subsidiariesContent.tlc, description: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                rows={2}
                placeholder="IoT 센서 네트워크와 제어 장치를 통해 스마트한 환경을 구축합니다."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">주요 특징</label>
              <input
                type="text"
                value={subsidiariesContent.tlc.feature}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  tlc: {...subsidiariesContent.tlc, feature: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="IoT 센서 네트워크"
              />
            </div>
          </div>
        </div>

        {/* 일루텍 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">일루텍</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
              <input
                type="text"
                value={subsidiariesContent.illutech.name}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  illutech: {...subsidiariesContent.illutech, name: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="일루텍"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부제목</label>
              <input
                type="text"
                value={subsidiariesContent.illutech.subtitle}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  illutech: {...subsidiariesContent.illutech, subtitle: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="스마트 물류 솔루션"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={subsidiariesContent.illutech.description}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  illutech: {...subsidiariesContent.illutech, description: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                rows={2}
                placeholder="물류 분야의 자동화와 효율성을 극대화하는 솔루션을 제공합니다."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">주요 특징</label>
              <input
                type="text"
                value={subsidiariesContent.illutech.feature}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  illutech: {...subsidiariesContent.illutech, feature: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="스마트 물류 자동화"
              />
            </div>
          </div>
        </div>

        {/* 정호텍스컴 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">정호텍스컴</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
              <input
                type="text"
                value={subsidiariesContent.texcom.name}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  texcom: {...subsidiariesContent.texcom, name: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="정호텍스컴"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부제목</label>
              <input
                type="text"
                value={subsidiariesContent.texcom.subtitle}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  texcom: {...subsidiariesContent.texcom, subtitle: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="텍스타일 제어 시스템"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                value={subsidiariesContent.texcom.description}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  texcom: {...subsidiariesContent.texcom, description: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                rows={2}
                placeholder="텍스타일 산업의 생산성을 향상시키는 제어 시스템을 개발합니다."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">주요 특징</label>
              <input
                type="text"
                value={subsidiariesContent.texcom.feature}
                onChange={(e) => setSubsidiariesContent({
                  ...subsidiariesContent,
                  texcom: {...subsidiariesContent.texcom, feature: e.target.value}
                })}
                disabled={!isEditMode}
                className={`w-full p-2 border rounded-md ${
                  isEditMode 
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                    : 'border-gray-300 bg-gray-50'
                }`}
                placeholder="텍스타일 제어 시스템"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 실시간 미리보기 렌더링
  const renderLivePreview = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">실시간 미리보기</h3>
      <div className="space-y-6">
        {/* 히어로 섹션 미리보기 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">히어로 섹션</h4>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formatText(heroContent.title || '')}
          </h1>
          <p className="text-xl text-gray-700 mb-3">
            {heroContent.subtitle || ''}
          </p>
          <p className="text-gray-600">
            {heroContent.description || ''}
          </p>
        </div>

        {/* 성과 지표 미리보기 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-4">성과 지표</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {statsContent.years}
              </div>
              <div className="text-sm text-gray-600">
                {statsContent.yearsLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {statsContent.projects}
              </div>
              <div className="text-sm text-gray-600">
                {statsContent.projectsLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {statsContent.countries}
              </div>
              <div className="text-sm text-gray-600">
                {statsContent.countriesLabel}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {statsContent.support}
              </div>
              <div className="text-sm text-gray-600">
                {statsContent.supportLabel}
              </div>
            </div>
          </div>
        </div>

        {/* 그룹 소개 미리보기 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">그룹 소개</h4>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {groupContent.title}
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700">{groupContent.paragraph1}</p>
            <p className="text-gray-700">{groupContent.paragraph2}</p>
            <p className="text-gray-700">{groupContent.paragraph3}</p>
          </div>
        </div>

        {/* 계열사 미리보기 */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600 mb-2">계열사 소개</h4>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {subsidiariesContent.sectionTitle}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {subsidiariesContent.sectionSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-1">
                {subsidiariesContent.clarus.name}
              </h5>
              <p className="text-sm text-blue-600 mb-2">
                {subsidiariesContent.clarus.subtitle}
              </p>
              <p className="text-sm text-gray-600">
                {subsidiariesContent.clarus.description}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-1">
                {subsidiariesContent.tlc.name}
              </h5>
              <p className="text-sm text-blue-600 mb-2">
                {subsidiariesContent.tlc.subtitle}
              </p>
              <p className="text-sm text-gray-600">
                {subsidiariesContent.tlc.description}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-1">
                {subsidiariesContent.illutech.name}
              </h5>
              <p className="text-sm text-blue-600 mb-2">
                {subsidiariesContent.illutech.subtitle}
              </p>
              <p className="text-sm text-gray-600">
                {subsidiariesContent.illutech.description}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-900 mb-1">
                {subsidiariesContent.texcom.name}
              </h5>
              <p className="text-sm text-blue-600 mb-2">
                {subsidiariesContent.texcom.subtitle}
              </p>
              <p className="text-sm text-gray-600">
                {subsidiariesContent.texcom.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">홈페이지 콘텐츠 관리</h2>
        <div className="flex space-x-2">
          {!isEditMode ? (
            <>
              <button
                onClick={toggleEditMode}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiEdit3 className="mr-2" />
                편집 모드
              </button>
              {onPreview && (
                <button
                  onClick={() => onPreview(formData)}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <FiEye className="mr-2" />
                  미리보기
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={saveContent}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FiSave className="mr-2" />
                저장
              </button>
              <button
                onClick={cancelEdit}
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
      <div className="flex space-x-2 border-b">
        {['hero', 'stats', 'group', 'subsidiaries'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeSection === section
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section === 'hero' && '히어로'}
            {section === 'stats' && '성과 지표'}
            {section === 'group' && '그룹 소개'}
            {section === 'subsidiaries' && '계열사'}
          </button>
        ))}
      </div>

      {/* 섹션별 콘텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 편집 영역 */}
        <div>
          {activeSection === 'hero' && renderHeroSection()}
          {activeSection === 'stats' && renderStatsSection()}
          {activeSection === 'group' && renderGroupSection()}
          {activeSection === 'subsidiaries' && renderSubsidiariesSection()}
        </div>

        {/* 실시간 미리보기 */}
        <div>
          {renderLivePreview()}
        </div>
      </div>
    </div>
  );
};

export default EnhancedHomeContentManager;
