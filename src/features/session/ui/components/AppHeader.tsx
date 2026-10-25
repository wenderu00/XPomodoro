'use client';

import { Brain, Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/ui/navbar';
import { useTotalXP } from '../hooks/useTotalXP';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const routes = [
  { path: '/', label: 'sessão' },
  { path: '/xp-topics/', label: 'manual xp' },
  { path: '/why-xp/', label: 'a filosofia' },
];

const withTrailingSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

export const AppHeader = () => {
  const totalXP = useTotalXP();
  const pathname = withTrailingSlash(usePathname());

  return (
    <Navbar
      brand={
        <a href={`${basePath}/`} className="flex items-center gap-2 font-display text-lg font-extrabold text-ink no-underline">
          <Brain aria-hidden="true" className="size-6 text-accent-text" />
          XPomodoro
        </a>
      }
      links={routes.map((route) => ({ href: `${basePath}${route.path}`, label: route.label, current: pathname === route.path }))}
      actions={
        <Badge tone="accent" appearance="soft">
          <Trophy aria-hidden="true" className="size-3.5" />
          {totalXP} XP
        </Badge>
      }
    />
  );
};
