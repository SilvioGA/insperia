import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FormStep = 'initial' | 'extended' | 'analyzing' | 'results';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  companySize: string;
  currentProcesses: string;
  challenges: string;
}

interface Recommendation {
  title: string;
  description: string;
  benefits: string[];
  priority: 'Alta' | 'Media';
  impact: string;
}

export const DiagnosticForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<FormStep>('initial');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    companySize: '',
    currentProcesses: '',
    challenges: ''
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateInitialForm = () => {
    if (!formData.fullName.trim()) {
      toast({ title: "Error", description: "Por favor ingresa tu nombre completo", variant: "destructive" });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({ title: "Error", description: "Por favor ingresa un email válido", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleInitialSubmit = () => {
    if (validateInitialForm()) {
      setStep('extended');
    }
  };

  const handleExtendedSubmit = async () => {
    if (!formData.companyName.trim() || !formData.industry || !formData.companySize) {
      toast({ title: "Error", description: "Por favor completa todos los campos requeridos", variant: "destructive" });
      return;
    }

    setStep('analyzing');
    
    // Simulate AI analysis
    setTimeout(() => {
      // Generate mock recommendations based on industry
      const mockRecommendations: Recommendation[] = [
        {
          title: "Chatbot de Atención al Cliente 24/7",
          description: "Automatiza respuestas a consultas frecuentes y escalado inteligente a agentes humanos",
          benefits: [
            "Atención instantánea las 24 horas",
            "Resuelve 80% de consultas comunes",
            "Reduce carga del equipo de soporte"
          ],
          priority: 'Alta',
          impact: "Ahorro estimado: 60% en costos de soporte"
        },
        {
          title: "Automatización Inteligente de Correos",
          description: "Sistema de clasificación y respuestas automáticas mediante IA con contexto de negocio",
          benefits: [
            "Reduce tiempo de gestión de correos en 70%",
            "Clasificación inteligente por prioridad",
            "Respuestas contextuales automatizadas"
          ],
          priority: 'Alta',
          impact: "Ahorro estimado: 15-20 horas semanales"
        },
        {
          title: "Análisis Predictivo de Tendencias",
          description: "Modelos de machine learning para anticipar demanda y optimizar inventario",
          benefits: [
            "Predice tendencias con 85% de precisión",
            "Optimiza niveles de inventario",
            "Reduce costos de almacenamiento"
          ],
          priority: 'Media',
          impact: "ROI estimado: 30% en optimización de recursos"
        }
      ];

      setRecommendations(mockRecommendations);
      setStep('results');
    }, 3000);
  };

  const scrollToContact = () => {
    setIsOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="diagnostic" className="py-32 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Análisis gratuito en 60 segundos</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Descubre cuánto tiempo y dinero{" "}
                <span className="gradient-text">puedes ahorrar</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Recibe un diagnóstico personalizado con las soluciones de IA específicas 
                para los desafíos de tu empresa
              </p>
            </div>

            <div className="p-8 md:p-12 rounded-3xl border-2 border-primary/20 bg-gradient-to-b from-card-elevated to-card shadow-2xl animate-slide-up relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
              <div className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-base font-medium">Nombre Completo *</Label>
                    <Input
                      id="fullName"
                      placeholder="Ej: Juan Pérez"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className="mt-2 h-12 text-base bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@empresa.com"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="mt-2 h-12 text-base bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">Teléfono (Opcional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+52 123 456 7890"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="mt-2 h-12 text-base bg-background/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => {
                      if (validateInitialForm()) {
                        setIsOpen(true);
                        setStep('extended');
                      }
                    }}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-[1.02] text-lg py-7 font-semibold shadow-lg shadow-primary/20"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    Obtener Mi Diagnóstico Gratuito
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Sin compromiso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Resultados instantáneos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>100% confidencial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for extended form and results */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
          {step === 'extended' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Diagnóstico Personalizado con{" "}
                  <span className="gradient-text">Inteligencia Artificial</span>
                </h3>
                <p className="text-muted-foreground">
                  Cuéntanos sobre tu negocio y te mostraremos las soluciones de IA perfectas para ti
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                  <Input
                    id="companyName"
                    placeholder="Ej: TechCorp S.A."
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industria / Sector *</Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona el tamaño de tu empresa" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="ecommerce">E-commerce / Retail</SelectItem>
                      <SelectItem value="servicios">Servicios Profesionales</SelectItem>
                      <SelectItem value="manufactura">Manufactura</SelectItem>
                      <SelectItem value="salud">Salud y Bienestar</SelectItem>
                      <SelectItem value="finanzas">Finanzas y Seguros</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="educacion">Educación</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="companySize">Tamaño de la Empresa *</Label>
                  <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona el tamaño de tu empresa" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="1-10">1-10 empleados</SelectItem>
                      <SelectItem value="11-50">11-50 empleados</SelectItem>
                      <SelectItem value="51-200">51-200 empleados</SelectItem>
                      <SelectItem value="201-500">201-500 empleados</SelectItem>
                      <SelectItem value="500+">500+ empleados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentProcesses">Describe tus Procesos Actuales *</Label>
                  <Textarea
                    id="currentProcesses"
                    placeholder="Ej: Actualmente gestionamos pedidos manualmente mediante Excel y enviamos respuestas individuales..."
                    value={formData.currentProcesses}
                    onChange={(e) => updateFormData('currentProcesses', e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Al ser específico ayudas a generar mejores recomendaciones
                  </p>
                </div>

                <div>
                  <Label htmlFor="challenges">Principales Desafíos o Problemas *</Label>
                  <Textarea
                    id="challenges"
                    placeholder="Ej: Perdemos tiempo en tareas repetitivas, enfrentamos errores de inventario, necesitamos automatizar respuestas..."
                    value={formData.challenges}
                    onChange={(e) => updateFormData('challenges', e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Describe tus problemas más urgentes por orden de prioridad
                  </p>
                </div>

                <Button
                  onClick={handleExtendedSubmit}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg py-6"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Generar Recomendaciones Personalizadas
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Análisis impulsado por IA • Recomendaciones específicas para tu negocio
                </p>
              </div>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="py-16 text-center animate-fade-in">
              <div className="mb-8">
                <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Analizando tu Negocio...</h3>
                <p className="text-muted-foreground">
                  Nuestra IA está procesando la información para generar recomendaciones personalizadas
                </p>
              </div>

              <div className="space-y-3 max-w-md mx-auto text-left">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span>Identificando procesos optimizables...</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <span>Evaluando soluciones de IA disponibles...</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span>Calculando retorno de inversión potencial...</span>
                </div>
              </div>
            </div>
          )}

          {step === 'results' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Soluciones de IA Recomendadas para{" "}
                  <span className="gradient-text">tu Negocio</span>
                </h3>
                <p className="text-muted-foreground">
                  Basado en tu información, estas son las soluciones de inteligencia artificial que transformarán tu empresa
                </p>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-border bg-card-elevated animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold">{rec.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'Alta' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {rec.priority} Prioridad
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{rec.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Beneficios Clave:</p>
                      <ul className="space-y-1">
                        {rec.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm">
                        <span className="font-medium text-primary">💡 {rec.impact}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 space-y-4">
                <Button
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg py-6"
                >
                  Solicitar Implementación
                </Button>
                <Button
                  variant="outline"
                  onClick={scrollToContact}
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  Agendar Llamada con Experto
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};