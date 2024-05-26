'use client';

import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { Copy } from 'lucide-react';

function dialogButton() {
  const params = useParams<{ route: string }>();
  return (
    <div className="flex justify-center mt-7">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-lg" size="lg" variant="secondary">
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            // TODO add Input OTP and qrcode
            <DialogTitle></DialogTitle>
            <DialogDescription>
              Copy your text from any device using this
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="link"
            className="flex items-center justify-center text-4xl">
            <h1>{params.route}</h1>
          </Button>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default dialogButton;
