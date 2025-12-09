// 정호그룹 회사 정보
export const COMPANY_INFO = {
  name: '정호그룹',
  englishName: 'JUNGHO GROUP',
  description: '혁신적인 기술로 더 나은 미래를 만드는 글로벌 기업',
  founded: '1995',
  ceo: '김정호',
  address: {
    main: '서울특별시 강남구 논현로 116길 17',
    branch: '부산광역시 해운대구 센텀중앙로 456 정호센텀타워'
  },
  contact: {
    phone: '02-553-3631',
    fax: '02-553-2526',
    email: 'info@jungho.com',
    website: 'www.junghocorp.com',
    kakaoTalk: '@정호그룹'
  },
  support: {
    phone: {
      number: '02-553-3631',
      hours: '평일 09:00 - 18:00'
    },
    email: {
      address: 'support@jungho.com',
      hours: '24시간 접수 가능'
    },
    kakaoTalk: {
      id: '@정호그룹',
      hours: '실시간 상담'
    }
  }
};

// 계열사 정보
export const SUBSIDIARIES = {
  clarus: {
    name: '클라루스',
    englishName: 'Clarus',
    description: '조명제어 기술의 혁신을 주도하는 글로벌 리더',
    color: '#0066CC',
    website: 'www.clarus.co.kr',
    phone: '02-1234-1000',
    email: 'info@clarus.co.kr',
    address: '서울특별시 강남구 논현로 116길 17 5층',
    pages: [
      { label: '회사소개', path: '/clarus/about' },
      { label: '핵심기술', path: '/clarus/technology' },
      { label: '제품라인업', path: '/clarus/products' },
      { label: '프로젝트실적', path: '/clarus/projects' },
      { label: '기술지원', path: '/clarus/support' }
    ]
  },
  tlc: {
    name: '정호티엘씨',
    englishName: 'JUNGHO TLC',
    description: '고객과 가장 가까운 곳에서, 완벽한 조명제어 솔루션을 실현',
    color: '#28A745',
    website: 'www.junghotlc.com',
    phone: '02-553-3631',
    email: 'service@junghotlc.com',
    address: '서울특별시 강남구 논현로 116길 17 6층',
    pages: [
      { label: '서비스 영역', path: '/tlc/services' },
      { label: '프로젝트 프로세스', path: '/tlc/process' },
      { label: '전국 네트워크', path: '/tlc/network' },
      { label: 'A/S 센터', path: '/tlc/as-center' },
      { label: '주요 고객사', path: '/tlc/customers' },
      { label: '고객 지원', path: '/tlc/support' }
    ]
  },
  illutech: {
    name: '일루텍',
    englishName: 'Illutech',
    description: '스마트 조명 및 IoT 기술 전문기업',
    color: '#FF8C00',
    website: 'www.illutech.com',
    phone: '02-1234-3000',
    email: 'info@illutech.com',
    address: '서울특별시 강남구 논현로 116길 17 7층',
    pages: [
      { label: '회사소개', path: '/illutech/about' },
      { label: '스마트조명', path: '/illutech/lighting' },
      { label: 'IoT 기술', path: '/illutech/iot' },
      { label: '제품카탈로그', path: '/illutech/catalog' }
    ]
  },
  texcom: {
    name: '정호텍스컴',
    englishName: 'JUNGHO TEXCOM',
    description: '40년 섬유기계 전문성과 트렌디한 패션의 만남',
    color: '#FF6B9D',
    website: 'www.junghotexcom.com',
    phone: '02-1234-4000',
    email: 'info@junghotexcom.com',
    address: '서울특별시 강남구 논현로 116길 17 8층',
    pages: [
      { label: '사업 영역', path: '/texcom/business' },
      { label: '핵심 경쟁력', path: '/texcom/strengths' },
      { label: '제품/서비스', path: '/texcom/products' },
      { label: '혁신 기술', path: '/texcom/technology' },
      { label: '주요 성과', path: '/texcom/achievements' },
      { label: '고객 지원', path: '/texcom/support' }
    ]
  }
};

