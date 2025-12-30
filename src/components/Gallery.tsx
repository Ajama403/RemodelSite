import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const Gallery = () => {
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
      title: "Flooring Install for Busy Family",
      category: "Flooring",
    },
    {
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
      title: "Bathroom Refresh & Fixtures",
      category: "Remodel Help",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      title: "Kitchen Updates & Backsplash",
      category: "Home Improvement",
    },
    {
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
      title: "Rental Ready Touch-Ups",
      category: "Repairs",
    },
    {
      image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80",
      title: "Trim & Finish Carpentry",
      category: "Handyman",
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      title: "Fixture Swaps & Lighting",
      category: "Electrical",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Our Work</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Recent Projects &
            <span className="text-gradient"> Clean Installs</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Handyman repairs, flooring installs, and remodel support completed for homeowners in {site.baseCity} and
            nearby cities.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
            >
              <img
                src={project.image}
                alt={`${project.title} by ${site.businessName}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-secondary text-sm font-semibold uppercase">{project.category}</span>
                <h3 className="text-primary-foreground text-xl font-bold mt-1">{project.title}</h3>
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

export default Gallery;
