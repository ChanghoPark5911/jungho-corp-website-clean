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
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

// 프로젝트 컬렉션 이름
const PROJECTS_COLLECTION = 'projects';

// 프로젝트 카테고리
export const PROJECT_CATEGORIES = {
  ALL: 'all',
  SMART_BUILDING: 'smart_building',
  PUBLIC_FACILITY: 'public_facility',
  INDUSTRIAL_FACILITY: 'industrial_facility',
  LOGISTICS_DATACENTER: 'logistics_datacenter',
  CULTURAL_FACILITY: 'cultural_facility',
  TOURIST_FACILITY: 'tourist_facility'
};

// 프로젝트 카테고리 라벨
export const PROJECT_CATEGORY_LABELS = {
  [PROJECT_CATEGORIES.ALL]: '전체',
  [PROJECT_CATEGORIES.SMART_BUILDING]: '스마트빌딩',
  [PROJECT_CATEGORIES.PUBLIC_FACILITY]: '공공시설',
  [PROJECT_CATEGORIES.INDUSTRIAL_FACILITY]: '산업용시설',
  [PROJECT_CATEGORIES.LOGISTICS_DATACENTER]: '물류 및 데이터센터',
  [PROJECT_CATEGORIES.CULTURAL_FACILITY]: '문화시설',
  [PROJECT_CATEGORIES.TOURIST_FACILITY]: '관광시설'
};

// 프로젝트 목록 조회
export const getProjectList = async (category = PROJECT_CATEGORIES.ALL, limitCount = 50) => {
  try {
    console.log('프로젝트 목록 조회 시작:', { category, limitCount });
    
    // 1. localStorage에서 관리자가 추가한 프로젝트 확인
    let adminProjects = [];
    const localProjects = localStorage.getItem('projects_data');
    if (localProjects) {
      try {
        adminProjects = JSON.parse(localProjects);
        console.log('✅ localStorage에서 관리자 프로젝트 로드:', adminProjects.length, '개');
        
        // 날짜 변환
        adminProjects = adminProjects.map(project => ({
          ...project,
          createdAt: project.createdAt ? new Date(project.createdAt) : new Date(),
          updatedAt: project.updatedAt ? new Date(project.updatedAt) : new Date(),
          publishedAt: project.publishedAt ? new Date(project.publishedAt) : new Date(),
          source: 'admin' // 관리자 프로젝트 표시
        }));
        
        // 게시 상태 필터링
        adminProjects = adminProjects.filter(project => project.isPublished !== false);
        console.log('게시된 관리자 프로젝트 수:', adminProjects.length);
      } catch (error) {
        console.error('❌ localStorage 프로젝트 데이터 파싱 오류:', error);
      }
    }
    
    // 2. 기본 프로젝트 데이터 가져오기
    const defaultProjects = getDefaultProjects().map(project => ({
      ...project,
      source: 'default' // 기본 프로젝트 표시
    }));
    console.log('✅ 기본 프로젝트 로드:', defaultProjects.length, '개');
    
    // 3. 관리자 프로젝트 + 기본 프로젝트 합치기
    let allProjects = [...adminProjects, ...defaultProjects];
    console.log('✅ 전체 프로젝트 수 (합계):', allProjects.length, '개');
    
    // 4. 카테고리 필터링
    if (category !== PROJECT_CATEGORIES.ALL) {
      allProjects = allProjects.filter(project => project.category === category);
      console.log('카테고리 필터링 후:', allProjects.length);
    }
    
    // 5. 정렬 (최신순)
    allProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // 6. 제한
    if (limitCount) {
      allProjects = allProjects.slice(0, limitCount);
    }
    
    console.log('✅ 최종 프로젝트 수:', allProjects.length, '개');
    return allProjects;
  } catch (error) {
    console.error('프로젝트 목록 조회 오류:', error);
    console.log('오프라인 모드로 전환 - 기본 데이터 사용');
    // 오프라인 모드에서는 기본 데이터 반환
    const defaultProjects = getDefaultProjects();
    const filteredProjects = defaultProjects.filter(project => 
      category === PROJECT_CATEGORIES.ALL || project.category === category
    );
    console.log('기본 데이터 프로젝트 수:', filteredProjects.length);
    return filteredProjects;
  }
};

