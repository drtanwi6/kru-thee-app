export type Vocab = {
  id: string;
  en: string;
  th: string;
  say: string;
  example: string;
  exampleTh: string;
  note?: string;
  noteTh?: string;
};

export type ChoiceQ = {
  kind: "choice" | "listen";
  id: string;
  prompt: string;
  say?: string;
  options: string[];
  answer: number;
  why: string;
  whyTh?: string;
};

export type FillQ = {
  kind: "fill";
  id: string;
  prompt: string;
  answer: string;
  accept: string[];
  why: string;
  whyTh?: string;
};

export type Question = ChoiceQ | FillQ;

export type Lesson = {
  id: string;
  title: string;
  titleTh: string;
  blurb: string;
  minutes: number;
  level: string;
  intro: string;
  introTh?: string;
  vocab: Vocab[];
  questions: Question[];
};

export const PORTRAIT = "/images/kru-thee.jpg";

export const lessons: Lesson[] = [
  {
    id: "hellos",
    title: "First hellos",
    titleTh: "ทักทายครั้งแรก",
    blurb: "Meet someone without freezing. Polite, short, and human.",
    minutes: 6,
    level: "Starter",
    intro:
      "Today we greet people. In Thai, ขอโทษ can mean both sorry and excuse me. English splits them. Learn the split and the rest of a hello gets easy.",
    introTh:
      "วันนี้เราทักทายคน ในภาษาไทย ขอโทษ ใช้ได้ทั้ง sorry และ excuse me แต่ภาษาอังกฤษแยกกัน จำข้อนี้ไว้ ทักทายจะง่ายขึ้น",
    vocab: [
      {
        id: "meet",
        en: "Nice to meet you",
        th: "ยินดีที่ได้รู้จัก",
        say: "nahys tuh MEET yoo",
        example: "Nice to meet you. I'm Mali.",
        exampleTh: "ยินดีที่ได้รู้จัก ฉันชื่อมะลิ",
        note: "Stress MEET. On a first hello, reply with “Nice to meet you too.”",
        noteTh: "เน้นเสียง MEET ตอนเจอครั้งแรก ตอบว่า “Nice to meet you too.”",
      },
      {
        id: "how-are-you",
        en: "How are you?",
        th: "สบายดีไหม",
        say: "how ar yoo",
        example: "How are you today?",
        exampleTh: "วันนี้สบายดีไหม",
      },
      {
        id: "im-good",
        en: "I'm good, thanks",
        th: "สบายดี ขอบคุณ",
        say: "aim good thangs",
        example: "I'm good, thanks. How about you?",
        exampleTh: "สบายดี ขอบคุณ แล้วคุณล่ะ",
        note: "“Thanks” starts with a soft th. Put your tongue on your teeth — not a ซ sound.",
        noteTh: "คำว่า thanks ขึ้นต้นด้วยเสียง th อ่อน เอาลิ้นแตะฟัน ไม่ใช่เสียง ซ",
      },
      {
        id: "please",
        en: "Please",
        th: "คำสุภาพ วางท้ายประโยค",
        say: "pleez",
        example: "A coffee, please.",
        exampleTh: "ขอกาแฟหนึ่งแก้ว",
        note: "Park it at the end. It does more work than a long apology.",
        noteTh: "วางท้ายประโยค สุภาพกว่าการขอโทษยาวๆ",
      },
      {
        id: "excuse",
        en: "Excuse me",
        th: "ขอโทษ (เรียก หรือ ขอทาง)",
        say: "ik-SKYOOZ mee",
        example: "Excuse me, is this seat free?",
        exampleTh: "ขอโทษ ที่นั่งนี้ว่างไหม",
        note: "Use excuse me to get attention or to pass. Use sorry after you already caused a problem.",
        noteTh: "ใช้ excuse me ตอนเรียกหรือขอทาง ใช้ sorry ตอนที่ทำผิดไปแล้ว",
      },
      {
        id: "see-you",
        en: "See you later",
        th: "แล้วเจอกัน",
        say: "see yoo LAY-ter",
        example: "See you later. Have a good day.",
        exampleTh: "แล้วเจอกัน ขอให้เป็นวันที่ดี",
      },
    ],
    questions: [
      {
        kind: "choice",
        id: "h1",
        prompt: "A classmate says “Nice to meet you.” You say…",
        options: [
          "Nice to meet you too.",
          "I'm fine, thank you.",
          "Excuse me, the bill.",
          "Turn left, please.",
        ],
        answer: 0,
        why: "Mirror the greeting. “I'm fine” answers “How are you?”, not a first introduction.",
        whyTh: "ตอบทักทายกลับ “I'm fine” ใช้ตอบ “How are you?” ไม่ใช่ตอนเจอครั้งแรก",
      },
      {
        kind: "choice",
        id: "h2",
        prompt: "You need people to make space on a crowded train.",
        options: ["Excuse me.", "Sorry I'm bored.", "Nice to meet you.", "I'd like a coffee."],
        answer: 0,
        why: "Excuse me asks for space. Sorry is for a mistake you already made. Thai ขอโทษ covers both — English does not.",
        whyTh: "Excuse me คือขอทาง Sorry คือทำผิดไปแล้ว ภาษาไทยใช้ ขอโทษ ทั้งสองแบบ ภาษาอังกฤษไม่ใช่",
      },
      {
        kind: "fill",
        id: "h3",
        prompt: "Nice to ____ you.",
        answer: "meet",
        accept: ["meet"],
        why: "The chunk is “Nice to meet you.” Learn it as one piece, not three separate words.",
        whyTh: "ประโยคนี้คือ “Nice to meet you.” จำทั้งก้อน ไม่ต้องแยกทีละคำ",
      },
      {
        kind: "listen",
        id: "h4",
        prompt: "What did you hear?",
        say: "See you later.",
        options: ["See you later.", "Thank you.", "How are you?", "I'm good, thanks."],
        answer: 0,
        why: "“See you later” closes a conversation. It is a goodbye, not a thank-you.",
        whyTh: "“See you later” ใช้ปิดบทสนทนา เป็นคำลา ไม่ใช่คำขอบคุณ",
      },
    ],
  },
  {
    id: "cafe",
    title: "At the café",
    titleTh: "ที่ร้านกาแฟ",
    blurb: "Order one cup without disappearing the word a.",
    minutes: 7,
    level: "Starter",
    intro:
      "Thai has no a or an. English cafés live on them. “A coffee” means one cup. “I'd like” is softer than “I want.” That is the whole class.",
    introTh:
      "ภาษาไทยไม่มี a หรือ an แต่ที่ร้านกาแฟภาษาอังกฤษใช้บ่อย “A coffee” แปลว่าหนึ่งแก้ว “I'd like” นุ่มกว่า “I want” แค่นี้ก็พอ",
    vocab: [
      {
        id: "id-like",
        en: "I'd like…",
        th: "ฉันขอ… (สุภาพ)",
        say: "eyed like",
        example: "I'd like a latte, please.",
        exampleTh: "ขอลัตเต้หนึ่งแก้ว",
        note: "I'd sounds like “eyed”. It is I would — a polite want.",
        noteTh: "I'd ออกเสียงคล้าย “eyed” มาจาก I would เป็นการขอแบบสุภาพ",
      },
      {
        id: "a-coffee",
        en: "a coffee",
        th: "กาแฟหนึ่งแก้ว",
        say: "uh KOF-ee",
        example: "Can I have a coffee?",
        exampleTh: "ขอกาแฟได้ไหม",
        note: "A means one serving. Don't skip it. Stress the first part: KOF-ee.",
        noteTh: "A แปลว่าหนึ่งแก้ว อย่าข้าม เน้นพยางค์แรก: KOF-ee",
      },
      {
        id: "for-here",
        en: "For here",
        th: "ทานที่ร้าน",
        say: "for heer",
        example: "For here, please.",
        exampleTh: "ทานที่ร้านค่ะ/ครับ",
      },
      {
        id: "to-go",
        en: "To go",
        th: "ใส่กลับบ้าน",
        say: "tuh goh",
        example: "An iced tea to go, please.",
        exampleTh: "ชาเย็นใส่กลับบ้าน",
        note: "To go means you are leaving with it. For here means you sit.",
        noteTh: "To go คือเอาไป For here คือนั่งทานที่ร้าน",
      },
      {
        id: "the-bill",
        en: "the bill",
        th: "บิล",
        say: "thuh bil",
        example: "Can I have the bill, please?",
        exampleTh: "ขอบิลได้ไหม",
      },
      {
        id: "how-much",
        en: "How much is it?",
        th: "ราคาเท่าไหร่",
        say: "how much iz it",
        example: "How much is it?",
        exampleTh: "ราคาเท่าไหร่",
        note: "Much is for price and amounts you don't count one by one. Many is for separate things: how many cups.",
        noteTh: "Much ใช้กับราคา หรือจำนวนที่นับทีละชิ้นไม่ได้ Many ใช้กับของที่นับได้ เช่น how many cups",
      },
    ],
    questions: [
      {
        kind: "choice",
        id: "c1",
        prompt: "Which order sounds natural?",
        options: [
          "I'd like a coffee, please.",
          "I want coffee.",
          "Coffee give me.",
          "I am coffee.",
        ],
        answer: 0,
        why: "“I'd like a coffee, please” is the café sentence. A means one cup. Please sits at the end.",
        whyTh: "“I'd like a coffee, please” คือประโยคสั่งที่ร้าน A แปลว่าหนึ่งแก้ว Please อยู่ท้ายประโยค",
      },
      {
        kind: "choice",
        id: "c2",
        prompt: "You will drink it in the shop.",
        options: ["For here, please.", "To go, please.", "Excuse me, I'm late.", "Turn right."],
        answer: 0,
        why: "For here = you stay. To go = you leave with the drink.",
        whyTh: "For here คืออยู่ทาน To go คือเอาเครื่องดื่มไป",
      },
      {
        kind: "fill",
        id: "c3",
        prompt: "How ____ is it?",
        answer: "much",
        accept: ["much"],
        why: "Price uses much. “How many” is for things you can count: how many spoons.",
        whyTh: "ราคาใช้ much “How many” ใช้กับของที่นับได้ เช่น how many spoons",
      },
      {
        kind: "listen",
        id: "c4",
        prompt: "What did you hear?",
        say: "Can I have the bill?",
        options: [
          "Can I have the bill?",
          "Where is the station?",
          "I have a meeting.",
          "Nice to meet you.",
        ],
        answer: 0,
        why: "“The bill” is the paper with the price. Can I have…? is a soft way to ask.",
        whyTh: "“The bill” คือกระดาษบอกราคา Can I have…? เป็นการขอแบบนุ่มนวล",
      },
    ],
  },
  {
    id: "around",
    title: "Getting around",
    titleTh: "เดินทาง",
    blurb: "Ask for a place without saying “where is go”.",
    minutes: 7,
    level: "Everyday",
    intro:
      "“Where is go Siam?” is a famous calque. It isn't English. A place you can point at uses “Where is…?” A route uses “How do I get to…?”",
    introTh:
      "“Where is go Siam?” เป็นประโยคแปลตรงจากไทย ไม่ใช่ภาษาอังกฤษ สถานที่ที่ชี้ได้ใช้ “Where is…?” ถามทางใช้ “How do I get to…?”",
    vocab: [
      {
        id: "where-is",
        en: "Where is…?",
        th: "…อยู่ที่ไหน",
        say: "wair iz",
        example: "Where is the station?",
        exampleTh: "สถานีอยู่ที่ไหน",
      },
      {
        id: "get-to",
        en: "How do I get to…?",
        th: "ไป…ยังไง",
        say: "how doo eye get too",
        example: "How do I get to Siam?",
        exampleTh: "ไปสยามยังไง",
        note: "This asks for the route. Not “Where is go.”",
        noteTh: "ประโยคนี้ถามทาง ไม่ใช่ “Where is go.”",
      },
      {
        id: "turn-left",
        en: "Turn left",
        th: "เลี้ยวซ้าย",
        say: "turn left",
        example: "Turn left at the corner.",
        exampleTh: "เลี้ยวซ้ายตรงหัวมุม",
      },
      {
        id: "go-straight",
        en: "Go straight",
        th: "ตรงไป",
        say: "goh strayt",
        example: "Go straight for two blocks.",
        exampleTh: "ตรงไปสองช่วงตึก",
      },
      {
        id: "near",
        en: "It's near…",
        th: "อยู่ใกล้…",
        say: "its neer",
        example: "It's near the park.",
        exampleTh: "อยู่ใกล้สวน",
      },
      {
        id: "it-takes",
        en: "It takes…",
        th: "ใช้เวลา…",
        say: "it tayks",
        example: "It takes about ten minutes.",
        exampleTh: "ใช้เวลาประมาณสิบนาที",
        note: "It takes + time. The “it” doesn't point at a person. It points at the trip.",
        noteTh: "It takes ตามด้วยเวลา it ไม่ได้ชี้คน แต่ชี้การเดินทาง",
      },
    ],
    questions: [
      {
        kind: "choice",
        id: "a1",
        prompt: "You are lost and need the route to Siam.",
        options: [
          "How do I get to Siam?",
          "Where is go Siam?",
          "Siam is go where?",
          "I go Siam?",
        ],
        answer: 0,
        why: "English doesn't say “where is go”. Use “How do I get to…?” for directions.",
        whyTh: "ภาษาอังกฤษไม่พูด “where is go” ถามทางใช้ “How do I get to…?”",
      },
      {
        kind: "choice",
        id: "a2",
        prompt: "The museum is beside the park. You tell a friend…",
        options: ["It's near the park.", "It's a bit the park.", "I prefer the park.", "Sorry the park."],
        answer: 0,
        why: "Near places one thing beside another. “It's” is “it is” — the museum is near the park.",
        whyTh: "Near คืออยู่ใกล้กัน “It's” มาจาก it is พิพิธภัณฑ์อยู่ใกล้สวน",
      },
      {
        kind: "fill",
        id: "a3",
        prompt: "____ left at the corner.",
        answer: "Turn",
        accept: ["turn", "Turn"],
        why: "Direction verbs stand alone: Turn left. Go straight. Turn right.",
        whyTh: "คำบอกทางยืนได้เอง: Turn left. Go straight. Turn right.",
      },
      {
        kind: "listen",
        id: "a4",
        prompt: "What did you hear?",
        say: "It takes about ten minutes.",
        options: [
          "It takes about ten minutes.",
          "The coffee is ten baht.",
          "Please turn left.",
          "I have a meeting.",
        ],
        answer: 0,
        why: "It takes about + time tells you the length of the trip.",
        whyTh: "It takes about ตามด้วยเวลา บอกว่าเดินทางนานแค่ไหน",
      },
    ],
  },
  {
    id: "work",
    title: "At work",
    titleTh: "ที่ทำงาน",
    blurb: "Be late, ask softly, and promise to reply.",
    minutes: 7,
    level: "Everyday",
    intro:
      "Office English is mostly small doors. “Could you…?” opens one. “I'll get back to you” closes one without vanishing. Sorry is for the times you are actually late.",
    introTh:
      "ภาษาอังกฤษที่ทำงานคือประตูเล็กๆ “Could you…?” เปิดประตู “I'll get back to you” ปิดประตูโดยไม่หายไป Sorry ใช้ตอนมาสายจริงๆ",
    vocab: [
      {
        id: "sorry-late",
        en: "Sorry I'm late",
        th: "ขอโทษที่มาสาย",
        say: "SOR-ee aim layt",
        example: "Sorry I'm late. The train was slow.",
        exampleTh: "ขอโทษที่มาสาย รถไฟฟ้าช้า",
        note: "You already arrived late, so this is sorry — not excuse me.",
        noteTh: "คุณมาสายแล้ว ดังนั้นใช้ sorry ไม่ใช่ excuse me",
      },
      {
        id: "meeting",
        en: "I have a meeting",
        th: "ฉันมีประชุม",
        say: "eye hav uh MEE-ting",
        example: "I have a meeting at three.",
        exampleTh: "ฉันมีประชุมตอนสามโมง",
        note: "A meeting — one meeting. Don't drop the a.",
        noteTh: "A meeting คือประชุมหนึ่งครั้ง อย่าลืม a",
      },
      {
        id: "could-you",
        en: "Could you send…?",
        th: "ส่ง…ให้ได้ไหม",
        say: "kood yoo send",
        example: "Could you send me the file?",
        exampleTh: "ส่งไฟล์ให้ฉันได้ไหม",
        note: "Could you…? is softer than “Send me.” Use it with people you respect and people you don't want to push.",
        noteTh: "Could you…? นุ่มกว่า “Send me.” ใช้กับคนที่เราให้เกียรติ หรือไม่อยากเร่ง",
      },
      {
        id: "get-back",
        en: "I'll get back to you",
        th: "เดี๋ยวฉันติดต่อกลับ",
        say: "aisle get bak tuh yoo",
        example: "I'll get back to you this afternoon.",
        exampleTh: "เดี๋ยวฉันติดต่อกลับช่วงบ่าย",
      },
      {
        id: "schedule",
        en: "Let's schedule a call",
        th: "นัดคุยกัน",
        say: "lets SKED-yool uh kawl",
        example: "Let's schedule a call for Friday.",
        exampleTh: "นัดคุยกันวันศุกร์",
      },
      {
        id: "sounds-good",
        en: "Sounds good",
        th: "ฟังดูดี / ได้เลย",
        say: "sowndz good",
        example: "Friday at ten? Sounds good.",
        exampleTh: "ศุกร์สิบโมงไหม ได้เลย",
      },
    ],
    questions: [
      {
        kind: "choice",
        id: "w1",
        prompt: "You walk in after the meeting started.",
        options: [
          "Sorry I'm late.",
          "Excuse me, to go.",
          "I'd like a deadline.",
          "Nice to meet you too.",
        ],
        answer: 0,
        why: "The lateness already happened. That is an apology: sorry. Excuse me is for passing someone.",
        whyTh: "มาสายไปแล้ว นี่คือการขอโทษ: sorry Excuse me ใช้ตอนขอทาง",
      },
      {
        kind: "choice",
        id: "w2",
        prompt: "You need time before you answer an email.",
        options: [
          "I'll get back to you.",
          "I bored the email.",
          "Give me coffee now.",
          "Where is go?",
        ],
        answer: 0,
        why: "“I'll get back to you” promises a later reply. It is professional and clear.",
        whyTh: "“I'll get back to you” คือสัญญาว่าจะตอบทีหลัง ชัดและสุภาพ",
      },
      {
        kind: "fill",
        id: "w3",
        prompt: "Could you ____ me the file?",
        answer: "send",
        accept: ["send"],
        why: "Could you + verb is a polite request. The verb stays in its simple form: send, not sending.",
        whyTh: "Could you ตามด้วยคำกริยา คือคำขอสุภาพ กริยาอยู่รูปธรรมดา: send ไม่ใช่ sending",
      },
      {
        kind: "listen",
        id: "w4",
        prompt: "What did you hear?",
        say: "Let's schedule a call.",
        options: [
          "Let's schedule a call.",
          "Can I have the bill?",
          "Turn right.",
          "I'm a coffee.",
        ],
        answer: 0,
        why: "Schedule a call means pick a time to talk. Let's invites the other person in.",
        whyTh: "Schedule a call คือนัดเวลาคุย Let's คือชวนอีกคนมาด้วย",
      },
    ],
  },
  {
    id: "opinions",
    title: "Opinions & feelings",
    titleTh: "ความเห็นและความรู้สึก",
    blurb: "I'm tired. I really like it. Two tiny fixes, huge difference.",
    minutes: 7,
    level: "Everyday",
    intro:
      "Two calques do most of the damage. “I tired” needs a verb: I'm tired. “I very like” is not English: I really like. Very sits on adjectives. Really sits on verbs.",
    introTh:
      "สองประโยคแปลตรงทำให้ผิดบ่อย “I tired” ต้องมีกริยา: I'm tired. “I very like” ไม่ใช่ภาษาอังกฤษ พูดว่า I really like. Very วางหน้าคำคุณศัพท์ Really วางหน้าคำกริยา",
    vocab: [
      {
        id: "i-think",
        en: "I think…",
        th: "ฉันคิดว่า…",
        say: "eye think",
        example: "I think the blue one is better.",
        exampleTh: "ฉันคิดว่าอันสีน้ำเงินดีกว่า",
      },
      {
        id: "prefer",
        en: "I prefer…",
        th: "ฉันชอบ…มากกว่า",
        say: "eye pree-FER",
        example: "I prefer tea.",
        exampleTh: "ฉันชอบชามากกว่า",
        note: "Prefer already means like more, so don't add more. Say I prefer tea, not I more prefer tea.",
        noteTh: "Prefer แปลว่าชอบมากกว่าอยู่แล้ว อย่าเติม more พูดว่า I prefer tea ไม่ใช่ I more prefer tea.",
      },
      {
        id: "a-bit",
        en: "a bit",
        th: "นิดหน่อย",
        say: "uh bit",
        example: "I'm a bit tired.",
        exampleTh: "ฉันเหนื่อยนิดหน่อย",
        note: "Adjectives need am/is/are. I'm a bit tired. Not “I bit tired.”",
        noteTh: "คำคุณศัพท์ต้องมี am/is/are พูด I'm a bit tired. ไม่ใช่ “I bit tired.”",
      },
      {
        id: "really",
        en: "really",
        th: "จริงๆ (วางหน้าคำกริยา)",
        say: "REE-uh-lee",
        example: "I really like mango.",
        exampleTh: "ฉันชอบมะม่วงมาก",
        note: "I really like it. I'm very tired. Really + verb. Very + adjective.",
        noteTh: "I really like it. I'm very tired. Really วางหน้าคำกริยา Very วางหน้าคำคุณศัพท์",
      },
      {
        id: "actually",
        en: "Actually",
        th: "จริงๆ แล้ว",
        say: "AK-choo-uh-lee",
        example: "Actually, I prefer the window seat.",
        exampleTh: "จริงๆ แล้ว ฉันอยากได้นั่งริมหน้าต่าง",
        note: "Actually gently corrects or adds a surprise. It does not mean “now” or “currently”.",
        noteTh: "Actually ใช้แก้คำพูดเบาๆ หรือบอกเรื่องที่น่าแปลกใจ ไม่ได้แปลว่า “ตอนนี้”",
      },
      {
        id: "depends",
        en: "It depends",
        th: "แล้วแต่",
        say: "it dee-PENDZ",
        example: "It depends on the weather.",
        exampleTh: "แล้วแต่อากาศ",
      },
    ],
    questions: [
      {
        kind: "choice",
        id: "o1",
        prompt: "Which sentence is correct?",
        options: ["I'm a bit tired.", "I bit tired.", "I very tired.", "I tired a bit."],
        answer: 0,
        why: "Tired is an adjective, so it needs am: I'm tired. A bit softens it.",
        whyTh: "Tired เป็นคำคุณศัพท์ ต้องมี am: I'm tired. A bit ทำให้ดูเบาลง",
      },
      {
        kind: "choice",
        id: "o2",
        prompt: "You want tea, not coffee.",
        options: ["I prefer tea.", "I very like tea than.", "Tea is excuse me.", "I am prefer."],
        answer: 0,
        why: "Prefer already compares. “I prefer tea” is complete. Very does not sit on like.",
        whyTh: "Prefer เปรียบเทียบอยู่แล้ว “I prefer tea” จบประโยคได้ Very ไม่วางหน้า like",
      },
      {
        kind: "fill",
        id: "o3",
        prompt: "I ____ like night markets.",
        answer: "really",
        accept: ["really"],
        why: "Really before a verb: I really like. Very before an adjective: very crowded.",
        whyTh: "Really วางหน้าคำกริยา: I really like. Very วางหน้าคำคุณศัพท์: very crowded.",
      },
      {
        kind: "listen",
        id: "o4",
        prompt: "What did you hear?",
        say: "It depends.",
        options: ["It depends.", "I'll take it.", "Turn left.", "See you later."],
        answer: 0,
        why: "It depends means the answer changes with the situation. Short, and very useful.",
        whyTh: "It depends แปลว่าคำตอบเปลี่ยนตามสถานการณ์ สั้น และใช้บ่อย",
      },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    titleTh: "ซื้อของ",
    blurb: "Ask the price, try it on, and leave with a receipt.",
    minutes: 7,
    level: "Confident",
    intro:
      "Shops reward short sentences. “How much is this?” “Can I try it on?” “I'll take it.” If it costs more than you want, “too expensive” is the honest line — too means more than you want, not just very.",
    introTh:
      "ที่ร้าน ใช้ประโยคสั้นๆ “How much is this?” “Can I try it on?” “I'll take it.” ถ้าราคาเกินที่อยากจ่าย พูด “too expensive” Too แปลว่ามากเกิน ไม่ใช่แค่ very",
    vocab: [
      {
        id: "how-much-this",
        en: "How much is this?",
        th: "อันนี้ราคาเท่าไหร่",
        say: "how much iz this",
        example: "How much is this shirt?",
        exampleTh: "เสื้อตัวนี้ราคาเท่าไหร่",
      },
      {
        id: "do-you-have",
        en: "Do you have…?",
        th: "มี…ไหม",
        say: "doo yoo hav",
        example: "Do you have this in medium?",
        exampleTh: "มีไซส์กลางไหม",
      },
      {
        id: "too-expensive",
        en: "too expensive",
        th: "แพงไป",
        say: "too ik-SPEN-siv",
        example: "It's too expensive for me.",
        exampleTh: "แพงไปสำหรับฉัน",
        note: "It's too expensive. You need is. Too means over the line. Very expensive is only a description.",
        noteTh: "พูด It's too expensive. ต้องมี is. Too คือเกินเส้น Very expensive เป็นแค่คำบรรยาย",
      },
      {
        id: "try-on",
        en: "try it on",
        th: "ขอลอง",
        say: "try it on",
        example: "Can I try it on?",
        exampleTh: "ขอลองได้ไหม",
        note: "The on stays. Clothes use try on. Food does not.",
        noteTh: "คำว่า on ต้องอยู่ เสื้อผ้าใช้ try on อาหารไม่ใช้",
      },
      {
        id: "ill-take",
        en: "I'll take it",
        th: "เอาอันนี้",
        say: "aisle tayk it",
        example: "I'll take it.",
        exampleTh: "เอาอันนี้",
        note: "Said now, about this item. I'll is I will — a decision in the moment.",
        noteTh: "พูดตอนนี้ เกี่ยวกับชิ้นนี้ I'll คือ I will คือการตัดสินใจตอนนี้",
      },
      {
        id: "receipt",
        en: "a receipt",
        th: "ใบเสร็จ",
        say: "uh ruh-SEET",
        example: "Could I have a receipt?",
        exampleTh: "ขอใบเสร็จได้ไหม",
        note: "Receipt stresses the second part: ruh-SEET. The p is silent.",
        noteTh: "Receipt เน้นพยางค์หลัง: ruh-SEET ตัว p ไม่ออกเสียง",
      },
    ],
    questions: [
      {
        kind: "choice",
        id: "s1",
        prompt: "The price is higher than you will pay.",
        options: [
          "It's too expensive.",
          "It too expensive.",
          "I very expensive.",
          "Expensive is me.",
        ],
        answer: 0,
        why: "It's = it is. Too expensive means over your limit, so you probably won't buy it.",
        whyTh: "It's คือ it is Too expensive แปลว่าเกินงบ เลยอาจไม่ซื้อ",
      },
      {
        kind: "choice",
        id: "s2",
        prompt: "You decided to buy this one.",
        options: [
          "I'll take it.",
          "I take it yesterday.",
          "Excuse me the size.",
          "I'm a receipt.",
        ],
        answer: 0,
        why: "“I'll take it” is the buying sentence, said now. Yesterday would need a past tense — not this moment.",
        whyTh: "“I'll take it” คือประโยคซื้อ พูดตอนนี้ เมื่อวานต้องใช้รูปอดีต ไม่ใช่ตอนนี้",
      },
      {
        kind: "fill",
        id: "s3",
        prompt: "Can I try it ____?",
        answer: "on",
        accept: ["on"],
        why: "Clothes take “try it on”. The on is part of the phrase, not extra.",
        whyTh: "เสื้อผ้าใช้ “try it on” คำว่า on เป็นส่วนหนึ่งของวลี ไม่ใช่คำเกิน",
      },
      {
        kind: "listen",
        id: "s4",
        prompt: "What did you hear?",
        say: "Do you take cards?",
        options: [
          "Do you take cards?",
          "Where is the station?",
          "I'm a bit tired.",
          "Turn left.",
        ],
        answer: 0,
        why: "“Do you take cards?” asks if you can pay by card. Take here means accept.",
        whyTh: "“Do you take cards?” ถามว่าจ่ายด้วยบัตรได้ไหม Take ในที่นี้แปลว่ารับ",
      },
    ],
  },
  {
    id: "family",
    title: "Family and friends",
    titleTh: "ครอบครัวและเพื่อน",
    blurb: "Introduce the people who matter, in clear and natural English.",
    minutes: 7,
    level: "Confident",
    intro:
      "Thai has พี่ and น้อง built into the word. English adds a word in front: older sister, younger brother. Learn that small habit and you can introduce anyone in your life.",
    introTh:
      "ภาษาไทยมี พี่ และ น้อง อยู่ในคำอยู่แล้ว ภาษาอังกฤษเติมคำข้างหน้า เช่น older sister, younger brother รู้นิสัยเล็กๆ นี้ก็แนะนำคนใกล้ตัวได้ทุกคน",
    vocab: [
      {
        id: "this-is-my",
        en: "This is my…",
        th: "นี่คือ… ของฉัน",
        say: "this iz my",
        example: "This is my sister, Nok.",
        exampleTh: "นี่คือน้องสาวของฉัน นก",
      },
      {
        id: "how-many-people",
        en: "How many people are in your family?",
        th: "ครอบครัวคุณมีกี่คน",
        say: "how MEN-ee PEE-pul ar in yor FAM-uh-lee",
        example: "How many people are in your family?",
        exampleTh: "ครอบครัวคุณมีกี่คน",
        note: "People is already plural. Say “people are”, never “peoples are”.",
        noteTh: "People เป็นพหูพจน์อยู่แล้ว พูดว่า “people are” ไม่ต้องเติม s",
      },
      {
        id: "older-sister",
        en: "older sister",
        th: "พี่สาว",
        say: "OHL-der SIS-ter",
        example: "My older sister lives in Chiang Mai.",
        exampleTh: "พี่สาวของฉันอยู่เชียงใหม่",
        note: "Say older, not old. Old is about age in years. Older compares two people.",
        noteTh: "พูดว่า older ไม่ใช่ old Old บอกอายุ Older ใช้เทียบคนสองคน",
      },
      {
        id: "younger-brother",
        en: "younger brother",
        th: "น้องชาย",
        say: "YUNG-ger BRUTH-er",
        example: "My younger brother is in Grade 6.",
        exampleTh: "น้องชายของฉันเรียนอยู่ ป.6",
      },
      {
        id: "best-friend",
        en: "best friend",
        th: "เพื่อนสนิท",
        say: "best frend",
        example: "She is my best friend.",
        exampleTh: "เธอเป็นเพื่อนสนิทของฉัน",
      },
      {
        id: "get-along",
        en: "We get along well.",
        th: "เราเข้ากันได้ดี",
        say: "wee get uh-LONG wel",
        example: "My sister and I get along well.",
        exampleTh: "ฉันกับพี่สาวเข้ากันได้ดี",
        note: "Get along means you have an easy, happy relationship.",
        noteTh: "Get along แปลว่าเข้ากันได้ดี ไม่ทะเลาะกัน",
      },
    ],
    questions: [
      {
        kind: "choice",
        id: "f1",
        prompt: "Which sentence is correct?",
        options: [
          "How many peoples are in your family?",
          "How many people are in your family?",
          "How much people are in your family?",
        ],
        answer: 1,
        why: "People is already plural, so no s. Use many with things you can count.",
        whyTh: "People เป็นพหูพจน์อยู่แล้ว ไม่ต้องเติม s และใช้ many กับสิ่งที่นับได้",
      },
      {
        kind: "choice",
        id: "f2",
        prompt: "Your sister is older than you. What do you say?",
        options: ["This is my older sister.", "This is my old sister.", "This is my sister older."],
        answer: 0,
        why: "Older goes before sister. Old talks about age. Older compares two people.",
        whyTh: "Older อยู่หน้า sister Old บอกอายุ ส่วน older ใช้เทียบคนสองคน",
      },
      {
        kind: "fill",
        id: "f3",
        prompt: "She is my best ____. (the person you trust most)",
        answer: "friend",
        accept: ["friend"],
        why: "Best friend means your closest friend.",
        whyTh: "Best friend คือเพื่อนสนิทที่สุด",
      },
      {
        kind: "listen",
        id: "f4",
        prompt: "What did you hear?",
        say: "We get along well.",
        options: ["We get along well.", "Where is the station?", "How much is this?", "See you later."],
        answer: 0,
        why: "“Get along” means you have a good relationship with someone.",
        whyTh: "“Get along” แปลว่าเข้ากันได้ดีกับใครสักคน",
      },
    ],
  },
];

export type Phrase = {
  id: string;
  en: string;
  th: string;
  tip: string;
};

export const phrases: Phrase[] = [
  {
    id: "p-meet",
    en: "Nice to meet you.",
    th: "ยินดีที่ได้รู้จัก",
    tip: "Stress MEET. Keep you light.",
  },
  {
    id: "p-good",
    en: "I'm good, thanks.",
    th: "สบายดี ขอบคุณ",
    tip: "Thanks: tongue on your teeth. Not “sanks”.",
  },
  {
    id: "p-excuse",
    en: "Excuse me.",
    th: "ขอโทษ (เรียกความสนใจ)",
    tip: "Three beats. Stress the middle: ex-CUSE me.",
  },
  {
    id: "p-coffee",
    en: "I'd like a coffee, please.",
    th: "ขอกาแฟหนึ่งแก้ว",
    tip: "I'd sounds like eyed. Don't skip a before coffee.",
  },
  {
    id: "p-much",
    en: "How much is it?",
    th: "ราคาเท่าไหร่",
    tip: "Much rhymes with touch. Stress MUCH.",
  },
  {
    id: "p-station",
    en: "Where is the station?",
    th: "สถานีอยู่ที่ไหน",
    tip: "Station is STAY-shun. Stress the start.",
  },
  {
    id: "p-left",
    en: "Turn left.",
    th: "เลี้ยวซ้าย",
    tip: "Turn rhymes with learn. Short and clear.",
  },
  {
    id: "p-late",
    en: "Sorry I'm late.",
    th: "ขอโทษที่มาสาย",
    tip: "Late rhymes with eight. Stress LATE.",
  },
  {
    id: "p-back",
    en: "I'll get back to you.",
    th: "เดี๋ยวติดต่อกลับ",
    tip: "I'll sounds like aisle. Finish back with a real k.",
  },
  {
    id: "p-tea",
    en: "I prefer tea.",
    th: "ฉันชอบชามากกว่า",
    tip: "Stress the end: pre-FER.",
  },
  {
    id: "p-too",
    en: "It's too expensive.",
    th: "แพงไป",
    tip: "Too is long. It means more than you want.",
  },
  {
    id: "p-take",
    en: "I'll take it.",
    th: "เอาอันนี้",
    tip: "I'll sounds like aisle. I'll TAKE it.",
  },
];

export const kruNotes = [
  "A coffee means one cup. The tiny word a is doing the counting.",
  "Sorry and excuse me are different. Thai uses ขอโทษ for both.",
  "If you can say I'm, your adjectives start working. I'm tired. I'm late.",
  "Could you…? is a soft door. It opens more meetings than “Send me.”",
  "Really likes verbs. Very likes adjectives. I really like it. I'm very tired.",
  "Short and polite beats long and nervous. I'd like a coffee, please.",
];

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id) ?? null;
}

