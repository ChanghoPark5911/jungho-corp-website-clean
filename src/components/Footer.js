import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [familySitesOpen, setFamilySitesOpen] = useState(false);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const footerMenus = {
    jungho: {
      title: 'JUNGHO',
      links: [
        { label: '정호소개', path: '/hybrid/about/intro' },
        { label: '비전', path: '/hybrid/about/vision' },
        { label: '경영방침', path: '/hybrid/about/management' },
        { label: '연혁 및 성과', path: '/hybrid/about/history' },
        { label: 'CI', path: '/hybrid/about/ci' },
      ]
    },
    subsidiaries: {
      title: 'SUBSIDIARIES',
      links: [
        { label: '정호티엘씨', path: '/hybrid/subsidiaries/jungho-tlc' },
        { label: '클라루스', path: '/hybrid/subsidiaries/clarus' },
        { label: '일루텍', path: '/hybrid/subsidiaries/illutech' },
        { label: '정호텍스컴', path: '/hybrid/subsidiaries/jungho-texcom' },
      ]
    },
    business: {
      title: 'BUSINESS',
      links: [
        { label: '프로젝트', path: '/hybrid/projects' },
      ]
    },
    news: {
      title: 'NEWS',
      links: [
        { label: 'PR', path: '/hybrid/news' },
      ]
    },
    customer: {
      title: 'CUSTOMER',
      links: [
        { label: '고객문의', path: '/hybrid/support/contact' },
        { label: '자료실', path: '/hybrid/media/technical-docs' },
      ]
    }
  };

  const familySites = [
    { label: 'Magic CLARUS', url: 'https://www.magicclarus.com/' },
    { label: 'REDSSOCKSOO', url: 'https://www.redssocksoo.com/' },
  ];

  return (
    <footer className="bg-[#0e1841] text-white font-pretendard">
      {/* 상단 메뉴 영역 */}
      <div className="max-w-6xl mx-auto px-8 pt-12 pb-10">
        <div className="flex flex-wrap justify-between gap-8">
          {/* JUNGHO */}
          <div className="min-w-[100px]">
            <h3 className="text-[15px] font-bold mb-5 text-white tracking-wide">{footerMenus.jungho.title}</h3>
            <ul className="space-y-3">
              {footerMenus.jungho.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SUBSIDIARIES */}
          <div className="min-w-[100px]">
            <h3 className="text-[15px] font-bold mb-5 text-white tracking-wide">{footerMenus.subsidiaries.title}</h3>
            <ul className="space-y-3">
              {footerMenus.subsidiaries.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* BUSINESS */}
          <div className="min-w-[80px]">
            <h3 className="text-[15px] font-bold mb-5 text-white tracking-wide">{footerMenus.business.title}</h3>
            <ul className="space-y-3">
              {footerMenus.business.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWS */}
          <div className="min-w-[60px]">
            <h3 className="text-[15px] font-bold mb-5 text-white tracking-wide">{footerMenus.news.title}</h3>
            <ul className="space-y-3">
              {footerMenus.news.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
                </div>

          {/* CUSTOMER */}
          <div className="min-w-[80px]">
            <h3 className="text-[15px] font-bold mb-5 text-white tracking-wide">{footerMenus.customer.title}</h3>
            <ul className="space-y-3">
              {footerMenus.customer.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
              </div>
              
          {/* 개인정보처리방침 + Family Sites + SNS */}
          <div className="min-w-[140px]">
            {/* 개인정보처리방침 */}
            <a
              href="/hybrid/privacy"
              onClick={(e) => handleLinkClick(e, '/hybrid/privacy')}
              className="block text-[15px] font-bold text-white hover:text-gray-300 transition-colors mb-5 tracking-wide"
            >
              개인정보처리방침
            </a>

            {/* Family Sites 드롭다운 */}
            <div className="relative mb-4">
              <button
                onClick={() => setFamilySitesOpen(!familySitesOpen)}
                className="w-[140px] flex items-center justify-between px-4 py-2.5 bg-[#1a2a5e] border border-[#2a3a6e] rounded text-white text-[13px]"
              >
                <span>Family Sites</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${familySitesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
              </button>
              {familySitesOpen && (
                <div className="absolute bottom-full left-0 w-[140px] mb-1 bg-[#1a2a5e] border border-[#2a3a6e] rounded shadow-lg overflow-hidden z-10">
                  {familySites.map((site, idx) => (
                    <a
                      key={idx}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-[13px] text-gray-300 hover:bg-[#2a3a6e] hover:text-white transition-colors"
                    >
                      {site.label}
                    </a>
                  ))}
                </div>
              )}
              </div>
              
            {/* SNS 아이콘 */}
            <div className="flex items-center space-x-2">
              {/* 네이버 블로그 */}
              <a
                href="https://blog.naver.com/junghocorp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#03C75A] rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="네이버 블로그"
              >
                <span className="text-white text-[10px] font-bold">Blog</span>
              </a>
              {/* 유튜브 */}
              <a
                href="https://www.youtube.com/@junghocorp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#FF0000] rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="유튜브"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* 인스타그램 */}
              <a
                href="https://www.instagram.com/junghocorp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#833AB4] rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="인스타그램"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 회사 정보 영역 */}
      <div className="border-t border-[#1a2a5e]">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* 로고 + 회사명 */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <img 
                src="/assets/logos/logo-jungho_ci.png" 
                alt="정호그룹 로고" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <span className="text-white font-bold text-xl tracking-wide">JUNGHO</span>
            </div>

            {/* 주소 및 연락처 + 저작권 */}
            <div className="flex-1 text-[13px] leading-relaxed" style={{ color: '#ffffff' }}>
              <p className="!text-white" style={{ color: '#ffffff' }}>[서울 본사] 서울특별시 강남구 언주로116길 17 정호빌딩</p>
              <p className="!text-white" style={{ color: '#ffffff' }}>[면목동 연구소] 서울특별시 중랑구 면목로34길 5 일루택빌딩</p>
              <p className="!text-white" style={{ color: '#ffffff' }}>대표번호 : 02-553-3631</p>
              <p className="!text-white mt-3" style={{ color: '#ffffff' }}>COPYRIGHT © 2027 JUNGHOCORP. ALL RIGHT RESERVED</p>
              {/* 관리자 모드 진입 (은은한 버튼) */}
              <Link
                to="/admin"
                className="inline-block mt-4 text-[11px] tracking-wide transition-opacity hover:opacity-70"
                style={{ color: 'rgba(255, 255, 255, 0.3)' }}
                title="통합 관리자"
              >
                관리자 모드
              </Link>
            </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
