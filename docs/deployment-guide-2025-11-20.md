# 배포 가이드 - 2025년 11월 20일

## 🚀 배포 절차

### 1단계: Git 커밋 및 푸시

PowerShell에서 다음 명령어를 실행하세요:

```powershell
# 프로젝트 폴더로 이동
cd C:\Work\jungho-corp-website-clean

# 현재 상태 확인
git status

# 모든 변경사항 추가
git add .

# 커밋
git commit -m "✨ 계열사 상세 페이지 업데이트 및 이미지 모달 기능 추가

🎯 주요 변경사항:

**클라루스 (CLARUS)**
- 제품/서비스 재구성: 조명제어시스템, 전력감시시스템, 해외사업(수출)
- 회사명 수정: 클라루스코리아 → 클라루스
- 이미지 3개 추가 및 모달 기능

**정호티엘씨 (Jungho TLC)**
- 제품/서비스 재구성: 통합 SI 시스템, 조명제어시스템, 전력 모니터링시스템
- 상세 설명 업데이트
- 이미지 3개 추가 및 모달 기능

**정호텍스컴 (Jungho TEXCOM)**
- 사업부 중심 재구성: 섬유기계사업부, RSS 사업부
- 회사소개 대폭 업데이트

**계열사 목록 (Classic)**
- 정보 간소화: 사업분야만 표시

🎨 공통 개선:
- 이미지 확대 모달 기능
- 수직/수평 정렬 최적화
- Hybrid & Classic 버전 콘텐츠 동기화

📅 작업일: 2025-11-20"

# GitHub에 푸시
git push origin main
```

---

### 2단계: Vercel 자동 배포 확인

1. **GitHub 푸시 후 자동 배포**
   - GitHub에 푸시하면 Vercel이 자동으로 배포를 시작합니다
   - 보통 1-3분 소요

2. **Vercel 대시보드 확인**
   - https://vercel.com/dashboard 접속
   - 프로젝트 선택
   - 배포 상태 확인

3. **배포 완료 확인**
   - 배포 완료 후 Preview URL에서 확인
   - Production 환경에 자동 반영

---

### 3단계: 배포된 사이트 확인

#### 확인할 URL
- **클라루스**: `[도메인]/hybrid/subsidiaries/clarus`
- **정호티엘씨**: `[도메인]/hybrid/subsidiaries/jungho-tlc`
- **정호텍스컴**: `[도메인]/hybrid/subsidiaries/jungho-texcom`

#### 확인 사항
- ✅ 이미지가 정상적으로 표시되는지
- ✅ 이미지 클릭 시 모달이 열리는지
- ✅ 텍스트 내용이 올바르게 표시되는지
- ✅ 모바일/태블릿에서도 정상 작동하는지

---

## 🔍 문제 해결

### 이미지가 표시되지 않는 경우

1. **캐시 문제**
   ```
   브라우저에서 강력 새로고침: Ctrl + Shift + R
   ```

2. **이미지 경로 확인**
   ```javascript
   // 올바른 경로 형식
   imagePath: '/images/clarus/lighting-control-diagram.png'
   
   // 잘못된 경로 (X)
   imagePath: 'images/clarus/lighting-control-diagram.png'
   imagePath: './images/clarus/lighting-control-diagram.png'
   ```

3. **이미지 파일 확인**
   ```
   public/images/clarus/ 폴더에 이미지가 있는지 확인
   파일명이 정확히 일치하는지 확인 (대소문자 구분)
   ```

### 배포 실패 시

1. **Vercel 로그 확인**
   - Vercel 대시보드에서 배포 로그 확인
   - 에러 메시지 확인

2. **빌드 에러**
   ```powershell
   # 로컬에서 빌드 테스트
   npm run build
   ```

3. **린터 에러**
   ```powershell
   # 린터 검사
   npm run lint
   ```

---

## 📋 배포 체크리스트

### 배포 전
- [ ] 모든 변경사항 저장
- [ ] 로컬에서 테스트 완료
- [ ] 린터 에러 없음
- [ ] 이미지 파일 정상 업로드 확인

### 배포 중
- [ ] Git 커밋 성공
- [ ] GitHub 푸시 성공
- [ ] Vercel 배포 시작 확인

### 배포 후
- [ ] Vercel 배포 완료 확인
- [ ] Production URL 접속 확인
- [ ] 주요 페이지 정상 작동 확인
- [ ] 이미지 표시 확인
- [ ] 모달 기능 작동 확인
- [ ] 모바일 반응형 확인

---

## 🌐 배포 환경

### Production
- **URL**: https://jungho-corp-website-clean.vercel.app (또는 설정된 도메인)
- **Branch**: main
- **자동 배포**: GitHub 푸시 시 자동

### Preview
- **URL**: Vercel이 PR마다 자동 생성
- **용도**: 배포 전 미리보기

---

## 📞 문제 발생 시 연락처

### Vercel 지원
- 문서: https://vercel.com/docs
- 지원: https://vercel.com/support

### GitHub
- 저장소: https://github.com/[사용자명]/jungho-corp-website-clean

---

**작성일**: 2025년 11월 20일  
**프로젝트**: 정호그룹 웹사이트

