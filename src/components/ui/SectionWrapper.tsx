import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  bg?: 'white' | 'light' | 'transparent';
  noPadding?: boolean;
}

const SectionWrapper = ({ 
  id, 
  children, 
  className = '', 
  containerClassName = '',
  bg = 'white',
  noPadding = false
}: SectionWrapperProps) => {
  const bgColors = {
    white: 'bg-white',
    light: 'bg-light',
    transparent: 'bg-transparent'
  };

  const paddingY = noPadding ? '' : 'py-24 md:py-32';

  return (
    <section id={id} className={`${paddingY} ${bgColors[bg]} border-b border-gray-100/50 last:border-0 ${className}`}>
      <div className={`max-w-7xl mx-auto px-6 w-full ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
