import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  width = 'default',
  hover = true,
  shadow = 'default',
  padding = 'default',
  ...props 
}) => {
  const widthClasses = {
    'full': 'w-full',
    'default': 'w-full md:w-1/2 lg:w-1/3 xl:w-1/4', // 모바일 100%, 태블릿 50%, 데스크톱 25%
    'half': 'w-full md:w-1/2', // 모바일 100%, 태블릿 50%
    'third': 'w-full md:w-1/2 lg:w-1/3', // 모바일 100%, 태블릿 50%, 데스크톱 33%
    'quarter': 'w-full md:w-1/2 lg:w-1/4', // 모바일 100%, 태블릿 50%, 데스크톱 25%
  };

  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
    : '';

  const shadowClasses = {
    'none': '',
    'small': 'shadow-sm',
    'default': 'shadow-md',
    'large': 'shadow-xl',
  };

  const paddingClasses = {
    'none': '',
    'small': 'p-3 md:p-4',
    'default': 'p-4 md:p-6',
    'large': 'p-6 md:p-8',
  };

  return (
    <div 
      className={`
        ${widthClasses[width]}
        ${shadowClasses[shadow]}
        ${paddingClasses[padding]}
        ${hoverClasses}
        bg-white rounded-lg border border-gray-200 text-horizontal
        ${className}
      `}
      style={{
        minWidth: '200px',
        minHeight: '150px',
        width: 'auto',
        height: 'auto'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 