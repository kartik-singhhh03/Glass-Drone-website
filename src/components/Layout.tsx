import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppCTA from "./WhatsAppCTA";
import SEO from "./SEO";

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          lenis.destroy();
        };
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="bg-white overflow-x-clip min-h-screen flex flex-col">
      <SEO />
      <Navbar />
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppCTA />
    </div>
  );
}