// 특정 프로젝트 조회
export const getProjectById = async (projectId) => {
  try {
    console.log('프로젝트 조회 시작:', projectId);
    
    const projectDoc = await getDoc(doc(db, PROJECTS_COLLECTION, projectId));
    
    if (!projectDoc.exists()) {
      throw new Error('프로젝트를 찾을 수 없습니다.');
    }
    
    const data = projectDoc.data();
    const project = {
      id: projectDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date(),
      publishedAt: data.publishedAt?.toDate?.() || new Date()
    };
    
    console.log('프로젝트 조회 성공:', project.title);
    return project;
  } catch (error) {
    console.error('프로젝트 조회 오류:', error);
    throw new Error('프로젝트를 불러오는데 실패했습니다: ' + error.message);
  }
};

// 프로젝트 생성
export const createProject = async (projectData) => {
  try {
    console.log('프로젝트 생성 시작:', projectData.title);
    console.log('Firebase DB 상태:', db ? '연결됨' : '연결 안됨');
    console.log('프로젝트 데이터:', projectData);
    
    const projectToSave = {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: projectData.isPublished ? serverTimestamp() : null,
      viewCount: 0,
      likeCount: 0
    };
    
    console.log('저장할 프로젝트 데이터:', projectToSave);
    
    const projectRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectToSave);
    
    console.log('프로젝트 생성 성공:', projectRef.id);
    console.log('생성된 프로젝트 ID:', projectRef.id);
    return projectRef.id;
  } catch (error) {
    console.error('프로젝트 생성 오류:', error);
    console.error('오류 상세:', error.message);
    console.error('오류 코드:', error.code);
    throw new Error('프로젝트 생성에 실패했습니다: ' + error.message);
  }
};

// 프로젝트 수정
export const updateProject = async (projectId, projectData) => {
  try {
    console.log('프로젝트 수정 시작:', projectId);
    
    const updateData = {
      ...projectData,
      updatedAt: serverTimestamp()
    };
    
    // 게시 상태가 변경된 경우 publishedAt 업데이트
    if (projectData.isPublished !== undefined) {
      updateData.publishedAt = projectData.isPublished ? serverTimestamp() : null;
    }
    
    await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), updateData);
    
    console.log('프로젝트 수정 성공:', projectId);
  } catch (error) {
    console.error('프로젝트 수정 오류:', error);
    throw new Error('프로젝트 수정에 실패했습니다: ' + error.message);
  }
};

// 프로젝트 삭제
export const deleteProject = async (projectId) => {
  try {
    console.log('프로젝트 삭제 시작:', projectId);
    
    // 프로젝트 정보 먼저 조회 (이미지 삭제를 위해)
    const project = await getProjectById(projectId);
    
    // Firebase Storage에서 이미지 삭제
    if (project.featuredImageUrl && project.featuredImageUrl.includes('firebasestorage.googleapis.com')) {
      try {
        const imageRef = ref(storage, project.featuredImageUrl);
        await deleteObject(imageRef);
        console.log('프로젝트 이미지 삭제 성공');
      } catch (imageError) {
        console.warn('이미지 삭제 실패 (무시됨):', imageError.message);
      }
    }
    
    // Firestore에서 프로젝트 삭제
    await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
    
    console.log('프로젝트 삭제 성공:', projectId);
  } catch (error) {
    console.error('프로젝트 삭제 오류:', error);
    throw new Error('프로젝트 삭제에 실패했습니다: ' + error.message);
  }
};

// 조회수 증가
export const incrementViewCount = async (projectId) => {
  try {
    console.log('프로젝트 조회수 증가:', projectId);
    
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (projectDoc.exists()) {
      const currentViewCount = projectDoc.data().viewCount || 0;
      await updateDoc(projectRef, {
        viewCount: currentViewCount + 1
      });
      console.log('조회수 증가 성공:', currentViewCount + 1);
    }
  } catch (error) {
    console.error('조회수 증가 오류:', error);
    // 조회수 증가 실패는 사용자 경험에 영향을 주지 않도록 조용히 처리
  }
};

