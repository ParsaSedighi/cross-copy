"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Edit, Loader2, Trash } from "lucide-react";

import type { Paste } from "@prisma/client";

import { useTransition } from "react";
import { deletePaste } from "@/app/(actions)/pasteActions";
import { toast } from "sonner";
import EditDrawer from "@/components/editDrawer";
import { User } from "better-auth";

export default function PasteCard({
  paste,
  userId,
}: {
  paste: Paste;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const copyHandler = async () => {
    try {
      toast.success("Copied!");
      await navigator.clipboard.writeText(paste.text);
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

  return (
    <li className="flex space-x-4">
      <Card className="w-full pt-2 px-4 max-h-80 overflow-hidden relative">
        <p className="text-sm">{paste.text}</p>
      </Card>
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
            <TooltipTrigger asChild>
              <EditDrawer userId={userId} prevtext={paste}>
                <Button variant="outline" size="icon">
                  <Edit />
                </Button>
              </EditDrawer>
            </TooltipTrigger>
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
    </li>
  );
}
