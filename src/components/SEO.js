import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author = '정호그룹',
  publishedTime,
  modifiedTime,
  structuredData,
  children,
}) => {
  const siteTitle = '정호그룹 - 40년 전통의 조명제어 전문기업';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = '정호그룹은 40년간 조명제어 분야에서 전문성을 쌓아온 기업으로, 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다.';
  const defaultImage = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
  const defaultUrl = 'https://jungho-corp.com';

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      
      {/* Open Graph 메타 태그 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="ko_KR" />
      
      {/* Twitter Card 메타 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* 추가 메타 태그 */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* 시간 관련 메타 태그 */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* 구조화된 데이터 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* 기본 구조화된 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "정호그룹",
          "alternateName": "JUNGHO GROUP",
          "url": "https://jungho-corp.com",
          "logo": "https://jungho-corp.com/logo.png",
          "description": "40년 전통의 조명제어 전문기업",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "서울특별시 강남구 논현로 116길 17",
            "addressLocality": "서울",
            "addressRegion": "강남구",
            "postalCode": "06123",
            "addressCountry": "KR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+82-2-1234-5678",
            "contactType": "customer service",
            "availableLanguage": "Korean"
          },
          "sameAs": [
            "https://www.youtube.com/@junghogroup",
            "https://blog.naver.com/junghogroup",
            "https://www.instagram.com/junghogroup"
          ]
        })}
      </script>
      
      {/* 웹사이트 구조화된 데이터 */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "정호그룹",
          "url": "https://jungho-corp.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://jungho-corp.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {children}
    </Helmet>
  );
};

// 특화된 SEO 컴포넌트들
export const HomePageSEO = () => (
  <SEO
    title="홈"
    description="정호그룹은 40년간 조명제어 분야에서 전문성을 쌓아온 기업으로, 혁신적인 기술과 완벽한 서비스로 고객의 성공을 지원합니다."
    keywords={['조명제어', '스마트조명', 'IoT', '정호그룹', '조명기술', '조명시스템']}
    structuredData={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "정호그룹 홈페이지",
      "description": "40년 전통의 조명제어 전문기업 정호그룹 공식 웹사이트",
      "publisher": {
        "@type": "Organization",
        "name": "정호그룹"
      }
    }}
  />
);

export const BusinessPageSEO = () => (
  <SEO
    title="사업영역"
    description="정호그룹의 사업영역을 소개합니다. 스마트 빌딩 조명제어, 도시 조명 인프라, 산업용 조명시스템, 문화시설 조명예술 등 다양한 분야에서 혁신적인 솔루션을 제공합니다."
    keywords={['사업영역', '조명제어', '스마트빌딩', '도시조명', '산업용조명', '문화시설조명', '정호그룹']}
    structuredData={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "정호그룹 사업영역",
      "description": "정호그룹의 핵심 사업영역과 기술력을 소개합니다",
      "publisher": {
        "@type": "Organization",
        "name": "정호그룹"
      }
    }}
  />
);

export const ProjectsPageSEO = () => (
  <SEO
    title="프로젝트"
    description="정호그룹이 40년간 완성한 주요 프로젝트들을 소개합니다. 삼성전자, 서울시, 롯데월드타워 등 다양한 분야의 성공 사례를 확인하세요."
    keywords={['프로젝트', '포트폴리오', '성공사례', '조명제어프로젝트', '정호그룹', '프로젝트갤러리']}
    structuredData={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "정호그룹 프로젝트",
      "description": "정호그룹의 주요 프로젝트와 성공 사례를 소개합니다",
      "publisher": {
        "@type": "Organization",
        "name": "정호그룹"
      }
    }}
  />
);

export const SupportPageSEO = () => (
  <SEO
    title="고객지원"
    description="정호그룹의 고객지원 서비스를 소개합니다. 전화, 이메일, 카카오톡, 온라인 문의 등 다양한 채널을 통해 전문가의 도움을 받으실 수 있습니다."
    keywords={['고객지원', '기술지원', '문의', '상담', '유지보수', '정호그룹', '고객서비스']}
    structuredData={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "정호그룹 고객지원",
      "description": "정호그룹의 고객지원 서비스와 문의 방법을 안내합니다",
      "publisher": {
        "@type": "Organization",
        "name": "정호그룹"
      }
    }}
  />
);

export const NewsPageSEO = () => (
  <SEO
    title="뉴스"
    description="정호그룹의 최신 뉴스와 소식을 확인하세요. 기술 개발, 프로젝트 완료, 수상 소식 등 다양한 업계 동향을 제공합니다."
    keywords={['뉴스', '소식', '기술개발', '프로젝트', '수상', '정호그룹', '업계동향']}
    structuredData={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "정호그룹 뉴스",
      "description": "정호그룹의 최신 뉴스와 소식을 제공합니다",
      "publisher": {
        "@type": "Organization",
        "name": "정호그룹"
      }
    }}
  />
);

export const SubsidiaryPageSEO = ({ subsidiary }) => (
  <SEO
    title={subsidiary.name}
    description={subsidiary.description}
    keywords={[...subsidiary.keywords || [], '정호그룹', '계열사']}
    structuredData={{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": subsidiary.name,
      "alternateName": subsidiary.englishName,
      "description": subsidiary.description,
      "parentOrganization": {
        "@type": "Organization",
        "name": "정호그룹"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": subsidiary.address
      }
    }}
  />
);

export const ArticleSEO = ({ article }) => (
  <SEO
    title={article.title}
    description={article.description}
    keywords={article.keywords || []}
    image={article.image}
    type="article"
    publishedTime={article.publishedAt}
    modifiedTime={article.updatedAt}
    structuredData={{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "image": article.image,
      "author": {
        "@type": "Organization",
        "name": "정호그룹"
      },
      "publisher": {
        "@type": "Organization",
        "name": "정호그룹",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jungho-corp.com/logo.png"
        }
      },
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt
    }}
  />
);

export default SEO; 