import dynamic from 'next/dynamic';
const ModeToggle = dynamic(() => import('@/components/modeToggle'), {
  ssr: false,
});

import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="mt-8">
      <div className="flex items-center justify-between mx-4">
        <Button variant="outline" size="icon">
          <Github />
        </Button>
        <h1 className="text-3xl font-bold">CrossCopy</h1>
        <ModeToggle />
      </div>
    </nav>
  );
}
