import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useTranslation } from 'react-i18next';
import SectionHeading from './ui/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const steps = [
  { key: 'step01' },
  { key: 'step02' },
  { key: 'step03' },
  { key: 'step04' }
];

// Spatially mapped precise nodes pushing text strictly outwards resolving any collision paths
const desktopNodes = [
  { x: '5%', y: '50%', textAlign: 'text-left', posOpts: 'top-[80px] left-0 w-[280px]' },
  { x: '27.5%', y: '25%', textAlign: 'text-center', posOpts: 'top-[80px] left-1/2 -translate-x-1/2 w-[280px]' },
  { x: '72.5%', y: '75%', textAlign: 'text-center', posOpts: 'bottom-[80px] left-1/2 -translate-x-1/2 w-[280px]' },
  { x: '95%', y: '50%', textAlign: 'text-right', posOpts: 'top-[80px] right-0 w-[280px]' }
];

const HowItWorks = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Continuous Drone Floating Timeline: Soft -5px to +5px float
      if (document.querySelector('.drone-anim-layer')) {
        gsap.set('.drone-anim-layer', { y: 5 });
        gsap.to('.drone-anim-layer', {
          y: -5,
          yoyo: true,
          repeat: -1,
          duration: 1.5,
          ease: 'sine.inOut'
        });
      }

      // ---- DESKTOP (MotionPath SVG Timeline) ----
      if (window.innerWidth >= 1024) {
        const droneWrapper = document.querySelector('#drone-wrapper');
        const path = document.querySelector('#active-path') as SVGPathElement | null;

        // CRITICAL: null-guard — if either element is missing, skip desktop animation
        if (!droneWrapper || !path) return;

        gsap.set(droneWrapper, { autoAlpha: 1 });

        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.desktop-container',
            start: 'center center',
            end: '+=2000',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.12) setActiveStep(0);
              else if (p < 0.5) setActiveStep(1);
              else if (p < 0.87) setActiveStep(2);
              else setActiveStep(3);
            }
          }
        });

        tl.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'none'
        }, 0);

        tl.to('#drone-wrapper', {
          motionPath: {
            path: '#flight-path',
            align: '#flight-path',
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          duration: 1,
          ease: 'none'
        }, 0);

      } else {
        // ---- MOBILE / TABLET (Vertical Linear Timeline) ----
        if (!document.querySelector('.mobile-container')) return;

        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: '.mobile-container',
            start: 'top 40%',
            end: 'bottom 85%',
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.20) setActiveStep(0);
              else if (p < 0.50) setActiveStep(1);
              else if (p < 0.80) setActiveStep(2);
              else setActiveStep(3);
            }
          }
        });

        tlMobile.to('.mobile-active-line', {
          height: '100%',
          ease: 'none'
        }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-white relative pt-[60px] md:pt-[80px] pb-16 md:pb-24 overflow-hidden z-10 w-full">
      <div className="max-w-[1240px] mx-auto px-6 w-full">

        {/* Title Block isolated cleanly to seamlessly scroll past as the container pins */}
        <div className="w-full text-center max-w-[800px] mx-auto mb-12 flex-shrink-0">
          <SectionHeading
            badge={t('how.badge')}
            title={t('how.title')}
            subtitle={t('how.subtitle')}
            className="mb-0 mx-auto"
          />
        </div>

        {/* ========================================= */}
        {/* DESKTOP SVG MOTION-PATH LAYOUT             */}
        {/* ========================================= */}
        <div className="desktop-container relative w-full max-w-[1000px] h-[500px] mx-auto hidden lg:block select-none pointer-events-none mt-4">

          {/* SVG Background Path Curves */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            {/* Faded Background Track */}
            <path id="flight-path" d="M 50,200 Q 275,0 500,200 T 950,200" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeDasharray="12 12" />
            {/* Glowing Active Track dynamically scrubbed rendering */}
            <path id="active-path" d="M 50,200 Q 275,0 500,200 T 950,200" fill="none" stroke="#00ACCE" strokeWidth="6" strokeLinecap="round" />
          </svg>

          {/* GSAP MotionPath Target Wrapper: 90x90px explicitly specified pure centering */}
          <div id="drone-wrapper" className="absolute top-0 left-0 w-[90px] h-[90px] z-30 opacity-0 center origin-center">
            {/* Inner Floating Engine with totally naked transparent PNG representation */}
            <div className="drone-anim-layer w-full h-full relative group">
              <img loading="lazy" src="/d-2.webp" alt="Drone Path Tracker" className="w-full h-full object-contain relative z-10 scale-110 drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]" />
            </div>
          </div>

          {/* Statically Mapped Interaction Nodes */}
          {steps.map((step, i) => {
            const isPassed = activeStep >= i;
            const isCurrent = activeStep === i;
            const node = desktopNodes[i];

            return (
              <div key={i} className="absolute z-20 pointer-events-auto" style={{ left: node.x, top: node.y }}>
                {/* Visual Node Core center point offset */}
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  {isCurrent && (
                    <div className="absolute inset-0 bg-blue-accent/30 rounded-full animate-ping scale-[2] origin-center"></div>
                  )}
                  <div className={`w-[46px] h-[46px] rounded-full flex items-center justify-center font-extrabold text-[18px] border-[4px] shadow-lg transition-colors duration-[600ms]
                      ${isPassed ? 'bg-blue-accent border-blue-accent text-white shadow-[0_0_24px_rgba(0,172,206,0.6)]' : 'bg-white border-gray-200 text-gray-400'}`}>
                    {i + 1}
                  </div>
                </div>

                {/* Absolute Floating Content Box isolated gracefully above and below the line */}
                <div className={`absolute ${node.posOpts} ${node.textAlign} transition-all duration-700 pointer-events-none 
                    ${isPassed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                  <h3 className="text-[22px] font-bold text-slate-900 mb-3 leading-tight tracking-tight shadow-white drop-shadow-md">{t(`how.items.${step.key}.title`)}</h3>
                  <p className="text-[15px] text-slate-600 leading-[1.7] font-medium">{t(`how.items.${step.key}.desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================= */}
        {/* MOBILE / TABLET VERTICAL SCRUB LAYOUT     */}
        {/* ========================================= */}
        <div className="mobile-container relative w-full lg:hidden flex flex-col gap-[50px] pl-[50px] py-10 mx-auto max-w-[500px]">

          {/* Vertical Track Rail */}
          <div className="absolute top-10 bottom-16 left-[28px] w-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="mobile-active-line w-full bg-blue-accent relative rounded-full" style={{ height: 0 }}>
              {/* Dynamically Pinned Mobile Drone Tracker! Fixed 60x60px constraint */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[60px] h-[60px] z-30 pointer-events-none">
                <div className="drone-anim-layer w-full h-full relative">
                  <img loading="lazy" src="/d-3.webp" alt="Drone Scrubber" className="w-full h-full object-contain rotate-90 drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Text Blocks */}
          {steps.map((step, i) => {
            const isPassed = activeStep >= i;
            const isCurrent = activeStep === i;

            return (
              <div key={`mob-${i}`} className="relative w-full z-20 flex flex-col pl-6 pr-4">
                {/* Left Side Node */}
                <div className="absolute -left-[44px] top-6 -translate-y-1/2">
                  {isCurrent && (
                    <div className="absolute inset-0 bg-blue-accent/30 rounded-full animate-ping scale-[2] origin-center"></div>
                  )}
                  <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center font-bold text-[18px] border-[4px] shadow-lg transition-colors duration-[600ms]
                      ${isPassed ? 'bg-blue-accent border-blue-accent text-white shadow-[0_0_20px_rgba(0,172,206,0.6)]' : 'bg-white border-gray-200 text-gray-400'}`}>
                    {i + 1}
                  </div>
                </div>

                {/* Content Block */}
                <div className={`transition-all duration-700 bg-white/50 py-2
                    ${isPassed ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}`}>
                  <h3 className="text-[22px] font-bold text-slate-900 mb-2 leading-[1.3] tracking-tight">{t(`how.items.${step.key}.title`)}</h3>
                  <p className="text-[15px] sm:text-[16px] text-slate-500 leading-[1.7] max-w-[320px] font-medium">{t(`how.items.${step.key}.desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
