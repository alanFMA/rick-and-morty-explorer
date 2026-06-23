import type { JSX } from 'react';

import { CharacterGrid } from '@/components/features/CharacterGrid';
import { fetchCharacters } from '@/infrastructure/services/characterService';

export default async function HomePage(): Promise<JSX.Element> {
  const { results } = await fetchCharacters();

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold text-foreground">Vitrine de Personagens</h1>
      <CharacterGrid characters={results} />
    </section>
  );
}
