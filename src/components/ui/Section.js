import React from 'react';

const Section = ({ 
  children, 
  className = '', 
  container = true,
  padding = 'default',
  background = 'white',
  ...props 
}) => {
  const paddingClasses = {
    'none': '',
    'small': 'py-8 md:py-12 lg:py-16',
    'default': 'py-section-mobile md:py-section-tablet lg:py-section-desktop',
    'large': 'py-16 md:py-20 lg:py-32',
  };

  const backgroundClasses = {
    'white': 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
    'gray': 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100',
    'primary': 'bg-primary text-white',
    'secondary': 'bg-secondary text-white',
    'transparent': 'bg-transparent',
  };

  const containerClasses = container 
    ? 'px-container-mobile md:px-container-tablet lg:px-container-desktop max-w-7xl mx-auto'
    : '';

  return (
    <section 
      className={`
        ${paddingClasses[padding]}
        ${backgroundClasses[background]}
        ${className}
      `}
      {...props}
    >
      {container ? (
        <div className={containerClasses}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};

export default Section; 