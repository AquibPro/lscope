import { QUESTIONS } from './questions';
import { Result, Tier, Trait, TraitScore } from './types';

const WEIGHTS: Record<Trait, number> = {
  confidence: 0.25,
  exposure: 0.20,
  initiative: 0.20,
  communication: 0.20,
  effort: 0.15,
};

const TRAIT_LABELS: Record<Trait, string> = {
  confidence: 'Confidence',
  exposure: 'Social Exposure',
  initiative: 'Initiative',
  communication: 'Communication',
  effort: 'Effort & Consistency',
};

const TRAIT_COLORS: Record<Trait, string> = {
  confidence: 'from-violet-400 to-purple-600',
  exposure: 'from-pink-400 to-rose-600',
  initiative: 'from-amber-400 to-orange-600',
  communication: 'from-cyan-400 to-teal-600',
  effort: 'from-indigo-400 to-blue-600',
};

// Calculate max possible scores for normalization
const MAX_SCORES: Record<Trait, number> = QUESTIONS.reduce(
  (acc, q) => {
    q.options.forEach((opt) => {
      Object.entries(opt.scores).forEach(([trait, score]) => {
        const t = trait as Trait;
        // This is a bit tricky since you only pick one option. 
        // We need the max score ANY option gives for that trait in this question.
      });
    });
    return acc;
  },
  { confidence: 0, exposure: 0, initiative: 0, communication: 0, effort: 0 }
);

// Correctly calculate max potential for each trait
QUESTIONS.forEach((q) => {
  const qMax: Partial<Record<Trait, number>> = {};
  q.options.forEach((opt) => {
    Object.entries(opt.scores).forEach(([trait, score]) => {
      const t = trait as Trait;
      qMax[t] = Math.max(qMax[t] || 0, score || 0);
    });
  });
  Object.entries(qMax).forEach(([trait, score]) => {
    MAX_SCORES[trait as Trait] += score;
  });
});

export function calculateResult(answers: number[], isSavage: boolean): Result {
  const traitScores: Record<Trait, number> = {
    confidence: 0,
    exposure: 0,
    initiative: 0,
    communication: 0,
    effort: 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const question = QUESTIONS[questionIndex];
    if (!question) return;
    const selectedOption = question.options[optionIndex];
    if (!selectedOption) return;

    Object.entries(selectedOption.scores).forEach(([trait, score]) => {
      traitScores[trait as Trait] += score || 0;
    });
  });

  // Normalize to 0-100
  const normalizedTraits: TraitScore[] = (Object.keys(traitScores) as Trait[]).map((trait) => ({
    trait,
    label: TRAIT_LABELS[trait],
    score: Math.round((traitScores[trait] / (MAX_SCORES[trait] || 1)) * 100),
    color: TRAIT_COLORS[trait],
  }));

  // Calculate weighted total
  let totalScore = 0;
  normalizedTraits.forEach((t) => {
    totalScore += t.score * WEIGHTS[t.trait];
  });
  totalScore = Math.round(totalScore);

  const tier = getTier(totalScore);
  const tierDescription = getTierDescription(tier);
  const insights = generateInsights(normalizedTraits);
  const summary = getSummary(tier, isSavage);
  const tips = generateTips(normalizedTraits);

  return {
    score: totalScore,
    tier,
    summary,
    tierDescription,
    traitScores: normalizedTraits,
    insights,
    tips,
  };
}

function getTierDescription(tier: Tier): string {
  const descriptions: Record<Tier, string> = {
    'Ghost Mode 👻': "You're so low-profile even common sense can't find you. You're basically a myth at this point.",
    'NPC Energy 😭': "You're just a background character in someone else's highlight reel. Time to find a side quest!",
    'Potential Player 🤨': "You have the stats, but you're still sitting on the bench. One big play could change everything.",
    'Rising Star 👀': "Everyone is starting to notice the vibe. The spotlight is hitting, don't fumble the bag!",
    'Main Character 😎': "Absolute unit. The plot literally revolves around you. Save some rizz for the rest of us.",
  };
  return descriptions[tier];
}

