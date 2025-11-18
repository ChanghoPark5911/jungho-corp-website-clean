# Firebase Storage 이미지 업로드 시스템 설정 가이드

## 🎯 개요

Firebase Storage를 사용하여 이미지를 업로드하고 관리하는 시스템입니다.
관리자 페이지에서 드래그&드롭으로 이미지를 업로드하고, URL을 복사하여 콘텐츠에 사용할 수 있습니다.

## 🚀 기능

- ✅ 드래그&드롭 이미지 업로드
- ✅ 자동 이미지 리사이즈 (최대 1920x1080)
- ✅ 카테고리별 이미지 관리 (프로젝트, 계열사, 팀원, 제품, 배너, 일반)
- ✅ 업로드 진행률 표시
- ✅ 이미지 미리보기
- ✅ URL 자동 복사
- ✅ CDN을 통한 빠른 이미지 전송
- ✅ 파일 크기 제한 (최대 10MB)
- ✅ 파일 형식 검증 (JPG, PNG, WebP, GIF)

## 📋 필수 조건

1. Firebase 프로젝트 생성
2. Firebase Storage 활성화
3. 환경 변수 설정

## 🔧 설정 방법

### 1. Firebase 프로젝트 설정

#### 1.1 Firebase Console 접속
```
https://console.firebase.google.com/
```

#### 1.2 프로젝트 선택 또는 생성
- 기존 프로젝트: `jungho-corp-website`
- 새 프로젝트: "프로젝트 추가" 클릭

#### 1.3 Storage 활성화
1. 좌측 메뉴에서 **"Storage"** 클릭
2. **"시작하기"** 버튼 클릭
3. 보안 규칙 선택: **"테스트 모드로 시작"** (개발 중)
4. Cloud Storage 위치 선택: **"asia-northeast3 (서울)"** 권장
5. 완료

### 2. 보안 규칙 설정

#### 2.1 Firebase Console에서 설정
1. Storage 메뉴 > "규칙" 탭 클릭
2. 아래 규칙을 복사하여 붙여넣기:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 모든 사용자가 읽기 가능
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // 쓰기 규칙 (카테고리별)
    match /{category}/{imageId} {
      allow write: if true; // 개발 중
      allow write: if request.resource.size < 10 * 1024 * 1024;
      allow write: if request.resource.contentType.matches('image/.*');
      allow delete: if true; // 개발 중
    }
  }
}
```

3. **"게시"** 버튼 클릭

#### 2.2 또는 Firebase CLI로 배포
```bash
# Firebase CLI 설치 (최초 1회)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firebase 초기화 (최초 1회)
firebase init storage

# 보안 규칙 배포
firebase deploy --only storage:rules
```

### 3. 환경 변수 확인

`.env` 파일에 Firebase Storage 버킷이 올바르게 설정되어 있는지 확인:

```env
REACT_APP_FIREBASE_STORAGE_BUCKET=jungho-corp-website.firebasestorage.app
```

## 💻 사용 방법

### 관리자 페이지에서 이미지 업로드

1. **관리자 페이지 접속**
   ```
   http://localhost:3000/v2/admin
   또는
   https://jungho-corp-website-clean.vercel.app/v2/admin
   ```

2. **"이미지 관리" 탭 클릭**

3. **카테고리 선택**
   - 프로젝트 이미지
   - 계열사 로고
   - 팀원 사진
   - 제품 이미지
   - 배너 이미지
   - 일반 이미지

4. **이미지 업로드**
   - 방법 1: 드래그&드롭
   - 방법 2: 클릭하여 파일 선택

5. **URL 복사**
   - 업로드 완료 후 표시되는 URL 복사
   - 또는 "📋 복사" 버튼 클릭

6. **콘텐츠에 사용**
   - JSON 데이터나 컴포넌트에 URL 붙여넣기

### 코드에서 사용

#### 방법 1: JSON 데이터에 추가
```json
{
  "id": "project-001",
  "title": "프로젝트 제목",
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/jungho-corp-website.appspot.com/o/projects%2Fimage_1234567890_abc123.jpg?alt=media&token=...",
  "description": "프로젝트 설명"
}
```

#### 방법 2: React 컴포넌트에서 직접 사용
```jsx
import imageUploadService from '../utils/imageUpload';

