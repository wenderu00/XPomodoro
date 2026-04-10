import { Play, Target, RotateCcw } from 'lucide-react';

export const StartCyclePhase = ({ onStart, onRestart }: { onStart: () => void, onRestart?: () => void }) => (
  <div className="flex flex-col items-center bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800/50 tour-start-button">
    <Target className="w-16 h-16 text-scarlet-500 mb-4 opacity-80" />
    <p className="text-center text-zinc-400 mb-6 font-medium">Mantenha o foco pelos próximos 25 minutos. Evite distrações a qualquer custo.</p>
    <button 
      onClick={onStart}
      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-scarlet-600 hover:bg-scarlet-500 focus:ring-4 focus:ring-scarlet-500/30 text-white rounded-xl font-bold transition-all transform active:scale-95 text-lg"
    >
      <Play fill="currentColor" className="w-5 h-5" />
      Iniciar Ciclo
    </button>

    {onRestart && (
      <button 
        onClick={onRestart}
        className="mt-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-scarlet-500 transition-colors font-medium"
      >
        <RotateCcw className="w-4 h-4" /> Descartar Sessão Atual e Iniciar do Ciclo 1
      </button>
    )}
  </div>
);
