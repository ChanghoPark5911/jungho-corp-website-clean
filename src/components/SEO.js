import React, { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  structuredData 
}) => {
  const defaultTitle = '정호그룹 - 조명제어 전문기업 | 40년 전통의 조명솔루션';
  const defaultDescription = '정호그룹은 40년 전통의 조명제어 전문기업으로, 클라러스, TLC, 일루테크, 텍스컴 등 계열사를 통해 AI, IoT, 물류, 텍스타일 분야의 혁신적인 솔루션을 제공합니다.';
  const defaultKeywords = '정호그룹, 조명제어, 클라러스, TLC, 일루테크, 텍스컴, LED조명, 스마트조명, IoT, AI, 물류, 텍스타일, 조명시스템, 조명제어시스템, 조명솔루션';
  const defaultImage = 'https://www.junghocorp.com/og-image.jpg';
  const defaultUrl = 'https://www.junghocorp.com';

  const seoTitle = title ? `${title} | 정호그룹` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  useEffect(() => {
    // 페이지 제목 업데이트
    document.title = seoTitle;
    
    // 메타 태그 업데이트
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);
    updateMetaTag('og:title', seoTitle);
    updateMetaTag('og:description', seoDescription);
    updateMetaTag('og:image', seoImage);
    updateMetaTag('og:url', seoUrl);
    updateMetaTag('twitter:title', seoTitle);
    updateMetaTag('twitter:description', seoDescription);
    updateMetaTag('twitter:image', seoImage);
    
    // 구조화된 데이터 추가
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
      
      return () => {
        // 컴포넌트 언마운트 시 스크립트 제거
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(s => {
          if (s.text === JSON.stringify(structuredData)) {
            s.remove();
          }
        });
      };
    }
  }, [seoTitle, seoDescription, seoKeywords, seoImage, seoUrl, structuredData]);

  const updateMetaTag = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`) || 
               document.querySelector(`meta[property="${name}"]`);
    
    if (meta) {
      meta.setAttribute('content', content);
    } else {
      meta = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    }
  };

  return null; // SEO 컴포넌트는 렌더링하지 않음
};

export default SEO;