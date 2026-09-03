import React from 'react';
import SubsidiaryDetailTemplate from './SubsidiaryDetailTemplate';

const RssDetailPage = () => {
  const data = {
    name: '알에스에스',
    nameEn: 'RSS',
    slogan: '데이터 기반 솔루션',
    icon: '📊',
    logoUrl: '/images/logos/rss.png',
    established: '2020',
    business: '데이터 솔루션',
    colorFrom: 'from-green-50',
    colorTo: 'to-emerald-50',
    darkColor: 'green-900/20',
    textColor: 'text-green-600',
    darkTextColor: 'text-green-400',
    buttonBg: 'bg-green-600',
    buttonHover: 'hover:bg-green-700',
    cardFrom: 'from-green-50',
    cardTo: 'to-emerald-50',
    borderColor: 'border-green-200',
    description: [
      'RSS는 데이터 분석 및 관리 솔루션을 제공하는 정호그룹의 신규 계열사입니다.',
      '빅데이터 분석, 클라우드 시스템 구축, 시스템 통합 등 기업의 디지털 혁신을 지원합니다.',
      '축적된 데이터를 기반으로 최적의 의사결정을 지원하는 지능형 솔루션을 개발하고 있습니다.'
    ],
    products: [
      {
        name: '데이터 분석',
        description: '빅데이터 수집, 분석, 시각화',
        icon: '📈'
      },
      {
        name: '시스템 통합',
        description: '기업 시스템 통합 및 최적화',
        icon: '🔗'
      },
      {
        name: '클라우드 솔루션',
        description: '클라우드 기반 인프라 구축',
        icon: '☁️'
      }
    ],
    strengths: [
      {
        title: '데이터 전문성',
        description: '빅데이터 분석 및 활용 노하우',
        icon: '📊'
      },
      {
        title: '최신 기술',
        description: 'AI, 머신러닝 기반 솔루션',
        icon: '🤖'
      },
      {
        title: '통합 관리',
        description: '원스톱 시스템 통합 서비스',
        icon: '🎯'
      },
      {
        title: '맞춤형',
        description: '기업별 맞춤형 솔루션',
        icon: '🔧'
      }
    ],
    contact: {
      phone: '02-515-5018',
      email: 'rss@junghocorp.com',
      address: '서울시 강남구 논현로116길 17 정호빌딩 3층'
    },
    website: null
  };

  return <SubsidiaryDetailTemplate data={data} />;
};

export default RssDetailPage;

