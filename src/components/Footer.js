import React from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_INFO, SUBSIDIARIES, SOCIAL_LINKS } from '../utils/constants';
import { Typography } from './ui';
import { useI18n } from '../hooks/useI18n';

const Footer = () => {
  const { t } = useI18n();
  const location = useLocation();
  
  // 현재 경로에 따라 관리자 페이지 링크 결정
  const isHybridVersion = location.pathname.startsWith('/hybrid');
  const adminLink = isHybridVersion ? '/admin-new/login' : '/admin';
  // SNS 링크
  const socialLinks = [
    {
      name: 'youtube',
      url: SOCIAL_LINKS.youtube,
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'naver-blog',
      url: SOCIAL_LINKS.naverBlog,
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
        </svg>
      )
    },
    {
      name: 'instagram',
      url: SOCIAL_LINKS.instagram,
      icon: (
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
        </svg>
      )
    }
  ];

  // 링크 클릭 핸들러
  const handleLinkClick = (path) => {
    window.location.href = path;
  };

  return (
    <footer className="bg-primary text-white">
      {/* 상단 섹션 */}
      <div className="max-w-7xl mx-auto px-container-mobile md:px-container-tablet lg:px-container-desktop py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          
          {/* 회사 정보 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm md:text-lg">정</span>
              </div>
              <Typography variant="h4" className="text-white">
                {COMPANY_INFO.englishName}
              </Typography>
            </div>
            <div className="space-y-2 md:space-y-3">
              <p className="flex items-start text-xs md:text-sm text-white">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 mt-0.5 md:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{COMPANY_INFO.address.main}</span>
              </p>
              <p className="flex items-center text-xs md:text-sm text-white">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{COMPANY_INFO.contact.phone}</span>
              </p>
              <p className="flex items-center text-xs md:text-sm text-white">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{COMPANY_INFO.contact.email}</span>
              </p>
            </div>
          </div>

          {/* 계열사 링크 */}
          <div className="lg:col-span-2">
            <Typography variant="h4" className="mb-4 md:mb-6 text-white">
              {t('footer.subsidiaries')}
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {Object.entries(SUBSIDIARIES).map(([key, subsidiary]) => (
                <div key={key}>
                  <Typography variant="h6" className="text-secondary mb-2 md:mb-3">
                    {t(`subsidiaries.${key}`) || subsidiary.name}
                  </Typography>
                  <ul className="space-y-1 md:space-y-2">
                    {subsidiary.pages.map((page, index) => (
                      <li key={index}>
                        <a
                          href={page.path}
                          onClick={() => handleLinkClick(page.path)}
                          className="text-xs md:text-sm text-white hover:text-secondary transition-colors duration-200 block"
                        >
                          {page.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 고객지원 */}
          <div className="lg:col-span-1">
            <Typography variant="h4" className="mb-4 md:mb-6 text-white">
              {t('footer.support')}
            </Typography>
            <div className="space-y-3 md:space-y-4">
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="flex items-center mb-1 md:mb-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-medium text-sm md:text-base">{t('footer.contactPhone')}</span>
                </div>
                <p className="text-base md:text-lg font-bold text-secondary">{COMPANY_INFO.support.phone.number}</p>
                                    <p className="text-xs text-white mt-1">{COMPANY_INFO.support.phone.hours}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="flex items-center mb-1 md:mb-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-sm md:text-base">{t('footer.email')}</span>
                </div>
                <p className="text-secondary font-medium text-sm md:text-base">{COMPANY_INFO.support.email.address}</p>
                                    <p className="text-xs text-white mt-1">{COMPANY_INFO.support.email.hours}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="flex items-center mb-1 md:mb-2">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="font-medium text-sm md:text-base">{t('footer.kakaoTalk')}</span>
                </div>
                <p className="text-secondary font-medium text-sm md:text-base">{COMPANY_INFO.support.kakaoTalk.id}</p>
                                    <p className="text-xs text-white mt-1">{COMPANY_INFO.support.kakaoTalk.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-600"></div>

      {/* 하단 섹션 */}
      <div className="max-w-7xl mx-auto px-container-mobile md:px-container-tablet lg:px-container-desktop py-4 md:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          
          {/* 저작권 및 약관 */}
                      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 text-xs md:text-sm text-white">
            <p>Copyright (C) 2019 Jungho {t('footer.copyright')}.</p>
            <div className="flex items-center space-x-3 md:space-x-4">
              <a
                href="/privacy"
                onClick={() => handleLinkClick('/privacy')}
                className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                {t('footer.privacy')}
              </a>
                              <span className="text-white">|</span>
              <a
                href="/terms"
                onClick={() => handleLinkClick('/terms')}
                className="hover:text-secondary transition-colors duration-200"
              >
                {t('footer.terms')}
              </a>
              <span className="text-white/30">|</span>
              <a
                href={adminLink}
                className="text-white/50 hover:text-secondary transition-colors duration-200 text-xs"
                title="관리자 페이지"
              >
                Admin
              </a>
            </div>
          </div>

          {/* SNS 아이콘 */}
          <div className="flex items-center space-x-3 md:space-x-4">
                            <span className="text-xs md:text-sm text-white mr-2">{t('footer.followUs')}</span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                                  className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:text-secondary hover:bg-white/20 transition-all duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 