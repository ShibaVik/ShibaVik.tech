import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-orangery-500 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-orangery-500 hover:bg-orangery-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-gray-50 text-orangery-600 border-2 border-orangery-200 hover:border-orangery-400",
    outline: "bg-transparent hover:bg-orangery-50 text-orangery-600 border-2 border-orangery-300 hover:border-orangery-500"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick();
    }
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        loading && "cursor-wait",
        isPressed && "scale-95",
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </span>
      
      {/* Ripple effect */}
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </button>
  );
};

export default InteractiveButton;