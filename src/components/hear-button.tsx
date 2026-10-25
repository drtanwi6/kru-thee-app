import { Volume2 } from "lucide-react";
import { speakEnglish } from "@/lib/speech";

export function HearButton({
  text,
  slow = false,
  label = "Hear it",
  ghost = true,
}: {
  text: string | string[];
  slow?: boolean;
  label?: string;
  ghost?: boolean;
}) {
  return (
    <button
      type="button"
      className={"btn " + (ghost ? "btn-ghost" : "btn-primary")}
      onClick={() => speakEnglish(text, slow)}
    >
      <Volume2 className="size-4" />
      {label}
    </button>
  );
}
