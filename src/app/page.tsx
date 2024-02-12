import Github from '@/components/github';
import Welcome from '@/components/welcome';

export default function Home() {
  return (
    <div className="p-4 flex w-full flex-col space-y-6  items-center justify-center text-center">
      <div className="max-w-2xl flex w-full flex-col">
        <Welcome />
        <Github />
      </div>
    </div>
  );
}
