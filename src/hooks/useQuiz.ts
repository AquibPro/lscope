"use client";

import { useState } from "react";
import { QUESTIONS } from "@/lib/questions";

export type View = "LANDING" | "NAME_INPUT" | "QUIZ" | "ANALYZING" | "RESULTS";

export function useQuiz() {
  const [view, setView] = useState<View>("LANDING");
  const [userName, setUserName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSavage, setIsSavage] = useState(false);
  const [direction, setDirection] = useState(1);

  const startQuiz = () => setView("NAME_INPUT");

  const enterName = (name: string) => {
    setUserName(name);
    setView("QUIZ");
  };

  const selectOption = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setView("ANALYZING");
    }
  };

  const restart = () => {
    setView("LANDING");
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setDirection(1);
  };

  const toggleSavage = () => setIsSavage((prev) => !prev);

  return {
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
  };
}
