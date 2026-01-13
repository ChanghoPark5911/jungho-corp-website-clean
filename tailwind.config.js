/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // 다크모드 활성화
  // 성능 최적화를 위한 설정
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    screens: {
      // 요구사항에 맞는 커스텀 브레이크포인트
      'xs': '320px',
      'sm': '640px',
      'md': '768px',    // Mobile 끝점
      'lg': '1024px',   // Tablet 끝점
      'xl': '1280px',   // Desktop 시작점
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      colors: {
        primary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',  // Accent Green
          600: '#2E7D32',  // Primary Green (정호그룹 메인)
          700: '#1B5E20',  // Dark Green
          800: '#145A1C',
          900: '#0D3F12',
        },
        accent: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        'dark-green': {
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        'dark-blue': {
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // 계열사별 브랜드 컬러
        clarus: { 500: '#00897B' },      // 청록 그린
        tlc: { 500: '#2E7D32' },         // 메인 그린
        illutech: { 500: '#FFA726' },    // 오렌지 (LED 이미지)
        texcom: { 500: '#7E57C2' },      // 퍼플 (패션 이미지)
        rss: { 500: '#66BB6A' },         // 밝은 그린
        'bright-green': '#6EE7B7',
        // 다크모드 색상 추가
        dark: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        'korean': ['Pretendard Variable', 'Pretendard', 'Noto Sans KR', 'sans-serif'],
        'english': ['Pretendard Variable', 'Pretendard', 'Montserrat', 'Noto Sans KR', 'sans-serif'],
        'pretendard': ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        // 반응형 간격 추가
        'section-mobile': '2.5rem',    // 40px
        'section-tablet': '3.75rem',   // 60px
        'section-desktop': '5rem',     // 80px
        'container-mobile': '1.25rem', // 20px
        'container-tablet': '2.5rem',  // 40px
        'container-desktop': '1.25rem', // 20px
      },
      fontSize: {
        // 반응형 텍스트 크기
        'hero-mobile': '1.5rem',      // 24px
        'hero-tablet': '2rem',        // 32px
        'hero-desktop': '2.5rem',     // 40px
        'h1-mobile': '1.5rem',        // 24px
        'h1-tablet': '2rem',          // 32px
        'h1-desktop': '2.5rem',       // 40px
        'h2-mobile': '1.25rem',       // 20px
        'h2-tablet': '1.5rem',        // 24px
        'h2-desktop': '2rem',         // 32px
        'body-mobile': '0.875rem',    // 14px
        'body-tablet': '1rem',        // 16px
        'body-desktop': '1rem',       // 16px
      },
      boxShadow: {
        'brand-green': '0 10px 25px -5px rgba(16, 185, 129, 0.25)',
        'accent-red': '0 10px 25px -5px rgba(239, 68, 68, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce-slow 2s infinite',
        'pulse-slow': 'pulse-slow 3s infinite',
        'spin-slow': 'spin-slow 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      height: {
        // 반응형 헤더 높이
        'header-mobile': '3.75rem',   // 60px
        'header-tablet': '4.375rem',  // 70px
        'header-desktop': '5rem',     // 80px
      },
      maxWidth: {
        // 반응형 컨테이너 최대 너비
        'container-mobile': '100%',
        'container-tablet': '768px',
        'container-desktop': '1200px',
      },
    },
  },
  plugins: [],
}; 