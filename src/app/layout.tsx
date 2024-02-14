import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../styles/globals.css';

import { ContextProvider } from '@/components/context-provider';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RepoMapper',
  description: 'Turn your github repo into a visual folder structure.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="a07e2826-5910-4684-9e69-0ec4388a0509"
          async
        ></script>
      </head>
      <body className={inter.className}>
        <ContextProvider>
          <main className="w-full">
            <div className="p-4 mt-10 flex w-full flex-col space-y-6 items-center justify-center text-start">
              <div className="max-w-5xl flex w-full flex-col">
                <Header />
                {children}
              </div>
            </div>
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