function MyComponent() {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (file) => {
    try {
      const url = await imageUploadService.uploadImageWithResize(
        file,
        'projects', // 카테고리
        (progress) => console.log(`${progress}% 완료`),
        { resize: true, maxSize: 10 * 1024 * 1024 }
      );
      
      setImageUrl(url);
      console.log('업로드 성공:', url);
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <div>
      <img src={imageUrl} alt="업로드된 이미지" />
    </div>
  );
}
```

#### 방법 3: ImageUploader 컴포넌트 사용
```jsx
import ImageUploader from '../components/ImageUploader';

function MyComponent() {
  return (
    <ImageUploader
      onUploadSuccess={(url) => console.log('업로드 성공:', url)}
      onUploadError={(error) => console.error('업로드 실패:', error)}
      path="projects"
      maxSize={10 * 1024 * 1024}
      resize={true}
      showPreview={true}
    />
  );
}
```

## 📁 파일 구조

```
src/
├── utils/
│   └── imageUpload.js          # 이미지 업로드 유틸리티
├── components/
│   └── ImageUploader.js        # 이미지 업로드 UI 컴포넌트
├── config/
│   └── firebase.js             # Firebase 설정
└── pages/
    └── v2/
        └── AdminPageV2.jsx     # 관리자 페이지 (이미지 관리 탭 포함)

firebase-storage.rules          # Firebase Storage 보안 규칙
```

## 🔒 보안

### 개발 환경 (현재 설정)
- **읽기**: 모든 사용자 허용 (공개 이미지)
- **쓰기**: 모든 사용자 허용 (개발 편의성)
- **삭제**: 모든 사용자 허용 (개발 편의성)

### 프로덕션 환경 (권장 설정)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // 모든 사용자 읽기 가능
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // 인증된 사용자만 쓰기/삭제 가능
    match /{category}/{imageId} {
      allow write: if request.auth != null 
        && request.resource.size < 10 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
      
      allow delete: if request.auth != null;
    }
  }
}
```

## 🐛 문제 해결

### 1. 업로드 실패: "storage/unauthorized"
**원인**: Firebase Storage 보안 규칙이 쓰기를 차단함

**해결**:
```javascript
// firebase-storage.rules에서 확인
allow write: if true; // 개발 중 임시로 설정
```

### 2. 이미지 로딩 실패
**원인**: CORS 설정 또는 URL이 잘못됨

**해결**:
1. Firebase Storage > "설정" > CORS 설정 확인
2. 브라우저 개발자 도구 > Network 탭에서 요청 확인

### 3. "파일 크기가 너무 큽니다" 에러
**해결**:
- 이미지를 10MB 이하로 압축
- 또는 `maxSize` 옵션 조정 (보안 규칙도 함께 수정)

### 4. Firebase Storage가 초기화되지 않음
**해결**:
```javascript
// src/config/firebase.js에서 확인
import { getStorage } from 'firebase/storage';
const storage = getStorage(app);
export { storage };
```

## 📊 모니터링

### Firebase Console에서 확인
1. Storage 메뉴 > "파일" 탭
   - 업로드된 모든 이미지 확인
   - 카테고리별 폴더 구조 확인

2. Storage 메뉴 > "사용량" 탭
   - 저장 용량 사용량
   - 다운로드 대역폭
   - 요청 횟수

## 💰 비용

Firebase Storage 무료 한도:
- **저장 공간**: 5GB
- **다운로드**: 1GB/일
- **업로드**: 20,000회/일

**예상 비용** (무료 한도 초과 시):
- 저장 공간: $0.026/GB/월
- 다운로드: $0.12/GB

## 🚀 최적화 팁

1. **이미지 리사이즈 활성화**
   ```javascript
   uploadImageWithResize(file, 'projects', null, { resize: true })
   ```

2. **WebP 형식 사용** (압축률 30% 향상)

3. **CDN 캐싱 활용**
   - Firebase Storage는 자동으로 CDN 사용

4. **불필요한 이미지 정리**
   ```javascript
   await imageUploadService.deleteImage(imageUrl);
   ```

## 📚 참고 자료

- [Firebase Storage 문서](https://firebase.google.com/docs/storage)
- [Firebase Storage 보안 규칙](https://firebase.google.com/docs/storage/security)
- [Firebase Storage 가격](https://firebase.google.com/pricing)

## 🎉 완료!

이제 관리자 페이지에서 이미지를 업로드하고 관리할 수 있습니다!

질문이 있으시면 개발 팀에 문의하세요.

