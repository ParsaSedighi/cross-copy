'use client';

import copy from 'copy-to-clipboard';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter, useParams } from 'next/navigation';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import { QRCodeSVG } from 'qrcode.react';

import Navbar from '@/components/navbar';
import { Copy, Import } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [buttonText, setButtonText] = useState('Copy');
  const [taText, setTaText] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const { route } = useParams();
  const router = useRouter();

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

  const handleSubmit = async () => {
    if (value) {
      router.push(`${value}`);
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
        <div className="hidden md:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-lg" size="icon" variant="ghost">
                <Import />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center">
                  Enter your code here
                </DialogTitle>
                <DialogDescription className="flex justify-center">
                  Characters are case-sensitive
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={5}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={value}
                  onChange={(value) => setValue(value)}
                  inputMode="text"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <DialogFooter className="sm:justify-center">
                <div className="space-x-8 mt-3">
                  <Button onClick={handleSubmit}>Submit</Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="text-lg" size="icon" variant="ghost">
                <Import />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Enter your code here</DrawerTitle>
                <DrawerDescription>
                  Characters are case-sensitive
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={5}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={value}
                  onChange={(value) => setValue(value)}
                  inputMode="text"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit();
                    }
                  }}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <DrawerFooter>
                <div className="flex justify-center space-x-8">
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                  <Link href={`/${value}`}>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </Link>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
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
              <div className="flex items-center justify-between mx-16 my-4">
                <p className="text-muted-foreground">
                  Or just scan this QRcode:
                </p>
                <QRCodeSVG value={`https://crosscopy.ir/${route}`} />
              </div>
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
        <Button
          className="text-lg"
          size="icon"
          variant="ghost"
          onClick={handleCopy}>
          <Copy />
        </Button>
      </div>
    </main>
  );
}
