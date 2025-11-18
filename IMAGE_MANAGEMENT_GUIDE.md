# 📸 이미지 관리 가이드 (프로젝트 폴더 방식)

## 🎯 개요

이 가이드는 **비개발자도 따라할 수 있도록** 작성되었습니다.
웹사이트에 이미지를 추가하는 방법을 단계별로 설명합니다.

---

## 📁 이미지 저장 위치

모든 이미지는 다음 폴더에 저장됩니다:

```
C:\Work\jungho-corp-website-clean\public\images\
```

### 카테고리별 폴더 구조:

```
public/images/
├── projects/          # 프로젝트 사진
├── subsidiaries/      # 계열사 로고/이미지
├── team/              # 팀원 사진
├── products/          # 제품 이미지
├── banners/           # 배너 이미지
├── news/              # 뉴스/블로그 이미지
└── general/           # 기타 이미지
```

---

## 🚀 이미지 추가 방법 (5분 소요)

### 1단계: 이미지 파일 준비

**파일명 규칙:**
- ✅ **영문 소문자** 사용: `project-001.jpg`
- ✅ **하이픈(-)** 사용: `lotte-world-tower.jpg`
- ❌ **한글** 사용 금지: `롯데월드타워.jpg` (X)
- ❌ **공백** 사용 금지: `lotte world tower.jpg` (X)
- ❌ **특수문자** 사용 금지: `프로젝트#1.jpg` (X)

**파일 형식:**
- JPG/JPEG (권장) - 일반 사진
- PNG - 로고, 투명 배경 필요한 경우
- WebP - 웹 최적화 (고급)

**파일 크기:**
- 최대 2MB 이하로 압축 권장
- 온라인 압축 도구: https://tinypng.com/

**좋은 예시:**
```
✅ lotte-world-tower.jpg
✅ project-001.jpg
✅ clarus-logo.png
✅ team-ceo.jpg
```

**나쁜 예시:**
```
❌ 롯데월드타워.jpg (한글)
❌ Project #1.jpg (특수문자, 공백)
❌ 사진 001.JPG (한글, 공백)
```

---

### 2단계: 프로젝트 폴더 열기

**방법 1: 파일 탐색기로 직접 열기**

1. `윈도우 키 + E` 눌러서 파일 탐색기 열기
2. 주소창에 복사 & 붙여넣기:
   ```
   C:\Work\jungho-corp-website-clean\public\images
   ```
3. Enter 키 누르기

**방법 2: VS Code에서 열기 (개발자용)**

1. VS Code에서 `Ctrl + Shift + E` (파일 탐색기)
2. `public` > `images` 폴더 찾기
3. 우클릭 > "폴더에서 표시"

---

### 3단계: 이미지 복사

**예시: 프로젝트 이미지 추가**

1. **목적지 폴더 열기:**
   ```
   C:\Work\jungho-corp-website-clean\public\images\projects\
   ```

2. **이미지 파일 복사:**
   - 준비한 이미지 파일을 이 폴더에 복사
   - 드래그&드롭 또는 Ctrl+C, Ctrl+V

3. **파일명 확인:**
   ```
   예: lotte-world-tower.jpg
   ```

---

### 4단계: 이미지 URL 확인

복사한 이미지의 **웹 경로**를 확인합니다:

```
파일 위치: public/images/projects/lotte-world-tower.jpg
웹 경로: /images/projects/lotte-world-tower.jpg
```

**규칙:**
- `public/` 부분은 제거
- `/images/`로 시작
- 슬래시(`/`)는 앞에만 붙임

**예시:**

| 파일 위치 | 웹 경로 |
|----------|---------|
| `public/images/projects/project-001.jpg` | `/images/projects/project-001.jpg` |
| `public/images/subsidiaries/clarus-logo.png` | `/images/subsidiaries/clarus-logo.png` |
| `public/images/team/ceo.jpg` | `/images/team/ceo.jpg` |

---

### 5단계: 관리자 페이지에서 URL 입력

**A. 프로젝트 이미지 추가:**

1. 관리자 페이지 접속:
   ```
   http://localhost:3000/admin
   ```

2. "📄 정적 페이지" 탭 클릭

