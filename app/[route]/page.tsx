'use client';

import copy from 'copy-to-clipboard';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';
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
import Navbar from '@/components/navbar';
import { useMediaQuery } from 'usehooks-ts';

export default function Home() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [buttonText, setButtonText] = useState('Copy');
  const [taText, setTaText] = useState('');
  const [error, setError] = useState(null);
  const { route } = useParams();
  // const isDesktop = useMediaQuery("(min-width: 768px)") // TODO


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${route}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const { data } = await response.json();
        setTaText(data.text);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const handleCopy = () => {
    if (textRef) {
      copy(textRef.current?.value!);
      setButtonText('Copied!');
      setTimeout(() => {
        setButtonText('Copy');
      }, 2000);
    }
  };

  const handleShare = async () => {
    if (taText) {
      try {
        const response = await fetch(`/api/${route}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taText),
        });
      } catch (err: any) {
        setError(err.message);
      }
    }
  };


  return (
    <main className="mx-4 md:mx-32 lg:mx-64 grid grid-rows-4">
      <Navbar className='self-center'/>
      <Textarea
        className="text-lg resize-none placeholder:text-lg row-span-2 h-80 md:h-72 self-center"
        value={taText}
        ref={textRef}
        onChange={() => setTaText(textRef.current?.value!)}
        placeholder="Paste your text here"
      />
      <div className="flex justify-around md:justify-center md:space-x-32 items-center">
        <Button
          className="text-lg"
          size="lg"
          variant="secondary"
          onClick={handleCopy}>
          {buttonText}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-lg" size="lg" onClick={handleShare}>
              Share
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
      </div>
    </main>
  );
}
