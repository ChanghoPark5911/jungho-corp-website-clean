# 정호그룹 웹사이트 네비게이션 경로 분석

## 🔍 현재 문제점 분석

### 문제 상황
사용자가 계열사 정보를 보기 위해 **불필요한 경로를 2번 거쳐야 함**

```
현재 경로:
1. 상단 메뉴 "계열사" 클릭
   ↓
2. 계열사 소개 페이지 (SubsidiariesList)
   - 4개 계열사 카드 목록 표시
   - 각 카드에 "상세보기" 버튼
   ↓
3. "상세보기" 버튼 클릭
   ↓
4. 계열사 상세 페이지 (예: ClarusDetail)
```

### 문제점
❌ **2단계 (계열사 소개 페이지)가 불필요**
- 이미 상단 메뉴 드롭다운에서 각 계열사를 선택할 수 있음
- 계열사 소개 페이지는 단순히 4개 카드를 보여주고 버튼만 있음
- 사용자 경험(UX) 저하

---

## ✅ 개선 방안

### 방안 1: 계열사 소개 페이지 제거 (권장)

```
개선 경로:
1. 상단 메뉴 "계열사" 드롭다운
   ├─ 클라루스 선택
   ├─ 정호티엘씨 선택
   ├─ 일루텍 선택
   └─ 정호텍스컴 선택
   ↓
2. 직접 계열사 상세 페이지로 이동
```

**장점:**
- ✅ 클릭 1번으로 원하는 정보 접근
- ✅ 명확한 네비게이션
- ✅ 불필요한 중간 페이지 제거

**단점:**
- ⚠️ 4개 계열사를 한눈에 비교하는 페이지가 없음

---

### 방안 2: 계열사 소개 페이지를 "오버뷰" 페이지로 전환

```
개선 경로:
1. 상단 메뉴 "계열사" 드롭다운
   ├─ 계열사 개요 (Overview) ← 선택 시 SubsidiariesList
   ├─ 클라루스 ← 직접 상세 페이지
   ├─ 정호티엘씨 ← 직접 상세 페이지
   ├─ 일루텍 ← 직접 상세 페이지
   └─ 정호텍스컴 ← 직접 상세 페이지
```

**장점:**
- ✅ 각 계열사 직접 접근 가능
- ✅ 전체 계열사 비교/개요 페이지도 유지
- ✅ 유연한 네비게이션

**현재 TraditionalNav 드롭다운:**
```javascript
{
  id: 'subsidiaries',
  dropdownItems: [
    { label: '계열사 소개', path: '/classic/subsidiaries' },  // ← 이것이 문제
    { label: '클라루스', path: '/classic/subsidiaries/clarus' },
    { label: '정호티엘씨', path: '/classic/subsidiaries/jungho-tlc' },
    { label: '일루텍', path: '/classic/subsidiaries/illutech' },
    { label: '정호텍스컴', path: '/classic/subsidiaries/jungho-texcom' }
  ]
}
```

---

## 🔍 다른 곳에서도 유사한 문제가 있는가?

### 검토 결과

#### ✅ 회사소개 (About)
```
상단 메뉴 "회사소개" 드롭다운
├─ 정호소개 → AboutIntro (상세 내용 포함) ✅
├─ 비전/미션 → Vision (상세 내용 포함) ✅
├─ 경영방침 → Management (상세 내용 포함) ✅
└─ 연혁 → History (상세 내용 포함) ✅
```
**문제 없음**: 각 메뉴 항목이 직접 상세 페이지로 연결

#### ✅ 미디어/PR
```
상단 메뉴 "미디어/PR" 드롭다운
├─ 홍보영상 → Promotion Videos (상세 내용) ✅
├─ 기술자료실 → Technical Docs (상세 내용) ✅
└─ SNS → SNS Links (상세 내용) ✅
```
**문제 없음**: 각 메뉴 항목이 직접 상세 페이지로 연결

#### ✅ 고객지원
```
상단 메뉴 "고객지원"
└─ 고객지원 → Support Page (상세 내용) ✅
```
**문제 없음**: 직접 상세 페이지로 연결

