import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  asChild,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'gradient-brand text-white hover:shadow-lg hover:scale-105 focus:ring-[#FA4A8C]',
    secondary: 'border-2 border-transparent bg-gradient-to-r from-[#FA4A8C] to-[#945AE0] bg-clip-padding border-gradient hover:shadow-lg hover:scale-105 text-[#FA4A8C] bg-white',
    tertiary: 'text-[#FA4A8C] hover:text-[#945AE0] hover:underline underline-offset-4',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  };
  
  // Special handling for secondary variant border gradient
  if (variant === 'secondary') {
    return (
      <button
        className={cn(
          baseStyles,
          sizeStyles[size],
          'relative',
          'bg-white',
          'before:absolute before:inset-0 before:rounded-full before:p-[2px] before:bg-gradient-to-r before:from-[#FA4A8C] before:to-[#945AE0] before:-z-10',
          'after:absolute after:inset-[2px] after:rounded-full after:bg-white after:-z-10',
          'text-[#FA4A8C] hover:text-[#945AE0]',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

