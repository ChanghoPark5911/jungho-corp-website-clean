// 다국어 지원을 위한 i18n 유틸리티

// 언어별 텍스트 데이터
export const translations = {
  ko: {
    // 헤더
    header: {
      home: '홈',
      business: '사업영역',
      projects: '프로젝트',
      support: '고객지원',
      news: '뉴스',
      group: '그룹',
      admin: '관리자',
      language: '언어 선택'
    },
    // 계열사
    subsidiaries: {
      clarus: '클라루스',
      tlc: '정호티엘씨',
      illutech: '일루텍',
      texcom: '정호텍스컴'
    },
    // 공통
    common: {
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      notFound: '페이지를 찾을 수 없습니다',
      backToHome: '홈으로 돌아가기'
    }
  },
  en: {
    // Header
    header: {
      home: 'Home',
      business: 'Business',
      projects: 'Projects',
      support: 'Support',
      news: 'News',
      group: 'Group',
      admin: 'Admin',
      language: 'Language'
    },
    // Subsidiaries
    subsidiaries: {
      clarus: 'Clarus',
      tlc: 'TLC',
      illutech: 'Illutech',
      texcom: 'Texcom'
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      notFound: 'Page not found',
      backToHome: 'Back to Home'
    }
  },
  zh: {
    // 头部
    header: {
      home: '首页',
      business: '业务领域',
      projects: '项目',
      support: '客户支持',
      news: '新闻',
      group: '集团',
      admin: '管理',
      language: '语言选择'
    },
    // 子公司
    subsidiaries: {
      clarus: '克拉鲁斯',
      tlc: '正浩TLC',
      illutech: '伊利泰克',
      texcom: '正浩泰克斯康'
    },
    // 通用
    common: {
      loading: '加载中...',
      error: '发生错误',
      notFound: '页面未找到',
      backToHome: '返回首页'
    }
  }
};

// 현재 언어 상태 관리
let currentLanguage = 'ko';

// 언어 설정 함수
export const setLanguage = (language) => {
  currentLanguage = language;
  // 로컬 스토리지에 저장
  localStorage.setItem('language', language);
  // 페이지 새로고침 (실제 구현에서는 더 세밀한 처리가 필요)
  // window.location.reload();
};

// 언어 가져오기 함수
export const getLanguage = () => {
  // 로컬 스토리지에서 언어 설정 확인
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
  }
  return currentLanguage;
};

// 텍스트 번역 함수
export const t = (key) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      // 번역이 없으면 한국어로 폴백
      value = translations.ko;
      for (const fallbackKey of keys) {
        if (value && value[fallbackKey]) {
          value = value[fallbackKey];
        } else {
          return key; // 번역 키 자체를 반환
        }
      }
    }
  }
  
  return value || key;
};

// 언어 옵션
export const languageOptions = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

// 초기화
export const initI18n = () => {
  getLanguage(); // 저장된 언어 설정 로드
}; 