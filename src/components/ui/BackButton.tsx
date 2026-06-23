'use client';

import { useRouter } from 'next/navigation';
import type { JSX } from 'react';

export interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps): JSX.Element {
  const router = useRouter();

  function handleClick(): void {
    // If there's browser history, use back. Otherwise navigate to fallback href.
    // history.length > 1 means user didn't land directly on this page
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      router.push(href);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mb-6 inline-block text-sm text-portal-green hover:underline"
    >
      ← {label}
    </button>
  );
}
