import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addDays, todayISO } from "@/lib/content";

export type CardMemory = { box: number; due: string };
export type LessonScore = { correct: number; total: number; at: string };

type Persisted = {
  learnerName: string | null;
  showThai: boolean;
  xp: number;
  streak: number;
  lastDay: string | null;
  completed: Record<string, LessonScore>;
  cards: Record<string, CardMemory>;
  reviewXp: number;
  reviewXpDay: string | null;
  speakAwards: Record<string, string>;
  drillDay: string | null;
  // NEW
  dailyGoal: number;
  dayXp: { day: string | null; xp: number };
  mistakes: Record<string, number>;
};

type Progress = Persisted & {
  hydrated: boolean;
  setLearnerName: (name: string | null) => void;
  toggleThai: () => void;
  touchDay: () => void;
  completeLesson: (id: string, correct: number, total: number) => number;
  markCard: (id: string, knew: boolean) => number;
  awardSpeak: (id: string, score: number) => number;
  finishDrill: (correct: number) => number;
  // NEW
  setDailyGoal: (goal: number) => void;
  recordMistake: (questionId: string) => void;
  fixMistake: (questionId: string) => number;
  reset: () => void;
};

const blank: Persisted = {
  learnerName: null,
  showThai: true,
  xp: 0,
  streak: 0,
  lastDay: null,
  completed: {},
  cards: {},
  reviewXp: 0,
  reviewXpDay: null,
  speakAwards: {},
  drillDay: null,
  dailyGoal: 20,
  dayXp: { day: null, xp: 0 },
  mistakes: {},
};

// One place that adds XP, so the daily goal ring always matches the total.
function withXp(s: Persisted, amount: number) {
  const today = todayISO();
  const base = s.dayXp.day === today ? s.dayXp.xp : 0;
  return { xp: s.xp + amount, dayXp: { day: today, xp: base + amount } };
}

export const useProgress = create<Progress>()(
  persist(
    (set, get) => ({
      ...blank,
      hydrated: false,
      setLearnerName: (name) => set({ learnerName: name }),
      toggleThai: () => set({ showThai: !get().showThai }),
      touchDay: () => {
        const today = todayISO();
        const { lastDay, streak } = get();
        if (lastDay === today) return;
        const yesterday = addDays(today, -1);
        set({
          lastDay: today,
          streak: lastDay === yesterday ? streak + 1 : 1,
        });
      },
      completeLesson: (id, correct, total) => {
        const prev = get().completed[id];
        const gained = prev ? 0 : 24 + correct * 4;
        const better = !prev || correct >= prev.correct;
        set({
          ...withXp(get(), gained),
          completed: {
            ...get().completed,
            [id]: better ? { correct, total, at: todayISO() } : prev,
          },
        });
        return gained;
      },
      markCard: (id, knew) => {
        const today = todayISO();
        const prev = get().cards[id];
        const box = knew ? Math.min(3, (prev?.box ?? 0) + 1) : 0;
        const due = knew ? addDays(today, box === 1 ? 1 : box === 2 ? 3 : 7) : today;
        let reviewXp = get().reviewXp;
        let gained = 0;
        if (get().reviewXpDay !== today) reviewXp = 0;
        if (knew && reviewXp < 20) {
          gained = 2;
          reviewXp += 2;
        }
        set({
          ...withXp(get(), gained),
          cards: { ...get().cards, [id]: { box, due } },
          reviewXp,
          reviewXpDay: today,
        });
        return gained;
      },
      awardSpeak: (id, score) => {
        if (score < 80) return 0;
        const today = todayISO();
        if (get().speakAwards[id] === today) return 0;
        set({
          ...withXp(get(), 4),
          speakAwards: { ...get().speakAwards, [id]: today },
        });
        return 4;
      },
      finishDrill: (correct) => {
        const today = todayISO();
        if (get().drillDay === today) return 0;
        const gained = 12 + correct * 2;
        set({ ...withXp(get(), gained), drillDay: today });
        return gained;
      },
      setDailyGoal: (goal) => set({ dailyGoal: Math.max(10, Math.min(100, goal)) }),
      recordMistake: (questionId) =>
        set({
          mistakes: {
            ...get().mistakes,
            [questionId]: (get().mistakes[questionId] ?? 0) + 1,
          },
        }),
      fixMistake: (questionId) => {
        if (!(questionId in get().mistakes)) return 0;
        const { [questionId]: _removed, ...rest } = get().mistakes;
        set({ ...withXp(get(), 2), mistakes: rest });
        return 2;
      },
      reset: () =>
        set({
          ...blank,
          learnerName: get().learnerName,
          showThai: get().showThai,
          dailyGoal: get().dailyGoal,
          hydrated: true,
        }),
    }),
    {
      name: "kru-thee",
      skipHydration: true,
      partialize: (state) => ({
        learnerName: state.learnerName,
        showThai: state.showThai,
        xp: state.xp,
        streak: state.streak,
        lastDay: state.lastDay,
        completed: state.completed,
        cards: state.cards,
        reviewXp: state.reviewXp,
        reviewXpDay: state.reviewXpDay,
        speakAwards: state.speakAwards,
        drillDay: state.drillDay,
        dailyGoal: state.dailyGoal,
        dayXp: state.dayXp,
        mistakes: state.mistakes,
      }),
    },
  ),
);
