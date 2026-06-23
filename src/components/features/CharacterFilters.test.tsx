import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CharacterFilters } from './CharacterFilters';

const { pushMock, getSearchParams, setSearchParams } = vi.hoisted(() => {
  let params = new URLSearchParams();
  return {
    pushMock: vi.fn(),
    getSearchParams: (): URLSearchParams => params,
    setSearchParams: (value: string): void => {
      params = new URLSearchParams(value);
    },
  };
});

vi.mock('next/navigation', () => ({
  useRouter: (): { push: typeof pushMock } => ({ push: pushMock }),
  usePathname: (): string => '/',
  useSearchParams: (): URLSearchParams => getSearchParams(),
}));

beforeEach(() => {
  pushMock.mockClear();
  setSearchParams('');
});

describe('CharacterFilters', () => {
  it('navigates with the status filter when a status button is clicked', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);

    await user.click(screen.getByRole('button', { name: 'Mortos' }));

    expect(pushMock).toHaveBeenCalledWith('/?status=Dead', { scroll: false });
  });

  it('navigates with the name filter only when the search button is clicked', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);

    const searchInput = screen.getByLabelText('Buscar personagem por nome');
    await user.type(searchInput, 'Rick');

    // Typing alone does not trigger a navigation
    expect(pushMock).not.toHaveBeenCalled();

    // Clicking the search button triggers it
    await user.click(screen.getByRole('button', { name: 'Buscar' }));

    expect(pushMock).toHaveBeenCalledWith('/?name=Rick', { scroll: false });
  });

  it('navigates when Enter is pressed in the search input', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);

    const searchInput = screen.getByLabelText('Buscar personagem por nome');
    await user.type(searchInput, 'Morty{Enter}');

    expect(pushMock).toHaveBeenCalledWith('/?name=Morty', { scroll: false });
  });

  it('highlights the status button matching the current URL', () => {
    setSearchParams('status=Dead');
    render(<CharacterFilters />);

    expect(screen.getByRole('button', { name: 'Mortos' })).toHaveClass('bg-portal-green');
    expect(screen.getByRole('button', { name: 'Vivos' })).not.toHaveClass('bg-portal-green');
  });
});