// 좋아요 수 증가
export const incrementLikeCount = async (projectId) => {
  try {
    console.log('프로젝트 좋아요 수 증가:', projectId);
    
    const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (projectDoc.exists()) {
      const currentLikeCount = projectDoc.data().likeCount || 0;
      await updateDoc(projectRef, {
        likeCount: currentLikeCount + 1
      });
      console.log('좋아요 수 증가 성공:', currentLikeCount + 1);
    }
  } catch (error) {
    console.error('좋아요 수 증가 오류:', error);
    throw new Error('좋아요 처리에 실패했습니다: ' + error.message);
  }
};

// 프로젝트 이미지 업로드
export const uploadProjectImage = async (file, projectId = null) => {
  try {
    console.log('프로젝트 이미지 업로드 시작:', file.name);
    
    // 파일 유효성 검사
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('이미지 파일만 업로드할 수 있습니다.');
    }
    
    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('이미지 크기는 5MB를 초과할 수 없습니다.');
    }
    
    // Firebase Storage 초기화 확인
    if (!storage) {
      throw new Error('Firebase Storage가 초기화되지 않았습니다.');
    }
    
    // 파일명 생성 (중복 방지)
    const timestamp = Date.now();
    const fileName = `projects/${projectId || 'temp'}/${timestamp}_${file.name}`;
    
    // Storage 참조 생성
    const imageRef = ref(storage, fileName);
    
    console.log('이미지 업로드 중...', fileName);
    
    // 파일 업로드
    const snapshot = await uploadBytes(imageRef, file);
    
    // 다운로드 URL 생성
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('프로젝트 이미지 업로드 성공:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('프로젝트 이미지 업로드 오류:', error);
    
    // Firebase Storage 관련 오류 메시지 개선
    if (error.code === 'storage/unauthorized') {
      throw new Error('Firebase Storage 권한이 없습니다. 설정을 확인해주세요.');
    } else if (error.code === 'storage/object-not-found') {
      throw new Error('업로드할 파일을 찾을 수 없습니다.');
    } else if (error.code === 'storage/quota-exceeded') {
      throw new Error('Firebase Storage 용량이 부족합니다.');
    } else if (error.code === 'storage/unauthenticated') {
      throw new Error('Firebase 인증이 필요합니다.');
    }
    
    throw new Error('이미지 업로드에 실패했습니다: ' + error.message);
  }
};

// 검색 기능
export const searchProjects = async (searchTerm, category = PROJECT_CATEGORIES.ALL) => {
  try {
    console.log('프로젝트 검색 시작:', { searchTerm, category });
    
    let q = query(collection(db, PROJECTS_COLLECTION));
    
    // 카테고리 필터링
    if (category !== PROJECT_CATEGORIES.ALL) {
      q = query(q, where('category', '==', category));
    }
    
    // 정렬
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const projects = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const project = {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        publishedAt: data.publishedAt?.toDate?.() || new Date()
      };
      
      // 검색어 필터링 (제목, 설명, 기술스택에서 검색)
      const searchFields = [
        project.title,
        project.description,
        project.techStack?.join(' '),
        project.client,
        project.tags?.join(' ')
      ].filter(Boolean).join(' ').toLowerCase();
      
      if (searchFields.includes(searchTerm.toLowerCase())) {
        projects.push(project);
      }
    });
    
    console.log('프로젝트 검색 성공:', projects.length, '개');
    return projects;
  } catch (error) {
    console.error('프로젝트 검색 오류:', error);
    throw new Error('프로젝트 검색에 실패했습니다: ' + error.message);
  }
};

