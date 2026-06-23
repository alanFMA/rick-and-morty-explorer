import type { JSX } from 'react';

import { CharacterCard } from '@/components/features/CharacterCard';
import { EmptyState } from '@/components/ui/EmptyState';
import type { CharacterSummary } from '@/domain/models/Character';

export interface CharacterGridProps {
  characters: CharacterSummary[];
}

export function CharacterGrid({ characters }: CharacterGridProps): JSX.Element {
  if (characters.length === 0) {
    return (
      <EmptyState
        title="Personagem não encontrado nesta dimensão."
        description="Tente ajustar a busca ou os filtros aplicados."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
