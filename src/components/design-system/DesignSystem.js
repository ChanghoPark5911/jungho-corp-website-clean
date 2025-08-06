import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Button,
  Card,
  Badge,
  Input,
  Select,
  Checkbox,
  Radio,
  Toggle,
  Modal,
  Alert,
  Progress,
  Spinner,
} from '../ui';

const DesignSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('colors');

  const tabs = [
    { id: 'colors', label: '컬러 시스템', icon: '🎨' },
    { id: 'typography', label: '타이포그래피', icon: '📝' },
    { id: 'components', label: '컴포넌트', icon: '🧩' },
    { id: 'spacing', label: '간격 시스템', icon: '📏' },
    { id: 'animations', label: '애니메이션', icon: '✨' },
  ];

  return (
    <>
      <Helmet>
        <title>디자인 시스템 | 정호그룹</title>
        <meta name="description" content="정호그룹 디자인 시스템 가이드" />
      </Helmet>

      <div className="min-h-screen bg-neutral-50">
        {/* 헤더 */}
        <header className="bg-white shadow-sm border-b border-neutral-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary-600">
                  정호그룹 디자인 시스템
                </h1>
                <p className="text-neutral-600 mt-2">
                  40년 전통의 조명제어 전문기업을 위한 완전한 디자인 시스템
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="primary">v1.0.0</Badge>
                <Button variant="outline" size="sm">
                  다운로드
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* 네비게이션 */}
        <nav className="bg-white border-b border-neutral-200 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* 메인 컨텐츠 */}
        <main className="container mx-auto px-4 py-8">
          {selectedTab === 'colors' && <ColorSystem />}
          {selectedTab === 'typography' && <TypographySystem />}
          {selectedTab === 'components' && <ComponentSystem />}
          {selectedTab === 'spacing' && <SpacingSystem />}
          {selectedTab === 'animations' && <AnimationSystem />}
        </main>

        {/* 모달 */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="디자인 시스템 정보"
        >
          <div className="space-y-4">
            <p className="text-neutral-600">
              정호그룹 디자인 시스템은 일관성 있고 확장 가능한 UI 컴포넌트 라이브러리입니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">주요 특징</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• 반응형 디자인</li>
                  <li>• 접근성 고려</li>
                  <li>• 성능 최적화</li>
                  <li>• 브랜드 일관성</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">기술 스택</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• React 18+</li>
                  <li>• Tailwind CSS</li>
                  <li>• CSS Variables</li>
                  <li>• TypeScript</li>
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

// 컬러 시스템
const ColorSystem = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">브랜드 컬러</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
          <div key={shade} className="text-center">
            <div
              className={`w-full h-20 rounded-lg mb-2 bg-primary-${shade} border border-neutral-200`}
            />
            <p className="text-sm font-medium text-neutral-900">Primary {shade}</p>
            <p className="text-xs text-neutral-500">var(--primary-{shade})</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">계열사별 컬러</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: 'Clarus', color: 'clarus-500', description: '조명제어 전문' },
          { name: 'TLC', color: 'tlc-500', description: '기술 지원' },
          { name: 'Illutech', color: 'illutech-500', description: '조명 쇼핑몰' },
          { name: 'Texcom', color: 'texcom-500', description: '통신 기술' },
        ].map((company) => (
          <Card key={company.name} className="text-center">
            <div
              className={`w-full h-16 rounded-lg mb-4 bg-${company.color}`}
            />
            <h3 className="font-semibold text-neutral-900">{company.name}</h3>
            <p className="text-sm text-neutral-600">{company.description}</p>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">액센트 컬러</h2>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {[50, 100, 500, 600, 700].map((shade) => (
          <div key={shade} className="text-center">
            <div
              className={`w-full h-20 rounded-lg mb-2 bg-accent-${shade} border border-neutral-200`}
            />
            <p className="text-sm font-medium text-neutral-900">Accent {shade}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// 타이포그래피 시스템
const TypographySystem = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">헤딩 스타일</h2>
      <div className="space-y-4">
        <div>
          <h1 className="text-h1 text-primary-600">Heading 1 - 메인 타이틀</h1>
          <p className="text-sm text-neutral-500 mt-2">font-size: clamp(2rem, 5vw, 3.5rem)</p>
        </div>
        <div>
          <h2 className="text-h2 text-primary-600">Heading 2 - 섹션 타이틀</h2>
          <p className="text-sm text-neutral-500 mt-2">font-size: clamp(1.75rem, 4vw, 2.5rem)</p>
        </div>
        <div>
          <h3 className="text-h3 text-primary-600">Heading 3 - 서브 타이틀</h3>
          <p className="text-sm text-neutral-500 mt-2">font-size: clamp(1.5rem, 3vw, 2rem)</p>
        </div>
        <div>
          <h4 className="text-h4 text-primary-600">Heading 4 - 카드 타이틀</h4>
          <p className="text-sm text-neutral-500 mt-2">font-size: clamp(1.25rem, 2.5vw, 1.5rem)</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">본문 텍스트</h2>
      <div className="space-y-4">
        <div>
          <p className="text-body-lg text-neutral-900">
            본문 텍스트 (Large) - 중요한 설명이나 강조가 필요한 텍스트에 사용
          </p>
          <p className="text-sm text-neutral-500 mt-2">font-size: clamp(1rem, 1.5vw, 1.125rem)</p>
        </div>
        <div>
          <p className="text-body text-neutral-900">
            본문 텍스트 (Regular) - 일반적인 본문 텍스트에 사용
          </p>
          <p className="text-sm text-neutral-500 mt-2">font-size: clamp(0.875rem, 1.5vw, 1rem)</p>
        </div>
        <div>
          <p className="text-small text-neutral-700">
            작은 텍스트 (Small) - 부가 정보나 캡션에 사용
          </p>
          <p className="text-sm text-neutral-500 mt-2">font-size: clamp(0.75rem, 1.2vw, 0.875rem)</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">폰트 웨이트</h2>
      <div className="space-y-4">
        <p className="font-light text-body">Light (300) - 가벼운 텍스트</p>
        <p className="font-normal text-body">Regular (400) - 기본 텍스트</p>
        <p className="font-medium text-body">Medium (500) - 강조 텍스트</p>
        <p className="font-semibold text-body">Semibold (600) - 제목 텍스트</p>
        <p className="font-bold text-body">Bold (700) - 강한 제목</p>
      </div>
    </section>
  </div>
);

// 컴포넌트 시스템
const ComponentSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    agree: false,
    newsletter: true,
    category: 'general'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-12">
      {/* Buttons */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">버튼 시스템</h3>
        
        {/* Primary Buttons */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Primary Buttons</h4>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-accent">Accent Button</button>
          </div>
        </div>

        {/* Subsidiary Buttons */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neutral-800 mb-4">계열사별 Buttons</h4>
          <div className="flex flex-wrap gap-4">
            <button className="btn-clarus">Clarus</button>
            <button className="btn-tlc">TLC</button>
            <button className="btn-illutech">Illutech</button>
            <button className="btn-texcom">Texcom</button>
          </div>
        </div>

        {/* Legacy Buttons */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Legacy Buttons</h4>
          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary">Legacy Primary</button>
            <button className="btn btn-secondary">Legacy Secondary</button>
            <button className="btn btn-accent">Legacy Accent</button>
            <button className="btn btn-outline">Legacy Outline</button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Button Sizes</h4>
          <div className="flex flex-wrap items-center gap-4">
            <button className="btn-primary text-sm px-4 py-2">Small</button>
            <button className="btn-primary">Medium</button>
            <button className="btn-primary text-lg px-10 py-4">Large</button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">카드 시스템</h3>
        
        {/* Basic Cards */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neutral-800 mb-4">기본 카드</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h5 className="text-lg font-semibold text-neutral-900 mb-2">기본 카드</h5>
              <p className="text-neutral-600">기본적인 카드 컴포넌트입니다. 다양한 콘텐츠를 담을 수 있습니다.</p>
            </div>

            <div className="card">
              <h5 className="text-lg font-semibold text-neutral-900 mb-2">호버 효과</h5>
              <p className="text-neutral-600">호버 시 그림자와 위로 이동하는 애니메이션 효과가 적용됩니다.</p>
            </div>

            <div className="card">
              <h5 className="text-lg font-semibold text-neutral-900 mb-2">반응형 디자인</h5>
              <p className="text-neutral-600">모든 화면 크기에서 최적화된 레이아웃을 제공합니다.</p>
            </div>
          </div>
        </div>

        {/* Subsidiary Cards */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neutral-800 mb-4">계열사별 카드</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card card-clarus">
              <h5 className="text-lg font-semibold text-neutral-900 mb-2">Clarus</h5>
              <p className="text-neutral-600">조명제어 전문 기술의 선도주자</p>
            </div>

            <div className="card card-tlc">
              <h5 className="text-lg font-semibold text-neutral-900 mb-2">TLC</h5>
              <p className="text-neutral-600">기술 지원 및 서비스 전문</p>
            </div>

            <div className="card card-illutech">
              <h5 className="text-lg font-semibold text-neutral-900 mb-2">Illutech</h5>
              <p className="text-neutral-600">조명 쇼핑몰 및 고객 서비스</p>
            </div>

            <div className="card card-texcom">
              <h5 className="text-lg font-semibold text-neutral-900 mb-2">Texcom</h5>
              <p className="text-neutral-600">통신 기술 및 솔루션</p>
            </div>
          </div>
        </div>

        {/* Legacy Cards */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-neutral-800 mb-4">Legacy 카드</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <Card.Header>
                <Card.Title>기본 카드</Card.Title>
                <Card.Subtitle>카드 설명</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Content>
                  <p>카드 내용이 여기에 들어갑니다. 다양한 정보를 표시할 수 있습니다.</p>
                </Card.Content>
              </Card.Body>
              <Card.Footer>
                <Card.Actions>
                  <Button variant="primary" size="sm">자세히 보기</Button>
                </Card.Actions>
              </Card.Footer>
            </Card>

            <Card variant="elevated">
              <Card.Body>
                <Card.Title>Elevated 카드</Card.Title>
                <Card.Content>
                  <p>그림자가 강화된 카드입니다.</p>
                </Card.Content>
              </Card.Body>
            </Card>

            <Card variant="outlined">
              <Card.Body>
                <Card.Title>Outlined 카드</Card.Title>
                <Card.Content>
                  <p>테두리가 있는 카드입니다.</p>
                </Card.Content>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">폼 요소</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input
              label="이름"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleInputChange}
              name="name"
            />
            
            <Input
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
            />

            <Select
              label="카테고리"
              value={formData.category}
              onChange={handleInputChange}
              name="category"
            >
              <option value="general">일반 문의</option>
              <option value="technical">기술 문의</option>
              <option value="business">사업 제휴</option>
              <option value="support">고객 지원</option>
            </Select>

            <div className="space-y-2">
              <Checkbox
                label="개인정보 수집에 동의합니다"
                checked={formData.agree}
                onChange={handleInputChange}
                name="agree"
              />
              <Checkbox
                label="뉴스레터 구독"
                checked={formData.newsletter}
                onChange={handleInputChange}
                name="newsletter"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">문의 내용</label>
              <textarea
                className="form-input"
                rows="4"
                placeholder="문의 내용을 입력하세요"
                value={formData.message}
                onChange={handleInputChange}
                name="message"
              />
            </div>

            <div className="space-y-2">
              <Radio
                name="priority"
                label="낮음"
                value="low"
                checked={formData.priority === 'low'}
                onChange={handleInputChange}
              />
              <Radio
                name="priority"
                label="보통"
                value="medium"
                checked={formData.priority === 'medium'}
                onChange={handleInputChange}
              />
              <Radio
                name="priority"
                label="높음"
                value="high"
                checked={formData.priority === 'high'}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">알림 설정</span>
              <Toggle
                checked={formData.notifications}
                onChange={() => setFormData(prev => ({ ...prev, notifications: !prev.notifications }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">배지 시스템</h3>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">알림 시스템</h3>
        <div className="space-y-4">
          <Alert variant="info" title="정보">
            이것은 정보 알림입니다. 중요한 정보를 사용자에게 전달합니다.
          </Alert>
          <Alert variant="success" title="성공">
            작업이 성공적으로 완료되었습니다.
          </Alert>
          <Alert variant="warning" title="경고">
            주의가 필요한 사항이 있습니다.
          </Alert>
          <Alert variant="danger" title="오류">
            오류가 발생했습니다. 다시 시도해주세요.
          </Alert>
        </div>
      </section>

      {/* Progress */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">진행률</h3>
        <div className="space-y-4">
          <Progress value={25} label="기본 진행률" showValue />
          <Progress value={50} variant="accent" label="액센트 진행률" showValue />
          <Progress value={75} variant="success" label="성공 진행률" showValue />
          <Progress value={90} variant="warning" label="경고 진행률" showValue />
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">로딩 상태</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="text-center">
            <Spinner size="sm" />
            <p className="text-sm text-neutral-600 mt-2">Small</p>
          </div>
          <div className="text-center">
            <Spinner size="md" />
            <p className="text-sm text-neutral-600 mt-2">Medium</p>
          </div>
          <div className="text-center">
            <Spinner size="lg" />
            <p className="text-sm text-neutral-600 mt-2">Large</p>
          </div>
          <div className="text-center">
            <Spinner size="xl" />
            <p className="text-sm text-neutral-600 mt-2">Extra Large</p>
          </div>
        </div>
      </section>

      {/* Modal Example */}
      <section>
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">모달</h3>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          모달 열기
        </Button>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="디자인 시스템 정보"
        >
          <div className="space-y-4">
            <p className="text-neutral-600">
              정호그룹 디자인 시스템은 일관성 있고 확장 가능한 UI 컴포넌트 라이브러리입니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">주요 특징</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• 반응형 디자인</li>
                  <li>• 접근성 고려</li>
                  <li>• 성능 최적화</li>
                  <li>• 브랜드 일관성</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">기술 스택</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• React 18+</li>
                  <li>• Tailwind CSS</li>
                  <li>• CSS Variables</li>
                  <li>• TypeScript</li>
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

// 간격 시스템
const SpacingSystem = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">간격 스케일</h2>
      <div className="space-y-4">
        {[
          { name: 'xs', value: '8px', class: 'w-2 h-2' },
          { name: 'sm', value: '16px', class: 'w-4 h-4' },
          { name: 'md', value: '24px', class: 'w-6 h-6' },
          { name: 'lg', value: '32px', class: 'w-8 h-8' },
          { name: 'xl', value: '48px', class: 'w-12 h-12' },
          { name: '2xl', value: '64px', class: 'w-16 h-16' },
          { name: '3xl', value: '80px', class: 'w-20 h-20' },
          { name: '4xl', value: '96px', class: 'w-24 h-24' },
        ].map((spacing) => (
          <div key={spacing.name} className="flex items-center space-x-4">
            <div className={`${spacing.class} bg-primary-500 rounded`} />
            <div>
              <p className="font-medium text-neutral-900">{spacing.name}</p>
              <p className="text-sm text-neutral-500">{spacing.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">반응형 간격</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">섹션 패딩</h3>
          <div className="bg-neutral-100 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">
              모바일: 48px (var(--space-6))<br />
              태블릿: 64px (var(--space-8))<br />
              데스크톱: 80px (var(--space-10))
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">컨테이너 패딩</h3>
          <div className="bg-neutral-100 p-4 rounded-lg">
            <p className="text-sm text-neutral-600">
              모바일: 16px (var(--space-2))<br />
              태블릿: 24px (var(--space-3))<br />
              데스크톱: 16px (var(--space-2))
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// 애니메이션 시스템
const AnimationSystem = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">애니메이션 클래스</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold mb-4">Fade In</h3>
            <div className="animate-fade-in bg-primary-100 p-4 rounded">
              <p className="text-primary-700">페이드 인 애니메이션</p>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold mb-4">Slide Up</h3>
            <div className="animate-slide-up bg-accent-100 p-4 rounded">
              <p className="text-accent-700">슬라이드 업 애니메이션</p>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold mb-4">Scale In</h3>
            <div className="animate-scale-in bg-neutral-100 p-4 rounded">
              <p className="text-neutral-700">스케일 인 애니메이션</p>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h3 className="text-lg font-semibold mb-4">Shimmer</h3>
            <div className="animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 p-4 rounded">
              <p className="text-neutral-700">시머 효과</p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">호버 효과</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-lift cursor-pointer">
          <Card.Body>
            <h3 className="text-lg font-semibold mb-2">Lift Effect</h3>
            <p className="text-neutral-600">마우스를 올려보세요</p>
          </Card.Body>
        </Card>

        <Card className="hover-glow cursor-pointer">
          <Card.Body>
            <h3 className="text-lg font-semibold mb-2">Glow Effect</h3>
            <p className="text-neutral-600">마우스를 올려보세요</p>
          </Card.Body>
        </Card>

        <Card className="transition-all duration-300 hover:scale-105 cursor-pointer">
          <Card.Body>
            <h3 className="text-lg font-semibold mb-2">Scale Effect</h3>
            <p className="text-neutral-600">마우스를 올려보세요</p>
          </Card.Body>
        </Card>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">트랜지션 속도</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="primary" className="transition-fast">Fast (150ms)</Button>
          <Button variant="primary" className="transition-normal">Normal (300ms)</Button>
          <Button variant="primary" className="transition-slow">Slow (500ms)</Button>
        </div>
        <p className="text-sm text-neutral-600">
          각 버튼을 클릭하여 트랜지션 속도를 확인해보세요.
        </p>
      </div>
    </section>
  </div>
);

export default DesignSystem; 