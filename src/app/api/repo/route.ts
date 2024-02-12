import url from 'url';

import { NextResponse } from 'next/server';

async function fetchDirectoryContents(
  owner: any,
  repoName: any,
  path: any,
  token: any,
) {
  const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${path}`;
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${apiUrl}: ${response.statusText}`);
  }

  let contents = await response.json();

  // Sort contents: directories first, then files
  contents.sort((a: any, b: any) => {
    if (a.type === 'dir' && b.type !== 'dir') {
      return -1; // a is a directory, b is a file, a comes first
    } else if (a.type !== 'dir' && b.type === 'dir') {
      return 1; // a is a file, b is a directory, b comes first
    } else {
      return a.name.localeCompare(b.name); // Both are files or directories, sort alphabetically
    }
  });

  for (let i = 0; i < contents.length; i++) {
    const item = contents[i];
    if (item.type === 'dir') {
      // Recursively fetch contents for directories
      const subContents = await fetchDirectoryContents(
        owner,
        repoName,
        item.path,
        token,
      );
      item.contents = subContents; // Attach the contents to the directory item
    }
  }

  return contents;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { owner, repoName, token } = body;

    const data = await fetchDirectoryContents(owner, repoName, '', token);

    return NextResponse.json(data || null);
  } catch (error) {
    console.log('[PROJECT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
