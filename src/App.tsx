import Hero from "./components/Hero";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import CaseStudies from "./components/CaseStudies";
import TargetClients from "./components/TargetClients";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full">
      <Hero />
      <Services />
      <Benefits />
      <HowItWorks />
      <CaseStudies />
      <TargetClients />
      {/* <Safety /> */}
      <Pricing />
      <FAQ />
      {/* <Contact /> */}
    </div>
  );
}
