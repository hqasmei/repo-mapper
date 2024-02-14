'use client';

import Hero from '@/components/hero';
import Repos from '@/components/repos';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  if (!session?.user) {
    return (
      <div className="flex">
        <Hero />
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row justify-between py-4 items-center mt-4">
            <h2 className="text-xl"> Welcome {session.user.name}!</h2>
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
        </div>
      </div>
      <Repos />
    </div>
  );
}
