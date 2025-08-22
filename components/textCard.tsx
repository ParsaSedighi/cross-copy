"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Edit, Trash } from "lucide-react";

import type { Paste } from "@prisma/client";

import { useTransition } from "react";
import { deletePaste } from "@/app/pasteActions";

export default function TextCard({ paste }: { paste: Paste }) {
  const [isPending, startTransition] = useTransition();

  const deleteHandler = () => {
    startTransition(async () => {
      const result = await deletePaste(paste.id, paste.userId);

      if (result?.error) console.error(`Error: ${result.error}: ${result.err}`);
      else console.log(`Success: ${result.success}`);
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
          <Trash />
        </Button>
      </div>
    </li>
  );
}
