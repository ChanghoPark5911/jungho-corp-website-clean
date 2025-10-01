import React from 'react';

const Typography = ({ 
  children, 
  variant = 'body',
  className = '',
  as,
  ...props 
}) => {
  const variants = {
    // 헤딩 스타일
    'h1': 'text-h1 md:text-h1-md lg:text-h1-lg font-bold text-bright-green leading-tight',
    'h2': 'text-h2 md:text-h2-md lg:text-h2-lg font-semibold text-bright-green leading-tight',
    'h3': 'text-xl md:text-2xl lg:text-3xl font-semibold text-bright-green leading-tight',
    'h4': 'text-lg md:text-xl lg:text-2xl font-medium text-bright-green leading-tight',
    'h5': 'text-base md:text-lg lg:text-xl font-medium text-bright-green leading-tight',
    'h6': 'text-sm md:text-base lg:text-lg font-medium text-bright-green leading-tight',
    
    // 본문 스타일
    'body': 'text-body md:text-body-md lg:text-body-lg text-gray-700 dark:text-gray-300 leading-relaxed',
    'body-large': 'text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed',
    'body-small': 'text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed',
    
    // 특수 스타일
    'caption': 'text-xs md:text-sm text-gray-500 leading-relaxed',
    'overline': 'text-xs md:text-sm font-medium text-secondary uppercase tracking-wider',
    'button': 'text-sm md:text-base font-medium leading-none',
    'link': 'text-body md:text-body-md lg:text-body-lg text-primary hover:text-secondary transition-colors duration-200 underline',
  };

  const defaultElements = {
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'h4': 'h4',
    'h5': 'h5',
    'h6': 'h6',
    'body': 'p',
    'body-large': 'p',
    'body-small': 'p',
    'caption': 'span',
    'overline': 'span',
    'button': 'span',
    'link': 'a',
  };

  const Element = as || defaultElements[variant] || 'div';

  return (
    <Element 
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Typography; 