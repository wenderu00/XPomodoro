import { Play, RotateCcw, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const StartCyclePhase = ({ onStart, onRestart }: { onStart: () => void; onRestart?: () => void }) => (
  <div className="flex flex-col items-center gap-6 text-center">
    <Target aria-hidden="true" className="size-12 text-accent-text" />
    <p className="text-ink-soft">Mantenha o foco pelos próximos 25 minutos. Evite distrações a qualquer custo.</p>
    <Button data-tour="start-button" size="lg" className="w-full" onClick={onStart}>
      <Play aria-hidden="true" /> Iniciar ciclo
    </Button>

    {onRestart && (
      <Button variant="ghost" size="sm" onClick={onRestart}>
        <RotateCcw aria-hidden="true" /> Descartar sessão atual e iniciar do ciclo 1
      </Button>
    )}
  </div>
);
