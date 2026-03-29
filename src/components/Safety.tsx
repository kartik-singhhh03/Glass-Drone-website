import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Scale, FileText, CloudRain, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeading from './ui/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const safetyFeatures = [
  {
    icon: <Award className="w-7 h-7 md:w-8 md:h-8" />,
    key: 'feature01'
  },
  {
    icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />,
    key: 'feature02'
  },
  {
    icon: <Scale className="w-7 h-7 md:w-8 md:h-8" />,
    key: 'feature03'
  },
  {
    icon: <FileText className="w-7 h-7 md:w-8 md:h-8" />,
    key: 'feature04'
  },
  {
    icon: <CloudRain className="w-7 h-7 md:w-8 md:h-8" />,
    key: 'feature05'
  }
];

const trustBadges = [
  'badge01',
  'badge02',
  'badge03',
  'badge04'
];

const Safety = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!document.querySelector('.safety-item')) return;

      const ctx = gsap.context(() => {
        // Fade-in staggered animation for cards
        gsap.fromTo(
          '.safety-item',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Trust badges fade-in
        if (document.querySelector('.trust-badge')) {
          gsap.fromTo(
            '.trust-badge',
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: '.badges-container',
                start: 'top 90%',
              },
            }
          );
        }
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    /* safety-section class drives all background styles + animations from index.css */
    <section id="safety" className="safety-section py-24 md:py-32">

      {/* ── Animated background layers (aria-hidden, z-index 0) ── */}
      {/* Orb A — top-right, slow 18s float */}
      <div className="safety-orb-a" aria-hidden="true" />
      {/* Orb B — bottom-left, slow 22s float */}
      <div className="safety-orb-b" aria-hidden="true" />
      {/* Orb C — center inner focus glow, 15s drift */}
      <div className="safety-orb-c" aria-hidden="true" />
      {/* Light sweep — slow 12s horizontal pass */}
      <div className="safety-sweep" aria-hidden="true" />

      {/* Content — sits above all decorative layers */}
      <div className="max-w-7xl mx-auto px-6 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={containerRef}>

          <SectionHeading
            badge={t('safety.badge')}
            title={t('safety.title')}
            subtitle={t('safety.subtitle')}
            className="mb-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch relative z-10 w-full">
            {safetyFeatures.map((feature, index) => (
              <div
                key={index}
                className={`safety-item group relative bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,172,206,0.12)] hover:-translate-y-2 flex flex-col items-start ${
                  index === 3 ? 'lg:col-start-1 lg:col-span-1 lg:ml-[50%]' : ''
                } ${
                  index === 4 ? 'lg:col-start-2 lg:col-span-1 lg:ml-[50%]' : ''
                }`}
              >
                {/* Premium Internal Hover Effects */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,rgba(0,172,206,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-bl-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated Icon Container */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#f1f5f9] group-hover:bg-blue-accent flex items-center justify-center text-[#64748b] group-hover:text-white transition-all duration-500 mb-8 group-hover:scale-110 group-hover:shadow-[0_15px_30px_rgba(0,172,206,0.4)] flex-shrink-0">
                  {feature.icon}
                </div>
                
                {/* Typography */}
                <div className="relative z-10">
                  <h3 className="text-[22px] font-extrabold text-[#0f172a] mb-4 tracking-tight group-hover:text-blue-accent transition-colors duration-300 leading-tight">{t(`safety.items.${feature.key}.title`)}</h3>
                  <p className="text-[#64748b] text-[15px] font-medium leading-[1.8]">
                    {t(`safety.items.${feature.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div
            className="badges-container mt-24 pt-16 flex flex-wrap justify-center items-center gap-4 md:gap-8"
            style={{ borderTop: '1px solid rgba(0, 120, 255, 0.1)' }}
          >
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="trust-badge flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm"
                style={{ border: '1px solid rgba(0, 120, 255, 0.12)' }}
              >
                <CheckCircle2 size={16} className="text-blue-accent" />
                <span className="text-dark/80 text-sm font-bold tracking-wide uppercase">{t(`safety.badges.${badge}`)}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Safety;
