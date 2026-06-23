import type { JSX } from 'react';

import { HomePageContent } from '@/components/features/HomePageContent';
import { fetchCharacters } from '@/infrastructure/services/characterService';

interface HomePageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function HomePage({ searchParams }: HomePageProps): Promise<JSX.Element> {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { info, results } = await fetchCharacters({
    page,
    name: params.name,
    status: params.status,
  });

  return <HomePageContent info={info} results={results} currentPage={page} searchParams={params} />;
}
