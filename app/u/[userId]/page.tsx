import { Textarea } from "@/components/ui/textarea";

export default async function Dashboard() {
  return (
    <main className="h-full flex flex-col items-center m-4">
      <div className="flex-grow"></div>
      <Textarea className="h-1/2"></Textarea>
    </main>
  );
}
