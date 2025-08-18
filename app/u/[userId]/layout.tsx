import Navbar from "@/components/navbar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ userId: string }>;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { userId } = await params;

  if (!session) {
    redirect("/auth/Signin");
  } else if (session.user.id !== userId) {
    return <h1>You are not authorized</h1>;
  }
  return (
    <div className="h-screen flex flex-col">
      <Navbar username={session.user.name} />
      {children}
    </div>
  );
}
