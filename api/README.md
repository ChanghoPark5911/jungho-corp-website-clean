# API 디렉토리

이 디렉토리는 정호그룹 웹사이트의 백엔드 API를 포함합니다.

## 파일 구조

```
api/
├── README.md           # 이 파일
├── openai-api.php     # OpenAI API 연동 PHP 스크립트
└── .htaccess          # Apache 설정 (선택사항)
```

## OpenAI API 연동

### openai-api.php

OpenAI GPT-4o 모델을 사용하여 웹사이트 콘텐츠를 자동으로 생성하는 API입니다.

#### 기능
- **히어로 섹션**: 메인 제목, 부제목, 설명 자동 생성
- **일반 콘텐츠**: 제목, 본문, 키워드 자동 생성
- **SEO 최적화**: 메타 제목, 설명, 태그 자동 생성

#### 사용법

```javascript
// 프론트엔드에서 호출 예시
const response = await fetch('/api/openai-api.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: '홈페이지 히어로 섹션을 더 매력적으로 만들어주세요',
    contentType: 'hero',
    targetSection: 'homepage'
  })
});

const result = await response.json();
```

#### 응답 형식

```json
{
  "success": true,
  "data": {
    "title": "AI가 생성한 제목",
    "subtitle": "AI가 생성한 부제목",
    "description": "AI가 생성한 설명"
  },
  "metadata": {
    "prompt": "사용자 입력",
    "contentType": "hero",
    "targetSection": "homepage",
    "timestamp": "2024-01-15 10:30:00",
    "model": "gpt-4o"
  }
}
```

#### 보안

- API 키는 환경변수로 관리하는 것을 권장합니다
- CORS 설정이 포함되어 있습니다
- 입력값 검증이 구현되어 있습니다

## 설정

### PHP 요구사항
- PHP 7.4 이상
- cURL 확장 모듈
- JSON 확장 모듈

### OpenAI API 키 설정
`openai-api.php` 파일에서 `$OPENAI_API_KEY` 변수를 실제 API 키로 설정하세요.

```php
$OPENAI_API_KEY = 'your-actual-api-key-here';
```

## 에러 처리

API는 다음과 같은 에러 상황을 처리합니다:
- 잘못된 HTTP 메소드
- 누락된 필수 필드
- OpenAI API 호출 실패
- JSON 파싱 오류

모든 에러는 적절한 HTTP 상태 코드와 함께 JSON 형식으로 반환됩니다.

## 개발 환경

로컬 개발 환경에서 테스트하려면:
1. PHP 서버를 실행하세요
2. API 디렉토리를 웹 루트에 배치하세요
3. OpenAI API 키를 설정하세요
4. 프론트엔드에서 API를 호출하여 테스트하세요

## 배포

프로덕션 환경에 배포할 때는:
1. API 키를 환경변수로 관리하세요
2. HTTPS를 사용하세요
3. 적절한 CORS 정책을 설정하세요
4. 에러 로깅을 활성화하세요



