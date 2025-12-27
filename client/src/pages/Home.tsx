import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const cities = ["Luanda", "Benguela", "Huambo", "Lubango", "Cabinda", "Lobito", "Viana", "Cacuaco"];
const notifications = [
  { prefix: "946", suffix: "93X X86", city: "Luanda", action: "análise concluída" },
  { prefix: "923", suffix: "03X X05", city: "Luanda", action: "sinais detectados" },
  { prefix: "911", suffix: "14X X12", city: "Benguela", action: "relatório gerado" },
  { prefix: "932", suffix: "44X X91", city: "Huambo", action: "análise em andamento" }
];

const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)];

export default function Home() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [notificationIndex, setNotificationIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotificationIndex((prev) => (prev + 1) % notifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  const activeNotification = notifications[notificationIndex];

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans p-4 flex flex-col items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-md space-y-8 pb-20">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-6"
            >
              <h1 className="text-3xl font-bold tracking-tight">Proteja Seu Relacionamento</h1>
              <p className="text-[#444444] text-lg">
                Descubra sinais digitais que podem indicar riscos no seu relacionamento.
                <br />
                <span className="text-sm font-normal text-[#666666]">Análise privada, rápida e confidencial.</span>
              </p>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <Button 
                  onClick={() => setStep(2)}
                  className="bg-[#16A34A] hover:bg-[#15803d] text-white h-[56px] rounded-[19px] text-lg font-normal transition-all active:scale-95 shadow-none"
                >
                  Quero Analisar Meu Parceiro
                </Button>
                <Button 
                  onClick={() => setStep(2)}
                  className="bg-[#16A34A] hover:bg-[#15803d] text-white h-[56px] rounded-[19px] text-lg font-normal transition-all active:scale-95 shadow-none"
                >
                  Quero Analisar Minha Parceira
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Parabéns, você ganhou 1 acesso gratuito!</h2>
                <p className="text-[#444444]">Insira o número abaixo para iniciar a análise digital.</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-xl text-[#111111]">
                    (+244)
                  </div>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                    placeholder="9XX XXX XXX"
                    className="w-full h-[56px] border border-[#dddddd] rounded-[19px] pl-[72px] pr-6 text-xl focus:outline-none focus:border-[#16A34A] transition-all"
                  />
                </div>

                <Button 
                  onClick={() => setStep(3)}
                  disabled={phone.length < 9}
                  className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white h-[56px] rounded-[19px] text-lg font-normal transition-all active:scale-95 disabled:opacity-50"
                >
                  Iniciar análise agora
                </Button>
              </div>

              <p className="text-center text-xs text-[#888888]">
                Nunca armazenamos números. Análise 100% privada.
              </p>

              <div className="pt-8 text-center h-12">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={notificationIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-[#888888]"
                  >
                    (+244) {activeNotification.prefix} {activeNotification.suffix} – {activeNotification.city} – {activeNotification.action}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Processando Análise Digital</h2>
                <p className="text-[#444444] text-sm">Aguarde enquanto cruzamos dados públicos e padrões comportamentais.</p>
              </div>
              
              <div className="w-full bg-[#f0f0f0] h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-[#16A34A] h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <div className="space-y-3 text-[#444444] text-left px-4 font-normal text-sm">
                {logs.map((log, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    • {log}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <Card className="p-8 rounded-[19px] border-none shadow-sm bg-[#fafafa]">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full blur-[3px]"></div>
                  <div className="text-center space-y-1">
                    <p className="font-bold text-xl">(+244) {phone.slice(0,3)} {phone.slice(3,6)} {phone.slice(6)}</p>
                    <p className="text-green-600 font-medium flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Ativo recentemente
                    </p>
                    <p className="text-[#666666]">Cidade de última atividade: {getRandomCity()}</p>
                    <p className="text-[#666666]">Estado da análise: Concluída</p>
                  </div>
                </div>
              </Card>

              <Button 
                onClick={() => setStep(5)}
                className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white h-[56px] rounded-[19px] text-lg font-normal transition-all active:scale-95"
              >
                Acessar Relatório Completo
              </Button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="border-b flex justify-around text-xs font-bold uppercase text-[#666666]">
                <span className="text-[#16A34A] border-b-2 border-[#16A34A] pb-3">Conversas</span>
                <span className="pb-3">Ligações</span>
                <span className="pb-3">Contatos</span>
                <span className="pb-3">Grupos</span>
                <span className="pb-3">Pessoal</span>
              </div>

              <div className="space-y-4">
                {[
                  "Conteúdo com teor emocional detectado",
                  "Padrões fora do habitual",
                  "Atividade recorrente em horários sensíveis",
                  "Informações privadas protegidas",
                  "Conteúdo sensível bloqueado"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-[#fafafa] rounded-[19px]">
                    <div className="w-12 h-12 bg-gray-200 rounded-full blur-[6px]"></div>
                    <div className="flex-1 space-y-1">
                      <p className="font-bold text-[#bbbbbb] flex items-center gap-2">
                        Bloqueado 🔒
                      </p>
                      <p className="text-xs text-[#cccccc] italic">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t">
                <Button 
                  onClick={() => window.location.href = "https://www.kintu.org/product/2f9ea4b3-2793-424f-8f1f-a98724e0db64"}
                  className="w-full bg-[#16A34A] hover:bg-[#15803d] text-white h-[56px] rounded-[19px] text-lg font-normal transition-all active:scale-95"
                >
                  Liberar Relatório Completo
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
