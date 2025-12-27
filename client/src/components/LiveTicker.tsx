import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = ["Luanda", "Benguela", "Huambo", "Lubango", "Cabinda", "Malanje"];
const actions = ["iniciou análise", "processando dados", "detectou atividade", "acessou relatório", "verificando status"];

function generateFakeActivity() {
  const prefix = ["923", "924", "934", "946", "990"];
  const loc = locations[Math.floor(Math.random() * locations.length)];
  const act = actions[Math.floor(Math.random() * actions.length)];
  const num = `(+244) ${prefix[Math.floor(Math.random() * prefix.length)]} *** *${Math.floor(Math.random() * 90) + 10}`;
  return `${num} de ${loc} ${act}`;
}

export function LiveTicker() {
  const [activity, setActivity] = useState(generateFakeActivity());

  useEffect(() => {
    const interval = setInterval(() => {
      setActivity(generateFakeActivity());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-primary/20 p-2 z-40 backdrop-blur-sm">
      <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-xs text-primary/70 font-mono">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="uppercase font-bold tracking-wider mr-2">Live Feed:</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activity}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="truncate"
          >
            {activity}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
