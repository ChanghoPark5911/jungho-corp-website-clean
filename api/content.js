// Vercel Edge Function for real-time content management
import { db } from '../src/config/firebase.js';
import { collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

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
      // 실시간 콘텐츠 조회
      const contentRef = doc(db, 'content', 'homepage');
      const contentSnap = await getDoc(contentRef);
      
      if (contentSnap.exists()) {
        res.status(200).json({
          success: true,
          data: contentSnap.data(),
          source: 'firebase',
          timestamp: new Date().toISOString()
        });
      } else {
        // 기본 콘텐츠 반환
        const defaultContent = {
          hero: {
            title: "정호그룹\n조명의 미래를\n만들어갑니다",
            subtitle: "40년 전통의 조명제어 전문기업",
            description: "혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다"
          },
          achievements: [
            { number: "40", label: "년 전통" },
            { number: "1000+", label: "프로젝트" },
            { number: "50+", label: "국가 진출" },
            { number: "99%", label: "고객 만족도" }
          ],
          lastUpdated: new Date().toISOString()
        };
        
        res.status(200).json({
          success: true,
          data: defaultContent,
          source: 'default',
          message: '기본 콘텐츠를 반환합니다.'
        });
      }
    } else if (req.method === 'POST') {
      // 실시간 콘텐츠 업데이트
      const { data } = req.body;
      
      if (!data) {
        res.status(400).json({
          success: false,
          error: '콘텐츠 데이터가 필요합니다.'
        });
        return;
      }

      const contentRef = doc(db, 'content', 'homepage');
      await setDoc(contentRef, {
        ...data,
        lastUpdated: new Date().toISOString()
      });

      res.status(200).json({
        success: true,
        message: '콘텐츠가 실시간으로 업데이트되었습니다.',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
