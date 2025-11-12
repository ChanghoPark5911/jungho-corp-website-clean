# 📄 PDF 문서 저장소

이 폴더에 PDF 기술자료를 저장하세요.

## 📁 폴더 구조 (예시)

```
documents/
  ├── clarus/
  │   ├── clarus-catalog-2024.pdf
  │   ├── lighting-control-spec.pdf
  │   └── smart-lighting-guide.pdf
  ├── tlc/
  │   ├── building-automation-guide.pdf
  │   ├── energy-management-spec.pdf
  │   └── tlc-product-catalog.pdf
  ├── illutech/
  │   ├── led-lighting-catalog.pdf
  │   └── industrial-lighting-spec.pdf
  ├── texcom/
  │   └── textile-machinery-catalog.pdf
  └── group/
      └── jungho-group-introduction.pdf
```

## 🔗 관리자 페이지에서 URL 입력 방법

### ✅ 올바른 경로 (상대 경로)
```
/documents/clarus/clarus-catalog-2024.pdf
/documents/tlc/building-automation-guide.pdf
/documents/illutech/led-lighting-catalog.pdf
```

### ✅ 올바른 경로 (절대 경로 - 배포 후)
```
https://jungho-corp-website-clean.vercel.app/documents/clarus/clarus-catalog-2024.pdf
```

## 📝 사용 단계

### 1️⃣ PDF 파일 추가
이 폴더에 PDF 파일을 복사/붙여넣기 하세요.

### 2️⃣ 관리자 페이지에서 등록
1. http://localhost:3000/v2/admin 접속
2. "미디어 콘텐츠 관리" 탭 선택
3. "📄 PDF 기술자료 관리" 섹션에서 "새 자료 추가"
4. 정보 입력:
   - 제목: 클라루스 제품 카탈로그 2024
   - 카테고리: 제품 카탈로그
   - 계열사: 클라루스
   - **PDF 파일 URL**: `/documents/clarus/clarus-catalog-2024.pdf`
   - 파일명: clarus-catalog-2024.pdf
   - 파일 크기: 5.2MB
   - 설명: 클라루스 조명 제어 시스템 전체 라인업
   - 언어: 한국어 / 영어
   - 등록 날짜: 2024-11-12

5. "💾 저장" 버튼 클릭

### 3️⃣ 확인
- 기술자료실: http://localhost:3000/v2/media/technical-docs
- 계열사 페이지: http://localhost:3000/subsidiaries/clarus (하단 스크롤)

## 🚀 배포 시 주의사항

이 폴더의 모든 파일은 GitHub에 커밋되고 Vercel에 자동 배포됩니다:

```bash
git add public/documents/
git commit -m "Add PDF technical documents"
git push
```

## 📊 권장 사항

### ✅ 좋은 관행
- 파일명은 영문 소문자와 하이픈 사용: `clarus-catalog-2024.pdf`
- 계열사별 하위 폴더로 정리
- 파일 크기는 10MB 이하 권장 (GitHub 제한)
- 버전 관리: 파일명에 연도 포함

### ❌ 피해야 할 것
- 한글 파일명 (URL 인코딩 문제)
- 공백 포함 파일명
- 너무 큰 파일 (50MB 이상)

## 💡 추가 팁

### 대용량 파일의 경우
10MB 이상의 대용량 PDF는 외부 스토리지 사용을 권장합니다:
- Google Drive (공개 링크)
- AWS S3
- Dropbox

### Git LFS (Large File Storage) 사용
매우 큰 파일이 많다면 Git LFS를 고려하세요:
```bash
git lfs install
git lfs track "*.pdf"
git add .gitattributes
```

---

**문의사항**: 추가 도움이 필요하시면 관리자에게 문의하세요.

