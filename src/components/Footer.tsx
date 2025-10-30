import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    servicios: [
      "Automatización Inteligente",
      "Análisis Predictivo",
      "Integración de Sistemas",
      "Asistentes Virtuales"
    ],
    empresa: [
      "Sobre Nosotros",
      "Casos de Éxito",
      "Nuestro Equipo",
      "Contacto"
    ],
    recursos: [
      "Auditoría Gratuita",
      "Guías de IA",
      "Blog",
      "Preguntas Frecuentes"
    ]
  };

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram" }
  ];

  return (
    <footer id="contact" className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">INSPERIA</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transformamos empresas con automatización inteligente y soluciones de IA que generan resultados medibles.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-lg border border-border bg-card-elevated hover:bg-primary/10 hover:border-primary/30 transition-colors flex items-center justify-center"
                  aria-label={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link, index) => (
                <li key={index}>
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 INSPERIA. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Política de Privacidad</button>
            <button className="hover:text-foreground transition-colors">Términos de Servicio</button>
          </div>
        </div>
      </div>
    </footer>
  );
};