"use client";

import { paste } from "@/app/(actions)/pasteActions";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Clipboard } from "lucide-react";

import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function DrawerClient() {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();

  const handlePaste = async () => {
    try {
      if (!navigator.clipboard) {
        return;
      }
      const clipboardText = await navigator.clipboard.read();
      if (typeof clipboardText === "string") setText(clipboardText);
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await paste(text);

      if (result?.error) toast.error(result.error.message);
      else {
        toast.success(result.data.successMessage);
        setText("");
      }
    });
  };

  return (
    <Drawer>
      <div className="flex justify-end sticky bottom-4">
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePaste}
            className="rounded-full w-16 h-16">
            <Plus className="text-secondary-foreground" size={32} />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="h-3/4">
        <DrawerTitle className="mt-3 ml-3">Add your new paste</DrawerTitle>
        <div className="h-full flex flex-col items-center mx-4">
          <div className="w-full h-full relative">
            <Button
              className="absolute top-4 right-0 w-10 h-10 text-zinc-500"
              variant="ghost"
              size="icon"
              onClick={handlePaste}>
              <Clipboard />
            </Button>
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              className="resize-none mt-4 h-full"
            />
          </div>
          <div className="flex justify-center items-center space-x-10 mb-4 mt-8">
            <DrawerClose asChild>
              <Button
                onClick={() => {
                  setText("");
                }}
                className="w-28"
                size="lg"
                variant="secondary">
                Cancel
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                onClick={handleSubmit}
                disabled={isPending || !text}
                className="w-28"
                size="lg"
                variant="default">
                Done
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
