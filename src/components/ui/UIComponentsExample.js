import React from 'react';
import Button from './Button';
import Card from './Card';
import Hero from './Hero';
import Section from './Section';

const UIComponentsExample = () => {
  const handlePrimaryClick = () => {
    console.log('Primary button clicked');
  };

  const handleSecondaryClick = () => {
    console.log('Secondary button clicked');
  };

  return (
    <div className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            UI 컴포넌트 예제
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            정호그룹 디자인 시스템의 다양한 UI 컴포넌트들을 확인해보세요.
          </p>
        </div>

      {/* Hero 섹션 예시 */}
      <Hero
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
        title="정호그룹"
        subtitle="혁신적인 기술로 더 나은 미래를 만드는 글로벌 기업"
        description="AI, IoT, 물류, 텍스타일 등 다양한 분야에서 혁신적인 솔루션을 제공하는 정호그룹입니다."
        primaryAction={{
          label: "자세히 보기",
          onClick: handlePrimaryClick
        }}
        secondaryAction={{
          label: "계열사 소개",
          onClick: handleSecondaryClick
        }}
        showScrollIndicator={true}
      />

      {/* Button 컴포넌트 예시 */}
      <Section
        title="Button 컴포넌트"
        subtitle="다양한 스타일과 크기의 버튼 컴포넌트"
        className="bg-white"
      >
        <div className="space-y-8">
          {/* 변형별 버튼 */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">변형별 버튼</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" onClick={handlePrimaryClick}>
                Primary Button
              </Button>
              <Button variant="secondary" onClick={handleSecondaryClick}>
                Secondary Button
              </Button>
              <Button variant="ghost" onClick={handlePrimaryClick}>
                Ghost Button
              </Button>
            </div>
          </div>

          {/* 크기별 버튼 */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">크기별 버튼</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" variant="primary">
                Small
              </Button>
              <Button size="md" variant="primary">
                Medium
              </Button>
              <Button size="lg" variant="primary">
                Large
              </Button>
            </div>
          </div>

          {/* 상태별 버튼 */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4">상태별 버튼</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                Default
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Card 컴포넌트 예시 */}
      <Section
        title="Card 컴포넌트"
        subtitle="다양한 콘텐츠를 담을 수 있는 카드 컴포넌트"
        className="bg-gray-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 기본 카드 */}
          <Card
            title="기본 카드"
            subtitle="간단한 카드 예시"
            content="이것은 기본 카드 컴포넌트의 예시입니다. 다양한 콘텐츠를 담을 수 있습니다."
            actions={
              <>
                <Button variant="ghost" size="sm">취소</Button>
                <Button variant="primary" size="sm">확인</Button>
              </>
            }
          />

          {/* 이미지 카드 */}
          <Card
            image="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            title="이미지 카드"
            subtitle="이미지가 포함된 카드"
            content="이미지와 함께 콘텐츠를 표시할 수 있는 카드입니다."
            actions={
              <Button variant="primary" size="sm">자세히 보기</Button>
            }
          />

          {/* 커스텀 카드 */}
          <Card
            title="커스텀 카드"
            subtitle="사용자 정의 콘텐츠"
            hover={true}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                자식 요소로 복잡한 콘텐츠를 구성할 수 있습니다.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">활성 상태</span>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <code className="text-sm">커스텀 코드 블록</code>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button variant="secondary" size="sm" className="w-full">
                액션 버튼
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* Section 컴포넌트 예시 */}
      <Section
        title="Section 컴포넌트"
        subtitle="일관된 레이아웃을 위한 섹션 컴포넌트"
        className="bg-white"
        padding="py-20"
      >
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Section 컴포넌트는 일관된 패딩과 최대 너비를 제공하여 
            웹사이트 전체에서 통일된 레이아웃을 유지할 수 있게 도와줍니다.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
          </div>
        </div>
      </Section>
      </div>
    </div>
  );
};

export default UIComponentsExample; 