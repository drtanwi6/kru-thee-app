import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QuestionView } from "@/components/question-view";
import { PORTRAIT, allQuestions, type Question } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/mistakes")({
  head: () => ({ meta: [{ title: "Fix my mistakes · Kru Thee" }] }),
  component: MistakesPage,
});

function MistakesPage() {
  const hydrated = useProgress((s) => s.hydrated);
  const fixMistake = useProgress((s) => s.fixMistake);
  const [queue, setQueue] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [fixed, setFixed] = useState(0);
  const [earned, setEarned] = useState(0);

  // Snapshot the notebook once, after saved progress has loaded.
  useEffect(() => {
    if (!hydrated || queue !== null) return;
    const ids = new Set(Object.keys(useProgress.getState().mistakes));
    setQueue(allQuestions().filter((q) => ids.has(q.id)).slice(0, 8));
  }, [hydrated, queue]);

  if (queue === null) {
    return <p className="text-muted">Opening your notebook…</p>;
  }

  if (queue.length === 0) {
    return (
      <article className="card mx-auto flex w-full max-w-xl flex-col gap-3 p-6">
        <img src={PORTRAIT} alt="Kru Thee" className="size-16 rounded-2xl object-cover" />
        <p className="text-xs font-semibold tracking-wide text-celadon uppercase">Notebook empty</p>
        <h1 className="font-display text-3xl">No mistakes saved.</h1>
        <p className="text-muted">
          When you miss a question in a class or drill, it lands here so you can fix it later.
        </p>
        <Link to="/lessons" className="btn btn-primary w-fit">
          Go to lessons
        </Link>
      </article>
    );
  }

  if (index >= queue.length) {
    return (
      <article className="card mx-auto flex w-full max-w-xl flex-col gap-3 p-6">
        <img src={PORTRAIT} alt="Kru Thee" className="size-16 rounded-2xl object-cover" />
        <p className="text-xs font-semibold tracking-wide text-celadon uppercase">Notebook cleaned</p>
        <h1 className="font-display text-4xl tabular-nums">
          {fixed} of {queue.length} fixed
        </h1>
        <p className="text-muted">
          {earned > 0 ? `+${earned} XP. ` : ""}
          {fixed < queue.length ? "The rest stay in your notebook for next time." : "Clean page."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="btn btn-primary">
            Back home
          </Link>
          <Link to="/drill" className="btn btn-ghost">
            Quick drill
          </Link>
        </div>
      </article>
    );
  }

  const question = queue[index];

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <header className="flex items-center gap-4">
        <img src={PORTRAIT} alt="Kru Thee" className="size-16 shrink-0 rounded-2xl object-cover" />
        <div>
          <p className="text-sm font-medium text-lacquer">Questions you missed before</p>
          <h1 className="font-display text-4xl">Fix my mistakes</h1>
          <p className="mt-1 text-sm tabular-nums text-muted">
            {index + 1} / {queue.length}
          </p>
        </div>
      </header>
      <QuestionView
        key={question.id}
        question={question}
        onResult={(ok) => {
          setAnswered(true);
          if (ok) {
            setFixed((n) => n + 1);
            setEarned((n) => n + fixMistake(question.id));
          }
        }}
      />
      {answered ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setAnswered(false);
            setIndex(index + 1);
          }}
        >
          {index + 1 < queue.length ? "Next" : "See the result"}
        </button>
      ) : null}
    </div>
  );
}
