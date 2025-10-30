import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "CEO",
    company: "TechRetail Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "INSPERIA transformó completamente nuestro proceso de atención al cliente. Redujimos el tiempo de respuesta en un 75% y nuestros clientes están más satisfechos que nunca.",
    rating: 5,
  },
  {
    name: "Carlos Martínez",
    role: "Director de Operaciones",
    company: "LogisticaPro",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "La automatización de nuestros procesos logísticos nos permitió escalar 3x sin contratar más personal. El ROI fue evidente en menos de 4 meses.",
    rating: 5,
  },
  {
    name: "Ana Rodríguez",
    role: "Fundadora",
    company: "EduTech Innovación",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "El equipo de INSPERIA no solo implementó la tecnología, sino que nos acompañó en todo el proceso de transformación digital. Increíble profesionalismo.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Empresas que ya están automatizando su éxito
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass p-8 rounded-2xl border border-primary/20 card-hover relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
