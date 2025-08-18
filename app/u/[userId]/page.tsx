import Navbar from "@/components/navbar";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="h-full flex flex-col items-center">
      <div className="flex-grow"></div>
      <Textarea className="h-1/2"></Textarea>
    </main>
  );
}
