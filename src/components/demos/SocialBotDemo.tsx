import { useState, useEffect, useRef } from "react";
import { MessageCircle, Sparkles, CheckCircle2, Heart, AlertCircle, ThumbsUp, User, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  comment: string;
  sentiment: "positive" | "negative" | "question" | "neutral";
  platform: "instagram" | "facebook" | "twitter";
  status: "pending" | "analyzing" | "responded";
  response?: string;
  responseTime?: number;
}

export const SocialBotDemo = () => {
  const [status, setStatus] = useState<"idle" | "active" | "completed">("idle");
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentProcessing, setCurrentProcessing] = useState(0);
  const feedEndRef = useRef<HTMLDivElement>(null);

  const platformColors = {
    instagram: "from-pink-500 to-purple-500",
    facebook: "from-blue-500 to-blue-600",
    twitter: "from-sky-400 to-blue-500",
  };

  const initialComments: Omit<Comment, "status" | "response" | "responseTime">[] = [
    {
      id: 1,
      user: "María García",
      avatar: "MG",
      comment: "¡Me encanta este producto! ¿Tienen envío internacional?",
      sentiment: "question",
      platform: "instagram"
    },
    {
      id: 2,
      user: "Carlos López",
      avatar: "CL",
      comment: "Excelente servicio, muy recomendado 👏",
      sentiment: "positive",
      platform: "facebook"
    },
    {
      id: 3,
      user: "Ana Martínez",
      avatar: "AM",
      comment: "Llevo 2 días esperando respuesta sobre mi pedido...",
      sentiment: "negative",
      platform: "instagram"
    },
    {
      id: 4,
      user: "Pedro Ruiz",
      avatar: "PR",
      comment: "¿Cuál es el horario de atención?",
      sentiment: "question",
      platform: "twitter"
    },
    {
      id: 5,
      user: "Laura Torres",
      avatar: "LT",
      comment: "Increíble calidad, superó mis expectativas! 🌟",
      sentiment: "positive",
      platform: "facebook"
    },
    {
      id: 6,
      user: "Diego Silva",
      avatar: "DS",
      comment: "El producto llegó dañado, muy decepcionado",
      sentiment: "negative",
      platform: "instagram"
    },
  ];

  const generateResponse = (comment: Comment): { response: string; time: number } => {
    const specificResponses: Record<number, { response: string; time: number }> = {
      1: {
        response: "¡Hola María! Sí, hacemos envíos a todo el mundo 🌎 Te envié un DM con más detalles sobre costos y tiempos. ¡Gracias por tu interés!",
        time: 2
      },
      2: {
        response: "¡Muchas gracias Carlos! 💙 Nos alegra muchísimo saber que tuviste una buena experiencia. Clientes como tú nos motivan a seguir mejorando 🙌",
        time: 1.5
      },
      3: {
        response: "Lamentamos mucho esto, Ana 🙏 Ya revisé tu pedido y te envié un DM con el estado actualizado. Nuestro equipo te contactará en los próximos 30 minutos para resolver esto.",
        time: 2.5
      },
      4: {
        response: "¡Hola Pedro! 😊 Nuestro horario es Lunes a Viernes de 9AM a 6PM, pero el chat automático está disponible 24/7. ¿En qué más puedo ayudarte?",
        time: 2
      },
      5: {
        response: "¡Gracias Laura! ⭐ Comentarios como el tuyo nos llenan de energía. Nos encanta saber que superamos tus expectativas. ¡Esperamos verte pronto!",
        time: 1.5
      },
      6: {
        response: "Disculpa muchísimo por esto, Diego 😔 Ya escalé tu caso con máxima prioridad. Te envié un DM para coordinar el reemplazo o reembolso inmediato. Espera nuestro contacto en breve.",
        time: 2.5
      }
    };

    return specificResponses[comment.id];
  };

  useEffect(() => {
    if (status === "active" && currentProcessing < initialComments.length) {
      const timer = setTimeout(() => {
        const newComment = {
          ...initialComments[currentProcessing],
          status: "analyzing" as const
        };
        setComments(prev => [...prev, newComment]);

        setTimeout(() => {
          const { response, time } = generateResponse(newComment as Comment);
          
          setTimeout(() => {
            setComments(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                status: "responded",
                response,
                responseTime: time
              };
              return updated;
            });
            
            setCurrentProcessing(prev => prev + 1);
          }, 1200);
        }, 800);
      }, 400);

      return () => clearTimeout(timer);
    }

    if (status === "active" && currentProcessing >= initialComments.length) {
      setTimeout(() => setStatus("completed"), 1000);
    }
  }, [status, currentProcessing]);

  useEffect(() => {
    if (feedEndRef.current) {
      feedEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const startDemo = () => {
    setComments([]);
    setCurrentProcessing(0);
    setStatus("active");
  };

  const resetDemo = () => {
    setComments([]);
    setCurrentProcessing(0);
    setStatus("idle");
  };

  const getSentimentIcon = (sentiment: Comment["sentiment"]) => {
    switch (sentiment) {
      case "positive": return <Heart className="w-3 h-3 text-green-500" />;
      case "negative": return <AlertCircle className="w-3 h-3 text-red-500" />;
      case "question": return <MessageCircle className="w-3 h-3 text-blue-500" />;
      default: return <ThumbsUp className="w-3 h-3 text-gray-500" />;
    }
  };

  const stats = {
    total: comments.filter(c => c.status === "responded").length,
    avgTime: comments.filter(c => c.responseTime).reduce((sum, c) => sum + (c.responseTime || 0), 0) / comments.filter(c => c.responseTime).length || 0,
    positive: comments.filter(c => c.sentiment === "positive" && c.status === "responded").length,
    questions: comments.filter(c => c.sentiment === "question" && c.status === "responded").length,
    negative: comments.filter(c => c.sentiment === "negative" && c.status === "responded").length,
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 p-6 bg-gradient-to-b from-card to-card-elevated rounded-lg border border-border overflow-hidden">
        
        {/* Estado Inicial */}
        {status === "idle" && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Bot de Respuestas Automáticas</h3>
            <p className="text-muted-foreground mb-2 max-w-lg">
              <span className="font-semibold text-foreground">Responde a comentarios</span> en todas tus redes sociales 24/7
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Analiza el sentimiento, genera respuestas personalizadas y nunca dejes un cliente sin atender
            </p>
            <Button 
              onClick={startDemo}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Ver Demo en Vivo
            </Button>
          </div>
        )}

        {/* Demo Activa */}
        {(status === "active" || status === "completed") && (
          <div className="h-full flex gap-4">
            {/* Feed de Comentarios */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Comentarios Entrantes</h4>
                    <p className="text-xs text-muted-foreground">Todas las plataformas</p>
                  </div>
                </div>
                
                {status === "active" && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    <span className="text-xs font-semibold text-primary">Activo</span>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-card rounded-lg border border-border animate-slide-up"
                  >
                    {/* Comentario Original */}
                    <div className="flex gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${platformColors[comment.platform]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold">{comment.user}</span>
                          {getSentimentIcon(comment.sentiment)}
                        </div>
                        <p className="text-sm text-foreground">{comment.comment}</p>
                      </div>
                    </div>

                    {/* Estado de Análisis */}
                    {comment.status === "analyzing" && (
                      <div className="ml-13 pl-4 border-l-2 border-primary/30">
                        <div className="flex items-center gap-2 text-primary">
                          <Sparkles className="w-3 h-3 animate-spin" />
                          <span className="text-xs font-medium">Analizando y generando respuesta...</span>
                        </div>
                      </div>
                    )}

                    {/* Respuesta del Bot */}
                    {comment.status === "responded" && comment.response && (
                      <div className="ml-13 pl-4 border-l-2 border-green-500/30 bg-green-500/5 rounded-r-lg p-2.5">
                        <div className="flex gap-2 mb-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold">Tu Marca</span>
                              <span className="text-xs text-green-500 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {comment.responseTime}s
                              </span>
                            </div>
                            <p className="text-xs text-foreground">{comment.response}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={feedEndRef} />
              </div>
            </div>

            {/* Panel de Estadísticas */}
            {status === "completed" && (
              <div className="w-56 flex flex-col gap-3">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold">Rendimiento</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">respuestas enviadas</p>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Tiempo promedio</p>
                  <p className="text-xl font-bold text-green-500">{stats.avgTime.toFixed(1)}s</p>
                </div>

                <div className="p-3 bg-card rounded-lg border border-border space-y-2">
                  <p className="text-xs font-semibold mb-2">Por tipo</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-3 h-3 text-green-500" />
                      <span className="text-xs">Positivos</span>
                    </div>
                    <span className="text-sm font-bold">{stats.positive}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-3 h-3 text-blue-500" />
                      <span className="text-xs">Preguntas</span>
                    </div>
                    <span className="text-sm font-bold">{stats.questions}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <span className="text-xs">Urgentes</span>
                    </div>
                    <span className="text-sm font-bold">{stats.negative}</span>
                  </div>
                </div>

                <Button 
                  onClick={resetDemo}
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Nueva Demo
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
