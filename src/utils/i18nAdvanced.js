// 고급 다국어 지원 시스템
class I18nAdvanced {
  constructor() {
    // v2: 한국어/영어만 활성화 (중국어/일본어는 향후 추가 예정)
    this.supportedLanguages = ['ko', 'en'];
    this.fallbackLanguage = 'ko';
    this.languageNames = {
      ko: '한국어',
      en: 'English',
      // 향후 추가 예정
      // zh: '中文',
      // ja: '日本語'
    };
    
    // 메모리 기반 언어 저장소 (localStorage가 작동하지 않을 때 대체)
    this.memoryLanguage = null;
    
    // 저장된 언어를 확인 (localStorage → sessionStorage → 메모리 → 기본값)
    const storedLang = this.getStoredLanguageFromMultipleSources();
    this.currentLanguage = (storedLang && this.supportedLanguages.includes(storedLang)) ? storedLang : 'ko';
    
    console.log('🚀 i18nAdvanced 초기화 - 현재 언어:', this.currentLanguage);
    console.log('📦 저장소 상태:', {
      localStorage: this.safeGetItem('preferredLanguage', 'localStorage'),
      sessionStorage: this.safeGetItem('preferredLanguage', 'sessionStorage'),
      memory: this.memoryLanguage
    });
    
    this.translations = {};
    
    this.init();
  }

  // 안전한 저장소 접근 (try-catch)
  safeGetItem(key, storageType = 'localStorage') {
    try {
      const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
      return storage.getItem(key);
    } catch (e) {
      console.warn(`⚠️ ${storageType} 읽기 실패:`, e.message);
      return null;
    }
  }

  safeSetItem(key, value, storageType = 'localStorage') {
    try {
      const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
      storage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn(`⚠️ ${storageType} 쓰기 실패:`, e.message);
      return false;
    }
  }

  // 다중 소스에서 언어 가져오기
  getStoredLanguageFromMultipleSources() {
    // 1순위: localStorage
    let stored = this.safeGetItem('preferredLanguage', 'localStorage');
    if (stored) {
      console.log('✅ localStorage에서 언어 로드:', stored);
      return stored;
    }

    // 2순위: sessionStorage
    stored = this.safeGetItem('preferredLanguage', 'sessionStorage');
    if (stored) {
      console.log('✅ sessionStorage에서 언어 로드:', stored);
      return stored;
    }

    // 3순위: 메모리
    if (this.memoryLanguage) {
      console.log('✅ 메모리에서 언어 로드:', this.memoryLanguage);
      return this.memoryLanguage;
    }

    console.log('ℹ️ 저장된 언어 없음 - 기본값 사용');
    return null;
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

  // 브라우저 언어 감지 (v2: 한/영만)
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
    
    // v2: 중국어/일본어는 향후 추가 예정
    // if (['zh', 'cn', 'tw', 'hk'].includes(langCode)) {
    //   return 'zh';
    // }
    // if (['ja', 'jp'].includes(langCode)) {
    //   return 'ja';
    // }
    
    return 'ko'; // 기본값
  }

  // 번역 데이터 로드 (다중 저장소 지원)
  loadTranslations() {
    try {
      // localStorage 또는 sessionStorage에서 번역 데이터 로드
      let storedTranslations = this.safeGetItem('i18nTranslations', 'localStorage');
      let storageSource = 'localStorage';
      
      if (!storedTranslations) {
        storedTranslations = this.safeGetItem('i18nTranslations', 'sessionStorage');
        storageSource = 'sessionStorage';
      }
      
      console.log('🔍 i18nTranslations 로드 시도:', storedTranslations ? `데이터 있음 (${storageSource})` : '데이터 없음');
      
      if (storedTranslations) {
        try {
          const parsed = JSON.parse(storedTranslations);
          this.translations = parsed;
          console.log('✅ 번역 데이터 로드 완료:', Object.keys(this.translations));
          
          // 누락된 키 체크 및 병합 (기존 데이터 보존!)
          const defaultTranslations = this.getDefaultTranslations();
          let needsUpdate = false;
          
          // 각 언어별로 누락된 키만 추가
          this.supportedLanguages.forEach(lang => {
            if (!this.translations[lang]) {
              console.log(`⚠️ ${lang} 언어 데이터 없음 - 기본값 추가`);
              this.translations[lang] = defaultTranslations[lang];
              needsUpdate = true;
            } else {
              // 누락된 섹션만 추가 (deep merge)
              const merged = this.deepMerge(defaultTranslations[lang], this.translations[lang]);
              if (JSON.stringify(merged) !== JSON.stringify(this.translations[lang])) {
                console.log(`🔄 ${lang} 언어 데이터에 누락된 키 추가`);
                this.translations[lang] = merged;
                needsUpdate = true;
              }
            }
          });
          
          // 누락된 키가 추가되었으면 저장
          if (needsUpdate) {
            console.log('💾 누락된 키 추가 후 저장');
            this.saveTranslations();
          }
          
          console.log('📝 현재 언어:', this.currentLanguage);
          console.log('📝 현재 언어 데이터:', this.translations[this.currentLanguage] ? '있음' : '없음');
        } catch (e) {
          console.error('❌ 번역 데이터 파싱 오류:', e);
          // 파싱 오류 시에만 기본값 사용
          this.translations = this.getDefaultTranslations();
          this.saveTranslations();
        }
      } else {
        // localStorage에 데이터가 없을 때만 기본값 생성
        console.log('📝 기본 번역 데이터 생성 (최초 실행)');
        this.translations = this.getDefaultTranslations();
        this.saveTranslations();
        console.log('✅ 기본 번역 데이터 생성 완료');
      }
    } catch (error) {
      console.error('❌ 번역 데이터 로드 오류:', error);
      this.translations = this.getDefaultTranslations();
    }
  }

