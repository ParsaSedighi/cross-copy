"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ModeToggle({
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
