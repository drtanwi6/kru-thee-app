
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/this-week")({
  component: ThisWeek,
});

const lessons = [
  {
    title: "DO, DOES & DID",
    thai: "การใช้ Do, Does และ Did",
    rule: "DO = I, You, We, They | DOES = He, She, It | DID = Past",
    examples: [
      ["Do you like football?", "คุณชอบฟุตบอลไหม?"],
      ["Does she speak English?", "เธอพูดภาษาอังกฤษไหม?"],
      ["Did you go to school yesterday?", "เมื่อวานคุณไปโรงเรียนไหม?"],
    ],
    questions: [
      ["___ you like music?", "Do", ["Do", "Does", "Did"]],
      ["___ he play football?", "Does", ["Do", "Does", "Did"]],
      ["___ they visit yesterday?", "Did", ["Do", "Does", "Did"]],
    ],
  },
  {
    title: "WH QUESTIONS",
    thai: "คำถาม WH",
    rule: "WHAT = อะไร | WHERE = ที่ไหน | WHEN = เมื่อไหร่ | WHO = ใคร | WHY = ทำไม | HOW = อย่างไร",
    examples: [
      ["What is your name?", "คุณชื่ออะไร?"],
      ["Where do you live?", "คุณอาศัยอยู่ที่ไหน?"],
      ["Why are you happy?", "ทำไมคุณมีความสุข?"],
      ["When do you study?", "คุณเรียนเมื่อไหร่?"],
      ["Who is your teacher?", "ใครคือครูของคุณ?"],
      ["How are you?", "คุณสบายดีไหม?"],
    ],
    questions: [
      ["___ is your name?", "What", ["What", "Where", "Who"]],
      ["___ do you live?", "Where", ["When", "Where", "Why"]],
      ["___ are you crying?", "Why", ["How", "Who", "Why"]],
    ],
  },
  {
    title: "CAN & CAN'T",
    thai: "สามารถทำได้และทำไม่ได้",
    rule: "CAN = สามารถทำได้ | CAN'T = ไม่สามารถทำได้",
    examples: [
      ["I can swim.", "ฉันว่ายน้ำได้"],
      ["She can sing.", "เธอร้องเพลงได้"],
      ["He can't drive.", "เขาขับรถไม่ได้"],
      ["Can you dance?", "คุณเต้นได้ไหม?"],
    ],
    questions: [
      ["I ___ speak English.", "can", ["can", "can't", "does"]],
      ["A baby ___ drive.", "can't", ["can", "can't", "did"]],
      ["___ you swim?", "Can", ["Do", "Can", "Does"]],
    ],
  },
  {
    title: "SHOULD & SHOULDN'T",
    thai: "ควรทำและไม่ควรทำ",
    rule: "SHOULD = ควร | SHOULDN'T = ไม่ควร",
    examples: [
      ["You should study every day.", "คุณควรเรียนทุกวัน"],
      ["You should drink water.", "คุณควรดื่มน้ำ"],
      ["You shouldn't fight.", "คุณไม่ควรทะเลาะกัน"],
      ["You shouldn't eat too much sugar.", "คุณไม่ควรกินน้ำตาลมากเกินไป"],
    ],
    questions: [
      ["You ___ respect your parents.", "should", ["should", "shouldn't", "did"]],
      ["You ___ smoke.", "shouldn't", ["should", "shouldn't", "can"]],
      ["You ___ help your friends.", "should", ["should", "can't", "did"]],
    ],
  },
];

function ThisWeek() {
  const [selected, setSelected] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const lesson = lessons[selected];

  const score = lesson.questions.filter(
    (q, i) => answers[i] === q[1]
  ).length;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <header className="rounded-3xl bg-[#fff0d9] p-6 text-[#292b43]">
        <p className="text-sm font-bold tracking-widest">KRU THEE</p>
        <h1 className="mt-2 text-3xl font-bold">THIS WEEK</h1>
        <p className="mt-2">Learn • Practise • Speak</p>
        <p lang="th" className="mt-1">บทเรียนภาษาอังกฤษประจำสัปดาห์</p>
      </header>

      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {lessons.map((item, i) => (
          <button
            key={item.title}
            onClick={() => {
              setSelected(i);
              setAnswers({});
              setShowAnswers(false);
            }}
            className={`rounded-xl p-3 text-sm font-bold ${
              selected === i
                ? "bg-[#26334d] text-white"
                : "bg-white text-[#26334d] border"
            }`}
          >
            Lesson {i + 1}
          </button>
        ))}
      </nav>

      <section className="rounded-2xl border bg-white p-5">
        <p className="text-sm text-[#a45d35] font-bold">
          LESSON {selected + 1} OF 4
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#26334d]">
          {lesson.title}
        </h2>
        <p className="mt-1 text-[#777]">{lesson.thai}</p>

        <div className="mt-4 rounded-xl bg-[#fff7e9] p-4">
          <h3 className="font-bold">THE RULE</h3>
          <p className="mt-2">{lesson.rule}</p>
        </div>

        <h3 className="mt-6 text-lg font-bold">EXAMPLES</h3>
        <div className="mt-3 flex flex-col gap-3">
          {lesson.examples.map(([en, th]) => (
            <div key={en} className="rounded-xl border p-3">
              <p className="font-semibold">{en}</p>
              <p lang="th" className="mt-1 text-sm text-[#777]">{th}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-bold text-[#26334d]">
          PRACTICE TIME!
        </h2>
        <p className="mt-1 text-sm text-[#777]">
          Choose the correct answer.
        </p>

        {lesson.questions.map((q, i) => (
          <div key={i} className="mt-5">
            <p className="font-semibold">{i + 1}. {q[0]}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(q[2] as string[]).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setAnswers({ ...answers, [i]: option });
                    setShowAnswers(false);
                  }}
                  className={`rounded-lg border px-4 py-2 ${
                    answers[i] === option
                      ? "bg-[#26334d] text-white"
                      : "bg-[#fff7e9]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {showAnswers && (
              <p className={`mt-2 text-sm font-semibold ${
                answers[i] === q[1] ? "text-green-700" : "text-red-600"
              }`}>
                {answers[i] === q[1] ? "Correct!" : `Correct answer: ${q[1]}`}
              </p>
            )}
          </div>
        ))}

        <button
          onClick={() => setShowAnswers(true)}
          className="mt-6 w-full rounded-xl bg-[#26334d] p-3 font-bold text-white"
        >
          CHECK MY ANSWERS
        </button>

        {showAnswers && (
          <p className="mt-3 text-center font-bold">
            Your score: {score}/{lesson.questions.length}
          </p>
        )}
      </section>

      <section className="rounded-2xl bg-[#fff0d9] p-5 text-[#26334d]">
        <h2 className="text-xl font-bold">SPEAK OUT LOUD!</h2>
        <p className="mt-2">Now make your own sentences using today's lesson.</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Say three sentences using today's grammar.</li>
          <li>Ask your teacher two questions.</li>
          <li>Answer in complete English sentences.</li>
        </ul>
        <p lang="th" className="mt-3 text-sm">
          ฝึกพูดภาษาอังกฤษออกเสียงดัง ๆ
        </p>
      </section>

      <footer className="py-4 text-center text-sm text-[#777]">
        KRU THEE • YOU CAN DO IT!
      </footer>
    </main>
  );
}
