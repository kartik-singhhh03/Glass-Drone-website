import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import Card from './ui/Card';
import BeforeAfterSlider from './ui/BeforeAfterSlider';
import { Clock, TrendingDown, Building2, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: 'The Vertex Tower',
    type: '45-Story Commercial Skyscraper',
    duration: '3 Days',
    traditionalDuration: '14 Days',
    timeSaved: '78%',
    costReduced: '60%',
    outcome: 'Complete exterior facade wash, including hard-to-reach recessed structural beams. Eliminated the need for 3 highly disruptive suspended scaffolds.',
    image: '/commercial.png',
  },
  {
    title: 'Oceanside Luxury Residence',
    type: '22-Story High-End Residential',
    duration: '1.5 Days',
    traditionalDuration: '8 Days',
    timeSaved: '81%',
    costReduced: '45%',
    outcome: 'Pristine ocean-facing balconies cleaned with whispering acoustic profile, resulting in zero noise complaints or resident disruption.',
    image: '/residential.png',
  }
];

const CaseStudies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector('.clip-reveal-container')) return;

      const ctx = gsap.context(() => {
        // Image reveal using clip-path
        gsap.utils.toArray('.clip-reveal-container').forEach((container: any) => {
          gsap.fromTo(container, 
            { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 1.5,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
              }
            }
          );
        });
        
        // Content reveal staggered
        gsap.utils.toArray('.project-content').forEach((content: any) => {
          gsap.fromTo(content,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              delay: 0.3,
              scrollTrigger: {
                trigger: content,
                start: 'top 85%',
              }
            }
          );
        });
      }, sectionRef);
      
      return () => ctx.revert();
    }
  }, []);

  return (
    <SectionWrapper id="case-studies" bg="light" className="relative">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <SectionHeading 
            badge="Proven Results"
            title="Our Impact"
            subtitle="Explore how we revolutionized property maintenance for these hallmark structures."
            align="left"
            className="mb-0"
          />
          <Button variant="outline" className="mb-4 hidden md:flex">
            View All Projects
          </Button>
        </div>
        
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}>
              
              {/* Image / Slider Column */}
              <div className="w-full lg:w-3/5 h-[400px] md:h-[600px] clip-reveal-container rounded-[2rem] overflow-hidden shadow-2xl shadow-dark/5">
                <BeforeAfterSlider image={project.image} />
              </div>
              
              {/* Content Column */}
              <div className="w-full lg:w-2/5 project-content">
                <Card padding="none" hover={false} border={false} className="bg-transparent lg:bg-white lg:p-10 lg:shadow-xl lg:shadow-gray-200/50 lg:-ml-24 lg:relative lg:z-10 rounded-none lg:rounded-[2rem]">
                  <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">{project.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-8 text-blue-accent font-medium bg-blue-accent/10 w-max px-4 py-2 rounded-lg">
                    <Building2 size={18} />
                    <span>{project.type}</span>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="text-dark font-bold mb-2 flex items-center gap-2">
                        <CheckCircle size={18} className="text-blue-accent" /> Project Outcome
                      </h4>
                      <p className="text-dark/70 font-light leading-relaxed">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-light p-5 rounded-2xl border border-gray-100">
                      <Clock size={24} className="text-blue-accent mb-3" />
                      <p className="text-dark/50 text-xs font-bold uppercase tracking-wider mb-1">Duration</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-dark">{project.duration}</span>
                      </div>
                      <p className="text-dark/50 text-xs font-medium mt-1">vs {project.traditionalDuration} traditional</p>
                    </div>
                    
                    <div className="bg-blue-accent/5 p-5 rounded-2xl border border-blue-accent/20">
                      <TrendingDown size={24} className="text-blue-accent mb-3" />
                      <p className="text-blue-accent/70 text-xs font-bold uppercase tracking-wider mb-1">Cost Reduced</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-blue-accent">{project.costReduced}</span>
                      </div>
                      <p className="text-blue-accent/70 text-xs font-medium mt-1">Time saved: {project.timeSaved}</p>
                    </div>
                  </div>
                </Card>
              </div>
              
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center md:hidden">
          <Button variant="outline" className="w-full">
            View All Projects
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CaseStudies;
