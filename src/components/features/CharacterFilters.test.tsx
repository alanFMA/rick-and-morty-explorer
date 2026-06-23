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

const NAME_DEBOUNCE_WAIT_MS = 500;

beforeEach(() => {
  pushMock.mockClear();
  setSearchParams('');
});

describe('CharacterFilters', () => {
  it('navigates with the status filter when a status button is clicked', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);

    await user.click(screen.getByRole('button', { name: 'Dead' }));

    expect(pushMock).toHaveBeenCalledWith('/?status=Dead');
  });

  it('navigates with the debounced name filter after typing', async () => {
    const user = userEvent.setup();
    render(<CharacterFilters />);

    await user.type(screen.getByLabelText('Buscar personagem por nome'), 'Rick');

    expect(pushMock).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, NAME_DEBOUNCE_WAIT_MS));

    expect(pushMock).toHaveBeenCalledWith('/?name=Rick');
  });

  it('highlights the status button matching the current URL', () => {
    setSearchParams('status=Dead');
    render(<CharacterFilters />);

    expect(screen.getByRole('button', { name: 'Dead' })).toHaveClass('bg-portal-green');
    expect(screen.getByRole('button', { name: 'Alive' })).not.toHaveClass('bg-portal-green');
  });
});
