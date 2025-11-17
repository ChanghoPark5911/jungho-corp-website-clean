import React from 'react';
import MegaMenu from './MegaMenu';
import Footer from '../Footer';
import ThemeToggle from '../ThemeToggle';

/**
 * v2 레이아웃 컴포넌트
 * MegaMenu + 컨텐츠 + Footer + 다크모드 토글
 */
const LayoutV2 = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <MegaMenu />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      
      {/* 다크모드 토글 버튼 */}
      <ThemeToggle />
    </div>
  );
};

export default LayoutV2;

