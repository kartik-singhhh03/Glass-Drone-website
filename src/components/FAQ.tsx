import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import SectionWrapper from './ui/SectionWrapper';
import SectionHeading from './ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Is drone cleaning safe?",
    answer: "Absolutely. Drones completely replace human workers on dangerous scaffolding. We use high-capacity tethered systems strictly equipped with redundant power, precise collision avoidance sensors, and rigorous pre-flight safety checks to ensure zero risk to your property or pedestrians."
  },
  {
    question: "What building heights are supported?",
    answer: "Our continuous-power tethered drones can effortlessly reach up to 45 stories tall directly from the ground level. For extreme skyscrapers above that threshold, we can legally and safely deploy from intermediate terraced levels or the roof downward."
  },
  {
    question: "Does weather affect operations?",
    answer: "Yes. For optimal safety and spotless wash results, we require wind speeds below 20 mph and no active heavy precipitation. Our dedicated operations team monitors meteorological data constantly to confidently schedule and execute the perfect flight window."
  },
  {
    question: "Is it suitable for all glass types?",
    answer: "Yes. We utilize a highly calibrated low-pressure spray combined with specialized ultra-soft rotating aviation brushes. It is entirely safe for all exterior architectural glass, including tinted, coated, reflective, or even historic delicate panes."
  },
  {
    question: "Are permits required?",
    answer: "We handle 100% of all local and national aviation compliance on our end. Depending on your building's location, we routinely file the necessary FAA or EASA airspace waivers for urban flying and organize any required temporary ground perimeters."
  },
  {
    question: "How long does cleaning take?",
    answer: "Drone operations are radically faster. A massive commercial mid-rise that traditionally takes a rope-access crew over two weeks can often be meticulously washed by our fleet deployment in just 1 to 3 days."
  },
  {
    question: "Do you offer recurring service?",
    answer: "Yes. Most commercial and luxury residential clients choose a quarterly or bi-annual maintenance contract to keep their properties pristine. Subscribing to a scheduled maintenance rhythm locks in our most heavily discounted service pricing."
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
          subtitle="Everything you need to know about autonomous exterior building maintenance."
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
