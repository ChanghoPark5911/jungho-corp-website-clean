import React from 'react';
import { SupportPageSEO } from '../components/SEO';
import Hero from '../components/ui/Hero';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SupportPage = () => {
  // 히어로 섹션 데이터
  const heroData = {
    backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    mainCopy: "고객 지원",
    subCopy: "정호그룹의 전문가들이 24시간 내에 답변드립니다. 언제든지 문의해주세요.",
    primaryAction: {
      label: "지금 문의하기",
      path: "#contact"
    }
  };

  // 지원 채널 데이터
  const supportChannels = [
    {
      title: "전화 상담",
      description: "전문 엔지니어가 직접 답변드립니다",
      contact: "1588-1234",
      hours: "평일 09:00-18:00",
      icon: "📞",
      action: {
        label: "전화하기",
        onClick: () => window.location.href = "tel:1588-1234"
      }
    },
    {
      title: "이메일 문의",
      description: "상세한 기술 문의사항을 보내주세요",
      contact: "support@jungho.com",
      hours: "24시간 접수 가능",
      icon: "📧",
      action: {
        label: "이메일 보내기",
        onClick: () => window.location.href = "mailto:support@jungho.com"
      }
    },
    {
      title: "카카오톡",
      description: "실시간 채팅으로 빠른 답변을 받으세요",
      contact: "@정호그룹",
      hours: "평일 09:00-18:00",
      icon: "💬",
      action: {
        label: "채팅 시작",
        path: "https://open.kakao.com/정호그룹"
      }
    },
    {
      title: "온라인 문의",
      description: "웹사이트를 통한 간편한 문의",
      contact: "24시간 접수",
      hours: "24시간 접수 가능",
      icon: "🌐",
      action: {
        label: "문의하기",
        path: "#contact-form"
      }
    }
  ];

  // 지원 서비스 데이터
  const supportServices = [
    {
      title: "기술 상담",
      description: "조명제어 시스템에 대한 전문적인 기술 상담을 제공합니다.",
      icon: "🔧",
      features: ["시스템 설계", "기술 검토", "최적화 방안", "비용 분석"]
    },
    {
      title: "설치 지원",
      description: "전문 엔지니어가 현장에서 직접 설치를 지원합니다.",
      icon: "⚙️",
      features: ["현장 설치", "시스템 연동", "테스트", "교육"]
    },
    {
      title: "유지보수",
      description: "정기적인 점검과 예방정비로 시스템을 안정적으로 운영합니다.",
      icon: "🔍",
      features: ["정기 점검", "예방정비", "고장 수리", "부품 교체"]
    },
    {
      title: "교육 서비스",
      description: "시스템 운영자를 위한 전문 교육을 제공합니다.",
      icon: "📚",
      features: ["운영 교육", "기술 교육", "매뉴얼 제공", "온라인 지원"]
    }
  ];

  // FAQ 데이터
  const faqs = [
    {
      question: "조명제어 시스템 도입에 얼마나 시간이 걸리나요?",
      answer: "프로젝트 규모에 따라 다르지만, 일반적으로 3-6개월 정도 소요됩니다. 상세한 일정은 기술 상담을 통해 안내드립니다."
    },
    {
      question: "기존 조명 시스템과 호환되나요?",
      answer: "네, 대부분의 기존 조명 시스템과 호환됩니다. 정확한 호환성은 현장 점검을 통해 확인해드립니다."
    },
    {
      question: "에너지 절약 효과는 어느 정도인가요?",
      answer: "일반적으로 20-40%의 에너지 절약 효과를 기대할 수 있습니다. 구체적인 수치는 사용 패턴에 따라 달라집니다."
    },
    {
      question: "원격 제어가 가능한가요?",
      answer: "네, IoT 기술을 활용한 원격 제어가 가능합니다. 스마트폰 앱이나 웹 인터페이스를 통해 언제든지 제어할 수 있습니다."
    },
    {
      question: "유지보수 비용은 얼마인가요?",
      answer: "시스템 규모와 서비스 수준에 따라 다르며, 연간 시스템 구축 비용의 5-10% 정도입니다. 상세한 견적은 문의해주세요."
    },
    {
      question: "긴급 상황 시 지원이 가능한가요?",
      answer: "네, 24시간 긴급 지원 서비스를 제공합니다. 전화나 온라인을 통해 언제든지 연락하실 수 있습니다."
    }
  ];

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
                  onClick={channel.action.onClick || (() => window.location.href = channel.action.path)}
                >
                  {channel.action.label}
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
                  {service.features.map((feature, idx) => (
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
              문의하기
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              프로젝트에 대한 상세한 문의사항을 남겨주시면 전문가가 빠른 시일 내에 답변드립니다
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 *
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
                      회사명
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
                      이메일 *
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
                      연락처 *
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
                    문의 분야
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>문의 분야를 선택하세요</option>
                    <option>스마트 빌딩 조명제어</option>
                    <option>도시 조명 인프라</option>
                    <option>산업용 조명시스템</option>
                    <option>문화시설 조명예술</option>
                    <option>기술 상담</option>
                    <option>기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문의 내용 *
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