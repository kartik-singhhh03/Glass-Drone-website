import { useState, useEffect, useRef } from 'react';
import SectionHeading from './ui/SectionHeading';

const clients = [
  // COL 1
  {
    title: 'Office Buildings',
    description: 'High-rise and corporate spaces cleaned efficiently with zero disruption.',
    image: '/Office Buildings.png',
    heightClass: 'md:h-[480px] h-[360px]',
    delay: 0,
    col: 1
  },
  {
    title: 'Residential Complexes',
    description: 'Quiet and precise operation for premium residential environments.',
    image: '/Residential Complexes.png',
    heightClass: 'md:h-[340px] h-[360px]',
    delay: 0.3,
    col: 1
  },
  // COL 2
  {
    title: 'Hotels & Resorts',
    description: 'Elevate guest experiences with pristine glass and spotless facades.',
    image: '/Hotels & Resorts.png',
    heightClass: 'md:h-[340px] h-[360px]',
    delay: 0.1,
    col: 2
  },
  {
    title: 'Industrial Facilities',
    description: 'Safely tackle enormous surfaces and complex engineering challenges.',
    image: '/Industrial Facilities.png',
    heightClass: 'md:h-[480px] h-[360px]',
    delay: 0.4,
    col: 2
  },
  // COL 3
  {
    title: 'Shopping Centers',
    description: 'Maintain crystal-clear storefronts ensuring brilliant retail visibility.',
    image: '/Shopping Centers.png',
    heightClass: 'md:h-[420px] h-[360px]',
    delay: 0.2,
    col: 3
  },
  {
    title: 'Modern Glass Structures',
    description: 'Specialized soft-wash drone care for delicate architectural glass.',
    image: '/Modern Glass Structures.png',
    heightClass: 'md:h-[400px] h-[360px]',
    delay: 0.5,
    col: 3
  }
];

const TargetClients = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const col1 = clients.filter(c => c.col === 1);
  const col2 = clients.filter(c => c.col === 2);
  const col3 = clients.filter(c => c.col === 3);
  
  // Sorted for mobile single column
  const mobileClients = [...clients].sort((a, b) => a.delay - b.delay);

  const renderCard = (client: typeof clients[0]) => (
    <div 
      key={client.title}
      className="w-full"
      style={{
        opacity: 0,
        animation: isVisible ? `fadeRise 0.8s ease forwards ${client.delay}s` : 'none',
      }}
    >
      <div className={`target-card relative w-full rounded-[24px] overflow-hidden bg-white cursor-crosshair group ${client.heightClass}`}>
        <img 
          src={encodeURI(client.image)} 
          alt={client.title}
          onError={(e) => { e.currentTarget.src = "/commercial.png"; }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,0.85) 70%, rgba(255,255,255,1) 100%)'
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none z-10">
          <h3 className="text-[22px] md:text-[24px] font-bold text-[#0f172a] mb-2 leading-tight">
            {client.title}
          </h3>
          <p className="text-[15px] font-medium text-[#64748b] leading-relaxed">
            {client.description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="clients" 
      className="relative overflow-hidden py-24 sm:py-32" 
      style={{ background: 'linear-gradient(to bottom, #F8F8FF, #EEF4FF)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={containerRef}>
          <SectionHeading
            badge="Global Reach"
            title="Who We Serve"
            subtitle="Engineered to adapt across any industry, our autonomous cleaning systems guarantee rapid deployment and spot-free finishes."
          />
        </div>

        <div className="mt-16 sm:mt-24 w-full">
          {/* Mobile Layout (Standard single column stack) */}
          <div className="flex md:hidden flex-col gap-6">
            {mobileClients.map(renderCard)}
          </div>

          {/* Desktop Layout (3-Column Asymmetric Masonry) */}
          <div className="hidden md:flex flex-row gap-6 lg:gap-8 justify-between">
            <div className="flex flex-col gap-6 lg:gap-8 flex-1">
              {col1.map(renderCard)}
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 flex-1">
              {col2.map(renderCard)}
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 flex-1">
              {col3.map(renderCard)}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeRise {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .target-card {
          box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.08);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .target-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 80px rgba(0,0,0,0.12);
        }
      `}</style>
    </section>
  );
};

export default TargetClients;
