import { ClipboardList, PhoneCall, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const Process = () => {
  const iconMap = [ClipboardList, PhoneCall, Wrench];
  const steps = site.process.map((step, index) => ({
    icon: iconMap[index] || CheckCircle,
    step: `0${index + 1}`,
    title: step.title,
    description: step.desc,
  }));

  return (
    <section id="process" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            A Simple Path to
            <span className="text-secondary"> Home Projects Done Right</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Quick, clear steps so you know what to expect—from first call to a finished repair or install.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-secondary/30" />
              )}

              <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors h-full">
                {/* Step Number */}
                <span className="text-5xl font-bold text-secondary/30">{step.step}</span>
                
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mt-4 mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button className="bg-gradient-gold text-primary hover:opacity-90 font-semibold h-12 px-8" asChild>
            <a href={`tel:${site.phoneTel}`}>{site.contact.button}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;
