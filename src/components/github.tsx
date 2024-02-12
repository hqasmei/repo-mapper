'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Repository } from '@/type/types';
import axios from 'axios';
import { Star } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const RepositoriesList = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAllGithubRepos() {
      const response = await axios.post('/api/repos', {
        token: session?.accessToken,
      });
      const resposData = response.data;
      setRepos(resposData);
    }

    fetchAllGithubRepos();
  }, [session]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        Your Repositories ({repos.length})
      </h2>
      <div className="flex flex-col border rounded-md">
        {repos.map((repo, idx) => (
          <div
            key={idx}
            className="flex flex-row justify-between items-center border-b p-4"
          >
            <div className="flex flex-col space-y-1">
              <Link
                href={repo.html_url}
                target="_blank"
                className="text-blue-600 font-medium hover:underline duration-200"
              >
                {repo.name}
              </Link>
              <div className="flex flex-row space-x-1 items-center text-sm ">
                <Star className="" size={14} />
                <span>{repo.stargazers_count}</span>
              </div>
            </div>

            <Button asChild>
              <Link href={`/${repo.name}?owner=${repo.owner.login}`}>
                Select
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Github() {
  const { data: session, status } = useSession();

  if (!session?.user) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 gap-8">
      {status === 'authenticated' && (
        <div className="flex flex-col space-y-10">
          <div className="flex flex-row justify-between py-4 items-center">
            <h2> Welcome {session.user.email} 😀</h2>
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>

          <RepositoriesList />
        </div>
      )}
    </div>
  );
}
