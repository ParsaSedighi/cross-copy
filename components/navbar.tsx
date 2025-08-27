"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { TypewriterTwoText } from "./typewriterTwoText";
import { useEffect, useState } from "react";
import Link from "next/link";

const MotionButton = motion.create(Button);

export default function Navbar({
  className,
  username,
}: {
  className?: string;
  username?: string;
}) {
  const [playAnimation, setPlayAnimation] = useState(false);

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
          <Button variant="outline" size="icon">
            <User size={16} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
