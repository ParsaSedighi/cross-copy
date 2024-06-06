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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { QRCodeSVG } from 'qrcode.react';

import Navbar from '@/components/navbar';
import { Copy } from 'lucide-react';

export default function Home() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [buttonText, setButtonText] = useState('Copy');
  const [taText, setTaText] = useState('');
  const [error, setError] = useState(null);
  const { route } = useParams();

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
      <Navbar className="self-center" />
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
        <div className="hidden md:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-lg" size="lg" onClick={handleShare}>
                Share
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogDescription>
                  Copy your text from any device using this url:
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-between mt-2">
                <p className="text-3xl">
                  <span className="text-2xl">crosscopy.ir/</span>
                  {route}
                </p>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    copy(`https://crosscopy.ir/${route}`);
                  }}>
                  <Copy className="w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mx-16 mt-4">
                <p className="text-muted-foreground">
                  Or just scan this QRcode:
                </p>
                <QRCodeSVG value={`https://crosscopy.ir/${route}`} />
              </div>
              <DialogFooter className="sm:justify-center"></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="text-lg" size="lg" onClick={handleShare}>
                Share
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DialogDescription className="">
                  Copy your text from any device using this url
                </DialogDescription>
              </DrawerHeader>
              <div className="flex items-center justify-between mx-8 mt-2">
                <p className="text-3xl">
                  <span className="text-2xl">crosscopy.ir/</span>
                  {route}
                </p>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    copy(`https://crosscopy.ir/${route}`);
                  }}>
                  <Copy className="w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mx-16 my-8">
                <p className="text-muted-foreground">
                  Or just scan this QRcode:
                </p>
                <QRCodeSVG value={`https://crosscopy.ir/${route}`} />
              </div>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </main>
  );
}
