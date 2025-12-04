# 일루텍 제품 이미지 가이드

## 📁 이미지 저장 위치
이 폴더(`public/images/illutech/products/`)에 5개 제품의 대표 이미지를 저장하세요.

---

## 🖼️ 필요한 이미지 파일

### 1. **원전형 LED 조명**
- 파일명: `nuclear-led.jpg`
- 추천 이미지: 원자력 발전소 내부 조명, 특수 LED 조명 제품 사진 등
- 권장 크기: 800x600px 이상 (가로형 4:3 비율)
- 형식: JPG, PNG

### 2. **방폭형 LED 조명**
- 파일명: `explosion-proof-led.jpg`
- 추천 이미지: 방폭 인증 LED 조명 제품, 위험 지역 설치 사진 등
- 권장 크기: 800x600px 이상 (가로형 4:3 비율)
- 형식: JPG, PNG

### 3. **일반 공장용 조명등**
- 파일명: `factory-led.jpg`
- 추천 이미지: 공장 내부 조명, 산업용 LED 조명 제품, 작업 현장 사진 등
- 권장 크기: 800x600px 이상 (가로형 4:3 비율)
- 형식: JPG, PNG

### 4. **LED 보안등**
- 파일명: `security-led.jpg`
- 추천 이미지: 보안등 제품 사진, 야간 보안 조명 설치 사진 등
- 권장 크기: 800x600px 이상 (가로형 4:3 비율)
- 형식: JPG, PNG

### 5. **횡단보도 안전등**
- 파일명: `crosswalk-safety-led.jpg`
- 추천 이미지: 횡단보도 안전 조명, 보행자 안전 시설 사진 등
- 권장 크기: 800x600px 이상 (가로형 4:3 비율)
- 형식: JPG, PNG

---

## 📝 이미지 변경 방법

### **방법 1: 이미지 파일 직접 교체 (권장)**
1. 위의 파일명으로 이미지를 이 폴더에 저장
2. Git 커밋 & 푸시
3. 배포 자동 반영

```bash
# 예시
git add public/images/illutech/products/
git commit -m "feat: 일루텍 제품 이미지 추가"
git push origin main
```

### **방법 2: JSON 파일에서 이미지 경로 변경**
`public/data/illutech-products.json` 파일에서 `imagePath` 값을 변경할 수 있습니다.

```json
{
  "id": "nuclear-led",
  "imagePath": "/images/illutech/products/nuclear-led.jpg"
}
```

---

## 🎨 이미지 권장 사양

- **해상도**: 최소 800x600px, 권장 1200x900px
- **비율**: 가로형 4:3 비율 권장
- **형식**: JPG, PNG (WebP 지원)
- **용량**: 300KB 이하 권장 (로딩 속도 최적화)
- **배경**: 밝고 선명한 제품/현장 사진 추천
- **구도**: 제품이 중앙에 위치하거나 실제 설치된 모습

---

## 💡 이미지 촬영/선택 팁

1. **원전형 LED 조명**: 안전성과 전문성이 느껴지는 이미지
2. **방폭형 LED 조명**: 견고하고 안전한 느낌의 이미지
3. **일반 공장용 조명등**: 밝고 작업하기 좋은 환경의 이미지
4. **LED 보안등**: 야간에도 밝고 안전한 느낌의 이미지
5. **횡단보도 안전등**: 보행자가 안전하게 횡단하는 이미지

---

## ⚠️ 주의사항

1. 파일명은 **정확히 일치**해야 합니다 (대소문자 구분)
2. 한글 파일명은 피하세요 (영문 + 하이픈 사용)
3. 이미지가 없으면 자동으로 아이콘 + "이미지 준비중" 텍스트가 표시됩니다
4. 이미지 변경 후 **브라우저 캐시를 새로고침**(Ctrl+F5)하세요
5. 제품 이미지는 저작권이 없는 이미지를 사용하세요

---

## 📌 현재 상태

- ⬜ nuclear-led.jpg (준비중)
- ⬜ explosion-proof-led.jpg (준비중)
- ⬜ factory-led.jpg (준비중)
- ⬜ security-led.jpg (준비중)
- ⬜ crosswalk-safety-led.jpg (준비중)

---

## 🔗 관련 파일

- **JSON 데이터**: `public/data/illutech-products.json`
- **컴포넌트**: `src/pages/v2/subsidiaries/IllutechDetailPage.js`
- **이미지 폴더**: `public/images/illutech/products/`

---

## 🎯 빠른 시작

1. 5개 이미지 준비
2. 파일명을 위의 가이드대로 변경
3. `public/images/illutech/products/` 폴더에 복사
4. Git 커밋 & 푸시
5. 완료! 🎉





