import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 관리자 인증 상태 (실제로는 서버에서 관리해야 함)
const ADMIN_PASSWORD = 'admin123';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // 홈페이지 데이터 상태
  const [homeData, setHomeData] = useState({
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
      description: '정호그룹은 40년간 조명제어 분야에서 혁신적인 기술을 개발하고 있습니다.'
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
  });

  // 대시보드 데이터
  const [dashboardData, setDashboardData] = useState({
    systemStatus: {
      server: '정상',
      database: '정상',
      website: '정상',
      api: '정상'
    },
    statistics: {
      totalVisitors: 15420,
      monthlyVisitors: 3240,
      dailyVisitors: 156,
      pageViews: 45678
    },
    recentActivities: [
      { time: '10:30', action: '홈페이지 콘텐츠 업데이트', user: '관리자' },
      { time: '09:15', action: '뉴스 게시물 등록', user: '마케팅팀' },
      { time: '08:45', action: '시스템 백업 완료', user: '시스템' },
      { time: '08:00', action: '일일 통계 리포트 생성', user: '시스템' }
    ]
  });

  // 사용자 관리 데이터
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      name: '시스템 관리자',
      email: 'admin@jungho.com',
      role: 'super_admin',
      department: 'IT팀',
      status: 'active',
      lastLogin: '2024-01-15 10:30',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      username: 'marketing',
      name: '김마케팅',
      email: 'marketing@jungho.com',
      role: 'content_manager',
      department: '마케팅팀',
      status: 'active',
      lastLogin: '2024-01-15 09:15',
      createdAt: '2024-01-05'
    },
    {
      id: 3,
      username: 'editor',
      name: '박편집',
      email: 'editor@jungho.com',
      role: 'editor',
      department: '콘텐츠팀',
      status: 'active',
      lastLogin: '2024-01-14 16:45',
      createdAt: '2024-01-10'
    }
  ]);

  // 사용자 관리 상태
  const [userManagement, setUserManagement] = useState({
    showAddUser: false,
    editingUser: null,
    searchTerm: '',
    selectedRole: 'all',
    selectedStatus: 'all'
  });

  // 새 사용자 폼 데이터
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'editor',
    department: '',
    status: 'active'
  });

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      // 기존 데이터 로드
      loadHomeData();
      loadDashboardData();
      loadUsers();
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  // 홈페이지 데이터 로드
  const loadHomeData = () => {
    const savedData = localStorage.getItem('homeData');
    if (savedData) {
      setHomeData(JSON.parse(savedData));
    }
  };

  // 대시보드 데이터 로드
  const loadDashboardData = () => {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      setDashboardData(JSON.parse(savedData));
    }
  };

  // 홈페이지 데이터 저장
  const saveHomeData = () => {
    localStorage.setItem('homeData', JSON.stringify(homeData));
    alert('홈페이지 데이터가 저장되었습니다.');
  };

  // 대시보드 데이터 저장
  const saveDashboardData = () => {
    localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    alert('대시보드 데이터가 저장되었습니다.');
  };

  // 홈페이지 데이터 업데이트
  const updateHomeData = (section, field, value) => {
    setHomeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // 성과 지표 업데이트
  const updateAchievement = (index, field, value) => {
    setHomeData(prev => ({
      ...prev,
      achievements: prev.achievements.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // 계열사 정보 업데이트
  const updateSubsidiary = (index, field, value) => {
    setHomeData(prev => ({
      ...prev,
      subsidiaries: prev.subsidiaries.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // 사용자 관리 함수들
  const loadUsers = () => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  };

  const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users));
    alert('사용자 데이터가 저장되었습니다.');
  };

  const addUser = () => {
    if (!newUser.username || !newUser.name || !newUser.email || !newUser.password) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    const userExists = users.find(user => user.username === newUser.username);
    if (userExists) {
      alert('이미 존재하는 사용자명입니다.');
      return;
    }

    const newUserData = {
      ...newUser,
      id: Math.max(...users.map(u => u.id)) + 1,
      lastLogin: '-',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUserData]);
    setNewUser({
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'editor',
      department: '',
      status: 'active'
    });
    setUserManagement(prev => ({ ...prev, showAddUser: false }));
    alert('사용자가 추가되었습니다.');
  };

  const updateUser = (id, field, value) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, [field]: value } : user
    ));
  };

  const deleteUser = (id) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
      alert('사용자가 삭제되었습니다.');
    }
  };

  const editUser = (user) => {
    setUserManagement(prev => ({ ...prev, editingUser: user }));
  };

  const saveUserEdit = () => {
    setUserManagement(prev => ({ ...prev, editingUser: null }));
    alert('사용자 정보가 수정되었습니다.');
  };

  const cancelUserEdit = () => {
    setUserManagement(prev => ({ ...prev, editingUser: null }));
  };

  // 필터링된 사용자 목록
  const filteredUsers = users.filter(user => {
    const searchMatch = user.name.toLowerCase().includes(userManagement.searchTerm.toLowerCase()) ||
                       user.username.toLowerCase().includes(userManagement.searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(userManagement.searchTerm.toLowerCase());
    const roleMatch = userManagement.selectedRole === 'all' || user.role === userManagement.selectedRole;
    const statusMatch = userManagement.selectedStatus === 'all' || user.status === userManagement.selectedStatus;
    return searchMatch && roleMatch && statusMatch;
  });



  const getRoleLabel = (role) => {
    const labels = {
      'super_admin': '최고 관리자',
      'admin': '관리자',
      'content_manager': '콘텐츠 관리자',
      'editor': '편집자'
    };
    return labels[role] || role;
  };

  const getStatusLabel = (status) => {
    return status === 'active' ? '활성' : '비활성';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">관리자 로그인</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="관리자 비밀번호를 입력하세요"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              로그인
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            비밀번호: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">관리자 패널</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                마지막 로그인: {new Date().toLocaleString()}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 탭 네비게이션 */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', label: '대시보드' },
              { id: 'users', label: '사용자 관리' },
              { id: 'hero', label: '히어로 섹션' },
              { id: 'achievements', label: '성과 지표' },
              { id: 'group', label: '그룹 개요' },
              { id: 'subsidiaries', label: '계열사 정보' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* 대시보드 */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">시스템 대시보드</h2>
                <button
                  onClick={saveDashboardData}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  데이터 저장
                </button>
              </div>

              {/* 시스템 상태 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">서버</span>
                  </div>
                  <p className="text-green-600 mt-1">{dashboardData.systemStatus.server}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">데이터베이스</span>
                  </div>
                  <p className="text-green-600 mt-1">{dashboardData.systemStatus.database}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">웹사이트</span>
                  </div>
                  <p className="text-green-600 mt-1">{dashboardData.systemStatus.website}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">API</span>
                  </div>
                  <p className="text-green-600 mt-1">{dashboardData.systemStatus.api}</p>
                </div>
              </div>

              {/* 통계 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">총 방문자</h3>
                  <p className="text-2xl font-bold text-blue-600">{dashboardData.statistics.totalVisitors.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">월간 방문자</h3>
                  <p className="text-2xl font-bold text-purple-600">{dashboardData.statistics.monthlyVisitors.toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">일일 방문자</h3>
                  <p className="text-2xl font-bold text-orange-600">{dashboardData.statistics.dailyVisitors.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">페이지뷰</h3>
                  <p className="text-2xl font-bold text-green-600">{dashboardData.statistics.pageViews.toLocaleString()}</p>
                </div>
              </div>

              {/* 최근 활동 */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3">최근 활동</h3>
                <div className="space-y-2">
                  {dashboardData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 w-16">{activity.time}</span>
                        <span className="text-sm text-gray-700">{activity.action}</span>
                      </div>
                      <span className="text-sm text-gray-500">{activity.user}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 빠른 링크 */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3">빠른 링크</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="/" target="_blank" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium">홈페이지 보기</h4>
                    <p className="text-sm text-gray-600">현재 홈페이지 확인</p>
                  </a>
                  <a href="/news-page" target="_blank" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium">뉴스 페이지</h4>
                    <p className="text-sm text-gray-600">뉴스 페이지 확인</p>
                  </a>
                  <a href="/admin-panel" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium">관리자 패널</h4>
                    <p className="text-sm text-gray-600">현재 페이지</p>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 히어로 섹션 */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">히어로 섹션 관리</h2>
                <button
                  onClick={saveHomeData}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  저장
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    메인 제목 (줄바꿈은 \n으로 구분)
                  </label>
                  <textarea
                    rows={3}
                    value={homeData.hero.title}
                    onChange={(e) => updateHomeData('hero', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="메인 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    부제목
                  </label>
                  <textarea
                    rows={3}
                    value={homeData.hero.subtitle}
                    onChange={(e) => updateHomeData('hero', 'subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="부제목을 입력하세요"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명
                </label>
                <textarea
                  rows={2}
                  value={homeData.hero.description}
                  onChange={(e) => updateHomeData('hero', 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="설명을 입력하세요"
                />
              </div>
            </div>
          )}

          {/* 성과 지표 */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">성과 지표 관리</h2>
                <button
                  onClick={saveHomeData}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  저장
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {homeData.achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      지표 {index + 1}
                    </label>
                    <input
                      type="text"
                      value={achievement.number}
                      onChange={(e) => updateAchievement(index, 'number', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="숫자"
                    />
                    <input
                      type="text"
                      value={achievement.label}
                      onChange={(e) => updateAchievement(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="라벨"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 그룹 개요 */}
          {activeTab === 'group' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">그룹 개요 관리</h2>
                <button
                  onClick={saveHomeData}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  저장
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    그룹 제목
                  </label>
                  <input
                    type="text"
                    value={homeData.group.title}
                    onChange={(e) => updateHomeData('group', 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="그룹 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    그룹 설명
                  </label>
                  <textarea
                    rows={4}
                    value={homeData.group.description}
                    onChange={(e) => updateHomeData('group', 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="그룹 설명을 입력하세요"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 계열사 정보 */}
          {activeTab === 'subsidiaries' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">계열사 정보 관리</h2>
                <button
                  onClick={saveHomeData}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  저장
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {homeData.subsidiaries.map((subsidiary, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{subsidiary.name}</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={subsidiary.subtitle}
                        onChange={(e) => updateSubsidiary(index, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="부제목"
                      />
                      <textarea
                        rows={3}
                        value={subsidiary.description}
                        onChange={(e) => updateSubsidiary(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="설명"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 사용자 관리 */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">사용자 관리</h2>
                <div className="flex gap-2">
                  <button
                    onClick={saveUsers}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    데이터 저장
                  </button>
                  <button
                    onClick={() => setUserManagement(prev => ({ ...prev, showAddUser: true }))}
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    사용자 추가
                  </button>
                </div>
              </div>

              {/* 검색 및 필터 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
                  <input
                    type="text"
                    value={userManagement.searchTerm}
                    onChange={(e) => setUserManagement(prev => ({ ...prev, searchTerm: e.target.value }))}
                    placeholder="이름, 사용자명, 이메일"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">권한</label>
                  <select
                    value={userManagement.selectedRole}
                    onChange={(e) => setUserManagement(prev => ({ ...prev, selectedRole: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">전체</option>
                    <option value="super_admin">최고 관리자</option>
                    <option value="admin">관리자</option>
                    <option value="content_manager">콘텐츠 관리자</option>
                    <option value="editor">편집자</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                  <select
                    value={userManagement.selectedStatus}
                    onChange={(e) => setUserManagement(prev => ({ ...prev, selectedStatus: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">전체</option>
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <span className="text-sm text-gray-600">
                    총 {filteredUsers.length}명의 사용자
                  </span>
                </div>
              </div>

              {/* 사용자 추가 모달 */}
              {userManagement.showAddUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold mb-4">새 사용자 추가</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">사용자명 *</label>
                        <input
                          type="text"
                          value={newUser.username}
                          onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="사용자명"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                        <input
                          type="text"
                          value={newUser.name}
                          onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="실명"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="이메일"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 *</label>
                        <input
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="비밀번호"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">권한</label>
                        <select
                          value={newUser.role}
                          onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="editor">편집자</option>
                          <option value="content_manager">콘텐츠 관리자</option>
                          <option value="admin">관리자</option>
                          <option value="super_admin">최고 관리자</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">부서</label>
                        <input
                          type="text"
                          value={newUser.department}
                          onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="부서명"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={addUser}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                      >
                        추가
                      </button>
                      <button
                        onClick={() => setUserManagement(prev => ({ ...prev, showAddUser: false }))}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 사용자 목록 */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">권한</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">부서</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마지막 로그인</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.username}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'super_admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'admin' ? 'bg-orange-100 text-orange-800' :
                            user.role === 'content_manager' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {getRoleLabel(user.role)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{user.department}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {getStatusLabel(user.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">{user.lastLogin}</td>
                        <td className="px-4 py-4 text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => editUser(user)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
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
              </div>

              {/* 사용자 수정 모달 */}
              {userManagement.editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold mb-4">사용자 정보 수정</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                        <input
                          type="text"
                          value={userManagement.editingUser.name}
                          onChange={(e) => updateUser(userManagement.editingUser.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                        <input
                          type="email"
                          value={userManagement.editingUser.email}
                          onChange={(e) => updateUser(userManagement.editingUser.id, 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">권한</label>
                        <select
                          value={userManagement.editingUser.role}
                          onChange={(e) => updateUser(userManagement.editingUser.id, 'role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="editor">편집자</option>
                          <option value="content_manager">콘텐츠 관리자</option>
                          <option value="admin">관리자</option>
                          <option value="super_admin">최고 관리자</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">부서</label>
                        <input
                          type="text"
                          value={userManagement.editingUser.department}
                          onChange={(e) => updateUser(userManagement.editingUser.id, 'department', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
                        <select
                          value={userManagement.editingUser.status}
                          onChange={(e) => updateUser(userManagement.editingUser.id, 'status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="active">활성</option>
                          <option value="inactive">비활성</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button
                        onClick={saveUserEdit}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                      >
                        저장
                      </button>
                      <button
                        onClick={cancelUserEdit}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 