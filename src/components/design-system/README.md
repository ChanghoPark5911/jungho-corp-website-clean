# 정호그룹 디자인 시스템

40년 전통의 조명제어 전문기업 정호그룹을 위한 완전한 디자인 시스템입니다.

## 🎨 브랜드 컬러

### Primary Green (메인 브랜드 컬러)
- **Primary 500**: `#10B981` - 메인 브랜드 그린
- **Primary 600**: `#059669` - 강조용 그린
- **Primary 700**: `#047857` - 다크 그린

### Accent Red (액센트 컬러)
- **Accent 500**: `#EF4444` - 메인 액센트 레드
- **Accent 600**: `#DC2626` - 강조용 레드

### 계열사별 컬러
- **Clarus**: `#059669` - 조명제어 전문
- **TLC**: `#10B981` - 기술 지원
- **Illutech**: `#22C55E` - 조명 쇼핑몰
- **Texcom**: `#16A34A` - 통신 기술

## 📝 타이포그래피

### 폰트 패밀리
- **한글**: Noto Sans KR
- **영문**: Montserrat

### 헤딩 스케일
- **H1**: `clamp(2rem, 5vw, 3.5rem)` - 메인 타이틀
- **H2**: `clamp(1.75rem, 4vw, 2.5rem)` - 섹션 타이틀
- **H3**: `clamp(1.5rem, 3vw, 2rem)` - 서브 타이틀
- **H4**: `clamp(1.25rem, 2.5vw, 1.5rem)` - 카드 타이틀

### 본문 텍스트
- **Body Large**: `clamp(1rem, 1.5vw, 1.125rem)` - 중요한 설명
- **Body**: `clamp(0.875rem, 1.5vw, 1rem)` - 일반 본문
- **Small**: `clamp(0.75rem, 1.2vw, 0.875rem)` - 부가 정보

## 📏 간격 시스템

### 기본 간격 (8px 베이스)
- **xs**: 8px
- **sm**: 16px
- **md**: 24px
- **lg**: 32px
- **xl**: 48px
- **2xl**: 64px
- **3xl**: 80px
- **4xl**: 96px

### 반응형 섹션 패딩
- **모바일**: 48px
- **태블릿**: 64px
- **데스크톱**: 80px

## 🧩 컴포넌트 시스템

### Button
```jsx
<Button variant="primary" size="md">
  버튼 텍스트
</Button>
```

**Variants**: `primary`, `secondary`, `accent`, `outline`, `ghost`, `danger`
**Sizes**: `sm`, `md`, `lg`, `xl`

### Card
```jsx
<Card>
  <Card.Header>
    <Card.Title>카드 제목</Card.Title>
  </Card.Header>
  <Card.Body>
    <Card.Content>카드 내용</Card.Content>
  </Card.Body>
  <Card.Footer>
    <Card.Actions>
      <Button>액션</Button>
    </Card.Actions>
  </Card.Footer>
</Card>
```

### Badge
```jsx
<Badge variant="primary" size="md">
  배지 텍스트
</Badge>
```

### Input
```jsx
<Input 
  placeholder="입력하세요"
  error="에러 메시지"
  disabled={false}
/>
```

### Modal
```jsx
<Modal 
  isOpen={isOpen}
  onClose={handleClose}
  title="모달 제목"
>
  모달 내용
</Modal>
```

## ✨ 애니메이션

### 기본 애니메이션
- **fade-in**: 페이드 인 효과
- **slide-up**: 슬라이드 업 효과
- **scale-in**: 스케일 인 효과
- **shimmer**: 시머 효과

### 호버 효과
- **hover-lift**: 호버 시 위로 이동
- **hover-glow**: 호버 시 글로우 효과

### 트랜지션 속도
- **fast**: 150ms
- **normal**: 300ms
- **slow**: 500ms

## 📱 반응형 브레이크포인트

- **xs**: 320px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px
- **3xl**: 1920px
- **4xl**: 2560px

## 🎯 사용 가이드

### 1. 컬러 사용
```css
/* CSS 변수 사용 */
color: var(--primary-500);
background-color: var(--primary-100);
```

### 2. 타이포그래피 사용
```jsx
<h1 className="text-h1 text-primary-600">메인 타이틀</h1>
<p className="text-body text-neutral-700">본문 텍스트</p>
```

### 3. 간격 사용
```jsx
<div className="p-4 md:p-6 lg:p-8">반응형 패딩</div>
<div className="space-y-4 md:space-y-6">반응형 간격</div>
```

### 4. 컴포넌트 사용
```jsx
import { Button, Card, Badge } from './components/design-system/components';

<Card className="hover-lift">
  <Card.Body>
    <Badge variant="primary">New</Badge>
    <Card.Title>카드 제목</Card.Title>
    <Button variant="primary">자세히 보기</Button>
  </Card.Body>
</Card>
```

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
1. `src/components/design-system/components/` 폴더에 컴포넌트 생성
2. `src/components/design-system/components/index.js`에 export 추가
3. 디자인 시스템 페이지에 예제 추가

### 스타일 수정
1. `src/index.css`에서 CSS 변수 수정
2. `tailwind.config.js`에서 Tailwind 설정 수정
3. 컴포넌트에서 클래스명 수정

## 📚 추가 리소스

- **Figma 디자인 파일**: [링크]
- **아이콘 라이브러리**: Heroicons, Lucide
- **폰트**: Google Fonts (Noto Sans KR, Montserrat)

## 🤝 기여 가이드

1. 브랜드 가이드라인 준수
2. 접근성 고려
3. 성능 최적화
4. 문서화 필수

---

**정호그룹 디자인 시스템 v1.0.0**
*40년 전통의 조명제어 전문기업* 