#### ❌ 계열사 (Subsidiaries) - 문제 발견!
```
상단 메뉴 "계열사" 드롭다운
├─ 계열사 소개 → SubsidiariesList ❌ (중간 페이지)
│   └─ "상세보기" 버튼 클릭 → 각 계열사 상세
├─ 클라루스 → ClarusDetail ✅
├─ 정호티엘씨 → TLCDetail ✅
├─ 일루텍 → IllutechDetail ✅
└─ 정호텍스컴 → TexcomDetail ✅
```

**문제:**
- "계열사 소개" 메뉴 항목만 중간 페이지로 이동
- 나머지 계열사 메뉴는 직접 상세 페이지로 이동
- **일관성 부족 + 불필요한 클릭**

---

## 📋 권장 개선 방안

### Option A: 계열사 소개 메뉴 제거 (가장 간단)

```javascript
// TraditionalNav.js - 개선안
{
  id: 'subsidiaries',
  dropdownItems: [
    // { label: '계열사 소개', path: '/classic/subsidiaries' },  // ← 제거
    { label: '클라루스', path: '/classic/subsidiaries/clarus' },
    { label: '정호티엘씨', path: '/classic/subsidiaries/jungho-tlc' },
    { label: '일루텍', path: '/classic/subsidiaries/illutech' },
    { label: '정호텍스컴', path: '/classic/subsidiaries/jungho-texcom' }
  ]
}
```

**장점:**
- ✅ 가장 간단한 해결책
- ✅ 클릭 1번으로 원하는 계열사 정보 접근
- ✅ 일관성 있는 네비게이션

**단점:**
- ⚠️ 전체 계열사를 한눈에 비교하는 페이지가 없음
- ⚠️ 홈페이지에서 "계열사 전체보기" 버튼이 갈 곳이 없음

---

### Option B: "계열사 개요"로 이름 변경 및 용도 명확화 (권장)

```javascript
// TraditionalNav.js - 개선안
{
  id: 'subsidiaries',
  dropdownItems: [
    { label: '계열사 개요', path: '/classic/subsidiaries' },  // ← 이름 변경
    { label: '─────────', disabled: true },  // 구분선
    { label: '클라루스', path: '/classic/subsidiaries/clarus' },
    { label: '정호티엘씨', path: '/classic/subsidiaries/jungho-tlc' },
    { label: '일루텍', path: '/classic/subsidiaries/illutech' },
    { label: '정호텍스컴', path: '/classic/subsidiaries/jungho-texcom' }
  ]
}
```

**SubsidiariesList 페이지 개선:**
1. "상세보기" 버튼 제거
2. 카드 전체를 클릭 가능하게 만들기
3. 각 계열사의 핵심 정보를 카드에 표시
4. "전체 계열사 비교" 목적을 명확히

**장점:**
- ✅ 전체 계열사 비교 페이지 유지
- ✅ 각 계열사 직접 접근도 가능
- ✅ 용도가 명확함
- ✅ 홈페이지 "계열사 전체보기" 버튼 연결 가능

---

## 🎯 최종 권장사항

**Option B를 추천합니다!**

### 이유:
1. ✅ 전체 계열사를 한눈에 비교할 수 있는 페이지 유지
2. ✅ 각 계열사 정보에 직접 접근 가능
3. ✅ 네비게이션 일관성 유지
4. ✅ 기존 페이지 활용 (추가 개발 최소화)

### 구현 방향:
1. **TraditionalNav 드롭다운 수정**
   - "계열사 소개" → "계열사 개요" (또는 "전체 계열사")

2. **SubsidiariesList 페이지 개선**
   - "상세보기" 버튼 제거
   - 카드 전체를 클릭 가능하게 (onClick 이벤트)
   - 각 계열사의 핵심 정보 강화

3. **좌측 사이드바 일관성 유지**
   - 이미 개선 완료 (category="subsidiaries")

---

작성일: 2024년 11월 24일

