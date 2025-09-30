"use client";

import { LogOut, Menu, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ToggleThemeText } from "@/components/toggleTheme";

import { authClient } from "@/lib/auth/authClient";
import { useRouter } from "next/navigation";
import { Typewriter } from "./typewriter";

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

  const router = useRouter();

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("hasSeenWelcomeAnimation");
    // const hasSeenAnimation = false; // TEST

    if (!hasSeenAnimation) {
      setPlayAnimation(true);
      sessionStorage.setItem("hasSeenWelcomeAnimation", "true");
    }
  }, []);

  const logoutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <nav className={cn(className, "mx-4 mt-4")}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <MotionButton className="min-w-36" variant="secondary" layout>
            {playAnimation ? (
              <Typewriter
                texts={[`Welcome ${username}`, "CrossCopy"]}
                cursor={false}
                delayBetween={3000}
                typingSpeed={200}
                deletingSpeed={100}
              />
            ) : (
              "CrossCopy"
            )}
          </MotionButton>
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
          <Button variant="ghost" disabled={!isOpen}>
            <User2 />
            Change Username
          </Button>
          <ToggleThemeText disabled={!isOpen} />
          <Button onClick={logoutHandler} variant="ghost" disabled={!isOpen}>
            <LogOut />
            Logout
          </Button>
        </div>
      </motion.div>
    </nav>
  );
}
