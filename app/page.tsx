import { redirect } from 'next/navigation';
import randomstring from 'randomstring';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getAllRoutes() {
  const texts = await prisma.textbox.findMany();
  return texts;
}

export default async function Home() {
  const generate = () => {
    return randomstring.generate({
      length: 5,
      charset: 'alphanumeric',
    });
  };
  const routes = await getAllRoutes();
  var route = generate();
  while (routes.some((r) => r.route === route)) {
    route = generate();
  }

  redirect(`${route}`);
}
