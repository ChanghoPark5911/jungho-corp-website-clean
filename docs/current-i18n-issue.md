# 현재 i18n 문제 상황 정리 (2025-10-14)

## 📋 문제 요약

**핵심 문제**: 관리자 페이지의 다국어 관리에서 계열사 섹션 제목을 수정해도 홈페이지에 반영되지 않음

**구체적 증상**:
- 관리자 페이지 `/admin` → 다국어 관리 → English → "계열사 섹션 제목" 수정
- "모든 번역 저장" 클릭
- 홈페이지 `/`에서 언어를 English로 변경
- ❌ 계열사 섹션 제목이 수정한 내용으로 바뀌지 않음

---

## 🔍 근본 원인

### 데이터 구조 불일치

1. **i18nAdvanced.js** (홈페이지에서 사용)
   - **nested 구조** 기대: `{ en: { home: { subsidiaries: { title: '...' } } } }`
   - `localStorage.i18nTranslations` 에서 로드

2. **UnifiedAdminPage.jsx** (관리자 페이지)
   - **flat key 구조** 사용: `{ en: { 'home.subsidiaries.title': '...' } }`
   - `localStorage.i18n_data` 에서 로드/저장

3. **저장 시 변환 로직**
   - flat → nested 변환 함수 존재 (`convertFlatToNested`)
   - nested → flat 변환 함수 존재 (`convertNestedToFlat`)
   - **그러나 제대로 작동하지 않음**

---

## 📁 관련 파일

### 핵심 파일
1. `src/utils/i18nAdvanced.js` - 다국어 엔진 (nested 구조)
2. `src/pages/UnifiedAdminPage.jsx` - 관리자 페이지 (flat 구조)
3. `src/components/ui/SubsidiariesIntro.js` - 계열사 섹션 컴포넌트

### localStorage 키
- `i18nTranslations` - 홈페이지에서 사용 (nested)
- `i18n_data` - 관리자 페이지에서 사용 (flat)
- `homepage_content_ko` - 한국어 원본 데이터 (Single Source of Truth)

---

## 🎯 해결해야 할 것

### 목표
관리자 페이지에서 수정한 번역이 즉시 홈페이지에 반영되어야 함

### 요구사항
1. **정상적인 방법**으로 구현 (임시방편 NO)
2. **단순하고 명확한** 데이터 흐름
3. **유지보수 가능한** 코드

---

## 💡 제안하는 접근 방법

### Option 1: 단일 구조 통일
- flat 또는 nested 중 **하나로만** 통일
- 모든 파일이 같은 구조 사용
- 변환 로직 제거

### Option 2: 명확한 책임 분리
- `i18nAdvanced.js`: nested 구조 유지 (변경 X)
- `UnifiedAdminPage.jsx`: 저장 시 확실한 변환
- **변환이 정확히 작동하는지 테스트**

### Option 3: 리팩토링
- 다국어 시스템 전체 재설계
- 시간이 더 걸리지만 장기적으로 안정적

---

## 🔧 현재 코드 상태

### 마지막 커밋
```
commit 75d0b3c
fix(i18n): Add bidirectional conversion between flat and nested data structures
```

### 변환 로직 위치
- **flat → nested**: `src/pages/UnifiedAdminPage.jsx` 라인 ~330
- **nested → flat**: `src/pages/UnifiedAdminPage.jsx` 라인 ~80

---

## ✅ 내일 할 일

### 1단계: 현재 상태 분석
- [ ] `i18nAdvanced.js`의 `t()` 함수가 어떻게 작동하는지 정확히 파악
- [ ] `UnifiedAdminPage.jsx`의 저장 로직 단계별 확인
- [ ] `SubsidiariesIntro.js`가 어떤 키로 번역을 요청하는지 확인

### 2단계: 간단한 테스트
- [ ] Console에서 수동으로 데이터 변환 테스트
- [ ] 변환된 데이터가 올바른 구조인지 확인

### 3단계: 수정
- [ ] 변환 로직 수정 또는
- [ ] 구조 통일 결정

### 4단계: 검증
- [ ] 관리자 페이지에서 수정
- [ ] 홈페이지에서 확인
- [ ] 여러 언어로 테스트

---

## 📝 내일 첫 메시지 예시

```
안녕하세요. 어제 i18n 문제를 해결하다가 멈췄습니다.
docs/current-i18n-issue.md 파일을 읽어주세요.

문제: 관리자 페이지에서 계열사 섹션 제목을 수정해도 홈페이지에 반영이 안됩니다.

다음을 확인해주세요:
1. i18nAdvanced.js의 t() 함수가 'home.subsidiaries.title' 키를 어떻게 처리하는지
2. UnifiedAdminPage.jsx의 변환 로직이 제대로 작동하는지
3. 가장 단순하고 정상적인 해결 방법은 무엇인지

차근차근 접근해주세요.
```

---

## 🚫 피해야 할 것

- ❌ 임시방편 (workaround)
- ❌ 복잡한 변환 로직 추가
- ❌ 여러 군데 수정 (한 곳만 명확하게)
- ❌ 테스트 없이 커밋

---

## ✅ 작동하는 것

- ✅ 기본 다국어 기능 (한국어, English, 中文, 日本語)
- ✅ 언어 전환
- ✅ 대부분의 섹션 번역 표시
- ✅ 관리자 페이지 UI
- ✅ 한국어 콘텐츠 관리 (홈페이지 관리 탭)

---

## 📞 연락 필요 시

이 문서를 Cursor AI에게 보여주고:
"이 문서를 읽고 현재 상황을 파악한 다음, 가장 정상적이고 단순한 해결 방법을 제안해주세요."

라고 요청하시면 됩니다.

---

**작성일**: 2025-10-14  
**상태**: 미해결  
**우선순위**: 높음

