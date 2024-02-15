'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import CodeSnippet from '@/components/code-snippet';
import axios from 'axios';
import { ArrowLeft, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';

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
    }

    fetchGithubRepo();
  }, [session, owner, params]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex w-full flex-col py-8 space-y-6">
      <Link href="/" className="flex  group flex-row space-x-1 items-center">
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 duration-200 "
        />
        <span>Back</span>
      </Link>
      <span className="font-bold text-xl">{params.slug}</span>
      <div className="w-full flex flex-col items-center justify-center sm:items-start">
        <CodeSnippet code={repoStructure} width="full" />
      </div>
    </div>
  );
}
