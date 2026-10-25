type Rec = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  abort: () => void;
};

type RecCtor = new () => Rec;

export function recognitionCtor(): RecCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecCtor;
    webkitSpeechRecognition?: RecCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang === "en-US") ??
    voices.find((voice) => voice.lang.startsWith("en")) ??
    null
  );
}

export function speakEnglish(text: string | string[], slow = false) {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  const lines = Array.isArray(text) ? text : [text];
  window.speechSynthesis.cancel();
  window.setTimeout(() => {
    for (const line of lines) {
      const utterance = new SpeechSynthesisUtterance(line);
      utterance.lang = "en-US";
      utterance.rate = slow ? 0.72 : 0.94;
      const voice = pickVoice();
      if (voice) utterance.voice = voice;
      window.speechSynthesis.speak(utterance);
    }
  }, 40);
  return true;
}

export function listenOnce(
  onText: (text: string) => void,
  onFail: (reason: string) => void,
) {
  const Ctor = recognitionCtor();
  if (!Ctor) {
    onFail("unavailable");
    return () => {};
  }
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = (ev) => {
    const text = ev.results[0]?.[0]?.transcript ?? "";
    onText(text);
  };
  rec.onerror = (ev) => onFail(ev.error || "error");
  rec.onend = () => {};
  try {
    rec.start();
  } catch {
    onFail("start");
  }
  return () => {
    try {
      rec.abort();
    } catch {
      /* already stopped */
    }
  };
}