export function allQuestions() {
  return lessons.flatMap((lesson) => lesson.questions);
}

export function nextLesson(completedIds: string[]) {
  return lessons.find((lesson) => !completedIds.includes(lesson.id)) ?? null;
}

export function reviewLessons(completedIds: string[]) {
  const done = lessons.filter((lesson) => completedIds.includes(lesson.id));
  return done.length > 0 ? done : lessons.slice(0, 1);
}

export function allVocab() {
  return lessons.flatMap((lesson) => lesson.vocab);
}

export function wordOfDay(iso: string) {
  const pool = allVocab();
  let n = 0;
  for (const ch of iso) n = (n * 33 + ch.charCodeAt(0)) >>> 0;
  return pool[n % pool.length];
}

export function noteOfDay(iso: string) {
  let n = 0;
  for (const ch of iso) n = (n * 17 + ch.charCodeAt(0)) >>> 0;
  return kruNotes[n % kruNotes.length];
}

export function todayISO(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return todayISO(date);
}

export function greeting(now = new Date()) {
  const h = now.getHours();
  if (h < 12) return { en: "Good morning", th: "อรุณสวัสดิ์" };
  if (h < 17) return { en: "Good afternoon", th: "สวัสดีตอนบ่าย" };
  return { en: "Good evening", th: "สวัสดีตอนเย็น" };
}

