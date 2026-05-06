import React from 'react';

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
  // Check if a background color or text color is provided in className to avoid conflicts
  const hasBg = className.includes('bg-');
  const hasText = className.includes('text-');

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`relative inline-block overflow-hidden rounded-full px-8 py-3 text-sm font-semibold tracking-wider transition-all duration-300 ease-in-out group focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${!hasBg ? 'bg-gray-900' : ''} ${!hasText ? 'text-white' : ''} ${className}`}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white pointer-events-none">
        {children}
      </span>
      <span
        className={`absolute top-1/2 left-1/2 w-12 h-12 bg-green-600 rounded-full transition-transform duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-[10] z-0 pointer-events-none`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }}
      ></span>
    </button>
  );
};

export default LiquidButton;