import React from "react";
import { motion } from "framer-motion";

interface HackerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "outline";
}

export function HackerButton({ children, variant = "primary", className = "", ...props }: HackerButtonProps) {
  const baseStyles = "relative px-8 py-4 font-display font-bold uppercase tracking-widest text-sm sm:text-base transition-all duration-200 overflow-hidden group";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary hover:bg-primary hover:text-black shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]",
    danger: "bg-red-500/10 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]",
    outline: "bg-transparent text-primary/70 border border-primary/30 hover:border-primary hover:text-primary",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current opacity-50 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current opacity-50 group-hover:opacity-100" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50 group-hover:opacity-100" />
      
      {/* Scan line effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
    </motion.button>
  );
}
