'use client';

import { SessionProvider } from 'next-auth/react';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
