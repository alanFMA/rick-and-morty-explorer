import type { JSX } from 'react';

import { CharacterGridSkeleton } from '@/components/features/CharacterGridSkeleton';

export default function HomeLoading(): JSX.Element {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">Vitrine de Personagens</h1>
      <CharacterGridSkeleton />
    </section>
  );
}
