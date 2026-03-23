import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Landmark, Store, Home, Factory, Hexagon } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { icon: <Building2 className="w-10 h-10 text-white" />, title: 'Office Buildings' },
  { icon: <Landmark className="w-10 h-10 text-white" />, title: 'Hotels & Resorts' },
  { icon: <Store className="w-10 h-10 text-white" />, title: 'Shopping Centers' },
  { icon: <Home className="w-10 h-10 text-white" />, title: 'Residential Complexes' },
  { icon: <Factory className="w-10 h-10 text-white" />, title: 'Industrial Facilities' },
  { icon: <Hexagon className="w-10 h-10 text-white" />, title: 'Modern Glass Structures' }
];

const TargetClients = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.client-card', 
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1, 
          scale: 1,
          y: 0, 
          duration: 0.8,
          stagger: 0.1,
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
    <SectionWrapper id="clients" bg="light" className="border-t border-gray-100">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <SectionHeading 
          badge="Global Reach"
          title="Who We Serve"
          subtitle="Engineered to adapt across any industry, our autonomous cleaning systems guarantee rapid deployment and spot-free finishes."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {clients.map((client, index) => (
            <Card 
              key={index} 
              padding="md" 
              hover 
              className="client-card flex items-center gap-6 group bg-white border border-gray-100"
            >
              <div className="w-20 h-20 rounded-[1.25rem] bg-dark flex flex-shrink-0 items-center justify-center shadow-lg group-hover:bg-blue-accent group-hover:shadow-blue-accent/30 transition-all duration-300 transform group-hover:scale-105 group-hover:-rotate-3">
                {client.icon}
              </div>
              <h3 className="text-xl font-bold text-dark group-hover:text-blue-accent transition-colors duration-300 leading-tight">
                {client.title}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TargetClients;
