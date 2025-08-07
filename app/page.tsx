import { redirect } from 'next/navigation';
import randomstring from 'randomstring';
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getAllRoutes() {
  const texts = await db.textbox.findMany();
  return texts;
}

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const generate = () => {
    return randomstring.generate({
      length: 5,
      charset: 'alphanumeric',
    });
  };
  const routes = await getAllRoutes();
  let route = generate();
  while (routes.some((r) => r.route === route)) {
    route = generate();
  }


  if (!session) {
    redirect('/auth/Signup')
  }
  return (
    <div>Hello</div>
  )

  // redirect(`${route}`);
}
