import React from 'react';
import SubsidiaryDetailTemplate from './SubsidiaryDetailTemplate';

const TlcDetailPage = () => {
  const data = {
    name: '정호티엘씨',
    nameEn: 'Jungho TLC',
    slogan: '안정적인 빌딩 자동화의 파트너',
    icon: '💡',
    established: '1982',
    business: '조명·전력 통합 제어',
    colorFrom: 'from-primary-50',
    colorTo: 'to-green-50',
    darkColor: 'green-900/20',
    textColor: 'text-primary-600',
    darkTextColor: 'text-primary-400',
    buttonBg: 'bg-primary-600',
    buttonHover: 'hover:bg-primary-700',
    cardFrom: 'from-primary-50',
    cardTo: 'to-green-50',
    borderColor: 'border-primary-200',
    description: [
      '정호티엘씨는 조명·전력 통합 감시·제어(SI/FMS)와 스마트 주차장 조명등의 풍부한 국내 납품 실적을 바탕으로 대규모 현장의 안정적인 운영을 지원합니다.',
      '전력제어, 조명제어, SI/FMS 등 빌딩 자동 제어 분야에서 40년 이상 축적된 기술력을 바탕으로 시장을 선도하고 있습니다.',
      '고객 맞춤형 솔루션 제공을 통해 에너지 절감과 사용자 편의성을 동시에 실현하고 있습니다.'
    ],
    products: [
      {
        name: '조명 제어 시스템',
        description: '빌딩 및 시설물 조명 자동화 제어',
        icon: '🏢'
      },
      {
        name: '에너지 관리 시스템',
        description: '실시간 에너지 모니터링 및 최적화',
        icon: '⚡'
      },
      {
        name: '빌딩 자동화',
        description: '스마트 빌딩 통합 관리 솔루션',
        icon: '🏗️'
      }
    ],
    strengths: [
      {
        title: '40년 노하우',
        description: '1982년부터 축적된 조명 제어 기술과 경험',
        icon: '🏆'
      },
      {
        title: '기술력',
        description: '국내외 인증 획득 및 특허 보유',
        icon: '🔬'
      },
      {
        title: '에너지 절감',
        description: '최대 40% 에너지 절감 가능한 솔루션',
        icon: '🌱'
      },
      {
        title: '고객 맞춤',
        description: '프로젝트별 최적화된 솔루션 제공',
        icon: '🎯'
      }
    ],
    contact: {
      phone: '02-515-5018',
      email: 'tlc@junghocorp.com',
      address: '서울시 강남구 논현로116길 17 정호빌딩 3층'
    },
    website: null
  };

  return <SubsidiaryDetailTemplate data={data} />;
};

export default TlcDetailPage;

