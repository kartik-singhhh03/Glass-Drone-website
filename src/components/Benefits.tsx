import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeading from './ui/SectionHeading';

const benefits = [
  {
    key: 'benefit01',
    image: '/high-rise.webp'
  },
  {
    key: 'benefit02',
    image: 'https://images.pexels.com/photos/2096578/pexels-photo-2096578.jpeg?auto=compress&cs=tinysrgb&w=1280'
  },
  {
    key: 'benefit03',
    image: '/safety.webp'
  },
  {
    key: 'benefit04',
    image: '/minimal-disruption.webp'
  },
  {
    key: 'benefit05',
    image: '/scalable.webp'
  },
  {
    key: 'benefit06',
    image: '/commercial.webp'
  }
];

const Benefits = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="benefits"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: 'linear-gradient(to bottom, #F8F8FF, #F0F4FF)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={containerRef}>
          <SectionHeading
            badge={t('benefits.badge')}
            title={t('benefits.title')}
            subtitle={t('benefits.subtitle')}
          />
        </div>

        {/* Static Arc Container */}
        <div className="mt-16 sm:mt-24 w-full flex flex-col md:block items-center relative md:h-[550px] max-w-[1100px] mx-auto perspective-[1200px]">
          {benefits.map((benefit, i) => {
            // Determine shortest spatial offset from active card
            let offset = i - activeIndex;
            if (offset > 3) offset -= 6;
            if (offset < -2) offset += 6;

            // Define positioning
            let tx = '0%';
            let ty = '0px';
            let rot = '0deg';
            let sc = '1.08';
            let z = 10;
            let op = 1;
            let ptr = 'auto';

            if (offset === 0) {
              tx = '0%'; ty = '0px'; rot = '0deg'; sc = '1.08'; z = 10; op = 1;
            } else if (offset === -1) {
              tx = '-90%'; ty = '20px'; rot = '-5deg'; sc = '0.98'; z = 5; op = 0.85;
            } else if (offset === 1) {
              tx = '90%'; ty = '20px'; rot = '5deg'; sc = '0.98'; z = 5; op = 0.85;
            } else if (offset === -2) {
              tx = '-180%'; ty = '40px'; rot = '-10deg'; sc = '0.95'; z = 2; op = 0.75;
            } else if (offset === 2) {
              tx = '180%'; ty = '40px'; rot = '10deg'; sc = '0.95'; z = 2; op = 0.75;
            } else {
              // 6th item smoothly tucks away invisibly behind the arc
              tx = '0%'; ty = '60px'; rot = '0deg'; sc = '0.85'; z = 1; op = 0; ptr = 'none';
            }

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                data-active={offset === 0 ? "true" : "false"}
                className="arc-card group cursor-pointer w-full max-w-[320px] md:w-[280px] h-[400px] md:h-[420px] bg-white overflow-hidden"
                style={{
                  '--tx': tx,
                  '--ty': ty,
                  '--rot': rot,
                  '--sc': sc,
                  '--z': z,
                  '--op': op,
                  '--ptr': ptr,
                  borderRadius: '24px',
                } as React.CSSProperties}
              >
                {/* Micro-animation stagger wrapper */}
                <div
                  className="w-full h-full"
                  style={{
                    opacity: 0,
                    animation: isVisible ? `fadeRise 0.6s ease forwards ${i * 0.1}s` : 'none'
                  }}
                >
                  {/* Inner wrapper for hover lift effect */}
                  <div className="arc-card-inner h-full w-full flex flex-col transition-transform duration-300 ease-out">
                    <div className="w-full h-[55%] relative overflow-hidden bg-gray-100">
                      <img
                        src={benefit.image}
                        alt={t(`benefits.items.${benefit.key}.title`)}
                        onError={(e) => { e.currentTarget.src = "/hero_drone.webp"; }}
                        className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                      />
                      {offset === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-white relative z-10 border-t border-gray-50">
                      <h3 className="text-[20px] font-semibold text-slate-800 tracking-wide mb-2">
                        {t(`benefits.items.${benefit.key}.title`)}
                      </h3>
                      <p className="text-[14px] font-light leading-relaxed text-slate-600">
                        {t(`benefits.items.${benefit.key}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Staggered entrance animation */
        @keyframes fadeRise {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Smooth, premium transitions */
        .arc-card {
          box-shadow: 0 10px 30px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.08);
          transition: all 0.4s ease;
        }

        .arc-card:hover {
          box-shadow: 0 25px 80px rgba(0,0,0,0.12);
        }

        .arc-card-inner {
          transition: transform 0.3s ease;
        }

        .arc-card:hover .arc-card-inner {
          transform: translateY(-6px);
        }

        /* Desktop: Absolute positioning static arc */
        @media (min-width: 768px) {
          .arc-card {
            position: absolute;
            left: calc(50% - 140px); /* Center point for width 280px */
            top: 20px;
            transform: translateX(var(--tx)) translateY(var(--ty)) rotate(var(--rot)) scale(var(--sc));
            z-index: var(--z);
            opacity: var(--op);
            pointer-events: var(--ptr);
          }
        }

        /* Mobile: Disable arc, standard flexible stacking with active zoom focus */
        @media (max-width: 767px) {
          .arc-card {
            position: relative;
            margin-bottom: 2rem;
            transition: all 0.4s ease;
          }
          .arc-card[data-active="true"] {
            transform: scale(1.03);
            opacity: 1;
            z-index: 10;
          }
          .arc-card[data-active="false"] {
            transform: scale(0.96);
            opacity: 0.85;
            z-index: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Benefits;

