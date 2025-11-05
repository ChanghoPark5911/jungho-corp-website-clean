# 다음 세션 안전 작업 계획서

**작성일**: 2025-10-15  
**목적**: 기존 기능을 보호하면서 안전하게 나머지 15% 완성  
**원칙**: 백업 → 테스트 → 적용 → 검증

---

## 🎯 목표

```
현재: 85% 완성
목표: 100% 완성
위험: 최소화
```

**절대 원칙:**
> "작동하는 것을 절대 망가뜨리지 않는다"

---

## 📋 작업 순서 (안전도 우선)

### 🟢 Phase 1: 안전한 작업 (위험도: 낮음)

#### 1.1 프로젝트 UI 완성 (1시간)
```
현재 상태:
- 데이터 구조: ✅ 완료
- 저장 로직: ✅ 완료
- UI 탭: ⏳ 미완성

작업 내용:
- 프로젝트 편집 시 언어 탭 추가
- 뉴스와 동일한 UI 패턴 적용

위험도: 🟢 낮음
- 기존 코드에 영향 없음
- UnifiedAdminPage.jsx 내 추가만

테스트 방법:
1. 관리자 페이지 열기
2. 프로젝트 추가
3. 언어 탭 확인
4. 다국어로 저장
5. 프로젝트 페이지에서 언어별 확인
```

#### 1.2 문서 완성 (1시간)
```
작업 내용:
- 관리자 매뉴얼 완성 ✅
- 사용자 가이드 완성 ✅
- 개발자 문서 작성 (선택)

위험도: 🟢 없음
- 코드 변경 없음
- 문서만 작성
```

---

### 🟡 Phase 2: 중간 위험 작업 (위험도: 중간)

#### 2.1 Firebase 읽기 전용 연동 (2시간)

**⚠️ 주의사항:**
- 쓰기 기능은 나중에
- localStorage와 병행 운영
- 문제 발생 시 즉시 롤백

**작업 전 백업:**
```javascript
// 백업 스크립트
const fullBackup = {
  timestamp: new Date().toISOString(),
  homepage: localStorage.getItem('homepage_content_ko'),
  i18n: localStorage.getItem('i18nTranslations'),
  i18nFlat: localStorage.getItem('i18n_data'),
  news: localStorage.getItem('news_data'),
  projects: localStorage.getItem('projects_data'),
  language: localStorage.getItem('preferredLanguage')
};

// Console에서 실행 후 파일로 저장
console.log(JSON.stringify(fullBackup, null, 2));
// → backup-2025-10-15-before-firebase.json 으로 저장
```

**단계별 작업:**

**Step 1: Firebase 읽기 테스트 (30분)**
```javascript
// src/services/homepageContentService.js
// 주석 해제만 (쓰기 함수 제외)

// 해제할 함수:
- getHomepageContent() // 읽기 전용

// 유지할 함수 (주석 유지):
- saveHomepageContent() // 쓰기 (나중에)
- updateSection() // 쓰기 (나중에)

테스트:
1. 개발자 도구 → Console
2. import { getHomepageContent } from './services/homepageContentService'
3. const data = await getHomepageContent()
4. console.log(data)
5. 데이터 확인
```

**Step 2: 오프라인 대비 (30분)**
```javascript
// 읽기 실패 시 localStorage 사용
async function getSafeContent() {
  try {
    // Firebase 시도
    const firebaseData = await getHomepageContent();
    if (firebaseData) {
      // 성공 시 localStorage에도 백업
      localStorage.setItem('homepage_content_ko', JSON.stringify(firebaseData));
      return firebaseData;
    }
  } catch (error) {
    console.log('Firebase 실패, localStorage 사용');
  }
  
  // Firebase 실패 시 localStorage
  const localData = localStorage.getItem('homepage_content_ko');
  return localData ? JSON.parse(localData) : null;
}
```

