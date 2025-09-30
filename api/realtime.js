// Vercel Edge Function for real-time features
import { db } from '../src/config/firebase.js';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      const { type } = req.query;
      
      switch (type) {
        case 'news':
          // 실시간 뉴스 피드
          const newsQuery = query(
            collection(db, 'news'),
            orderBy('createdAt', 'desc'),
            limit(10)
          );
          
          onSnapshot(newsQuery, (snapshot) => {
            const news = [];
            snapshot.forEach((doc) => {
              news.push({ id: doc.id, ...doc.data() });
            });
            
            res.status(200).json({
              success: true,
              data: news,
              type: 'news',
              timestamp: new Date().toISOString()
            });
          });
          break;
          
        case 'projects':
          // 실시간 프로젝트 업데이트
          const projectsQuery = query(
            collection(db, 'projects'),
            orderBy('updatedAt', 'desc'),
            limit(20)
          );
          
          onSnapshot(projectsQuery, (snapshot) => {
            const projects = [];
            snapshot.forEach((doc) => {
              projects.push({ id: doc.id, ...doc.data() });
            });
            
            res.status(200).json({
              success: true,
              data: projects,
              type: 'projects',
              timestamp: new Date().toISOString()
            });
          });
          break;
          
        case 'analytics':
          // 실시간 분석 데이터
          const analyticsQuery = query(
            collection(db, 'analytics'),
            orderBy('timestamp', 'desc'),
            limit(100)
          );
          
          onSnapshot(analyticsQuery, (snapshot) => {
            const analytics = [];
            snapshot.forEach((doc) => {
              analytics.push({ id: doc.id, ...doc.data() });
            });
            
            res.status(200).json({
              success: true,
              data: analytics,
              type: 'analytics',
              timestamp: new Date().toISOString()
            });
          });
          break;
          
        default:
          res.status(400).json({
            success: false,
            error: 'Invalid type parameter'
          });
      }
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('Realtime API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
