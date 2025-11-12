import React from 'react';
import SubsidiaryDetailTemplate from './SubsidiaryDetailTemplate';
import { useI18n } from '../../../hooks/useI18n';

const TlcDetailPage = () => {
  const { currentLanguage } = useI18n();
  
  const data = {
    subsidiaryId: 'tlc', // PDF 자료 필터링용
    name: '정호티엘씨',
    nameEn: 'Jungho TLC',
    logoUrl: '/images/logos/junghotlc.png', // 로고 추가
    slogan: currentLanguage === 'en' 
      ? 'Partner for Stable Building Automation'
      : '안정적인 빌딩 자동화의 파트너',
    icon: '💡',
    established: '1982',
    business: currentLanguage === 'en'
      ? 'Integrated Lighting & Power Control'
      : '조명·전력 통합 제어',
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
    description: currentLanguage === 'en' ? [
      'Jungho TLC supports stable operation of large-scale sites based on extensive domestic delivery experience in integrated lighting and power monitoring/control (SI/FMS) and smart parking lot lighting.',
      'We are leading the market based on over 40 years of accumulated technology in building automation control fields such as power control, lighting control, and SI/FMS.',
      'We simultaneously realize energy savings and user convenience through providing customized solutions for our customers.'
    ] : [
      '정호티엘씨는 조명·전력 통합 감시·제어(SI/FMS)와 스마트 주차장 조명등의 풍부한 국내 납품 실적을 바탕으로 대규모 현장의 안정적인 운영을 지원합니다.',
      '전력제어, 조명제어, SI/FMS 등 빌딩 자동 제어 분야에서 40년 이상 축적된 기술력을 바탕으로 시장을 선도하고 있습니다.',
      '고객 맞춤형 솔루션 제공을 통해 에너지 절감과 사용자 편의성을 동시에 실현하고 있습니다.'
    ],
    products: [
      {
        name: currentLanguage === 'en' ? 'Lighting Control System' : '조명 제어 시스템',
        description: currentLanguage === 'en' 
          ? 'Building and facility lighting automation control'
          : '빌딩 및 시설물 조명 자동화 제어',
        icon: '🏢'
      },
      {
        name: currentLanguage === 'en' ? 'Energy Management System' : '에너지 관리 시스템',
        description: currentLanguage === 'en'
          ? 'Real-time energy monitoring and optimization'
          : '실시간 에너지 모니터링 및 최적화',
        icon: '⚡'
      },
      {
        name: currentLanguage === 'en' ? 'Building Automation' : '빌딩 자동화',
        description: currentLanguage === 'en'
          ? 'Smart building integrated management solution'
          : '스마트 빌딩 통합 관리 솔루션',
        icon: '🏗️'
      }
    ],
    strengths: [
      {
        title: currentLanguage === 'en' ? '40 Years of Expertise' : '40년 노하우',
        description: currentLanguage === 'en'
          ? 'Lighting control technology and experience accumulated since 1982'
          : '1982년부터 축적된 조명 제어 기술과 경험',
        icon: '🏆'
      },
      {
        title: currentLanguage === 'en' ? 'Technical Capabilities' : '기술력',
        description: currentLanguage === 'en'
          ? 'Domestic and international certifications and patents'
          : '국내외 인증 획득 및 특허 보유',
        icon: '🔬'
      },
      {
        title: currentLanguage === 'en' ? 'Energy Savings' : '에너지 절감',
        description: currentLanguage === 'en'
          ? 'Solutions enabling up to 40% energy savings'
          : '최대 40% 에너지 절감 가능한 솔루션',
        icon: '🌱'
      },
      {
        title: currentLanguage === 'en' ? 'Customization' : '고객 맞춤',
        description: currentLanguage === 'en'
          ? 'Optimized solutions for each project'
          : '프로젝트별 최적화된 솔루션 제공',
        icon: '🎯'
      }
    ],
    contact: {
      phone: '02-515-5018',
      email: 'tlc@junghocorp.com',
      address: currentLanguage === 'en'
        ? '3F, Jungho Building, 17, Nonhyeon-ro 116-gil, Gangnam-gu, Seoul'
        : '서울시 강남구 논현로116길 17 정호빌딩 3층'
    },
    website: null
  };

  return <SubsidiaryDetailTemplate data={data} />;
};

export default TlcDetailPage;

