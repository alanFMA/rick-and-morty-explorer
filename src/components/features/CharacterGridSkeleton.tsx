import type { JSX } from 'react';

import { Card } from '@/components/ui/Card';

const SKELETON_CARD_COUNT = 8;

export function CharacterGridSkeleton(): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" aria-hidden="true">
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
        <Card key={index} className="animate-pulse overflow-hidden">
          <div className="aspect-square w-full bg-white/5" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-4 w-3/4 rounded bg-white/5" />
            <div className="h-3 w-1/2 rounded bg-white/5" />
          </div>
        </Card>
      ))}
    </div>
  );
}