**Step 3: UnifiedHomePage 통합 (30분)**
```javascript
// src/pages/UnifiedHomePage.jsx 수정

// 기존:
const content = useUnifiedContent();

// 변경:
const content = useUnifiedContent({ source: 'firebase' });

// useUnifiedContent hook 수정:
// 1. Firebase 먼저 시도
// 2. 실패 시 localStorage
// 3. 둘 다 없으면 기본값
```

**Step 4: 테스트 (30분)**
```
1. Firebase 데이터 삭제
   → localStorage로 잘 fallback 하는지

2. localStorage 삭제
   → Firebase로 잘 가져오는지

3. 둘 다 있을 때
   → Firebase 우선 사용하는지

4. 네트워크 오프라인
   → localStorage로 fallback 하는지
```

**롤백 계획:**
```
문제 발생 시:
1. 즉시 주석 다시 처리
2. 백업 파일로 localStorage 복구
3. 페이지 새로고침
4. 원래대로 작동 확인

예상 복구 시간: 5분
```

---

#### 2.2 Firebase 쓰기 기능 (2시간)

**⚠️ 전제조건:**
- Phase 2.1 완벽히 작동
- 백업 완료
- 테스트 완료

**작업 내용:**
```javascript
// 관리자 페이지에서 저장 시
// localStorage + Firebase 동시 저장

const handleSave = async () => {
  try {
    // 1. localStorage 저장 (기존)
    localStorage.setItem('homepage_content_ko', JSON.stringify(data));
    
    // 2. Firebase 저장 (신규)
    await saveHomepageContent(data);
    
    // 3. 성공 메시지
    alert('저장 완료 (로컬 + 클라우드)');
  } catch (error) {
    // Firebase 실패해도 localStorage는 저장됨
    console.error('Firebase 저장 실패:', error);
    alert('저장 완료 (로컬만)');
  }
};
```

**안전장치:**
```javascript
// Firebase 저장 전 검증
function validateBeforeSave(data) {
  // 필수 필드 확인
  if (!data.hero || !data.subsidiaries) {
    throw new Error('필수 데이터 누락');
  }
  
  // 데이터 크기 확인
  const size = JSON.stringify(data).length;
  if (size > 1000000) { // 1MB
    throw new Error('데이터가 너무 큼');
  }
  
  return true;
}
```

---

### 🔴 Phase 3: 높은 위험 작업 (위험도: 높음)

#### 3.1 구버전 파일 삭제

**⚠️ 매우 신중히!**

**삭제 예정 파일:**
```
src/pages/HomePage.js
src/pages/HomePage.jsx
```

**사전 확인:**
```bash
# 1. 파일이 실제로 사용되는지 확인
grep -r "HomePage.js" src/
grep -r "HomePage.jsx" src/

# 2. import 문 확인
grep -r "from.*HomePage" src/

# 3. 라우팅 확인
# src/App.js 에서 HomePage가 아닌 UnifiedHomePage만 사용 확인
```

**안전한 삭제 절차:**

**Step 1: 백업 (필수)**
```bash
# Git으로 백업
git add src/pages/HomePage.js src/pages/HomePage.jsx
git commit -m "Backup: 구버전 HomePage 파일 삭제 전 백업"

# 또는 파일 복사
cp src/pages/HomePage.js src/pages/HomePage.js.backup
cp src/pages/HomePage.jsx src/pages/HomePage.jsx.backup
```

**Step 2: 이름 변경 (임시)**
```bash
# 삭제하지 말고 이름만 변경
mv src/pages/HomePage.js src/pages/HomePage.js.disabled
mv src/pages/HomePage.jsx src/pages/HomePage.jsx.disabled
```

**Step 3: 테스트 (1일)**
```
1. 개발 서버 재시작
2. 모든 페이지 접속
3. 관리자 페이지 테스트
4. 빌드 테스트: npm run build
5. 24시간 운영 테스트
```

**Step 4: 최종 삭제 (테스트 통과 시)**
```bash
# 문제 없으면 삭제
rm src/pages/HomePage.js.disabled
rm src/pages/HomePage.jsx.disabled

# Git 커밋
git add -A
git commit -m "Remove legacy HomePage files"
```

