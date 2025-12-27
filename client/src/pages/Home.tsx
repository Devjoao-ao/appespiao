import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreVertical, Paperclip, Smile, Mic, CheckCheck } from "lucide-react";

const cities = ["Luanda", "Benguela", "Huambo", "Lubango", "Cabinda", "Lobito", "Viana", "Cacuaco"];

export default function Home() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (step === 3) {
      const startTime = Date.now();
      const duration = 60000;
      const logMessages = [
        "Conectando ao banco de dados...",
        "Validando número informado...",
        "Buscando padrões de atividade...",
        "Analisando horários recorrentes...",
        "Verificando sinais comportamentais...",
        "Cruzando informações disponíveis...",
        "Preparando relatório privado..."
      ];

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(currentProgress);
        const logIndex = Math.floor((currentProgress / 100) * logMessages.length);
        setLogs(logMessages.slice(0, logIndex + 1));
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(4), 1000);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-[#0b141a] text-[#e9edef] font-sans flex flex-col items-center justify-center p-0 overflow-hidden">
      <div className="w-full max-w-4xl h-screen md:h-[90vh] md:max-h-[800px] bg-[#111b21] md:rounded-lg shadow-2xl flex overflow-hidden border border-white/5">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 bg-[#111b21]"
            >
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-[#e9edef]">WhatsApp Web</h1>
                <p className="text-[#8696a0] text-lg max-w-md">
                  Descubra sinais digitais que podem indicar riscos no seu relacionamento.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                <Button 
                  onClick={() => setStep(2)}
                  className="bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[52px] rounded-full text-lg font-bold transition-all active:scale-95 border-none shadow-lg"
                >
                  Quero Analisar Meu Parceiro
                </Button>
                <Button 
                  onClick={() => setStep(2)}
                  className="bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[52px] rounded-full text-lg font-bold transition-all active:scale-95 border-none shadow-lg"
                >
                  Quero Analisar Minha Parceira
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 space-y-8 bg-[#111b21]"
            >
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Inicie sua Análise Gratuita</h2>
                <p className="text-[#8696a0]">Insira o número do telefone alvo para monitoramento digital.</p>
              </div>
              <div className="w-full max-w-sm space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xl text-[#00a884] font-bold">
                    (+244)
                  </div>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    placeholder="9XX XXX XXX"
                    className="w-full h-[60px] bg-[#2a3942] border-none rounded-lg pl-24 pr-6 text-xl text-[#e9edef] focus:ring-2 focus:ring-[#00a884] transition-all"
                  />
                </div>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={phone.length < 9}
                  className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[52px] rounded-full text-lg font-bold transition-all disabled:opacity-50"
                >
                  Conectar Dispositivo
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 space-y-12 bg-[#111b21]"
            >
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">Criptografando Acesso...</h2>
                <p className="text-[#8696a0]">Esta operação pode levar até 60 segundos.</p>
              </div>
              <div className="w-full max-w-sm space-y-6">
                <div className="w-full bg-[#2a3942] h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-[#00a884] h-full shadow-[0_0_10px_#00a884]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
                <div className="space-y-3 text-[#8696a0] text-sm font-mono bg-[#202c33] p-4 rounded-lg">
                  {logs.map((log, i) => (
                    <p key={i} className="flex items-center gap-2">
                      <span className="text-[#00a884]">{">"}</span> {log}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {(step === 4 || step === 5) && (
            <motion.div 
              key="whatsapp-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex w-full h-full"
            >
              {/* Sidebar */}
              <div className="hidden md:flex w-[30%] border-r border-[#222d34] flex-col bg-[#111b21]">
                <div className="p-4 bg-[#202c33] flex justify-between items-center h-16">
                  <div className="w-10 h-10 rounded-full bg-[#6a7175]"></div>
                  <div className="flex gap-4 text-[#8696a0]">
                    <Search size={20} />
                    <MoreVertical size={20} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {[1,2,3,4,5,6,7,8,9,10].map(i => (
                    <div key={i} className="flex p-3 gap-3 hover:bg-[#202c33] cursor-pointer border-b border-[#222d34]/50">
                      <div className="w-12 h-12 rounded-full bg-[#6a7175] blur-md shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-[#e9edef]">🔒 Bloqueado</span>
                          <span className="text-xs text-[#8696a0]">15:4{i}</span>
                        </div>
                        <p className="text-xs text-[#8696a0] truncate italic">Conteúdo sensível...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-[#0b141a] relative">
                <div className="absolute inset-0 whatsapp-bg pointer-events-none"></div>
                
                {/* Chat Header */}
                <div className="p-4 bg-[#202c33] flex justify-between items-center h-16 z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#6a7175] blur-sm"></div>
                    <div>
                      <h3 className="font-medium text-[#e9edef]">{phone ? `(+244) ${phone}` : "Espiando..."}</h3>
                      <p className="text-xs text-[#00a884]">online</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[#8696a0]">
                    <Search size={20} />
                    <MoreVertical size={20} />
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 z-10 relative">
                  {step === 4 ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-20">
                      <Card className="p-8 bg-[#202c33] border-none rounded-2xl text-center max-w-sm mx-4">
                         <div className="w-20 h-20 bg-[#00a884]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                           <CheckCheck size={40} className="text-[#00a884]" />
                         </div>
                         <h2 className="text-2xl font-bold mb-4 text-[#e9edef]">Análise Concluída!</h2>
                         <p className="text-[#8696a0] mb-8">
                           Encontramos padrões de atividade suspeitos e mensagens ocultas associadas a este número.
                         </p>
                         <Button 
                           onClick={() => setStep(5)}
                           className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[52px] rounded-full text-lg font-bold"
                         >
                           Visualizar Relatório
                         </Button>
                      </Card>
                    </div>
                  ) : null}

                  {/* Blurred Messages */}
                  <div className="chat-bubble-received blur-md">Olá, estás aí?</div>
                  <div className="chat-bubble-sent blur-md">Sim, acabei de chegar.</div>
                  <div className="chat-bubble-received blur-md bg-red-900/20 border border-red-500/20">
                    <span className="text-red-400 text-[10px] block mb-1 font-bold italic">Mensagem Apagada</span>
                    Tenho saudades tuas...
                  </div>
                  <div className="chat-bubble-received blur-md">Onde estás agora?</div>
                  <div className="chat-bubble-sent blur-md italic text-gray-400">Mensagem com teor romântico bloqueada</div>
                  
                  {step === 5 && (
                    <div className="absolute inset-x-0 bottom-24 flex justify-center z-30">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-[#202c33] p-6 rounded-2xl border border-[#00a884]/30 shadow-2xl max-w-xs text-center"
                      >
                         <Lock size={32} className="text-[#00a884] mx-auto mb-4" />
                         <p className="text-[#e9edef] font-medium mb-6">
                           Para desbloquear o histórico completo de conversas e fotos apagadas, finalize seu acesso.
                         </p>
                         <Button 
                           onClick={() => window.location.href = "https://www.kintu.org/product/2f9ea4b3-2793-424f-8f1f-a98724e0db64"}
                           className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[52px] rounded-full text-lg font-bold"
                         >
                           Liberar Acesso Total
                         </Button>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-[#202c33] flex items-center gap-4 z-10">
                  <div className="flex gap-4 text-[#8696a0]">
                    <Smile size={24} />
                    <Paperclip size={24} />
                  </div>
                  <div className="flex-1 bg-[#2a3942] h-10 rounded-lg flex items-center px-4 text-[#8696a0] text-sm">
                    Escreva uma mensagem
                  </div>
                  <Mic size={24} className="text-[#8696a0]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Lock({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
