import React from 'react';
import { useI18n } from '../../hooks/useI18n';

/**
 * 한국어가 아닌 언어를 선택했을 때 페이지가 한국어로만 제공됨을 알리는 안내 배너
 */
const LanguageNotice = () => {
  const { currentLanguage } = useI18n();

  // 한국어일 경우 아무것도 표시하지 않음
  if (currentLanguage === 'ko') {
    return null;
  }

  const messages = {
    en: {
      title: 'Language Notice',
      content: 'This page is currently available in Korean only. For detailed information in English, please contact us.',
      contact: 'Contact Us',
      email: 'info@jungho.com',
      phone: '02-553-3631'
    },
    zh: {
      title: '语言说明',
      content: '此页面目前仅提供韩语版本。如需中文详细信息，请联系我们。',
      contact: '联系我们',
      email: 'info@jungho.com',
      phone: '02-553-3631'
    },
    ja: {
      title: '言語に関するお知らせ',
      content: 'このページは現在韓国語のみで提供されています。日本語での詳細情報については、お問い合わせください。',
      contact: 'お問い合わせ',
      email: 'info@jungho.com',
      phone: '02-553-3631'
    }
  };

  const message = messages[currentLanguage] || messages.en;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 py-2 px-4 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg 
              className="h-5 w-5 text-blue-500 mt-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              {message.title}
            </h3>
            <p className="text-sm text-blue-700 mb-2">{message.content}</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <a 
                href={`mailto:${message.email}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {message.email}
              </a>
              <span className="text-blue-600">|</span>
              <a 
                href={`tel:${message.phone}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {message.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageNotice;

