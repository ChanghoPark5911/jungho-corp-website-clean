# 📄 기술자료 데이터 저장소

이 폴더는 웹사이트의 PDF 기술자료 정보를 저장합니다.

## 📁 파일 구조

```
public/data/
├── technical-docs.json  ← PDF 기술자료 정보
└── README.md           ← 이 파일
```

## 🔧 사용 방법

### 1. 관리자 페이지에서 PDF 추가/수정
```
http://localhost:3000/admin
→ "미디어 콘텐츠 관리" 탭
→ "PDF 기술자료 관리" 섹션
→ 자료 추가/수정
```

### 2. JSON 파일 내보내기
```
→ "💾 JSON 파일로 저장 (배포용)" 버튼 클릭
→ technical-docs.json 파일 다운로드
```

### 3. 프로젝트에 파일 추가
```
다운로드한 파일을 이 폴더(public/data/)에 복사하여 덮어쓰기
```

### 4. Git 커밋 & 배포
```bash
git add public/data/technical-docs.json
git commit -m "Update technical documents"
git push
```

### 5. Vercel 자동 배포 (2-3분)
```
→ 웹사이트에 반영 완료!
```

## 📊 데이터 구조

```json
{
  "documents": [
    {
      "id": 1234567890,
      "title": "문서 제목",
      "category": "technical",
      "description": "문서 설명",
      "fileUrl": "/documents/clarus/filename.pdf",
      "fileName": "filename.pdf",
      "fileSize": "2.5MB",
      "subsidiary": "clarus",
      "date": "2025-11-12",
      "downloads": 0,
      "language": "ko",
      "tags": [],
      "thumbnail": "📄"
    }
  ],
  "lastUpdated": "2025-11-12T15:29:00+09:00",
  "version": "1.0.0"
}
```

## ⚠️ 주의사항

1. **직접 수정 가능**: 이 JSON 파일을 직접 편집할 수도 있습니다.
2. **백업**: Git으로 자동 백업됩니다.
3. **버전 관리**: 모든 변경 이력이 Git에 저장됩니다.
4. **안전성**: localStorage와 달리 절대 사라지지 않습니다!

## 🎯 장점

✅ 영구 보관 (Git + GitHub + Vercel)
✅ 버전 관리 (언제든 이전 버전으로 복구)
✅ 백업 자동
✅ 캐시 삭제해도 안전
✅ 모든 브라우저에서 동일
✅ 협업 가능

