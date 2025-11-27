import React from 'react';
import MegaMenu from './MegaMenu';
import Footer from '../Footer';
import ThemeToggle from '../ThemeToggle';

/**
 * Hybrid 버전 전용 레이아웃
 * - V2의 MegaMenu 사용
 * - 풀 너비 레이아웃 (사이드바 없음)
 * - Hybrid 디자인 스타일 유지
 */
const HybridLayout = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* MegaMenu with Hybrid version */}
      <MegaMenu version="hybrid" />
      
      {/* 메인 콘텐츠 - 풀 너비 */}
      <main className={`w-full ${className}`}>
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* 다크모드 토글 버튼 */}
      <ThemeToggle />
    </div>
  );
};

export default HybridLayout;

