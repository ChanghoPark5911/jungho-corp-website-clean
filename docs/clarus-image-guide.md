# 클라루스 제품/서비스 다이어그램 이미지 추가 가이드

## 📊 개요

클라루스 상세 페이지의 3개 제품/서비스 항목 우측에 다이어그램/이미지를 추가하는 방법을 설명합니다.

---

## 🎯 이미지가 표시될 위치

### Hybrid 버전: `http://localhost:3000/hybrid/subsidiaries/clarus`
### Classic 버전: `http://localhost:3000/classic/subsidiaries/clarus`

각 제품/서비스 카드의 **우측 영역**에 이미지가 표시됩니다:

1. **조명제어시스템** - 다이어그램 공간
2. **전력감시시스템** - 다이어그램 공간
3. **해외사업(수출)** - 다이어그램 공간 (세계 지도 등)

---

## 📁 이미지 추가 방법

### **방법 1: PNG/JPG 이미지 파일 사용 (권장)**

#### 1단계: 이미지 파일 준비
```
추천 이미지 크기: 800x600px 또는 4:3 비율
추천 파일 형식: PNG (투명 배경 가능) 또는 JPG
파일 크기: 500KB 이하 권장
```

#### 2단계: 이미지 파일 저장
프로젝트의 `public` 폴더에 이미지를 저장합니다:

```
public/
  └─ images/
      └─ clarus/
          ├─ lighting-control-diagram.png      (조명제어시스템)
          ├─ power-monitoring-diagram.png       (전력감시시스템)
          └─ export-business-map.png            (해외사업)
```

**실제 경로 예시:**
```
C:\Work\jungho-corp-website-clean\public\images\clarus\lighting-control-diagram.png
```

#### 3단계: 코드에 이미지 경로 추가

**파일: `src/pages/v2/ClarusDetailHybrid.js`**
```javascript
const products = [
  {
    name: currentLanguage === 'en' ? 'Lighting Control System' : '조명제어시스템',
    // ... 기존 코드 ...
    imagePath: '/images/clarus/lighting-control-diagram.png'  // ← 여기에 경로 추가
  },
  {
    name: currentLanguage === 'en' ? 'Power Monitoring System' : '전력감시시스템',
    // ... 기존 코드 ...
    imagePath: '/images/clarus/power-monitoring-diagram.png'  // ← 여기에 경로 추가
  },
  {
    name: currentLanguage === 'en' ? 'Export Business' : '해외사업(수출)',
    // ... 기존 코드 ...
    imagePath: '/images/clarus/export-business-map.png'      // ← 여기에 경로 추가
  }
];
```

**파일: `src/pages/v2/ClarusDetailClassic.js`**
```javascript
// 동일한 방식으로 imagePath를 추가합니다
```

---

### **방법 2: PDF를 이미지로 변환하여 사용**

PDF 파일을 이미지로 변환 후 위의 방법 1을 따릅니다.

**PDF → PNG 변환 방법:**
1. **온라인 변환 도구**: https://www.ilovepdf.com/pdf_to_jpg
2. **Adobe Acrobat**: 파일 → 내보내기 → 이미지 → PNG
3. **PowerPoint**: PDF를 열고 슬라이드를 이미지로 저장

---

### **방법 3: 외부 URL 이미지 사용 (임시용)**

이미지가 이미 웹에 호스팅되어 있는 경우:

```javascript
imagePath: 'https://example.com/your-diagram.png'
```

⚠️ **주의**: 외부 링크는 해당 서버의 상태에 따라 이미지가 표시되지 않을 수 있습니다.

---

## 🔧 실습 예제

### 예제 1: 3개 이미지 모두 추가하기

```javascript
// src/pages/v2/ClarusDetailHybrid.js 에서 수정

const products = [
  {
    name: currentLanguage === 'en' ? 'Lighting Control System' : '조명제어시스템',
    description: currentLanguage === 'en'
      ? 'IoT-based integrated lighting control for buildings and facilities'
      : 'IoT 기반 건물 및 시설물 통합 조명 제어',
    features: currentLanguage === 'en' 
      ? ['Remote Control', 'Energy Saving', 'Schedule Management', 'Real-time Monitoring']
      : ['원격 제어', '에너지 절감', '스케줄 관리', '실시간 모니터링'],
    icon: '💡',
    gradient: 'from-blue-500 to-cyan-500',
    imagePath: '/images/clarus/lighting-control-diagram.png'  // ✅ 추가
  },
  {
    name: currentLanguage === 'en' ? 'Power Monitoring System' : '전력감시시스템',
    description: currentLanguage === 'en'
      ? 'Real-time power consumption monitoring and analysis'
      : '실시간 전력 사용량 감시 및 분석',
    features: currentLanguage === 'en'
      ? ['Power Measurement', 'Data Analysis', 'Report Generation', 'Alert System']
      : ['전력 계측', '데이터 분석', '리포트 생성', '알람 시스템'],
    icon: '⚡',
    gradient: 'from-yellow-500 to-orange-500',
    imagePath: '/images/clarus/power-monitoring-diagram.png'  // ✅ 추가
  },
  {
    name: currentLanguage === 'en' ? 'Export Business' : '해외사업(수출)',
    description: currentLanguage === 'en'
      ? 'Building global export infrastructure for Clarus lighting control products'
      : 'ㅇ Clarus 조명제어 제품의 해외수출 인프라 구축',
    features: currentLanguage === 'en'
      ? ['Target: North America/Europe advanced markets, China/Taiwan and Southeast Asian emerging markets including Vietnam/Philippines']
      : ['대상 : 북미/유럽 선진시장, 중국/대만 및 베트남/필리핀 등 동남아 신흥시장'],
    icon: '🌏',
    gradient: 'from-green-500 to-emerald-500',
    imagePath: '/images/clarus/export-business-map.png'      // ✅ 추가
  }
];
```

