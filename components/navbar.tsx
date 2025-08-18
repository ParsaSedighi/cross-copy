"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { TypewriterTwoText } from "./typewriterTwoText";

const MotionButton = motion(Button);

export default function Navbar({
  className,
  username,
}: {
  className?: string;
  username?: string;
}) {
  return (
    <nav className={cn(className, "mx-4 mt-4")}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <MotionButton className="min-w-36" variant="secondary" layout>
            <TypewriterTwoText
              text1={`Welcome ${username}!`}
              text2="CrossCopy"
            />
          </MotionButton>
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
