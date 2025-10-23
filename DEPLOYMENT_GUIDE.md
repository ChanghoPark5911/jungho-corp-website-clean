# 🚀 배포 가이드

## 📋 배포 전 체크리스트

### 1. 코드 변경 사항 확인
```bash
git status
```

### 2. 로컬에서 빌드 테스트
```bash
npm run build
```

### 3. 로컬 서버에서 테스트 (선택사항)
```bash
npm start
```

---

## 🌐 Vercel 배포 절차

### 방법 1: 자동 배포 (권장)

#### 단계 1: Git에 커밋 및 푸시
```bash
git add .
git commit -m "변경 사항 설명"
git push origin main
```

#### 단계 2: Vercel CLI로 프로덕션 배포
```bash
vercel --prod --yes
```

**이 명령은 자동으로:**
- ✅ 최신 코드를 빌드
- ✅ Vercel에 업로드
- ✅ **메인 도메인 자동 업데이트**: `jungho-corp-website-clean.vercel.app`
- ✅ 고유 배포 URL 생성: 롤백용

### 방법 2: GitHub 연동 자동 배포

GitHub에 push하면 Vercel이 자동으로 배포합니다:
```bash
git add .
git commit -m "변경 사항 설명"
git push origin main
```

Vercel 대시보드에서 배포 진행 상황 확인:
```
https://vercel.com/changhopark5911s-projects/jungho-corp-website-clean
```

---

## 📊 배포 확인

### 1. 메인 도메인 확인
```
https://jungho-corp-website-clean.vercel.app
```

### 2. 배포 목록 확인
```bash
vercel ls
```

최근 배포가 맨 위에 표시되고, 메인 도메인과 자동 연결됩니다.

### 3. 브라우저 캐시 문제 해결

**시크릿 모드로 확인 (가장 확실!):**
- Windows: `Ctrl + Shift + N`
- Mac: `Cmd + Shift + N`

**하드 리프레시:**
- Windows: `Ctrl + Shift + R` 또는 `Ctrl + F5`
- Mac: `Cmd + Shift + R`

---

## 🔧 문제 해결

### 메인 도메인이 업데이트되지 않는 경우

#### 방법 1: 재배포
```bash
vercel --prod --yes
```

#### 방법 2: 별칭 확인
```bash
vercel alias ls
```

#### 방법 3: Vercel 대시보드에서 확인
1. https://vercel.com 접속
2. 프로젝트 선택
3. Deployments 탭에서 최신 배포 확인
4. Domains 탭에서 도메인 연결 상태 확인

### CDN 캐시 업데이트 대기
Vercel CDN이 전 세계에 새 버전을 배포하는데 **1-2분** 소요될 수 있습니다.

---

## 📝 배포 스크립트 (package.json에 추가됨)

```json
{
  "scripts": {
    "deploy": "npm run build && vercel --prod --yes",
    "deploy:preview": "npm run build && vercel"
  }
}
```

**사용 방법:**
```bash
# 프로덕션 배포
npm run deploy

# 프리뷰 배포 (테스트용)
npm run deploy:preview
```

---

## 🎯 권장 워크플로우

### 일상적인 작업
```bash
# 1. 코드 수정
# 2. 로컬 테스트
npm start

# 3. 빌드 테스트
npm run build

# 4. Git 커밋
git add .
git commit -m "기능: 다크모드 가독성 개선"

# 5. GitHub 푸시
git push origin main

# 6. Vercel 배포 (메인 도메인 자동 업데이트)
vercel --prod --yes

# 7. 배포 확인 (시크릿 모드)
# https://jungho-corp-website-clean.vercel.app
```

---

## 🌐 도메인 정보

### 메인 프로덕션 도메인
```
https://jungho-corp-website-clean.vercel.app
```
**자동 업데이트**: `vercel --prod` 실행 시

### Git 브랜치 별 도메인
- **main 브랜치**: 프로덕션 도메인에 자동 연결
- **다른 브랜치**: 별도의 프리뷰 URL 생성

### 각 배포별 고유 URL
각 배포마다 고유한 URL이 생성되며, 이는 롤백이나 이전 버전 확인에 사용할 수 있습니다.

---

## ✅ 체크리스트

배포 전:
- [ ] 로컬에서 빌드 테스트 완료
- [ ] Git 커밋 및 푸시 완료
- [ ] Vercel CLI로 프로덕션 배포 실행

배포 후:
- [ ] 시크릿 모드에서 메인 도메인 확인
- [ ] 다크모드 테스트
- [ ] 다국어 테스트
- [ ] 주요 기능 테스트

---

## 📞 문제 발생 시

1. **Vercel 로그 확인**
   ```bash
   vercel logs jungho-corp-website-clean
   ```

2. **배포 상태 확인**
   ```bash
   vercel inspect <deployment-url>
   ```

3. **Vercel 대시보드**
   https://vercel.com/changhopark5911s-projects/jungho-corp-website-clean

---

## 🎉 완료!

이제 `vercel --prod --yes` 명령 하나로 메인 도메인이 자동으로 최신 버전으로 업데이트됩니다!