  // Deep merge: 기본값을 먼저, 사용자 데이터로 덮어쓰기 (사용자 데이터 우선!)
  deepMerge(defaultObj, userObj) {
    const result = { ...defaultObj };
    
    Object.keys(userObj).forEach(key => {
      if (userObj[key] && typeof userObj[key] === 'object' && !Array.isArray(userObj[key])) {
        // 객체인 경우 재귀적으로 병합
        result[key] = this.deepMerge(defaultObj[key] || {}, userObj[key]);
      } else {
        // 기본 값이거나 사용자가 수정한 값 우선
        result[key] = userObj[key];
      }
    });
    
    return result;
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
            news: '뉴스',
            admin: '관리자'
          }
        },
        // 네비게이션 메뉴
        nav: {
          about: {
            intro: '정호그룹 소개',
            vision: '그룹비전 (IRGS)',
            management: '경영방침',
            location: '찾아오시는길'
          },
          subsidiaries: {
            main: '그룹사',
            tlc: '정호티엘씨',
            clarus: '클라루스',
            illutech: '일루텍',
            texcom: '정호텍스컴',
            rss: 'RSS 사업부'
          },
          media: {
            main: '미디어/PR',
            projects: '프로젝트 영상',
            promotion: '홍보영상',
            technicalDocs: '기술자료실'
          },
          support: {
            main: '고객센터',
            report: '지원 제보',
            contact: '문의하기'
          },
          family: '패밀리 사이트'
        },
        // 계열사
        subsidiaries: {
          clarus: '클라루스',
          tlc: '정호티엘씨',
          illutech: '일루텍',
          texcom: '정호텍스컴'
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
        // Footer
        footer: {
          subsidiaries: '계열사',
          support: '고객지원',
          contactPhone: '문의전화',
          email: '이메일',
          kakaoTalk: '카카오톡',
          privacy: '개인정보처리지침',
          terms: '이용약관',
          followUs: 'Follow us',
          copyright: '모든 권리 보유'
        },
        // ABOUT - 정호그룹 소개
        aboutIntro: {
          pageTitle: '정호그룹 소개',
          paragraph1: '저희 정호그룹은\n1982년 창립하여 유럽의 섬유기계 장비를 수입, 판매를 시작으로 1986년 조명제어 시스템 사업에 진출하여 국내 최초로 One-Shot System, Full 2-Way System을 국내 시장에 도입하였습니다.',
          paragraph2: '또한 국내 최고의 연구 인력 확보와 지속적인 투자를 통해 신제품 개발 및 독자적인 Software 체계를 구축하는 등 국내 조명제어 산업을 선도해 왔습니다. 2003년 조명 제어의 미국 수출을 시작으로 캐나다, 중국, 대만, 동남아시아 시장 등 글로벌 매출을 확대해 왔으며, 5년간의 개발기간을 거쳐 완성된 독립적인 컨트롤러부터 LCD Touch Screen까지 Full Line Up을 구축하여 글로벌 경쟁력을 확보하였습니다.',
          paragraph3: '저희 정호그룹은 각 산업분야에서 우수한 인재를 통하여 앞선 기술개발과 경쟁력을 바탕으로 사업영역을 확대하고 획기적인 성장과 발전을 이룩해 왔으며, 4차 산업의 핵심인 IoT와 융합된 제품으로 조명제어, 전력제어 산업의 Total Solution Leader로서의 역할을 다 해 나갈 것입니다.',
          paragraph4: '저희 정호는 베풀어 주신 고객 여러분의 신뢰를 바탕으로 환경을 생각하고, 에너지의 가치를 존중하는 기업으로서 변화와 혁신을 추구하여 최고의 품질과 최고의 서비스로 언제나 고객 여러분과 함께할 것을 약속드립니다.',
          closing: '감사합니다.',
          signature: '정호그룹 임직원 일동'
        },
        // ABOUT - HISTORY
        history: {
          pageTitle: 'HISTORY',
          currentPage: 'Current Page',
          yearRange: '📅 1982 - 2025',
          mainTitle: '정호그룹의 발자취',
          subtitle: '1982년부터 현재까지',
          subtitleHighlight: '43년의 혁신과 성장의 여정',
          statYears: '역사',
          statMilestones: '마일스톤',
          statSubsidiaries: '계열사',
          ctaTitle: '함께 만들어갈 미래',
          ctaDescription: '43년의 경험과 혁신을 바탕으로\n정호그룹은 더 밝은 내일을 향해 나아갑니다',
          ctaButton: '정호그룹과 함께하기',
          foundingMark: '정호물산 창립',
          foundingSubtitle: '정호그룹의 시작'
        },
        // Media/PR
        media: {
          promotion: {
            pageTitle: '홍보영상',
            subtitle: '정호그룹과 계열사의 다양한 홍보영상을 만나보세요',
            categories: {
              all: '전체',
              company: '기업 소개',
              subsidiaries: '계열사',
              technology: '기술 혁신',
              awards: '수상 및 인증'
            },
            duration: '재생시간',
            views: '조회수',
            uploadDate: '업로드',
            watchVideo: '영상 보기',
            noVideos: '등록된 영상이 없습니다',
            ipTitle: '정호그룹 지적재산권 현황',
            ipSubtitle: '정호그룹의 기술력을 입증하는 140여 개의 지적재산권',
            ipTotal: '총 지적재산권',
            ipPatents: '특허',
            ipDesigns: '디자인',
            ipSoftware: '소프트웨어',
            bannerTitle: '더 많은 영상을 준비하고 있습니다',
            bannerSubtitle: '정호그룹의 다양한 이야기를 영상으로 만나보세요',
            subscribeButton: 'YouTube 채널 구독하기'
          },
          sns: {
            pageTitle: '정호그룹 SNS',
            subtitle: '다양한 소셜미디어를 통해 정호그룹과 소통하세요',
            channels: {
              youtube: {
                name: 'YouTube',
                description: '정호그룹의 다양한 프로젝트와 기술 혁신을 영상으로 만나보세요'
              },
              instagram: {
                name: 'Instagram',
                description: '일상 속 정호그룹의 모습과 직원들의 이야기를 공유합니다'
              },
              naverBlog: {
                name: '네이버 블로그',
                description: '정호그룹의 기술 인사이트와 산업 트렌드를 심층 분석합니다'
              },
              facebook: {
                name: 'Facebook',
                description: '정호그룹의 소식과 업계 뉴스를 가장 먼저 확인하세요'
              }
            },
            stats: {
              followers: '팔로워',
              posts: '게시물'
            },
            visitButton: '방문하기',
            recentActivity: {
              title: '최근 SNS 활동',
              subtitle: '정호그룹의 최신 소식을 확인하세요'
            },
            cta: {
              title: '정호그룹과 함께하세요',
              subtitle: '다양한 채널에서 정호그룹의 소식을 가장 먼저 만나보세요'
            }
          }
        },
        // Project Portfolio (프로젝트 포트폴리오 페이지)
        portfolio: {
          badge: '🏆 2,152+ 프로젝트',
          pageTitle: '프로젝트 포트폴리오',
          subtitle: '정호그룹의 대표 프로젝트를 소개합니다',
          subtitleHighlight: '40년의 경험과 기술력',
          statTotal: '총 프로젝트',
          statFeatured: '대표 프로젝트',
          statCategories: '카테고리',
          categories: {
            all: '전체',
            office: '업무시설',
            public: '공공시설',
            residential: '주거시설',
            commercial: '상업시설',
            cultural: '문화·의료·교육',
            industrial: '생산·물류·데이터센터'
          },
          filterAll: '전체 {{total}}건 중 대표 {{featured}}건 표시',
          filterCategory: '{{category}} 전체 {{total}}건 중 {{count}}건 표시'
        },
        // 고객지원 페이지
        support: {
          loading: '고객지원 페이지를 불러오는 중...',
          error: '콘텐츠를 불러오는데 실패했습니다.',
          retry: '다시 시도',
          noContent: '콘텐츠를 불러올 수 없습니다.',
          hero: {
            title: '고객 지원',
            subtitle: '정호그룹의 전문가들이 24시간 내에 답변드립니다. 언제든지 문의해주세요.',
            description: '전문적인 기술 지원과 서비스를 통해 고객의 성공을 지원합니다'
          },
          channels: {
            title: '지원 채널',
            description: '다양한 방법으로 정호그룹의 전문가들과 연락하실 수 있습니다'
          },
          services: {
            title: '지원 서비스',
            description: '시스템 도입부터 운영까지 전 과정을 지원합니다'
          },
          faq: {
            title: '자주 묻는 질문',
            description: '고객님들이 자주 문의하시는 내용들을 정리했습니다'
          },
          contactForm: {
            title: '문의하기',
            description: '프로젝트에 대한 상세한 문의사항을 남겨주시면 전문가가 빠른 시일 내에 답변드립니다',
            fields: {
              name: '이름',
              company: '회사명',
              email: '이메일',
              phone: '연락처',
              category: '문의 분야',
              message: '문의 내용'
            },
            placeholders: {
              name: '이름을 입력하세요',
              company: '회사명을 입력하세요',
              email: '이메일을 입력하세요',
              phone: '연락처를 입력하세요',
              category: '문의 분야를 선택하세요',
              message: '상세한 문의 내용을 입력하세요'
            },
            categories: {
              smartBuilding: '스마트 빌딩 조명제어',
              cityInfra: '도시 조명 인프라',
              industrial: '산업용 조명시스템',
              cultural: '문화시설 조명예술',
              technical: '기술 상담',
              other: '기타'
            },
            submit: '문의하기',
            successMessage: '문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.'
          }
        },
        // 계열사 페이지
        pages: {
          clarus: {
            hero: {
              title: '기술로 미래를',
              titleHighlight: '밝히다',
              description: 'E/F2-BUS 자체 개발 프로토콜로 조명제어의 새로운 표준을 제시합니다',
              stats: {
                years: { label: '15년+', value: 'R&D 투자' },
                patents: { label: '50+', value: '특허 보유' },
                countries: { label: '30+', value: '해외 진출국' }
              },
              buttons: {
                technicalDocs: '기술 자료 다운로드',
                technicalDocsPending: '기술 자료 준비 중',
                productCatalog: '제품 카탈로그 보기',
                catalogPending: '카탈로그 준비 중'
              },
              uploadMessage: '관리자 페이지에서 관련 파일을 업로드해주세요.'
            }
          },
          tlc: {
            hero: {
              title: '언제나 함께합니다',
              description: '영업부터 A/S까지, 고객 성공을 위한 완벽한 파트너십을 제공합니다',
              stats: {
                network: { label: '전국 50+', value: '대리점' },
                support: { label: '24시간', value: 'A/S' },
                satisfaction: { label: '95%', value: '고객 만족도' }
              },
              buttons: {
                consultation: '빠른 상담 신청',
                findDealer: '가까운 대리점 찾기'
              }
            }
          },
          illutech: {
            hero: {
              title: '당신의 공간을 빛냅니다',
              description: '40년 조명 전문성이 선별한 프리미엄 조명을 온라인에서 만나보세요',
              stats: {
                products: { label: '', value: '프리미엄 제품', suffix: '+' },
                delivery: { label: '', value: '당일배송', suffix: '%' },
                exchange: { label: '', value: '무료 교환', suffix: '일' }
              },
              buttons: {
                shop: '온라인몰 바로가기',
                consultation: '무료 상담 신청'
              }
            }
          },
          texcom: {
            hero: {
              title: '섬유의 전통, 패션의 미래',
              description: '40년간 축적된 섬유기계 전문성과 트렌드를 선도하는 패션 브랜드가 만나 새로운 가치를 창조합니다',
              buttons: {
                b2b: '섬유기계 사업부',
                b2c: '패션 브랜드 사업부'
              }
            }
          }
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
            title: '사람과 공간을\n밝히는 기술',
            subtitle: '정호그룹',
            description: '40년의 혁신으로 내일의 빛을 밝힙니다',
            primaryAction: '사업영역 보기',
            secondaryAction: '문의하기'
          },
          gateway: {
            title: '정호그룹 GATEWAY',
            subtitle: '정호그룹의 다양한 소식을 전해드립니다',
            group: {
              title: '그룹 소개',
              description: '정호그룹의 비전과 역사를 확인하세요'
            },
            subsidiaries: {
              title: '계열사',
              description: '4개 전문 계열사가 함께합니다'
            },
            media: {
              title: '미디어/PR',
              description: '최신 소식과 영상을 만나보세요'
            },
            contact: {
              title: '문의하기',
              description: '궁금하신 사항은 언제든지 문의하세요'
            }
          },
          philosophy: {
            title: '경영철학',
            subtitle: '정호그룹이 끊임없이 추구하는 경영의 방향',
            customerSatisfaction: {
              title: '고객 만족',
              description: '고객의 니즈를 정확히 파악하고 최고의 품질로 응답합니다'
            },
            innovation: {
              title: '기술 혁신',
              description: '지속적인 R&D를 통해 업계 선도 기술을 확보합니다'
            },
            growth: {
              title: '지속 가능한 성장',
              description: '장기적 관점에서 기업과 사회가 함께 성장하는 미래를 만듭니다'
            }
          },
          numbers: {
            title: '숫자로 보는 정호그룹',
            subtitle: '40년간 쌓아온 경험과 성과',
            established: '창립',
            subsidiaries: '계열사',
            projects: '프로젝트',
            clients: '고객사'
          },
          irgs: {
            title: 'IRGS - 정호그룹의 핵심가치',
            subtitle: '정밀함이 담긴 기술, 아름다움이 담긴 경험',
            innovation: {
              title: '혁신',
              subtitle: 'Innovation',
              description: '새로운 아이디어와 기술로 더 나은 "경험"을 만듭니다'
            },
            reliability: {
              title: '신뢰',
              subtitle: 'Reliability',
              description: '품질과 약속을 지켜 "관계의 가치"를 높입니다'
            },
            global: {
              title: '글로벌',
              subtitle: 'Global',
              description: '선도적인 기술과 서비스로 글로벌 "경쟁력"을 확대합니다'
            },
            sustainability: {
              title: '지속가능성',
              subtitle: 'Sustainability',
              description: '인간과 자연이 공존하는 지속가능한 "내일"을 설계합니다'
            }
          },
          cta: {
            title: '정호그룹과 함께하세요',
            subtitle: '혁신적인 기술과 40년 경험으로 밝은 미래를 만들어갑니다',
            aboutButton: '회사 소개',
            contactButton: '문의하기'
          },
          stats: {
            years: {
              suffix: '년',
              label: '조명제어 전문 경험'
            },
            projects: {
              label: '프로젝트 완료',
              sublabel: '(누적, 1983년~)'
            },
            registered: {
              label: '등록된 프로젝트',
              sublabel: '(온라인 등록)'
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
            description: '기술개발부터 고객서비스까지, 각 분야 전문성에 의한 시너지 창출',
            clarus: {
              title: '클라루스',
              subtitle: 'AI 기반 스마트 조명/전력제어',
              description: '스마트 조명/전력 제어시스템 개발, 핵심 디바이스 생산, 국내외에 공급하는 전문 업체'
            },
            tlc: {
              title: '정호티엘씨',
              subtitle: '조명/전력제어의 설계/시공/사후관리',
              description: '공공기관, 오피스빌딩, 물류 및 데이터센터에 최적의 스마트 조명환경을 설계 구축하고, 사후관리를 담당하는 전문업체'
            },
            illutech: {
              title: '일루텍',
              subtitle: '유.무선 스마트조명제품 쇼핑몰 공급',
              description: '유.무선 조명제어 제품을 국내의 유명 쇼핑몰에 전문 판매, 편리한 시공기술지원 업체'
            },
            texcom: {
              title: '정호텍스컴',
              subtitle: '섬유기계 도염, 운영을 통해 국내 섬유산업 지원과 자체 패션브랜드 운영',
              description: '40년간 축적된 섬유기계 전문성과 패션브랜드 운영을 통해 새로운 가치를 창출하는 전문업체'
            }
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
          // 계열사 페이지
          subsidiariesPage: {
            badge: '🏢 4개 전문 계열사',
            title: '정호그룹 계열사',
            subtitle: '각 분야 전문성을 바탕으로',
            subtitleHighlight: '함께 성장하는 정호그룹 계열사',
            stats: {
              subsidiaries: '계열사',
              history: '연혁',
              employees: '임직원'
            },
            card: {
              established: '설립',
              year: '년',
              businessField: '사업분야',
              visitWebsite: '🌐 웹사이트 방문',
              learnMore: '자세히 보기'
            },
            cta: {
              title: '함께 성장하는 정호그룹',
              description: '4개 전문 계열사가 각 분야에서 최고의 기술과 서비스를 제공합니다.\n정호그룹과 함께 더 밝은 미래를 만들어갑니다.',
              contactButton: '문의하기'
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
          hero: {
            title: '정호그룹 프로젝트',
            subtitle: '40년간 축적된 기술력으로 완성한 다양한 프로젝트들을 소개합니다',
            description: '국내외 주요 기업들과 함께한 1,000개 이상의 성공적인 프로젝트 사례를 확인하세요'
          },
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
          hero: {
            title: '정호그룹의 사업영역',
            subtitle: '조명제어 전문기업으로서 40년간 축적된 기술력으로 다양한 분야에서 혁신적인 솔루션을 제공합니다',
            description: '클라러스, TLC, 일루테크, 텍스컴 등 4개 계열사가 각각의 전문분야에서 최고의 솔루션을 제공합니다'
          },
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
            news: 'News',
            admin: 'Admin'
          }
        },
        // Navigation Menu
        nav: {
          about: {
            intro: 'Jungho Group Introduction',
            vision: 'Group Vision (IRGS)',
            management: 'Management Policy',
            location: 'Location'
          },
          subsidiaries: {
            main: 'Subsidiaries',
            tlc: 'Jungho TLC',
            clarus: 'Clarus',
            illutech: 'Illutech',
            texcom: 'Jungho Texcom',
            rss: 'RSS Division'
          },
          media: {
            main: 'Media/PR',
            projects: 'Project Videos',
            promotion: 'Promotional Videos',
            technicalDocs: 'Technical Documents'
          },
          support: {
            main: 'Customer Center',
            report: 'Support Report',
            contact: 'Contact Us'
          },
          family: 'Family Sites'
        },
        // Subsidiaries
        subsidiaries: {
          clarus: 'Clarus',
          tlc: 'Jungho TLC',
          illutech: 'Illutech',
          texcom: 'Jungho Texcom'
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
        // Footer
        footer: {
          subsidiaries: 'Subsidiaries',
          support: 'Customer Support',
          contactPhone: 'Contact Phone',
          email: 'Email',
          kakaoTalk: 'KakaoTalk',
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
          followUs: 'Follow us',
          copyright: 'All Rights Reserved'
        },
        // ABOUT - Company Introduction
        aboutIntro: {
          pageTitle: 'Company Introduction',
          paragraph1: 'Since our founding in 1982, Jungho Group started by importing and selling European textile machinery equipment. In 1986, we entered the lighting control system business and introduced the first One-Shot System and Full 2-Way System to the Korean market.',
          paragraph2: 'We have led the domestic lighting control industry by securing top-tier research talent and continuous investment in new product development and establishing an independent software system. Starting with exports to the United States in 2003, we have expanded our global sales to Canada, China, Taiwan, and Southeast Asian markets. Through five years of development, we have established a full line-up from independent controllers to LCD Touch Screens, securing global competitiveness.',
          paragraph3: 'Jungho Group has achieved remarkable growth and development by expanding business areas based on advanced technology development and competitiveness through excellent talent in each industry sector. We will fulfill our role as a Total Solution Leader in the lighting control and power control industries with products integrated with IoT, the core of the 4th industrial revolution.',
          paragraph4: 'Based on the trust bestowed by our valued customers, we promise to always be with you through the highest quality and best service, pursuing change and innovation as a company that thinks about the environment and respects the value of energy.',
          closing: 'Thank you.',
          signature: 'All employees of Jungho Group'
        },
        // ABOUT - HISTORY
        history: {
          pageTitle: 'HISTORY',
          currentPage: 'Current Page',
          yearRange: '📅 1982 - 2025',
          mainTitle: 'Jungho Group Journey',
          subtitle: 'From 1982 to Present',
          subtitleHighlight: '43 Years of Innovation and Growth',
          statYears: 'Years',
          statMilestones: 'Milestones',
          statSubsidiaries: 'Subsidiaries',
          ctaTitle: 'Building the Future Together',
          ctaDescription: 'With 43 years of experience and innovation\nJungho Group moves forward towards a brighter tomorrow',
          ctaButton: 'Join Jungho Group',
          foundingMark: 'Jungho Mulsan Founded',
          foundingSubtitle: 'The Beginning of Jungho Group'
        },
        // Media/PR
        media: {
          promotion: {
            pageTitle: 'Promotional Videos',
            subtitle: 'Discover various promotional videos of Jungho Group and its subsidiaries',
            categories: {
              all: 'All',
              company: 'Company Introduction',
              subsidiaries: 'Subsidiaries',
              technology: 'Technology Innovation',
              awards: 'Awards & Certifications'
            },
            duration: 'Duration',
            views: 'Views',
            uploadDate: 'Uploaded',
            watchVideo: 'Watch Video',
            noVideos: 'No videos available',
            ipTitle: 'Jungho Group Intellectual Property Status',
            ipSubtitle: 'Over 140 intellectual properties demonstrating Jungho Group\'s technological capabilities',
            ipTotal: 'Total Intellectual Property',
            ipPatents: 'Patents',
            ipDesigns: 'Designs',
            ipSoftware: 'Software',
            bannerTitle: 'More videos are coming soon',
            bannerSubtitle: 'Discover Jungho Group\'s diverse stories through videos',
            subscribeButton: 'Subscribe to YouTube Channel'
          },
          sns: {
            pageTitle: 'Jungho Group SNS',
            subtitle: 'Connect with Jungho Group through various social media platforms',
            channels: {
              youtube: {
                name: 'YouTube',
                description: 'Discover various projects and technological innovations of Jungho Group through videos'
              },
              instagram: {
                name: 'Instagram',
                description: 'Share the daily moments of Jungho Group and employee stories'
              },
              naverBlog: {
                name: 'Naver Blog',
                description: 'In-depth analysis of Jungho Group\'s technical insights and industry trends'
              },
              facebook: {
                name: 'Facebook',
                description: 'Be the first to check Jungho Group\'s news and industry updates'
              }
            },
            stats: {
              followers: 'Followers',
              posts: 'Posts'
            },
            visitButton: 'Visit',
            recentActivity: {
              title: 'Recent SNS Activity',
              subtitle: 'Check out the latest news from Jungho Group'
            },
            cta: {
              title: 'Join Jungho Group',
              subtitle: 'Be the first to receive Jungho Group\'s news through various channels'
            }
          }
        },
        // Project Portfolio
        portfolio: {
          badge: '🏆 2,152+ Projects',
          pageTitle: 'Project Portfolio',
          subtitle: 'Showcasing Jungho Group\'s Representative Projects',
          subtitleHighlight: '40 Years of Experience and Expertise',
          statTotal: 'Total Projects',
          statFeatured: 'Featured Projects',
          statCategories: 'Categories',
          categories: {
            all: 'All',
            office: 'Office Buildings',
            public: 'Public Facilities',
            residential: 'Residential',
            commercial: 'Commercial',
            cultural: 'Cultural·Medical·Education',
            industrial: 'Industrial·Logistics·Data Center'
          },
          filterAll: 'Showing {{featured}} featured projects out of {{total}} total',
          filterCategory: 'Showing {{count}} projects out of {{total}} {{category}}'
        },
        // Support Page
        support: {
          loading: 'Loading support page...',
          error: 'Failed to load content.',
          retry: 'Retry',
          noContent: 'Unable to load content.',
          hero: {
            title: 'Customer Center',
            subtitle: 'Jungho Group experts will respond within 24 hours. Please contact us anytime.',
            description: 'We support customer success through professional technical support and services'
          },
          channels: {
            title: 'Support Channels',
            description: 'Connect with Jungho Group experts through various channels'
          },
          services: {
            title: 'Support Services',
            description: 'We support the entire process from system introduction to operation'
          },
          faq: {
            title: 'Frequently Asked Questions',
            description: 'Common questions from our customers'
          },
          contactForm: {
            title: 'Contact Us',
            description: 'Leave your detailed inquiry about the project and our experts will respond promptly',
            fields: {
              name: 'Name',
              company: 'Company',
              email: 'Email',
              phone: 'Phone',
              category: 'Inquiry Category',
              message: 'Message'
            },
            placeholders: {
              name: 'Enter your name',
              company: 'Enter company name',
              email: 'Enter email address',
              phone: 'Enter phone number',
              category: 'Select inquiry category',
              message: 'Enter detailed inquiry'
            },
            categories: {
              smartBuilding: 'Smart Building Lighting Control',
              cityInfra: 'City Lighting Infrastructure',
              industrial: 'Industrial Lighting System',
              cultural: 'Cultural Facility Lighting Art',
              technical: 'Technical Consultation',
              other: 'Other'
            },
            submit: 'Submit Inquiry',
            successMessage: 'Your inquiry has been received. We will respond as soon as possible.'
          }
        },
        // Subsidiary Pages
        pages: {
          clarus: {
            hero: {
              title: 'Illuminating the Future',
              titleHighlight: 'with Technology',
              description: 'Setting new standards in lighting control with our proprietary E/F2-BUS protocol',
              stats: {
                years: { label: '15+ Years', value: 'R&D Investment' },
                patents: { label: '50+', value: 'Patents' },
                countries: { label: '30+', value: 'Global Markets' }
              },
              buttons: {
                technicalDocs: 'Download Technical Docs',
                technicalDocsPending: 'Docs Coming Soon',
                productCatalog: 'View Product Catalog',
                catalogPending: 'Catalog Coming Soon'
              },
              uploadMessage: 'Please upload relevant files from the admin page.'
            }
          },
          tlc: {
            hero: {
              title: 'Always by Your Side',
              description: 'From sales to after-sales service, providing perfect partnership for customer success',
              stats: {
                network: { label: 'Nationwide 50+', value: 'Dealers' },
                support: { label: '24 Hours', value: 'A/S' },
                satisfaction: { label: '95%', value: 'Customer Satisfaction' }
              },
              buttons: {
                consultation: 'Quick Consultation',
                findDealer: 'Find Nearest Dealer'
              }
            }
          },
          illutech: {
            hero: {
              title: 'Brightening Your Space',
              description: 'Experience premium lighting selected by 40 years of lighting expertise online',
              stats: {
                products: { label: '', value: 'Premium Products', suffix: '+' },
                delivery: { label: '', value: 'Same-Day Delivery', suffix: '%' },
                exchange: { label: '', value: 'Free Exchange', suffix: ' Days' }
              },
              buttons: {
                shop: 'Visit Online Store',
                consultation: 'Free Consultation'
              }
            }
          },
          texcom: {
            hero: {
              title: 'Textile Tradition, Fashion Future',
              description: '40 years of textile machinery expertise meets trend-leading fashion brands to create new value',
              buttons: {
                b2b: 'Textile Machinery Division',
                b2c: 'Fashion Brand Division'
              }
            }
          }
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
            title: 'Customer Center - Jungho Group',
            description: 'Check out Jungho Group\'s customer center services. We provide various support services such as 24/7 technical support, A/S service, and training programs.',
            keywords: 'Jungho Group, Customer Center, Customer Support, A/S, Technical Support, Training Program, Customer Service'
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
            title: 'Lighting technology that\nilluminates people and spaces',
            subtitle: 'Jungho Group',
            description: 'Lighting tomorrow with 40 years of innovation',
            primaryAction: 'View Business Areas',
            secondaryAction: 'Contact Us'
          },
          gateway: {
            title: 'Jungho Group GATEWAY',
            subtitle: 'Delivering various news from Jungho Group',
            group: {
              title: 'Group Introduction',
              description: 'Check out Jungho Group\'s vision and history'
            },
            subsidiaries: {
              title: 'Subsidiaries',
              description: '4 professional subsidiaries together'
            },
            media: {
              title: 'Media/PR',
              description: 'Experience our latest news and videos'
            },
            contact: {
              title: 'Contact Us',
              description: 'Feel free to contact us with any questions'
            }
          },
          philosophy: {
            title: 'Management Philosophy',
            subtitle: 'The direction of management that Jungho Group continuously pursues',
            customerSatisfaction: {
              title: 'Customer Satisfaction',
              description: 'We accurately identify customer needs and respond with the best quality'
            },
            innovation: {
              title: 'Technology Innovation',
              description: 'We secure industry-leading technology through continuous R&D'
            },
            growth: {
              title: 'Sustainable Growth',
              description: 'We create a future where companies and society grow together from a long-term perspective'
            }
          },
          numbers: {
            title: 'Jungho Group by Numbers',
            subtitle: 'Experience and achievements built over 40 years',
            established: 'Established',
            subsidiaries: 'Subsidiaries',
            projects: 'Projects',
            clients: 'Clients'
          },
          irgs: {
            title: 'IRGS - Core Values of Jungho Group',
            subtitle: 'Technology with precision, Experience with beauty',
            innovation: {
              title: 'Innovation',
              subtitle: 'Innovation',
              description: 'Creating better "experiences" with new ideas and technology'
            },
            reliability: {
              title: 'Reliability',
              subtitle: 'Reliability',
              description: 'Keeping quality and promises, enhancing the "value of relationships"'
            },
            global: {
              title: 'Global',
              subtitle: 'Global',
              description: 'Expanding global "competitiveness" with leading technology and services'
            },
            sustainability: {
              title: 'Sustainability',
              subtitle: 'Sustainability',
              description: 'Designing a sustainable "tomorrow" where humans and nature coexist'
            }
          },
          cta: {
            title: 'Join Jungho Group',
            subtitle: 'Creating a bright future with innovative technology and 40 years of experience',
            aboutButton: 'About Company',
            contactButton: 'Contact Us'
          },
          stats: {
            years: {
              suffix: ' Years',
              label: 'Lighting Control Expertise'
            },
            projects: {
              label: 'Projects Completed',
              sublabel: '(Cumulative, Since 1983)'
            },
            registered: {
              label: 'Registered Projects',
              sublabel: '(Online Registry)'
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
            description: 'From technology development to customer service, creating synergy through expertise in each field',
            clarus: {
              title: 'Clarus',
              subtitle: 'AI-based Smart Lighting/Power Control',
              description: 'Develops smart lighting/power control systems, produces core devices, and supplies them domestically and internationally'
            },
            tlc: {
              title: 'Jungho TLC',
              subtitle: 'Design/Construction/After-sales of Lighting/Power Control',
              description: 'Designs and builds optimal smart lighting environments for public institutions, office buildings, logistics and data centers, and provides after-sales service'
            },
            illutech: {
              title: 'Illutech',
              subtitle: 'Wired/Wireless Smart Lighting Products Shopping Mall Supply',
              description: 'Professionally sells wired/wireless lighting control products to famous domestic shopping malls and provides convenient construction technical support'
            },
            texcom: {
              title: 'Jungho Texcom',
              subtitle: 'Supporting Domestic Textile Industry and Operating Fashion Brands',
              description: 'Creates new value through 40 years of accumulated textile machinery expertise and fashion brand operation'
            }
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
          // Subsidiaries Page
          subsidiariesPage: {
            badge: '🏢 4 Professional Subsidiaries',
            title: 'Jungho Group Subsidiaries',
            subtitle: 'Based on expertise in each field',
            subtitleHighlight: 'Jungho Group subsidiaries growing together',
            stats: {
              subsidiaries: 'Subsidiaries',
              history: 'History',
              employees: 'Employees'
            },
            card: {
              established: 'Established',
              year: 'year',
              businessField: 'Business Field',
              visitWebsite: '🌐 Visit Website',
              learnMore: 'Learn More'
            },
            cta: {
              title: 'Growing Together - Jungho Group',
              description: '4 professional subsidiaries provide the best technology and service in each field.\nTogether with Jungho Group, we create a brighter future.',
              contactButton: 'Contact Us'
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
          hero: {
            title: 'Jungho Group Business Areas',
            subtitle: 'As a lighting control specialist, we provide innovative solutions in various fields with 40 years of accumulated technology',
            description: 'Four subsidiaries including Clarus, TLC, Illutech, and Texcom provide the best solutions in their respective specialized fields'
          },
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
          hero: {
            title: 'Jungho Group Projects',
            subtitle: 'Introducing various projects completed with 40 years of accumulated technology',
            description: 'Check out over 1,000 successful project cases with major domestic and international companies'
          },
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
        // Footer
        footer: {
          subsidiaries: '子公司',
          support: '客户支持',
          contactPhone: '咨询电话',
          email: '电子邮件',
          kakaoTalk: 'KakaoTalk',
          privacy: '隐私政策',
          terms: '使用条款',
          followUs: 'Follow us',
          copyright: '版权所有'
        },
        // Support Page
        support: {
          loading: '正在加载客户支持页面...',
          error: '无法加载内容。',
          retry: '重试',
          noContent: '无法加载内容。',
          hero: {
            title: '客户支持',
            subtitle: '正浩集团专家将在24小时内回复。请随时联系我们。',
            description: '通过专业的技术支持和服务，我们支持客户成功'
          },
          channels: {
            title: '支持渠道',
            description: '通过各种渠道联系正浩集团的专家'
          },
          services: {
            title: '支持服务',
            description: '我们支持从系统引进到运营的整个过程'
          },
          faq: {
            title: '常见问题',
            description: '客户经常咨询的内容'
          },
          contactForm: {
            title: '联系我们',
            description: '留下您对项目的详细咨询，我们的专家将尽快回复',
            fields: {
              name: '姓名',
              company: '公司名称',
              email: '电子邮件',
              phone: '电话',
              category: '咨询类别',
              message: '咨询内容'
            },
            placeholders: {
              name: '请输入姓名',
              company: '请输入公司名称',
              email: '请输入电子邮件',
              phone: '请输入电话号码',
              category: '请选择咨询类别',
              message: '请输入详细咨询内容'
            },
            categories: {
              smartBuilding: '智能建筑照明控制',
              cityInfra: '城市照明基础设施',
              industrial: '工业照明系统',
              cultural: '文化设施照明艺术',
              technical: '技术咨询',
              other: '其他'
            },
            submit: '提交咨询',
            successMessage: '您的咨询已收到。我们将尽快回复。'
          }
        },
        // Subsidiary Pages
        pages: {
          clarus: {
            hero: {
              title: '用技术',
              titleHighlight: '点亮未来',
              description: '通过自主开发的E/F2-BUS协议为照明控制设定新标准',
              stats: {
                years: { label: '15年+', value: '研发投资' },
                patents: { label: '50+', value: '专利' },
                countries: { label: '30+', value: '全球市场' }
              },
              buttons: {
                technicalDocs: '下载技术资料',
                technicalDocsPending: '资料准备中',
                productCatalog: '查看产品目录',
                catalogPending: '目录准备中'
              },
              uploadMessage: '请从管理页面上传相关文件。'
            }
          },
          tlc: {
            hero: {
              title: '始终与您同在',
              description: '从销售到售后服务，为客户成功提供完美的合作伙伴关系',
              stats: {
                network: { label: '全国50+', value: '经销商' },
                support: { label: '24小时', value: '售后服务' },
                satisfaction: { label: '95%', value: '客户满意度' }
              },
              buttons: {
                consultation: '快速咨询申请',
                findDealer: '查找最近的经销商'
              }
            }
          },
          illutech: {
            hero: {
              title: '点亮您的空间',
              description: '在线体验40年照明专业知识精选的高端照明',
              stats: {
                products: { label: '', value: '高端产品', suffix: '+' },
                delivery: { label: '', value: '当日配送', suffix: '%' },
                exchange: { label: '', value: '免费换货', suffix: '天' }
              },
              buttons: {
                shop: '访问在线商城',
                consultation: '免费咨询'
              }
            }
          },
          texcom: {
            hero: {
              title: '纺织传统，时尚未来',
              description: '40年积累的纺织机械专业知识与引领潮流的时尚品牌相遇，创造新价值',
              buttons: {
                b2b: '纺织机械部门',
                b2c: '时尚品牌部门'
              }
            }
          }
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
            news: '新闻',
            admin: '管理'
          }
        },
        // Subsidiaries
        subsidiaries: {
          clarus: '克拉鲁斯',
          tlc: '正浩TLC',
          illutech: '伊利泰克',
          texcom: '正浩泰克斯康'
        },
        // Buttons and UI elements
        buttons: {
          learnMore: '了解更多',
          readMore: '阅读更多',
          viewDetails: '查看详情',
          contact: '联系我们',
          download: '下载',
          submit: '提交',
          save: '保存',
          cancel: '取消',
          edit: '编辑',
          delete: '删除',
          add: '添加',
          update: '更新',
          confirm: '确认',
          back: '返回',
          next: '下一步',
          previous: '上一步',
          close: '关闭',
          search: '搜索',
          filter: '筛选',
          reset: '重置',
          apply: '应用'
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
              label: '项目完成',
              sublabel: '(累计，1983年~)'
            },
            registered: {
              label: '已注册项目',
              sublabel: '(在线注册)'
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
            description: '从技术开发到客户服务，通过各领域专业性创造协同效应',
            clarus: {
              title: 'Clarus',
              subtitle: '基于AI的智能照明/电力控制',
              description: '开发智能照明/电力控制系统，生产核心设备，向国内外供应的专业企业'
            },
            tlc: {
              title: '正浩TLC',
              subtitle: '照明/电力控制的设计/施工/售后管理',
              description: '为公共机构、办公楼、物流和数据中心设计和构建最佳的智能照明环境，并提供售后服务的专业企业'
            },
            illutech: {
              title: 'Illutech',
              subtitle: '有线/无线智能照明产品商城供应',
              description: '向国内外知名购物商城专业销售有线/无线照明控制产品，并提供便捷的施工技术支持'
            },
            texcom: {
              title: '正浩Texcom',
              subtitle: '通过纺织机械染色、运营支持国内纺织产业并运营自有时尚品牌',
              description: '通过40年积累的纺织机械专业知识和时尚品牌运营创造新价值的专业企业'
            }
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
          hero: {
            title: '正浩集团项目',
            subtitle: '介绍40年积累的技术力完成的各种项目',
            description: '查看与国内外主要企业合作的1,000多个成功项目案例'
          },
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
          hero: {
            title: '正浩集团业务领域',
            subtitle: '作为照明控制专业企业，凭借40年积累的技术力，在各个领域提供创新解决方案',
            description: '包括Clarus、TLC、Illutech、Texcom在内的4个子公司，在各自的专业领域提供最佳解决方案'
          },
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
        // Footer
        footer: {
          subsidiaries: '関連会社',
          support: 'カスタマーサポート',
          contactPhone: 'お問い合わせ電話',
          email: 'メール',
          kakaoTalk: 'KakaoTalk',
          privacy: 'プライバシーポリシー',
          terms: '利用規約',
          followUs: 'Follow us',
          copyright: '全著作権所有'
        },
        // Support Page
        support: {
          loading: 'サポートページを読み込んでいます...',
          error: 'コンテンツの読み込みに失敗しました。',
          retry: '再試行',
          noContent: 'コンテンツを読み込めません。',
          hero: {
            title: 'カスタマーサポート',
            subtitle: '正浩グループの専門家が24時間以内に回答いたします。いつでもお問い合わせください。',
            description: '専門的な技術サポートとサービスを通じて、お客様の成功をサポートします'
          },
          channels: {
            title: 'サポートチャネル',
            description: '様々な方法でジョンホグループの専門家にお問い合わせいただけます'
          },
          services: {
            title: 'サポートサービス',
            description: 'システム導入から運用まで全プロセスをサポートします'
          },
          faq: {
            title: 'よくある質問',
            description: 'お客様からよくいただくご質問をまとめました'
          },
          contactForm: {
            title: 'お問い合わせ',
            description: 'プロジェクトに関する詳細なお問い合わせをお寄せください。専門家が迅速に対応いたします',
            fields: {
              name: '氏名',
              company: '会社名',
              email: 'メール',
              phone: '電話番号',
              category: 'お問い合わせ分野',
              message: 'お問い合わせ内容'
            },
            placeholders: {
              name: '氏名を入力してください',
              company: '会社名を入力してください',
              email: 'メールアドレスを入力してください',
              phone: '電話番号を入力してください',
              category: 'お問い合わせ分野を選択してください',
              message: '詳細なお問い合わせ内容を入力してください'
            },
            categories: {
              smartBuilding: 'スマートビルディング照明制御',
              cityInfra: '都市照明インフラ',
              industrial: '産業用照明システム',
              cultural: '文化施設照明アート',
              technical: '技術相談',
              other: 'その他'
            },
            submit: 'お問い合わせ',
            successMessage: 'お問い合わせを受け付けました。迅速に対応いたします。'
          }
        },
        // Subsidiary Pages
        pages: {
          clarus: {
            hero: {
              title: '技術で未来を',
              titleHighlight: '照らす',
              description: '自社開発のE/F2-BUSプロトコルで照明制御の新しい基準を提示します',
              stats: {
                years: { label: '15年以上', value: 'R&D投資' },
                patents: { label: '50以上', value: '特許' },
                countries: { label: '30以上', value: 'グローバル市場' }
              },
              buttons: {
                technicalDocs: '技術資料ダウンロード',
                technicalDocsPending: '資料準備中',
                productCatalog: '製品カタログを見る',
                catalogPending: 'カタログ準備中'
              },
              uploadMessage: '管理ページから関連ファイルをアップロードしてください。'
            }
          },
          tlc: {
            hero: {
              title: 'いつもそばに',
              description: '営業からアフターサービスまで、お客様の成功のための完璧なパートナーシップを提供します',
              stats: {
                network: { label: '全国50以上', value: '販売店' },
                support: { label: '24時間', value: 'アフターサービス' },
                satisfaction: { label: '95%', value: '顧客満足度' }
              },
              buttons: {
                consultation: 'クイック相談申請',
                findDealer: '最寄りの販売店を探す'
              }
            }
          },
          illutech: {
            hero: {
              title: 'あなたの空間を照らします',
              description: '40年の照明専門知識が厳選したプレミアム照明をオンラインで体験してください',
              stats: {
                products: { label: '', value: 'プレミアム製品', suffix: '以上' },
                delivery: { label: '', value: '当日配送', suffix: '%' },
                exchange: { label: '', value: '無料交換', suffix: '日' }
              },
              buttons: {
                shop: 'オンラインストアへ',
                consultation: '無料相談'
              }
            }
          },
          texcom: {
            hero: {
              title: '繊維の伝統、ファッションの未来',
              description: '40年間蓄積された繊維機械の専門知識とトレンドをリードするファッションブランドが出会い、新しい価値を創造します',
              buttons: {
                b2b: '繊維機械事業部',
                b2c: 'ファッションブランド事業部'
              }
            }
          }
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
            news: 'ニュース',
            admin: '管理'
          }
        },
        // Subsidiaries
        subsidiaries: {
          clarus: 'クラルス',
          tlc: '正浩TLC',
          illutech: 'イルテック',
          texcom: '正浩テクスコム'
        },
        // Buttons and UI elements
        buttons: {
          learnMore: '詳細を見る',
          readMore: '続きを読む',
          viewDetails: '詳細を見る',
          contact: 'お問い合わせ',
          download: 'ダウンロード',
          submit: '送信',
          save: '保存',
          cancel: 'キャンセル',
          edit: '編集',
          delete: '削除',
          add: '追加',
          update: '更新',
          confirm: '確認',
          back: '戻る',
          next: '次へ',
          previous: '前へ',
          close: '閉じる',
          search: '検索',
          filter: 'フィルター',
          reset: 'リセット',
          apply: '適用'
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
              label: 'プロジェクト完了',
              sublabel: '(累計、1983年~)'
            },
            registered: {
              label: '登録プロジェクト',
              sublabel: '(オンライン登録)'
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
            description: '技術開発から顧客サービスまで、各分野の専門性によるシナジー創出',
            clarus: {
              title: 'Clarus',
              subtitle: 'AIベースのスマート照明/電力制御',
              description: 'スマート照明/電力制御システム開発、コアデバイス生産、国内外に供給する専門企業'
            },
            tlc: {
              title: '正浩TLC',
              subtitle: '照明/電力制御の設計/施工/アフターサービス',
              description: '公共機関、オフィスビル、物流及びデータセンターに最適なスマート照明環境を設計・構築し、アフターサービスを担当する専門企業'
            },
            illutech: {
              title: 'Illutech',
              subtitle: '有線/無線スマート照明製品ショッピングモール供給',
              description: '有線/無線照明制御製品を国内有名ショッピングモールに専門販売、便利な施工技術支援企業'
            },
            texcom: {
              title: '正浩Texcom',
              subtitle: '繊維機械染色、運営を通じて国内繊維産業支援と自社ファッションブランド運営',
              description: '40年間蓄積された繊維機械の専門性とファッションブランド運営を通じて新しい価値を創出する専門企業'
            }
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
          hero: {
            title: '正浩グループプロジェクト',
            subtitle: '40年間蓄積された技術力で完成した様々なプロジェクトをご紹介します',
            description: '国内外の主要企業との1,000以上の成功プロジェクト事例をご確認ください'
          },
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
          hero: {
            title: '正浩グループ事業領域',
            subtitle: '照明制御専門企業として、40年間蓄積された技術力で様々な分野で革新的なソリューションを提供します',
            description: 'Clarus、TLC、Illutech、Texcomを含む4つの子会社が、それぞれの専門分野で最高のソリューションを提供します'
          },
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

  // 번역 데이터 저장 (다중 저장소 지원)
  saveTranslations() {
    const jsonData = JSON.stringify(this.translations);
    let saved = false;
    
    // 1순위: localStorage
    if (this.safeSetItem('i18nTranslations', jsonData, 'localStorage')) {
      console.log('✅ 번역 데이터 저장 완료 (localStorage)');
      saved = true;
    }
    
    // 2순위: sessionStorage (localStorage 실패 시)
    if (!saved && this.safeSetItem('i18nTranslations', jsonData, 'sessionStorage')) {
      console.log('✅ 번역 데이터 저장 완료 (sessionStorage, localStorage 대체)');
      saved = true;
    }
    
    if (!saved) {
      console.warn('⚠️ 번역 데이터 저장 실패 (모든 저장소 실패)');
    }
  }

  // 언어 변경
  setLanguage(language) {
    if (this.supportedLanguages.includes(language)) {
      console.log('🌐 [setLanguage] 언어 변경 시작:', language);
      console.log('📦 [setLanguage] 이전 언어:', this.currentLanguage);
      
      this.currentLanguage = language;
      
      // 다중 저장소에 저장 (localStorage → sessionStorage → 메모리)
      let savedSuccessfully = false;
      
      // 1순위: localStorage
      if (this.safeSetItem('preferredLanguage', language, 'localStorage')) {
        const saved = this.safeGetItem('preferredLanguage', 'localStorage');
        if (saved === language) {
          console.log('✅ [setLanguage] localStorage에 저장 완료:', saved);
          savedSuccessfully = true;
        } else {
          console.warn('⚠️ [setLanguage] localStorage 저장 확인 실패');
        }
      }
      
      // 2순위: sessionStorage (localStorage 실패 시)
      if (!savedSuccessfully) {
        if (this.safeSetItem('preferredLanguage', language, 'sessionStorage')) {
          console.log('✅ [setLanguage] sessionStorage에 저장 완료 (localStorage 대체)');
          savedSuccessfully = true;
        }
      }
      
      // 3순위: 메모리 (모든 저장소 실패 시)
      if (!savedSuccessfully) {
        this.memoryLanguage = language;
        console.log('✅ [setLanguage] 메모리에 저장 완료 (모든 저장소 실패):', this.memoryLanguage);
        savedSuccessfully = true;
      }
      
      if (!savedSuccessfully) {
        console.error('❌ [setLanguage] 모든 저장 방법 실패!');
      }
      
      // HTML lang 속성 업데이트
      document.documentElement.lang = language;
      console.log('🏷️ [setLanguage] HTML lang 속성 업데이트:', document.documentElement.lang);
      
      // 언어 변경 이벤트 발생
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }));
      
      console.log('✅ [setLanguage] 언어 변경 완료:', language);
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

// 디버깅을 위해 window 객체에 노출
if (typeof window !== 'undefined') {
  window.i18nAdvanced = i18nAdvanced;
  console.log('🌍 i18nAdvanced가 window 객체에 노출되었습니다. 콘솔에서 window.i18nAdvanced로 접근 가능합니다.');
}

export default i18nAdvanced;
