// 고급 다국어 지원 시스템
class I18nAdvanced {
  constructor() {
    this.supportedLanguages = ['ko', 'en', 'zh', 'ja'];
    this.fallbackLanguage = 'ko';
    this.languageNames = {
      ko: '한국어',
      en: 'English',
      zh: '中文',
      ja: '日本語'
    };
    
    // 저장된 언어를 먼저 확인
    const storedLang = localStorage.getItem('preferredLanguage');
    this.currentLanguage = (storedLang && this.supportedLanguages.includes(storedLang)) ? storedLang : 'ko';
    
    console.log('🚀 i18nAdvanced 초기화 - 현재 언어:', this.currentLanguage);
    console.log('📦 localStorage.preferredLanguage:', storedLang);
    
    this.translations = {};
    
    this.init();
  }

  init() {
    this.loadTranslations();
    this.setupLanguageChangeListener();
  }

  // 저장된 언어 설정 가져오기
  getStoredLanguage() {
    try {
      const stored = localStorage.getItem('preferredLanguage');
      
      // 저장된 언어가 있으면 무조건 그것을 사용
      if (stored && this.supportedLanguages.includes(stored)) {
        console.log('✅ 저장된 언어 사용:', stored);
        return stored;
      }
      
      // 저장된 언어가 없을 때만 브라우저 언어 감지
      const detected = this.detectBrowserLanguage();
      const result = detected || 'ko';
      
      console.log('🔍 언어 설정 로드:', {
        stored: '없음',
        detected: detected,
        result: result
      });
      
      return result;
    } catch (error) {
      console.error('❌ 언어 설정 로드 오류:', error);
      return 'ko';
    }
  }

  // 브라우저 언어 감지
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    
    if (this.supportedLanguages.includes(langCode)) {
      return langCode;
    }
    
    // 영어권 감지
    if (['en', 'us', 'gb', 'au', 'ca'].includes(langCode)) {
      return 'en';
    }
    
    // 중국어권 감지
    if (['zh', 'cn', 'tw', 'hk'].includes(langCode)) {
      return 'zh';
    }
    
    // 일본어권 감지
    if (['ja', 'jp'].includes(langCode)) {
      return 'ja';
    }
    
