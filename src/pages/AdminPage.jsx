import React, { useState, useEffect } from 'react';
import SimpleHomeContentManager from '../components/admin/SimpleHomeContentManager';
import FirebaseTest from '../components/FirebaseTest';
import AdminI18nManager from '../components/AdminI18nManager';
import contentService from '../services/contentService';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  // 기본 데이터
  const defaultHomeData = {
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

  const [homeData, setHomeData] = useState(defaultHomeData);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Firebase에서 콘텐츠 로드
  useEffect(() => {
    loadContentFromFirebase();
  }, []);

  const loadContentFromFirebase = async () => {
    setIsLoading(true);
    try {
      const result = await contentService.loadHomepageContent();
      if (result.success && result.data) {
        setHomeData(result.data);
        console.log('Firebase에서 콘텐츠 로드 성공:', result.data);
      } else {
        console.log('Firebase에 저장된 콘텐츠가 없습니다. 기본 데이터 사용');
      }
    } catch (error) {
      console.error('Firebase 콘텐츠 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 클라루스 파일 데이터 상태
  const [clarusFiles, setClarusFiles] = useState({
    technicalDocs: null,
    productCatalog: null
  });

  // 프로젝트 갤러리 이미지 데이터 상태
  const [projectGalleryImages, setProjectGalleryImages] = useState({
    project1: null,
    project2: null,
    project3: null,
    project4: null
  });

  // 회사 로고 데이터 상태
  const [companyLogos, setCompanyLogos] = useState({
    clarus: null,
    tlc: null,
    illutech: null,
    texcom: null
  });

  // 콘텐츠 저장 함수
  const saveContent = async (section, data) => {
    try {
      if (section === 'homepage') {
        console.log('저장 시도:', data);
        
        const response = await fetch('http://localhost:8000/api/save-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        console.log('응답 상태:', response.status);
        const responseData = await response.json();
        console.log('응답 데이터:', responseData);

        if (response.ok) {
          setHomeData(data);
          localStorage.setItem('homeData', JSON.stringify(data));
          alert('✅ 콘텐츠가 성공적으로 저장되었습니다!');
          return true;
        } else {
          throw new Error(`저장 실패: ${responseData.message || '알 수 없는 오류'}`);
        }
      }
    } catch (error) {
      console.error('데이터 저장 오류:', error);
      alert(`❌ 저장 중 오류가 발생했습니다.\n\n오류 내용: ${error.message}`);
      throw error;
    }
  };

  // 인증 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // 클라루스 파일 데이터 로드
  useEffect(() => {
    const loadClarusFiles = () => {
      const savedData = localStorage.getItem('clarus_files');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setClarusFiles(data);
          console.log('클라루스 파일 데이터 로드됨:', data);
        } catch (error) {
          console.error('클라루스 파일 데이터 로드 오류:', error);
        }
      } else {
        console.log('저장된 클라루스 파일 데이터가 없습니다.');
      }
    };
    
    loadClarusFiles();
  }, []);

  // 프로젝트 갤러리 이미지 데이터 로드
  useEffect(() => {
    const loadProjectGalleryImages = () => {
      const savedData = localStorage.getItem('project_gallery_images');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setProjectGalleryImages(data);
          console.log('프로젝트 갤러리 이미지 데이터 로드됨:', data);
        } catch (error) {
          console.error('프로젝트 갤러리 이미지 데이터 로드 오류:', error);
        }
      } else {
        console.log('저장된 프로젝트 갤러리 이미지 데이터가 없습니다.');
      }
    };
    
    loadProjectGalleryImages();
  }, []);

  // 회사 로고 데이터 로드
  useEffect(() => {
    const loadCompanyLogos = () => {
      const savedData = localStorage.getItem('company_logos');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setCompanyLogos(data);
          console.log('회사 로고 데이터 로드됨:', data);
        } catch (error) {
          console.error('회사 로고 데이터 로드 오류:', error);
        }
      } else {
        console.log('저장된 회사 로고 데이터가 없습니다.');
      }
    };
    
    loadCompanyLogos();
  }, []);

  // 클라루스 파일 업로드 처리
  const handleClarusFileUpload = (fileType, file) => {
    if (!file) return;

    // 파일을 URL로 변환 (실제 프로덕션에서는 서버에 업로드)
    const fileUrl = URL.createObjectURL(file);
    
    const fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileUrl,
      uploadedAt: new Date().toISOString()
    };

    const updatedFiles = {
      ...clarusFiles,
      [fileType]: fileData
    };

    setClarusFiles(updatedFiles);
    localStorage.setItem('clarus_files', JSON.stringify(updatedFiles));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('clarusFilesUpdated'));
    
    alert(`${fileType === 'technicalDocs' ? '기술 자료' : '제품 카탈로그'} 파일이 업로드되었습니다.`);
  };

  // 클라루스 파일 삭제
  const handleClarusFileDelete = (fileType) => {
    if (window.confirm('정말로 이 파일을 삭제하시겠습니까?')) {
      const updatedFiles = {
        ...clarusFiles,
        [fileType]: null
      };

      setClarusFiles(updatedFiles);
      localStorage.setItem('clarus_files', JSON.stringify(updatedFiles));
      
      // 홈화면에 실시간 반영을 위한 이벤트 발생
      window.dispatchEvent(new Event('clarusFilesUpdated'));
      
      alert('파일이 삭제되었습니다.');
    }
  };

  // 프로젝트 갤러리 이미지 업로드 처리
  const handleProjectGalleryImageUpload = (projectKey, file, title) => {
    if (!file) return;

    // 파일을 URL로 변환 (실제 프로덕션에서는 서버에 업로드)
    const fileUrl = URL.createObjectURL(file);
    
    const imageData = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileUrl,
      title: title || `프로젝트 ${projectKey.slice(-1)}`,
      uploadedAt: new Date().toISOString()
    };

    const updatedImages = {
      ...projectGalleryImages,
      [projectKey]: imageData
    };

    setProjectGalleryImages(updatedImages);
    localStorage.setItem('project_gallery_images', JSON.stringify(updatedImages));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('projectGalleryImagesUpdated'));
    
    alert(`프로젝트 ${projectKey.slice(-1)} 이미지가 업로드되었습니다.`);
  };

  // 프로젝트 갤러리 이미지 삭제
  const handleProjectGalleryImageDelete = (projectKey) => {
    if (window.confirm('정말로 이 이미지를 삭제하시겠습니까?')) {
      const updatedImages = {
        ...projectGalleryImages,
        [projectKey]: null
      };

      setProjectGalleryImages(updatedImages);
      localStorage.setItem('project_gallery_images', JSON.stringify(updatedImages));
      
      // 홈화면에 실시간 반영을 위한 이벤트 발생
      window.dispatchEvent(new Event('projectGalleryImagesUpdated'));
      
      alert('이미지가 삭제되었습니다.');
    }
  };

  // 회사 로고 업로드 처리
  const handleCompanyLogoUpload = (companyKey, file) => {
    if (!file) return;

    // 파일을 URL로 변환 (실제 프로덕션에서는 서버에 업로드)
    const fileUrl = URL.createObjectURL(file);
    
    const logoData = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: fileUrl,
      uploadedAt: new Date().toISOString()
    };

    const updatedLogos = {
      ...companyLogos,
      [companyKey]: logoData
    };

    setCompanyLogos(updatedLogos);
    localStorage.setItem('company_logos', JSON.stringify(updatedLogos));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('companyLogosUpdated'));
    
    alert(`${companyKey} 로고가 업로드되었습니다.`);
  };

  // 회사 로고 삭제
  const handleCompanyLogoDelete = (companyKey) => {
    if (window.confirm('정말로 이 로고를 삭제하시겠습니까?')) {
      const updatedLogos = {
        ...companyLogos,
        [companyKey]: null
      };

      setCompanyLogos(updatedLogos);
      localStorage.setItem('company_logos', JSON.stringify(updatedLogos));
      
      // 홈화면에 실시간 반영을 위한 이벤트 발생
      window.dispatchEvent(new Event('companyLogosUpdated'));
      
      alert('로고가 삭제되었습니다.');
    }
  };

  // 회사 로고 관리 탭 컴포넌트
  const CompanyLogosTab = ({ logos, onUpload, onDelete }) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">회사 로고 관리</h2>
        <div className="text-sm text-gray-600">
          홈페이지 계열사 섹션의 회사 로고를 관리합니다
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'clarus', name: '클라루스' },
          { key: 'tlc', name: '정호티엘씨' },
          { key: 'illutech', name: '일루텍' },
          { key: 'texcom', name: '정호텍스컴' }
        ].map((company) => (
          <div key={company.key} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {company.name} 로고
            </h3>
            
            {logos[company.key] ? (
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-blue-900">{logos[company.key].name}</p>
                      <p className="text-xs text-blue-600">
                        업로드: {new Date(logos[company.key].uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => onDelete(company.key)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                  <img 
                    src={logos[company.key].url} 
                    alt={`${company.name} 로고`}
                    className="w-16 h-16 object-contain rounded-lg mx-auto"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">업로드된 로고가 없습니다</p>
                <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  로고 선택
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => onUpload(company.key, e.target.files[0])}
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 업로드 가이드 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-3">로고 업로드 가이드</h4>
        <div className="text-sm text-gray-600 space-y-2">
          <p>• 각 회사별로 로고 이미지를 설정할 수 있습니다.</p>
          <p>• 이미지 형식: PNG, JPG, SVG 등 모든 이미지 파일</p>
          <p>• 권장 이미지 크기: 200x200px 이상 (정사각형)</p>
          <p>• 최대 파일 크기: 5MB</p>
          <p>• 업로드된 로고는 홈페이지 계열사 섹션에 표시됩니다.</p>
        </div>
      </div>
    </div>
  );

  // 프로젝트 갤러리 이미지 관리 탭 컴포넌트
  const ProjectGalleryTab = ({ images, onUpload, onDelete }) => {
    const [titles, setTitles] = useState({
      project1: '',
      project2: '',
      project3: '',
      project4: ''
    });

    const [selectedFiles, setSelectedFiles] = useState({
      project1: null,
      project2: null,
      project3: null,
      project4: null
    });

    const handleFileSelect = (projectKey, file) => {
      setSelectedFiles(prev => ({
        ...prev,
        [projectKey]: file
      }));
    };

    const handleTitleChange = (projectKey, title) => {
      setTitles(prev => ({
        ...prev,
        [projectKey]: title
      }));
    };

    const handleUpload = (projectKey) => {
      const file = selectedFiles[projectKey];
      const title = titles[projectKey];
      
      if (!file) {
        alert('파일을 선택해주세요.');
        return;
      }
      
      if (!title.trim()) {
        alert('프로젝트 제목을 입력해주세요.');
        return;
      }
      
      onUpload(projectKey, file, title);
      
      // 입력 필드 초기화
      setSelectedFiles(prev => ({
        ...prev,
        [projectKey]: null
      }));
      setTitles(prev => ({
        ...prev,
        [projectKey]: ''
      }));
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">프로젝트 갤러리 이미지 관리</h2>
          <div className="text-sm text-gray-600">
            홈페이지 "검증된 성과와 신뢰" 섹션의 프로젝트 이미지를 관리합니다
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['project1', 'project2', 'project3', 'project4'].map((projectKey, index) => (
            <div key={projectKey} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                프로젝트 {index + 1} 이미지
              </h3>
              
              {images[projectKey] ? (
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-blue-900">{images[projectKey].title}</p>
                        <p className="text-sm text-blue-700">{images[projectKey].name}</p>
                        <p className="text-xs text-blue-600">
                          업로드: {new Date(images[projectKey].uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onDelete(projectKey)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        삭제
                      </button>
                    </div>
                    <img 
                      src={images[projectKey].url} 
                      alt={images[projectKey].title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      프로젝트 제목
                    </label>
                    <input
                      type="text"
                      value={titles[projectKey]}
                      onChange={(e) => handleTitleChange(projectKey, e.target.value)}
                      placeholder="예: 삼성전자 반도체 공장"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      프로젝트 이미지
                    </label>
                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
                      파일 선택
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(projectKey, e.target.files[0])}
                      />
                    </label>
                    {selectedFiles[projectKey] && (
                      <p className="text-sm text-gray-600 mt-2">
                        선택된 파일: {selectedFiles[projectKey].name}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleUpload(projectKey)}
                    disabled={!selectedFiles[projectKey] || !titles[projectKey].trim()}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    업로드
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 업로드 가이드 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-3">이미지 업로드 가이드</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• 각 프로젝트별로 이미지와 제목을 설정할 수 있습니다.</p>
            <p>• 이미지 형식: JPG, PNG, GIF 등 모든 이미지 파일</p>
            <p>• 권장 이미지 크기: 800x600px 이상</p>
            <p>• 최대 파일 크기: 10MB</p>
            <p>• 업로드된 이미지는 홈페이지 "검증된 성과와 신뢰" 섹션에 표시됩니다.</p>
          </div>
        </div>
      </div>
    );
  };

  // 클라루스 파일 관리 탭 컴포넌트
  const ClarusFilesTab = ({ files, onUpload, onDelete }) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">클라루스 파일 관리</h2>
        <div className="text-sm text-gray-600">
          기술 자료와 제품 카탈로그 파일을 관리합니다
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 기술 자료 관리 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">기술 자료</h3>
          
          {files.technicalDocs ? (
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">{files.technicalDocs.name}</p>
                    <p className="text-sm text-blue-700">
                      {(files.technicalDocs.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-blue-600">
                      업로드: {new Date(files.technicalDocs.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete('technicalDocs')}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">업로드된 기술 자료가 없습니다</p>
              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                파일 선택
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => onUpload('technicalDocs', e.target.files[0])}
                />
              </label>
            </div>
          )}
        </div>

        {/* 제품 카탈로그 관리 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">제품 카탈로그</h3>
          
          {files.productCatalog ? (
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-900">{files.productCatalog.name}</p>
                    <p className="text-sm text-green-700">
                      {(files.productCatalog.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-green-600">
                      업로드: {new Date(files.productCatalog.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete('productCatalog')}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">업로드된 제품 카탈로그가 없습니다</p>
              <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                파일 선택
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => onUpload('productCatalog', e.target.files[0])}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* 파일 업로드 가이드 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-3">파일 업로드 가이드</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-700 mb-2">기술 자료</p>
            <ul className="space-y-1">
              <li>• PDF, Word, PowerPoint 파일 지원</li>
              <li>• 최대 파일 크기: 50MB</li>
              <li>• 기술 스펙, 매뉴얼 등</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-2">제품 카탈로그</p>
            <ul className="space-y-1">
              <li>• PDF, 이미지 파일 지원</li>
              <li>• 최대 파일 크기: 50MB</li>
              <li>• 제품 소개, 사양 등</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // 인증되지 않은 경우 로그인 폼 표시
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            관리자 로그인
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  관리자 비밀번호
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 메인 관리자 페이지
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">정호그룹 콘텐츠 관리</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">시스템 관리자 (admin)</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">콘텐츠 관리</h2>
          
          {/* 탭 네비게이션 */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('home')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'home'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                홈페이지 콘텐츠
              </button>
              <button
                onClick={() => setActiveTab('firebase')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'firebase'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Firebase 테스트
              </button>
              <button
                onClick={() => setActiveTab('i18n')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'i18n'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                다국어 관리
              </button>
              <button
                onClick={() => setActiveTab('clarus-files')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'clarus-files'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                클라루스 파일 관리
              </button>
              <button
                onClick={() => setActiveTab('project-gallery')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'project-gallery'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                프로젝트 갤러리
              </button>
              <button
                onClick={() => setActiveTab('company-logos')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'company-logos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                회사 로고
              </button>
            </nav>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === 'home' && (
          <SimpleHomeContentManager 
            data={homeData} 
            onSave={saveContent}
          />
        )}
        
        {activeTab === 'firebase' && (
          <div className="mt-6">
            <FirebaseTest />
          </div>
        )}
        
        {activeTab === 'i18n' && (
          <div className="mt-6">
            <AdminI18nManager />
          </div>
        )}
        
        {activeTab === 'clarus-files' && (
          <ClarusFilesTab 
            files={clarusFiles}
            onUpload={handleClarusFileUpload}
            onDelete={handleClarusFileDelete}
          />
        )}
        
        {activeTab === 'project-gallery' && (
          <ProjectGalleryTab 
            images={projectGalleryImages}
            onUpload={handleProjectGalleryImageUpload}
            onDelete={handleProjectGalleryImageDelete}
          />
        )}
        
        {activeTab === 'company-logos' && (
          <CompanyLogosTab 
            logos={companyLogos}
            onUpload={handleCompanyLogoUpload}
            onDelete={handleCompanyLogoDelete}
          />
        )}
      </main>
    </div>
  );
};

export default AdminPage;
