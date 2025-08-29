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
    <main className="h-full flex flex-col mx-4 mb-4">
      <div className="flex-grow mb-6">
        <ul className="">
          {data.map((data) => {
            return (
              <PasteCard key={data.id} paste={data} userId={session?.user.id} />
            );
          })}
          <div className="h-8"></div>
        </ul>
      </div>
      <PasteDrawer />
    </main>
  );
}
