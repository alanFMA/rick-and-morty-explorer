import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

import { Card } from '@/components/ui/Card';
import type { CharacterSummary } from '@/domain/models/Character';

const STATUS_DOT_CLASSES: Record<CharacterSummary['status'], string> = {
  Alive: 'bg-portal-green',
  Dead: 'bg-red-500',
  unknown: 'bg-foreground-secondary',
};

export interface CharacterCardProps {
  character: CharacterSummary;
}

export function CharacterCard({ character }: CharacterCardProps): JSX.Element {
  return (
    <Link href={`/character/${character.id}`} className="block">
      <Card className="group overflow-hidden transition-colors hover:border-portal-green/60">
        <div className="relative aspect-square w-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 p-4">
          <h3 className="truncate font-semibold text-foreground group-hover:text-portal-green">
            {character.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-foreground-secondary">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${STATUS_DOT_CLASSES[character.status]}`}
            />
            <span>
              {character.status} - {character.species}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
