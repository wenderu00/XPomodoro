import { Trophy } from 'lucide-react';

export const SessionCompletedPhase = ({ onRestart }: { onRestart: () => void }) => (
  <div className="flex flex-col items-center bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800/50 animate-in zoom-in-95">
    <Trophy className="w-20 h-20 text-yellow-500 mb-4" />
    <h3 className="text-2xl font-bold text-white mb-2">Sucesso Total!</h3>
    <p className="text-zinc-400 mb-6 text-center">Você coletou o limite de XP desta sessão. Descanse seu cérebro e volte em breve.</p>
    
    <button 
      onClick={onRestart}
      className="w-full px-6 py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-xl font-bold transition-all"
    >
      Iniciar Nova Sessão
    </button>
  </div>
);
