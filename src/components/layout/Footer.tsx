import type { JSX } from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-white/10 py-6 text-center text-sm text-foreground-secondary">
      <p>
        Dados fornecidos pela{' '}
        <a
          href="https://rickandmortyapi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-portal-green hover:underline"
        >
          Rick and Morty API
        </a>
        .
      </p>
    </footer>
  );
}
