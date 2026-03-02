import { useState, useEffect } from "react";

type TypewriterProps = {
  text?: string | number;
  speed?: number;
  placeholder?: string | number;
  loading?: boolean;
};

export function Typewriter({
  text,
  speed = 100,
  placeholder,
  loading = false,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (loading || text === undefined || text === null) {
      setDisplayed("");
      return;
    }

    const fullText = String(text);
    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      index++;
      setDisplayed(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, loading]);

  // const reserve = String(placeholder ?? text ?? "");

  return (
    <span className="relative inline-block">
      {/* invisible placeholder: preserves width/height */}
      <span aria-hidden className="invisible whitespace-nowrap mx-auto">
        {text}
      </span>
      {/* typed text sits absolutely on top of placeholder */}
      <span className="absolute top-0 left-0 whitespace-nowrap">
        {displayed}
      </span>
    </span>
  );
}
