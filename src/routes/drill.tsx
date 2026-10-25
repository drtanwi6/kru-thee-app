import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { QuestionView } from "@/components/question-view";
import { drillQuestions, todayISO } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/drill")({
  head: () => ({ meta: [{ title: "Drill · Kru Thee" }] }),
  component: DrillPage,
});

function DrillPage() {
  const completed = useProgress((s) => s.completed);
  const finishDrill = useProgress((s) => s.finishDrill);
  const recordMistake = useProgress((s) => s.recordMistake);
  const doneKey = Object.keys(completed).join(",");
  const today = todayISO();
  const questions = useMemo(() => drillQuestions(doneKey ? doneKey.split(",") : [], today), [doneKey, today]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const correctRef = useRef(0);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const [gained, setGained] = useState(0);

  const question = questions[index];

  if (done) {
    return (
      <article className="card mx-auto flex w-full max-w-xl flex-col gap-3 p-6">
        <p className="text-xs font-semibold tracking-wide text-celadon uppercase">Drill done</p>
        <h1 className="font-display text-4xl tabular-nums">
          {correct} of {questions.length}
        </h1>
        <p className="text-muted">
          {gained > 0
            ? `+${gained} XP. One drill counts per day.`
            : "You already took today's drill XP. The practice still counts."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="btn btn-primary">
            Back home
          </Link>
          <Link to="/speak" className="btn btn-ghost">
            Say a line
          </Link>
        </div>
      </article>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <header>
        <p className="text-sm font-medium text-lacquer">Mixed from classes you've met</p>
        <h1 className="font-display text-4xl">Quick drill</h1>
        <p className="mt-1 text-sm tabular-nums text-muted">
          {index + 1} / {questions.length}
        </p>
      </header>
      {question ? (
        <QuestionView
          key={question.id}
          question={question}
          onResult={(ok) => {
            setAnswered(true);
            if (ok) {
              correctRef.current += 1;
              setCorrect(correctRef.current);
            }
            if (!ok && question) recordMistake(question.id);
          }}
        />
      ) : null}
      {answered ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setAnswered(false);
            if (index + 1 < questions.length) setIndex(index + 1);
            else {
              setGained(finishDrill(correctRef.current));
              setDone(true);
            }
          }}
        >
          {index + 1 < questions.length ? "Next" : "See the score"}
        </button>
      ) : null}
    </div>
  );
}
