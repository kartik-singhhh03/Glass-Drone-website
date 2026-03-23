import { useEffect, useRef } from 'react';
import { TrendingDown, Zap, ShieldCheck, VolumeX, Maximize, Layers } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';

const benefits = [
  {
    icon: <TrendingDown className="w-8 h-8 text-blue-accent" />,
    title: 'No scaffolding or lifts required',
    description: 'Eliminates heavy equipment rental costs and setup time, passing immense savings directly to your bottom line.'
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-accent" />,
    title: 'Faster cleaning for large surfaces',
    description: 'Multi-drone deployment accelerates project timelines by up to 80% compared to traditional window washing crews.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-accent" />,
    title: 'Increased safety (no workers at height)',
    description: 'Zero physical risk of human injury translates to significantly lower insurance liabilities and complete peace of mind.'
  },
  {
    icon: <VolumeX className="w-8 h-8 text-blue-accent" />,
    title: 'Minimal disruption to operations',
    description: 'Whisper-quiet electric drones ensure your tenants work or live peacefully without noisy cranes blocking their views.'
  },
  {
    icon: <Maximize className="w-8 h-8 text-blue-accent" />,
    title: 'Suitable for complex structures',
    description: 'Effortlessly reach difficult angles, steep roofs, recessed panels, and overhanging architectural features.'
  },
  {
    icon: <Layers className="w-8 h-8 text-blue-accent" />,
    title: 'Scalable for massive projects',
    description: 'Whether it is a single skyscraper or an entire commercial spread, our fleet guarantees uniform quality at limitless scale.'
  }
];

const Benefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use IntersectionObserver — completely independent of GSAP, can never be killed
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = container.querySelectorAll<HTMLElement>('.benefit-card');
            cards.forEach((card, i) => {
              card.style.transitionDelay = `${i * 0.1}s`;
              card.classList.add('benefit-card--visible');
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="benefits" bg="white">
      <SectionHeading
        badge="Unmatched Value"
        title="Why Choose Drone Cleaning?"
        subtitle="The traditional way is outdated. We bring highly cost-efficient advanced robotics to property maintenance."
      />

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} hover className="benefit-card bg-light/30 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-accent/10 transition-colors duration-300">
              {benefit.icon}
            </div>
            <h3 className="text-2xl font-bold text-dark mb-4 group-hover:text-blue-accent transition-colors">{benefit.title}</h3>
            <p className="text-dark/70 leading-relaxed text-[17px] font-light">
              {benefit.description}
            </p>
          </Card>
        ))}
      </div>

      <style>{`
        .benefit-card {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .benefit-card--visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </SectionWrapper>
  );
};

export default Benefits;
