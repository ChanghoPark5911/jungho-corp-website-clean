# RSS 사업부 이미지 가이드

## 📁 폴더 구조

```
public/images/rss/
├── hero-background.jpg  ← Hero 섹션 배경 이미지 (1장, 흐릿하게 표시)
├── factory.jpg          ← 공장 이미지 (1장)
├── products/            ← 제품 이미지 폴더 (12장)
│   ├── product-01.jpg
│   ├── product-02.jpg
│   ├── product-03.jpg
│   ├── product-04.jpg
│   ├── product-05.jpg
│   ├── product-06.jpg
│   ├── product-07.jpg
│   ├── product-08.jpg
│   ├── product-09.jpg
│   ├── product-10.jpg
│   ├── product-11.jpg
│   └── product-12.jpg
└── README.md
```

---

## 🖼️ 이미지 규격

### Hero 배경 이미지 (1장 - 흐릿한 배경)
- **파일명**: `hero-background.jpg`
- **권장 크기**: 800 × 300px (또는 유사 가로형 비율)
- **최대 파일 크기**: 300KB 이하 권장
- **포맷**: JPG 또는 PNG
- **위치**: `/public/images/rss/`
- **표시 방식**: 흐릿하게(blur) + 투명도 20%로 배경에 표시
- **용도**: "'패션 라이프스타일' 브랜드로의 도약" 슬로건 뒤 배경

### 제품 이미지 (12장 - 슬라이드쇼)
- **파일명**: `product-01.jpg` ~ `product-12.jpg`
- **권장 크기**: 600 × 400px (3:2 비율)
- **최대 파일 크기**: 500KB 이하 권장
- **포맷**: JPG 또는 PNG
- **위치**: `/public/images/rss/products/`

### 공장 이미지 (1장 - 고정)
- **파일명**: `factory.jpg`
- **권장 크기**: 500 × 350px (4:3 비율)
- **최대 파일 크기**: 500KB 이하 권장
- **포맷**: JPG 또는 PNG
- **위치**: `/public/images/rss/`

---

## 📝 이미지 교체 방법

### 1. 파일 탐색기로 직접 복사

```
1. 파일 탐색기에서 다음 경로로 이동:
   C:\Work\jungho-corp-website-clean\public\images\rss\

2. 공장 이미지 복사:
   - 공장 이미지 파일을 "factory.jpg"로 이름 변경
   - 해당 폴더에 복사

3. 제품 이미지 복사:
   - products 폴더로 이동
   - 12장의 제품 이미지를 "product-01.jpg" ~ "product-12.jpg"로 이름 변경
   - 해당 폴더에 복사

4. 브라우저에서 Ctrl+F5로 새로고침하여 확인
```

---

## ⚙️ 슬라이드쇼 설정

- **자동 전환 간격**: 4초
- **전환 효과**: 페이드 인/아웃
- **수동 조작**: 좌우 버튼 및 하단 인디케이터 클릭

---

## 🚀 영구 저장 (배포)

이미지 교체 후 아래 명령어로 배포:

```bash
git add -A
git commit -m "RSS 사업부 이미지 추가/업데이트"
git push origin main
```

Vercel이 자동으로 배포를 진행합니다.

