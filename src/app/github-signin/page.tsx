'use client';

import React, { useEffect } from 'react';

import { signIn, useSession } from 'next-auth/react';

export default function GithubSigninPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === 'loading') && !session) {
      signIn('github');
    }
    if (session) {
      window.close();
    }
  }, [session, status]);

  return (
    <div
      style={{
        width: '50vw',
        height: '50vh',
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'white',
      }}
    />
  );
}
