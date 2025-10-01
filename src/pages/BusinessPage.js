import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import staticPageContentService from '../services/staticPageContentService';
import { useI18n } from '../hooks/useI18n';

const BusinessPage = () => {
  const { t } = useI18n(); // 다국어 지원
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBusinessContent();
  }, []);

  const loadBusinessContent = async () => {
    try {
      console.log('사업영역 페이지 콘텐츠 로드 시작');
      const data = await staticPageContentService.getStaticPageContent('business');
      console.log('사업영역 페이지 콘텐츠 로드 성공:', data);
      setContent(data);
    } catch (err) {
      console.error('사업영역 페이지 콘텐츠 로드 실패:', err);
      setError('콘텐츠를 불러오는데 실패했습니다.');
      // 기본 데이터 사용
      setContent(staticPageContentService.getDefaultBusinessContent());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading', { fallback: '사업영역 페이지를 불러오는 중...' })}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadBusinessContent}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {t('buttons.retry', { fallback: '다시 시도' })}
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t('common.error', { fallback: '콘텐츠를 불러올 수 없습니다.' })}</p>
        </div>
      </div>
    );
  }

  // 콘텐츠에서 데이터 추출
  const heroData = content.hero || {};
  const businessAreas = content.businessAreas || [];
  const subsidiaries = content.subsidiaries || [];
  const technology = content.technology || {};
  const cta = content.cta || {};


  return (
    <>
      <SEO 
        title={t('seo.business.title', { fallback: '사업영역 - 정호그룹' })}
        description={t('seo.business.description', { fallback: '정호그룹의 다양한 사업영역을 소개합니다. 클라러스, TLC, 일루테크, 텍스컴 등 계열사의 전문 분야를 확인하세요.' })}
        keywords={t('seo.business.keywords', { fallback: '정호그룹, 사업영역, 클라러스, TLC, 일루테크, 텍스컴, 조명제어, LED조명' })}
      />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} useLocalStorage={false} />
      </section>

      {/* 사업영역 소개 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('business.coreAreas.title', { fallback: '핵심 사업영역' })}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {technology.description || t('business.coreAreas.description', { fallback: '40년간 축적된 조명제어 기술력을 바탕으로 다양한 분야에서 혁신적인 솔루션을 제공합니다' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessAreas.map((area, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{area.title}</h3>
                <p className="text-gray-600 mb-6">{area.description}</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {area.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 계열사별 전문분야 */}
      <Section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('business.subsidiaries.title', { fallback: '계열사별 전문분야' })}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('business.subsidiaries.description', { fallback: '4개 계열사가 각각의 전문분야에서 최고의 솔루션을 제공합니다' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {subsidiaries.map((subsidiary, index) => (
              <Card key={index} className={`card-${subsidiary.color} p-8`}>
                <h3 className="text-2xl font-bold text-primary mb-4">{subsidiary.name}</h3>
                <p className="text-gray-600 mb-6">{subsidiary.description}</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">{t('business.expertise', { fallback: '전문분야:' })}</h4>
                  <div className="flex flex-wrap gap-2">
                    {subsidiary.expertise.map((exp, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    onClick={() => {
                      const urls = {
                        "클라루스": "/clarus",
                        "정호티엘씨": "/tlc", 
                        "일루텍": "/illutech",
                        "정호텍스컴": "/texcom"
                      };
                      window.location.href = urls[subsidiary.name];
                    }}
                  >
                    {t('buttons.learnMore', { fallback: '자세히 보기' })}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 기술력 소개 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {technology.title || "차별화된 기술력"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {technology.description || "국내 최초 E/F2-BUS 프로토콜 개발부터 최신 IoT 기술까지"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technology.features?.map((feature, index) => (
              <Card key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            )) || (
              // 기본 기술력 데이터 (fallback)
              <>
                <Card className="text-center">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-xl font-bold text-primary mb-4">자체 개발 프로토콜</h3>
                  <p className="text-gray-600">
                    국내 최초 E/F2-BUS 프로토콜을 자체 개발하여 독자적인 기술력을 확보했습니다.
                  </p>
                </Card>
                <Card className="text-center">
                  <div className="text-4xl mb-4">🌐</div>
                  <h3 className="text-xl font-bold text-primary mb-4">IoT 통합 솔루션</h3>
                  <p className="text-gray-600">
                    최신 IoT 기술을 활용하여 스마트한 조명제어 시스템을 구축합니다.
                  </p>
                </Card>
                <Card className="text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-primary mb-4">에너지 효율성</h3>
                  <p className="text-gray-600">
                    에너지 절약과 사용자 편의성을 동시에 만족시키는 솔루션을 제공합니다.
                  </p>
                </Card>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* CTA 섹션 */}
      <Section className="py-20 bg-gradient-green">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {cta.title || "프로젝트 문의하기"}
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {cta.description || "정호그룹의 전문가들이 귀사의 프로젝트에 최적화된 솔루션을 제안해드립니다."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {cta.buttons?.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || "secondary"}
                size="lg"
                onClick={() => window.location.href = button.path}
                className="text-lg px-8 py-4"
              >
                {button.label}
              </Button>
            )) || (
              // 기본 CTA 버튼 (fallback)
              <>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.href = "/support"}
                  className="text-lg px-8 py-4"
                >
                  문의하기
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.location.href = "/projects"}
                  className="text-lg px-8 py-4"
                >
                  프로젝트 보기
                </Button>
              </>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default BusinessPage; 