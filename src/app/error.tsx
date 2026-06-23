'use client';

import type { JSX } from 'react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';

export interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-foreground">O portal quebrou.</h1>
      <p className="text-foreground-secondary">Tente novamente.</p>
      <Button onClick={reset}>Tentar novamente</Button>
    </section>
  );
}
