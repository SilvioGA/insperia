import { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, Mic, Calendar, Clock, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConversationStep {
  speaker: "user" | "assistant";
  text: string;
  duration: number;
}

interface Appointment {
  service: string;
  date: string;
  time: string;
  name: string;
}

export const VoiceDemo = () => {
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "active" | "completed">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  const conversation: ConversationStep[] = [
    { speaker: "assistant", text: "¡Hola! Gracias por llamar. Soy el asistente virtual. ¿En qué puedo ayudarte hoy?", duration: 2500 },
    { speaker: "user", text: "Hola, necesito información sobre sus servicios de IA", duration: 2000 },
    { speaker: "assistant", text: "Perfecto. Ofrecemos chatbots, análisis de datos y asistentes virtuales. ¿Cuál te interesa?", duration: 2500 },
    { speaker: "user", text: "Me interesa el servicio de chatbots para mi empresa", duration: 2000 },
    { speaker: "assistant", text: "Excelente elección. Nuestros chatbots pueden reducir el tiempo de respuesta en 85%. ¿Te gustaría agendar una demo?", duration: 3000 },
    { speaker: "user", text: "Sí, me gustaría agendar una demo", duration: 1800 },
    { speaker: "assistant", text: "Perfecto. Tengo disponibilidad este viernes 15 a las 3 PM o el lunes 18 a las 10 AM. ¿Cuál prefieres?", duration: 2800 },
    { speaker: "user", text: "El viernes 15 a las 3 PM me viene bien", duration: 1800 },
    { speaker: "assistant", text: "Genial. ¿Me confirmas tu nombre completo?", duration: 2000 },
    { speaker: "user", text: "Sí, soy María González", duration: 1500 },
    { speaker: "assistant", text: "Perfecto María. He agendado tu demo de Chatbots para el viernes 15 a las 3 PM. Te enviaré la confirmación por email. ¿Algo más en lo que pueda ayudarte?", duration: 3500 },
    { speaker: "user", text: "No, eso es todo. Muchas gracias", duration: 1500 },
    { speaker: "assistant", text: "¡Gracias a ti! Nos vemos el viernes. ¡Que tengas un excelente día!", duration: 2500 },
  ];

  useEffect(() => {
    if (callStatus !== "active") return;

    if (currentStep >= conversation.length) {
      setAppointment({
        service: "Demo de Chatbots con IA",
        date: "Viernes 15 de Noviembre",
        time: "3:00 PM",
        name: "María González",
      });
      setTimeout(() => {
        setCallStatus("completed");
        setIsSpeaking(false);
      }, 3000);
      return;
    }

    const step = conversation[currentStep];
    setIsSpeaking(true);

    const timer = setTimeout(() => {
      setTranscript(prev => [...prev, step.text]);
      setIsSpeaking(false);
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [callStatus, currentStep]);

  useEffect(() => {
    if (transcriptEndRef.current && transcriptContainerRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [transcript]);

  const startCall = () => {
    setCallStatus("calling");
    setTimeout(() => {
      setCallStatus("active");
      setCurrentStep(0);
      setTranscript([]);
      setAppointment(null);
    }, 2000);
  };

  const endCall = () => {
    setCallStatus("idle");
    setCurrentStep(0);
    setTranscript([]);
    setIsSpeaking(false);
    setAppointment(null);
  };

  const resetDemo = () => {
    setCallStatus("idle");
    setCurrentStep(0);
    setTranscript([]);
    setIsSpeaking(false);
    setAppointment(null);
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Phone Interface */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-card to-card-elevated rounded-lg border border-border p-6 overflow-hidden">
        
        {callStatus === "idle" && (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Phone className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Asistente de Voz IA</h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              Llama ahora y experimenta cómo nuestro asistente puede atender consultas y agendar citas automáticamente
            </p>
            <Button 
              onClick={startCall}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Iniciar Llamada Demo
            </Button>
          </div>
        )}

        {callStatus === "calling" && (
          <div className="text-center animate-fade-in">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                <Phone className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Conectando...</h3>
            <p className="text-muted-foreground">Estableciendo llamada</p>
          </div>
        )}

        {callStatus === "active" && (
          <div className="w-full h-full flex flex-col animate-fade-in">
            {/* Voice Visualization - Compacto */}
            <div className="flex items-center justify-between bg-gradient-to-r from-card-elevated to-card rounded-lg p-4 border border-border mb-3">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-all duration-500 ${
                    isSpeaking ? 'shadow-lg shadow-primary/50' : 'shadow-md'
                  }`}>
                    <Mic className={`w-8 h-8 text-white transition-transform duration-500 ${isSpeaking ? 'scale-110' : 'scale-100'}`} />
                  </div>
                  {isSpeaking && (
                    <>
                      <div className="absolute -inset-2 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '2s' }}></div>
                      <div className="absolute -inset-1 rounded-full bg-primary/10"></div>
                    </>
                  )}
                </div>

                {/* Sound Waves - Horizontal */}
                <div className="flex items-center gap-1 h-12">
                  {[...Array(5)].map((_, i) => {
                    const heights = [24, 32, 28, 36, 30];
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-700 ease-in-out ${
                          isSpeaking 
                            ? 'bg-gradient-to-t from-primary to-secondary opacity-100' 
                            : 'bg-muted/50 opacity-40'
                        }`}
                        style={{
                          height: isSpeaking ? `${heights[i]}px` : '8px',
                          transitionDelay: `${i * 100}ms`,
                          animation: isSpeaking ? `wave 1.5s ease-in-out ${i * 0.15}s infinite` : 'none',
                        }}
                      />
                    );
                  })}
                </div>
                <style>{`
                  @keyframes wave {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.7); }
                  }
                `}</style>

                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <p className="text-xs font-semibold">
                    {isSpeaking ? "Asistente..." : "Escuchando..."}
                  </p>
                </div>
              </div>

              {/* End Call Button - Inline */}
              <Button 
                onClick={endCall}
                variant="destructive"
                size="sm"
                className="rounded-full"
              >
                <PhoneOff className="w-4 h-4 mr-1" />
                Finalizar
              </Button>
            </div>

            {/* Transcript - Altura Fija */}
            <div 
              ref={transcriptContainerRef}
              className="flex-1 bg-card-elevated rounded-lg border border-border overflow-hidden flex flex-col"
            >
              <div className="p-2.5 bg-card/50 border-b border-border flex-shrink-0">
                <h4 className="text-xs font-semibold flex items-center gap-2 uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Transcripción en Vivo
                </h4>
              </div>
              <div className="flex-1 overflow-y-scroll p-3 space-y-2">
                {transcript.map((text, index) => {
                  const step = conversation[index];
                  return (
                    <div
                      key={index}
                      className={`flex gap-2 animate-slide-up ${
                        step.speaker === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      {step.speaker === "assistant" && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <Mic className="w-3 h-3 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                          step.speaker === "assistant"
                            ? "bg-primary/10 border border-primary/20 text-foreground rounded-tl-none"
                            : "bg-secondary/10 border border-secondary/20 text-foreground rounded-tr-none"
                        }`}
                      >
                        {text}
                      </div>
                      {step.speaker === "user" && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-secondary" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={transcriptEndRef} />
              </div>
            </div>
          </div>
        )}

        {callStatus === "completed" && appointment && (
          <div className="w-full h-full flex flex-col justify-center animate-fade-in px-4">
            {/* Success Icon */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                style={{ animation: 'success-pop 0.6s ease-out' }}
              >
                <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -inset-3 rounded-full border-2 border-green-500/20 animate-ping" style={{ animationDuration: '2.5s' }}></div>
              <div className="absolute -inset-1 rounded-full bg-green-500/10"></div>
            </div>
            <style>{`
              @keyframes success-pop {
                0% { transform: scale(0.8); opacity: 0; }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
              }
            `}</style>
            
            {/* Title */}
            <h3 className="text-2xl font-bold mb-2 text-center">
              ¡Cita Agendada!
            </h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-md mx-auto">
              Tu asistente procesó la información automáticamente
            </p>

            {/* Appointment Details */}
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden mb-6 max-w-md mx-auto w-full">
              {/* Service Header */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-3 border-b border-border/50">
                <p className="text-sm font-semibold text-primary">{appointment.service}</p>
              </div>

              {/* Info Grid */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Cliente</p>
                    <p className="text-sm font-semibold truncate">{appointment.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Fecha</p>
                    <p className="text-sm font-semibold">{appointment.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Hora</p>
                    <p className="text-sm font-semibold">{appointment.time}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center mb-4">
              <Button 
                onClick={resetDemo}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Iniciar Nueva Llamada
              </Button>
            </div>

            {/* Info Badge */}
            <div className="max-w-md mx-auto w-full">
              <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-3 border border-primary/10">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    El asistente entendió la solicitud, proporcionó información y agendó la cita sin intervención humana
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
