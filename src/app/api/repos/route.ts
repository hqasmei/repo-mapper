import url from 'url';

import { NextResponse } from 'next/server';

import { Repository } from '@/type/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;
    const perPage = 100;
    let repos: Repository[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/user/repos?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }

      const data = await response.json();
      repos = repos.concat(data);

      if (data.length < perPage) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return NextResponse.json(repos || null);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
