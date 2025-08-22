"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Edit, Trash } from "lucide-react";

import type { Paste } from "@prisma/client";

export default function TextCard({ paste }: { paste: Paste }) {
  return (
    <li className="flex space-x-4">
      <Card className="w-full pt-2 px-4">
        <p className="text-sm">{paste.text}</p>
      </Card>
      <div className="flex flex-col space-y-2">
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </div>
    </li>
  );
}
