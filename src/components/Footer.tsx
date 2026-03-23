import { useEffect, useRef } from 'react';
import { Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Sophisticated stagger fade-in bounding strictly to power3 for premium smoothness
      gsap.fromTo(".footer-elem",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%"
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-white to-[#F6F9FC] relative pt-24 pb-8 overflow-hidden border-t border-gray-100 z-10 w-full">

      {/* ------------------------------------- */}
      {/* TOP CTA BANNER                        */}
      {/* ------------------------------------- */}
      <div className="max-w-[1200px] mx-auto px-6 mb-24 footer-elem">
        <div className="relative bg-white rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left shadow-[0_20px_60px_-15px_rgba(0,172,206,0.15)] border border-gray-100 overflow-hidden group">

          {/* Decorative Premium Sub-Surface Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] bg-gradient-to-br from-blue-accent/20 to-transparent rounded-full blur-[80px] opacity-60 pointer-events-none transition-opacity duration-700 group-hover:opacity-100"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[200px] h-[200px] bg-gradient-to-tr from-blue-accent/10 to-transparent rounded-full blur-[60px] opacity-60 pointer-events-none"></div>

          <div className="max-w-[540px] relative z-10">
            <h3 className="text-[32px] md:text-[40px] font-extrabold tracking-tight mb-4 text-slate-900 leading-[1.15]">Ready to transform your building maintenance?</h3>
            <p className="text-slate-500 text-[18px] font-medium leading-relaxed">Get a customized drone cleaning plan perfectly scaled to your architecture.</p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button className="bg-blue-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0096B4] transition-all duration-300 flex items-center gap-3 shadow-[0_8px_20px_rgba(0,172,206,0.3)] hover:shadow-[0_12px_25px_rgba(0,172,206,0.4)] hover:-translate-y-1">
              <span>Get a Free Quote</span>
              <ArrowRight size={18} className="transform transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-full h-[1px] bg-gray-200/60 mb-20 footer-elem"></div>
      </div>

      {/* ------------------------------------- */}
      {/* MAIN FOOTER COLUMNS                   */}
      {/* ------------------------------------- */}
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Deployed a mathematically balanced 12-column core logic framing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-12 mb-20">

          {/* 1. Brand Section (Takes up 4 cols on super-wide desktop formats) */}
          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-4 text-center md:text-left pr-0 lg:pr-10">
            <a href="#" className="flex items-center gap-[8px] mb-10 group w-max">
              <img
                src="/logo1.png"
                alt="Glass Drone"
                loading="lazy"
                className="w-auto h-[56px] md:h-[72px] lg:h-[100px] object-contain scale-[1.4] md:scale-[1.90] origin-center md:origin-left group-hover:scale-[1.60] transition-transform duration-300"
              />
            </a>
            <p className="text-slate-500 text-[15px] leading-[1.8] mb-8 font-medium">
              Advanced drone-powered exterior cleaning solutions designed for safety, efficiency, and architectural scale.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 hover:bg-blue-accent hover:text-white hover:border-blue-accent transition-all duration-300 hover:-translate-y-1">
                <Twitter size={18} fill="currentColor" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 hover:bg-blue-accent hover:text-white hover:border-blue-accent transition-all duration-300 hover:-translate-y-1">
                <Linkedin size={18} fill="currentColor" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 hover:bg-blue-accent hover:text-white hover:border-blue-accent transition-all duration-300 hover:-translate-y-1">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* 2. Navigation Section (2 cols) */}
          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-2 text-center md:text-left">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-900 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'How It Works', 'Projects'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-slate-500 text-[15px] font-medium hover:text-blue-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Company Section (2 cols) */}
          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-2 text-center md:text-left">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-900 mb-8">Company</h4>
            <ul className="space-y-4">
              {['Safety Standard', 'FAQ', 'Careers', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-slate-500 text-[15px] font-medium hover:text-blue-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Section (4 cols) */}
          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-4 text-center md:text-left lg:pl-4">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-900 mb-8">Contact Us</h4>
            <ul className="space-y-6">

              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-accent flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Call Us</span>
                  <a href="tel:+18003766392" className="text-slate-700 font-medium hover:text-blue-accent transition-colors">+1-800-DRONE-WASH</a>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-accent flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Email</span>
                  <a href="mailto:hello@glassdrone.co" className="text-slate-700 font-medium hover:text-blue-accent transition-colors">hello@glassdrone.co</a>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-accent flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Service Region</span>
                  <span className="text-slate-700 font-medium">Estonia / Baltics</span>
                </div>
              </li>

            </ul>
          </div>

        </div>

        {/* ------------------------------------- */}
        {/* BOTTOM BAR                            */}
        {/* ------------------------------------- */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-6 footer-elem">
          <p className="text-slate-400 text-[14px] font-medium">
            &copy; {new Date().getFullYear()} Glass Drone. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[14px] font-medium">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors duration-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
