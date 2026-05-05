'use client';

import { useState } from 'react';

export function ShareButton({ productId }: { productId: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/product/${productId}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Royal A-ware Product', url });
        return;
      } catch {
        // User cancelled — fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-5 h-btn border border-primary/20 bg-white
                 text-label-md font-bold text-primary hover:bg-primary hover:text-white
                 active:scale-95 transition-colors min-w-[44px]"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-secondary flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Link copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share product
        </>
      )}
    </button>
  );
}
