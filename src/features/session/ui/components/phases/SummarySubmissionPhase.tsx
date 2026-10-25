import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Textarea } from '@/components/ui/textarea';

export const SummarySubmissionPhase = ({ onSubmit }: { onSubmit: (t: string) => void }) => {
  const [summaryText, setSummaryText] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <CheckCircle aria-hidden="true" className="size-6 text-success-text" />
        <h2 className="font-display text-display-sm font-extrabold text-ink">Jornada finalizada!</h2>
        <p className="text-ink-soft">Resuma o que você conquistou nestas últimas horas para garantir sua recompensa em XP.</p>
      </div>

      <FormField label="O que você conquistou nesta sessão?">
        <Textarea
          value={summaryText}
          onChange={(e) => setSummaryText(e.target.value)}
          placeholder="Ex.: terminei a UI e testei as funcionalidades principais"
          rows={5}
        />
      </FormField>

      <Button size="lg" className="w-full" onClick={() => onSubmit(summaryText)} disabled={!summaryText.trim()}>
        Concluir e receber XP
      </Button>
    </div>
  );
};
