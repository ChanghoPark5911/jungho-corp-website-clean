// Firebase 콘텐츠 저장 서비스
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
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

// 콘텐츠 타입 정의
const CONTENT_TYPES = {
  HOMEPAGE: 'homepage',
  NEWS: 'news',
  SUBSIDIARY: 'subsidiary',
  IMAGE: 'image'
};

class ContentService {
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

  // 이미지 업로드 (Firestore 메타데이터만 저장)
  async uploadImage(file, path) {
    try {
      // 실제 파일은 나중에 Storage 활성화 후 구현
      // 현재는 파일 정보만 Firestore에 저장
      const imageData = {
        name: file.name,
        url: `placeholder_${file.name}`, // 임시 URL
        size: file.size,
        type: file.type,
        uploadedAt: serverTimestamp(),
        path: path,
        status: 'pending_storage_activation'
      };
      
      const docRef = doc(db, 'images', `${path}_${file.name}_${Date.now()}`);
      await setDoc(docRef, imageData);
      
      console.log('이미지 메타데이터 저장 완료 (Storage 비활성화 상태):', imageData);
      return { success: true, url: imageData.url, data: imageData };
    } catch (error) {
      console.error('이미지 메타데이터 저장 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 이미지 목록 조회
  async getImages(path) {
    try {
      const q = query(
        collection(db, 'images'),
        orderBy('uploadedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const images = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.path === path) {
          images.push({ id: doc.id, ...data });
        }
      });
      
      console.log('이미지 목록 조회 성공:', images);
      return { success: true, data: images };
    } catch (error) {
      console.error('이미지 목록 조회 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 뉴스 콘텐츠 저장
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

  // 계열사 정보 저장
  async saveSubsidiaryInfo(subsidiaryData) {
    try {
      const docRef = doc(db, 'subsidiaries', subsidiaryData.id);
      await setDoc(docRef, {
        ...subsidiaryData,
        updatedAt: serverTimestamp()
      });
      
      console.log('계열사 정보 저장 완료');
      return { success: true, data: subsidiaryData };
    } catch (error) {
      console.error('계열사 정보 저장 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 계열사 정보 조회
  async getSubsidiaryInfo(subsidiaryId) {
    try {
      const docRef = doc(db, 'subsidiaries', subsidiaryId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('계열사 정보 조회 성공:', data);
        return { success: true, data };
      } else {
        console.log('저장된 계열사 정보가 없습니다');
        return { success: false, data: null };
      }
    } catch (error) {
      console.error('계열사 정보 조회 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 콘텐츠 삭제
  async deleteContent(collectionName, docId) {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      console.log('콘텐츠 삭제 완료');
      return { success: true };
    } catch (error) {
      console.error('콘텐츠 삭제 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 이미지 삭제
  async deleteImage(imageUrl) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log('이미지 삭제 완료');
      return { success: true };
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      return { success: false, error: error.message };
    }
  }
}

// 싱글톤 인스턴스 생성
const contentService = new ContentService();

export default contentService;
export { CONTENT_TYPES };