// 주요 프로젝트 조회 (isFeatured: true인 프로젝트들)
export const getFeaturedProjects = async () => {
  try {
    console.log('주요 프로젝트 조회 시작');
    
    // 1. localStorage에서 관리자가 추가한 프로젝트 확인
    let adminProjects = [];
    const localProjects = localStorage.getItem('projects_data');
    if (localProjects) {
      try {
        adminProjects = JSON.parse(localProjects);
        console.log('✅ localStorage에서 관리자 프로젝트 로드:', adminProjects.length, '개');
        
        // 날짜 변환 및 주요 프로젝트 필터링
        adminProjects = adminProjects
          .map(project => ({
            ...project,
            createdAt: project.createdAt ? new Date(project.createdAt) : new Date(),
            updatedAt: project.updatedAt ? new Date(project.updatedAt) : new Date(),
            publishedAt: project.publishedAt ? new Date(project.publishedAt) : new Date(),
            source: 'admin'
          }))
          .filter(project => 
            project.isPublished !== false && project.isFeatured === true
          );
        
        console.log('주요 프로젝트 (관리자):', adminProjects.length, '개');
      } catch (error) {
        console.error('❌ localStorage 프로젝트 데이터 파싱 오류:', error);
      }
    }
    
    // 2. 기본 프로젝트에서 주요 프로젝트 가져오기
    const defaultProjects = getDefaultProjects()
      .filter(project => project.isFeatured === true)
      .map(project => ({ ...project, source: 'default' }));
    console.log('주요 프로젝트 (기본):', defaultProjects.length, '개');
    
    // 3. 합치기
    let allFeaturedProjects = [...adminProjects, ...defaultProjects];
    
    // 4. 정렬 (최신순)
    allFeaturedProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    console.log('✅ 전체 주요 프로젝트 수:', allFeaturedProjects.length, '개');
    return allFeaturedProjects;
  } catch (error) {
    console.error('주요 프로젝트 조회 오류:', error);
    // 오프라인 모드에서는 기본 데이터 반환
    const defaultProjects = getDefaultProjects();
    return defaultProjects.filter(project => project.isFeatured);
  }
};

// 기본 프로젝트 데이터 (오프라인용) - 실제 회사 프로젝트들
export const getDefaultProjects = () => {
  return [
    {
      id: 'default-1',
      title: '삼성전자 반도체 공장',
      description: '삼성전자 반도체 제조 공장의 조명제어 시스템을 구축하여 생산성 향상과 에너지 절약을 동시에 달성했습니다.',
      category: PROJECT_CATEGORIES.INDUSTRIAL_FACILITY,
      client: '삼성전자',
      duration: '6개월',
      teamSize: '8명',
      projectOverview: {
        period: '6개월',
        area: '50,000㎡',
        features: ['고정밀 조명제어', '안전성 향상', '원격 모니터링', '자동화 시스템'],
        effects: '30% 에너지 절약'
      },
      isFeatured: true,
      featuredImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-01-15'),
      publishedAt: new Date('2023-01-15')
    },
    {
      id: 'default-2',
      title: '서울시 스마트시티 조명',
      description: '서울시 전체 도로조명을 스마트 조명제어 시스템으로 업그레이드하여 도시의 안전성과 에너지 효율성을 개선했습니다.',
      category: PROJECT_CATEGORIES.PUBLIC_FACILITY,
      client: '서울시청',
      duration: '2년',
      teamSize: '12명',
      projectOverview: {
        period: '2년',
        area: '전 서울시',
        features: ['중앙 집중식 제어', '실시간 모니터링', '자동 점등/소등', '안전성 향상'],
        effects: '40% 에너지 절약'
      },
      isFeatured: true,
      featuredImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      createdAt: new Date('2022-03-01'),
      updatedAt: new Date('2022-03-01'),
      publishedAt: new Date('2022-03-01')
    },
    {
      id: 'default-3',
      title: '롯데월드타워',
      description: '롯데월드타워의 조명제어 시스템을 구축하여 건물의 아름다움과 기능성을 동시에 만족시키는 솔루션을 제공했습니다.',
      category: PROJECT_CATEGORIES.SMART_BUILDING,
      client: '롯데건설',
      duration: '1년',
      teamSize: '6명',
      projectOverview: {
        period: '1년',
        area: '123층',
        features: ['IoT 조명제어', '스케줄링', '원격 제어', '에너지 관리'],
        effects: '25% 에너지 절약'
      },
      isFeatured: true,
      featuredImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      createdAt: new Date('2021-06-01'),
      updatedAt: new Date('2021-06-01'),
      publishedAt: new Date('2021-06-01')
    },
    {
      id: 'default-4',
      title: '국립중앙박물관',
      description: '국립중앙박물관의 전시 조명을 예술적으로 제어하여 관람객들에게 최적의 관람 환경을 제공합니다.',
      category: PROJECT_CATEGORIES.CULTURAL_FACILITY,
      client: '국립중앙박물관',
      duration: '8개월',
      teamSize: '4명',
      projectOverview: {
        period: '8개월',
        area: '전시관 전체',
        features: ['예술적 조명', '색온도 조절', '프로그래밍', '보존 조명'],
        effects: '문화적 가치 증대'
      },
      isFeatured: true,
      featuredImageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      createdAt: new Date('2020-09-01'),
      updatedAt: new Date('2020-09-01'),
      publishedAt: new Date('2020-09-01')
    },
    {
      id: 'default-5',
      title: '인천국제공항',
      description: '인천국제공항의 조명제어 시스템을 구축하여 안전성과 효율성을 동시에 만족시키는 솔루션을 제공했습니다.',
      category: PROJECT_CATEGORIES.PUBLIC_FACILITY,
      client: '인천국제공항공사',
      duration: '1.5년',
      teamSize: '10명',
      projectOverview: {
        period: '1.5년',
        area: '공항 전체',
        features: ['24시간 운영', '안전 조명', '자동 점검', '원격 관리'],
        effects: '35% 에너지 절약'
      },
      isFeatured: true,
      featuredImageUrl: 'https://images.unsplash.com/photo-1436491865332-9a4e7380ffa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      createdAt: new Date('2019-04-01'),
      updatedAt: new Date('2019-04-01'),
      publishedAt: new Date('2019-04-01')
    },
    {
      id: 'default-6',
      title: '부산 해운대 마린시티',
      description: '부산 해운대 마린시티의 야간 조명을 아름답게 제어하여 관광지의 매력을 극대화했습니다.',
      category: PROJECT_CATEGORIES.TOURIST_FACILITY,
      client: '부산시청',
      duration: '10개월',
      teamSize: '5명',
      projectOverview: {
        period: '10개월',
        area: '해운대 일대',
        features: ['관광 조명', '다이나믹 효과', '절전 모드', '스케줄링'],
        effects: '관광객 증가'
      },
      isFeatured: true,
      featuredImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      createdAt: new Date('2018-08-01'),
      updatedAt: new Date('2018-08-01'),
      publishedAt: new Date('2018-08-01')
    }
  ];
};

