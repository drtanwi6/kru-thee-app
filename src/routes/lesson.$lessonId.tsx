import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { HearButton } from "@/components/hear-button";
import { QuestionView } from "@/components/question-view";
import { PORTRAIT, getLesson } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lesson/$lessonId")({
  head: ({ params }) => ({
    meta: [{ title: `${getLesson(params.lessonId)?.title ?? "Lesson"} · Kru Thee` }],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { lessonId } = Route.useParams();
  const lesson = getLesson(lessonId);
  const showThai = useProgress((s) => s.showThai);
  const completeLesson = useProgress((s) => s.completeLesson);
  const recordMistake = useProgress((s) => s.recordMistake);

  const [step, setStep] = useState<"intro" | "words" | "check" | "done">("intro");
  const [wordIndex, setWordIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [gained, setGained] = useState(0);
  const [misses, setMisses] = useState<string[]>([]);

  if (!lesson) {
    return (
      <div className="card p-6">
        <h1 className="font-display text-3xl">That class isn't on the timetable.</h1>
        <Link to="/lessons" className="btn btn-primary mt-4">
          Back to lessons
        </Link>
      </div>
    );
  }

  const totalSteps = 1 + lesson.vocab.length + lesson.questions.length;
  const currentStep =
    step === "intro" ? 1 : step === "words" ? 2 + wordIndex : step === "check" ? 2 + lesson.vocab.length + qIndex : totalSteps;
  const word = lesson.vocab[wordIndex];
  const question = lesson.questions[qIndex];

  function finish(correct: number) {
    const xp = completeLesson(lesson!.id, correct, lesson!.questions.length);
    setGained(xp);
    setStep("done");
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <Link to="/lessons" className="inline-flex min-h-11 items-center gap-1 text-sm text-muted">
          <ChevronLeft className="size-4" />
          Lessons
        </Link>
        <p className="text-sm tabular-nums text-muted">
          {currentStep}/{totalSteps}
        </p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-bg-deep">
        <div
          className="h-full rounded-full bg-lacquer motion"
          style={{ width: `${Math.round((currentStep / totalSteps) * 100)}%` }}
        />
      </div>

      {step === "intro" ? (
        <article className="card flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <img src={PORTRAIT} alt="" className="size-14 rounded-2xl object-cover" />
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">{lesson.level}</p>
              <h1 className="font-display text-3xl">{lesson.title}</h1>
            </div>
          </div>
          {showThai ? (
            <p lang="th" className="text-sm text-muted">
              {lesson.titleTh}
            </p>
          ) : null}
          <p>{lesson.intro}</p>
          {showThai && lesson.introTh ? (
            <p lang="th" className="text-sm text-muted">
              {lesson.introTh}
            </p>
          ) : null}
          <button type="button" className="btn btn-primary" onClick={() => setStep("words")}>
            Start with the words
          </button>
        </article>
      ) : null}

      {step === "words" && word ? (
        <article className="card flex min-h-96 flex-col gap-4 p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">
            Word {wordIndex + 1} of {lesson.vocab.length}
          </p>
          <h1 className="font-display text-4xl leading-tight">{word.en}</h1>
          <p className="text-sm text-muted">{word.say}</p>
          {showThai ? (
            <p lang="th" className="text-lg">
              {word.th}
            </p>
          ) : null}
          <blockquote className="border-l-4 border-gold pl-4">
            <p>{word.example}</p>
            {showThai ? (
              <p lang="th" className="mt-1 text-sm text-muted">
                {word.exampleTh}
              </p>
            ) : null}
          </blockquote>
          {word.note ? (
            <div className="rounded-2xl bg-bg px-4 py-3 text-sm">
              <p>{word.note}</p>
              {showThai && word.noteTh ? (
                <p lang="th" className="mt-1 text-muted">
                  {word.noteTh}
                </p>
              ) : null}
            </div>
          ) : null}
          <div className="mt-auto flex flex-wrap gap-2">
            <HearButton text={word.en} label="Hear word" />
            <HearButton text={word.example} slow label="Slow sentence" />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (wordIndex + 1 < lesson.vocab.length) setWordIndex(wordIndex + 1);
              else setStep("check");
            }}
          >
            {wordIndex + 1 < lesson.vocab.length ? "Next word" : "Check what stuck"}
          </button>
        </article>
      ) : null}

      {step === "check" && question ? (
        <div className="flex flex-col gap-4">
          <QuestionView
            key={question.id}
            question={question}
            onResult={(ok) => {
              setAnswered(true);
              if (ok) setCorrectCount((n) => n + 1);
              else {
                setMisses((list) => [...list, question.prompt]);
                recordMistake(question.id);
              }
            }}
          />
          {answered ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setAnswered(false);
                if (qIndex + 1 < lesson.questions.length) setQIndex(qIndex + 1);
                else finish(correctCount);
              }}
            >
              {qIndex + 1 < lesson.questions.length ? "Next question" : "Finish class"}
            </button>
          ) : null}
        </div>
      ) : null}

      {step === "done" ? (
        <article className="card flex flex-col gap-4 p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-wide text-celadon uppercase">Class dismissed</p>
          <h1 className="font-display text-4xl">{lesson.title}</h1>
          <p className="text-lg tabular-nums">
            {correctCount} of {lesson.questions.length} correct
            {gained > 0 ? ` · +${gained} XP` : " · already counted"}
          </p>
          {misses.length > 0 ? (
            <div>
              <p className="text-sm font-semibold">Look again at</p>
              <ul className="mt-2 flex flex-col gap-1 text-sm text-muted">
                {misses.map((miss) => (
                  <li key={miss}>{miss}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Clean sheet. Those lines are ready for the review deck.</p>
          )}
          <div className="flex flex-wrap gap-2">
            <Link to="/review" className="btn btn-celadon">
              Review these words
            </Link>
            <Link to="/lessons" className="btn btn-ghost">
              All lessons
            </Link>
          </div>
        </article>
      ) : null}
    </div>
  );
}
