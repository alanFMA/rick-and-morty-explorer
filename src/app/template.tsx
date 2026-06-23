import type { JSX, ReactNode } from 'react';

import { PageTransition } from '@/components/animations/PageTransition';

export default function RootTemplate({ children }: { children: ReactNode }): JSX.Element {
  return <PageTransition>{children}</PageTransition>;
}
