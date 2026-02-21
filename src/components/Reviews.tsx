import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            What Homeowners
            <span className="text-gradient"> Say About {site.businessName}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Reliable handyman help for flooring, remodel support, plumbing, electrical, and repairs across {site.baseCity} and nearby.
          </p>
        </div>

        {/* Google Badge */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 bg-card p-5 rounded-xl shadow-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="Google Reviews"
              className="w-12 h-12"
            />
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                ))}
              </div>
              <span className="text-lg font-bold text-card-foreground">{site.stats[1].value} Rating</span>
              <span className="text-sm text-muted-foreground ml-2">({site.stats[2].value} reviews on Google)</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {site.testimonials.map((review, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-card hover:shadow-elegant transition-shadow"
            >
              {/* Google icon */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-10 h-10 text-secondary/30" />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                  alt="Google review"
                  className="w-6 h-6 opacity-60"
                />
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>

              <div className="border-t border-border pt-4">
                <div className="font-bold text-card-foreground">{review.name}</div>
                <div className="text-sm text-muted-foreground">{review.location}</div>
                <div className="text-sm text-secondary font-medium mt-1">{review.project}</div>
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

export default Reviews;
