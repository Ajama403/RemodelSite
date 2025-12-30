import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, BadgeCheck, Clock3 } from "lucide-react";
import site from "@/content/siteConfig";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/michails_logo_top_right.png"
                alt={`${site.businessName} logo`}
                className="w-14 h-14 object-contain"
              />
              <div>
                <span className="font-bold text-xl">{site.businessName}</span>
                <span className="block text-xs text-primary-foreground/70 -mt-1">{site.category}</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              {site.about.headline} Based in {site.baseCity}, serving {site.serviceAreas.slice(0, 3).join(", ")} and
              beyond with dependable handyman help.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Process", "Gallery", "Reviews", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Handyman Services</h4>
            <ul className="space-y-3">
              {site.services.map((service) => (
                <li key={service.title}>
                  <a href="#services" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <a href={`tel:${site.phoneTel}`} className="block text-primary-foreground hover:text-secondary transition-colors">
                    {site.phoneDisplay}
                  </a>
                  <span className="text-sm text-primary-foreground/50">Call/Text • {site.hours}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary mt-1" />
                <span className="text-primary-foreground/70">info@michailshandyman.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <span className="text-primary-foreground/70">
                  {site.baseCity} • Serving {site.serviceAreas.slice(1).join(", ")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-secondary mt-1" />
                <span className="text-primary-foreground/70">{site.accreditationLabel}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock3 className="w-5 h-5 text-secondary mt-1" />
                <span className="text-primary-foreground/70">{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            Serving {site.serviceAreas.join(", ")}
          </p>
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} {site.businessName}. {site.baseCity} • {site.phoneDisplay} • {site.accreditationLabel}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
