import { FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  timeLeft: number;
  onSkipDev: () => void;
}

const formatTime = (secs: number) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const ActiveTimerPhase = ({ timeLeft, onSkipDev }: Props) => (
  <div className="flex flex-col items-center gap-6">
    <div role="timer" aria-label="Tempo restante" className="font-mono text-display-xl text-ink tabular-nums">
      {formatTime(timeLeft)}
    </div>

    {process.env.NODE_ENV !== 'production' && (
      <Button variant="ghost" size="sm" onClick={onSkipDev}>
        <FastForward aria-hidden="true" /> Pular cronômetro (dev)
      </Button>
    )}
  </div>
);
