<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS 요청 처리
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 파일 저장 디렉토리 설정
$uploadDir = '../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// 파일 정보 저장 디렉토리
$filesDir = '../data/files/';
if (!file_exists($filesDir)) {
    mkdir($filesDir, 0755, true);
}

function saveFileInfo($fileType, $fileData) {
    global $filesDir;
    
    $filesInfo = [];
    $filesInfoPath = $filesDir . 'files.json';
    
    // 기존 파일 정보 로드
    if (file_exists($filesInfoPath)) {
        $filesInfo = json_decode(file_get_contents($filesInfoPath), true) ?: [];
    }
    
    // 새 파일 정보 저장
    $filesInfo[$fileType] = $fileData;
    
    // 파일 정보 저장
    file_put_contents($filesInfoPath, json_encode($filesInfo, JSON_PRETTY_PRINT));
    
    return true;
}

function getFileInfo($fileType = null) {
    global $filesDir;
    
    $filesInfoPath = $filesDir . 'files.json';
    
    if (!file_exists($filesInfoPath)) {
        return $fileType ? null : [];
    }
    
    $filesInfo = json_decode(file_get_contents($filesInfoPath), true) ?: [];
    
    if ($fileType) {
        return isset($filesInfo[$fileType]) ? $filesInfo[$fileType] : null;
    }
    
    return $filesInfo;
}

function deleteFile($fileType) {
    global $filesDir, $uploadDir;
    
    $filesInfo = getFileInfo();
    
    if (isset($filesInfo[$fileType])) {
        $filePath = $filesInfo[$fileType]['path'];
        
        // 실제 파일 삭제
        if (file_exists($filePath)) {
            unlink($filePath);
        }
        
        // 파일 정보에서 제거
        unset($filesInfo[$fileType]);
        
        $filesInfoPath = $filesDir . 'files.json';
        file_put_contents($filesInfoPath, json_encode($filesInfo, JSON_PRETTY_PRINT));
        
        return true;
    }
    
    return false;
}

// 요청 처리
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // 파일 업로드
        if (!isset($_FILES['file']) || !isset($_POST['fileType'])) {
            echo json_encode(['success' => false, 'message' => '파일과 파일 타입이 필요합니다.']);
            exit();
        }
        
        $file = $_FILES['file'];
        $fileType = $_POST['fileType'];
        
        // 파일 검증
        $allowedTypes = [
            'technicalDocs' => ['pdf', 'doc', 'docx', 'ppt', 'pptx'],
            'productCatalog' => ['pdf', 'jpg', 'jpeg', 'png']
        ];
        
        if (!isset($allowedTypes[$fileType])) {
            echo json_encode(['success' => false, 'message' => '지원하지 않는 파일 타입입니다.']);
            exit();
        }
        
        $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($fileExtension, $allowedTypes[$fileType])) {
            echo json_encode(['success' => false, 'message' => '지원하지 않는 파일 형식입니다.']);
            exit();
        }
        
        // 파일 크기 검증 (50MB)
        if ($file['size'] > 50 * 1024 * 1024) {
            echo json_encode(['success' => false, 'message' => '파일 크기는 50MB를 초과할 수 없습니다.']);
            exit();
        }
        
        // 파일명 생성 (중복 방지)
        $fileName = $fileType . '_' . time() . '_' . uniqid() . '.' . $fileExtension;
        $filePath = $uploadDir . $fileName;
        
        // 파일 업로드
        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            // 파일 정보 저장
            $fileData = [
                'name' => $file['name'],
                'path' => $filePath,
                'url' => '/api/uploads/' . $fileName,
                'size' => $file['size'],
                'type' => $file['type'],
                'uploadedAt' => date('Y-m-d H:i:s')
            ];
            
            if (saveFileInfo($fileType, $fileData)) {
                echo json_encode([
                    'success' => true,
                    'message' => '파일이 성공적으로 업로드되었습니다.',
                    'data' => $fileData
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => '파일 정보 저장에 실패했습니다.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => '파일 업로드에 실패했습니다.']);
        }
        break;
        
    case 'GET':
        // 파일 정보 조회
        $fileType = $_GET['fileType'] ?? null;
        $filesInfo = getFileInfo($fileType);
        
        echo json_encode([
            'success' => true,
            'data' => $filesInfo
        ]);
        break;
        
    case 'DELETE':
        // 파일 삭제
        $input = json_decode(file_get_contents('php://input'), true);
        $fileType = $input['fileType'] ?? null;
        
        if (!$fileType) {
            echo json_encode(['success' => false, 'message' => '파일 타입이 필요합니다.']);
            exit();
        }
        
        if (deleteFile($fileType)) {
            echo json_encode(['success' => true, 'message' => '파일이 삭제되었습니다.']);
        } else {
            echo json_encode(['success' => false, 'message' => '파일 삭제에 실패했습니다.']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => '지원하지 않는 메서드입니다.']);
        break;
}
?>
