import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Focus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from './ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    key: 'service01',
    image: '/HIGH-RISE CLEANING.webp',
    tag: 'Service 01',
  },
  {
    key: 'service02',
    image: '/GLASS FAÇADE MAINTENANCE.webp',
    tag: 'Service 02',
  },
  {
    key: 'service03',
    image: '/HARD-TO-REACH SURFACES.webp',
    tag: 'Service 03',
  },
  {
    key: 'service04',
    image: '/SCHEDULED MAINTENANCE.webp',
    tag: 'Service 04',
  },
  {
    key: 'service05',
    image: '/hero_drone.webp',
    tag: 'Service 05',
  },
];

const Services = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!document.querySelector('.service-card')) return;

    let ctx: gsap.Context;

    // rAF ensures DOM is fully painted before GSAP measures positions
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.service-card', sectionRef.current);
        const imgs = gsap.utils.toArray<HTMLElement>('.service-img', sectionRef.current);

        // Card fade + rise reveal
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 70 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                once: true,
              },
            }
          );
        });

        // Image zoom-in on scroll reveal
        imgs.forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });

        ScrollTrigger.refresh();
      }, sectionRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full bg-[#F8F9FA] py-[100px] md:py-[140px]"
    >
      <div className="max-w-[1240px] mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-[80px] md:mb-[110px]">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-accent/20 rounded-full px-4 py-2 mb-6 shadow-sm">
            <Sparkles size={13} className="text-blue-accent" />
            <span className="text-blue-accent font-semibold tracking-widest uppercase text-[11px]">
              {t('services.badge')}
            </span>
          </div>
          <h2 className="text-[38px] md:text-[48px] lg:text-[56px] font-bold text-slate-900 leading-[1.1] tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-slate-500 text-[17px] md:text-[20px] max-w-[640px] mx-auto leading-[1.65] mt-5 font-normal">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-[70px] md:gap-[100px]">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="service-card group"
              >
                <div
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 bg-white rounded-[28px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.07)] border border-gray-100/80 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.13)]`}
                >
                  {/* Image */}
                  <div className="w-full md:w-[52%] h-[260px] sm:h-[340px] md:h-auto min-h-[420px] relative overflow-hidden bg-gray-900 flex-shrink-0">
                    <img
                      src={service.image}
                      alt={t(`services.items.${service.key}.title`)}
                      className="service-img w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/commercial.webp';
                      }}
                    />
                    {/* Overlay gradient */}
                    <div
                      className={`absolute inset-0 ${isEven
                        ? 'bg-gradient-to-r from-transparent to-black/10'
                        : 'bg-gradient-to-l from-transparent to-black/10'
                        }`}
                    />
                    {/* Tag pill on image */}
                    <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-sm text-white text-[11px] font-semibold tracking-widest uppercase rounded-full px-4 py-1.5">
                      {t(`services.items.${service.key}.tag`)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="service-content w-full md:w-[48%] flex flex-col justify-center px-9 py-10 md:px-12 md:py-14">
                    {/* Accent line */}
                    <div className="w-10 h-[3px] bg-blue-accent rounded-full mb-7" />

                    <h3 className="text-[26px] md:text-[30px] xl:text-[34px] font-bold text-slate-900 mb-4 leading-[1.18] tracking-tight">
                      {t(`services.items.${service.key}.title`)}
                    </h3>

                    <p className="text-[15px] md:text-[16px] text-slate-500 mb-7 leading-[1.75] max-w-[440px] font-normal">
                      {t(`services.items.${service.key}.desc`)}
                    </p>

                    {/* Benefit callout */}
                    <div className="flex items-start gap-3 bg-[#F0FAFB] border border-blue-accent/15 rounded-[16px] p-4 mb-8">
                      <Focus className="text-blue-accent flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="block font-semibold text-slate-800 text-[12px] uppercase tracking-wider mb-1">
                          {t('services.core_benefit')}
                        </span>
                        <span className="text-slate-500 text-[14px] leading-relaxed">
                          {t(`services.items.${service.key}.benefit`)}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-max group/btn shadow-sm border-gray-200 hover:border-blue-accent hover:bg-transparent px-7 py-3.5"
                    >
                      <span className="mr-3 font-semibold text-[14px]">{t('nav.Get a Quote')}</span>
                      <ArrowRight
                        size={17}
                        className="transform group-hover/btn:translate-x-1.5 transition-transform text-blue-accent"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
