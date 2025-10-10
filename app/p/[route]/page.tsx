import NavbarPublic from "@/components/navbarPublic";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PublicPaste({
  params,
}: {
  params: { route: string };
}) {
  const { route } = await params;

  const paste = await db.paste.findFirst({
    where: { route },
  });

  if (!paste || !paste.isPublic) {
    notFound();
  }

  return (
    <main>
      <NavbarPublic paste={paste.text} />
      <Card className="my-8 mx-4 h-full">
        <CardContent className="pt-3">{paste.text}</CardContent>
      </Card>
    </main>
  );
}
