import { redirect } from 'next/navigation';
import randomstring from 'randomstring';

export default async function Home() {
  const route = randomstring.generate({
    length: 5,
    charset: 'alphanumeric',
  });
  redirect(`${route}`);
}
