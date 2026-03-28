import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    question: "Is drone cleaning safe?",
    answer: "Yes. The drone is piloted in full visual line of sight by a certified remote pilot at all times. This eliminates the need for workers on scaffolding or at height. Each operation follows strict safety procedures, including pre-flight checks and controlled flight paths to ensure safety for both the property and surrounding environment."
  },
  {
    question: "What building heights are supported?",
    answer: "Our system is designed for high-rise buildings and can operate efficiently across a wide range of heights. Operations are planned based on site conditions and safety regulations, ensuring optimal coverage and safe execution."
  },
  {
    question: "Does weather affect operations?",
    answer: "Yes. For safe and effective cleaning, operations require suitable weather conditions, including low wind speeds and no heavy precipitation. Each project is scheduled based on real-time weather monitoring to ensure optimal results."
  },
  {
    question: "How does the drone cleaning system work?",
    answer: "The drone is equipped with a pressure washing system and operates at a safe distance from the building (typically 5 meters or more). A water hose runs from the ground to the drone, supplying continuous flow. We use deionised water to ensure a spotless, streak-free finish after drying. For heavily soiled surfaces, a specialised cleaning foam is applied before rinsing."
  },
  {
    question: "Is it suitable for all glass types?",
    answer: "Yes. We utilise a precisely calibrated low-pressure spray system. It is entirely safe for all exterior architectural glass, including tinted, coated, reflective, or delicate panes."
  },
  {
    question: "Are permits required?",
    answer: "We handle all aviation compliance on our end. Our operations are conducted under PDRA-S01 v1.2 compliant procedures with operational authorisation OT_264_K1 issued by the Estonian Transport Administration."
  },
  {
    question: "How long does cleaning take?",
    answer: "Piloted drone operations are significantly faster than traditional methods. A commercial building that traditionally takes a rope-access crew over two weeks can often be completed in a fraction of the time, with far less disruption to tenants or the surrounding area."
  },
  {
    question: "Do you offer recurring service?",
    answer: "Yes. Most commercial and residential clients choose a quarterly or bi-annual maintenance schedule to keep their properties pristine year-round. Contact us to discuss a tailored maintenance plan."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector('.faq-item')) return;
      
      const ctx = gsap.context(() => {
        gsap.fromTo('.faq-item', 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
    }
  }, []);

  return (
    <SectionWrapper id="faq" bg="white">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <SectionHeading 
          badge="Knowledge Base"
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about our piloted drone exterior cleaning service."
          className="mb-16" 
        />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`faq-item border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-light/80 shadow-md shadow-gray-200/50' : 'bg-white hover:border-blue-accent/30 hover:shadow-sm'}`}
              >
                <button 
                  className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className={`text-[19px] font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-blue-accent' : 'text-dark'}`}>
                    {faq.question}
                  </span>
                  
                  {/* Plus/Minus Icon */}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-blue-accent text-white' : 'bg-gray-100 text-dark/50'}`}>
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <Minus size={16} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                      <Plus size={16} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                    </div>
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0 pb-0'}`}
                >
                  <div className="overflow-hidden px-8">
                    <p className="text-dark/70 text-lg font-light leading-relaxed pt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};
export default FAQ;
