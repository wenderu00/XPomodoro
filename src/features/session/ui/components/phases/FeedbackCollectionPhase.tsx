import { Shield } from 'lucide-react';
import { ProductivityFeeling } from '../../../domain/entities/XPomodoro';

export const FeedbackCollectionPhase = ({ onSubmit }: { onSubmit: (f: ProductivityFeeling) => void }) => (
  <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
    <Shield className="w-12 h-12 text-scarlet-400 mb-4" />
    <h3 className="text-lg font-semibold text-white mb-2">Ciclo concluído!</h3>
    <p className="text-zinc-400 mb-6 text-center text-sm">Qual foi o seu sentimento de produtividade neste ciclo?</p>
    
    <div className="grid grid-cols-1 gap-3 w-full">
      {(['baixo', 'médio', 'alto'] as ProductivityFeeling[]).map((feeling) => (
        <button
          key={feeling}
          onClick={() => onSubmit(feeling)}
          className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 hover:border-scarlet-500/50 border border-zinc-800 rounded-xl capitalize font-medium transition-all text-white"
        >
          {feeling === 'baixo' && '😞 Baixo'}
          {feeling === 'médio' && '😐 Médio'}
          {feeling === 'alto' && '🔥 Alto'}
        </button>
      ))}
    </div>
  </div>
);
