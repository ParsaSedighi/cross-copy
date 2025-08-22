"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Trash } from "lucide-react";

import type { Paste } from "@prisma/client";

import { useTransition } from "react";
import { deletePaste } from "@/app/pasteActions";
import { toast } from "sonner";

export default function TextCard({ paste }: { paste: Paste }) {
  const [isPending, startTransition] = useTransition();

  const deleteHandler = () => {
    startTransition(async () => {
      const result = await deletePaste(paste.id, paste.userId);

      if (result.error) toast.error(result.error.message);
      else toast.success(result.data.successMessage);
    });
  };

  return (
    <li className="flex space-x-4">
      <Card className="w-full pt-2 px-4">
        <p className="text-sm">{paste.text}</p>
      </Card>
      <div className="flex flex-col space-y-2">
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
        <Button onClick={deleteHandler} variant="outline" size="icon">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>
    </li>
  );
}