3. 프로젝트 데이터 편집 영역에서:
   ```json
   {
     "id": "project-001",
     "title": "롯데월드타워 조명제어",
     "imageUrl": "/images/projects/lotte-world-tower.jpg",
     "description": "프로젝트 설명..."
   }
   ```

4. "💾 저장" 버튼 클릭

**B. 계열사 로고 추가:**

```json
{
  "id": "clarus",
  "name": "클라루스",
  "logoUrl": "/images/subsidiaries/clarus-logo.png"
}
```

---

### 6단계: 웹사이트 배포 (GitHub & Vercel)

**⚠️ 중요: 이미지를 추가했다면 반드시 배포해야 웹사이트에 반영됩니다!**

#### A. Git으로 커밋 & 푸시 (개발자)

```bash
# 1. Git Bash 또는 VS Code 터미널 열기
cd C:\Work\jungho-corp-website-clean

# 2. 변경사항 확인
git status

# 3. 이미지 파일 추가
git add public/images/

# 4. 커밋 (메시지 수정)
git commit -m "Add project images: 프로젝트명"

# 5. GitHub에 푸시
git push origin main
```

#### B. VS Code에서 커밋 & 푸시 (비개발자도 가능)

1. **VS Code 열기**

2. **좌측 "소스 제어" 아이콘 클릭** (세 번째 아이콘, 가지 모양)

3. **변경된 파일 확인:**
   - `public/images/projects/...` 파일이 보임
   - 초록색 `+` 표시는 새 파일

4. **스테이징 (추가):**
   - 파일 옆의 `+` 버튼 클릭
   - 또는 "모두 스테이징" 버튼 클릭

5. **커밋 메시지 입력:**
   - 상단 입력창에 메시지 입력:
     ```
     Add project images: 롯데월드타워
     ```

6. **"커밋" 버튼 클릭** (✓ 체크 아이콘)

7. **"푸시" 버튼 클릭** (구름 업로드 아이콘)

8. **완료!** GitHub에 업로드됨

#### C. Vercel 자동 배포 확인

1. **Vercel 자동 배포 시작:**
   - GitHub에 푸시하면 자동으로 배포 시작
   - 5-10분 소요

2. **배포 상태 확인:**
   ```
   https://vercel.com/changhopark5911s-projects/jungho-corp-website-clean
   ```

3. **배포 완료 확인:**
   - "Production" 배지가 표시되면 완료
   - 녹색 체크 표시 확인

4. **웹사이트 확인:**
   ```
   https://jungho-corp-website-clean.vercel.app
   ```

---

## 📋 체크리스트

이미지 추가 시 이 체크리스트를 따라하세요:

```
□ 1. 이미지 파일명을 영문 소문자로 변경 (예: project-001.jpg)
□ 2. 파일 크기 2MB 이하로 압축
□ 3. 적절한 폴더에 복사 (예: public/images/projects/)
□ 4. 웹 경로 확인 (예: /images/projects/project-001.jpg)
□ 5. 관리자 페이지에서 URL 입력 및 저장
□ 6. Git 커밋 & 푸시
□ 7. Vercel 배포 완료 대기 (5-10분)
□ 8. 웹사이트에서 이미지 표시 확인
```

---

## 🎯 실전 예제

### 예제 1: 새 프로젝트 사진 추가

**시나리오:** "서울역사 조명제어" 프로젝트 사진 추가

**1단계: 파일 준비**
```
원본 파일명: 서울역사_2024.JPG
변경 후: seoul-station-2024.jpg
```

**2단계: 이미지 복사**
```
목적지: C:\Work\jungho-corp-website-clean\public\images\projects\
결과: public/images/projects/seoul-station-2024.jpg
```

**3단계: 관리자 페이지에서 추가**
```json
{
  "id": "seoul-station",
  "title": "서울역사 조명제어 시스템",
  "imageUrl": "/images/projects/seoul-station-2024.jpg",
  "category": "공공시설",
  "description": "서울역사 스마트 조명제어 구축"
}
```

**4단계: Git 커밋**
```bash
git add public/images/projects/seoul-station-2024.jpg
git commit -m "Add project image: 서울역사"
git push origin main
```

**5단계: 배포 대기 (5-10분)**

