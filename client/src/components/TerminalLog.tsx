import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const logs = [
  "Iniciando protocolo de segurança...",
  "Conectando aos servidores criptografados...",
  "Buscando nó de rede mais próximo...",
  "Servidor localizado: Luanda, ANG (LAD-04)...",
  "Estabelecendo túnel VPN seguro...",
  "Verificando integridade do número...",
  "Acessando base de dados pública...",
  "Triangulando posição aproximada...",
  "Detectando status do dispositivo...",
  "Sincronizando metadados de mensagens...",
  "Download de registros de chamadas...",
  "Análise de padrões de comportamento...",
  "Finalizando compilação do relatório..."
];

interface TerminalLogProps {
  onComplete: () => void;
}

export function TerminalLog({ onComplete }: TerminalLogProps) {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    
    // Progress bar timer
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 0.5; // Fill over ~15-20s depending on interval
      });
    }, 80);

    // Logs timer
    const logInterval = setInterval(() => {
      if (currentIndex < logs.length) {
        setLines(prev => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(onComplete, 1000);
      }
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-black/80 border border-primary/30 p-4 rounded font-mono text-xs sm:text-sm h-64 overflow-y-auto custom-scrollbar shadow-[0_0_20px_rgba(0,0,0,0.5)]" ref={scrollRef}>
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2 text-primary/80"
            >
              <span className="text-primary mr-2">root@system:~$</span>
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-primary inline-block align-middle"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs uppercase tracking-widest text-primary/60">
          <span>Progresso da Análise</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-black border border-primary/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
