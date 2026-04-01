import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "./ui/Button";
import HeroVideoModal from "./HeroVideoModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const { t } = useTranslation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const droneWrapperRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const ripple1Ref = useRef<HTMLDivElement>(null);
  const ripple2Ref = useRef<HTMLDivElement>(null);
  const ripple3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector(".hero-text-element")) return;

      const ctx = gsap.context(() => {
        // Premium Text fade-in upward animation
        gsap.from(".hero-text-element", {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        });

        // Buttons animation
        gsap.from(".hero-btn-element", {
          y: 30,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.6,
        });

        // Subtle parallax effect on background pattern
        if (document.querySelector(".hero-bg-pattern")) {
          gsap.to(".hero-bg-pattern", {
            y: "8%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Premium Drone entry animation
        if (droneWrapperRef.current && droneRef.current && shadowRef.current) {
          gsap.fromTo(
            droneWrapperRef.current,
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
              ease: "power4.out",
              delay: 0.3,
              onComplete: () => {
                // Floating effect
                gsap.to(droneRef.current, {
                  y: "-=15", // Float upward smoothly
                  duration: 3.5,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                });

                // Shadow animation synced perfectly with float
                gsap.to(shadowRef.current, {
                  scale: 0.85,
                  opacity: 0.5,
                  duration: 3.5,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              },
            },
          );
        }

        // Fine-tuned Vibration Ripple Effects (Softer intensity on mobile)
        const ripples = [
          ripple1Ref.current,
          ripple2Ref.current,
          ripple3Ref.current,
        ];

        ripples.forEach((ripple, index) => {
          if (!ripple) return;
          gsap.fromTo(
            ripple,
            { scale: 0.8, opacity: 0.4 },
            {
              scale: 1.6,
              opacity: 0,
              duration: 3.5,
              ease: "power1.out",
              repeat: -1,
              delay: index * 1.0,
            },
          );
        });
      }, containerRef);

      return () => ctx.revert();
    }
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
            backgroundImage: "url('/hero_drone.webp')",
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        ></div>

        {/* Layer 2: Gradient fading to base color towards Center/Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8FF]/30 via-[#F8F8FF]/80 to-[#F8F8FF]"></div>

        {/* Layer 3: Soft blur filter for smooth photo transition */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>

        {/* Subtle Background Pattern */}
        <div
          className="hero-bg-pattern absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(black 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="hero-container relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 lg:gap-8 items-center lg:items-start min-h-[70vh] lg:min-h-[600px]">
        {/* Left Side: Text Content */}
        {/* Mobile: Order 2 (Below Drone). Tablet/Desktop: Order 1 */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 relative z-20 w-full max-w-[700px] mx-auto lg:mx-0">
          <h1 className="hero-title hero-text-element text-[34px] sm:text-[42px] md:text-[40px] lg:text-[60px] font-semibold tracking-tight text-slate-900 mb-5 leading-[1.12]">
            {t("hero.title_part1")}
            <span className="text-blue-accent whitespace-nowrap">
              {t("hero.title_highlight")}
            </span>
            {t("hero.title_part2")}
          </h1>

          <p className="hero-text-element text-[16px] sm:text-[18px] md:text-[16px] lg:text-[20px] text-[#666666] mb-6 w-full max-w-[600px] leading-[1.6] font-normal tracking-tight">
            {t("hero.subtitle")}
          </p>

          <div className="hero-text-element hidden sm:block w-8 h-[2px] bg-blue-accent/30 mb-5"></div>

          <p className="hero-text-element text-[11px] sm:text-[12px] md:text-[10px] lg:text-[12px] text-slate-500 font-medium tracking-wider uppercase leading-relaxed w-full max-w-[500px]">
            {t("hero.areas")}
          </p>

          {/* Buttons Group with clear margin-top and proper flex gap */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start items-center gap-4 w-full sm:w-auto mt-6 lg:mt-8 relative z-30">
            <div className="hero-btn-element w-full sm:w-auto">
              <Button
                href="/contact"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto px-6 py-3 md:px-5 lg:px-8 lg:py-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-accent/30"
              >
                {t("hero.get_quote")}
              </Button>
            </div>
            <div className="hero-btn-element w-full sm:w-auto">
              <Button
                onClick={() => setIsVideoOpen(true)}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 py-3 md:px-4 lg:px-8 lg:py-3.5 flex items-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 border-gray-300 bg-white shadow-sm relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <div className="relative flex items-center gap-2">
                  <Play
                    size={18}
                    className="text-blue-accent fill-blue-accent/20 group-hover:fill-blue-accent/40 transition-colors"
                  />{" "}
                  {t("hero.watch_demo")}
                </div>
              </Button>
            </div>
            <div className="hero-btn-element w-full sm:w-auto">
              <a
                href="https://wa.me/3725503644"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 md:px-4 lg:px-8 lg:py-3.5 flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 rounded-full border-2 border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white bg-transparent font-semibold shadow-[0_0_15px_rgba(0,172,206,0.15)] group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="transition-colors"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
                </svg>
                {t("hero.chat_whatsapp")}
              </a>
            </div>
            <div className="hero-btn-element hidden lg:block w-full sm:w-auto">
              <Button
                href="/contact"
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto px-8 py-3.5 transition-all duration-300 hover:-translate-y-1"
              >
                {t("hero.contact_us")}
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
            <div
              ref={ripple1Ref}
              className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] border border-[rgba(0,172,206,0.5)] rounded-full origin-center"
            ></div>
            <div
              ref={ripple2Ref}
              className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] border border-[rgba(0,172,206,0.5)] rounded-full origin-center"
            ></div>
            <div
              ref={ripple3Ref}
              className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] border border-[rgba(0,172,206,0.5)] rounded-full origin-center"
            ></div>
          </div>

          {/* Drone and Shadow */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[260px] sm:max-w-[350px] lg:max-w-[600px] mx-auto">
            <div ref={droneWrapperRef} className="relative w-full px-2 lg:px-0">
              <img
                ref={droneRef}
                src="/d-2.webp"
                alt={t("hero.drone_alt")}
                className="w-full h-auto object-contain relative drop-shadow-2xl"
              />
            </div>

            {/* Soft Shadow */}
            <div
              ref={shadowRef}
              className="mt-6 sm:mt-12 relative flex justify-center items-center w-full h-[15px]"
            >
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
          <path
            d="M0,120 L0,0 C360,100 1080,100 1440,0 L1440,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <HeroVideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </section>
  );
};

export default Hero;
