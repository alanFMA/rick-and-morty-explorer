'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent, JSX } from 'react';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/Button';
import { SearchIcon } from '@/components/ui/SearchIcon';
import { SearchInput } from '@/components/ui/SearchInput';

const STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Alive', value: 'Alive' },
  { label: 'Dead', value: 'Dead' },
  { label: 'Unknown', value: 'unknown' },
] as const;

export function CharacterFilters(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get('name') ?? '');
  const [status, setStatus] = useState(searchParams.get('status') ?? '');
  const [, startTransition] = useTransition();

  function navigate(nextName: string, nextStatus: string): void {
    const params = new URLSearchParams();
    if (nextName) {
      params.set('name', nextName);
    }
    if (nextStatus) {
      params.set('status', nextStatus);
    }

    startTransition(() => {
      // scroll: false keeps the user at their current scroll position when the
      // server re-renders the grid, instead of jumping back to the top.
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  // Search is intentionally controlled (submit on the magnifying-glass button
  // or Enter), not fired on every keystroke, so the list isn't re-fetched and
  // re-rendered mid-typing.
  function handleSearchSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    navigate(name, status);
  }

  function handleStatusClick(value: string): void {
    setStatus(value);
    navigate(name, value);
  }

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
        <SearchInput
          id="character-search"
          label="Buscar personagem por nome"
          placeholder="Buscar por nome..."
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="sm:max-w-xs"
        />
        <Button type="submit" aria-label="Buscar">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>
      <div className="flex gap-2">
        {STATUS_OPTIONS.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={status === option.value ? 'primary' : 'secondary'}
            onClick={() => handleStatusClick(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
