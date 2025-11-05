import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../../components/v2';

/**
 * v2 메인 홈페이지
 * 설계안에 따른 새로운 구조
 */
const HomePageV2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        title="더 밝은 미래를 위한 한 걸음
정호그룹"
        subtitle=""
        description="혁신적인 조명 기술로 40년,
새로운 40년을 향해 나아갑니다"
        actions={[
          {
            label: '그룹 소개 보기',
            variant: 'primary',
            onClick: () => navigate('/about'),
          },
          {
            label: '사업분야 보기',
            variant: 'secondary',
            onClick: () => navigate('/subsidiaries'),
          },
        ]}
        showScrollIndicator={true}
        overlay="gradient"
        height="full"
      />

      {/* IRGS 섹션 */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              IRGS - 정호그룹의 핵심 가치
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              기술은 정확하게, 경험은 아름답게
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Innovation */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Innovation
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                혁신
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                새로운 생각과 기술로 더 나은 "경험"을 만듭니다
              </p>
            </div>

            {/* Reliability */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Reliability
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                신뢰
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                품질과 약속을 지키는 것, "관계의 가치"를 높입니다
              </p>
            </div>

            {/* Global */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🌏</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Global
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                글로벌
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                국제 기준을 선도하는 기술력과 서비스로 글로벌 "경쟁력"을 확장합니다
              </p>
            </div>

            {/* Sustainability */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Sustainability
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                지속가능성
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                인간과 자연이 함께 공존할 수 있도록 지속가능한 "내일"을 설계합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 그룹사 소개 */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              정호그룹 계열사
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Innovation through specialized expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 정호티엘씨 */}
            <div 
              onClick={() => navigate('/subsidiaries/tlc')}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-tlc-500 to-primary-700">
                <div className="flex items-center justify-center">
                  <span className="text-6xl">⚡</span>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  정호티엘씨
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  빌딩 자동화 / 전력 제어
                </p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                  자세히 보기 →
                </button>
              </div>
            </div>

            {/* 클라루스 */}
            <div 
              onClick={() => navigate('/subsidiaries/clarus')}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-clarus-500 to-primary-700">
                <div className="flex items-center justify-center">
                  <span className="text-6xl">💡</span>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  클라루스
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  조명 제어 솔루션
                </p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                  자세히 보기 →
                </button>
              </div>
            </div>

            {/* 일루텍 */}
            <div 
              onClick={() => navigate('/subsidiaries/illutech')}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-illutech-500 to-yellow-600">
                <div className="flex items-center justify-center">
                  <span className="text-6xl">🔆</span>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  일루텍
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  산업용 LED 조명
                </p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                  자세히 보기 →
                </button>
              </div>
            </div>

            {/* 정호텍스컴 */}
            <div 
              onClick={() => navigate('/subsidiaries/texcom')}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-texcom-500 to-purple-700">
                <div className="flex items-center justify-center">
                  <span className="text-6xl">🧵</span>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  정호텍스컴
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  섬유기계 / 패션
                </p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                  자세히 보기 →
                </button>
              </div>
            </div>

            {/* RSS 사업부 */}
            <div 
              onClick={() => navigate('/subsidiaries/rss')}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-rss-500 to-primary-700">
                <div className="flex items-center justify-center">
                  <span className="text-6xl">🔧</span>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  RSS 사업부
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  설명기계
                </p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                  자세히 보기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            정호그룹과 함께하세요
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            혁신적인 기술과 40년의 경험으로 밝은 미래를 만들어갑니다
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/about')}
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              회사 소개
            </button>
            <button
              onClick={() => navigate('/support/contact')}
              className="px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors duration-200 border-2 border-white"
            >
              문의하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageV2;

