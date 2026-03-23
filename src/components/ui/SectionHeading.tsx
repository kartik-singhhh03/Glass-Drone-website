import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading = ({ title, subtitle, badge, align = 'center', className = '' }: SectionHeadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a smooth upward fade for all section headings
      gsap.fromTo('.heading-element',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-col mb-16 md:mb-24 ${alignment} ${className}`}>
      {badge && (
        <div className="heading-element inline-block px-4 py-1.5 rounded-full bg-blue-accent/10 text-blue-accent text-sm font-bold tracking-widest uppercase mb-6 border border-blue-accent/20 shadow-sm shadow-blue-accent/5">
          {badge}
        </div>
      )}
      <h2 className={`heading-element text-4xl md:text-5xl lg:text-[56px] font-bold text-dark mb-6 tracking-tight leading-[1.1] ${align === 'center' ? 'max-w-4xl' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`heading-element text-xl text-dark/60 font-light leading-relaxed ${align === 'center' ? 'max-w-2xl' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
