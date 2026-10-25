import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { ThemeScript } from '@/components/ui/theme-toggle';
import { AppHeader } from '@/features/session/ui/components/AppHeader';
import { Providers } from './providers';
import './globals.css';
import { cn } from "@/lib/utils";

const bricolageGrotesqueBricolage = Bricolage_Grotesque({subsets:['latin'],weight:['500','700','800'],variable:'--font-bricolage'});
const ibmPlexSansPlexSans = IBM_Plex_Sans({subsets:['latin'],weight:['400','500','600'],variable:'--font-plex-sans'});
const ibmPlexMonoPlexMono = IBM_Plex_Mono({subsets:['latin'],weight:['400','500'],variable:'--font-plex-mono'});

export const metadata: Metadata = {
  title: 'XPomodoro',
  description: 'Timer pomodoro com o ciclo de feedback do Extreme Programming: feedback por ciclo, retrospectiva e XP.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(bricolageGrotesqueBricolage.variable, ibmPlexSansPlexSans.variable, ibmPlexMonoPlexMono.variable)}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col bg-ground text-ink">
            <AppHeader />
            <main id="conteudo" className="flex flex-1 flex-col">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
