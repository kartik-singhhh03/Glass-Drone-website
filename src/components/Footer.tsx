import { useEffect, useRef } from 'react';
import { Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector('.footer-elem')) return;

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
    }
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="bg-[linear-gradient(to_bottom,#f8fbff,#eef6fb)] relative pt-24 pb-8 overflow-hidden border-t border-gray-100 z-10 w-full before:absolute before:-top-[100px] before:left-1/2 before:-translate-x-1/2 before:w-[600px] before:h-[600px] before:bg-[radial-gradient(circle,rgba(0,172,206,0.12),transparent_70%)] before:blur-[80px] before:opacity-60 before:z-0"
    >
      
      {/* Subtle floating grid mapping tech effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] overflow-hidden footer-bg-anim">
        <svg className="w-full h-[200%]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#00ACCE" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <style>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.02); }
        }
        .footer-bg-anim {
          animation: subtleFloat 25s ease-in-out infinite;
        }
        .link-underline {
          position: relative;
        }
        .link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: #00ACCE;
          transition: width 0.3s ease;
        }
        .link-underline:hover::after {
          width: 100%;
        }
      `}</style>

      {/* ------------------------------------- */}
      {/* TOP CTA BANNER                        */}
      {/* ------------------------------------- */}
      <div className="max-w-[1200px] mx-auto px-6 mb-24 footer-elem relative z-10">
        <div className="relative bg-white rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left shadow-[0_20px_60px_-15px_rgba(0,172,206,0.15)] border border-gray-100 overflow-hidden group">
          {/* Decorative Premium Sub-Surface Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[300px] h-[300px] bg-gradient-to-br from-[#00ACCE]/20 to-transparent rounded-full blur-[80px] opacity-60 pointer-events-none transition-opacity duration-700 group-hover:opacity-100"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[200px] h-[200px] bg-gradient-to-tr from-[#00ACCE]/10 to-transparent rounded-full blur-[60px] opacity-60 pointer-events-none"></div>

          <div className="max-w-[540px] relative z-10">
            <h3 className="text-[32px] md:text-[40px] font-extrabold tracking-[1px] mb-4 text-[#0f172a] leading-[1.15]">Ready to transform your building maintenance?</h3>
            <p className="text-[#64748b] text-[18px] font-medium leading-relaxed">Get a customized drone cleaning plan perfectly scaled to your architecture.</p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button className="bg-[#00ACCE] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0096B4] transition-all duration-300 flex items-center gap-3 shadow-[0_8px_20px_rgba(0,172,206,0.3)] hover:shadow-[0_12px_25px_rgba(0,172,206,0.4)] hover:-translate-y-1">
              <span>Get a Free Quote</span>
              <ArrowRight size={18} className="transform transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="w-full h-[1px] bg-gray-200/60 mb-20 footer-elem"></div>
      </div>

      {/* ------------------------------------- */}
      {/* MAIN FOOTER COLUMNS                   */}
      {/* ------------------------------------- */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-12 mb-20">

          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-4 text-center md:text-left pr-0 lg:pr-10">
            <a href="#" className="flex items-center gap-[8px] mb-10 group w-max">
              <img
                src="/logo1.png"
                alt="Glass Drone"
                loading="lazy"
                className="w-auto h-[56px] md:h-[72px] lg:h-[100px] object-contain scale-[1.4] md:scale-[1.90] origin-center md:origin-left group-hover:scale-[1.60] transition-transform duration-300"
              />
            </a>
            
            <p className="text-[#64748b] text-[15px] leading-[1.8] mb-8 font-medium">
              Advanced drone-powered exterior cleaning solutions designed for safety, efficiency, and architectural scale.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-[#00ACCE] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Twitter size={18} fill="currentColor" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-[#00ACCE] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Linkedin size={18} fill="currentColor" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-[#00ACCE] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-2 text-center md:text-left">
            <h4 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0f172a] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'How It Works', 'Projects'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-[#64748b] text-[15px] font-medium hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 w-max block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-2 text-center md:text-left">
            <h4 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0f172a] mb-8">Company</h4>
            <ul className="space-y-4">
              {['Safety Standard', 'FAQ', 'Careers', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-[#64748b] text-[15px] font-medium hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 w-max block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-4 text-center md:text-left lg:pl-4">
            <h4 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0f172a] mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-[#00ACCE] flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#64748b] font-semibold mb-1 uppercase tracking-wider">Call Us</span>
                  <a href="tel:+3725503644" className="text-[#0f172a] font-medium hover:text-[#00ACCE] transition-colors link-underline pb-1 w-max block">+372 550 3644</a>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-[#00ACCE] flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#64748b] font-semibold mb-1 uppercase tracking-wider">Email</span>
                  <a href="mailto:info@glassdrone.ee" className="text-[#0f172a] font-medium hover:text-[#00ACCE] transition-colors link-underline pb-1 w-max block">info@glassdrone.ee</a>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-[#00ACCE] flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#64748b] font-semibold mb-1 uppercase tracking-wider">Service Region</span>
                  <span className="text-[#0f172a] font-medium">Estonia / Baltics</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-6 footer-elem">
          <p className="text-[#64748b] text-[14px] font-medium">
            &copy; {new Date().getFullYear()} Glass Drone OÜ. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[14px] font-medium">
            <a href="#" className="text-[#64748b] hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 block">Privacy Policy</a>
            <a href="#" className="text-[#64748b] hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 block">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
