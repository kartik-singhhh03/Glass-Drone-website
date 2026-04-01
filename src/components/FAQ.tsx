import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import SectionWrapper from "./ui/SectionWrapper";
import SectionHeading from "./ui/SectionHeading";
import { useTranslation } from "react-i18next";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  { key: "faq01" },
  { key: "faq02" },
  { key: "faq03" },
  { key: "faq04" },
  { key: "faq05" },
  { key: "faq06" },
  { key: "faq07" },
  { key: "faq08" },
];

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.querySelector(".faq-item")) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".faq-item",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <SectionWrapper id="faq" bg="white">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <SectionHeading
          badge={t("faq.badge")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          className="mb-16"
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`faq-item border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-light/80 shadow-md shadow-gray-200/50" : "bg-white hover:border-blue-accent/30 hover:shadow-sm"}`}
              >
                <button
                  className="w-full p-5 sm:px-8 sm:py-6 flex justify-between items-center text-left focus:outline-none gap-4"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex-1 text-left text-[16px] sm:text-[19px] font-bold transition-colors duration-300 break-words whitespace-normal break-after-auto pr-4 sm:pr-8 ${isOpen ? "text-blue-accent" : "text-dark"}`}
                  >
                    {t(`faq.items.${faq.key}.q`)}
                  </span>

                  {/* Plus/Minus Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${isOpen ? "bg-blue-accent text-white" : "bg-gray-100 text-dark/50"}`}
                  >
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <Minus
                        size={16}
                        className={`absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
                      />
                      <Plus
                        size={16}
                        className={`absolute transition-all duration-300 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                      />
                    </div>
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-5 sm:pb-8" : "grid-rows-[0fr] opacity-0 pb-0"}`}
                >
                  <div className="overflow-hidden px-5 sm:px-8">
                    <p className="text-dark/70 text-base sm:text-lg font-light leading-relaxed pt-2">
                      {t(`faq.items.${faq.key}.a`)}
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
