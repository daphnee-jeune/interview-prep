import React from 'react'

export type ButtonProps = {
 children?: React.ReactNode;
 variant?: 'primary' | 'secondary' | 'ghost';
 size?: 'sm' | 'md' | 'lg';
 icon?: React.ReactNode;
 loading?: boolean;
 disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 ({ variant = 'primary', size = 'md', icon, children, loading, disabled, ...rest }, ref) => {
  const isDisabled = disabled || loading;
  return (
   <button
    ref={ref}
    className={`btn btn-${variant} btn-${size}`}
    disabled={isDisabled}
    aria-disabled={isDisabled}
    {...rest}
   >
    {loading ? "Loading..." : icon}
    {children && <span className='btn-text'>{children}</span>}
   </button>
  )
 }
);
