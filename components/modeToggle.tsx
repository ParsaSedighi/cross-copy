'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ModeToggle({ className }: any) {
  const { theme, setTheme } = useTheme();

  const toggleHandler = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <Button
      className={cn('', className)}
      variant="outline"
      size="icon"
      onClick={toggleHandler}>
      {theme === 'light' ? (
        <Moon className="h-[1.5rem] w-[1.5rem] transition-all" />
      ) : (
        <Sun className="h-[1.5rem] w-[1.5rem] transition-all" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
