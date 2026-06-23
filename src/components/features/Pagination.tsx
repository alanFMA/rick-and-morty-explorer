import Link from 'next/link';
import type { JSX } from 'react';

import type { PageInfo } from '@/domain/models/PageInfo';

export interface PaginationProps {
  pageInfo: PageInfo;
  currentPage: number;
  searchParams: Record<string, string | undefined>;
}

const LINK_CLASSES =
  'rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-portal-green hover:text-portal-green';
const DISABLED_CLASSES =
  'rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-foreground-secondary opacity-50';

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

export function Pagination({ pageInfo, currentPage, searchParams }: PaginationProps): JSX.Element {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {pageInfo.prev ? (
        <Link href={buildHref(searchParams, currentPage - 1)} className={LINK_CLASSES}>
          Anterior
        </Link>
      ) : (
        <span className={DISABLED_CLASSES}>Anterior</span>
      )}

      <span className="text-sm text-foreground-secondary">
        Página {currentPage} de {pageInfo.pages}
      </span>

      {pageInfo.next ? (
        <Link href={buildHref(searchParams, currentPage + 1)} className={LINK_CLASSES}>
          Próxima
        </Link>
      ) : (
        <span className={DISABLED_CLASSES}>Próxima</span>
      )}
    </div>
  );
}
