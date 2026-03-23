import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Focus } from 'lucide-react';
import Button from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'High-Rise Exterior Cleaning',
    description:
      'Clean impossibly tall buildings efficiently without the risk of costly scaffolding or dangling workers. Our autonomous drone fleet handles every floor with precision.',
    benefit: 'Reduce traditional cleaning time by up to 60%',
    image: '/commercial.png',
    tag: 'Service 01',
  },
  {
    title: 'Glass Façade Maintenance',
    description:
      'Maintain pristine, streak-free building exteriors utilizing advanced precision spraying technology. Each pass is calibrated for optical clarity and material safety.',
    benefit: 'Improve building value and occupant experience',
    image: '/residential.png',
    tag: 'Service 02',
  },
  {
    title: 'Hard-To-Reach Surfaces',
    description:
      'Effortlessly clean architectural features, curves, and overhangs inaccessible by traditional crane baskets. Drones navigate complex geometry seamlessly.',
    benefit: 'Zero manual risk or expensive mechanical lifts',
    image: '/specialty.png',
    tag: 'Service 03',
  },
  {
    title: 'Scheduled Maintenance',
    description:
      'Automated, regular cleaning flight paths ensuring your building maintains a flawless look year-round. Set it once — our system handles the rest.',
    benefit: 'Consistent, budgetable property management',
    image: '/d-4.jpg',
    tag: 'Service 04',
  },
  {
    title: 'Custom Cleaning Solutions',
    description:
      'Tailored chemical treatments and specialized soft-wash protocols for sensitive building materials. Every solution is engineered to your exact façade requirements.',
    benefit: 'Flexible solutions scaled to your exact facade',
    image: '/hero_drone.png',
    tag: 'Service 05',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
              What We Do
            </span>
          </div>
          <h2 className="text-[38px] md:text-[48px] lg:text-[56px] font-bold text-slate-900 leading-[1.1] tracking-tight">
            Elevated Cleaning Solutions
          </h2>
          <p className="text-slate-500 text-[17px] md:text-[20px] max-w-[640px] mx-auto leading-[1.65] mt-5 font-normal">
            Premium drone technology perfectly scaled to every architectural challenge.
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
                      alt={service.title}
                      className="service-img w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/commercial.png';
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
                      {service.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="service-content w-full md:w-[48%] flex flex-col justify-center px-9 py-10 md:px-12 md:py-14">
                    {/* Accent line */}
                    <div className="w-10 h-[3px] bg-blue-accent rounded-full mb-7" />

                    <h3 className="text-[26px] md:text-[30px] xl:text-[34px] font-bold text-slate-900 mb-4 leading-[1.18] tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-[15px] md:text-[16px] text-slate-500 mb-7 leading-[1.75] max-w-[440px] font-normal">
                      {service.description}
                    </p>

                    {/* Benefit callout */}
                    <div className="flex items-start gap-3 bg-[#F0FAFB] border border-blue-accent/15 rounded-[16px] p-4 mb-8">
                      <Focus className="text-blue-accent flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="block font-semibold text-slate-800 text-[12px] uppercase tracking-wider mb-1">
                          Core Benefit
                        </span>
                        <span className="text-slate-500 text-[14px] leading-relaxed">
                          {service.benefit}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-max group/btn shadow-sm border-gray-200 hover:border-blue-accent hover:bg-transparent px-7 py-3.5"
                    >
                      <span className="mr-3 font-semibold text-[14px]">Get a Quote</span>
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