function getTier(score: number): Tier {
  if (score >= 85) return 'Main Character 😎';
  if (score >= 65) return 'Rising Star 👀';
  if (score >= 45) return 'Potential Player 🤨';
  if (score >= 25) return 'NPC Energy 😭';
  return 'Ghost Mode 👻';
}

function getSummary(tier: Tier, isSavage: boolean): string {
  const summaries: Record<Tier, { normal: string; savage: string }> = {
    'Ghost Mode 👻': {
      normal: "You're currently in stealth mode. Maybe it's time to step out into the light?",
      savage: "Bro is literally a cryptid. Even the algorithm struggled to find you. 💀",
    },
    'NPC Energy 😭': {
      normal: "You're playing it safe in the background. Life is happening and you're just... there.",
      savage: "You're the background character in someone else's story. Go find a side quest! 😭",
    },
    'Potential Player 🤨': {
      normal: "You've got what it takes, but your consistency is holding you back from greatness.",
      savage: "You're like a demo version of a main character. Buy the full game and start trying! 🤨",
    },
    'Rising Star 👀': {
      normal: "People are starting to notice you. Keep this momentum and you'll be unstoppable.",
      savage: "You're actually doing it... surprisingly. Don't let it go to your head. 👀",
    },
    'Main Character 😎': {
      normal: "The world is your stage! You have the presence and drive to get whatever you want.",
      savage: "Absolute unit. The main character energy is blinding. Save some rizz for the rest of us. 😎",
    },
  };

  return isSavage ? summaries[tier].savage : summaries[tier].normal;
}

function generateInsights(traits: TraitScore[]): string[] {
  const insights: string[] = [];
  const getScore = (id: Trait) => traits.find((t) => t.trait === id)?.score || 0;

  const confidence = getScore('confidence');
  const exposure = getScore('exposure');
  const initiative = getScore('initiative');
  const communication = getScore('communication');
  const effort = getScore('effort');

  if (confidence < 40 && exposure > 60) {
    insights.push("You meet plenty of people but your lack of confidence stops you from making a move.");
  } else if (confidence > 60 && exposure < 40) {
    insights.push("You're a star waiting for a stage. You have the potential but simply aren't meeting enough people.");
  }

  if (initiative < 40) {
    insights.push("You're waiting for life to happen to you. Fate needs a little push from your side!");
  }

  if (communication < 40 && initiative > 50) {
    insights.push("You're bold enough to start things, but you struggle to keep the vibe going.");
  }

  if (effort < 40) {
    insights.push("Inconsistency is your biggest enemy. You start strong but fade away too soon.");
  }

  if (insights.length === 0) {
    insights.push("You're a balanced player! Just keep doing what you're doing.");
  }

  return insights.slice(0, 3);
}

function generateTips(traits: TraitScore[]): string[] {
  const tips: string[] = [];
  const getScore = (id: Trait) => traits.find((t) => t.trait === id)?.score || 0;

  const confidence = getScore('confidence');
  const exposure = getScore('exposure');
  const initiative = getScore('initiative');
  const communication = getScore('communication');
  const effort = getScore('effort');

  if (confidence < 50) tips.push("Try daily affirmations or small social 'dares' to boost your self-belief.");
  if (exposure < 50) tips.push("Join a club, hobby group, or just say 'yes' to one more social outing a week.");
  if (initiative < 50) tips.push("Challenge yourself to be the first to text or say hello once a day.");
  if (communication < 50) tips.push("Ask open-ended questions to keep the conversation flowing naturally.");
  if (effort < 50) tips.push("Focus on being consistent. A simple 'good morning' or 'how was your day' goes a long way.");

  if (tips.length === 0) {
    tips.push("Stay consistent and keep being your authentic self!");
  }

  return tips.slice(0, 3);
}
