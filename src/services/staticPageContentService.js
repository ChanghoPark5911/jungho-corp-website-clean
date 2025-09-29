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
const STATIC_PAGES_COLLECTION = 'static_pages';

// 페이지 타입 정의
export const PAGE_TYPES = {
  BUSINESS: 'business',
  SUPPORT: 'support'
};

// 기본 데이터 구조
const getDefaultBusinessContent = () => ({
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mainCopy: "정호그룹의 사업영역",
    subCopy: "조명제어 전문기업으로서 40년간 축적된 기술력으로 다양한 분야에서 혁신적인 솔루션을 제공합니다",
    primaryAction: {
      label: "문의하기",
      path: "/support"
    }
  },
  businessAreas: [
    {
      title: "스마트 빌딩 조명제어",
      description: "IoT 기술을 활용한 지능형 빌딩 조명제어 시스템으로 에너지 효율성을 극대화합니다.",
      icon: "🏢",
      features: ["자동 밝기 조절", "모션 센서 연동", "스케줄링 기능", "원격 제어"]
    },
    {
      title: "도시 조명 인프라",
      description: "도시 전체의 조명을 통합 관리하는 스마트시티 조명제어 솔루션을 제공합니다.",
      icon: "🌃",
      features: ["중앙 집중식 제어", "실시간 모니터링", "에너지 절약", "안전성 향상"]
    },
    {
      title: "산업용 조명시스템",
      description: "물류, 데이터센터 포함, 각종 제조업의 생산성 향상을 위한 산업용 조명제어 솔루션을 공급합니다.",
      icon: "🏭",
      features: ["고정밀 조명", "내구성 설계", "안전 표준 준수", "유지보수 편의성"]
    },
    {
      title: "문화시설 조명예술",
      description: "박물관, 갤러리, 공연장 등 문화시설의 조명을 예술적으로 제어하는 시스템을 제공합니다.",
      icon: "🎭",
      features: ["색온도 조절", "다이나믹 효과", "프로그래밍", "예술적 표현"]
    }
  ],
  subsidiaries: [
    {
      name: "클라루스",
      description: "AI기반 스마트 조명/전력제어",
      color: "clarus",
      expertise: ["IoT 조명제어", "전기에너지 관리", "에너지 관리"]
    },
    {
      name: "정호티엘씨",
      description: "조명/전력제어의 설계/시공/사후관리",
      color: "tlc",
      expertise: ["조명제어설계", "최적시공", "유지보수 및 기술지원"]
    },
    {
      name: "일루텍",
      description: "유.무선 스마트조명 제품 쇼핑몰 공급",
      color: "illutech",
      expertise: ["가정용 스마트 조명", "무선조명 솔루션", "안전조명"]
    },
    {
      name: "정호텍스컴",
      description: "섬유기계의 전통과 첨단패션을 주도하는 온라인 사업",
      color: "texcom",
      expertise: ["섬유기계 도입", "섬유기계 기술지원", "섬유패션 온라인 사업"]
    }
  ],
  technology: {
    title: "차별화된 기술력",
    description: "국내 최초 E/F2-BUS 프로토콜 개발부터 최신 IoT 기술까지",
    features: [
      {
        title: "자체 개발 프로토콜",
        description: "국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 독자적인 기술력을 확보했습니다.",
        icon: "🔧"
      },
      {
        title: "IoT 통합 솔루션",
        description: "최신 IoT 기술을 활용하여 스마트한 조명제어 시스템을 구축합니다.",
        icon: "🌐"
      },
      {
        title: "에너지 효율성",
        description: "에너지 절약과 사용자 편의성을 동시에 만족시키는 솔루션을 제공합니다.",
        icon: "⚡"
      }
    ]
  },
  cta: {
    title: "프로젝트 문의하기",
    description: "정호그룹의 전문가들이 귀사의 프로젝트에 최적화된 솔루션을 제안해드립니다.",
    buttons: [
      {
        label: "문의하기",
        path: "/support",
        variant: "secondary"
      },
      {
        label: "프로젝트 보기",
        path: "/projects",
        variant: "primary"
      }
    ]
  }
});

