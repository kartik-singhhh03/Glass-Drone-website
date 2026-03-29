import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SEO = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "et";

  useEffect(() => {
    // Basic Meta
    const title =
      lang === "en"
        ? "Drone Window Cleaning Estonia | Glass Drone OÜ"
        : "Drooniga aknapesu kõrghoonetele Eestis | Glass Drone OÜ";

    const description =
      lang === "en"
        ? "Professional drone-powered window and façade cleaning in Estonia, Tallinn, Baltics & Scandinavia."
        : "Professionaalne droonipõhine akna- ja fassaadipesu Eestis, Tallinnas ja Baltikumis. Turvaline, kiire ja ilma tellinguteta.";

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Canonical Route (fake router logic for SEO tags if we use /en)
    const pathname = window.location.pathname;
    let currentPath = pathname === "/en" || pathname === "/en/" ? "/en" : "/";
    // If the language strictly dictates canonical:
    currentPath = lang === "en" ? "/en" : "/";

    const baseUrl = "https://glassdrone.ee"; // Assuming glassdrone.ee based on email "info@glassdrone.ee"

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `${baseUrl}${currentPath === "/" ? "" : currentPath}`,
    );

    // Hreflang
    const initHreflang = (l: string, path: string) => {
      let link = document.querySelector(
        `link[rel="alternate"][hreflang="${l}"]`,
      );
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "alternate");
        link.setAttribute("hreflang", l);
        document.head.appendChild(link);
      }
      link.setAttribute("href", `${baseUrl}${path}`);
    };

    initHreflang("et", "/");
    initHreflang("en", "/en");

    // Default x-default
    initHreflang("x-default", "/");

    // JSON-LD
    let scriptJsonLd = document.querySelector("#json-ld");
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement("script");
      scriptJsonLd.setAttribute("id", "json-ld");
      scriptJsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptJsonLd);
    }
    scriptJsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Glass Drone OÜ",
      email: "info@glassdrone.ee",
      telephone: "+3725503644",
      areaServed: ["Estonia", "Tallinn", "Baltics", "Scandinavia"],
      description: "Drone-based facade and window cleaning services",
      url: baseUrl,
    });
  }, [lang]);

  return null;
};

export default SEO;
