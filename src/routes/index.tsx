import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame } from "lucide-react";
import { useState } from "react";
import { HearButton } from "@/components/hear-button";
import { GoalCard } from "@/components/goal-card";
import {
  PORTRAIT,
  greeting,
  lessons,
  nextLesson,
  noteOfDay,
  rankFor,
  reviewLessons,
  todayISO,
  wordOfDay,
} from "@/lib/content";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const learnerName = useProgress((s) => s.learnerName);
  const hydrated = useProgress((s) => s.hydrated);
  const setLearnerName = useProgress((s) => s.setLearnerName);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const completed = useProgress((s) => s.completed);
  const cards = useProgress((s) => s.cards);
  const showThai = useProgress((s) => s.showThai);
  const missed = Object.keys(useProgress((s) => s.mistakes)).length;

  const hello = greeting();
  const today = todayISO();
  const word = wordOfDay(today);
  const note = noteOfDay(today);
  const doneIds = Object.keys(completed);
  const upcoming = nextLesson(doneIds);
  const rank = rankFor(xp);
  const known = Object.values(cards).filter((card) => card.box > 0).length;
  const studied = reviewLessons(doneIds);
  const due = studied
    .flatMap((lesson) => lesson.vocab)
    .filter((vocab) => {
      const card = cards[vocab.id];
      return !card || card.due <= today;
    }).length;

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <img
          src={PORTRAIT}
          alt="Kru Thee, your English teacher"
          className="size-28 rounded-3xl object-cover ring-4 ring-surface shadow-card sm:size-36"
        />
        <div>
          <p className="text-sm font-medium text-lacquer">
            {hello.en}
            {showThai ? <span lang="th"> · {hello.th}</span> : null}
            {learnerName ? `, ${learnerName}` : ""}
          </p>
          <h1 className="mt-1 font-display text-4xl leading-tight sm:text-5xl">
            Class is open.
          </h1>
          <p className="mt-3 max-w-xl text-muted">{note}</p>
          {hydrated && learnerName !== null ? (
            <button
              type="button"
              className="mt-2 text-sm text-muted underline-offset-2 hover:underline"
              onClick={() => setLearnerName(null)}
            >
              {learnerName ? "Change name" : "Add your name"}
            </button>
          ) : null}
        </div>
      </section>

      {hydrated && learnerName === null ? (
        <NameCard onSave={setLearnerName} />
      ) : null}

      <section className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-muted">
              {rank.current.name}
              {showThai ? <span lang="th"> · {rank.current.th}</span> : null}
            </p>
            <p className="font-display text-3xl tabular-nums">{xp} XP</p>
          </div>
          <p className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-sm font-semibold text-on-gold">
            <Flame className="size-4 text-gold" />
            <span className="tabular-nums">{streak}</span>
            day streak
          </p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-deep">
          <div
            className="h-full rounded-full bg-lacquer"
            style={{ width: `${Math.round(rank.ratio * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted">
          {rank.next
            ? `${rank.remaining} XP to ${rank.next.name}`
            : "You are a little teacher now. Keep the words warm."}
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
          <Stat label="Lessons" value={String(doneIds.length)} />
          <Stat label="Words held" value={String(known)} />
          <Stat label="Due today" value={String(due)} />
        </dl>
      </section>

      <GoalCard />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="card flex flex-col justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              {upcoming ? "Next class" : "Path complete"}
            </p>
            <h2 className="mt-2 font-display text-3xl">
              {upcoming ? upcoming.title : `You finished all ${lessons.length} classes`}
            </h2>
            <p className="mt-2 text-muted">
              {upcoming
                ? upcoming.blurb
                : "The path is done. Review and speaking keep it in your mouth, not just your notes."}
            </p>
            {upcoming && showThai ? (
              <p className="mt-1 text-sm text-muted" lang="th">
                {upcoming.titleTh}
              </p>
            ) : null}
          </div>
          {upcoming ? (
            <Link
              to="/lesson/$lessonId"
              params={{ lessonId: upcoming.id }}
              className="btn btn-primary w-fit"
            >
              Start class
              <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link to="/review" className="btn btn-primary w-fit">
              Review the deck
              <ArrowRight className="size-4" />
            </Link>
          )}
        </article>

        <article className="card flex flex-col gap-3 p-5 sm:p-6">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">
            Word of the day
          </p>
          <h2 className="font-display text-3xl">{word.en}</h2>
          <p className="text-sm text-muted">{word.say}</p>
          {showThai ? <p lang="th" className="text-fg">{word.th}</p> : null}
          <p className="text-fg">{word.example}</p>
          {showThai ? (
            <p lang="th" className="text-sm text-muted">{word.exampleTh}</p>
          ) : null}
          <HearButton
            text={[word.en, word.example]}
            label="Hear word and sentence"
          />
        </article>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Quick
          to="/review"
          title="Review"
          body={due > 0 ? `${due} cards are due` : "Deck is clear for today"}
        />
        <Quick to="/speak" title="Speak" body="Say a short line out loud" />
        <Quick to="/drill" title="Quick drill" body="Five mixed questions" />
        <Quick
          to="/mistakes"
          title="Fix my mistakes"
          body={missed > 0 ? `${missed} saved to redo` : "Notebook is clean"}
        />
      </section>

      <section aria-label="Weekly English lessons">
        <a
          href="/this-week"
          aria-label="Open this week's English lessons"
          className="card flex min-h-24 flex-col justify-center gap-1 px-4 py-3 transition-colors hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lacquer"
        >
          <h2 className="font-display text-xl">This Week</h2>
          <span className="text-sm text-muted">Learn, practise and speak</span>
          {showThai ? (
            <span lang="th" className="text-sm text-muted">
              บทเรียนประจำสัปดาห์
            </span>
          ) : null}
        </a>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-bg px-2 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="font-display text-2xl tabular-nums">{value}</dd>
    </div>
  );
}

function Quick({
  to,
  title,
  body,
}: {
  to: "/review" | "/speak" | "/drill" | "/mistakes";
  title: string;
  body: string;
}) {
  return (
    <Link
      to={to}
      className="card flex min-h-24 flex-col justify-center px-4 py-4 hover:bg-bg"
    >
      <span className="font-display text-xl">{title}</span>
      <span className="text-sm text-muted">{body}</span>
    </Link>
  );
}

function NameCard({ onSave }: { onSave: (name: string | null) => void }) {
  const [value, setValue] = useState("");

  return (
    <form
      className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-end"
      onSubmit={(event) => {
        event.preventDefault();
        const name = value.trim().slice(0, 24);
        onSave(name || "");
      }}
    >
      <div className="flex-1">
        <label htmlFor="learner" className="font-display text-xl">
          What should Kru Thee call you?
        </label>
        <input
          id="learner"
          value={value}
          maxLength={24}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Your name"
          className="mt-3 min-h-12 w-full rounded-2xl border border-line bg-bg px-4 outline-none"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!value.trim()}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onSave("")}
        >
          Skip
        </button>
      </div>
    </form>
  );
}
