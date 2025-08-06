import React from 'react';

const Grid = ({ 
  children, 
  className = '', 
  cols = 'auto',
  gap = 'default',
  ...props 
}) => {
  const colsClasses = {
    'auto': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', // 모바일 1열, 태블릿 2열, 데스크톱 3-4열
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    '5': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    '6': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  const gapClasses = {
    'none': 'gap-0',
    'small': 'gap-2 md:gap-4',
    'default': 'gap-4 md:gap-6 lg:gap-8',
    'large': 'gap-6 md:gap-8 lg:gap-12',
  };

  return (
    <div 
      className={`
        grid
        ${colsClasses[cols]}
        ${gapClasses[gap]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid; 