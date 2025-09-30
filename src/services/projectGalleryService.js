// 프로젝트 갤러리 데이터 서비스
class ProjectGalleryService {
  constructor() {
    this.projects = [];
    this.loadProjects();
  }

  // 기본 프로젝트 데이터
  getDefaultProjects() {
    return [
      {
        id: 'smart-building-1',
        title: '삼성전자 디지털시티 스마트 조명 시스템',
        description: '삼성전자 디지털시티에 구축된 통합 스마트 조명 제어 시스템으로, IoT 기반의 자동 조명 제어와 에너지 효율성을 극대화했습니다.',
        category: '스마트빌딩',
        year: '2023',
        duration: '6개월',
        client: '삼성전자',
        team: '프로젝트 매니저 1명, 시스템 엔지니어 3명, 현장 기술자 5명',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['E/F2-BUS', 'IoT', 'DALI', 'KNX', 'BACnet', 'Modbus'],
        details: [
          '총 15,000개 조명 포인트 제어',
          '에너지 절약 35% 달성',
          '24시간 무중단 모니터링 시스템 구축',
          '모바일 앱을 통한 원격 제어 가능'
        ],
        demoUrl: '#',
        caseStudyUrl: '#'
      },
      {
        id: 'led-street-1',
        title: '서울시 스마트 가로등 프로젝트',
        description: '서울시 전역에 설치된 스마트 LED 가로등 시스템으로, 날씨와 시간대에 따른 자동 조명 제어와 에너지 절약을 실현했습니다.',
        category: '스마트시티',
        year: '2022',
        duration: '12개월',
        client: '서울특별시',
        team: '프로젝트 매니저 2명, 시스템 엔지니어 5명, 현장 기술자 15명',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['LED', 'IoT', '센서', '무선통신', '클라우드'],
        details: [
          '총 50,000개 가로등 교체',
          '에너지 절약 60% 달성',
          '스마트 센서를 통한 자동 조명 제어',
          '실시간 모니터링 및 유지보수 시스템'
        ],
        demoUrl: '#',
        caseStudyUrl: '#'
      },
      {
        id: 'industrial-1',
        title: '현대자동차 울산공장 조명 제어 시스템',
        description: '현대자동차 울산공장에 구축된 산업용 조명 제어 시스템으로, 생산라인별 맞춤형 조명 환경을 제공합니다.',
        category: '산업용',
        year: '2023',
        duration: '8개월',
        client: '현대자동차',
        team: '프로젝트 매니저 1명, 시스템 엔지니어 4명, 현장 기술자 8명',
        image: 'https://images.unsplash.com/photo-1581091226825-a4e2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['E/F2-BUS', '산업용 프로토콜', 'PLC', 'HMI', 'SCADA'],
        details: [
          '총 8개 생산라인 조명 제어',
          '작업 환경 최적화로 생산성 15% 향상',
          '에너지 절약 25% 달성',
          '24시간 무중단 운영 보장'
        ],
        demoUrl: '#',
        caseStudyUrl: '#'
      },
      {
        id: 'retail-1',
        title: '롯데월드몰 리테일 조명 시스템',
        description: '롯데월드몰에 구축된 리테일 환경 맞춤형 조명 시스템으로, 매장별 특성에 맞는 조명 환경을 제공합니다.',
        category: '리테일',
        year: '2022',
        duration: '4개월',
        client: '롯데월드몰',
        team: '프로젝트 매니저 1명, 시스템 엔지니어 2명, 현장 기술자 6명',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['LED', 'DALI', 'DMX', '무선통신', '센서'],
        details: [
          '총 200개 매장 조명 제어',
          '매장별 맞춤형 조명 시나리오',
          '에너지 절약 30% 달성',
          '고객 만족도 20% 향상'
        ],
        demoUrl: '#',
        caseStudyUrl: '#'
      },
      {
        id: 'hospital-1',
        title: '서울대병원 의료용 조명 시스템',
        description: '서울대병원에 구축된 의료 환경 맞춤형 조명 시스템으로, 환자와 의료진의 안전과 편의를 최우선으로 설계했습니다.',
        category: '의료용',
        year: '2023',
        duration: '10개월',
        client: '서울대병원',
        team: '프로젝트 매니저 1명, 시스템 엔지니어 3명, 의료진 컨설팅',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['의료용 LED', '무균환경', '감염방지', '응급조명', '백업시스템'],
        details: [
          '총 5개 병동 조명 시스템 구축',
          '무균환경 조명 100% 달성',
          '응급상황 대응 조명 시스템',
          '의료진 작업 효율성 25% 향상'
        ],
        demoUrl: '#',
        caseStudyUrl: '#'
      },
      {
        id: 'hotel-1',
        title: '신라호텔 럭셔리 조명 시스템',
        description: '신라호텔에 구축된 럭셔리 호텔 환경 맞춤형 조명 시스템으로, 고객의 편의와 분위기 연출을 동시에 실현했습니다.',
        category: '호텔',
        year: '2022',
        duration: '6개월',
        client: '신라호텔',
        team: '프로젝트 매니저 1명, 시스템 엔지니어 3명, 인테리어 디자이너 협업',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['럭셔리 LED', 'DMX', '무선통신', '센서', '자동제어'],
        details: [
          '총 300개 객실 조명 제어',
          '시간대별 분위기 조명 자동 전환',
          '에너지 절약 40% 달성',
          '고객 만족도 30% 향상'
        ],
        demoUrl: '#',
        caseStudyUrl: '#'
      }
    ];
  }

