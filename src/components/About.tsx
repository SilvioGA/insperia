import { Target, Handshake, Heart, Award, Users } from "lucide-react";

export const About = () => {
  const sections = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Nuestro Propósito",
      description: "Optimizar el funcionamiento de los negocios mediante automatización inteligente y soluciones con IA, para que puedan escalar, ser más rentables y centrarse en lo que realmente importa"
    },
    {
      icon: <Handshake className="w-8 h-8 text-primary" />,
      title: "Nuestra Promesa",
      description: "Transformar negocios mediante automatización inteligente y soluciones con IA — soluciones ágiles, claras y basadas en tu negocio 24x7, sin anuncios ni espera. Somos tus aliados de negocio en sistemas inteligentes"
    }
  ];

  const values = [
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Profundizar antes de automatizar",
      description: "Entendemos tu negocio antes de proponer soluciones"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Eficiencia con propósito",
      description: "Cada automatización debe tener impacto real medible"
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Innovar con sentido",
      description: "Tecnología que realmente mejora procesos estratégicos"
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Transparencia total",
      description: "Reportes claros y resultados tangibles en todo momento"
    }
  ];

  const differentiators = [
    "No vendemos programas prefabricados, creamos soluciones estratégicas",
    "Nos enfocamos en resultados medibles, no en tecnología",
    "Cada solución está diseñada para tu industria específica",
    "Acompañamiento continuo, no solo implementación"
  ];

  const targetAudience = [
    "Agencias",
    "Consultorías",
    "Inmobiliarias",
    "Despachos",
    "Empresas Tech"
  ];

  return (
    <section id="about" className="py-32 relative bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Más que una agencia,{" "}
            <span className="gradient-text">tu aliado estratégico</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformamos negocios mediante automatización inteligente y soluciones con IA que generan resultados reales
          </p>
        </div>

        {/* Purpose and Promise */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-border bg-card-elevated animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{section.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{section.description}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Nuestros Valores</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  {value.icon}
                </div>
                <h4 className="font-bold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Different */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-xl border border-border bg-card-elevated animate-slide-up">
            <h3 className="text-2xl font-bold mb-6">Por qué somos diferentes</h3>
            <ul className="space-y-3">
              {differentiators.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-xl border border-border bg-card-elevated animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold mb-6">A quién servimos</h3>
            <p className="text-muted-foreground mb-4">
              Trabajamos con empresas que buscan oportunidad de eficiencia y crecimiento mediante IA:
            </p>
            <div className="flex flex-wrap gap-3">
              {targetAudience.map((audience, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};