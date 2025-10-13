// 뉴스/공지사항 관리 서비스
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  orderBy, 
  where, 
  limit,
  startAfter,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// 뉴스 컬렉션 이름
const NEWS_COLLECTION = 'news';

// 뉴스 카테고리
export const NEWS_CATEGORIES = {
  ALL: 'all',
  TECHNOLOGY: 'technology',
  BUSINESS: 'business',
  ESG: 'esg',
  AWARDS: 'awards',
  ANNOUNCEMENT: 'announcement'
};

// 뉴스 카테고리 라벨
export const NEWS_CATEGORY_LABELS = {
  [NEWS_CATEGORIES.ALL]: '전체',
  [NEWS_CATEGORIES.TECHNOLOGY]: '기술',
  [NEWS_CATEGORIES.BUSINESS]: '사업',
  [NEWS_CATEGORIES.ESG]: 'ESG',
  [NEWS_CATEGORIES.AWARDS]: '수상',
  [NEWS_CATEGORIES.ANNOUNCEMENT]: '공지사항'
};

class NewsService {
  // 뉴스 목록 조회 (페이지네이션 지원)
  async getNewsList(options = {}) {
    try {
      const {
        category = NEWS_CATEGORIES.ALL,
        limitCount = 20,
        lastDoc = null,
        searchTerm = ''
      } = options;

      // 1. localStorage에서 먼저 확인 (관리자가 저장한 데이터 우선)
      const localNews = localStorage.getItem('news_data');
      if (localNews) {
        try {
          let newsList = JSON.parse(localNews);
          
          // 날짜 변환
          newsList = newsList.map(news => ({
            ...news,
            publishedAt: news.publishedAt ? new Date(news.publishedAt) : new Date(),
            createdAt: news.createdAt ? new Date(news.createdAt) : new Date(),
            updatedAt: news.updatedAt ? new Date(news.updatedAt) : new Date()
          }));

          // 카테고리 필터링
          if (category !== NEWS_CATEGORIES.ALL) {
            newsList = newsList.filter(news => news.category === category);
          }

          // 검색어 필터링
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            newsList = newsList.filter(news => 
              news.title.toLowerCase().includes(searchLower) ||
              (news.summary && news.summary.toLowerCase().includes(searchLower)) ||
              (news.content && news.content.toLowerCase().includes(searchLower))
            );
          }

          // 날짜순 정렬
          newsList.sort((a, b) => b.publishedAt - a.publishedAt);

          console.log('✅ localStorage에서 뉴스 데이터 로드:', newsList.length, '개');
          return {
            success: true,
            data: newsList.slice(0, limitCount),
            lastDoc: null,
            hasMore: false,
            source: 'localStorage'
          };
        } catch (error) {
          console.error('❌ localStorage 뉴스 데이터 파싱 오류:', error);
        }
      }

      // 2. Firebase에서 데이터 로드
      let q = query(
        collection(db, NEWS_COLLECTION),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      );

      // 카테고리 필터링
      if (category !== NEWS_CATEGORIES.ALL) {
        q = query(q, where('category', '==', category));
      }

      // 페이지네이션
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const newsList = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        newsList.push({
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        });
      });

      // 클라이언트 사이드 검색 (Firestore의 복잡한 검색 제한으로 인해)
      let filteredNews = newsList;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredNews = newsList.filter(news => 
          news.title.toLowerCase().includes(searchLower) ||
          news.summary.toLowerCase().includes(searchLower) ||
          news.content.toLowerCase().includes(searchLower)
        );
      }

      console.log('✅ Firebase에서 뉴스 데이터 로드:', filteredNews.length, '개');
      return {
        success: true,
        data: filteredNews,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
        hasMore: snapshot.docs.length === limitCount,
        source: 'firebase'
      };
    } catch (error) {
      console.error('뉴스 목록 조회 실패:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  // 뉴스 상세 조회
  async getNewsById(id) {
    try {
      const docRef = doc(db, NEWS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...data,
            publishedAt: data.publishedAt?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          }
        };
      } else {
        return {
          success: false,
          error: '뉴스를 찾을 수 없습니다.'
        };
      }
    } catch (error) {
      console.error('뉴스 상세 조회 실패:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 뉴스 생성
  async createNews(newsData) {
    try {
      console.log('뉴스 생성 시작:', newsData);
      
      // Firebase 연결 확인
      if (!db) {
        throw new Error('Firebase 데이터베이스가 초기화되지 않았습니다.');
      }
      
      const newsRef = collection(db, NEWS_COLLECTION);
      const docData = {
        ...newsData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publishedAt: newsData.publishedAt ? Timestamp.fromDate(new Date(newsData.publishedAt)) : serverTimestamp(),
        viewCount: 0,
        isPublished: newsData.isPublished !== undefined ? newsData.isPublished : true
      };

      console.log('Firestore에 저장할 데이터:', docData);

      const docRef = await addDoc(newsRef, docData);
      
      console.log('뉴스 생성 성공, ID:', docRef.id);
      
      return {
        success: true,
        data: { id: docRef.id, ...docData },
        message: '뉴스가 성공적으로 생성되었습니다.'
      };
    } catch (error) {
      console.error('뉴스 생성 실패:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 뉴스 수정
  async updateNews(id, newsData) {
    try {
      const docRef = doc(db, NEWS_COLLECTION, id);
      const updateData = {
        ...newsData,
        updatedAt: serverTimestamp(),
        publishedAt: newsData.publishedAt ? Timestamp.fromDate(new Date(newsData.publishedAt)) : undefined
      };

      await updateDoc(docRef, updateData);
      
      return {
        success: true,
        message: '뉴스가 성공적으로 수정되었습니다.'
      };
    } catch (error) {
      console.error('뉴스 수정 실패:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 뉴스 삭제
  async deleteNews(id) {
    try {
      // 먼저 뉴스 데이터를 가져와서 이미지 URL 확인
      const newsResult = await this.getNewsById(id);
      if (!newsResult.success) {
        return newsResult;
      }

      const newsData = newsResult.data;

      // Firebase Storage에서 이미지 삭제
      if (newsData.featuredImage) {
        try {
          const imageRef = ref(storage, newsData.featuredImage);
          await deleteObject(imageRef);
        } catch (imageError) {
          console.warn('이미지 삭제 실패 (무시됨):', imageError);
        }
      }

      // Firestore에서 뉴스 삭제
      const docRef = doc(db, NEWS_COLLECTION, id);
      await deleteDoc(docRef);
      
      return {
        success: true,
        message: '뉴스가 성공적으로 삭제되었습니다.'
      };
    } catch (error) {
      console.error('뉴스 삭제 실패:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 이미지 업로드
  async uploadNewsImage(file, newsId = null) {
    try {
      console.log('이미지 업로드 시작:', { fileName: file.name, fileSize: file.size, newsId });
      
      // 파일 유효성 검사
      if (!file || !file.type.startsWith('image/')) {
        return {
          success: false,
          error: '이미지 파일만 업로드할 수 있습니다.'
        };
      }

      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: '파일 크기는 5MB 이하여야 합니다.'
        };
      }

      // Firebase Storage 연결 확인
      if (!storage) {
        console.error('Firebase Storage가 초기화되지 않았습니다.');
        return {
          success: false,
          error: 'Firebase Storage가 초기화되지 않았습니다. 관리자에게 문의하세요.'
        };
      }

      try {
        // 고유한 파일명 생성
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileName = newsId && newsId !== 'temp' ? `${newsId}_${timestamp}` : `temp_${timestamp}_${randomString}`;
        const fileExtension = file.name.split('.').pop();
        const fullFileName = `news/${fileName}.${fileExtension}`;

        console.log('업로드할 파일 경로:', fullFileName);

        // Firebase Storage에 업로드
        const imageRef = ref(storage, fullFileName);
        console.log('Firebase Storage 참조 생성 완료');
        
        // 업로드 진행률 모니터링
        const uploadTask = uploadBytes(imageRef, file);
        
        // 업로드 완료 대기
        const snapshot = await uploadTask;
        console.log('파일 업로드 완료:', snapshot.metadata);
        
        // 다운로드 URL 생성
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('다운로드 URL 생성 완료:', downloadURL);

        return {
          success: true,
          data: {
            url: downloadURL,
            path: fullFileName,
            fileName: file.name,
            size: file.size
          },
          message: '이미지가 성공적으로 업로드되었습니다.'
        };
        
      } catch (firebaseError) {
        console.error('Firebase Storage 오류:', firebaseError);
        
        // Firebase 오류에 따른 구체적인 메시지
        let errorMessage = '이미지 업로드에 실패했습니다.';
        
        if (firebaseError.code === 'storage/unauthorized') {
          errorMessage = '업로드 권한이 없습니다.';
        } else if (firebaseError.code === 'storage/canceled') {
          errorMessage = '업로드가 취소되었습니다.';
        } else if (firebaseError.code === 'storage/unknown') {
          errorMessage = '알 수 없는 오류가 발생했습니다.';
        } else if (firebaseError.message) {
          errorMessage = firebaseError.message;
        }
        
        return {
          success: false,
          error: errorMessage
        };
      }
      
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return {
        success: false,
        error: `이미지 업로드 실패: ${error.message}`
      };
    }
  }

  // 조회수 증가
  async incrementViewCount(id) {
    try {
      const newsResult = await this.getNewsById(id);
      if (!newsResult.success) {
        return newsResult;
      }

      const currentViewCount = newsResult.data.viewCount || 0;
      const docRef = doc(db, NEWS_COLLECTION, id);
      
      await updateDoc(docRef, {
        viewCount: currentViewCount + 1,
        updatedAt: serverTimestamp()
      });

      return {
        success: true,
        data: { viewCount: currentViewCount + 1 }
      };
    } catch (error) {
      console.error('조회수 증가 실패:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 최신 뉴스 조회 (홈페이지용)
  async getLatestNews(limitCount = 6) {
    try {
      const q = query(
        collection(db, NEWS_COLLECTION),
        where('isPublished', '==', true),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      const newsList = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        newsList.push({
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt?.toDate() || new Date()
        });
      });

      return {
        success: true,
        data: newsList
      };
    } catch (error) {
      console.error('최신 뉴스 조회 실패:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  // 뉴스 통계 조회
  async getNewsStats() {
    try {
      const snapshot = await getDocs(collection(db, NEWS_COLLECTION));
      const stats = {
        total: 0,
        published: 0,
        draft: 0,
        categories: {}
      };

      snapshot.forEach(doc => {
        const data = doc.data();
        stats.total++;
        
        if (data.isPublished) {
          stats.published++;
        } else {
          stats.draft++;
        }

        const category = data.category || 'unknown';
        stats.categories[category] = (stats.categories[category] || 0) + 1;
      });

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('뉴스 통계 조회 실패:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// 싱글톤 인스턴스 생성 및 내보내기
const newsService = new NewsService();
export default newsService;
