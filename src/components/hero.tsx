'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

import CodeSnippet from './code-snippet';

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
  const code = `
├── public
|   |   ├── next.svg
|   |   ├── vercel.svg
├── src
|   ├── app
|   |   |   ├── favicon.ico
|   |   |   ├── globals.css
|   |   |   ├── layout.tsx
|   |   |   ├── page.tsx
|   ├── .eslintrc.json
|   ├── .gitignore
|   ├── next.config.js
|   ├── package-lock.json
|   ├── package.json
|   ├── postcss.config.js
|   ├── README.md
|   ├── tailwind.config.ts
|   ├── tsconfig.json
 `;

  return (
    <div className="flex flex-col space-y-6 space-x-0 md:space-y-0 md:flex-row md:space-x-2 md:justify-between mt-10 items-center">
      <div className="flex flex-col text-center text-balance items-center sm:text-start sm:items-start">
        <span className="text-3xl md:text-5xl font-bold">
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

      <div className="w-full flex flex-col items-center justify-center sm:items-start">
        <CodeSnippet code={code} width="375" />
      </div>
    </div>
  );
}
