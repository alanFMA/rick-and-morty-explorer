const SCROLL_STATE_KEY = 'character-showcase-scroll-state';

export interface ScrollState {
  page: number;
  scrollY: number;
  timestamp: number;
}

export function saveScrollState(page: number): void {
  if (typeof window === 'undefined') return;

  const state: ScrollState = {
    page,
    scrollY: window.scrollY,
    timestamp: Date.now(),
  };

  sessionStorage.setItem(SCROLL_STATE_KEY, JSON.stringify(state));
}

export function getScrollState(): ScrollState | null {
  if (typeof window === 'undefined') return null;

  const stored = sessionStorage.getItem(SCROLL_STATE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as ScrollState;
  } catch {
    return null;
  }
}

export function clearScrollState(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SCROLL_STATE_KEY);
}

export function restoreScrollState(state: ScrollState): void {
  if (typeof window === 'undefined') return;

  // Use requestAnimationFrame to ensure the DOM is ready
  requestAnimationFrame(() => {
    window.scrollTo({ top: state.scrollY, behavior: 'auto' });
  });
}
