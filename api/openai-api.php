<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// OpenAI API 설정
$OPENAI_API_KEY = 'sk-proj-[DEeFmKA1HYgQiefGpHc3y5_xx7oQVirWRWCeE_yQzckiSK2KyRvTkZzh2sird0IkLIYKq6mM_WT3BlbkFJFZuhXqx5DsOQBYJ83JmrQ1XmeuxUxKLS7zR_Ajhy4e1hdQDh30hFcJ8ePxtEHMjx7RUDvISq4A]';
$OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// 요청 메소드 확인
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// POST 데이터 읽기
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit();
}

// 필수 필드 확인
$required_fields = ['prompt', 'contentType', 'targetSection'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit();
    }
}

$prompt = $input['prompt'];
$contentType = $input['contentType'];
$targetSection = $input['targetSection'];

// OpenAI API 요청을 위한 프롬프트 구성
function buildPrompt($prompt, $contentType, $targetSection) {
    $basePrompt = "정호그룹 웹사이트의 $targetSection 섹션을 위한 $contentType 콘텐츠를 작성해주세요.\n\n";
    $basePrompt .= "요청사항: $prompt\n\n";
    
    switch ($contentType) {
        case 'hero':
            $basePrompt .= "다음 형식으로 JSON 응답을 제공해주세요:\n";
            $basePrompt .= "{\n";
            $basePrompt .= '  "title": "메인 제목 (줄바꿈은 \\n으로 구분)",\n';
            $basePrompt .= '  "subtitle": "부제목",\n';
            $basePrompt .= '  "description": "설명"\n';
            $basePrompt .= "}\n\n";
            $basePrompt .= "정호그룹은 40년 전통의 조명제어 전문기업으로, AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.";
            break;
            
        case 'content':
            $basePrompt .= "다음 형식으로 JSON 응답을 제공해주세요:\n";
            $basePrompt .= "{\n";
            $basePrompt .= '  "title": "콘텐츠 제목",\n';
            $basePrompt .= '  "body": "콘텐츠 본문",\n';
            $basePrompt .= '  "keywords": ["키워드1", "키워드2", "키워드3"]\n';
            $basePrompt .= "}\n\n";
            $basePrompt .= "정호그룹의 비즈니스와 관련된 전문적이고 매력적인 콘텐츠를 작성해주세요.";
            break;
            
        case 'seo':
            $basePrompt .= "다음 형식으로 JSON 응답을 제공해주세요:\n";
            $basePrompt .= "{\n";
            $basePrompt .= '  "title": "SEO 최적화된 제목 (50자 이내)",\n';
            $basePrompt .= '  "description": "SEO 최적화된 메타 설명 (160자 이내)",\n';
            $basePrompt .= '  "tags": ["태그1", "태그2", "태그3"]\n';
            $basePrompt .= "}\n\n";
            $basePrompt .= "검색엔진 최적화를 위한 키워드가 포함된 제목과 설명을 작성해주세요.";
            break;
            
        default:
            $basePrompt .= "일반적인 웹사이트 콘텐츠 형식으로 JSON 응답을 제공해주세요.";
    }
    
    return $basePrompt;
}

// OpenAI API 호출
function callOpenAI($prompt) {
    global $OPENAI_API_KEY, $OPENAI_API_URL;
    
    $data = [
        'model' => 'gpt-4o',
        'messages' => [
            [
                'role' => 'system',
                'content' => '당신은 정호그룹 웹사이트를 위한 전문적인 콘텐츠 작성자입니다. 항상 JSON 형식으로 응답하고, 한국어로 작성해주세요.'
            ],
            [
                'role' => 'user',
                'content' => $prompt
            ]
        ],
        'max_tokens' => 1000,
        'temperature' => 0.7
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $OPENAI_API_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $OPENAI_API_KEY
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        throw new Exception("cURL Error: $error");
    }
    
    if ($httpCode !== 200) {
        throw new Exception("HTTP Error: $httpCode - $response");
    }
    
    $result = json_decode($response, true);
    if (!$result) {
        throw new Exception("Invalid JSON response from OpenAI");
    }
    
    if (!isset($result['choices'][0]['message']['content'])) {
        throw new Exception("Unexpected response format from OpenAI");
    }
    
    return $result['choices'][0]['message']['content'];
}

try {
    // 프롬프트 구성
    $fullPrompt = buildPrompt($prompt, $contentType, $targetSection);
    
    // OpenAI API 호출
    $aiResponse = callOpenAI($fullPrompt);
    
    // JSON 응답 파싱
    $parsedResponse = json_decode($aiResponse, true);
    
    if (!$parsedResponse) {
        // JSON 파싱 실패 시 텍스트 응답으로 처리
        $parsedResponse = [
            'title' => 'AI 제안: ' . $prompt,
            'description' => $aiResponse,
            'note' => '원본 AI 응답을 텍스트로 제공합니다.'
        ];
    }
    
    // 성공 응답
    echo json_encode([
        'success' => true,
        'data' => $parsedResponse,
        'metadata' => [
            'prompt' => $prompt,
            'contentType' => $contentType,
            'targetSection' => $targetSection,
            'timestamp' => date('Y-m-d H:i:s'),
            'model' => 'gpt-4o'
        ]
    ]);
    
} catch (Exception $e) {
    // 에러 응답
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'metadata' => [
            'prompt' => $prompt,
            'contentType' => $contentType,
            'targetSection' => $targetSection,
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);
}
?>



