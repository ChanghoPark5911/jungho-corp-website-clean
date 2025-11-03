# 발표 슬라이드 사용 가이드

## 📊 개요

`meeting-presentation-slides.md` 파일은 **Marp** 형식의 프레젠테이션 슬라이드입니다.
PowerPoint, PDF, HTML로 변환하여 사용할 수 있습니다.

---

## 🎯 3가지 사용 방법

### 방법 1: VSCode에서 바로 보기 ⭐ 가장 쉬움

#### 1단계: Marp 확장 설치
1. VSCode 열기
2. 왼쪽 사이드바에서 **Extensions** (확장) 클릭
3. 검색: **"Marp for VS Code"**
4. **설치** 클릭

#### 2단계: 슬라이드 보기
1. `docs/meeting-presentation-slides.md` 파일 열기
2. 오른쪽 상단의 **미리보기 아이콘** 클릭
3. 또는 `Ctrl+K V` (Windows) / `Cmd+K V` (Mac)

#### 3단계: 발표 모드
- 미리보기 화면에서 **전체 화면** 아이콘 클릭
- 키보드 방향키로 슬라이드 이동

---

### 방법 2: PowerPoint로 변환 💼 회의실 발표용

#### 1단계: Marp CLI 설치 (최초 1회)
```bash
npm install -g @marp-team/marp-cli
```

#### 2단계: PPTX로 변환
```bash
marp docs/meeting-presentation-slides.md --pptx -o presentation.pptx
```

#### 생성 결과
- `presentation.pptx` 파일 생성
- PowerPoint에서 바로 열기 가능
- 편집 및 수정 가능

---

### 방법 3: PDF로 변환 📄 인쇄/배포용

#### PPTX 먼저 만들고 PDF 변환 (권장)
```bash
# 1. PPTX 생성
marp docs/meeting-presentation-slides.md --pptx -o presentation.pptx

# 2. PowerPoint에서 "다른 이름으로 저장" → PDF 선택
```

#### 또는 직접 PDF 변환
```bash
marp docs/meeting-presentation-slides.md --pdf -o presentation.pdf
```

---

## 🎨 슬라이드 커스터마이징

### 색상 변경

`meeting-presentation-slides.md` 파일 상단의 `<style>` 섹션 수정:

```css
h1 {
  color: #2563eb;  /* 제목 색상 */
}
h2 {
  color: #1e40af;  /* 부제목 색상 */
}
```

### 배경 변경

```yaml
---
backgroundColor: #fff  /* 배경색 */
backgroundImage: url('경로')  /* 배경 이미지 */
---
```

### 로고 추가

헤더 부분에 로고 이미지 URL 추가:

```yaml
---
header: '![로고](로고URL) 정호그룹 웹사이트 현황'
---
```

---

## 📝 슬라이드 구조

| 슬라이드 번호 | 제목 | 내용 |
|:------------:|:-----|:-----|
| 1 | 표지 | 정호그룹 웹사이트 현황 |
| 2-3 | 1분 요약 | 완료/남은 작업 |
| 4-5 | 웹사이트 접속 | URL 링크 |
| 6-7 | 웹사이트 구조 | 페이지 구성표 |
| 8-11 | 시공실적 | 입력 항목, 카테고리 |
| 12-13 | 뉴스 | 입력 항목, 카테고리 |
| 14-17 | 입력 방법 | Excel vs Admin |
| 18 | 제공 자료 | 문서/템플릿/도구 |
| 19-23 | 회의 안건 | 구조/용어/담당자/일정 |
| 24-25 | 즉시 시작 | 1주차/2주차 계획 |
| 26-28 | 변경 가능 사항 | 난이도별 분류 |
| 29-30 | 작업 프로세스 | 흐름도, 자동화 |
| 31 | 지원 체계 | 기술/콘텐츠 지원 |
| 32-33 | 기대 효과 | 글로벌/영업/브랜드 |
| 34-35 | 다음 단계 | Action Items |
| 36 | 참고 자료 | 문서 위치 |
| 37 | Q&A | 질문 시간 |
| 38 | 마무리 | 감사 인사 |

**총 38장**

---

## 🎬 발표 팁

### 사전 준비

1. **웹사이트 탭 미리 열기**
   - https://jungho-corp-website-clean.vercel.app
   - 각 페이지를 시연할 준비

2. **Excel 템플릿 파일 열기**
   - 실제 템플릿을 보여주며 설명

3. **타이머 설정**
   - 전체: 20-30분
   - 슬라이드: 15분
   - 웹사이트 시연: 5분
   - Q&A: 5-10분

### 발표 순서

#### 1부: 현황 소개 (5분)
- 슬라이드 1-7
- 완성된 것과 남은 작업 강조

#### 2부: 입력 방법 (5분)
- 슬라이드 8-18
- Excel 템플릿 **실제로 보여주기**

#### 3부: 회의 안건 (5분)
- 슬라이드 19-23
- 담당자, 일정 함께 정하기

#### 4부: 웹사이트 시연 (5분)
- 브라우저로 전환
- 실제 웹사이트 둘러보기
- 다국어 전환 시연

#### 5부: Q&A (5-10분)
- 슬라이드 37
- 질문 받기

