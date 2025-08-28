"use client";

import { LogOut, Menu, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { TypewriterTwoText } from "./typewriterTwoText";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ToggleThemeText } from "@/components/toggleTheme";

const MotionButton = motion.create(Button);
const dropdownVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
} as const;

export default function Navbar({
  className,
  username,
}: {
  className?: string;
  username?: string;
}) {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This code only runs in the browser, after the component has mounted.
    const hasSeenAnimation = sessionStorage.getItem("hasSeenWelcomeAnimation");

    // If the user hasn't seen the animation yet in this session...
    if (!hasSeenAnimation) {
      // ...update the state to trigger the animation.
      setPlayAnimation(true);
      // And save to sessionStorage so it doesn't play again.
      sessionStorage.setItem("hasSeenWelcomeAnimation", "true");
    }
  }, []); // The empty array [] ensures this effect runs only once.

  return (
    <nav className={cn(className, "mx-4 mt-4")}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <MotionButton className="min-w-36" variant="secondary" layout>
              {playAnimation ? (
                <TypewriterTwoText
                  text1={`Welcome ${username}!`}
                  text2="CrossCopy"
                />
              ) : (
                "CrossCopy"
              )}
            </MotionButton>
          </Link>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsOpen(!isOpen);
            }}>
            <Menu size={16} />
          </Button>
        </div>
      </div>
      <motion.div
        className="mt-4"
        style={{ transformOrigin: "top" }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={dropdownVariants}>
        <div className="flex flex-col border rounded-lg w-full h-full">
          <Button variant="ghost">
            <User2 />
            Change Username
          </Button>
          <ToggleThemeText />
          <Button variant="ghost">
            <LogOut />
            Logout
          </Button>
        </div>
      </motion.div>
    </nav>
  );
}
