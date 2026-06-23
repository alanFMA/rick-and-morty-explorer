'use client';

import { useRouter } from 'next/navigation';
import type { JSX } from 'react';

import type { PageInfo } from '@/domain/models/PageInfo';

export interface PaginationProps {
  pageInfo: PageInfo;
  currentPage: number;
  searchParams: Record<string, string | undefined>;
}

const LINK_CLASSES =
  'rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-portal-green hover:text-portal-green cursor-pointer';
const DISABLED_CLASSES =
  'rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-foreground-secondary opacity-50 cursor-not-allowed';

function buildHref(searchParams: Record<string, string | undefined>, page: number): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value) {
      params.set(key, value);
    }
  }
  params.set('page', String(page));

  return `/?${params.toString()}`;
}

function scrollToShowcase(): void {
  const element = document.getElementById('character-showcase');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Pagination({ pageInfo, currentPage, searchParams }: PaginationProps): JSX.Element {
  const router = useRouter();

  function handlePageChange(page: number): void {
    router.push(buildHref(searchParams, page), { scroll: false });
    scrollToShowcase();
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {pageInfo.prev ? (
        <button
          type="button"
          className={LINK_CLASSES}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
      ) : (
        <span className={DISABLED_CLASSES}>Anterior</span>
      )}

      <span className="text-sm text-foreground-secondary">
        Página {currentPage} de {pageInfo.pages}
      </span>

      {pageInfo.next ? (
        <button
          type="button"
          className={LINK_CLASSES}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próxima
        </button>
      ) : (
        <span className={DISABLED_CLASSES}>Próxima</span>
      )}
    </div>
  );
}
