'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEvent, JSX } from 'react';
import { useRef, useState, useTransition } from 'react';

import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';

const NAME_DEBOUNCE_MS = 400;

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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Mirror name/status outside React state so the debounced callback below
  // always reads the latest user intent, never a value confirmed by the
  // (possibly slow) server round-trip of a navigation that's still pending.
  const nameRef = useRef(name);
  const statusRef = useRef(status);

  function navigate(nextName: string, nextStatus: string): void {
    const params = new URLSearchParams();
    if (nextName) {
      params.set('name', nextName);
    }
    if (nextStatus) {
      params.set('status', nextStatus);
    }

    // Keeps this client component mounted (instead of being torn down by
    // the route's loading.tsx Suspense boundary) so a pending debounced
    // update never gets lost to a remount triggered by another filter.
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setName(value);
    nameRef.current = value;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      navigate(nameRef.current, statusRef.current);
    }, NAME_DEBOUNCE_MS);
  }

  function handleStatusClick(value: string): void {
    setStatus(value);
    statusRef.current = value;
    navigate(nameRef.current, value);
  }

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        id="character-search"
        label="Buscar personagem por nome"
        placeholder="Buscar por nome..."
        value={name}
        onChange={handleNameChange}
        className="sm:max-w-xs"
      />
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
