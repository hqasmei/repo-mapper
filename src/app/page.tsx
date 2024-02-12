import Github from '@/components/github';
import Welcome from '@/components/welcome';

export default function Home() {
  return (
    <div className="p-4 flex flex-col space-y-6">
      <Welcome />
      <Github />
    </div>
  );
}
