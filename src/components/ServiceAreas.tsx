import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const ServiceAreas = () => {
  return (
    <section id="areas" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Service Areas</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Serving
            <span className="text-gradient"> Your Neighborhood</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Based in {site.baseCity}, we provide {site.trade} and {site.category.toLowerCase()} services
            across {site.baseCity} and surrounding communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Cities */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Cities We Serve
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {site.serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-card"
                >
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="font-medium text-card-foreground">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Neighborhoods &amp; Communities
            </h3>
            <div className="flex flex-wrap gap-3">
              {site.serviceNeighborhoods.map((n) => (
                <span
                  key={n}
                  className="bg-muted text-foreground px-4 py-2 rounded-full text-sm font-medium"
                >
                  {n}
                </span>
              ))}
            </div>
            <div className="mt-8 p-6 bg-card rounded-xl shadow-card">
              <p className="text-muted-foreground mb-4">
                Don&apos;t see your area? We may still be able to help.
                Call or text to check availability.
              </p>
              <Button className="bg-gradient-gold text-primary-foreground hover:opacity-90 font-semibold" asChild>
                <a href={`tel:${site.phoneTel}`}>{site.contact.button}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
