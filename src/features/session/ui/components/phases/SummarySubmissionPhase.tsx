import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export const SummarySubmissionPhase = ({ onSubmit }: { onSubmit: (t: string) => void }) => {
  const [summaryText, setSummaryText] = useState('');

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4">
      <CheckCircle className="w-12 h-12 text-green-400 mb-4 mx-auto" />
      <h3 className="text-xl font-bold text-white mb-2 text-center">Jornada Finalizada!</h3>
      <p className="text-zinc-400 mb-6 text-center text-sm">Resuma o que você conquistou nestas últimas horas para garantir sua recompensa em XP.</p>
      
      <textarea 
        value={summaryText}
        onChange={e => setSummaryText(e.target.value)}
        placeholder="Ex: Consegui finalizar a UI e testar as features cruciais..."
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-scarlet-500 transition-colors mb-4 resize-none h-32"
      />
      
      <button 
        onClick={() => onSubmit(summaryText)}
        disabled={!summaryText.trim()}
        className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-scarlet-600 hover:bg-scarlet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all text-lg"
      >
        Concluir e Receber XP
      </button>
    </div>
  );
};
