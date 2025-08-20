import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeContentManager from '../components/admin/HomeContentManager';
import NewsManager from '../components/admin/NewsManager';
import SubsidiaryManager from '../components/admin/SubsidiaryManager';
import FeedbackDashboard from '../components/feedback/FeedbackDashboard';

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

  // 뉴스 데이터 상태
  const [newsData, setNewsData] = useState([
    {
      id: 1,
      title: "정호그룹, AI 조명제어 기술로 CES 2024 혁신상 수상",
      summary: "정호그룹이 개발한 AI 기반 스마트 조명제어 시스템이 CES 2024에서 혁신상을 수상했습니다.",
      date: "2024.01.15",
      category: "수상",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["AI", "CES", "수상"],
      link: "#",
      featured: true
    }
  ]);

  // 새 뉴스 아이템 상태
  const [newNewsItem, setNewNewsItem] = useState({
    title: '',
    summary: '',
    category: '기타',
    thumbnail: '',
    tags: '',
    link: '#',
    featured: false
  });

  // 계열사별 데이터 상태
  const [subsidiaryData, setSubsidiaryData] = useState({
    clarus: {
      hero: {
        title: "클라루스",
        subtitle: "조명제어 시스템의 혁신",
        description: "스마트 조명제어 솔루션으로 더 나은 미래를 만듭니다"
      },
      contact: {
        address: "서울특별시 강남구 논현로 116길 17",
        phone: "02-553-3631",
        email: "clarus@jungho.com"
      }
    },
    texcom: {
      hero: {
        title: "정호텍스컴",
        subtitle: "조명 기술의 선두주자",
        description: "최첨단 조명 기술로 혁신을 이끌어갑니다"
      },
      contact: {
        address: "서울특별시 강남구 논현로 116길 17",
        phone: "02-553-3631",
        email: "texcom@jungho.com"
      }
    },
    tlc: {
      hero: {
        title: "정호티엘씨",
        subtitle: "LED 조명의 미래",
        description: "친환경 LED 조명으로 지속가능한 미래를 만듭니다"
      },
      contact: {
        address: "서울특별시 강남구 논현로 116길 17",
        phone: "02-553-3631",
        email: "tlc@jungho.com"
      }
    },
    illutech: {
      hero: {
        title: "일루텍",
        subtitle: "조명 디자인의 예술",
        description: "창의적인 조명 디자인으로 공간을 아름답게 만듭니다"
      },
      contact: {
        address: "서울특별시 강남구 논현로 116길 17",
        phone: "02-553-3631",
        email: "illutech@jungho.com"
      }
    }
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
      username: 'clarus',
      name: '박클라루스',
      email: 'clarus@jungho.com',
      role: 'subsidiary_manager',
      department: '클라루스',
      status: 'active',
      lastLogin: '2024-01-14 16:20',
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      username: 'texcom',
      name: '이텍스컴',
      email: 'texcom@jungho.com',
      role: 'subsidiary_manager',
      department: '정호텍스컴',
      status: 'active',
      lastLogin: '2024-01-14 15:45',
      createdAt: '2024-01-10'
    },
    {
      id: 5,
      username: 'tlc',
      name: '최티엘씨',
      email: 'tlc@jungho.com',
      role: 'subsidiary_manager',
      department: '정호티엘씨',
      status: 'active',
      lastLogin: '2024-01-14 14:30',
      createdAt: '2024-01-10'
    },
    {
      id: 6,
      username: 'illutech',
      name: '정일루텍',
      email: 'illutech@jungho.com',
      role: 'subsidiary_manager',
      department: '일루텍',
      status: 'active',
      lastLogin: '2024-01-14 13:15',
      createdAt: '2024-01-10'
    }
  ]);

  // 사용자 관리 상태
  const [userManagement, setUserManagement] = useState({
    searchTerm: '',
    selectedRole: 'all',
    selectedStatus: 'all',
    showAddUser: false,
    editingUser: null
  });

  // 새 사용자 추가 상태
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'editor',
    department: '',
    status: 'active'
  });

  // 현재 로그인한 사용자 정보
  const [currentUser, setCurrentUser] = useState(null);

  // 인증 처리
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setCurrentUser(users[0]); // 기본 관리자로 설정
    } else {
      // 사용자별 로그인 처리
      const user = users.find(u => u.username === password);
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
      } else {
        alert('잘못된 비밀번호입니다.');
      }
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPassword('');
    setActiveTab('dashboard');
  };

  // 권한 확인 함수
  const hasPermission = (permission) => {
    if (!currentUser) return false;
    
    switch (permission) {
      case 'all':
        return currentUser.role === 'super_admin';
      case 'content':
        return ['super_admin', 'content_manager'].includes(currentUser.role);
      case 'subsidiary':
        return ['super_admin', 'subsidiary_manager'].includes(currentUser.role);
      case 'users':
        return currentUser.role === 'super_admin';
      default:
        return false;
    }
  };

  // 콘텐츠 저장 함수
  const saveContent = (section, data) => {
    // 실제로는 서버에 저장하는 로직이 들어가야 함
    console.log(`${section} 콘텐츠 저장:`, data);
    alert(`${section} 콘텐츠가 저장되었습니다.`);
  };

  // 뉴스 추가 함수
  const addNews = (newsItem) => {
    const newNews = {
      ...newsItem,
      id: Date.now(),
      date: new Date().toLocaleDateString('ko-KR')
    };
    setNewsData([...newsData, newNews]);
    alert('뉴스가 추가되었습니다.');
  };

  // 뉴스 삭제 함수
  const deleteNews = (id) => {
    setNewsData(newsData.filter(news => news.id !== id));
    alert('뉴스가 삭제되었습니다.');
  };

  // 홈페이지 데이터 로드
  const loadHomeData = () => {
    const savedData = localStorage.getItem('homeData');
    if (savedData) {
      setHomeData(JSON.parse(savedData));
    }
  };

  // 뉴스 데이터 로드
  const loadNewsData = () => {
    const savedData = localStorage.getItem('newsData');
    if (savedData) {
      setNewsData(JSON.parse(savedData));
    }
  };

  // 계열사별 데이터 로드
  const loadSubsidiaryData = () => {
    const savedData = localStorage.getItem('subsidiaryData');
    if (savedData) {
      setSubsidiaryData(JSON.parse(savedData));
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

  // 뉴스 데이터 저장
  const saveNewsData = () => {
    localStorage.setItem('newsData', JSON.stringify(newsData));
    alert('뉴스 데이터가 저장되었습니다.');
  };

  // 계열사별 데이터 저장
  const saveSubsidiaryData = () => {
    localStorage.setItem('subsidiaryData', JSON.stringify(subsidiaryData));
    alert('계열사 데이터가 저장되었습니다.');
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



  // 대시보드 탭 컴포넌트
  const DashboardTab = ({ data }) => (
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
          <p className="text-green-600 mt-1">{data.systemStatus.server}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">데이터베이스</span>
                  </div>
          <p className="text-green-600 mt-1">{data.systemStatus.database}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">웹사이트</span>
                  </div>
          <p className="text-green-600 mt-1">{data.systemStatus.website}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">API</span>
                  </div>
          <p className="text-green-600 mt-1">{data.systemStatus.api}</p>
                </div>
              </div>

              {/* 통계 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">총 방문자</h3>
          <p className="text-2xl font-bold text-blue-600">{data.statistics.totalVisitors.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">월간 방문자</h3>
          <p className="text-2xl font-bold text-purple-600">{data.statistics.monthlyVisitors.toLocaleString()}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">일일 방문자</h3>
          <p className="text-2xl font-bold text-orange-600">{data.statistics.dailyVisitors.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700">페이지뷰</h3>
          <p className="text-2xl font-bold text-green-600">{data.statistics.pageViews.toLocaleString()}</p>
                </div>
              </div>

              {/* 최근 활동 */}
              <div>
                <h3 className="font-medium text-gray-700 mb-3">최근 활동</h3>
                <div className="space-y-2">
          {data.recentActivities.map((activity, index) => (
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
  );

  // 홈페이지 탭 컴포넌트
  const HomeTab = ({ data, onSave }) => (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">홈페이지 콘텐츠 관리</h2>
                <button
          onClick={() => onSave('home', homeData)}
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
            value={data.hero.title}
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
            value={data.hero.subtitle}
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
          value={data.hero.description}
                  onChange={(e) => updateHomeData('hero', 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="설명을 입력하세요"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.achievements.map((achievement, index) => (
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    그룹 제목
                  </label>
                  <input
                    type="text"
            value={data.group.title}
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
            value={data.group.description}
                    onChange={(e) => updateHomeData('group', 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="그룹 설명을 입력하세요"
                  />
                </div>
              </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.subsidiaries.map((subsidiary, index) => (
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
  );

  // 뉴스 관리 탭 컴포넌트
  const NewsTab = ({ data, onAdd, onDelete, onSave }) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">뉴스 관리</h2>
        <button
          onClick={() => onSave('news', newsData)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          저장
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-gray-700 mb-3">추가할 뉴스 항목</h3>
            <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={newNewsItem.title}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="뉴스 제목"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">요약</label>
              <textarea
                rows={2}
                value={newNewsItem.summary}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, summary: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="뉴스 요약"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
              <input
                type="date"
                value={newNewsItem.date}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <input
                type="text"
                value={newNewsItem.category}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="카테고리 (예: 수상, 기술, 뉴스)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그 (쉼표로 구분)</label>
              <input
                type="text"
                value={newNewsItem.tags.join(', ')}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="태그 (예: AI, CES, 수상)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">링크</label>
              <input
                type="url"
                value={newNewsItem.link}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, link: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="뉴스 링크"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">썸네일 URL</label>
              <input
                type="url"
                value={newNewsItem.thumbnail}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, thumbnail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="썸네일 이미지 URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">특별 게시</label>
              <input
                type="checkbox"
                checked={newNewsItem.featured}
                onChange={(e) => setNewNewsItem(prev => ({ ...prev, featured: e.target.checked }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            onClick={() => onAdd(newNewsItem)}
            className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            뉴스 추가
          </button>
        </div>
        <div>
          <h3 className="font-medium text-gray-700 mb-3">뉴스 목록</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">요약</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">태그</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{news.title}</div>
                        <div className="text-sm text-gray-500">{news.link}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{news.summary}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{news.date}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{news.category}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{news.tags.join(', ')}</td>
                    <td className="px-4 py-4 text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onDelete(news.id)}
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
        </div>
      </div>
    </div>
  );

  // 계열사 관리 탭 컴포넌트
  const SubsidiaryTab = ({ data, onSave, currentUser }) => (
    <div className="space-y-6">
              <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">계열사 콘텐츠 관리</h2>
                <button
          onClick={() => onSave('subsidiary', subsidiaryData)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  저장
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, subsidiary]) => (
          <div key={key} className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{subsidiary.hero.title}</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                value={subsidiary.hero.title}
                onChange={(e) => setSubsidiaryData(prev => ({ ...prev, [key]: { ...prev[key], hero: { ...prev[key].hero, title: e.target.value } } }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="계열사 히어로 제목"
                      />
                      <textarea
                        rows={3}
                value={subsidiary.hero.subtitle}
                onChange={(e) => setSubsidiaryData(prev => ({ ...prev, [key]: { ...prev[key], hero: { ...prev[key].hero, subtitle: e.target.value } } }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="계열사 히어로 부제목"
              />
              <textarea
                rows={2}
                value={subsidiary.hero.description}
                onChange={(e) => setSubsidiaryData(prev => ({ ...prev, [key]: { ...prev[key], hero: { ...prev[key].hero, description: e.target.value } } }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="계열사 히어로 설명"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">연락처</h4>
              <input
                type="text"
                value={subsidiary.contact.address}
                onChange={(e) => setSubsidiaryData(prev => ({ ...prev, [key]: { ...prev[key], contact: { ...prev[key].contact, address: e.target.value } } }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="주소"
              />
              <input
                type="text"
                value={subsidiary.contact.phone}
                onChange={(e) => setSubsidiaryData(prev => ({ ...prev, [key]: { ...prev[key], contact: { ...prev[key].contact, phone: e.target.value } } }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="전화번호"
              />
              <input
                type="email"
                value={subsidiary.contact.email}
                onChange={(e) => setSubsidiaryData(prev => ({ ...prev, [key]: { ...prev[key], contact: { ...prev[key].contact, email: e.target.value } } }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="이메일"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
  );

  // 사용자 관리 탭 컴포넌트
  const UsersTab = ({ data }) => (
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
  );

  // 인증되지 않은 경우 로그인 화면 표시
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">정호그룹</h1>
            <p className="text-gray-600">콘텐츠 관리 시스템</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사용자명 또는 관리자 비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="사용자명 또는 admin123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>사용자명: marketing, clarus, texcom, tlc, illutech</p>
            <p>관리자: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  // 메인 관리자 페이지
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">정호그룹 콘텐츠 관리</h1>
              <span className="ml-4 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {currentUser?.department || currentUser?.role}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {currentUser?.name} ({currentUser?.username})
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-800"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 네비게이션 탭 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {hasPermission('all') && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                대시보드
              </button>
            )}
            
            {hasPermission('content') && (
              <>
                <button
                  onClick={() => setActiveTab('home')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'home'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  홈페이지
                </button>
                
                <button
                  onClick={() => setActiveTab('news')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'news'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  뉴스 관리
                </button>
              </>
            )}
            
            {hasPermission('subsidiary') && (
              <button
                onClick={() => setActiveTab('subsidiary')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'subsidiary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                계열사 관리
              </button>
            )}
            
            {hasPermission('feedback') && (
              <button
                onClick={() => setActiveTab('feedback')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'feedback'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                피드백 관리
              </button>
            )}

            {hasPermission('users') && (
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                사용자 관리
              </button>
          )}
        </div>
      </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && hasPermission('all') && (
          <DashboardTab data={dashboardData} />
        )}
        
        {activeTab === 'home' && hasPermission('content') && (
          <HomeContentManager data={homeData} onSave={saveContent} />
        )}
        
        {activeTab === 'news' && hasPermission('content') && (
          <NewsManager 
            data={newsData} 
            onAdd={addNews} 
            onDelete={deleteNews}
            onSave={saveContent}
          />
        )}
        
        {activeTab === 'subsidiary' && hasPermission('subsidiary') && (
          <SubsidiaryManager 
            data={subsidiaryData} 
            onSave={saveContent}
            currentUser={currentUser}
          />
        )}
        
        {activeTab === 'feedback' && hasPermission('feedback') && (
          <FeedbackDashboard />
        )}

        {activeTab === 'users' && hasPermission('users') && (
          <UsersTab data={users} />
        )}
      </main>
    </div>
  );
};

export default AdminPage; 