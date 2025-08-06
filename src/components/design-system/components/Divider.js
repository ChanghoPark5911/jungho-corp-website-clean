import React from 'react';

const Divider = ({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'border-neutral-200';
  
  const orientationClasses = {
    horizontal: 'w-full border-t',
    vertical: 'h-full border-l',
  };

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const sizeClasses = {
    sm: 'border-1',
    md: 'border-2',
    lg: 'border-4',
  };

  const classes = `${baseClasses} ${orientationClasses[orientation]} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return <div className={classes} {...props} />;
};

export default Divider; 