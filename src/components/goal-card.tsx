import { Share2 } from "lucide-react";
import { useState } from "react";
import { PORTRAIT, todayISO } from "@/lib/content";
import { useProgress } from "@/lib/progress";

const GOALS = [
  { xp: 10, label: "Easy" },
  { xp: 20, label: "Steady" },
  { xp: 40, label: "Serious" },
];

function Ring({ value, goal }: { value: number; goal: number }) {
  const ratio = goal > 0 ? Math.min(1, value / goal) : 0;
  const r = 28;
  const c = 2 * Math.PI * r;
  return (
    <svg
      viewBox="0 0 72 72"
      className="size-20 shrink-0 -rotate-90"
      role="img"
      aria-label={`${value} of ${goal} XP today`}
    >
      <circle cx="36" cy="36" r={r} fill="none" strokeWidth="8" className="stroke-bg-deep" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        className={ratio >= 1 ? "stroke-celadon" : "stroke-lacquer"}
        strokeDasharray={c}
        strokeDashoffset={c * (1 - ratio)}
        style={{ transition: "stroke-dashoffset 500ms ease" }}
      />
    </svg>
  );
}

export function GoalCard() {
  const dayXp = useProgress((s) => s.dayXp);
  const goal = useProgress((s) => s.dailyGoal);
  const setDailyGoal = useProgress((s) => s.setDailyGoal);
  const streak = useProgress((s) => s.streak);
  const showThai = useProgress((s) => s.showThai);
  const [note, setNote] = useState("");

  const today = dayXp.day === todayISO() ? dayXp.xp : 0;
  const met = today >= goal;

  async function share() {
    const text = `I'm on a ${streak}-day streak learning English with Kru Thee!`;
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setNote("Copied. Paste it anywhere.");
      }
    } catch {
      /* share sheet closed */
    }
  }

  return (
    <section className="card flex flex-col gap-4 p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Ring value={today} goal={goal} />
          <img
            src={PORTRAIT}
            alt="Kru Thee"
            className="absolute inset-0 m-auto size-12 rounded-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Today's goal</p>
          <p className="font-display text-2xl tabular-nums">
            {Math.min(today, goal)} / {goal} XP
          </p>
          <p className="text-sm text-muted">
            {met ? "Goal met. Kru Thee is proud." : `${goal - today} XP to go.`}
            {showThai ? (
              <span lang="th" className="block">
                {met ? "ครบเป้าหมายวันนี้แล้ว เก่งมาก" : `อีก ${goal - today} XP ถึงเป้าหมาย`}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {GOALS.map((g) => (
          <button
            key={g.xp}
            type="button"
            aria-pressed={goal === g.xp}
            onClick={() => setDailyGoal(g.xp)}
            className={"btn min-h-10 px-3 text-sm " + (goal === g.xp ? "btn-celadon" : "btn-ghost")}
          >
            {g.label} · {g.xp}
          </button>
        ))}
        <button type="button" className="btn btn-ghost ml-auto min-h-10 px-3 text-sm" onClick={share}>
          <Share2 className="size-4" />
          Share streak
        </button>
      </div>
      {note ? <p className="text-sm text-celadon">{note}</p> : null}
    </section>
  );
}
