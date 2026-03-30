"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Result, Tier } from "@/lib/types";
import { Logo } from "./ui/Branding";
import { Download, Share2, Check, Sparkles, Trophy, AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "./ui/Branding";
import { cn } from "@/lib/utils";

// HEX Colors for maximum compatibility
const CARD_COLORS = {
  dark: "#0a0510",
  card: "#0f0720",
  white: "#ffffff",
  violet: "#8b5cf6",
  pink: "#ec4899",
  teal: "#2dd4bf",
  slate: "#475569",
  gray: "#1f2937",
};

const TIER_CONFIG: Record<Tier, { gradient: string; icon: any; color: string; tag: string }> = {
  "Main Character 😎": { 
    gradient: `linear-gradient(135deg, ${CARD_COLORS.violet} 0%, ${CARD_COLORS.pink} 100%)`, 
    icon: Trophy, 
    color: CARD_COLORS.violet,
    tag: "UNSTOPPABLE RIZZ" 
  },
  "Rising Star 👀": { 
    gradient: `linear-gradient(135deg, #4f46e5 0%, ${CARD_COLORS.teal} 100%)`, 
    icon: Sparkles, 
    color: CARD_COLORS.teal,
    tag: "WATCH OUT" 
  },
  "Potential Player 🤨": { 
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", 
    icon: AlertTriangle, 
    color: "#f59e0b",
    tag: "BENCH WARMER" 
  },
  "NPC Energy 😭": { 
    gradient: "linear-gradient(135deg, #475569 0%, #1e293b 100%)", 
    icon: AlertTriangle, 
    color: "#64748b",
    tag: "BACKGROUND GEN" 
  },
  "Ghost Mode 👻": { 
    gradient: "linear-gradient(135deg, #1f2937 0%, #000000 100%)", 
    icon: AlertTriangle, 
    color: "#4b5563",
    tag: "INVISIBILITY 100" 
  },
};

interface ResultCardProps {
  result: Result;
  userName: string;
}

export function ResultCard({ result, userName }: ResultCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = TIER_CONFIG[result.tier];
  const TierIcon = config.icon;

  const downloadImage = async () => {
    if (!cardRef.current || downloading) return;
    
    try {
      setDownloading(true);
      
      // Fixed aspect ratio capture (4:5 vertical)
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        canvasWidth: 1080,
        canvasHeight: 1350,
        pixelRatio: 1,
        backgroundColor: CARD_COLORS.dark,
        style: {
          transform: 'scale(1)',
          borderRadius: '40px',
          background: CARD_COLORS.card,
          width: '1080px',
          height: '1350px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '100px 60px 120px 60px'
        }
      });

      const link = document.createElement("a");
      link.download = `LoveScope-${userName.replace(/\s+/g, "")}.png`;
      link.href = dataUrl;
      link.click();
      
      setDownloading(false);
    } catch (err) {
      console.error("Save error:", err);
      alert("oracle failed! Screenshot it for now! 📸");
      setDownloading(false);
    }
  };

  const shareResult = async () => {
    const text = `I just got ${result.score}% on LoveScope! My tier is ${result.tier}. Try it yourself! 💘`;
    const url = "https://lovescope.netlify.app/";

    if (typeof navigator !== "undefined" && !!navigator.share) {
      try {
        await navigator.share({ title: "LoveScope 💘", text, url });
      } catch (err) {
        copyLink(url);
      }
    } else {
      copyLink(url);
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[340px] sm:max-w-md mx-auto">
      {/* CAPTURE AREA - V5.0 OVERHAUL */}
      <div 
        ref={cardRef}
        className="relative overflow-hidden flex flex-col items-center justify-between min-h-[580px] py-16 px-10 border-4 border-white pb-20 no-scrollbar"
        style={{ 
          backgroundColor: CARD_COLORS.card, 
          color: CARD_COLORS.white,
          borderRadius: '40px',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(${config.color} 1.5px, transparent 1.5px)`, 
               backgroundSize: '24px 24px' 
             }} />
        
        {/* Dynamic Glows */}
        <div className="absolute top-1/4 -right-1/4 w-[80%] h-[40%] rounded-full opacity-[0.15] blur-[120px]" 
             style={{ background: config.color }} />
        <div className="absolute bottom-1/4 -left-1/4 w-[60%] h-[30%] rounded-full opacity-[0.1] blur-[100px]" 
             style={{ background: CARD_COLORS.violet }} />
        
        <div className="z-10 w-full flex flex-col items-center gap-4">
          <div className="px-6 py-2 rounded-full border border-white/10"
               style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-60">Verified Official Result</span>
          </div>
          <div className="mt-4">
            <Logo size="md" />
          </div>
        </div>

        {/* MIDDLE: THE SCORE (CLEANER, NO OVERLAP) */}
        <div className="z-10 flex flex-col items-center justify-center -mt-4">
          <div className="relative flex items-start">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[11rem] font-black tracking-[-0.05em] leading-[0.8] pr-1"
              style={{ 
                color: CARD_COLORS.white,
                textShadow: `0 20px 40px rgba(0,0,0,0.4)`
              }}
            >
              {result.score}
            </motion.div>
            <div className="text-4xl font-black opacity-30 mt-4 leading-none">%</div>
          </div>

          <div className="mt-8 flex flex-col items-center">
             <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-4" />
             <div className="bg-white/5 px-8 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
               <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                 @{userName.toLowerCase() || "guest"}
               </h3>
             </div>
          </div>
        </div>

        {/* BOTTOM: TIER & DESC (PREMIUM BOX) */}
        <div className="z-10 w-full flex flex-col items-center gap-6 mt-4">
          <div className="flex flex-col items-center gap-5 w-full">
            <div 
              className="px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.25em] shadow-2xl flex items-center gap-4 border-2 border-white/20 scale-105"
              style={{ background: config.gradient, boxShadow: `0 15px 40px -10px ${config.color}66` }}
            >
              <TierIcon size={22} className="text-white" />
              {result.tier}
            </div>
            
            <div className="backdrop-blur-[20px] border border-white/10 rounded-[2rem] p-8 w-full text-center shadow-inner"
                 style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
              <p className="text-[15px] font-bold leading-relaxed opacity-95 tracking-tight italic">
                "{result.tierDescription}"
              </p>
            </div>
          </div>

          <div className="text-[10px] font-black uppercase tracking-[0.6em] opacity-20 mt-4 italic">
            Certified Player Energy
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="secondary" 
          onClick={downloadImage}
          disabled={downloading}
          className="h-16 rounded-[2rem] !bg-white/5 border border-white/10 hover:!bg-white/10 transition-transform active:scale-95"
        >
          {downloading ? (
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
               <RefreshCcw size={20} />
             </motion.div>
          ) : (
            <>
              <Download size={20} />
              Save Image
            </>
          )}
        </Button>
        <Button 
          onClick={shareResult}
          className="h-16 rounded-[2rem] transition-transform active:scale-95"
        >
          {copied ? (
            <>
              <Check size={20} />
              Copied!
            </>
          ) : (
            <>
              <Share2 size={20} />
              {typeof navigator !== "undefined" && !!navigator.share ? "Share" : "Link"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