    return 'ko'; // 기본값
  }

  // 번역 데이터 로드
  loadTranslations() {
    try {
      // localStorage에서 번역 데이터 로드
      const storedTranslations = localStorage.getItem('i18nTranslations');
      console.log('🔍 i18nTranslations 로드 시도:', storedTranslations ? '데이터 있음' : '데이터 없음');
      
      // 버전 체크 - customerSupport, latestNews 섹션이 없으면 재생성
      let needsRegen = false;
      if (storedTranslations) {
        try {
          const parsed = JSON.parse(storedTranslations);
          // customerSupport 섹션 체크
          if (!parsed.ko?.home?.customerSupport?.channels) {
            console.log('⚠️ customerSupport 섹션 없음 - 재생성 필요');
            needsRegen = true;
          }
          // latestNews 섹션 체크
          if (!parsed.ko?.home?.latestNews?.moreLabel) {
            console.log('⚠️ latestNews 섹션 업데이트 필요 - 재생성');
            needsRegen = true;
          }
        } catch (e) {
          needsRegen = true;
        }
      }
      
      if (storedTranslations && !needsRegen) {
        this.translations = JSON.parse(storedTranslations);
        console.log('✅ 번역 데이터 로드 완료:', Object.keys(this.translations));
        console.log('📝 현재 언어:', this.currentLanguage);
        console.log('📝 현재 언어 데이터:', this.translations[this.currentLanguage] ? '있음' : '없음');
        
        // 샘플 번역 확인
        if (this.translations[this.currentLanguage]) {
          console.log('🔍 home.customerSupport.title 번역:', this.translations[this.currentLanguage]?.home?.customerSupport?.title);
        }
      } else {
        // 기본 번역 데이터 생성
        console.log('📝 기본 번역 데이터 생성 (또는 재생성)');
        this.translations = this.getDefaultTranslations();
        this.saveTranslations();
        console.log('✅ 기본 번역 데이터 생성 완료');
        console.log('🔍 생성된 customerSupport:', this.translations.ko?.home?.customerSupport?.title);
      }
    } catch (error) {
      console.error('❌ 번역 데이터 로드 오류:', error);
      this.translations = this.getDefaultTranslations();
    }
  }

  // 기본 번역 데이터
  getDefaultTranslations() {
    return {
      ko: {
        // 공통
        common: {
          home: '홈',
          business: '사업영역',
          projects: '프로젝트',
          support: '고객지원',
          news: '뉴스',
          contact: '문의하기',
          learnMore: '자세히 보기',
          readMore: '더 보기',
          close: '닫기',
          loading: '로딩 중...',
          error: '오류가 발생했습니다',
          success: '성공적으로 처리되었습니다',
          retry: '다시 시도',
          back: '뒤로',
          next: '다음',
          previous: '이전',
          search: '검색',
          filter: '필터',
          sort: '정렬',
          reset: '초기화',
          apply: '적용',
          confirm: '확인',
          yes: '예',
          no: '아니오',
          save: '저장',
          edit: '편집',
          delete: '삭제',
          cancel: '취소',
          submit: '제출',
          download: '다운로드',
          upload: '업로드',
          view: '보기',
          hide: '숨기기',
          show: '보이기',
          expand: '펼치기',
          collapse: '접기',
          refresh: '새로고침',
          reload: '다시 로드',
          copy: '복사',
          paste: '붙여넣기',
          cut: '잘라내기',
          undo: '실행 취소',
          redo: '다시 실행',
          select: '선택',
          deselect: '선택 해제',
          selectAll: '전체 선택',
          clear: '지우기',
          remove: '제거',
          add: '추가',
          create: '생성',
          update: '업데이트'
        },
        // 헤더
        header: {
          title: '정호그룹',
          subtitle: '조명제어 전문기업',
          navigation: {
            home: '홈',
            group: '그룹소개',
            business: '사업영역',
            projects: '프로젝트',
            support: '고객지원',
            news: '뉴스'
          }
        },
        // 버튼 및 UI 요소
        buttons: {
          learnMore: '자세히 보기',
          readMore: '더 보기',
          viewDetails: '상세 보기',
          contact: '문의하기',
          download: '다운로드',
          submit: '제출',
          cancel: '취소',
          save: '저장',
          edit: '편집',
          delete: '삭제',
          back: '뒤로',
          next: '다음',
          previous: '이전',
          close: '닫기',
          search: '검색',
          filter: '필터',
          sort: '정렬',
          reset: '초기화',
          apply: '적용',
          confirm: '확인',
          yes: '예',
          no: '아니오'
        },
        // SEO
        seo: {
          home: {
            title: '정호그룹 - 조명제어 전문기업',
            description: '40년 전통의 조명제어 전문기업으로, 클라러스, TLC, 일루테크, 텍스컴 등 계열사를 통해 혁신적인 솔루션을 제공합니다.',
            keywords: '정호그룹, 조명제어, 클라러스, TLC, 일루테크, 텍스컴, LED조명, 스마트조명'
          },
          business: {
            title: '사업영역 - 정호그룹',
            description: '정호그룹의 다양한 사업영역을 소개합니다. 클라러스, TLC, 일루테크, 텍스컴 등 계열사의 전문 분야를 확인하세요.',
            keywords: '정호그룹, 사업영역, 클라러스, TLC, 일루테크, 텍스컴, 조명제어, LED조명'
          },
          projects: {
            title: '프로젝트 - 정호그룹',
            description: '정호그룹의 주요 프로젝트와 성과를 확인하세요. 40년 전통의 조명제어 전문기업의 다양한 프로젝트 사례를 소개합니다.',
            keywords: '정호그룹, 프로젝트, 조명제어, LED조명, 스마트조명, 프로젝트 사례'
          },
          support: {
            title: '고객지원 - 정호그룹',
            description: '정호그룹의 고객지원 서비스를 확인하세요. 24/7 기술지원, A/S 서비스, 교육 프로그램 등 다양한 지원 서비스를 제공합니다.',
            keywords: '정호그룹, 고객지원, A/S, 기술지원, 교육프로그램, 고객서비스'
          },
          news: {
            title: '뉴스 - 정호그룹',
            description: '정호그룹의 최신 뉴스와 소식을 확인하세요. 조명제어 분야의 혁신적인 기술과 프로젝트 소식을 제공합니다.',
            keywords: '정호그룹, 뉴스, 소식, 조명제어, 기술혁신, 프로젝트'
          }
        },
        // 홈페이지
        home: {
          hero: {
            title: '40년 축적된 기술력으로\n조명의 미래를 혁신합니다',
            subtitle: '정호그룹은 조명제어 전문 기업으로서, 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다',
            description: '150개 이상의 프로젝트와 85,000개 이상의 제어 포인트 운영 경험을 바탕으로 최고의 솔루션을 제공합니다.',
            primaryAction: '사업영역 보기',
            secondaryAction: '문의하기'
          },
          stats: {
            years: {
              suffix: '년',
              label: '조명제어 전문 경험'
            },
            projects: {
              label: '프로젝트 완료'
            },
            countries: {
              label: '해외 진출국'
            },
            satisfaction: {
              label: '고객 만족도'
            }
          },
          achievements: {
            years: '년 전통',
            projects: '프로젝트',
            countries: '국가 진출',
            satisfaction: '고객 만족도'
          },
          group: {
            title: '40년 전통의 조명제어 전문기업',
            description: '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다.',
            para1: '1983년 창립 이래 40년간 조명제어 분야에서 전문성을 쌓아온 정호그룹은 국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 조명제어 기술의 새로운 패러다임을 제시했습니다.',
            para2: 'B2B부터 B2C까지 완전한 생태계를 구축하여 고객의 모든 요구사항을 충족시키며, 4개 계열사 간의 시너지를 통해 Total Solution을 제공합니다.',
            para3: '혁신적인 기술과 40년간 축적된 노하우를 바탕으로 고객의 성공을 지원하며, 조명제어 분야의 글로벌 리더로 성장하고 있습니다.'
          },
          subsidiaries: {
            title: '4개 계열사가 만드는\n완벽한 조명/전력제어 및 섬유기계 생태계',
            description: '기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출'
          },
          // 계열사 소개
          companyCards: {
            clarus: {
              title: '클라루스',
              subtitle: 'AI 기반 스마트 조명/전력제어',
              description: '스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문 업체',
              feature: 'AI 기반 자동 제어 시스템'
            },
            tlc: {
              title: '정호티엘씨',
              subtitle: '조명/전력제어의 설계/시공/사후관리',
              description: '공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축(시공)하고, 사후관리를 담당하는 전문업체',
              feature: 'IoT 센서 네트워크'
            },
            illutech: {
              title: '일루텍',
              subtitle: '유.무선 스마트조명제품 쇼핑몰 공급',
              description: '유.무선 조명제어 제품을 국내외 유명 쇼핑몰에 전시, 판매, 시공기술지원 업체',
              feature: '스마트 물류 자동화'
            },
            texcom: {
              title: '정호텍스컴',
              subtitle: '섬유기계의 전통과 첨단패션을 주도하는 온라인 사업',
              description: '40년간 축적된 섬유기계 전문성과 패션브랜드 론칭을 통해 새로운 가치를 창출하는 전문업체',
              feature: '섬유기계 및 패션 브랜드'
            }
          },
          // 프로젝트 갤러리
          projectGallery: {
            title: '주요 프로젝트',
            description: '정호그룹의 대표적인 프로젝트 사례를 확인하세요',
            viewAll: '전체 보기'
          },
          // 고객 지원
          customerSupport: {
            title: '언제나 함께하는 든든한 파트너',
            description: '전문적인 기술 지원과 서비스를 제공합니다',
            contact: '문의하기',
            download: '자료 다운로드',
            channels: {
              phone: {
                title: '전화 상담',
                description: '전문 엔지니어가 직접 답변드립니다',
                actionLabel: '전화하기',
                hours: '평일 09:00-18:00'
              },
              email: {
                title: '이메일 문의',
                description: '상세한 기술 문의사항을 보내주세요',
                actionLabel: '이메일 보내기',
                hours: '24시간 접수 가능'
              },
              chat: {
                title: '카카오톡',
                description: '실시간 채팅으로 빠른 답변을 받으세요',
                actionLabel: '채팅 시작',
                hours: '평일 09:00-18:00'
              }
            },
            features: {
              support247: {
                title: '24/7 지원',
                description: '언제든지 전문가의 도움을 받으실 수 있습니다'
              },
              network: {
                title: '전국 네트워크',
                description: '50개 지점에서 현장 지원을 제공합니다'
              },
              engineers: {
                title: '전문 엔지니어',
                description: '200명의 전문 엔지니어가 상담해드립니다'
              }
            },
            cta: {
              title: '지금 바로 문의하세요',
              description: '전문 엔지니어가 24시간 내에 답변드립니다. 프로젝트 규모와 상관없이 최적의 솔루션을 제안해드립니다.',
              buttonLabel: '지금 문의하기'
            },
            footer: {
              locations: '전국 50개 지점',
              engineers: '전문 엔지니어 200명+',
              responseTime: '평균 응답시간 2시간'
            }
          },
          // 최신 뉴스
          latestNews: {
            title: '정호그룹 소식',
            description: '정호그룹의 최신 소식과 업계 동향을 확인하세요',
            readMore: '더 보기',
            moreLabel: '더 많은 소식 보기',
            featured: '주요'
          },
          // 프로젝트 갤러리
          projects: {
            title: '검증된 성과와 신뢰',
            description: '국내외 주요 기업들과 함께한 1,000개 이상의 성공적인 프로젝트',
            subtitle: '국내외 주요 기업들과 함께한 1,000개 이상의 성공적인 프로젝트',
            experience: '40년간 축적된 노하우',
            network: '전국 네트워크',
            partnership: '글로벌 파트너십',
            galleryImages: '갤러리 이미지',
            imagesUnit: '장 적용됨'
          }
        },
        // 프로젝트
        projects: {
          title: '프로젝트 갤러리',
          description: '정호그룹의 주요 프로젝트와 성과를 확인하세요',
          categories: {
            all: '전체',
            smartBuilding: '스마트빌딩',
            smartCity: '스마트시티',
            industrial: '산업용',
            retail: '리테일',
            medical: '의료용',
            hotel: '호텔'
          },
          viewModes: {
            grid: '그리드',
            list: '리스트'
          },
          details: {
            client: '클라이언트',
            team: '팀 구성',
            technologies: '기술 스택',
            achievements: '주요 성과',
            demo: '데모 보기',
            caseStudy: '케이스 스터디'
          }
        },
        // 비즈니스 페이지
        business: {
          title: '사업영역',
          description: '정호그룹의 다양한 사업영역을 소개합니다',
          coreAreas: {
            title: '핵심 사업영역',
            description: '40년간 축적된 조명제어 기술력을 바탕으로 다양한 분야에서 혁신적인 솔루션을 제공합니다'
          },
          subsidiaries: {
            title: '계열사별 전문분야',
            description: '4개 계열사가 각각의 전문분야에서 최고의 솔루션을 제공합니다'
          },
          expertise: '전문분야:',
          sections: {
            lighting: '조명제어',
            smartFactory: '스마트팩토리',
            logistics: '물류',
            textile: '섬유기계'
          }
        },
        // 지원 페이지
        support: {
          title: '고객지원',
          description: '전문적인 기술 지원과 서비스를 제공합니다',
          contact: '문의하기',
          download: '자료 다운로드',
          faq: '자주 묻는 질문'
        },
        // 뉴스 페이지
        news: {
          title: '뉴스',
          description: '정호그룹의 최신 소식과 업계 동향을 확인하세요',
          subscribe: '구독하기',
          categories: {
            all: '전체',
            company: '회사소식',
            industry: '업계동향',
            technology: '기술소식'
          }
        }
      },
      en: {
        // Common
        common: {
          home: 'Home',
          business: 'Business',
          projects: 'Projects',
          support: 'Support',
          news: 'News',
          contact: 'Contact',
          learnMore: 'Learn More',
          readMore: 'Read More',
          close: 'Close',
          loading: 'Loading...',
          error: 'An error occurred',
          success: 'Successfully processed',
          retry: 'Retry',
          back: 'Back',
          next: 'Next',
          previous: 'Previous',
          search: 'Search',
          filter: 'Filter',
          sort: 'Sort',
          reset: 'Reset',
          apply: 'Apply',
          confirm: 'Confirm',
          yes: 'Yes',
          no: 'No',
          save: 'Save',
          edit: 'Edit',
          delete: 'Delete',
          cancel: 'Cancel',
          submit: 'Submit',
          download: 'Download',
          upload: 'Upload',
          view: 'View',
          hide: 'Hide',
          show: 'Show',
          expand: 'Expand',
          collapse: 'Collapse',
          refresh: 'Refresh',
          reload: 'Reload',
          copy: 'Copy',
          paste: 'Paste',
          cut: 'Cut',
          undo: 'Undo',
          redo: 'Redo',
          select: 'Select',
          deselect: 'Deselect',
          selectAll: 'Select All',
          clear: 'Clear',
          remove: 'Remove',
          add: 'Add',
          create: 'Create',
          update: 'Update'
        },
        // Header
        header: {
          title: 'Jungho Group',
          subtitle: 'Lighting Control Specialist',
          navigation: {
            home: 'Home',
            group: 'Group',
            business: 'Business',
            projects: 'Projects',
            support: 'Support',
            news: 'News'
          }
        },
        // Buttons and UI elements
        buttons: {
          learnMore: 'Learn More',
          readMore: 'Read More',
          viewDetails: 'View Details',
          contact: 'Contact',
          download: 'Download',
          submit: 'Submit',
          cancel: 'Cancel',
          save: 'Save',
          edit: 'Edit',
          delete: 'Delete',
          back: 'Back',
          next: 'Next',
          previous: 'Previous',
          close: 'Close',
          search: 'Search',
          filter: 'Filter',
          sort: 'Sort',
          reset: 'Reset',
          apply: 'Apply',
          confirm: 'Confirm',
          yes: 'Yes',
          no: 'No'
        },
        // SEO
        seo: {
          home: {
            title: 'Jungho Group - Lighting Control Specialist',
            description: 'A lighting control specialist company with 40 years of tradition, providing innovative solutions through subsidiaries such as Clarus, TLC, Illutech, and Texcom.',
            keywords: 'Jungho Group, Lighting Control, Clarus, TLC, Illutech, Texcom, LED Lighting, Smart Lighting'
          },
          business: {
            title: 'Business Areas - Jungho Group',
            description: 'Introducing various business areas of Jungho Group. Check out the specialized fields of subsidiaries such as Clarus, TLC, Illutech, and Texcom.',
            keywords: 'Jungho Group, Business Areas, Clarus, TLC, Illutech, Texcom, Lighting Control, LED Lighting'
          },
          projects: {
            title: 'Projects - Jungho Group',
            description: 'Check out major projects and achievements of Jungho Group. Introducing various project cases from a lighting control specialist company with 40 years of tradition.',
            keywords: 'Jungho Group, Projects, Lighting Control, LED Lighting, Smart Lighting, Project Cases'
          },
          support: {
            title: 'Customer Support - Jungho Group',
            description: 'Check out Jungho Group\'s customer support services. We provide various support services such as 24/7 technical support, A/S service, and training programs.',
            keywords: 'Jungho Group, Customer Support, A/S, Technical Support, Training Program, Customer Service'
          },
          news: {
            title: 'News - Jungho Group',
            description: 'Check out the latest news and updates from Jungho Group. We provide innovative technology and project news in the field of lighting control.',
            keywords: 'Jungho Group, News, Updates, Lighting Control, Technology Innovation, Projects'
          }
        },
        // Homepage
        home: {
          hero: {
            title: 'Innovating the Future of Lighting\nwith 40 Years of Technology',
            subtitle: 'Jungho Group is a lighting control specialist company that supports customer success with innovative technology and perfect service',
            description: 'We provide the best solutions based on experience in operating more than 150 projects and 85,000 control points.',
            primaryAction: 'View Business Areas',
            secondaryAction: 'Contact Us'
          },
          stats: {
            years: {
              suffix: ' Years',
              label: 'Lighting Control Expertise'
            },
            projects: {
              label: 'Projects Completed'
            },
            countries: {
              label: 'Countries Expanded'
            },
            satisfaction: {
              label: 'Customer Satisfaction'
            }
          },
          achievements: {
            years: 'Years Tradition',
            projects: 'Projects',
            countries: 'Countries',
            satisfaction: 'Customer Satisfaction'
          },
          group: {
            title: 'Lighting Control Specialist with 40 Years of Tradition',
            description: 'Jungho Group is a global company providing innovative solutions in various fields such as AI, IoT, logistics, and textiles.',
            para1: 'Since its establishment in 1983, Jungho Group has built expertise in the lighting control field for 40 years and presented a new paradigm in lighting control technology by independently developing the E/F2-BUS protocol, the first in Korea.',
            para2: 'We build a complete ecosystem from B2B to B2C to meet all customer requirements, and provide total solutions through synergy between our 4 subsidiaries.',
            para3: 'Based on innovative technology and 40 years of accumulated know-how, we support customer success and are growing as a global leader in the lighting control field.'
          },
          subsidiaries: {
            title: '4 Subsidiaries Creating\nPerfect Lighting/Power Control and Textile Machinery Ecosystem',
            description: 'From technology development to customer service, creating synergy through expertise in each field'
          },
          // Company Cards
          companyCards: {
            clarus: {
              title: 'Clarus',
              subtitle: 'AI-based Smart Lighting/Power Control',
              description: 'Professional company developing smart lighting/power control systems, producing core devices, and supplying domestically and internationally',
              feature: 'AI-based Automatic Control System'
            },
            tlc: {
              title: 'Jungho TLC',
              subtitle: 'Design/Construction/After-sales Management of Lighting/Power Control',
              description: 'Professional company designing and constructing optimal smart lighting environments for public institutions, office buildings, logistics and data centers, and managing after-sales service',
              feature: 'IoT Sensor Network'
            },
            illutech: {
              title: 'Illutech',
              subtitle: 'Wired/Wireless Smart Lighting Product Shopping Mall Supply',
              description: 'Company that displays, sells, and provides construction technical support for wired/wireless lighting control products at famous domestic and international shopping malls',
              feature: 'Smart Logistics Automation'
            },
            texcom: {
              title: 'Jungho Texcom',
              subtitle: 'Online Business Leading Textile Machinery Tradition and Cutting-edge Fashion',
              description: 'Professional company creating new value through 40 years of accumulated textile machinery expertise and fashion brand launching',
              feature: 'Textile Machinery & Fashion Brands'
            }
          },
          // Project Gallery
          projectGallery: {
            title: 'Featured Projects',
            description: 'Check out representative project cases from Jungho Group',
            viewAll: 'View All'
          },
          // Customer Support
          customerSupport: {
            title: 'Your Reliable Partner, Always There',
            description: 'We provide professional technical support and services',
            contact: 'Contact',
            download: 'Download Materials',
            channels: {
              phone: {
                title: 'Phone Consultation',
                description: 'Professional engineers answer directly',
                actionLabel: 'Call Now',
                hours: 'Weekdays 09:00-18:00'
              },
              email: {
                title: 'Email Inquiry',
                description: 'Send us your detailed technical inquiries',
                actionLabel: 'Send Email',
                hours: '24/7 Submission Available'
              },
              chat: {
                title: 'KakaoTalk',
                description: 'Get quick responses via real-time chat',
                actionLabel: 'Start Chat',
                hours: 'Weekdays 09:00-18:00'
              }
            },
            features: {
              support247: {
                title: '24/7 Support',
                description: 'Expert assistance available anytime'
              },
              network: {
                title: 'Nationwide Network',
                description: 'On-site support from 50 locations'
              },
              engineers: {
                title: 'Professional Engineers',
                description: '200+ professional engineers ready to help'
              }
            },
            cta: {
              title: 'Contact Us Now',
              description: 'Professional engineers will respond within 24 hours. We offer optimal solutions regardless of project size.',
              buttonLabel: 'Contact Now'
            },
            footer: {
              locations: '50 Locations Nationwide',
              engineers: '200+ Professional Engineers',
              responseTime: 'Average Response Time: 2 Hours'
            }
          },
          // Latest News
          latestNews: {
            title: 'Jungho Group News',
            description: 'Check out the latest news from Jungho Group and industry trends',
            readMore: 'Read More',
            moreLabel: 'View More News',
            featured: 'Featured'
          },
          // Project Gallery
          projects: {
            title: 'Proven Results and Trust',
            description: 'Over 1,000 successful projects with major domestic and international companies',
            subtitle: 'Over 1,000 successful projects with major domestic and international companies',
            experience: '40 Years of Accumulated Expertise',
            network: 'Nationwide Network',
            partnership: 'Global Partnership',
            galleryImages: 'Gallery Images',
            imagesUnit: ' Applied'
          }
        },
        // Business
        business: {
          coreAreas: {
            title: 'Core Business Areas',
            description: 'We provide innovative solutions in various fields based on 40 years of accumulated lighting control technology'
          },
          subsidiaries: {
            title: 'Specialized Fields by Subsidiary',
            description: '4 subsidiaries provide the best solutions in their respective specialized fields'
          },
          expertise: 'Expertise:'
        },
        // Projects
        projects: {
          title: 'Project Gallery',
          description: 'Check out Jungho Group\'s major projects and achievements',
          categories: {
            all: 'All',
            smartBuilding: 'Smart Building',
            smartCity: 'Smart City',
            industrial: 'Industrial',
            retail: 'Retail',
            medical: 'Medical',
            hotel: 'Hotel'
          },
          viewModes: {
            grid: 'Grid',
            list: 'List'
          },
          details: {
            client: 'Client',
            team: 'Team',
            technologies: 'Technologies',
            achievements: 'Key Achievements',
            demo: 'View Demo',
            caseStudy: 'Case Study'
          }
        }
      },
      zh: {
        // Common
        common: {
          home: '首页',
          business: '业务领域',
          projects: '项目',
          support: '客户支持',
          news: '新闻',
          contact: '联系我们',
          learnMore: '了解更多',
          readMore: '阅读更多',
          close: '关闭',
          loading: '加载中...',
          error: '发生错误',
          success: '处理成功'
        },
        // Header
        header: {
          title: '正浩集团',
          subtitle: '照明控制专业企业',
          navigation: {
            home: '首页',
            group: '集团介绍',
            business: '业务领域',
            projects: '项目',
            support: '客户支持',
            news: '新闻'
          }
        },
        // SEO
        seo: {
          home: {
            title: '正浩集团 - 照明控制专业企业',
            description: '拥有40年传统的照明控制专业企业，通过Clarus、TLC、Illutech、Texcom等子公司提供创新解决方案。',
            keywords: '正浩集团, 照明控制, Clarus, TLC, Illutech, Texcom, LED照明, 智能照明'
          },
          business: {
            title: '业务领域 - 正浩集团',
            description: '介绍正浩集团的各种业务领域。了解Clarus、TLC、Illutech、Texcom等子公司的专业领域。',
            keywords: '正浩集团, 业务领域, Clarus, TLC, Illutech, Texcom, 照明控制, LED照明'
          },
          projects: {
            title: '项目 - 正浩集团',
            description: '查看正浩集团的主要项目和成就。介绍拥有40年传统的照明控制专业企业的各种项目案例。',
            keywords: '正浩集团, 项目, 照明控制, LED照明, 智能照明, 项目案例'
          },
          support: {
            title: '客户支持 - 正浩集团',
            description: '查看正浩集团的客户支持服务。提供24/7技术支持、售后服务、培训项目等各种支持服务。',
            keywords: '正浩集团, 客户支持, 售后, 技术支持, 培训项目, 客户服务'
          },
          news: {
            title: '新闻 - 正浩集团',
            description: '查看正浩集团的最新新闻和消息。提供照明控制领域的创新技术和项目消息。',
            keywords: '正浩集团, 新闻, 消息, 照明控制, 技术创新, 项目'
          }
        },
        // Homepage
        home: {
          hero: {
            title: '用40年积累的技术力\n创新照明的未来',
            subtitle: '正浩集团是照明控制专业企业，以创新技术和完美服务支持客户成功',
            description: '基于150多个项目和85,000多个控制点的运营经验，提供最佳解决方案。',
            primaryAction: '查看业务领域',
            secondaryAction: '联系我们'
          },
          stats: {
            years: {
              suffix: '年',
              label: '照明控制专业经验'
            },
            projects: {
              label: '项目完成'
            },
            countries: {
              label: '海外进出国'
            },
            satisfaction: {
              label: '客户满意度'
            }
          },
          achievements: {
            years: '年传统',
            projects: '项目',
            countries: '国家',
            satisfaction: '客户满意度'
          },
          group: {
            title: '具有40年传统的\n照明控制专业企业',
            description: '正浩集团是在AI、IoT、物流、纺织等各个领域提供创新解决方案的全球企业。',
            para1: '自1983年创立以来，正浩集团在照明控制领域积累了40年的专业知识，并通过自主开发韩国首个E/F2-BUS协议，提出了照明控制技术的新范式。',
            para2: '从B2B到B2C构建完整的生态系统，满足客户的所有需求，并通过4家子公司之间的协同效应提供整体解决方案。',
            para3: '基于创新技术和40年积累的专业知识，我们支持客户的成功，并正在成长为照明控制领域的全球领导者。'
          },
          subsidiaries: {
            title: '4个子公司打造\n完美的照明/电力控制及纺织机械生态系统',
            description: '从技术开发到客户服务，通过各领域专业性创造协同效应'
          },
          companyCards: {
            clarus: {
              title: 'Clarus',
              subtitle: '基于AI的智能照明/电力控制',
              description: '开发智能照明/电力控制系统，生产核心设备，向国内外供应的专业企业',
              feature: '基于AI的自动控制系统'
            },
            tlc: {
              title: '正浩TLC',
              subtitle: '照明/电力控制的设计/施工/售后管理',
              description: '为公共机构、办公楼、物流和数据中心设计和建设最佳智能照明环境，并负责售后管理的专业企业',
              feature: 'IoT传感器网络'
            },
            illutech: {
              title: 'Illutech',
              subtitle: '有线/无线智能照明产品商城供应',
              description: '在国内外知名商城展示、销售有线/无线照明控制产品，并提供施工技术支持的企业',
              feature: '智能物流自动化'
            },
            texcom: {
              title: '正浩Texcom',
              subtitle: '引领纺织机械传统和尖端时尚的在线业务',
              description: '通过40年积累的纺织机械专业知识和时尚品牌推出创造新价值的专业企业',
              feature: '纺织机械及时尚品牌'
            }
          },
          // Project Gallery
          projectGallery: {
            title: '主要项目',
            description: '查看正浩集团的代表性项目案例',
            viewAll: '查看全部'
          },
          // Customer Support
          customerSupport: {
            title: '始终与您同在的可靠伙伴',
            description: '提供专业的技术支持和服务',
            contact: '联系我们',
            download: '下载资料',
            channels: {
              phone: {
                title: '电话咨询',
                description: '专业工程师直接回答',
                actionLabel: '立即致电',
                hours: '工作日 09:00-18:00'
              },
              email: {
                title: '邮件咨询',
                description: '请发送详细的技术咨询',
                actionLabel: '发送邮件',
                hours: '24小时可提交'
              },
              chat: {
                title: 'KakaoTalk',
                description: '通过实时聊天获得快速回答',
                actionLabel: '开始聊天',
                hours: '工作日 09:00-18:00'
              }
            },
            features: {
              support247: {
                title: '24/7支持',
                description: '随时获得专家帮助'
              },
              network: {
                title: '全国网络',
                description: '50个据点提供现场支持'
              },
              engineers: {
                title: '专业工程师',
                description: '200多名专业工程师为您服务'
              }
            },
            cta: {
              title: '立即联系我们',
              description: '专业工程师将在24小时内回复。无论项目规模如何，我们都会提供最佳解决方案。',
              buttonLabel: '立即咨询'
            },
            footer: {
              locations: '全国50个据点',
              engineers: '200多名专业工程师',
              responseTime: '平均响应时间：2小时'
            }
          },
          // Latest News
          latestNews: {
            title: '正浩集团消息',
            description: '查看正浩集团的最新消息和行业动态',
            readMore: '阅读更多',
            moreLabel: '查看更多消息',
            featured: '重要'
          },
          // Project Gallery
          projects: {
            title: '经过验证的成果与信任',
            description: '与国内外主要企业合作的1,000多个成功项目',
            subtitle: '与国内外主要企业合作的1,000多个成功项目',
            experience: '40年积累的专业知识',
            network: '全国网络',
            partnership: '全球合作伙伴关系',
            galleryImages: '图库图片',
            imagesUnit: '张已应用'
          }
        },
        // Projects
        projects: {
          title: '项目画廊',
          description: '查看正浩集团的主要项目和成就',
          categories: {
            all: '全部',
            smartBuilding: '智能建筑',
            smartCity: '智慧城市',
            industrial: '工业',
            retail: '零售',
            medical: '医疗',
            hotel: '酒店'
          },
          viewModes: {
            grid: '网格',
            list: '列表'
          },
          details: {
            client: '客户',
            team: '团队',
            technologies: '技术栈',
            achievements: '主要成就',
            demo: '查看演示',
            caseStudy: '案例研究'
          }
        },
        // Business
        business: {
          coreAreas: {
            title: '核心业务领域',
            description: '基于40年积累的照明控制技术力，在各个领域提供创新解决方案'
          },
          subsidiaries: {
            title: '各子公司专业领域',
            description: '4个子公司在各自的专业领域提供最佳解决方案'
          },
          expertise: '专业领域:'
        }
      },
      ja: {
        // Common
        common: {
          home: 'ホーム',
          business: '事業領域',
          projects: 'プロジェクト',
          support: 'サポート',
          news: 'ニュース',
          contact: 'お問い合わせ',
          learnMore: '詳細を見る',
          readMore: '続きを読む',
          close: '閉じる',
          loading: '読み込み中...',
          error: 'エラーが発生しました',
          success: '正常に処理されました'
        },
        // Header
        header: {
          title: '正浩グループ',
          subtitle: '照明制御専門企業',
          navigation: {
            home: 'ホーム',
            group: 'グループ紹介',
            business: '事業領域',
            projects: 'プロジェクト',
            support: 'サポート',
            news: 'ニュース'
          }
        },
        // SEO
        seo: {
          home: {
            title: '正浩グループ - 照明制御専門企業',
            description: '40年の伝統を持つ照明制御専門企業として、Clarus、TLC、Illutech、Texcomなどの子会社を通じて革新的なソリューションを提供します。',
            keywords: '正浩グループ, 照明制御, Clarus, TLC, Illutech, Texcom, LED照明, スマート照明'
          },
          business: {
            title: '事業領域 - 正浩グループ',
            description: '正浩グループの様々な事業領域を紹介します。Clarus、TLC、Illutech、Texcomなどの子会社の専門分野をご確認ください。',
            keywords: '正浩グループ, 事業領域, Clarus, TLC, Illutech, Texcom, 照明制御, LED照明'
          },
          projects: {
            title: 'プロジェクト - 正浩グループ',
            description: '正浩グループの主要プロジェクトと成果をご確認ください。40年の伝統を持つ照明制御専門企業の様々なプロジェクト事例を紹介します。',
            keywords: '正浩グループ, プロジェクト, 照明制御, LED照明, スマート照明, プロジェクト事例'
          },
          support: {
            title: 'カスタマーサポート - 正浩グループ',
            description: '正浩グループのカスタマーサポートサービスをご確認ください。24/7技術サポート、アフターサービス、教育プログラムなど様々なサポートサービスを提供します。',
            keywords: '正浩グループ, カスタマーサポート, アフターサービス, 技術サポート, 教育プログラム, 顧客サービス'
          },
          news: {
            title: 'ニュース - 正浩グループ',
            description: '正浩グループの最新ニュースとお知らせをご確認ください。照明制御分野の革新的な技術とプロジェクトのニュースを提供します。',
            keywords: '正浩グループ, ニュース, お知らせ, 照明制御, 技術革新, プロジェクト'
          }
        },
        // Homepage
        home: {
          hero: {
            title: '40年蓄積された技術力で\n照明の未来を革新します',
            subtitle: '正浩グループは照明制御専門企業として、革新的な技術と完璧なサービスで顧客の成功を支援します',
            description: '150以上のプロジェクトと85,000以上の制御ポイントの運営経験を基に最高のソリューションを提供します。',
            primaryAction: '事業領域を見る',
            secondaryAction: 'お問い合わせ'
          },
          stats: {
            years: {
              suffix: '年',
              label: '照明制御専門経験'
            },
            projects: {
              label: 'プロジェクト完了'
            },
            countries: {
              label: '海外進出国'
            },
            satisfaction: {
              label: '顧客満足度'
            }
          },
          achievements: {
            years: '年伝統',
            projects: 'プロジェクト',
            countries: '国進出',
            satisfaction: '顧客満足度'
          },
          group: {
            title: '40年の伝統を持つ\n照明制御専門企業',
            description: '正浩グループはAI、IoT、物流、テキスタイルなど様々な分野で革新的なソリューションを提供するグローバル企業です。',
            para1: '1983年の創立以来、40年間照明制御分野で専門性を積み重ねてきた正浩グループは、韓国初のE/F2-BUSプロトコルを自主開発し、照明制御技術の新しいパラダイムを提示しました。',
            para2: 'B2BからB2Cまで完全なエコシステムを構築してお客様のすべての要求事項を満たし、4つの系列会社間のシナジーを通じてトータルソリューションを提供します。',
            para3: '革新的な技術と40年間蓄積されたノウハウを基にお客様の成功を支援し、照明制御分野のグローバルリーダーとして成長しています。'
          },
          subsidiaries: {
            title: '4つの子会社が作る\n完璧な照明/電力制御及び繊維機械エコシステム',
            description: '技術開発から顧客サービスまで、各分野の専門性によるシナジー創出'
          },
          companyCards: {
            clarus: {
              title: 'Clarus',
              subtitle: 'AIベースのスマート照明/電力制御',
              description: 'スマート照明/電力制御システム開発、コアデバイス生産、国内外に供給する専門企業',
              feature: 'AIベースの自動制御システム'
            },
            tlc: {
              title: '正浩TLC',
              subtitle: '照明/電力制御の設計/施工/アフターサービス',
              description: '公共機関、オフィスビル、物流およびデータセンターに最適なスマート照明環境を設計・構築（施工）し、アフターサービスを担当する専門企業',
              feature: 'IoTセンサーネットワーク'
            },
            illutech: {
              title: 'Illutech',
              subtitle: '有線/無線スマート照明製品ショッピングモール供給',
              description: '有線/無線照明制御製品を国内外の有名ショッピングモールで展示、販売、施工技術支援を提供する企業',
              feature: 'スマート物流自動化'
            },
            texcom: {
              title: '正浩Texcom',
              subtitle: '繊維機械の伝統と先端ファッションを主導するオンライン事業',
              description: '40年間蓄積された繊維機械の専門性とファッションブランドのローンチを通じて新しい価値を創出する専門企業',
              feature: '繊維機械及びファッションブランド'
            }
          },
          // Project Gallery
          projectGallery: {
            title: '主要プロジェクト',
            description: '正浩グループの代表的なプロジェクト事例をご確認ください',
            viewAll: 'すべて見る'
          },
          // Customer Support
          customerSupport: {
            title: 'いつも一緒にいる頼れるパートナー',
            description: '専門的な技術サポートとサービスを提供します',
            contact: 'お問い合わせ',
            download: '資料ダウンロード',
            channels: {
              phone: {
                title: '電話相談',
                description: '専門エンジニアが直接お答えします',
                actionLabel: '電話する',
                hours: '平日 09:00-18:00'
              },
              email: {
                title: 'メールお問い合わせ',
                description: '詳細な技術お問い合わせをお送りください',
                actionLabel: 'メールを送る',
                hours: '24時間受付可能'
              },
              chat: {
                title: 'KakaoTalk',
                description: 'リアルタイムチャットで迅速な回答を受け取る',
                actionLabel: 'チャット開始',
                hours: '平日 09:00-18:00'
              }
            },
            features: {
              support247: {
                title: '24/7サポート',
                description: 'いつでも専門家のサポートを受けられます'
              },
              network: {
                title: '全国ネットワーク',
                description: '50拠点で現場サポートを提供します'
              },
              engineers: {
                title: '専門エンジニア',
                description: '200名以上の専門エンジニアがサポートします'
              }
            },
            cta: {
              title: '今すぐお問い合わせください',
              description: '専門エンジニアが24時間以内に回答いたします。プロジェクト規模に関わらず最適なソリューションをご提案します。',
              buttonLabel: '今すぐ問い合わせ'
            },
            footer: {
              locations: '全国50拠点',
              engineers: '専門エンジニア200名以上',
              responseTime: '平均応答時間：2時間'
            }
          },
          // Latest News
          latestNews: {
            title: '正浩グループニュース',
            description: '正浩グループの最新ニュースと業界動向をご確認ください',
            readMore: '続きを読む',
            moreLabel: 'もっと見る',
            featured: '注目'
          },
          // Project Gallery
          projects: {
            title: '実証された成果と信頼',
            description: '国内外の主要企業との1,000以上の成功プロジェクト',
            subtitle: '国内外の主要企業との1,000以上の成功プロジェクト',
            experience: '40年間蓄積されたノウハウ',
            network: '全国ネットワーク',
            partnership: 'グローバルパートナーシップ',
            galleryImages: 'ギャラリー画像',
            imagesUnit: '枚適用'
          }
        },
        // Projects
        projects: {
          title: 'プロジェクトギャラリー',
          description: '正浩グループの主要プロジェクトと成果をご確認ください',
          categories: {
            all: 'すべて',
            smartBuilding: 'スマートビル',
            smartCity: 'スマートシティ',
            industrial: '産業用',
            retail: '小売',
            medical: '医療用',
            hotel: 'ホテル'
          },
          viewModes: {
            grid: 'グリッド',
            list: 'リスト'
          },
          details: {
            client: 'クライアント',
            team: 'チーム',
            technologies: '技術スタック',
            achievements: '主要成果',
            demo: 'デモを見る',
            caseStudy: 'ケーススタディ'
          }
        },
        // Business
        business: {
          coreAreas: {
            title: 'コアビジネス領域',
            description: '40年間蓄積された照明制御技術力を基に、様々な分野で革新的なソリューションを提供します'
          },
          subsidiaries: {
            title: '子会社別専門分野',
            description: '4つの子会社がそれぞれの専門分野で最高のソリューションを提供します'
          },
          expertise: '専門分野:'
        }
      }
    };
  }

  // 번역 데이터 저장
  saveTranslations() {
    try {
      localStorage.setItem('i18nTranslations', JSON.stringify(this.translations));
      console.log('번역 데이터 저장 완료');
    } catch (error) {
      console.error('번역 데이터 저장 오류:', error);
    }
  }

  // 언어 변경
  setLanguage(language) {
    if (this.supportedLanguages.includes(language)) {
      console.log('🌐 언어 변경:', language);
      this.currentLanguage = language;
      localStorage.setItem('preferredLanguage', language);
      console.log('✅ preferredLanguage 저장 완료:', localStorage.getItem('preferredLanguage'));
      
      // HTML lang 속성 업데이트
      document.documentElement.lang = language;
      
      // 언어 변경 이벤트 발생
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }));
      
      console.log('언어 변경:', language);
    }
  }

  // 현재 언어 가져오기
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // 지원 언어 목록 가져오기
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  // 언어 이름 가져오기
  getLanguageName(code) {
    return this.languageNames[code] || code;
  }

  // 번역 함수
  t(key, params = {}) {
    const currentLangData = this.translations[this.currentLanguage];
    const fallbackLangData = this.translations[this.fallbackLanguage];
    
    // 1. 먼저 평평한 키로 직접 검색 시도 (예: 'header.navigation.home')
    if (currentLangData && currentLangData[key]) {
      return this.interpolate(currentLangData[key], params);
    }
    
    // 2. 폴백 언어에서 평평한 키로 검색
    if (fallbackLangData && fallbackLangData[key]) {
      return this.interpolate(fallbackLangData[key], params);
    }
    
    // 3. 중첩된 객체 구조로 검색 (예: header.navigation.home → header['navigation']['home'])
    const keys = key.split('.');
    let value = currentLangData;
    
    // 키 경로 따라가기
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 현재 언어에서 찾을 수 없으면 폴백 언어로 시도
        value = fallbackLangData;
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            return key; // 번역을 찾을 수 없으면 키 반환
          }
        }
        break;
      }
    }
    
    // 문자열이면 파라미터 치환
    if (typeof value === 'string') {
      return this.interpolate(value, params);
    }
    
    return value || key;
  }

  // 문자열 보간
  interpolate(str, params) {
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] || match;
    });
  }

  // 언어 변경 리스너 설정
  setupLanguageChangeListener() {
    window.addEventListener('languageChanged', (event) => {
      console.log('언어 변경 이벤트 수신:', event.detail.language);
    });
    
    // i18n 데이터 업데이트 이벤트 리스너 추가
    window.addEventListener('i18nDataUpdated', () => {
      console.log('🔄 i18n 데이터 업데이트 감지 - 번역 데이터 다시 로드');
      this.loadTranslations();
    });
  }

  // 번역 업데이트 (관리자용)
  updateTranslation(language, key, value) {
    if (!this.translations[language]) {
      this.translations[language] = {};
    }
    
    const keys = key.split('.');
    let target = this.translations[language];
    
    // 중첩 객체 생성
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {};
      }
      target = target[keys[i]];
    }
    
    // 마지막 키에 값 설정
    target[keys[keys.length - 1]] = value;
    
    this.saveTranslations();
    console.log('번역 업데이트:', language, key, value);
  }

  // 번역 삭제 (관리자용)
  deleteTranslation(language, key) {
    const keys = key.split('.');
    let target = this.translations[language];
    
    if (!target) return false;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) return false;
      target = target[keys[i]];
    }
    
    delete target[keys[keys.length - 1]];
    this.saveTranslations();
    console.log('번역 삭제:', language, key);
    return true;
  }

  // 모든 번역 데이터 내보내기
  exportTranslations() {
    return JSON.stringify(this.translations, null, 2);
  }

  // 번역 데이터 가져오기
  importTranslations(jsonData) {
    try {
      const imported = JSON.parse(jsonData);
      this.translations = { ...this.translations, ...imported };
      this.saveTranslations();
      console.log('번역 데이터 가져오기 완료');
      return true;
    } catch (error) {
      console.error('번역 데이터 가져오기 오류:', error);
      return false;
    }
  }
}

// 싱글톤 인스턴스 생성
const i18nAdvanced = new I18nAdvanced();

export default i18nAdvanced;
