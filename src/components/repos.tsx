'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Repository } from '@/type/types';
import axios from 'axios';
import Fuse from 'fuse.js';
import { Star } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length),
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? 'bg-neutral-100 rounded-md' : ''}
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />,
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />,
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

const Repos = () => {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredRepos.slice(firstPostIndex, lastPostIndex);

  const highlightText = (text: string, highlight: string): JSX.Element => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow' }}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  useEffect(() => {
    async function fetchAllGithubRepos() {
      const response = await axios.post('/api/repos', {
        token: session?.accessToken,
      });
      setRepos(response.data);
    }

    fetchAllGithubRepos();
  }, [session]);

  useEffect(() => {
    // Convert the search term and repository names to lowercase for case-insensitive comparison
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = repos.filter((repo) =>
      repo.name.toLowerCase().includes(searchTermLower),
    );

    setFilteredRepos(filtered);
  }, [repos, searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        Your Repositories ({repos.length})
      </h2>
      <Input
        placeholder="Search..."
        className="mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col border rounded-md mb-4">
        {currentPosts.map((repo, idx) => (
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
                {highlightText(repo.name, searchTerm)}
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
      <PaginationSection
        totalPosts={filteredRepos.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Repos;
