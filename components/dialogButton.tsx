'use client';

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

import { useState, useEffect } from 'react';

function dialogButton({ buttonText, route, text }: any) {
  const [error, setError] = useState(null);
  const clickHandler = () => {
    useEffect(() => {
      const postData = async () => {
        try {
          const response = await fetch(`/api/${route}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(text),
          });
          console.log(response);
        } catch (err: any) {
          setError(err.message);
        }
      };
    }, []);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg" size="lg" onClick={clickHandler}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* // TODO add Input OTP and qrcode */}
          <DialogTitle></DialogTitle>
          <DialogDescription>
            Copy your text from any device using this
          </DialogDescription>
        </DialogHeader>
        <h1 className="flex items-center justify-center text-4xl">
          <p>{route}</p>
        </h1>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default dialogButton;
