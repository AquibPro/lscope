"use client";

import { motion } from "framer-motion";
import { Result } from "@/lib/types";
import { ResultCard } from "@/components/ResultCard";
import { Button } from "@/components/ui/Branding";
import { RefreshCcw, Users, TrendingUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultViewProps {
  result: Result;
  userName: string;
  onRestart: () => void;
}

export function ResultView({ result, userName, onRestart }: ResultViewProps) {
  return (
    <div className="w-full flex flex-col gap-12 pb-20">
      <div className="flex flex-col items-center">
        <ResultCard result={result} userName={userName} />
      </div>

      <div className="space-y-8">
        {/* Traits Breakdown */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp size={24} className="text-primary" />
            Trait Breakdown
          </h3>
          <div className="space-y-4">
            {result.traitScores.map((trait) => (
              <div key={trait.trait} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-white/70">{trait.label}</span>
                  <span className="text-sm font-black text-white">{trait.score}%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full bg-gradient-to-r", trait.color)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb size={24} className="text-amber-400" />
            Smart Insights
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {result.insights.map((insight, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-morphism border-white/5 text-sm font-medium text-white/80 leading-relaxed italic">
                "{insight}"
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp size={24} className="text-accent" />
            Improvement Tips
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {result.tips.map((tip, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-white/70">
                • {tip}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Button variant="outline" size="lg" className="h-16" onClick={onRestart}>
          <RefreshCcw size={20} />
          Try Again
        </Button>
        <Button variant="ghost" size="lg" className="h-16" onClick={onRestart}>
          <Users size={20} />
          Test Your Friend
        </Button>
      </div>

      <div className="pt-8 text-center border-t border-white/5">
        <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
          This is for entertainment purposes only 😄
        </p>
      </div>
    </div>
  );
}
