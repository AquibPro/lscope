"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SavageToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function SavageToggle({ enabled, onToggle }: SavageToggleProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 p-2 rounded-full bg-white/5 border border-white/5">
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest px-4 transition-colors",
          enabled ? "text-white/30" : "text-white"
        )}>
          Safe
        </span>
        <button
          onClick={onToggle}
          className={cn(
            "relative w-16 h-8 rounded-full p-1 transition-all duration-500 overflow-hidden shadow-inner",
            enabled ? "bg-gradient-to-r from-primary to-secondary" : "bg-white/10"
          )}
        >
          <motion.div
            animate={{ x: enabled ? 32 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "w-6 h-6 rounded-full shadow-2xl flex items-center justify-center relative z-10",
              enabled ? "bg-white" : "bg-white/30"
            )}
          >
            {enabled && <span className="text-[10px]">😈</span>}
          </motion.div>
          {enabled && (
             <motion.div 
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="absolute inset-0 bg-white/20 blur-md"
             />
          )}
        </button>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest px-4 transition-colors",
          enabled ? "text-primary italic" : "text-white/30"
        )}>
          Savage
        </span>
      </div>
      <p className="text-[10px] text-white/40 italic font-medium">
        {enabled ? "Warning: Feelings might get hurt 💀" : "Safe for delicate hearts 💖"}
      </p>
    </div>
  );
}
