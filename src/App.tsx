import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { XPomodoroApp } from './features/session/ui/components/XPomodoroApp';
import { XPTopicsPage } from './pages/XPTopicsPage';
import { WhyXPPomodoroPage } from './pages/WhyXPPomodoroPage';
import { Brain, Trophy, HelpCircle } from 'lucide-react';
import { useTotalXP } from './features/session/ui/hooks/useTotalXP';

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `px-2 md:px-4 py-2 text-xs md:text-sm font-bold transition-all border-b-2 h-[calc(100%+1px)] flex items-center ${
        isActive 
          ? 'border-scarlet-500 text-white' 
          : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
      }`
    }
  >
    {children}
  </NavLink>
);

export const App = () => {
  const totalXP = useTotalXP();

  const handleHelpClick = () => {
    window.dispatchEvent(new Event('xpomodoro:request-tour'));
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-zinc-950">
        <header className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 tour-header">
              <Brain className="w-6 h-6 text-scarlet-500" />
              <span className="font-bold text-white text-lg tracking-tight hidden sm:block">XPomodoro</span>
            </div>
            
            <nav className="flex items-center gap-2 md:gap-4 h-full pt-1">
               <NavItem to="/">Sessão</NavItem>
               <NavItem to="/xp-topics">Manual XP</NavItem>
               <NavItem to="/why-xp">A Filosofia</NavItem>

               <button 
                 onClick={handleHelpClick}
                 className="hover:text-scarlet-500 text-zinc-500 transition-colors ml-2"
                 title="Reiniciar e exibir tutorial"
               >
                 <HelpCircle className="w-5 h-5" />
               </button>

               <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-zinc-800 shadow-md ml-1 tour-xp-badge">
                 <Trophy className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                 <span className="font-semibold text-white text-xs md:text-sm">{totalXP} XP</span>
               </div>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center">
          <Routes>
            <Route path="/" element={<XPomodoroApp />} />
            <Route path="/xp-topics" element={<XPTopicsPage />} />
            <Route path="/why-xp" element={<WhyXPPomodoroPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};
