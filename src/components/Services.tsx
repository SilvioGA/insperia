import { useState } from "react";
import { Mail, Phone, FileText, MessageSquare, Shield, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatDemo } from "@/components/demos/ChatDemo";
import { EmailDemo } from "@/components/demos/EmailDemo";
import { VoiceDemo } from "@/components/demos/VoiceDemo";
import { InvoiceDemo } from "@/components/demos/InvoiceDemo";
import { SocialBotDemo } from "@/components/demos/SocialBotDemo";

export const Services = () => {
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);

  const services = [
    {
      icon: <MessageSquare className="w-10 h-10 text-primary" />,
      title: "Chatbots de Atención al Cliente",
      description: "Responde consultas al instante 24/7, reduce tiempos de espera y libera a tu equipo para tareas estratégicas",
      hasDemo: true,
      demoComponent: <ChatDemo />,
      demoTitle: "Demo Interactiva: Chatbot de Atención",
      demoDescription: "Explora cómo un chatbot puede transformar tu servicio al cliente"
    },
    {
      icon: <Mail className="w-10 h-10 text-primary" />,
      title: "Organizador de Correo Inteligente",
      description: "Clasifica, prioriza y delega emails automáticamente ahorrando horas de trabajo manual diario",
      hasDemo: true,
      demoComponent: <EmailDemo />,
      demoTitle: "Demo Interactiva: Clasificación Automática de Emails",
      demoDescription: "Observa cómo la IA analiza, categoriza y toma acciones sobre cada email"
    },
    {
      icon: <Phone className="w-10 h-10 text-primary" />,
      title: "Asistentes de Voz con IA",
      description: "Atiende llamadas 24/7, proporciona información y agenda citas automáticamente con voz natural",
      hasDemo: true,
      demoComponent: <VoiceDemo />,
      demoTitle: "Demo Interactiva: Asistente de Voz",
      demoDescription: "Experimenta una llamada real con nuestro asistente de voz inteligente"
    },
    {
      icon: <FileText className="w-10 h-10 text-primary" />,
      title: "Procesador de Facturas IA",
      description: "Extrae, valida y categoriza datos de facturas automáticamente, eliminando el ingreso manual",
      hasDemo: true,
      demoComponent: <InvoiceDemo />,
      demoTitle: "Demo Interactiva: Procesamiento de Facturas",
      demoDescription: "Observa cómo la IA extrae y valida información de facturas en segundos"
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-primary" />,
      title: "Bot de Redes Sociales",
      description: "Responde automáticamente a comentarios en Instagram, Facebook y Twitter con mensajes personalizados y contextuales",
      hasDemo: true,
      demoComponent: <SocialBotDemo />,
      demoTitle: "Demo Interactiva: Bot de Redes Sociales",
      demoDescription: "Observa cómo la IA analiza y responde a comentarios en tiempo real"
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "Seguridad y Cumplimiento",
      description: "Protección de datos y cumplimiento normativo integrados en cada solución de IA",
      hasDemo: false
    }
  ];

  return (
    <>
      <section id="services" className="py-32 relative bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Soluciones que <span className="gradient-text">transforman negocios</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Implementamos tecnología de IA de vanguardia adaptada a las necesidades 
              específicas de tu empresa para generar resultados medibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group p-8 rounded-xl border border-border bg-card-elevated card-hover animate-slide-up flex flex-col ${
                  service.hasDemo ? "cursor-pointer" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => service.hasDemo && setSelectedDemo(index)}
              >
                <div className="mb-6 p-3 rounded-lg bg-primary/10 w-fit group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                {service.hasDemo && (
                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Ver demo interactiva</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a08_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      </section>

      {/* Demo Dialog */}
      <Dialog open={selectedDemo !== null} onOpenChange={() => setSelectedDemo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl gradient-text">
              {selectedDemo !== null && services[selectedDemo]?.demoTitle}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedDemo !== null && services[selectedDemo]?.demoDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            {selectedDemo !== null && services[selectedDemo]?.demoComponent}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};