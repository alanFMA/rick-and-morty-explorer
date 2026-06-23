import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';

import { FadeIn } from '@/components/animations/FadeIn';
import { Card } from '@/components/ui/Card';
import type { CharacterStatus } from '@/domain/models/Character';
import { fetchCharacterById } from '@/infrastructure/services/characterService';

const STATUS_DOT_CLASSES: Record<CharacterStatus, string> = {
  Alive: 'bg-portal-green',
  Dead: 'bg-red-500',
  unknown: 'bg-foreground-secondary',
};

export interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps): Promise<JSX.Element> {
  const { id } = await params;
  const character = await fetchCharacterById({ id });

  if (!character) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <FadeIn>
        <Link href="/" className="mb-6 inline-block text-sm text-portal-green hover:underline">
          ← Voltar para a vitrine
        </Link>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-6 p-6 sm:flex-row">
            <div className="relative aspect-square w-full shrink-0 sm:w-64">
              <Image
                src={character.image}
                alt={character.name}
                fill
                sizes="(min-width: 640px) 256px, 100vw"
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold text-foreground">{character.name}</h1>

              <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${STATUS_DOT_CLASSES[character.status]}`}
                />
                <span>
                  {character.status} - {character.species}
                  {character.type ? ` (${character.type})` : ''}
                </span>
              </div>

              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                <dt className="text-foreground-secondary">Gênero</dt>
                <dd className="text-foreground">{character.gender}</dd>

                <dt className="text-foreground-secondary">Origem</dt>
                <dd className="text-foreground">{character.origin.name}</dd>

                <dt className="text-foreground-secondary">Última localização</dt>
                <dd className="text-foreground">{character.location.name}</dd>
              </dl>
            </div>
          </div>

          {character.episodes.length > 0 && (
            <div className="border-t border-white/10 p-6">
              <h2 className="mb-3 text-lg font-semibold text-foreground">Episódios</h2>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {character.episodes.map((episode) => (
                  <li key={episode.id} className="text-sm text-foreground-secondary">
                    <span className="text-foreground">{episode.episode}</span> — {episode.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </FadeIn>
    </section>
  );
}
