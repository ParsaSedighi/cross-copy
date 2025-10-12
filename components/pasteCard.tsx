"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ChevronLeft, Copy, Loader2, Trash, Lock } from "lucide-react";

import type { Paste } from "@prisma/client";

import { useEffect, useState, useTransition } from "react";
import { deletePaste, editPaste } from "@/app/(actions)/pasteActions";
import { toast } from "sonner";

import { motion, AnimatePresence } from "motion/react";
import { Textarea } from "@/components/ui/textarea";

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
  const [editableText, setEditableText] = useState(paste.text);
  const [showActions, setShowActions] = useState(false);

  const copyHandler = async () => {
    try {
      if (!window.isSecureContext) {
        toast.error("Cannot copy!");
        setShowActions(false);
      } else {
        await navigator.clipboard.writeText(paste.text);
        toast.success("Copied!");
        setShowActions(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveHandler = () => {
    startTransition(async () => {
      const result = await editPaste(userId, paste.id, editableText);

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success(result.data.successMessage);
        setIsOpen(false);
      }
    });
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
      <motion.li layout className="flex space-x-4 mt-8 z-0">
        <div className="relative w-full overflow-visible">
          <motion.div
            drag="x"
            dragConstraints={{ left: -44, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -30) {
                setShowActions(true);
              } else {
                setShowActions(false);
              }
            }}
            animate={{ x: showActions ? -44 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={showActions ? "relative z-10" : "relative z-0"}>
            <MotionCard
              layoutId={`card-container-${paste.id}`}
              onClick={(e) => {
                if (!showActions) {
                  setIsOpen(true);
                }
              }}
              className="w-full cursor-pointer pt-2 px-4 min-h-52 max-h-80 overflow-hidden relative transition-colors hover:bg-muted/50">
              <p className="text-sm pointer-events-none">{paste.text}</p>
              {!paste.isPublic && (
                <div className="absolute top-2 right-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </MotionCard>
          </motion.div>

          <div
            className={`absolute top-0 right-0 h-full w-11 flex flex-col justify-center space-y-2 px-2 bg-background ${
              showActions ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <Button onClick={copyHandler} variant="outline" size="icon">
              <Copy />
            </Button>
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
          </div>
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
              {/* --- MODAL HEADER --- */}
              <div className="flex justify-start mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex flex-grow justify-end space-x-2">
                  <Button variant="outline" size="icon" onClick={copyHandler}>
                    <Copy />
                  </Button>
                  <Button variant="outline" onClick={saveHandler}>
                    Save
                  </Button>
                </div>
              </div>

              {/* --- MODAL CONTENT --- */}
              <div className="flex-1 w-full overflow-y-auto">
                <Textarea
                  className="w-full h-full resize-none whitespace-pre-wrap break-words p-2"
                  value={editableText}
                  onChange={(e) => setEditableText(e.target.value)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
