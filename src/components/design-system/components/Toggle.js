import React from 'react';

const Toggle = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-12 h-6',
    lg: 'w-16 h-8',
  };

  const thumbSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const baseClasses = 'relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const checkedClasses = checked ? 'bg-primary-600 focus:ring-primary-500' : 'bg-neutral-300 focus:ring-neutral-500';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${checkedClasses} ${disabledClasses} ${className}`}
      onClick={onChange}
      disabled={disabled}
      {...props}
    >
      <span
        className={`${thumbSizeClasses[size]} bg-white rounded-full shadow transform transition-transform duration-200 ${
          checked ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Toggle; 