// 테스트용 프로젝트 생성 (Firebase에 샘플 데이터 추가)
export const createTestProject = async () => {
  try {
    console.log('테스트 프로젝트 생성 시작');
    
    const testProject = {
      title: '테스트 프로젝트',
      description: 'Firebase 연결 테스트를 위한 샘플 프로젝트입니다.',
      category: PROJECT_CATEGORIES.SMART_BUILDING,
      client: '테스트 고객사',
      duration: '3개월',
      teamSize: '5명',
      isFeatured: true,
      isPublished: true,
      projectOverview: {
        period: '3개월',
        area: '1,000㎡',
        features: ['테스트 기능1', '테스트 기능2', '테스트 기능3'],
        effects: '테스트 효과'
      }
    };
    
    const projectId = await createProject(testProject);
    console.log('테스트 프로젝트 생성 완료:', projectId);
    return projectId;
  } catch (error) {
    console.error('테스트 프로젝트 생성 실패:', error);
    throw error;
  }
};

// 기존 주요 프로젝트들을 Firebase에 등록
export const createDefaultProjects = async () => {
  try {
    console.log('기존 주요 프로젝트 등록 시작');
    
    const defaultProjects = getDefaultProjects();
    const createdProjects = [];
    
    for (const project of defaultProjects) {
      try {
        // id를 제거하고 새로 생성
        const { id, ...projectData } = project;
        const projectId = await createProject(projectData);
        createdProjects.push({ ...projectData, id: projectId });
        console.log(`프로젝트 생성 완료: ${project.title} (${projectId})`);
      } catch (error) {
        console.error(`프로젝트 생성 실패: ${project.title}`, error);
      }
    }
    
    console.log('기존 주요 프로젝트 등록 완료:', createdProjects.length, '개');
    return createdProjects;
  } catch (error) {
    console.error('기존 주요 프로젝트 등록 실패:', error);
    throw error;
  }
};

const projectService = {
  getProjectList,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  incrementViewCount,
  incrementLikeCount,
  uploadProjectImage,
  searchProjects,
  getFeaturedProjects,
  getDefaultProjects,
  createTestProject,
  createDefaultProjects,
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_LABELS
};

export default projectService;
