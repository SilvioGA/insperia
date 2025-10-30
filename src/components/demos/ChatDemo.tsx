import { useState, useEffect, useRef } from "react";
import { Bot, Send, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

type Channel = "web" | "whatsapp" | "telegram";

export const ChatDemo = () => {
  const [channel, setChannel] = useState<Channel>("web");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: "¡Hola! 👋 Soy tu asistente virtual de IA.\n\nPuedo ayudarte con precios, funcionalidades, implementación y más. ¿Qué te gustaría saber?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToLastMessage();
    }
  }, [messages, isTyping]);

  const resetChat = () => {
    setMessages([
      {
        type: "bot",
        text: "¡Hola! 👋 Soy tu asistente virtual de IA.\n\nPuedo ayudarte con precios, funcionalidades, implementación y más. ¿Qué te gustaría saber?",
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
    setShowQuickReplies(true);
  };

  const handleChannelChange = (newChannel: Channel) => {
    setChannel(newChannel);
    resetChat();
  };

  const getChannelStyles = () => {
    switch (channel) {
      case "whatsapp":
        return {
          container: "bg-[#0a1014]",
          header: "bg-[#1f2c34]",
          messagesArea: "bg-[#0b141a]",
          userBubble: "bg-[#005c4b] text-white",
          botBubble: "bg-[#1f2c34] text-white border-none",
          input: "bg-[#1f2c34] border-[#374047] text-white",
          quickReply: "bg-[#1f2c34] border-[#374047] text-white hover:bg-[#2a373f]",
        };
      case "telegram":
        return {
          container: "bg-[#0e1621]",
          header: "bg-[#2b5278]",
          messagesArea: "bg-[#0e1621]",
          userBubble: "bg-[#2b5278] text-white",
          botBubble: "bg-[#182533] text-white border-none",
          input: "bg-[#182533] border-[#2b5278] text-white",
          quickReply: "bg-[#182533] border-[#2b5278] text-white hover:bg-[#2b5278]",
        };
      default: // web
        return {
          container: "bg-card-elevated",
          header: "bg-gradient-to-r from-primary to-secondary",
          messagesArea: "bg-background/50",
          userBubble: "bg-gradient-to-r from-primary to-secondary text-white",
          botBubble: "bg-card border border-border",
          input: "bg-input border-border",
          quickReply: "hover:bg-primary hover:text-white",
        };
    }
  };

  const styles = getChannelStyles();

  const quickReplies = [
    { 
      id: 1, 
      text: "¿Cuál es el precio?", 
      response: "Tenemos tres planes según tus necesidades:\n\n💼 Básico: $99/mes - Hasta 1,000 conversaciones\n🚀 Profesional: $249/mes - 5,000 conversaciones + integraciones\n⭐ Empresarial: Personalizado - Volumen ilimitado\n\nTodos incluyen 14 días de prueba gratis. ¿Qué volumen de consultas manejas mensualmente?" 
    },
    { 
      id: 2, 
      text: "¿Qué horarios atienden?", 
      response: "🤖 Yo estoy disponible 24/7 los 365 días del año, sin interrupciones.\n\n👥 Nuestro equipo humano trabaja L-V de 9 AM a 6 PM para soporte técnico especializado.\n\nTus clientes siempre obtienen respuesta inmediata, incluso fines de semana y feriados." 
    },
    { 
      id: 3, 
      text: "¿Cómo funciona?", 
      response: "Proceso en 5 días:\n\n1️⃣ Día 1: Configuración y análisis inicial\n2️⃣ Días 2-3: Entrenamiento con tu contenido\n3️⃣ Día 4: Integración con tus sistemas\n4️⃣ Día 5: Lanzamiento y capacitación\n\nLa IA aprende continuamente de cada interacción. ¿Necesitas integrar algún sistema específico?" 
    },
    { 
      id: 4, 
      text: "Beneficios principales", 
      response: "Resultados reales de nuestros clientes:\n\n⚡ 85% menos tiempo de respuesta (de 8 min a 15 seg)\n💰 60% reducción en costos operativos\n📊 Atiende miles de consultas simultáneas\n🎯 +40% mejora en satisfacción (NPS)\n🧠 Aprende y mejora automáticamente\n\n¿Te gustaría ver casos de éxito en tu industria?" 
    },
  ];

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    setShowQuickReplies(false);
    
    const userMessage: Message = {
      type: "user",
      text: reply.text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        type: "bot",
        text: reply.response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setShowQuickReplies(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[650px] max-h-[85vh]">
      {/* Channel Selector - Compacto */}
      <div className="flex gap-1 mb-3 p-1 bg-card/50 rounded-lg border border-border/50">
        <button
          onClick={() => handleChannelChange("web")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all ${
            channel === "web"
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="font-medium text-xs">Web</span>
        </button>
        <button
          onClick={() => handleChannelChange("whatsapp")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all ${
            channel === "whatsapp"
              ? "bg-[#25D366] text-white shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="font-medium text-xs">WhatsApp</span>
        </button>
        <button
          onClick={() => handleChannelChange("telegram")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md transition-all ${
            channel === "telegram"
              ? "bg-[#0088cc] text-white shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span className="font-medium text-xs">Telegram</span>
        </button>
      </div>

      {/* Chat Container */}
      <div className={`flex flex-col flex-1 ${styles.container} rounded-lg overflow-hidden border border-border shadow-xl`}>
        {/* Chat Header */}
        <div className={`${styles.header} p-4 flex items-center gap-3`}>
          <div className={`w-10 h-10 rounded-full ${channel === "web" ? "bg-white/20 backdrop-blur-sm" : "bg-white/10"} flex items-center justify-center`}>
            {channel === "whatsapp" ? (
              <Phone className="w-6 h-6 text-white" />
            ) : (
              <Bot className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {channel === "whatsapp" ? "Soporte Empresarial" : "Asistente Virtual"}
            </h3>
            <p className="text-xs text-white/80">
              {channel === "telegram" ? "en línea" : "En línea • Responde al instante"}
            </p>
          </div>
        </div>

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${styles.messagesArea}`}>
        {messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`max-w-[80%] px-4 py-3 ${
                channel === "whatsapp" 
                  ? message.type === "user" 
                    ? "rounded-lg rounded-tr-none" 
                    : "rounded-lg rounded-tl-none"
                  : channel === "telegram"
                  ? message.type === "user"
                    ? "rounded-2xl rounded-tr-md"
                    : "rounded-2xl rounded-tl-md"
                  : "rounded-2xl"
              } ${
                message.type === "user"
                  ? styles.userBubble
                  : styles.botBubble
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-1 ${
                channel === "web" 
                  ? message.type === "user" ? "text-white/70" : "text-muted-foreground"
                  : "text-white/60"
              }`}>
                {message.timestamp.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in" ref={lastMessageRef}>
            <div className={`${styles.botBubble} rounded-2xl px-4 py-3`}>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full animate-bounce ${channel === "web" ? "bg-primary" : "bg-white/60"}`} style={{ animationDelay: "0s" }}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce ${channel === "web" ? "bg-primary" : "bg-white/60"}`} style={{ animationDelay: "0.2s" }}></div>
                <div className={`w-2 h-2 rounded-full animate-bounce ${channel === "web" ? "bg-primary" : "bg-white/60"}`} style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      {showQuickReplies && !isTyping && (
        <div className={`p-4 ${channel === "web" ? "bg-card/50" : styles.messagesArea} border-t ${channel === "web" ? "border-border" : "border-white/10"}`}>
          <p className={`text-xs mb-2 ${channel === "web" ? "text-muted-foreground" : "text-white/60"}`}>Respuestas rápidas:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickReplies.map((reply) => (
              <Button
                key={reply.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className={`text-xs h-auto py-2 px-3 transition-all border ${styles.quickReply}`}
              >
                {reply.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className={`p-4 ${channel === "web" ? "bg-card" : styles.messagesArea} border-t ${channel === "web" ? "border-border" : "border-white/10"}`}>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder={channel === "whatsapp" ? "Mensaje" : "Escribe tu mensaje..."}
            className={`flex-1 ${styles.input} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 ${
              channel === "web" ? "focus:ring-primary" : channel === "whatsapp" ? "focus:ring-[#25D366]" : "focus:ring-[#0088cc]"
            } placeholder:text-white/40`}
            disabled
          />
          <Button 
            size="icon" 
            disabled 
            className={`${
              channel === "web" 
                ? "bg-primary hover:bg-primary/90" 
                : channel === "whatsapp"
                ? "bg-[#25D366] hover:bg-[#25D366]/90"
                : "bg-[#0088cc] hover:bg-[#0088cc]/90"
            }`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className={`text-xs mt-2 text-center ${channel === "web" ? "text-muted-foreground" : "text-white/50"}`}>
          💡 Haz clic en las respuestas rápidas para ver la demo
        </p>
      </div>
      </div>
    </div>
  );
};
