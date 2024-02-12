'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Repository } from '@/type/types';
import axios from 'axios';
import { ArrowLeft, Star } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const parseRepoData = (data: any[], prefix: string = '') => {
  let structure = '';

  data.forEach((item) => {
    if (item.type === 'dir') {
      // For directories
      structure += `${prefix}├── ${item.name}\n`;
      // Placeholder for nested directory contents
      // Assuming `item.contents` holds an array of contents if they were fetched
      if (item.contents) {
        structure += parseRepoData(item.contents, prefix + '|   ');
      }
    } else {
      // For files
      structure += `${prefix}|   ├── ${item.name}\n`;
    }
  });

  return structure;
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { data: session } = useSession();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const owner = searchParams.get('owner');
  const [repoStructure, setRepoStructure] = useState('');

  useEffect(() => {
    async function fetchGithubRepo() {
      const response = await axios.post('/api/repo', {
        owner: owner,
        repoName: params.slug,
        token: session?.accessToken,
      });
      const respoData = response.data;
      const structure = parseRepoData(respoData);
      setRepoStructure(structure);
      setRepo(respoData);
    }

    fetchGithubRepo();
  }, [session, owner, params]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex flex-col  py-24  w-full  items-center justify-center">
      <div className="max-w-2xl flex w-full flex-col space-y-6">
        <Link href="/" className="flex  group flex-row space-x-1 items-center">
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 duration-200 "
          />
          <span>Back</span>
        </Link>
        <pre>
          <code>{repoStructure}</code>
        </pre>
      </div>
    </main>
  );
}
