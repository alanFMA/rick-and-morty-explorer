'use client';

import type { JSX } from 'react';
import { useEffect } from 'react';

import { SlideUp } from '@/components/animations/SlideUp';
import { CharacterFilters } from '@/components/features/CharacterFilters';
import { CharacterGrid } from '@/components/features/CharacterGrid';
import { HeroSection } from '@/components/features/HeroSection';
import { Pagination } from '@/components/features/Pagination';
import { ParallaxSpaceCruiser } from '@/components/features/ParallaxSpaceCruiser';
import { getScrollState, restoreScrollState, clearScrollState } from '@/hooks/useScrollRestoration';
import type { CharacterSummary } from '@/domain/models/Character';
import type { PageInfo } from '@/domain/models/PageInfo';

export interface HomePageContentProps {
  info: PageInfo;
  results: CharacterSummary[];
  currentPage: number;
  searchParams: Record<string, string | undefined>;
}

export function HomePageContent({
  info,
  results,
  currentPage,
  searchParams,
}: HomePageContentProps): JSX.Element {
  useEffect(() => {
    const scrollState = getScrollState();

    if (scrollState && scrollState.page === currentPage) {
      // User returned to the same page they left from
      restoreScrollState(scrollState);
      clearScrollState();
    }
  }, [currentPage]);

  return (
    <>
      <HeroSection />
      <ParallaxSpaceCruiser />
      <section className="mx-auto max-w-6xl px-6 py-12">
        <SlideUp>
          <h1 id="character-showcase" className="mb-8 text-2xl font-bold text-foreground">
            Vitrine de Personagens
          </h1>
          <CharacterFilters />
          <CharacterGrid characters={results} />
          {results.length > 0 && (
            <Pagination pageInfo={info} currentPage={currentPage} searchParams={searchParams} />
          )}
        </SlideUp>
      </section>
    </>
  );
}