**롤백 계획:**
```
문제 발생 시:
1. .disabled 파일 이름 원래대로
2. 또는 백업 파일 복구
3. 페이지 새로고침

복구 시간: 2분
```

---

#### 3.2 localStorage → Firebase 마이그레이션

**⚠️ 가장 신중한 작업**

**목적:**
- 기존 localStorage 데이터를 Firebase로 이동
- 데이터 손실 절대 불가

**사전 준비:**
```javascript
// 마이그레이션 스크립트 작성
async function migrateToFirebase() {
  console.log('🔄 마이그레이션 시작...');
  
  // 1. 전체 백업
  const backup = {
    timestamp: new Date().toISOString(),
    data: {
      homepage: localStorage.getItem('homepage_content_ko'),
      i18n: localStorage.getItem('i18nTranslations'),
      news: localStorage.getItem('news_data'),
      projects: localStorage.getItem('projects_data')
    }
  };
  
  console.log('📦 백업 완료:', backup);
  
  // 2. Firebase 업로드
  try {
    const results = {};
    
    // 홈페이지
    if (backup.data.homepage) {
      results.homepage = await saveHomepageContent(
        JSON.parse(backup.data.homepage)
      );
    }
    
    // i18n
    if (backup.data.i18n) {
      results.i18n = await saveI18nData(
        JSON.parse(backup.data.i18n)
      );
    }
    
    // 뉴스
    if (backup.data.news) {
      results.news = await saveNewsData(
        JSON.parse(backup.data.news)
      );
    }
    
    // 프로젝트
    if (backup.data.projects) {
      results.projects = await saveProjectsData(
        JSON.parse(backup.data.projects)
      );
    }
    
    console.log('✅ 마이그레이션 성공:', results);
    return results;
    
  } catch (error) {
    console.error('❌ 마이그레이션 실패:', error);
    throw error;
  }
}
```

**실행 절차:**

**Step 1: 테스트 환경에서 먼저**
```javascript
// 테스트 데이터로 연습
const testData = {
  hero: {
    title: "테스트 제목",
    subtitle: "테스트 부제목"
  }
};

await saveHomepageContent(testData);
const loaded = await getHomepageContent();
console.log('일치:', JSON.stringify(testData) === JSON.stringify(loaded));
```

**Step 2: 실제 데이터 마이그레이션**
```javascript
// F12 → Console에서 실행
await migrateToFirebase();

// 결과 확인
// Firebase Console에서 데이터 확인
```

**Step 3: 검증 (필수)**
```javascript
// 업로드된 데이터 다시 다운로드
const firebaseHomepage = await getHomepageContent();
const localHomepage = JSON.parse(localStorage.getItem('homepage_content_ko'));

// 비교
console.log('일치:', 
  JSON.stringify(firebaseHomepage) === JSON.stringify(localHomepage)
);

// 각 필드 개별 확인
function deepCompare(obj1, obj2, path = '') {
  for (let key in obj1) {
    const newPath = path ? `${path}.${key}` : key;
    
    if (typeof obj1[key] === 'object') {
      deepCompare(obj1[key], obj2[key], newPath);
    } else if (obj1[key] !== obj2[key]) {
      console.error(`❌ 불일치: ${newPath}`);
      console.log('  Local:', obj1[key]);
      console.log('  Firebase:', obj2[key]);
    }
  }
}

deepCompare(localHomepage, firebaseHomepage);
```

**Step 4: 최종 전환**
```javascript
// localStorage 유지 (당분간)
// Firebase를 primary로 사용
// localStorage는 fallback으로 유지

// 향후 localStorage 삭제는 3개월 후
```

---

## 🛡️ 전체 안전 체크리스트

### 작업 시작 전