const getDefaultSupportContent = () => ({
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mainCopy: "고객 지원",
    subCopy: "정호그룹의 전문가들이 24시간 내에 답변드립니다. 언제든지 문의해주세요.",
    primaryAction: {
      label: "지금 문의하기",
      path: "#contact"
    }
  },
  supportChannels: [
    {
      title: "전화 상담",
      description: "전문 엔지니어가 직접 답변드립니다",
      contact: "1588-1234",
      hours: "평일 09:00-18:00",
      icon: "📞",
      action: {
        label: "전화하기",
        onClick: "tel:1588-1234"
      }
    },
    {
      title: "이메일 문의",
      description: "상세한 기술 문의사항을 보내주세요",
      contact: "support@jungho.com",
      hours: "24시간 접수 가능",
      icon: "📧",
      action: {
        label: "이메일 보내기",
        onClick: "mailto:support@jungho.com"
      }
    },
    {
      title: "카카오톡",
      description: "실시간 채팅으로 빠른 답변을 받으세요",
      contact: "@정호그룹",
      hours: "평일 09:00-18:00",
      icon: "💬",
      action: {
        label: "채팅 시작",
        path: "https://open.kakao.com/정호그룹"
      }
    },
    {
      title: "온라인 문의",
      description: "웹사이트를 통한 간편한 문의",
      contact: "24시간 접수",
      hours: "24시간 접수 가능",
      icon: "🌐",
      action: {
        label: "문의하기",
        path: "#contact-form"
      }
    }
  ],
  supportServices: [
    {
      title: "기술 상담",
      description: "조명제어 시스템에 대한 전문적인 기술 상담을 제공합니다.",
      icon: "🔧",
      features: ["시스템 설계", "기술 검토", "최적화 방안", "비용 분석"]
    },
    {
      title: "설치 지원",
      description: "전문 엔지니어가 현장에서 직접 설치를 지원합니다.",
      icon: "⚙️",
      features: ["현장 설치", "시스템 연동", "테스트", "교육"]
    },
    {
      title: "유지보수",
      description: "정기적인 점검과 예방정비로 시스템을 안정적으로 운영합니다.",
      icon: "🔍",
      features: ["정기 점검", "예방정비", "고장 수리", "부품 교체"]
    },
    {
      title: "교육 서비스",
      description: "시스템 운영자를 위한 전문 교육을 제공합니다.",
      icon: "📚",
      features: ["운영 교육", "기술 교육", "매뉴얼 제공", "온라인 지원"]
    }
  ],
  faqs: [
    {
      question: "조명제어 시스템 도입에 얼마나 시간이 걸리나요?",
      answer: "프로젝트 규모에 따라 다르지만, 일반적으로 3-6개월 정도 소요됩니다. 상세한 일정은 기술 상담을 통해 안내드립니다."
    },
    {
      question: "기존 조명 시스템과 호환되나요?",
      answer: "네, 대부분의 기존 조명 시스템과 호환됩니다. 정확한 호환성은 현장 점검을 통해 확인해드립니다."
    },
    {
      question: "에너지 절약 효과는 어느 정도인가요?",
      answer: "일반적으로 20-40%의 에너지 절약 효과를 기대할 수 있습니다. 구체적인 수치는 사용 패턴에 따라 달라집니다."
    },
    {
      question: "원격 제어가 가능한가요?",
      answer: "네, IoT 기술을 활용한 원격 제어가 가능합니다. 스마트폰 앱이나 웹 인터페이스를 통해 언제든지 제어할 수 있습니다."
    },
    {
      question: "유지보수 비용은 얼마인가요?",
      answer: "시스템 규모와 서비스 수준에 따라 다르며, 연간 시스템 구축 비용의 5-10% 정도입니다. 상세한 견적은 문의해주세요."
    },
    {
      question: "긴급 상황 시 지원이 가능한가요?",
      answer: "네, 24시간 긴급 지원 서비스를 제공합니다. 전화나 온라인을 통해 언제든지 연락하실 수 있습니다."
    }
  ],
  contactForm: {
    title: "문의하기",
    description: "프로젝트에 대한 상세한 문의사항을 남겨주시면 전문가가 빠른 시일 내에 답변드립니다",
    fields: {
      name: { label: "이름", required: true, type: "text" },
      company: { label: "회사명", required: false, type: "text" },
      email: { label: "이메일", required: true, type: "email" },
      phone: { label: "연락처", required: true, type: "tel" },
      category: { 
        label: "문의 분야", 
        required: false, 
        type: "select",
        options: [
          "문의 분야를 선택하세요",
          "스마트 빌딩 조명제어",
          "도시 조명 인프라",
          "산업용 조명시스템",
          "문화시설 조명예술",
          "기술 상담",
          "기타"
        ]
      },
      message: { label: "문의 내용", required: true, type: "textarea" }
    }
  }
});