export const ranks = [
  { name: "Seed", th: "เมล็ด", min: 0 },
  { name: "Sprout", th: "ต้นอ่อน", min: 50 },
  { name: "Traveler", th: "นักเดินทาง", min: 140 },
  { name: "Conversational", th: "คุยได้", min: 280 },
  { name: "Confident", th: "คล่อง", min: 460 },
  { name: "Little teacher", th: "ครูน้อย", min: 700 },
] as const;

export function rankFor(xp: number) {
  let index = 0;
  for (let i = 0; i < ranks.length; i++) {
    if (xp >= ranks[i].min) index = i;
  }
  const current = ranks[index];
  const next = ranks[index + 1] ?? null;
  const span = next ? next.min - current.min : 1;
  const into = xp - current.min;
  const ratio = next ? Math.min(1, into / span) : 1;
  return { current, next, ratio, remaining: next ? next.min - xp : 0 };
}

export function seededOrder<T>(items: T[], seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    const j = (h >>> 0) % (i + 1);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export function drillQuestions(completedIds: string[], seed: string) {
  const pool = reviewLessons(completedIds).flatMap((lesson) => lesson.questions);
  return seededOrder(pool, seed).slice(0, Math.min(5, pool.length));
}

export function normalizeAnswer(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function similarity(heard: string, target: string) {
  const a = normalizeAnswer(heard);
  const b = normalizeAnswer(target);
  if (!a || !b) return 0;
  const d = levenshtein(a, b);
  return Math.max(0, Math.round((1 - d / Math.max(a.length, b.length)) * 100));
}

function levenshtein(a: string, b: string) {
  const prev = new Array<number>(b.length + 1);
  const cur = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}
