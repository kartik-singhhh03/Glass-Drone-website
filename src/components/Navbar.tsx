import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Projects", href: "#case-studies" },
    { name: "Safety", href: "#safety" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1200px] h-[64px] md:h-[72px] flex items-center
        ${
          scrolled
            ? "top-4 md:top-6 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60"
            : "top-6 md:top-8 bg-white/60 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-white/40"
        } rounded-[100px]`}
    >
      <div className="px-6 md:px-8 flex items-center justify-between w-full h-full">
        {/* Logo */}
        <a href="#" className="flex items-center gap-[8px] group">
          <img
            src="/logo1.webp"
            alt="Glass Drone"
            loading="eager"
            className="w-auto h-[48px] md:h-[72px] lg:h-[100px] object-contain scale-[1.4] md:scale-[1.70] origin-left group-hover:scale-[1.60] transition-transform duration-300"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center flex-wrap gap-3 xl:gap-6 justify-center max-w-[65%]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-[13px] xl:text-[14px] text-wrap break-words text-center text-slate-600 hover:text-blue-accent transition-colors duration-300"
            >
              {t(`nav.${link.name}`)}
            </a>
          ))}
        </div>

        {/* CTA & Language Toggle */}
        <div className="hidden xl:flex items-center gap-2 xl:gap-4">
          <div className="flex bg-slate-100 p-1 rounded-full text-xs font-bold mr-2">
            <button
              onClick={() => changeLanguage("et")}
              className={`px-3 py-1.5 rounded-full transition-all ${i18n.language === "et" ? "bg-white text-blue-accent shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              ET
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1.5 rounded-full transition-all ${i18n.language === "en" ? "bg-white text-blue-accent shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              EN
            </button>
          </div>
          <Button
            href="#contact"
            variant="primary"
            className="px-6 py-2.5 text-sm"
          >
            {t("nav.Get a Quote")}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden text-slate-800 p-2 hover:bg-slate-100 rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Content - Absolute positioned below the pill */}
      <div
        className={`xl:hidden absolute top-[calc(100%+16px)] left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top border border-white/50 ${mobileMenuOpen ? "max-h-[600px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="px-6 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-lg text-slate-700 py-3 border-b border-slate-100/60 hover:text-blue-accent hover:pl-2 transition-all duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(`nav.${link.name}`)}
            </a>
          ))}
          <Button
            href="#contact"
            variant="primary"
            className="w-full mt-6 py-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("nav.Get a Quote")}
          </Button>

          {/* Mobile Language Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-full text-sm font-bold mt-4 w-max mx-auto">
            <button
              onClick={() => changeLanguage("et")}
              className={`px-6 py-2 rounded-full transition-all ${i18n.language === "et" ? "bg-white text-blue-accent shadow-sm" : "text-slate-500"}`}
            >
              ET
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-6 py-2 rounded-full transition-all ${i18n.language === "en" ? "bg-white text-blue-accent shadow-sm" : "text-slate-500"}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
