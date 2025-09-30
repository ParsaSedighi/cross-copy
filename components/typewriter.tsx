import { useEffect, useState, useMemo } from "react";

interface TypewriterProps {
  texts: string | string[];
  typingSpeed?: number; // ms per letter
  deletingSpeed?: number; // ms per letter
  delayBetween?: number; // ms to wait before deleting
  cursor?: boolean; // blinking cursor
  className?: string;
  style?: React.CSSProperties;
}

export const Typewriter = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 1500,
  cursor = true,
  className,
  style,
}: TypewriterProps) => {
  const textArray = useMemo(
    () => (Array.isArray(texts) ? texts : [texts]),
    [texts]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentText = textArray[currentIndex];

    if (!isDeleting && displayText.length < currentText.length) {
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayText.length === currentText.length) {
      if (currentIndex < textArray.length - 1) {
        timer = setTimeout(() => setIsDeleting(true), delayBetween);
      }
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentIndex((i) => i + 1);
    }

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    currentIndex,
    textArray,
    typingSpeed,
    deletingSpeed,
    delayBetween,
  ]);

  return (
    <span className={className} style={style}>
      {displayText}
      {cursor && <span className="animate-pulse">|</span>}
    </span>
  );
};
