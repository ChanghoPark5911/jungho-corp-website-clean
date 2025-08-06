import React from 'react';

const Radio = ({
  name,
  label,
  value,
  checked,
  onChange,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'flex items-center space-x-3 cursor-pointer';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <label className={`${baseClasses} ${disabledClasses} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-4 h-4 text-primary-600 border-neutral-300 focus:ring-primary-500 focus:ring-2"
        {...props}
      />
      {label && (
        <span className="text-sm text-neutral-700">{label}</span>
      )}
    </label>
  );
};

export default Radio; 