import { FastForward } from 'lucide-react';

interface Props {
  timeLeft: number;
  onSkipDev: () => void;
}

export const ActiveTimerPhase = ({ timeLeft, onSkipDev }: Props) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="text-7xl font-light tracking-tighter text-white mb-8 tabular-nums">
        {formatTime(timeLeft)}
      </div>
      
      <button 
        onClick={onSkipDev}
        className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        title="Avançar tempo para testes"
      >
        <FastForward className="w-4 h-4" /> Skip Timer (Dev)
      </button>
    </div>
  );
};