  // 프로젝트 데이터 로드
  loadProjects() {
    try {
      // localStorage에서 프로젝트 데이터 로드
      const storedProjects = localStorage.getItem('projectGallery');
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
        console.log('프로젝트 갤러리 데이터 로드 완료:', this.projects.length, '개');
      } else {
        // 기본 데이터 사용
        this.projects = this.getDefaultProjects();
        this.saveProjects();
        console.log('기본 프로젝트 갤러리 데이터 생성 완료');
      }
    } catch (error) {
      console.error('프로젝트 갤러리 데이터 로드 오류:', error);
      this.projects = this.getDefaultProjects();
    }
  }

  // 프로젝트 데이터 저장
  saveProjects() {
    try {
      localStorage.setItem('projectGallery', JSON.stringify(this.projects));
      console.log('프로젝트 갤러리 데이터 저장 완료');
    } catch (error) {
      console.error('프로젝트 갤러리 데이터 저장 오류:', error);
    }
  }

  // 모든 프로젝트 가져오기
  getAllProjects() {
    return this.projects;
  }

  // 카테고리별 프로젝트 가져오기
  getProjectsByCategory(category) {
    if (category === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === category);
  }

  // 특정 프로젝트 가져오기
  getProjectById(id) {
    return this.projects.find(project => project.id === id);
  }

  // 프로젝트 검색
  searchProjects(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.category.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
    );
  }

  // 프로젝트 추가
  addProject(project) {
    const newProject = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    this.projects.push(newProject);
    this.saveProjects();
    return newProject;
  }

  // 프로젝트 업데이트
  updateProject(id, updates) {
    const index = this.projects.findIndex(project => project.id === id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updates };
      this.saveProjects();
      return this.projects[index];
    }
    return null;
  }

  // 프로젝트 삭제
  deleteProject(id) {
    const index = this.projects.findIndex(project => project.id === id);
    if (index !== -1) {
      const deletedProject = this.projects.splice(index, 1)[0];
      this.saveProjects();
      return deletedProject;
    }
    return null;
  }

  // 카테고리 목록 가져오기
  getCategories() {
    const categories = ['all', ...new Set(this.projects.map(project => project.category).filter(Boolean))];
    return categories;
  }

  // 통계 정보 가져오기
  getStatistics() {
    const totalProjects = this.projects.length;
    const categories = this.getCategories().filter(cat => cat !== 'all');
    const categoryStats = categories.map(category => ({
      category,
      count: this.projects.filter(project => project.category === category).length
    }));

    return {
      totalProjects,
      categories: categoryStats,
      recentProjects: this.projects
        .sort((a, b) => new Date(b.year) - new Date(a.year))
        .slice(0, 3)
    };
  }
}

// 싱글톤 인스턴스 생성
const projectGalleryService = new ProjectGalleryService();

export default projectGalleryService;

