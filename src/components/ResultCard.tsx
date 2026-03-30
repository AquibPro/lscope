"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Result, Tier } from "@/lib/types";
import { Logo } from "./ui/Branding";
import { Download, Share2, Check, Sparkles, Trophy, AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "./ui/Branding";
import { cn } from "@/lib/utils";

// HEX Colors for maximum compatibility
const CARD_COLORS = {
  dark: "#0a0510",
  card: "#120826",
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
      
      // Wait for everything to settle
      await new Promise(r => setTimeout(r, 100));

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3, // High-DPI export
        backgroundColor: CARD_COLORS.dark,
        style: {
          // Force stable styles during capture
          transform: 'scale(1)',
          borderRadius: '48px',
          background: CARD_COLORS.card,
        }
      });

      const link = document.createElement("a");
      link.download = `LoveScope-${userName.replace(/\s+/g, "")}.png`;
      link.href = dataUrl;
      link.click();
      
      setDownloading(false);
    } catch (err) {
      console.error("Save error:", err);
      // Fallback alert
      alert("Uh oh! The oracle failed to save. Please take a screenshot! 📸");
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
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      {/* CAPTURE AREA - USING PURE INLINE HEX STYLES TO AVOID OKLAB FAULTS */}
      <div 
        ref={cardRef}
        className="relative overflow-hidden flex flex-col items-center justify-between aspect-[3.5/5] p-10 border-4 border-white pb-12 italic"
        style={{ 
          backgroundColor: CARD_COLORS.card, 
          color: CARD_COLORS.white,
          borderRadius: '48px',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: `radial-gradient(${config.color} 1px, transparent 1px)`, 
               backgroundSize: '20px 20px' 
             }} />
        
        {/* Top Header */}
        <div className="z-10 w-full flex flex-col items-center gap-1">
           <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-white"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Sparkles size={12} style={{ color: config.color }} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">Vibe Quotient Verified</span>
           </div>
           <h2 className="text-3xl font-black tracking-tighter" style={{ color: CARD_COLORS.white }}>
             LoveScope
           </h2>
        </div>

        {/* Score Display */}
        <div className="z-10 flex flex-col items-center gap-4 py-4">
          <div className="relative">
            <div className="text-[8rem] font-black tracking-tighter leading-none opacity-20"
                 style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>
              {result.score}
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-8xl font-black tracking-tighter"
                 style={{ color: CARD_COLORS.white, textShadow: `0 10px 30px rgba(0,0,0,0.5)` }}>
              {result.score}%
            </div>
          </div>

          <div className="text-center mt-2 px-4">
            <h3 className="text-3xl font-black uppercase text-white tracking-tight truncate max-w-[280px]">
              {userName}
            </h3>
            <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold mt-1">Player Rank</p>
          </div>
        </div>

        {/* Humorous Results Section */}
        <div className="z-10 w-full flex flex-col items-center gap-4 px-2">
          <div 
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl w-full justify-center"
            style={{ backgroundImage: config.gradient, color: CARD_COLORS.white }}
          >
            <TierIcon size={18} />
            {result.tier}
          </div>
          
          <div className="rounded-2xl p-4 w-full border border-white"
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
            <p className="text-center text-[12px] font-bold leading-relaxed opacity-90">
              "{result.tierDescription}"
            </p>
          </div>
        </div>

        {/* Small Tagline */}
        <div className="z-10 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.6em] opacity-30 mt-4">
          {config.tag}
        </div>

        {/* Glow effect for card */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 opacity-20 rounded-full" 
             style={{ backgroundColor: config.color, filter: 'blur(60px)' }} />
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="secondary" 
          onClick={downloadImage}
          disabled={downloading}
          className="h-16 rounded-[1.8rem] !bg-white/5 hover:!bg-white/10"
        >
          {downloading ? (
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
               <RefreshCcw size={20} />
             </motion.div>
          ) : (
            <>
              <Download size={20} />
              Save
            </>
          )}
        </Button>
        <Button 
          onClick={shareResult}
          className="h-16 rounded-[1.8rem]"
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
