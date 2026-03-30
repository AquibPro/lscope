import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How confident are you when talking to someone you like?",
    options: [
      { text: "Very confident", emoji: "😎", scores: { confidence: 20, initiative: 15 } },
      { text: "Decent", emoji: "🙂", scores: { confidence: 12, initiative: 8 } },
      { text: "Nervous", emoji: "😬", scores: { confidence: 5, initiative: 3 } },
      { text: "I avoid it", emoji: "💀", scores: { confidence: 0, initiative: 0 } },
    ],
  },
  {
    id: 2,
    text: "Who usually starts conversations?",
    options: [
      { text: "Me 😏", emoji: "😏", scores: { initiative: 20, confidence: 15 } },
      { text: "Sometimes me", emoji: "🙂", scores: { initiative: 12, confidence: 10 } },
      { text: "Mostly them", emoji: "😶", scores: { initiative: 5, confidence: 5 } },
      { text: "No one 😭", emoji: "😭", scores: { initiative: 0, confidence: 0 } },
    ],
  },
  {
    id: 3,
    text: "How often do you meet new people?",
    options: [
      { text: "Very often", emoji: "🔥", scores: { exposure: 20, initiative: 10 } },
      { text: "Sometimes", emoji: "🙂", scores: { exposure: 12, initiative: 5 } },
      { text: "Rarely", emoji: "😌", scores: { exposure: 5, initiative: 2 } },
      { text: "Never", emoji: "💀", scores: { exposure: 0, initiative: 0 } },
    ],
  },
  {
    id: 4,
    text: "Who texts first?",
    options: [
      { text: "Me", emoji: "📱", scores: { initiative: 20, effort: 15 } },
      { text: "50/50", emoji: "🤝", scores: { initiative: 15, effort: 12 } },
      { text: "Them", emoji: "📥", scores: { initiative: 5, effort: 5 } },
      { text: "No one", emoji: "📵", scores: { initiative: 0, effort: 0 } },
    ],
  },
  {
    id: 5,
    text: "How would you describe your social life?",
    options: [
      { text: "Very active 🔥", emoji: "🔥", scores: { exposure: 20, confidence: 10 } },
      { text: "Normal 🙂", emoji: "🙂", scores: { exposure: 12, confidence: 8 } },
      { text: "Small circle 😌", emoji: "😌", scores: { exposure: 8, confidence: 5 } },
      { text: "Almost none 💀", emoji: "💀", scores: { exposure: 2, confidence: 2 } },
    ],
  },
  {
    id: 6,
    text: "Do you actually try or just hope things happen?",
    options: [
      { text: "I try 😤", emoji: "😤", scores: { effort: 20, initiative: 15 } },
      { text: "Sometimes", emoji: "🤔", scores: { effort: 12, initiative: 8 } },
      { text: "Not really", emoji: "😒", scores: { effort: 5, initiative: 3 } },
      { text: "I just exist 🗿", emoji: "🗿", scores: { effort: 0, initiative: 0 } },
    ],
  },
  {
    id: 7,
    text: "Would you confess if you liked someone?",
    options: [
      { text: "Yes 💯", emoji: "💯", scores: { initiative: 20, confidence: 20 } },
      { text: "Maybe", emoji: "🤔", scores: { initiative: 12, confidence: 10 } },
      { text: "Probably not", emoji: "😬", scores: { initiative: 5, confidence: 5 } },
      { text: "Never 😭", emoji: "😭", scores: { initiative: 0, confidence: 0 } },
    ],
  },
  {
    id: 8,
    text: "Where do you spend most of your time?",
    options: [
      { text: "Outside 🏃", emoji: "🏃", scores: { exposure: 20, confidence: 5 } },
      { text: "School/college", emoji: "🏫", scores: { exposure: 15, communication: 10 } },
      { text: "Online 📱", emoji: "📱", scores: { exposure: 8, communication: 8 } },
      { text: "My room 🗿", emoji: "🗿", scores: { exposure: 2, communication: 2 } },
    ],
  },
  {
    id: 9,
    text: "How do you think people see you?",
    options: [
      { text: "Attractive 😎", emoji: "😎", scores: { confidence: 20, exposure: 10 } },
      { text: "Friendly 🙂", emoji: "🙂", scores: { confidence: 15, communication: 15 } },
      { text: "Quiet 😶", emoji: "😶", scores: { confidence: 8, communication: 5 } },
      { text: "Invisible 👻", emoji: "👻", scores: { confidence: 2, communication: 2 } },
    ],
  },
  {
    id: 10,
    text: "How good are you at keeping conversations going?",
    options: [
      { text: "Very good", emoji: "🗣️", scores: { communication: 20, confidence: 10 } },
      { text: "Decent", emoji: "🆗", scores: { communication: 15, confidence: 8 } },
      { text: "Awkward sometimes", emoji: "😬", scores: { communication: 8, confidence: 5 } },
      { text: "Very awkward", emoji: "💀", scores: { communication: 2, confidence: 2 } },
    ],
  },
  {
    id: 11,
    text: "How consistent are you in texting or interacting?",
    options: [
      { text: "Very consistent", emoji: "📡", scores: { effort: 20, communication: 15 } },
      { text: "Sometimes", emoji: "⏳", scores: { effort: 12, communication: 10 } },
      { text: "Rarely", emoji: "📉", scores: { effort: 5, communication: 5 } },
      { text: "Almost never", emoji: "📵", scores: { effort: 0, communication: 0 } },
    ],
  },
  {
    id: 12,
    text: "Do you take risks in social situations?",
    options: [
      { text: "Yes 🔥", emoji: "🔥", scores: { initiative: 20, confidence: 20 } },
      { text: "Sometimes", emoji: "🎲", scores: { initiative: 12, confidence: 10 } },
      { text: "Rarely", emoji: "🛡️", scores: { initiative: 5, confidence: 5 } },
      { text: "Never", emoji: "🧱", scores: { initiative: 0, confidence: 0 } },
    ],
  },
];
