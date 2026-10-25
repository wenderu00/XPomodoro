import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductivityFeeling } from '../../../domain/types/ProductivityFeeling';

const options: { feeling: ProductivityFeeling; label: string }[] = [
  { feeling: 'baixo', label: '😞 Baixo' },
  { feeling: 'médio', label: '😐 Médio' },
  { feeling: 'alto', label: '🔥 Alto' },
];

export const FeedbackCollectionPhase = ({ onSubmit }: { onSubmit: (f: ProductivityFeeling) => void }) => (
  <div className="flex flex-col items-center gap-6 text-center">
    <Shield aria-hidden="true" className="size-12 text-accent-text" />
    <div className="flex flex-col gap-2">
      <h2 className="font-display text-display-sm font-extrabold text-ink">Ciclo concluído!</h2>
      <p className="text-ink-soft">Qual foi o seu sentimento de produtividade neste ciclo?</p>
    </div>

    <div className="flex w-full flex-col gap-3">
      {options.map((option) => (
        <Button key={option.feeling} variant="secondary" size="lg" className="w-full" onClick={() => onSubmit(option.feeling)}>
          {option.label}
        </Button>
      ))}
    </div>
  </div>
);
