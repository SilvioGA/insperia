import { Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PainPoints = () => {
  const painPoints = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pérdida de tiempo",
      description: "Tu equipo gasta horas en tareas que podrían automatizarse en segundos.",
      bgColor: "bg-red-50/10 border-red-200/20"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Errores humanos",
      description: "Los procesos manuales generan inconsistencias y errores costosos.",
      bgColor: "bg-amber-50/10 border-amber-200/20"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Difícil escalar",
      description: "Crecer significa contratar más personas, no mejorar tus sistemas.",
      bgColor: "bg-blue-50/10 border-blue-200/20"
    }
  ];

  const scrollToDiagnostic = () => {
    const element = document.getElementById('diagnostic');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 relative bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              ¿Tu equipo sigue haciendo{" "}
              <span className="gradient-text">tareas repetitivas</span>?
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              El tiempo que podrías invertir en crecer, lo pierdes en correos, 
              confirmaciones, hojas de cálculo y procesos manuales.
            </p>

            <p className="text-base md:text-lg font-semibold text-foreground">
              En Insperia creamos sistemas inteligentes que hacen ese trabajo por ti.
            </p>

            <Button
              size="lg"
              onClick={scrollToDiagnostic}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6 mt-4"
            >
              Descubre cómo optimizar tu empresa
            </Button>
          </div>

          {/* Right side - Pain point cards */}
          <div className="space-y-4 animate-slide-up">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border ${point.bgColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background/50 flex-shrink-0">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};