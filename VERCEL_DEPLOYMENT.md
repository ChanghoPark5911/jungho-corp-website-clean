# Vercel 배포 가이드

## 🚀 Vercel 배포 설정

### 1. Vercel CLI 설치 및 로그인
```bash
npm i -g vercel
vercel login
```

### 2. 프로젝트 배포
```bash
# 프리뷰 배포
npm run deploy:preview

# 프로덕션 배포
npm run deploy
```

### 3. 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정해야 합니다:

#### Firebase 설정
- `REACT_APP_FIREBASE_API_KEY`: Firebase API 키
- `REACT_APP_FIREBASE_AUTH_DOMAIN`: Firebase 인증 도메인
- `REACT_APP_FIREBASE_PROJECT_ID`: Firebase 프로젝트 ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET`: Firebase 스토리지 버킷
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Firebase 메시징 발신자 ID
- `REACT_APP_FIREBASE_APP_ID`: Firebase 앱 ID

#### 기타 설정
- `REACT_APP_OPENAI_API_KEY`: OpenAI API 키 (선택사항)
- `REACT_APP_ENV`: production

### 4. 자동 배포 설정

GitHub 저장소와 연결하여 자동 배포를 설정할 수 있습니다:

1. Vercel 대시보드에서 "Import Project" 클릭
2. GitHub 저장소 선택
3. 빌드 설정 확인:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### 5. 성능 최적화

현재 설정된 최적화 기능:
- ✅ 정적 파일 캐싱 (1년)
- ✅ HTML 파일 캐시 무효화
- ✅ 보안 헤더 설정
- ✅ CDN 자동 적용

### 6. 도메인 설정

1. Vercel 대시보드에서 프로젝트 선택
2. Settings > Domains에서 커스텀 도메인 추가
3. DNS 설정을 통해 도메인 연결

## 📊 모니터링

- Vercel Analytics 자동 활성화
- 실시간 성능 모니터링
- 에러 추적 및 알림

## 🔧 트러블슈팅

### 빌드 실패 시
1. 로컬에서 `npm run build` 테스트
2. 환경 변수 확인
3. Firebase 설정 확인

### 배포 후 문제 시
1. Vercel Functions 로그 확인
2. 브라우저 개발자 도구 콘솔 확인
3. Firebase 콘솔에서 데이터베이스 상태 확인