### 예제 2: 일부 이미지만 추가하기

```javascript
// 1번과 3번만 이미지 추가, 2번은 placeholder 유지
const products = [
  {
    name: '조명제어시스템',
    // ...
    imagePath: '/images/clarus/lighting-control-diagram.png'  // ✅ 이미지 있음
  },
  {
    name: '전력감시시스템',
    // ...
    imagePath: null  // ❌ 이미지 없음 (placeholder 표시)
  },
  {
    name: '해외사업(수출)',
    // ...
    imagePath: '/images/clarus/export-business-map.png'      // ✅ 이미지 있음
  }
];
```

---

## 📋 체크리스트

이미지 추가 전에 확인하세요:

- [ ] 이미지 파일이 준비되었습니까?
- [ ] 이미지 크기가 적절합니까? (800x600px 권장)
- [ ] 파일 크기가 500KB 이하입니까?
- [ ] `public/images/clarus/` 폴더에 파일을 저장했습니까?
- [ ] `ClarusDetailHybrid.js`에 `imagePath`를 추가했습니까?
- [ ] `ClarusDetailClassic.js`에 `imagePath`를 추가했습니까?
- [ ] 개발 서버를 재시작했습니까? (필요 시)

---

## 🚀 적용 방법

### 1단계: 이미지 파일 준비 및 저장
```bash
# Windows PowerShell에서
mkdir public\images\clarus

# 이미지 파일을 해당 폴더에 복사
# 예: lighting-control-diagram.png, power-monitoring-diagram.png, export-business-map.png
```

### 2단계: 코드 수정
위의 예제 코드를 참고하여 `imagePath`를 추가합니다.

### 3단계: 확인
브라우저에서 확인:
- Hybrid: `http://localhost:3000/hybrid/subsidiaries/clarus`
- Classic: `http://localhost:3000/classic/subsidiaries/clarus`

---

## 💡 팁

1. **투명 배경**: PNG 형식을 사용하면 투명 배경을 지원합니다
2. **고해상도**: Retina 디스플레이를 고려하여 실제 표시 크기의 2배로 준비하면 선명합니다
3. **파일명**: 영문과 하이픈(-)만 사용하여 파일명을 지어주세요 (공백 X)
4. **캐시 문제**: 이미지가 바로 표시되지 않으면 브라우저 캐시를 삭제하거나 `Ctrl + F5`로 새로고침

---

## 🎨 추천 이미지 콘텐츠

### 1. 조명제어시스템
- 시스템 아키텍처 다이어그램
- IoT 연결 구조도
- 제어 흐름도

### 2. 전력감시시스템
- 전력 모니터링 대시보드 스크린샷
- 데이터 흐름도
- 시스템 구성도

### 3. 해외사업(수출)
- 세계 지도 + 진출 국가 표시
- 지역별 시장 현황 인포그래픽
- 수출 프로세스 플로우차트

---

## ❓ 자주 묻는 질문

**Q: 이미지가 표시되지 않아요**
A: 
1. 파일 경로가 정확한지 확인하세요 (`/images/clarus/파일명.png`)
2. 파일명이 대소문자까지 정확히 일치하는지 확인하세요
3. 개발 서버를 재시작해보세요 (`npm start`)

**Q: PDF 파일을 직접 표시할 수 있나요?**
A: React에서 PDF를 직접 표시하려면 추가 라이브러리가 필요합니다. 간단하게는 PDF를 이미지로 변환하여 사용하는 것을 권장합니다.

**Q: 이미지 크기를 조절하고 싶어요**
A: 이미지는 자동으로 컨테이너에 맞춰집니다. 원본 이미지의 비율이 유지되므로, 적절한 크기로 이미지를 준비하는 것이 좋습니다.

---

**작성일**: 2025-11-20  
**작성자**: AI Assistant

