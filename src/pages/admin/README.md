# 정호그룹 관리자 시스템 (Phase 1)

## 📋 개요
Hybrid 버전 기준 콘텐츠 관리 시스템
- **데이터 저장**: JSON 파일 (영구 저장)
- **이미지 저장**: 로컬 폴더 (`public/uploads/`)
- **인증**: 세션 기반 (비밀번호만)

## 🔐 접속 정보

### 관리자 로그인
- **URL**: `http://localhost:3000/admin-new/login`
- **비밀번호**: `jungho2025!admin`

### 대시보드
- **URL**: `http://localhost:3000/admin-new/dashboard`

## 📂 파일 구조

```
src/pages/admin/
├── AdminLogin.jsx          # 로그인 페이지
├── AdminDashboard.jsx      # 대시보드
└── README.md               # 이 파일

public/data/
├── admin-media.json        # 미디어/PR 데이터
└── admin-faqs.json         # FAQ 데이터

public/uploads/             # 이미지/파일 저장소 (예정)
├── projects/
├── videos/
└── documents/
```

## ✅ Phase 1 진행 상황

### Step 1.1: 관리자 로그인 ✅ 완료
- [x] 로그인 페이지 생성
- [x] 세션 기반 인증
- [x] 대시보드 메인 페이지
- [x] App.js 라우팅 추가
- [x] JSON 데이터 파일 생성

### Step 1.2: 미디어 관리 ⏳ 진행 예정
- [ ] 프로젝트 목록 보기
- [ ] 프로젝트 추가/수정/삭제
- [ ] 이미지 업로드
- [ ] YouTube 링크 관리

### Step 1.3: 고객센터 관리 ⏳ 진행 예정
- [ ] FAQ 목록 보기
- [ ] FAQ 추가/수정/삭제
- [ ] 카테고리 관리

## 🔒 보안

- **세션 타임아웃**: 30분
- **비밀번호**: sessionStorage 저장
- **자동 로그아웃**: 브라우저 종료 시

## ⚠️ 주의사항

1. **기존 시스템 보호**
   - 기존 `/admin` 경로는 그대로 유지
   - 새 시스템은 `/admin-new` 사용
   - 완전히 독립적으로 작동

2. **데이터 백업**
   - JSON 파일은 Git으로 자동 백업
   - 수정 전 항상 커밋 권장

3. **테스트 필수**
   - 변경 후 V2/Hybrid/Classic 모두 테스트
   - 기존 기능 영향 확인

## 🚀 다음 단계

**Step 1.2**: 미디어 관리 기능 구현
- 예상 소요 시간: 1-1.5시간
- 프로젝트 영상, 홍보 콘텐츠 CRUD

진행하시겠습니까?

