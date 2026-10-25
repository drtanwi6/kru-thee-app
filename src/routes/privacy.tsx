import { createFileRoute, Link } from "@tanstack/react-router";
import { PORTRAIT } from "@/lib/content";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy · Kru Thee" }] }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "What this class keeps",
    body: "Kru Thee is an English class for Thai speakers. Your lessons, XP, streak, review cards, speaking scores, daily goal, and mistake notebook stay on this device, in this browser. We do not make an account for you, and we do not upload that progress to a Kru Thee server.",
    th: "ครูธีเป็นคลาสภาษาอังกฤษสำหรับคนไทย บทเรียน XP สตรีค การทบทวน คะแนนพูด เป้าหมายรายวัน และสมุดผิด อยู่บนเครื่องนี้ ในเบราว์เซอร์นี้ เราไม่สร้างบัญชีให้คุณ และไม่อัปโหลดความก้าวหน้าขึ้นเซิร์ฟเวอร์ของครูธี",
  },
  {
    title: "Your name",
    body: "The name on the home screen is optional. It is saved only on this device so the greeting can use it. You can change it or clear it from Home. It is not sent to us.",
    th: "ชื่อบนหน้าแรกใส่หรือไม่ใส่ก็ได้ เก็บไว้บนเครื่องนี้เพื่อใช้ทักทาย คุณเปลี่ยนหรือลบได้จากหน้าแรก เราไม่ได้รับชื่อนั้น",
  },
  {
    title: "Voice",
    body: "Hear buttons use your device's own speech voice. Nothing is recorded. Speak practice uses the browser's speech recognition. That audio is handled by your browser's speech service (for example Google, if you use Chrome). Kru Thee does not receive or store the recording.",
    th: "ปุ่มฟังใช้เสียงของเครื่องคุณเอง ไม่มีการบันทึก หน้าพูดใช้ระบบฟังของเบราว์เซอร์ เสียงนั้นถูกจัดการโดยบริการพูดของเบราว์เซอร์ (เช่น Google ถ้าใช้ Chrome) ครูธีไม่ได้รับและไม่เก็บไฟล์เสียง",
  },
  {
    title: "Share streak",
    body: "Share streak opens your device's share sheet, or copies a sentence to your clipboard if sharing is not available. We do not see who you send it to.",
    th: "ปุ่มแชร์สตรีคเปิดหน้าแชร์ของเครื่อง หรือคัดลอกประโยคไว้ถ้าแชร์ไม่ได้ เราไม่เห็นว่าคุณส่งให้ใคร",
  },
  {
    title: "What we do not do",
    body: "We do not sell your information. We do not show ads. We do not use your progress to build a profile on our servers. The website host may keep ordinary connection logs, such as an IP address and browser type, only to deliver the pages.",
    th: "เราไม่ขายข้อมูลคุณ เราไม่แสดงโฆษณา เราไม่เอาความก้าวหน้าไปทำโปรไฟล์บนเซิร์ฟเวอร์ ผู้ให้บริการเว็บอาจเก็บบันทึกการเชื่อมต่อธรรมดา เช่น ไอพีและชนิดเบราว์เซอร์ แค่เพื่อเปิดหน้าเว็บ",
  },
  {
    title: "Children",
    body: "Kru Thee is a general English class, not an app directed at children under 13. Please do not type a child's full name. If you believe a child has stored personal information here, clear the progress on that device.",
    th: "ครูธีเป็นคลาสภาษาอังกฤษทั่วไป ไม่ได้ทำมาสำหรับเด็กอายุต่ำกว่า 13 ปี กรุณาอย่าพิมพ์ชื่อเต็มของเด็ก ถ้าคิดว่าเด็กเก็บข้อมูลส่วนตัวไว้ที่นี่ ให้ล้างความก้าวหน้าบนเครื่องนั้น",
  },
  {
    title: "Delete your data",
    body: "On the Lessons page, choose “Start progress over” to erase XP, streaks, cards, and the rest of the class record on this device. You can also clear this site's data in your browser settings. Deleting it on one device does not affect another device.",
    th: "ที่หน้า Lessons เลือก “Start progress over” เพื่อลบ XP สตรีค การ์ด และบันทึกคลาสบนเครื่องนี้ หรือล้างข้อมูลเว็บไซต์นี้ในการตั้งค่าเบราว์เซอร์ การลบบนเครื่องหนึ่งไม่มีผลกับอีกเครื่อง",
  },
  {
    title: "Changes and contact",
    body: "If this policy changes, the date at the top of this page will change. Questions about privacy can be sent to the developer email shown on the Kru Thee page in Google Play.",
    th: "ถ้านโยบายนี้เปลี่ยน วันที่ด้านบนหน้านี้จะเปลี่ยน คำถามเรื่องความเป็นส่วนตัวส่งได้ที่อีเมลผู้พัฒนาบนหน้าครูธีใน Google Play",
    line: "Developer: Tanwi Tembe Tembeng, tttanwi@gmail.com",
  },
];

function PrivacyPage() {
  return (
    <article className="mx-auto flex w-full max-w-xl flex-col gap-4">
      <header className="flex items-center gap-4">
        <img src={PORTRAIT} alt="Kru Thee" className="size-16 shrink-0 rounded-2xl object-cover" />
        <div>
          <p className="text-sm font-medium text-lacquer">Kru Thee · English class</p>
          <h1 className="font-display text-4xl">Privacy</h1>
          <p className="mt-1 text-sm text-muted">Updated 25 October 2026</p>
        </div>
      </header>
      {sections.map((section) => (
        <section key={section.title} className="card flex flex-col gap-2 p-5">
          <h2 className="font-display text-2xl">{section.title}</h2>
          <p>{section.body}</p>
          <p lang="th" className="text-sm text-muted">
            {section.th}
          </p>
          {"line" in section && section.line ? (
            <p>
              Developer: Tanwi Tembe Tembeng,{" "}
              <a className="underline underline-offset-2" href="mailto:tttanwi@gmail.com">
                tttanwi@gmail.com
              </a>
            </p>
          ) : null}
        </section>
      ))}
      <p>
        <Link to="/" className="text-sm text-muted underline-offset-2 hover:underline">
          Back home
        </Link>
      </p>
    </article>
  );
}
