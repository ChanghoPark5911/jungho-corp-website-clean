import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedHomeContentManager from '../components/admin/EnhancedHomeContentManager';
import NewsManager from '../components/admin/NewsManager';
import SubsidiaryManager from '../components/admin/SubsidiaryManager';
import FeedbackDashboard from '../components/feedback/FeedbackDashboard';
import ContentApprovalSystem from '../components/admin/ContentApprovalSystem';
import AIContentAssistant from '../components/admin/AIContentAssistant';
import LivePreview from '../components/admin/LivePreview';
import SimpleContentEditor from '../components/admin/SimpleContentEditor';
import ImageManager from '../components/admin/ImageManager';


// 관리자 인증 상태 (실제로는 서버에서 관리해야 함)
const ADMIN_PASSWORD = 'admin123';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    if (isAuthenticated) {
      loadHomePageData(); // 통합 데이터 먼저 로드
      loadHomeData();
      loadNewsData();
      loadClarusFiles();
      loadSubsidiaryData();
      loadDashboardData();
      loadUsers();
    }
  }, [isAuthenticated]);

  // 홈페이지 데이터 상태
  const [homeData, setHomeData] = useState(() => {
    // LocalStorage에서 데이터 불러오기
    const savedData = localStorage.getItem('homeData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('LocalStorage 데이터 파싱 오류:', error);
      }
    }
    
    // 기본 데이터
    return {
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
  });

  // 뉴스 데이터 상태
  const [newsData, setNewsData] = useState(() => {
    // localStorage에서 뉴스 데이터 로드
    const savedNewsData = localStorage.getItem('newsData');
    if (savedNewsData) {
      try {
        return JSON.parse(savedNewsData);
      } catch (error) {
        console.error('뉴스 데이터 파싱 오류:', error);
      }
    }
    
    // 기본 뉴스 데이터
    const defaultNewsData = [
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
    ];
    
    // 기본 데이터를 localStorage에 저장
    localStorage.setItem('newsData', JSON.stringify(defaultNewsData));
    
    return defaultNewsData;
  });

  // 클라루스 파일 데이터 상태
  const [clarusFiles, setClarusFiles] = useState(() => {
    // localStorage에서 클라루스 파일 데이터 로드
    const savedFiles = localStorage.getItem('clarus_files');
    if (savedFiles) {
      try {
        return JSON.parse(savedFiles);
      } catch (error) {
        console.error('클라루스 파일 데이터 파싱 오류:', error);
      }
    }
    
    // 기본 파일 데이터 (없음)
    return {
      technicalDocs: null,
      productCatalog: null
    };
  });

  // 홈페이지 섹션별 데이터 상태
  const [heroData, setHeroData] = useState({
    title: '40년 축적된 기술력으로\n조명의 미래를 혁신합니다',
    subtitle: '정호그룹은 조명제어 전문 기업으로서 혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다',
    description: '150개 이상의 프로젝트와 40년간의 경험을 바탕으로 조명의 미래를 혁신합니다'
  });

  const [statsData, setStatsData] = useState({
    years: '40',
    projects: '800',
    countries: '7',
    support: '99',
    yearsLabel: '조명제어 전문 경험',
    projectsLabel: '프로젝트 완료',
    countriesLabel: '해외진출국',
    supportLabel: '고객만족도'
  });

  const [groupData, setGroupData] = useState({
    title: '40년 전통의 조명제어 전문기업',
    paragraph1: '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
    paragraph2: 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
    paragraph3: '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
  });

  const [subsidiariesData, setSubsidiariesData] = useState({
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

  const [achievementsData, setAchievementsData] = useState([
    { number: '40', label: '년 전통' },
    { number: '800+', label: '프로젝트' },
    { number: '7+', label: '국가 진출' },
    { number: '99%', label: '고객 만족도' }
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

  // 콘텐츠 승인 데이터 상태
  const [contentApprovals, setContentApprovals] = useState([
    {
      id: 1,
      title: '홈페이지 히어로 타이틀 수정',
      author: 'editor',
      section: 'hero',
      type: 'hero',
      status: 'pending',
      createdAt: '2024-01-15T08:00:00Z',
      changes: {
        title: {
          old: '정호그룹\n조명의 미래를\n만들어갑니다',
          new: '정호그룹\n혁신 기술로\n미래를 만듭니다'
        }
      },
      content: {
        type: 'hero',
        data: {
          title: '정호그룹\n혁신 기술로\n미래를 만듭니다'
        }
      }
    },
    {
      id: 2,
      title: '회사 소개 설명 수정',
      author: 'manager',
      section: 'group',
      type: 'group',
      status: 'pending',
      description: 'AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.',
      createdAt: '2024-01-15T09:30:00Z',
      changes: {
        description: {
          old: '정호그룹은 40년간 조명제어 분야에서 혁신적인 기술을 개발하고 있습니다.',
          new: '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.'
        }
      },
      content: {
        type: 'group',
        data: {
          description: '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.'
        }
      }
    }
  ]);

  // 인증 처리
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setCurrentUser(users[0]); // 기본 관리자로 설정
      // 로그인 후 LocalStorage에서 데이터 로드
      loadDataFromStorage();
    } else {
      // 사용자별 로그인 처리
      const user = users.find(u => u.username === password);
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        // 로그인 후 LocalStorage에서 데이터 로드
        loadDataFromStorage();
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

  // 핵심 기능: 콘텐츠 수정 및 즉시 반영
  const handleContentSave = (newData) => {
    console.log('콘텐츠 저장 및 즉시 반영:', newData);
    
    // 1. 홈페이지 데이터 업데이트
    setHomeData(newData);
    localStorage.setItem('homeData', JSON.stringify(newData));
    
    // 2. 전역 상태로 저장 (홈페이지와 공유)
    window.globalHomeData = newData;
    
    // 3. 전역 이벤트 발생 (홈페이지에 알림)
    window.dispatchEvent(new Event('globalHomeDataChanged'));
    
    // 4. 홈페이지로 이동하면서 수정된 데이터 전달
    const encodedData = encodeURIComponent(JSON.stringify(newData));
    window.location.href = `/?approved=${encodedData}`;
    
    alert('콘텐츠가 저장되어 홈페이지에 즉시 반영되었습니다!');
  };

  const handleContentApprove = (approvedData) => {
    // 승인 프로세스가 불필요하므로 단순 저장으로 처리
    handleContentSave(approvedData);
  };

  // 콘텐츠 저장 함수 (즉시 반영)
  const saveContent = (section, data) => {
    console.log(`${section} 콘텐츠 저장 시작:`, data);
    
    // 1. 상태 업데이트
    if (section === 'homepage') {
      setHomeData(data);
      console.log('homeData 상태 업데이트 완료');
    } else if (section === 'news') {
      setNewsData(data);
    } else if (section === 'subsidiary') {
      setSubsidiaryData(data);
    }
    
    // 2. LocalStorage에 저장 (일관된 키 사용)
    if (section === 'homepage') {
      localStorage.setItem('homeData', JSON.stringify(data));
    } else {
      localStorage.setItem(section, JSON.stringify(data));
    }
    console.log('LocalStorage 저장 완료');
    
    // 3. 홈페이지 콘텐츠인 경우 즉시 반영
    if (section === 'homepage') {
      // 전역 상태로 저장 (홈페이지와 공유)
      window.globalHomeData = data;
      console.log('전역 상태 저장 완료');
      
      // 전역 이벤트 발생 (홈페이지에 알림)
      window.dispatchEvent(new Event('globalHomeDataChanged'));
      console.log('전역 이벤트 발생 완료');
      
      // postMessage로 다른 탭에 데이터 업데이트 알림
      if (window.opener) {
        window.opener.postMessage({ type: 'homeDataUpdated', data: data }, '*');
      }
      
      // 현재 페이지에서도 postMessage 발생 (같은 탭의 다른 컴포넌트에 알림)
      window.postMessage({ type: 'homeDataUpdated', data: data }, '*');
      
      alert('콘텐츠가 저장되었습니다! 홈페이지에서 변경사항을 확인하세요.');
    } else {
      alert(`${section} 콘텐츠가 저장되었습니다.`);
    }
  };

  // LocalStorage에서 데이터 불러오기 함수
  const loadDataFromStorage = () => {
    try {
      const savedHomeData = localStorage.getItem('homeData');
      if (savedHomeData) {
        setHomeData(JSON.parse(savedHomeData));
      }
      
      const savedNewsData = localStorage.getItem('newsData');
      if (savedNewsData) {
        setNewsData(JSON.parse(savedNewsData));
      }
      
      const savedSubsidiaryData = localStorage.getItem('subsidiaryData');
      if (savedSubsidiaryData) {
        setSubsidiaryData(JSON.parse(savedSubsidiaryData));
      }
      
      // 승인 대기 데이터 로드
      const savedContentApprovals = localStorage.getItem('contentApprovals');
      if (savedContentApprovals) {
        setContentApprovals(JSON.parse(savedContentApprovals));
      }
    } catch (error) {
      console.error('LocalStorage에서 데이터 불러오기 오류:', error);
    }
  };

  // 뉴스 추가 함수
  const addNews = (newsItem) => {
    const newNews = {
      ...newsItem,
      id: Date.now(),
      date: new Date().toLocaleDateString('ko-KR')
    };
    const updatedNewsData = [...newsData, newNews];
    setNewsData(updatedNewsData);
    
    // localStorage에 저장
    localStorage.setItem('newsData', JSON.stringify(updatedNewsData));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('newsDataUpdated'));
    
    alert('뉴스가 추가되었습니다.');
  };

  // 뉴스 삭제 함수
  const deleteNews = (id) => {
    const updatedNewsData = newsData.filter(news => news.id !== id);
    setNewsData(updatedNewsData);
    
    // localStorage에 저장
    localStorage.setItem('newsData', JSON.stringify(updatedNewsData));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('newsDataUpdated'));
    
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
      try {
        const data = JSON.parse(savedData);
        setNewsData(data);
        console.log('뉴스 데이터 로드됨:', data);
      } catch (error) {
        console.error('뉴스 데이터 로드 오류:', error);
      }
    } else {
      console.log('저장된 뉴스 데이터가 없습니다.');
    }
  };

  // 클라루스 파일 데이터 로드
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

  // 계열사별 데이터 로드
  const loadSubsidiaryData = () => {
    const savedData = localStorage.getItem('subsidiaryData');
    if (savedData) {
      setSubsidiaryData(JSON.parse(savedData));
    }
  };

  // 이미지 업데이트 핸들러
  const handleImageUpdate = (section, newImages) => {
    console.log('이미지 업데이트:', section, newImages);
    
    // null 값인 이미지 제거
    const filteredImages = {};
    Object.entries(newImages).forEach(([name, image]) => {
      if (image !== null) {
        filteredImages[name] = image;
      }
    });
    
    // 이미지 데이터 업데이트
    const updatedImageData = {
      ...imageData,
      [section]: filteredImages
    };
    
    setImageData(updatedImageData);
    
    // LocalStorage에 저장
    localStorage.setItem('imageData', JSON.stringify(updatedImageData));
    console.log('이미지 데이터 저장 완료');
    
    // 홈페이지 데이터에도 이미지 정보 반영
    if (section === 'hero' && Object.keys(filteredImages).length > 0) {
      const firstImage = Object.values(filteredImages)[0];
      const updatedHomeData = {
        ...homeData,
        hero: {
          ...homeData.hero,
          backgroundImage: firstImage.url
        }
      };
      
      setHomeData(updatedHomeData);
      localStorage.setItem('homeData', JSON.stringify(updatedHomeData));
      console.log('홈페이지 이미지 데이터 업데이트 완료');
      
      // 이미지 업데이트 후 홈페이지로 이동하여 변경사항 확인
      alert('이미지가 업데이트되었습니다! 홈페이지로 이동하여 변경사항을 확인하세요.');
      window.location.href = '/';
    }
  };

  // 이미지 데이터 상태
  const [imageData, setImageData] = useState(() => {
    const savedImages = localStorage.getItem('imageData');
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        console.log('저장된 이미지 데이터 로드:', parsed);
        return parsed;
      } catch (error) {
        console.error('이미지 데이터 파싱 오류:', error);
      }
    }
    
    // 기본 이미지 데이터 (Unsplash 더미 이미지)
    const defaultImages = {
      hero: {
        'hero-bg.jpg': {
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          name: 'hero-bg.jpg',
          size: 0,
          type: 'image/jpeg',
          uploadedAt: new Date().toISOString()
        }
      },
      logo: {},
      gallery: {
        'project-1.jpg': {
          url: 'https://images.unsplash.com/photo-1581091226825-a4e2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          name: 'project-1.jpg',
          size: 0,
          type: 'image/jpeg',
          uploadedAt: new Date().toISOString()
        }
      }
    };
    
    console.log('기본 이미지 데이터 생성:', defaultImages);
    
    // 기본 데이터를 localStorage에 저장
    localStorage.setItem('imageData', JSON.stringify(defaultImages));
    
    return defaultImages;
  });

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
    
    // 통합 데이터 구조로도 저장 (데이터 무결성 보장)
    const existingHomePageData = localStorage.getItem('homePageData');
    let homePageData = existingHomePageData ? JSON.parse(existingHomePageData) : {};
    
    // homeData를 homePageData에 병합
    homePageData = { ...homePageData, ...homeData };
    localStorage.setItem('homePageData', JSON.stringify(homePageData));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('groupContentUpdated'));
    window.dispatchEvent(new Event('homePageDataUpdated'));
    
    alert('홈페이지 데이터가 저장되었습니다.');
  };

  // 통합 홈페이지 데이터 저장
  const saveHomePageData = () => {
    // 모든 관련 데이터를 통합하여 저장
    const homePageData = {
      hero: heroData,
      stats: statsData,
      group: groupData,
      subsidiaries: subsidiariesData,
      achievements: achievementsData,
      ...homeData
    };
    
    localStorage.setItem('homePageData', JSON.stringify(homePageData));
    
    // 모든 관련 이벤트 발생
    window.dispatchEvent(new Event('heroContentUpdated'));
    window.dispatchEvent(new Event('statsContentUpdated'));
    window.dispatchEvent(new Event('groupContentUpdated'));
    window.dispatchEvent(new Event('subsidiariesContentUpdated'));
    window.dispatchEvent(new Event('homePageDataUpdated'));
    
    alert('통합 홈페이지 데이터가 저장되었습니다!');
  };

  // 통합 홈페이지 데이터 로드
  const loadHomePageData = () => {
    const savedData = localStorage.getItem('homePageData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        console.log('통합 홈페이지 데이터 로드됨:', data);
        
        // 각 섹션별로 데이터 설정
        if (data.hero) setHeroData(data.hero);
        if (data.stats) setStatsData(data.stats);
        if (data.group) setGroupData(data.group);
        if (data.subsidiaries) setSubsidiariesData(data.subsidiaries);
        if (data.achievements) setAchievementsData(data.achievements);
        if (data.home) setHomeData(data.home);
        
        return data;
      } catch (error) {
        console.error('통합 홈페이지 데이터 로드 오류:', error);
      }
    }
    return null;
  };

  // 데이터 무결성 검증 및 복구
  const validateAndRepairData = () => {
    console.log('데이터 무결성 검증 시작...');
    
    const homePageData = localStorage.getItem('homePageData');
    const heroContent = localStorage.getItem('hero_content');
    const statsContent = localStorage.getItem('stats_content');
    const groupContent = localStorage.getItem('group_content');
    const subsidiariesContent = localStorage.getItem('subsidiaries_content');
    
    let needsRepair = false;
    let repairData = {};
    
    // 각 섹션별 데이터 검증
    if (heroContent) {
      try {
        repairData.hero = JSON.parse(heroContent);
      } catch (error) {
        console.error('히어로 데이터 파싱 오류, 기본값 사용');
        repairData.hero = {
          title: '40년 축적된 기술력으로\n조명의 미래를 혁신합니다',
          subtitle: '정호그룹은 조명제어 전문 기업으로서...',
          description: '150개 이상의 프로젝트와...'
        };
        needsRepair = true;
      }
    }
    
    if (statsContent) {
      try {
        repairData.stats = JSON.parse(statsContent);
      } catch (error) {
        console.error('성과지표 데이터 파싱 오류, 기본값 사용');
        repairData.stats = {
          years: '40', projects: '800', countries: '7', support: '99',
          yearsLabel: '조명제어 전문 경험', projectsLabel: '프로젝트 완료',
          countriesLabel: '해외진출국', supportLabel: '고객만족도'
        };
        needsRepair = true;
      }
    }
    
    if (groupContent) {
      try {
        repairData.group = JSON.parse(groupContent);
      } catch (error) {
        console.error('그룹소개 데이터 파싱 오류, 기본값 사용');
        repairData.group = {
          title: '40년 전통의 조명제어 전문기업',
          paragraph1: '1983년 창립 이래 40년간...',
          paragraph2: 'B2B부터 B2C까지...',
          paragraph3: '혁신적인 기술과 40년간...'
        };
        needsRepair = true;
      }
    }
    
    if (subsidiariesContent) {
      try {
        repairData.subsidiaries = JSON.parse(subsidiariesContent);
      } catch (error) {
        console.error('계열사소개 데이터 파싱 오류, 기본값 사용');
        repairData.subsidiaries = {
          sectionTitle: '4개 계열사가 만드는 완벽한 조명 생태계',
          sectionSubtitle: '기술개발부터 고객서비스까지...',
          clarus: { name: '클라루스', subtitle: 'AI 기반 스마트 조명제어' },
          tlc: { name: '정호티엘씨', subtitle: 'IoT 센서 및 제어 장치' },
          illutech: { name: '일루텍', subtitle: '스마트 물류 솔루션' },
          texcom: { name: '정호텍스컴', subtitle: '텍스타일 제어 시스템' }
        };
        needsRepair = true;
      }
    }
    
    // 통합 데이터 저장
    if (needsRepair || Object.keys(repairData).length > 0) {
      localStorage.setItem('homePageData', JSON.stringify(repairData));
      console.log('데이터 무결성 복구 완료:', repairData);
      alert('데이터 무결성 검증 및 복구가 완료되었습니다.');
      
      // 복구된 데이터로 상태 업데이트
      if (repairData.hero) setHeroData(repairData.hero);
      if (repairData.stats) setStatsData(repairData.stats);
      if (repairData.group) setGroupData(repairData.group);
      if (repairData.subsidiaries) setSubsidiariesData(repairData.subsidiaries);
    } else {
      console.log('데이터 무결성 검증 완료: 모든 데이터가 정상입니다.');
      alert('데이터 무결성 검증 완료: 모든 데이터가 정상입니다.');
    }
  };

  // 뉴스 데이터 저장
  const saveNewsData = () => {
    localStorage.setItem('newsData', JSON.stringify(newsData));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('newsDataUpdated'));
    
    alert('뉴스 데이터가 저장되었습니다.');
  };

  // 계열사별 데이터 저장
  const saveSubsidiaryData = () => {
    localStorage.setItem('subsidiaryData', JSON.stringify(subsidiaryData));
    
    // 홈화면에 실시간 반영을 위한 이벤트 발생
    window.dispatchEvent(new Event('subsidiariesContentUpdated'));
    
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
  const DashboardTab = ({ data, homeData, onSave, onApprove }) => (
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

              {/* 빠른 액세스 */}
              <div className="mt-8">
                <h3 className="font-medium text-gray-700 mb-4 text-center text-xl font-bold">🚀 빠른 액세스</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('home')}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                  >
                    <div className="text-blue-600 font-medium">홈페이지 콘텐츠 관리</div>
                    <div className="text-sm text-gray-600 mt-1">Hero, Group, Achievements 등 수정</div>
                  </button>
                  <button
                    onClick={() => setActiveTab('news')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                  >
                    <div className="text-green-600 font-medium">뉴스 관리</div>
                    <div className="text-sm text-gray-600 mt-1">뉴스 게시물 등록 및 관리</div>
                  </button>
                  <button
                    onClick={() => setActiveTab('subsidiary')}
                    className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
                  >
                    <div className="text-purple-600 font-medium">계열사 관리</div>
                    <div className="text-sm text-gray-600 mt-1">계열사별 콘텐츠 관리</div>
                  </button>
                  <button
                    onClick={() => setActiveTab('clarus-files')}
                    className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors"
                  >
                    <div className="text-orange-600 font-medium">클라루스 파일 관리</div>
                    <div className="text-sm text-gray-600 mt-1">기술 자료, 카탈로그 파일 관리</div>
                  </button>
                  <button
                    onClick={saveHomePageData}
                    className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-left transition-colors text-white"
                  >
                    <div className="font-medium">🚀 통합 데이터 저장</div>
                    <div className="text-sm mt-1 opacity-90">모든 홈페이지 데이터를 한 번에 저장</div>
                  </button>
                </div>
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
            
            {hasPermission('content') && (
              <button
                onClick={() => setActiveTab('clarus-files')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'clarus-files'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                클라루스 파일
              </button>
            )}
            
            {hasPermission('content') && (
              <button
                onClick={saveHomePageData}
                className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
              >
                🚀 통합 저장
              </button>
            )}
            
            {hasPermission('content') && (
              <button
                onClick={validateAndRepairData}
                className="py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm font-medium"
              >
                🔧 데이터 검증
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

            {hasPermission('content') && (
              <button
                onClick={() => setActiveTab('approval')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'approval'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                승인 관리
              </button>
            )}

            {hasPermission('content') && (
              <button
                onClick={() => setActiveTab('ai-assistant')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ai-assistant'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                AI 어시스턴트
              </button>
            )}

            {hasPermission('content') && (
              <button
                onClick={() => setActiveTab('live-preview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'live-preview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                실시간 미리보기
              </button>
            )}

            {hasPermission('content') && (
              <button
                onClick={() => setActiveTab('image-management')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'image-management'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                이미지 관리
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
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">시스템 현황</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.systemStatus.server}</div>
                  <div className="text-sm text-gray-600">서버 상태</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.systemStatus.database}</div>
                  <div className="text-sm text-gray-600">데이터베이스</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.systemStatus.website}</div>
                  <div className="text-sm text-gray-600">웹사이트</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.systemStatus.api}</div>
                  <div className="text-sm text-gray-600">API</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">방문자 통계</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.statistics.totalVisitors.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">총 방문자</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.statistics.monthlyVisitors.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">월간 방문자</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.statistics.dailyVisitors.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">일간 방문자</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.statistics.pageViews.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">페이지뷰</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
              <div className="space-y-3">
                {dashboardData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{activity.action}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>{activity.time}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 액세스</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('home')}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                >
                  <div className="text-blue-600 font-medium">홈페이지 콘텐츠 관리</div>
                  <div className="text-sm text-gray-600 mt-1">Hero, Group, Achievements 등 수정</div>
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
                >
                  <div className="text-green-600 font-medium">뉴스 관리</div>
                  <div className="text-sm text-gray-600 mt-1">뉴스 게시물 등록 및 관리</div>
                </button>
                <button
                  onClick={() => setActiveTab('subsidiary')}
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
                >
                  <div className="text-purple-600 font-medium">계열사 관리</div>
                  <div className="text-sm text-gray-600 mt-1">계열사별 콘텐츠 관리</div>
                </button>
                <button
                  onClick={() => setActiveTab('clarus-files')}
                  className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors"
                >
                  <div className="text-orange-600 font-medium">클라루스 파일 관리</div>
                  <div className="text-sm text-gray-600 mt-1">기술 자료, 카탈로그 파일 관리</div>
                </button>
                <button
                  onClick={saveHomePageData}
                  className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-left transition-colors text-white"
                >
                  <div className="font-medium">🚀 통합 데이터 저장</div>
                  <div className="text-sm mt-1 opacity-90">모든 홈페이지 데이터를 한 번에 저장</div>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'home' && hasPermission('content') && (
          <EnhancedHomeContentManager 
            data={homeData} 
            onSave={saveContent}
            onPreview={(data) => {
              // 미리보기 기능 구현
              console.log('미리보기 데이터:', data);
            }}
          />
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
          <SubsidiaryTab 
            data={subsidiaryData} 
            onSave={saveContent}
            currentUser={currentUser}
          />
        )}
        
        {activeTab === 'clarus-files' && hasPermission('content') && (
          <ClarusFilesTab 
            files={clarusFiles}
            onUpload={handleClarusFileUpload}
            onDelete={handleClarusFileDelete}
          />
        )}
        
        {activeTab === 'feedback' && hasPermission('feedback') && (
          <FeedbackDashboard />
        )}

        {activeTab === 'approval' && hasPermission('content') && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">콘텐츠 승인 관리</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // 테스트용: 직접 데이터 수정
                    const testData = {
                      ...homeData,
                      hero: {
                        ...homeData.hero,
                        title: '정호그룹\n테스트 성공!\n변경된 타이틀입니다'
                      }
                    };
                    setHomeData(testData);
                    localStorage.setItem('homeData', JSON.stringify(testData));
                    
                    // 전역 상태로도 저장
                    window.globalHomeData = testData;
                    
                    // 전역 이벤트 발생 (홈페이지에 알림)
                    window.dispatchEvent(new Event('globalHomeDataChanged'));
                    
                    alert('테스트 데이터가 적용되었습니다! 홈페이지로 이동하여 변경사항을 확인하세요.');
                    
                    // 홈페이지로 이동하면서 테스트 데이터 전달
                    const testDataEncoded = encodeURIComponent(JSON.stringify(testData));
                    window.location.href = `/?test=${testDataEncoded}`;
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  테스트 데이터 적용
                </button>
                <button
                  onClick={() => {
                    // 전역 상태에서 데이터 새로고침
                    if (window.globalHomeData) {
                      setHomeData(window.globalHomeData);
                      alert('전역 상태에서 데이터가 새로고침되었습니다!');
                    } else {
                      // LocalStorage에서 데이터를 강제로 새로고침
                      const savedData = localStorage.getItem('homeData');
                      if (savedData) {
                        try {
                          const data = JSON.parse(savedData);
                          setHomeData(data);
                          // 전역 상태에도 저장
                          window.globalHomeData = data;
                          alert('LocalStorage에서 데이터가 새로고침되었습니다!');
                        } catch (error) {
                          console.error('데이터 새로고침 오류:', error);
                        }
                      } else {
                        alert('저장된 데이터가 없습니다.');
                      }
                    }
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  데이터 새로고침
                </button>
              </div>
            </div>
            <ContentApprovalSystem 
              currentUser={currentUser}
              pendingApprovals={contentApprovals.filter(a => a.status === 'pending')}
              onApprovalChange={(approvedContent) => {
                console.log('승인된 콘텐츠:', approvedContent);
                
                // 승인된 콘텐츠를 실제 데이터에 적용
                if (approvedContent && approvedContent.status === 'approved') {
                  console.log('콘텐츠 승인 처리 시작...');
                  
                  // 승인된 콘텐츠의 실제 데이터 추출
                  const contentData = approvedContent.content.data;
                  
                  if (approvedContent.type === 'content_update') {
                    console.log('홈페이지 전체 콘텐츠 업데이트:', contentData);
                    setHomeData(contentData);
                    localStorage.setItem('homeData', JSON.stringify(contentData));
                    
                    // 전역 상태로도 저장 (홈페이지와 공유)
                    window.globalHomeData = contentData;
                    
                    // 전역 이벤트 발생 (홈페이지에 알림)
                    window.dispatchEvent(new Event('globalHomeDataChanged'));
                    
                    console.log('홈페이지 콘텐츠 업데이트 완료');
                  }
                }
              }}
            />
          </div>
        )}

        {activeTab === 'ai-assistant' && hasPermission('content') && (
          <AIContentAssistant 
            currentUser={currentUser}
            onContentSuggestion={(suggestion) => {
              console.log('AI 제안 채택:', suggestion);
              
              // 제안된 콘텐츠를 해당 섹션에 적용
              if (suggestion.contentType === 'hero') {
                setHomeData(prev => {
                  const updated = {
                    ...prev,
                    hero: {
                      ...prev.hero,
                      [suggestion.targetSection]: suggestion.content
                    }
                  };
                  // LocalStorage에 즉시 저장
                  localStorage.setItem('homeData', JSON.stringify(updated));
                  return updated;
                });
              } else if (suggestion.contentType === 'group') {
                setHomeData(prev => {
                  const updated = {
                    ...prev,
                    group: {
                      ...prev.group,
                      [suggestion.targetSection]: suggestion.content
                    }
                  };
                  // LocalStorage에 즉시 저장
                  localStorage.setItem('homeData', JSON.stringify(updated));
                  return updated;
                });
              }
              
              alert('AI 제안 콘텐츠가 적용되었습니다! 웹사이트를 새로고침하면 변경사항을 확인할 수 있습니다.');
            }}
          />
        )}

        {activeTab === 'live-preview' && hasPermission('content') && (
          <LivePreview 
            content={homeData.hero}
            contentType="hero"
            targetSection="homepage"
            onSave={(updatedContent) => {
              console.log('콘텐츠 저장:', updatedContent);
              
              // 편집된 콘텐츠를 해당 섹션에 적용
              if (updatedContent.type === 'hero') {
                setHomeData(prev => {
                  const updated = {
                    ...prev,
                    hero: {
                      ...prev.hero,
                      ...updatedContent.data
                    }
                  };
                  // LocalStorage에 즉시 저장
                  localStorage.setItem('homeData', JSON.stringify(updated));
                  return updated;
                });
              } else if (updatedContent.type === 'group') {
                setHomeData(prev => {
                  const updated = {
                    ...prev,
                    group: {
                      ...prev.group,
                      ...updatedContent.data
                    }
                  };
                  // LocalStorage에 즉시 저장
                  localStorage.setItem('homeData', JSON.stringify(updated));
                  return updated;
                });
              }
              
              alert('콘텐츠가 성공적으로 저장되었습니다! 웹사이트를 새로고침하면 변경사항을 확인할 수 있습니다.');
            }}
          />
        )}

        {activeTab === 'image-management' && hasPermission('content') && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">이미지 관리 시스템</h2>
              <p className="text-gray-600 mb-6">
                웹사이트의 다양한 이미지를 관리하고 교체할 수 있습니다. 
                각 섹션별로 적절한 크기와 형식의 이미지를 업로드하세요.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hero 배경 이미지 관리 */}
                <ImageManager
                  section="hero"
                  currentImages={imageData.hero || {}}
                  onImageUpdate={handleImageUpdate}
                />
                
                {/* 로고 이미지 관리 */}
                <ImageManager
                  section="logo"
                  currentImages={imageData.logo || {}}
                  onImageUpdate={handleImageUpdate}
                />
                
                {/* 갤러리 이미지 관리 */}
                <ImageManager
                  section="gallery"
                  currentImages={imageData.gallery || {}}
                  onImageUpdate={handleImageUpdate}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && hasPermission('users') && (
          <UsersTab data={users} />
        )}
      </main>
    </div>
  );
};

export default AdminPage; 