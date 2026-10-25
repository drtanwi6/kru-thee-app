import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { lessons, nextLesson } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lessons")({
  head: () => ({ meta: [{ title: "Lessons · Kru Thee" }] }),
  component: LessonsPage,
});

function LessonsPage() {
  const completed = useProgress((s) => s.completed);
  const showThai = useProgress((s) => s.showThai);
  const reset = useProgress((s) => s.reset);
  const doneIds = Object.keys(completed);
  const upcoming = nextLesson(doneIds);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium text-lacquer">{`${lessons.length} short classes`}</p>
        <h1 className="mt-1 font-display text-4xl">Lessons</h1>
        <p className="mt-2 max-w-xl text-muted">
          Each class is a handful of words, then a check. Built for Thai speakers: articles, be, and the sorry / excuse me split.
        </p>
      </header>
      <ol className="grid gap-3">
        {lessons.map((lesson, index) => {
          const score = completed[lesson.id];
          const suggested = upcoming?.id === lesson.id;
          return (
            <li key={lesson.id}>
              <Link
                to="/lesson/$lessonId"
                params={{ lessonId: lesson.id }}
                className="card flex items-center gap-4 p-4 sm:p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-bg font-display text-lg tabular-nums">
                  {score ? <Check className="size-5 text-celadon" /> : index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-2xl">{lesson.title}</span>
                    {suggested ? (
                      <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-on-gold">
                        Start here
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {lesson.blurb}
                    {showThai ? <span lang="th"> · {lesson.titleTh}</span> : null}
                  </span>
                </span>
                <span className="hidden text-right text-sm text-muted sm:block">
                  <span className="block">{lesson.level}</span>
                  <span className="tabular-nums">{lesson.minutes} min</span>
                  {score ? (
                    <span className="block tabular-nums text-celadon">
                      {score.correct}/{score.total}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="pt-2">
        {confirming ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span>Clear XP, streaks, and cards on this device?</span>
            <button type="button" className="btn btn-primary" onClick={() => reset()}>
              Clear
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setConfirming(false)}>
              Keep
            </button>
          </div>
        ) : (
          <button type="button" className="text-sm text-muted underline-offset-2 hover:underline" onClick={() => setConfirming(true)}>
            Start progress over
          </button>
        )}
      </div>
    </div>
  );
}
