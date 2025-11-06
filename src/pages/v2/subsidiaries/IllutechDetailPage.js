import React from 'react';
import SubsidiaryDetailTemplate from './SubsidiaryDetailTemplate';

const IllutechDetailPage = () => {
  const data = {
    name: '일루텍',
    nameEn: 'ILLUTECH',
    slogan: '산업·특수 LED 조명의 전문가',
    icon: '💡',
    established: '2010',
    business: '산업·특수 LED 조명',
    colorFrom: 'from-orange-50',
    colorTo: 'to-amber-50',
    darkColor: 'orange-900/20',
    textColor: 'text-orange-600',
    darkTextColor: 'text-orange-400',
    buttonBg: 'bg-orange-600',
    buttonHover: 'hover:bg-orange-700',
    cardFrom: 'from-orange-50',
    cardTo: 'to-amber-50',
    borderColor: 'border-orange-200',
    description: [
      '일루텍은 원전, 공공 인프라에 적용되는 산업·특수 LED 조명을 개발 및 제조하는 전문 기업입니다.',
      '원전용 LED 개발, 공급, 방폭, 고효율, KS 등 다양한 제조 경험과 인증을 보유하고 있습니다.',
      '까다로운 환경과 높은 안전 기준이 요구되는 산업 현장에 최적화된 LED 조명 솔루션을 제공합니다.'
    ],
    products: [
      {
        name: '원전용 LED 조명',
        description: '원자력 발전소용 특수 LED 조명',
        icon: '⚛️'
      },
      {
        name: '방폭형 LED 조명',
        description: '위험 지역용 방폭 인증 조명',
        icon: '🔥'
      },
      {
        name: '공공 인프라용 LED',
        description: '터널, 도로 등 공공시설 조명',
        icon: '🏗️'
      }
    ],
    strengths: [
      {
        title: '고효율 LED',
        description: '에너지 효율이 뛰어난 LED 기술',
        icon: '⚡'
      },
      {
        title: '친환경',
        description: '친환경 소재 및 제조 공정',
        icon: '🌿'
      },
      {
        title: '품질 관리',
        description: '엄격한 품질 관리 시스템',
        icon: '✅'
      },
      {
        title: '다양한 제품군',
        description: '용도별 맞춤형 LED 조명',
        icon: '🎨'
      }
    ],
    contact: {
      phone: '02-515-5018',
      email: 'illutech@junghocorp.com',
      address: '서울시 강남구 논현로116길 17 정호빌딩 3층'
    },
    website: null
  };

  return <SubsidiaryDetailTemplate data={data} />;
};

export default IllutechDetailPage;

