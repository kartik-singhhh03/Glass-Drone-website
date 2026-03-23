import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

const Button = ({ children, variant = 'primary', size = 'md', className = '', href, ...props }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold tracking-wide rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-accent text-white shadow-lg shadow-blue-accent/20 hover:bg-opacity-90 hover:shadow-xl hover:shadow-blue-accent/30",
    secondary: "bg-dark text-white hover:bg-dark/90",
    outline: "bg-white text-dark border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm",
    ghost: "text-dark/70 hover:text-blue-accent bg-transparent hover:bg-blue-accent/5"
  };
  
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg"
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
