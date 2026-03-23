import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

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
    const container = containerRef.current;
    if (!container) return;

    // Use IntersectionObserver — completely independent of GSAP, cannot be killed
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = container.querySelectorAll<HTMLElement>('.heading-element');
            elements.forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.15}s`;
              el.classList.add('heading-element--visible');
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
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

      <style>{`
        .heading-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .heading-element--visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default SectionHeading;
