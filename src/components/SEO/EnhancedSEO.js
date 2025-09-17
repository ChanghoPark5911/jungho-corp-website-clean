import React from 'react';
import { Helmet } from 'react-helmet';

const EnhancedSEO = ({ 
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const siteName = '정호그룹';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = '정호그룹은 40년 전통의 조명제어 전문기업으로, 혁신적인 기술과 품질로 더 나은 미래를 만들어갑니다.';
  const defaultKeywords = ['조명제어', '스마트조명', 'LED조명', '정호그룹', '조명시스템', '조명설계'];

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={[...keywords, ...defaultKeywords].join(', ')} />
      <meta name="author" content={author || siteName} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* 구조화된 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "description": defaultDescription,
          "url": "https://jungho-group.com",
          "logo": "https://jungho-group.com/logo.png",
          "foundingDate": "1983",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "KR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service"
          }
        })}
      </script>
      
      {/* 추가 메타 태그 */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* 캐시 제어 */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
    </Helmet>
  );
};

export default EnhancedSEO;


















