import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import TraditionalNav from '../../components/v2/TraditionalNav';
import TraditionalLayout from '../../components/v2/TraditionalLayout';
import SmallBanner from '../../components/v2/SmallBanner';

/**
 * 회사소개 페이지 - 클래식 버전 (전통적 스타일)
 * - 기존 정호그룹 웹사이트 스타일 모방
 * - 표 형식, 박스형 레이아웃
 */
const AboutIntroClassic = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useI18n();

  // 사이드바는 TraditionalLayout에서 자동 생성 (category="about")

  // 회사 개요 정보
  const companyInfo = [
    { 
      label: currentLanguage === 'en' ? 'Company Name' : '회사명',
      value: currentLanguage === 'en' ? 'JUNGHO Group' : '정호그룹'
    },
    { 
      label: currentLanguage === 'en' ? 'Established' : '설립일',
      value: currentLanguage === 'en' ? 'March 1982' : '1982년 3월'
    },
    { 
      label: currentLanguage === 'en' ? 'CEO' : '대표이사',
      value: currentLanguage === 'en' ? 'Ryu Jae-man' : '류재만'
    },
    { 
      label: currentLanguage === 'en' ? 'Headquarters' : '본사 소재지',
      value: currentLanguage === 'en' 
        ? '17, Nonhyeon-ro 116-gil, Gangnam-gu, Seoul, Jungho Building'
        : '서울시 강남구 논현로116길 17 정호빌딩'
    },
    { 
      label: currentLanguage === 'en' ? 'Phone' : '대표전화',
      value: '02-553-3631'
    },
    { 
      label: currentLanguage === 'en' ? 'Fax' : '팩스',
      value: '02-552-3631'
    },
    { 
      label: currentLanguage === 'en' ? 'Email' : '이메일',
      value: 'info@junghocorp.com'
    },
    { 
      label: currentLanguage === 'en' ? 'Business Areas' : '사업 분야',
      value: currentLanguage === 'en'
        ? 'AI/IoT Solutions, Smart Lighting, Logistics, Textiles'
        : 'AI/IoT 솔루션, 스마트 조명, 물류, 섬유'
    }
  ];

  // 주요 연혁 (요약)
  const milestones = currentLanguage === 'en' ? [
    '2020 - Expansion into AI/IoT solutions',
    '2018 - Established CLARUS Korea (Smart Lighting)',
    '2010 - Established ILLUTECH (LED Lighting)',
    '2007 - TEXCOM separated as subsidiary',
    '1982 - Founded JUNGHO Group'
  ] : [
    '2020년 - AI/IoT 솔루션 사업 확장',
    '2018년 - 클라루스코리아 스마트 조명 사업 강화',
    '2010년 - 일루텍 설립 (LED 조명)',
    '2007년 - 정호텍스컴 계열사 분사',
    '1982년 - 정호그룹 창립'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 전통적 네비게이션 */}
      <TraditionalNav version="classic" />

      {/* 작은 배너 */}
      <SmallBanner
        subtitle={currentLanguage === 'en' ? 'About JUNGHO' : '정호그룹 소개'}
        title={currentLanguage === 'en' 
          ? 'Company Introduction'
          : '회사 소개'
        }
        description={currentLanguage === 'en'
          ? 'Leading innovation in lighting and IoT solutions since 1982'
          : '1982년부터 조명과 IoT 솔루션 분야의 혁신을 선도합니다'
        }
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        height="400px"
      />

      {/* 메인 콘텐츠 - 전통적 레이아웃 */}
      <TraditionalLayout showSidebar={true} category="about" version="classic">
        {/* 인사말 */}
        <section className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'CEO Message' : '대표 인사말'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Since its establishment in 1982, JUNGHO Group has been committed to innovation and technological development in the fields of lighting control, IoT solutions, and industrial automation.'
                : '1982년 설립 이래, 정호그룹은 조명 제어, IoT 솔루션, 산업 자동화 분야에서 혁신과 기술 개발에 전념해왔습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-lg">
              {currentLanguage === 'en'
                ? 'Our four specialized subsidiaries work together to provide optimized solutions for various industries, creating synergy through their expertise.'
                : '4개의 전문 계열사가 각 분야에서 전문성을 발휘하며 다양한 산업에 최적화된 솔루션을 제공하고 있습니다.'
              }
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {currentLanguage === 'en'
                ? 'We will continue to grow as a global company, creating a better future with innovative technology.'
                : '앞으로도 혁신적인 기술로 더 나은 미래를 만들어가는 글로벌 기업으로 성장하겠습니다.'
              }
            </p>
            <div className="mt-6 text-right">
              <p className="text-gray-900 dark:text-white font-bold text-lg">
                {currentLanguage === 'en' ? 'CEO Ryu Jae-man' : '대표이사 류재만'}
              </p>
            </div>
          </div>
        </section>

        {/* 회사 개요 */}
        <section className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Company Overview' : '회사 개요'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
            <table className="w-full">
              <tbody>
                {companyInfo.map((item, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700/50 w-1/3">
                      {item.label}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 주요 연혁 (요약) */}
        <section className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Key Milestones' : '주요 연혁'}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-md">
            <ul className="space-y-3">
              {milestones.map((milestone, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-base pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="flex-1">{milestone}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-right">
              <button
                onClick={() => navigate('/classic/about/history')}
                className="px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                {currentLanguage === 'en' ? 'View Full History →' : '전체 연혁 보기 →'}
              </button>
            </div>
          </div>
        </section>

        {/* 계열사 */}
        <section className="mb-10">
          <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLanguage === 'en' ? 'Our Subsidiaries' : '계열사'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'CLARUS', nameKo: '클라루스', desc: 'IoT 조명 제어' },
              { name: 'Jungho TLC', nameKo: '정호티엘씨', desc: '빌딩 자동화' },
              { name: 'ILLUTECH', nameKo: '일루텍', desc: 'LED 조명' },
              { name: 'Jungho TEXCOM', nameKo: '정호텍스컴', desc: '섬유 기계' }
            ].map((sub, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-blue-400 dark:hover:border-blue-600 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate('/classic/subsidiaries')}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {currentLanguage === 'en' ? sub.name : sub.nameKo}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {sub.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/classic/subsidiaries')}
              className="px-6 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white transition-all duration-200"
            >
              {currentLanguage === 'en' ? 'View All Subsidiaries →' : '계열사 전체보기 →'}
            </button>
          </div>
        </section>
      </TraditionalLayout>
    </div>
  );
};

export default AboutIntroClassic;

