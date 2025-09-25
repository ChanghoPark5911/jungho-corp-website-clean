// Storage 없이 Firestore만 사용하는 콘텐츠 관리 서비스
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

class ContentServiceWithoutStorage {
  // 홈페이지 콘텐츠 저장
  async saveHomepageContent(contentData) {
    try {
      const docRef = doc(db, 'content', 'homepage');
      await setDoc(docRef, {
        ...contentData,
        updatedAt: serverTimestamp(),
        version: Date.now()
      });
      
      console.log('홈페이지 콘텐츠 저장 완료');
      return { success: true, data: contentData };
    } catch (error) {
      console.error('홈페이지 콘텐츠 저장 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 홈페이지 콘텐츠 로드
  async loadHomepageContent() {
    try {
      const docRef = doc(db, 'content', 'homepage');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('홈페이지 콘텐츠 로드 성공:', data);
        return { success: true, data };
      } else {
        console.log('저장된 홈페이지 콘텐츠가 없습니다');
        return { success: false, data: null };
      }
    } catch (error) {
      console.error('홈페이지 콘텐츠 로드 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 이미지 URL 저장 (외부 URL 사용)
  async saveImageUrl(imageData) {
    try {
      const docRef = doc(db, 'images', imageData.id || Date.now().toString());
      await setDoc(docRef, {
        ...imageData,
        uploadedAt: serverTimestamp(),
        source: 'external_url' // 외부 URL 사용 표시
      });
      
      console.log('이미지 URL 저장 완료:', imageData);
      return { success: true, data: imageData };
    } catch (error) {
      console.error('이미지 URL 저장 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 이미지 목록 조회
  async getImages() {
    try {
      const q = query(collection(db, 'images'), orderBy('uploadedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const images = [];
      querySnapshot.forEach((doc) => {
        images.push({ id: doc.id, ...doc.data() });
      });
      
      console.log('이미지 목록 조회 성공:', images);
      return { success: true, data: images };
    } catch (error) {
      console.error('이미지 목록 조회 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 뉴스 저장
  async saveNews(newsData) {
    try {
      const docRef = doc(db, 'news', newsData.id || Date.now().toString());
      await setDoc(docRef, {
        ...newsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('뉴스 저장 완료');
      return { success: true, data: newsData };
    } catch (error) {
      console.error('뉴스 저장 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 뉴스 목록 조회
  async getNews() {
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const news = [];
      querySnapshot.forEach((doc) => {
        news.push({ id: doc.id, ...doc.data() });
      });
      
      console.log('뉴스 목록 조회 성공:', news);
      return { success: true, data: news };
    } catch (error) {
      console.error('뉴스 목록 조회 실패:', error);
      return { success: false, error: error.message };
    }
  }
}

// 싱글톤 인스턴스 생성
const contentServiceWithoutStorage = new ContentServiceWithoutStorage();

export default contentServiceWithoutStorage;








