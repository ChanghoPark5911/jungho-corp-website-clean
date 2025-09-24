# Firebase 보안 규칙 설정 가이드

## 현재 문제
Vercel 배포 환경에서 "Failed to fetch" 오류 발생
- 로컬에서는 정상 작동
- Vercel에서만 오류 발생

## 해결 방법

### 1. Firebase Console 접속
1. https://console.firebase.google.com/ 접속
2. "jungho-corp-website" 프로젝트 선택

### 2. Firestore Database → Rules 탭
현재 규칙을 다음으로 변경:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 개발/테스트용 - 모든 읽기/쓰기 허용
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. 규칙 게시
- "Publish" 버튼 클릭하여 규칙 적용

### 4. 테스트
- Vercel 사이트에서 관리자 페이지 테스트
- Hero Section 수정 및 저장 테스트

## 보안 주의사항
- 위 규칙은 개발/테스트용입니다
- 프로덕션에서는 더 엄격한 규칙 설정 필요
- 인증 기반 규칙으로 변경 권장
