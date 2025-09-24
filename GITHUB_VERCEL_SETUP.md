# GitHub + Vercel 자동 배포 설정 가이드

## 🚀 1단계: GitHub 저장소 준비

### GitHub 저장소 생성
1. GitHub에서 새 저장소 생성
2. 로컬 프로젝트를 GitHub에 푸시:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## 🔧 2단계: Vercel 프로젝트 생성

### Vercel 웹 대시보드에서 설정
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. "Import Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

## 🔑 3단계: 환경 변수 설정

Vercel 프로젝트 설정에서 다음 환경 변수들을 추가:

### Firebase 설정
```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 기타 설정
```
REACT_APP_OPENAI_API_KEY=your_openai_api_key
REACT_APP_ENV=production
```

## 🔄 4단계: 자동 배포 설정

### Vercel 자동 배포 활성화
1. Vercel 프로젝트 설정 → Git
2. "Automatic deployments" 활성화
3. 배포 브랜치 설정 (main 또는 master)

### GitHub Actions 설정 (선택사항)
GitHub Actions를 사용하려면 다음 시크릿을 GitHub 저장소에 추가:

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. 다음 시크릿 추가:
   - `VERCEL_TOKEN`: Vercel 계정 토큰
   - `ORG_ID`: Vercel 조직 ID
   - `PROJECT_ID`: Vercel 프로젝트 ID

## 📊 5단계: 모니터링 설정

### Vercel Analytics
- 자동으로 활성화됨
- 실시간 성능 모니터링
- 사용자 행동 분석

### 알림 설정
1. Vercel 프로젝트 → Settings → Notifications
2. 배포 성공/실패 알림 설정
3. Slack, Discord, 이메일 연동 가능

## 🚀 6단계: 배포 테스트

### 수동 배포 테스트
```bash
# 로컬에서 빌드 테스트
npm run build

# Vercel CLI로 배포 테스트
vercel --prod
```

### 자동 배포 테스트
1. GitHub에 코드 푸시
2. Vercel 대시보드에서 배포 상태 확인
3. 배포된 사이트 접속하여 정상 작동 확인

## 🔧 트러블슈팅

### 빌드 실패 시
1. 로컬에서 `npm run build` 테스트
2. 환경 변수 확인
3. Firebase 설정 확인
4. Vercel 빌드 로그 확인

### 배포 후 문제 시
1. Vercel Functions 로그 확인
2. 브라우저 개발자 도구 콘솔 확인
3. Firebase 콘솔에서 데이터베이스 상태 확인

## 📈 성능 최적화

### 이미 설정된 최적화
- ✅ 정적 파일 캐싱 (1년)
- ✅ HTML 파일 캐시 무효화
- ✅ 보안 헤더 설정
- ✅ CDN 자동 적용
- ✅ 이미지 최적화
- ✅ 코드 스플리팅

### 추가 최적화 옵션
- Vercel Analytics 활성화
- 실시간 성능 모니터링
- 에러 추적 및 알림
