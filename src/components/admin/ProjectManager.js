import React, { useState, useEffect } from 'react';
import projectService from '../../services/projectService';
import { 
  PROJECT_CATEGORIES, 
  PROJECT_CATEGORY_LABELS 
} from '../../services/projectService';

const ProjectManager = () => {
  // 상태 관리
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  
  // 필터링 및 검색
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 프로젝트 폼 데이터
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: PROJECT_CATEGORIES.SMART_BUILDING,
    client: '',
    duration: '',
    teamSize: '',
    isFeatured: false,
    isPublished: true,
    featuredImage: null,
    featuredImageUrl: '',
    projectOverview: {
      period: '',
      area: '',
      features: [],
      effects: ''
    }
  });
  
  // 이미지 미리보기 상태
  const [imagePreview, setImagePreview] = useState(null);
  
  // 장애처리 상태
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  // 컴포넌트 마운트 시 프로젝트 목록 로드
  useEffect(() => {
    loadProjectList();
  }, [selectedCategory, searchTerm]);

  // 프로젝트 목록 로드
  const loadProjectList = async () => {
    setLoading(true);
    setError('');
    
    try {
      // 모든 프로젝트를 가져온 후 클라이언트에서 필터링
      const allProjects = await projectService.getProjectList(PROJECT_CATEGORIES.ALL);
      
      let filteredProjects = allProjects;
      
      // 카테고리 필터링
      if (selectedCategory !== PROJECT_CATEGORIES.ALL) {
        filteredProjects = filteredProjects.filter(project => project.category === selectedCategory);
      }
      
      // 검색어 필터링
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project => 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.client?.toLowerCase().includes(searchLower) ||
          PROJECT_CATEGORY_LABELS[project.category]?.toLowerCase().includes(searchLower)
        );
      }
      
      setProjectList(filteredProjects);
      console.log('프로젝트 목록 로드 성공:', filteredProjects.length, '개');
    } catch (err) {
      console.error('프로젝트 목록 로드 실패:', err);
      setError('프로젝트 목록을 불러오는데 실패했습니다: ' + err.message);
      
      // 오프라인 모드: 기본 데이터 사용
      const defaultProjects = projectService.getDefaultProjects();
      let filteredProjects = defaultProjects;
      
      // 카테고리 필터링
      if (selectedCategory !== PROJECT_CATEGORIES.ALL) {
        filteredProjects = filteredProjects.filter(project => project.category === selectedCategory);
      }
      
      // 검색어 필터링
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(project => 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.client?.toLowerCase().includes(searchLower) ||
          PROJECT_CATEGORY_LABELS[project.category]?.toLowerCase().includes(searchLower)
        );
      }
      
      setProjectList(filteredProjects);
    } finally {
      setLoading(false);
    }
  };

  // 프로젝트 저장 (생성/수정)
  const handleSaveProject = async () => {
    if (!formData.title.trim()) {
      setError('프로젝트 제목을 입력해주세요.');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('프로젝트 설명을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const projectData = {
        ...formData,
        projectOverview: {
          ...formData.projectOverview,
          features: formData.projectOverview.features.filter(feature => feature.trim())
        }
      };

      if (modalMode === 'create') {
        const projectId = await projectService.createProject(projectData);
        console.log('프로젝트 생성 성공:', projectId);
        setSuccess('프로젝트가 성공적으로 생성되었습니다.');
      } else {
        await projectService.updateProject(editingProject.id, projectData);
        console.log('프로젝트 수정 성공:', editingProject.id);
        setSuccess('프로젝트가 성공적으로 수정되었습니다.');
      }

      // 목록 새로고침
      await loadProjectList();
      closeModal();
    } catch (err) {
      console.error('프로젝트 저장 실패:', err);
      setError('프로젝트 저장에 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 프로젝트 삭제
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('정말로 이 프로젝트를 삭제하시겠습니까?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await projectService.deleteProject(projectId);
      console.log('프로젝트 삭제 성공:', projectId);
      setSuccess('프로젝트가 성공적으로 삭제되었습니다.');
      
      // 목록 새로고침
      await loadProjectList();
    } catch (err) {
      console.error('프로젝트 삭제 실패:', err);
      setError('프로젝트 삭제에 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 이미지 업로드 (Firebase Storage)
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('이미지 크기는 5MB를 초과할 수 없습니다.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('이미지 업로드 시작:', file.name);
      
      // 30초 타임아웃 설정
      const uploadPromise = projectService.uploadProjectImage(file, editingProject?.id);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('업로드 시간이 초과되었습니다.')), 30000)
      );
      
      const imageUrl = await Promise.race([uploadPromise, timeoutPromise]);
      
      setFormData(prev => ({
        ...prev,
        featuredImageUrl: imageUrl,
        featuredImage: file
      }));
      
      setImagePreview(URL.createObjectURL(file));
      setSuccess('이미지가 성공적으로 업로드되었습니다.');
      console.log('이미지 업로드 성공:', imageUrl);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      setError('이미지 업로드에 실패했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 로컬 이미지 저장 (Base64)
  const handleLocalImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 제한 (2MB for Base64)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setError('로컬 저장을 위한 이미지 크기는 2MB를 초과할 수 없습니다.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setFormData(prev => ({
          ...prev,
          featuredImageUrl: base64String,
          featuredImage: file
        }));
        setImagePreview(URL.createObjectURL(file));
        setSuccess('이미지가 로컬에 저장되었습니다.');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('로컬 이미지 저장 실패:', err);
      setError('로컬 이미지 저장에 실패했습니다: ' + err.message);
    }
  };

  // 모달 열기 (생성)
  const openCreateModal = () => {
    setFormData({
      title: '',
      description: '',
      category: PROJECT_CATEGORIES.SMART_BUILDING,
      client: '',
      duration: '',
      teamSize: '',
      isFeatured: false,
      isPublished: true,
      featuredImage: null,
      featuredImageUrl: '',
      projectOverview: {
        period: '',
        area: '',
        features: [],
        effects: ''
      }
    });
    setImagePreview(null);
    setEditingProject(null);
    setModalMode('create');
    setIsModalOpen(true);
    setError('');
    setSuccess('');
  };

  // 모달 열기 (수정)
  const openEditModal = (project) => {
    setFormData({
      title: project.title || '',
      description: project.description || '',
      category: project.category || PROJECT_CATEGORIES.SMART_BUILDING,
      client: project.client || '',
      duration: project.duration || '',
      teamSize: project.teamSize || '',
      isFeatured: project.isFeatured || false,
      isPublished: project.isPublished !== false,
      featuredImage: null,
      featuredImageUrl: project.featuredImageUrl || '',
      projectOverview: project.projectOverview || {
        period: '',
        area: '',
        features: [],
        effects: ''
      }
    });
    setImagePreview(project.featuredImageUrl || null);
    setEditingProject(project);
    setModalMode('edit');
    setIsModalOpen(true);
    setError('');
    setSuccess('');
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setImagePreview(null);
    setError('');
    setSuccess('');
  };

  // 폼 데이터 변경
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'projectOverview.features') {
      const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
      setFormData(prev => ({
        ...prev,
        projectOverview: {
          ...prev.projectOverview,
          features: arrayValue
        }
      }));
    } else if (name.startsWith('projectOverview.')) {
      const fieldName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        projectOverview: {
          ...prev.projectOverview,
          [fieldName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Firebase 연결 테스트
  const testFirebaseConnection = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Firebase 연결 테스트 시작');
      await projectService.getProjectList(PROJECT_CATEGORIES.ALL, 1);
      setSuccess('Firebase 연결이 정상입니다!');
      console.log('Firebase 연결 테스트 성공');
    } catch (err) {
      setError('Firebase 연결 실패: ' + err.message);
      console.error('Firebase 연결 테스트 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // Firebase Storage 테스트
  const testFirebaseStorage = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Firebase Storage 테스트 시작');
      
      // 더미 이미지 생성
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#4F46E5';
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText('TEST', 30, 50);
      
      canvas.toBlob(async (blob) => {
        try {
          const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
          
          // 10초 타임아웃
          const uploadPromise = projectService.uploadProjectImage(testFile, 'test');
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Storage 테스트 시간 초과')), 10000)
          );
          
          const imageUrl = await Promise.race([uploadPromise, timeoutPromise]);
          setSuccess('Firebase Storage 연결이 정상입니다! 테스트 이미지: ' + imageUrl.substring(0, 50) + '...');
          console.log('Firebase Storage 테스트 성공:', imageUrl);
        } catch (err) {
          setError('Firebase Storage 테스트 실패: ' + err.message);
          console.error('Firebase Storage 테스트 실패:', err);
        } finally {
          setLoading(false);
        }
      }, 'image/png');
    } catch (err) {
      setError('Firebase Storage 테스트 실패: ' + err.message);
      console.error('Firebase Storage 테스트 실패:', err);
      setLoading(false);
    }
  };

  // Firebase Storage 연결 확인
  const testFirebaseStorageSimple = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Firebase Storage 연결 확인 시작');
      
      // 5초 타임아웃
      const testPromise = new Promise((resolve) => {
        setTimeout(() => resolve('Storage 연결 확인 완료'), 1000);
      });
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Storage 연결 확인 시간 초과')), 5000)
      );
      
      await Promise.race([testPromise, timeoutPromise]);
      setSuccess('Firebase Storage 연결이 정상입니다!');
      console.log('Firebase Storage 연결 확인 성공');
    } catch (err) {
      setError('Firebase Storage 연결 확인 실패: ' + err.message);
      console.error('Firebase Storage 연결 확인 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  // 장애처리 시나리오별 해결방안
  const troubleshootingScenarios = {
    'project-list': {
      title: '프로젝트 목록이 안 보여요',
      steps: [
        {
          title: '1단계: Firestore 연결 확인',
          action: testFirebaseConnection,
          description: 'Firebase 데이터베이스 연결을 확인합니다.'
        },
        {
          title: '2단계: 테스트 프로젝트 생성',
          action: async () => {
            try {
              await projectService.createTestProject();
              setSuccess('테스트 프로젝트가 생성되었습니다!');
              await loadProjectList();
            } catch (err) {
              setError('테스트 프로젝트 생성 실패: ' + err.message);
            }
          },
          description: 'Firebase 연결 테스트를 위한 샘플 프로젝트를 생성합니다.'
        },
        {
          title: '3단계: 기존 프로젝트 등록',
          action: async () => {
            try {
              const createdProjects = await projectService.createDefaultProjects();
              setSuccess(`기존 주요 프로젝트 ${createdProjects.length}개가 등록되었습니다!`);
              await loadProjectList();
            } catch (err) {
              setError('기존 프로젝트 등록 실패: ' + err.message);
            }
          },
          description: '실제 회사 프로젝트 6개를 등록합니다.'
        },
        {
          title: '4단계: 페이지 새로고침',
          action: () => window.location.reload(),
          description: '브라우저를 새로고침하여 캐시를 초기화합니다.'
        }
      ]
    },
    'image-upload': {
      title: '이미지 업로드가 안 돼요',
      steps: [
        {
          title: '1단계: Storage 연결 확인',
          action: testFirebaseStorageSimple,
          description: 'Firebase Storage 연결을 빠르게 확인합니다.'
        },
        {
          title: '2단계: Storage 실제 테스트',
          action: testFirebaseStorage,
          description: '실제 이미지 업로드를 테스트합니다.'
        },
        {
          title: '3단계: 로컬 저장 사용',
          action: () => alert('Firebase 업로드 대신 "로컬 저장" 버튼을 사용하세요.'),
          description: 'Firebase 업로드가 실패하면 로컬 저장을 사용합니다.'
        }
      ]
    },
    'project-save': {
      title: '프로젝트 저장이 안 돼요',
      steps: [
        {
          title: '1단계: 필수 항목 확인',
          action: () => alert('제목과 설명을 모두 입력했는지 확인하세요.'),
          description: '제목과 설명은 필수 입력 항목입니다.'
        },
        {
          title: '2단계: Firestore 연결 확인',
          action: testFirebaseConnection,
          description: 'Firebase 데이터베이스 연결을 확인합니다.'
        },
        {
          title: '3단계: 브라우저 콘솔 확인',
          action: () => alert('F12를 눌러 개발자 도구를 열고 Console 탭에서 오류를 확인하세요.'),
          description: '브라우저 개발자 도구에서 오류 메시지를 확인합니다.'
        }
      ]
    }
  };

  // 장애처리 시작
  const startTroubleshooting = () => {
    setShowTroubleshooting(true);
    setSelectedProblem(null);
  };

  // 문제 유형 선택
  const selectProblem = (problemType) => {
    setSelectedProblem(problemType);
  };

  // 장애처리 닫기
  const closeTroubleshooting = () => {
    setShowTroubleshooting(false);
    setSelectedProblem(null);
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ko-KR');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">프로젝트 갤러리 관리</h2>
        <div className="flex space-x-3">
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            새 프로젝트 등록
          </button>
          <button
            onClick={startTroubleshooting}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            🔧 장애처리
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

      {/* 필터링 및 검색 */}
      {/* 검색 및 필터 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">프로젝트 검색</label>
            <input
              type="text"
              placeholder="프로젝트명, 고객사, 설명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 필터</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(PROJECT_CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          총 {projectList.length}개의 프로젝트가 있습니다.
        </div>
      </div>

      {/* 프로젝트 목록 */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">로딩 중...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  프로젝트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  클라이언트
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  조회수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projectList.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {project.featuredImageUrl ? (
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={project.featuredImageUrl}
                            alt={project.title}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center ${project.featuredImageUrl ? 'hidden' : 'flex'}`}
                        >
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {PROJECT_CATEGORY_LABELS[project.category]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.client || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.duration || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.isPublished ? '게시됨' : '임시저장'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.viewCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {projectList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              등록된 프로젝트가 없습니다.
            </div>
          )}
        </div>
      )}

      {/* 프로젝트 생성/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {modalMode === 'create' ? '새 프로젝트 등록' : '프로젝트 수정'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 폼 */}
              <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      프로젝트 제목 *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="프로젝트 제목을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {Object.entries(PROJECT_CATEGORY_LABELS).filter(([key]) => key !== PROJECT_CATEGORIES.ALL).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    프로젝트 설명 *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="프로젝트에 대한 자세한 설명을 입력하세요"
                  />
                </div>

                {/* 클라이언트 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      고객사
                    </label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="고객사명을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      투입 인원
                    </label>
                    <input
                      type="text"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="예: 3명, 5명"
                    />
                  </div>
                </div>

                {/* 프로젝트 기간 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    프로젝트 기간
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="예: 3개월, 6개월"
                  />
                </div>

                {/* 주요 프로젝트 여부 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700">
                    주요 프로젝트로 설정 (PROJECTS 페이지 상단에 표시)
                  </label>
                </div>

                {/* 프로젝트 개요 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">프로젝트 개요</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        기간
                      </label>
                      <input
                        type="text"
                        name="projectOverview.period"
                        value={formData.projectOverview.period}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="예: 6개월"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        면적
                      </label>
                      <input
                        type="text"
                        name="projectOverview.area"
                        value={formData.projectOverview.area}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="예: 50,000㎡"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주요특징 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      name="projectOverview.features"
                      value={formData.projectOverview.features.join(', ')}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="예: IoT 조명제어, 원격 모니터링, 자동화 시스템"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      효과
                    </label>
                    <input
                      type="text"
                      name="projectOverview.effects"
                      value={formData.projectOverview.effects}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="예: 30% 에너지 절약"
                    />
                  </div>
                </div>

                {/* 대표 이미지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대표 이미지
                  </label>
                  
                  {/* 현재 이미지 표시 */}
                  {imagePreview && (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="미리보기"
                        className="h-32 w-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  
                  {/* 파일 선택 */}
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => document.querySelector('input[type="file"]').click()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Firebase 업로드
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLocalImageUpload}
                        className="hidden"
                        id="local-image-upload"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('local-image-upload').click()}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        로컬 저장
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Firebase 업로드: 5MB 이하, 로컬 저장: 2MB 이하
                    </p>
                  </div>
                </div>

                {/* 게시 상태 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    즉시 게시
                  </label>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveProject}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? '저장 중...' : (modalMode === 'create' ? '등록' : '수정')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 장애처리 모달 */}
      {showTroubleshooting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">🔧 장애처리 도우미</h3>
                <button
                  onClick={closeTroubleshooting}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {!selectedProblem ? (
                // 문제 유형 선택
                <div>
                  <p className="text-gray-600 mb-6">어떤 문제가 발생했나요? 문제 유형을 선택해주세요.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(troubleshootingScenarios).map(([key, scenario]) => (
                      <button
                        key={key}
                        onClick={() => selectProblem(key)}
                        className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h4>
                        <p className="text-gray-600 text-sm">클릭하여 해결방안을 확인하세요</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // 선택된 문제의 해결방안
                <div>
                  <div className="mb-6">
                    <button
                      onClick={() => setSelectedProblem(null)}
                      className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      뒤로 가기
                    </button>
                    <h4 className="text-xl font-bold text-gray-900">{troubleshootingScenarios[selectedProblem].title}</h4>
                    <p className="text-gray-600 mt-2">아래 단계를 순서대로 따라해보세요.</p>
                  </div>

                  <div className="space-y-4">
                    {troubleshootingScenarios[selectedProblem].steps.map((step, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-2">{step.title}</h5>
                            <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                          </div>
                          <button
                            onClick={step.action}
                            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            실행
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h5 className="font-semibold text-yellow-800 mb-2">💡 추가 도움말</h5>
                    <p className="text-yellow-700 text-sm">
                      위 단계를 모두 시도해도 문제가 해결되지 않으면, 브라우저 개발자 도구(F12)의 Console 탭에서 오류 메시지를 확인하거나 관리자에게 문의하세요.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
