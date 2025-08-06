import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerSupport from '../CustomerSupport';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

// Mock window.IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: mockIntersectionObserver,
});

// Mock Button component
jest.mock('../Button', () => {
  return function MockButton({ children, onClick, ...props }: any) {
    return (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    );
  };
});

describe('CustomerSupport', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('기본 렌더링이 올바르게 작동해야 합니다', () => {
    render(<CustomerSupport />);
    
    // 기본 제목이 표시되는지 확인
    expect(screen.getByText('언제나 함께하는 든든한 파트너')).toBeInTheDocument();
    
    // 기본 채널들이 표시되는지 확인
    expect(screen.getByText('전화 상담')).toBeInTheDocument();
    expect(screen.getByText('이메일 문의')).toBeInTheDocument();
    expect(screen.getByText('카카오톡')).toBeInTheDocument();
    
    // 기본 특징들이 표시되는지 확인
    expect(screen.getByText('24/7 지원')).toBeInTheDocument();
    expect(screen.getByText('전국 네트워크')).toBeInTheDocument();
    expect(screen.getByText('전문 엔지니어')).toBeInTheDocument();
  });

  it('커스텀 제목을 올바르게 표시해야 합니다', () => {
    const customTitle = '커스텀 고객 지원 제목';
    render(<CustomerSupport title={customTitle} />);
    
    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it('커스텀 채널 데이터를 올바르게 표시해야 합니다', () => {
    const customChannels = [
      {
        title: '커스텀 채널',
        description: '커스텀 설명',
        contact: '010-1234-5678',
        hours: '평일 10:00-19:00',
        action: {
          label: '커스텀 액션',
          onClick: jest.fn()
        },
        icon: <div data-testid="custom-icon">아이콘</div>
      }
    ];

    render(<CustomerSupport channels={customChannels} />);
    
    expect(screen.getByText('커스텀 채널')).toBeInTheDocument();
    expect(screen.getByText('커스텀 설명')).toBeInTheDocument();
    expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
    expect(screen.getByText('평일 10:00-19:00')).toBeInTheDocument();
    expect(screen.getByText('커스텀 액션')).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('커스텀 특징 데이터를 올바르게 표시해야 합니다', () => {
    const customFeatures = [
      {
        title: '커스텀 특징',
        description: '커스텀 특징 설명',
        icon: <div data-testid="custom-feature-icon">특징 아이콘</div>
      }
    ];

    render(<CustomerSupport features={customFeatures} />);
    
    expect(screen.getByText('커스텀 특징')).toBeInTheDocument();
    expect(screen.getByText('커스텀 특징 설명')).toBeInTheDocument();
    expect(screen.getByTestId('custom-feature-icon')).toBeInTheDocument();
  });

  it('CTA 버튼 클릭이 올바르게 작동해야 합니다', () => {
    const mockOnClick = jest.fn();
    const customCtaButton = {
      label: '커스텀 CTA',
      onClick: mockOnClick
    };

    render(<CustomerSupport ctaButton={customCtaButton} />);
    
    const ctaButton = screen.getByText('커스텀 CTA');
    fireEvent.click(ctaButton);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('CTA 버튼의 path가 올바르게 작동해야 합니다', () => {
    const customCtaButton = {
      label: '외부 링크',
      path: 'https://example.com'
    };

    // window.location.href를 모킹
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' } as any;

    render(<CustomerSupport ctaButton={customCtaButton} />);
    
    const ctaButton = screen.getByText('외부 링크');
    fireEvent.click(ctaButton);
    
    expect(window.location.href).toBe('https://example.com');
    
    // 원래 location 복원
    window.location = originalLocation;
  });

  it('채널 액션 버튼 클릭이 올바르게 작동해야 합니다', () => {
    const mockOnClick = jest.fn();
    const customChannels = [
      {
        title: '테스트 채널',
        description: '테스트 설명',
        contact: '010-1234-5678',
        hours: '평일 09:00-18:00',
        action: {
          label: '테스트 액션',
          onClick: mockOnClick
        },
        icon: <div>아이콘</div>
      }
    ];

    render(<CustomerSupport channels={customChannels} />);
    
    const actionButton = screen.getByText('테스트 액션');
    fireEvent.click(actionButton);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('채널 액션의 path가 올바르게 작동해야 합니다', () => {
    const customChannels = [
      {
        title: '외부 링크 채널',
        description: '외부 링크 설명',
        contact: '010-1234-5678',
        hours: '평일 09:00-18:00',
        action: {
          label: '외부 링크 액션',
          path: 'https://external-link.com'
        },
        icon: <div>아이콘</div>
      }
    ];

    // window.location.href를 모킹
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' } as any;

    render(<CustomerSupport channels={customChannels} />);
    
    const actionButton = screen.getByText('외부 링크 액션');
    fireEvent.click(actionButton);
    
    expect(window.location.href).toBe('https://external-link.com');
    
    // 원래 location 복원
    window.location = originalLocation;
  });

  it('기본 전화 액션이 올바르게 작동해야 합니다', () => {
    // window.location.href를 모킹
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' } as any;

    render(<CustomerSupport />);
    
    const phoneButton = screen.getByText('전화하기');
    fireEvent.click(phoneButton);
    
    expect(window.location.href).toBe('tel:1588-1234');
    
    // 원래 location 복원
    window.location = originalLocation;
  });

  it('기본 이메일 액션이 올바르게 작동해야 합니다', () => {
    // window.location.href를 모킹
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' } as any;

    render(<CustomerSupport />);
    
    const emailButton = screen.getByText('이메일 보내기');
    fireEvent.click(emailButton);
    
    expect(window.location.href).toBe('mailto:support@jungho.com');
    
    // 원래 location 복원
    window.location = originalLocation;
  });

  it('IntersectionObserver가 올바르게 설정되어야 합니다', () => {
    render(<CustomerSupport />);
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );
  });

  it('커스텀 className이 올바르게 적용되어야 합니다', () => {
    const customClassName = 'custom-customer-support';
    const { container } = render(<CustomerSupport className={customClassName} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass(customClassName);
  });

  it('추가 정보가 올바르게 표시되어야 합니다', () => {
    render(<CustomerSupport />);
    
    expect(screen.getByText('전국 50개 지점')).toBeInTheDocument();
    expect(screen.getByText('전문 엔지니어 200명+')).toBeInTheDocument();
    expect(screen.getByText('평균 응답시간 2시간')).toBeInTheDocument();
  });

  it('기본 CTA 버튼이 올바르게 표시되어야 합니다', () => {
    render(<CustomerSupport />);
    
    expect(screen.getByText('지금 문의하기')).toBeInTheDocument();
  });

  it('컴포넌트가 접근성 요구사항을 충족해야 합니다', () => {
    render(<CustomerSupport />);
    
    // 시맨틱 HTML 구조 확인
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    // 제목이 올바른 heading 레벨을 가지는지 확인
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeInTheDocument();
    
    // 버튼들이 올바르게 렌더링되는지 확인
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
}); 