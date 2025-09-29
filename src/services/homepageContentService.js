import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Firebase 컬렉션 이름
const HOMEPAGE_CONTENT_COLLECTION = 'homepage_content';

// 콘텐츠 타입 정의
export const CONTENT_TYPES = {
  HERO: 'hero',
  ACHIEVEMENTS: 'achievements', 
  GROUP_OVERVIEW: 'groupOverview',
  SUBSIDIARIES: 'subsidiaries',
  SUBSIDIARIES_INTRO: 'subsidiariesIntro'
};

// 기본 데이터 구조
const getDefaultHomepageContent = () => ({
  hero: {
    title: "40년 축적된 기술력으로\n조명의 미래를 혁신합니다",
    subtitle: "정호그룹은 조명제어 전문 기업으로서,\n혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다",
    description: "150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다."
  },
  achievements: [
    { number: '40', suffix: '년', label: '조명제어 전문 경험' },
    { number: '800', suffix: '+', label: '프로젝트 완료' },
    { number: '7', suffix: '+', label: '해외진출국' },
    { number: '99', suffix: '%', label: '고객만족도' }
  ],
  groupOverview: {
    title: '40년 전통의 조명제어 전문기업',
    description: '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
    vision: 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
    additionalVision: '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
  },
  subsidiaries: [
    {
      id: 'clarus',
      title: '클라루스',
      subtitle: 'AI 기반 스마트 조명/전력제어',
      description: '스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문 업체',
      feature: 'AI 기반 자동 제어 시스템',
      color: '#0066CC',
      path: '/clarus',
      icon: '💡'
    },
    {
      id: 'tlc',
      title: '정호티엘씨',
      subtitle: '조명/전력제어의 설계/시공/사후관리',
      description: '공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축(시공)하고, 사후관리를 담당하는 전문업체',
      feature: 'IoT 센서 네트워크',
      color: '#28A745',
      path: '/tlc',
      icon: '📡'
    },
    {
      id: 'illutech',
      title: '일루텍',
      subtitle: '유.무선 스마트조명제품 쇼핑몰 공급',
      description: '유.무선 조명제어 제품을 국내외 유명 쇼핑몰에 전시, 판매, 시공기술지원 업체',
      feature: '스마트 물류 자동화',
      color: '#FF8C00',
      path: '/illutech',
      icon: '🚚'
    },
    {
      id: 'texcom',
      title: '정호텍스컴',
      subtitle: '섬유기계의 전통과 첨단패션을 주도하는 온라인 사업',
      description: '40년간 축적된 섬유기계 전문성과 패션브랜드 론칭을 통해 새로운 가치를 창출하는 전문업체',
      feature: '텍스타일 제어 시스템',
      color: '#FF6B9D',
      path: '/texcom',
      icon: '🧵'
    }
  ],
  subsidiariesIntro: {
    title: '4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계',
    description: '기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출'
  }
});

// 홈페이지 콘텐츠 조회
export const getHomepageContent = async () => {
  try {
    console.log('홈페이지 콘텐츠 조회 시작');
    console.log('Firebase DB 상태:', db ? '연결됨' : '연결 안됨');
    
    const q = query(collection(db, HOMEPAGE_CONTENT_COLLECTION));
    console.log('Firestore 쿼리 실행 중...');
    const querySnapshot = await getDocs(q);
    console.log('Firestore 쿼리 결과:', querySnapshot.size, '개 문서');
    
    let contentData = {};
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('문서 데이터:', doc.id, data);
      contentData[doc.id] = {
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      };
    });
    
    console.log('원본 콘텐츠 수:', Object.keys(contentData).length);
    
    // 기본 데이터와 병합
    const defaultContent = getDefaultHomepageContent();
    const mergedContent = {
      ...defaultContent,
      ...contentData
    };
    
    console.log('최종 병합된 콘텐츠:', mergedContent);
    return mergedContent;
  } catch (error) {
    console.error('홈페이지 콘텐츠 조회 오류:', error);
    console.log('오프라인 모드로 전환 - 기본 데이터 사용');
    return getDefaultHomepageContent();
  }
};

// 특정 콘텐츠 타입 조회
export const getContentByType = async (contentType) => {
  try {
    console.log('콘텐츠 타입별 조회 시작:', contentType);
    
    const q = query(
      collection(db, HOMEPAGE_CONTENT_COLLECTION),
      where('type', '==', contentType)
    );
    
    const querySnapshot = await getDocs(q);
    const contentData = [];
    
    querySnapshot.forEach((doc) => {
      contentData.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      });
    });
    
    console.log(`${contentType} 콘텐츠 조회 완료:`, contentData.length, '개');
    return contentData;
  } catch (error) {
    console.error(`${contentType} 콘텐츠 조회 오류:`, error);
    return [];
  }
};

