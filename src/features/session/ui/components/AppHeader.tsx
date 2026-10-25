'use client';

import { Brain, HelpCircle, Trophy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { IconButton } from '@/components/ui/icon-button';
import { Navbar } from '@/components/ui/navbar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
      collapseBelow="lg"
      brand={
        <a href={`${basePath}/`} data-tour="header" className="flex items-center gap-2 font-display text-lg font-extrabold text-ink no-underline">
          <Brain aria-hidden="true" className="size-5 text-accent-text" />
          XPomodoro
        </a>
      }
      links={routes.map((route) => ({ href: `${basePath}${route.path}`, label: route.label, current: pathname === route.path }))}
      menuFooter={<ThemeToggle className="self-start" />}
      actions={
        <>
          <ThemeToggle className="hidden lg:inline-flex" />
          <IconButton aria-label="Reiniciar e exibir tutorial" onClick={() => window.dispatchEvent(new Event('xpomodoro:request-tour'))}>
            <HelpCircle aria-hidden="true" />
          </IconButton>
          <Badge data-tour="xp-badge" tone="accent" appearance="soft">
            <Trophy aria-hidden="true" />
            {totalXP} XP
          </Badge>
        </>
      }
    />
  );
};
