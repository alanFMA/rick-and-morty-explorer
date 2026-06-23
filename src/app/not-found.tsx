'use client';

import type { JSX } from 'react';

import { BackButton } from '@/components/ui/BackButton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function NotFound(): JSX.Element {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24">
      <EmptyState
        title="Personagem não encontrado nesta dimensão."
        description="O personagem que você procura não existe neste universo."
      />
      <BackButton href="/" label="Voltar para a vitrine" />
    </section>
  );
}
