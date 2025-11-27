import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../hooks/useI18n';
import { COMPANY_INFO } from '../../utils/constants';

/**
 * V2 고객센터 페이지
 * V1 SupportPage.js를 기반으로 V2 디자인 적용
 */
const SupportPage = () => {
  const { t, currentLanguage } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  // 애니메이션 variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0
      }
    }
  };

  // 지원 채널
  const supportChannels = [
    {
      id: 'phone',
      icon: '📞',
      title: currentLanguage === 'en' ? 'Phone Consultation' : '전화 상담',
      description: COMPANY_INFO.support.phone.number,
      hours: currentLanguage === 'en' ? 'Weekdays 09:00 - 18:00' : COMPANY_INFO.support.phone.hours,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'email',
      icon: '📧',
      title: currentLanguage === 'en' ? 'Email Inquiry' : '이메일 문의',
      description: COMPANY_INFO.support.email.address,
      hours: currentLanguage === 'en' ? '24/7 Available' : COMPANY_INFO.support.email.hours,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'kakao',
      icon: '💬',
      title: currentLanguage === 'en' ? '1:1 Monthly Consultation' : '카카오톡 상담',
      description: currentLanguage === 'en' ? '@JunghoGroup' : COMPANY_INFO.support.kakaoTalk.id,
      hours: currentLanguage === 'en' ? 'Real-time Consultation' : COMPANY_INFO.support.kakaoTalk.hours,
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  // FAQ 데이터
  const faqs = [
    {
      category: '일반',
      questions: [
        {
          q: '정호그룹은 어떤 회사인가요?',
          a: '정호그룹은 1995년 설립된 글로벌 기업으로, AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하고 있습니다.'
        },
        {
          q: '계열사는 몇 개가 있나요?',
          a: '현재 클라루스, 정호티엘씨, 일루텍, 정호텍스컴 등 4개의 주요 계열사가 있습니다. 정호텍스컴은 섬유기계사업부와 RSS 사업부로 구성되어 있습니다.'
        }
      ]
    },
    {
      category: '서비스',
      questions: [
        {
          q: currentLanguage === 'en' ? 'How can I get technical support?' : '기술 지원은 어떻게 받을 수 있나요?',
          a: currentLanguage === 'en' 
            ? 'You can get 24-hour technical support via phone (02-553-3631), email (support@jungho.com), or KakaoTalk (@JunghoGroup).'
            : '전화(02-553-3631), 이메일(support@jungho.com), 카카오톡(@정호그룹)을 통해 24시간 기술 지원을 받으실 수 있습니다.'
        },
        {
          q: 'A/S는 어떻게 신청하나요?',
          a: '고객센터로 연락 주시거나, 아래 문의 양식을 작성해 주시면 담당자가 연락드리겠습니다.'
        }
      ]
    },
    {
      category: '제품/견적',
      questions: [
        {
          q: '제품 카탈로그는 어디서 받을 수 있나요?',
          a: '각 계열사 페이지에서 제품 정보를 확인하실 수 있으며, 상세 카탈로그는 이메일로 요청하시면 발송해 드립니다.'
        },
        {
          q: '견적은 어떻게 받을 수 있나요?',
          a: '아래 문의 양식에 견적 문의를 선택하시고 필요한 정보를 작성해 주시면, 영업 담당자가 빠르게 연락드리겠습니다.'
        }
      ]
    }
  ];

  // 문의 카테고리
  const inquiryCategories = [
    { value: 'general', label: currentLanguage === 'en' ? 'General Inquiry' : '일반 문의' },
    { value: 'product', label: currentLanguage === 'en' ? 'Product Inquiry' : '제품 문의' },
    { value: 'quote', label: currentLanguage === 'en' ? 'Quote Request' : '견적 요청' },
    { value: 'technical', label: currentLanguage === 'en' ? 'Technical Support' : '기술 지원' },
    { value: 'as', label: currentLanguage === 'en' ? 'A/S Request' : 'A/S 신청' },
    { value: 'partnership', label: currentLanguage === 'en' ? 'Partnership Inquiry' : '제휴 문의' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    // 실제로는 API 호출
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
            variants={fadeInUp}
          >
            <span className="text-5xl">🎧</span>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeInUp}
          >
            {currentLanguage === 'en' ? 'Customer Center' : '고객센터'}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {currentLanguage === 'en' 
              ? 'Jungho Group experts will respond within 24 hours' 
              : '정호그룹의 전문가들이 24시간 내에 답변드립니다'}
          </motion.p>
        </motion.div>
      </section>

      {/* 지원 채널 섹션 */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'Support Channels' : '지원 채널'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en' ? 'Please contact us via your preferred method' : '편리한 방법으로 문의해 주세요'}
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {supportChannels.map((channel) => (
                <motion.div
                  key={channel.id}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className={`bg-gradient-to-br ${channel.color} p-6 text-white`}>
                    <div className="text-5xl mb-3">{channel.icon}</div>
                    <h3 className="text-2xl font-bold">{channel.title}</h3>
                  </div>
                  <div className="p-6">
                    <div className={`text-xl font-bold ${channel.textColor} mb-2`}>
                      {channel.description}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-200 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 dark:text-white">{channel.hours}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 문의하기 폼 섹션 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLanguage === 'en' ? 'Contact Us' : '문의하기'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {currentLanguage === 'en' 
                  ? 'Leave your inquiry and we will respond promptly' 
                  : '궁금하신 사항을 남겨주시면 빠르게 답변드리겠습니다'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {currentLanguage === 'en' ? 'Name' : '이름'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder={currentLanguage === 'en' ? 'John Doe' : '홍길동'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {currentLanguage === 'en' ? 'Email' : '이메일'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {currentLanguage === 'en' ? 'Phone' : '연락처'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="010-1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {currentLanguage === 'en' ? 'Inquiry Type' : '문의 유형'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
                  >
                    <option value="">{currentLanguage === 'en' ? 'Please select' : '선택해 주세요'}</option>
                    {inquiryCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {currentLanguage === 'en' ? 'Message' : '문의 내용'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all resize-none"
                  placeholder={currentLanguage === 'en' 
                    ? 'Please provide details about your inquiry...' 
                    : '문의하실 내용을 자세히 적어주세요...'}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'sending' 
                  ? (currentLanguage === 'en' ? 'Sending...' : '전송 중...') 
                  : (currentLanguage === 'en' ? 'Submit Inquiry' : '문의하기')}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {currentLanguage === 'en' 
                      ? 'Your inquiry has been successfully submitted. We will respond as soon as possible.' 
                      : '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.'}
                  </span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* 본사 방문 안내 CTA */}
      <section className="py-12 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 text-center border-2 border-primary-100 dark:border-primary-900"
          >
            <div className="text-5xl mb-4">📍</div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {currentLanguage === 'en' ? 'Want to visit our headquarters?' : '본사 방문을 원하시나요?'}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              {currentLanguage === 'en' 
                ? 'Check the location and directions to Jungho Group headquarters' 
                : '정호그룹 본사의 위치와 교통편 안내를 확인하세요'}
            </p>
            <button
              onClick={() => window.location.href = '/about/location'}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-primary-700 hover:to-primary-800 transform transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{currentLanguage === 'en' ? 'View Directions' : '오시는 길 보기'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{COMPANY_INFO.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{currentLanguage === 'en' ? 'Weekdays 09:00 - 18:00' : '평일 09:00 - 18:00'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                자주 묻는 질문
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                고객님들이 자주 문의하시는 내용입니다
              </p>
            </motion.div>

            {faqs.map((faqCategory, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="mb-8">
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3 text-sm">
                    {idx + 1}
                  </span>
                  {faqCategory.category}
                </h3>
                <div className="space-y-4">
                  {faqCategory.questions.map((faq, faqIdx) => (
                    <div
                      key={faqIdx}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start mb-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          Q
                        </span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {faq.q}
                        </h4>
                      </div>
                      <div className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          A
                        </span>
                        <p className="text-gray-600 dark:text-gray-400">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;

