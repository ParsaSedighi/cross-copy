import ModeToggle from '@/components/modeToggle';

import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar({className}: any) {
  return (
    <nav className={cn(className)}>
      <div className="flex items-center justify-between">
        <a target='_blank' href='https://github.com/ParsaSedighi/cross-copy' className='md:hidden'>
          <Button variant="outline" size="icon">
            <Github />
          </Button>
        </a>
        <h1 className="text-3xl font-bold">CrossCopy</h1>
        <div className='flex space-x-4'>
        <ModeToggle />
        <a target='_blank' href='https://github.com/ParsaSedighi/cross-copy' className='hidden md:block'>
          <Button variant="outline" size="icon">
            <Github />
          </Button>
        </a>
        </div>
      </div>
    </nav>
  );
}