**6단계: 웹사이트 확인**
```
https://jungho-corp-website-clean.vercel.app/projects
```

---

### 예제 2: 계열사 로고 변경

**시나리오:** 클라루스 로고 업데이트

**1단계: 새 로고 준비**
```
파일명: clarus-logo-2024.png
```

**2단계: 이미지 복사**
```
목적지: public/images/subsidiaries/
결과: public/images/subsidiaries/clarus-logo-2024.png
```

**3단계: 관리자 페이지에서 URL 변경**
```json
{
  "id": "clarus",
  "name": "클라루스",
  "logoUrl": "/images/subsidiaries/clarus-logo-2024.png"
}
```

**4단계-6단계:** Git 커밋 → 푸시 → 배포 대기 → 확인

---

## 🐛 문제 해결

### 문제 1: 이미지가 웹사이트에 안 보임

**원인:**
- ❌ Git 푸시를 안 함
- ❌ Vercel 배포가 완료 안 됨
- ❌ 파일 경로가 잘못됨

**해결:**
1. Git 푸시 확인: `git log` 명령으로 최근 커밋 확인
2. Vercel 배포 상태 확인: https://vercel.com/
3. 이미지 URL 확인: `/images/`로 시작하는지 체크
4. 브라우저 캐시 삭제: `Ctrl + Shift + R`

### 문제 2: 이미지가 깨져서 보임

**원인:**
- ❌ 파일명에 한글/특수문자 포함
- ❌ 파일 경로가 잘못됨

**해결:**
1. 파일명을 영문으로 변경
2. 파일 경로 다시 확인
3. Git 커밋 다시 하기

### 문제 3: Git 푸시가 안 됨

**원인:**
- ❌ Git 인증 문제
- ❌ 브랜치가 다름

**해결:**
```bash
# 현재 브랜치 확인
git branch

# main 브랜치로 변경
git checkout main

# 다시 푸시
git push origin main
```

---

## 💡 팁 & 트릭

### 팁 1: 이미지 일괄 처리

여러 이미지를 한 번에 추가하는 경우:

```bash
# 한 번에 커밋
git add public/images/projects/*.jpg
git commit -m "Add multiple project images"
git push origin main
```

### 팁 2: 이미지 최적화

**온라인 압축 도구:**
- TinyPNG: https://tinypng.com/ (무료, 최대 5MB)
- Squoosh: https://squoosh.app/ (Google, 무료)
- Compressor.io: https://compressor.io/ (무료)

**압축 가이드:**
- 프로젝트 사진: 1920x1080, 80% 품질
- 로고: PNG 투명, 500x500
- 썸네일: 800x600, 70% 품질

### 팁 3: 파일명 규칙

**권장 패턴:**
```
프로젝트: {회사명}-{장소}-{연도}.jpg
예: samsung-suwon-factory-2024.jpg

로고: {회사명}-logo.png
예: clarus-logo.png

팀원: {직급}-{이름}.jpg
예: ceo-hong-gildong.jpg
```

---

## 🔄 나중에 Firebase Storage로 전환하기

현재 방식에서 Firebase Storage로 전환하는 것은 **매우 쉽습니다!**

### 전환 단계:

1. **Firebase Storage 활성화** (5분)
2. **기존 이미지 업로드** (자동 스크립트 제공)
3. **URL 일괄 변경** (자동 스크립트 제공)
4. **완료!**

**전환이 필요한 시점:**
- ✅ 이미지가 100개 이상
- ✅ 비개발자가 자주 이미지 추가
- ✅ 실시간 업데이트가 필요
- ✅ Git 커밋이 번거로움

**그때 제가 도와드립니다!** 😊

---

## 📞 지원

문제가 발생하거나 질문이 있으시면:

1. **이 가이드를 다시 읽어보세요**
2. **체크리스트를 확인하세요**
3. **개발 팀에 문의하세요**

---

## ✅ 요약

```
이미지 추가 = 3단계
1. 이미지를 public/images/ 폴더에 복사
2. 관리자 페이지에서 URL 입력 (/images/...)
3. Git 커밋 → 푸시 → Vercel 배포 대기

시간: 총 15분 (배포 포함)
난이도: ⭐⭐☆☆☆ (쉬움)
```

**이제 시작하세요!** 🚀

