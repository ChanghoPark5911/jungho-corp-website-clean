import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../components/ImageUploader';
import FirebaseStorageTest from '../../components/FirebaseStorageTest';

/**
 * V2 관리자 페이지
 * V2 홈페이지 콘텐츠, 미디어, 사용자 관리
 */
const AdminPageV2 = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveStatus, setSaveStatus] = useState('');
  
  // i18n 데이터
  const [i18nData, setI18nData] = useState(null);
  
  // V2 홈페이지 데이터 (Hybrid 홈페이지용)
  const [v2HomeData, setV2HomeData] = useState({
    hero: {
      mainTitle: '혁신적인 기술로 더 나은 미래를 만듭니다',
      description: '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다',
      irgsValues: [
        {
          id: 'innovation',
          title: 'Innovation',
          subtitle: '혁신',
          description: '새로운 생각과 기술로\n더 나은 "경험"을 만듭니다',
          icon: '💡',
        },
        {
          id: 'reliability',
          title: 'Reliability',
          subtitle: '신뢰',
          description: '품질과 약속을 지키는 것,\n"관계의 가치"를 높입니다',
          icon: '🤝',
        },
        {
          id: 'global',
          title: 'Global',
          subtitle: '글로벌',
          description: '국제 기준을 선도하는\n기술력과 서비스로 글로벌 "경쟁력"',
          icon: '🌏',
        },
        {
          id: 'sustainability',
          title: 'Sustainability',
          subtitle: '지속가능성',
          description: '인간과 자연이 함께 공존하는\n지속가능한 "내일"을 설계합니다',
          icon: '🌱',
        },
      ]
    },
    gateway: {
      title: '정호그룹 GATEWAY',
      subtitle: '정호그룹의 다양한 소식을 전합니다',
      cards: [
        {
          id: 'about',
          icon: '👋',
          title: '그룹 소개',
          description: '정호그룹의 비전과\n역사를 확인하세요',
          path: '/v2/about'
        },
        {
          id: 'subsidiaries',
          icon: '🏢',
          title: '계열사',
          description: '4개 전문 계열사가\n함께합니다',
          path: '/v2/subsidiaries'
        },
        {
          id: 'media',
          icon: '🎬',
          title: '미디어/PR',
          description: '생생한 소식과\n영상을 만나보세요',
          path: '/v2/media/promotion'
        },
        {
          id: 'contact',
          icon: '📞',
          title: '문의',
          description: '궁금한 점을\n문의해주세요',
          path: '/v2/support'
        }
      ]
    }
  });

  // 미디어 데이터
  const [mediaData, setMediaData] = useState({
    promotionVideos: [],
    technicalDocuments: [], // PDF 기술자료
    snsLinks: {
      youtube: 'https://www.youtube.com/@JunghoGroup',
      instagram: 'https://www.instagram.com/jungho_group/',
      naverBlog: 'https://blog.naver.com/jungho_group',
      facebook: 'https://www.facebook.com/JunghoGroup'
    }
  });

  // 정적 페이지 데이터
  const [pagesData, setPagesData] = useState({
    aboutIntro: {
      paragraph1: '저희 정호그룹은\n1982년 창립하여 유럽의 섬유기계 장비를 수입, 판매를 시작으로 1986년 조명제어 시스템 사업에 진출하여 국내 최초로 One-Shot System, Full 2-Way System을 국내 시장에 도입하였습니다.',
      paragraph2: '또한 국내 최고의 연구 인력 확보와 지속적인 투자를 통해 신제품 개발 및 독자적인 Software 체계를 구축하는 등 국내 조명제어 산업을 선도해 왔습니다. 2003년 조명 제어의 미국 수출을 시작으로 캐나다, 중국, 대만, 동남아시아 시장 등 글로벌 매출을 확대해 왔으며, 5년간의 개발기간을 거쳐 완성된 독립적인 컨트롤러부터 LCD Touch Screen까지 Full Line Up을 구축하여 글로벌 경쟁력을 확보하였습니다.',
      paragraph3: '저희 정호그룹은 각 산업분야에서 우수한 인재를 통하여 앞선 기술개발과 경쟁력을 바탕으로 사업영역을 확대하고 획기적인 성장과 발전을 이룩해 왔으며, 4차 산업의 핵심인 IoT와 융합된 제품으로 조명제어, 전력제어 산업의 Total Solution Leader로서의 역할을 다 해 나갈 것입니다.',
      paragraph4: '저희 정호는 베풀어 주신 고객 여러분의 신뢰를 바탕으로 환경을 생각하고, 에너지의 가치를 존중하는 기업으로서 변화와 혁신을 추구하여 최고의 품질과 최고의 서비스로 언제나 고객 여러분과 함께할 것을 약속드립니다.'
    },
    subsidiaries: [
      {
        id: 'tlc',
        name: '정호티엘씨',
        role: '빌딩관리 종합정보 및 조명·전력제어 솔루션',
        description: '스마트 빌딩 자동화 시스템 전문 기업',
        icon: '⚡'
      },
      {
        id: 'clarus',
        name: '클라루스',
        role: '스마트 조명·전력관리 솔루션 개발',
        description: '첨단 조명 제어 기술 선도 기업',
        icon: '💡'
      },
      {
        id: 'illutech',
        name: '일루텍',
        role: '산업용 LED 조명 개발 및 제조',
        description: '고효율 LED 조명 전문 제조사',
        icon: '🔆'
      },
      {
        id: 'texcom',
        name: '정호텍스컴',
        role: '섬유기계 및 패션 사업',
        description: '40년 전통의 섬유기계 전문 기업',
        icon: '🧵'
      }
    ]
  });

  // 사용자 데이터
  const [usersData, setUsersData] = useState([
    {
      id: 'user001',
      username: 'admin123',
      name: '관리자',
      email: 'admin@jungho.com',
      role: 'super_admin',
      createdAt: '2024-01-01',
      lastLogin: '2024-11-10 10:30'
    }
  ]);

  // 세션에서 인증 상태 확인
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_v2_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  // 데이터 로드
  const loadData = () => {
    // LocalStorage에서 V2 데이터 로드
    const savedV2Home = localStorage.getItem('v2_homepage_data');
    if (savedV2Home) {
      try {
        setV2HomeData(JSON.parse(savedV2Home));
      } catch (error) {
        console.error('V2 홈 데이터 로드 실패:', error);
      }
    }

    const savedMedia = localStorage.getItem('v2_media_data');
    if (savedMedia) {
      try {
        const parsedMedia = JSON.parse(savedMedia);
        // promotionVideos가 없으면 빈 배열로 초기화
        if (!parsedMedia.promotionVideos) {
          parsedMedia.promotionVideos = [];
        }
        // technicalDocuments가 없으면 빈 배열로 초기화
        if (!parsedMedia.technicalDocuments) {
          parsedMedia.technicalDocuments = [];
        }
        setMediaData(parsedMedia);
      } catch (error) {
        console.error('미디어 데이터 로드 실패:', error);
      }
    } else {
      // 최초 실행 시 기본값 저장
      const defaultMediaData = {
        ...mediaData,
        promotionVideos: [],
        technicalDocuments: []
      };
      localStorage.setItem('v2_media_data', JSON.stringify(defaultMediaData));
    }

    const savedPages = localStorage.getItem('v2_pages_data');
    if (savedPages) {
      try {
        setPagesData(JSON.parse(savedPages));
      } catch (error) {
        console.error('페이지 데이터 로드 실패:', error);
      }
    }

    const savedUsers = localStorage.getItem('v2_users_data');
    if (savedUsers) {
      try {
        setUsersData(JSON.parse(savedUsers));
      } catch (error) {
        console.error('사용자 데이터 로드 실패:', error);
      }
    }

    const savedI18n = localStorage.getItem('i18nTranslations');
    if (savedI18n) {
      try {
        setI18nData(JSON.parse(savedI18n));
      } catch (error) {
        console.error('i18n 데이터 로드 실패:', error);
      }
    }
  };

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_v2_authenticated', 'true');
      setAuthError('');
      loadData();
    } else {
      setAuthError('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  // 로그아웃
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_v2_authenticated');
    setPassword('');
  };

  // V2 홈 데이터 저장
  const saveV2HomeData = () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('v2_homepage_data', JSON.stringify(v2HomeData));
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      console.error('저장 실패:', error);
      setSaveStatus('error');
    }
  };

  // 미디어 데이터 저장 (localStorage)
  const saveMediaData = () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('v2_media_data', JSON.stringify(mediaData));
      
      // 미디어 페이지에 실시간 반영을 위한 이벤트 발생
      window.dispatchEvent(new Event('v2MediaDataUpdated'));
      
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      console.error('저장 실패:', error);
      setSaveStatus('error');
    }
  };

  // JSON 파일로 내보내기 (배포용) - 홍보영상 + SNS + 기술문서 통합
  const exportToJSON = () => {
    try {
      const exportData = {
        projects: [], // 프로젝트 데이터 (별도 관리)
        promotionVideos: (mediaData.promotionVideos || []).map(video => ({
          id: video.id,
          title: video.title,
          category: video.category,
          description: video.description,
          thumbnail: video.thumbnail,
          thumbnailUrl: video.thumbnailUrl || video.thumbnail,
          videoUrl: video.videoUrl,
          youtubeUrl: video.youtubeUrl,
          videoType: video.videoType || 'youtube',
          duration: video.duration,
          date: video.date,
          views: video.views,
          order: video.order || 0
        })),
        snsLinks: mediaData.snsLinks || {
          youtube: '',
          instagram: '',
          naverBlog: '',
          facebook: ''
        },
        technicalDocuments: mediaData.technicalDocuments || [],
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'admin-media.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('✅ JSON 파일 다운로드 완료!\n\n📁 다운로드한 파일을:\n1. public/data/admin-media.json 위치에 복사\n2. Git 커밋 & 푸시\n3. Vercel 자동 배포 대기\n\n✨ 그러면 홍보영상이 영구적으로 저장됩니다!');
    } catch (error) {
      console.error('JSON 내보내기 실패:', error);
      alert('❌ JSON 내보내기 실패: ' + error.message);
    }
  };

  // 클립보드에 JSON 복사 (가장 쉬운 방법!) - 홍보영상 + SNS + 기술문서 통합
  const copyToClipboard = async () => {
    try {
      const exportData = {
        projects: [], // 프로젝트 데이터 (별도 관리)
        promotionVideos: (mediaData.promotionVideos || []).map(video => ({
          id: video.id,
          title: video.title,
          category: video.category,
          description: video.description,
          thumbnail: video.thumbnail,
          thumbnailUrl: video.thumbnailUrl || video.thumbnail,
          videoUrl: video.videoUrl,
          youtubeUrl: video.youtubeUrl,
          videoType: video.videoType || 'youtube',
          duration: video.duration,
          date: video.date,
          views: video.views,
          order: video.order || 0
        })),
        snsLinks: mediaData.snsLinks || {
          youtube: '',
          instagram: '',
          naverBlog: '',
          facebook: ''
        },
        technicalDocuments: mediaData.technicalDocuments || [],
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      await navigator.clipboard.writeText(jsonString);
      
      alert('✅ JSON이 클립보드에 복사되었습니다!\n\n📁 붙여넣기할 위치:\n• public/data/admin-media.json\n\n✨ 복사 후 Git 커밋 & 푸시하면 홍보영상이 영구 저장됩니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('❌ 클립보드 복사 실패: ' + error.message + '\n\n브라우저가 클립보드 접근을 차단했을 수 있습니다.');
    }
  };

  // 페이지 데이터 저장
  const savePagesData = () => {
    setSaveStatus('saving');
    try {
      // localStorage에 저장
      localStorage.setItem('v2_pages_data', JSON.stringify(pagesData));
      
      // 저장된 데이터를 다시 읽어서 확인
      const savedData = localStorage.getItem('v2_pages_data');
      const parsedData = JSON.parse(savedData);
      
      // 저장 확인
      if (parsedData && parsedData.aboutIntro && parsedData.subsidiaries) {
        console.log('✅ 페이지 데이터 저장 성공:', parsedData);
        
        // 이벤트 발생하여 AboutIntroPage 실시간 업데이트
        window.dispatchEvent(new Event('v2PagesDataUpdated'));
        
        setSaveStatus('success');
        
        // 사용자에게 저장 완료 알림
        alert(`✅ 저장되었습니다!\n\n저장된 내용:\n• 정호그룹 소개: ${Object.keys(parsedData.aboutIntro).length}개 문단\n• 계열사 정보: ${parsedData.subsidiaries.length}개\n\n정호그룹 소개 페이지를 새로고침하여 변경사항을 확인하세요.`);
        
        setTimeout(() => {
          setSaveStatus('');
        }, 3000);
      } else {
        throw new Error('저장된 데이터 검증 실패');
      }
    } catch (error) {
      console.error('저장 실패:', error);
      setSaveStatus('error');
      alert(`❌ 저장에 실패했습니다.\n\n오류: ${error.message}\n\n브라우저 설정에서 localStorage가 비활성화되어 있는지 확인하세요.`);
    }
  };

  // 사용자 데이터 저장
  const saveUsersData = () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('v2_users_data', JSON.stringify(usersData));
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      console.error('저장 실패:', error);
      setSaveStatus('error');
    }
  };

  // i18n 데이터 저장
  const saveI18nData = () => {
    setSaveStatus('saving');
    try {
      localStorage.setItem('i18nTranslations', JSON.stringify(i18nData));
      
      // i18n 시스템에 데이터 업데이트 알림
      window.dispatchEvent(new CustomEvent('i18nDataUpdated'));
      
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      console.error('저장 실패:', error);
      setSaveStatus('error');
    }
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src="/images/logos/jungho-logo.png" 
                alt="정호그룹 로고" 
                className="h-16 w-auto mx-auto object-contain"
                onError={(e) => {
                  // 이미지 로드 실패 시 대체 아이콘 표시
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'inline-flex';
                }}
              />
              <div className="hidden items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">홈화면 관리자 로그인</h2>
            <p className="text-gray-600 dark:text-gray-400">정호그룹 홈화면 문구 관리 페이지</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                placeholder="비밀번호를 입력하세요"
                autoFocus
              />
              {authError && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              로그인
            </button>
          </form>

          {/* 비밀번호 힌트 제거됨 */}
        </motion.div>
      </div>
    );
  }

  // 관리자 대시보드
  const tabs = [
    { id: 'dashboard', label: '대시보드', icon: '📊' },
    { id: 'v2home', label: '메인 홈페이지', icon: '🏠' },
    { id: 'pages', label: '정적 페이지', icon: '📄' },
    // 미디어 관리는 /admin-new/media 로 이동됨
    { id: 'i18n', label: '다국어 관리', icon: '🌐' },
    { id: 'users', label: '사용자 관리', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 헤더 */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity group"
                title="홈페이지로 이동"
              >
                <img 
                  src="/images/logos/jungho-logo.png" 
                  alt="정호그룹 로고" 
                  className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    // 이미지 로드 실패 시 대체 로고 표시
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg items-center justify-center hidden">
                  <span className="text-xl font-bold text-white">JH</span>
                </div>
                <div className="text-left">
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                    V2 관리자
                    <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">정호그룹 V2 (클릭하여 홈으로)</p>
                </div>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>홈페이지 미리보기</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 탭 네비게이션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 저장 상태 알림 */}
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              saveStatus === 'success' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700' :
              saveStatus === 'error' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700' :
              'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
            }`}
          >
            {saveStatus === 'success' && '✅ 저장되었습니다!'}
            {saveStatus === 'error' && '❌ 저장에 실패했습니다.'}
            {saveStatus === 'saving' && '💾 저장 중...'}
          </motion.div>
        )}

        {/* 컨텐츠 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'v2home' && <V2HomeTab data={v2HomeData} setData={setV2HomeData} onSave={saveV2HomeData} />}
          {activeTab === 'pages' && <PagesTab data={pagesData} setData={setPagesData} onSave={savePagesData} />}
          {/* 미디어 관리는 /admin-new/media 로 이동됨 */}
          {activeTab === 'i18n' && i18nData && <I18nTab data={i18nData} setData={setI18nData} onSave={saveI18nData} />}
          {activeTab === 'users' && <UsersTab data={usersData} setData={setUsersData} onSave={saveUsersData} />}
        </div>
      </div>
    </div>
  );
};

// 대시보드 탭
const DashboardTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">대시보드</h2>
      
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '페이지뷰', value: '12,345', icon: '👁️', color: 'blue' },
          { label: '방문자', value: '1,234', icon: '👥', color: 'green' },
          { label: '콘텐츠', value: '56', icon: '📄', color: 'purple' },
          { label: '미디어', value: '23', icon: '🎬', color: 'orange' },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* 버전 관리 섹션 - 최종 버전 결정 시까지 임시 숨김 */}
      {/* 
      <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
        <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
          🎨 버전 관리
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-500 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-blue-600 dark:text-blue-400">V2 버전</h4>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">최신</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">모던한 MegaMenu와 풍부한 UI</p>
            <button
              onClick={() => window.open('/v2', '_blank')}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🚀 V2 보기
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-green-500 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-green-600 dark:text-green-400">Hybrid 버전</h4>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">권장</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">V2 메뉴 + 최적화된 콘텐츠</p>
            <button
              onClick={() => window.open('/hybrid', '_blank')}
              className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              ✨ Hybrid 보기
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-400 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-600 dark:text-gray-400">Classic 버전</h4>
              <span className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">전통</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">전통적인 사이드바 레이아웃</p>
            <button
              onClick={() => window.open('/classic/about', '_blank')}
              className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              📋 Classic 보기
            </button>
          </div>
        </div>
      </div>
      */}
      
      {/* 빠른 시작 가이드 */}
      <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">💡 빠른 시작</h3>
        <ul className="space-y-2 text-blue-800 dark:text-blue-200">
          <li>• <strong>메인 홈페이지</strong>: Hero와 Gateway 섹션을 관리하세요</li>
          <li>• <strong>정적 페이지</strong>: ABOUT 페이지 콘텐츠를 수정하세요</li>
          <li>• <strong>다국어 관리</strong>: 한국어/영어 번역을 관리하세요</li>
        </ul>
      </div>

      {/* 미디어 관리 바로가기 */}
      <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-1">🎬 미디어/PR 관리</h3>
            <p className="text-sm text-green-800 dark:text-green-200">프로젝트 영상, 홍보영상, SNS 링크를 관리하세요</p>
          </div>
          <button
            onClick={() => window.location.href = '/admin-new/login'}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
          >
            📁 미디어 관리 →
          </button>
        </div>
      </div>
    </div>
  );
};

// V2 홈페이지 탭
const V2HomeTab = ({ data, setData, onSave }) => {
  const [expandedSection, setExpandedSection] = useState('hero');

  // JSON 파일로 내보내기 (영구 저장용)
  const exportToJSON = () => {
    try {
      const exportData = {
        hero: {
          mainTitle: data.hero.mainTitle,
          description: data.hero.description,
          irgsValues: data.hero.irgsValues
        },
        gateway: data.gateway,
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'homepage-content.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('✅ JSON 파일 다운로드 완료!\n\n📁 다운로드한 파일을:\n1. public/data/homepage-content.json 위치에 복사\n2. Git 커밋 & 푸시\n3. Vercel 자동 배포 대기\n\n✨ 그러면 홈화면 문구가 영구적으로 저장됩니다!');
    } catch (error) {
      console.error('JSON 내보내기 실패:', error);
      alert('❌ JSON 내보내기 실패: ' + error.message);
    }
  };

  // 클립보드에 JSON 복사
  const copyToClipboard = async () => {
    try {
      const exportData = {
        hero: {
          mainTitle: data.hero.mainTitle,
          description: data.hero.description,
          irgsValues: data.hero.irgsValues
        },
        gateway: data.gateway,
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      await navigator.clipboard.writeText(jsonString);
      
      alert('✅ 클립보드에 복사되었습니다!\n\n📁 다음 단계:\n1. VS Code에서 public/data/homepage-content.json 파일 열기 (없으면 생성)\n2. Ctrl+A (전체 선택)\n3. Ctrl+V (붙여넣기)\n4. Ctrl+S (저장)\n5. Git 커밋 & 푸시\n\n✨ 그러면 홈화면 문구가 영구적으로 저장됩니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('❌ 클립보드 복사 실패: ' + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">메인 홈페이지 관리</h2>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            💾 임시 저장
          </button>
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
          >
            📋 클립보드에 복사
          </button>
          <button
            onClick={exportToJSON}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
          >
            📥 JSON 다운로드
          </button>
        </div>
      </div>

      {/* 저장 방식 안내 */}
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-300 mb-2">💡 저장 방식 안내</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>• <strong>임시 저장</strong>: 브라우저 localStorage에 저장 (본인 브라우저에서만 유효)</li>
          <li>• <strong>영구 저장</strong>: "JSON 다운로드" 또는 "클립보드에 복사" → <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">public/data/homepage-content.json</code>에 저장 → Git 커밋 & 배포</li>
        </ul>
      </div>

      {/* Hero 섹션 */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'hero' ? null : 'hero')}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">🎨 Hero 섹션</h3>
          <svg className={`w-5 h-5 transition-transform ${expandedSection === 'hero' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSection === 'hero' && (
          <div className="p-6 space-y-6">
            {/* 현재 홈화면 문구 안내 */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">📌 현재 홈화면 문구</h4>
              <p className="text-xs text-blue-700 dark:text-blue-400 mb-1">
                <strong>메인 타이틀:</strong> {data.hero.mainTitle || '혁신적인 기술로 더 나은 미래를 만듭니다'}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                <strong>설명문:</strong> {data.hero.description || '정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다'}
              </p>
            </div>

            {/* 메인 타이틀 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                메인 타이틀
              </label>
              <textarea
                value={data.hero.mainTitle}
                onChange={(e) => setData({...data, hero: {...data.hero, mainTitle: e.target.value}})}
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="혁신적인 기술로 더 나은 미래를 만듭니다"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">홈화면 Hero 섹션의 큰 제목입니다</p>
            </div>

            {/* 설명문 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                설명문
              </label>
              <textarea
                value={data.hero.description}
                onChange={(e) => setData({...data, hero: {...data.hero, description: e.target.value}})}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="정호그룹은 AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 글로벌 기업입니다"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">메인 타이틀 아래에 표시되는 설명 문구입니다</p>
            </div>

            {/* IRGS 핵심가치 */}
            <div>
              <h4 className="text-md font-bold text-gray-900 dark:text-white mb-4">IRGS 핵심가치 (4개)</h4>
              <div className="space-y-4">
                {data.hero.irgsValues.map((value, index) => (
                  <div key={value.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">{value.icon}</span>
                      <h5 className="font-bold text-gray-900 dark:text-white">{value.title}</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">부제</label>
                        <input
                          type="text"
                          value={value.subtitle}
                          onChange={(e) => {
                            const newValues = [...data.hero.irgsValues];
                            newValues[index].subtitle = e.target.value;
                            setData({...data, hero: {...data.hero, irgsValues: newValues}});
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">설명</label>
                        <textarea
                          value={value.description}
                          onChange={(e) => {
                            const newValues = [...data.hero.irgsValues];
                            newValues[index].description = e.target.value;
                            setData({...data, hero: {...data.hero, irgsValues: newValues}});
                          }}
                          rows="2"
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gateway 섹션 */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedSection(expandedSection === 'gateway' ? null : 'gateway')}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">🚪 Gateway 섹션</h3>
          <svg className={`w-5 h-5 transition-transform ${expandedSection === 'gateway' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSection === 'gateway' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">제목</label>
                <input
                  type="text"
                  value={data.gateway.title}
                  onChange={(e) => setData({...data, gateway: {...data.gateway, title: e.target.value}})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">부제목</label>
                <input
                  type="text"
                  value={data.gateway.subtitle}
                  onChange={(e) => setData({...data, gateway: {...data.gateway, subtitle: e.target.value}})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Gateway 카드 */}
            <div>
              <h4 className="text-md font-bold text-gray-900 dark:text-white mb-4">Gateway 카드 (4개)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.gateway.cards.map((card, index) => (
                  <div key={card.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{card.icon}</span>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => {
                          const newCards = [...data.gateway.cards];
                          newCards[index].title = e.target.value;
                          setData({...data, gateway: {...data.gateway, cards: newCards}});
                        }}
                        className="flex-1 px-3 py-2 text-sm font-bold border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <textarea
                      value={card.description}
                      onChange={(e) => {
                        const newCards = [...data.gateway.cards];
                        newCards[index].description = e.target.value;
                        setData({...data, gateway: {...data.gateway, cards: newCards}});
                      }}
                      rows="2"
                      className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      placeholder="설명"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 미디어 관리 탭
const MediaTab = ({ data, setData, onSave, exportToJSON, copyToClipboard }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">미디어 관리</h2>
      <div className="flex gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
        >
          💾 임시 저장 (localStorage)
        </button>
        <button
          onClick={copyToClipboard}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
        >
          📋 클립보드에 복사 (추천!)
        </button>
        <button
          onClick={exportToJSON}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
        >
          📥 JSON 파일 다운로드
        </button>
      </div>
    </div>

    {/* SNS 링크 */}
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔗 SNS 링크</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data.snsLinks).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
              {key === 'naverBlog' ? '네이버 블로그' : key}
            </label>
            <input
              type="url"
              value={value}
              onChange={(e) => setData({...data, snsLinks: {...data.snsLinks, [key]: e.target.value}})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder={`https://...`}
            />
          </div>
        ))}
      </div>
    </div>

    {/* 홍보영상 관리 */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">🎬 홍보영상 관리</h3>
        <button
          onClick={() => {
            const newVideo = {
              id: Date.now(),
              title: '새 홍보영상',
              category: 'company',
              description: '영상 설명을 입력하세요',
              thumbnail: '🎬',
              videoType: 'youtube', // 'youtube' | 'mp4'
              videoUrl: '',
              youtubeUrl: '',
              mp4Url: '',
              mp4File: null,
              duration: '0:00',
              date: new Date().toISOString().split('T')[0],
              views: '0'
            };
            setData({
              ...data,
              promotionVideos: [...(data.promotionVideos || []), newVideo]
            });
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          ➕ 새 영상 추가
        </button>
      </div>

      <div className="space-y-4">
        {(data.promotionVideos || []).length === 0 ? (
          <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              등록된 홍보영상이 없습니다
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              위의 "새 영상 추가" 버튼을 클릭하여 홍보영상을 추가하세요
            </p>
          </div>
        ) : (
          (data.promotionVideos || []).map((video, index) => (
            <div key={video.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{video.thumbnail}</span>
                  <div>
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) => {
                        const updated = [...data.promotionVideos];
                        updated[index] = { ...updated[index], title: e.target.value };
                        setData({ ...data, promotionVideos: updated });
                      }}
                      className="text-lg font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-primary-500 outline-none"
                      placeholder="영상 제목"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('이 영상을 삭제하시겠습니까?')) {
                      setData({
                        ...data,
                        promotionVideos: data.promotionVideos.filter((_, i) => i !== index)
                      });
                    }
                  }}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  🗑️ 삭제
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 영상 소스 타입 선택 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    영상 소스 타입
                  </label>
                  <select
                    value={video.videoType || 'youtube'}
                    onChange={(e) => {
                      const updated = [...data.promotionVideos];
                      updated[index] = { ...updated[index], videoType: e.target.value };
                      setData({ ...data, promotionVideos: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    <option value="youtube">📺 YouTube</option>
                    <option value="mp4">🎬 MP4 파일</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    카테고리
                  </label>
                  <select
                    value={video.category}
                    onChange={(e) => {
                      const updated = [...data.promotionVideos];
                      updated[index] = { ...updated[index], category: e.target.value };
                      setData({ ...data, promotionVideos: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    <option value="company">기업 소개</option>
                    <option value="subsidiaries">계열사</option>
                    <option value="technology">기술 소개</option>
                    <option value="awards">수상 및 인증</option>
                    <option value="events">이벤트</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    썸네일 이모지
                  </label>
                  <input
                    type="text"
                    value={video.thumbnail}
                    onChange={(e) => {
                      const updated = [...data.promotionVideos];
                      updated[index] = { ...updated[index], thumbnail: e.target.value };
                      setData({ ...data, promotionVideos: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="🎬"
                  />
                </div>

                {/* YouTube 타입일 때 */}
                {(!video.videoType || video.videoType === 'youtube') && (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        YouTube URL (임베드용)
                      </label>
                      <input
                        type="text"
                        value={video.videoUrl}
                        onChange={(e) => {
                          const updated = [...data.promotionVideos];
                          updated[index] = { ...updated[index], videoUrl: e.target.value };
                          setData({ ...data, promotionVideos: updated });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        placeholder="https://www.youtube.com/embed/VIDEO_ID"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        💡 YouTube 영상에서 "공유" → "퍼가기" → URL 복사
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        YouTube URL (공유용)
                      </label>
                      <input
                        type="text"
                        value={video.youtubeUrl || ''}
                        onChange={(e) => {
                          const updated = [...data.promotionVideos];
                          updated[index] = { ...updated[index], youtubeUrl: e.target.value };
                          setData({ ...data, promotionVideos: updated });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        placeholder="https://youtu.be/VIDEO_ID"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        💡 YouTube 영상에서 "공유" → 짧은 URL 복사
                      </p>
                    </div>
                  </>
                )}

                {/* MP4 타입일 때 */}
                {video.videoType === 'mp4' && (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        MP4 파일 URL (권장)
                      </label>
                      <input
                        type="text"
                        value={video.mp4Url || ''}
                        onChange={(e) => {
                          const updated = [...data.promotionVideos];
                          updated[index] = { 
                            ...updated[index], 
                            mp4Url: e.target.value,
                            videoUrl: e.target.value // 재생용
                          };
                          setData({ ...data, promotionVideos: updated });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                        placeholder="https://your-cloud-storage.com/video.mp4"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        💡 Google Drive, Dropbox, AWS S3 등에 업로드한 MP4 파일의 직접 링크를 입력하세요
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        또는 파일 직접 업로드 (작은 파일만, 최대 5MB)
                      </label>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // 파일 크기 체크 (5MB = 5 * 1024 * 1024 bytes)
                            if (file.size > 5 * 1024 * 1024) {
                              alert('파일 크기가 너무 큽니다. 5MB 이하의 파일만 업로드할 수 있습니다.\n\n큰 파일은 클라우드 스토리지에 업로드 후 URL을 입력하세요.');
                              e.target.value = '';
                              return;
                            }

                            // FileReader로 파일을 base64로 변환
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const updated = [...data.promotionVideos];
                              updated[index] = { 
                                ...updated[index], 
                                mp4File: file.name,
                                mp4Url: event.target.result,
                                videoUrl: event.target.result
                              };
                              setData({ ...data, promotionVideos: updated });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                      <div className="flex items-start space-x-2 mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                        <div className="text-xs text-yellow-700 dark:text-yellow-300">
                          <p className="font-semibold mb-1">주의사항:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>직접 업로드는 5MB 이하의 작은 파일만 가능합니다</li>
                            <li>큰 파일은 YouTube나 클라우드 스토리지 사용을 권장합니다</li>
                            <li>브라우저 캐시를 지우면 업로드한 파일이 삭제될 수 있습니다</li>
                          </ul>
                        </div>
                      </div>
                      {video.mp4File && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                          ✅ 업로드된 파일: {video.mp4File}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    영상 설명
                  </label>
                  <textarea
                    value={video.description}
                    onChange={(e) => {
                      const updated = [...data.promotionVideos];
                      updated[index] = { ...updated[index], description: e.target.value };
                      setData({ ...data, promotionVideos: updated });
                    }}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="영상 설명을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    영상 길이
                  </label>
                  <input
                    type="text"
                    value={video.duration}
                    onChange={(e) => {
                      const updated = [...data.promotionVideos];
                      updated[index] = { ...updated[index], duration: e.target.value };
                      setData({ ...data, promotionVideos: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="5:20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    업로드 날짜
                  </label>
                  <input
                    type="date"
                    value={video.date}
                    onChange={(e) => {
                      const updated = [...data.promotionVideos];
                      updated[index] = { ...updated[index], date: e.target.value };
                      setData({ ...data, promotionVideos: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* 미리보기 */}
              {video.videoUrl && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    미리보기
                  </label>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    {(!video.videoType || video.videoType === 'youtube') ? (
                      <iframe
                        src={video.videoUrl}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-full"
                        src={video.videoUrl}
                      >
                        <source src={video.videoUrl} type="video/mp4" />
                        브라우저가 비디오 재생을 지원하지 않습니다.
                      </video>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>

    {/* PDF 기술자료 관리 */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">📄 PDF 기술자료 관리</h3>
        <button
          onClick={() => {
            const newDoc = {
              id: Date.now(),
              title: '새 기술자료',
              category: 'technical',
              description: '자료 설명을 입력하세요',
              thumbnail: '📄',
              fileUrl: '',
              fileName: '',
              fileSize: '',
              subsidiary: 'clarus',
              date: new Date().toISOString().split('T')[0],
              downloads: 0,
              language: 'ko',
              tags: []
            };
            setData({
              ...data,
              technicalDocuments: [...(data.technicalDocuments || []), newDoc]
            });
          }}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
        >
          ➕ 새 자료 추가
        </button>
      </div>

      <div className="space-y-4">
        {(data.technicalDocuments || []).length === 0 ? (
          <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              등록된 PDF 기술자료가 없습니다
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              위의 "새 자료 추가" 버튼을 클릭하여 PDF 자료를 추가하세요
            </p>
          </div>
        ) : (
          (data.technicalDocuments || []).map((doc, index) => (
            <div key={doc.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{doc.thumbnail}</span>
                  <div>
                    <input
                      type="text"
                      value={doc.title}
                      onChange={(e) => {
                        const updated = [...data.technicalDocuments];
                        updated[index] = { ...updated[index], title: e.target.value };
                        setData({ ...data, technicalDocuments: updated });
                      }}
                      className="text-lg font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-primary-500 outline-none"
                      placeholder="자료 제목"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('이 자료를 삭제하시겠습니까?')) {
                      setData({
                        ...data,
                        technicalDocuments: data.technicalDocuments.filter((_, i) => i !== index)
                      });
                    }
                  }}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  🗑️ 삭제
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 카테고리 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    카테고리
                  </label>
                  <select
                    value={doc.category}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], category: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    <option value="technical">기술서</option>
                    <option value="product">제품 카탈로그</option>
                    <option value="case-study">시공 사례</option>
                    <option value="manual">매뉴얼</option>
                    <option value="solution">솔루션 가이드</option>
                  </select>
                </div>

                {/* 계열사 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    관련 계열사
                  </label>
                  <select
                    value={doc.subsidiary}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], subsidiary: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    <option value="group">정호그룹</option>
                    <option value="clarus">클라루스</option>
                    <option value="tlc">정호티엘씨</option>
                    <option value="illutech">일루텍</option>
                    <option value="texcom">정호텍스컴</option>
                  </select>
                </div>

                {/* PDF 파일 URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    PDF 파일 URL
                  </label>
                  <input
                    type="text"
                    value={doc.fileUrl || ''}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], fileUrl: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="/documents/clarus/filename.pdf"
                  />
                  {doc.fileUrl && /[\u3131-\uD79D\s()]/.test(doc.fileUrl) && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1 font-semibold">
                      ⚠️ 경고: 파일명에 한글, 공백, 괄호가 있습니다. 영문 소문자와 하이픈(-)만 사용하는 것을 권장합니다.
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    💡 권장 형식: /documents/clarus/clarus-catalog-2024.pdf
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📂 로컬 파일: public/documents 폴더에 파일 추가 후 /documents/계열사/파일명.pdf 형식으로 입력
                  </p>
                </div>

                {/* 파일 정보 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    파일명
                  </label>
                  <input
                    type="text"
                    value={doc.fileName || ''}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], fileName: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="lighting-control-technical.pdf"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    파일 크기
                  </label>
                  <input
                    type="text"
                    value={doc.fileSize || ''}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], fileSize: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="15MB"
                  />
                </div>

                {/* 설명 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    자료 설명
                  </label>
                  <textarea
                    value={doc.description}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], description: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="자료 설명을 입력하세요"
                  />
                </div>

                {/* 언어 & 날짜 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    언어
                  </label>
                  <select
                    value={doc.language}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], language: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    <option value="ko">한국어</option>
                    <option value="en">English</option>
                    <option value="both">한/영 병기</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    등록 날짜
                  </label>
                  <input
                    type="date"
                    value={doc.date}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], date: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* 썸네일 이모지 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    썸네일 이모지
                  </label>
                  <input
                    type="text"
                    value={doc.thumbnail}
                    onChange={(e) => {
                      const updated = [...data.technicalDocuments];
                      updated[index] = { ...updated[index], thumbnail: e.target.value };
                      setData({ ...data, technicalDocuments: updated });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="📄"
                  />
                </div>
              </div>

              {/* 미리보기 링크 */}
              {doc.fileUrl && (
                <div className="mt-4 flex items-center space-x-2">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors inline-flex items-center space-x-2"
                  >
                    <span>👁</span>
                    <span>파일 열기 / 다운로드</span>
                  </a>
                  <button
                    onClick={() => {
                      // 경로 검증
                      if (doc.fileUrl.startsWith('/documents/')) {
                        alert('✅ 경로가 올바릅니다!\n\n실제 파일이 있는지 확인:\n' + window.location.origin + doc.fileUrl);
                      } else {
                        alert('⚠️ 경로 확인\n\n현재: ' + doc.fileUrl + '\n권장: /documents/계열사/파일명.pdf');
                      }
                    }}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors inline-flex items-center space-x-2"
                  >
                    <span>🔍</span>
                    <span>경로 검증</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>

    {/* 영구 저장 안내 */}
    <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center">
        💡 영구 저장 방법 (홍보영상 & 기술문서)
      </h3>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <li>• <strong className="text-blue-600 dark:text-blue-400">임시 저장</strong>: localStorage에 저장 (브라우저 캐시 지우면 삭제됨)</li>
        <li>• <strong className="text-green-600 dark:text-green-400">영구 저장</strong>: "클립보드에 복사" 또는 "JSON 다운로드" → <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">public/data/admin-media.json</code>에 저장 → Git 커밋</li>
        <li>• 영구 저장 후에는 <strong>모든 사용자가 배포 버전에서도 데이터를 볼 수 있습니다!</strong></li>
      </ul>
    </div>
  </div>
);

// 정적 페이지 관리 탭
const PagesTab = ({ data, setData, onSave }) => {
  // JSON 파일로 내보내기
  const exportToJSON = () => {
    try {
      const exportData = {
        aboutIntro: data.aboutIntro,
        subsidiaries: data.subsidiaries,
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pages-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('✅ JSON 파일 다운로드 완료!\n\n다운로드한 파일을:\n1. public/data/pages-data.json 위치에 복사\n2. Git 커밋 & 푸시\n3. Vercel 자동 배포 대기\n\n그러면 영구적으로 저장됩니다!');
    } catch (error) {
      console.error('JSON 내보내기 실패:', error);
      alert('❌ JSON 내보내기 실패: ' + error.message);
    }
  };

  // 클립보드에 JSON 복사
  const copyToClipboard = async () => {
    try {
      const exportData = {
        aboutIntro: data.aboutIntro,
        subsidiaries: data.subsidiaries,
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      await navigator.clipboard.writeText(jsonString);
      
      alert('✅ 클립보드에 복사되었습니다!\n\n다음 단계:\n1. VS Code에서 public/data/pages-data.json 파일 열기\n2. Ctrl+A (전체 선택)\n3. Ctrl+V (붙여넣기)\n4. Ctrl+S (저장)\n5. Git 커밋 & 푸시\n\n그러면 영구적으로 저장됩니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('❌ 클립보드 복사 실패: ' + error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">정적 페이지 관리</h2>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            💾 임시 저장 (localStorage)
          </button>
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
          >
            📋 클립보드에 복사 (추천!)
          </button>
          <button
            onClick={exportToJSON}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
          >
            📥 JSON 파일 다운로드
          </button>
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <span className="mr-2">💡</span>
          영구 저장 방법
        </h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>• <strong>임시 저장</strong>: localStorage에 저장 (브라우저 캐시 지우면 삭제됨)</li>
          <li>• <strong>영구 저장</strong>: "클립보드에 복사" 또는 "JSON 다운로드" → public/data/pages-data.json에 저장 → Git 커밋</li>
          <li>• 영구 저장 후에는 JSON 파일의 데이터가 우선 적용됩니다</li>
        </ul>
      </div>

      {/* About 소개 섹션 */}
      <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">📖 정호그룹 소개</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">About &gt; 정호소개 페이지 내용</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              첫 번째 문단
            </label>
            <textarea
              value={data.aboutIntro.paragraph1}
              onChange={(e) => setData({
                ...data,
                aboutIntro: {...data.aboutIntro, paragraph1: e.target.value}
              })}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              두 번째 문단
            </label>
            <textarea
              value={data.aboutIntro.paragraph2}
              onChange={(e) => setData({
                ...data,
                aboutIntro: {...data.aboutIntro, paragraph2: e.target.value}
              })}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              세 번째 문단
            </label>
            <textarea
              value={data.aboutIntro.paragraph3}
              onChange={(e) => setData({
                ...data,
                aboutIntro: {...data.aboutIntro, paragraph3: e.target.value}
              })}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              네 번째 문단
            </label>
            <textarea
              value={data.aboutIntro.paragraph4 || ''}
              onChange={(e) => setData({
                ...data,
                aboutIntro: {...data.aboutIntro, paragraph4: e.target.value}
              })}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* 계열사 정보 섹션 */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">🏢 계열사 정보</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">4개 계열사의 기본 정보</p>
        </div>
        
        <div className="p-6 space-y-6">
          {data.subsidiaries.map((sub, index) => (
            <div key={sub.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{sub.icon}</span>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{sub.name}</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    역할 (한 줄 설명)
                  </label>
                  <input
                    type="text"
                    value={sub.role}
                    onChange={(e) => {
                      const newSubs = [...data.subsidiaries];
                      newSubs[index].role = e.target.value;
                      setData({...data, subsidiaries: newSubs});
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    상세 설명
                  </label>
                  <input
                    type="text"
                    value={sub.description}
                    onChange={(e) => {
                      const newSubs = [...data.subsidiaries];
                      newSubs[index].description = e.target.value;
                      setData({...data, subsidiaries: newSubs});
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 사용자 관리 탭
const UsersTab = ({ data, setData, onSave }) => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);
  const [formData, setFormData] = React.useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'editor'
  });

  const roles = [
    { value: 'super_admin', label: '최고 관리자', color: 'bg-red-100 text-red-800', icon: '👑' },
    { value: 'admin', label: '관리자', color: 'bg-blue-100 text-blue-800', icon: '⭐' },
    { value: 'editor', label: '편집자', color: 'bg-green-100 text-green-800', icon: '✏️' },
    { value: 'viewer', label: '열람자', color: 'bg-gray-100 text-gray-800', icon: '👁️' }
  ];

  // 사용자 추가
  const handleAddUser = () => {
    if (!formData.username || !formData.name || !formData.email || !formData.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const newUser = {
      id: 'user' + Date.now(),
      username: formData.username,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: '-'
    };

    setData([...data, newUser]);
    setShowAddModal(false);
    setFormData({ username: '', name: '', email: '', password: '', role: 'editor' });
  };

  // 사용자 수정
  const handleUpdateUser = () => {
    const updatedUsers = data.map(user => 
      user.id === editingUser.id 
        ? { ...user, name: formData.name, email: formData.email, role: formData.role }
        : user
    );
    setData(updatedUsers);
    setEditingUser(null);
    setFormData({ username: '', name: '', email: '', password: '', role: 'editor' });
  };

  // 사용자 삭제
  const handleDeleteUser = (userId) => {
    if (userId === 'user001') {
      alert('기본 관리자 계정은 삭제할 수 없습니다.');
      return;
    }
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      setData(data.filter(user => user.id !== userId));
    }
  };

  // 수정 모달 열기
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
  };

  const getRoleInfo = (roleValue) => {
    return roles.find(r => r.value === roleValue) || roles[2];
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">사용자 관리</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            관리자 계정을 추가하고 권한을 관리하세요
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg flex items-center space-x-2"
          >
            <span>➕</span>
            <span>사용자 추가</span>
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
          >
            💾 저장하기
          </button>
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                사용자 정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                권한
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                생성일
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                마지막 로그인
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((user) => {
              const roleInfo = getRoleInfo(user.role);
              return (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          @{user.username} • {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${roleInfo.color}`}>
                      <span>{roleInfo.icon}</span>
                      <span>{roleInfo.label}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-4 font-semibold"
                    >
                      수정
                    </button>
                    {user.id !== 'user001' && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold"
                      >
                        삭제
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 권한 설명 */}
      <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">ℹ️</span>
          권한 레벨 설명
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <div key={role.value} className="flex items-start space-x-3">
              <span className="text-2xl">{role.icon}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{role.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {role.value === 'super_admin' && '모든 권한 (사용자 관리 포함)'}
                  {role.value === 'admin' && '콘텐츠 및 설정 관리'}
                  {role.value === 'editor' && '콘텐츠 편집 가능'}
                  {role.value === 'viewer' && '열람만 가능'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 사용자 추가/수정 모달 */}
      {(showAddModal || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingUser ? '사용자 수정' : '새 사용자 추가'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  아이디
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={!!editingUser}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white disabled:opacity-50"
                  placeholder="admin_user"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="user@jungho.com"
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="비밀번호 입력"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  권한
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.icon} {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => {
                  editingUser ? handleUpdateUser() : handleAddUser();
                }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all"
              >
                {editingUser ? '수정 완료' : '추가하기'}
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  setFormData({ username: '', name: '', email: '', password: '', role: 'editor' });
                }}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 다국어 관리 탭
const I18nTab = ({ data, setData, onSave }) => {
  const [selectedLang, setSelectedLang] = React.useState('en');
  
  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷', description: '기본 언어 (원본)' },
    { code: 'en', name: 'English', flag: '🇺🇸', description: '영어 번역' }
  ];

  // JSON 파일로 내보내기 (영구 저장용)
  const exportToJSON = () => {
    try {
      const exportData = {
        ko: data.ko,
        en: data.en,
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'admin-i18n.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('✅ JSON 파일 다운로드 완료!\n\n📁 다운로드한 파일을:\n1. public/data/admin-i18n.json 위치에 복사\n2. Git 커밋 & 푸시\n3. Vercel 자동 배포 대기\n\n✨ 그러면 다국어 번역이 영구적으로 저장됩니다!');
    } catch (error) {
      console.error('JSON 내보내기 실패:', error);
      alert('❌ JSON 내보내기 실패: ' + error.message);
    }
  };

  // 클립보드에 JSON 복사
  const copyToClipboard = async () => {
    try {
      const exportData = {
        ko: data.ko,
        en: data.en,
        lastUpdated: new Date().toISOString(),
        version: "1.0.0"
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      await navigator.clipboard.writeText(jsonString);
      
      alert('✅ 클립보드에 복사되었습니다!\n\n📁 다음 단계:\n1. VS Code에서 public/data/admin-i18n.json 파일 열기\n2. Ctrl+A (전체 선택)\n3. Ctrl+V (붙여넣기)\n4. Ctrl+S (저장)\n5. Git 커밋 & 푸시\n\n✨ 그러면 다국어 번역이 영구적으로 저장됩니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('❌ 클립보드 복사 실패: ' + error.message);
    }
  };

  const translationSections = [
    {
      id: 'homepage',
      title: '메인 홈페이지',
      icon: '🏠',
      fields: [
        { key: 'home.hero.title', label: '메인 타이틀', type: 'textarea' },
        { key: 'home.hero.description', label: '설명문', type: 'textarea' },
        { key: 'home.subsidiaries.title', label: '계열사 섹션 제목', type: 'textarea' },
        { key: 'home.subsidiaries.description', label: '계열사 섹션 설명', type: 'text' },
        { key: 'header.title', label: '그룹명 (헤더)', type: 'text' },
      ]
    },
    {
      id: 'about',
      title: 'ABOUT 페이지',
      icon: '📖',
      fields: [
        { key: 'aboutIntro.paragraph1', label: '정호그룹 소개 - 첫 번째 문단', type: 'textarea' },
        { key: 'aboutIntro.paragraph2', label: '정호그룹 소개 - 두 번째 문단', type: 'textarea' },
        { key: 'aboutIntro.paragraph3', label: '정호그룹 소개 - 세 번째 문단', type: 'textarea' },
        { key: 'aboutIntro.paragraph4', label: '정호그룹 소개 - 네 번째 문단', type: 'textarea' },
        { key: 'aboutIntro.closing', label: '마무리 인사', type: 'text' },
        { key: 'aboutIntro.signature', label: '서명', type: 'text' },
      ]
    },
    {
      id: 'subsidiaries',
      title: '계열사',
      icon: '🏢',
      fields: [
        { key: 'home.subsidiaries.clarus.title', label: '클라루스 - 제목', type: 'text' },
        { key: 'home.subsidiaries.clarus.subtitle', label: '클라루스 - 부제목', type: 'text' },
        { key: 'home.subsidiaries.clarus.description', label: '클라루스 - 설명', type: 'textarea' },
        { key: 'home.subsidiaries.tlc.title', label: 'TLC - 제목', type: 'text' },
        { key: 'home.subsidiaries.tlc.subtitle', label: 'TLC - 부제목', type: 'text' },
        { key: 'home.subsidiaries.tlc.description', label: 'TLC - 설명', type: 'textarea' },
        { key: 'home.subsidiaries.illutech.title', label: '일루텍 - 제목', type: 'text' },
        { key: 'home.subsidiaries.illutech.subtitle', label: '일루텍 - 부제목', type: 'text' },
        { key: 'home.subsidiaries.illutech.description', label: '일루텍 - 설명', type: 'textarea' },
        { key: 'home.subsidiaries.texcom.title', label: '텍스컴 - 제목', type: 'text' },
        { key: 'home.subsidiaries.texcom.subtitle', label: '텍스컴 - 부제목', type: 'text' },
        { key: 'home.subsidiaries.texcom.description', label: '텍스컴 - 설명', type: 'textarea' },
      ]
    },
    {
      id: 'gateway',
      title: 'Gateway 카드',
      icon: '🚪',
      fields: [
        { key: 'home.group.title', label: 'Gateway - 그룹 소개 제목', type: 'text' },
        { key: 'home.group.description', label: 'Gateway - 그룹 소개 설명', type: 'textarea' },
        { key: 'footer.subsidiaries', label: 'Gateway - 계열사 제목', type: 'text' },
        { key: 'common.news', label: 'Gateway - 미디어/PR 제목', type: 'text' },
        { key: 'home.latestNews.description', label: 'Gateway - 미디어/PR 설명', type: 'text' },
        { key: 'support.contactForm.description', label: 'Gateway - 문의하기 설명', type: 'textarea' },
      ]
    },
    {
      id: 'common',
      title: '공통 UI',
      icon: '🔤',
      fields: [
        { key: 'common.learnMore', label: '자세히 보기', type: 'text' },
        { key: 'common.contact', label: '문의하기', type: 'text' },
        { key: 'common.readMore', label: '더 보기', type: 'text' },
        { key: 'buttons.contact', label: '버튼: 문의하기', type: 'text' },
        { key: 'buttons.download', label: '버튼: 다운로드', type: 'text' },
      ]
    },
    {
      id: 'navigation',
      title: '네비게이션 메뉴',
      icon: '🧭',
      fields: [
        { key: 'nav.about.intro', label: 'ABOUT - 정호소개', type: 'text' },
        { key: 'nav.about.vision', label: 'ABOUT - 그룹비전', type: 'text' },
        { key: 'nav.about.management', label: 'ABOUT - 경영방침', type: 'text' },
        { key: 'nav.about.location', label: 'ABOUT - 찾아오시는길', type: 'text' },
        { key: 'nav.subsidiaries.main', label: '그룹사 (메인)', type: 'text' },
        { key: 'nav.subsidiaries.tlc', label: '그룹사 - 정호티엘씨', type: 'text' },
        { key: 'nav.subsidiaries.clarus', label: '그룹사 - 클라루스', type: 'text' },
        { key: 'nav.subsidiaries.illutech', label: '그룹사 - 일루텍', type: 'text' },
        { key: 'nav.subsidiaries.texcom', label: '그룹사 - 정호텍스컴', type: 'text' },
        { key: 'nav.subsidiaries.rss', label: '그룹사 - RSS 사업부', type: 'text' },
        { key: 'nav.media.main', label: '미디어/PR (메인)', type: 'text' },
        { key: 'nav.media.projects', label: '미디어/PR - 프로젝트 영상', type: 'text' },
        { key: 'nav.media.promotion', label: '미디어/PR - 홍보영상', type: 'text' },
        { key: 'nav.support.main', label: '고객센터 (메인)', type: 'text' },
        { key: 'nav.support.report', label: '고객센터 - 지원 제보', type: 'text' },
        { key: 'nav.support.contact', label: '고객센터 - 문의하기', type: 'text' },
        { key: 'nav.family', label: '패밀리 사이트', type: 'text' },
      ]
    }
  ];

  // 키 경로를 따라 값 가져오기
  const getNestedValue = (obj, path) => {
    if (!obj) return '';
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return '';
      }
    }
    return value || '';
  };

  // 키 경로를 따라 값 설정하기
  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const newObj = JSON.parse(JSON.stringify(obj)); // deep clone
    let target = newObj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {};
      }
      target = target[keys[i]];
    }
    
    target[keys[keys.length - 1]] = value;
    return newObj;
  };

  const handleChange = (key, value) => {
    const updatedData = setNestedValue(data, `${selectedLang}.${key}`, value);
    setData(updatedData);
  };

  // 번역 진행률 계산
  const calculateProgress = () => {
    let total = 0;
    let translated = 0;
    
    translationSections.forEach(section => {
      section.fields.forEach(field => {
        total++;
        const value = getNestedValue(data[selectedLang], field.key);
        if (value && value.trim() !== '') {
          translated++;
        }
      });
    });
    
    return { total, translated, percentage: total > 0 ? Math.round((translated / total) * 100) : 0 };
  };

  const progress = calculateProgress();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">다국어 관리</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            웹사이트의 다국어 번역을 관리하세요
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            💾 임시 저장
          </button>
          <button
            onClick={copyToClipboard}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
          >
            📋 클립보드에 복사
          </button>
          <button
            onClick={exportToJSON}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
          >
            📥 JSON 다운로드
          </button>
        </div>
      </div>

      {/* 저장 방식 안내 */}
      <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-300 mb-2">💡 저장 방식 안내</h4>
        <ul className="text-xs text-yellow-700 dark:text-yellow-400 space-y-1">
          <li>• <strong>임시 저장</strong>: 브라우저 localStorage에 저장 (본인 브라우저에서만 유효)</li>
          <li>• <strong>영구 저장</strong>: "JSON 다운로드" 또는 "클립보드에 복사" → <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">public/data/admin-i18n.json</code>에 저장 → Git 커밋 & 배포</li>
        </ul>
      </div>

      {/* 언어 선택 탭 */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              disabled={lang.code === 'ko'}
              className={`flex-1 min-w-[200px] px-6 py-4 rounded-lg font-semibold transition-all ${
                selectedLang === lang.code
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : lang.code === 'ko'
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <div className="font-bold">{lang.name}</div>
                  <div className="text-xs opacity-75">{lang.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* 번역 진행률 */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {selectedLang === 'ko' ? '한국어 (원본)' : `${languages.find(l => l.code === selectedLang)?.name} 번역 진행률`}
            </span>
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
              {progress.translated} / {progress.total} ({progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 번역 섹션들 */}
      <div className="space-y-6">
        {translationSections.map((section) => (
          <div key={section.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              {section.fields.map((field) => {
                const koValue = getNestedValue(data.ko, field.key);
                const translatedValue = getNestedValue(data[selectedLang], field.key);
                
                return (
                  <div key={field.key} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {field.label}
                    </label>
                    
                    {/* 한국어 원본 (참고용) */}
                    {selectedLang !== 'ko' && (
                      <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          🇰🇷 한국어 원본:
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {koValue || '(없음)'}
                        </p>
                      </div>
                    )}
                    
                    {/* 번역 입력 필드 */}
                    {field.type === 'textarea' ? (
                      <textarea
                        value={translatedValue}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        disabled={selectedLang === 'ko'}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={selectedLang === 'ko' ? '원본 텍스트' : '번역을 입력하세요...'}
                      />
                    ) : (
                      <input
                        type="text"
                        value={translatedValue}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        disabled={selectedLang === 'ko'}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder={selectedLang === 'ko' ? '원본 텍스트' : '번역을 입력하세요...'}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 도움말 */}
      <div className="mt-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">💡</span>
          번역 가이드
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• 한국어 원본을 참고하여 정확하게 번역해주세요</li>
          <li>• 개행 문자(\n)는 그대로 유지해주세요</li>
          <li>• 전문 번역가의 검토를 권장합니다</li>
          <li>• 저장 후 홈페이지에서 언어 전환하여 확인하세요</li>
          <li>• 번역이 반영되지 않으면 페이지를 새로고침하세요</li>
        </ul>
      </div>
    </div>
  );
};

// 이미지 관리 탭
const ImagesTab = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('projects');

  const categories = [
    { id: 'projects', label: '프로젝트 이미지', path: 'projects' },
    { id: 'subsidiaries', label: '계열사 로고', path: 'subsidiaries' },
    { id: 'team', label: '팀원 사진', path: 'team' },
    { id: 'products', label: '제품 이미지', path: 'products' },
    { id: 'banners', label: '배너 이미지', path: 'banners' },
    { id: 'general', label: '일반 이미지', path: 'images' },
  ];

  const currentCategory = categories.find(c => c.id === selectedCategory);

  const handleUploadSuccess = (url, file) => {
    console.log('✅ 업로드 성공:', url);
    setUploadedImages(prev => [...prev, {
      url,
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      category: selectedCategory
    }]);
    
    // 성공 알림
    alert(`이미지가 성공적으로 업로드되었습니다!\n\nURL: ${url}\n\n이 URL을 복사하여 콘텐츠에 사용하세요.`);
  };

  const handleUploadError = (error) => {
    console.error('❌ 업로드 실패:', error);
    alert(`업로드 실패: ${error.message}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL이 클립보드에 복사되었습니다!');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🖼️ 이미지 관리
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          이미지를 업로드하고 관리합니다. 업로드된 이미지 URL을 복사하여 콘텐츠에 사용하세요.
        </p>
      </div>

      {/* Firebase Storage 연결 테스트 */}
      <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
        <div className="flex items-start space-x-3 mb-4">
          <div className="text-2xl">⚠️</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              업로드가 멈춰있나요?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Firebase Storage가 활성화되지 않았을 수 있습니다. 아래 버튼을 클릭하여 연결 상태를 확인하세요.
            </p>
          </div>
        </div>
        <FirebaseStorageTest />
      </div>

      {/* 카테고리 선택 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          📁 이미지 카테고리
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-3 rounded-lg font-medium transition-all
                ${selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 업로드 영역 */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          ⬆️ 이미지 업로드
        </label>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <strong>현재 카테고리:</strong> {currentCategory?.label}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Firebase Storage 경로: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">{currentCategory?.path}/</code>
          </p>
        </div>
        
        <ImageUploader
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          path={currentCategory?.path}
          maxSize={10 * 1024 * 1024}
          resize={true}
          showPreview={true}
        />
      </div>

      {/* 업로드된 이미지 목록 */}
      {uploadedImages.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📋 최근 업로드된 이미지
          </h3>
          <div className="space-y-4">
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm"
              >
                <div className="flex items-start space-x-4">
                  {/* 썸네일 */}
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  
                  {/* 정보 */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1">
                      {image.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      크기: {(image.size / 1024).toFixed(1)} KB | 카테고리: {categories.find(c => c.id === image.category)?.label}
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={image.url}
                        readOnly
                        className="flex-1 px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-gray-700 dark:text-gray-300"
                      />
                      <button
                        onClick={() => copyToClipboard(image.url)}
                        className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded transition-colors"
                      >
                        📋 복사
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 도움말 */}
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">💡</span>
          이미지 업로드 가이드
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• <strong>지원 형식:</strong> JPG, PNG, WebP (최대 10MB)</li>
          <li>• <strong>자동 리사이즈:</strong> 큰 이미지는 자동으로 최적화됩니다 (1920x1080)</li>
          <li>• <strong>카테고리별 저장:</strong> 프로젝트, 계열사, 팀원 등 카테고리별로 분류됩니다</li>
          <li>• <strong>URL 복사:</strong> 업로드 후 URL을 복사하여 콘텐츠에 붙여넣으세요</li>
          <li>• <strong>Firebase Storage:</strong> 모든 이미지는 Firebase Storage에 안전하게 저장됩니다</li>
          <li>• <strong>CDN 배포:</strong> 업로드된 이미지는 자동으로 CDN을 통해 빠르게 제공됩니다</li>
        </ul>
      </div>

      {/* 사용 예시 */}
      <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">💻</span>
          사용 예시
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              1. JSON 데이터에 이미지 URL 추가:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`{
  "id": "project-001",
  "title": "프로젝트 제목",
  "imageUrl": "https://firebasestorage.googleapis.com/...",
  ...
}`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              2. React 컴포넌트에서 사용:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<img 
  src={project.imageUrl} 
  alt={project.title}
  className="w-full h-auto rounded-lg"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageV2;

