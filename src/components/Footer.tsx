import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector(".footer-elem")) return;

      let ctx = gsap.context(() => {
        // Sophisticated stagger fade-in bounding strictly to power3 for premium smoothness
        gsap.fromTo(
          ".footer-elem",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
            },
          },
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
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.18] overflow-hidden footer-bg-anim">
        <svg className="w-full h-[200%]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
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
            <h3 className="text-[32px] md:text-[40px] font-extrabold tracking-[1px] mb-4 text-[#0f172a] leading-[1.15]">
              {t("footer.cta_title")}
            </h3>
            <p className="text-[#64748b] text-[18px] font-medium leading-relaxed">
              {t("footer.cta_desc")}
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 flex flex-col items-center md:items-end gap-3">
            <button className="bg-[#00ACCE] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0096B4] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(0,172,206,0.3)] hover:shadow-[0_12px_25px_rgba(0,172,206,0.4)] hover:-translate-y-1 w-full lg:w-auto">
              <span>{t("footer.cta_btn")}</span>
              <ArrowRight
                size={18}
                className="transform transition-transform"
              />
            </button>
            <div className="flex flex-col items-center md:items-end mt-1">
              <span className="text-[13px] text-slate-500 font-medium mb-1.5 opacity-80">
                {t("footer.prefer_chat")}
              </span>
              <a
                href="https://wa.me/3725503644"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] font-semibold text-blue-accent hover:bg-blue-accent/10 px-4 py-2 rounded-full transition-colors border border-blue-accent/30 hover:border-blue-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
                </svg>
                {t("footer.talk_instantly")}
              </a>
            </div>
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
            <a
              href="#"
              className="flex items-center gap-[8px] mb-10 group w-max"
            >
              <img
                src="/logo1.png"
                alt="Glass Drone"
                loading="lazy"
                className="w-auto h-[56px] md:h-[72px] lg:h-[100px] object-contain scale-[1.4] md:scale-[1.90] origin-center md:origin-left group-hover:scale-[1.60] transition-transform duration-300"
              />
            </a>

            <p className="text-[#64748b] text-[15px] leading-[1.8] mb-8 font-medium">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-[#00ACCE] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <Twitter size={18} fill="currentColor" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-[#00ACCE] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <Linkedin size={18} fill="currentColor" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-[#00ACCE] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/3725503644"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:bg-blue-accent hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.333.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-2 text-center md:text-left">
            <h4 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0f172a] mb-8">
              {t("footer.nav_title")}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t("footer.links.home"), href: "#home" },
                { label: t("footer.links.services"), href: "#services" },
                { label: t("footer.links.how"), href: "#how-it-works" },
                { label: t("footer.links.projects"), href: "#case-studies" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#64748b] text-[15px] font-medium hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 w-max block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-2 text-center md:text-left">
            <h4 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0f172a] mb-8">
              {t("footer.company_title")}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t("footer.links.safety"), href: "#safety" },
                { label: t("footer.links.faq"), href: "#faq" },
                { label: t("footer.links.careers"), href: "#" },
                { label: t("footer.links.contact"), href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#64748b] text-[15px] font-medium hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 w-max block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-elem flex flex-col items-center md:items-start lg:col-span-4 text-center md:text-left lg:pl-4">
            <h4 className="text-[13px] font-bold uppercase tracking-[1px] text-[#0f172a] mb-8">
              {t("footer.contact_title")}
            </h4>
            <ul className="space-y-6">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-[#00ACCE] flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#64748b] font-semibold mb-1 uppercase tracking-wider">
                    {t("footer.call_us")}
                  </span>
                  <a
                    href="tel:+3725503644"
                    className="text-[#0f172a] font-medium hover:text-[#00ACCE] transition-colors link-underline pb-1 w-max block"
                  >
                    +372 550 3644
                  </a>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-[#00ACCE] flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#64748b] font-semibold mb-1 uppercase tracking-wider">
                    {t("footer.email")}
                  </span>
                  <a
                    href="mailto:info@glassdrone.ee"
                    className="text-[#0f172a] font-medium hover:text-[#00ACCE] transition-colors link-underline pb-1 w-max block"
                  >
                    info@glassdrone.ee
                  </a>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-[#00ACCE] flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#64748b] font-semibold mb-1 uppercase tracking-wider">
                    Service Region
                  </span>
                  <span className="text-[#0f172a] font-medium">
                    Estonia / Baltics
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-6 footer-elem">
          <p className="text-[#64748b] text-[14px] font-medium">
            &copy; {new Date().getFullYear()} Glass Drone OÜ. All rights
            reserved.
          </p>
          <div className="flex items-center gap-8 text-[14px] font-medium">
            <a
              href="#"
              className="text-[#64748b] hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 block"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[#64748b] hover:text-[#00ACCE] transition-colors duration-300 link-underline pb-1 block"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
