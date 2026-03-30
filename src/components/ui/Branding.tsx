"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-primary via-secondary to-rose-500 text-white shadow-xl shadow-primary/20",
    secondary: "bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 border border-white/10",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "text-white/40 hover:text-white transition-colors",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-[1.5rem] font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95",
        variants[variant],
        size === "sm" ? "px-4 py-2 text-sm" : 
        size === "lg" ? "px-8 py-5 text-lg" : 
        size === "xl" ? "w-full py-6 text-xl tracking-tight" : "px-6 py-4",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { emoji: "text-2xl", text: "text-xl" },
    md: { emoji: "text-4xl", text: "text-3xl" },
    lg: { emoji: "text-6xl", text: "text-5xl" },
  };

  return (
    <div className="flex flex-col items-center gap-2 px-6">
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          y: [0, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={sizes[size].emoji}
      >
        💘
      </motion.div>
      <h1 className={cn(
        "font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient pb-2",
        sizes[size].text
      )}>
        LoveScope
      </h1>
    </div>
  );
}
