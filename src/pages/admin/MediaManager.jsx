import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 미디어/PR 관리 페이지
 * - 프로젝트 영상 관리
 * - 홍보영상 관리
 * - SNS 링크 관리
 */
const MediaManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  // 인증 확인
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-new/login');
    }
  }, [navigate]);

  // 데이터 로드
  useEffect(() => {
    loadMediaData();
  }, []);

  const loadMediaData = async () => {
    try {
      // 1순위: localStorage에서 데이터 확인
      const localData = localStorage.getItem('projects-data');
      if (localData) {
        console.log('✅ localStorage에서 미디어 데이터 로드');
        setMediaData(JSON.parse(localData));
        setLoading(false);
        return;
      }

      // 2순위: JSON 파일에서 로드
      console.log('📄 JSON 파일에서 미디어 데이터 로드');
      const response = await fetch('/data/projects.json');
      const data = await response.json();
      setMediaData(data);
      setLoading(false);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      setLoading(false);
    }
  };

  // 데이터 저장
  const saveMediaData = () => {
    setSaveStatus('저장 중...');
    
    try {
      // localStorage에 저장 (JSON 파일 자동 업데이트는 서버 필요)
      localStorage.setItem('projects-data', JSON.stringify(mediaData));
      
      // v2_media_data도 함께 업데이트 (홍보영상 페이지에서 사용)
      const existingV2Data = localStorage.getItem('v2_media_data');
      let v2MediaData = existingV2Data ? JSON.parse(existingV2Data) : {};
      v2MediaData.promotionVideos = mediaData.promotionVideos || [];
      localStorage.setItem('v2_media_data', JSON.stringify(v2MediaData));
      
      // 홈페이지도 업데이트된 데이터 사용하도록 이벤트 발생
      window.dispatchEvent(new CustomEvent('projectsUpdated', { detail: mediaData }));
      window.dispatchEvent(new CustomEvent('v2MediaDataUpdated', { detail: v2MediaData }));
      
      setSaveStatus('✅ 저장 완료! (새로고침하면 반영됩니다)');
      setTimeout(() => setSaveStatus(''), 5000);
    } catch (error) {
      setSaveStatus('❌ 저장 실패');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // 전체 데이터 내보내기 (JSON 파일 다운로드) - 프로젝트 + 홍보영상 + SNS 링크
  const exportAllData = () => {
    try {
      // localStorage에서 최신 데이터 가져오기
      const projectsData = localStorage.getItem('projects-data');
      const data = projectsData ? JSON.parse(projectsData) : mediaData;
      
      // 내보내기 데이터 구성
      const exportData = {
        projects: data.projects || [],
        promotionVideos: data.promotionVideos || [],
        snsLinks: data.snsLinks || {},
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      // JSON 문자열로 변환 (보기 좋게 포맷팅)
      const jsonString = JSON.stringify(exportData, null, 2);
      
      // Blob 생성
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // 다운로드 링크 생성
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `admin-media-${new Date().toISOString().split('T')[0]}.json`;
      
      // 다운로드 실행
      document.body.appendChild(link);
      link.click();
      
      // 정리
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(`✅ 데이터 내보내기 완료!\n\n📁 다운로드한 파일 정보:\n• 프로젝트: ${exportData.projects.length}개\n• 홍보영상: ${exportData.promotionVideos.length}개\n• SNS 링크 포함\n\n📌 영구 저장 방법:\n1. 다운로드한 파일을 public/data/projects.json에 복사\n2. Git 커밋 & 푸시\n3. 배포 완료!`);
      
      setSaveStatus('✅ 데이터 내보내기 완료!');
      setTimeout(() => setSaveStatus(''), 5000);
    } catch (error) {
      console.error('내보내기 실패:', error);
      setSaveStatus('❌ 내보내기 실패');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin-new/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 상단 네비게이션 */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin-new/dashboard')}
                className="mr-4 text-gray-600 dark:text-gray-300 hover:text-primary-600"
              >
                ← 대시보드
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                미디어/PR 관리
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {saveStatus && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  {saveStatus}
                </span>
              )}
              <button
                onClick={exportAllData}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                title="프로젝트, 홍보영상, SNS 링크를 JSON 파일로 다운로드합니다"
              >
                <span className="mr-2">📥</span>
                전체 데이터 내보내기
              </button>
              <button
                onClick={saveMediaData}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                저장
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 탭 메뉴 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🏢 프로젝트 영상 ({mediaData?.projects?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'videos'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📺 홍보영상 ({mediaData?.promotionVideos?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('sns')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sns'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🔗 SNS 링크
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && (
          <ProjectsTab 
            projects={mediaData?.projects || []} 
            setMediaData={setMediaData}
            mediaData={mediaData}
          />
        )}
        {activeTab === 'videos' && (
          <VideosTab 
            videos={mediaData?.promotionVideos || []}
            setMediaData={setMediaData}
            mediaData={mediaData}
          />
        )}
        {activeTab === 'sns' && (
          <SNSTab 
            snsLinks={mediaData?.snsLinks || {}}
            setMediaData={setMediaData}
            mediaData={mediaData}
          />
        )}
      </main>
    </div>
  );
};

// 프로젝트 탭
const ProjectsTab = ({ projects, setMediaData, mediaData }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (projectId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const newProjects = projects.filter(p => p.id !== projectId);
      setMediaData({ ...mediaData, projects: newProjects });
    }
  };

  const handleAdd = (newProject) => {
    const maxId = projects.reduce((max, p) => Math.max(max, p.id), 0);
    const projectWithId = { ...newProject, id: maxId + 1 };
    setMediaData({ ...mediaData, projects: [...projects, projectWithId] });
    setShowAddForm(false);
  };

  const handleEdit = (updatedProject) => {
    const newProjects = projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    );
    setMediaData({ ...mediaData, projects: newProjects });
    setEditingProject(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          프로젝트 영상 관리
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span>
          새 프로젝트 추가
        </button>
      </div>

      {/* 영구 저장 안내 */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-2xl">💾</span>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📌 영구 저장 방법
            </h3>
            <ol className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
              <li>프로젝트를 추가/수정한 후 상단의 <strong>"저장"</strong> 버튼을 클릭합니다</li>
              <li>상단의 <strong>"📥 프로젝트 내보내기"</strong> 버튼을 클릭하여 JSON 파일을 다운로드합니다</li>
              <li>다운로드한 파일을 <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">public/data/projects.json</code> 파일로 복사합니다</li>
              <li>Git에 커밋하고 푸시하여 배포 사이트에 반영합니다</li>
            </ol>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
              ⚠️ 내보내기를 하지 않으면 브라우저 캐시 삭제 시 데이터가 사라질 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 프로젝트 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .sort((a, b) => b.year - a.year || b.id - a.id)
          .map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
              style={{ display: project.image ? 'none' : 'flex' }}
            >
              <span className="text-gray-400 dark:text-gray-500">📷 이미지 없음</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {project.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {project.year}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded text-sm"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 px-3 py-2 rounded text-sm"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 추가 폼 */}
      {showAddForm && (
        <ProjectForm
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* 수정 폼 */}
      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSave={handleEdit}
          onCancel={() => setEditingProject(null)}
        />
      )}
    </div>
  );
};

// 프로젝트 추가/수정 폼
const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    project || {
      name: '',
      category: '업무시설',
      image: '',
      year: new Date().getFullYear()
    }
  );
  const [imagePreview, setImagePreview] = useState(project?.image || '');
  const [uploading, setUploading] = useState(false);

  const categories = [
    '업무시설',
    '공공시설',
    '주거시설',
    '상업시설',
    '문화·의료·교육',
    '생산·물류·데이터센터'
  ];

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - i);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 파일은 5MB 이하여야 합니다.');
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      
      // Base64 데이터를 프로젝트에 직접 저장
      // 이렇게 하면 별도의 파일 저장 없이 이미지를 표시할 수 있음
      setImagePreview(base64String);
      setFormData({ ...formData, image: base64String });
      setUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.image) {
      alert('프로젝트 이름과 이미지는 필수입니다.');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          {project ? '프로젝트 수정' : '새 프로젝트 추가'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 프로젝트 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              프로젝트 이름 *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="예: 쿠쿠 강동 사옥"
              required
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              카테고리 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 연도 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              연도 *
            </label>
            <select
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              required
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* 이미지 업로드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              이미지 *
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                  {uploading ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">업로드 중...</p>
                  ) : imagePreview ? (
                    <div className="space-y-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-32 mx-auto rounded"
                      />
                      <p className="text-xs text-gray-500">클릭하여 변경</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📷 이미지 업로드
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG (최대 5MB)
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {formData.image && !formData.image.startsWith('data:') && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                경로: {formData.image}
              </p>
            )}
            {formData.image && formData.image.startsWith('data:') && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                ✅ 이미지 업로드 완료
              </p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg"
            >
              {project ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>

        {/* 안내 메시지 */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            💡 <strong>저장 방식:</strong><br />
            • 이미지는 Base64 형식으로 프로젝트 데이터에 포함됩니다<br />
            • 모든 데이터는 localStorage에 저장됩니다<br />
            • 상단의 "저장" 버튼을 클릭하면 V2와 Hybrid 홈페이지에 즉시 반영됩니다<br />
            • 새로고침해도 데이터가 유지됩니다
          </p>
        </div>
      </div>
    </div>
  );
};

// 홍보영상 탭
const VideosTab = ({ videos, setMediaData, mediaData }) => {
  const [editingVideo, setEditingVideo] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (videoId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const newVideos = videos.filter(v => v.id !== videoId);
      setMediaData({ ...mediaData, promotionVideos: newVideos });
    }
  };

  const handleAdd = (newVideo) => {
    // 기본 데이터와 ID 충돌 방지를 위해 Date.now() 사용 (최소 1000000 이상)
    const videoWithId = { ...newVideo, id: Date.now() };
    setMediaData({ ...mediaData, promotionVideos: [...videos, videoWithId] });
    setShowAddForm(false);
  };

  const handleEdit = (updatedVideo) => {
    const newVideos = videos.map(v => 
      v.id === updatedVideo.id ? updatedVideo : v
    );
    setMediaData({ ...mediaData, promotionVideos: newVideos });
    setEditingVideo(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          홍보영상 관리
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span className="mr-2">+</span>
          새 홍보영상 추가
        </button>
      </div>

      {/* 홍보영상 목록 */}
      <div className="space-y-4">
        {videos.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              등록된 홍보영상이 없습니다. 새 홍보영상을 추가해주세요.
            </p>
          </div>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="flex">
                {/* 썸네일 */}
                <div className="w-48 h-32 flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">📺</span>
                    </div>
                  )}
                </div>
                
                {/* 정보 */}
                <div className="flex-1 p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {video.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                    <a 
                      href={video.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      🔗 {video.videoUrl}
                    </a>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingVideo(video)}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded text-sm"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 px-3 py-1 rounded text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 추가 폼 */}
      {showAddForm && (
        <VideoForm
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* 수정 폼 */}
      {editingVideo && (
        <VideoForm
          video={editingVideo}
          onSave={handleEdit}
          onCancel={() => setEditingVideo(null)}
        />
      )}
    </div>
  );
};

// 홍보영상 추가/수정 폼
const VideoForm = ({ video, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    video || {
      title: '',
      description: '',
      videoUrl: '',
      thumbnail: ''
    }
  );
  const [thumbnailPreview, setThumbnailPreview] = useState(video?.thumbnail || '');
  const [uploading, setUploading] = useState(false);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('이미지 파일은 5MB 이하여야 합니다.');
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setThumbnailPreview(base64String);
      setFormData({ ...formData, thumbnail: base64String });
      setUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.videoUrl) {
      alert('제목과 동영상 URL은 필수입니다.');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          {video ? '홍보영상 수정' : '새 홍보영상 추가'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="예: 정호그룹 2024 홍보영상"
              required
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              설명
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="홍보영상에 대한 간단한 설명"
              rows={3}
            />
          </div>

          {/* 동영상 URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              동영상 URL *
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              YouTube, Vimeo 등의 동영상 URL을 입력하세요
            </p>
          </div>

          {/* 썸네일 업로드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              썸네일 (선택)
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex-1 cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                  {uploading ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">업로드 중...</p>
                  ) : thumbnailPreview ? (
                    <div className="space-y-2">
                      <img 
                        src={thumbnailPreview} 
                        alt="Preview" 
                        className="max-h-32 mx-auto rounded"
                      />
                      <p className="text-xs text-gray-500">클릭하여 변경</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📷 썸네일 업로드
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG (최대 5MB)
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg"
            >
              {video ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// SNS 링크 탭
const SNSTab = ({ snsLinks, setMediaData, mediaData }) => {
  const [links, setLinks] = useState(snsLinks || {
    youtube: '',
    instagram: '',
    naverBlog: '',
    facebook: ''
  });

  const handleChange = (platform, value) => {
    const newLinks = { ...links, [platform]: value };
    setLinks(newLinks);
    setMediaData({ ...mediaData, snsLinks: newLinks });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        SNS 링크 관리
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-2xl">
        <div className="space-y-4">
          {Object.entries(links).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {platform === 'youtube' && '📺 YouTube'}
                {platform === 'instagram' && '📷 Instagram'}
                {platform === 'naverBlog' && '📝 Naver Blog'}
                {platform === 'facebook' && '👍 Facebook'}
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => handleChange(platform, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder={`${platform} URL`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaManager;

