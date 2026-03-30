"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useQuiz } from "@/hooks/useQuiz";
import { QUESTIONS } from "@/lib/questions";
import { calculateResult } from "@/lib/scoring";
import { Logo, Button } from "@/components/ui/Branding";
import { ProgressBar, QuestionCard } from "@/components/ui/Quiz";
import { AnalyzingScreen } from "@/components/AnalyzingScreen";
import { ResultView } from "@/components/ResultView";
import { SavageToggle } from "@/components/SavageToggle";
import { Background } from "@/components/ui/Background";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export default function LoveScope() {
  const {
    view,
    setView,
    userName,
    setUserName,
    currentQuestionIndex,
    answers,
    isSavage,
    direction,
    startQuiz,
    enterName,
    selectOption,
    restart,
    toggleSavage,
  } = useQuiz();

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  
  const result = useMemo(() => {
    if (view === "RESULTS" || view === "ANALYZING") {
      return calculateResult(answers, isSavage);
    }
    return null;
  }, [view, answers, isSavage]);

  return (
    <main className="min-h-screen text-white relative flex flex-col items-center p-6 sm:p-12 overflow-x-hidden selection:bg-primary/30">
      <Background />
      
      <div className="w-full max-w-md flex flex-col min-h-[90vh] relative z-10">
        
        {/* Header Section */}
        {view !== "ANALYZING" && (
          <header className="flex flex-col items-center gap-6 mb-12">
            {view === "LANDING" ? (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-12"
              >
                <Logo size="lg" />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex justify-between items-center bg-white/5 backdrop-blur-xl p-4 rounded-[2rem] border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                     <Heart size={20} fill="white" className="text-white" />
                  </div>
                  <span className="font-black italic tracking-tighter text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    LoveScope
                  </span>
                </div>
                <div className="text-[10px] font-black bg-white/10 px-4 py-2 rounded-full text-white/60 flex items-center gap-2 border border-white/5">
                  <Sparkles size={12} className="text-accent animate-pulse" />
                  PREMIUM 2.0
                </div>
              </motion.div>
            )}
          </header>
        )}

        <AnimatePresence mode="wait" custom={direction}>
          {view === "LANDING" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-10"
            >
              <div className="space-y-6 relative">
                 <motion.div
                   animate={{ rotate: [0, 10, -10, 0] }}
                   transition={{ duration: 5, repeat: Infinity }}
                   className="absolute -top-12 -right-8 text-4xl opacity-50 select-none"
                 >
                   ✨
                 </motion.div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] lowercase pr-4">
                  Will you get a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-rose-400 to-primary italic font-black">partner</span>? 🫦
                </h2>
                <p className="text-lg text-white/50 font-semibold max-w-[300px] mx-auto leading-relaxed">
                  The #1 relationship predictor for 2026. Fast, accurate, and dangerously honest.
                </p>
              </div>

              <div className="w-full space-y-8">
                <Button size="xl" onClick={startQuiz} className="h-20 text-2xl group relative overflow-hidden">
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                   <span className="relative z-10 flex items-center gap-3">
                     Start Test <Heart size={24} fill="currentColor" />
                   </span>
                </Button>
                <SavageToggle enabled={isSavage} onToggle={toggleSavage} />
              </div>
            </motion.div>
          )}

          {view === "NAME_INPUT" && (
            <motion.div
              key="name-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col justify-center gap-10"
            >
              <div className="space-y-4 pr-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Who are we <br/><span className="text-primary italic">predicting</span> for?</h2>
                <p className="text-white/40 font-medium text-lg leading-relaxed">Enter your handle or name to personalize your scorecard.</p>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  placeholder="name or handle..."
                  autoFocus
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && userName.trim() && enterName(userName)}
                  className="w-full h-24 bg-white/5 backdrop-blur-3xl border-2 border-white/10 rounded-[2rem] px-10 text-3xl font-black focus:border-primary outline-none transition-all placeholder:text-white/10 shadow-2xl focus:shadow-primary/10 italic"
                />
                <AnimatePresence>
                  {userName.trim() && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: 20 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <Button
                        variant="primary"
                        onClick={() => enterName(userName)}
                        className="h-16 w-16 rounded-[1.2rem] p-0 shadow-2xl"
                      >
                        <ArrowRight size={32} />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {view === "QUIZ" && currentQuestion && (
            <motion.div
              key="quiz"
              className="flex-1 flex flex-col gap-10"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-end px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Scanning Phase</span>
                    <span className="text-xl font-black text-white italic">Step {currentQuestionIndex + 1}</span>
                  </div>
                  <span className="text-xs font-black bg-white/10 px-4 py-2 rounded-full border border-white/5">
                    {Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}% Complete
                  </span>
                </div>
                <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
              </div>

              <QuestionCard
                question={currentQuestion}
                onSelect={selectOption}
                direction={direction}
              />
            </motion.div>
          )}

          {view === "ANALYZING" && (
            <AnalyzingScreen key="analyzing" onComplete={() => setView("RESULTS")} />
          )}

          {view === "RESULTS" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1"
            >
              <ResultView result={result} userName={userName} onRestart={restart} />
            </motion.div>
          )}
        </AnimatePresence>

        {view !== "ANALYZING" && view !== "RESULTS" && (
          <footer className="mt-auto py-12 text-center">
             <div className="flex items-center justify-center gap-3 mb-4 opacity-20">
               <div className="h-[1px] w-8 bg-white" />
               <Heart size={12} fill="white" />
               <div className="h-[1px] w-8 bg-white" />
             </div>
            <p className="text-[10px] text-white/15 uppercase tracking-[0.4em] font-black">
              © 2026 LoveScope Lab • Research Purposes Only
            </p>
          </footer>
        )}
      </div>
    </main>
  );
}
