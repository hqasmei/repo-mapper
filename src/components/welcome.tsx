'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { signOut, useSession } from 'next-auth/react';

export default function Welcome() {
  const { data: session, status } = useSession();

  const popupCenter = (url: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      'OAuthSignIn', // window name
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`,
    );

    if (newWindow) newWindow.focus();
    else
      alert(
        'Failed to open the window, it may have been blocked by a popup blocker.',
      );
  };

  return (
    <main className="w-full">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-2xl">RepoMapper</h1>
        <span>Turn your github repo into a visual folder structure.</span>
        {status !== 'authenticated' && (
          <div>
            <div className="border rounded-md flex flex-row items-center justify-between space-x-2 text-sm h-16 px-4">
              <Icon icon="mdi:github" width="36" height="36" />
              <span className="text-slate-600">
                Connect your github account to see you dashboard.
              </span>
              <Button onClick={() => popupCenter('/github-signin')}>
                Start
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
