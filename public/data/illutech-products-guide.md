# 일루텍 제품 데이터 관리 가이드

## 📋 개요
일루텍의 주요 제품 섹션은 `illutech-products.json` 파일로 관리됩니다.

---

## 📂 파일 위치
```
public/data/illutech-products.json
```

---

## 🛠️ 데이터 구조

```json
{
  "products": [
    {
      "id": "고유 ID (영문)",
      "icon": "이모지 아이콘",
      "nameKo": "한글 제품명",
      "nameEn": "영어 제품명",
      "descriptionKo": "한글 설명",
      "descriptionEn": "영어 설명",
      "imagePath": "/images/illutech/products/이미지파일명.jpg"
    }
  ]
}
```

---

## ✏️ 수정 방법

### 1. **제품 내용 수정**
`public/data/illutech-products.json` 파일을 직접 수정하세요.

**예시: 원전형 LED 조명 설명 변경**
```json
{
  "id": "nuclear-led",
  "descriptionKo": "새로운 설명 내용",
  "descriptionEn": "New description"
}
```

### 2. **이미지 변경**
1. 새 이미지를 `public/images/illutech/products/` 폴더에 저장
2. JSON 파일의 `imagePath` 수정
3. Git 커밋 & 푸시

**예시:**
```json
{
  "id": "nuclear-led",
  "imagePath": "/images/illutech/products/new-nuclear-led.jpg"
}
```

### 3. **새로운 제품 추가**
`products` 배열에 새 객체를 추가하세요.

**예시: 6번째 제품 추가**
```json
{
  "products": [
    // 기존 5개...
    {
      "id": "street-led",
      "icon": "💡",
      "nameKo": "LED 가로등",
      "nameEn": "Street LED Lighting",
      "descriptionKo": "에너지 절약형 가로등으로 도시를 밝힙니다",
      "descriptionEn": "Energy-efficient street lighting illuminating cities",
      "imagePath": "/images/illutech/products/street-led.jpg"
    }
  ]
}
```

### 4. **제품 삭제**
해당 제품 객체를 `products` 배열에서 제거하세요.

---

## 🎨 아이콘 선택 가이드

| 제품 | 추천 아이콘 |
|------|-----------|
| 원전형 LED | ⚛️ 🔬 ⚡ |
| 방폭형 LED | 🔥 💥 🛡️ |
| 공장용 조명 | 🏭 🏗️ ⚙️ |
| 보안등 | 🔦 💡 🔒 |
| 횡단보도 안전등 | 🚶 🚦 ⚠️ |

---

## 🔄 영구 저장 절차

### **단계별 가이드**

#### 1. JSON 파일 수정
```bash
# 파일 열기
code public/data/illutech-products.json

# 내용 수정 후 저장
```

#### 2. 이미지 추가 (선택사항)
```bash
# 이미지를 해당 폴더에 복사
cp [원본경로]/new-image.jpg public/images/illutech/products/
```

#### 3. Git 커밋
```bash
git add public/data/illutech-products.json
git add public/images/illutech/products/
git commit -m "feat: 일루텍 제품 데이터 업데이트"
```

#### 4. Git 푸시
```bash
git push origin main
```

#### 5. 배포 확인
- Vercel이 자동으로 배포를 시작합니다
- 약 1-2분 후 배포 완료
- `https://your-domain.com/subsidiaries/illutech`에서 확인

---

## 📌 체크리스트

배포 전 확인사항:

- [ ] JSON 파일 문법 오류 확인 (쉼표, 따옴표 등)
- [ ] 이미지 파일 경로 정확성 확인
- [ ] 한글/영어 번역 일관성 확인
- [ ] 이미지 용량 최적화 (300KB 이하 권장)
- [ ] 5개 제품이 모두 포함되어 있는지 확인
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
1. **경로 확인**: `/images/illutech/products/파일명.jpg` 형식
2. **파일명 확인**: 대소문자 정확히 일치
3. **파일 존재 확인**: `public/images/illutech/products/` 폴더 내 파일 확인
4. **이미지 형식**: JPG, PNG만 지원

### 제품이 표시되지 않을 때
1. **배열 확인**: `products` 배열이 올바르게 구성되어 있는지 확인
2. **필수 필드**: 모든 필드(id, icon, nameKo, nameEn 등)가 있는지 확인
3. **쉼표 확인**: 마지막 객체 뒤에는 쉼표가 없어야 함

---

## 💡 팁

1. **이미지 최적화 도구**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
2. **JSON 편집기**: VS Code의 JSON 스키마 자동완성 활용
3. **버전 관리**: 중요한 변경 전 브랜치 생성 권장
4. **테스트 환경**: 로컬에서 충분히 테스트 후 배포
5. **이미지 비율**: 모든 제품 이미지를 동일한 비율로 유지

---

## 📊 현재 제품 목록

1. ⚛️ 원전형 LED 조명
2. 🔥 방폭형 LED 조명
3. 🏭 일반 공장용 조명등
4. 🔦 LED 보안등
5. 🚶 횡단보도 안전등

---

## 📞 문의

추가 문의사항이 있으시면 개발팀에 연락주세요.






