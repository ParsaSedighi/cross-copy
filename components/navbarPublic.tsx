"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export default function NavbarPublic({
  className,
  paste,
}: {
  className?: string;
  paste: string;
}) {
  const copyHandler = async () => {
    try {
      if (!window.isSecureContext) {
        toast.error("Cannot copy!");
      } else {
        toast.success("Copied!");
        await navigator.clipboard.writeText(paste);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className={cn(className, "mx-4 mt-4")}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <Button className="min-w-36" variant="secondary">
              CrossCopy
            </Button>
          </Link>
        </div>
        <Button variant="outline" onClick={copyHandler}>
          <Copy />
          Copy
        </Button>
      </div>
    </nav>
  );
}
