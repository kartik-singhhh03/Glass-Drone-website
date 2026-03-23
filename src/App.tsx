import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import CaseStudies from './components/CaseStudies';
import TargetClients from './components/TargetClients';
import Safety from './components/Safety';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Initialize Lenis for premium smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      
      lenis.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0);
      
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div className="bg-white overflow-x-clip min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Benefits />
      <HowItWorks />
      <CaseStudies />
      <TargetClients />
      <Safety />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
