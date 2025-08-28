import PasteDrawer from "@/components/pasteDrawer";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import PasteCard from "@/components/pasteCard";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/Signin");
  }

  const data = await db.paste.findMany({
    where: {
      userId: session!.user.id,
    },
  });

  return (
    <main className="h-full flex flex-col mx-4 mb-4 mt-2">
      <div className="flex-grow mt-4 mb-6">
        <ul className="space-y-8">
          {data.map((data) => {
            return (
              <PasteCard key={data.id} paste={data} userId={session?.user.id} />
            );
          })}
        </ul>
      </div>
      <PasteDrawer />
    </main>
  );
}
