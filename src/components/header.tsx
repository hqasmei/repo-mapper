'use client';

import React from 'react';

import Link from 'next/link';

import { FolderTree } from 'lucide-react';

export default function Header() {
  return (
    <Link href="/" className="flex flex-row items-center space-x-2">
      <span className="h-8 w-8 flex items-center justify-center bg-black rounded-lg">
        <FolderTree size={20} color="white" />
      </span>
      <h1 className="font-bold text-2xl">RepoMapper</h1>
    </Link>
  );
}
