"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "motion/react";

const MotionSun = motion(Sun);
const MotionMoon = motion(Moon);

const sunVariants = {
  light: { scale: 1, rotate: 0 },
  dark: { scale: 0, rotate: -90 },
};

const moonVariants = {
  light: { scale: 0, rotate: 90 },
  dark: { scale: 1, rotate: 0 },
};

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20,
} as const;

export default function ToggleThemeIcon({
  className,
  iconSize,
}: {
  className?: string;
  iconSize?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleHandler = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) {
    return (
      <Button
        className={cn("", className)}
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <Button
      className={cn("", className)}
      variant="outline"
      size="icon"
      onClick={toggleHandler}>
      {theme === "light" ? (
        <Moon size={iconSize} className="transition-all" />
      ) : (
        <Sun size={iconSize} className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export function ToggleThemeText({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        className={cn("", className)}
        variant="outline"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" variant="ghost">
          <AnimatePresence initial={false} mode="wait">
            {theme === "dark" ? (
              <MotionMoon
                key="moon"
                className=""
                initial={{ y: 0, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 0, opacity: 0, rotate: 90 }}
                transition={transition}
              />
            ) : (
              <MotionSun
                key="sun"
                className=""
                initial={{ y: 0, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 0, opacity: 0, rotate: 90 }}
                transition={transition}
              />
            )}
          </AnimatePresence>
          <div>Theme</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