// 정적 페이지 콘텐츠 조회
export const getStaticPageContent = async (pageType) => {
  try {
    console.log('정적 페이지 콘텐츠 조회 시작:', pageType);
    console.log('Firebase DB 상태:', db ? '연결됨' : '연결 안됨');
    
    const q = query(
      collection(db, STATIC_PAGES_COLLECTION),
      where('pageType', '==', pageType)
    );
    console.log('Firestore 쿼리 실행 중...');
    const querySnapshot = await getDocs(q);
    console.log('Firestore 쿼리 결과:', querySnapshot.size, '개 문서');
    
    if (querySnapshot.empty) {
      console.log('해당 페이지 타입의 콘텐츠가 없습니다. 기본 데이터 사용');
      return getDefaultContentByType(pageType);
    }
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    console.log('문서 데이터:', doc.id, data);
    
    const contentData = {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date()
    };
    
    console.log('정적 페이지 콘텐츠 조회 성공:', contentData);
    return contentData;
  } catch (error) {
    console.error('정적 페이지 콘텐츠 조회 오류:', error);
    console.log('오프라인 모드로 전환 - 기본 데이터 사용');
    return getDefaultContentByType(pageType);
  }
};

// 페이지 타입별 기본 데이터 반환
const getDefaultContentByType = (pageType) => {
  switch (pageType) {
    case PAGE_TYPES.BUSINESS:
      return getDefaultBusinessContent();
    case PAGE_TYPES.SUPPORT:
      return getDefaultSupportContent();
    default:
      return {};
  }
};

// 정적 페이지 콘텐츠 저장
export const saveStaticPageContent = async (pageType, contentData) => {
  try {
    console.log('정적 페이지 콘텐츠 저장 시작:', pageType, contentData);
    console.log('Firebase DB 상태:', db ? '연결됨' : '연결 안됨');
    
    const contentToSave = {
      pageType,
      ...contentData,
      updatedAt: serverTimestamp(),
      lastUpdated: new Date().toISOString()
    };
    
    console.log('저장할 콘텐츠 데이터:', contentToSave);
    
    // 기존 문서가 있는지 확인
    const existingQuery = query(
      collection(db, STATIC_PAGES_COLLECTION),
      where('pageType', '==', pageType)
    );
    const existingSnapshot = await getDocs(existingQuery);
    
    if (existingSnapshot.empty) {
      // 새 문서 생성
      const docRef = await addDoc(collection(db, STATIC_PAGES_COLLECTION), {
        ...contentToSave,
        createdAt: serverTimestamp()
      });
      console.log('새 정적 페이지 콘텐츠 생성 성공:', docRef.id);
      return docRef.id;
    } else {
      // 기존 문서 업데이트
      const existingDoc = existingSnapshot.docs[0];
      await updateDoc(doc(db, STATIC_PAGES_COLLECTION, existingDoc.id), contentToSave);
      console.log('정적 페이지 콘텐츠 업데이트 성공:', existingDoc.id);
      return existingDoc.id;
    }
  } catch (error) {
    console.error('정적 페이지 콘텐츠 저장 오류:', error);
    console.error('오류 상세:', error.message);
    console.error('오류 코드:', error.code);
    throw new Error('정적 페이지 콘텐츠 저장에 실패했습니다: ' + error.message);
  }
};

// 정적 페이지 콘텐츠 초기화
export const initializeStaticPageContent = async (pageType) => {
  try {
    console.log('정적 페이지 콘텐츠 초기화 시작:', pageType);
    
    const defaultContent = getDefaultContentByType(pageType);
    const contentId = await saveStaticPageContent(pageType, defaultContent);
    
    console.log('정적 페이지 콘텐츠 초기화 완료:', contentId);
    return contentId;
  } catch (error) {
    console.error('정적 페이지 콘텐츠 초기화 실패:', error);
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
    
    const testQuery = query(collection(db, STATIC_PAGES_COLLECTION));
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

const staticPageContentService = {
  getStaticPageContent,
  saveStaticPageContent,
  initializeStaticPageContent,
  testFirebaseConnection,
  PAGE_TYPES,
  getDefaultBusinessContent,
  getDefaultSupportContent
};

export default staticPageContentService;
