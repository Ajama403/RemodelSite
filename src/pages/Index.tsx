import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import site from "@/content/siteConfig";

const Index = () => {
  const [city = "", region = ""] = site.baseCity.split(",").map((part) => part.trim());
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.businessName,
    description: site.seo.metaDescription,
    url: "https://www.michailshandyman.com",
    telephone: site.phoneTel,
    areaServed: site.serviceAreas,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: region,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [],
  };

  useEffect(() => {
    document.title = site.seo.siteTitle;

    const setMeta = (name: string, content: string) => {
      const element = document.querySelector(`meta[name="${name}"]`);
      if (element) {
        element.setAttribute("content", content);
      }
    };

    setMeta("description", site.seo.metaDescription);
    setMeta("keywords", site.seo.keywords.join(", "));

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute("content", site.seo.siteTitle);
    if (ogDescription) ogDescription.setAttribute("content", site.seo.metaDescription);
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Process />
        <Gallery />
        <Reviews />
        <Footer />
        <ChatWidget />
      </main>
    </>
  );
};

export default Index;
