# 클라루스 핵심 역량 데이터 관리 가이드

## 📋 개요
클라루스의 4대 핵심 역량 섹션은 `clarus-competencies.json` 파일로 관리됩니다.

---

## 📂 파일 위치
```
public/data/clarus-competencies.json
```

---

## 🛠️ 데이터 구조

```json
{
  "competencies": [
    {
      "id": "고유 ID (영문)",
      "icon": "이모지 아이콘",
      "titleKo": "한글 제목",
      "titleEn": "영어 제목",
      "subtitleKo": "한글 부제목",
      "subtitleEn": "영어 부제목",
      "descriptionKo": "한글 설명",
      "descriptionEn": "영어 설명",
      "features": [
        {
          "ko": "한글 특징",
          "en": "영어 특징"
        }
      ],
      "imagePath": "/images/clarus/competencies/이미지파일명.jpg",
      "borderColor": "카드 테두리 색상 (cyan/blue/emerald/red)"
    }
  ]
}
```

---

## ✏️ 수정 방법

### 1. **텍스트 내용 수정**
`public/data/clarus-competencies.json` 파일을 직접 수정하세요.

**예시: R&D Center 설명 변경**
```json
{
  "id": "rnd-center",
  "descriptionKo": "새로운 설명 내용",
  "descriptionEn": "New description"
}
```

### 2. **이미지 변경**
1. 새 이미지를 `public/images/clarus/competencies/` 폴더에 저장
2. JSON 파일의 `imagePath` 수정
3. Git 커밋 & 푸시

**예시:**
```json
{
  "id": "rnd-center",
  "imagePath": "/images/clarus/competencies/new-rnd-image.jpg"
}
```

### 3. **새로운 역량 추가**
`competencies` 배열에 새 객체를 추가하세요.

**예시: 5번째 역량 추가**
```json
{
  "competencies": [
    // 기존 4개...
    {
      "id": "quality-control",
      "icon": "✅",
      "titleKo": "품질관리",
      "titleEn": "Quality Control",
      "subtitleKo": "QC 시스템",
      "subtitleEn": "QC System",
      "descriptionKo": "철저한 품질관리로 최상의 제품을 제공합니다",
      "descriptionEn": "Providing the best products through thorough quality control",
      "features": [
        { "ko": "ISO 9001 인증", "en": "ISO 9001 Certified" },
        { "ko": "전수검사 시스템", "en": "100% Inspection System" }
      ],
      "imagePath": "/images/clarus/competencies/quality-control.jpg",
      "borderColor": "purple"
    }
  ]
}
```

---

## 🎨 색상 옵션

| borderColor | 테두리 색상 | 아이콘 배경 |
|-------------|------------|------------|
| `cyan`      | 하늘색      | Cyan → Blue |
| `blue`      | 파란색      | Blue → Indigo |
| `emerald`   | 에메랄드    | Emerald → Teal |
| `red`       | 빨간색      | Red → Pink |
| `purple`    | 보라색      | Purple → Fuchsia |
| `orange`    | 주황색      | Orange → Amber |
| `green`     | 초록색      | Green → Lime |

---

## 🔄 영구 저장 절차

### **단계별 가이드**

#### 1. JSON 파일 수정
```bash
# 파일 열기
code public/data/clarus-competencies.json

# 내용 수정 후 저장
```

#### 2. 이미지 추가 (선택사항)
```bash
# 이미지를 해당 폴더에 복사
cp [원본경로]/new-image.jpg public/images/clarus/competencies/
```

#### 3. Git 커밋
```bash
git add public/data/clarus-competencies.json
git add public/images/clarus/competencies/
git commit -m "feat: 클라루스 핵심 역량 데이터 업데이트"
```

#### 4. Git 푸시
```bash
git push origin main
```

#### 5. 배포 확인
- Vercel이 자동으로 배포를 시작합니다
- 약 1-2분 후 배포 완료
- `https://your-domain.com/subsidiaries/clarus`에서 확인

---

## 📌 체크리스트

배포 전 확인사항:

- [ ] JSON 파일 문법 오류 확인 (쉼표, 따옴표 등)
- [ ] 이미지 파일 경로 정확성 확인
- [ ] 한글/영어 번역 일관성 확인
- [ ] 이미지 용량 최적화 (200KB 이하 권장)
- [ ] 로컬에서 테스트 (`npm start`)
- [ ] Git 커밋 메시지 작성
- [ ] 배포 후 실제 사이트 확인

---

## 🆘 문제 해결

### JSON 파일이 적용되지 않을 때
1. **브라우저 캐시 삭제**: Ctrl + Shift + R (하드 리프레시)
2. **콘솔 확인**: F12 → Console 탭에서 에러 메시지 확인
3. **JSON 문법 검증**: [JSONLint](https://jsonlint.com/)에서 파일 검증

### 이미지가 표시되지 않을 때
1. **경로 확인**: `/images/clarus/competencies/파일명.jpg` 형식
2. **파일명 확인**: 대소문자 정확히 일치
3. **파일 존재 확인**: `public/images/clarus/competencies/` 폴더 내 파일 확인
4. **이미지 형식**: JPG, PNG, WebP만 지원

---

## 💡 팁

1. **이미지 최적화 도구**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
2. **JSON 편집기**: VS Code의 JSON 스키마 자동완성 활용
3. **버전 관리**: 중요한 변경 전 브랜치 생성 권장
4. **테스트 환경**: 로컬에서 충분히 테스트 후 배포

---

## 📞 문의

추가 문의사항이 있으시면 개발팀에 연락주세요.








