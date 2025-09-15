import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = '로딩 중...',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      {text && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

// 특화된 로딩 컴포넌트들
export const LoadingDots = ({ size = 'md', className = '', ...props }) => {
  const sizeClasses = {
    'sm': 'w-1 h-1',
    'md': 'w-2 h-2',
    'lg': 'w-3 h-3',
  };

  return (
    <div className={`flex space-x-1 ${className}`} {...props}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} bg-current rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
};

export const LoadingBar = ({ 
  progress = 0,
  size = 'md',
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    'sm': 'h-1',
    'md': 'h-2',
    'lg': 'h-3',
  };

  const variantClasses = {
    'primary': 'bg-primary',
    'secondary': 'bg-secondary',
    'white': 'bg-white',
    'gray': 'bg-gray-500',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`} {...props}>
      <div
        className={`${variantClasses[variant]} h-full transition-all duration-300 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

export const LoadingSkeleton = ({ 
  lines = 3,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{
            width: index === lines - 1 ? '75%' : '100%',
          }}
        />
      ))}
    </div>
  );
}; 