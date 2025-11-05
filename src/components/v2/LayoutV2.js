import React from 'react';
import MegaMenu from './MegaMenu';
import Footer from '../Footer';

/**
 * v2 레이아웃 컴포넌트
 * MegaMenu + 컨텐츠 + Footer
 */
const LayoutV2 = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutV2;

