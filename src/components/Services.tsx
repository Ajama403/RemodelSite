import { ArrowRight, Paintbrush, Wrench, Lightbulb, Ruler, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const Services = () => {
  const serviceIcons = [Ruler, Paintbrush, Wrench, Lightbulb, Hammer];
  const serviceImages = [
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523419400524-f0c6f1eb7828?auto=format&fit=crop&w=800&q=80",
  ];
  const services = site.services.map((service, index) => ({
    ...service,
    description: service.desc,
    icon: serviceIcons[index % serviceIcons.length],
    image: serviceImages[index % serviceImages.length],
  }));

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Handyman & Home Improvement Services
            <span className="text-gradient"> in {site.baseCity}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Flooring installs, remodel help, plumbing and electrical fixes, plus general repairs for busy homeowners.
            Call or text for quick help in {site.serviceAreas[0]} and nearby.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} service in ${site.baseCity}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center text-secondary font-semibold hover:gap-3 gap-2 transition-all"
                >
                  Call/Text Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-gold text-primary-foreground hover:opacity-90 font-semibold h-12 px-8" asChild>
            <a href={`tel:${site.phoneTel}`}>{site.contact.button}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
