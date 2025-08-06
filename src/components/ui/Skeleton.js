import React from 'react';

const Skeleton = ({ 
  variant = 'rectangular',
  width = 'full',
  height = 'full',
  className = '',
  animation = 'pulse',
  ...props 
}) => {
  const variantClasses = {
    'rectangular': 'rounded-lg',
    'circular': 'rounded-full',
    'text': 'rounded',
    'card': 'rounded-lg',
    'avatar': 'rounded-full',
  };

  const widthClasses = {
    'full': 'w-full',
    'auto': 'w-auto',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4',
    '20': 'w-20',
    '24': 'w-24',
    '32': 'w-32',
    '40': 'w-40',
  };

  const heightClasses = {
    'full': 'h-full',
    'auto': 'h-auto',
    '4': 'h-4',
    '6': 'h-6',
    '8': 'h-8',
    '12': 'h-12',
    '16': 'h-16',
    '20': 'h-20',
    '24': 'h-24',
    '32': 'h-32',
    '40': 'h-40',
    '48': 'h-48',
    '64': 'h-64',
  };

  const animationClasses = {
    'pulse': 'animate-pulse',
    'shimmer': 'animate-shimmer',
    'none': '',
  };

  return (
    <div
      className={`
        bg-gray-200
        ${variantClasses[variant]}
        ${widthClasses[width]}
        ${heightClasses[height]}
        ${animationClasses[animation]}
        ${className}
      `}
      {...props}
    />
  );
};

// 특화된 스켈레톤 컴포넌트들
export const SkeletonText = ({ lines = 1, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          height="4"
          className={index === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
};

export const SkeletonCard = ({ className = '', ...props }) => {
  return (
    <div className={`p-4 space-y-3 ${className}`} {...props}>
      <Skeleton variant="rectangular" height="32" className="w-full" />
      <SkeletonText lines={2} />
      <div className="flex space-x-2">
        <Skeleton variant="rectangular" width="20" height="6" />
        <Skeleton variant="rectangular" width="24" height="6" />
      </div>
    </div>
  );
};

export const SkeletonAvatar = ({ size = 'md', className = '', ...props }) => {
  const sizeClasses = {
    'sm': 'w-8 h-8',
    'md': 'w-12 h-12',
    'lg': 'w-16 h-16',
    'xl': 'w-20 h-20',
  };

  return (
    <Skeleton
      variant="avatar"
      className={`${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};

export const SkeletonButton = ({ size = 'md', className = '', ...props }) => {
  const sizeClasses = {
    'sm': 'h-8 w-16',
    'md': 'h-10 w-24',
    'lg': 'h-12 w-32',
  };

  return (
    <Skeleton
      variant="rectangular"
      className={`${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};

export const SkeletonImage = ({ aspectRatio = 'video', className = '', ...props }) => {
  const aspectRatioClasses = {
    'square': 'aspect-square',
    'video': 'aspect-video',
    'portrait': 'aspect-[3/4]',
    'landscape': 'aspect-[4/3]',
  };

  return (
    <Skeleton
      variant="rectangular"
      className={`${aspectRatioClasses[aspectRatio]} ${className}`}
      {...props}
    />
  );
};

export default Skeleton; 