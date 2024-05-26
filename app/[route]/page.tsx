import { Textarea } from '@/components/ui/textarea';
import DialogButton from '@/components/dialogButton';

export default function Home() {
  return (
    <main className="mt-7 mx-4 h-full">
      <Textarea
        className="text-lg resize-none h-4/6 placeholder:text-lg"
        placeholder="Paste your text here"
      />
      <DialogButton />
    </main>
  );
}
