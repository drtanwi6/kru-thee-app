import { createFileRoute } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HearButton } from "@/components/hear-button";
import { phrases, similarity } from "@/lib/content";
import { useProgress } from "@/lib/progress";
import { listenOnce, recognitionCtor } from "@/lib/speech";

export const Route = createFileRoute("/speak")({
  head: () => ({ meta: [{ title: "Speak · Kru Thee" }] }),
  component: SpeakPage,
});

function SpeakPage() {
  const showThai = useProgress((s) => s.showThai);
  const awardSpeak = useProgress((s) => s.awardSpeak);
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [earned, setEarned] = useState(0);
  const [canHear, setCanHear] = useState(true);
  const [typeMode, setTypeMode] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [draft, setDraft] = useState("");
  const stopRef = useRef<(() => void) | null>(null);
  const phrase = phrases[index];

  useEffect(() => {
    setCanHear(recognitionCtor() !== null);
    return () => stopRef.current?.();
  }, []);

  function resetLine() {
    stopRef.current?.();
    setListening(false);
    setHeard(null);
    setScore(null);
    setHidden(false);
    setDraft("");
  }

  function scoreLine(text: string) {
    const next = similarity(text, phrase.en);
    setHeard(text);
    setScore(next);
    setListening(false);
    const xp = awardSpeak(phrase.id, next);
    if (xp) setEarned((value) => value + xp);
  }

  function startMic() {
    resetLine();
    setListening(true);
    stopRef.current = listenOnce(
      (text) => scoreLine(text),
      () => {
        setListening(false);
        setCanHear(false);
        setTypeMode(true);
      },
    );
  }

  const tone =
    score === null ? "" : score >= 85 ? "text-celadon" : score >= 65 ? "text-on-gold" : "text-lacquer";

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <header>
        <p className="text-sm font-medium text-lacquer">Say it, don't just read it</p>
        <h1 className="font-display text-4xl">Speak</h1>
        <p className="mt-2 text-muted">
          Hear the line, then say it. Short phrases on purpose — your mouth learns them as one piece.
          {earned > 0 ? ` +${earned} XP this visit.` : ""}
        </p>
      </header>

      <article className="card flex min-h-72 flex-col gap-4 p-6">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase tabular-nums">
          Line {index + 1} of {phrases.length}
        </p>
        {hidden ? (
          <h2 className="font-display text-3xl">The line is hidden. Type it from memory.</h2>
        ) : (
          <>
            <h2 className="font-display text-4xl leading-tight">{phrase.en}</h2>
            {showThai ? (
              <p lang="th" className="text-muted">
                {phrase.th}
              </p>
            ) : null}
          </>
        )}
        <p className="rounded-2xl bg-bg px-4 py-3 text-sm">{phrase.tip}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          <HearButton text={phrase.en} label="Hear it" ghost={false} />
          <HearButton text={phrase.en} slow label="Slower" />
        </div>
      </article>

      {typeMode || !canHear ? (
        <form
          className="card flex flex-col gap-3 p-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.trim()) return;
            scoreLine(draft);
          }}
        >
          <p className="text-sm text-muted">
            This browser can't use the microphone here. Listen, hide the line, then type what you remember.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setHidden(true);
                setDraft("");
                setScore(null);
                setHeard(null);
              }}
            >
              Hide the line
            </button>
          </div>
          <label htmlFor="shadow" className="text-sm font-medium">
            Type the English
          </label>
          <input
            id="shadow"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            className="min-h-12 rounded-2xl border border-line bg-bg px-4 text-lg outline-none"
          />
          <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
            Check
          </button>
        </form>
      ) : (
        <button
          type="button"
          className={"btn btn-primary min-h-14 " + (listening ? "listening" : "")}
          onClick={() => {
            if (listening) {
              stopRef.current?.();
              setListening(false);
            } else startMic();
          }}
        >
          <Mic className="size-5" />
          {listening ? "Listening…" : "Tap and speak"}
        </button>
      )}

      {score !== null ? (
        <div className="card p-5">
          <p className={"font-display text-4xl tabular-nums " + tone}>{score}</p>
          <p className="mt-1 text-sm text-muted">
            {score >= 85 ? "Clear. Kru Thee would let that sentence leave the classroom." : null}
            {score !== null && score >= 65 && score < 85
              ? "Close. Hear it once more and match the ending."
              : null}
            {score !== null && score < 65 ? "Let's slow it down and try the whole line again." : null}
          </p>
          {heard ? <p className="mt-2 text-sm">Heard: {heard}</p> : null}
        </div>
      ) : null}

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => {
          resetLine();
          setIndex((value) => (value + 1) % phrases.length);
        }}
      >
        Next line
      </button>
    </div>
  );
}
