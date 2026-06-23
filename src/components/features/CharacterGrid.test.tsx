import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';

import type { CharacterSummary } from '@/domain/models/Character';

import { CharacterGrid } from './CharacterGrid';

const RICK: CharacterSummary = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

const MORTY: CharacterSummary = {
  id: '2',
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
};

describe('CharacterGrid', () => {
  it('renders a card for each character', () => {
    render(<CharacterGrid characters={[RICK, MORTY]} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders the Empty State when there are no characters', () => {
    render(<CharacterGrid characters={[]} />);

    expect(screen.getByText('Personagem não encontrado nesta dimensão.')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('has no detectable accessibility violations', async () => {
    const { container } = render(<CharacterGrid characters={[RICK, MORTY]} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
