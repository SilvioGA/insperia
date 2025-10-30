import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const FinalCTA = () => {
  const scrollToDiagnostic = () => {
    const element = document.getElementById('diagnostic');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Da el primer paso hoy</span>
          </div>

          {/* Main headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
            ¿Listo para transformar tu negocio?
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Obtén tu auditoría gratuita y descubre exactamente cómo la IA puede 
            automatizar tus procesos y hacer crecer tu empresa
          </p>

          {/* Benefits list */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Análisis personalizado</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Recomendaciones específicas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Sin costo ni compromiso</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={scrollToDiagnostic}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-10 py-7 group shadow-lg shadow-primary/25"
          >
            Solicitar Auditoría Gratuita
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust indicator */}
          <p className="mt-8 text-sm text-muted-foreground">
            Más de 50 empresas ya están automatizando su éxito con INSPERIA
          </p>
        </div>
      </div>
    </section>
  );
};
