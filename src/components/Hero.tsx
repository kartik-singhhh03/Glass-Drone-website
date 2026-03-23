import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import Button from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const droneWrapperRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const ripple1Ref = useRef<HTMLDivElement>(null);
  const ripple2Ref = useRef<HTMLDivElement>(null);
  const ripple3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Text fade-in upward animation
      gsap.from('.hero-text-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Buttons animation
      gsap.from('.hero-btn-element', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.6
      });

      // Subtle parallax effect on background pattern
      gsap.to('.hero-bg-pattern', {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Premium Drone entry animation
      gsap.fromTo(droneWrapperRef.current,
        {
          x: 150,
          y: 20,
          scale: 0.9,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: 'power4.out',
          delay: 0.3,
          onComplete: () => {
            // Floating effect
            gsap.to(droneRef.current, {
              y: '-=15', // Float upward smoothly
              duration: 3.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            });

            // Shadow animation synced perfectly with float
            gsap.to(shadowRef.current, {
              scale: 0.85,
              opacity: 0.5,
              duration: 3.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            });
          }
        }
      );

      // Fine-tuned Vibration Ripple Effects (Softer intensity on mobile)
      const ripples = [ripple1Ref.current, ripple2Ref.current, ripple3Ref.current];
      
      ripples.forEach((ripple, index) => {
        gsap.fromTo(ripple,
          { scale: 0.8, opacity: 0.4 },
          {
            scale: 1.6,
            opacity: 0,
            duration: 3.5,
            ease: 'power1.out',
            repeat: -1,
            delay: index * 1.0
          }
        );
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-[#F8F8FF] z-10 pt-[100px] md:pt-[120px] lg:pt-[160px] pb-[100px] md:pb-[120px] lg:pb-[140px]"
    >
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Base Realistic Image on Left */}
        <div 
          className="absolute top-0 left-0 w-[100%] md:w-[80%] lg:w-[65%] h-full opacity-35 mix-blend-luminosity"
          style={{ 
            backgroundImage: "url('/hero_drone.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'left center',
          }}
        ></div>
        
        {/* Layer 2: Gradient fading to base color towards Center/Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8FF]/30 via-[#F8F8FF]/80 to-[#F8F8FF]"></div>
        
        {/* Layer 3: Soft blur filter for smooth photo transition */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>

        {/* Subtle Background Pattern */}
        <div className="hero-bg-pattern absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 lg:gap-8 items-center lg:items-start min-h-[70vh] lg:min-h-[600px]">
        
        {/* Left Side: Text Content */}
        {/* Mobile: Order 2 (Below Drone). Tablet/Desktop: Order 1 */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 relative z-20 w-full max-w-[700px] mx-auto lg:mx-0">
          
          <h1 className="hero-text-element text-[34px] sm:text-[42px] md:text-[40px] lg:text-[60px] font-semibold tracking-tight text-slate-900 mb-5 leading-[1.12]">
            Drone Window Cleaning for <span className="text-blue-accent whitespace-nowrap">High-Rise</span> Buildings
          </h1>

          <p className="hero-text-element text-[16px] sm:text-[18px] md:text-[16px] lg:text-[20px] text-[#666666] mb-6 w-full max-w-[600px] leading-[1.6] font-normal tracking-tight">
            A safer, faster, and more cost-efficient way to clean glass façades and hard-to-reach surfaces.
          </p>

          <div className="hero-text-element hidden sm:block w-8 h-[2px] bg-blue-accent/30 mb-5"></div>
          
          <p className="hero-text-element text-[11px] sm:text-[12px] md:text-[10px] lg:text-[12px] text-slate-500 font-medium tracking-wider uppercase leading-relaxed w-full max-w-[500px]">
            Serving residential, commercial, and government buildings across Estonia, expanding to Baltics and Scandinavia.
          </p>

          {/* Buttons Group with clear margin-top and proper flex gap */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start items-center gap-4 w-full sm:w-auto mt-6 lg:mt-8 relative z-30">
            <div className="hero-btn-element w-full sm:w-auto">
              <Button href="#quote" size="lg" variant="primary" className="w-full sm:w-auto px-6 py-3 md:px-5 lg:px-8 lg:py-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-accent/30">
                Get a Quote
              </Button>
            </div>
            <div className="hero-btn-element w-full sm:w-auto">
              <Button href="#demo" size="lg" variant="outline" className="w-full sm:w-auto px-6 py-3 md:px-4 lg:px-8 lg:py-3.5 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 border-gray-300 bg-white shadow-sm">
                <Play size={18} className="text-blue-accent fill-blue-accent/20" /> Watch Demo
              </Button>
            </div>
            <div className="hero-btn-element hidden lg:block w-full sm:w-auto">
              <Button href="#contact" size="lg" variant="ghost" className="w-full sm:w-auto px-8 py-3.5 transition-all duration-300 hover:-translate-y-1">
                Contact Us
              </Button>
            </div>
          </div>
          
        </div>

        {/* Right Side: Drone Area */}
        {/* Mobile: Order 1 (Above Text). Tablet/Desktop: Order 2 */}
        <div className="md:col-span-6 lg:col-span-5 relative order-1 md:order-2 flex items-center justify-center w-full mt-4 lg:mt-0 mb-4 lg:mb-0">
          
          {/* Enhanced Radial Glow behind drone */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
             <div className="absolute w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-[rgba(0,172,206,0.15)] blur-[50px]"></div>
          </div>

          {/* Visibility-improved Ripple Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div ref={ripple1Ref} className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] border border-[rgba(0,172,206,0.5)] rounded-full origin-center"></div>
            <div ref={ripple2Ref} className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] border border-[rgba(0,172,206,0.5)] rounded-full origin-center"></div>
            <div ref={ripple3Ref} className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] border border-[rgba(0,172,206,0.5)] rounded-full origin-center"></div>
          </div>

          {/* Drone and Shadow */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[260px] sm:max-w-[350px] lg:max-w-[600px] mx-auto">
            <div ref={droneWrapperRef} className="relative w-full px-2 lg:px-0">
              <img 
                ref={droneRef}
                src="/d-2.png" 
                alt="Glass Cleaning Drone" 
                className="w-full h-auto object-contain relative drop-shadow-2xl"
              />
            </div>
            
            {/* Soft Shadow */}
            <div ref={shadowRef} className="mt-6 sm:mt-12 relative flex justify-center items-center w-full h-[15px]">
               <div className="absolute w-[100px] sm:w-[150px] lg:w-[200px] h-[4px] sm:h-[6px] bg-black/15 blur-[4px] rounded-[100%]"></div>
               <div className="absolute w-[160px] sm:w-[240px] lg:w-[320px] h-[10px] sm:h-[14px] bg-black/10 blur-[12px] rounded-[100%]"></div>
            </div>
          </div>

        </div>
      </div>

      {/* --- HERO BOTTOM CURVE (SVG Option 1) --- */}
      {/* Ensures it stays at exactly the bottom, overlapping the section's extra pb-[100px] clear space */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          className="w-full h-[40px] md:h-[80px] lg:h-[120px] block transform translate-y-[1px]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,120 L0,0 C360,100 1080,100 1440,0 L1440,120 Z" fill="#ffffff" />
        </svg>
      </div>

    </section>
  );
};

export default Hero;

