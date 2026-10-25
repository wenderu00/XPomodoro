import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';

export const SessionCompletedPhase = ({ onRestart }: { onRestart: () => void }) => (
  <EmptyState
    icon={<Trophy aria-hidden="true" />}
    title="Sucesso total!"
    description="Você coletou o XP desta sessão. Descanse seu cérebro e volte em breve."
    actions={
      <Button variant="secondary" onClick={onRestart}>
        Iniciar nova sessão
      </Button>
    }
  />
);
