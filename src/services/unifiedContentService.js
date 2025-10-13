import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// 지원하는 언어
export const SUPPORTED_LANGUAGES = {
  ko: { name: '한국어', flag: '🇰🇷' },
  en: { name: 'English', flag: '🇺🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  zh: { name: '中文', flag: '🇨🇳' }
};

// Firebase 컬렉션 이름
const UNIFIED_CONTENT_COLLECTION = 'unified_content';

// 기본 한국어 콘텐츠
const getDefaultKoreanContent = () => ({
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

// 통합 콘텐츠 초기화
export const initializeUnifiedContent = async () => {
  try {
    console.log('🚀 통합 콘텐츠 초기화 시작...');
    
    const defaultKoreanContent = getDefaultKoreanContent();
    
    // 통합 데이터 구조 생성
    const unifiedData = {
      homepage: {
        ko: defaultKoreanContent,
        en: null, // 나중에 번역
        ja: null, // 나중에 번역  
        zh: null  // 나중에 번역
      },
      lastUpdated: serverTimestamp(),
      createdAt: serverTimestamp()
    };
    
    // Firebase에 저장
    const docRef = doc(db, UNIFIED_CONTENT_COLLECTION, 'main');
    await setDoc(docRef, unifiedData);
    
    console.log('✅ 통합 콘텐츠 초기화 완료');
    return { success: true, message: '통합 콘텐츠가 성공적으로 초기화되었습니다.' };
  } catch (error) {
    console.error('❌ 통합 콘텐츠 초기화 실패:', error);
    return { success: false, message: '초기화 실패: ' + error.message };
  }
};

// 특정 언어의 콘텐츠 로드
export const loadContentByLanguage = async (language = 'ko') => {
  try {
    console.log(`📖 ${language} 콘텐츠 로드 시작...`);
    
    const docRef = doc(db, UNIFIED_CONTENT_COLLECTION, 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const content = data.homepage?.[language];
      
      if (content) {
        console.log(`✅ ${language} 콘텐츠 로드 성공`);
        return content;
      } else {
        console.log(`⚠️ ${language} 콘텐츠 없음, 한국어 기본값 사용`);
        return data.homepage?.ko || getDefaultKoreanContent();
      }
    } else {
      console.log('⚠️ 통합 콘텐츠 없음, 기본값 사용');
      return getDefaultKoreanContent();
    }
  } catch (error) {
    console.error(`❌ ${language} 콘텐츠 로드 실패:`, error);
    return getDefaultKoreanContent();
  }
};

// 특정 언어의 콘텐츠 저장
export const saveContentByLanguage = async (language, content) => {
  try {
    console.log(`💾 ${language} 콘텐츠 저장 시작...`);
    
    const docRef = doc(db, UNIFIED_CONTENT_COLLECTION, 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // 기존 데이터 업데이트
      const existingData = docSnap.data();
      const updatedData = {
        ...existingData,
        homepage: {
          ...existingData.homepage,
          [language]: content
        },
        lastUpdated: serverTimestamp()
      };
      
      await updateDoc(docRef, updatedData);
      console.log(`✅ ${language} 콘텐츠 저장 완료`);
      return { success: true, message: `${language} 콘텐츠가 저장되었습니다.` };
    } else {
      // 새 문서 생성
      const newData = {
        homepage: {
          [language]: content
        },
        lastUpdated: serverTimestamp(),
        createdAt: serverTimestamp()
      };
      
      await setDoc(docRef, newData);
      console.log(`✅ ${language} 콘텐츠 새로 생성 완료`);
      return { success: true, message: `${language} 콘텐츠가 생성되었습니다.` };
    }
  } catch (error) {
    console.error(`❌ ${language} 콘텐츠 저장 실패:`, error);
    return { success: false, message: '저장 실패: ' + error.message };
  }
};

// 모든 언어 콘텐츠 로드
export const loadAllLanguageContent = async () => {
  try {
    console.log('📖 모든 언어 콘텐츠 로드 시작...');
    
    const docRef = doc(db, UNIFIED_CONTENT_COLLECTION, 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('✅ 모든 언어 콘텐츠 로드 성공');
      return data.homepage || {};
    } else {
      console.log('⚠️ 통합 콘텐츠 없음, 초기화 필요');
      return {};
    }
  } catch (error) {
    console.error('❌ 모든 언어 콘텐츠 로드 실패:', error);
    return {};
  }
};

// Firebase 연결 테스트
export const testFirebaseConnection = async () => {
  try {
    console.log('🔗 Firebase 연결 테스트 시작...');
    
    const docRef = doc(db, UNIFIED_CONTENT_COLLECTION, 'test');
    await setDoc(docRef, { test: true, timestamp: serverTimestamp() });
    
    console.log('✅ Firebase 연결 테스트 성공');
    return { success: true, message: 'Firebase 연결 성공' };
  } catch (error) {
    console.error('❌ Firebase 연결 테스트 실패:', error);
    return { success: false, message: 'Firebase 연결 실패: ' + error.message };
  }
};

const unifiedContentService = {
  initializeUnifiedContent,
  loadContentByLanguage,
  saveContentByLanguage,
  loadAllLanguageContent,
  testFirebaseConnection,
  SUPPORTED_LANGUAGES,
  getDefaultKoreanContent
};

export default unifiedContentService;
