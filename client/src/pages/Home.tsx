import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreVertical, Paperclip, Smile, Mic, CheckCheck, ShieldAlert, ShieldCheck, Lock } from "lucide-react";

const cities = ["Luanda", "Benguela", "Huambo", "Lubango", "Cabinda", "Lobito", "Viana", "Cacuaco"];

export default function Home() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [targetPhone, setTargetPhone] = useState("");

  useEffect(() => {
    if (step === 3) {
      const startTime = Date.now();
      const duration = 60000;
      const logMessages = [
        "Iniciando varredura criptografada...",
        "Cruzando dados de torres de sinal...",
        "Buscando histórico de conexões...",
        "Localizando arquivos temporários...",
        "Analizando padrões de geolocalização...",
        "Mapeando contatos frequentes...",
        "Sincronizando banco de dados..."
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

  const handleStartScan = () => {
    setTargetPhone(phone);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-[#0b141a] text-[#e9edef] font-sans flex flex-col items-center justify-center p-0 overflow-hidden selection:bg-[#00a884]/30">
      <AnimatePresence mode="wait">
        {step < 4 ? (
          <div key="funnel" className="w-full max-w-md p-6 space-y-12">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-10"
              >
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-[#00a884]/10 rounded-full flex items-center justify-center mx-auto border border-[#00a884]/30">
                    <ShieldCheck size={40} className="text-[#00a884] animate-pulse" />
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight">Aplicativo Espião</h1>
                  <p className="text-[#8696a0] text-lg px-4">
                    Proteja sua paz de espírito. Análise confidencial de sinais e padrões de comportamento.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    onClick={() => setStep(2)}
                    className="bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[60px] rounded-[19px] text-lg font-medium transition-all active:scale-95 shadow-xl border-none"
                  >
                    Analisar Meu Parceiro
                  </Button>
                  <Button 
                    onClick={() => setStep(2)}
                    className="bg-transparent hover:bg-white/5 text-[#00a884] border-2 border-[#00a884] h-[60px] rounded-[19px] text-lg font-medium transition-all active:scale-95"
                  >
                    Analisar Minha Parceira
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-bold">Conexão Gratuita</h2>
                  <p className="text-[#8696a0]">Insira o número de Angola para iniciar a varredura remota.</p>
                </div>
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-xl text-[#00a884] font-bold">
                      (+244)
                    </div>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                      placeholder="9XX XXX XXX"
                      className="w-full h-[65px] bg-[#2a3942] border-2 border-transparent focus:border-[#00a884] rounded-[19px] pl-24 pr-6 text-2xl text-[#e9edef] transition-all outline-none"
                    />
                  </div>
                  <Button 
                    onClick={handleStartScan}
                    disabled={phone.length < 9}
                    className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[60px] rounded-[19px] text-lg font-medium transition-all disabled:opacity-50 shadow-lg border-none"
                  >
                    Iniciar Varredura
                  </Button>
                </div>
                <p className="text-center text-xs text-[#8696a0]">
                  Criptografia de ponta a ponta. Sua identidade está protegida.
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-[#2a3942] border-t-[#00a884] animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-[#00a884] font-bold">
                        {Math.floor(progress)}%
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">Buscando Sinais...</h2>
                </div>
                <div className="space-y-4 font-mono text-sm bg-[#202c33] p-5 rounded-[19px] border border-white/5">
                  {logs.map((log, i) => (
                    <motion.p 
                      key={i} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 text-[#8696a0]"
                    >
                      <span className="text-[#00a884] shrink-0">√</span> {log}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div key="whatsapp-container" className="w-full h-screen md:h-[90vh] md:max-h-[850px] md:max-w-6xl bg-[#111b21] md:rounded-lg shadow-2xl flex overflow-hidden border border-white/5 relative">
            <AnimatePresence>
              {step === 4 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="absolute inset-0 z-50 bg-[#0b141a] flex flex-col items-center justify-center p-8 text-center space-y-10"
                >
                  <div className="space-y-4">
                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
                      <ShieldAlert size={48} className="text-red-500 animate-bounce" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Perfil Localizado!</h2>
                    <p className="text-[#8696a0] text-lg max-w-sm mx-auto">
                      O número <span className="text-white font-mono font-bold">(+244) {targetPhone}</span> foi identificado em nossos servidores.
                    </p>
                  </div>

                  <Card className="p-6 bg-[#202c33] border-none rounded-[19px] w-full max-w-xs shadow-2xl">
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto blur-md"></div>
                      <div className="space-y-1">
                         <p className="text-green-500 text-sm font-bold flex items-center justify-center gap-2">
                           <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online agora
                         </p>
                         <p className="text-white font-bold tracking-widest text-lg">(+244) {targetPhone}</p>
                         <p className="text-[#8696a0] text-xs uppercase tracking-widest">Luanda, Angola</p>
                      </div>
                    </div>
                  </Card>

                  <div className="space-y-4 w-full max-w-xs">
                    <Button 
                      onClick={() => setStep(5)}
                      className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[60px] rounded-full text-lg font-medium transition-all shadow-xl border-none"
                    >
                      Visualizar Relatório
                    </Button>
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
                      Atenção: 12 conversas suspeitas detectadas
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className="hidden md:flex w-[350px] border-r border-[#222d34] flex-col bg-[#111b21]">
              <div className="p-4 bg-[#202c33] flex justify-between items-center h-[60px]">
                <div className="w-10 h-10 rounded-full bg-[#6a7175]"></div>
                <div className="flex gap-6 text-[#8696a0]">
                  <Search size={20} />
                  <MoreVertical size={20} />
                </div>
              </div>
              <div className="p-3">
                <div className="bg-[#202c33] h-9 rounded-lg flex items-center px-4 gap-4 text-[#8696a0]">
                  <Search size={16} />
                  <span className="text-sm">Pesquisar ou começar uma nova conversa</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="flex p-3 gap-3 hover:bg-[#202c33] cursor-pointer border-b border-[#222d34]/50">
                    <div className="w-12 h-12 rounded-full bg-[#6a7175] blur-md shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-[#e9edef] truncate">🔒 Perfil Bloqueado</span>
                        <span className="text-[10px] text-[#8696a0]">14:3{i}</span>
                      </div>
                      <p className="text-xs text-[#8696a0] truncate italic italic">Dados privados ocultos...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0b141a] relative">
              <div className="absolute inset-0 whatsapp-bg pointer-events-none"></div>
              
              {/* Chat Header */}
              <div className="p-4 bg-[#202c33] flex justify-between items-center h-[60px] z-10 border-b border-[#222d34]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#6a7175] blur-sm"></div>
                  <div>
                    <h3 className="font-medium text-[#e9edef] leading-tight">(+244) {targetPhone}</h3>
                    <p className="text-[11px] text-[#00a884]">online</p>
                  </div>
                </div>
                <div className="flex gap-6 text-[#8696a0]">
                  <Search size={20} />
                  <MoreVertical size={20} />
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 z-10 relative scrollbar-hide">
                <div className="mx-auto bg-[#182229] py-1.5 px-3 rounded-lg text-[11px] text-[#8696a0] uppercase mb-4 shadow-sm border border-white/5">
                  Hoje
                </div>

                <div className="chat-bubble-received blur-[6px]">Olá, onde estás?</div>
                <div className="chat-bubble-sent blur-[6px]">Estou em casa, porquê?</div>
                <div className="chat-bubble-received blur-[6px] bg-red-900/10 border border-red-500/10">
                  <span className="text-[9px] text-red-500 font-bold block mb-1">MENSAGEM APAGADA</span>
                  Temos de nos ver hoje...
                </div>
                <div className="chat-bubble-received blur-[8px]">Não contes a ninguém.</div>
                <div className="chat-bubble-sent blur-[8px]">Ok, apaga as mensagens.</div>
                <div className="chat-bubble-received blur-[10px]">Já mandei a localização.</div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b141a]/60 backdrop-blur-[2px] z-20">
                   <motion.div 
                     initial={{ y: 30, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="bg-[#202c33] p-8 rounded-[25px] border border-[#00a884]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xs text-center mx-4"
                   >
                      <div className="w-16 h-16 bg-[#00a884]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#00a884]/30">
                        <Lock size={32} className="text-[#00a884]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">Relatório Protegido</h3>
                      <p className="text-[#8696a0] text-sm leading-relaxed mb-8">
                        Foram encontradas <span className="text-white font-bold">12 mensagens apagadas</span> e <span className="text-white font-bold">4 fotos temporárias</span> trocadas nos últimos 3 dias com este número: <span className="text-white font-bold">(+244) {targetPhone}</span>.
                      </p>
                      <Button 
                        onClick={() => window.location.href = "https://www.kintu.org/product/2f9ea4b3-2793-424f-8f1f-a98724e0db64"}
                        className="w-full bg-[#00a884] hover:bg-[#06cf9c] text-[#111b21] h-[56px] rounded-full text-lg font-medium transition-all shadow-xl active:scale-95 border-none"
                      >
                        Desbloquear Agora
                      </Button>
                      <p className="mt-4 text-[9px] text-gray-500 uppercase tracking-widest font-bold">
                        Acesso garantido por 24 horas
                      </p>
                   </motion.div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-[#202c33] flex items-center gap-4 z-10 border-t border-[#222d34]">
                <div className="flex gap-5 text-[#8696a0]">
                  <Smile size={24} />
                  <Paperclip size={24} />
                </div>
                <div className="flex-1 bg-[#2a3942] h-11 rounded-lg flex items-center px-4 text-[#8696a0] text-sm">
                  Escreva uma mensagem
                </div>
                <Mic size={24} className="text-[#8696a0]" />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
