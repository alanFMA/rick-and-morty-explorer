import type { HTMLAttributes, JSX } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-background-secondary/60 backdrop-blur-md ${className}`}
      {...props}
    />
  );
}
