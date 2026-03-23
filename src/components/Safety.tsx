import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Scale, FileText, CloudRain, CheckCircle2 } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';

gsap.registerPlugin(ScrollTrigger);

const safetyFeatures = [
  {
    icon: <Award className="w-8 h-8 text-white" />,
    title: 'Certified Operators',
    desc: 'All pilots undergo rigorous training and hold advanced commercial drone flight certifications.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: 'Full Insurance Coverage',
    desc: 'Covered by a €10M specialized aviation liability policy, guaranteeing absolute safety for your asset.'
  },
  {
    icon: <Scale className="w-8 h-8 text-white" />,
    title: 'Regulatory Compliance',
    desc: 'Strict adherence to EASA (European Union Aviation Safety Agency) drone operation standards.'
  },
  {
    icon: <FileText className="w-8 h-8 text-white" />,
    title: 'Risk Assessments',
    desc: 'Detailed SORA (Specific Operations Risk Assessment) is conducted structurally before every project.'
  },
  {
    icon: <CloudRain className="w-8 h-8 text-white" />,
    title: 'Weather Monitoring Systems',
    desc: 'Advanced meteorological sensors autonomously ground missions if wind or rain exceed safe thresholds.'
  }
];

const trustBadges = [
  'EASA Certified Provider',
  '€10M Comprehensive Liability',
  'ISO 9001:2015 Compliant',
  'Zero Incident Record'
];

const Safety = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector('.safety-item')) return;
      
      const ctx = gsap.context(() => {
        // Fade-in staggered animation for icons/cards
        gsap.fromTo('.safety-item', 
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
              toggleActions: 'play none none reverse'
            }
          }
        );
        
        // Trust badges fade-in
        if (document.querySelector('.trust-badge')) {
          gsap.fromTo('.trust-badge', 
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
              }
            }
          );
        }
      }, containerRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <SectionWrapper id="safety" bg="white">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        
        <SectionHeading 
          badge="Uncompromising Safety"
          title="Safety and Compliance standard."
          subtitle="Our protocol ensures 100% protection to your property, operations, and the public."
          className="mb-20"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
          {safetyFeatures.map((feature, index) => (
            <Card 
              key={index} 
              padding="md" 
              hover 
              className={`safety-item border border-gray-100 group ${index === 3 ? 'lg:col-start-1 lg:col-span-1 lg:ml-[50%]' : ''} ${index === 4 ? 'lg:col-start-2 lg:col-span-1 lg:ml-[50%]' : ''}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-accent flex items-center justify-center mb-6 shadow-lg shadow-blue-accent/30 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-dark/70 font-light leading-relaxed">
                {feature.desc}
              </p>
            </Card>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="badges-container mt-24 pt-16 border-t border-gray-100 flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="trust-badge flex items-center gap-2 px-5 py-2.5 bg-light rounded-full border border-gray-200 shadow-sm">
              <CheckCircle2 size={16} className="text-blue-accent" />
              <span className="text-dark/80 text-sm font-bold tracking-wide uppercase">{badge}</span>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};
export default Safety;
