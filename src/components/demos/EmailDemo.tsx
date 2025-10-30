import { useState, useRef, useEffect } from "react";
import { Mail, Sparkles, CheckCircle2, AlertCircle, Trash2, Archive, UserPlus, DollarSign, Wrench, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  fullContent: string;
  category: "soporte" | "ventas" | "spam" | "factura" | "urgente" | "newsletter" | "queja";
  priority: "alta" | "media" | "baja";
  analyzed: boolean;
  action?: string;
  time: string;
}

export const EmailDemo = () => {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(1);
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      from: "cliente@empresa.com",
      subject: "Problema con la plataforma - No puedo acceder",
      preview: "Hola, desde esta mañana no puedo iniciar sesión en la plataforma. Me sale error 403...",
      fullContent: "Hola equipo,\n\nDesde esta mañana no puedo iniciar sesión en la plataforma. Cuando intento acceder me sale un error 403 - Forbidden.\n\nHe probado desde diferentes navegadores y el problema persiste. Mi usuario es cliente_premium_2024.\n\n¿Pueden ayudarme urgentemente? Tengo que presentar un reporte importante hoy.\n\nGracias",
      category: "soporte",
      priority: "alta",
      analyzed: false,
      time: "10:30 AM",
    },
    {
      id: 2,
      from: "leads@potential.com",
      subject: "Interesado en sus servicios empresariales",
      preview: "Buenos días, somos una empresa de 50 empleados y estamos buscando una solución de IA...",
      fullContent: "Buenos días,\n\nSomos una empresa de 50 empleados en el sector de retail y estamos buscando una solución de IA para optimizar nuestra atención al cliente.\n\nNos interesa particularmente:\n- Chatbots multicanal\n- Análisis de sentimiento\n- Automatización de respuestas\n\nPresupuesto aproximado: $5,000-10,000/mes\n\n¿Podemos agendar una demo?\n\nSaludos,\nJuan Martínez\nDirector de Tecnología",
      category: "ventas",
      priority: "alta",
      analyzed: false,
      time: "9:15 AM",
    },
    {
      id: 3,
      from: "promo@marketing-spam.net",
      subject: "🎁 OFERTA EXCLUSIVA - 90% de descuento HOY",
      preview: "¡Última oportunidad! Compra ahora con descuento increíble. Haz clic aquí...",
      fullContent: "🎁🎁🎁 OFERTA IRREPETIBLE 🎁🎁🎁\n\n¡SOLO HOY! 90% de descuento en todos nuestros productos!!!\n\nHaz CLIC AQUÍ AHORA: http://suspicious-link.xyz\n\n¡No te lo pierdas! ¡Última oportunidad!\n\n*Oferta válida solo hoy*\n\nPara desuscribirte haz clic aquí [link roto]",
      category: "spam",
      priority: "baja",
      analyzed: false,
      time: "8:45 AM",
    },
    {
      id: 4,
      from: "facturacion@proveedor.com",
      subject: "Factura #2024-0456 - Servicios de Marzo",
      preview: "Adjunto encontrará la factura correspondiente al mes de marzo por un monto de...",
      fullContent: "Estimado cliente,\n\nAdjunto encontrará la factura #2024-0456 correspondiente a los servicios prestados durante el mes de marzo de 2024.\n\nDetalle:\n- Servicios de hosting: $299\n- Licencias de software: $150\n- Soporte técnico: $100\n\nTotal: $549 USD\nFecha de vencimiento: 15 de Abril, 2024\n\nSaludos cordiales,\nDepartamento de Facturación",
      category: "factura",
      priority: "media",
      analyzed: false,
      time: "7:20 AM",
    },
    {
      id: 5,
      from: "director@clientevip.com",
      subject: "URGENTE: Reunión cancelada, necesitamos reprogramar",
      preview: "Lamentamos informar que debemos cancelar la reunión de mañana. Es crítico que...",
      fullContent: "URGENTE\n\nLamentamos informar que debemos cancelar la reunión programada para mañana a las 10 AM debido a una emergencia corporativa.\n\nEs CRÍTICO que reprogramemos lo antes posible, idealmente esta misma semana. Tenemos decisiones importantes que tomar respecto al contrato de $50,000.\n\nPor favor confirmar disponibilidad urgente.\n\nRoberto Silva\nDirector Ejecutivo",
      category: "urgente",
      priority: "alta",
      analyzed: false,
      time: "Ayer",
    },
    {
      id: 6,
      from: "quejas@clienteinsatisfecho.com",
      subject: "Muy decepcionado con el servicio recibido",
      preview: "Llevo 3 días esperando una respuesta. El servicio al cliente es pésimo y...",
      fullContent: "Asunto: Queja formal\n\nEstoy MUY decepcionado con el servicio recibido.\n\nLlevo 3 días esperando una respuesta a mi ticket #4521. El servicio al cliente es pésimo y nadie me contacta.\n\nPagamos $500/mes y este es el trato que recibimos?\n\nSi no recibo una respuesta hoy, cancelaré mi suscripción y dejaré una reseña negativa.\n\nEspero acción inmediata.\n\nCarlos Rodríguez",
      category: "queja",
      priority: "alta",
      analyzed: false,
      time: "Ayer",
    },
  ]);

  const [analyzing, setAnalyzing] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const emailListRef = useRef<HTMLDivElement>(null);
  const lastEmailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analyzing !== null && analyzing !== -1 && lastEmailRef.current && emailListRef.current) {
      const container = emailListRef.current;
      const element = lastEmailRef.current;
      
      // Check if element is visible in viewport
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      const isVisible = 
        elementRect.top >= containerRect.top &&
        elementRect.bottom <= containerRect.bottom;
      
      // Only scroll if element is not fully visible
      if (!isVisible) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [analyzing]);

  const getEmailConfig = (category: Email["category"]) => {
    const configs = {
      soporte: {
        icon: <Wrench className="w-4 h-4" />,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        action: "Delegado a Soporte Técnico",
        actionIcon: <Wrench className="w-3 h-3" />,
        actionDetails: "Ticket #ST-2024 creado • Prioridad: Alta • Asignado a: Juan Pérez",
      },
      ventas: {
        icon: <DollarSign className="w-4 h-4" />,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        action: "Delegado a Equipo de Ventas",
        actionIcon: <UserPlus className="w-3 h-3" />,
        actionDetails: "Lead calificado • Valor estimado: Alto • Asignado a: María López",
      },
      spam: {
        icon: <Trash2 className="w-4 h-4" />,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        action: "Movido a Spam",
        actionIcon: <Trash2 className="w-3 h-3" />,
        actionDetails: "Detectado como spam con 98% de certeza • Movido a papelera",
      },
      factura: {
        icon: <Archive className="w-4 h-4" />,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        action: "Archivado en Finanzas",
        actionIcon: <Archive className="w-3 h-3" />,
        actionDetails: "Categorizado: Facturas 2024 • Fecha de vencimiento detectada • Recordatorio creado",
      },
      urgente: {
        icon: <AlertCircle className="w-4 h-4" />,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        action: "Prioridad Máxima - Notificación enviada",
        actionIcon: <AlertCircle className="w-3 h-3" />,
        actionDetails: "Alerta enviada al gerente • Marcado como urgente • Respuesta automática enviada",
      },
      queja: {
        icon: <AlertCircle className="w-4 h-4" />,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        action: "Alta Prioridad - Servicio al Cliente",
        actionIcon: <AlertCircle className="w-3 h-3" />,
        actionDetails: "Escalado a supervisor • Respuesta automática enviada • SLA: 2 horas",
      },
      newsletter: {
        icon: <Mail className="w-4 h-4" />,
        color: "text-gray-400",
        bgColor: "bg-gray-500/10",
        borderColor: "border-gray-500/30",
        action: "Categorizado y Archivado",
        actionIcon: <Archive className="w-3 h-3" />,
        actionDetails: "Movido a Newsletter • Marcado como leído",
      },
    };
    return configs[category];
  };

  const handleAnalyzeAll = () => {
    setAnalyzing(-1);
    setShowResults(false);
    
    emails.forEach((email, index) => {
      setTimeout(() => {
        setAnalyzing(email.id);
        
        setTimeout(() => {
          setEmails(prev => prev.map(e => 
            e.id === email.id ? { ...e, analyzed: true } : e
          ));
          
          if (index === emails.length - 1) {
            setTimeout(() => {
              setAnalyzing(null);
              setShowResults(true);
            }, 800);
          }
        }, 1500);
      }, index * 2000);
    });
  };

  const handleReset = () => {
    setEmails(emails.map(e => ({ ...e, analyzed: false })));
    setAnalyzing(null);
    setShowResults(false);
  };

  const analyzedCount = emails.filter(e => e.analyzed).length;
  const currentEmail = emails.find(e => e.id === selectedEmail);

  const getCategoryLabel = (category: Email["category"]) => {
    const labels = {
      soporte: "Soporte Técnico",
      ventas: "Oportunidad de Venta",
      spam: "Spam",
      factura: "Factura",
      urgente: "Urgente",
      queja: "Queja de Cliente",
      newsletter: "Newsletter",
    };
    return labels[category];
  };

  return (
    <div className="flex flex-col h-[650px] max-h-[85vh]">
      {/* Header with Action Button */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-card to-card-elevated rounded-lg border border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Bandeja de Entrada</h3>
            <p className="text-xs text-muted-foreground">
              {emails.filter(e => !e.analyzed).length} sin clasificar • {analyzedCount} procesados
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {showResults ? (
            <Button onClick={handleReset} variant="outline" size="sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Reiniciar Demo
            </Button>
          ) : (
            <Button 
              onClick={handleAnalyzeAll}
              disabled={analyzing !== null}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
              size="sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {analyzing !== null ? "Analizando..." : "Analizar con IA"}
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {analyzing !== null && (
        <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Procesando con IA...</span>
            </div>
            <span className="text-sm font-semibold text-primary">{analyzedCount}/{emails.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 shadow-lg"
              style={{ width: `${(analyzedCount / emails.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Email List */}
      <div className="flex-1 overflow-hidden">
        <div ref={emailListRef} className="h-full overflow-y-auto p-2 space-y-3">
        {emails.map((email, index) => {
          const config = getEmailConfig(email.category);
          const isCurrentlyAnalyzing = analyzing === email.id;

          return (
            <div
              key={email.id}
              ref={analyzing === email.id ? lastEmailRef : null}
              className={`p-3 rounded-lg border transition-all duration-300 bg-card ${
                email.analyzed
                  ? `${config.borderColor} border-2`
                  : "border-border hover:border-primary/30"
              } ${isCurrentlyAnalyzing ? "ring-2 ring-primary" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  email.analyzed ? config.bgColor : "bg-muted"
                }`}>
                  {email.analyzed ? config.icon : <Mail className="w-4 h-4 text-muted-foreground" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold truncate">{email.from}</p>
                        <span className="text-xs text-muted-foreground">{email.time}</span>
                      </div>
                      <p className="text-sm font-bold truncate">{email.subject}</p>
                    </div>
                    {email.analyzed && (
                      <CheckCircle2 className={`w-5 h-5 ${config.color} flex-shrink-0`} />
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {email.preview}
                  </p>

                  {/* Analysis Result */}
                  {email.analyzed && (
                    <div className={`mt-2 p-2 rounded-md ${config.bgColor}`}>
                      <div className="flex items-center gap-2">
                        {config.actionIcon}
                        <span className={`text-xs font-semibold ${config.color}`}>
                          {config.action}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {config.actionDetails}
                      </p>
                    </div>
                  )}

                  {/* Analyzing Animation */}
                  {isCurrentlyAnalyzing && (
                    <div className="mt-2 p-2 bg-primary/5 rounded-md border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                        <p className="text-xs font-medium text-primary">
                          Analizando con IA...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Summary */}
      {showResults && (
        <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/30 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-semibold">Análisis Completado</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {emails.length} emails procesados y clasificados automáticamente en {emails.length * 2} segundos.
            Acciones ejecutadas: delegación automática, priorización y archivo inteligente.
          </p>
        </div>
      )}
    </div>
  );
};
