import React, { createContext, useState, useEffect, useContext } from 'react';

// 역할별 권한 정의 (3단계: 최고관리자, 관리자, 편집자)
export const ROLES = {
  SUPER_ADMIN: 'super_admin',  // 모든 권한 (사용자 관리 포함)
  ADMIN: 'admin',              // 콘텐츠 및 설정 관리 (사용자 관리 제외)
  EDITOR: 'editor'             // 콘텐츠 편집만 가능 (뉴스, 프로젝트, 미디어)
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

// 간단한 해시 함수 (보안용이 아닌 난독화용)
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'h_' + Math.abs(hash).toString(16);
};

// 비밀번호 검증 (해시 비교 또는 평문 비교)
const verifyPassword = (inputPassword, storedHash) => {
  // 저장된 해시와 입력 비밀번호의 해시 비교
  if (storedHash.startsWith('h_')) {
    return simpleHash(inputPassword) === storedHash;
  }
  // 평문 비교 (레거시 지원)
  return inputPassword === storedHash;
};

// 기본 관리자 계정
const getDefaultUsers = () => [
  {
    id: 'user001',
    username: 'admin',
    passwordHash: simpleHash('jungho2025!admin'),
    name: '최고 관리자',
    email: 'admin@jungho.com',
    role: 'super_admin',
    createdAt: '2025-01-01',
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
        if (authVersion !== 'v2') {
          console.log('인증 시스템 업그레이드: 기존 데이터 초기화');
          localStorage.removeItem('admin_users');
          localStorage.setItem('auth_version', 'v2');
        }

        // localStorage에서 먼저 확인
        const savedUsers = localStorage.getItem('admin_users');
        if (savedUsers) {
          const parsedUsers = JSON.parse(savedUsers);
          // 새 해시 형식인지 확인 (h_로 시작)
          const isNewFormat = parsedUsers.every(u => u.passwordHash && u.passwordHash.startsWith('h_'));
          if (parsedUsers.length > 0 && isNewFormat) {
            setUsers(parsedUsers);
            setIsLoading(false);
            return;
          } else {
            // 이전 형식이면 초기화
            console.log('이전 해시 형식 감지, 기본 관리자로 초기화');
            localStorage.removeItem('admin_users');
          }
        }

        // localStorage에 없으면 JSON 파일에서 로드 시도
        try {
          const response = await fetch('/data/admin-users-2025-12-16.json');
          if (response.ok) {
            const data = await response.json();
            if (data.users && data.users.length > 0) {
              setUsers(data.users);
              localStorage.setItem('admin_users', JSON.stringify(data.users));
              setIsLoading(false);
              return;
            }
          }
        } catch (fetchError) {
          console.log('JSON 파일 로드 실패, 기본 관리자 사용');
        }

        // 기본 관리자 계정 사용
        const defaultUsers = getDefaultUsers();
        setUsers(defaultUsers);
        localStorage.setItem('admin_users', JSON.stringify(defaultUsers));
      } catch (error) {
        console.error('사용자 데이터 로드 실패:', error);
        const defaultUsers = getDefaultUsers();
        setUsers(defaultUsers);
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
    const foundUser = users.find(u => u.username === username);

    if (foundUser && verifyPassword(password, foundUser.passwordHash)) {
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

      return { success: true, user: updatedUser };
    }
    
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

    const passwordHash = simpleHash(newUserData.password);
    const newUser = {
      id: 'user' + Date.now(),
      username: newUserData.username,
      passwordHash,
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
        const updatedUser = { ...u, ...updatedFields };
        if (updatedFields.password) {
          updatedUser.passwordHash = simpleHash(updatedFields.password);
          delete updatedUser.password;
        }
        return updatedUser;
      }
      return u;
    }));

    if (user && user.id === userId) {
      const updatedSessionUser = { ...user, ...updatedFields };
      if (updatedFields.password) {
        updatedSessionUser.passwordHash = simpleHash(updatedFields.password);
        delete updatedSessionUser.password;
      }
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
