import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/content/siteConfig";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img
              src={site.logo}
              alt={`${site.businessName} logo`}
              className="w-14 h-14 object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-foreground">{site.businessName}</span>
              <span className="block text-xs text-muted-foreground -mt-1">
                {site.category} &bull; {site.baseCity}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons - Phone always prominent */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              className="bg-gradient-gold text-primary-foreground hover:opacity-90 font-semibold"
              asChild
            >
              <a href={`tel:${site.phoneTel}`} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {site.phoneDisplay}
              </a>
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <a href="#contact">Free Quote</a>
            </Button>
          </div>

          {/* Mobile: Phone + Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={`tel:${site.phoneTel}`}
              className="flex items-center gap-1 bg-gradient-gold text-primary-foreground px-3 py-2 rounded-lg font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xs:inline">Call</span>
            </a>
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/80 hover:text-secondary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button className="w-full bg-gradient-gold text-primary-foreground" asChild>
                  <a href={`tel:${site.phoneTel}`} className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    {site.phoneDisplay}
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#contact">Request a Quote</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
