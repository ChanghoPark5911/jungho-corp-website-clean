<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // 콘텐츠 파일 경로
    $contentFile = '../public/content/homepage.json';
    
    // 파일이 존재하는지 확인
    if (!file_exists($contentFile)) {
        // 기본 콘텐츠 반환
        $defaultContent = [
            "hero" => [
                "title" => "정호그룹\n조명의 미래를\n만들어갑니다",
                "subtitle" => "40년 전통의 조명제어 전문기업",
                "description" => "혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다"
            ],
            "achievements" => [
                ["number" => "40", "label" => "년 전통"],
                ["number" => "1000+", "label" => "프로젝트"],
                ["number" => "50+", "label" => "국가 진출"],
                ["number" => "99%", "label" => "고객 만족도"]
            ],
            "group" => [
                "title" => "정호그룹 소개",
                "description" => "정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다."
            ],
            "subsidiaries" => [
                [
                    "name" => "클라루스",
                    "subtitle" => "조명제어 시스템",
                    "description" => "스마트 조명제어 솔루션 전문기업"
                ],
                [
                    "name" => "정호티엘씨",
                    "subtitle" => "LED 조명",
                    "description" => "친환경 LED 조명 제품 전문기업"
                ],
                [
                    "name" => "일루텍",
                    "subtitle" => "조명 디자인",
                    "description" => "창의적인 조명 디자인 전문기업"
                ],
                [
                    "name" => "정호텍스컴",
                    "subtitle" => "조명 기술",
                    "description" => "최첨단 조명 기술 개발 전문기업"
                ]
            ],
            "lastUpdated" => date('c')
        ];
        
        echo json_encode([
            'success' => true,
            'data' => $defaultContent,
            'source' => 'default',
            'message' => '기본 콘텐츠를 반환합니다.'
        ]);
        exit();
    }
    
    // 파일에서 콘텐츠 읽기
    $content = file_get_contents($contentFile);
    $data = json_decode($content, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON format in content file');
    }
    
    // 성공 응답
    echo json_encode([
        'success' => true,
        'data' => $data,
        'source' => 'file',
        'message' => '콘텐츠를 성공적으로 로드했습니다.',
        'lastUpdated' => $data['lastUpdated'] ?? 'unknown'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => '콘텐츠 로드 실패: ' . $e->getMessage()
    ]);
}
?>
