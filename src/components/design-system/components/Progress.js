import React from 'react';

const Progress = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  label,
  showValue = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantClasses = {
    primary: 'bg-primary-600',
    accent: 'bg-accent-500',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  const baseClasses = 'w-full bg-neutral-200 rounded-full overflow-hidden';
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;

  return (
    <div className="space-y-2" {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-neutral-700">{label}</span>}
          {showValue && <span className="text-neutral-500">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={classes}>
        <div
          className={`${variantClasses[variant]} h-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress; 