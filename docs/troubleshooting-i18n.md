# 다국어(i18n) 문제 해결 가이드

## 🐛 주요 해결 사례

### 문제: Hero 섹션 번역이 적용되지 않음

**증상:**
- Console에 "✅ 영어 Hero 데이터 강제 설정 완료" 로그가 나타남
- localStorage에 영어 번역 데이터가 저장되어 있음
- 하지만 화면에는 여전히 한국어가 표시됨

**원인:**
`src/components/ui/Hero.js` 컴포넌트의 렌더링 부분에서 `heroData` state를 사용하지 않고 props를 우선 사용하고 있었음

**해결:**
```javascript
// ❌ 이전 (문제)
const title = mainCopy || t('home.hero.title')

// ✅ 수정 (해결)
const title = heroData.mainTitle || mainCopy || t('home.hero.title')
```

**핵심 교훈:**
React에서 state를 업데이트하는 것만으로는 부족합니다. 
**반드시 렌더링 부분(return/JSX)에서 해당 state를 실제로 사용하는지 확인해야 합니다!**

---

## 🔍 디버깅 체크리스트

다국어 번역이 적용되지 않을 때:

1. **localStorage 확인**
   - `localStorage.getItem('preferredLanguage')` → 언어 설정
   - `localStorage.getItem('i18nTranslations')` → 번역 데이터

2. **Console 로그 확인**
   - 데이터 로딩: "✅ 번역 데이터 로드 완료"
   - 데이터 설정: "✅ Hero 데이터 설정 완료"
   - 렌더링: "🎨 렌더링 Title: ..."

3. **렌더링 코드 확인**
   - state를 실제로 사용하는가?
   - props가 state보다 우선되는가?
   - 조건문 순서가 올바른가?

---

## 📂 주요 파일 구조

### i18n 시스템 구성:

```
src/
├── utils/i18nAdvanced.js          # 핵심 i18n 엔진
├── hooks/useI18n.js                # React 훅
├── components/LanguageSelector.js  # 언어 선택기
└── components/ui/Hero.js           # Hero 컴포넌트 (번역 사용)
```

### 데이터 흐름:

```
1. LanguageSelector → changeLanguage()
2. i18nAdvanced.setLanguage() → localStorage 저장
3. 페이지 리로드
4. i18nAdvanced 초기화 → localStorage에서 언어 로드
5. useI18n 훅 → t() 함수 제공
6. Hero 컴포넌트 → t() 사용 → 번역된 텍스트
7. JSX 렌더링 → heroData state 사용!
```

---

## ⚠️ 주의사항

### Props vs State 우선순위

컴포넌트에서 여러 데이터 소스가 있을 때:

```javascript
// 올바른 우선순위 설정
const title = 
  heroData.mainTitle ||        // 1순위: 동적 state (i18n)
  mainCopy ||                   // 2순위: props (관리자 입력)
  t('home.hero.title') ||       // 3순위: i18n 기본값
  "기본 텍스트"                  // 4순위: 하드코딩 폴백
```

### useEffect Dependency

언어가 변경될 때 재로딩되려면:

```javascript
useEffect(() => {
  loadContent();
}, [currentLanguage, t]);  // ✅ 언어 dependency 추가
```

---

## 🚀 빠른 테스트 방법

### 브라우저 Console에서:

```javascript
// 현재 언어 확인
localStorage.getItem('preferredLanguage')

// 번역 데이터 확인
JSON.parse(localStorage.getItem('i18nTranslations'))

// 언어 강제 변경 (테스트용)
localStorage.setItem('preferredLanguage', 'en')
window.location.reload()
```

---

## 📝 관련 문서

- [i18n 사용자 가이드](./i18n-user-guide.md)
- [관리자 페이지 가이드](./admin-guide.md)

---

**작성일:** 2025-10-13
**마지막 업데이트:** 2025-10-13

