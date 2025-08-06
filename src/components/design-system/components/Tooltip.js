import React, { useState } from 'react';

const Tooltip = ({
  content,
  children,
  position = 'top',
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-neutral-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-neutral-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-neutral-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-neutral-900',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]} ${className}`}>
          <div className="bg-neutral-900 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
            {content}
            <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip; 