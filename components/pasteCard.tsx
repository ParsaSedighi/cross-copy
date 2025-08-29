"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, Copy, Edit, Loader2, Trash } from "lucide-react";

import type { Paste } from "@prisma/client";

import { useEffect, useState, useTransition } from "react";
import { deletePaste } from "@/app/(actions)/pasteActions";
import { toast } from "sonner";
import EditDrawer from "@/components/editDrawer";

import { motion, AnimatePresence } from "motion/react";

const MotionCard = motion.create(Card);

export default function PasteCard({
  paste,
  userId,
}: {
  paste: Paste;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const copyHandler = async () => {
    try {
      if (!window.isSecureContext) {
        toast.error("Cannot copy!");
      } else {
        toast.success("Copied!");
        await navigator.clipboard.writeText(paste.text);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteHandler = () => {
    startTransition(async () => {
      const result = await deletePaste(paste.id, paste.userId);

      if (result.error) toast.error(result.error.message);
      else toast.success(result.data.successMessage);
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  return (
    <>
      <motion.li layout className="flex space-x-4 mt-8">
        <MotionCard
          layoutId={`card-container-${paste.id}`}
          onClick={() => setIsOpen(true)}
          className="w-full cursor-pointer pt-2 px-4 min-h-52 max-h-80 overflow-hidden relative transition-colors hover:bg-muted/50">
          <p className="text-sm pointer-events-none">{paste.text}</p>
        </MotionCard>

        <div className="flex flex-col justify-between space-y-2">
          <div className="space-y-2 flex flex-col">
            <Tooltip delayDuration={100} disableHoverableContent>
              <TooltipTrigger asChild>
                <Button onClick={copyHandler} variant="outline" size="icon">
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy</TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={100} disableHoverableContent>
              <EditDrawer userId={userId} prevtext={paste}>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Edit />
                  </Button>
                </TooltipTrigger>
              </EditDrawer>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </div>
          <Tooltip delayDuration={100} disableHoverableContent>
            <TooltipTrigger asChild>
              <Button
                className="hover:bg-destructive hover:text-destructive-foreground"
                onClick={deleteHandler}
                variant="outline"
                size="icon">
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
      </motion.li>

      {/* --- FULL-SCREEN MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId={`card-container-${paste.id}`}
            className="fixed inset-0 z-50 bg-background p-4 sm:p-6 flex flex-col">
            <motion.div
              className="flex-1 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.15, duration: 0.3 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}>
              {/* --- MODAL HEADER (Close Button) --- */}
              <div className="flex justify-start mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex flex-grow justify-end">
                  <Button variant="outline" onClick={copyHandler}>
                    <Copy />
                    Copy
                  </Button>
                </div>
              </div>

              {/* --- MODAL CONTENT --- */}
              <div className="flex-1 w-full overflow-y-auto pr-2">
                <p className="whitespace-pre-wrap break-words">{paste.text}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
