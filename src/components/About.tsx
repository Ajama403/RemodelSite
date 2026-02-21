import { Award, Users, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const About = () => {
  const stats = [
    { icon: Award, value: site.accreditationLabel, label: "BBB Accredited" },
    { icon: Users, value: site.stats[0].value, label: site.stats[0].label },
    { icon: Clock, value: site.hours, label: "Availability" },
    { icon: ShieldCheck, value: site.stats[3].value, label: site.stats[3].label },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={site.about.images[0]}
                alt={`Home improvement project in ${site.baseCity}`}
                className="rounded-2xl shadow-card h-64 object-cover"
              />
              <img
                src={site.about.images[1]}
                alt={`Flooring installation in ${site.baseCity}`}
                className="rounded-2xl shadow-card h-64 object-cover mt-8"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card p-6 rounded-2xl shadow-elegant w-[90%] max-w-sm">
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 lg:pl-8">
            <div className="inline-block">
              <span className="text-secondary font-semibold uppercase tracking-wider text-sm">About Us</span>
              <div className="h-1 w-12 bg-gradient-gold rounded mt-2" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Why Homeowners Trust
              <span className="text-gradient"> {site.businessName}</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {site.about.headline}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {site.about.body[0]} {site.about.body[1]}
            </p>

            <p className="text-muted-foreground leading-relaxed">{site.about.body[2]}</p>

            <div className="p-4 bg-muted rounded-xl text-sm text-foreground">
              Serving {site.serviceAreas[0]} + {site.serviceAreas.slice(1).join(", ")} &bull; {site.category} &bull; {site.hours}
            </div>

            <ul className="grid sm:grid-cols-2 gap-3">
              {site.trust.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-2 w-2 rounded-full bg-secondary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.slice(2).map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-gradient-gold text-primary-foreground hover:opacity-90 font-semibold h-12 px-8 mt-4" asChild>
              <a href={`tel:${site.phoneTel}`}>{site.primaryCtaLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
