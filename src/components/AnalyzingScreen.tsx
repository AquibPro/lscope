"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./ui/Branding";

const ANALYZING_MESSAGES = [
  "Decrypting your social vibe...",
  "Running rizz-level simulation...",
  "Consulting the relationship oracle...",
  "Analyzing eye contact micro-data...",
  "Measuring main character intensity...",
  "Finalizing your 2026 destiny...",
];

export function AnalyzingScreen({ onComplete }: { onComplete: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ANALYZING_MESSAGES.length);
    }, 500);

    const timer = setTimeout(onComplete, 3500); // Slightly longer for more "suspense"

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 bg-[#0a0510]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full" />
      
      {/* Scanning Effect */}
      <motion.div
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-10 shadow-[0_0_20px_var(--accent)]"
      />

      <div className="relative z-20 flex flex-col items-center gap-12">
        <motion.div
           animate={{ 
             scale: [1, 1.15, 1],
             rotate: [0, 5, -5, 0]
           }}
           transition={{ duration: 1.5, repeat: Infinity }}
           className="text-9xl filter drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
        >
          💘
        </motion.div>

        <div className="space-y-6 text-center">
          <Logo />
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl font-bold tracking-tight text-white/90 italic h-8"
            >
              {ANALYZING_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Fancy Progress Bar */}
        <div className="w-64 h-[6px] bg-white/5 rounded-full overflow-hidden relative border border-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
          />
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200,
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{ 
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%` 
          }}
        />
      ))}
    </div>
  );
}
