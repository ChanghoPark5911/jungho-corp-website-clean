import React from 'react';
import SubsidiaryDetailTemplate from './SubsidiaryDetailTemplate';

const TexcomDetailPage = () => {
  const data = {
    name: '정호텍스컴',
    nameEn: 'Jungho TEXCOM',
    slogan: '섬유 산업과 패션을 잇는 가교',
    icon: '👔',
    established: '1982',
    business: '섬유기계·시험기, 패션',
    colorFrom: 'from-purple-50',
    colorTo: 'to-pink-50',
    darkColor: 'purple-900/20',
    textColor: 'text-purple-600',
    darkTextColor: 'text-purple-400',
    buttonBg: 'bg-purple-600',
    buttonHover: 'hover:bg-purple-700',
    cardFrom: 'from-purple-50',
    cardTo: 'to-pink-50',
    borderColor: 'border-purple-200',
    description: [
      '1982년 설립 이후, 세계적인 섬유기계 및 시험기를 국내에 독점 공급하며 섬유 산업의 발전에 기여해온 정호텍스컴입니다.',
      '이제 B2B 경험을 바탕으로 패션 B2C 분야까지 확장하며, 섬유와 패션의 미래를 함께 만들어갑니다.',
      '최신 패션 트렌드와 기술력을 결합하여 고객과 함께 더 밝은 미래로 동반하고 있습니다.'
    ],
    products: [
      {
        name: '섬유기계',
        description: '독일 SAURER, BENNINGER, 스위스 LUWA 등 세계 유수 브랜드 독점 공급',
        icon: '🏭'
      },
      {
        name: '섬유 시험기',
        description: '독일 TEXTECHNO, 오스트리아 LENZING, 일본 KATO TECH 등',
        icon: '🔬'
      },
      {
        name: 'TAF (The Auto Finder)',
        description: '고성능 현미경 자동 탐색기기 (자체 개발)',
        icon: '🔍'
      },
      {
        name: '기술 지원',
        description: '설치, 작동법 교육, 유지보수 원스톱 서비스',
        icon: '🛠️'
      }
    ],
    strengths: [
      {
        title: '글로벌 파트너십',
        description: '독일, 스위스, 오스트리아, 일본 등 세계 유수 브랜드 독점 공급',
        icon: '🌍'
      },
      {
        title: '40년 경험',
        description: '1982년부터 축적된 섬유 산업 전문성',
        icon: '🏆'
      },
      {
        title: '원스톱 서비스',
        description: '상담, 수입, 납품, 설치, 교육, 유지보수까지',
        icon: '🔧'
      },
      {
        title: 'B2B에서 B2C로',
        description: '섬유 기계 전문성을 바탕으로 패션까지 확장',
        icon: '🚀'
      }
    ],
    contact: {
      phone: '02-538-3652',
      email: 'sales@junghocorp.com',
      address: '서울시 강남구 논현로116길 17 정호빌딩 3층'
    },
    website: 'http://www.theautofinder.com'
  };

  return <SubsidiaryDetailTemplate data={data} />;
};

export default TexcomDetailPage;

