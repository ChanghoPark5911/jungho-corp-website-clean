const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 8000;

// 간단한 HTTP 서버
const server = http.createServer(async (req, res) => {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  console.log(`${req.method} ${req.url}`);
  
  try {
    if (req.method === 'POST' && req.url === '/api/save-content') {
      // POST 데이터 읽기
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          const contentFile = path.join(__dirname, 'public', 'content', 'homepage.json');
          
          // 디렉토리 생성
          await fs.mkdir(path.dirname(contentFile), { recursive: true });
          
          // 파일에 저장
          await fs.writeFile(contentFile, JSON.stringify(data, null, 2));
          
          console.log('✅ 콘텐츠 저장 성공!');
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: '콘텐츠가 성공적으로 저장되었습니다!',
            timestamp: new Date().toISOString()
          }));
          
        } catch (error) {
          console.error('❌ 저장 오류:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: true, message: error.message }));
        }
      });
      
    } else if (req.method === 'GET' && req.url === '/api/get-content') {
      // 콘텐츠 로드
      try {
        const contentFile = path.join(__dirname, 'public', 'content', 'homepage.json');
        
        if (await fs.access(contentFile).then(() => true).catch(() => false)) {
          // 파일이 존재하면 읽기
          const content = await fs.readFile(contentFile, 'utf8');
          const data = JSON.parse(content);
          
          console.log('✅ 콘텐츠 로드 성공!');
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            data: data,
            source: 'file',
            message: '콘텐츠를 성공적으로 로드했습니다!'
          }));
        } else {
          // 파일이 없으면 기본값 반환
          console.log('📝 기본 콘텐츠 반환');
          
          const defaultData = {
            hero: { title: "기본 제목", subtitle: "기본 부제목" },
            lastUpdated: new Date().toISOString()
          };
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            data: defaultData,
            source: 'default',
            message: '기본 콘텐츠를 반환합니다.'
          }));
        }
        
      } catch (error) {
        console.error('❌ 로드 오류:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: true, message: error.message }));
      }
      
    } else {
      // 404 처리
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
    
  } catch (error) {
    console.error('❌ 서버 오류:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

// 서버 시작
server.listen(PORT, () => {
  console.log(`🚀 간단한 테스트 서버가 http://localhost:${PORT} 에서 실행 중입니다!`);
  console.log(`💾 저장: POST http://localhost:${PORT}/api/save-content`);
  console.log(`📖 로드: GET http://localhost:${PORT}/api/get-content`);
});
