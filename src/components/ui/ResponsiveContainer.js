import React from 'react';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = 'max-w-7xl',
  padding = 'px-4 sm:px-6 lg:px-8',
  center = true 
}) => {
  return (
    <div className={`
      w-full 
      ${maxWidth} 
      ${padding} 
      ${center ? 'mx-auto' : ''} 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;





