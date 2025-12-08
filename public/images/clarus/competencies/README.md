# 클라루스 핵심 역량 이미지 가이드

## 📁 이미지 저장 위치
이 폴더(`public/images/clarus/competencies/`)에 4개 핵심 역량의 대표 이미지를 저장하세요.

---

## 🖼️ 필요한 이미지 파일

### 1. **R&D Center (연구개발센터)**
- 파일명: `rnd-center.jpg`
- 추천 이미지: 연구소 시설, 연구원들이 작업하는 모습, 실험 장비 등
- 권장 크기: 500x500px 이상
- 형식: JPG, PNG

### 2. **Production Facility (생산시설)**
- 파일명: `production-facility.jpg`
- 추천 이미지: 생산 라인, 제조 현장, 품질 검사 모습 등
- 권장 크기: 500x500px 이상
- 형식: JPG, PNG

### 3. **Export Business (해외수출)**
- 파일명: `export-business.jpg`
- 추천 이미지: 세계 지도, 컨테이너, 글로벌 비즈니스 이미지 등
- 권장 크기: 500x500px 이상
- 형식: JPG, PNG

### 4. **Online Shopping Mall (온라인 영업)**
- 파일명: `online-shopping.jpg`
- 추천 이미지: 온라인 쇼핑몰 화면, 모바일 앱, 고객 서비스 등
- 권장 크기: 500x500px 이상
- 형식: JPG, PNG

---

## 📝 이미지 변경 방법

### **방법 1: 이미지 파일 직접 교체**
1. 위의 파일명으로 이미지를 이 폴더에 저장
2. Git 커밋 & 푸시
3. 배포 자동 반영

```bash
# 예시
git add public/images/clarus/competencies/
git commit -m "feat: 클라루스 핵심 역량 이미지 추가"
git push origin main
```

### **방법 2: JSON 파일에서 이미지 경로 변경**
`public/data/clarus-competencies.json` 파일에서 `imagePath` 값을 변경할 수 있습니다.

```json
{
  "id": "rnd-center",
  "imagePath": "/images/clarus/competencies/rnd-center.jpg"
}
```

---

## 🎨 이미지 권장 사양

- **해상도**: 최소 500x500px, 권장 800x800px
- **비율**: 정사각형(1:1) 또는 가로형(4:3)
- **형식**: JPG, PNG (WebP 지원)
- **용량**: 200KB 이하 권장 (로딩 속도 최적화)
- **배경**: 밝고 깔끔한 배경 추천

---

## ⚠️ 주의사항

1. 파일명은 **정확히 일치**해야 합니다 (대소문자 구분)
2. 한글 파일명은 피하세요 (영문 + 하이픈 사용)
3. 이미지가 없으면 자동으로 아이콘이 표시됩니다
4. 이미지 변경 후 **브라우저 캐시를 새로고침**(Ctrl+F5)하세요

---

## 📌 현재 상태

- ⬜ rnd-center.jpg (준비중)
- ⬜ production-facility.jpg (준비중)
- ⬜ export-business.jpg (준비중)
- ⬜ online-shopping.jpg (준비중)

---

## 🔗 관련 파일

- **JSON 데이터**: `public/data/clarus-competencies.json`
- **컴포넌트**: `src/pages/v2/subsidiaries/ClarusDetailPage.js`
- **이미지 폴더**: `public/images/clarus/competencies/`






