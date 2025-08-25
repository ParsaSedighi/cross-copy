import PasteDrawer from "@/components/pasteDrawer";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import PasteCard from "@/components/pasteCard";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await db.paste.findMany({
    where: {
      userId: session!.user.id,
    },
  });

  return (
    <main className="h-full flex flex-col m-4">
      <div className="flex-grow mt-4">
        <ul className="space-y-8">
          {data.map((data) => {
            return <PasteCard key={data.id} paste={data} />;
          })}
        </ul>
      </div>
      <PasteDrawer />
    </main>
  );
}
