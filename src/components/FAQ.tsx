import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tiempo toma implementar una solución de IA?",
    answer: "El tiempo de implementación varía según la complejidad del proyecto. Una automatización simple puede estar lista en 2-3 semanas, mientras que soluciones más complejas pueden tomar 2-3 meses. Durante la auditoría gratuita te daremos un timeline específico para tu caso.",
  },
  {
    question: "¿Necesito conocimientos técnicos para trabajar con sus soluciones?",
    answer: "No. Diseñamos todas nuestras soluciones para que sean intuitivas y fáciles de usar. Además, proporcionamos capacitación completa a tu equipo y soporte continuo. Nuestro objetivo es que te enfoques en tu negocio, no en la tecnología.",
  },
  {
    question: "¿Cuál es el retorno de inversión (ROI) esperado?",
    answer: "Nuestros clientes típicamente ven un ROI positivo entre 3-6 meses. En promedio, las empresas recuperan 30% de su tiempo operativo y reducen errores humanos hasta en 90%. Durante la auditoría te mostraremos proyecciones específicas para tu negocio.",
  },
  {
    question: "¿Qué pasa si mi empresa ya usa otras herramientas?",
    answer: "Excelente pregunta. Nuestra especialidad es la integración de sistemas. Conectamos tus herramientas actuales (CRM, ERP, software de gestión) para que trabajen juntas de forma automática. No necesitas cambiar lo que ya funciona.",
  },
  {
    question: "¿Ofrecen soporte después de la implementación?",
    answer: "Sí, todos nuestros proyectos incluyen soporte continuo. Ofrecemos diferentes planes de mantenimiento según tus necesidades, desde soporte básico hasta acompañamiento estratégico mensual para optimizar y escalar tus automatizaciones.",
  },
  {
    question: "¿Cómo garantizan la seguridad de nuestros datos?",
    answer: "La seguridad es nuestra prioridad máxima. Implementamos cifrado de extremo a extremo, cumplimos con GDPR y normativas internacionales, y realizamos auditorías de seguridad periódicas. Tus datos están protegidos con los más altos estándares de la industria.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Resolvemos tus dudas</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            Preguntas frecuentes
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Todo lo que necesitas saber sobre nuestros servicios
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass border border-primary/20 rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
