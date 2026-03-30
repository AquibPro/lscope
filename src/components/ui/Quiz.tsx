"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./Branding";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-8">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
      />
    </div>
  );
}

interface QuestionCardProps {
  question: Question;
  onSelect: (index: number) => void;
  direction: number;
}

export function QuestionCard({ question, onSelect, direction }: QuestionCardProps) {
  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotate: direction > 0 ? 5 : -5,
    }),
    active: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      rotate: direction > 0 ? -5 : 5,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="active"
      exit="exit"
      className="w-full flex flex-col gap-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          {question.text}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="secondary"
            size="lg"
            className="group relative h-20 md:h-24 justify-start px-6 gap-4 border-white/5 hover:border-primary/50"
            onClick={() => onSelect(index)}
          >
            <span className="text-3xl group-hover:scale-125 transition-transform duration-200">
              {option.emoji}
            </span>
            <span className="text-left font-medium text-white/90">
              {option.text}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
