import React, { useState, useEffect } from 'react';
import { SupportPageSEO } from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import staticPageContentService from '../services/staticPageContentService';

const SupportPage = () => {
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
          <p className="text-gray-600">고객지원 페이지를 불러오는 중...</p>
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
            onClick={loadSupportContent}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">콘텐츠를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // 콘텐츠에서 데이터 추출
  const heroData = content.hero || {};
  const supportChannels = content.supportChannels || [];
  const supportServices = content.supportServices || [];
  const faqs = content.faqs || [];
  const contactForm = content.contactForm || {};

  return (
    <>
      <SupportPageSEO />
      
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <Hero {...heroData} useLocalStorage={false} />
      </section>

      {/* 지원 채널 */}
      <Section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              지원 채널
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              다양한 방법으로 정호그룹의 전문가들과 연락하실 수 있습니다
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
              지원 서비스
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              시스템 도입부터 운영까지 전 과정을 지원합니다
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
              자주 묻는 질문
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              고객님들이 자주 문의하시는 내용들을 정리했습니다
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
              {contactForm.title || "문의하기"}
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {contactForm.description || "프로젝트에 대한 상세한 문의사항을 남겨주시면 전문가가 빠른 시일 내에 답변드립니다"}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.name?.label || "이름"} *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="이름을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.company?.label || "회사명"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="회사명을 입력하세요"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.email?.label || "이메일"} *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="이메일을 입력하세요"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactForm.fields?.phone?.label || "연락처"} *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="연락처를 입력하세요"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {contactForm.fields?.category?.label || "문의 분야"}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    {contactForm.fields?.category?.options?.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    )) || (
                      <>
                        <option>문의 분야를 선택하세요</option>
                        <option>스마트 빌딩 조명제어</option>
                        <option>도시 조명 인프라</option>
                        <option>산업용 조명시스템</option>
                        <option>문화시설 조명예술</option>
                        <option>기술 상담</option>
                        <option>기타</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {contactForm.fields?.message?.label || "문의 내용"} *
                  </label>
                  <textarea
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="상세한 문의 내용을 입력하세요"
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
                      alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
                    }}
                  >
                    문의하기
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