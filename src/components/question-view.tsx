import { useState } from "react";
import { Check, Volume2 } from "lucide-react";
import type { Question } from "@/lib/content";
import { normalizeAnswer } from "@/lib/content";
import { useProgress } from "@/lib/progress";
import { speakEnglish } from "@/lib/speech";

export function QuestionView({
  question,
  onResult,
}: {
  question: Question;
  onResult: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [filled, setFilled] = useState<boolean | null>(null);
  const showThai = useProgress((s) => s.showThai);

  const settled = question.kind === "fill" ? filled !== null : picked !== null;
  const correct =
    question.kind === "fill"
      ? filled === true
      : picked === question.answer;

  function choose(index: number) {
    if (picked !== null || question.kind === "fill") return;
    setPicked(index);
    onResult(index === question.answer);
  }

  function checkFill() {
    if (question.kind !== "fill" || filled !== null) return;
    const got = normalizeAnswer(draft);
    const ok = question.accept.some((item) => normalizeAnswer(item) === got);
    setFilled(ok);
    onResult(ok);
  }

  return (
    <div className="card flex flex-col gap-4 p-5 sm:p-6">
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">
        {question.kind === "listen" ? "Listening" : question.kind === "fill" ? "Fill the gap" : "Choose"}
      </p>
      <h2 className="font-display text-2xl leading-tight">{question.prompt}</h2>

      {question.kind === "listen" && question.say ? (
        <button type="button" className="btn btn-gold w-fit" onClick={() => speakEnglish(question.say!)}>
          <Volume2 className="size-4" />
          Play
        </button>
      ) : null}

      {question.kind === "fill" ? (
        <form
          className="flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            checkFill();
          }}
        >
          <label className="text-sm text-muted" htmlFor="gap">
            Type the missing word
          </label>
          <input
            id="gap"
            value={draft}
            disabled={filled !== null}
            autoComplete="off"
            autoCapitalize="none"
            onChange={(event) => setDraft(event.target.value)}
            className="min-h-12 rounded-2xl border border-line bg-bg px-4 text-lg outline-none"
          />
          {filled === null ? (
            <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
              Check
            </button>
          ) : null}
        </form>
      ) : (
        <ul className="flex flex-col gap-2">
          {question.options.map((option, index) => {
            const isPick = picked === index;
            const isAnswer = settled && index === question.answer;
            let tone = "border-line bg-surface";
            if (isAnswer) tone = "border-celadon bg-celadon text-on-celadon";
            else if (isPick && !correct) tone = "border-lacquer bg-lacquer text-on-lacquer";
            return (
              <li key={option}>
                <button
                  type="button"
                  disabled={settled}
                  onClick={() => choose(index)}
                  className={
                    "flex min-h-12 w-full items-center gap-3 rounded-2xl border px-4 text-left font-medium " + tone
                  }
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-current text-xs">
                    {isAnswer ? <Check className="size-3.5" /> : String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {settled ? (
        <p className={"rounded-2xl px-4 py-3 text-sm " + (correct ? "bg-celadon/10 text-celadon" : "bg-bg-deep text-fg")}>
          <span className="font-semibold">{correct ? "That's the one. " : "Not quite. "}</span>
          {question.why}
          {showThai && question.whyTh ? (
            <span lang="th" className="mt-1 block">
              {question.whyTh}
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
