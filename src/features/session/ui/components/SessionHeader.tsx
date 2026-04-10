import { Brain, Trophy } from 'lucide-react';

export const SessionHeader = ({ totalXP }: { totalXP: number }) => (
  <header className="flex justify-between items-center max-w-4xl w-full mx-auto p-4 border-b border-zinc-800">
    <div className="flex items-center gap-2 tour-header">
      <Brain className="text-scarlet-500 w-8 h-8" />
      <h1 className="text-2xl font-bold bg-gradient-to-r from-scarlet-400 to-scarlet-600 bg-clip-text text-transparent">XPomodoro</h1>
    </div>
    <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 shadow-md tour-xp-badge">
      <Trophy className="text-yellow-400 w-5 h-5" />
      <span className="font-semibold">{totalXP} XP</span>
    </div>
  </header>
);
