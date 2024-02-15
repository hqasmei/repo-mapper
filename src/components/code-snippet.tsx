import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

const CodeSnippet = ({ code, width }: { code: any; width: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={`bg-gray-800 text-white pt-4 px-8 pb-8 rounded-lg font-mono text-sm ${width}`}
    >
      <pre className="whitespace-pre-wrap overflow-x-auto relative">
        <code>{code}</code>
        <div className="flex justify-end absolute top-0 right-0">
          <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
            <button
              className={`mt-2 text-xs ${copied ? 'bg-green-500' : 'bg-blue-500'} text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </CopyToClipboard>
        </div>
      </pre>
    </div>
  );
};

export default CodeSnippet;
