import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';
import { Building2, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}



const CaseStudies = () => {
  const { t } = useTranslation();
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeading 
            badge={t('projects.badge')}
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
            align="left"
            className="mb-0"
          />
        </div>
        
        {/* Coming soon card */}
        <div className="clip-reveal-container w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="project-content flex flex-col lg:flex-row items-center gap-12 p-10 md:p-16">
            
            {/* Image column */}
            <div className="w-full lg:w-1/2 h-[300px] md:h-[420px] rounded-[1.5rem] overflow-hidden relative">
              <img loading="lazy" 
                src="/commercial.webp" 
                alt="First drone cleaning project — launching 2026" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
                <span className="text-white font-semibold text-sm tracking-widest uppercase bg-blue-accent/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  {t('projects.launching')}
                </span>
              </div>
            </div>

            {/* Content column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6 text-blue-accent font-medium bg-blue-accent/10 w-max px-4 py-2 rounded-lg">
                <Building2 size={18} />
                <span>{t('projects.feature')}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
                {t('projects.card_title')}
              </h3>
              <p className="text-dark/70 font-light leading-relaxed text-lg mb-8">
                {t('projects.card_desc')}
              </p>
              <div className="flex items-center gap-3 bg-blue-accent/5 border border-blue-accent/20 rounded-2xl p-5">
                <CheckCircle size={22} className="text-blue-accent flex-shrink-0" />
                <p className="text-dark/80 font-medium">
                  {t('projects.card_highlight')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-accent/90 transition-all duration-300 shadow-lg shadow-blue-accent/20 hover:-translate-y-1"
          >
            {t('projects.btn')}
          </a>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default CaseStudies;
