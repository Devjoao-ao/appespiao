import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, Lock, Smartphone, Search, AlertTriangle, CheckCircle, MessageSquare, PhoneCall, Users, ChevronRight } from "lucide-react";
import InputMask from "react-input-mask";
import { HackerButton } from "@/components/HackerButton";
import { TerminalLog } from "@/components/TerminalLog";
import { LiveTicker } from "@/components/LiveTicker";
import { useCreateSimulation } from "@/hooks/use-simulations";
import { useToast } from "@/hooks/use-toast";

type Step = "initial" | "input" | "processing" | "result" | "report";
type Gender = "male" | "female" | null;

export default function Home() {
  const [step, setStep] = useState<Step>("initial");
  const [gender, setGender] = useState<Gender>(null);
  const [phone, setPhone] = useState("");
  const createSimulation = useCreateSimulation();
  const { toast } = useToast();

  const handleGenderSelect = (selected: Gender) => {
    setGender(selected);
    setStep("input");
  };

  const handleStartAnalysis = () => {
    if (phone.replace(/\D/g, "").length < 9) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, insira um número válido de Angola.",
        variant: "destructive",
      });
      return;
    }

    createSimulation.mutate(
      { gender: gender || "unknown", phoneNumber: phone, step: "processing" },
      {
        onSuccess: () => setStep("processing"),
        onError: () => setStep("processing"), // Proceed anyway for funnel effect
      }
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Scanlines overlay handled in global CSS */}
      <div className="scanline"></div>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-[-1] opacity-20" style={{ 
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none"></div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: INITIAL */}
        {step === "initial" && (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-2xl w-full text-center space-y-12 z-10"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-widest mb-4"
              >
                <Shield className="w-4 h-4" />
                <span>Sistema de Monitoramento 2.0</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-glow leading-tight">
                Proteja Seu <br/><span className="text-white">Relacionamento</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
                Descubra como manter seu relacionamento seguro e saudável com nossa solução exclusiva de análise de dados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
              <HackerButton onClick={() => handleGenderSelect("male")} className="w-full">
                Monitorar Ele
              </HackerButton>
              <HackerButton onClick={() => handleGenderSelect("female")} className="w-full" variant="outline">
                Monitorar Ela
              </HackerButton>
            </div>

            <div className="text-xs text-primary/40 uppercase tracking-widest mt-12">
              Acesso seguro e criptografado • 100% Confidencial
            </div>
          </motion.div>
        )}

        {/* STEP 2: INPUT */}
        {step === "input" && (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-md w-full text-center space-y-8 z-10 bg-black/40 p-8 rounded-xl border border-primary/20 backdrop-blur-sm"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/50 animate-pulse">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Acesso Gratuito Liberado!</h2>
              <p className="text-sm text-primary/80">
                Você ganhou 1 análise completa gratuita. Insira o número do alvo abaixo.
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-primary font-bold text-lg">AO</span>
                </div>
                <InputMask 
                  mask="+244 999 999 999" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-black/60 border-2 border-primary/30 rounded focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-xl font-mono tracking-wider text-white placeholder-primary/20 transition-all"
                  placeholder="+244 9XX XXX XXX"
                />
              </div>
              
              <HackerButton 
                onClick={handleStartAnalysis} 
                disabled={phone.replace(/\D/g, "").length < 9}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Iniciar Varredura
              </HackerButton>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Ao continuar, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </motion.div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === "processing" && (
          <motion.div
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-xl w-full text-center space-y-8 z-10"
          >
            <h2 className="text-2xl font-bold animate-pulse text-primary">PROCESSANDO ACESSO...</h2>
            <TerminalLog onComplete={() => setStep("result")} />
          </motion.div>
        )}

        {/* STEP 4: PARTIAL RESULT */}
        {step === "result" && (
          <motion.div
            key="step4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-md w-full z-10 space-y-6"
          >
            <div className="bg-black/60 border border-primary/30 rounded-lg p-6 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2">
                <div className="flex items-center gap-2 px-2 py-1 bg-green-900/30 rounded border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] uppercase text-green-400 font-bold">Online Agora</span>
                </div>
              </div>

              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-slate-800 mb-4 border-2 border-primary relative overflow-hidden">
                   {/* Fallback avatar since no real image */}
                   <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                     <Users size={40} />
                   </div>
                   <div className="absolute inset-0 backdrop-blur-sm bg-primary/5"></div>
                </div>
                <h3 className="text-xl font-mono text-white tracking-wider">{phone}</h3>
                <p className="text-sm text-primary/60">Perfil Identificado</p>
              </div>

              <div className="space-y-3 font-mono text-sm border-t border-primary/20 pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Localização:</span>
                  <span className="text-white">Luanda, Angola</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dispositivo:</span>
                  <span className="text-white">Android 14 (Ativo)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rede:</span>
                  <span className="text-white">Unitel 4G</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status WhatsApp:</span>
                  <span className="text-green-500 font-bold">Vulnerável</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-200/80">
                <strong className="block text-yellow-500 mb-1">ATENÇÃO: ATIVIDADE SUSPEITA</strong>
                Nosso sistema detectou 12 conversas ocultas e 3 localizações não habituais nos últimos 7 dias.
              </div>
            </div>

            <HackerButton onClick={() => setStep("report")} className="w-full">
              Visualizar Relatório
            </HackerButton>
          </motion.div>
        )}

        {/* STEP 5: REPORT (LOCKED) */}
        {step === "report" && (
          <motion.div
            key="step5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-md w-full z-10 h-[80vh] flex flex-col bg-black/80 border border-primary/20 rounded-xl backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-primary/20 bg-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-primary/30">
                  <Users className="w-5 h-5 text-primary/50" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{phone}</h3>
                  <p className="text-xs text-green-500">Online • Digitando...</p>
                </div>
              </div>
              <Lock className="w-5 h-5 text-primary" />
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 border-b border-primary/20 text-xs font-bold uppercase">
              <div className="p-3 text-center bg-primary/20 text-white border-b-2 border-primary">Conversas</div>
              <div className="p-3 text-center text-muted-foreground hover:bg-primary/5 cursor-pointer">Ligações</div>
              <div className="p-3 text-center text-muted-foreground hover:bg-primary/5 cursor-pointer">Galeria</div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 relative">
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] z-20 flex flex-col items-center justify-center p-6 text-center">
                 <Lock className="w-12 h-12 text-primary mb-4 animate-bounce" />
                 <h3 className="text-xl font-bold text-white mb-2">CONTEÚDO BLOQUEADO</h3>
                 <p className="text-sm text-gray-300 mb-6">
                   Para proteger a privacidade, o conteúdo completo está criptografado. Libere o acesso total para visualizar mensagens, áudios e fotos.
                 </p>
              </div>

              {/* Fake Items Under Blur */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/5 relative">
                  <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-600 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-3/4" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[10px] text-gray-500">12:3{i}</span>
                     {i % 2 === 0 && (
                       <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] font-bold text-black">
                         {i}
                       </div>
                     )}
                  </div>
                  {/* Warning label for some items */}
                  {i < 3 && (
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-red-500/20 border border-red-500 text-[8px] text-red-400 rounded uppercase font-bold tracking-wider z-10">
                      Suspeito
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sticky Footer CTA */}
            <div className="p-4 border-t border-primary/30 bg-black/90 z-30 space-y-3">
              <div className="flex items-center justify-between text-xs text-primary mb-1">
                <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 12 Mensagens Apagadas</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 43 Fotos Ocultas</span>
              </div>
              <a 
                href="https://www.kintu.org/product/2f9ea4b3-2793-424f-8f1f-a98724e0db64" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <HackerButton className="w-full flex justify-between items-center group">
                  <span>Liberar Acesso Agora</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </HackerButton>
              </a>
              <p className="text-[10px] text-center text-muted-foreground">
                Oferta por tempo limitado. O acesso pode expirar em 04:59.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LiveTicker />
    </div>
  );
}
