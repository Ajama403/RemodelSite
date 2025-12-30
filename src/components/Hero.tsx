import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import site from "@/content/siteConfig";

const Hero = () => {
  const serviceAreas = site.serviceAreas.map((area) => area.replace(", CA", ""));
  const serviceAreaHighlight = `${serviceAreas[0]} + ${serviceAreas.slice(1).join(", ")}`;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Michail%27s%20Handyman%20HERO%20.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-secondary fill-secondary" />
              <span className="text-sm font-medium">Served hundreds of homes • {site.hours}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Handyman & Home Improvement in {site.baseCity}
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-2xl">
              {site.tagline} Michail&apos;s Handyman handles flooring installs, remodel help, plumbing fixes, and
              electrical swaps with clean, reliable work.
            </p>

            <p className="text-primary-foreground/80 max-w-2xl">
              {site.about.body[0]} {site.about.body[1]}
            </p>

            <p className="text-secondary font-semibold">Serving {serviceAreaHighlight}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-gold text-primary-foreground hover:opacity-90 font-semibold text-lg px-8 h-14"
                asChild
              >
                <a href={`tel:${site.phoneTel}`} className="flex items-center">
                  {site.primaryCtaLabel}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/50 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 h-14 px-8"
                asChild
              >
                <a href="#services">Explore Services</a>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                  alt="Google reviews for Michail's Handyman"
                  className="w-8 h-8"
                />
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                    ))}
                  </div>
                  <span className="text-xs text-primary-foreground/70">Fast, friendly service</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                  <img
                    src="/BBB%20logo.png"
                    alt="BBB Accredited Business"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div>
                  <span className="text-sm font-semibold block">{site.accreditationLabel}</span>
                  <span className="text-xs text-primary-foreground/70">Better Business Bureau</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="hidden lg:block animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card p-8 rounded-2xl shadow-elegant">
              <h3 className="text-xl font-bold text-card-foreground mb-2">{site.contact.headline}</h3>
              <p className="text-muted-foreground text-sm mb-6">{site.contact.sub}</p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                />
                <select className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition">
                  <option value="">Select Service</option>
                  {site.services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition resize-none"
                />
                <Button
                  className="w-full bg-gradient-gold text-primary-foreground hover:opacity-90 font-semibold h-12 text-base"
                  asChild
                >
                  <a href={`tel:${site.phoneTel}`}>Call/Text Now</a>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