// 홈페이지 콘텐츠 저장
export const saveHomepageContent = async (contentData) => {
  try {
    console.log('홈페이지 콘텐츠 저장 시작:', contentData);
    console.log('Firebase DB 상태:', db ? '연결됨' : '연결 안됨');
    
    const contentToSave = {
      ...contentData,
      updatedAt: serverTimestamp(),
      lastUpdated: new Date().toISOString()
    };
    
    console.log('저장할 콘텐츠 데이터:', contentToSave);
    
    // 기존 문서가 있는지 확인
    const existingQuery = query(collection(db, HOMEPAGE_CONTENT_COLLECTION));
    const existingSnapshot = await getDocs(existingQuery);
    
    if (existingSnapshot.empty) {
      // 새 문서 생성
      const docRef = await addDoc(collection(db, HOMEPAGE_CONTENT_COLLECTION), {
        ...contentToSave,
        createdAt: serverTimestamp()
      });
      console.log('새 홈페이지 콘텐츠 생성 성공:', docRef.id);
      return docRef.id;
    } else {
      // 기존 문서 업데이트
      const existingDoc = existingSnapshot.docs[0];
      await updateDoc(doc(db, HOMEPAGE_CONTENT_COLLECTION, existingDoc.id), contentToSave);
      console.log('홈페이지 콘텐츠 업데이트 성공:', existingDoc.id);
      return existingDoc.id;
    }
  } catch (error) {
    console.error('홈페이지 콘텐츠 저장 오류:', error);
    console.error('오류 상세:', error.message);
    console.error('오류 코드:', error.code);
    throw new Error('홈페이지 콘텐츠 저장에 실패했습니다: ' + error.message);
  }
};

// 특정 섹션 콘텐츠 저장
export const saveSectionContent = async (sectionType, sectionData) => {
  try {
    console.log('섹션 콘텐츠 저장 시작:', sectionType, sectionData);
    
    const contentToSave = {
      type: sectionType,
      data: sectionData,
      updatedAt: serverTimestamp(),
      lastUpdated: new Date().toISOString()
    };
    
    // 기존 섹션 문서 확인
    const q = query(
      collection(db, HOMEPAGE_CONTENT_COLLECTION),
      where('type', '==', sectionType)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // 새 섹션 생성
      const docRef = await addDoc(collection(db, HOMEPAGE_CONTENT_COLLECTION), {
        ...contentToSave,
        createdAt: serverTimestamp()
      });
      console.log(`새 ${sectionType} 섹션 생성 성공:`, docRef.id);
      return docRef.id;
    } else {
      // 기존 섹션 업데이트
      const existingDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, HOMEPAGE_CONTENT_COLLECTION, existingDoc.id), contentToSave);
      console.log(`${sectionType} 섹션 업데이트 성공:`, existingDoc.id);
      return existingDoc.id;
    }
  } catch (error) {
    console.error(`${sectionType} 섹션 저장 오류:`, error);
    throw new Error(`${sectionType} 섹션 저장에 실패했습니다: ` + error.message);
  }
};

// 홈페이지 콘텐츠 초기화 (기본 데이터로 설정)
export const initializeHomepageContent = async () => {
  try {
    console.log('홈페이지 콘텐츠 초기화 시작');
    
    const defaultContent = getDefaultHomepageContent();
    const contentId = await saveHomepageContent(defaultContent);
    
    console.log('홈페이지 콘텐츠 초기화 완료:', contentId);
    return contentId;
  } catch (error) {
    console.error('홈페이지 콘텐츠 초기화 실패:', error);
    throw error;
  }
};

// Firebase 연결 테스트
export const testFirebaseConnection = async () => {
  try {
    console.log('Firebase 연결 테스트 시작');
    console.log('Firebase DB 상태:', db ? '연결됨' : '연결 안됨');
    
    if (!db) {
      throw new Error('Firebase DB가 초기화되지 않았습니다');
    }
    
    const testQuery = query(collection(db, HOMEPAGE_CONTENT_COLLECTION));
    const testSnapshot = await getDocs(testQuery);
    
    console.log('Firebase 연결 테스트 성공:', testSnapshot.size, '개 문서');
    return {
      success: true,
      message: 'Firebase 연결 성공',
      documentCount: testSnapshot.size
    };
  } catch (error) {
    console.error('Firebase 연결 테스트 실패:', error);
    return {
      success: false,
      message: 'Firebase 연결 실패: ' + error.message,
      error: error
    };
  }
};

const homepageContentService = {
  getHomepageContent,
  getContentByType,
  saveHomepageContent,
  saveSectionContent,
  initializeHomepageContent,
  testFirebaseConnection,
  CONTENT_TYPES,
  getDefaultHomepageContent
};

export default homepageContentService;
