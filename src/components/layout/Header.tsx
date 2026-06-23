import Link from 'next/link';
import type { JSX } from 'react';

export function Header(): JSX.Element {
  return (
    <header className="border-b border-white/10 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-foreground hover:text-portal-green">
          Rick &amp; Morty Multiverse Explorer
        </Link>
      </nav>
    </header>
  );
}
