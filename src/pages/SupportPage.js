import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import staticPageContentService from '../services/staticPageContentService';
import { useI18n } from '../hooks/useI18n';

const SupportPage = () => {
  const { t } = useI18n(); // 다국어 지원
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSupportContent();
  }, []);

  const loadSupportContent = async () => {
    try {
      console.log('고객지원 페이지 콘텐츠 로드 시작');
      const data = await staticPageContentService.getStaticPageContent('support');
      console.log('고객지원 페이지 콘텐츠 로드 성공:', data);
      setContent(data);
    } catch (err) {
      console.error('고객지원 페이지 콘텐츠 로드 실패:', err);
      setError('콘텐츠를 불러오는데 실패했습니다.');
      // 기본 데이터 사용
      setContent(staticPageContentService.getDefaultSupportContent());
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t('support.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('support.error')}</p>
          <button 
            onClick={loadSupportContent}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            {t('support.retry')}
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t('support.noContent')}</p>
        </div>
      </div>
    );
  }

  // 콘텐츠에서 데이터 추출
  const rawHeroData = content.hero || {};
  const supportChannels = content.supportChannels || [];
  const supportServices = content.supportServices || [];
  const faqs = content.faqs || [];
  const contactForm = content.contactForm || {};

  // 🔧 다국어 지원: 히어로 데이터를 다국어 키로 변환
  const heroData = {
    backgroundImage: rawHeroData.backgroundImage,
    mainCopy: t('support.hero.title', { fallback: rawHeroData.mainCopy || '고객 지원' }),
    subCopy: t('support.hero.subtitle', { fallback: rawHeroData.subCopy || '정호그룹의 전문가들이 24시간 내에 답변드립니다. 언제든지 문의해주세요.' }),
    description: t('support.hero.description', { fallback: rawHeroData.description || '' }),
    primaryAction: rawHeroData.primaryAction ? {
      ...rawHeroData.primaryAction,
      label: t(rawHeroData.primaryAction.label, { fallback: rawHeroData.primaryAction.label })
    } : undefined
  };

  return (
    <>
      <SEO 
        title={t('seo.support.title', { fallback: '고객지원 - 정호그룹' })}
        description={t('seo.support.description', { fallback: '정호그룹의 고객지원 서비스를 확인하세요. 24/7 기술지원, A/S 서비스, 교육 프로그램 등 다양한 지원 서비스를 제공합니다.' })}
        keywords="정호그룹, 고객지원, A/S, 기술지원, 교육프로그램, 고객서비스"
      />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} useLocalStorage={false} />
      </section>

      {/* 지원 채널 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('support.channels.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('support.channels.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{channel.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{channel.title}</h3>
                <p className="text-gray-600 mb-4">{channel.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="text-lg font-semibold">{channel.contact}</div>
                  <div className="text-sm text-gray-500">{channel.hours}</div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={channel.action?.onClick ? () => window.location.href = channel.action.onClick : (() => window.location.href = channel.action?.path)}
                >
                  {channel.action?.label}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 지원 서비스 */}
      <Section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('support.services.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('support.services.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {service.features?.map((feature, idx) => (
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

      {/* FAQ */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              {t('support.faq.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('support.faq.description')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold text-primary mb-3">
                  Q. {faq.question}
                </h3>
                <p className="text-gray-600">
                  A. {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 문의 폼 */}
      <Section id="contact-form" className="py-20 bg-gradient-green">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {contactForm.title || t('support.contactForm.title')}
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {contactForm.description || t('support.contactForm.description')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.name?.label || t('support.contactForm.fields.name')} *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('support.contactForm.placeholders.name')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.company?.label || t('support.contactForm.fields.company')}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('support.contactForm.placeholders.company')}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.email?.label || t('support.contactForm.fields.email')} *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('support.contactForm.placeholders.email')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.phone?.label || t('support.contactForm.fields.phone')} *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder={t('support.contactForm.placeholders.phone')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {contactForm.fields?.category?.label || t('support.contactForm.fields.category')}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    {contactForm.fields?.category?.options?.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    )) || (
                      <>
                        <option>{t('support.contactForm.placeholders.category')}</option>
                        <option>{t('support.contactForm.categories.smartBuilding')}</option>
                        <option>{t('support.contactForm.categories.cityInfra')}</option>
                        <option>{t('support.contactForm.categories.industrial')}</option>
                        <option>{t('support.contactForm.categories.cultural')}</option>
                        <option>{t('support.contactForm.categories.technical')}</option>
                        <option>{t('support.contactForm.categories.other')}</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {contactForm.fields?.message?.label || t('support.contactForm.fields.message')} *
                  </label>
                  <textarea
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('support.contactForm.placeholders.message')}
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="text-lg px-8 py-4"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(t('support.contactForm.successMessage'));
                    }}
                  >
                    {t('support.contactForm.submit')}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};

export default SupportPage;