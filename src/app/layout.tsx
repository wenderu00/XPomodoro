import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { AppHeader } from '@/features/session/ui/components/AppHeader';
import { Providers } from './providers';
import './globals.css';

const fontBricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', weight: ['500', '700', '800'] });
const fontPlexSans = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-plex-sans', weight: ['400', '500', '600'] });
const fontPlexMono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-plex-mono', weight: ['400', '500'] });

export const metadata: Metadata = {
  title: 'XPomodoro',
  description: 'Timer pomodoro com o ciclo de feedback do Extreme Programming: feedback por ciclo, retrospectiva e XP.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fontBricolage.variable} ${fontPlexSans.variable} ${fontPlexMono.variable}`}>
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
