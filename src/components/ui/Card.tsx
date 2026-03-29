import type { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
  border?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = ({ children, className = '', style, hover = false, border = true, padding = 'md' }: CardProps) => {
  const baseStyles = "bg-white rounded-[2rem] overflow-hidden";
  const borderStyles = border ? "border border-gray-100" : "";
  const hoverStyles = hover ? "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-accent/5 hover:border-blue-accent/20 cursor-pointer" : "shadow-sm";
  
  const paddings = {
    none: "",
    sm: "p-6",
    md: "p-8 md:p-10",
    lg: "p-10 md:p-14"
  };
  
  return (
    <div style={style} className={`${baseStyles} ${borderStyles} ${hoverStyles} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
