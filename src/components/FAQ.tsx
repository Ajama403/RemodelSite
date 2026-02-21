import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              Frequently Asked
              <span className="text-gradient"> Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Quick answers about working with {site.businessName}.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {site.faq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl shadow-card overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-card-foreground pr-4">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button className="bg-gradient-gold text-primary-foreground hover:opacity-90 font-semibold h-12 px-8" asChild>
              <a href={`tel:${site.phoneTel}`}>{site.contact.button}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