```
□ 현재 상태 백업 완료
□ Git 커밋 완료
□ 백업 파일 별도 저장 (.json)
□ 개발 서버 정상 작동 확인
□ 현재 기능 스크린샷 촬영
```

### 각 단계마다

```
□ 변경 사항 최소화
□ 한 번에 하나씩
□ 변경 후 즉시 테스트
□ 문제 발생 시 즉시 롤백
□ 작동 확인 후 다음 단계
```

### 작업 완료 후

```
□ 전체 기능 테스트
□ 모든 페이지 접속 확인
□ 다국어 전환 확인
□ 관리자 페이지 확인
□ Git 커밋 완료
```

---

## 🚨 긴급 롤백 절차

### 문제 발생 시

**즉시 실행:**
```javascript
// 1. 백업에서 복구
const backup = /* 백업 파일 내용 */;

localStorage.setItem('homepage_content_ko', backup.homepage);
localStorage.setItem('i18nTranslations', backup.i18n);
localStorage.setItem('news_data', backup.news);
localStorage.setItem('projects_data', backup.projects);

// 2. 페이지 새로고침
location.reload();
```

**Git으로 롤백:**
```bash
# 최근 커밋으로 되돌리기
git reset --hard HEAD~1

# 또는 특정 커밋으로
git reset --hard [커밋해시]

# 파일 복구
git checkout HEAD src/pages/UnifiedHomePage.jsx
```

---

## 📊 진행 상황 추적

### 체크리스트

#### Phase 1: 안전한 작업
```
□ 프로젝트 UI 완성
  □ 언어 탭 추가
  □ 저장 테스트
  □ 표시 테스트
  
□ 문서 완성
  □ 관리자 매뉴얼
  □ 사용자 가이드
  □ 개발자 문서
```

#### Phase 2: 중간 위험
```
□ Firebase 읽기
  □ 백업 완료
  □ 주석 해제
  □ 테스트 통과
  □ 오프라인 대비
  
□ Firebase 쓰기
  □ 읽기 완벽 작동
  □ 검증 로직 추가
  □ 양방향 동기화
  □ 테스트 통과
```

#### Phase 3: 높은 위험
```
□ 파일 삭제
  □ 사용처 확인
  □ 백업 완료
  □ 이름 변경
  □ 1일 테스트
  □ 최종 삭제
  
□ 마이그레이션
  □ 스크립트 작성
  □ 테스트 실행
  □ 실제 실행
  □ 검증 완료
  □ 3개월 안정화
```

---

## 💡 작업 시 유의사항

### DO (해야 할 것)

```
✅ 작은 단계로 나누기
✅ 각 단계마다 테스트
✅ 백업은 여러 곳에
✅ Git 자주 커밋
✅ 문제 발생 시 즉시 중단
✅ 롤백 계획 항상 준비
✅ 의심스러우면 안하기
```

### DON'T (하지 말 것)

```
❌ 여러 작업 동시 진행
❌ 백업 없이 위험한 작업
❌ 테스트 없이 다음 단계
❌ 피곤할 때 위험한 작업
❌ 시간에 쫓겨서 급하게
❌ 이해 안되는 코드 수정
❌ 작동하는 코드 "개선"
```

---

## 📞 문제 발생 시 대응

### Level 1: 경미한 문제
```
증상: UI 깨짐, 스타일 오류
대응: 
1. 브라우저 새로고침
2. 캐시 삭제
3. 개발자 도구 확인
```

### Level 2: 중간 문제
```
증상: 기능 일부 작동 안함
대응:
1. Console 오류 확인
2. 최근 변경사항 되돌리기
3. localStorage 확인
4. 백업으로 복구
```

### Level 3: 심각한 문제
```
증상: 사이트 전체 작동 안함
대응:
1. 즉시 작업 중단
2. Git reset --hard
3. 백업 파일로 복구
4. 개발 서버 재시작
5. 원래 상태 확인
6. 원인 분석 후 재시도
```

---

## 📅 권장 작업 일정

