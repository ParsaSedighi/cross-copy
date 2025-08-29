// TODO: dynamically choose one or two texts (or more...)
import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";

export const sentenceVariants = {
  hidden: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface TypewriterProps {
  text1: string;
  text2: string;
  delay?: number;
  [key: string]: any;
}
// TODO: Better name!
export const TypewriterTwoText = ({
  text1,
  text2,
  delay = 4000,
  ...rest
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState(text1);
  const controls = useAnimationControls();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      await new Promise((resolve) => setTimeout(resolve, delay));
      await controls.start("hidden");
      setDisplayText(text2);
    };
    sequence();
  }, [text1, text2, delay, controls]);

  useEffect(() => {
    if (displayText === text2) {
      controls.set("hidden");
      controls.start("visible");
    }
  }, [displayText, text2, controls]);

  return (
    <motion.span
      variants={sentenceVariants}
      initial="hidden"
      animate={controls}
      {...rest}
      style={{ display: "inline-flex" }}>
      {displayText.split("").map((char, i) => (
        <motion.span key={`${char}-${i}`} variants={letterVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};
