import type { JSX } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-background-secondary/40 px-6 py-16 text-center">
      <p className="text-lg font-semibold text-foreground">{title}</p>
      {description ? <p className="text-sm text-foreground-secondary">{description}</p> : null}
    </div>
  );
}