// 메인 네비게이션 메뉴
export const NAVIGATION = {
  main: [
    { key: 'home', name: 'HOME', path: '/' },
    { key: 'group', name: 'GROUP', path: '/group', hasDropdown: true },
    { key: 'business', name: 'BUSINESS', path: '/business' },
    { key: 'projects', name: 'PROJECTS', path: '/projects' },
    { key: 'support', name: 'SUPPORT', path: '/support' },
    { key: 'news', name: 'NEWS', path: '/news' }
  ],
  group: [
    { key: 'clarus', name: '클라루스', path: '/clarus' },
    { key: 'tlc', name: '정호티엘씨', path: '/tlc' },
    { key: 'illutech', name: '일루텍', path: '/illutech' },
    { key: 'texcom', name: '정호텍스컴', path: '/texcom' }
  ]
};

// 소셜 미디어 링크
export const SOCIAL_LINKS = {
  youtube: 'https://youtube.com/@junghogroup',
  naverBlog: 'https://blog.naver.com/junghogroup',
  instagram: 'https://instagram.com/junghogroup',
  linkedin: 'https://linkedin.com/company/jungho-group',
  facebook: 'https://facebook.com/junghogroup',
  twitter: 'https://twitter.com/junghogroup'
};

// 반응형 브레이크포인트
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// 애니메이션 지속시간
export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms'
};

// 페이지 메타데이터
export const PAGE_META = {
  home: {
    title: '정호그룹 - 혁신적인 기술로 더 나은 미래를 만드는 글로벌 기업',
    description: '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.',
    keywords: '정호그룹, 클라루스, 정호티엘씨, 일루텍, 정호텍스컴, AI, IoT, 물류, 텍스타일'
  },
  group: {
    title: 'GROUP - 정호그룹 계열사 소개',
    description: '정호그룹의 계열사들을 소개합니다. 각 분야의 전문성을 바탕으로 혁신적인 솔루션을 제공합니다.',
    keywords: '정호그룹, 계열사, 클라루스, 정호티엘씨, 일루텍, 정호텍스컴'
  },
  business: {
    title: 'BUSINESS - 정호그룹 사업 영역',
    description: '정호그룹의 다양한 사업 영역과 솔루션을 소개합니다.',
    keywords: '정호그룹, 사업, 솔루션, 기술, 혁신'
  },
  projects: {
    title: 'PROJECTS - 정호그룹 프로젝트',
    description: '정호그룹이 진행한 주요 프로젝트들을 소개합니다.',
    keywords: '정호그룹, 프로젝트, 성과, 사례'
  },
  support: {
    title: 'SUPPORT - 정호그룹 고객 지원',
    description: '정호그룹의 고객 지원 서비스를 안내합니다.',
    keywords: '정호그룹, 고객지원, 문의, 서비스'
  },
  news: {
    title: 'NEWS - 정호그룹 뉴스',
    description: '정호그룹의 최신 뉴스와 소식을 확인하세요.',
    keywords: '정호그룹, 뉴스, 소식, 보도자료'
  },
  clarus: {
    title: '클라루스 - 조명제어 기술의 혁신을 주도하는 글로벌 리더',
    description: '클라루스는 E/F2-BUS 자체 개발 프로토콜로 조명제어의 새로운 표준을 제시합니다.',
    keywords: '클라루스, 조명제어, E/F2-BUS, 프로토콜, 스마트조명, IoT'
  },
  tlc: {
    title: '정호티엘씨 - 고객과 가장 가까운 곳에서, 완벽한 조명제어 솔루션을 실현',
    description: '정호티엘씨는 영업부터 A/S까지, 고객 성공을 위한 완벽한 파트너십을 제공합니다.',
    keywords: '정호티엘씨, 조명제어, A/S, 고객지원, 조명솔루션, 전국네트워크'
  },
  illutech: {
    title: '일루텍 - 스마트 조명 및 IoT 기술 전문기업',
    description: '일루텍은 스마트 조명과 IoT 기술로 더 나은 생활환경을 만들어갑니다.',
    keywords: '일루텍, 스마트 조명, IoT, LED, 조명 기술'
  },
  texcom: {
    title: '정호텍스컴 - 40년 섬유기계 전문성과 트렌디한 패션의 만남',
    description: '정호텍스컴은 40년간 축적된 섬유기계 전문성과 트렌드를 선도하는 패션 브랜드가 만나 새로운 가치를 창조합니다.',
    keywords: '정호텍스컴, 섬유기계, 패션브랜드, 방직기계, 염색설비, 패션, B2B, B2C'
  }
}; 