import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Scale, FileText, CloudRain, CheckCircle2 } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const safetyFeatures = [
  {
    icon: <Award className="w-8 h-8 text-white" />,
    title: 'Certified Remote Pilots',
    desc: 'All operations are conducted by certified remote pilots (RPIC) who maintain full visual line of sight at all times.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: 'Active Insurance Coverage',
    desc: 'All operations are covered by an active insurance policy, providing comprehensive protection for your property.'
  },
  {
    icon: <Scale className="w-8 h-8 text-white" />,
    title: 'Regulatory Compliance',
    desc: 'PDRA-S01 v1.2 compliant operations – operational authorisation OT_264_K1 issued by the Estonian Transport Administration.'
  },
  {
    icon: <FileText className="w-8 h-8 text-white" />,
    title: 'Pre-Flight Risk Assessments',
    desc: 'A thorough operational risk assessment is conducted before every project to ensure safe and compliant execution.'
  },
  {
    icon: <CloudRain className="w-8 h-8 text-white" />,
    title: 'Weather Monitoring',
    desc: 'Each project is scheduled based on real-time meteorological monitoring. Operations are grounded if wind or rain exceed safe thresholds.'
  }
];

const trustBadges = [
  'PDRA-S01 v1.2 Compliant',
  'Active Insurance Coverage',
  'Certified Remote Pilots',
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