### 세션 1 (2시간): 안전한 작업
```
09:00 - 09:30  백업 및 환경 확인
09:30 - 10:30  프로젝트 UI 완성
10:30 - 11:00  테스트 및 문서화
```

### 세션 2 (3시간): Firebase 읽기
```
14:00 - 14:30  백업 및 계획 검토
14:30 - 15:30  Firebase 읽기 구현
15:30 - 16:30  테스트 및 오류 수정
16:30 - 17:00  검증 및 문서화
```

### 세션 3 (3시간): Firebase 쓰기
```
09:00 - 09:30  전날 작업 검증
09:30 - 11:00  Firebase 쓰기 구현
11:00 - 12:00  양방향 동기화 테스트
```

### 세션 4 (2시간): 파일 정리
```
14:00 - 14:30  사전 확인
14:30 - 15:00  파일 이름 변경
15:00 - 15:30  테스트
15:30 - 16:00  문서 정리
```

### 세션 5+ (필요시): 마이그레이션
```
⚠️ 충분한 시간 확보
⚠️ 서두르지 않기
⚠️ 문제 없을 때만 진행
```

---

## 🎯 성공 기준

### 각 Phase별 성공 조건

**Phase 1 성공:**
```
✅ 프로젝트 UI 완성
✅ 기존 기능 100% 작동
✅ 새 기능 테스트 통과
✅ 문서화 완료
```

**Phase 2 성공:**
```
✅ Firebase 읽기/쓰기 작동
✅ 오프라인 fallback 작동
✅ 기존 기능 100% 작동
✅ 데이터 손실 0건
```

**Phase 3 성공:**
```
✅ 파일 구조 깔끔
✅ 마이그레이션 완료
✅ 기존 기능 100% 작동
✅ 성능 저하 없음
```

---

## 📖 참고 자료

### 백업 스크립트

```javascript
// backup-script.js
function createFullBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `backup-${timestamp}.json`;
  
  const backup = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    data: {
      homepage: localStorage.getItem('homepage_content_ko'),
      i18n: localStorage.getItem('i18nTranslations'),
      i18nFlat: localStorage.getItem('i18n_data'),
      news: localStorage.getItem('news_data'),
      projects: localStorage.getItem('projects_data'),
      language: localStorage.getItem('preferredLanguage')
    }
  };
  
  // 다운로드
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  
  console.log(`✅ 백업 완료: ${filename}`);
  return backup;
}

// Console에서 실행
createFullBackup();
```

### 복구 스크립트

```javascript
// restore-script.js
function restoreFromBackup(backupData) {
  try {
    console.log('🔄 복구 시작...');
    
    const data = backupData.data;
    
    if (data.homepage) {
      localStorage.setItem('homepage_content_ko', data.homepage);
      console.log('✅ 홈페이지 복구');
    }
    
    if (data.i18n) {
      localStorage.setItem('i18nTranslations', data.i18n);
      console.log('✅ 다국어 복구');
    }
    
    if (data.news) {
      localStorage.setItem('news_data', data.news);
      console.log('✅ 뉴스 복구');
    }
    
    if (data.projects) {
      localStorage.setItem('projects_data', data.projects);
      console.log('✅ 프로젝트 복구');
    }
    
    console.log('✅ 복구 완료');
    console.log('페이지를 새로고침하세요.');
    
    return true;
  } catch (error) {
    console.error('❌ 복구 실패:', error);
    return false;
  }
}

// 사용법:
// 1. 백업 파일을 열어서 내용 복사
// 2. Console에서 실행:
const backupData = /* 여기에 붙여넣기 */;
restoreFromBackup(backupData);
// 3. 페이지 새로고침
```

---

**작성자**: AI 개발 어시스턴트  
**검토 필요**: 실제 작업 전 개발자 확인  
**업데이트**: 작업 진행하며 실시간 수정

---

**중요**: 이 계획서는 가이드라인입니다. 실제 작업 중 예상치 못한 문제가 발생하면 즉시 중단하고 재평가하세요.

