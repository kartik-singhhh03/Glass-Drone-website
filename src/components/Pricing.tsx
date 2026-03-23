import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpToLine, Maximize2, Route, Droplets, CalendarRange, MapPin } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';
import Button from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

const pricingFactors = [
  { 
    icon: <ArrowUpToLine className="w-8 h-8 text-white" />, 
    title: 'Building Height', 
    desc: 'Extremely tall elevations require specialized tether matrices and optimized fluid pressure regulation.' 
  },
  { 
    icon: <Maximize2 className="w-8 h-8 text-white" />, 
    title: 'Surface Area', 
    desc: 'Total square footage of the glass facade dictates total flight time & the number of drones deployed.' 
  },
  { 
    icon: <Route className="w-8 h-8 text-white" />, 
    title: 'Accessibility', 
    desc: 'Complex architectural overhangs and limited ground-space perimeters affect the initial setup time.' 
  },
  { 
    icon: <Droplets className="w-8 h-8 text-white" />, 
    title: 'Level of Soil', 
    desc: 'Heavy atmospheric buildup may require specialized soft-brushes or multiple pre-treatment washing passes.' 
  },
  { 
    icon: <CalendarRange className="w-8 h-8 text-white" />, 
    title: 'Frequency', 
    desc: 'Ongoing maintenance contracts are significantly discounted compared to massive one-off restoration washes.' 
  },
  { 
    icon: <MapPin className="w-8 h-8 text-white" />, 
    title: 'Location', 
    desc: 'Local aviation permitting requirements, airspace class restrictions, and transport logistics.' 
  },
];

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector('.pricing-card')) return;
      
      const ctx = gsap.context(() => {
        gsap.fromTo('.pricing-card', 
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1, 
            scale: 1,
            y: 0, 
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }, containerRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <SectionWrapper id="pricing" bg="light">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        
        <SectionHeading 
          badge="Value Engineered"
          title="How Pricing Works"
          subtitle="Drone cleaning completely eliminates baseline scaffolding costs. Each final quote is highly customized around six core variables."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {pricingFactors.map((factor, index) => (
            <Card key={index} padding="md" hover className="pricing-card bg-white border border-gray-100 flex flex-col group">
              <div className="w-14 h-14 rounded-2xl bg-blue-accent flex items-center justify-center mb-6 shadow-md shadow-blue-accent/30 group-hover:scale-110 transition-transform duration-300">
                {factor.icon}
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-blue-accent transition-colors duration-300">
                {factor.title}
              </h3>
              <p className="text-dark/70 font-light leading-relaxed">
                {factor.desc}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[2rem] border border-blue-accent/10 shadow-xl shadow-gray-200/50 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-accent/5"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-dark mb-4 tracking-tight">Ready for your exact numbers?</h3>
            <p className="text-dark/70 text-lg mb-8 font-light">Eliminate the guesswork. We use satellite mapping to instantly calculate 90% of your quote before we even talk.</p>
            <Button href="#contact" variant="primary" size="lg" className="w-full sm:w-auto uppercase tracking-wide text-sm font-bold shadow-blue-accent/30 shadow-xl">
              Send your building details for a fast estimate
            </Button>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Pricing;
