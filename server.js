const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 8000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 콘텐츠 파일 경로
const CONTENT_FILE = path.join(__dirname, 'public', 'content', 'homepage.json');

// 콘텐츠 저장 API
app.post('/api/save-content', async (req, res) => {
  try {
    const data = req.body;
    
    if (!data) {
      return res.status(400).json({ error: true, message: '데이터가 없습니다.' });
    }
    
    // 기존 데이터 읽기 (있는 경우)
    let existingData = {};
    try {
      const content = await fs.readFile(CONTENT_FILE, 'utf8');
      existingData = JSON.parse(content);
    } catch (error) {
      // 파일이 없으면 빈 객체 사용
      console.log('기존 콘텐츠 파일이 없습니다. 새로 생성합니다.');
    }
    
    // 새 데이터로 업데이트
    const updatedData = { ...existingData, ...data };
    updatedData.lastUpdated = new Date().toISOString();
    
    // 디렉토리가 없으면 생성
    const contentDir = path.dirname(CONTENT_FILE);
    await fs.mkdir(contentDir, { recursive: true });
    
    // JSON 파일에 저장
    await fs.writeFile(
      CONTENT_FILE, 
      JSON.stringify(updatedData, null, 2), 
      'utf8'
    );
    
    console.log('콘텐츠 저장 성공:', updatedData.lastUpdated);
    
    res.json({
      success: true,
      message: '콘텐츠가 성공적으로 저장되었습니다.',
      timestamp: updatedData.lastUpdated
    });
    
  } catch (error) {
    console.error('콘텐츠 저장 오류:', error);
    res.status(500).json({
      error: true,
      message: '저장 실패: ' + error.message
    });
  }
});

// 콘텐츠 로드 API
app.get('/api/get-content', async (req, res) => {
  try {
    // 파일이 존재하는지 확인
    try {
      const content = await fs.readFile(CONTENT_FILE, 'utf8');
      const data = JSON.parse(content);
      
      console.log('콘텐츠 로드 성공:', data.lastUpdated);
      
      res.json({
        success: true,
        data: data,
        source: 'file',
        message: '콘텐츠를 성공적으로 로드했습니다.',
        lastUpdated: data.lastUpdated || 'unknown'
      });
      
    } catch (error) {
      // 파일이 없으면 기본 콘텐츠 반환
      const defaultContent = {
        "hero": {
          "title": "정호그룹\n조명의 미래를\n만들어갑니다",
          "subtitle": "40년 전통의 조명제어 전문기업",
          "description": "혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다"
        },
        "achievements": [
          { "number": "40", "label": "년 전통" },
          { "number": "1000+", "label": "프로젝트" },
          { "number": "50+", "label": "국가 진출" },
          { "number": "99%", "label": "고객 만족도" }
        ],
        "group": {
          "title": "정호그룹 소개",
          "description": "정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다."
        },
        "subsidiaries": [
          {
            "name": "클라루스",
            "subtitle": "조명제어 시스템",
            "description": "스마트 조명제어 솔루션 전문기업"
          },
          {
            "name": "정호티엘씨",
            "subtitle": "LED 조명",
            "description": "친환경 LED 조명 제품 전문기업"
          },
          {
            "name": "일루텍",
            "subtitle": "조명 디자인",
            "description": "창의적인 조명 디자인 전문기업"
          },
          {
            "name": "정호텍스컴",
            "subtitle": "조명 기술",
            "description": "최첨단 조명 기술 개발 전문기업"
          }
        ],
        "lastUpdated": new Date().toISOString()
      };
      
      console.log('기본 콘텐츠 반환');
      
      res.json({
        success: true,
        data: defaultContent,
        source: 'default',
        message: '기본 콘텐츠를 반환합니다.'
      });
    }
    
  } catch (error) {
    console.error('콘텐츠 로드 오류:', error);
    res.status(500).json({
      error: true,
      message: '콘텐츠 로드 실패: ' + error.message
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 콘텐츠 저장 서버가 http://localhost:${PORT} 에서 실행 중입니다!`);
  console.log(`📁 콘텐츠 파일: ${CONTENT_FILE}`);
  console.log(`💾 저장 API: POST http://localhost:${PORT}/api/save-content`);
  console.log(`📖 로드 API: GET http://localhost:${PORT}/api/get-content`);
});
