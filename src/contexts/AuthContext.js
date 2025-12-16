import React, { createContext, useState, useEffect, useContext } from 'react';

// 역할별 권한 정의 (3단계: 최고관리자, 관리자, 편집자)
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor'
};

// 역할별 접근 가능 메뉴 정의
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['dashboard', 'media', 'support', 'homepage', 'news', 'projects', 'i18n', 'users'],
  [ROLES.ADMIN]: ['dashboard', 'media', 'support', 'homepage', 'news', 'projects', 'i18n'],
  [ROLES.EDITOR]: ['dashboard', 'media', 'news', 'projects']
};

// 역할 정보
export const ROLE_INFO = {
  [ROLES.SUPER_ADMIN]: { label: '최고 관리자', color: 'bg-red-100 text-red-800', icon: '👑' },
  [ROLES.ADMIN]: { label: '관리자', color: 'bg-blue-100 text-blue-800', icon: '⭐' },
  [ROLES.EDITOR]: { label: '편집자', color: 'bg-green-100 text-green-800', icon: '✏️' }
};

const AuthContext = createContext(null);
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30분
const AUTH_VERSION = 'v3'; // 버전 업데이트

// 기본 관리자 계정 (평문 비밀번호 - 프론트엔드 전용)
const DEFAULT_USERS = [
  {
    id: 'user001',
    username: 'admin',
    password: 'jungho2025!admin',
    name: '최고 관리자',
    email: 'admin@jungho.com',
    role: 'super_admin',
    createdAt: '2025-01-01',
    lastLogin: '-'
  },
  {
    id: 'user002',
    username: 'admin01',
    password: 'admin01!',
    name: '박창호',
    email: 'chpark00@junghocorp.com',
    role: 'admin',
    createdAt: '2025-12-16',
    lastLogin: '-'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // 사용자 데이터 로드
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // 버전 체크 - 이전 버전 데이터 초기화
        const authVersion = localStorage.getItem('auth_version');
        if (authVersion !== AUTH_VERSION) {
          console.log('인증 시스템 업그레이드: 기존 데이터 초기화');
          localStorage.removeItem('admin_users');
          localStorage.setItem('auth_version', AUTH_VERSION);
        }

        // localStorage에서 확인
        const savedUsers = localStorage.getItem('admin_users');
        if (savedUsers) {
          const parsedUsers = JSON.parse(savedUsers);
          if (parsedUsers.length > 0 && parsedUsers[0].password) {
            console.log('localStorage에서 사용자 로드:', parsedUsers.length, '명');
            setUsers(parsedUsers);
            setIsLoading(false);
            return;
          }
        }

        // JSON 파일에서 로드 시도
        try {
          console.log('JSON 파일에서 사용자 데이터 로드 시도...');
          const response = await fetch('/data/admin-users-2025-12-16.json');
          if (response.ok) {
            const data = await response.json();
            if (data.users && data.users.length > 0 && data.users[0].password) {
              console.log('JSON 파일에서 사용자 로드:', data.users.length, '명');
              setUsers(data.users);
              localStorage.setItem('admin_users', JSON.stringify(data.users));
              setIsLoading(false);
              return;
            }
          }
        } catch (fetchError) {
          console.log('JSON 파일 로드 실패:', fetchError);
        }

        // 기본 관리자 계정 사용
        console.log('기본 관리자 계정 생성');
        setUsers(DEFAULT_USERS);
        localStorage.setItem('admin_users', JSON.stringify(DEFAULT_USERS));
      } catch (error) {
        console.error('사용자 데이터 로드 실패:', error);
        setUsers(DEFAULT_USERS);
        localStorage.setItem('admin_users', JSON.stringify(DEFAULT_USERS));
      }
      setIsLoading(false);
    };

    loadUsers();
  }, []);

  // 사용자 데이터 변경 시 localStorage에 저장
  useEffect(() => {
    if (users.length > 0 && !isLoading) {
      localStorage.setItem('admin_users', JSON.stringify(users));
    }
  }, [users, isLoading]);

  // 세션 복원
  useEffect(() => {
    if (isLoading) return;

    const storedUser = sessionStorage.getItem('authenticated_user');
    const loginTime = sessionStorage.getItem('login_time');

    if (storedUser && loginTime) {
      const currentTime = new Date().getTime();
      const lastLoginTime = new Date(loginTime).getTime();

      if (currentTime - lastLoginTime < SESSION_TIMEOUT_MS) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        sessionStorage.setItem('login_time', new Date().toISOString());
      } else {
        handleLogout();
      }
    }
  }, [isLoading]);

  // 로그인 처리
  const handleLogin = async (username, password) => {
    console.log('로그인 시도:', username);
    console.log('등록된 사용자:', users.map(u => u.username));
    
    const foundUser = users.find(u => u.username === username);
    console.log('찾은 사용자:', foundUser ? foundUser.username : '없음');

    if (foundUser) {
      console.log('비밀번호 비교:', password === foundUser.password);
      
      if (password === foundUser.password) {
        const updatedUser = { 
          ...foundUser, 
          lastLogin: new Date().toISOString().split('T')[0] 
        };
        
        setUser(updatedUser);
        setIsAuthenticated(true);
        sessionStorage.setItem('authenticated_user', JSON.stringify(updatedUser));
        sessionStorage.setItem('login_time', new Date().toISOString());

        setUsers(prevUsers => prevUsers.map(u => 
          u.id === updatedUser.id ? updatedUser : u
        ));

        console.log('로그인 성공!');
        return { success: true, user: updatedUser };
      }
    }
    
    console.log('로그인 실패');
    return { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' };
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('authenticated_user');
    sessionStorage.removeItem('login_time');
  };

  // 사용자 등록
  const registerUser = (newUserData) => {
    const isUsernameTaken = users.some(u => u.username === newUserData.username);
    if (isUsernameTaken) {
      return { success: false, message: '이미 사용 중인 아이디입니다.' };
    }
    if (newUserData.password.length < 6) {
      return { success: false, message: '비밀번호는 6자 이상이어야 합니다.' };
    }

    const newUser = {
      id: 'user' + Date.now(),
      username: newUserData.username,
      password: newUserData.password, // 평문 저장
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '-'
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    return { success: true, user: newUser };
  };

  // 사용자 수정
  const updateUser = (userId, updatedFields) => {
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === userId) {
        return { ...u, ...updatedFields };
      }
      return u;
    }));

    if (user && user.id === userId) {
      const updatedSessionUser = { ...user, ...updatedFields };
      setUser(updatedSessionUser);
      sessionStorage.setItem('authenticated_user', JSON.stringify(updatedSessionUser));
    }
  };

  // 사용자 삭제
  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
  };

  // 권한 확인
  const checkPermission = (requiredRole) => {
    if (!user) return false;
    const roleHierarchy = {
      'editor': 1,
      'admin': 2,
      'super_admin': 3
    };
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  // 메뉴 접근 권한 확인
  const canAccessMenu = (menuName) => {
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.includes(menuName);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      users,
      login: handleLogin,
      logout: handleLogout,
      registerUser,
      updateUser,
      deleteUser,
      checkPermission,
      canAccessMenu
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
