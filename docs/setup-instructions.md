# Excel → Firebase 도구 설정 가이드

## 📦 1. 필요한 패키지 설치

터미널에서 다음 명령어를 실행하세요:

```bash
npm install csv-parser
```

**설명:**
- `csv-parser`: CSV 파일을 읽기 위한 패키지
- `dotenv`: 이미 설치되어 있음 (`.env` 파일 읽기용)
- `firebase`: 이미 설치되어 있음 (Firebase 연동용)

---

## 📁 2. 폴더 구조 생성

다음 폴더들을 생성하세요:

```bash
# Windows (PowerShell)
New-Item -ItemType Directory -Path "data", "images\projects", "images\news"

# Mac/Linux
mkdir -p data images/projects images/news
```

**생성되는 구조:**
```
jungho-corp-website-clean/
├── data/                    ← CSV 파일 저장
├── images/
│   ├── projects/           ← 프로젝트 이미지
│   └── news/               ← 뉴스 이미지
├── docs/
│   ├── excel-templates/    ← Excel 템플릿 (이미 있음)
│   └── ...
└── scripts/                ← 업로드 스크립트 (이미 있음)
```

---

## 📝 3. .gitignore 업데이트 (선택사항)

개인 데이터가 Git에 커밋되지 않도록 `.gitignore`에 추가:

```bash
# .gitignore 파일 끝에 추가
/data/
/images/
```

---

## ✅ 4. 설치 확인

### 패키지 설치 확인

```bash
npm list csv-parser
```

**기대 출력:**
```
jungho-corp-website@0.1.0
└── csv-parser@3.0.0
```

### 폴더 확인

```bash
# Windows
dir data
dir images\projects
dir images\news

# Mac/Linux
ls -la data/
ls -la images/projects/
ls -la images/news/
```

---

## 🧪 5. 테스트 실행

### 테스트 데이터 복사

템플릿 파일을 `data/` 폴더로 복사:

```bash
# Windows
copy docs\excel-templates\projects-template.csv data\projects-test.csv
copy docs\excel-templates\news-template.csv data\news-test.csv

# Mac/Linux
cp docs/excel-templates/projects-template.csv data/projects-test.csv
cp docs/excel-templates/news-template.csv data/news-test.csv
```

### 테스트 이미지 준비 (선택사항)

테스트용 이미지 파일을 `images/projects/` 폴더에 넣어보세요.

### 스크립트 실행 (Dry Run)

```bash
# 프로젝트 업로드 테스트 (이미지 없이)
node scripts/upload-excel-to-firebase.js projects data/projects-test.csv

# 뉴스 업로드 테스트 (이미지 없이)
node scripts/upload-excel-to-firebase.js news data/news-test.csv
```

**주의:** 이 명령어는 실제로 Firebase에 데이터를 업로드합니다!  
테스트 데이터로만 실행하세요.

---

## 🔧 6. 문제 해결

### 오류: "Cannot find module 'csv-parser'"

**해결:**
```bash
npm install csv-parser
```

### 오류: "ENOENT: no such file or directory"

**해결:**
1. 폴더가 생성되었는지 확인
2. 파일 경로가 올바른지 확인

### 오류: "Firebase: Error (auth/invalid-api-key)"

**해결:**
1. `.env` 파일이 있는지 확인
2. Firebase 설정값이 올바른지 확인

---

## 📚 7. 다음 단계

설정이 완료되었습니다! 이제 다음 문서를 참고하세요:

1. **Excel 템플릿 작성:**
   - `docs/excel-templates/README.md`

2. **스크립트 사용법:**
   - `scripts/README.md`

3. **전체 프로세스:**
   - `docs/website-overview-for-meeting.md`

---

## ✅ 체크리스트

설정이 완료되었는지 확인하세요:

- [ ] `csv-parser` 패키지 설치 완료
- [ ] `data/` 폴더 생성 완료
- [ ] `images/projects/` 폴더 생성 완료
- [ ] `images/news/` 폴더 생성 완료
- [ ] `.gitignore` 업데이트 완료 (선택사항)
- [ ] 테스트 실행 성공

---

**설정 완료! 🎉**

이제 Excel 템플릿을 사용하여 데이터를 입력하고 업로드할 수 있습니다.

