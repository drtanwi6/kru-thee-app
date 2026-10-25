import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { HearButton } from "@/components/hear-button";
import { reviewLessons, todayISO, type Vocab } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Review · Kru Thee" }] }),
  component: ReviewPage,
});

function ReviewPage() {
  const completed = useProgress((s) => s.completed);
  const cards = useProgress((s) => s.cards);
  const showThai = useProgress((s) => s.showThai);
  const markCard = useProgress((s) => s.markCard);
  const studied = reviewLessons(Object.keys(completed));
  const pool = studied.flatMap((lesson) => lesson.vocab);
  const today = todayISO();

  const [queue, setQueue] = useState<Vocab[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [earned, setEarned] = useState(0);
  const [cleared, setCleared] = useState(0);
  const queueRef = useRef(queue);
  queueRef.current = queue;

  useEffect(() => {
    const due = pool.filter((vocab) => {
      const card = cards[vocab.id];
      return !card || card.due <= today;
    });
    setQueue(due);
    // Snapshot what is due when the desk opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function grade(knew: boolean) {
    const current = queueRef.current;
    if (!current || current.length === 0) return;
    const [head, ...rest] = current;
    const xp = markCard(head.id, knew);
    setEarned((value) => value + xp);
    setCleared((value) => value + (knew ? 1 : 0));
    setFlipped(false);
    setQueue(knew ? rest : [...rest, head]);
  }

  const gradeRef = useRef(grade);
  gradeRef.current = grade;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.repeat) return;
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("button, a, input, textarea")) return;
      if (event.key === " ") {
        event.preventDefault();
        setFlipped((value) => !value);
      } else if (event.key === "1") gradeRef.current(false);
      else if (event.key === "2") gradeRef.current(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = queue?.[0];
  const starter = Object.keys(completed).length === 0;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <header>
        <p className="text-sm font-medium text-lacquer">Short memory</p>
        <h1 className="font-display text-4xl">Review</h1>
        <p className="mt-2 text-muted">
          {starter
            ? "This starter deck is from First hellos. Finish a class and its words join the pile."
            : "Again puts a card back in today's pile. Got it lets it rest."}
        </p>
      </header>

      {queue === null ? (
        <div className="card h-72 animate-pulse bg-bg-deep" />
      ) : current ? (
        <>
          <p className="text-sm tabular-nums text-muted">
            {queue.length} still in the pile
            {earned > 0 ? ` · +${earned} XP` : ""}
          </p>
          <button
            type="button"
            className="card flex min-h-80 flex-col items-start gap-3 p-6 text-left"
            onClick={() => setFlipped((value) => !value)}
            aria-expanded={flipped}
          >
            <span className="text-xs font-semibold tracking-wide text-muted uppercase">
              {flipped ? "Meaning" : "English · tap to flip"}
            </span>
            {flipped ? (
              <>
                {showThai ? (
                  <span lang="th" className="font-display text-4xl leading-tight">
                    {current.th}
                  </span>
                ) : (
                  <span className="font-display text-3xl leading-tight">{current.example}</span>
                )}
                <span className="text-muted">{showThai ? current.example : current.say}</span>
                {showThai ? (
                  <span lang="th" className="text-sm text-muted">
                    {current.exampleTh}
                  </span>
                ) : null}
              </>
            ) : (
              <>
                <span className="font-display text-4xl leading-tight">{current.en}</span>
                <span className="text-sm text-muted">{current.say}</span>
              </>
            )}
          </button>
          <div className="flex flex-wrap gap-2">
            <HearButton text={[current.en, current.example]} label="Hear it" />
            <button type="button" className="btn btn-ghost" onClick={() => grade(false)}>
              Again
            </button>
            <button type="button" className="btn btn-celadon" onClick={() => grade(true)}>
              Got it
            </button>
          </div>
          <p className="text-xs text-muted">Keys, when nothing is focused: space flips, 1 again, 2 got it.</p>
        </>
      ) : (
        <article className="card flex flex-col gap-3 p-6">
          <h2 className="font-display text-3xl">{cleared > 0 ? "Pile clear" : "Nothing due"}</h2>
          <p className="text-muted">
            {cleared > 0
              ? `You settled ${cleared} ${cleared === 1 ? "card" : "cards"}${earned > 0 ? ` and picked up ${earned} XP` : ""}.`
              : "Today's cards are already resting. Come back tomorrow, or practice the whole studied deck now."}
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={() => setQueue(pool)}>
              Practice anyway
            </button>
            <Link to="/lessons" className="btn btn-ghost">
              Take a class
            </Link>
          </div>
        </article>
      )}
    </div>
  );
}
