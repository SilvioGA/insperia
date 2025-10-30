import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold gradient-text">INSPERIA</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-muted-foreground hover:text-foreground transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollToSection('process')} className="text-muted-foreground hover:text-foreground transition-colors">
              Proceso
            </button>
            <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-foreground transition-colors">
              Sobre Nosotros
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('diagnostic')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Auditoría Gratuita
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('services')} className="text-left text-muted-foreground hover:text-foreground transition-colors">
                Servicios
              </button>
              <button onClick={() => scrollToSection('process')} className="text-left text-muted-foreground hover:text-foreground transition-colors">
                Proceso
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left text-muted-foreground hover:text-foreground transition-colors">
                Sobre Nosotros
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </button>
              <Button 
                onClick={() => scrollToSection('diagnostic')}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                Auditoría Gratuita
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};