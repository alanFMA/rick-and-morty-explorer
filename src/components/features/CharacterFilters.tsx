'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEvent, JSX } from 'react';
import { useEffect, useRef, useState, useTransition } from 'react';

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
  const [, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Always points at the latest searchParams, so the debounced callback
  // below never overwrites a filter applied while it was pending.
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  function updateParams(updates: Record<string, string | null>): void {
    const params = new URLSearchParams(searchParamsRef.current.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    params.delete('page');

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

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      updateParams({ name: value || null });
    }, NAME_DEBOUNCE_MS);
  }

  const currentStatus = searchParams.get('status') ?? '';

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
            variant={currentStatus === option.value ? 'primary' : 'secondary'}
            onClick={() => updateParams({ status: option.value || null })}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
