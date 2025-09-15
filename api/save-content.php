<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // POST 데이터 읽기
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }
    
    // 콘텐츠 파일 경로
    $contentFile = '../public/content/homepage.json';
    
    // 기존 데이터 읽기 (있는 경우)
    $existingData = [];
    if (file_exists($contentFile)) {
        $existingData = json_decode(file_get_contents($contentFile), true) ?: [];
    }
    
    // 새 데이터로 업데이트
    $updatedData = array_merge($existingData, $data);
    $updatedData['lastUpdated'] = date('c'); // ISO 8601 형식
    
    // JSON 파일에 저장
    $result = file_put_contents($contentFile, json_encode($updatedData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($result === false) {
        throw new Exception('Failed to write file');
    }
    
    // 성공 응답
    echo json_encode([
        'success' => true,
        'message' => '콘텐츠가 성공적으로 저장되었습니다.',
        'timestamp' => $updatedData['lastUpdated']
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => true,
        'message' => '저장 실패: ' . $e->getMessage()
    ]);
}
?>
