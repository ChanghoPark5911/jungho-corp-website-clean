import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  // 이미지 데이터 상태
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    // localStorage에서 이미지 데이터 로드
    const savedImages = localStorage.getItem('imageData');
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages);
        setImageData(parsed);
      } catch (error) {
        console.error('이미지 데이터 파싱 오류:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header imageData={imageData} />
      <main className="flex-grow pt-15 md:pt-18 lg:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 