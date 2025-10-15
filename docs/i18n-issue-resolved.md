# i18n 문제 해결 완료 (2025-10-15)

## ✅ 해결된 문제

### 1. **관리자 페이지에서 수정한 번역이 홈페이지에 반영되지 않던 문제**
   - **원인**: `useI18n` 훅이 `i18nDataUpdated` 이벤트를 리스닝하지 않음
   - **해결**: 이벤트 리스너 추가 및 상태 업데이트 트리거 구현
   - **결과**: 관리자 페이지에서 저장 → 홈페이지 자동 업데이트 ✅

### 2. **사용자가 수정한 번역이 기본값으로 초기화되던 문제**
   - **원인**: `loadTranslations()`의 위험한 `needsRegen` 로직
     - 특정 키가 없으면 전체 데이터를 기본값으로 리셋
     - 사용자 수정사항이 모두 삭제됨
   - **해결**: `deepMerge` 함수로 사용자 데이터 보존
     - 기본값과 사용자 데이터를 병합
     - 사용자 데이터 우선 순위 보장
     - 누락된 키만 추가, 기존 데이터는 절대 덮어쓰지 않음
   - **결과**: 사용자 번역이 영구적으로 보존됨 ✅

### 3. **support 페이지 한국어 번역 키가 그대로 표시되던 문제**
   - **원인**: `i18nAdvanced.js`에서 `support` 키 중복 선언
     - Line 250: 상세한 데이터 (올바름)
     - Line 600: 간단한 데이터 (중복, 앞의 것을 덮어씀)
   - **해결**: 중복된 `support` 섹션 제거
   - **결과**: 한국어 support 페이지 정상 표시 ✅

---

## 📝 구현된 기능

### 1. **useI18n 훅 개선** (`src/hooks/useI18n.js`)

```javascript
// i18n 데이터 업데이트 이벤트 리스너 추가
const handleI18nDataUpdate = () => {
  console.log('🔄 useI18n: i18n 데이터 업데이트 감지 - 컴포넌트 리렌더링');
  setUpdateTrigger(prev => prev + 1); // 리렌더링 트리거
};

window.addEventListener('i18nDataUpdated', handleI18nDataUpdate);
```

### 2. **사용자 데이터 보존 로직** (`src/utils/i18nAdvanced.js`)

```javascript
// Deep merge: 사용자 데이터 우선!
deepMerge(defaultObj, userObj) {
  const result = { ...defaultObj };
  
  Object.keys(userObj).forEach(key => {
    if (userObj[key] && typeof userObj[key] === 'object' && !Array.isArray(userObj[key])) {
      // 객체인 경우 재귀적으로 병합
      result[key] = this.deepMerge(defaultObj[key] || {}, userObj[key]);
    } else {
      // 사용자가 수정한 값 우선
      result[key] = userObj[key];
    }
  });
  
  return result;
}
```

### 3. **안전한 번역 데이터 로드**

**Before (위험):**
```javascript
if (특정_키_없음) {
  needsRegen = true;
}
if (needsRegen) {
  // 🔥 사용자 데이터 전체 삭제!
  this.translations = getDefaultTranslations();
}
```

**After (안전):**
```javascript
// 1. 저장된 데이터 먼저 로드 ✅
this.translations = 저장된_데이터;

// 2. 누락된 키만 추가 (사용자 데이터 보존!) ✅
const merged = deepMerge(기본값, 사용자_데이터);

// 3. 사용자 수정한 값은 절대 덮어쓰지 않음! ✅
```

---

## 🔍 테스트 시나리오

### ✅ 시나리오 1: 번역 수정 및 즉시 반영
1. 관리자 페이지 (`/admin`) → 다국어 관리
2. English → `home.subsidiaries.clarus.title` 수정
3. "모든 번역 저장" 클릭
4. 홈페이지 (`/`) → English 선택
5. **결과**: 수정한 내용이 즉시 반영됨 ✅

### ✅ 시나리오 2: 페이지 새로고침 후 데이터 유지
1. 관리자 페이지에서 번역 수정
2. F5로 페이지 새로고침
3. **결과**: 수정한 번역이 그대로 유지됨 (기본값으로 되돌아가지 않음) ✅

### ✅ 시나리오 3: support 페이지 한국어 표시
1. 홈페이지 → 언어: 한국어
2. 고객지원 페이지 이동
3. **결과**: "지원 채널", "지원 서비스" 등 한국어로 정상 표시 ✅

---

## 📊 변경된 파일

### 핵심 파일
- ✅ `src/hooks/useI18n.js` - 이벤트 리스너 추가
- ✅ `src/utils/i18nAdvanced.js` - 사용자 데이터 보존 로직
- ✅ `src/pages/UnifiedAdminPage.jsx` - flat ↔ nested 변환 (기존 구현)

### 삭제된 파일
- ❌ `src/pages/AdminPage.jsx.backup`
- ❌ `src/components/ui/GroupIntro.js.backup`
- ❌ `src/components/ui/SubsidiariesIntro.js.backup`
- ❌ `temp_groupintro.txt`
- ❌ `src/pages/I18nTestPage.jsx` (테스트 완료)

---

## 🛡️ 보호 장치

### 1. **사용자 데이터 우선 순위 보장**
   - `deepMerge` 함수가 사용자 수정사항을 항상 보존
   - 기본값은 누락된 키에만 적용

### 2. **누락된 키만 추가**
   - 새로운 기능 추가 시 기존 데이터에 영향 없음
   - 기존 번역이 유지되면서 새 키만 추가됨

### 3. **파싱 오류만 리셋**
   - JSON 파싱 실패 시에만 기본값 사용
   - 정상적인 경우 절대 리셋되지 않음

### 4. **실시간 업데이트**
   - `i18nDataUpdated` 이벤트로 자동 리렌더링
   - 관리자 페이지 변경사항이 즉시 반영

---

## 🎯 결과

### Before (문제)
- ❌ 관리자에서 수정 → 홈페이지 반영 안됨
- ❌ 새로고침 → 사용자 번역이 기본값으로 초기화
- ❌ support 페이지 한국어 섹션 제목이 키로 표시

### After (해결)
- ✅ 관리자에서 수정 → 홈페이지 즉시 반영
- ✅ 새로고침 → 사용자 번역 영구 보존
- ✅ support 페이지 모든 언어 정상 표시
- ✅ 사용자 데이터 절대 손실 방지

---

## 📌 향후 유지보수 가이드

### 새로운 번역 키 추가 시
1. `i18nAdvanced.js`의 `getDefaultTranslations()`에 키 추가
2. 모든 언어(ko, en, zh, ja)에 동일 키 구조 추가
3. 페이지 새로고침 → `deepMerge`가 자동으로 누락된 키 추가
4. 기존 사용자 번역은 그대로 유지됨 ✅

### 관리자 페이지에서 번역 관리
1. `/admin` → 다국어 관리
2. 언어 선택 → 키 검색 (Ctrl+F)
3. 값 수정 → "모든 번역 저장"
4. 변경사항 즉시 반영 ✅

---

**작성일**: 2025-10-15  
**상태**: ✅ 해결 완료  
**커밋**: `fix(i18n): 사용자 번역 데이터 보존 및 실시간 업데이트 구현`

---

## 🔗 관련 문서
- [원본 이슈 문서](./current-i18n-issue.md)
- [i18nAdvanced.js 문서](../src/utils/i18nAdvanced.js)
- [useI18n 훅 문서](../src/hooks/useI18n.js)

