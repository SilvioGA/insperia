import { useState, useEffect } from "react";
import { FileText, Sparkles, CheckCircle2, DollarSign, Zap, Package, Coffee, Laptop, Building2, Upload, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Invoice {
  id: number;
  vendor: string;
  amount: string;
  amountNum: number;
  date: string;
  category: "tecnologia" | "oficina" | "servicios" | "suministros";
  status: "pending" | "processing" | "completed";
  icon: JSX.Element;
  categoryLabel: string;
  color: string;
}

export const InvoiceDemo = () => {
  const [status, setStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentProcessing, setCurrentProcessing] = useState(0);

  const categoryConfig = {
    tecnologia: { label: "Tecnología", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
    oficina: { label: "Oficina", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    servicios: { label: "Servicios", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
    suministros: { label: "Suministros", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  };

  const initialInvoices: Invoice[] = [
    { 
      id: 1, 
      vendor: "Tech Solutions", 
      amount: "$1,250", 
      amountNum: 1250,
      date: "15/11/2024", 
      category: "tecnologia", 
      status: "pending",
      icon: <Laptop className="w-4 h-4" />,
      categoryLabel: "Tecnología",
      color: "blue"
    },
    { 
      id: 2, 
      vendor: "Office Supplies Co", 
      amount: "$340", 
      amountNum: 340,
      date: "14/11/2024", 
      category: "oficina", 
      status: "pending",
      icon: <Package className="w-4 h-4" />,
      categoryLabel: "Oficina",
      color: "purple"
    },
    { 
      id: 3, 
      vendor: "Cloud Services Inc", 
      amount: "$890", 
      amountNum: 890,
      date: "13/11/2024", 
      category: "servicios", 
      status: "pending",
      icon: <Building2 className="w-4 h-4" />,
      categoryLabel: "Servicios",
      color: "green"
    },
    { 
      id: 4, 
      vendor: "Catering Express", 
      amount: "$450", 
      amountNum: 450,
      date: "12/11/2024", 
      category: "suministros", 
      status: "pending",
      icon: <Coffee className="w-4 h-4" />,
      categoryLabel: "Suministros",
      color: "orange"
    },
    { 
      id: 5, 
      vendor: "Software Licensing", 
      amount: "$2,100", 
      amountNum: 2100,
      date: "11/11/2024", 
      category: "tecnologia", 
      status: "pending",
      icon: <Laptop className="w-4 h-4" />,
      categoryLabel: "Tecnología",
      color: "blue"
    },
    { 
      id: 6, 
      vendor: "Print & Copy Shop", 
      amount: "$125", 
      amountNum: 125,
      date: "10/11/2024", 
      category: "oficina", 
      status: "pending",
      icon: <Package className="w-4 h-4" />,
      categoryLabel: "Oficina",
      color: "purple"
    },
  ];

  useEffect(() => {
    if (status === "processing" && currentProcessing < initialInvoices.length) {
      const timer = setTimeout(() => {
        setInvoices(prev => {
          const newInvoices = [...prev];
          newInvoices[currentProcessing] = {
            ...initialInvoices[currentProcessing],
            status: "processing"
          };
          return newInvoices;
        });

        setTimeout(() => {
          setInvoices(prev => {
            const newInvoices = [...prev];
            newInvoices[currentProcessing] = {
              ...initialInvoices[currentProcessing],
              status: "completed"
            };
            return newInvoices;
          });
          setCurrentProcessing(prev => prev + 1);
        }, 800);
      }, 600);

      return () => clearTimeout(timer);
    }

    if (status === "processing" && currentProcessing >= initialInvoices.length) {
      setTimeout(() => setStatus("completed"), 800);
    }
  }, [status, currentProcessing]);

  const startProcess = () => {
    setInvoices(initialInvoices);
    setStatus("processing");
    setCurrentProcessing(0);
  };

  const resetDemo = () => {
    setStatus("idle");
    setInvoices([]);
    setCurrentProcessing(0);
  };

  const getCategoryStats = () => {
    const stats = invoices
      .filter(inv => inv.status === "completed")
      .reduce((acc, inv) => {
        const key = inv.category;
        if (!acc[key]) {
          acc[key] = { count: 0, total: 0, label: inv.categoryLabel };
        }
        acc[key].count++;
        acc[key].total += inv.amountNum;
        return acc;
      }, {} as Record<string, { count: number; total: number; label: string }>);

    return Object.entries(stats);
  };

  const totalAmount = invoices
    .filter(inv => inv.status === "completed")
    .reduce((sum, inv) => sum + inv.amountNum, 0);

  const completedCount = invoices.filter(inv => inv.status === "completed").length;

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 p-6 bg-gradient-to-b from-card to-card-elevated rounded-lg border border-border overflow-hidden">
        
        {/* Estado Inicial */}
        {status === "idle" && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Procesador de Facturas IA</h3>
            <p className="text-muted-foreground mb-2 max-w-lg">
              Procesa <span className="font-semibold text-foreground">cientos de facturas</span> en minutos
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">
              Extrae datos, valida información y clasifica automáticamente por categorías
            </p>
            <Button 
              onClick={startProcess}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Procesar 6 Facturas Demo
            </Button>
          </div>
        )}

        {/* Procesamiento y Completado */}
        {(status === "processing" || status === "completed") && (
          <div className="h-full flex flex-col">
            {/* Header con Stats */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Procesamiento en Lote</h4>
                  <p className="text-xs text-muted-foreground">
                    {status === "completed" ? "Completado" : `${completedCount}/${initialInvoices.length} facturas procesadas`}
                  </p>
                </div>
              </div>

              {status === "processing" && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs font-semibold text-primary">Procesando...</span>
                </div>
              )}

              {status === "completed" && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-semibold text-green-500">Completado</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex gap-4 min-h-0">
              {/* Lista de Facturas */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                  {invoices.map((invoice) => {
                    const config = categoryConfig[invoice.category];
                    return (
                      <div
                        key={invoice.id}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          invoice.status === "completed"
                            ? `${config.bg} ${config.border}`
                            : invoice.status === "processing"
                            ? "bg-primary/5 border-primary/30 ring-2 ring-primary/20"
                            : "bg-card border-border"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            invoice.status === "completed" ? config.bg : "bg-muted"
                          }`}>
                            {invoice.icon}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-sm font-semibold truncate">{invoice.vendor}</p>
                              <span className="text-sm font-bold text-foreground flex-shrink-0">{invoice.amount}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs text-muted-foreground">{invoice.date}</p>
                              {invoice.status === "completed" && (
                                <span className={`text-xs font-medium ${config.color}`}>
                                  {invoice.categoryLabel}
                                </span>
                              )}
                              {invoice.status === "processing" && (
                                <span className="text-xs text-primary font-medium flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 animate-spin" />
                                  Analizando...
                                </span>
                              )}
                            </div>
                          </div>

                          {invoice.status === "completed" && (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Panel de Estadísticas */}
              {status === "completed" && (
                <div className="w-64 flex flex-col gap-3">
                  {/* Total */}
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">Monto Total</span>
                    </div>
                    <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">{completedCount} facturas procesadas</p>
                  </div>

                  {/* Por Categoría */}
                  <div className="p-4 bg-card rounded-lg border border-border flex-1 overflow-hidden flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold">Por Categoría</span>
                    </div>
                    <div className="space-y-2.5 overflow-y-auto">
                      {getCategoryStats().map(([key, data]) => {
                        const config = categoryConfig[key as keyof typeof categoryConfig];
                        return (
                          <div key={key} className={`p-2.5 rounded-lg ${config.bg} border ${config.border}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold">{data.label}</span>
                              <span className="text-xs font-bold">{data.count}</span>
                            </div>
                            <p className={`text-sm font-bold ${config.color}`}>
                              ${data.total.toLocaleString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Botón Reset */}
                  <Button 
                    onClick={resetDemo}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Nuevo Lote
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
