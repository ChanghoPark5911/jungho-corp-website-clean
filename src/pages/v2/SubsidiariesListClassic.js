import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 계열사 목록 페이지 - 클래식 버전 (전통적 스타일)
 * - 기존 정호그룹 웹사이트 스타일 모방
 * - 표/리스트 형식
 */
const SubsidiariesListClassic = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  // 사이드바 메뉴
  const sidebarItems = [
    { id: 'all', label: currentLanguage === 'en' ? 'All Subsidiaries' : '전체 계열사', path: '/classic/subsidiaries', active: true },
    { id: 'clarus', label: currentLanguage === 'en' ? 'CLARUS' : '클라루스', path: '/classic/subsidiaries/clarus' },
    { id: 'tlc', label: currentLanguage === 'en' ? 'Jungho TLC' : '정호티엘씨', path: '/classic/subsidiaries/jungho-tlc' },
    { id: 'illutech', label: currentLanguage === 'en' ? 'ILLUTECH' : '일루텍', path: '/classic/subsidiaries/illutech' },
    { id: 'texcom', label: currentLanguage === 'en' ? 'Jungho TEXCOM' : '정호텍스컴', path: '/classic/subsidiaries/jungho-texcom' }
  ];

  // 계열사 목록
  const subsidiaries = [
    {
      id: 'clarus',
      name: 'CLARUS Korea Co., Ltd.',
      nameKo: '(주)클라루스',
      logo: '💡',
      established: '2009',
      business: currentLanguage === 'en' 
        ? 'IoT-based Smart Lighting Control, Power Monitoring'
        : 'IoT 기반 스마트 조명 제어, 전력 감시 제어',
      businessDetails: currentLanguage === 'en'
        ? ['Specialized in smart lighting control systems using IoT technology', 'Provides integrated solutions for building automation and energy management', 'Export business']
        : ['IoT 기술을 활용한 스마트 조명 제어 시스템 전문 기업. 빌딩 자동화 및 에너지 관리 통합 솔루션 제공', '해외사업(수출)'],
      path: '/classic/subsidiaries/clarus'
    },
    {
      id: 'tlc',
      name: 'Jungho TLC Co., Ltd.',
      nameKo: '(주)정호티엘씨',
      logo: '🏢',
      established: '1982',
      business: currentLanguage === 'en'
        ? 'Integrated Lighting & Power Control, Building Automation'
        : '조명·전력 통합 제어, 빌딩 자동화',
      businessDetails: currentLanguage === 'en'
        ? ['Pioneer in building automation since 1982', 'Provides stable and efficient control systems for large buildings and facilities']
        : ['1982년부터 빌딩 자동화 분야의 선구자. 대형 건물 및 시설물에 안정적이고 효율적인 제어 시스템 제공'],
      path: '/classic/subsidiaries/jungho-tlc'
    },
    {
      id: 'illutech',
      name: 'ILLUTECH Co., Ltd.',
      nameKo: '(주)일루텍',
      logo: '⚡',
      established: '2010',
      business: currentLanguage === 'en'
        ? 'Industrial & Special LED Lighting'
        : '산업·특수 LED 조명',
      businessDetails: currentLanguage === 'en'
        ? ['Specialist in industrial and special LED lighting', 'Develops and supplies lighting solutions for nuclear plants, hospitals, and public facilities']
        : ['산업용 및 특수 LED 조명 전문 기업. 원전, 병원, 공공시설 등을 위한 조명 솔루션 개발 및 공급'],
      path: '/classic/subsidiaries/illutech'
    },
    {
      id: 'texcom',
      name: 'Jungho TEXCOM Co., Ltd.',
      nameKo: '(주)정호텍스컴',
      logo: '🧵',
      established: '1982 (2007 separated)',
      business: currentLanguage === 'en'
        ? 'Textile Machinery, Testing Equipment, RSS'
        : '섬유기계·시험기, RSS',
      businessDetails: currentLanguage === 'en'
        ? ['Bridge between textile industry and fashion', 'Imports and distributes textile machinery and testing equipment from Europe']
        : ['섬유 산업과 패션을 잇는 가교 역할. 유럽산 섬유 기계 및 시험기 수입 및 유통'],
      path: '/classic/subsidiaries/jungho-texcom'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 전통적 네비게이션 */}
      <TraditionalNav />

      {/* 작은 배너 */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'Our Companies' : '우리의 계열사'}
        title={currentLanguage === 'en' 
          ? 'Subsidiaries'
          : '계열사 소개'
        }
        description={currentLanguage === 'en'
          ? 'Four specialized companies creating synergy'
          : '4개의 전문 기업이 만들어내는 시너지'
        }
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        height="400px"
      />

      {/* 메인 콘텐츠 - 전통적 레이아웃 */}
      <TraditionalLayout showSidebar={true} sidebarItems={sidebarItems}>
        {/* 개요 */}
        <section className="mb-10">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-500 p-6 rounded-r-lg">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base">
              {currentLanguage === 'en'
                ? 'JUNGHO Group consists of four specialized subsidiaries. Each company demonstrates expertise in its field and works together to create synergy.'
                : '정호그룹은 4개의 전문 계열사로 구성되어 있습니다. 각 회사는 각자의 분야에서 전문성을 발휘하며 함께 시너지를 창출하고 있습니다.'
              }
            </p>
          </div>
        </section>

        {/* 계열사 목록 */}
        {subsidiaries.map((company, index) => (
          <section key={company.id} className="mb-8">
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200">
              {/* 헤더 */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{company.logo}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {currentLanguage === 'en' ? company.name : company.nameKo}
                    </h2>
                    <p className="text-blue-100 text-sm">
                      {currentLanguage === 'en' ? 'Est.' : '설립'} {company.established}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(company.path)}
                  className="px-5 py-2 bg-white text-blue-700 font-semibold rounded hover:bg-blue-50 transition-colors duration-200 shadow-md"
                >
                  {currentLanguage === 'en' ? 'Details →' : '상세보기 →'}
                </button>
              </div>

              {/* 본문 */}
              <div className="p-6">
                {/* 사업 분야 */}
                <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <span className="mr-2">ㅇ</span>
                    {company.business}
                  </h3>
                  <div className="space-y-2 ml-6">
                    {company.businessDetails.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 dark:text-gray-300 leading-relaxed text-base flex items-start">
                        <span className="mr-2 mt-1">-</span>
                        <span>{detail}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* 하단 안내 */}
        <section className="mt-10">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {currentLanguage === 'en'
                ? 'For more information about each subsidiary, please click the "Details" button.'
                : '각 계열사에 대한 자세한 정보는 "상세보기" 버튼을 클릭해주세요.'
              }
            </p>
            <button
              onClick={() => navigate('/classic/support')}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              {currentLanguage === 'en' ? 'Contact Us →' : '문의하기 →'}
            </button>
          </div>
        </section>
      </TraditionalLayout>
    </div>
  );
};

export default SubsidiariesListClassic;

