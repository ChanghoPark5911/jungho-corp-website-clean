import React from 'react';

const Avatar = ({
  src,
  alt,
  size = 'md',
  variant = 'circle',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const variantClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const baseClasses = 'inline-block overflow-hidden bg-neutral-200 flex items-center justify-center';
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={classes}
        {...props}
      />
    );
  }

  // 기본 아바타 (이니셜 또는 아이콘)
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`${classes} bg-primary-100 text-primary-700 font-medium`} {...props}>
      {getInitials(alt)}
    </div>
  );
};

export default Avatar; 