import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  size = 'md',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const baseClasses = 'form-input border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500';

  const disabledClasses = disabled ? 'bg-neutral-100 cursor-not-allowed' : 'bg-white';

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${sizeClasses[size]} ${stateClasses} ${disabledClasses} ${widthClass} ${className}`;

  return (
    <div className="space-y-1">
      <input
        type={type}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 