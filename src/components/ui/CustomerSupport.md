# CustomerSupport 컴포넌트

고객 지원 섹션을 표시하는 재사용 가능한 React 컴포넌트입니다. 다양한 지원 채널과 특징을 표시하며, 스크롤 애니메이션과 반응형 디자인을 지원합니다.

## 기능

- 🎨 **반응형 디자인**: 모바일, 태블릿, 데스크톱에 최적화
- ✨ **스크롤 애니메이션**: Intersection Observer를 활용한 부드러운 애니메이션
- 🔧 **완전 커스터마이징**: props를 통한 모든 데이터 커스터마이징
- ♿ **접근성**: WCAG 가이드라인 준수
- 📱 **모바일 친화적**: 터치 인터페이스 최적화

## 설치

```bash
npm install
```

## 기본 사용법

```tsx
import CustomerSupport from './components/ui/CustomerSupport';

function App() {
  return (
    <div>
      <CustomerSupport />
    </div>
  );
}
```

## Props

### CustomerSupportProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | `"언제나 함께하는 든든한 파트너"` | 섹션 제목 |
| `channels` | `Channel[]` | `[]` | 지원 채널 목록 |
| `features` | `Feature[]` | `[]` | 주요 특징 목록 |
| `ctaButton` | `CtaButton` | `{}` | CTA 버튼 설정 |
| `className` | `string` | `''` | 추가 CSS 클래스 |

### Channel

```tsx
interface Channel {
  title: string;           // 채널 제목
  description: string;     // 채널 설명
  contact?: string;        // 연락처 정보
  hours?: string;          // 운영 시간
  action?: {              // 액션 버튼
    label: string;
    onClick?: () => void;
    path?: string;
  };
  icon: ReactNode;        // 채널 아이콘
}
```

### Feature

```tsx
interface Feature {
  title: string;          // 특징 제목
  description: string;    // 특징 설명
  icon: ReactNode;       // 특징 아이콘
}
```

### CtaButton

```tsx
interface CtaButton {
  label?: string;         // 버튼 텍스트
  onClick?: () => void;   // 클릭 핸들러
  path?: string;          // 외부 링크
}
```

## 사용 예제

### 기본 사용법

```tsx
import CustomerSupport from './components/ui/CustomerSupport';

function HomePage() {
  return (
    <div>
      <h1>정호그룹</h1>
      <CustomerSupport />
    </div>
  );
}
```

### 커스텀 데이터 사용

```tsx
import CustomerSupport from './components/ui/CustomerSupport';

function CustomSupportPage() {
  const customChannels = [
    {
      title: "전화 상담",
      description: "전문가가 직접 답변드립니다",
      contact: "1588-0000",
      hours: "평일 09:00-18:00",
      action: {
        label: "전화하기",
        onClick: () => window.location.href = "tel:1588-0000"
      },
      icon: <PhoneIcon />
    },
    {
      title: "온라인 채팅",
      description: "실시간 채팅으로 빠른 답변",
      contact: "채팅 시작",
      hours: "24시간 이용 가능",
      action: {
        label: "채팅 시작",
        path: "https://chat.example.com"
      },
      icon: <ChatIcon />
    }
  ];

  const customFeatures = [
    {
      title: "24/7 지원",
      description: "언제든지 전문가의 도움을 받으실 수 있습니다",
      icon: <ClockIcon />
    },
    {
      title: "전국 네트워크",
      description: "전국 100개 지점에서 현장 지원",
      icon: <MapIcon />
    }
  ];

  const customCtaButton = {
    label: "지금 문의하기",
    onClick: () => {
      // 커스텀 로직
      console.log("문의하기 클릭");
    }
  };

  return (
    <CustomerSupport
      title="고객 지원 센터"
      channels={customChannels}
      features={customFeatures}
      ctaButton={customCtaButton}
      className="custom-support-section"
    />
  );
}
```

### 이벤트 핸들링

```tsx
import CustomerSupport from './components/ui/CustomerSupport';

function SupportPage() {
  const handleCtaClick = () => {
    // 분석 이벤트 전송
    analytics.track('support_cta_clicked');
    
    // 문의 폼으로 이동
    navigate('/contact');
  };

  const handleChannelClick = (channelType: string) => {
    // 채널별 분석 이벤트
    analytics.track('support_channel_clicked', { channel: channelType });
  };

  const customChannels = [
    {
      title: "전화 상담",
      description: "전문가가 직접 답변드립니다",
      contact: "1588-0000",
      action: {
        label: "전화하기",
        onClick: () => handleChannelClick('phone')
      },
      icon: <PhoneIcon />
    }
  ];

  return (
    <CustomerSupport
      channels={customChannels}
      ctaButton={{
        label: "문의하기",
        onClick: handleCtaClick
      }}
    />
  );
}
```

## 스타일링

### 기본 스타일

컴포넌트는 TailwindCSS를 사용하여 스타일링되어 있습니다. 주요 클래스:

- `bg-gradient-to-br from-primary to-primary-dark`: 그라데이션 배경
- `backdrop-blur-sm`: 블러 효과
- `transition-all duration-1000`: 애니메이션 효과

### 커스텀 스타일링

```tsx
// className을 통한 커스텀 스타일링
<CustomerSupport className="my-custom-support-section" />

// CSS 모듈 사용
import styles from './CustomerSupport.module.css';
<CustomerSupport className={styles.customSupport} />
```

### 테마 커스터마이징

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1f2937',
          dark: '#111827',
        },
        secondary: '#f59e0b',
      }
    }
  }
}
```

## 접근성

컴포넌트는 WCAG 2.1 AA 가이드라인을 준수합니다:

- ✅ 시맨틱 HTML 구조
- ✅ 적절한 ARIA 속성
- ✅ 키보드 네비게이션 지원
- ✅ 스크린 리더 호환성
- ✅ 색상 대비 준수

## 성능 최적화

- **Lazy Loading**: Intersection Observer를 통한 지연 로딩
- **메모이제이션**: React.memo를 통한 불필요한 리렌더링 방지
- **이벤트 위임**: 효율적인 이벤트 처리
- **CSS 최적화**: GPU 가속 애니메이션

## 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 테스트

```bash
# 테스트 실행
npm test

# 특정 컴포넌트 테스트
npm test CustomerSupport

# 커버리지 리포트
npm test -- --coverage
```

## 문제 해결

### 일반적인 문제

1. **애니메이션이 작동하지 않음**
   - Intersection Observer 지원 확인
   - CSS 트랜지션 속성 확인

2. **버튼 클릭이 작동하지 않음**
   - onClick 핸들러 확인
   - 이벤트 버블링 확인

3. **스타일이 적용되지 않음**
   - TailwindCSS 설정 확인
   - CSS 우선순위 확인

### 디버깅

```tsx
// 개발 모드에서 디버깅 정보 출력
<CustomerSupport
  debug={true}
  onRender={(props) => console.log('CustomerSupport rendered:', props)}
/>
```

## 라이센스

MIT License

## 기여

버그 리포트나 기능 제안은 이슈를 통해 제출해 주세요.

## 변경 로그

### v1.0.0
- 초기 릴리즈
- 기본 고객 지원 섹션 구현
- 반응형 디자인 지원
- 스크롤 애니메이션 추가 