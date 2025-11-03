# Excel → Firebase 업로드 스크립트 사용 가이드

## 🎯 개요

Excel (CSV) 파일에 작성된 데이터를 Firebase에 자동으로 업로드하는 도구입니다.

---

## 📋 사전 준비

### 1. Node.js 패키지 설치

처음 한 번만 실행하세요:

```bash
npm install csv-parser dotenv
```

### 2. 파일 준비

#### CSV 파일
- `docs/excel-templates/` 폴더의 템플릿을 사용하여 작성
- **CSV UTF-8** 형식으로 저장
- 파일 위치: `data/` 폴더 (권장)

#### 이미지 파일
- 프로젝트 이미지: `images/projects/` 폴더
- 뉴스 이미지: `images/news/` 폴더
- CSV에 기록된 파일명과 정확히 일치해야 함

### 3. 폴더 구조 예시

```
jungho-corp-website-clean/
├── data/
│   ├── projects-20241103.csv
│   └── news-20241103.csv
├── images/
│   ├── projects/
│   │   ├── seoul-cityhall-main.jpg
│   │   ├── seoul-cityhall-01.jpg
│   │   └── ...
│   └── news/
│       ├── news-product-launch.jpg
│       └── ...
├── scripts/
│   ├── upload-excel-to-firebase.js
│   └── README.md
└── ...
```

---

## 🚀 사용 방법

### 기본 명령어

```bash
node scripts/upload-excel-to-firebase.js <데이터타입> <CSV파일경로> [이미지폴더경로]
```

### 파라미터

- `<데이터타입>`: `projects` 또는 `news`
- `<CSV파일경로>`: CSV 파일의 경로
- `[이미지폴더경로]`: (선택) 이미지 파일들이 있는 폴더 경로

---

## 📝 사용 예시

### 1. 시공실적 업로드 (이미지 포함)

```bash
node scripts/upload-excel-to-firebase.js projects data/projects-20241103.csv images/projects/
```

### 2. 뉴스 업로드 (이미지 포함)

```bash
node scripts/upload-excel-to-firebase.js news data/news-20241103.csv images/news/
```

### 3. 데이터만 업로드 (이미지 없음)

```bash
node scripts/upload-excel-to-firebase.js projects data/projects-20241103.csv
```

---

## 🎬 실행 과정

### 1. 스크립트 실행

```bash
node scripts/upload-excel-to-firebase.js projects data/projects.csv images/projects/
```

### 2. 진행 상황 표시

```
==================================================
🚀 Excel → Firebase 업로드 시작
==================================================
📁 파일: data/projects.csv
📂 타입: projects
🖼️  이미지: images/projects/
==================================================

📊 총 10개의 프로젝트 발견

[1/10] 처리 중: 서울시청 스마트 조명 시스템
   ✅ 이미지 업로드 성공: seoul-cityhall-main.jpg
   ✅ 이미지 업로드 성공: seoul-cityhall-01.jpg
   ✅ 추가 완료

[2/10] 처리 중: 삼성물산 물류센터
   ✅ 이미지 업로드 성공: logistics-main.jpg
   ✅ 업데이트 완료

...
```

### 3. 최종 결과

```
==================================================
📊 최종 결과
==================================================
✅ 새로 추가: 8개
🔄 업데이트: 2개
❌ 오류: 0개
📊 총 처리: 10개
==================================================

✅ 모든 작업이 완료되었습니다!
```

---

## 🔄 업데이트 동작

### 중복 확인
- **한글 제목**을 기준으로 기존 데이터 확인
- 같은 제목이 있으면 → **업데이트**
- 없으면 → **새로 추가**

### 업데이트 시 주의사항
- 기존 데이터를 **덮어쓰기**합니다
- 백업이 필요하면 Firebase Console에서 수동 백업

---

## ⚠️ 주의사항

### 1. CSV 파일 형식
- **UTF-8 인코딩** 필수
- 첫 번째 행은 **헤더**여야 함 (컬럼명)
- 템플릿의 컬럼명과 **정확히 일치**해야 함

### 2. 이미지 파일
- **파일명 대소문자** 정확히 일치해야 함
  - OK: `seoul-cityhall-main.jpg`
  - NG: `Seoul-CityHall-Main.JPG`
- 지원 형식: JPG, PNG, GIF, WebP
- 최대 크기: 5MB (권장)

### 3. 카테고리
- 정해진 카테고리 값을 **정확히** 입력
- **프로젝트:** 스마트빌딩, 스마트시티, 산업용, 리테일, 의료시설, 호텔
- **뉴스:** technology, business, esg, awards, announcement

### 4. 날짜 형식
- **YYYY-MM-DD** 형식 사용
- 예: `2024-11-03`

---

## 🐛 문제 해결

### 오류: "파일을 찾을 수 없습니다"

**원인:** CSV 파일 경로가 잘못됨

**해결:**
```bash
# 현재 위치 확인
pwd

# 파일 존재 확인
ls -la data/

# 정확한 경로로 다시 실행
node scripts/upload-excel-to-firebase.js projects data/projects.csv
```

---

### 오류: "이미지 파일 없음"

**원인:** 이미지 파일명이 CSV와 다르거나 폴더가 잘못됨

**해결:**
1. CSV 파일에 기록된 파일명 확인
2. 실제 이미지 파일명 확인 (대소문자 주의)
3. 이미지 폴더 경로 확인

```bash
# 이미지 파일 목록 확인
ls -la images/projects/
```

---

### 오류: "한글이 깨짐"

**원인:** CSV 파일이 UTF-8로 저장되지 않음

**해결:**
1. Excel에서 "다른 이름으로 저장"
2. 파일 형식: **CSV UTF-8 (쉼표로 분리)** 선택
3. 저장 후 다시 시도

---

### 오류: "Firebase 연결 실패"

**원인:** Firebase 설정 오류

**해결:**
1. `.env` 파일 존재 확인
2. Firebase 설정값 확인
```bash
cat .env
```
3. Firebase Console에서 API 키 확인

---

## 📊 데이터 확인

### Firebase Console에서 확인

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택
3. **Firestore Database** 클릭
4. `projects` 또는 `news` 컬렉션 확인

### 웹사이트에서 확인

1. 웹사이트 접속
2. Projects 또는 News 페이지로 이동
3. 업로드된 데이터 확인

---

## 🔐 보안 주의사항

### 1. 민감 정보 제외
CSV 파일에 다음 정보를 포함하지 마세요:
- 고객 연락처
- 계약 금액
- 내부 기밀 정보

### 2. 파일 관리
- CSV 파일과 이미지는 작업 후 **백업**
- 불필요한 파일은 삭제
- Git에 커밋하지 않도록 주의 (`.gitignore` 확인)

---

## 🆘 지원

### 오류 발생 시

1. **오류 메시지 복사**
2. **실행 명령어 복사**
3. **CSV 파일 첫 5행** 복사
4. 개발팀에 전달

### 개발팀 연락

- 이메일: [담당자 이메일]
- Slack: #tech-support
- 전화: [담당자 전화]

---

## 📚 추가 자료

- [Firebase 문서](https://firebase.google.com/docs)
- [CSV 형식 가이드](https://en.wikipedia.org/wiki/Comma-separated_values)
- [Excel CSV UTF-8 저장 방법](https://support.microsoft.com/ko-kr/office/csv-%ED%8C%8C%EC%9D%BC-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0-%EB%98%90%EB%8A%94-%EB%82%B4%EB%B3%B4%EB%82%B4%EA%B8%B0-dfa1c6b1-5a3e-4ea8-8ee2-b6bd5beb85e5)

---

**최종 수정:** 2025-11-03