---

## 🖥️ 발표 환경 설정

### 프로젝터/대형 모니터 사용 시

#### PowerPoint 사용
```bash
# PPTX로 변환
marp docs/meeting-presentation-slides.md --pptx -o presentation.pptx

# PowerPoint 열기
# 발표자 모드 사용 권장
```

#### PDF 사용
```bash
# PDF로 변환
marp docs/meeting-presentation-slides.md --pdf -o presentation.pdf

# Adobe Reader 또는 브라우저로 열기
# 전체 화면 모드 (F11)
```

### 노트북 화면 공유 시 (Zoom, Teams 등)

#### VSCode 미리보기 사용
1. VSCode에서 `meeting-presentation-slides.md` 열기
2. 미리보기 화면 전체 화면으로 전환
3. 화면 공유 시작

#### HTML로 변환 (추천)
```bash
marp docs/meeting-presentation-slides.md --html -o presentation.html

# 브라우저로 presentation.html 열기
# 전체 화면 모드 (F11)
```

---

## 🔧 문제 해결

### Q: Marp 확장이 작동하지 않아요

**A:** VSCode 재시작 후 다시 시도하세요.

```bash
# VSCode 완전히 종료 후 재실행
```

---

### Q: PowerPoint로 변환이 안 돼요

**A1:** Marp CLI 설치 확인

```bash
npm list -g @marp-team/marp-cli

# 없으면 설치
npm install -g @marp-team/marp-cli
```

**A2:** Node.js 버전 확인

```bash
node --version

# 14 이상 필요. 낮으면 업데이트
```

---

### Q: 한글이 깨져요

**A:** 파일 인코딩을 UTF-8로 저장:

1. VSCode 하단 상태바에서 "UTF-8" 확인
2. 아니면 "UTF-8로 다시 열기"

---

### Q: 이미지를 추가하고 싶어요

**A:** 마크다운 이미지 문법 사용:

```markdown
![설명](이미지URL)

# 예시
![로고](https://example.com/logo.png)
```

---

## 📱 온라인 발표 도구

### Google Slides로 변환

1. PPTX로 변환
2. Google Drive에 업로드
3. "Google Slides에서 열기"

### SlideShare에 업로드

1. PDF로 변환
2. https://www.slideshare.net/ 업로드
3. 링크 공유

---

## 🎨 테마 변경

### 내장 테마 사용

```yaml
---
theme: default  # 기본
theme: gaia     # 우아한 디자인
theme: uncover  # 큰 제목
---
```

### 커스텀 CSS

`meeting-presentation-slides.md`의 `<style>` 섹션 수정:

```css
section {
  font-family: 'Segoe UI', 'Malgun Gothic', sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #1e3a8a;
  border-bottom: 3px solid #3b82f6;
}
```

---

## 📤 파일 공유

### 이메일 첨부

**권장:**
- PDF (인쇄 가능)
- PPTX (편집 가능)

**크기:**
- PDF: 약 1-3MB
- PPTX: 약 2-5MB

### 클라우드 링크

**Google Drive:**
1. PPTX 업로드
2. "링크 가져오기"
3. "링크가 있는 모든 사용자" 설정

**Dropbox/OneDrive:**
동일한 방법

---

## 📊 인쇄

### PDF로 변환 후 인쇄

```bash
# PDF 생성
marp docs/meeting-presentation-slides.md --pdf -o presentation.pdf

# Adobe Reader나 브라우저에서 인쇄
# 권장: 6슬라이드/페이지 (핸드아웃)
```

### PowerPoint에서 인쇄

```
파일 → 인쇄 → 설정
- 전체 슬라이드
- 유인물 (6슬라이드/페이지)
- 컬러 또는 흑백
```

---

## ⚡ Quick Commands

### 한 번에 모든 형식 생성

```bash
# PPTX, PDF, HTML 한 번에
marp docs/meeting-presentation-slides.md --pptx --pdf --html

# 결과 파일:
# - meeting-presentation-slides.pptx
# - meeting-presentation-slides.pdf
# - meeting-presentation-slides.html
```

### 파일명 지정

```bash
# 원하는 파일명으로 저장
marp docs/meeting-presentation-slides.md \
  --pptx -o "정호그룹_웹사이트_발표자료.pptx"
```

---

## 📚 추가 자료

- **Marp 공식 문서:** https://marp.app/
- **Marp CLI 가이드:** https://github.com/marp-team/marp-cli
- **VSCode 확장:** https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode

---

## ✅ 체크리스트: 발표 준비

### 전날
- [ ] Marp 확장 또는 CLI 설치
- [ ] PPTX/PDF 변환 테스트
- [ ] 웹사이트 접속 확인
- [ ] Excel 템플릿 파일 준비

### 당일 (1시간 전)
- [ ] 프로젝터/화면 공유 테스트
- [ ] 웹사이트 탭 미리 열기
- [ ] 발표 자료 백업 (USB, 클라우드)
- [ ] 타이머 설정

### 발표 시작 전
- [ ] 참석자 확인
- [ ] 시간 확인
- [ ] 질문 시간 공지

---

**발표 준비 완료! 화이팅! 💪**

