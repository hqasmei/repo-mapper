'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

export default function Hero() {
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
    <div className="flex flex-col">
      <span className="text-3xl md:text-5xl font-bold mt-8">
        Visualize Your GitHub Repos in ASCII.
      </span>
      <span className="text-neutral-700 text-lg mt-2">
        RepoMapper converts your GitHub repository into clear ASCII diagrams,
        enhancing documentation and code organization understanding with an
        invaluable visualization tool.
      </span>
      <div>
        <Button
          onClick={() => popupCenter('/github-signin')}
          className="flex flex-row space-x-2 items-center mt-4"
        >
          <Icon icon="mdi:github" width="28" height="28" />
          <span> Connect to get started</span>
        </Button>
      </div>
    </div>
  );
}
