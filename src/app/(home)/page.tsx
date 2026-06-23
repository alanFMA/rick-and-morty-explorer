import type { JSX } from 'react';

import { SlideUp } from '@/components/animations/SlideUp';
import { CharacterFilters } from '@/components/features/CharacterFilters';
import { CharacterGrid } from '@/components/features/CharacterGrid';
import { HeroSection } from '@/components/features/HeroSection';
import { Pagination } from '@/components/features/Pagination';
import { ParallaxSpaceCruiser } from '@/components/features/ParallaxSpaceCruiser';
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

  return (
    <>
      <HeroSection />
      <ParallaxSpaceCruiser />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <SlideUp>
          <h1 className="mb-8 text-2xl font-bold text-foreground">Vitrine de Personagens</h1>
          <CharacterFilters />
          <CharacterGrid characters={results} />
          {results.length > 0 && (
            <Pagination pageInfo={info} currentPage={page} searchParams={params} />
          )}
        </SlideUp>
      </section>
    </>
  );
}
