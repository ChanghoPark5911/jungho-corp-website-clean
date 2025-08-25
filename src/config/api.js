// API 설정
export const API_CONFIG = {
  // 기본 API URL
  BASE_URL: 'https://jungho-corp-website-vercel.app',
  
  // OpenAI API 엔드포인트
  OPENAI_API: 'https://jungho-corp-website-vercel.app/api/openai-api.php',
  
  // 콘텐츠 관리 API
  CONTENT_API: 'https://jungho-corp-website-vercel.app/api/content',
  
  // 사용자 관리 API
  USER_API: 'https://jungho-corp-website-vercel.app/api/user',
  
  // 환경 설정
  ENVIRONMENT: 'production'
};

// API 헬퍼 함수
export const apiCall = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};



