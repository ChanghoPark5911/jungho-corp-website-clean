import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'default',
  shadow = 'default',
  border = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'card overflow-hidden transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-neutral-200',
    filled: 'bg-neutral-50',
    primary: 'bg-gradient-primary text-white',
    accent: 'bg-gradient-accent text-white',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const borderClasses = border ? 'border border-neutral-200' : '';

  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${clickableClasses} ${className}`;

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

// Card Header
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

// Card Body
Card.Body = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

// Card Footer
Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

// Card Image
Card.Image = ({ src, alt, className = '', ...props }) => (
  <div className={`relative overflow-hidden ${className}`} {...props}>
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover"
    />
  </div>
);

// Card Badge
Card.Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    neutral: 'bg-neutral-100 text-neutral-700',
  };

  return (
    <span
      className={`badge ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Card Title
Card.Title = ({ children, size = 'md', className = '', ...props }) => {
  const sizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-bold',
  };

  return (
    <h3 className={`${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card Subtitle
Card.Subtitle = ({ children, className = '', ...props }) => (
  <p className={`text-neutral-600 text-sm ${className}`} {...props}>
    {children}
  </p>
);

// Card Content
Card.Content = ({ children, className = '', ...props }) => (
  <div className={`text-neutral-700 ${className}`} {...props}>
    {children}
  </div>
);

// Card Actions
Card.Actions = ({ children, className = '', ...props }) => (
  <div className={`flex items-center justify-end gap-2 ${className}`} {...props}>
    {children}
  </div>
);

export default Card; 